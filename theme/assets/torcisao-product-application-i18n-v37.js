(function(){
'use strict';
const requested=String(new URLSearchParams(location.search).get('lang')||'').toLowerCase();
const pathMatch=location.pathname.match(/^\/(en|es)(?:\/|$)/i);
const lang=['en','es'].includes(requested)?requested:(pathMatch?pathMatch[1].toLowerCase():(window.TorcisaoI18n?.lang||'pt'));
if(!['en','es'].includes(lang))return;

const T={
 en:{
  'Aplicação e consulta':'Application and consultation',
  'Aplicações':'Applications',
  'Organize os requisitos antes da cotação':'Organize requirements before requesting a quote',
  'Informe aplicação, faixa de aço, bitola, propriedades requeridas e forma de fornecimento para direcionar a consulta à opção adequada.':'Provide the application, steel grade range, diameter, required properties, and supply format to direct the inquiry to the appropriate option.',
  'A aplicação indica um ponto de partida. A seleção do aço depende dos requisitos mecânicos, dimensionais e do processo de fabricação.':'The application provides a starting point. Steel selection depends on mechanical and dimensional requirements and the manufacturing process.',
  'Informe aço, bitola, acabamento, comprimento e processo da peça para direcionar a consulta à opção adequada.':'Provide the steel grade, diameter, finish, length, and part manufacturing process to direct the inquiry to the appropriate option.',
  'Use o assistente para estruturar camada, medida, conector e demais pontos técnicos que precisam ser validados no seu projeto.':'Use the assistant to organize coating, dimensions, connector, and other technical points that must be validated for your project.',

  'Ferramentas para avançar':'Tools to move forward',
  'Ferramentas para avaliar':'Tools to evaluate',
  'Tolerância do arame':'Wire tolerance',
  'A tolerância é definida sob consulta conforme bitola e requisito do item.':'Tolerance is confirmed upon request according to diameter and item requirements.',
  'As tolerâncias são definidas sob consulta conforme bitola e aplicação.':'Tolerances are confirmed upon request according to diameter and application.',
  'Tolerância: sob consulta.':'Tolerance: upon request.',
  'Informe faixa de aço, bitola, aplicação e forma de fornecimento para a equipe validar a especificação do pedido.':'Provide the steel grade range, diameter, application, and supply format so our team can validate the order specification.',
  'Para arames BTC, MTC e ATC, a tolerância publicada depende da bitola, aplicação e condição de fornecimento. Use o Theo para organizar a especificação antes da cotação.':'For BTC, MTC, and ATC wires, the published tolerance depends on diameter, application, and supply condition. Use Theo to organize the specification before requesting a quote.',
  'Assistente de aplicação':'Application assistant',
  'Organize aço, bitola, aplicação e forma de fornecimento antes da cotação.':'Organize steel grade, diameter, application, and supply format before requesting a quote.',
  'Use o Theo para organizar produto, bitola e requisitos do projeto.':'Use Theo to organize the product, diameter, and project requirements.',

  'O que informar na consulta':'What to include in your inquiry',
  'Aço e bitola':'Steel grade and diameter',
  'Informe a faixa de aço e o diâmetro nominal previstos no desenho ou na especificação.':'Provide the steel grade range and nominal diameter specified in the drawing or specification.',
  'Informe a faixa de aço e o diâmetro nominal previstos no desenho ou especificação.':'Provide the steel grade range and nominal diameter specified in the drawing or specification.',
  'Requisito mecânico':'Mechanical requirement',
  'Quando houver requisito de resistência, dureza ou outra propriedade, informe a referência prevista para a peça.':'If strength, hardness, or another property is required, provide the specified reference for the part.',
  'Forma de fornecimento':'Supply format',
  'Indique rolo ou spider e as demais condições do pedido. A disponibilidade é confirmada durante a cotação.':'Specify coil or spider and the other order conditions. Availability is confirmed during the quotation process.',

  'Consulta de tolerância':'Tolerance lookup',
  'A tolerância é definida sob consulta conforme aço, bitola e requisito dimensional.':'Tolerance is confirmed upon request according to steel grade, diameter, and dimensional requirements.',
  'Informe faixa de aço, bitola nominal, acabamento, comprimento e requisito dimensional para a equipe validar a condição de fornecimento.':'Provide the steel grade range, nominal diameter, finish, length, and dimensional requirements so our team can validate the supply condition.',
  'Organize aço, bitola, acabamento, comprimento e processo antes da cotação.':'Organize steel grade, diameter, finish, length, and process before requesting a quote.',
  'Acabamento e comprimento':'Finish and length',
  'Indique se a necessidade é trefilada ou polida e informe o comprimento solicitado.':'Specify whether a drawn or polished finish is required and provide the requested length.',
  'Processo da peça':'Part manufacturing process',
  'Usinagem, conformação, soldagem ou outra etapa de fabricação ajuda a equipe a validar a condição adequada.':'Machining, forming, welding, or another manufacturing step helps our team validate the appropriate condition.',

  'Aplicações publicadas':'Published applications',
  'O que validar no projeto':'What to validate for the project',
  'Aço / teor de carbono':'Steel grade / carbon content',
  'Confirme a classificação do material prevista no desenho ou especificação.':'Confirm the material classification specified in the drawing or specification.',
  'Dimensão e tolerância':'Dimensions and tolerance',
  'Bitola, comprimento e tolerância devem acompanhar a necessidade da peça.':'Diameter, length, and tolerance must match the part requirements.',
  'Processo':'Process',
  'Usinagem, conformação, soldagem, tratamento ou acabamento podem alterar a seleção final.':'Machining, forming, welding, treatment, or finishing may affect the final selection.',

  'Descreva a instalação, medida, camada, conector ou requisito do projeto. O Theo organiza os pontos que precisam ser avaliados antes da cotação.':'Describe the installation, dimensions, coating, connector, or project requirement. Theo organizes the points that must be assessed before requesting a quote.',
  'Consultar o Theo':'Consult Theo',
  'Organize a necessidade técnica sem navegar por uma lista de aplicações soltas.':'Organize the technical requirements without having to browse a generic list of applications.',
  'Dimensão':'Dimensions',
  'Bitola e comprimento compatíveis com o desenho ou memorial.':'Use a diameter and length compatible with the drawing or project specification.',
  'Requisito técnico':'Technical requirement',
  'Norma, camada, material e condição de instalação exigidos.':'Confirm the required standard, coating, material, and installation conditions.',
  'Conexão':'Connection',
  'Modelo de conector e cabo previstos no sistema de aterramento.':'Confirm the connector model and cable specified for the grounding system.',

  'Displays aramados':'Wire displays','Utilidades domésticas':'Household items','Linha branca':'Home appliances','Racks':'Racks','Telas':'Wire mesh','Molas':'Springs','Cabos de aço':'Steel cables','Componentes automotivos':'Automotive components','Pregos':'Nails',
  'Fixadores':'Fasteners','Autopeças':'Automotive parts','Cesto metálico':'Metal basket','Rack metálico':'Metal rack','Molas helicoidais':'Coil springs','Amortecedores':'Shock absorbers','Eixos':'Shafts','Engrenagens':'Gears','Bielas':'Connecting rods','Cubos de roda':'Wheel hubs','Trilhos':'Rails','Parafusos':'Bolts','Porcas':'Nuts','Pinos':'Pins','Hastes de amortecedor':'Shock absorber rods','Sapatas de trator':'Tractor shoes','Peças forjadas':'Forged parts','Ferramentas manuais':'Hand tools','Setor automotivo':'Automotive sector','Pistões':'Pistons','Bujões':'Plugs','Válvulas':'Valves','Sistemas hidráulicos':'Hydraulic systems','Sistemas pneumáticos':'Pneumatic systems',
  'Sistemas de aterramento':'Grounding systems','SPDA':'Lightning protection systems (SPDA)','Geração e transmissão de energia':'Power generation and transmission','Distribuição de energia':'Power distribution','Redes de telecomunicações':'Telecommunications networks','Aterramento de equipamentos':'Equipment grounding','Energias renováveis':'Renewable energy','Construção industrial':'Industrial construction','Ambientes residenciais':'Residential environments','Instalações prediais':'Building installations','Instalações industriais':'Industrial installations','Telecomunicações':'Telecommunications'
 },
 es:{
  'Aplicação e consulta':'Aplicación y consulta',
  'Aplicações':'Aplicaciones',
  'Organize os requisitos antes da cotação':'Organice los requisitos antes de solicitar una cotización',
  'Informe aplicação, faixa de aço, bitola, propriedades requeridas e forma de fornecimento para direcionar a consulta à opção adequada.':'Informe la aplicación, rango de acero, diámetro, propiedades requeridas y forma de suministro para dirigir la consulta a la opción adecuada.',
  'A aplicação indica um ponto de partida. A seleção do aço depende dos requisitos mecânicos, dimensionais e do processo de fabricação.':'La aplicación indica un punto de partida. La selección del acero depende de los requisitos mecánicos, dimensionales y del proceso de fabricación.',
  'Informe aço, bitola, acabamento, comprimento e processo da peça para direcionar a consulta à opção adequada.':'Informe el acero, diámetro, acabado, longitud y proceso de fabricación de la pieza para dirigir la consulta a la opción adecuada.',
  'Use o assistente para estruturar camada, medida, conector e demais pontos técnicos que precisam ser validados no seu projeto.':'Use el asistente para organizar capa, medidas, conector y demás puntos técnicos que deben validarse en su proyecto.',

  'Ferramentas para avançar':'Herramientas para avanzar',
  'Ferramentas para avaliar':'Herramientas para evaluar',
  'Tolerância do arame':'Tolerancia del alambre',
  'A tolerância é definida sob consulta conforme bitola e requisito do item.':'La tolerancia se confirma bajo consulta según el diámetro y los requisitos del artículo.',
  'As tolerâncias são definidas sob consulta conforme bitola e aplicação.':'Las tolerancias se confirman bajo consulta según el diámetro y la aplicación.',
  'Tolerância: sob consulta.':'Tolerancia: bajo consulta.',
  'Informe faixa de aço, bitola, aplicação e forma de fornecimento para a equipe validar a especificação do pedido.':'Informe el rango de acero, diámetro, aplicación y forma de suministro para que el equipo valide la especificación del pedido.',
  'Para arames BTC, MTC e ATC, a tolerância publicada depende da bitola, aplicação e condição de fornecimento. Use o Theo para organizar a especificação antes da cotação.':'Para alambres BTC, MTC y ATC, la tolerancia publicada depende del diámetro, la aplicación y la condición de suministro. Use Theo para organizar la especificación antes de solicitar una cotización.',
  'Assistente de aplicação':'Asistente de aplicación',
  'Organize aço, bitola, aplicação e forma de fornecimento antes da cotação.':'Organice acero, diámetro, aplicación y forma de suministro antes de solicitar una cotización.',
  'Use o Theo para organizar produto, bitola e requisitos do projeto.':'Use Theo para organizar el producto, diámetro y requisitos del proyecto.',

  'O que informar na consulta':'Qué incluir en su consulta',
  'Aço e bitola':'Acero y diámetro',
  'Informe a faixa de aço e o diâmetro nominal previstos no desenho ou na especificação.':'Informe el rango de acero y el diámetro nominal especificados en el plano o la especificación.',
  'Informe a faixa de aço e o diâmetro nominal previstos no desenho ou especificação.':'Informe el rango de acero y el diámetro nominal especificados en el plano o la especificación.',
  'Requisito mecânico':'Requisito mecánico',
  'Quando houver requisito de resistência, dureza ou outra propriedade, informe a referência prevista para a peça.':'Cuando exista un requisito de resistencia, dureza u otra propiedad, indique la referencia prevista para la pieza.',
  'Forma de fornecimento':'Forma de suministro',
  'Indique rolo ou spider e as demais condições do pedido. A disponibilidade é confirmada durante a cotação.':'Indique rollo o spider y las demás condiciones del pedido. La disponibilidad se confirma durante la cotización.',

  'Consulta de tolerância':'Consulta de tolerancia',
  'A tolerância é definida sob consulta conforme aço, bitola e requisito dimensional.':'La tolerancia se confirma bajo consulta según el acero, diámetro y requisito dimensional.',
  'Informe faixa de aço, bitola nominal, acabamento, comprimento e requisito dimensional para a equipe validar a condição de fornecimento.':'Informe el rango de acero, diámetro nominal, acabado, longitud y requisito dimensional para que el equipo valide la condición de suministro.',
  'Organize aço, bitola, acabamento, comprimento e processo antes da cotação.':'Organice acero, diámetro, acabado, longitud y proceso antes de solicitar una cotización.',
  'Acabamento e comprimento':'Acabado y longitud',
  'Indique se a necessidade é trefilada ou polida e informe o comprimento solicitado.':'Indique si se requiere acabado trefilado o pulido e informe la longitud solicitada.',
  'Processo da peça':'Proceso de fabricación de la pieza',
  'Usinagem, conformação, soldagem ou outra etapa de fabricação ajuda a equipe a validar a condição adequada.':'El mecanizado, conformado, soldadura u otra etapa de fabricación ayuda al equipo a validar la condición adecuada.',

  'Aplicações publicadas':'Aplicaciones publicadas',
  'O que validar no projeto':'Qué validar en el proyecto',
  'Aço / teor de carbono':'Acero / contenido de carbono',
  'Confirme a classificação do material prevista no desenho ou especificação.':'Confirme la clasificación del material prevista en el plano o la especificación.',
  'Dimensão e tolerância':'Dimensiones y tolerancia',
  'Bitola, comprimento e tolerância devem acompanhar a necessidade da peça.':'El diámetro, la longitud y la tolerancia deben corresponder a los requisitos de la pieza.',
  'Processo':'Proceso',
  'Usinagem, conformação, soldagem, tratamento ou acabamento podem alterar a seleção final.':'El mecanizado, conformado, soldadura, tratamiento o acabado pueden modificar la selección final.',

  'Descreva a instalação, medida, camada, conector ou requisito do projeto. O Theo organiza os pontos que precisam ser avaliados antes da cotação.':'Describa la instalación, medidas, capa, conector o requisito del proyecto. Theo organiza los puntos que deben evaluarse antes de solicitar una cotización.',
  'Consultar o Theo':'Consultar a Theo',
  'Organize a necessidade técnica sem navegar por uma lista de aplicações soltas.':'Organice los requisitos técnicos sin tener que recorrer una lista genérica de aplicaciones.',
  'Dimensão':'Dimensión',
  'Bitola e comprimento compatíveis com o desenho ou memorial.':'Use un diámetro y una longitud compatibles con el plano o la especificación del proyecto.',
  'Requisito técnico':'Requisito técnico',
  'Norma, camada, material e condição de instalação exigidos.':'Confirme la norma, capa, material y condiciones de instalación requeridos.',
  'Conexão':'Conexión',
  'Modelo de conector e cabo previstos no sistema de aterramento.':'Confirme el modelo de conector y el cable previstos para el sistema de puesta a tierra.',

  'Displays aramados':'Exhibidores de alambre','Utilidades domésticas':'Artículos domésticos','Linha branca':'Electrodomésticos','Racks':'Racks','Telas':'Mallas metálicas','Molas':'Resortes','Cabos de aço':'Cables de acero','Componentes automotivos':'Componentes automotrices','Pregos':'Clavos',
  'Fixadores':'Elementos de fijación','Autopeças':'Autopartes','Cesto metálico':'Cesta metálica','Rack metálico':'Rack metálico','Molas helicoidais':'Resortes helicoidales','Amortecedores':'Amortiguadores','Eixos':'Ejes','Engrenagens':'Engranajes','Bielas':'Bielas','Cubos de roda':'Cubos de rueda','Trilhos':'Rieles','Parafusos':'Tornillos','Porcas':'Tuercas','Pinos':'Pasadores','Hastes de amortecedor':'Vástagos de amortiguador','Sapatas de trator':'Zapatas de tractor','Peças forjadas':'Piezas forjadas','Ferramentas manuais':'Herramientas manuales','Setor automotivo':'Sector automotriz','Pistões':'Pistones','Bujões':'Tapones','Válvulas':'Válvulas','Sistemas hidráulicos':'Sistemas hidráulicos','Sistemas pneumáticos':'Sistemas neumáticos',
  'Sistemas de aterramento':'Sistemas de puesta a tierra','SPDA':'Sistemas de protección contra rayos (SPDA)','Geração e transmissão de energia':'Generación y transmisión de energía','Distribuição de energia':'Distribución de energía','Redes de telecomunicações':'Redes de telecomunicaciones','Aterramento de equipamentos':'Puesta a tierra de equipos','Energias renováveis':'Energías renovables','Construção industrial':'Construcción industrial','Ambientes residenciais':'Entornos residenciales','Instalações prediais':'Instalaciones en edificios','Instalações industriais':'Instalaciones industriales','Telecomunicações':'Telecomunicaciones'
 }
}[lang];

function normalized(el){return (el?.textContent||'').replace(/\s+/g,' ').trim();}
function translateElement(el){
 if(!el||el.closest('[data-no-i18n]'))return;
 const key=normalized(el);
 const value=T[key];
 if(value&&key!==value)el.textContent=value;
}
function translateApplication(root){
 const section=root?.querySelector('#aplicacoes');
 if(!section)return;
 section.querySelectorAll('h2,h3,strong,p,small,li,button,label,span').forEach(translateElement);
}
function run(){
 translateApplication(document.getElementById('arame-trefilado'));
 translateApplication(document.getElementById('barra-trefilada'));
 translateApplication(document.getElementById('haste-aterramento'));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
let queued=false;
new MutationObserver(()=>{
 if(queued)return;
 queued=true;
 requestAnimationFrame(()=>{queued=false;run();});
}).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();
