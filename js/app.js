(function(){
'use strict';
var WA='919057330033';
var $=function(id){return document.getElementById(id)};
var ICONS={
  wrench:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/></svg>',
  tyre:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21"/></svg>',
  battery:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="12" rx="1.5"/><path d="M7 7V5h3v2M14 7V5h3v2M12.5 10l-2.5 3.2h3.2L10.7 16"/></svg>',
  cloud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.3A3.4 3.4 0 0 0 6 18z"/><path d="M9.5 13.5l2 2 3.5-3.8"/></svg>',
  drop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/><path d="M9.5 15a2.6 2.6 0 0 0 2.5 2.2"/></svg>'
};
var SERVICES=[
  {id:'service',name:'Basic Service',tag:'Bike servicing',icon:'wrench',
   desc:'Bike ki basic servicing experienced mechanics aur automatic machines ke saath. Reviews mein bhi fast service ki taareef hai.',
   bul:['Basic bike servicing','Done with automatic machines','Handled by experienced mechanics']},
  {id:'parts',name:'Genuine Parts',tag:'Two wheeler parts',icon:'gear',
   desc:'Genuine two wheeler parts ek hi jagah mil jaate hain. Alag alag dukaan ghoomne ki zarurat nahi.',
   bul:['Genuine two wheeler parts','Everything at one place','Send your bike model on WhatsApp to ask for a part']},
  {id:'tyres',name:'Tyres',tag:'Tyres',icon:'tyre',
   desc:'Tyres bhi isi garage mein. Bike ke liye tyre chuno aur wahin lagwa lo.',
   bul:['Tyres for two wheelers','Available at the same garage','Ask for rates on WhatsApp']},
  {id:'battery',name:'Batteries',tag:'Batteries',icon:'battery',
   desc:'Bike ki batteries ek hi jagah. Self start na ho ya battery kamzor lage to yahin dikhwa lo.',
   bul:['Two wheeler batteries at one place','Tell us your bike model to check the right battery','Ask for rates on WhatsApp']},
  {id:'pollution',name:'Pollution Check',tag:'PUC',icon:'cloud',
   desc:'Pollution (PUC) check bhi isi garage mein ho jaata hai, service ke saath hi.',
   bul:['Pollution (PUC) check','Available at the same garage','Can be booked together with your service']},
  {id:'wash',name:'Bike Wash',tag:'Washing',icon:'drop',
   desc:'Bike washing aur saaf-safai. Ek review mein safai aur affordable price ki taareef ki gayi hai.',
   bul:['Bike washing and cleaning','Affordable price','Customers praise the cleaning']}
];
var RANKS=['Rookie Rider','Rookie Rider','Street Racer','Street Racer','Pit Crew','Pit Crew','Garage Legend'];
var active='service',chosen={};

function find(id){return SERVICES.filter(function(s){return s.id===id})[0]}
function chosenNames(){return SERVICES.filter(function(s){return chosen[s.id]}).map(function(s){return s.name})}
function wa(text){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(text)}

/* English messages */
function quickMsg(names){
  if(!names.length)return 'Hello Brohed Automotives! I would like to know more about your two wheeler services. Please share the rates and the next available slot.';
  if(names.length===1)return 'Hello Brohed Automotives! I am interested in '+names[0]+'. Please share the rate and the next available slot. My bike model: ';
  return 'Hello Brohed Automotives! I am interested in these services:\n'+names.map(function(n){return '- '+n}).join('\n')+'\nPlease share the rates and the next available slot. My bike model: ';
}
function fmtDate(v){
  if(!v)return '';
  var p=v.split('-');if(p.length!==3)return v;
  var m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return parseInt(p[2],10)+' '+m[parseInt(p[1],10)-1]+' '+p[0];
}
function bookingMsg(){
  var names=chosenNames(),L=[];
  L.push('Hello Brohed Automotives!');
  L.push('I would like to book a service.');
  L.push('');
  L.push('Name: '+($('fName').value.trim()||'-'));
  L.push('Bike: '+($('fBike').value.trim()||'-'));
  if($('fReg').value.trim())L.push('Bike number: '+$('fReg').value.trim());
  L.push('Services:');
  if(names.length)names.forEach(function(n){L.push('- '+n)});else L.push('- (not selected yet)');
  if($('fDate').value)L.push('Preferred date: '+fmtDate($('fDate').value));
  if($('fTime').value)L.push('Preferred time: '+$('fTime').value);
  L.push('Bike drop: '+$('fPick').value);
  if($('fNote').value.trim())L.push('Note: '+$('fNote').value.trim());
  L.push('');
  L.push('Please confirm the availability and the rates. Thank you!');
  return L.join('\n');
}

/* render */
function renderCards(){
  var h='';
  SERVICES.forEach(function(s){
    h+='<button type="button" class="card'+(chosen[s.id]?' on':'')+'" data-id="'+s.id+'"'+(s.id===active?' aria-current="true"':'')+'>'+
      '<span class="chk">ADDED</span>'+ICONS[s.icon]+'<b>'+s.name+'</b><small>'+s.tag+'</small></button>';
  });
  $('cards').innerHTML=h;
}
function renderSheet(){
  var s=find(active),on=!!chosen[s.id];
  $('sheet').innerHTML=
    '<div class="ico">'+ICONS[s.icon]+'</div>'+
    '<div><div class="tag">'+s.tag+'</div><h2>'+s.name+'</h2></div>'+
    '<div class="body"><p class="desc">'+s.desc+' Rate pata karne ke liye WhatsApp karo.</p><ul>'+s.bul.map(function(b){return '<li>'+b+'</li>'}).join('')+'</ul></div>'+
    '<div class="acts">'+
      '<button type="button" class="btn add" id="addBtn" aria-pressed="'+on+'">'+(on?'Quest mein hai':'Quest mein jodo')+'</button>'+
      '<a class="btn wa" href="'+wa(quickMsg([s.name]))+'" target="_blank" rel="noopener">Is service ke liye WhatsApp</a>'+
    '</div>';
  $('hudName').textContent=s.name;
}
function renderPickers(){
  $('pickers').innerHTML=SERVICES.map(function(s){
    return '<button type="button" class="pick" data-id="'+s.id+'" aria-pressed="'+(!!chosen[s.id])+'">'+s.name+'</button>';
  }).join('');
}
function renderBook(){
  var msg=bookingMsg();
  $('bubble').textContent=msg;
  $('waSend').href=wa(msg);
}
function renderState(){
  var n=chosenNames().length,hp=Math.min(100,55+n*9);
  $('meterFill').style.width=hp+'%';
  $('meterNum').textContent=hp+'%';
  $('lvl').textContent='LVL '+(Math.floor(n/2)+1)+' · '+RANKS[n];
  var link=wa(quickMsg(chosenNames()));
  ['waTop','waInfo','waBand','waFab'].forEach(function(id){$(id).href=link});
  var bar=$('questbar');
  if(n){
    $('qbText').innerHTML='<b>'+n+'</b> '+(n===1?'service':'services')+' chuni. Bike health <b>'+hp+'%</b>';
    bar.classList.add('show');
  }else bar.classList.remove('show');
  renderPickers();renderBook();
}
function select(id){
  active=id;renderCards();renderSheet();
  if(window.__brohed3d)window.__brohed3d.focus(id);
}
function toggle(id){
  if(chosen[id])delete chosen[id];else chosen[id]=true;
  renderCards();renderSheet();renderState();
}
$('cards').addEventListener('click',function(e){var b=e.target.closest('.card');if(b)select(b.getAttribute('data-id'))});
$('sheet').addEventListener('click',function(e){if(e.target.closest('#addBtn'))toggle(active)});
$('pickers').addEventListener('click',function(e){var b=e.target.closest('.pick');if(b)toggle(b.getAttribute('data-id'))});
['fName','fBike','fReg','fDate','fTime','fPick','fNote'].forEach(function(id){
  $(id).addEventListener('input',renderBook);$(id).addEventListener('change',renderBook);
});
$('waSend').addEventListener('click',function(e){
  var err=$('err');
  if(!$('fName').value.trim()){e.preventDefault();err.textContent='Pehle apna naam likho.';$('fName').focus();return}
  if(!chosenNames().length){e.preventDefault();err.textContent='Kam se kam ek service chuno.';return}
  err.textContent='';
});
try{
  var d=new Date(),pad=function(n){return (n<10?'0':'')+n};
  $('fDate').min=d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
}catch(_){}
renderCards();renderSheet();renderState();

/* ticker */
(function(){
  var names=SERVICES.map(function(s){return s.name}).concat(['Two wheeler garage','Jagatpura Jaipur']);
  var one=names.map(function(n){return '<span>'+n+'</span>'}).join('');
  $('ticker').innerHTML=one+one+one+one;
})();

/* count up */
(function(){
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  document.querySelectorAll('[data-count]').forEach(function(el){
    var end=parseInt(el.getAttribute('data-count'),10),t0=null;
    function step(t){
      if(t0===null)t0=t;
      var p=Math.min(1,(t-t0)/1100);
      el.textContent=Math.round(end*(1-Math.pow(1-p,3)));
      if(p<1)requestAnimationFrame(step);
    }
    el.textContent='0';requestAnimationFrame(step);
  });
})();

/* hero tilt */
(function(){
  var shot=$('shot'),inn=$('shotIn');
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  shot.addEventListener('pointermove',function(e){
    if(e.pointerType==='touch')return;
    var r=shot.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-0.5,y=(e.clientY-r.top)/r.height-0.5;
    inn.style.setProperty('--ry',(x*14)+'deg');inn.style.setProperty('--rx',(-y*10)+'deg');
  });
  shot.addEventListener('pointerleave',function(){inn.style.setProperty('--ry','0deg');inn.style.setProperty('--rx','0deg')});
})();

/* copy */
function copyText(text,msg,nodeId){
  var t=$('toast');
  function ok(){t.textContent=msg;setTimeout(function(){t.textContent=''},2400)}
  function fb(){
    try{var r=document.createRange();r.selectNodeContents($(nodeId));var s=getSelection();s.removeAllRanges();s.addRange(r);t.textContent='Copy nahi hua, text select kar diya hai.'}catch(e){}
  }
  try{navigator.clipboard.writeText(text).then(ok,fb)}catch(e){fb()}
}
$('copyAddr').addEventListener('click',function(){copyText($('addr').textContent,'Address copy ho gaya.','addr')});
$('copyNum').addEventListener('click',function(){copyText('9057330033','Number copy ho gaya.','num')});

/* tab highlight */
(function(){
  var tabs={};
  document.querySelectorAll('.tab[data-s]').forEach(function(t){tabs[t.getAttribute('data-s')]=t});
  if(!('IntersectionObserver' in window))return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting&&tabs[en.target.id]){
        Object.keys(tabs).forEach(function(k){tabs[k].classList.toggle('active',k===en.target.id)});
      }
    });
  },{rootMargin:'-35% 0px -55% 0px'});
  ['home','services','book','reviews','location'].forEach(function(id){io.observe($(id))});
})();

/* ================= 3D garage ================= */
var stage=$('stage'),canvas=$('gl');
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var renderer;
try{
  if(!window.THREE)throw new Error('no three');
  renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true});
}catch(err){
  stage.classList.add('nogl');
  $('noglLogo').src=document.querySelector('.logo').src;
  return;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
renderer.outputEncoding=THREE.sRGBEncoding;
var scene=new THREE.Scene();
scene.background=new THREE.Color(0x0d0d0c);
scene.fog=new THREE.Fog(0x0d0d0c,14,30);
var camera=new THREE.PerspectiveCamera(38,1.4,0.1,60);

scene.add(new THREE.HemisphereLight(0xffffff,0x2a2410,0.85));
var key=new THREE.DirectionalLight(0xffffff,0.9);key.position.set(4,7,5);scene.add(key);
var rimL=new THREE.PointLight(0xffc700,1.3,16);rimL.position.set(-4,3,-3);scene.add(rimL);
var frontL=new THREE.PointLight(0xffc700,0.7,14);frontL.position.set(4,2,4);scene.add(frontL);
var pulseL=new THREE.PointLight(0xffc700,0,8);scene.add(pulseL);

var M={
  black:new THREE.MeshStandardMaterial({color:0x121212,roughness:0.3,metalness:0.6}),
  yellow:new THREE.MeshStandardMaterial({color:0xffc700,roughness:0.4,metalness:0.3}),
  glow:new THREE.MeshStandardMaterial({color:0xffc700,emissive:0xffc700,emissiveIntensity:0.9,roughness:0.4}),
  steel:new THREE.MeshStandardMaterial({color:0xbdbdb6,roughness:0.25,metalness:0.9}),
  gun:new THREE.MeshStandardMaterial({color:0x3b3b38,roughness:0.45,metalness:0.8}),
  tyre:new THREE.MeshStandardMaterial({color:0x0a0a0a,roughness:0.9,metalness:0}),
  lamp:new THREE.MeshStandardMaterial({color:0xfff2b0,emissive:0xffe27a,emissiveIntensity:1.3}),
  platform:new THREE.MeshStandardMaterial({color:0x1d1d1b,roughness:0.6,metalness:0.4}),
  floor:new THREE.MeshStandardMaterial({color:0x151513,roughness:0.55,metalness:0.35}),
  green:new THREE.MeshStandardMaterial({color:0x35d07f,emissive:0x35d07f,emissiveIntensity:0.8,roughness:0.4})
};
var V=THREE.Vector3;

function bar(a,b,r,mat){
  var d=new V().subVectors(b,a),len=d.length();
  var m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,12),mat);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new V(0,1,0),d.normalize());
  return m;
}
function makeGear(r,teeth,depth,holeR){
  var s=new THREE.Shape(),step=Math.PI*2/teeth,ri=r*0.82,first=true,t,p,pts;
  for(t=0;t<teeth;t++){
    var a=t*step;
    pts=[[a,ri],[a+step*0.15,r],[a+step*0.45,r],[a+step*0.6,ri]];
    for(p=0;p<pts.length;p++){
      var x=Math.cos(pts[p][0])*pts[p][1],y=Math.sin(pts[p][0])*pts[p][1];
      if(first){s.moveTo(x,y);first=false}else s.lineTo(x,y);
    }
  }
  var hole=new THREE.Path();hole.absarc(0,0,holeR,0,Math.PI*2,true);s.holes.push(hole);
  var g=new THREE.ExtrudeGeometry(s,{depth:depth,bevelEnabled:false});
  g.translate(0,0,-depth/2);
  return g;
}

/* bike */
var bike=new THREE.Group();
function makeWheel(){
  var g=new THREE.Group(),spin=new THREE.Group();g.add(spin);
  spin.add(new THREE.Mesh(new THREE.TorusGeometry(0.5,0.13,16,48),M.tyre));
  spin.add(new THREE.Mesh(new THREE.TorusGeometry(0.38,0.025,8,48),M.yellow));
  for(var i=0;i<8;i++){
    var sp=new THREE.Mesh(new THREE.BoxGeometry(0.76,0.018,0.03),M.yellow);
    sp.rotation.z=i*Math.PI/8;spin.add(sp);
  }
  var hub=new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,0.16,16),M.steel);hub.rotation.x=Math.PI/2;spin.add(hub);
  var disc=new THREE.Mesh(new THREE.CylinderGeometry(0.27,0.27,0.014,32),M.steel);disc.rotation.x=Math.PI/2;disc.position.z=0.08;spin.add(disc);
  return {g:g,spin:spin};
}
var wf=makeWheel(),wr=makeWheel();
wf.g.position.set(1.25,0.63,0);wr.g.position.set(-1.25,0.63,0);
bike.add(wf.g,wr.g);
var engine=new THREE.Mesh(new THREE.BoxGeometry(0.95,0.6,0.5),M.gun);engine.position.set(0.05,0.8,0);bike.add(engine);
var head=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.22,0.5,16),M.gun);head.position.set(0.25,1.2,0);head.rotation.z=-0.35;bike.add(head);
var cap=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,0.08,16),M.yellow);cap.position.set(0.19,1.45,0);cap.rotation.z=-0.35;bike.add(cap);
var tank=new THREE.Mesh(new THREE.SphereGeometry(0.6,24,16),M.black);tank.scale.set(1,0.52,0.58);tank.position.set(0.5,1.42,0);bike.add(tank);
var stripe=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.03,0.12),M.yellow);stripe.position.set(0.5,1.72,0);stripe.rotation.z=-0.05;bike.add(stripe);
var seat=new THREE.Mesh(new THREE.BoxGeometry(1.05,0.16,0.42),M.black);seat.position.set(-0.55,1.3,0);bike.add(seat);
var tail=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.2,0.36),M.yellow);tail.position.set(-1.3,1.42,0);tail.rotation.z=0.18;bike.add(tail);
var fender=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.04,0.3),M.black);fender.position.set(-1.5,1.05,0);fender.rotation.z=-0.2;bike.add(fender);
bike.add(bar(new V(0.0,0.7,0.2),new V(-1.25,0.63,0.2),0.045,M.steel));
bike.add(bar(new V(0.0,0.7,-0.2),new V(-1.25,0.63,-0.2),0.045,M.steel));
bike.add(bar(new V(1.1,1.6,0.2),new V(1.25,0.63,0.2),0.045,M.yellow));
bike.add(bar(new V(1.1,1.6,-0.2),new V(1.25,0.63,-0.2),0.045,M.yellow));
bike.add(bar(new V(1.05,1.8,-0.55),new V(1.05,1.8,0.55),0.035,M.black));
bike.add(bar(new V(0.9,1.1,0),new V(1.1,1.6,0),0.06,M.gun));
var fairing=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.5,0.46),M.yellow);fairing.position.set(1.22,1.5,0);fairing.rotation.z=-0.3;bike.add(fairing);
var lamp=new THREE.Mesh(new THREE.SphereGeometry(0.17,16,12),M.lamp);lamp.scale.set(0.6,1,1);lamp.position.set(1.5,1.45,0);bike.add(lamp);
bike.add(bar(new V(0.25,0.55,-0.29),new V(-1.7,0.82,-0.29),0.1,M.steel));
var exCap=new THREE.Mesh(new THREE.CylinderGeometry(0.11,0.11,0.06,16),M.black);exCap.rotation.z=Math.PI/2;exCap.position.set(-1.72,0.82,-0.29);bike.add(exCap);
bike.position.y=0.19;
scene.add(bike);

/* lift bay */
var lift=new THREE.Group();
var plat=new THREE.Mesh(new THREE.BoxGeometry(5.4,0.18,1.5),M.platform);plat.position.y=0.09;lift.add(plat);
[-0.7,0.7].forEach(function(z){var st=new THREE.Mesh(new THREE.BoxGeometry(5.4,0.02,0.1),M.glow);st.position.set(0,0.185,z);lift.add(st)});
var ramp=new THREE.Mesh(new THREE.BoxGeometry(1.3,0.08,1.5),M.yellow);ramp.position.set(3.2,0.07,0);ramp.rotation.z=0.14;lift.add(ramp);
var ramp2=ramp.clone();ramp2.position.x=-3.2;ramp2.rotation.z=-0.14;lift.add(ramp2);
scene.add(lift);

var floor=new THREE.Mesh(new THREE.CircleGeometry(9,64),M.floor);floor.rotation.x=-Math.PI/2;scene.add(floor);
[[3.8,3.86],[5.6,5.64]].forEach(function(r){
  var ring=new THREE.Mesh(new THREE.RingGeometry(r[0],r[1],96),M.glow);ring.rotation.x=-Math.PI/2;ring.position.y=0.01;scene.add(ring);
});

/* garage props: tyre stacks, oil cans, toolbox, helmet, floating gears */
(function(){
  function stack(x,z,n){
    for(var i=0;i<n;i++){
      var t=new THREE.Mesh(new THREE.TorusGeometry(0.42,0.16,12,32),M.tyre);
      t.rotation.x=Math.PI/2;t.position.set(x,0.16+i*0.32,z);t.rotation.z=i*0.7;scene.add(t);
    }
  }
  stack(-4.6,-2.4,5);stack(-3.7,-3.1,3);
  var can=new THREE.CylinderGeometry(0.14,0.14,0.42,14),band=new THREE.CylinderGeometry(0.145,0.145,0.12,14);
  for(var i=0;i<3;i++)for(var j=0;j<2;j++){
    var c=new THREE.Mesh(can,M.yellow);c.position.set(4.0+i*0.36,0.21,-2.4-j*0.36);scene.add(c);
    var b=new THREE.Mesh(band,M.black);b.position.copy(c.position);scene.add(b);
  }
  var tb=new THREE.Mesh(new THREE.BoxGeometry(1.1,0.8,0.62),M.yellow);tb.position.set(4.3,0.4,-3.5);scene.add(tb);
  [0.18,0.4,0.62].forEach(function(y){var dr=new THREE.Mesh(new THREE.BoxGeometry(1.06,0.03,0.04),M.black);dr.position.set(4.3,y,-3.17);scene.add(dr)});
  var helm=new THREE.Mesh(new THREE.SphereGeometry(0.3,20,16),M.black);helm.position.set(3.4,0.3,2.4);scene.add(helm);
  var visor=new THREE.Mesh(new THREE.BoxGeometry(0.34,0.14,0.5),M.glow);visor.position.set(3.58,0.34,2.4);scene.add(visor);
})();
var decor=[];
(function(){
  var a=new THREE.Mesh(makeGear(0.7,14,0.16,0.2),M.yellow);a.position.set(-4,3.6,-3.4);scene.add(a);decor.push([a,0.25]);
  var b=new THREE.Mesh(makeGear(0.5,10,0.16,0.15),M.steel);b.position.set(-3.0,3.0,-3.4);scene.add(b);decor.push([b,-0.35]);
  var c=new THREE.Mesh(makeGear(0.55,12,0.16,0.16),M.yellow);c.position.set(4.2,3.3,-3.6);scene.add(c);decor.push([c,-0.3]);
})();

/* logo backdrop */
new THREE.TextureLoader().load(document.querySelector('.logo').src,function(tex){
  tex.encoding=THREE.sRGBEncoding;
  var disc=new THREE.Mesh(new THREE.CircleGeometry(2.3,64),new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide}));
  disc.position.set(0,3.6,-5);scene.add(disc);
  var halo=new THREE.Mesh(new THREE.RingGeometry(2.3,2.46,64),new THREE.MeshBasicMaterial({color:0xffc700,side:THREE.DoubleSide}));
  halo.position.set(0,3.6,-5.01);scene.add(halo);
});

/* dust */
var dustN=90,dustPos=new Float32Array(dustN*3);
for(var di=0;di<dustN;di++){dustPos[di*3]=(Math.random()-0.5)*14;dustPos[di*3+1]=Math.random()*5;dustPos[di*3+2]=(Math.random()-0.5)*14}
var dustGeo=new THREE.BufferGeometry();dustGeo.setAttribute('position',new THREE.BufferAttribute(dustPos,3));
var dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0xffc700,size:0.05,transparent:true,opacity:0.6}));
scene.add(dust);

/* service effects */
var FX={};
function addFx(id,g,update){g.visible=false;g.scale.setScalar(0.001);scene.add(g);FX[id]={g:g,s:0,update:update}}

(function(){ /* basic service */
  var g=new THREE.Group();
  var g1=new THREE.Mesh(makeGear(0.5,12,0.14,0.14),M.yellow);g1.position.set(0,1.0,0.75);
  var g2=new THREE.Mesh(makeGear(0.35,9,0.14,0.1),M.steel);g2.position.set(0.8,1.15,0.75);
  var g3=new THREE.Mesh(makeGear(0.28,8,0.14,0.08),M.yellow);g3.position.set(0.35,1.7,0.75);
  g.add(g1,g2,g3);
  var w=new THREE.Group();
  w.add(new THREE.Mesh(new THREE.BoxGeometry(0.12,0.95,0.06),M.steel));
  var h1=new THREE.Mesh(new THREE.TorusGeometry(0.15,0.055,8,16,Math.PI*1.6),M.steel);h1.position.y=0.5;h1.rotation.z=Math.PI*0.7;w.add(h1);
  var h2=h1.clone();h2.position.y=-0.5;h2.rotation.z=-Math.PI*0.3;w.add(h2);
  w.position.set(-0.9,2.1,0.6);g.add(w);
  var n=60,sp=new Float32Array(n*3),sv=[],i;
  for(i=0;i<n;i++){sp[i*3]=0.1;sp[i*3+1]=1;sp[i*3+2]=0.4;sv.push({vx:(Math.random()-0.5)*1.4,vy:Math.random()*1.6+0.4,vz:(Math.random()-0.2)*0.8,l:Math.random()})}
  var sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(sp,3));
  g.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xffd633,size:0.07})));
  addFx('service',g,function(t,dt){
    g1.rotation.z+=dt*0.9;g2.rotation.z-=dt*1.3;g3.rotation.z+=dt*1.6;
    w.rotation.z=Math.sin(t*2)*0.5+0.6;
    for(var i=0;i<n;i++){
      var p=sv[i];p.l+=dt*0.9;
      if(p.l>1){p.l=0;sp[i*3]=0.1;sp[i*3+1]=1.0;sp[i*3+2]=0.45;p.vx=(Math.random()-0.5)*1.4;p.vy=Math.random()*1.6+0.4;p.vz=(Math.random()-0.2)*0.8}
      sp[i*3]+=p.vx*dt;sp[i*3+1]+=p.vy*dt;sp[i*3+2]+=p.vz*dt;p.vy-=dt*2;
    }
    sg.attributes.position.needsUpdate=true;
  });
})();

(function(){ /* genuine parts */
  var g=new THREE.Group(),items=[];
  function plug(){var p=new THREE.Group();p.add(new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.5,10),M.steel));var b=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.14,6),M.yellow);b.position.y=0.1;p.add(b);return p}
  function filter(){var p=new THREE.Group();p.add(new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,0.42,20),M.yellow));p.add(new THREE.Mesh(new THREE.CylinderGeometry(0.225,0.225,0.1,20),M.black));return p}
  function disc(){return new THREE.Mesh(new THREE.CylinderGeometry(0.36,0.36,0.05,28),M.steel)}
  function sprocket(){return new THREE.Mesh(makeGear(0.36,14,0.06,0.12),M.yellow)}
  function airbox(){var p=new THREE.Group();p.add(new THREE.Mesh(new THREE.BoxGeometry(0.5,0.3,0.34),M.black));var s=new THREE.Mesh(new THREE.BoxGeometry(0.52,0.04,0.36),M.glow);s.position.y=0.05;p.add(s);return p}
  [plug(),filter(),disc(),sprocket(),airbox(),plug()].forEach(function(o,i){g.add(o);items.push({o:o,a:i/6*Math.PI*2,y:1.3+(i%2)*0.5})});
  addFx('parts',g,function(t,dt){
    items.forEach(function(it,i){
      var a=it.a+t*0.5;
      it.o.position.set(Math.cos(a)*2.7,it.y+Math.sin(t*1.5+i)*0.15,Math.sin(a)*1.9);
      it.o.rotation.x+=dt*0.8;it.o.rotation.y+=dt*1.1;
    });
  });
})();

(function(){ /* tyres */
  var g=new THREE.Group(),rings=[];
  [1.25,-1.25].forEach(function(x){
    var r=new THREE.Mesh(new THREE.TorusGeometry(0.8,0.035,8,64),M.glow);
    r.position.set(x,0.82,0);g.add(r);rings.push(r);
  });
  addFx('tyres',g,function(t){
    rings.forEach(function(r,i){var s=1+Math.sin(t*3+i)*0.06;r.scale.set(s,s,1)});
    M.glow.emissiveIntensity=0.9+Math.sin(t*3)*0.3;
  });
})();

(function(){ /* battery */
  var g=new THREE.Group();
  var s=new THREE.Shape();
  s.moveTo(0.3,1);s.lineTo(-0.5,-0.1);s.lineTo(-0.05,-0.1);s.lineTo(-0.3,-1);s.lineTo(0.5,0.15);s.lineTo(0.05,0.15);s.closePath();
  var bg=new THREE.ExtrudeGeometry(s,{depth:0.22,bevelEnabled:true,bevelSize:0.03,bevelThickness:0.03,bevelSegments:2});
  bg.translate(0,0,-0.11);
  var bolt=new THREE.Mesh(bg,M.glow);bolt.scale.setScalar(0.75);bolt.position.set(-0.3,2.9,0);g.add(bolt);
  var box=new THREE.Mesh(new THREE.BoxGeometry(0.62,0.36,0.34),M.black);box.position.set(-0.55,1.0,0);g.add(box);
  var band=new THREE.Mesh(new THREE.BoxGeometry(0.64,0.07,0.36),M.glow);band.position.set(-0.55,1.0,0);g.add(band);
  [-0.18,0.18].forEach(function(dx){var tm=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,0.08,8),M.steel);tm.position.set(-0.55+dx,1.22,0);g.add(tm)});
  addFx('battery',g,function(t){
    bolt.rotation.y=t*1.2;bolt.position.y=2.9+Math.sin(t*2)*0.12;
    M.glow.emissiveIntensity=0.8+Math.sin(t*4)*0.4;
    pulseL.position.set(-0.4,2.6,0.6);pulseL.intensity=1.2+Math.sin(t*4)*0.8;
  });
})();

(function(){ /* pollution */
  var g=new THREE.Group(),puffs=[],N=12,i;
  for(i=0;i<N;i++){
    var mat=new THREE.MeshStandardMaterial({color:0x777777,transparent:true,opacity:0.4,roughness:1});
    var m=new THREE.Mesh(new THREE.SphereGeometry(0.12,12,10),mat);g.add(m);puffs.push({m:m,mat:mat,ph:i/N,seed:Math.random()*6});
  }
  var badge=new THREE.Group();
  badge.add(new THREE.Mesh(new THREE.TorusGeometry(0.62,0.06,12,48),M.green));
  var c1=new THREE.Mesh(new THREE.BoxGeometry(0.22,0.08,0.06),M.green);c1.position.set(-0.17,-0.06,0);c1.rotation.z=-Math.PI/4;
  var c2=new THREE.Mesh(new THREE.BoxGeometry(0.52,0.08,0.06),M.green);c2.position.set(0.1,0.03,0);c2.rotation.z=Math.PI/3.4;
  badge.add(c1,c2);badge.position.set(-2.9,2.0,-0.3);g.add(badge);
  var grey=new THREE.Color(0x777777),mint=new THREE.Color(0xa6f0c8);
  addFx('pollution',g,function(t){
    puffs.forEach(function(p){
      var k=(t*0.35+p.ph)%1;
      p.m.position.set(-1.78-k*1.5,0.84+k*0.8+Math.sin(t+p.seed)*0.05,-0.29+Math.sin(k*5+p.seed)*0.12);
      p.m.scale.setScalar(0.6+k*2.2);
      p.mat.opacity=(1-k)*0.45;
      p.mat.color.copy(grey).lerp(mint,k);
    });
    badge.lookAt(camera.position);
    var s=1+Math.sin(t*3)*0.05;badge.scale.set(s,s,s);
  });
})();

(function(){ /* wash */
  var g=new THREE.Group(),bubs=[],N=38,i;
  var mat=new THREE.MeshStandardMaterial({color:0xd8f3ff,transparent:true,opacity:0.38,roughness:0.1,metalness:0,emissive:0x2a4a58,emissiveIntensity:0.4});
  var geo=new THREE.SphereGeometry(1,14,12);
  for(i=0;i<N;i++){
    var m=new THREE.Mesh(geo,mat);m.scale.setScalar(0.05+Math.random()*0.16);
    var a=Math.random()*6.28,d=0.4+Math.random()*2.6;
    bubs.push({m:m,x:Math.cos(a)*d*1.2,z:Math.sin(a)*d*0.6,y:Math.random()*3.2,v:0.25+Math.random()*0.5,ph:Math.random()*6});
    g.add(m);
  }
  addFx('wash',g,function(t,dt){
    bubs.forEach(function(b){
      b.y+=b.v*dt;if(b.y>3.4)b.y=0.1;
      b.m.position.set(b.x+Math.sin(t*1.2+b.ph)*0.12,b.y,b.z+Math.cos(t+b.ph)*0.12);
    });
  });
})();

/* camera */
var PRESETS={
  home:   {th:0.6, ph:1.25,r:7.6,t:[0,1.0,0]},
  service:{th:0.5, ph:1.3, r:5.2,t:[0.1,1.1,0.2]},
  parts:  {th:-0.4,ph:1.15,r:7.8,t:[0,1.2,0]},
  tyres:  {th:-0.8,ph:1.3, r:4.6,t:[-1.1,0.8,0]},
  battery:{th:0.25,ph:1.2, r:5.4,t:[-0.4,1.6,0]},
  pollution:{th:-1.1,ph:1.35,r:5.4,t:[-1.7,1.2,-0.2]},
  wash:   {th:0.9, ph:1.1, r:8.4,t:[0,1.3,0]}
};
var cam={th:0.6,ph:1.25,r:7.6,x:0,y:1,z:0},goal={th:0.6,ph:1.25,r:7.6,x:0,y:1,z:0};
var activeFx=null,fit=1,clock=0;
function wrapAngle(a,ref){var d=((a-ref+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;return ref+d}
function focus(id){
  var p=PRESETS[id]||PRESETS.home;
  goal.th=wrapAngle(p.th,cam.th);goal.ph=p.ph;goal.r=p.r;goal.x=p.t[0];goal.y=p.t[1];goal.z=p.t[2];
  activeFx=FX[id]?id:null;
  if(reduce){cam.th=goal.th;cam.ph=goal.ph;cam.r=goal.r;cam.x=goal.x;cam.y=goal.y;cam.z=goal.z}
}
window.__brohed3d={focus:focus};
focus(active);
cam.th=goal.th;cam.ph=goal.ph;cam.r=goal.r;cam.x=goal.x;cam.y=goal.y;cam.z=goal.z;

function resize(){
  var w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;
  renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
  fit=Math.max(1,1.25/camera.aspect);
}
if(window.ResizeObserver)new ResizeObserver(resize).observe(stage);else window.addEventListener('resize',resize);
resize();

var drag=null,hint=$('hint');
canvas.addEventListener('pointerdown',function(e){
  drag={x:e.clientX,y:e.clientY};
  try{canvas.setPointerCapture(e.pointerId)}catch(_){}
  stage.classList.add('dragging');hint.classList.add('gone');
});
canvas.addEventListener('pointermove',function(e){
  if(!drag)return;
  goal.th-=(e.clientX-drag.x)*0.008;
  goal.ph=Math.max(0.75,Math.min(1.6,goal.ph-(e.clientY-drag.y)*0.004));
  drag.x=e.clientX;drag.y=e.clientY;
});
function endDrag(){drag=null;stage.classList.remove('dragging')}
canvas.addEventListener('pointerup',endDrag);
canvas.addEventListener('pointercancel',endDrag);
canvas.addEventListener('lostpointercapture',endDrag);

var onScreen=true;
if('IntersectionObserver' in window){
  new IntersectionObserver(function(en){onScreen=en[0].isIntersecting},{threshold:0}).observe(stage);
}

var last=performance.now(),calm=reduce?0.25:1;
function frame(now){
  requestAnimationFrame(frame);
  var dt=Math.min(0.05,(now-last)/1000);last=now;
  if(!onScreen||document.hidden)return;
  clock+=dt*calm;
  var k=reduce?1:1-Math.exp(-dt*4.5);
  cam.th+=(goal.th-cam.th)*k;cam.ph+=(goal.ph-cam.ph)*k;cam.r+=(goal.r-cam.r)*k;
  cam.x+=(goal.x-cam.x)*k;cam.y+=(goal.y-cam.y)*k;cam.z+=(goal.z-cam.z)*k;
  var th=cam.th+(reduce?0:Math.sin(clock*0.45)*0.16),sp=Math.sin(cam.ph),r=cam.r*fit;
  camera.position.set(cam.x+r*sp*Math.sin(th),cam.y+r*Math.cos(cam.ph),cam.z+r*sp*Math.cos(th));
  camera.lookAt(cam.x,cam.y,cam.z);

  var spinSpeed=(activeFx==='tyres'?3.2:0.7)*calm;
  wf.spin.rotation.z-=dt*spinSpeed;wr.spin.rotation.z-=dt*spinSpeed;
  rimL.intensity=1.3+Math.sin(clock*0.8)*0.2;
  if(activeFx!=='battery')pulseL.intensity=0;
  decor.forEach(function(d){d[0].rotation.z+=dt*d[1]*calm});

  for(var id in FX){
    var f=FX[id],target=(id===activeFx)?1:0;
    f.s+=(target-f.s)*Math.min(1,dt*6);
    if(f.s<0.02&&target===0){f.g.visible=false;continue}
    f.g.visible=true;f.g.scale.setScalar(Math.max(0.001,f.s));
    if(id===activeFx)f.update(clock,dt*calm);
  }
  if(activeFx!=='tyres'&&activeFx!=='battery')M.glow.emissiveIntensity=0.9;
  dust.rotation.y+=dt*0.02*calm;
  renderer.render(scene,camera);
}
requestAnimationFrame(frame);
})();
