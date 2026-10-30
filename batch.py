#!/usr/bin/env python3
"""Render the concept library. One unique concept per clip.

  python batch.py                                  all concepts, 4K ProRes 422 HQ .mov (house default)
  python batch.py --res 1080 --fmt mp4             1080p H.264 MP4
  python batch.py --res 4320 --fmt mp4 --parts 4   8K, each clip split into 4 frame-parts (for parallel jobs)
  python batch.py --ids 4,9 --dur 18 --fps 30      selected concepts, 18 s

--res   1080 | 2160 (4K UHD 3840x2160) | 3240 (6K 5760x3240) | 4320 (8K UHD 7680x4320)
--fmt   mp4 | mov
--codec auto | h264 | hevc | prores | prores4444   (auto: h264 in mp4 up to 4K, hevc above; prores in mov up to 4K, hevc above)
--motion-blur N   average N sub-frames per frame (180 degree shutter); 1 = off
--dur   seconds, 15-20 (a concept may override with dur=NN in concepts.py)
Resumable: finished clips are skipped.  After all parts exist run:  python finalize.py output
"""
import argparse, base64, os, subprocess, time
from concurrent.futures import ProcessPoolExecutor, as_completed

HERE = os.path.dirname(os.path.abspath(__file__))
from concepts import CONCEPTS

SCALE = {1080: 1, 2160: 2, 3240: 3, 4320: 4}
LABEL = {1080: '1080p', 2160: '4K', 3240: '6K', 4320: '8K'}


def pick_codec(fmt, res, codec):
    if codec != 'auto':
        return codec
    if fmt == 'mov':
        return 'prores' if res <= 2160 else 'hevc'
    return 'h264' if res <= 2160 else 'hevc'


def enc_args(codec):
    """ffmpeg video-encoder arguments (input is RGB PNG frames, BT.709, TV range)."""
    vf = 'scale=out_color_matrix=bt709:out_range=tv'
    meta = ['-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709']
    if codec == 'h264':
        return ['-vf', vf + ',format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '13'] + meta
    if codec == 'hevc':
        return ['-vf', vf + ',format=yuv420p10le', '-c:v', 'libx265', '-preset', 'medium', '-crf', '15',
                '-tag:v', 'hvc1', '-x265-params', 'log-level=error'] + meta
    if codec == 'prores':      # ProRes 422 HQ
        return ['-vf', vf + ',format=yuv422p10le', '-c:v', 'prores_ks', '-profile:v', '3', '-vendor', 'apl0'] + meta
    if codec == 'prores4444':  # ProRes 4444 (no alpha is used, but best chroma)
        return ['-vf', vf + ',format=yuv444p10le', '-c:v', 'prores_ks', '-profile:v', '4', '-vendor', 'apl0'] + meta
    raise SystemExit('unknown codec ' + codec)


def render(c, a):
    from playwright.sync_api import sync_playwright
    res, fmt, fps, P, p = a.res, a.fmt, a.fps, a.parts, a.part
    dur = float(c.get('dur') or a.dur)
    codec = pick_codec(fmt, res, a.codec)
    stem = c['file'].rsplit('.', 1)[0]
    ext = fmt
    final = os.path.join(a.out, f'{stem}.{ext}')
    if P == 1:
        path = final
    else:
        os.makedirs(os.path.join(a.out, 'parts'), exist_ok=True)
        path = os.path.join(a.out, 'parts', f'{stem}.p{p}.{ext}')
    if os.path.exists(final) or os.path.exists(path):
        return c['id'], 'skip'
    n = round(dur * fps)
    k0, k1 = n * p // P, n * (p + 1) // P
    tmp = path + '.part.' + ext
    t0 = time.time()
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', str(fps), '-i', '-']
                          + enc_args(codec) + (['-movflags', '+faststart'] if ext == 'mp4' else []) + [tmp],
                          stdin=subprocess.PIPE)
    with sync_playwright() as pw:
        b = pw.chromium.launch(args=['--disable-gpu', '--force-color-profile=srgb'])
        pg = b.new_page(viewport={'width': 1920, 'height': 1080})
        pg.goto('file://' + os.path.join(HERE, 'index.html') + f'?dur={dur:g}')
        pg.evaluate(f"init({c['id']},{SCALE[res]})")
        for k in range(k0, k1):
            call = f'renderAtMB({k * 1000 / fps},{a.motion_blur},{500 / fps})' if a.motion_blur > 1 else f'renderAt({k * 1000 / fps})'
            ff.stdin.write(base64.b64decode(pg.evaluate(call)))
        b.close()
    ff.stdin.close()
    ff.wait()
    if ff.returncode:
        raise RuntimeError(f'ffmpeg failed for concept {c["id"]}')
    os.replace(tmp, path)
    return c['id'], f'done {LABEL[res]} {codec} frames {k0}-{k1 - 1} in {round(time.time() - t0)}s'


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--res', type=int, default=2160, choices=sorted(SCALE))
    ap.add_argument('--fmt', default='mov', choices=['mp4', 'mov'])
    ap.add_argument('--codec', default='auto', choices=['auto', 'h264', 'hevc', 'prores', 'prores4444'])
    ap.add_argument('--dur', type=float, default=15, help='seconds, 15-20')
    ap.add_argument('--fps', type=int, default=30, choices=[24, 25, 30, 50, 60])
    ap.add_argument('--motion-blur', type=int, default=1, help='sub-frames per frame (1 = off, 4-8 = smooth streaks, n times slower)')
    ap.add_argument('--ids', default='')
    ap.add_argument('--shard', type=int, default=0)
    ap.add_argument('--shards', type=int, default=1)
    ap.add_argument('--part', type=int, default=0)
    ap.add_argument('--parts', type=int, default=1)
    ap.add_argument('--workers', type=int, default=1)
    ap.add_argument('--out', default=os.path.join(HERE, 'output'))
    a = ap.parse_args()
    if a.part >= a.parts:
        print(f'part {a.part} >= parts {a.parts}: nothing to do', flush=True)
        raise SystemExit(0)
    os.makedirs(a.out, exist_ok=True)
    want = {int(x) for x in a.ids.replace(' ', '').split(',') if x}
    jobs = [c for i, c in enumerate(CONCEPTS) if i % a.shards == a.shard and (not want or c['id'] in want)]
    print(f'shard {a.shard}/{a.shards} part {a.part}/{a.parts}: {len(jobs)} clips at {LABEL[a.res]} {a.fmt}', flush=True)
    with ProcessPoolExecutor(a.workers) as ex:
        for f in as_completed([ex.submit(render, c, a) for c in jobs]):
            print(*f.result(), flush=True)
