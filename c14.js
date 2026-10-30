C[14]=()=>{newTL();const hx=70,cols=34,rows=14,hw=Math.sqrt(3)*hx,R=rng(1414);
 const hash=(i,j)=>{let h=(i*374761393+j*668265263)^0x5bd1e995;h=Math.imul(h^h>>>13,1274126177);return((h^h>>>16)>>>0)/4294967296};
 const hexP=(x,y,r)=>{const p=new Path2D();for(let k=0;k<6;k++){const a=TAU*k/6+Math.PI/6;k?p.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r):p.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}p.closePath();return p};
 const pt=Array.from({length:90},()=>({x:R()*W,y0:R(),m:1+((R()*2)|0),s:1+R()*2.4,ph:R()*TAU}));
 draw=()=>{clear();const th=LOOP(now()),u=th/TAU;bgGrad('#030813','#0a1c3c',1.1);orb(W/2,H/2,900,[40,100,230],.13);
  const bands=[((u*2)%1)*2.4-.7,((u*2+.5)%1)*2.4-.7].map(v=>v*W),pr=((u*1)%1)*W*1.1;
  for(let j=-1;j<rows;j++)for(let i=-1;i<cols;i++){const x=i*hw+(j&1?hw/2:0)+20,y=j*hx*1.5+20;if(x>W+hw||y>H+hx)continue;const hv=hash(i,j);
   const b=Math.max(...bands.map(sx=>{const d=Math.abs((x-sx)-(y-H/2)*.35);return Math.exp(-d*d/(2*190*190))})),dc=Math.hypot(x-W/2,(y-H/2)*1.3),pw=Math.exp(-Math.pow(dc-pr,2)/(2*70*70)),tw=Math.pow(.5+.5*Math.sin(th*(1+((hv*3)|0))+hv*TAU),6)*.5,lv=Math.min(1,.1+.9*b+.5*pw),pulse=.5+.5*Math.sin(th*2+x*.004-y*.003);
   const p=hexP(x,y,hx*.93);ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(x-hx,y-hx,x+hx,y+hx);g.addColorStop(0,irid(.58+hv*.12,58,.12+.3*lv+.1*tw));g.addColorStop(1,irid(.74+hv*.1,54,.07+.2*lv+.06*tw));ctx.fillStyle=g;ctx.fill(p);
   if(pw>.1){ctx.fillStyle=`rgba(120,200,255,${.25*pw})`;ctx.fill(hexP(x,y,hx*.55))}
   ctx.lineWidth=1.3;ctx.strokeStyle=`rgba(140,200,255,${.2+.1*pulse+.7*lv})`;ctx.stroke(p);
   const ip=hexP(x,y,hx*.74);ctx.lineWidth=.8;ctx.strokeStyle=`rgba(150,190,255,${.1+.25*lv})`;ctx.stroke(ip);
   for(let k=0;k<6;k++){const a0=TAU*k/6+Math.PI/6,a1=TAU*(k+1)/6+Math.PI/6,na=(a0+a1)/2,fc=Math.cos(na-(-2.35)),r=hx*.93;if(fc>.45){ctx.strokeStyle=`rgba(230,245,255,${(fc-.45)*(.55+.5*lv)})`;ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(x+Math.cos(a0)*r,y+Math.sin(a0)*r);ctx.lineTo(x+Math.cos(a1)*r,y+Math.sin(a1)*r);ctx.stroke()}}
   if(lv>.25)chromEdge(p,1,1.6*lv+.4,.35*lv);if(tw>.3){flare(x+hx*.4,y-hx*.4,10+tw*14,tw*.8,'#cfe8ff')}ctx.restore()}
  ctx.save();ctx.globalCompositeOperation='lighter';for(const q of pt){const y=H-((q.y0+u*q.m)%1)*H;ctx.globalAlpha=.5*(.5+.5*Math.sin(th*2+q.ph));ctx.fillStyle='#9fd0ff';ctx.fillRect(q.x+Math.sin(th*q.m+q.ph)*14,y,q.s,q.s)}ctx.restore();
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.7,[2,4]);vignette(.5);grain(.03)}};
