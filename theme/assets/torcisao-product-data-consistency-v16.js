(function(){
'use strict';

/* Carrega a camada global de atribuição para formulários HubSpot. */
(function loadHubSpotAttribution(){
  if(window.TorcisaoHubSpotAttribution)return;
  if(document.querySelector('script[data-torcisao-hubspot-attribution]'))return;
  const current=document.currentScript?.src||'';
  const src=current
    ? current.replace(/torcisao-product-data-consistency-v16\.js(?:\?.*)?$/,'torcisao-hubspot-attribution-v1.js?v=20260911-1')
    : '/wp-content/themes/theme/assets/torcisao-hubspot-attribution-v1.js?v=20260911-1';
  const script=document.createElement('script');
  script.src=src;
  script.defer=true;
  script.dataset.torcisaoHubspotAttribution='1';
  document.head.appendChild(script);
})();

/* A fonte técnica usada pelo Theo já trabalha com 1004 a 1020 para BTC.
 * Esta camada mantém Barra e Arame visualmente consistentes com essa referência,
 * inclusive quando outros scripts re-renderizam títulos, tabelas ou o seletor manual. */
const roots=[document.getElementById('barra-trefilada'),document.getElementById('arame-trefilado')].filter(Boolean);
if(!roots.length)return;

const from='1006 a 1020';
const to='1004 a 1020';

function replaceText(root){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
    if(node.nodeValue&&node.nodeValue.includes(from))node.nodeValue=node.nodeValue.split(from).join(to);
  }
}

function replaceAttributes(root){
  root.querySelectorAll('[title],[aria-label]').forEach(el=>{
    ['title','aria-label'].forEach(name=>{
      const value=el.getAttribute(name);
      if(value&&value.includes(from))el.setAttribute(name,value.split(from).join(to));
    });
  });
}

function apply(root){
  replaceText(root);
  replaceAttributes(root);
}

roots.forEach(root=>{
  apply(root);
  const observer=new MutationObserver(()=>apply(root));
  observer.observe(root,{subtree:true,childList:true,characterData:true});
});
})();
