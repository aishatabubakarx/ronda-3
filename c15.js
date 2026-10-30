C[15]=()=>{newTL();const ring=(r,seg,t)=>{const V=[],F=[];for(let i=0;i<seg;i++){const a=TAU*i/seg;for(let j=0;j<4;j++){const b=TAU*j/4;V.push([(r+t*Math.cos(b))*Math.cos(a),t*Math.sin(b),(r+t*Math.cos(b))*Math.sin(a)])}}
  for(let i=0;i<seg;i++)for(let j=0;j<4;j++){const a=i*4+j,b=((i+1)%seg)*4+j,c=((i+1)%seg)*4+(j+1)%4,d=i*4+(j+1)%4;F.push([a,b,c,d])}return{V,F}};
 const RS=[430,340,250],rs=RS.map(r=>ring(r,64,16)),core=G3.ico(62),R=rng(1515),st=Array.from({length:240},()=>({x:R()*W,y:R()*H,ph:R()*TAU,k:1+((R()*3)|0)}));
 const bead=[[1,0],[2,2.1],[1,4.2]];
 draw=()=>{clear();const th=LOOP(now());bgGrad('#020306','#0b0d1a',1);orb(W/2,H/2,650,[70,90,220],.14+.04*Math.sin(th*2));
  ctx.globalCompositeOperation='lighter';for(const s of st){ctx.globalAlpha=.1+.5*(.5+.5*Math.sin(th*s.k+s.ph))**4;ctx.fillStyle='#dfe8ff';ctx.fillRect(s.x,s.y,1.5,1.5)}ctx.globalAlpha=1;
  ctx.save();ctx.translate(W/2,H/2);ctx.scale(1,.34);ctx.rotate(th*1);ctx.strokeStyle='rgba(150,180,255,.25)';for(let k=0;k<120;k++){const a=TAU*k/120,r1=640,r2=k%5?655:676;ctx.lineWidth=k%5?1:2;ctx.beginPath();ctx.moveTo(Math.cos(a)*r1,Math.sin(a)*r1);ctx.lineTo(Math.cos(a)*r2,Math.sin(a)*r2);ctx.stroke()}ctx.restore();
  const A=[[th*1,th*2,0],[th*-2,0,th*1+1],[0,th*3,th*-1]];
  rs.forEach((m,i)=>{const rot=[.4+A[i][0],A[i][1]+.2,A[i][2]];glassMesh(m,{rot,hue:i*.3+th/TAU,fa:.14,ea:.34,tint:[130,170,255],iri:1.6,off:2.6,f:1500,spec:.5,streak:.5,glints:false});
   for(let b=0;b<2;b++){const [mm,ph]=bead[i];for(let k=0;k<14;k++){const a=th*mm*(b?-1:1)+ph+b*3.1-k*.055,p=G3.rot([Math.cos(a)*RS[i],0,Math.sin(a)*RS[i]],rot[0],rot[1],rot[2]),q=G3.pr(p,W/2,H/2,1500);orb(q[0],q[1],(k?4:13)*q[3],[150+((i*50)|0),190,255],(1-k/14)*.9)}}});
  glassMesh(core,{rot:[th*2,th*3,th],hue:th/TAU,fa:.3,ea:.8,tint:[160,190,255],iri:1.5,f:1500,streak:.6});orb(W/2,H/2,160,[120,150,255],.38);
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.8,[2,4]);vignette(.5);grain(.03)}};
