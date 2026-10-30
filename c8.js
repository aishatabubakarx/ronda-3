C[8]=()=>{newTL();const R=rng(808),n=8,V=[],F=[];
 const gr=300,tb=170,ch=-95,ph=230;V.push([0,ch-60,0]);
 for(let i=0;i<n;i++){const a=TAU*i/n;V.push([Math.cos(a)*tb,ch-60,Math.sin(a)*tb])}
 for(let i=0;i<n;i++){const a=TAU*(i+.5)/n;V.push([Math.cos(a)*gr,ch+55,Math.sin(a)*gr])}
 V.push([0,ph,0]);const tip=2*n+1;
 for(let i=0;i<n;i++){const t0=1+i,t1=1+(i+1)%n,g0=n+1+i,gp=n+1+(i+n-1)%n;F.push([t0,t1,g0]);F.push([t0,gp,g0]);F.push([t0,0,t1])}
 for(let i=0;i<n;i++){const g0=n+1+i,g1=n+1+(i+1)%n;F.push([g0,g1,tip]);F.push([g0,g1,1+(i+1)%n])}
 const gem={V,F},sp=Array.from({length:90},()=>({a:R()*TAU,d:200+R()*560,ph:R()*TAU,k:1+((R()*3)|0),s:8+R()*28,h:R()}));
 const FY=H*.84,G=(th,fy)=>glassMesh(gem,{rot:[.35+Math.sin(th)*.12,th*1,0],pos:[0,0,0],hue:th/TAU*2,fa:.09,ea:.6,tint:[150,180,255],iri:2.2,off:2.6,spec:.5,f:1500});
 draw=()=>{clear();const th=LOOP(now());bgGrad('#020205','#0a0816',1);orb(W/2,H*.48,820,[90,70,190],.18+.05*Math.sin(th*2));
  /* glossy floor reflection */
  ctx.save();ctx.beginPath();ctx.rect(0,FY,W,H-FY);ctx.clip();ctx.translate(0,FY*2-H*0.0);ctx.scale(1,-1);ctx.globalAlpha=.22;G(th);ctx.restore();
  const fg=ctx.createLinearGradient(0,FY,0,H);fg.addColorStop(0,'rgba(8,6,20,.35)');fg.addColorStop(1,'rgba(3,3,8,1)');ctx.fillStyle=fg;ctx.fillRect(0,FY,W,H-FY);
  ctx.save();ctx.globalCompositeOperation='lighter';const hl=ctx.createLinearGradient(0,FY-2,0,FY+3);hl.addColorStop(0,'rgba(150,170,255,0)');hl.addColorStop(.5,'rgba(150,170,255,.25)');hl.addColorStop(1,'rgba(150,170,255,0)');ctx.fillStyle=hl;ctx.fillRect(0,FY-2,W,6);
  /* spectral fire rays */
  const cx=W/2,cy=H*.48;for(let k=0;k<18;k++){const a=TAU*k/18+th*1,L=520+120*Math.sin(th*3+k),al=Math.pow(Math.max(0,Math.sin(th*3+k*1.3)),3)*.38;if(al<.02)continue;const x2=cx+Math.cos(a)*L*1.25,y2=cy+Math.sin(a)*L*.7;const gg=ctx.createLinearGradient(cx,cy,x2,y2);gg.addColorStop(0,irid(k/18+th/TAU,70,al));gg.addColorStop(1,irid(k/18+th/TAU,70,0));ctx.fillStyle=gg;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x2+Math.sin(a)*9,y2-Math.cos(a)*9);ctx.lineTo(x2-Math.sin(a)*9,y2+Math.cos(a)*9);ctx.closePath();ctx.fill()}ctx.restore();
  /* satellites */
  const sats=[0,1,2,3,4,5].map(i=>{const a=th*(i%2?-1:1)*(1+(i%3>1?1:0))+i*1.05;return{x:Math.cos(a)*(560+i*30),y:Math.sin(a)*190-30,z:Math.sin(a)*300,i}}).sort((a,b)=>b.z-a.z);
  for(const s of sats)if(s.z>0)glassMesh(gem,{rot:[.3,th*2+s.i,0],pos:[s.x,s.y,s.z],hue:th/TAU*2+s.i*.2,fa:.04,ea:.22,iri:2,sc:.14+.02*s.i%3,f:1500,blur:1.8,glints:false});
  glassMesh(gem,{rot:[.35+Math.sin(th)*.12,th*1,0],pos:[0,0,0],hue:th/TAU*2,fa:.09,ea:.6,tint:[150,180,255],iri:2.2,off:2.6,spec:.5,f:1500});
  for(const s of sats)if(s.z<=0)glassMesh(gem,{rot:[.3,th*2+s.i,0],pos:[s.x,s.y,s.z],hue:th/TAU*2+s.i*.2,fa:.04,ea:.22,iri:2,sc:.14+.02*s.i%3,f:1500,blur:Math.max(0,-s.z/80),glints:false});
  ctx.globalCompositeOperation='lighter';for(const s of sp){const tw=Math.max(0,Math.sin(th*s.k+s.ph))**10;if(tw<.05)continue;const x=cx+Math.cos(s.a)*s.d*1.25,y=cy+Math.sin(s.a)*s.d*.62;flare(x,y,s.s*(.5+tw),tw,'#ffffff');flare(x,y,s.s*.5*tw,tw*.9,'#bfe0ff');flare(x,y,s.s*.9*tw,tw*.25,irid(s.h,70))}
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.85,[2,4]);vignette(.55);grain(.03)}};
