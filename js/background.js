// ===== Background three.js: stars + floating hearts =====
(()=>{
  const cv=document.getElementById('bg'),r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
  r.setPixelRatio(Math.min(devicePixelRatio,2));
  const s=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,200);cam.position.z=30;
  const N=700,pos=new Float32Array(N*3);for(let i=0;i<N*3;i++)pos[i]=(Math.random()-.5)*120;
  const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0xffd6f0,size:.35,transparent:true,opacity:.8}));s.add(stars);
  const h=new THREE.Shape();h.moveTo(0,-1);h.bezierCurveTo(-2.4,.8,-1,2.2,0,1);h.bezierCurveTo(1,2.2,2.4,.8,0,-1);
  const hg=new THREE.ShapeGeometry(h),cols=[0xff8fc7,0xc6a6ff,0x8abaff,0xffb4d9],hearts=[];
  for(let i=0;i<34;i++){const m=new THREE.Mesh(hg,new THREE.MeshBasicMaterial({color:cols[i%4],transparent:true,opacity:.25+Math.random()*.3,side:2}));
    const sc=.4+Math.random()*.9;m.scale.set(sc,sc,sc);m.position.set((Math.random()-.5)*60,(Math.random()-.5)*50,(Math.random()-.5)*30);
    m.userData={v:.02+Math.random()*.05,w:Math.random()*6,r:(Math.random()-.5)*.02};s.add(m);hearts.push(m)}
  let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
  function rs(){r.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}rs();addEventListener('resize',rs);
  const clk=new THREE.Clock();
  (function loop(){requestAnimationFrame(loop);const t=clk.getElapsedTime();
    stars.rotation.y=t*.01;stars.rotation.x=t*.004;
    hearts.forEach(m=>{const d=m.userData;m.position.y+=d.v;m.position.x+=Math.sin(t+d.w)*.01;m.rotation.y+=.01;m.rotation.z+=d.r;if(m.position.y>28){m.position.y=-28;m.position.x=(Math.random()-.5)*60}});
    cam.position.x+=(mx*5-cam.position.x)*.03;cam.position.y+=(-my*4-scrollY*.004-cam.position.y)*.03;cam.lookAt(0,cam.position.y*.3,0);
    r.render(s,cam)})();
})();

