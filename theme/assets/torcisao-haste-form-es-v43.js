(function(){
'use strict';
const pathMatch=location.pathname.match(/^\/es(?:\/|$)/i);
const requested=String(new URLSearchParams(location.search).get('lang')||'').toLowerCase();
const lang=requested==='es'?'es':(pathMatch?'es':(window.TorcisaoI18n?.lang||'pt'));
if(lang!=='es'||!document.getElementById('haste-aterramento'))return;

const exact=new Map([
  ['Nome','Nombre'],
  ['Empresa','Empresa'],
  ['E-mail','Correo electrónico'],
  ['Contato / WhatsApp','Teléfono / WhatsApp'],
  ['O que deseja cotar?','¿Qué desea cotizar?'],
  ['Baixa Camada','Capa Baja'],
  ['Alta Camada','Capa Alta'],
  ['Conectores','Conectores'],
  ['Diâmetro - Haste Baixa Camada','Diámetro - Varilla de Capa Baja'],
  ['Comprimento - Haste Baixa Camada','Longitud - Varilla de Capa Baja'],
  ['Quantidade de Peças - Baixa Camada','Cantidad - Capa Baja'],
  ['Diâmetro - Haste Alta Camada','Diámetro - Varilla de Capa Alta'],
  ['Comprimento - Haste Alta Camada','Longitud - Varilla de Capa Alta'],
  ['Quantidade de Peças - Alta Camada','Cantidad - Capa Alta'],
  ['Modelo do Conector','Modelo del Conector'],
  ['Quantidade de Peças - Conectores','Cantidad de Conectores'],
  ['Olhal Simples','Ojal Simple'],
  ['Olhal Reforçado','Ojal Reforzado'],
  ['Grampo Tipo U - Simples','Abrazadera Tipo U - Simple'],
  ['Grampo Tipo U - Reforçado','Abrazadera Tipo U - Reforzada'],
  ['Sob Consulta','Bajo consulta'],
  ['Política de Cookies','Política de Cookies'],
  ['Política de Privacidade','Política de Privacidad'],
  ['Enviar','Enviar'],
  ['Preencha este campo obrigatório.','Complete este campo obligatorio.'],
  ['Insira um endereço de e-mail válido.','Introduzca una dirección de correo electrónico válida.'],
  ['Insira um número de telefone válido.','Introduzca un número de teléfono válido.'],
  ['Selecione pelo menos uma opção.','Seleccione al menos una opción.']
]);

const fragments=[
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados. Você pode cancelar a inscrição a qualquer momento.','Al marcar las casillas a continuación, acepta recibir comunicaciones de Torcisão Trefilados. Puede cancelar su suscripción en cualquier momento.'],
  ['Para podermos responder à sua solicitação e enviar seu orçamento, precisamos do seu consentimento para armazenar e processar seus dados, de acordo com a nossa','Para responder a su solicitud y enviarle su cotización, necesitamos su consentimiento para almacenar y procesar sus datos, de acuerdo con nuestra'],
  ['Eu li e concordo com a','He leído y acepto la'],
  ['da Torcisão Trefilados e autorizo o processamento dos meus dados.','de Torcisão Trefilados y autorizo el procesamiento de mis datos.'],
  ['1.000 mm - Sob Consulta','1.000 mm - Bajo consulta'],
  ['2.000 mm - Sob Consulta','2.000 mm - Bajo consulta']
];

function translateText(text){
  const trimmed=String(text||'').trim();
  if(!trimmed)return text;
  if(exact.has(trimmed))return String(text).replace(trimmed,exact.get(trimmed));
  let out=String(text);
  fragments.forEach(([from,to])=>{out=out.split(from).join(to);});
  return out;
}

function translateForm(form){
  if(!form)return;
  const walker=document.createTreeWalker(form,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{
    const next=translateText(node.nodeValue||'');
    if(next!==node.nodeValue)node.nodeValue=next;
  });
  form.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(field=>{
    const old=field.getAttribute('placeholder')||'';
    const next=translateText(old);
    if(next!==old)field.setAttribute('placeholder',next);
  });
}

function boot(){
  const target=document.getElementById('hfQuoteForm');
  if(!target)return;
  const run=()=>translateForm(target.querySelector('form.hs-form,form'));
  new MutationObserver(run).observe(target,{childList:true,subtree:true,characterData:true});
  run();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
