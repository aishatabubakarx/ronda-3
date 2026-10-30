C[20]=()=>{newTL();const R=rng(2020),D=Array.from({length:9},(_,i)=>({x:200+R()*(W-400),y:150+R()*(H-300),m:i<5?1:2,t0:i/9*1.0+R()*.05,R:380+R()*320}));
 const pet=Array.from({length:16},()=>({y:R()*H,x0:R(),m:1+((R()*2)|0),k:1+((R()*2)|0),ph:R()*TAU,s:10+R()*12})),sp=Array.from({length:40},()=>({x:R()*W,y:R()*H,ph:R()*TAU,k:1+((R()*3)|0)}));
 draw=()=>{clear();const th=LOOP(now()),u=th/TAU,un=now()/DUR;bgGrad('#c9f0f4','#5ebfd6',.8);
  field(200,112,(a,b)=>{const n=lnoise(a*3.2,b*1.9,th,1)*.5+.5;const c=Math.pow(1-Math.abs(lnoise(a*4.5,b*2.6,th*2,.8)),6),c2=Math.pow(1-Math.abs(lnoise(a*9,b*5.2,th*3,.6)),8);const k=c+.5*c2;return[200*k+n*30,235*k+n*40,245*k+n*40]},.1,'lighter');
  for(const p of pet){const x=((p.x0+un*p.m)%1)*(W+200)-100,y=p.y+Math.sin(th*p.k+p.ph)*30;ctx.save();ctx.translate(x,y);ctx.rotate(th*p.k+p.ph);ctx.fillStyle='rgba(40,110,150,.15)';ctx.beginPath();ctx.ellipse(6,8,p.s,p.s*.55,0,0,TAU);ctx.fill();const g=ctx.createLinearGradient(-p.s,0,p.s,0);g.addColorStop(0,'rgba(255,235,240,.95)');g.addColorStop(1,'rgba(255,170,200,.95)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,p.s,p.s*.55,0,0,TAU);ctx.fill();ctx.restore()}
  for(const d of D){for(let k=0;k<4;k++){const age=((u*d.m+d.t0+k*.065)%1),r=age*d.R,al=Math.pow(1-age,1.6)*(1-k*.18);if(r<4)continue;
    /* real refraction: re-draw the water behind the wavefront, magnified, inside the ring band */
    const bw=7+10*(1-age),p=new Path2D();p.ellipse(d.x,d.y,r+bw,(r+bw)*.78,0,0,TAU);p.ellipse(d.x,d.y,Math.max(1,r-bw),Math.max(1,(r-bw)*.78),0,0,TAU);
    ctx.save();ctx.clip(p,'evenodd');ctx.globalAlpha=Math.min(1,al*1.2);ctx.translate(d.x,d.y);ctx.scale(1.09,1.09);ctx.translate(-d.x,-d.y);ctx.drawImage(cv,0,0,cv.width,cv.height,0,0,W,H);ctx.restore();
    ctx.save();ctx.translate(d.x,d.y);ctx.scale(1,.78);
    ctx.lineWidth=5+8*(1-age);ctx.globalCompositeOperation='multiply';ctx.strokeStyle=`rgba(30,100,160,${.6*al})`;ctx.beginPath();ctx.arc(2,3,r,0,TAU);ctx.stroke();
    ctx.globalCompositeOperation='source-over';ctx.lineWidth=3;ctx.strokeStyle=`rgba(255,255,255,${al})`;ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.stroke();
    ctx.globalCompositeOperation='multiply';ctx.lineWidth=1.4;[['#ff6a9a',-1.6],['#5affb4',0],['#6a9aff',1.6]].forEach(([c,o])=>{ctx.strokeStyle=c;ctx.globalAlpha=.4*al;ctx.beginPath();ctx.arc(0,0,r+o*1.5,0,TAU);ctx.stroke()});ctx.restore();
    if(k===0&&age<.07){ctx.save();ctx.translate(d.x,d.y);ctx.fillStyle=`rgba(255,255,255,${(.07-age)*14})`;for(let q=0;q<7;q++){const a=TAU*q/7+.4,rr=age*900+8,hh=Math.sin(age/.07*Math.PI)*34;ctx.beginPath();ctx.arc(Math.cos(a)*rr,Math.sin(a)*rr*.78-hh,3.2,0,TAU);ctx.fill()}ctx.restore()}}}
  ctx.save();ctx.globalCompositeOperation='lighter';for(const s of sp){const tw=Math.max(0,Math.sin(th*s.k+s.ph))**8;if(tw>.1){flare(s.x,s.y,8+tw*16,tw*.9,'#ffffff')}}ctx.restore();
  ctx.globalAlpha=1;vignette(.2);grain(.03,'overlay')}};
