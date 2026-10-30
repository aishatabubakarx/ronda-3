C[18]=()=>{newTL();const R=rng(1818),B=[{x:.18,l:520,r:130,c:[205,30,45],m:3,ph:0,t:0},{x:.37,l:380,r:108,c:[230,175,60],m:4,ph:1.4,t:1},{x:.56,l:600,r:146,c:[20,130,90],m:3,ph:2.6,t:2},{x:.74,l:440,r:114,c:[170,200,235],m:4,ph:4,t:3},{x:.89,l:300,r:90,c:[205,30,45],m:3,ph:5.2,t:0}];
 const bk=Array.from({length:46},()=>({x:R()*W,y:R()*H,r:18+R()*60,m:1+((R()*2)|0),ph:R()*TAU,a:.15+R()*.5,c:R()<.8?[255,200,100]:[255,120,100]}));
 const sn=Array.from({length:130},()=>({x:R()*W,y0:R(),s:.8+R()*2.4,m:1+((R()*3)|0),ph:R()*TAU,w:20+R()*40}));
 /* pine branches: pre-generated needle segments in local space (base at 0,0 pointing along +x) */
 const branch=(len,seed)=>{const r=rng(seed),seg=[];const stem=(x0,y0,a,l,depth)=>{const n=Math.floor(l/9);for(let i=0;i<n;i++){const t=i/n,x=x0+Math.cos(a)*l*t,y=y0+Math.sin(a)*l*t,nl=(1-t*.6)*(depth?26:44);for(const sg of[-1,1]){for(let k=0;k<2;k++){const na=a+sg*(.95+k*.25+r()*.2);seg.push([x,y,x+Math.cos(na)*nl,y+Math.sin(na)*nl])}}if(depth<1&&i%6===3&&i>4)stem(x,y,a+(r()<.5?-1:1)*.7,l*.38,depth+1)}};stem(0,0,0,len,0);return seg};
 const BR=[{x:-20,y:-10,a:.55,l:620,s:1},{x:W+20,y:-10,a:Math.PI-.5,l:560,s:2},{x:W*.5,y:-40,a:Math.PI/2+.05,l:200,s:3}].map((b,i)=>({...b,seg:branch(b.l,300+i*7)}));
 draw=()=>{clear();const th=LOOP(now()),u=now()/DUR;bgGrad('#020a07','#0b1f17',.9);
  for(const b of bk){const a=th*b.m+b.ph;bokeh(b.x+Math.cos(a)*40,b.y+Math.sin(a)*30,b.r*1.2,b.c,b.a*(.6+.4*Math.sin(th*2+b.ph)))}
  ctx.globalCompositeOperation='lighter';for(const s of sn){const y=((s.y0+u*s.m)%1)*(H+60)-30,x=s.x+Math.sin(th*s.m+s.ph)*s.w;ctx.globalAlpha=.55;ctx.fillStyle='#e8f2ff';ctx.beginPath();ctx.arc(x,y,s.s,0,TAU);ctx.fill()}ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  for(const b of BR){ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.a+.012*Math.sin(th*2+b.s));ctx.lineCap='round';ctx.strokeStyle='#0c2b1a';ctx.lineWidth=2.4;ctx.beginPath();for(const s of b.seg){ctx.moveTo(s[0],s[1]);ctx.lineTo(s[2],s[3])}ctx.stroke();ctx.strokeStyle='rgba(60,140,90,.35)';ctx.lineWidth=1;ctx.beginPath();for(let i=0;i<b.seg.length;i+=3){const s=b.seg[i];ctx.moveTo(s[0],s[1]);ctx.lineTo(s[2],s[3])}ctx.stroke();ctx.strokeStyle='#2b1a0c';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(b.l,0);ctx.stroke();ctx.restore()}
  /* fairy-light wire with twinkling bulbs */
  ctx.strokeStyle='rgba(30,40,30,.9)';ctx.lineWidth=2;ctx.beginPath();for(let x=0;x<=W;x+=20){const y=20+Math.sin(x/W*Math.PI)*120;x?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();
  for(let i=1;i<14;i++){const x=i*W/14,y=20+Math.sin(x/W*Math.PI)*120+4,tw=.55+.45*Math.sin(th*(2+i%3)+i*1.7);ctx.save();ctx.globalCompositeOperation='lighter';orb(x,y+8,38,[255,190,90],.55*tw);ctx.fillStyle=`rgba(255,235,170,${.5+.5*tw})`;ctx.beginPath();ctx.ellipse(x,y+9,4,7,0,0,TAU);ctx.fill();ctx.restore()}
  for(const b of B){const sw=.1*Math.sin(th*b.m+b.ph),px=b.x*W,py=-20,bx=px+Math.sin(sw)*b.l,by=py+Math.cos(sw)*b.l+b.r,c=b.c,r=b.r,lt=c.map(v=>Math.min(255,v+110));
   ctx.strokeStyle='rgba(230,200,120,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(bx,by-b.r-14);ctx.stroke();
   const g=ctx.createRadialGradient(bx-r*.3,by-r*.35,r*.05,bx,by,r);g.addColorStop(0,rgba(lt,1));g.addColorStop(.45,rgba(c,1));g.addColorStop(1,rgba(c.map(v=>v*.22|0),1));ctx.fillStyle=g;ctx.beginPath();ctx.arc(bx,by,r,0,TAU);ctx.fill();
   ctx.save();ctx.beginPath();ctx.arc(bx,by,r,0,TAU);ctx.clip();
   if(b.t===0){ctx.fillStyle='rgba(255,215,120,.9)';ctx.fillRect(bx-r,by-r*.12,r*2,r*.2);ctx.fillStyle='rgba(255,255,255,.5)';for(let k=0;k<26;k++){const gx=bx-r+((k*53)%100)/100*r*2,gy=by-r*.12+((k*37)%20)/100*r;ctx.fillRect(gx,gy,2,2)}}
   if(b.t===1){ctx.strokeStyle='rgba(120,80,10,.35)';ctx.lineWidth=3;for(let k=-3;k<=3;k++){ctx.beginPath();ctx.ellipse(bx,by,r*Math.abs(k)/3.4+4,r,0,0,TAU);ctx.stroke()}}
   if(b.t===2){ctx.strokeStyle='rgba(255,225,150,.75)';ctx.lineWidth=5;ctx.beginPath();for(let k=0;k<=40;k++){const t=k/40,x=bx-r+t*r*2,y=by+Math.sin(t*TAU*2)*r*.2;k?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke()}
   if(b.t===3){ctx.fillStyle='rgba(255,255,255,.55)';for(let k=0;k<70;k++){const a=k*2.399,rr=Math.sqrt(k/70)*r*.9;ctx.beginPath();ctx.arc(bx+Math.cos(a)*rr,by+Math.sin(a)*rr,2.2,0,TAU);ctx.fill()}}
   const rl=ctx.createRadialGradient(bx+r*.15,by+r*.88,0,bx+r*.15,by+r*.88,r*.6);rl.addColorStop(0,'rgba(255,215,140,.5)');rl.addColorStop(1,'rgba(255,215,140,0)');ctx.fillStyle=rl;ctx.fillRect(bx-r,by-r,r*2,r*2);
   ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(255,200,110,.3)';ctx.beginPath();ctx.ellipse(bx+r*.38,by+r*.3,r*.2,r*.1,.5,0,TAU);ctx.fill();ctx.restore();
   ctx.fillStyle='#d9b45a';roundRect(bx-r*.2,by-r-18,r*.4,18,4);ctx.fill();ctx.strokeStyle='#d9b45a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(bx,by-r-24,6,0,TAU);ctx.stroke();ctx.fillStyle='rgba(255,240,190,.5)';ctx.fillRect(bx-r*.12,by-r-17,3,15);
   ctx.globalCompositeOperation='lighter';ctx.strokeStyle=rgba(lt,.5);ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(bx,by,r-2,.2,Math.PI*.9);ctx.stroke();
   ctx.fillStyle='rgba(255,255,255,.9)';const wx=bx-r*.38,wy=by-r*.46;[[0,0],[r*.14,0],[0,r*.09],[r*.14,r*.09]].forEach(([a,c2])=>{ctx.beginPath();ctx.roundRect(wx+a-r*.07,wy+c2-r*.04,r*.12,r*.07,2);ctx.fill()});
   ctx.strokeStyle='rgba(255,230,150,.35)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(bx,by,r,r*.28,0,0,TAU);ctx.stroke();ctx.globalCompositeOperation='source-over'}
  ctx.globalAlpha=1;bloom(.6,[2,4]);vignette(.55);grain(.03)}};
