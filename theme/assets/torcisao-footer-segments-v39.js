(function(){
'use strict';

function lang(){
  const htmlLang=(document.documentElement.lang||'').toLowerCase();
  const path=(location.pathname||'').toLowerCase();
  if(document.body?.classList.contains('tor-lang-en')||htmlLang.startsWith('en')||path.startsWith('/en/')) return 'en';
  if(document.body?.classList.contains('tor-lang-es')||htmlLang.startsWith('es')||path.startsWith('/es/')) return 'es';
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

function fixElo(){
  const elo=document.querySelector('.tor-pay-elo');
  if(!elo) return;
  if(elo.textContent.trim()!=='ELO') elo.textContent='ELO';
  elo.setAttribute('aria-label','Elo');
}

let spanishEyebrowObserver=null;
function fixSpanishProductEyebrow(){
  if(lang()!=='es') return;
  const root=document.getElementById('barra-trefilada');
  const eyebrow=root?.querySelector('.hf-eyebrow');
  if(!eyebrow) return;
  const expected='Línea Torcisão Trefilados';
  if(eyebrow.textContent.trim()!==expected) eyebrow.textContent=expected;
  if(!spanishEyebrowObserver){
    spanishEyebrowObserver=new MutationObserver(function(){
      if(eyebrow.textContent.trim()!==expected) eyebrow.textContent=expected;
    });
    spanishEyebrowObserver.observe(eyebrow,{childList:true,subtree:true,characterData:true});
  }
}

function apply(){
  const footer=document.querySelector('.tor-footer-v2');
  if(footer){
    addSegment(footer.querySelector('.tor-footer-company--trefilados'),'trefilados');
    addSegment(footer.querySelector('.tor-footer-company--industrial'),'industrial');
    fixElo();
  }
  fixSpanishProductEyebrow();
  return !!footer;
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',apply);
}else{
  apply();
}

let tries=0;
const timer=setInterval(function(){
  tries++;
  apply();
  if(tries>30) clearInterval(timer);
},120);
})();
