C[17]=()=>{newTL();const cols=16,rows=9,T=122;
 draw=()=>{clear();const th=LOOP(now());bgGrad('#04050c','#0a0b1e',1);orb(W*.5,H*.5,900,[60,80,200],.12);
  const swp=((th/TAU*1)%1)*1.8-.4;ctx.globalCompositeOperation='lighter';
  const dm=Math.hypot(cols/2,rows*.6);
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=(i-(cols-1)/2)*T+W/2,y=(j-(rows-1)/2)*T+H/2,d=Math.hypot(i-cols/2,(j-rows/2)*1.2);
   const a=Math.PI*(.5+.5*Math.sin(th*2-d*.42)),cs=Math.cos(a),sn=Math.sin(a),aw=Math.abs(cs),w=T*.86*aw,hh=T*.86*(1-.05*sn),front=cs>=0;
   const fade=1-.55*Math.pow(d/dm,2),hue=(front?.58+.12*i/cols-.04*j/rows:.9-.1*i/cols)+.06*Math.sin(th+d*.2),lit=.5+.5*aw;
   const x0=x-w/2,y0=y-hh/2,g=ctx.createLinearGradient(x0,y0,x0+w,y0+hh);g.addColorStop(0,irid(hue,64,.2*lit*fade));g.addColorStop(1,irid(hue+.18,56,.07*lit*fade+.03));
   ctx.fillStyle=g;ctx.beginPath();ctx.roundRect(x0,y0,Math.max(.6,w),hh,10);ctx.fill();
   if(aw>.15){const sg=ctx.createRadialGradient(x0+w*.28,y0+hh*.25,0,x0+w*.28,y0+hh*.25,hh*.5);sg.addColorStop(0,`rgba(255,255,255,${.28*aw*fade})`);sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.beginPath();ctx.roundRect(x0,y0,w,hh,10);ctx.fill()}
   if(sn>.2){const t=T*.1*sn,sgn=front?1:-1,ex=x+sgn*w/2;const eg=ctx.createLinearGradient(ex,0,ex+sgn*t,0);eg.addColorStop(0,`rgba(255,255,255,${.5*sn*fade})`);eg.addColorStop(1,irid(hue+.3,70,.1*fade));ctx.fillStyle=eg;ctx.fillRect(Math.min(ex,ex+sgn*t),y0+3,t,hh-6)}
   const p=new Path2D();p.roundRect(x0,y0,Math.max(.6,w),hh,10);ctx.strokeStyle=`rgba(255,255,255,${(.22+.45*(1-lit)+.18*lit)*fade})`;ctx.lineWidth=1.3;ctx.stroke(p);chromEdge(p,1,1.8*(1-aw)+.6,.5*fade);
   const gx=(i/cols-swp);const gl=Math.exp(-gx*gx/.006);if(gl>.03&&aw>.3){ctx.fillStyle=`rgba(255,255,255,${.2*gl*aw})`;ctx.beginPath();ctx.roundRect(x0,y0,w,hh,10);ctx.fill()}
   if(aw<.2){ctx.fillStyle=`rgba(255,255,255,${(.2-aw)*2.2*fade})`;ctx.fillRect(x-1.5,y0,3,hh)}}
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';bloom(.7,[2,4]);vignette(.5);grain(.03)}};
