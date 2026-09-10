(function(){
'use strict';

const UNIFIED_FORM_ID='8fdff701-c5a7-4684-9358-d557a70425a5';
const PORTAL_ID='50818463';

function isUnifiedHastePage(){
  if(document.getElementById('haste-aterramento')) return true;
  return /\/(?:en\/grounding-rod|es\/varilla-de-puesta-a-tierra|haste-de-aterramento)\/?(?:[?#]|$)/i.test(location.pathname + location.search + location.hash);
}

function forceUnifiedForm(){
  if(!isUnifiedHastePage()) return;
  const cfg=window.TORCISAO_HASTE_PAGE=window.TORCISAO_HASTE_PAGE||{};
  cfg.portalId=PORTAL_ID;
  cfg.formId=UNIFIED_FORM_ID;
  cfg.formIds={
    baixa:UNIFIED_FORM_ID,
    alta:UNIFIED_FORM_ID,
    conectores:UNIFIED_FORM_ID
  };
}

forceUnifiedForm();

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',forceUnifiedForm,{once:true});
}

/*
 * Run in capture phase so the correct form id is restored before the
 * Haste controller handles the same click and mounts/remounts HubSpot.
 */
document.addEventListener('click',function(event){
  if(!isUnifiedHastePage()) return;
  const target=event.target.closest?.('#hfQuoteTab,.js-hf-quote,.hf-family-tab,.hf-quote-close');
  if(target) forceUnifiedForm();
},true);

/* Legacy translated layers can mutate the shared config after page load. */
let queued=false;
new MutationObserver(function(){
  if(queued||!isUnifiedHastePage()) return;
  queued=true;
  requestAnimationFrame(function(){
    queued=false;
    forceUnifiedForm();
  });
}).observe(document.documentElement,{subtree:true,childList:true});

})();