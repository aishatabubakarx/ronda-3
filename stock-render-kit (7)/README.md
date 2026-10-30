# Stock clip renderer (15 s clips, GSAP canvas engine)

20 unique concepts, each 15 s, default output **4K MOV**. Frames come from a deterministic canvas timeline, so every render is identical.

## Render on GitHub (no install)
1. Create a new repository and push these files (keep the hidden `.github` folder).
2. Actions tab > "Render stock clips" > Run workflow. The form is pre-set to **4K / MOV / 15 s / parts 1 / publish release**, so you can just press Run. To change: resolution (1080 / 2160 = 4K / 3240 = 6K / 4320 = 8K), container (mov / mp4), codec, length (15 to 20 s), parts, where to publish.
3. Use **parts = 4** for 6K and 8K: every clip is rendered as four frame-ranges in parallel and joined at the end.
4. Download the artifact `stock-pack` (or the Release `pack-N`): clips, a JPG thumbnail per clip (taken at 7 s), `adobe_stock.csv`, `metadata_full.csv`.
   * Artifacts count against the free 500 MB storage. 4K ProRes MOV is about 1.3 GB per 15 s clip, so MOV, 6K and 8K default to **release** (each file up to 2 GiB, no quota). 8K ProRes is too big for that: leave codec on auto (HEVC) for 8K.
5. For 6K/8K the pack also contains `adobe_upload_4k/`: the same clips scaled to 3840x2160 H.264. Upload those to Adobe Stock (it accepts up to 4096 px wide and asks you not to submit larger). Keep the 6K/8K files as masters for other buyers.

## Render on your own computer
`pip install playwright && playwright install chromium` (ffmpeg on PATH), then
`python batch.py --dur 15 --workers 2` (defaults 4K MOV; add `--res 1080 --fmt mp4` for a quick small test) and `python finalize.py output`.
Single clips: `python batch.py --ids 4,9`. For 6K/8K split frames: `python batch.py --res 4320 --parts 4 --part 0` ... `--part 3`, then `python finalize.py output`.

## Formats
| Choice | Encoder | Notes |
|---|---|---|
| mp4, up to 4K | H.264 High, CRF 13, yuv420p | Adobe Stock recommended |
| mov, up to 4K | ProRes 422 HQ (10-bit) | Adobe Stock recommended; large files |
| mp4 or mov, 6K/8K | HEVC 10-bit (hvc1) | ProRes at 8K exceeds GitHub's 2 GiB file limit |
All clips: BT.709, 30 fps unless changed (24/25/30/50/60), no audio.

## Add or change concepts
Write `C[n]=()=>{...}` in a `c*.js` file with `newTL()`, `A(obj,from,to,atSec,durSec,ease)` and `draw=()=>{...}`. Express times from `DUR/1000` so the clip works at 15 to 20 s. Add a row in `concepts.py` and a title + category in `adobe_meta.py`. Helpers in `lib.js`: `noise()`, `lnoise()` (loop-safe), `LOOP(ms)`, `txt()`, `glow()`, `rng(seed)`.

## Licenses
Fonts are SIL OFL via Fontsource. GSAP is used under GreenSock's standard license (https://gsap.com/standard-license): confirm it covers selling the output.
