/* TORCISÃO · páginas de aplicação (2026-11)
 * - chat do Theo embutido na página (os botões, o WhatsApp com histórico e
 *   a criação do lead vêm de torcisao-lead-gate.js);
 * - botão que abre a calculadora já no produto da página. */
(function(){
'use strict';
const cfg=window.TORCISAO_APP_PAGE||{};
const log=document.getElementById('apChat'),form=document.getElementById('apForm'),input=document.getElementById('apInput');
const LOADING='Consultando as informações Torcisão…';

function add(role,text){
  const m=document.createElement('div');m.className='th-msg '+role;m.textContent=text;
  log.appendChild(m);log.scrollTop=log.scrollHeight;return m;
}
function history(){
  return [...log.querySelectorAll('.th-msg')].filter(m=>!m.classList.contains('loading')).slice(-12)
    .map(m=>({role:m.classList.contains('user')?'user':'assistant',content:m.textContent.trim()}));
}

let busy=false;
if(log&&form&&input){
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const text=input.value.trim();if(!text||busy)return;
    busy=true;input.value='';
    const hist=history();
    add('user',text);
    const wait=add('assistant',LOADING);wait.classList.add('loading');
    try{
      const res=await fetch(cfg.rest||'/wp-json/torcisao/v1/application-assistant',{
        method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',
        body:JSON.stringify({query:text,lang:'pt',history:hist,page:cfg.key||''})
      });
      const json=await res.json().catch(()=>({}));
      wait.textContent=(json&&json.answer)||'Não consegui responder agora. Se preferir, fale com o comercial pelo WhatsApp.';
    }catch(err){
      wait.textContent='Não consegui responder agora. Se preferir, fale com o comercial pelo WhatsApp.';
    }finally{
      wait.classList.remove('loading');busy=false;log.scrollTop=log.scrollHeight;
    }
  });
}

/* Formulário de cotação do HubSpot (carrega quando o cliente chega perto dele) */
const formHost=document.getElementById('taQuoteForm');let formMounted=false;
function mountForm(){
  if(!formHost||formMounted)return;formMounted=true;
  const boot=()=>{
    if(window.hbspt&&window.hbspt.forms){
      formHost.innerHTML='';
      window.hbspt.forms.create({portalId:'50818463',formId:formHost.dataset.formId,region:'na1',target:'#taQuoteForm',
        onFormSubmitted:()=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'generate_lead',lead_source:'formulario_aplicacao',page:cfg.key||''});}});
      return;
    }
    setTimeout(boot,120);
  };
  if(!document.querySelector('script[src*="js.hsforms.net/forms/embed/v2.js"]')){
    const s=document.createElement('script');s.src='https://js.hsforms.net/forms/embed/v2.js';s.charset='utf-8';s.async=true;document.head.appendChild(s);
  }
  boot();
}
if(formHost){
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();mountForm();}},{rootMargin:'600px 0px'});
    io.observe(formHost);
  }else mountForm();
}
document.querySelectorAll('.js-ta-form-link').forEach(a=>a.addEventListener('click',e=>{
  const target=document.getElementById('cotacao');if(!target)return;
  e.preventDefault();mountForm();target.scrollIntoView({behavior:'smooth',block:'start'});
  window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'quote_form_open',origin:a.dataset.analyticsOrigin||'aplicacao',product:cfg.key||''});
}));

/* Calculadora já no produto da página */
document.querySelectorAll('.js-ta-calc').forEach(btn=>btn.addEventListener('click',()=>{
  const open=document.getElementById('torcisaoCalcOpen');if(!open)return;
  open.click();
  setTimeout(()=>{
    const sel=document.getElementById('calcProduto');
    if(sel&&btn.dataset.product&&sel.value!==btn.dataset.product){sel.value=btn.dataset.product;sel.dispatchEvent(new Event('change',{bubbles:true}));}
  },80);
  window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'calculator_open',origin:'aplicacao',product:btn.dataset.product||''});
}));
})();
