(function(){
'use strict';
const path=(location.pathname||'').toLowerCase();
const htmlLang=(document.documentElement.lang||'').toLowerCase();
const lang=htmlLang.startsWith('en')||path.startsWith('/en/')?'en':htmlLang.startsWith('es')||path.startsWith('/es/')?'es':'pt';
if(lang==='pt')return;
const isArame=!!document.getElementById('arame-trefilado');
const isBarra=!!document.getElementById('barra-trefilada');
if(!isArame&&!isBarra)return;

const EN={
  /* Barra: conteúdo reescrito por torcisao-barra-commercial-v14.js */
  'Barra trefilada de baixo teor de carbono, em perfil redondo, disponível nos acabamentos trefilado e polido. Consulte a combinação de bitola, tolerância e comprimento para o seu pedido.':'Low-carbon drawn bar with a round profile, available in drawn and polished finishes. Review the diameter, tolerance, and length combination for your order.',
  'Barra trefilada de médio teor de carbono, em perfil redondo, disponível nos acabamentos trefilado e polido. A especificação final depende do aço, da bitola e dos requisitos dimensionais do projeto.':'Medium-carbon drawn bar with a round profile, available in drawn and polished finishes. The final specification depends on the steel grade, diameter, and dimensional requirements of the project.',
  'Barra trefilada de alto teor de carbono, em perfil redondo, disponível nos acabamentos trefilado e polido. Aço, bitola, tolerância e comprimento devem ser confirmados para a aplicação informada.':'High-carbon drawn bar with a round profile, available in drawn and polished finishes. Steel grade, diameter, tolerance, and length must be confirmed for the stated application.',
  'Barra trefilada em aço ressulfurado 11SMn37, com foco em aplicações de usinagem seriada e componentes automotivos, hidráulicos e pneumáticos. Consulte a especificação dimensional do item.':'11SMn37 resulfurized-steel drawn bar for serial machining and automotive, hydraulic, and pneumatic components. Review the item dimensional specification.',
  'Compare baixo, médio e alto teor de carbono e aço ressulfurado, escolha o acabamento e consulte as especificações para a sua necessidade.':'Compare low-, medium-, and high-carbon steels and resulfurized steel, choose the finish, and review the specifications for your requirement.',
  'Consulte faixa de aço, bitola, perfil, acabamento e acondicionamento. Tolerância e comprimento devem ser confirmados conforme a especificação do pedido.':'Review steel grade range, diameter, profile, finish, and packaging. Tolerance and length must be confirmed according to the order specification.',
  'Informe aço, bitola, acabamento, comprimento e processo da peça para direcionar a consulta à opção adequada.':'Provide the steel grade, diameter, finish, length, and component process so the inquiry can be directed to the appropriate option.',
  'Envie faixa de aço, bitola, acabamento, comprimento e quantidade para a equipe Torcisão validar a condição de fornecimento e preparar a cotação.':'Send the steel grade range, diameter, finish, length, and quantity so the Torcisão team can validate the supply conditions and prepare your quote.',
  'Trefilada ou polida':'Drawn or polished','Trefilada':'Drawn','Polida':'Polished','Acabamento da barra':'Bar finish',
  'Conforme especificação · sob consulta':'According to specification · upon request',
  'Aço Ressulfurado · 11SMn37':'Resulfurized Steel · 11SMn37','Médio Teor de Carbono · 1035 a 1050':'Medium Carbon · 1035 to 1050','Alto Teor de Carbono · 1060 a 1090':'High Carbon · 1060 to 1090',
  'Aço':'Steel',

  /* Arame: ferramentas injetadas depois do primeiro render */
  'Tolerância do arame':'Wire tolerance',
  'A tolerância é definida sob consulta conforme bitola e requisito do item.':'Tolerance is confirmed upon request according to diameter and item requirements.',
  'Tolerância: sob consulta.':'Tolerance: upon request.',
  'Informe faixa de aço, bitola, aplicação e forma de fornecimento para a equipe validar a especificação do pedido.':'Provide the steel grade range, diameter, application, and supply format so the team can validate the order specification.',
  'Organize aço, bitola, aplicação e forma de fornecimento antes da cotação.':'Organize steel grade, diameter, application, and supply format before requesting a quote.',

  /* Galerias */
  'Opções':'Options','Opção selecionada':'Selected option','Opções de imagem do arame em':'Wire image options in','Ver opção':'View option',
  'Ângulos':'Angles','Ângulo selecionado':'Selected angle','Ângulos da barra':'Bar angles','Ver ângulo':'View angle',
  'Rolo':'Coil','Spider':'Spider',

  /* Modal de tolerância da Barra */
  'FERRAMENTA TÉCNICA':'TECHNICAL TOOL','Consulta de Tolerância Dimensional':'Dimensional Tolerance Lookup',
  'Barra trefilada · perfil redondo · processo trefilado':'Drawn bar · round profile · drawn process',
  'PROCESSO':'PROCESS','Informe a bitola para consultar h9, h10 e h11':'Enter the diameter to check h9, h10, and h11','Bitola':'Diameter',
  'Consultar tolerância':'Check tolerance','O resultado aparece aqui depois da consulta':'The result will appear here after the lookup',
  'Para acabamento polido, consulte nosso consultor':'For polished finish, contact our specialist','Sob consulta':'Upon request','Limites':'Limits','Validar com especialista':'Validate with a specialist','Mínimo':'Minimum','Máximo':'Maximum',
  'BITOLA':'DIAMETER','Informe uma bitola válida acima de 1 mm e até 250 mm':'Enter a valid diameter above 1 mm and up to 250 mm','CONSULTA':'LOOKUP','Não encontrei uma faixa para esta bitola. Consulte nosso consultor':'No range was found for this diameter. Contact our specialist',
  'h9 automático disponível a partir de 9,53 mm':'Automatic h9 available from 9.53 mm','Bitola nominal:':'Nominal diameter:','processo trefilado':'drawn process','perfil redondo':'round profile',
  'Consulte referências h9, h10 e h11 para barras trefiladas de perfil redondo.':'Check h9, h10, and h11 references for round-profile drawn bars.',

  /* Handoff comercial que pode abrir ao sair do Theo ou da tolerância */
  'Quer falar com o comercial sobre isso?':'Would you like to talk to sales about this?','Leve o histórico desta consulta para o WhatsApp e continue com a equipe Torcisão sem precisar começar do zero.':'Send the context of this inquiry to WhatsApp and continue with the Torcisão team without starting over.',
  'Quer continuar com o comercial?':'Would you like to continue with sales?','O WhatsApp leva junto o contexto da escolha manual e da conversa com o Theo.':'WhatsApp will include the context from your manual selection and conversation with Theo.',
  'Quer levar esta consulta para o comercial?':'Would you like to take this inquiry to sales?','Envie a bitola e o resultado consultado para o WhatsApp da Torcisão.':'Send the diameter and lookup result to Torcisão via WhatsApp.',
  'Assistente de Aplicação · Barra':'Application Assistant · Drawn Bar','Assistente de Aplicação · Arame':'Application Assistant · Drawn Wire','Escolha manual:':'Manual selection:','Cliente:':'Customer:','Theo:':'Theo:','Bitola consultada:':'Diameter checked:','Ferramenta: Consulta de Tolerância Dimensional':'Tool: Dimensional Tolerance Lookup'
};

const ES={
  'Barra trefilada de baixo teor de carbono, em perfil redondo, disponível nos acabamentos trefilado e polido. Consulte a combinação de bitola, tolerância e comprimento para o seu pedido.':'Barra trefilada de bajo carbono, de perfil redondo, disponible con acabado trefilado o pulido. Consulte la combinación de diámetro, tolerancia y longitud para su pedido.',
  'Barra trefilada de médio teor de carbono, em perfil redondo, disponível nos acabamentos trefilado e polido. A especificação final depende do aço, da bitola e dos requisitos dimensionais do projeto.':'Barra trefilada de medio carbono, de perfil redondo, disponible con acabado trefilado o pulido. La especificación final depende del acero, el diámetro y los requisitos dimensionales del proyecto.',
  'Barra trefilada de alto teor de carbono, em perfil redondo, disponível nos acabamentos trefilado e polido. Aço, bitola, tolerância e comprimento devem ser confirmados para a aplicação informada.':'Barra trefilada de alto carbono, de perfil redondo, disponible con acabado trefilado o pulido. El acero, diámetro, tolerancia y longitud deben confirmarse para la aplicación indicada.',
  'Barra trefilada em aço ressulfurado 11SMn37, com foco em aplicações de usinagem seriada e componentes automotivos, hidráulicos e pneumáticos. Consulte a especificação dimensional do item.':'Barra trefilada en acero resulfurado 11SMn37 para aplicaciones de mecanizado en serie y componentes automotrices, hidráulicos y neumáticos. Consulte la especificación dimensional del artículo.',
  'Compare baixo, médio e alto teor de carbono e aço ressulfurado, escolha o acabamento e consulte as especificações para a sua necessidade.':'Compare aceros de bajo, medio y alto carbono y acero resulfurado, elija el acabado y consulte las especificaciones para su necesidad.',
  'Consulte faixa de aço, bitola, perfil, acabamento e acondicionamento. Tolerância e comprimento devem ser confirmados conforme a especificação do pedido.':'Consulte el rango de acero, diámetro, perfil, acabado y acondicionamiento. La tolerancia y la longitud deben confirmarse según la especificación del pedido.',
  'Informe aço, bitola, acabamento, comprimento e processo da peça para direcionar a consulta à opção adequada.':'Informe el acero, diámetro, acabado, longitud y proceso de la pieza para orientar la consulta hacia la opción adecuada.',
  'Envie faixa de aço, bitola, acabamento, comprimento e quantidade para a equipe Torcisão validar a condição de fornecimento e preparar a cotação.':'Envíe el rango de acero, diámetro, acabado, longitud y cantidad para que el equipo Torcisão valide las condiciones de suministro y prepare la cotización.',
  'Trefilada ou polida':'Trefilada o pulida','Trefilada':'Trefilada','Polida':'Pulida','Acabamento da barra':'Acabado de la barra',
  'Conforme especificação · sob consulta':'Según especificación · bajo consulta',
  'Aço Ressulfurado · 11SMn37':'Acero Resulfurado · 11SMn37','Médio Teor de Carbono · 1035 a 1050':'Medio Carbono · 1035 a 1050','Alto Teor de Carbono · 1060 a 1090':'Alto Carbono · 1060 a 1090','Aço':'Acero',

  'Tolerância do arame':'Tolerancia del alambre','A tolerância é definida sob consulta conforme bitola e requisito do item.':'La tolerancia se confirma bajo consulta según el diámetro y los requisitos del artículo.','Tolerância: sob consulta.':'Tolerancia: bajo consulta.','Informe faixa de aço, bitola, aplicação e forma de fornecimento para a equipe validar a especificação do pedido.':'Informe el rango de acero, diámetro, aplicación y forma de suministro para que el equipo valide la especificación del pedido.','Organize aço, bitola, aplicação e forma de fornecimento antes da cotação.':'Organice acero, diámetro, aplicación y forma de suministro antes de solicitar una cotización.',

  'Opções':'Opciones','Opção selecionada':'Opción seleccionada','Opções de imagem do arame em':'Opciones de imagen del alambre en','Ver opção':'Ver opción','Ângulos':'Ángulos','Ângulo selecionado':'Ángulo seleccionado','Ângulos da barra':'Ángulos de la barra','Ver ângulo':'Ver ángulo','Rolo':'Rollo','Spider':'Spider',

  'FERRAMENTA TÉCNICA':'HERRAMIENTA TÉCNICA','Consulta de Tolerância Dimensional':'Consulta de Tolerancia Dimensional','Barra trefilada · perfil redondo · processo trefilado':'Barra trefilada · perfil redondo · proceso trefilado','PROCESSO':'PROCESO','Informe a bitola para consultar h9, h10 e h11':'Introduzca el diámetro para consultar h9, h10 y h11','Bitola':'Diámetro','Consultar tolerância':'Consultar tolerancia','O resultado aparece aqui depois da consulta':'El resultado aparecerá aquí después de la consulta','Para acabamento polido, consulte nosso consultor':'Para acabado pulido, consulte a nuestro especialista','Sob consulta':'Bajo consulta','Limites':'Límites','Validar com especialista':'Validar con un especialista','Mínimo':'Mínimo','Máximo':'Máximo','BITOLA':'DIÁMETRO','Informe uma bitola válida acima de 1 mm e até 250 mm':'Introduzca un diámetro válido superior a 1 mm y hasta 250 mm','CONSULTA':'CONSULTA','Não encontrei uma faixa para esta bitola. Consulte nosso consultor':'No se encontró un rango para este diámetro. Consulte a nuestro especialista','h9 automático disponível a partir de 9,53 mm':'h9 automático disponible a partir de 9,53 mm','Bitola nominal:':'Diámetro nominal:','processo trefilado':'proceso trefilado','perfil redondo':'perfil redondo','Consulte referências h9, h10 e h11 para barras trefiladas de perfil redondo.':'Consulte las referencias h9, h10 y h11 para barras trefiladas de perfil redondo.',

  'Quer falar com o comercial sobre isso?':'¿Desea hablar con ventas sobre esto?','Leve o histórico desta consulta para o WhatsApp e continue com a equipe Torcisão sem precisar começar do zero.':'Envíe el contexto de esta consulta por WhatsApp y continúe con el equipo Torcisão sin tener que empezar de cero.','Quer continuar com o comercial?':'¿Desea continuar con ventas?','O WhatsApp leva junto o contexto da escolha manual e da conversa com o Theo.':'WhatsApp incluirá el contexto de la selección manual y de la conversación con Theo.','Quer levar esta consulta para o comercial?':'¿Desea llevar esta consulta al equipo comercial?','Envie a bitola e o resultado consultado para o WhatsApp da Torcisão.':'Envíe el diámetro y el resultado de la consulta al WhatsApp de Torcisão.','Assistente de Aplicação · Barra':'Asistente de Aplicación · Barra','Assistente de Aplicação · Arame':'Asistente de Aplicación · Alambre','Escolha manual:':'Selección manual:','Cliente:':'Cliente:','Theo:':'Theo:','Bitola consultada:':'Diámetro consultado:','Ferramenta: Consulta de Tolerância Dimensional':'Herramienta: Consulta de Tolerancia Dimensional'
};

const MAP=lang==='en'?EN:ES;
const entries=Object.entries(MAP).sort((a,b)=>b[0].length-a[0].length);
function tx(value){
  let out=String(value==null?'':value);
  if(MAP[out])return MAP[out];
  for(const [from,to] of entries){if(from&&out.includes(from))out=out.split(from).join(to);}
  return out;
}
function relevantRoots(){
  const selectors=isArame
    ? ['#arame-trefilado','#afAssistant','#afQuoteDrawer','#afLightbox','#afQuoteTab','#afArameAnglePicker','#torCommercialHandoff']
    : ['#barra-trefilada','#bfAssistant','#bfQuoteDrawer','#bfLightbox','#bfQuoteTab','#bfBtcAnglePicker','#thToleranceModal','#torCommercialHandoff'];
  return selectors.map(s=>document.querySelector(s)).filter(Boolean);
}
function translateRoot(root){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
  while((n=walker.nextNode())){
    const raw=n.nodeValue||'';if(!raw.trim())continue;const next=tx(raw);if(next!==raw)n.nodeValue=next;
  }
  root.querySelectorAll('[aria-label],[title],[placeholder],[data-label]').forEach(el=>{
    ['aria-label','title','placeholder','data-label'].forEach(attr=>{if(!el.hasAttribute(attr))return;const raw=el.getAttribute(attr)||'';const next=tx(raw);if(next!==raw)el.setAttribute(attr,next);});
  });
}
function run(){relevantRoots().forEach(translateRoot);}
let queued=false;
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;run();});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,150);setTimeout(run,650);},{once:true});else{run();setTimeout(run,150);setTimeout(run,650);}
const host=document.body||document.documentElement;
if(host)new MutationObserver(schedule).observe(host,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','data-label']});
})();