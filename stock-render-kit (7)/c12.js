C[12]=()=>{newTL();const N=19,B=G3.box(58,100,58),Bb=G3.box(40,100,40),Cp=G3.box(70,7,70),R=rng(1212),FY=H/2+330;
 const sp=Array.from({length:110},()=>({x:R()*W,y0:R(),m:1+((R()*2)|0),s:1+R()*2.2,h:R()}));
 const bars=(th,rf)=>{const items=[];
  for(let row=1;row>=0;row--)for(let i=0;i<N;i++){const t=i/(N-1),ph=row?1.4:0,h=(.5+.5*Math.sin(th*2-t*TAU*1.5+ph+Math.sin(th)*1.1))*.75+.2+.12*Math.sin(th*3+t*TAU*2+ph),hh=h*(row?380:500),x=(t-.5)*(row?1500:1700);
   const m={V:(row?Bb:B).V.map(v=>[v[0],v[1]*hh/100,v[2]]),F:B.F};
   glassMesh(m,{rot:[.14,(t-.5)*.5,0],pos:[x,330-hh/2,row?260:(i%2)*60],hue:t*.8+th/TAU+row*.2,fa:row?.16:.26,ea:row?.5:.75,tint:[110,160,255],iri:1.2,off:1.8,f:1700,streak:.7,glints:false,blur:row?2:0});
   const cy=330-hh-26-14*(1+Math.sin(th*2+i)),cm={V:Cp.V,F:Cp.F};glassMesh(cm,{rot:[.14,(t-.5)*.5,0],pos:[x,cy,row?260:(i%2)*60],hue:t+.4+th/TAU,fa:.5,ea:.9,iri:1.5,f:1700,glints:false,sc:row?.7:1,inset:1,ghost:0})}};
 draw=()=>{clear();const th=LOOP(now()),u=now()/DUR;bgGrad('#04050a','#0a0d1f',1.2);orb(W/2,H*.6,900,[40,90,220],.13);
  ctx.globalCompositeOperation='lighter';for(const s of sp){const y=H-((s.y0+u*s.m)%1)*H;ctx.globalAlpha=.4*(1-y/H);ctx.fillStyle='#8fb0ff';ctx.fillRect(s.x,y,s.s,s.s)}ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  /* mirrored reflection */
  ctx.save();ctx.beginPath();ctx.rect(0,FY,W,H-FY);ctx.clip();ctx.translate(0,FY*2);ctx.scale(1,-1);ctx.globalAlpha=.28;bars(th);ctx.restore();
  const fg=ctx.createLinearGradient(0,FY,0,H);fg.addColorStop(0,'rgba(8,12,30,.35)');fg.addColorStop(1,'rgba(3,5,12,.95)');ctx.fillStyle=fg;ctx.fillRect(0,FY,W,H-FY);
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(90,130,255,.1)';ctx.lineWidth=1;for(let k=-18;k<=18;k++){ctx.beginPath();ctx.moveTo(W/2+k*40,FY);ctx.lineTo(W/2+k*330,H);ctx.stroke()}for(let j=1;j<8;j++){const y=FY+Math.pow(j/8,1.8)*(H-FY);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
  const hl=ctx.createLinearGradient(0,FY-2,0,FY+3);hl.addColorStop(0,'rgba(120,160,255,0)');hl.addColorStop(.5,'rgba(120,160,255,.35)');hl.addColorStop(1,'rgba(120,160,255,0)');ctx.fillStyle=hl;ctx.fillRect(0,FY-2,W,6);ctx.restore();
  bars(th);
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.7,[2,4]);vignette(.5);grain(.03)}};
