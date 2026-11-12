// ===== 3D Birthday cake (4 floors) =====
(()=>{
  const cv=document.getElementById('cakeCanvas'),r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
  r.setPixelRatio(Math.min(devicePixelRatio,2));
  const s=new THREE.Scene(),cam=new THREE.PerspectiveCamera(38,1,.1,100);cam.position.set(0,5.2,14);cam.lookAt(0,2.4,0);
  s.add(new THREE.AmbientLight(0xffffff,.75));
  const dl=new THREE.DirectionalLight(0xffffff,.8);dl.position.set(4,9,7);s.add(dl);
  const cl=new THREE.PointLight(0xffb066,1.4,10);cl.position.set(0,5.4,0);s.add(cl);
  const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.5},o));
  const cake=new THREE.Group();s.add(cake);
  const add=(geo,mat,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);cake.add(m);return m};
  add(new THREE.CylinderGeometry(3.9,3.9,.18,64),M(0xffffff,{metalness:.3,roughness:.2}),0,.09,0);
  // [radius, height, centerY, topY, color]
  const T=[[2.9,1.1,.73,1.28,0xf29bc6],[2.3,1.0,1.78,2.28,0xffd3e8],[1.7,.9,2.73,3.18,0xc9a8ff],[1.1,.8,3.58,3.98,0xffb4d9]];
  T.forEach(([rr,h,cy,ty,c])=>{
    add(new THREE.CylinderGeometry(rr,rr,h,64),M(c),0,cy,0);
    const t=add(new THREE.TorusGeometry(rr,.12,16,64),M(0xfff0f7),0,ty,0);t.rotation.x=Math.PI/2;
  });
  for(let i=0;i<16;i++){const a=i/16*6.283;add(new THREE.SphereGeometry(.17,16,16),M(0xd6203f,{roughness:.2}),Math.sin(a)*2.9,1.45,Math.cos(a)*2.9)}
  for(let i=0;i<12;i++){const a=i/12*6.283;add(new THREE.SphereGeometry(.11,12,12),M(0x8abaff),Math.sin(a)*2.3,2.42,Math.cos(a)*2.3)}
  for(let i=0;i<10;i++){const a=i/10*6.283;add(new THREE.SphereGeometry(.1,12,12),M(0xff8fc7),Math.sin(a)*1.7,3.32,Math.cos(a)*1.7)}
  // "Yuvika" lakhelu - mota floor par
  const c2=document.createElement('canvas');c2.width=512;c2.height=128;const x=c2.getContext('2d');
  x.font='italic 700 84px Playfair Display, serif';x.textAlign='center';x.textBaseline='middle';x.fillStyle='#fff';x.shadowColor='#8e3d76';x.shadowBlur=8;x.fillText('Yuvika ♡',256,66);
  const tex=new THREE.CanvasTexture(c2);
  const name=add(new THREE.CylinderGeometry(2.93,2.93,.85,48,1,true,-.62,1.24),new THREE.MeshBasicMaterial({map:tex,transparent:true}),0,.73,0);
  // chhota naam bijha floor par
  const c3=document.createElement('canvas');c3.width=512;c3.height=128;const y=c3.getContext('2d');
  y.font='italic 700 70px Playfair Display, serif';y.textAlign='center';y.textBaseline='middle';y.fillStyle='#fff';y.shadowColor='#5a3a8e';y.shadowBlur=8;y.fillText('Happy Birthday',256,66);
  add(new THREE.CylinderGeometry(2.33,2.33,.7,48,1,true,-.8,1.6),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c3),transparent:true}),0,1.78,0);
  const flames=[];
  for(let i=0;i<5;i++){const a=i/4*6.283,px=i?Math.sin(a)*.6:0,pz=i?Math.cos(a)*.6:0;
    add(new THREE.CylinderGeometry(.06,.06,.7,12),M(i%2?0xff8fc7:0x8abaff),px,4.33,pz);
    const f=add(new THREE.ConeGeometry(.1,.32,12),new THREE.MeshBasicMaterial({color:0xffc84a}),px,4.88,pz);f.userData={p:Math.random()*9,s:1};flames.push(f)}
  const sp=new Float32Array(140*3);for(let i=0;i<140;i++){const a=Math.random()*6.28,rr=3.6+Math.random()*2;sp[i*3]=Math.cos(a)*rr;sp[i*3+1]=Math.random()*6;sp[i*3+2]=Math.sin(a)*rr}
  const sgm=new THREE.BufferGeometry();sgm.setAttribute('position',new THREE.BufferAttribute(sp,3));
  const sps=new THREE.Points(sgm,new THREE.PointsMaterial({color:0xffe6a0,size:.1,transparent:true}));s.add(sps);
  let lw=0,lh=0,lit=true;const clk=new THREE.Clock();
  function rs(){r.setSize(lw,lh,false);cam.aspect=lw/lh;cam.updateProjectionMatrix()}
  (function loop(){requestAnimationFrame(loop);const t=clk.getElapsedTime();
    if(cv.clientWidth&&(cv.clientWidth!==lw||cv.clientHeight!==lh)){lw=cv.clientWidth;lh=cv.clientHeight;rs()}
    if(!lw)return;
    cake.rotation.y=Math.sin(t*.5)*.75;cake.position.y=Math.sin(t*1.2)*.1;sps.rotation.y=-t*.2;
    flames.forEach(f=>{const d=f.userData;d.s+=((lit?1:0)-d.s)*.12;const fl=1+Math.sin(t*18+d.p)*.12;f.scale.set(d.s*fl,d.s*(fl+.1),d.s*fl);f.rotation.z=Math.sin(t*9+d.p)*.12});
    cl.intensity+=((lit?1.4+Math.sin(t*20)*.2:0)-cl.intensity)*.15;
    r.render(s,cam)})();
  const btn=document.getElementById('blowBtn'),msg=document.getElementById('cakeMessage');
  btn.onclick=()=>{lit=!lit;if(!lit){msg.textContent='Wish accepted! ✨ Tara badha sapna pura thaay, Yuvika! ❤️';btn.textContent='Light the candles again 🕯️';celebrate()}else{msg.textContent='Close your eyes, make a wish... ✨';btn.textContent='Blow the candles 🕯️'}};
})();
