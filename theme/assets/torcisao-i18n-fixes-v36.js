(function(){
'use strict';
const requested=String(new URLSearchParams(location.search).get('lang')||'').toLowerCase();
const pathMatch=location.pathname.match(/^\/(en|es)(?:\/|$)/i);
const lang=['en','es'].includes(requested)?requested:(pathMatch?pathMatch[1].toLowerCase():(window.TorcisaoI18n?.lang||'pt'));
if(!['en','es'].includes(lang))return;
const locale=lang==='en'?'en-US':'es-ES';

const FORMS={
 en:{home:'cbf40e23-3a68-4277-8fe7-5608934cb218',arame:'0d65d76a-b919-4409-8de6-ea7bd4e7eb0d',barra:'bd0d6739-9919-494b-9b7b-53caf42364cf',hasteBaixa:'1eeb4c20-a60a-4364-9278-84635db86f38',hasteAlta:'e0aca218-973f-4ecb-af85-18032f9cdcd4'},
 es:{home:'9eddcde4-00ee-4dae-a79f-482b94ad1116',arame:'46f1e876-b1be-40e3-af78-18e22ab321e3',barra:'aabedf05-182f-4e3f-9942-38644d9fa9ef',hasteBaixa:'04270d17-a89c-4ed5-b284-4ee36e14bb91',hasteAlta:'f1f99afd-c3b6-40d8-b61c-ad983ae85a9a'}
}[lang];

const EXACT={
 en:{
  'Compare opções de baixo, médio e alto teor de carbono, consulte bitolas e forma de fornecimento e avance com a equipe Torcisão na validação do seu pedido.':'Compare low-, medium-, and high-carbon options, review diameters and supply formats, and proceed with the Torcisão team to validate your order.',
  'Soluções em barras trefiladas para aplicações que exigem precisão dimensional, acabamento e desempenho mecânico.':'Drawn bar solutions for applications that require dimensional precision, surface finish, and mechanical performance.',
  'Compare opções de baixa e alta camada, consulte medidas e conectores e avance com a equipe Torcisão na validação da sua especificação.':'Compare low- and high-coating options, review dimensions and connectors, and proceed with the Torcisão team to validate your specification.',
  'Consulte faixa de aço, bitola, perfil, acabamento e forma de fornecimento. A tolerância deve ser confirmada conforme a especificação do pedido.':'Review steel grade range, diameter, profile, finish, and supply format. Tolerance must be confirmed according to the order specification.',
  'Informe aplicação, faixa de aço, bitola, propriedades requeridas e forma de fornecimento para direcionar a consulta à opção adequada.':'Provide the application, steel grade range, diameter, required properties, and supply format to direct the inquiry to the appropriate option.',
  'As referências abaixo reproduzem as informações publicadas pela Torcisão. Tolerâncias, composição, tratamento e demais requisitos devem ser confirmados conforme o desenho ou memorial do projeto.':'The references below reproduce information published by Torcisão. Tolerances, composition, treatment, and other requirements must be confirmed according to the project drawing or specification.',
  'A aplicação indica um ponto de partida. A seleção do aço depende dos requisitos mecânicos, dimensionais e do processo de fabricação.':'The application provides a starting point. Steel selection depends on mechanical and dimensional requirements and the manufacturing process.',
  'Consulte os dados disponíveis para a configuração escolhida. Tolerâncias, combinações específicas e requisitos do projeto devem ser confirmados com nossa equipe.':'Review the available data for the selected configuration. Tolerances, specific combinations, and project requirements must be confirmed with our team.',
  'Use o assistente para estruturar camada, medida, conector e demais pontos técnicos que precisam ser validados no seu projeto.':'Use the assistant to organize coating, dimensions, connector, and other technical points that must be validated for your project.',
  'Opção selecionada':'Selected option','Ângulo selecionado':'Selected angle','Produto Torcisão':'Torcisão product',
  'Ferramentas para avançar':'Tools to move forward','Ferramentas para avaliar':'Tools to evaluate','Tolerância do arame':'Wire tolerance','A tolerância é definida sob consulta conforme bitola e requisito do item.':'Tolerance is confirmed upon request according to diameter and item requirements.','Assistente de aplicação':'Application assistant','Organize aço, bitola, aplicação e forma de fornecimento antes da cotação.':'Organize steel grade, diameter, application, and supply format before requesting a quote.','Tolerância: sob consulta.':'Tolerance: upon request.','Informe faixa de aço, bitola, aplicação e forma de fornecimento para a equipe validar a especificação do pedido.':'Provide steel grade range, diameter, application, and supply format so our team can validate the order specification.',
  'Faixa e fornecimento':'Range and supply','Referências da opção selecionada':'Selected option references','Referência':'Reference','Informação':'Information','Fornecimento':'Supply','Sob consulta':'Upon request','Rolos ou spiders':'Coils or spiders','Trefilado':'Drawn','Redondo':'Round','Bitola / diâmetro':'Diameter','Bitola':'Diameter','Tolerância':'Tolerance','Acondicionamento':'Packaging','Perfil':'Profile','Acabamento':'Finish','Faixa de aço':'Steel grade range',
  'Aplicação e consulta':'Application and consultation','Organize os requisitos antes da cotação':'Organize requirements before requesting a quote','O que informar na consulta':'What to include in your inquiry','Aço e bitola':'Steel grade and diameter','Requisito mecânico':'Mechanical requirement','Forma de fornecimento':'Supply format',
  'Todos os direitos reservados':'All rights reserved','Torcisão Copyright 2026 - Todos os direitos reservados':'Torcisão Copyright 2026 - All rights reserved',
  'Ver todos os conteúdos':'View all content','APLICAÇÕES INDUSTRIAIS':'INDUSTRIAL APPLICATIONS','INOVAÇÃO':'INNOVATION','Conteúdo técnico':'Technical content',
  'Produto: Arame Trefilado':'Product: Drawn Wire','Produto: Barra Trefilada':'Product: Drawn Bar','Produto: Haste de Aterramento':'Product: Grounding Rod','Produto: Conectores':'Product: Connectors',
  'Solicitar cotação':'Request a quote','Fechar':'Close'
 },
 es:{
  'Compare opções de baixo, médio e alto teor de carbono, consulte bitolas e forma de fornecimento e avance com a equipe Torcisão na validação do seu pedido.':'Compare opciones de bajo, medio y alto carbono, consulte diámetros y formas de suministro y avance con el equipo Torcisão en la validación de su pedido.',
  'Soluções em barras trefiladas para aplicações que exigem precisão dimensional, acabamento e desempenho mecânico.':'Soluciones en barras trefiladas para aplicaciones que requieren precisión dimensional, acabado superficial y desempeño mecánico.',
  'Compare opções de baixa e alta camada, consulte medidas e conectores e avance com a equipe Torcisão na validação da sua especificação.':'Compare opciones de capa baja y alta, consulte medidas y conectores y avance con el equipo Torcisão en la validación de su especificación.',
  'Consulte faixa de aço, bitola, perfil, acabamento e forma de fornecimento. A tolerância deve ser confirmada conforme a especificação do pedido.':'Consulte rango de acero, diámetro, perfil, acabado y forma de suministro. La tolerancia debe confirmarse según la especificación del pedido.',
  'Informe aplicação, faixa de aço, bitola, propriedades requeridas e forma de fornecimento para direcionar a consulta à opção adequada.':'Informe la aplicación, rango de acero, diámetro, propiedades requeridas y forma de suministro para dirigir la consulta a la opción adecuada.',
  'As referências abaixo reproduzem as informações publicadas pela Torcisão. Tolerâncias, composição, tratamento e demais requisitos devem ser confirmados conforme o desenho ou memorial do projeto.':'Las referencias siguientes reproducen la información publicada por Torcisão. Las tolerancias, composición, tratamiento y demás requisitos deben confirmarse según el plano o la especificación del proyecto.',
  'A aplicação indica um ponto de partida. A seleção do aço depende dos requisitos mecânicos, dimensionais e do processo de fabricação.':'La aplicación indica un punto de partida. La selección del acero depende de los requisitos mecánicos, dimensionales y del proceso de fabricación.',
  'Consulte os dados disponíveis para a configuração escolhida. Tolerâncias, combinações específicas e requisitos do projeto devem ser confirmados com nossa equipe.':'Consulte los datos disponibles para la configuración seleccionada. Las tolerancias, combinaciones específicas y requisitos del proyecto deben confirmarse con nuestro equipo.',
  'Use o assistente para estruturar camada, medida, conector e demais pontos técnicos que precisam ser validados no seu projeto.':'Use el asistente para organizar capa, medidas, conector y demás puntos técnicos que deben validarse en su proyecto.',
  'Opção selecionada':'Opción seleccionada','Ângulo selecionado':'Ángulo seleccionado','Produto Torcisão':'Producto Torcisão',
  'Ferramentas para avançar':'Herramientas para avanzar','Ferramentas para avaliar':'Herramientas para evaluar','Tolerância do arame':'Tolerancia del alambre','A tolerância é definida sob consulta conforme bitola e requisito do item.':'La tolerancia se confirma bajo consulta según el diámetro y los requisitos del artículo.','Assistente de aplicação':'Asistente de aplicación','Organize aço, bitola, aplicação e forma de fornecimento antes da cotação.':'Organice acero, diámetro, aplicación y forma de suministro antes de solicitar una cotización.','Tolerância: sob consulta.':'Tolerancia: bajo consulta.','Informe faixa de aço, bitola, aplicação e forma de fornecimento para a equipe validar a especificação do pedido.':'Informe rango de acero, diámetro, aplicación y forma de suministro para que el equipo valide la especificación del pedido.',
  'Faixa e fornecimento':'Rango y suministro','Referências da opção selecionada':'Referencias de la opción seleccionada','Referência':'Referencia','Informação':'Información','Fornecimento':'Suministro','Sob consulta':'Bajo consulta','Rolos ou spiders':'Rollos o spiders','Trefilado':'Trefilado','Redondo':'Redondo','Bitola / diâmetro':'Diámetro','Bitola':'Diámetro','Tolerância':'Tolerancia','Acondicionamento':'Acondicionamiento','Perfil':'Perfil','Acabamento':'Acabado','Faixa de aço':'Rango de acero',
  'Aplicação e consulta':'Aplicación y consulta','Organize os requisitos antes da cotação':'Organice los requisitos antes de solicitar una cotización','O que informar na consulta':'Qué informar en la consulta','Aço e bitola':'Acero y diámetro','Requisito mecânico':'Requisito mecánico','Forma de fornecimento':'Forma de suministro',
  'Todos os direitos reservados':'Todos los derechos reservados','Torcisão Copyright 2026 - Todos os direitos reservados':'Torcisão Copyright 2026 - Todos los derechos reservados',
  'Ver todos os conteúdos':'Ver todo el contenido','APLICAÇÕES INDUSTRIAIS':'APLICACIONES INDUSTRIALES','INOVAÇÃO':'INNOVACIÓN','Conteúdo técnico':'Contenido técnico',
  'Produto: Arame Trefilado':'Producto: Alambre Trefilado','Produto: Barra Trefilada':'Producto: Barra Trefilada','Produto: Haste de Aterramento':'Producto: Varilla de Puesta a Tierra','Produto: Conectores':'Producto: Conectores',
  'Solicitar cotação':'Solicitar cotización','Fechar':'Cerrar'
 }
}[lang];

const TIMELINE={
 1968:{en:'Torcisão Trefilados was founded in 1968, focused on developing materials for the automotive industry and distinguished by rigorous technical and quality control.',es:'Torcisão Trefilados nace en 1968, enfocada en el desarrollo de materiales para la industria automotriz y destacándose por un riguroso control técnico y de calidad.'},
 1975:{en:'The company changes its corporate name and consolidates its activities in drawn iron and steel products, washers, rivets, grease fittings, nuts, bolts, nails, and machined components.',es:'La empresa cambia su razón social y consolida sus actividades en hierros y aceros trefilados, arandelas, remaches, engrasadores, tuercas, tornillos, clavos y componentes mecanizados.'},
 1978:{en:'Headquarters move to Vila Liviero, São Paulo, marking both a new location and an expansion of the company’s scope of operations.',es:'La sede se traslada a Vila Liviero, São Paulo, marcando no solo un cambio de dirección, sino también una ampliación del alcance de las operaciones.'},
 1999:{en:'Torcisão is acquired by the current management team, beginning a new phase of renewal and growth.',es:'Torcisão es adquirida por la dirección actual, dando inicio a una nueva etapa de renovación y crecimiento.'},
 2005:{en:'Torcisão Industrial is established with its own headquarters, initially focused on accessories for shoring, formwork, and scaffolding.',es:'Nace Torcisão Industrial con sede propia, inicialmente enfocada en accesorios para apuntalamiento, encofrados y andamios.'},
 2006:{en:'In 2006, following the growth of the construction industry, Torcisão Industrial diversifies its activities and strengthens its position in products for this sector.',es:'En 2006, acompañando el crecimiento de la construcción, Torcisão Industrial diversifica sus actividades y fortalece su presencia en productos para este sector.'},
 2011:{en:'The prestressing unit is launched in 2011, expanding the company’s scope to serve customers on major projects in Brazil.',es:'La unidad de pretensado se lanza en 2011, ampliando el alcance de la empresa para atender grandes proyectos en Brasil.'},
 2013:{en:'In 2013, Torcisão begins manufacturing threaded bars, expanding its portfolio for rock support applications in underground excavations.',es:'En 2013, Torcisão inicia la fabricación de barras roscadas, ampliando su portafolio para aplicaciones de sostenimiento de roca en excavaciones subterráneas.'},
 2014:{en:'Torcisão Trefilados specializes in manufacturing grounding rods for infrastructure and construction projects.',es:'Torcisão Trefilados se especializa en la fabricación de varillas de puesta a tierra para proyectos de infraestructura y construcción.'},
 2015:{en:'Torcisão Industrial expands into the energy sector, manufacturing products for foundations used in energy projects.',es:'Torcisão Industrial amplía sus actividades hacia el sector energético, fabricando productos para cimentaciones de proyectos de energía.'},
 2016:{en:'The company moves its headquarters to Ribeirão Pires in 2016, marking a period of consolidation and modernization.',es:'La empresa traslada su sede a Ribeirão Pires en 2016, marcando una etapa de consolidación y modernización.'},
 2017:{en:'The Drawn Wire unit is launched in 2017, expanding the company’s market presence and product mix.',es:'La unidad de Alambres Trefilados se lanza en 2017, ampliando la presencia de la empresa en el mercado y su mix de productos.'},
 2019:{en:'Development and patenting of Helical Steel Piles for static load testing, providing greater agility and efficiency on construction sites.',es:'Desarrollo y patentamiento de Pilotes Metálicos Helicoidales para pruebas de carga estática, aportando mayor agilidad y eficiencia en obra.'},
 2022:{en:'In 2022, Torcisão becomes Torcisão Group, reflecting the expansion and diversification of its activities over the years.',es:'En 2022, Torcisão se convierte en Grupo Torcisão, reflejando la expansión y diversificación de sus actividades a lo largo de los años.'},
 2024:{en:'With the acquisition of a new raw-material storage facility, the company expands its storage and production capacity.',es:'Con la adquisición de una nueva nave para almacenamiento de materia prima, ampliamos la capacidad de almacenamiento y producción.'}
};

const BLOG={
 en:{
  '7 critérios para escolher fabricante de aço 11SMn37':'7 criteria for choosing an 11SMn37 steel manufacturer',
  'Muito mais que aço: conheça a linha completa de produtos da Torcisão Trefilados':'More than steel: discover the complete Torcisão Trefilados product line',
  first:'Choosing the right manufacturer of 11SMn37 drawn steel bars is essential to avoid delays, rework, and production downtime. Torcisão presents seven key criteria for evaluating industrial suppliers.',
  second:'Discover the Torcisão Trefilados portfolio of drawn bars, drawn wires, resulfurized steels, and grounding rods for industrial applications.'
 },
 es:{
  '7 critérios para escolher fabricante de aço 11SMn37':'7 criterios para elegir un fabricante de acero 11SMn37',
  'Muito mais que aço: conheça a linha completa de produtos da Torcisão Trefilados':'Mucho más que acero: conoce la línea completa de productos de Torcisão Trefilados',
  first:'Elegir el fabricante adecuado de barras trefiladas de acero 11SMn37 es esencial para evitar retrasos, retrabajos y paradas de producción. Torcisão presenta siete criterios clave para evaluar proveedores industriales.',
  second:'Conozca el portafolio de Torcisão Trefilados de barras trefiladas, alambres trefilados, aceros resulfurados y varillas de puesta a tierra para aplicaciones industriales.'
 }
}[lang];

function patchForms(){
 const home=document.getElementById('homeQuoteForm');if(home){home.dataset.hubspotPortal='50818463';home.dataset.hubspotForm=FORMS.home;}
 if(window.TORCISAO_ARAME_PAGE){window.TORCISAO_ARAME_PAGE.portalId='50818463';window.TORCISAO_ARAME_PAGE.formId=FORMS.arame;}
 if(window.TORCISAO_BARRA_PAGE){window.TORCISAO_BARRA_PAGE.portalId='50818463';window.TORCISAO_BARRA_PAGE.formId=FORMS.barra;}
 if(window.TORCISAO_HASTE_PAGE){window.TORCISAO_HASTE_PAGE.portalId='50818463';window.TORCISAO_HASTE_PAGE.formIds={baixa:FORMS.hasteBaixa,alta:FORMS.hasteAlta,conectores:FORMS.hasteBaixa};}
}
function setText(el,text){if(el&&text&&el.textContent!==text)el.textContent=text;}
function fixProductCritical(){
 const arame=document.getElementById('arame-trefilado'),barra=document.getElementById('barra-trefilada'),haste=document.getElementById('haste-aterramento');
 if(arame){
  setText(arame.querySelector('.hf-top .hf-intro'),EXACT['Compare opções de baixo, médio e alto teor de carbono, consulte bitolas e forma de fornecimento e avance com a equipe Torcisão na validação do seu pedido.']);
  setText(arame.querySelector('#especificacoes .hf-section-intro'),EXACT['Consulte faixa de aço, bitola, perfil, acabamento e forma de fornecimento. A tolerância deve ser confirmada conforme a especificação do pedido.']);
  setText(arame.querySelector('#aplicacoes .hf-section-intro'),EXACT['Informe aplicação, faixa de aço, bitola, propriedades requeridas e forma de fornecimento para direcionar a consulta à opção adequada.']);
  setText(document.getElementById('afCaptionMeta'),lang==='en'?'Selected option':'Opción seleccionada');
 }
 if(barra){
  setText(barra.querySelector('.hf-top .hf-intro'),EXACT['Soluções em barras trefiladas para aplicações que exigem precisão dimensional, acabamento e desempenho mecânico.']);
  setText(barra.querySelector('#especificacoes .hf-section-intro'),EXACT['As referências abaixo reproduzem as informações publicadas pela Torcisão. Tolerâncias, composição, tratamento e demais requisitos devem ser confirmados conforme o desenho ou memorial do projeto.']);
  setText(barra.querySelector('#aplicacoes .hf-section-intro'),EXACT['A aplicação indica um ponto de partida. A seleção do aço depende dos requisitos mecânicos, dimensionais e do processo de fabricação.']);
  setText(document.getElementById('bfCaptionMeta'),lang==='en'?'Selected angle':'Ángulo seleccionado');
 }
 if(haste){
  setText(haste.querySelector('.hf-top .hf-intro'),EXACT['Compare opções de baixa e alta camada, consulte medidas e conectores e avance com a equipe Torcisão na validação da sua especificação.']);
  setText(haste.querySelector('#especificacoes .hf-section-intro'),EXACT['Consulte os dados disponíveis para a configuração escolhida. Tolerâncias, combinações específicas e requisitos do projeto devem ser confirmados com nossa equipe.']);
  setText(haste.querySelector('#aplicacoes .hf-section-intro'),EXACT['Use o assistente para estruturar camada, medida, conector e demais pontos técnicos que precisam ser validados no seu projeto.']);
 }
}
function fixTimeline(){
 const modal=document.getElementById('torAboutHistoryModal');if(!modal?.classList.contains('is-open'))return;
 const active=document.querySelector('.tor-year-btn.is-current');const year=Number(active?.dataset.yearLabel||active?.textContent?.match(/20\d{2}|19\d{2}/)?.[0]||0);if(!TIMELINE[year])return;
 const p=modal.querySelector('[data-tor-about-content] > p');if(p)setText(p,TIMELINE[year][lang]);
}
function fixBlog(){
 document.querySelectorAll('.tb-blog-card,.tor-blog-card').forEach(card=>{
  const h=card.querySelector('h3');if(!h)return;const raw=h.textContent.replace(/\s+/g,' ').trim();let key='';
  if(raw.includes('11SMn37'))key='7 critérios para escolher fabricante de aço 11SMn37';
  else if(raw.includes('linha completa')||raw.includes('complete Torcisão Trefilados product line')||raw.includes('línea completa'))key='Muito mais que aço: conheça a linha completa de produtos da Torcisão Trefilados';
  if(!key)return;setText(h,BLOG[key]);
  const summary=card.querySelector('.tor-blog-summary');if(summary)setText(summary,key.startsWith('7 critérios')?BLOG.first:BLOG.second);
 });
 document.querySelectorAll('.tb-blog-tag,.tor-blog-badge').forEach(el=>{const key=el.textContent.trim().toUpperCase();if(EXACT[key])setText(el,EXACT[key]);});
 document.querySelectorAll('.tb-blog-all').forEach(el=>{const span=el.querySelector('span');const arrow=span?.outerHTML||'<span aria-hidden="true">↗</span>';const desired=(lang==='en'?'View all content':'Ver todo el contenido')+' ';if(!el.textContent.trim().startsWith(desired.trim()))el.innerHTML=desired+arrow;});
 const monthsEn={FEV:'FEB',ABR:'APR',MAI:'MAY',AGO:'AUG',SET:'SEP',OUT:'OCT',DEZ:'DEC'};
 const monthsEs={JAN:'ENE',FEV:'FEB',MAR:'MAR',ABR:'ABR',MAI:'MAY',JUN:'JUN',JUL:'JUL',AGO:'AGO',SET:'SEP',OUT:'OCT',NOV:'NOV',DEZ:'DIC'};
 document.querySelectorAll('.tb-blog-date').forEach(el=>{let s=el.textContent.trim();const m=lang==='en'?monthsEn:monthsEs;Object.entries(m).forEach(([a,b])=>{s=s.replace(new RegExp('\\b'+a+'\\b','g'),b);});setText(el,s);});
}
function fixFooter(){const copy=document.querySelector('.tor-footer-copy');if(copy)setText(copy,lang==='en'?'Torcisão Copyright 2026 - All rights reserved':'Torcisão Copyright 2026 - Todos los derechos reservados');}
function fixCommercialContext(){
 const ctx=document.querySelector('[data-commercial-context]');if(!ctx)return;let s=ctx.textContent;
 const replacements=lang==='en'?[['Produto:','Product:'],['Arame Trefilado','Drawn Wire'],['Barra Trefilada','Drawn Bar'],['Haste de Aterramento','Grounding Rod'],['Escolha manual:','Manual selection:'],['Cliente:','Customer:'],['Ferramenta:','Tool:'],['Bitola:','Diameter:']]:[['Produto:','Producto:'],['Arame Trefilado','Alambre Trefilado'],['Barra Trefilada','Barra Trefilada'],['Haste de Aterramento','Varilla de Puesta a Tierra'],['Escolha manual:','Selección manual:'],['Cliente:','Cliente:'],['Ferramenta:','Herramienta:'],['Bitola:','Diámetro:']];
 replacements.forEach(([a,b])=>{s=s.split(a).join(b);});if(ctx.textContent!==s)ctx.textContent=s;
 const overlay=document.getElementById('torCommercialHandoff');if(overlay?.classList.contains('is-open')){
  const small=overlay.querySelector('.tor-commercial-offer-card>small');if(small)setText(small,lang==='en'?'NEXT STEP':'SIGUIENTE PASO');
  const wa=overlay.querySelector('[data-commercial-whatsapp]');if(wa)setText(wa,lang==='en'?'Contact sales on WhatsApp':'Hablar con ventas por WhatsApp');
  const dismiss=overlay.querySelector('[data-commercial-dismiss]');if(dismiss)setText(dismiss,lang==='en'?'Not now':'Ahora no');
 }
}
function patchExactText(){
 const selector='p,h1,h2,h3,h4,h5,h6,small,strong,span,button,label,option,th,td,a';
 document.querySelectorAll(selector).forEach(el=>{if(el.children.length||el.closest('script,style,noscript,code,pre,[data-no-i18n]'))return;const key=el.textContent.replace(/\s+/g,' ').trim();if(EXACT[key])setText(el,EXACT[key]);});
}
function run(){patchForms();patchExactText();fixProductCritical();fixTimeline();fixBlog();fixFooter();fixCommercialContext();}
if(window.TorcisaoI18n?.register)window.TorcisaoI18n.register(EXACT);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
let scheduled=false;new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;run();});}).observe(document.documentElement,{subtree:true,childList:true,characterData:true});

/* Override the old Portuguese WhatsApp handoff message in translated versions. */
document.addEventListener('click',e=>{const btn=e.target.closest?.('[data-commercial-whatsapp]');if(!btn)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();fixCommercialContext();const ctx=document.querySelector('[data-commercial-context]')?.textContent.trim()||'';const lines=lang==='en'?['Hello! I was using a tool on the Torcisão Trefilados website and would like to speak with the sales team.','',ctx,'','I would like to continue this conversation on WhatsApp.']:['¡Hola! Estaba usando una herramienta en el sitio de Torcisão Trefilados y me gustaría hablar con el equipo comercial.','',ctx,'','Me gustaría continuar esta atención por WhatsApp.'];window.open('https://wa.me/551123349989?text='+encodeURIComponent(lines.filter((v,i)=>v||i===1).join('\n')),'_blank','noopener');const overlay=document.getElementById('torCommercialHandoff');overlay?.classList.remove('is-open');overlay?.setAttribute('aria-hidden','true');document.body.classList.remove('tor-commercial-offer-open');},true);
})();
