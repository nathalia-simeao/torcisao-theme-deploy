(function(){
'use strict';

const path=(location.pathname||'').toLowerCase();
const htmlLang=(document.documentElement.lang||'').toLowerCase();
const body=document.body;
const lang=(body?.classList.contains('tor-lang-en')||htmlLang.startsWith('en')||path.startsWith('/en/'))?'en':(body?.classList.contains('tor-lang-es')||htmlLang.startsWith('es')||path.startsWith('/es/'))?'es':'pt';
if(lang==='pt') return;

const page=document.getElementById('arame-trefilado')?'arame':document.getElementById('barra-trefilada')?'barra':'';
if(!page) return;

const targetSelector=page==='arame'?'#afQuoteForm':'#bfQuoteForm';
const target=document.querySelector(targetSelector);
if(!target) return;

const formIds={
  arame:'618563c8-4899-441b-965d-801a83009fdf',
  barra:'7032f62e-b2f6-486a-8db7-bd2822b5db93'
};
const targetId=formIds[page];

const labels={
  en:{
    firstname:'Name',company:'Company',email:'Email',phone:'Phone / WhatsApp',
    especificacao_do_aco__arame:'Steel Specification - Wire',diametro__arame:'Diameter - Wire',acondicionamento:'Packaging - Wire',acabamento__arame:'Finish - Wire',
    barra_trefilada:'Drawn Bar',especificacao_do_aco:'Steel Specification - Bar',diametro_arames_e_barras:'Diameter - Bars',acondicionamento__barra:'Packaging - Bar',acabamento__barra:'Finish - Bar'
  },
  es:{
    firstname:'Nombre',company:'Empresa',email:'Correo electrónico',phone:'Teléfono / WhatsApp',
    especificacao_do_aco__arame:'Especificación del Acero - Alambre',diametro__arame:'Diámetro - Alambre',acondicionamento:'Acondicionamiento - Alambre',acabamento__arame:'Acabado - Alambre',
    barra_trefilada:'Barra Trefilada',especificacao_do_aco:'Especificación del Acero - Barra',diametro_arames_e_barras:'Diámetro - Barras',acondicionamento__barra:'Embalaje - Barra',acabamento__barra:'Acabado - Barra'
  }
}[lang];

const exact={
  en:{
    'Nome':'Name','Empresa':'Company','E-mail Corporativo':'Corporate Email','E-mail':'Email','Contato / WhatsApp':'Phone / WhatsApp',
    'Barra Trefilada':'Drawn Bar','Especificação do Aço - Barra':'Steel Specification - Bar','Diâmetro - Barras':'Diameter - Bars','Acondicionamento - Barra':'Packaging - Bar','Acabamento - Barra':'Finish - Bar',
    'Barra Redonda - BTC - 1006 a 1020':'Round Bar - Low Carbon - 1006 to 1020','Barra Redonda - MTC - 1035 a 1045':'Round Bar - Medium Carbon - 1035 to 1045','Barra Redonda - ATC - 1050 a 1090':'Round Bar - High Carbon - 1050 to 1090','Barra Trefilada - Aço Ressulfurado - 11SMn37':'Drawn Bar - Resulfurized Steel - 11SMn37',
    'Baixo Teor de Carbono (1004 a 1020)':'Low Carbon (1004 to 1020)','Médio Teor de Carbono (1035 a 1050)':'Medium Carbon (1035 to 1050)','Alto Teor de Carbono (1060 a 1090)':'High Carbon (1060 to 1090)','Aço Ressulfurado (11SMn37)':'Resulfurized Steel (11SMn37)',
    'De 2,00mm até 15,88mm':'From 2.00 mm to 15.88 mm','De 2,00 mm até 15,88 mm':'From 2.00 mm to 15.88 mm','Sob Consulta':'Upon Request','Trefilado':'Drawn','Trefilado Polido':'Polished Drawn','Feixes Embalados':'Bundled Packs',
    'Especificação do Aço - Arame':'Steel Specification - Wire','Diâmetro - Arame':'Diameter - Wire','Acondicionamento - Arame':'Packaging - Wire','Acabamento - Arame':'Finish - Wire','Rolos':'Coils','Spiders':'Spiders',
    'Política de Cookies':'Cookie Policy','Política de Privacidade':'Privacy Policy','Enviar':'Submit',
    'Preencha este campo obrigatório.':'Please complete this required field.','Selecione pelo menos uma opção.':'Please select at least one option.','Insira um endereço de e-mail válido.':'Please enter a valid email address.','Insira um número de telefone válido.':'Please enter a valid phone number.'
  },
  es:{
    'Nome':'Nombre','Empresa':'Empresa','E-mail Corporativo':'Correo electrónico corporativo','E-mail':'Correo electrónico','Contato / WhatsApp':'Teléfono / WhatsApp',
    'Barra Trefilada':'Barra Trefilada','Especificação do Aço - Barra':'Especificación del Acero - Barra','Diâmetro - Barras':'Diámetro - Barras','Acondicionamento - Barra':'Embalaje - Barra','Acabamento - Barra':'Acabado - Barra',
    'Barra Redonda - BTC - 1006 a 1020':'Barra Redonda - Bajo Carbono - 1006 a 1020','Barra Redonda - MTC - 1035 a 1045':'Barra Redonda - Medio Carbono - 1035 a 1045','Barra Redonda - ATC - 1050 a 1090':'Barra Redonda - Alto Carbono - 1050 a 1090','Barra Trefilada - Aço Ressulfurado - 11SMn37':'Barra Trefilada - Acero Resulfurado - 11SMn37',
    'Baixo Teor de Carbono (1004 a 1020)':'Bajo Carbono (1004 a 1020)','Médio Teor de Carbono (1035 a 1050)':'Medio Carbono (1035 a 1050)','Alto Teor de Carbono (1060 a 1090)':'Alto Carbono (1060 a 1090)','Aço Ressulfurado (11SMn37)':'Acero Resulfurado (11SMn37)',
    'De 2,00mm até 15,88mm':'De 2,00 mm a 15,88 mm','De 2,00 mm até 15,88 mm':'De 2,00 mm a 15,88 mm','Sob Consulta':'Bajo consulta','Trefilado':'Trefilado','Trefilado Polido':'Trefilado pulido','Feixes Embalados':'Paquetes embalados',
    'Especificação do Aço - Arame':'Especificación del Acero - Alambre','Diâmetro - Arame':'Diámetro - Alambre','Acondicionamento - Arame':'Acondicionamiento - Alambre','Acabamento - Arame':'Acabado - Alambre','Rolos':'Rollos','Spiders':'Spiders',
    'Política de Cookies':'Política de Cookies','Política de Privacidade':'Política de Privacidad','Enviar':'Enviar',
    'Preencha este campo obrigatório.':'Complete este campo obligatorio.','Selecione pelo menos uma opção.':'Seleccione al menos una opción.','Insira um endereço de e-mail válido.':'Ingrese un correo electrónico válido.','Insira um número de telefone válido.':'Ingrese un número de teléfono válido.'
  }
}[lang];

const fragments=lang==='en' ? [
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados. Você pode cancelar a inscrição a qualquer momento.','By checking the boxes below, you agree to receive communications from Torcisão Trefilados. You can unsubscribe at any time.'],
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados.','By checking the boxes below, you agree to receive communications from Torcisão Trefilados.'],
  ['Você pode cancelar a inscrição a qualquer momento.','You can unsubscribe at any time.'],
  ['Para podermos responder à sua solicitação e enviar seu orçamento, precisamos do seu consentimento para armazenar e processar seus dados, de acordo com a nossa','To respond to your request and send your quotation, we need your consent to store and process your data in accordance with our'],
  ['Eu li e concordo com a','I have read and agree to the'],
  ['da Torcisão Trefilados e autorizo o processamento dos meus dados.','of Torcisão Trefilados and authorize the processing of my data.']
] : [
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados. Você pode cancelar a inscrição a qualquer momento.','Al marcar las casillas a continuación, acepta recibir comunicaciones de Torcisão Trefilados. Puede darse de baja en cualquier momento.'],
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados.','Al marcar las casillas a continuación, acepta recibir comunicaciones de Torcisão Trefilados.'],
  ['Você pode cancelar a inscrição a qualquer momento.','Puede darse de baja en cualquier momento.'],
  ['Para podermos responder à sua solicitação e enviar seu orçamento, precisamos do seu consentimento para armazenar e processar seus dados, de acordo com a nossa','Para responder a su solicitud y enviarle su cotización, necesitamos su consentimiento para almacenar y procesar sus datos de acuerdo con nuestra'],
  ['Eu li e concordo com a','He leído y acepto la'],
  ['da Torcisão Trefilados e autorizo o processamento dos meus dados.','de Torcisão Trefilados y autorizo el tratamiento de mis datos.']
];

function translateString(value){
  if(!value) return value;
  let out=value;
  const trimmed=value.trim();
  if(exact[trimmed]) out=value.replace(trimmed,exact[trimmed]);
  fragments.forEach(([from,to])=>{out=out.split(from).join(to);});
  Object.entries(exact).forEach(([from,to])=>{if(out.includes(from)) out=out.split(from).join(to);});
  return out;
}

function forceFieldLabels(form){
  Object.entries(labels).forEach(([name,text])=>{
    const field=form.querySelector(`[name="${name}"]`);
    const wrap=field?.closest('.hs-form-field');
    const label=wrap?.querySelector('label');
    if(!label) return;
    const span=label.querySelector('span:not(.hs-form-required)');
    if(span){span.textContent=text;return;}
    for(const node of label.childNodes){
      if(node.nodeType===Node.TEXT_NODE && node.nodeValue.trim()){
        node.nodeValue=node.nodeValue.replace(node.nodeValue.trim(),text);
        return;
      }
    }
  });
}

function translateForm(form){
  if(!form) return;
  forceFieldLabels(form);

  const walker=document.createTreeWalker(form,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node=>{
    const next=translateString(node.nodeValue||'');
    if(next!==node.nodeValue) node.nodeValue=next;
  });

  form.querySelectorAll('input[type="submit"],button[type="submit"]').forEach(button=>{
    if(button.tagName==='INPUT') button.value=lang==='en'?'Submit':'Enviar';
    else button.textContent=lang==='en'?'Submit':'Enviar';
  });

  form.querySelectorAll('input[placeholder],textarea[placeholder],select[aria-label]').forEach(field=>{
    if(field.hasAttribute('placeholder')) field.setAttribute('placeholder',translateString(field.getAttribute('placeholder')||''));
    if(field.hasAttribute('aria-label')) field.setAttribute('aria-label',translateString(field.getAttribute('aria-label')||''));
  });
}

let scheduled=false;
function run(){
  if(scheduled) return;
  scheduled=true;
  requestAnimationFrame(()=>{
    scheduled=false;
    const form=target.querySelector('form.hs-form,form');
    if(form) translateForm(form);
  });
}
new MutationObserver(run).observe(target,{childList:true,subtree:true,characterData:true});
run();
setTimeout(run,150);
setTimeout(run,600);
setTimeout(run,1200);

function patchForms(){
  if(!window.hbspt?.forms?.create || window.hbspt.forms.create.__torcisaoProductI18n) return false;
  const original=window.hbspt.forms.create;
  function patched(opts){
    if(!opts || opts.formId!==targetId) return original.call(this,opts);
    const prevReady=opts.onFormReady;
    const localized=Object.assign({},opts,{
      locale:lang,
      submitText:lang==='en'?'Submit':'Enviar',
      translations:{[lang]:{fieldLabels:labels,submitText:lang==='en'?'Submit':'Enviar'}}
    });
    localized.onFormReady=function(el){
      if(typeof prevReady==='function') prevReady(el);
      const node=el instanceof Element?el:(el&&el[0])?el[0]:target.querySelector('form.hs-form,form');
      if(node) translateForm(node);
      setTimeout(run,100);
      setTimeout(run,500);
    };
    return original.call(this,localized);
  }
  patched.__torcisaoProductI18n=true;
  window.hbspt.forms.create=patched;
  return true;
}

function ensureForms(){
  if(patchForms()) return;
  let script=document.querySelector('script[src*="js.hsforms.net/forms/embed/v2.js"]');
  if(!script){
    script=document.createElement('script');
    script.src='https://js.hsforms.net/forms/embed/v2.js';
    script.charset='utf-8';
    script.onload=patchForms;
    document.head.appendChild(script);
  }else{
    script.addEventListener('load',patchForms,{once:true});
  }
  let tries=0;
  const timer=setInterval(()=>{
    tries++;
    if(patchForms()||tries>100) clearInterval(timer);
  },50);
}
ensureForms();
})();
