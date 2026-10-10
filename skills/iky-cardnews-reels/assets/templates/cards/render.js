/* Card-news template: deterministic canvas export, 1080x1350 per card.
   Layout: the scene fills the card, a keyword with a bracketed gloss and an arrowed claim sits at the foot over a scrim,
   a tag hangs top right, and sticker shapes are scattered around the subject.
   Type: keyword, gloss, claim and tag in the title face (D); the detail line and counter in the text face (P).
   Replace the placeholder decks, colours and tag below; put scenes in scene/, product icons in icons/ and the brand mark at logo.png. */
const TAG = ['NEW', '1.0.0']; // two short lines on the hanging tag
// key: the one word the card is about. note: its gloss in brackets - a reading of the keyword, never a second fact.
// sub: the claim, one full sentence. detail: one supporting fact.
// scene: full-bleed portrait background (1024x1536), drawn at `zoom` x card width and shifted up by `top` px.
// shelves: [surface y, left x, right x, icon size] rows of an empty display in the scene; ICONS stand on them, five per row.
// frames: [icon id, centre x, centre y, size] icons placed inside the scene's empty display frames.
// One deck per carousel; pick one with ?set=<name>.
const SETS = {
  main: [
    {file:'01-cover', scene:'scene/01-cover.png', key:'업데이트', note:'UPDATE', sub:'이렇게 달라졌어요', detail:'첫 번째 변화 · 두 번째 변화 · 세 번째 변화'},
    {file:'02-first', scene:'scene/02-first.png', key:'기능', note:'FEATURE', sub:'무엇이 달라졌는지 한 문장으로', detail:'숫자나 위치가 들어간 근거를 한 문장으로 적어요.'},
    {file:'03-last', scene:'scene/03-last.png', key:'개선', note:'FIX', sub:'불편하던 점을 손봤어요', detail:'어떤 상황이 어떻게 나아졌는지 적어요.', last:true}
  ]
};
const SET = new URLSearchParams(location.search).get('set') in SETS ? new URLSearchParams(location.search).get('set') : Object.keys(SETS)[0];
const CARD_COPY = SETS[SET];
// Product icons (transparent PNGs in icons/<id>.png) for decks that use `shelves` or `frames`.
const ICONS = [];
const C = {bg0:'#1b1322', bg1:'#09080c', ink:'#f7f3f6', pink:'#ff2d8e', rose:'#e8a2bd', lav:'#b79cff', lime:'#c6f432', dark:'#1b0f17'};
const rgba=(hex,a)=>`rgba(${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)},${a})`;
const rnd=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)};
const tryImage=src=>loadImage(src).catch(()=>null);
const loadImage=src=>new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(new Error('image failed: '+src));i.src=src});
window.renderCard=async function(number){
  await Promise.all(['500 88px P','600 88px P','700 88px P','500 88px D','700 88px D'].map(f=>document.fonts.load(f,'가0A')));
  const card=CARD_COPY[number-1],flip=number%2===0;
  const logo=await tryImage('logo.png');
  const W=1080,H=1350,M=64;
  const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  // track is letter-spacing in em. Tracking leaves a gap after the last glyph, so right and centre alignment are corrected
  // for it; large left-aligned lines are pulled back by their side bearing so their ink sits on the margin.
  const text=(t,a,b,size,color=C.ink,weight=500,align='left',{family='P',track=0,max=W-M*2}={})=>{
    let s=size;const set=()=>{x.font=`${weight} ${s}px ${family}`;x.letterSpacing=`${track*s}px`};
    x.textAlign=align;set();while(x.measureText(t).width>max&&s>12){s-=1;set()}
    const w=x.measureText(t).width-track*s,shift=align==='right'?track*s:align==='center'?track*s/2:s>=80?x.measureText(t[0]).actualBoundingBoxLeft:0;
    x.fillStyle=color;x.fillText(t,a+shift,b);x.letterSpacing='0px';return w};
  const glow=(cx,cy,r,color,alpha)=>{const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,rgba(color,alpha));g.addColorStop(1,rgba(color,0));x.fillStyle=g;x.fillRect(cx-r,cy-r,r*2,r*2)};
  // Sticker shapes, as in the reference: spiky burst, crescent, coil and four-point sparkle.
  const burst=(cx,cy,r,rot,color,spikes=12,inner=.46)=>{x.beginPath();for(let i=0;i<spikes*2;i++){const a=rot+i*Math.PI/spikes,d=i%2?r*inner:r;x.lineTo(cx+Math.cos(a)*d,cy+Math.sin(a)*d)}x.closePath();x.fillStyle=color;x.fill()};
  const crescent=(cx,cy,r,rot,color)=>{x.save();x.translate(cx,cy);x.rotate(rot);x.beginPath();x.arc(0,0,r,.15*Math.PI,.85*Math.PI);x.strokeStyle=color;x.lineWidth=r*.42;x.lineCap='round';x.stroke();x.restore()};
  const coil=(cx,cy,len,rot,color)=>{x.save();x.translate(cx,cy);x.rotate(rot);x.beginPath();for(let i=0;i<=120;i++){const u=i/120,a=u*Math.PI*2*3.2,r=26*(1-u*.35),px=u*len+Math.cos(a)*r-r,py=Math.sin(a)*r;if(i)x.lineTo(px,py);else x.moveTo(px,py)}x.strokeStyle=color;x.lineWidth=7;x.lineCap='round';x.lineJoin='round';x.stroke();x.restore()};
  const sparkle=(cx,cy,r,color)=>{x.beginPath();for(let n=0;n<=4;n++){const a=n*Math.PI/2,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;if(!n){x.moveTo(px,py);continue}const m=a-Math.PI/4;x.quadraticCurveTo(cx+Math.cos(m)*r*.16,cy+Math.sin(m)*r*.16,px,py)}x.fillStyle=color;x.fill()};
  // Odd and even cards mirror their decoration so the carousel does not repeat one composition.
  const fx=v=>flip?W-v:v;

  /* ---------- stage: the whole card is the picture ---------- */
  const bg=x.createLinearGradient(0,0,0,H);bg.addColorStop(0,C.bg0);bg.addColorStop(1,C.bg1);x.fillStyle=bg;x.fillRect(0,0,W,H);
  x.globalCompositeOperation='lighter'; // stage light; a scene paints over it
  glow(fx(800),300,760,C.pink,.2);glow(fx(180),900,680,C.lav,.13);glow(540,620,640,C.rose,.08);
  [[fx(230),flip?-.3:.3,C.pink],[fx(850),flip?.26:-.26,C.lav]].forEach(([ox,ang,color])=>{
    x.save();x.translate(ox,-140);x.rotate(ang);
    const g=x.createLinearGradient(0,0,0,1500);g.addColorStop(0,rgba(color,.17));g.addColorStop(1,rgba(color,0));
    x.fillStyle=g;x.beginPath();x.moveTo(-26,0);x.lineTo(26,0);x.lineTo(290,1500);x.lineTo(-290,1500);x.closePath();x.fill();x.restore();
  });
  for(let i=0;i<40;i++){x.beginPath();x.arc(rnd(i+number*9)*W,rnd(i+.7+number*9)*H,3+rnd(i+.1)*13,0,Math.PI*2);x.fillStyle=rgba(i%3?C.rose:C.lav,.05+.14*rnd(i+.5));x.fill()}
  x.globalCompositeOperation='source-over';

  const scene=card.scene?await tryImage(card.scene):null;
  const icon=(img,px,py,size,rot)=>{x.save();x.translate(px,py);x.rotate(rot);x.shadowColor='rgba(0,0,0,.5)';x.shadowBlur=28;x.shadowOffsetY=14;x.drawImage(img,-size/2,-size/2,size,size);x.restore()};
  if(scene){
    const sw=W*(card.zoom??1),sh=sw*scene.height/scene.width;x.drawImage(scene,(W-sw)/2,-(card.top??90),sw,sh);
    // Icons stand on the display rows in list order, front row first.
    for(const [r,[sy,x0,x1,size]] of (card.shelves||[]).entries())for(let i=0;i<5;i++){
      const img=await loadImage(`icons/${ICONS[r*5+i]}.png`),px=x0+(x1-x0)*(i+.5)/5;
      x.save();x.translate(px,sy-4);x.scale(1,.22);x.beginPath();x.arc(0,0,size*.34,0,Math.PI*2);x.fillStyle='rgba(60,0,40,.38)';x.fill();x.restore();
      x.drawImage(img,px-size/2,sy-size*.92,size,size);
    }
    for(const [id,px,py,size] of card.frames||[])icon(await loadImage(`icons/${id}.png`),px,py,size,0);
  }

  /* ---------- stickers ---------- */
  if(card.shelves)burst(96,812,54,.2,C.lime);else burst(fx(140),300,72,.2,C.lime);
  burst(fx(112),530,27,.5,C.lime,8,.34);
  burst(fx(336),872,24,.1,C.lime,8,.34);
  crescent(fx(812),card.shelves?900:792,40,flip?.5:-.5,C.lime);
  if(!card.shelves)coil(fx(flip?1010:900),890,112,flip?2.6:.5,C.lime);
  if(!card.shelves)sparkle(fx(896),344,34,'#ffffff');sparkle(fx(160),716,20,'#ffffff');

  /* ---------- scrim and chrome ---------- */
  const s0=card.scrim??760,scrim=x.createLinearGradient(0,s0,0,H);scrim.addColorStop(0,'rgba(9,8,12,0)');scrim.addColorStop(.42,'rgba(9,8,12,.78)');scrim.addColorStop(1,'rgba(9,8,12,.96)');x.fillStyle=scrim;x.fillRect(0,s0,W,H-s0);
  if(logo)x.drawImage(logo,M,58,logo.width*46/logo.height,46);
  text(`${String(number).padStart(2,'0')} / ${String(CARD_COPY.length).padStart(2,'0')}`,M+70,92,24,rgba(C.ink,.72),600,'left',{track:.06});
  // Hanging tag, top right.
  const tx=W-M-112,ty=58,tw=112,th=132;
  x.beginPath();x.roundRect(tx,ty,tw,th-22,[14,14,0,0]);x.fillStyle=C.lime;x.fill();
  x.beginPath();x.moveTo(tx,ty+th-23);x.lineTo(tx+tw,ty+th-23);x.lineTo(tx+tw,ty+th);x.lineTo(tx+tw/2,ty+th-22);x.lineTo(tx,ty+th);x.closePath();x.fill();
  text(TAG[0],tx+tw/2,ty+48,27,C.dark,700,'center',{family:'D',track:.06});
  text(TAG[1],tx+tw/2,ty+88,31,C.dark,700,'center',{family:'D',track:-.02});

  /* ---------- foot: keyword [note] / subtitle → / detail ---------- */
  x.save();x.shadowColor=rgba(C.pink,.38);x.shadowBlur=30;
  const kw=text(card.key,M,1128,204,C.pink,700,'left',{family:'D',track:-.04});x.restore();
  text(`[ ${card.note} ]`,M+kw+26,1116,36,C.lime,500,'left',{family:'D',track:.08,max:W-M*2-kw-26});
  const sw=text(card.sub,M,1218,58,C.ink,500,'left',{family:'D',track:-.03});
  if(!card.last){
    const ax=M+sw+30,ay=1198,ex=W-M;
    if(ex-ax>70){x.beginPath();x.moveTo(ax,ay);x.lineTo(ex,ay);x.moveTo(ex-20,ay-15);x.lineTo(ex,ay);x.lineTo(ex-20,ay+15);x.strokeStyle=C.ink;x.lineWidth=3;x.lineCap='round';x.lineJoin='round';x.stroke()}
  }
  text(card.detail,M,1284,30,rgba(C.ink,.74),500,'left',{track:-.01});
  return c;
};
window.contactSheet=async function(){
  const cols=4,rows=Math.ceil(CARD_COPY.length/cols),w=540,h=675,gap=24;
  const c=document.createElement('canvas');c.width=cols*w+(cols+1)*gap;c.height=rows*h+(rows+1)*gap;const x=c.getContext('2d');
  x.fillStyle='#0b0a0d';x.fillRect(0,0,c.width,c.height);
  for(let n=1;n<=CARD_COPY.length;n++){const card=await renderCard(n);x.drawImage(card,gap+((n-1)%cols)*(w+gap),gap+Math.floor((n-1)/cols)*(h+gap),w,h)}
  return c;
};
// Posts each card to export-server.mjs, which writes the PNG beside this file.
window.exportAll=async function(){
  const save=async(canvas,name)=>{const blob=await new Promise(r=>canvas.toBlob(r,'image/png'));const res=await fetch(`/save/${SET}/${name}`,{method:'POST',body:blob});if(!res.ok)throw new Error('save failed: '+name);return `${name} ${canvas.width}x${canvas.height} ${blob.size}`};
  const out=[];
  for(let n=1;n<=CARD_COPY.length;n++)out.push(await save(await renderCard(n),CARD_COPY[n-1].file+'.png'));
  out.push(await save(await contactSheet(),'contact-sheet.png'));
  return out;
};
