C[10]=()=>{newTL();const L=110;
 const path=(t,th,s)=>[Math.cos(t)*420*s,Math.sin(t*2+th)*140*s,Math.sin(t)*260*s];
 const build=(th,wid,twm,s,ph)=>{const pts=[];for(let i=0;i<=L;i++){const t=TAU*i/L,p=path(t,th,s),q=path(t+.01,th,s),tg=[q[0]-p[0],q[1]-p[1],q[2]-p[2]],l=Math.hypot(...tg),tx=tg[0]/l,tz=tg[2]/l,tw=t*twm+th*1+ph,nx=-tz,nz=tx;const dx=Math.cos(tw)*nx*wid,dz=Math.cos(tw)*nz*wid,dy=Math.sin(tw)*wid;pts.push([[p[0]+dx,p[1]+dy,p[2]+dz],[p[0]-dx,p[1]-dy,p[2]-dz]])}
  const V=[],F=[];pts.forEach(pr=>{V.push(pr[0],pr[1])});for(let i=0;i<L;i++)F.push([i*2,i*2+1,i*2+3,i*2+2]);return{V,F}};
 draw=()=>{clear();const th=LOOP(now()),FY=H*.9;
  const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#f1f3f9');bg.addColorStop(.8,'#cdd5e6');bg.addColorStop(1,'#bcc6dc');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  const sb=ctx.createRadialGradient(W*.5,H*.3,0,W*.5,H*.3,800);sb.addColorStop(0,'rgba(255,255,255,.7)');sb.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sb;ctx.fillRect(0,0,W,H);
  const A=build(th,150,2,1,0),B=build(th,70,3,.74,1.2),M=G3.merge(A,B),pulse=fi=>{const i=fi<L?fi:fi-L,u=i/L,d=Math.abs(((u-th/TAU*1+.5)%1+1)%1-.5),p=Math.exp(-d*d/.006);return{a:1+2.4*p,h:u*.5+p*.2}};
  softShadow(W/2,FY,560,34,.22,'60,80,130',30);caustic(W/2+Math.sin(th)*90,FY,360,36,th/TAU,.3);caustic(W/2-Math.cos(th)*200,FY+8,200,24,th/TAU+.35,.22);
  glassMesh(M,{rot:[.35,.4+Math.sin(th)*.2,0],hue:th/TAU+.1,fa:.22,ea:.55,tint:[150,160,230],iri:1.4,light:true,off:1.6,f:1500,spec:.6,fx:pulse});
  vignette(.1);grain(.03,'overlay')}};
