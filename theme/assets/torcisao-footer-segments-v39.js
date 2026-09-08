(function(){
'use strict';

function lang(){
  if(document.body?.classList.contains('tor-lang-en')) return 'en';
  if(document.body?.classList.contains('tor-lang-es')) return 'es';
  return 'pt';
}

const COPY={
  pt:{
    trefilados:'Unidade voltada à trefilação de aço',
    industrial:'Unidade voltada à mineração e construção civil'
  },
  en:{
    trefilados:'Unit focused on steel drawing',
    industrial:'Unit focused on mining and civil construction'
  },
  es:{
    trefilados:'Unidad dedicada al trefilado de acero',
    industrial:'Unidad dedicada a la minería y construcción civil'
  }
};

function addSegment(card,key){
  if(!card) return;
  const copy=card.querySelector('.tor-footer-company-copy');
  if(!copy) return;
  let el=copy.querySelector('.tor-footer-company-segment');
  if(!el){
    el=document.createElement('span');
    el.className='tor-footer-company-segment';
    copy.prepend(el);
  }
  el.textContent=COPY[lang()][key];
}

function apply(){
  const footer=document.querySelector('.tor-footer-v2');
  if(!footer) return false;
  addSegment(footer.querySelector('.tor-footer-company--trefilados'),'trefilados');
  addSegment(footer.querySelector('.tor-footer-company--industrial'),'industrial');
  return true;
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',apply);
}else{
  apply();
}

let tries=0;
const timer=setInterval(function(){
  tries++;
  if(apply()||tries>30) clearInterval(timer);
},120);
})();
