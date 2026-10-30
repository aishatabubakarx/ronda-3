C[11]=()=>{newTL();const R=rng(1111),cols=[[255,120,160],[255,190,110],[120,200,255],[170,130,255],[110,230,190]];
 const Cs=cols.map((c,i)=>({c,r:250+(i%3)*40,m:1+(i%2),ph:i*1.26,ax:360+i*30,ay:150+i*20}));
 const mo=Array.from({length:70},()=>({x:R()*W,y:R()*H,r:2+R()*5,k:1+((R()*2)|0),ph:R()*TAU,h:R()})),FP=mkFrost(11);
 const pos=(o,th)=>{const a=th*o.m+o.ph;return[W/2+Math.cos(a)*o.ax,H/2+Math.sin(a+.7)*o.ay]};
 draw=()=>{clear();const th=LOOP(now());bgGrad('#fff6ee','#f1e7ff',.9);
  const sb=ctx.createRadialGradient(W*.3,H*.2,0,W*.3,H*.2,900);sb.addColorStop(0,'rgba(255,255,255,.7)');sb.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sb;ctx.fillRect(0,0,W,H);
  for(const o of Cs){const[x,y]=pos(o,th);softShadow(x+o.r*.14,y+o.r*.22,o.r*.96,o.r*.96,.16,'90,70,140',46)}
  ctx.globalCompositeOperation='multiply';
  for(const o of Cs){const[x,y]=pos(o,th);const g=ctx.createRadialGradient(x,y,o.r*.55,x,y,o.r);g.addColorStop(0,rgba(o.c.map(v=>255-(255-v)*.26|0),1));g.addColorStop(.88,rgba(o.c.map(v=>255-(255-v)*.55|0),1));g.addColorStop(1,rgba(o.c,1));ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,o.r,0,TAU);ctx.fill()}
  ctx.globalCompositeOperation='source-over';
  for(const o of Cs){const[x,y]=pos(o,th),r=o.r;
   /* lens: displaced inner circle (magnified refraction) + bright bottom caustic crescent */
   ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x-r*.06,y-r*.07,r*.8,0,TAU);ctx.stroke();
   ctx.save();ctx.beginPath();ctx.arc(x,y,r-2,0,TAU);ctx.clip();const cg=ctx.createRadialGradient(x+r*.25,y+r*.78,0,x+r*.25,y+r*.78,r*.7);cg.addColorStop(0,'rgba(255,255,255,.55)');cg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=cg;ctx.fillRect(x-r,y-r,r*2,r*2);
   ctx.globalCompositeOperation='overlay';ctx.globalAlpha=.25;ctx.fillStyle=FP;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore();
   ctx.lineWidth=2.5;ctx.strokeStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.arc(x,y,r-2,0,TAU);ctx.stroke();
   [['rgba(255,90,140,.4)',-2],['rgba(90,230,170,.35)',0],['rgba(90,140,255,.4)',2]].forEach(([c,d])=>{ctx.strokeStyle=c;ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(x+d,y+d*.5,r+1,0,TAU);ctx.stroke()});
   ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=14;ctx.lineCap='round';ctx.beginPath();ctx.arc(x,y,r-18,Math.PI*1.1,Math.PI*1.42);ctx.stroke();ctx.lineWidth=5;ctx.globalAlpha=.6;ctx.beginPath();ctx.arc(x,y,r-18,Math.PI*1.47,Math.PI*1.52);ctx.stroke();ctx.globalAlpha=1;
   ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,r-14,Math.PI*.2,Math.PI*.42);ctx.stroke()}
  ctx.save();for(const m of mo){const a=.25+.5*(.5+.5*Math.sin(th*m.k+m.ph));ctx.globalAlpha=a*.5;ctx.fillStyle=irid(m.h+th/TAU,72,1);ctx.beginPath();ctx.arc(m.x+Math.sin(th*m.k+m.ph)*14,m.y+Math.cos(th*m.k+m.ph)*10,m.r,0,TAU);ctx.fill()}ctx.restore();
  ctx.globalAlpha=1;vignette(.08);grain(.03,'overlay')}};
