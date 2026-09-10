(function(){
'use strict';

const match=location.pathname.match(/^\/(en|es)(?:\/|$)/i);
const lang=match?match[1].toLowerCase():'';
if(!['en','es'].includes(lang)) return;

const target=document.getElementById('hfQuoteForm');
if(!target) return;

const dict={
  en:{
    'Nome':'Name','Empresa':'Company','E-mail':'Email','Contato / WhatsApp':'Phone / WhatsApp',
    'O que deseja cotar?':'What would you like to quote?','Baixa Camada':'Low Coating','Alta Camada':'High Coating','Conectores':'Connectors',
    'Diâmetro - Haste Baixa Camada':'Diameter - Low Coating Grounding Rod','Comprimento - Haste Baixa Camada':'Length - Low Coating Grounding Rod','Quantidade de Peças - Baixa Camada':'Quantity - Low Coating',
    'Diâmetro - Haste Alta Camada':'Diameter - High Coating Grounding Rod','Comprimento - Haste Alta Camada':'Length - High Coating Grounding Rod','Quantidade de Peças - Alta Camada':'Quantity - High Coating',
    'Modelo do Conector':'Connector Model','Quantidade de Peças - Conectores':'Connector Quantity',
    'Olhal Simples':'Standard Eyelet','Olhal Reforçado':'Reinforced Eyelet','Grampo Tipo U - Simples':'U-Bolt Clamp - Standard','Grampo Tipo U - Reforçado':'U-Bolt Clamp - Reinforced',
    'Sob Consulta':'Upon Request','1.000 mm - Sob Consulta':'1,000 mm - Upon Request','2.000 mm - Sob Consulta':'2,000 mm - Upon Request',
    'Política de Cookies':'Cookie Policy','Política de Privacidade':'Privacy Policy','Enviar':'Submit',
    'Preencha este campo obrigatório.':'Please complete this required field.','Insira um endereço de e-mail válido.':'Please enter a valid email address.','Insira um número de telefone válido.':'Please enter a valid phone number.','Selecione pelo menos uma opção.':'Please select at least one option.'
  },
  es:{
    'Nome':'Nombre','Empresa':'Empresa','E-mail':'Correo electrónico','Contato / WhatsApp':'Teléfono / WhatsApp',
    'O que deseja cotar?':'¿Qué desea cotizar?','Baixa Camada':'Capa Baja','Alta Camada':'Capa Alta','Conectores':'Conectores',
    'Diâmetro - Haste Baixa Camada':'Diámetro - Varilla de Capa Baja','Comprimento - Haste Baixa Camada':'Longitud - Varilla de Capa Baja','Quantidade de Peças - Baixa Camada':'Cantidad - Capa Baja',
    'Diâmetro - Haste Alta Camada':'Diámetro - Varilla de Capa Alta','Comprimento - Haste Alta Camada':'Longitud - Varilla de Capa Alta','Quantidade de Peças - Alta Camada':'Cantidad - Capa Alta',
    'Modelo do Conector':'Modelo del Conector','Quantidade de Peças - Conectores':'Cantidad de Conectores',
    'Olhal Simples':'Ojal Simple','Olhal Reforçado':'Ojal Reforzado','Grampo Tipo U - Simples':'Abrazadera Tipo U - Simple','Grampo Tipo U - Reforçado':'Abrazadera Tipo U - Reforzada',
    'Sob Consulta':'Bajo consulta','1.000 mm - Sob Consulta':'1.000 mm - Bajo consulta','2.000 mm - Sob Consulta':'2.000 mm - Bajo consulta',
    'Política de Cookies':'Política de Cookies','Política de Privacidade':'Política de Privacidad','Enviar':'Enviar',
    'Preencha este campo obrigatório.':'Complete este campo obligatorio.','Insira um endereço de e-mail válido.':'Ingrese un correo electrónico válido.','Insira um número de telefone válido.':'Ingrese un número de teléfono válido.','Selecione pelo menos uma opção.':'Seleccione al menos una opción.'
  }
}[lang];

const fragments=lang==='en' ? [
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados. Você pode cancelar a inscrição a qualquer momento.','By checking the boxes below, you agree to receive communications from Torcisão Trefilados. You can unsubscribe at any time.'],
  ['Para podermos responder à sua solicitação e enviar seu orçamento, precisamos do seu consentimento para armazenar e processar seus dados, de acordo com a nossa','To respond to your request and send your quotation, we need your consent to store and process your data in accordance with our'],
  ['Eu li e concordo com a','I have read and agree to the'],
  ['da Torcisão Trefilados e autorizo o processamento dos meus dados.','of Torcisão Trefilados and authorize the processing of my data.']
] : [
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados. Você pode cancelar a inscrição a qualquer momento.','Al marcar las casillas a continuación, acepta recibir comunicaciones de Torcisão Trefilados. Puede cancelar su suscripción en cualquier momento.'],
  ['Para podermos responder à sua solicitação e enviar seu orçamento, precisamos do seu consentimento para armazenar e processar seus dados, de acordo com a nossa','Para responder a su solicitud y enviarle su cotización, necesitamos su consentimiento para almacenar y procesar sus datos de acuerdo con nuestra'],
  ['Eu li e concordo com a','He leído y acepto la'],
  ['da Torcisão Trefilados e autorizo o processamento dos meus dados.','de Torcisão Trefilados y autorizo el tratamiento de mis datos.']
];

function translateString(value){
  if(!value) return value;
  const trimmed=value.trim();
  let out=value;
  if(dict[trimmed]) out=value.replace(trimmed,dict[trimmed]);
  fragments.forEach(([from,to])=>{out=out.split(from).join(to);});
  Object.entries(dict).forEach(([from,to])=>{
    if(out.includes(from)) out=out.split(from).join(to);
  });
  return out;
}

const fieldLabels={
  firstname:lang==='en'?'Name':'Nombre',
  company:lang==='en'?'Company':'Empresa',
  email:lang==='en'?'Email':'Correo electrónico',
  phone:lang==='en'?'Phone / WhatsApp':'Teléfono / WhatsApp',
  o_que_deseja_cotar:lang==='en'?'What would you like to quote?':'¿Qué desea cotizar?',
  diametro__haste_baixa_camada:lang==='en'?'Diameter - Low Coating Grounding Rod':'Diámetro - Varilla de Capa Baja',
  comprimento___haste_baixa_camada:lang==='en'?'Length - Low Coating Grounding Rod':'Longitud - Varilla de Capa Baja',
  quantidade_de_pecas:lang==='en'?'Quantity - Low Coating':'Cantidad - Capa Baja',
  diametro__haste_alta_camada:lang==='en'?'Diameter - High Coating Grounding Rod':'Diámetro - Varilla de Capa Alta',
  comprimento__haste_alta_camada:lang==='en'?'Length - High Coating Grounding Rod':'Longitud - Varilla de Capa Alta',
  quantidade_de_pecas__alta_camada:lang==='en'?'Quantity - High Coating':'Cantidad - Capa Alta',
  modelo_do_conector:lang==='en'?'Connector Model':'Modelo del Conector',
  quantidade_de_pecas__conectores:lang==='en'?'Connector Quantity':'Cantidad de Conectores'
};

function forceFieldLabels(form){
  Object.entries(fieldLabels).forEach(([name,text])=>{
    const field=form.querySelector(`[name="${name}"]`);
    const wrap=field?.closest('.hs-form-field');
    const label=wrap?.querySelector(':scope > label, > label');
    if(!label) return;
    const span=label.querySelector('span:not(.hs-form-required)');
    if(span) span.textContent=text;
    else {
      const required=label.querySelector('.hs-form-required');
      label.childNodes.forEach(node=>{if(node.nodeType===Node.TEXT_NODE&&node.nodeValue.trim()) node.nodeValue=text;});
      if(!label.textContent.trim() && required) label.insertBefore(document.createTextNode(text),required);
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

  form.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(field=>{
    const next=translateString(field.getAttribute('placeholder')||'');
    if(next!==field.getAttribute('placeholder')) field.setAttribute('placeholder',next);
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
})();
