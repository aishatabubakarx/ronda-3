C[19]=()=>{newTL();const R=rng(1919);
 const stellar=()=>{const p=new Path2D();for(let a=0;a<6;a++){const c=Math.cos(TAU*a/6),s=Math.sin(TAU*a/6);p.moveTo(0,0);p.lineTo(c,s);for(const f of[.35,.58,.8]){const bx=c*f,by=s*f,l=.26-f*.14;for(const sg of[-1,1]){const aa=TAU*a/6+sg*.95;p.moveTo(bx,by);p.lineTo(bx+Math.cos(aa)*l,by+Math.sin(aa)*l)}}}return p};
 const plate=()=>{const p=new Path2D(),hex=(r,rot=0)=>{for(let k=0;k<6;k++){const a=TAU*k/6+rot;k?p.lineTo(Math.cos(a)*r,Math.sin(a)*r):p.moveTo(Math.cos(a)*r,Math.sin(a)*r)}p.closePath()};hex(.92);hex(.62);hex(.3);for(let a=0;a<6;a++){const c=Math.cos(TAU*a/6),s=Math.sin(TAU*a/6);p.moveTo(c*.3,s*.3);p.lineTo(c*.92,s*.92)}return p};
 const fork=()=>{const p=new Path2D();for(let a=0;a<6;a++){const c=Math.cos(TAU*a/6),s=Math.sin(TAU*a/6);p.moveTo(0,0);p.lineTo(c,s);for(const f of[.5,.75,1]){const bx=c*f,by=s*f,l=.22;for(const sg of[-1,1]){const aa=TAU*a/6+sg*.6;p.moveTo(bx,by);p.lineTo(bx+Math.cos(aa)*l,by+Math.sin(aa)*l)}}}return p};
 const FP=[stellar(),plate(),fork()],fill=(()=>{const p=new Path2D();for(let k=0;k<6;k++){const a=TAU*k/6;k?p.lineTo(Math.cos(a)*.92,Math.sin(a)*.92):p.moveTo(Math.cos(a)*.92,Math.sin(a)*.92)}p.closePath();return p})();
 const F=Array.from({length:76},()=>{const z=R();return{x:R()*W,y0:R(),z,s:z<.08?120:z<.35?52:14+R()*16,m:z<.35?1:(z<.7?2:3),ph:R()*TAU,sw:30+R()*70,rk:R()<.5?1:-1,t:(R()*3)|0}}).sort((a,b)=>a.z-b.z);
 const far=Array.from({length:120},()=>({x:R()*W,y0:R(),s:1+R()*2,m:1+((R()*3)|0),ph:R()*TAU}));
 draw=()=>{clear();const th=LOOP(now()),u=now()/DUR;bgGrad('#030b1c','#0d2750',1.3);orb(W*.5,H*.4,900,[50,110,220],.12);
  ctx.save();ctx.globalCompositeOperation='lighter';[[.3,[40,200,170]],[.7,[120,90,220]]].forEach(([x,c],i)=>{ctx.save();ctx.translate(W*x+Math.sin(th+i*2)*60,H*.12);ctx.scale(1,1.7);sorb(0,0,430,c,.16+.05*Math.sin(th+i*2));ctx.restore()});ctx.restore();
  ctx.globalCompositeOperation='lighter';for(const f of far){const y=((f.y0+u*f.m)%1)*(H+40)-20,x=f.x+Math.sin(th*f.m+f.ph)*18;ctx.globalAlpha=.4;ctx.fillStyle='#cfe4ff';ctx.beginPath();ctx.arc(x,y,f.s,0,TAU);ctx.fill()}ctx.globalAlpha=1;
  for(const f of F){const y=((f.y0+u*f.m)%1)*(H+300)-150,x=f.x+Math.sin(th*f.m+f.ph)*f.sw,rot=th*f.rk+f.ph,big=f.s>40,soft=f.z<.08,a=big?.9:.7*(.5+f.z*.5);
   ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(f.s,f.s);ctx.globalCompositeOperation='lighter';
   const w=Math.max(.8,(big?3.2:1.8))/f.s,wb=soft?w*4:w;ctx.lineCap='round';
   if(f.t===1&&big){const g=ctx.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,'rgba(170,210,255,.05)');g.addColorStop(1,'rgba(170,210,255,.2)');ctx.fillStyle=g;ctx.fill(fill)}
   if(big&&!soft)[['#ff4d7a',-.012],['#4dffb0',0],['#4d86ff',.012]].forEach(([c,o])=>{ctx.save();ctx.translate(o,o*.5);ctx.strokeStyle=c;ctx.globalAlpha=.4;ctx.lineWidth=w*1.4;ctx.stroke(FP[f.t]);ctx.restore()});
   ctx.strokeStyle='rgba(150,200,255,1)';ctx.globalAlpha=a*(soft?.25:.35);ctx.lineWidth=wb*3;ctx.stroke(FP[f.t]);ctx.strokeStyle='#f2f8ff';ctx.globalAlpha=a*(soft?.5:1);ctx.lineWidth=wb;ctx.stroke(FP[f.t]);
   if(big&&!soft){ctx.globalAlpha=1;for(let k=0;k<6;k+=1){const tw=Math.max(0,Math.sin(th*2+f.ph+k))**8;if(tw>.1)flare(Math.cos(TAU*k/6),Math.sin(TAU*k/6),.12+.1*tw,tw,'#ffffff')}}
   ctx.restore()}
  const fog=ctx.createLinearGradient(0,H*.75,0,H);fog.addColorStop(0,'rgba(150,190,255,0)');fog.addColorStop(1,'rgba(150,190,255,.16)');ctx.globalCompositeOperation='lighter';ctx.fillStyle=fog;ctx.fillRect(0,H*.75,W,H*.25);
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.7,[2,4]);vignette(.5);grain(.03)}};
