C[2]=()=>{newTL();const M=G3.ico(300),S2=G3.octa(40),R=rng(202),FY=H*.84,sp=Array.from({length:50},()=>({x:R()*W,y:R()*H*.8,r:30+R()*130,a:.03+R()*.05}));
 const hero=(th,rf)=>glassMesh(M,{rot:[th*1+.5,th*2,th*1],pos:[0,-90+Math.sin(th*2)*14,0],hue:th/TAU,fa:.13,ea:.95,tint:[130,170,235],iri:1,light:true,off:1.8,f:2200});
 draw=()=>{clear();const th=LOOP(now());
  const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#fafbfd');g.addColorStop(.74,'#e4e8f1');g.addColorStop(.78,'#dde2ed');g.addColorStop(1,'#cfd6e5');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.globalCompositeOperation='multiply';for(const s of sp){const gg=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);gg.addColorStop(0,`rgba(120,150,210,${s.a*.5})`);gg.addColorStop(1,'rgba(120,150,210,0)');ctx.fillStyle=gg;ctx.fillRect(s.x-s.r,s.y-s.r,s.r*2,s.r*2)}ctx.restore();
  const sb=ctx.createRadialGradient(W/2,H*.38,0,W/2,H*.38,620);sb.addColorStop(0,'rgba(255,255,255,.9)');sb.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sb;ctx.fillRect(0,0,W,H);
  /* floor reflection of hero + satellites, faded */
  ctx.save();ctx.beginPath();ctx.rect(0,FY,W,H-FY);ctx.clip();ctx.translate(0,FY*2);ctx.scale(1,-1);ctx.globalAlpha=.3;hero(th);ctx.restore();
  const fg=ctx.createLinearGradient(0,FY,0,H);fg.addColorStop(0,'rgba(221,226,237,.45)');fg.addColorStop(1,'rgba(207,214,229,1)');ctx.fillStyle=fg;ctx.fillRect(0,FY,W,H-FY);
  softShadow(W/2,FY+8,330,30,.3,'40,60,120',26);caustic(W/2+Math.sin(th)*50,FY+20,300,44,th/TAU,.34);caustic(W/2-Math.sin(th)*140,FY+30,150,24,th/TAU+.4,.2);
  const sats=[0,1,2].map(i=>{const a=th*(i%2?-1:1)*1+i*2.1;return{x:Math.cos(a)*560,z:Math.sin(a)*300,y:-160+Math.sin(a*2+i)*70,i}}).sort((a,b)=>b.z-a.z);
  hero(th);
  for(const s of sats)glassMesh(S2,{rot:[th*2+s.i,th*3,th],pos:[s.x,s.y,s.z],hue:th/TAU+s.i*.3,fa:.2,ea:.9,tint:[130,170,235],iri:1,light:true,f:2200,sc:1.2+s.i*.2,blur:s.z>100?1.5:0});
  ctx.globalAlpha=1;vignette(.12);grain(.035,'overlay')}};
