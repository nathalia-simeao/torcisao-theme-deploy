(function(){
'use strict';
const requested=String(new URLSearchParams(location.search).get('lang')||'').toLowerCase();
const pathMatch=location.pathname.match(/^\/(en|es)(?:\/|$)/i);
const lang=['en','es'].includes(requested)?requested:(pathMatch?pathMatch[1].toLowerCase():(window.TorcisaoI18n?.lang||'pt'));
if(!['en','es'].includes(lang))return;

const root=document.getElementById('haste-aterramento');
if(!root)return;

const maps={
  en:{
    'Soluções para aterramento':'Grounding solutions',
    'Haste de Aterramento':'Grounding Rod',
    'Compare opções de baixa e alta camada, consulte medidas e conectores e avance com a equipe Torcisão na validação da sua especificação.':'Compare low- and high-coating options, review dimensions and connectors, and move forward with the Torcisão team to validate your specification.',
    'Opções de Haste de Aterramento':'Grounding Rod options',
    'Baixa Camada':'Low Coating',
    'Alta Camada':'High Coating',
    'Conectores':'Connectors',
    'Haste de aterramento':'Grounding rod',
    'Modelo':'Model',
    'Olhal Simples':'Simple Eyelet',
    'Olhal Reforçado':'Reinforced Eyelet',
    'Grampo U Simples':'Simple U-Clamp',
    'Grampo U Reforçado':'Reinforced U-Clamp',
    'Solicitar cotação':'Request a quote',
    'Não sabe qual avaliar? Use o assistente':'Not sure which option to evaluate? Use the assistant',
    'Diminuir zoom':'Zoom out',
    'Aumentar zoom':'Zoom in',
    'Abrir imagem ampliada':'Open enlarged image',
    'Passe o cursor para ampliar os detalhes':'Hover to enlarge details',
    'Especificações':'Specifications',
    'Medidas e características da opção selecionada':'Dimensions and characteristics of the selected option',
    'Consulte os dados disponíveis para a configuração escolhida. Tolerâncias, combinações específicas e requisitos do projeto devem ser confirmados com nossa equipe.':'Review the available data for the selected configuration. Tolerances, specific combinations, and project requirements must be confirmed with our team.',
    'Medidas disponíveis':'Available dimensions',
    'Referências da opção selecionada':'References for the selected option',
    'Aplicações':'Applications',
    'Organize os requisitos antes da cotação':'Organize the requirements before requesting a quote',
    'Use o assistente para estruturar camada, medida, conector e demais pontos técnicos que precisam ser validados no seu projeto.':'Use the assistant to organize coating, dimensions, connector, and other technical points that need to be validated for your project.',
    'Aplicações publicadas':'Published applications',
    'O que validar no projeto':'What to validate for the project',
    'Dimensão':'Dimensions',
    'Bitola e comprimento compatíveis com o desenho ou memorial.':'Diameter and length compatible with the drawing or project specification.',
    'Requisito técnico':'Technical requirement',
    'Norma, camada, material e condição de instalação exigidos.':'Required standard, coating, material, and installation conditions.',
    'Conexão':'Connection',
    'Modelo de conector e cabo previstos no sistema de aterramento.':'Connector model and cable specified for the grounding system.',
    'Qualidade Torcisão':'Torcisão Quality',
    'Consulte o certificado ISO e, quando necessário, valide requisitos específicos com nossa equipe.':'Review the ISO certificate and, when necessary, validate specific requirements with our team.',
    'Ver certificado ISO':'View ISO certificate',
    'Atendimento comercial':'Sales support',
    'Pronto para avançar com sua cotação?':'Ready to move forward with your quote?',
    'Envie sua necessidade ao comercial. Nossa equipe dá sequência à validação da especificação e ao atendimento da cotação.':'Send your requirements to our sales team. We will continue with specification validation and the quotation process.',
    'Equipe Torcisão':'Torcisão Team',
    'Comercial':'Sales',
    '(11) 2334-9989 · atendimento direto':'(11) 2334-9989 · direct support',
    'Falar com o comercial':'Contact sales',
    'Fechar':'Close',
    'Assistente de aplicação':'Application assistant',
    'Use a escolha rápida ou descreva a aplicação para eu organizar as opções Torcisão.':'Use the quick selection or describe the application so I can organize the Torcisão options.',
    'Prefere escolher manualmente?':'Prefer to choose manually?',
    'Selecione uma opção para ver os principais dados antes de falar com a equipe.':'Select an option to review the main data before speaking with our team.',
    'Haste Baixa Camada':'Low-Coating Grounding Rod',
    'Haste Alta Camada':'High-Coating Grounding Rod',
    'Conectores para haste':'Grounding rod connectors',
    'Ver opção':'View option',
    'ou descreva a aplicação':'or describe the application',
    'Converse com o Theo':'Talk to Theo',
    'Respostas baseadas nas informações Torcisão':'Answers based on Torcisão information',
    'Olá! Descreva a peça, aplicação, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo as opções Torcisão sem inventar especificações.':'Hello! Describe the part, application, diameter, quantity, or requirement you need to evaluate. I will organize the Torcisão options without inventing specifications.',
    'Ex.: preciso de haste para SPDA em...':'Example: I need a grounding rod for a lightning protection system...',
    'Mensagem para o Theo':'Message to Theo',
    'Enviar':'Send',
    'Fechar cotação':'Close quote',
    'COTAÇÃO':'QUOTE',
    'Solicite seu orçamento':'Request a quote',
    'Preparando formulário…':'Preparing form…',
    'Consultando as informações Torcisão…':'Checking Torcisão information…',
    'Não consegui concluir essa consulta agora. Fale com um especialista da Torcisão.':'I could not complete this query right now. Please contact a Torcisão specialist.',
    'Baixa Camada · 20 µm':'Low Coating · 20 µm',
    'Núcleo sólido de aço-carbono SAE 1010/1020 com revestimento de cobre de 20 µm. Consulte as combinações disponíveis de diâmetro e comprimento para a sua especificação.':'Solid SAE 1010/1020 carbon steel core with a 20 µm copper coating. Review the available diameter and length combinations for your specification.',
    'Alta Camada · 254 µm':'High Coating · 254 µm',
    'Núcleo de aço-carbono SAE 1010/1020 com revestimento eletrolítico de cobre, pureza ≥ 99,9% e camada de 254 µm, conforme ABNT NBR 13571.':'SAE 1010/1020 carbon steel core with electrolytic copper coating, purity ≥ 99.9%, and 254 µm coating thickness, according to ABNT NBR 13571.',
    'Conector Torcisão para união entre haste e cabo em sistemas de aterramento.':'Torcisão connector for joining the grounding rod and cable in grounding systems.',
    'Modelo reforçado para conexão entre haste e cabo em sistemas de aterramento.':'Reinforced model for connecting the grounding rod and cable in grounding systems.',
    'Conector em formato U para união entre haste e cabo.':'U-shaped connector for joining the grounding rod and cable.',
    'Modelo reforçado em formato U para conexão entre haste e cabo.':'Reinforced U-shaped model for connecting the grounding rod and cable.',
    'Camada':'Coating',
    'Material':'Material',
    'Perfil':'Profile',
    'Acabamento':'Finish',
    'Cobre':'Copper',
    'Pureza':'Purity',
    'Norma':'Standard',
    'Revestimento':'Coating',
    'Núcleo':'Core',
    'Pureza do cobre':'Copper purity',
    'Tolerância':'Tolerance',
    'Aplicação':'Application',
    'Referência':'Reference',
    'Modelos':'Models',
    'Materiais':'Materials',
    'Redondo':'Round',
    'Trefilado / cobre':'Drawn / copper',
    'Cobre · 20 µm':'Copper · 20 µm',
    'Cobre eletrolítico · 254 µm':'Electrolytic copper · 254 µm',
    'Sob consulta':'Upon request',
    'Haste + cabo':'Rod + cable',
    'Latão ou bronze':'Brass or bronze',
    'Olhal simples / reforçado · Grampo U simples / reforçado':'Simple / reinforced eyelet · Simple / reinforced U-clamp',
    'Conexão entre haste e cabo':'Connection between rod and cable',
    'Medida / referência':'Dimension / reference',
    'Disponibilidade / condição':'Availability / condition',
    'Tolerâncias, combinações e condições específicas devem ser confirmadas com a equipe Torcisão.':'Tolerances, combinations, and specific conditions must be confirmed with the Torcisão team.',
    'Produto Torcisão':'Torcisão product',
    'Conector para haste':'Grounding rod connector',
    'Sistemas de aterramento':'Grounding systems',
    'SPDA':'Lightning protection systems (SPDA)',
    'Geração e transmissão de energia':'Power generation and transmission',
    'Distribuição de energia':'Power distribution',
    'Redes de telecomunicações':'Telecommunications networks',
    'Aterramento de equipamentos':'Equipment grounding',
    'Energias renováveis':'Renewable energy',
    'Construção industrial':'Industrial construction',
    'Ambientes residenciais':'Residential environments',
    'Instalações prediais':'Building installations',
    'Instalações industriais':'Industrial installations',
    'Telecomunicações':'Telecommunications'
  },
  es:{
    'Soluções para aterramento':'Soluciones para puesta a tierra',
    'Haste de Aterramento':'Varilla de Puesta a Tierra',
    'Compare opções de baixa e alta camada, consulte medidas e conectores e avance com a equipe Torcisão na validação da sua especificação.':'Compare opciones de capa baja y alta, consulte medidas y conectores y avance con el equipo de Torcisão en la validación de su especificación.',
    'Opções de Haste de Aterramento':'Opciones de Varilla de Puesta a Tierra',
    'Baixa Camada':'Capa Baja',
    'Alta Camada':'Capa Alta',
    'Conectores':'Conectores',
    'Haste de aterramento':'Varilla de puesta a tierra',
    'Modelo':'Modelo',
    'Olhal Simples':'Ojal Simple',
    'Olhal Reforçado':'Ojal Reforzado',
    'Grampo U Simples':'Abrazadera U Simple',
    'Grampo U Reforçado':'Abrazadera U Reforzada',
    'Solicitar cotação':'Solicitar cotización',
    'Não sabe qual avaliar? Use o assistente':'¿No sabe qué opción evaluar? Use el asistente',
    'Diminuir zoom':'Reducir zoom',
    'Aumentar zoom':'Aumentar zoom',
    'Abrir imagem ampliada':'Abrir imagen ampliada',
    'Passe o cursor para ampliar os detalhes':'Pase el cursor para ampliar los detalles',
    'Especificações':'Especificaciones',
    'Medidas e características da opção selecionada':'Medidas y características de la opción seleccionada',
    'Consulte os dados disponíveis para a configuração escolhida. Tolerâncias, combinações específicas e requisitos do projeto devem ser confirmados com nossa equipe.':'Consulte los datos disponibles para la configuración elegida. Las tolerancias, combinaciones específicas y requisitos del proyecto deben confirmarse con nuestro equipo.',
    'Medidas disponíveis':'Medidas disponibles',
    'Referências da opção selecionada':'Referencias de la opción seleccionada',
    'Aplicações':'Aplicaciones',
    'Organize os requisitos antes da cotação':'Organice los requisitos antes de solicitar una cotización',
    'Use o assistente para estruturar camada, medida, conector e demais pontos técnicos que precisam ser validados no seu projeto.':'Use el asistente para organizar capa, medidas, conector y demás puntos técnicos que deben validarse en su proyecto.',
    'Aplicações publicadas':'Aplicaciones publicadas',
    'O que validar no projeto':'Qué validar en el proyecto',
    'Dimensão':'Dimensión',
    'Bitola e comprimento compatíveis com o desenho ou memorial.':'Diámetro y longitud compatibles con el plano o la memoria técnica.',
    'Requisito técnico':'Requisito técnico',
    'Norma, camada, material e condição de instalação exigidos.':'Norma, capa, material y condición de instalación requeridos.',
    'Conexão':'Conexión',
    'Modelo de conector e cabo previstos no sistema de aterramento.':'Modelo de conector y cable previstos en el sistema de puesta a tierra.',
    'Qualidade Torcisão':'Calidad Torcisão',
    'Consulte o certificado ISO e, quando necessário, valide requisitos específicos com nossa equipe.':'Consulte el certificado ISO y, cuando sea necesario, valide requisitos específicos con nuestro equipo.',
    'Ver certificado ISO':'Ver certificado ISO',
    'Atendimento comercial':'Atención comercial',
    'Pronto para avançar com sua cotação?':'¿Listo para avanzar con su cotización?',
    'Envie sua necessidade ao comercial. Nossa equipe dá sequência à validação da especificação e ao atendimento da cotação.':'Envíe sus requisitos al equipo comercial. Nuestro equipo continuará con la validación de la especificación y el proceso de cotización.',
    'Equipe Torcisão':'Equipo Torcisão',
    'Comercial':'Comercial',
    '(11) 2334-9989 · atendimento direto':'(11) 2334-9989 · atención directa',
    'Falar com o comercial':'Hablar con ventas',
    'Fechar':'Cerrar',
    'Assistente de aplicação':'Asistente de aplicación',
    'Use a escolha rápida ou descreva a aplicação para eu organizar as opções Torcisão.':'Use la selección rápida o describa la aplicación para que pueda organizar las opciones Torcisão.',
    'Prefere escolher manualmente?':'¿Prefiere elegir manualmente?',
    'Selecione uma opção para ver os principais dados antes de falar com a equipe.':'Seleccione una opción para consultar los datos principales antes de hablar con nuestro equipo.',
    'Haste Baixa Camada':'Varilla de Capa Baja',
    'Haste Alta Camada':'Varilla de Capa Alta',
    'Conectores para haste':'Conectores para varilla',
    'Ver opção':'Ver opción',
    'ou descreva a aplicação':'o describa la aplicación',
    'Converse com o Theo':'Hable con Theo',
    'Respostas baseadas nas informações Torcisão':'Respuestas basadas en la información de Torcisão',
    'Olá! Descreva a peça, aplicação, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo as opções Torcisão sem inventar especificações.':'¡Hola! Describa la pieza, aplicación, diámetro, cantidad o requisito que necesita evaluar. Organizaré las opciones Torcisão sin inventar especificaciones.',
    'Ex.: preciso de haste para SPDA em...':'Ej.: necesito una varilla para un sistema de protección contra rayos...',
    'Mensagem para o Theo':'Mensaje para Theo',
    'Enviar':'Enviar',
    'Fechar cotação':'Cerrar cotización',
    'COTAÇÃO':'COTIZACIÓN',
    'Solicite seu orçamento':'Solicite una cotización',
    'Preparando formulário…':'Preparando formulario…',
    'Consultando as informações Torcisão…':'Consultando la información de Torcisão…',
    'Não consegui concluir essa consulta agora. Fale com um especialista da Torcisão.':'No pude completar esta consulta ahora. Hable con un especialista de Torcisão.',
    'Baixa Camada · 20 µm':'Capa Baja · 20 µm',
    'Núcleo sólido de aço-carbono SAE 1010/1020 com revestimento de cobre de 20 µm. Consulte as combinações disponíveis de diâmetro e comprimento para a sua especificação.':'Núcleo sólido de acero al carbono SAE 1010/1020 con recubrimiento de cobre de 20 µm. Consulte las combinaciones disponibles de diámetro y longitud para su especificación.',
    'Alta Camada · 254 µm':'Capa Alta · 254 µm',
    'Núcleo de aço-carbono SAE 1010/1020 com revestimento eletrolítico de cobre, pureza ≥ 99,9% e camada de 254 µm, conforme ABNT NBR 13571.':'Núcleo de acero al carbono SAE 1010/1020 con recubrimiento electrolítico de cobre, pureza ≥ 99,9% y capa de 254 µm, conforme a ABNT NBR 13571.',
    'Conector Torcisão para união entre haste e cabo em sistemas de aterramento.':'Conector Torcisão para unión entre varilla y cable en sistemas de puesta a tierra.',
    'Modelo reforçado para conexão entre haste e cabo em sistemas de aterramento.':'Modelo reforzado para conexión entre varilla y cable en sistemas de puesta a tierra.',
    'Conector em formato U para união entre haste e cabo.':'Conector en forma de U para unión entre varilla y cable.',
    'Modelo reforçado em formato U para conexão entre haste e cabo.':'Modelo reforzado en forma de U para conexión entre varilla y cable.',
    'Camada':'Capa',
    'Material':'Material',
    'Perfil':'Perfil',
    'Acabamento':'Acabado',
    'Cobre':'Cobre',
    'Pureza':'Pureza',
    'Norma':'Norma',
    'Revestimento':'Recubrimiento',
    'Núcleo':'Núcleo',
    'Pureza do cobre':'Pureza del cobre',
    'Tolerância':'Tolerancia',
    'Aplicação':'Aplicación',
    'Referência':'Referencia',
    'Modelos':'Modelos',
    'Materiais':'Materiales',
    'Redondo':'Redondo',
    'Trefilado / cobre':'Trefilado / cobre',
    'Cobre · 20 µm':'Cobre · 20 µm',
    'Cobre eletrolítico · 254 µm':'Cobre electrolítico · 254 µm',
    'Sob consulta':'Bajo consulta',
    'Haste + cabo':'Varilla + cable',
    'Latão ou bronze':'Latón o bronce',
    'Olhal simples / reforçado · Grampo U simples / reforçado':'Ojal simple / reforzado · Abrazadera U simple / reforzada',
    'Conexão entre haste e cabo':'Conexión entre varilla y cable',
    'Medida / referência':'Medida / referencia',
    'Disponibilidade / condição':'Disponibilidad / condición',
    'Tolerâncias, combinações e condições específicas devem ser confirmadas com a equipe Torcisão.':'Las tolerancias, combinaciones y condiciones específicas deben confirmarse con el equipo de Torcisão.',
    'Produto Torcisão':'Producto Torcisão',
    'Conector para haste':'Conector para varilla',
    'Sistemas de aterramento':'Sistemas de puesta a tierra',
    'SPDA':'Sistemas de protección contra rayos (SPDA)',
    'Geração e transmissão de energia':'Generación y transmisión de energía',
    'Distribuição de energia':'Distribución de energía',
    'Redes de telecomunicações':'Redes de telecomunicaciones',
    'Aterramento de equipamentos':'Puesta a tierra de equipos',
    'Energias renováveis':'Energías renovables',
    'Construção industrial':'Construcción industrial',
    'Ambientes residenciais':'Entornos residenciales',
    'Instalações prediais':'Instalaciones de edificios',
    'Instalações industriais':'Instalaciones industriales',
    'Telecomunicações':'Telecomunicaciones'
  }
};
const map=maps[lang];

function translateString(value){
  const source=String(value||'');
  if(!source)return source;
  const m=source.match(/^(\s*)(.*?)(\s*)$/s);
  if(!m)return source;
  const translated=Object.prototype.hasOwnProperty.call(map,m[2])?map[m[2]]:m[2];
  return m[1]+translated+m[3];
}

function translateNode(node){
  if(!node)return;
  if(node.nodeType===Node.TEXT_NODE){
    const next=translateString(node.nodeValue);
    if(next!==node.nodeValue)node.nodeValue=next;
    return;
  }
  if(node.nodeType!==Node.ELEMENT_NODE)return;
  const tag=node.tagName;
  if(tag==='SCRIPT'||tag==='STYLE'||tag==='NOSCRIPT')return;
  ['aria-label','title','placeholder'].forEach(attr=>{
    if(!node.hasAttribute(attr))return;
    const old=node.getAttribute(attr),next=translateString(old);
    if(next!==old)node.setAttribute(attr,next);
  });
  Array.from(node.childNodes).forEach(translateNode);
}

function run(){
  translateNode(root);
  ['hfLightbox','hfAssistant','hfQuoteTab','hfQuoteDrawer'].forEach(id=>translateNode(document.getElementById(id)));
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
let queued=false;
new MutationObserver(mutations=>{
  if(queued)return;
  const relevant=mutations.some(m=>{
    const t=m.target?.nodeType===Node.ELEMENT_NODE?m.target:m.target?.parentElement;
    return t&&(root.contains(t)||['hfLightbox','hfAssistant','hfQuoteTab','hfQuoteDrawer'].some(id=>document.getElementById(id)?.contains(t)));
  });
  if(!relevant)return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;run();});
}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']});
})();
