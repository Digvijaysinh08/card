// Gallery
const g=document.getElementById('gallery');
const EXTS=['jpg','jpeg','png','webp','JPG','JPEG','PNG'];
function loadImg(img,src,i){const base=src.replace(/\.[^.\/]+$/,'');let k=0;
  img.onerror=()=>{if(k<EXTS.length){img.src=base+'.'+EXTS[k++]}else{img.onerror=null;console.warn('Photo nathi mali:',src);img.src='https://picsum.photos/seed/yuv'+i+'/600/600'}};
  img.src=src}
PHOTOS.forEach((p,i)=>{const d=document.createElement('div');d.className='photo-card reveal';d.style.setProperty('--tilt',(i%2?2:-2)+'deg');d.innerHTML=`<img alt=""><div class="caption">${p.cap}</div>`;loadImg(d.querySelector('img'),p.src,i);g.appendChild(d)});

// Password + music
const audio=document.getElementById('bgMusic'),musicBtn=document.getElementById('musicBtn'),mc=document.getElementById('musicControl');
audio.src=SONG;audio.volume=.7;
document.getElementById('passForm').addEventListener('submit',e=>{
  e.preventDefault();const f=document.getElementById('password');
  if(f.value==='1311'){
    gate.classList.add('hidden');mainSite.style.display='block';mc.classList.remove('hidden');
    audio.play().then(()=>{musicBtn.textContent='Ⅱ'}).catch(()=>{mc.classList.add('paused')});
    window.scrollTo(0,0);celebrate();initReveal();
  }else{error.textContent='Areee, password wrong chhe! Ek vaar fari try kar ❤️';f.value='';f.focus()}
});
musicBtn.onclick=()=>{if(audio.paused){audio.play();musicBtn.textContent='Ⅱ';mc.classList.remove('paused')}else{audio.pause();musicBtn.textContent='♫';mc.classList.add('paused')}};

function initReveal(){
  document.querySelectorAll('.letter p').forEach(p=>p.classList.add('reveal'));
  const o=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');o.unobserve(x.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>o.observe(el));
}
function celebrate(){
  const c=['#ff8fc7','#c6a6ff','#8abaff','#ffe29a','#fff'];
  for(let i=0;i<100;i++){const p=document.createElement('i');p.className='confetti';p.style.left=Math.random()*100+'vw';p.style.background=c[i%5];p.style.animationDelay=Math.random()*.9+'s';document.body.appendChild(p);setTimeout(()=>p.remove(),4800)}
}


// Wish -> email
const wf=document.getElementById('wishForm'),ws=document.getElementById('wishStatus');
wf.addEventListener('submit',async e=>{
  e.preventDefault();const txt=document.getElementById('wishText').value.trim();if(!txt)return;
  const b=wf.querySelector('button');b.disabled=true;ws.textContent='Mokli rahi chhu... ✨';
  try{
    const r=await fetch('https://formsubmit.co/ajax/'+WISH_EMAIL,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify({_subject:'Yuvika ni Birthday Wish 💌',_template:'table',_captcha:'false',name:'Yuvika',message:txt})});
    const d=await r.json().catch(()=>({}));console.log('FormSubmit:',r.status,d);
    if(!r.ok||String(d.success)==='false')throw new Error(d.message||('HTTP '+r.status));
    ws.textContent='Tari wish pohchi gayi chhe ❤️ Thank you, Yuvika!';wf.reset();celebrate();
  }catch(err){
    console.error(err);
    if(location.protocol==='file:')console.warn('Page ne Live Server / http://localhost thi kholo, file:// par FormSubmit nahi chale.');
    ws.textContent='Wish send nathi thai 🥺 Thodi vaar pachi fari try kar.';
  }
  b.disabled=false;
});
