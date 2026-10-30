C[7]=()=>{newTL();const N=10,M=5;
 draw=()=>{clear();const th=LOOP(now());const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#f6f8fb');bg.addColorStop(1,'#dde3ec');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  const sb=ctx.createRadialGradient(W*.35,H*.2,0,W*.35,H*.2,900);sb.addColorStop(0,'rgba(255,255,255,.8)');sb.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sb;ctx.fillRect(0,0,W,H);
  const items=[];for(let j=0;j<M;j++)for(let i=0;i<N;i++){const gx=(i-(N-1)/2),gy=(j-(M-1)/2),d=Math.hypot(gx,gy*1.3),w=Math.sin(th*2-d*.9);items.push({x:W/2+gx*185,y:H/2+gy*185+w*-14,z:w*70,r:78+w*10,i,j,w})}
  items.sort((a,b)=>b.z-a.z);
  for(const s of items){const k=1+s.z/1600,r=s.r*k,h=(s.i/N*.35+s.j/M*.2+th/TAU*1+.55);
   softShadow(s.x+r*.3,s.y+r*1.05,r*.9,r*.22,.24,'60,80,130',14);
   ctx.save();ctx.globalCompositeOperation='multiply';const cg=ctx.createRadialGradient(s.x+r*.42,s.y+r*1.12,0,s.x+r*.42,s.y+r*1.12,r*.7);cg.addColorStop(0,irid(h,75,.5));cg.addColorStop(1,irid(h,75,0));ctx.fillStyle=cg;ctx.fillRect(s.x-r,s.y,r*3,r*2);ctx.restore();
   const g=ctx.createRadialGradient(s.x-r*.25,s.y-r*.3,r*.05,s.x,s.y,r);
   g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(.5,irid(h,82,.2));g.addColorStop(.85,irid(h+.18,68,.42));g.addColorStop(1,irid(h+.4,58,.7));
   ctx.fillStyle=g;ctx.beginPath();ctx.arc(s.x,s.y,r,0,TAU);ctx.fill();
   ctx.save();ctx.beginPath();ctx.arc(s.x,s.y,r-1,0,TAU);ctx.clip();
   const cs=ctx.createRadialGradient(s.x+r*.38,s.y+r*.42,0,s.x+r*.38,s.y+r*.42,r*.55);cs.addColorStop(0,'rgba(255,255,255,.55)');cs.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=cs;ctx.fillRect(s.x-r,s.y-r,r*2,r*2);
   const fr2=ctx.createLinearGradient(0,s.y,0,s.y+r);fr2.addColorStop(0,'rgba(255,255,255,0)');fr2.addColorStop(1,irid(h+.5,80,.3));ctx.fillStyle=fr2;ctx.fillRect(s.x-r,s.y,r*2,r);
   ctx.fillStyle='rgba(120,140,190,.14)';ctx.beginPath();ctx.ellipse(s.x-r*.05,s.y-r*.05,r*.7,r*.66,0,Math.PI*.1,Math.PI*.95);ctx.lineWidth=0;ctx.fill();ctx.restore();
   ctx.save();ctx.globalCompositeOperation='multiply';ctx.lineWidth=1.8;[['#ff5a8a',-1.5],['#58e0a8',0],['#5a8aff',1.5]].forEach(([c,o])=>{ctx.strokeStyle=c;ctx.globalAlpha=.55;ctx.beginPath();ctx.arc(s.x+o,s.y+o*.5,r-.9,0,TAU);ctx.stroke()});ctx.restore();
   ctx.fillStyle='rgba(255,255,255,.95)';const wx=s.x-r*.42,wy=s.y-r*.46,pw=r*.15,ph=r*.1;[[0,0],[pw*1.15,0],[0,ph*1.2],[pw*1.15,ph*1.2]].forEach(([dx,dy])=>{ctx.beginPath();ctx.roundRect(wx+dx-pw*.5,wy+dy-ph*.5-pw*.25,pw,ph,2);ctx.fill()});
   ctx.globalAlpha=.5;ctx.beginPath();ctx.arc(s.x+r*.35,s.y+r*.45,r*.07,0,TAU);ctx.fill();ctx.globalAlpha=1}
  vignette(.1);grain(.03,'overlay')}};
