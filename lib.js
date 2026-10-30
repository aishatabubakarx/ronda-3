const DUR=(+new URLSearchParams(location.search).get("dur")||15)*1000;const W=1920,H=1080,TAU=Math.PI*2;
const cv=document.getElementById('c');let ctx=cv.getContext('2d',{alpha:false}),S=1;
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const lerp=(a,b,t)=>a+(b-a)*t,fr=x=>x-Math.floor(x),clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),sm=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const mixc=(a,b,t)=>[lerp(a[0],b[0],t)|0,lerp(a[1],b[1],t)|0,lerp(a[2],b[2],t)|0];
const rgba=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`;
const hsl=(h,s=100,l=60,a=1)=>`hsla(${h},${s}%,${l}%,${a})`;
function glow(c,size=128,core=1){const k=document.createElement('canvas');k.width=k.height=size;const x=k.getContext('2d'),h=size/2,g=x.createRadialGradient(h,h,0,h,h,h),[r,gg,b]=c,up=v=>Math.min(255,v+60);
  g.addColorStop(0,`rgba(255,255,255,${core})`);g.addColorStop(.12,`rgba(${up(r)},${up(gg)},${up(b)},.95)`);g.addColorStop(.3,`rgba(${r},${gg},${b},.38)`);g.addColorStop(.62,`rgba(${r},${gg},${b},.07)`);g.addColorStop(1,`rgba(${r},${gg},${b},0)`);
  x.fillStyle=g;x.fillRect(0,0,size,size);return k}
const _sc={};const spr=(c,size=64)=>{const k=c.join()+size;return _sc[k]||(_sc[k]=glow(c,size))};
function clear(){ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);ctx.shadowBlur=0;ctx.setLineDash([])}
let tl,draw;const C={};const now=()=>tl.time()*1000;
const newTL=()=>{tl=gsap.timeline({paused:true});tl.to({},{duration:DUR/1000},0);return tl};
function txt(s,x,y,o={}){ctx.save();ctx.font=`${o.w||700} ${o.size||100}px "${o.f||'Montserrat'}"`;ctx.letterSpacing=(o.ls||0)+'px';ctx.textAlign=o.al||'center';ctx.textBaseline='middle';
  ctx.translate(x,y);if(o.rot)ctx.rotate(o.rot);if(o.sc)ctx.scale(o.sc,o.sc);ctx.globalAlpha*=(o.a??1);const fl=o.fill||'#fff';
  for(const [c,b] of (o.glow||[])){ctx.shadowColor=c;ctx.shadowBlur=b*S;ctx.fillStyle=fl;ctx.fillText(s,0,0)}
  ctx.shadowBlur=0;ctx.shadowColor='transparent';ctx.fillStyle=fl;if(o.stroke){ctx.strokeStyle=o.stroke;ctx.lineWidth=o.lw||2;ctx.lineJoin='round';ctx.strokeText(s,0,0)}if(!o.noFill)ctx.fillText(s,0,0);ctx.restore()}
function tw(s,f,w,size,ls=0){ctx.save();ctx.font=`${w} ${size}px "${f}"`;ctx.letterSpacing=ls+'px';const v=ctx.measureText(s).width;ctx.restore();return v}
function mkL(s,font,wt,size,cx,ls=0){ctx.save();ctx.font=`${wt} ${size}px "${font}"`;ctx.letterSpacing='0px';const ws=[...s].map(c=>ctx.measureText(c).width);ctx.restore();
  const tot=ws.reduce((a,b)=>a+b,0)+ls*(ws.length-1);let x=cx-tot/2;const L=[];[...s].forEach((c,i)=>{L.push({ch:c,x:x+ws[i]/2,w:ws[i],a:0,y:0,sc:1,k:i/(ws.length-1||1)});x+=ws[i]+ls});return{L,font,wt,size,tot,cx}}
function drawL(set,y,o={}){for(const l of set.L){if(l.ch===' '||l.a<.002)continue;ctx.save();ctx.translate(l.x,y+l.y);ctx.scale(l.sc,l.sc);ctx.globalAlpha=l.a*(o.ga??1);
  ctx.font=`${set.wt} ${set.size}px "${set.font}"`;ctx.textAlign='center';ctx.textBaseline='middle';const f=typeof o.fill==='function'?o.fill(l):(o.fill||'#fff');
  for(const [c,b] of (o.glow||[])){ctx.shadowColor=c;ctx.shadowBlur=b*S;ctx.fillStyle=f;ctx.fillText(l.ch,0,0)}ctx.shadowBlur=0;ctx.shadowColor='transparent';ctx.fillStyle=f;ctx.fillText(l.ch,0,0);ctx.restore()}}
function heart(x,y,s){ctx.beginPath();ctx.moveTo(x,y+s*.3);ctx.bezierCurveTo(x,y-s*.1,x-s*.6,y-s*.1,x-s*.6,y+s*.3);ctx.bezierCurveTo(x-s*.6,y+s*.65,x-s*.2,y+s*.85,x,y+s);ctx.bezierCurveTo(x+s*.2,y+s*.85,x+s*.6,y+s*.65,x+s*.6,y+s*.3);ctx.bezierCurveTo(x+s*.6,y-s*.1,x,y-s*.1,x,y+s*.3);ctx.closePath()}
function flare(x,y,r,a,col='#fff'){ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x+r*.07,y-r*.07,x+r,y);ctx.quadraticCurveTo(x+r*.07,y+r*.07,x,y+r);ctx.quadraticCurveTo(x-r*.07,y+r*.07,x-r,y);ctx.quadraticCurveTo(x-r*.07,y-r*.07,x,y-r);ctx.fill()}
function roundRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r)}
/* GSAP helpers: A(obj,from,to,atSeconds,durSeconds,ease) - deterministic seekable tween */
const A=(o,f,t,at,d,e='none')=>tl.fromTo(o,f,{...t,duration:d,ease:e,immediateRender:false},at);
const ez=(n,x)=>gsap.parseEase(n)(clamp(x,0,1));
/* simplex noise (2D) + loop-safe noise: moving the sample point around a circle makes it periodic in ph */
const _p=new Uint8Array(512),_g=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
{const R=rng(7),a=[...Array(256).keys()];for(let i=255;i>0;i--){const j=(R()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]]}for(let i=0;i<512;i++)_p[i]=a[i&255]}
function noise(xin,yin){const F=.5*(Math.sqrt(3)-1),G=(3-Math.sqrt(3))/6,s=(xin+yin)*F,i=Math.floor(xin+s),j=Math.floor(yin+s),t=(i+j)*G,x0=xin-(i-t),y0=yin-(j-t),i1=x0>y0?1:0,j1=x0>y0?0:1,
  x1=x0-i1+G,y1=y0-j1+G,x2=x0-1+2*G,y2=y0-1+2*G,ii=i&255,jj=j&255;
  const f=(x,y,gi)=>{let t=.5-x*x-y*y;if(t<0)return 0;t*=t;const g=_g[gi&7];return t*t*(g[0]*x+g[1]*y)};
  return 70*(f(x0,y0,_p[ii+_p[jj]])+f(x1,y1,_p[ii+i1+_p[jj+j1]])+f(x2,y2,_p[ii+1+_p[jj+1]]))}
const lnoise=(x,y,ph,r=1)=>noise(x+r*Math.cos(ph),y+r*Math.sin(ph)+31.7);
const fbm=(x,y,o=3)=>{let a=0,m=1,f=1;for(let i=0;i<o;i++){a+=m*noise(x*f,y*f);m*=.5;f*=2}return a};
const LOOP=ms=>TAU*ms/DUR; /* 0..TAU over the 15 s clip, use integer multiples for seamless loops */
function offscreen(w,h){const k=document.createElement('canvas');k.width=w;k.height=h;return k}
/* ---- finishing stack helpers (call at the END of draw(), in this order: bloom, vignette, grain) ---- */
const _bl={};
/* cheap bloom: repeatedly halve the frame, then add the small copies back scaled up (bilinear = soft blur). Scales with any S. */
function bloom(amount=.5,levels=[3,5]){let src=cv,cw=cv.width,ch=cv.height,lv=0;const keep={};
  for(let i=1;i<=Math.max(...levels);i++){cw=Math.max(4,cw>>1);ch=Math.max(4,ch>>1);const k=_bl[i]&&_bl[i].width===cw?_bl[i]:(_bl[i]=offscreen(cw,ch)),x=k.getContext('2d');
    x.setTransform(1,0,0,1,0,0);x.globalCompositeOperation='copy';x.globalAlpha=1;x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(src,0,0,cw,ch);src=k;keep[i]=k}
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='lighter';ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  for(const l of levels){ctx.globalAlpha=amount/levels.length*(1+l*.15);ctx.drawImage(keep[l],0,0,cv.width,cv.height)}ctx.restore()}
/* radial vignette toward black */
function vignette(a=.55){ctx.save();ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='source-over';const g=ctx.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*1.0);
  g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.restore()}
/* seeded film grain / dither: 6 pre-made tiles cycled by frame; also hides banding in dark gradients */
let _gr=null;
function grain(a=.035,mode='lighter'){if(!_gr){const R=rng(99);_gr=Array.from({length:6},()=>{const k=offscreen(256,256),x=k.getContext('2d'),d=x.createImageData(256,256);
    for(let i=0;i<65536;i++){const v=(R()*255)|0;d.data[i*4]=v;d.data[i*4+1]=v;d.data[i*4+2]=v;d.data[i*4+3]=255}x.putImageData(d,0,0);return k})}
  const fi=Math.floor(now()/33.333)%_gr.length,px=Math.max(1,Math.round(S*.9));ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation=mode;ctx.globalAlpha=a;
  const t=_gr[fi],ox=(fi*53)%256;for(let y=-256;y<cv.height;y+=256*px)for(let x=-ox*px;x<cv.width;x+=256*px)ctx.drawImage(t,x,y,256*px,256*px);ctx.restore()}
