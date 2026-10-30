C[5]=()=>{newTL();const R=rng(505),COL=[[255,170,70],[255,90,120],[80,160,255],[255,230,160],[120,220,255]];
 const B=Array.from({length:30},(_,i)=>({x:R()*W,y:R()*H,r:40+R()*130,c:COL[i%5],m:1+((R()*2)|0),ph:R()*TAU,a:.3+R()*.5}));
 const D=Array.from({length:95},()=>({x:R()*W,y:R()*H,r:12+R()*R()*30,ph:R()*TAU})),Q=Array.from({length:14},()=>({x:80+R()*(W-160),y0:R(),r:9+R()*10,m:R()<.6?1:2,len:90+R()*190}));
 let bp=[];
 const drop=(x,y,r,k=1)=>{ctx.save();ctx.beginPath();ctx.ellipse(x,y,r*.86,r,0,0,TAU);ctx.clip();ctx.fillStyle=`rgba(4,8,20,${.28*k})`;ctx.fillRect(x-r,y-r,r*2,r*2);
  /* inverted miniature of the bokeh scene inside the drop = refraction */
  ctx.globalCompositeOperation='lighter';const s=r/520;for(let i=0;i<B.length;i++){const b=B[i],p=bp[i],mx=x-(p[0]-x)*s*2.2,my=y-(p[1]-y)*s*2.2,rr=Math.max(2,b.r*s*3.2);ctx.fillStyle=rgba(b.c,Math.min(.95,.9*k*b.a*1.8));ctx.beginPath();ctx.arc(mx,my,rr,0,TAU);ctx.fill()}
  const rg=ctx.createRadialGradient(x,y,r*.5,x,y,r);rg.addColorStop(0,'rgba(0,0,0,0)');rg.addColorStop(1,`rgba(0,0,0,${.6*k})`);ctx.globalCompositeOperation='source-over';ctx.fillStyle=rg;ctx.fillRect(x-r,y-r,r*2,r*2);
  ctx.globalCompositeOperation='lighter';const lg=ctx.createRadialGradient(x+r*.1,y+r*.85,0,x+r*.1,y+r*.85,r*.7);lg.addColorStop(0,`rgba(255,235,200,${.35*k})`);lg.addColorStop(1,'rgba(255,235,200,0)');ctx.fillStyle=lg;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore();
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(200,220,255,${.4*k})`;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(x,y,r*.86,r,0,0,TAU);ctx.stroke();ctx.fillStyle=`rgba(255,255,255,${.9*k})`;ctx.beginPath();ctx.ellipse(x-r*.3,y-r*.45,Math.max(1,r*.2),Math.max(.8,r*.11),-.5,0,TAU);ctx.fill();ctx.globalAlpha=.5*k;ctx.beginPath();ctx.arc(x+r*.38,y+r*.4,Math.max(.6,r*.07),0,TAU);ctx.fill();ctx.restore()};
 draw=()=>{clear();const th=LOOP(now()),u=now()/DUR;bgGrad('#050a18','#101a33',1.4);
  bp=B.map(b=>{const a=th*b.m+b.ph;return[b.x+Math.cos(a)*60,b.y+Math.sin(a)*40]});
  B.forEach((b,i)=>bokeh(bp[i][0],bp[i][1],b.r*.95,b.c,b.a*.7*(.75+.25*Math.sin(th*2+b.ph))));
  field(160,90,(a,b)=>{const n=lnoise(a*4,b*2.4,th,1)*.5+.5,m=lnoise(a*9+3,b*5,th*2,.7)*.5+.5;const c=Math.pow(n,2)*.7+Math.pow(m,3)*.3;return[c*70,c*85,c*110]},.55,'lighter');
  ctx.fillStyle='rgba(190,210,255,.04)';ctx.fillRect(0,0,W,H);
  for(const q of Q){const y=((q.y0+u*q.m)%1)*(H+300)-150;const gr=ctx.createLinearGradient(0,y-q.len,0,y);gr.addColorStop(0,'rgba(190,210,255,0)');gr.addColorStop(1,'rgba(190,210,255,.16)');ctx.fillStyle=gr;ctx.fillRect(q.x-q.r*.4,y-q.len,q.r*.8,q.len);ctx.fillStyle='rgba(255,255,255,.07)';ctx.fillRect(q.x-q.r*.4,y-q.len,1.2,q.len)}
  for(const d of D)drop(d.x,d.y,d.r*(1+.03*Math.sin(th*2+d.ph)),.95);
  for(const q of Q){const y=((q.y0+u*q.m)%1)*(H+300)-150;drop(q.x,y,q.r,1)}
  ctx.globalAlpha=1;bloom(.55,[2,4]);vignette(.5);grain(.03)}};
