(function(){
'use strict';
if(document.documentElement.dataset.torHomeStabilityV35==='1')return;
document.documentElement.dataset.torHomeStabilityV35='1';

function openModal(id){
  const el=document.getElementById(id);if(!el)return;
  el.classList.add('is-open');el.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeModal(el){if(!el)return;el.classList.remove('is-open');el.setAttribute('aria-hidden','true');document.body.style.overflow='';}

/* Fallback independente para as duas ferramentas da Home. */
document.addEventListener('click',function(e){
  const tolerance=e.target.closest('#thToleranceOpen');
  const assistant=e.target.closest('#thAssistantOpen,#thAssistantOpenBottom,#tpeAssistant');
  const card=e.target.closest('#ferramentas-tecnicas .th-tool-card');
  if(tolerance){openModal('thToleranceModal');return;}
  if(assistant){openModal('thAssistantModal');return;}
  if(card&&!e.target.closest('a,input,select')){
    const cards=[...document.querySelectorAll('#ferramentas-tecnicas .th-tool-card')];
    openModal(cards.indexOf(card)===0?'thToleranceModal':'thAssistantModal');
  }
},true);
document.addEventListener('click',function(e){
  const tolerance=e.target.closest('[data-th-tolerance-close]');
  const assistant=e.target.closest('[data-th-assistant-close]');
  if(tolerance)closeModal(document.getElementById('thToleranceModal'));
  if(assistant)closeModal(document.getElementById('thAssistantModal'));
},true);

/* Nunca deixa a foto antiga aparecer entre uma opção de Barra e a galeria final. */
const MEDIA='https://torcisao.com.br/wp-content/uploads/2026/09/';
const BAR={
  btc:{trefilada:'barratrefiladabtca1.png',polida:'barrapolidabtca1.png'},
  mtc:{trefilada:'barratrefiladamtca1.png',polida:'barrapolidamtca1.png'},
  atc:{trefilada:'barratrefiladaatca1.png',polida:'barrapolidaatca1.png'},
  ressulfurado:{trefilada:'barratrefiladaressulfuradoa1.png',polida:'barrapolidaressulfuradoa1.png'}
};
let correctingUntil=0;
let expected='';
let imageObserver=null;
function activeValue(key){return document.querySelector('.tpe-option.is-active[data-tpe-key="'+key+'"]')?.dataset.tpeValue||'';}
function expectedBar(){
  const variant=activeValue('variant')||'btc';
  const finish=activeValue('finish')==='polida'?'polida':'trefilada';
  const file=(BAR[variant]||BAR.btc)[finish];
  return MEDIA+file;
}
function sameUrl(a,b){try{return new URL(a,location.href).href===new URL(b,location.href).href;}catch(e){return a===b;}}
function revealWhenReady(img){
  const show=()=>{if(Date.now()<=correctingUntil&&expected&&!sameUrl(img.src,expected))return;img.style.opacity='';};
  if(img.complete&&img.naturalWidth){if(img.decode)img.decode().then(show).catch(show);else show();}
  else img.addEventListener('load',show,{once:true});
}
function enforceBarImage(){
  const section=document.getElementById('produtos');
  const img=document.getElementById('tpeImage');
  if(!section||!img||section.querySelector('.tpe-line-tab.is-active')?.dataset.tpeLine!=='barra')return;
  expected=expectedBar();correctingUntil=Date.now()+1400;img.style.opacity='0';
  if(!sameUrl(img.src,expected)){img.src=expected;img.removeAttribute('srcset');}
  revealWhenReady(img);
  if(!imageObserver){
    imageObserver=new MutationObserver(()=>{
      if(Date.now()>correctingUntil||!expected)return;
      const current=document.getElementById('tpeImage');if(!current)return;
      if(!sameUrl(current.src,expected)){current.style.opacity='0';current.src=expected;current.removeAttribute('srcset');revealWhenReady(current);}
    });
    imageObserver.observe(img,{attributes:true,attributeFilter:['src']});
  }
  setTimeout(()=>{const current=document.getElementById('tpeImage');if(current&&Date.now()>=correctingUntil)current.style.opacity='';},1450);
}
document.addEventListener('click',function(e){
  const trigger=e.target.closest('.tpe-line-tab[data-tpe-line="barra"],#produtos .tpe-option');
  if(!trigger)return;
  const section=document.getElementById('produtos');
  const line=trigger.matches('.tpe-line-tab')?trigger.dataset.tpeLine:section?.querySelector('.tpe-line-tab.is-active')?.dataset.tpeLine;
  if(line!=='barra')return;
  const img=document.getElementById('tpeImage');if(img)img.style.opacity='0';
  setTimeout(enforceBarImage,0);
  requestAnimationFrame(()=>requestAnimationFrame(enforceBarImage));
},true);
})();