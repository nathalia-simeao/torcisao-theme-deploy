(function(){
'use strict';
const root=document.getElementById('arame-trefilado');
if(!root)return;

const variantMap={
  btc:{steel:'Baixo Teor de Carbono (1004 a 1020)',origin:'LP Arame | Baixo Carbono'},
  mtc:{steel:'Médio Teor de Carbono (1035 a 1050)',origin:'LP Arame | Médio Carbono'},
  atc:{steel:'Alto Teor de Carbono (1060 a 1090)',origin:'LP Arame | Alto Carbono'}
};

function activeKind(){
  const active=root.querySelector('[data-af-kind].is-active');
  const value=active?.dataset.afKind||root.dataset.initialKind||'btc';
  return variantMap[value]?value:'btc';
}

function setField(form,name,value){
  const fields=Array.from(form.querySelectorAll(`[name="${name}"]`));
  if(!fields.length)return false;
  let applied=false;
  fields.forEach(field=>{
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

function sync(formNode){
  const form=formNode||document.querySelector('#afQuoteForm form.hs-form, #afQuoteForm form');
  if(!form)return;
  const selected=variantMap[activeKind()]||variantMap.btc;
  setField(form,'produtos_de_interesse','Arame Trefilado');
  setField(form,'especificacao_do_aco__arame',selected.steel);
  setField(form,'pagina_de_origem_do_lead',selected.origin);
}

root.querySelectorAll('[data-af-kind]').forEach(button=>{
  button.addEventListener('click',()=>{
    requestAnimationFrame(()=>sync());
    setTimeout(()=>sync(),80);
  });
});

const target=document.getElementById('afQuoteForm');
if(target){
  const observer=new MutationObserver(()=>sync());
  observer.observe(target,{childList:true,subtree:true});
  sync();
  setTimeout(()=>sync(),150);
  setTimeout(()=>sync(),500);
  setTimeout(()=>sync(),1200);
}

window.addEventListener('message',event=>{
  if(!event.data||event.data.type!=='hsFormCallback'||event.data.eventName!=='onFormReady')return;
  setTimeout(()=>sync(),0);
  setTimeout(()=>sync(),150);
});
})();
