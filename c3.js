C[3]=()=>{newTL();const R=rng(303),orbs=Array.from({length:9},(_,i)=>({x:R()*W,y:R()*H,r:260+R()*320,c:[[255,90,150],[90,120,255],[255,170,70],[120,60,220],[40,200,230]][i%5],m:1+((R()*2)|0),ph:R()*TAU,a:.5+R()*.4}));
 const P=[{x:.2,y:.28,w:640,h:400,m:1,ph:0},{x:.62,y:.55,w:760,h:470,m:1,ph:2.1},{x:.82,y:.2,w:330,h:260,m:2,ph:4}],FP=mkFrost(3);
 const sph=Array.from({length:6},(_,i)=>({x:R()*W,y:R()*H,r:26+R()*44,m:1+(i%2),ph:R()*TAU,h:R()}));
 const scene=(th,dx,dy,k)=>{for(const o of orbs){const a=th*o.m+o.ph;sorb(o.x+Math.cos(a)*160*k+dx,o.y+Math.sin(a)*120*k+dy,o.r,o.c,o.a*.6)}};
 draw=()=>{clear();const th=LOOP(now());bgGrad('#1d1458','#a42d7b',.8);scene(th,0,0,1);
  for(const s of sph){const a=th*s.m+s.ph,x=s.x+Math.cos(a)*70,y=s.y+Math.sin(a)*50,g=ctx.createRadialGradient(x-s.r*.3,y-s.r*.35,s.r*.05,x,y,s.r);g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(.6,irid(s.h+th/TAU,70,.14));g.addColorStop(1,irid(s.h+.3+th/TAU,62,.45));ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,s.r,0,TAU);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=1.3;ctx.stroke()}
  for(const p of P){const x=p.x*W+Math.sin(th*p.m+p.ph)*70,y=p.y*H+Math.cos(th*p.m+p.ph)*34,L=x-p.w/2,T=y-p.h/2;
   for(let k=0;k<5;k++){ctx.fillStyle=`rgba(25,5,70,${.07})`;roundRect(L+10-k*7,T+34-k*7,p.w+k*14,p.h+k*14,38+k*7);ctx.fill()}
   ctx.save();roundRect(L,T,p.w,p.h,38);ctx.clip();bgGrad('#1d1458','#a42d7b',.8);scene(th,-(x-W/2)*.06,-(y-H/2)*.06,1.05);
   ctx.globalCompositeOperation='source-over';const g=ctx.createLinearGradient(L,T,L+p.w,T+p.h);g.addColorStop(0,'rgba(255,255,255,.30)');g.addColorStop(.5,'rgba(255,255,255,.12)');g.addColorStop(1,'rgba(255,255,255,.22)');ctx.fillStyle=g;ctx.fillRect(L,T,p.w,p.h);
   ctx.globalCompositeOperation='overlay';ctx.globalAlpha=.3;ctx.fillStyle=FP;ctx.fillRect(L,T,p.w,p.h);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
   const u=((th/TAU*2)%1),sx=L+u*p.w*2.2-p.w*.6,sw=ctx.createLinearGradient(sx,0,sx+p.w*.6,0);sw.addColorStop(0,'rgba(255,255,255,0)');sw.addColorStop(.5,'rgba(255,255,255,.2)');sw.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sw;ctx.fillRect(L,T,p.w,p.h);
   ctx.restore();
   /* refracted rim band: magnified scene re-drawn inside the outer 20px of the panel */
   ctx.save();const rp=new Path2D();rp.roundRect(L,T,p.w,p.h,38);rp.roundRect(L+20,T+20,p.w-40,p.h-40,24);ctx.clip(rp,'evenodd');ctx.translate(x,y);ctx.scale(1.14,1.14);ctx.translate(-x,-y);scene(th,-(x-W/2)*.06,-(y-H/2)*.06,1.05);ctx.restore();
   roundRect(L,T,p.w,p.h,38);const bg=ctx.createLinearGradient(L,T,L+p.w,T+p.h);bg.addColorStop(0,'rgba(255,255,255,.9)');bg.addColorStop(.35,'rgba(255,255,255,.12)');bg.addColorStop(.7,'rgba(255,255,255,.1)');bg.addColorStop(1,'rgba(255,255,255,.6)');ctx.strokeStyle=bg;ctx.lineWidth=2.2;ctx.stroke();
   roundRect(L+7,T+7,p.w-14,p.h-14,32);ctx.strokeStyle='rgba(255,255,255,.14)';ctx.lineWidth=1;ctx.stroke();
   ctx.save();ctx.globalCompositeOperation='lighter';flare(L+34,T+30,26,.6);flare(L+p.w-34,T+p.h-30,18,.4);ctx.restore();ctx.globalAlpha=1}
  ctx.globalAlpha=1;bloom(.25,[3,5]);vignette(.3);grain(.03)}};
