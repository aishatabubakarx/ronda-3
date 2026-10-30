C[13]=()=>{newTL();const cols=[[255,170,200],[170,190,255],[190,240,230],[255,220,170],[200,170,255],[150,220,255]],R=rng(1313);
 const bl=cols.map((c,i)=>({c,x:R()*W,y:R()*H,r:420+R()*380,m:1+(i%2),ph:R()*TAU,ax:200+R()*300,ay:120+R()*200}));
 const sh=[{c:'#ff7aa8',x:.22,y:.62,r:150,m:1,ph:0},{c:'#6a8cff',x:.55,y:.3,r:190,m:1,ph:2},{c:'#ffb86a',x:.8,y:.68,r:120,m:2,ph:4},{c:'#4fd6b8',x:.4,y:.8,r:100,m:2,ph:1}];
 const sc=offscreen(512,288),sx=sc.getContext('2d'),n=56,bw=W/n;
 draw=()=>{clear();const th=LOOP(now());ctx.fillStyle='#f6f2fb';ctx.fillRect(0,0,W,H);
  ctx.globalCompositeOperation='multiply';for(const b of bl){const a=th*b.m+b.ph,x=b.x+Math.cos(a)*b.ax,y=b.y+Math.sin(a)*b.ay,g=ctx.createRadialGradient(x,y,0,x,y,b.r);g.addColorStop(0,rgba(b.c,.95));g.addColorStop(.6,rgba(b.c,.35));g.addColorStop(1,rgba(b.c,0));ctx.fillStyle=g;ctx.fillRect(x-b.r,y-b.r,b.r*2,b.r*2)}
  ctx.globalCompositeOperation='source-over';for(const s of sh){const a=th*s.m+s.ph,x=s.x*W+Math.cos(a)*120,y=s.y*H+Math.sin(a)*70;const g=ctx.createRadialGradient(x-s.r*.3,y-s.r*.3,s.r*.1,x,y,s.r);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.25,s.c);g.addColorStop(1,s.c);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,s.r,0,TAU);ctx.fill()}
  /* reeded glass: each rib is a cylindrical lens -> flipped, compressed slice of what is behind it */
  sx.setTransform(1,0,0,1,0,0);sx.drawImage(cv,0,0,cv.width,cv.height,0,0,512,288);const kx=512/W,ky=288/H;
  const swp=((th/TAU*1)%1)*1.6-.3;
  for(let i=0;i<n;i++){const xc=(i+.5)*bw,ws=bw*2.7;ctx.save();ctx.beginPath();ctx.rect(i*bw,0,bw+.6,H);ctx.clip();ctx.translate(xc,0);ctx.scale(-1,1);ctx.drawImage(sc,(xc-ws/2)*kx,0,ws*kx,288,-bw/2-.3,0,bw+.6,H);ctx.restore();
   const g=ctx.createLinearGradient(i*bw,0,(i+1)*bw,0);g.addColorStop(0,'rgba(255,255,255,.32)');g.addColorStop(.18,'rgba(255,255,255,.05)');g.addColorStop(.62,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(30,40,100,.14)');ctx.fillStyle=g;ctx.fillRect(i*bw,0,bw+.5,H);
   const d=(i/n-swp),gl=Math.exp(-d*d/.004);if(gl>.02){ctx.fillStyle=`rgba(255,255,255,${.34*gl})`;ctx.fillRect(i*bw+bw*.18,0,bw*.22,H)}
   ctx.fillStyle='rgba(255,255,255,.6)';ctx.fillRect(i*bw,0,1.2,H);ctx.fillStyle='rgba(60,70,130,.13)';ctx.fillRect(i*bw+bw-1,0,1.2,H)}
  const tp=ctx.createLinearGradient(0,0,0,H);tp.addColorStop(0,'rgba(255,255,255,.22)');tp.addColorStop(.12,'rgba(255,255,255,0)');tp.addColorStop(.9,'rgba(60,70,130,0)');tp.addColorStop(1,'rgba(60,70,130,.12)');ctx.fillStyle=tp;ctx.fillRect(0,0,W,H);
  ctx.globalAlpha=1;vignette(.08);grain(.045,'overlay')}};
