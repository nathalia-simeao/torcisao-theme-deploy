(function(){
'use strict';

if(!document.querySelector('.hf-page'))return;

function syncDrawerWidth(){
  const panel=document.querySelector('.hf-quote-drawer.is-open .hf-quote-panel')||document.querySelector('.hf-quote-panel');
  if(!panel)return;
  const width=panel.getBoundingClientRect().width;
  if(width>0)document.documentElement.style.setProperty('--tor-product-drawer-width',width+'px');
}

function syncState(){
  if(document.body.classList.contains('torcisao-form-drawer-open')){
    requestAnimationFrame(()=>requestAnimationFrame(syncDrawerWidth));
  }
}

const observer=new MutationObserver(syncState);
observer.observe(document.body,{attributes:true,attributeFilter:['class']});
window.addEventListener('resize',syncState,{passive:true});
syncState();
})();
