C[16]=()=>{newTL();const R=rng(1616),sp=Array.from({length:70},()=>({a:R()*TAU,d:R()**.5,ph:R()*TAU,k:1+((R()*3)|0),z:R()}));
 const mo=Array.from({length:44},()=>({a:R()*TAU,d:1.05+R()*.7,ph:R()*TAU,k:1+((R()*3)|0)}));const cx=W/2,cy=H*.43,r=330,N=300;
 const inner=offscreen(N,N),ix=inner.getContext('2d');
 draw=()=>{clear();const th=LOOP(now());bgGrad('#03040a','#0a0c1c',1.2);orb(cx,cy,820,[70,60,180],.13);
  /* pedestal: dark bronze cradle with lit rim */
  const py=cy+r*.9;ctx.save();ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.ellipse(cx,py+175,r*.95,34,0,0,TAU);ctx.fill();
  const bg2=ctx.createLinearGradient(cx-r*.7,0,cx+r*.7,0);bg2.addColorStop(0,'#1a1208');bg2.addColorStop(.3,'#6a4d22');bg2.addColorStop(.5,'#c79a4e');bg2.addColorStop(.7,'#5a3f1c');bg2.addColorStop(1,'#140d06');
  ctx.fillStyle=bg2;ctx.beginPath();ctx.moveTo(cx-r*.5,py+30);ctx.lineTo(cx+r*.5,py+30);ctx.lineTo(cx+r*.78,py+150);ctx.lineTo(cx-r*.78,py+150);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.ellipse(cx,py+150,r*.78,22,0,0,Math.PI);ctx.fill();ctx.fillStyle=bg2;ctx.beginPath();ctx.ellipse(cx,py+22,r*.56,20,0,0,TAU);ctx.fill();ctx.strokeStyle='rgba(255,220,150,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(cx,py+22,r*.56,20,0,Math.PI,TAU);ctx.stroke();
  ctx.fillStyle='rgba(255,230,170,.18)';ctx.fillRect(cx-8,py+34,16,112);ctx.restore();
  const d=ix.createImageData(N,N);for(let j=0;j<N;j++)for(let i=0;i<N;i++){let px=(i/N-.5)*2,py2=(j/N-.5)*2;const rr=Math.hypot(px,py2),o=(j*N+i)*4;if(rr>1){d.data[o+3]=0;continue}
    const k=.62+.5*rr*rr,x=px*k,y=py2*k;const w=lnoise(x*1.4,y*.5,th,1.0),w2=lnoise(x*3,y*.8+4,th*2,.6),rays=.72+.28*lnoise(x*16,3.3,th*2,.5),w3=lnoise(x*1.1+7,y*.45+2,th,.9);
    const cur=Math.pow(clamp(.55+.9*(w+.3*w2),0,1),1.6),hgt=clamp(1-(y+1.0)/2.1,0,1),band=Math.min(1.2,cur*Math.pow(hgt,.45)*1.5*rays),cur2=Math.pow(clamp(.5+.9*w3,0,1),2)*Math.pow(clamp(1-(y+.4)/1.6,0,1),.7)*rays;
    const m=clamp((y+.2)*1.1,0,1),base=[6,10,26];
    const g=[40+band*80,70+band*230,110+band*140],v=[80+band*150,40+band*60,170+band*85];
    d.data[o]=base[0]+g[0]*(1-m)*band+v[0]*m*band*.9+cur2*190;d.data[o+1]=base[1]+g[1]*(1-m)*band+v[1]*m*band*.9+cur2*60;d.data[o+2]=base[2]+g[2]*(1-m)*band+v[2]*m*band*.9+cur2*140;d.data[o+3]=255}
  ix.putImageData(d,0,0);ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.clip();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(inner,cx-r,cy-r,r*2,r*2);
  ctx.globalCompositeOperation='lighter';for(const s of sp){const tw=Math.max(0,Math.sin(th*s.k+s.ph))**6,lens=.8+.2*s.d;ctx.globalAlpha=tw*(.4+.6*s.z);const x=cx+Math.cos(s.a)*s.d*r*.9*lens,y=cy+Math.sin(s.a)*s.d*r*.9*lens;ctx.fillStyle='#fff';ctx.fillRect(x-1.2*(.6+s.z),y-1.2*(.6+s.z),2.4*(.6+s.z),2.4*(.6+s.z))}ctx.globalAlpha=1;
  const pool=ctx.createRadialGradient(cx,cy+r*.95,0,cx,cy+r*.95,r*.8);pool.addColorStop(0,'rgba(150,230,255,.42)');pool.addColorStop(1,'rgba(150,230,255,0)');ctx.fillStyle=pool;ctx.fillRect(cx-r,cy,r*2,r);
  const dk=ctx.createRadialGradient(cx,cy,r*.55,cx,cy,r);dk.addColorStop(0,'rgba(0,0,0,0)');dk.addColorStop(1,'rgba(0,0,0,.55)');ctx.globalCompositeOperation='source-over';ctx.fillStyle=dk;ctx.fillRect(cx-r,cy-r,r*2,r*2);ctx.restore();
  ctx.globalCompositeOperation='lighter';[['#ff3a6a',-2.4],['#3affa0',0],['#3a78ff',2.4]].forEach(([c,o])=>{ctx.strokeStyle=c;ctx.globalAlpha=.5;ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx+o,cy+o*.4,r-1,0,TAU);ctx.stroke()});
  const rim=ctx.createRadialGradient(cx,cy,r*.82,cx,cy,r*1.02);rim.addColorStop(0,'rgba(255,255,255,0)');rim.addColorStop(.9,'rgba(170,200,255,.22)');rim.addColorStop(1,'rgba(255,255,255,0)');ctx.globalAlpha=1;ctx.fillStyle=rim;ctx.beginPath();ctx.arc(cx,cy,r*1.02,0,TAU);ctx.fill();
  /* window reflection: 2x2 panes + secondary soft lamp reflection */
  ctx.save();ctx.translate(cx-r*.42,cy-r*.5);ctx.rotate(-.55);ctx.fillStyle='rgba(255,255,255,.7)';[[0,0],[r*.13,0],[0,r*.075],[r*.13,r*.075]].forEach(([a,b])=>{ctx.beginPath();ctx.roundRect(a-r*.2,b-r*.07,r*.12,r*.065,4);ctx.fill()});ctx.restore();
  ctx.globalAlpha=.3;ctx.fillStyle='#fff';ctx.fillRect(cx+r*.3,cy+r*.5,r*.26,5);ctx.globalAlpha=.4;ctx.beginPath();ctx.ellipse(cx,cy+r*.9,r*.55,r*.045,0,0,TAU);ctx.fill();
  for(const m of mo){const tw=.15+.8*Math.max(0,Math.sin(th*m.k+m.ph))**3,x=cx+Math.cos(m.a+th*0)*m.d*r,y=cy+Math.sin(m.a)*m.d*r*.9;ctx.globalAlpha=tw*.8;flare(x,y,6+tw*10,tw,'#cfe0ff')}
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.7,[2,4]);vignette(.5);grain(.03)}};
