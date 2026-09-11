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

/* F0003 é o formulário mestre da LP unificada de Arame.
 * A aba ativa define a especificação enviada à HubSpot sem pedir ao visitante
 * para escolher novamente BTC/MTC/ATC dentro do formulário. */
const arameFormVariants={
  btc:{steel:'Baixo Teor de Carbono (1004 a 1020)',origin:'LP Arame | Baixo Carbono'},
  mtc:{steel:'Médio Teor de Carbono (1035 a 1050)',origin:'LP Arame | Médio Carbono'},
  atc:{steel:'Alto Teor de Carbono (1060 a 1090)',origin:'LP Arame | Alto Carbono'}
};

function activeArameKind(){
  const active=root.querySelector('[data-af-kind].is-active');
  const kind=active&&active.dataset.afKind?active.dataset.afKind:(root.dataset.initialKind||'btc');
  return arameFormVariants[kind]?kind:'btc';
}

function setHubSpotField(form,name,value){
  const fields=Array.from(form.querySelectorAll('[name="'+name+'"]'));
  if(!fields.length)return false;
  let applied=false;
  fields.forEach(function(field){
    if(field.type==='radio'||field.type==='checkbox'){
      const should=field.value===value;
      if(field.checked!==should)field.checked=should;
      if(should){
        field.dispatchEvent(new Event('input',{bubbles:true}));
        field.dispatchEvent(new Event('change',{bubbles:true}));
        applied=true;
      }
      return;
    }
    if(field.value!==value)field.value=value;
    field.dispatchEvent(new Event('input',{bubbles:true}));
    field.dispatchEvent(new Event('change',{bubbles:true}));
    applied=true;
  });
  return applied;
}

function syncArameQuoteForm(formNode){
  const form=formNode||document.querySelector('#afQuoteForm form.hs-form, #afQuoteForm form');
  if(!form)return;
  const selected=arameFormVariants[activeArameKind()]||arameFormVariants.btc;
  setHubSpotField(form,'produtos_de_interesse','Arame Trefilado');
  setHubSpotField(form,'especificacao_do_aco__arame',selected.steel);
  setHubSpotField(form,'pagina_de_origem_do_lead',selected.origin);
}

function bindArameFormSync(){
  root.querySelectorAll('[data-af-kind]').forEach(function(button){
    button.addEventListener('click',function(){
      requestAnimationFrame(function(){syncArameQuoteForm();});
      setTimeout(function(){syncArameQuoteForm();},80);
    });
  });

  const target=document.getElementById('afQuoteForm');
  if(target){
    new MutationObserver(function(){syncArameQuoteForm();}).observe(target,{childList:true,subtree:true});
    syncArameQuoteForm();
    setTimeout(function(){syncArameQuoteForm();},150);
    setTimeout(function(){syncArameQuoteForm();},500);
    setTimeout(function(){syncArameQuoteForm();},1200);
  }

  window.addEventListener('message',function(event){
    if(!event.data||event.data.type!=='hsFormCallback'||event.data.eventName!=='onFormReady')return;
    setTimeout(function(){syncArameQuoteForm();},0);
    setTimeout(function(){syncArameQuoteForm();},150);
  });
}

function init(){
  normalizeManual();
  bindArameFormSync();
  if(polishTools())return;

  let tries=0;
  const timer=setInterval(function(){
    tries++;
    normalizeManual();
    syncArameQuoteForm();
    if(polishTools()||tries>40)clearInterval(timer);
  },100);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
