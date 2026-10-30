const FONTS=['700 40px "Orbitron"','900 40px "Orbitron"','700 40px "Montserrat"','800 40px "Montserrat"','900 40px "Montserrat"','400 40px "Great Vibes"','italic 700 40px "Playfair Display"','800 40px "Playfair Display"','400 40px "Bebas Neue"','400 40px "Pacifico"','700 40px "Amiri"','700 40px "JetBrains Mono"','400 40px "Creepster"'];
window.init=async(id,scale)=>{await Promise.all(FONTS.map(f=>document.fonts.load(f,'Aa0 عيد')));S=scale||1;cv.width=W*S;cv.height=H*S;ctx=cv.getContext('2d',{alpha:false});C[id]();return 'ok'};
window.renderAt=ms=>{tl.seek(ms/1000,false);draw();return cv.toDataURL('image/png').slice(22)};
/* Motion blur by temporal supersampling: average n sub-frames across a shutter window (default 180 degrees at 30 fps = 16.7 ms).
   Costs n times more render time. Use for fast-moving clips (streaks, wipes, spins); skip for slow glows and loops of noise. */
window.renderAtMB=(ms,n,shutterMs)=>{n=n||5;shutterMs=shutterMs||16.7;const acc=offscreen(cv.width,cv.height),a=acc.getContext('2d');
  for(let i=0;i<n;i++){tl.seek(Math.max(0,ms-shutterMs/2+shutterMs*(i+.5)/n)/1000,false);draw();a.globalAlpha=1/(i+1);a.drawImage(cv,0,0)}
  return acc.toDataURL('image/png').slice(22)};
