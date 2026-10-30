/* c0.js v2: shared glass toolkit. Fake-3D meshes with Fresnel fill, softbox streaks, bevel + doubled internal edges,
   chromatic dispersion, vertex glints, depth of field, per-face FX, plus caustic / floor / frost helpers. No concept here. */
const G3={
  rot(p,ax,ay,az){let[x,y,z]=p,c,s,t;c=Math.cos(ax);s=Math.sin(ax);t=y*c-z*s;z=y*s+z*c;y=t;c=Math.cos(ay);s=Math.sin(ay);t=x*c+z*s;z=-x*s+z*c;x=t;c=Math.cos(az);s=Math.sin(az);t=x*c-y*s;y=x*s+y*c;x=t;return[x,y,z]},
  pr(p,cx=W/2,cy=H/2,f=1400){const k=f/(f+p[2]);return[cx+p[0]*k,cy+p[1]*k,p[2],k]},
  box(w,h,d){const a=w/2,b=h/2,c=d/2,V=[[-a,-b,-c],[a,-b,-c],[a,b,-c],[-a,b,-c],[-a,-b,c],[a,-b,c],[a,b,c],[-a,b,c]];
    return{V,F:[[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[0,3,7,4],[1,2,6,5]]}},
  prism(n,r,h){const V=[],F=[];for(let i=0;i<n;i++){const a=TAU*i/n;V.push([Math.cos(a)*r,-h/2,Math.sin(a)*r])}for(let i=0;i<n;i++){const a=TAU*i/n;V.push([Math.cos(a)*r,h/2,Math.sin(a)*r])}
    F.push([...Array(n).keys()]);F.push([...Array(n).keys()].map(i=>i+n));for(let i=0;i<n;i++)F.push([i,(i+1)%n,(i+1)%n+n,i+n]);return{V,F}},
  octa(r){return{V:[[r,0,0],[-r,0,0],[0,r,0],[0,-r,0],[0,0,r],[0,0,-r]],F:[[0,2,4],[2,1,4],[1,3,4],[3,0,4],[2,0,5],[1,2,5],[3,1,5],[0,3,5]]}},
  ico(r){const t=(1+Math.sqrt(5))/2,v=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]].map(p=>{const l=Math.hypot(...p);return p.map(q=>q/l*r)});
    return{V:v,F:[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]]}},
  merge(a,b){const o=a.V.length;return{V:a.V.concat(b.V),F:a.F.concat(b.F.map(f=>f.map(i=>i+o)))}}
};
/* iridescent thin-film colour from phase u */
const irid=(u,l=62,a=1)=>`hsla(${(fr(u)*360)|0},82%,${l}%,${a})`;
/* chromatic edge: 3 RGB-offset strokes of the current path */
function chromEdge(path,w,off,a,colors=['#ff3b6b','#3bff9a','#3b7bff'],mode='lighter'){ctx.save();ctx.globalCompositeOperation=mode;ctx.lineWidth=w;ctx.lineJoin='round';
  colors.forEach((c,i)=>{ctx.save();ctx.translate((i-1)*off,(1-i)*off*.5);ctx.strokeStyle=c;ctx.globalAlpha=a;ctx.stroke(path);ctx.restore()});ctx.restore()}
/* glass mesh renderer. Per face: Fresnel-weighted iridescent fill, moving softbox streak, bevel line, doubled internal edge,
   chromatic outline, white spec rim. Per vertex: 4-point glints on the brightest corners.
   opt: rot,pos,hue,fa,ea,tint,iri,off,cx,cy,f,sc,spec,light,blur(px DOF),fx(faceIndex)->{a,h},streak,ghost,glints,inset */
/* cheap depth of field: draw the mesh small into a pooled offscreen canvas, then scale up with smoothing (no ctx.filter) */
function dofMesh(m,o){const{rot:[ax,ay,az],pos:[px,py,pz]=[0,0,0],cx=W/2,cy=H/2,f=1400,sc=1,blur}=o;
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const v of m.V){const r=G3.rot([v[0]*sc,v[1]*sc,v[2]*sc],ax,ay,az),p=G3.pr([r[0]+px,r[1]+py,r[2]+pz],cx,cy,f);x0=Math.min(x0,p[0]);y0=Math.min(y0,p[1]);x1=Math.max(x1,p[0]);y1=Math.max(y1,p[1])}
  const mg=30+blur*8;x0-=mg;y0-=mg;x1+=mg;y1+=mg;const bw=x1-x0,bh=y1-y0,q=1/(1+blur*.75),pw=Math.max(8,Math.ceil(bw*q*S)),ph=Math.max(8,Math.ceil(bh*q*S));
  const pool=dofMesh._p||(dofMesh._p={}),key=(pw>>5)+'x'+(ph>>5);let c=pool[key];if(!c||c.width<pw||c.height<ph)c=pool[key]=offscreen((((pw>>5)+1)<<5),(((ph>>5)+1)<<5));
  const main=ctx,oc=c.getContext('2d');oc.setTransform(1,0,0,1,0,0);oc.globalCompositeOperation='source-over';oc.globalAlpha=1;oc.clearRect(0,0,c.width,c.height);
  oc.setTransform(q*S,0,0,q*S,-x0*q*S,-y0*q*S);ctx=oc;try{glassMesh(m,Object.assign({},o,{_in:1,blur:0,glints:false}))}finally{ctx=main}
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  ctx.drawImage(c,0,0,pw,ph,x0*S,y0*S,bw*S,bh*S);ctx.restore()}
function glassMesh(m,o){const{rot:[ax,ay,az],pos:[px,py,pz]=[0,0,0],hue=.6,fa=.14,ea=.7,tint=[150,190,255],iri=.5,off=1.6,cx=W/2,cy=H/2,f=1400,sc=1,spec=1,light=false,blur=0,fx=null,streak=1,ghost=1,glints=true,inset=.82}=o;
  const MD=light?'multiply':'lighter',FM=light?'source-over':'lighter',FK=light?1.9:1;
  if(blur>.4&&!light&&!o._in)return dofMesh(m,o);
  const R=m.V.map(v=>G3.rot([v[0]*sc,v[1]*sc,v[2]*sc],ax,ay,az)),P=R.map(r=>G3.pr([r[0]+px,r[1]+py,r[2]+pz],cx,cy,f)),vs=new Float32Array(m.V.length),vc=new Float32Array(m.V.length);
  const Fs=m.F.map((fc,fi)=>{let z=0;fc.forEach(i=>z+=P[i][2]);z/=fc.length;const a=fc.map(i=>R[i]);
    const u=[a[1][0]-a[0][0],a[1][1]-a[0][1],a[1][2]-a[0][2]],v=[a[2][0]-a[0][0],a[2][1]-a[0][1],a[2][2]-a[0][2]];
    const nx=u[1]*v[2]-u[2]*v[1],ny=u[2]*v[0]-u[0]*v[2],nz=u[0]*v[1]-u[1]*v[0],l=Math.hypot(nx,ny,nz)||1;return{fc,fi,z,n:[nx/l,ny/l,nz/l]}}).sort((a,b)=>b.z-a.z);
  for(const F of Fs){const X=fx?fx(F.fi):null,xa=X?X.a:1,xh=X?X.h:0;
    const path=new Path2D(),pts=F.fc.map(i=>P[i]);pts.forEach((p,k)=>k?path.lineTo(p[0],p[1]):path.moveTo(p[0],p[1]));path.closePath();
    const lit=clamp(.5+.5*(F.n[0]*-.45+F.n[1]*-.6+F.n[2]*-.65),0,1),ph=hue+xh+F.n[0]*.22+F.n[1]*.17+F.n[2]*.1,fres=Math.pow(1-Math.abs(F.n[2]),1.4),fm=(.55+1.1*fres)*xa;
    F.fc.forEach(i=>{vs[i]+=lit;vc[i]++});
    let mx=0,my=0;pts.forEach(p=>{mx+=p[0];my+=p[1]});mx/=pts.length;my/=pts.length;
    const b=pts[0],e=pts[(pts.length/2)|0],g=ctx.createLinearGradient(b[0],b[1],e[0],e[1]);
    g.addColorStop(0,irid(ph,light?72:64,FK*fa*fm*(.6+lit)*iri));g.addColorStop(.5,rgba(tint,FK*fa*fm*(.5+lit*.9)));g.addColorStop(1,irid(ph+.35,light?70:60,FK*fa*fm*(.6+(1-lit))*iri));
    ctx.save();ctx.globalCompositeOperation=FM;ctx.fillStyle=g;ctx.fill(path);
    if(streak&&lit>.5){let sz=0;pts.forEach(p=>{sz=Math.max(sz,Math.hypot(p[0]-mx,p[1]-my))});if(sz>6){ctx.clip(path);ctx.translate(mx+(F.n[0]*.9+F.n[1]*.6)*sz,my+(F.n[1]*.7-F.n[0]*.4)*sz);ctx.rotate(-.62);
      const w=sz*.34,sg=ctx.createLinearGradient(-w,0,w,0);const A=(light?.5:.3)*(lit-.5)*2*streak*xa;sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,`rgba(255,255,255,${A})`);sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.fillRect(-w,-sz*2,w*2,sz*4)}}
    ctx.restore();
    if(inset<1){const ip=new Path2D();pts.forEach((p,k)=>{const x=mx+(p[0]-mx)*inset,y=my+(p[1]-my)*inset;k?ip.lineTo(x,y):ip.moveTo(x,y)});ip.closePath();ctx.save();ctx.globalCompositeOperation=MD;ctx.lineWidth=.8;ctx.strokeStyle=irid(ph+.12,light?55:75,ea*.34*(.4+lit)*xa);ctx.stroke(ip);ctx.restore()}
    if(ghost){const k=pts[0][3]*sc,dx=-F.n[0]*7*k,dy=-F.n[1]*7*k;ctx.save();ctx.translate(dx,dy);chromEdge(path,1,off*.7,ea*.2*xa*(.4+fres),undefined,MD);ctx.restore()}
    chromEdge(path,1.25,off,Math.min(1,ea*(.35+.65*lit)*xa),undefined,MD);
    ctx.save();ctx.globalCompositeOperation=light?'source-over':'lighter';ctx.strokeStyle=light?'#2a3f78':'#fff';ctx.globalAlpha=Math.min(1,ea*.38*lit*spec*xa);ctx.lineWidth=.9;ctx.stroke(path);ctx.restore()}
  if(glints&&!light){ctx.save();ctx.globalCompositeOperation='lighter';const idx=[];for(let i=0;i<P.length;i++)if(vc[i]){const a=vs[i]/vc[i];if(a>.8)idx.push([a,i])}idx.sort((a,b)=>b[0]-a[0]);
    idx.slice(0,4).forEach(([a,i])=>{const r=(10+26*(a-.8)*5)*P[i][3]*Math.sqrt(sc);flare(P[i][0],P[i][1],r,.75,'#ffffff');flare(P[i][0],P[i][1],r*.5,.6,'#bfe0ff')});ctx.restore();ctx.globalAlpha=1}
  return P}
/* backdrops */
function bgGrad(c0,c1,ang=.6){const g=ctx.createLinearGradient(W/2-Math.cos(ang)*W*.6,H/2-Math.sin(ang)*H*.6,W/2+Math.cos(ang)*W*.6,H/2+Math.sin(ang)*H*.6);g.addColorStop(0,c0);g.addColorStop(1,c1);ctx.globalCompositeOperation='source-over';ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
function orb(x,y,r,c,a){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a;ctx.drawImage(spr(c,128),x-r,y-r,r*2,r*2);ctx.restore()}
function sorb(x,y,r,c,a){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,rgba(c,a));g.addColorStop(.55,rgba(c,a*.35));g.addColorStop(1,rgba(c,0));ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore()}
/* bokeh disc with bright rim (real lens look) */
function bokeh(x,y,r,c,a,mode='lighter'){ctx.save();ctx.globalCompositeOperation=mode;const g=ctx.createRadialGradient(x,y,0,x,y,r),br=c.map(v=>Math.min(255,v+70));g.addColorStop(0,rgba(c,a*.45));g.addColorStop(.78,rgba(c,a*.55));g.addColorStop(.93,rgba(br,a));g.addColorStop(1,rgba(c,0));ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore()}
/* soft shadow blob via blur filter */
function softShadow(x,y,rx,ry,a,col='20,30,70',blur=30){const k=Math.max(rx,ry)+blur*1.4;ctx.save();ctx.globalCompositeOperation='source-over';ctx.translate(x,y);ctx.scale(1,ry/rx);const R=rx+blur*1.4,g=ctx.createRadialGradient(0,0,Math.max(0,rx-blur*1.2),0,0,R);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,R,0,TAU);ctx.fill();ctx.restore()}
/* coloured caustic light spill on a floor */
function caustic(x,y,rx,ry,hue,a,dark=false){ctx.save();ctx.globalCompositeOperation=dark?'lighter':'source-over';ctx.translate(x,y);ctx.scale(1,ry/rx);
  const g=ctx.createRadialGradient(0,0,0,0,0,rx);g.addColorStop(0,`rgba(255,255,255,${a*.9})`);g.addColorStop(.35,irid(hue,72,a*.7));g.addColorStop(.7,irid(hue+.3,64,a*.35));g.addColorStop(1,irid(hue+.5,60,0));ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,rx,0,TAU);ctx.fill();
  [['#ff4d7a',.0],['#4dffb0',.05],['#4d86ff',.1]].forEach(([c,d],i)=>{ctx.strokeStyle=c;ctx.globalAlpha=a*.5;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(0,0,rx*(.78+d),0,TAU);ctx.stroke()});ctx.restore()}
/* frost noise tile (create once per concept via mkFrost) */
function mkFrost(seed=7,n=256){const R=rng(seed),k=offscreen(n,n),x=k.getContext('2d'),d=x.createImageData(n,n);for(let i=0;i<n*n;i++){const v=110+R()*145|0;d.data[i*4]=d.data[i*4+1]=d.data[i*4+2]=v;d.data[i*4+3]=255}x.putImageData(d,0,0);return ctx.createPattern(k,'repeat')}
/* low-res per-pixel field upscaled smooth. fn(u,v)->[r,g,b] */
function field(w,h,fn,a=1,mode='source-over'){const k=field._k||(field._k={});const id=w+'x'+h;const c=k[id]||(k[id]=offscreen(w,h)),x=c.getContext('2d'),d=x.createImageData(w,h);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const v=fn(i/w,j/h),o=(j*w+i)*4;d.data[o]=v[0];d.data[o+1]=v[1];d.data[o+2]=v[2];d.data[o+3]=255}
  x.putImageData(d,0,0);ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation=mode;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(c,0,0,W,H);ctx.restore()}
const hs2rgb=(h,s,l)=>{h=fr(h)*6;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h%2-1)),m=l-c/2;let r=0,g=0,b=0;if(h<1)[r,g,b]=[c,x,0];else if(h<2)[r,g,b]=[x,c,0];else if(h<3)[r,g,b]=[0,c,x];else if(h<4)[r,g,b]=[0,x,c];else if(h<5)[r,g,b]=[x,0,c];else[r,g,b]=[c,0,x];return[(r+m)*255,(g+m)*255,(b+m)*255]};
