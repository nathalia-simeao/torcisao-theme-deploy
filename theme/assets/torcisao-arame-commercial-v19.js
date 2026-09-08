(function(){
'use strict';

const root=document.getElementById('arame-trefilado');
if(!root)return;
const THEO='https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png';

function polishTools(){
  const left=root.querySelector('#aplicacoes .hf-app-grid .hf-app-card:first-child');
  if(!left)return false;

  const tools=left.querySelector('.tor-product-tools');
  if(!tools)return false;

  const title=left.querySelector('h3');
  if(title)title.textContent='Ferramentas para avançar';

  const tolerance=left.querySelector('[data-tor-tool="tolerance"]');
  if(tolerance){
    const strong=tolerance.querySelector('strong');
    const small=tolerance.querySelector('small');
    if(strong)strong.textContent='Tolerância do arame';
    if(small)small.textContent='A tolerância é definida sob consulta conforme bitola e requisito do item.';
  }

  const panel=left.querySelector('[data-tor-tolerance-panel]');
  if(panel){
    panel.innerHTML='<div class="tor-tolerance-result"><strong>Tolerância: sob consulta.</strong><br>Informe faixa de aço, bitola, aplicação e forma de fornecimento para a equipe validar a especificação do pedido.</div>';
  }

  const assistant=left.querySelector('[data-tor-tool="assistant"]');
  if(assistant){
    const icon=assistant.querySelector('.tor-product-tool-icon');
    const strong=assistant.querySelector('strong');
    const small=assistant.querySelector('small');
    if(icon){
      icon.classList.add('tor-product-tool-icon--theo');
      icon.innerHTML='<img src="'+THEO+'" alt="Theo">';
    }
    if(strong)strong.textContent='Assistente de aplicação';
    if(small)small.textContent='Organize aço, bitola, aplicação e forma de fornecimento antes da cotação.';
  }
  return true;
}

function normalizeManual(){
  const select=document.getElementById('afManualSelect');
  if(!select)return;
  const labels={
    btc:'Baixo Carbono · 1004 a 1020',
    mtc:'Médio Carbono · 1035 a 1050',
    atc:'Alto Carbono · 1060 a 1090'
  };
  Array.from(select.options).forEach(function(option){
    if(labels[option.value])option.textContent=labels[option.value];
  });
}

function init(){
  normalizeManual();
  if(polishTools())return;

  let tries=0;
  const timer=setInterval(function(){
    tries++;
    normalizeManual();
    if(polishTools()||tries>40)clearInterval(timer);
  },100);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
