C[1]=()=>{newTL();const R=rng(101),M=[G3.octa(120),G3.ico(96),G3.prism(6,64,170)];
 const O=Array.from({length:15},(_,i)=>({m:R()<.5?1:2,ph:R()*TAU,rad:230+R()*500,y:(R()-.5)*480,s:.38+R()*1.15,hue:R(),ax:1+((R()*2)|0),ay:1+((R()*3)|0),sg:R()<.5?1:-1,k:i%3}));
 const dust=Array.from({length:420},()=>({x:R()*W,y:R()*H,z:R(),ph:R()*TAU,k:1+((R()*3)|0)}));
 const rings=[[760,230,.3,.2],[560,170,-.45,.1],[930,300,.15,.0]];
 draw=()=>{clear();const th=LOOP(now());bgGrad('#03040a','#0b0b1f',.9);
  orb(W*.27,H*.36,720,[40,70,210],.17+.05*Math.sin(th));orb(W*.76,H*.68,820,[130,40,180],.15+.05*Math.cos(th));orb(W*.5,H*.5,520,[20,150,160],.08+.04*Math.sin(th*2));
  ctx.save();ctx.globalCompositeOperation='lighter';[[.18,.0],[.55,.5],[.82,1]].forEach(([x,ph],i)=>{const g=ctx.createLinearGradient(0,0,W*.3,H);g.addColorStop(0,`rgba(120,140,255,${.05+.025*Math.sin(th*2+ph*3)})`);g.addColorStop(1,'rgba(120,140,255,0)');ctx.save();ctx.translate(W*x,-100);ctx.rotate(.45);ctx.fillStyle=g;ctx.fillRect(-90,0,180,H*1.6);ctx.restore()});ctx.restore();
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineWidth=1;for(const[rx,ry,tl,ph]of rings){ctx.strokeStyle='rgba(150,180,255,.07)';ctx.beginPath();ctx.ellipse(W/2,H/2,rx*1.25,ry*1.25,tl,0,TAU);ctx.stroke()}ctx.restore();
  ctx.globalCompositeOperation='lighter';for(const d of dust){const tw=.15+.6*(.5+.5*Math.sin(th*d.k+d.ph))**3;if(d.z>.93){ctx.globalAlpha=tw*.35;const r=7+d.z*10;ctx.fillStyle='#9fb6ff';ctx.beginPath();ctx.arc(d.x,d.y,r,0,TAU);ctx.fill()}else{ctx.globalAlpha=tw;ctx.fillStyle='#cfe2ff';ctx.fillRect(d.x,d.y,.6+d.z*1.6,.6+d.z*1.6)}}ctx.globalAlpha=1;
  const L=O.map(o=>{const a=th*o.m*o.sg+o.ph;return{o,x:Math.cos(a)*o.rad*1.25,z:Math.sin(a)*o.rad*.9,y:o.y+Math.sin(th*2+o.ph)*26}}).sort((a,b)=>b.z-a.z);
  for(const l of L){const o=l.o,dz=l.z/700,dp=clamp(1-(l.z+700)/1400,.3,1),bl=Math.max(0,(dz-.3)*7)+Math.max(0,(-dz-.5)*10);
   glassMesh(M[o.k],{rot:[th*o.ax+o.ph,th*o.ay*o.sg+o.ph*2,th+o.ph],pos:[l.x,l.y,l.z],hue:o.hue+th/TAU,fa:.2*dp,ea:.7*dp,streak:.45,glints:false,tint:[120,170,255],iri:1,sc:o.s,off:1.8+3*(1-dp),blur:bl})}
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.8,[2,4]);vignette(.5);grain(.03)}};
