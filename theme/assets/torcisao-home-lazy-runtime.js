(function(){
'use strict';
if(window.__torcisaoHomeLazyRuntime)return;
window.__torcisaoHomeLazyRuntime=true;

const current=document.currentScript;
const base=current&&current.src?new URL('./',current.src).href:'/wp-content/themes/theme/assets/';
const loaded=new Map();

function load(name,version){
  const key=name+'?v='+version;
  if(loaded.has(key))return loaded.get(key);
  const p=new Promise((resolve,reject)=>{
    const s=document.createElement('script');
    s.src=base+name+'?v='+version;
    s.defer=true;
    s.onload=()=>resolve(s);
    s.onerror=reject;
    document.body.appendChild(s);
  });
  loaded.set(key,p);
  return p;
}
function near(selector,callback,margin='250px'){
  const el=document.querySelector(selector);
  if(!el)return;
  if(!('IntersectionObserver' in window)){callback();return;}
  const io=new IntersectionObserver(entries=>{
    if(entries.some(e=>e.isIntersecting)){
      io.disconnect();
      callback();
    }
  },{rootMargin:margin+' 0px'});
  io.observe(el);
}
function onceIntent(selector,callback){
  let done=false;
  function run(e){
    const hit=e.target&&e.target.closest?e.target.closest(selector):null;
    if(!hit||done)return;
    done=true;
    cleanup();
    callback();
  }
  function cleanup(){
    document.removeEventListener('pointerover',run,true);
    document.removeEventListener('focusin',run,true);
    document.removeEventListener('click',run,true);
  }
  document.addEventListener('pointerover',run,true);
  document.addEventListener('focusin',run,true);
  document.addEventListener('click',run,true);
}

near('#produtos',async()=>{
  await load('torcisao-products-explorer.js','20260924-2');
  await load('torcisao-home-product-gallery-v24.js','20260924-2');
  if(window.matchMedia&&window.matchMedia('(min-width: 992px) and (pointer:fine)').matches){
    await load('torcisao-explorer-image-calibration.js','20260924-1');
    await load('torcisao-explorer-pre3d.js','20260924-1');
  }
},'220px');

near('#qualidade',()=>load('torcisao-quality-recovery.js','20260924-1'),'420px');
near('#numeros',()=>load('torcisao-social-proof.js','20260924-1'),'420px');
near('#quem-somos',async()=>{
  await load('torcisao-about-history.js','20260924-1');
  await load('torcisao-timeline-mobile.js','20260924-1');
},'420px');

near('#rodape',async()=>{
  await load('torcisao-footer-recovery.js','20260924-1');
  await load('torcisao-footer-group-v2.js','20260924-1');
  await load('torcisao-footer-segments-v39.js','20260924-1');
},'700px');

onceIntent('#torcisaoCalcOpen',async()=>{
  await load('torcisao-haste-calculator-fix-v38.js','20260924-1');
  await load('torcisao-calculator-input-polish-v40.js','20260924-1');
});
})();