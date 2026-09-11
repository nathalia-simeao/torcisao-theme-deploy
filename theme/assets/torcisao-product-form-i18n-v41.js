(function(){
'use strict';
const path=(location.pathname||'').toLowerCase();
const htmlLang=(document.documentElement.lang||'').toLowerCase();
const lang=htmlLang.startsWith('en')||path.startsWith('/en/')?'en':htmlLang.startsWith('es')||path.startsWith('/es/')?'es':'pt';
if(lang==='pt')return;
const page=document.getElementById('arame-trefilado')?'arame':document.getElementById('barra-trefilada')?'barra':'';
if(!page)return;
const formIds={arame:'618563c8-4899-441b-965d-801a83009fdf',barra:'7032f62e-b2f6-486a-8db7-bd2822b5db93'};
const targetId=formIds[page];
const fieldLabels={
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
};
const textPairs={
 en:[
  ['Nome','Name'],['Empresa','Company'],['E-mail','Email'],['Contato / WhatsApp','Phone / WhatsApp'],
  ['Especificação do Aço - Arame','Steel Specification - Wire'],['Diâmetro - Arame','Diameter - Wire'],['Acondicionamento - Arame','Packaging - Wire'],['Acabamento - Arame','Finish - Wire'],
  ['Barra Trefilada','Drawn Bar'],['Especificação do Aço - Barra','Steel Specification - Bar'],['Diâmetro - Barras','Diameter - Bars'],['Acondicionamento - Barra','Packaging - Bar'],['Acabamento - Barra','Finish - Bar'],
  ['Baixo Teor de Carbono (1004 a 1020)','Low Carbon (1004 to 1020)'],['Médio Teor de Carbono (1035 a 1050)','Medium Carbon (1035 to 1050)'],['Alto Teor de Carbono (1060 a 1090)','High Carbon (1060 to 1090)'],
  ['Aço Ressulfurado (11SMn37)','Resulfurized Steel (11SMn37)'],['Barra Redonda - BTC - 1006 a 1020','Round Bar - Low Carbon - 1006 to 1020'],['Barra Redonda - MTC - 1035 a 1045','Round Bar - Medium Carbon - 1035 to 1045'],['Barra Redonda - ATC - 1050 a 1090','Round Bar - High Carbon - 1050 to 1090'],['Barra Trefilada - Aço Ressulfurado - 11SMn37','Drawn Bar - Resulfurized Steel - 11SMn37'],
  ['De 2,00mm até 15,88mm','2.00 mm to 15.88 mm'],['Sob Consulta','Upon Request'],['Rolos','Coils'],['Spiders','Spiders'],['Feixes Embalados','Bundled Packs'],['Trefilado Polido','Polished Drawn'],['Trefilado','Drawn'],
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados. Você pode cancelar a inscrição a qualquer momento.','By checking the boxes below, you agree to receive communications from Torcisão Trefilados. You can unsubscribe at any time.'],
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados.','By checking the boxes below, you agree to receive communications from Torcisão Trefilados.'],['Você pode cancelar a inscrição a qualquer momento.','You can unsubscribe at any time.'],
  ['Para podermos responder à sua solicitação e enviar seu orçamento, precisamos do seu consentimento para armazenar e processar seus dados, de acordo com a nossa','To respond to your request and send your quote, we need your consent to store and process your data in accordance with our'],
  ['Eu li e concordo com a','I have read and agree to the'],['da Torcisão Trefilados e autorizo o processamento dos meus dados.','of Torcisão Trefilados and authorize the processing of my data.'],['Política de Cookies','Cookie Policy'],['Política de Privacidade','Privacy Policy'],['Enviar','Submit']
 ],
 es:[
  ['Nome','Nombre'],['Empresa','Empresa'],['E-mail','Correo electrónico'],['Contato / WhatsApp','Teléfono / WhatsApp'],
  ['Especificação do Aço - Arame','Especificación del Acero - Alambre'],['Diâmetro - Arame','Diámetro - Alambre'],['Acondicionamento - Arame','Acondicionamiento - Alambre'],['Acabamento - Arame','Acabado - Alambre'],
  ['Barra Trefilada','Barra Trefilada'],['Especificação do Aço - Barra','Especificación del Acero - Barra'],['Diâmetro - Barras','Diámetro - Barras'],['Acondicionamento - Barra','Embalaje - Barra'],['Acabamento - Barra','Acabado - Barra'],
  ['Baixo Teor de Carbono (1004 a 1020)','Bajo Carbono (1004 a 1020)'],['Médio Teor de Carbono (1035 a 1050)','Medio Carbono (1035 a 1050)'],['Alto Teor de Carbono (1060 a 1090)','Alto Carbono (1060 a 1090)'],
  ['Aço Ressulfurado (11SMn37)','Acero Resulfurado (11SMn37)'],['Barra Redonda - BTC - 1006 a 1020','Barra Redonda - Bajo Carbono - 1006 a 1020'],['Barra Redonda - MTC - 1035 a 1045','Barra Redonda - Medio Carbono - 1035 a 1045'],['Barra Redonda - ATC - 1050 a 1090','Barra Redonda - Alto Carbono - 1050 a 1090'],['Barra Trefilada - Aço Ressulfurado - 11SMn37','Barra Trefilada - Acero Resulfurado - 11SMn37'],
  ['De 2,00mm até 15,88mm','De 2,00 mm a 15,88 mm'],['Sob Consulta','Bajo consulta'],['Rolos','Rollos'],['Spiders','Spiders'],['Feixes Embalados','Paquetes embalados'],['Trefilado Polido','Trefilado pulido'],['Trefilado','Trefilado'],
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados. Você pode cancelar a inscrição a qualquer momento.','Al marcar las casillas a continuación, acepta recibir comunicaciones de Torcisão Trefilados. Puede darse de baja en cualquier momento.'],
  ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados.','Al marcar las casillas a continuación, acepta recibir comunicaciones de Torcisão Trefilados.'],['Você pode cancelar a inscrição a qualquer momento.','Puede darse de baja en cualquier momento.'],
  ['Para podermos responder à sua solicitação e enviar seu orçamento, precisamos do seu consentimento para armazenar e processar seus dados, de acordo com a nossa','Para responder a su solicitud y enviarle su cotización, necesitamos su consentimiento para almacenar y procesar sus datos de acuerdo con nuestra'],
  ['Eu li e concordo com a','He leído y acepto la'],['da Torcisão Trefilados e autorizo o processamento dos meus dados.','de Torcisão Trefilados y autorizo el tratamiento de mis datos.'],['Política de Cookies','Política de Cookies'],['Política de Privacidade','Política de Privacidad'],['Enviar','Enviar']
 ]
};
function translateNode(node){
 if(!node)return;
 const pairs=textPairs[lang]||[];
 const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);
 let n;
 while((n=walker.nextNode())){
  const raw=n.nodeValue||'',trim=raw.trim();if(!trim)continue;
  let next=trim;
  for(const [from,to] of pairs){if(next===from){next=to;break}if(from.length>18&&next.includes(from))next=next.split(from).join(to);}
  if(next!==trim){const a=(raw.match(/^\s*/)||[''])[0],b=(raw.match(/\s*$/)||[''])[0];n.nodeValue=a+next+b;}
 }
}
function watch(node){if(!node)return;translateNode(node);let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;translateNode(node);});}).observe(node,{childList:true,subtree:true,characterData:true});}
function patchForms(){
 if(!window.hbspt?.forms?.create||window.hbspt.forms.create.__torcisaoProductI18n)return false;
 const original=window.hbspt.forms.create;
 function patched(opts){
  if(!opts||opts.formId!==targetId)return original.call(this,opts);
  const prevReady=opts.onFormReady;
  const localized=Object.assign({},opts,{locale:lang,submitText:lang==='en'?'Submit':'Enviar',translations:{[lang]:{fieldLabels:fieldLabels[lang],submitText:lang==='en'?'Submit':'Enviar'}}});
  localized.onFormReady=function(el){if(typeof prevReady==='function')prevReady(el);const node=el instanceof Element?el:(el&&el[0])?el[0]:document.querySelector(page==='arame'?'#afQuoteForm form.hs-form':'#bfQuoteForm form.hs-form');watch(node||document.querySelector(page==='arame'?'#afQuoteForm':'#bfQuoteForm'));};
  return original.call(this,localized);
 }
 patched.__torcisaoProductI18n=true;
 window.hbspt.forms.create=patched;
 return true;
}
function ensureForms(){
 if(patchForms())return;
 let script=document.querySelector('script[src*="js.hsforms.net/forms/embed/v2.js"]');
 if(!script){script=document.createElement('script');script.src='https://js.hsforms.net/forms/embed/v2.js';script.charset='utf-8';script.onload=patchForms;document.head.appendChild(script);}else{script.addEventListener('load',patchForms,{once:true});}
 let tries=0;const timer=setInterval(()=>{tries++;if(patchForms()||tries>100)clearInterval(timer);},50);
}
watch(document.querySelector(page==='arame'?'#afQuoteForm':'#bfQuoteForm'));
ensureForms();
})();
