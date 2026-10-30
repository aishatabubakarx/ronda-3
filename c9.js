C[9]=()=>{newTL();const nu=22,nv=10,V=[],F=[],R0=360,r0=130,R=rng(909);
 const mk=(r1)=>{const v=[],f=[];for(let i=0;i<nu;i++)for(let j=0;j<nv;j++){const u=TAU*i/nu,w=TAU*j/nv;v.push([(R0+r1*Math.cos(w))*Math.cos(u),r1*Math.sin(w),(R0+r1*Math.cos(w))*Math.sin(u)])}
  for(let i=0;i<nu;i++)for(let j=0;j<nv;j++){const a=i*nv+j,b=((i+1)%nu)*nv+j,c=((i+1)%nu)*nv+(j+1)%nv,d=i*nv+(j+1)%nv;f.push([a,b,c,d])}return{V:v,F:f}};
 const T=mk(r0),Core=mk(34),sparks=Array.from({length:70},()=>({m:1+((R()*3)|0),ph:R()*TAU,sg:R()<.5?1:-1,off:(R()-.5)*r0*1.6,h:R()})),dust=Array.from({length:200},()=>({x:R()*W,y:R()*H,ph:R()*TAU,k:1+((R()*3)|0)}));
 draw=()=>{clear();const th=LOOP(now());bgGrad('#05060c','#0c1424',1.1);orb(W*.7,H*.25,700,[20,140,200],.12);orb(W*.2,H*.8,700,[150,40,160],.1);
  ctx.globalCompositeOperation='lighter';for(const d of dust){ctx.globalAlpha=.1+.5*(.5+.5*Math.sin(th*d.k+d.ph))**4;ctx.fillStyle='#bcd2ff';ctx.fillRect(d.x,d.y,1.4,1.4)}ctx.globalAlpha=1;
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(120,160,255,.06)';for(let k=1;k<=5;k++){ctx.beginPath();ctx.ellipse(W/2,H/2,300+k*130,(300+k*130)*.42,0,0,TAU);ctx.stroke()}ctx.restore();
  const rot=[1.0+Math.sin(th)*.15,th*1,th*2],fxp=fi=>{const u=Math.floor(fi/nv)/nu,d=Math.abs(((u-th/TAU*1+.5)%1+1)%1-.5),p=Math.exp(-d*d/.004);return{a:1+1.8*p,h:p*.25}};
  glassMesh(T,{rot,hue:th/TAU,fa:.05,ea:.24,tint:[110,170,255],iri:1.6,off:1.6,f:1500,spec:.5,fx:fxp,streak:.5,glints:false});
  glassMesh(Core,{rot,hue:th/TAU+.3,fa:.04,ea:.32,tint:[200,220,255],iri:2,off:1.2,f:1500,glints:false,inset:1,ghost:0,fx:fxp});
  for(const s of sparks){const a=th*s.m*s.sg+s.ph,p=G3.rot([Math.cos(a)*(R0+s.off*.5),s.off*.4,Math.sin(a)*(R0+s.off*.5)],rot[0],rot[1],rot[2]),q=G3.pr(p,W/2,H/2,1500);orb(q[0],q[1],5+7*q[3],[120+((s.h*120)|0),170,255],.55*clamp(1-(p[2]+500)/1000,.2,1))}
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.75,[2,4]);vignette(.5);grain(.03)}};
