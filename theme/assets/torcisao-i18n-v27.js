(function(){
'use strict';

const cfg=window.TORCISAO_I18N_CONFIG||{};
const requested=String(new URLSearchParams(location.search).get('lang')||'').toLowerCase();
const pathMatch=location.pathname.match(/^\/(en|es)(?:\/|$)/i);
const lang=['pt','en','es'].includes(requested)?requested:(pathMatch?pathMatch[1].toLowerCase():'pt');
const locale=({pt:'pt-BR',en:'en-US',es:'es-ES'}[lang]||'pt-BR');

/* Complementos para textos que nascem depois do carregamento via JS. */
const DYNAMIC={
  en:{
    'Arame':'Wire','Barra':'Bar','Haste':'Grounding Rod','Linha':'Product line','Visualização':'View','Rolo':'Coil','Tipo de haste':'Rod type','Bitola':'Diameter','Aço':'Steel','Cobre':'Copper','Diâmetros':'Diameters','Comprimentos':'Lengths','Pacotes com 10 unidades':'Packs of 10 units','Pureza ≥ 99,9%':'Purity ≥ 99.9%','Haste + cabo':'Rod + cable','Produto Torcisão':'Torcisão product','Selecione a linha Torcisão':'Select the Torcisão product line','Opções da linha selecionada':'Selected product line options','Passe o cursor para ampliar':'Move the cursor to magnify','Redefinir':'Reset','OPÇÕES':'OPTIONS',
    'Arame Trefilado · Baixo Carbono':'Drawn Wire · Low Carbon','Arame Trefilado · Médio Carbono':'Drawn Wire · Medium Carbon','Arame Trefilado · Alto Carbono':'Drawn Wire · High Carbon','Barra Trefilada · Baixo Carbono':'Drawn Bar · Low Carbon','Barra Trefilada · Médio Carbono':'Drawn Bar · Medium Carbon','Barra Trefilada · Alto Carbono':'Drawn Bar · High Carbon','Barra Trefilada · Aço Ressulfurado':'Drawn Bar · Resulfurized Steel','Haste de Aterramento · Baixa Camada':'Grounding Rod · Low Coating','Haste de Aterramento · Alta Camada':'Grounding Rod · High Coating',
    'Baixo Teor de Carbono':'Low Carbon','Médio Teor de Carbono':'Medium Carbon','Alto Teor de Carbono':'High Carbon','Aço ressulfurado':'Resulfurized steel',
    'Arame trefilado para aplicações industriais em que uniformidade dimensional, bitola e condição de fornecimento precisam ser avaliadas.':'Drawn wire for industrial applications where dimensional uniformity, diameter, and supply condition need to be assessed.','Opção para aplicações que exigem validação de propriedades mecânicas, bitola e processo.':'Option for applications requiring validation of mechanical properties, diameter, and process.','Opção para aplicações que pedem validação de resistência, plasticidade, dureza e processo.':'Option for applications requiring validation of strength, ductility, hardness, and process.',
    'Barra de perfil redondo para aplicações que exigem controle dimensional e acabamento superficial.':'Round-profile bar for applications requiring dimensional control and surface finish.','Barra trefilada para aplicações mecânicas em que aço, bitola, propriedades e processo precisam ser validados.':'Drawn bar for mechanical applications where steel grade, diameter, properties, and process must be validated.','Barra trefilada para aplicações que exigem validação de resistência mecânica, bitola e processo.':'Drawn bar for applications requiring validation of mechanical strength, diameter, and process.','Opção em aço de corte livre para aplicações em que usinabilidade, precisão dimensional e acabamento são critérios relevantes.':'Free-cutting steel option for applications where machinability, dimensional precision, and finish are relevant criteria.',
    'Haste com núcleo sólido de aço-carbono SAE 1010/1020 e revestimento de cobre de 20 µm.':'Grounding rod with a solid SAE 1010/1020 carbon-steel core and 20 µm copper coating.','Haste com núcleo SAE 1010/1020 e revestimento eletrolítico de cobre de 254 µm.':'Grounding rod with an SAE 1010/1020 core and 254 µm electrolytic copper coating.','Conector para união entre haste e cabo em sistemas de aterramento.':'Connector for joining the grounding rod to the cable in grounding systems.','Modelo reforçado para conexão entre haste e cabo em sistemas de aterramento.':'Reinforced model for connecting the grounding rod to the cable in grounding systems.','Conector em formato U para união entre haste e cabo.':'U-shaped connector for joining the grounding rod to the cable.','Modelo reforçado em formato U para conexão entre haste e cabo.':'Reinforced U-shaped model for connecting the grounding rod to the cable.',
    'Arame trefilado de baixo teor de carbono, em perfil redondo e fornecido em rolos ou spiders. Consulte bitola, tolerância e condição de fornecimento para o seu pedido.':'Low-carbon drawn wire with a round profile, supplied in coils or spiders. Check diameter, tolerance, and supply condition for your order.','Arame trefilado de médio teor de carbono, em perfil redondo e fornecido em rolos ou spiders. A seleção deve considerar aço, bitola, requisito mecânico e processo da peça.':'Medium-carbon drawn wire with a round profile, supplied in coils or spiders. Selection should consider steel grade, diameter, mechanical requirements, and the component process.','Arame trefilado de alto teor de carbono, em perfil redondo e fornecido em rolos ou spiders. A especificação deve ser validada conforme aço, bitola, requisito mecânico e processo da peça.':'High-carbon drawn wire with a round profile, supplied in coils or spiders. The specification must be validated according to steel grade, diameter, mechanical requirements, and the component process.',
    'Tolerância e condições específicas de fornecimento devem ser confirmadas conforme a especificação do pedido.':'Tolerance and specific supply conditions must be confirmed according to the order specification.','Displays aramados':'Wire displays','Utilidades domésticas':'Household items','Linha branca':'Major appliances','Racks':'Racks','Telas':'Mesh','Molas':'Springs','Cabos de aço':'Steel cables','Componentes automotivos':'Automotive components','Pregos':'Nails',
    'Barra trefilada com alta precisão dimensional, superfície lisa e acabamento superior obtidos por processo a frio.':'Drawn bar with high dimensional precision, smooth surface, and superior finish obtained through cold processing.','Barra trefilada de médio carbono apresentada pela Torcisão para aplicações mecânicas que pedem equilíbrio entre resistência e processamento.':'Torcisão medium-carbon drawn bar for mechanical applications requiring a balance between strength and processing.','Barra trefilada de alto carbono da linha Torcisão para aplicações mecânicas que exigem validação de aço, resistência, tolerância e processo.':'Torcisão high-carbon drawn bar for mechanical applications requiring validation of steel grade, strength, tolerance, and process.','Barra trefilada para aplicações em que usinabilidade, precisão dimensional e acabamento são critérios importantes.':'Drawn bar for applications where machinability, dimensional precision, and finish are important criteria.','Conforme especificação / consulta':'According to specification / upon request','Conforme especificação':'According to specification','A classificação do aço deve ser confirmada na especificação comercial':'The steel classification must be confirmed in the commercial specification','Usinagem e componentes seriados':'Machining and serial components',
    'Fixadores':'Fasteners','Autopeças':'Auto Parts','Cesto metálico':'Metal basket','Rack metálico':'Metal rack','Molas helicoidais':'Helical springs','Amortecedores':'Shock absorbers','Eixos':'Shafts','Engrenagens':'Gears','Bielas':'Connecting rods','Cubos de roda':'Wheel hubs','Trilhos':'Rails','Parafusos':'Bolts','Porcas':'Nuts','Pinos':'Pins','Hastes de amortecedor':'Shock absorber rods','Sapatas de trator':'Tractor shoes','Peças forjadas':'Forged parts','Ferramentas manuais':'Hand tools','Setor automotivo':'Automotive sector','Pistões':'Pistons','Bujões':'Plugs','Válvulas':'Valves','Sistemas hidráulicos':'Hydraulic systems','Sistemas pneumáticos':'Pneumatic systems',
    'Sistemas de aterramento':'Grounding systems','Geração e transmissão de energia':'Power generation and transmission','Distribuição de energia':'Power distribution','Redes de telecomunicações':'Telecommunications networks','Aterramento de equipamentos':'Equipment grounding','Energias renováveis':'Renewable energy','Construção industrial':'Industrial construction','Ambientes residenciais':'Residential environments','Instalações prediais':'Building installations','Instalações industriais':'Industrial installations','Conexão entre haste e cabo':'Grounding rod-to-cable connection','Medida / referência':'Size / reference','Disponibilidade / condição':'Availability / condition','Tolerâncias, combinações e condições específicas devem ser confirmadas com a equipe Torcisão.':'Tolerances, combinations, and specific conditions must be confirmed with the Torcisão team.','Trefilado / cobre':'Drawn / copper','Cobre · 20 µm':'Copper · 20 µm','Aço-carbono SAE 1010/1020':'SAE 1010/1020 carbon steel','Cobre eletrolítico · 254 µm':'Electrolytic copper · 254 µm','Olhal simples / reforçado · Grampo U simples / reforçado':'Simple / reinforced eyelet · Simple / reinforced U-clamp','Simples · Reforçado':'Simple · Reinforced','Olhal':'Eyelet','Grampo U':'U-Clamp',
    'Preparando formulário…':'Preparing form…','Fechar cotação':'Close quote','Fechar':'Close','Solicitar cotação':'Request a quote',
    'Compare opções de baixo, médio e alto teor de carbono, consulte bitolas e forma de fornecimento e avance com a equipe Torcisão na validação do seu pedido.':'Compare low-, medium-, and high-carbon options, review diameters and supply formats, and proceed with the Torcisão team to validate your order.','Soluções em barras trefiladas para aplicações que exigem precisão dimensional, acabamento e desempenho mecânico.':'Drawn bar solutions for applications requiring dimensional precision, finish, and mechanical performance.','Compare opções de baixa e alta camada, consulte medidas e conectores e avance com a equipe Torcisão na validação da sua especificação.':'Compare low- and high-coating options, review sizes and connectors, and proceed with the Torcisão team to validate your specification.',
    'Consulte faixa de aço, bitola, perfil, acabamento e forma de fornecimento. A tolerância deve ser confirmada conforme a especificação do pedido.':'Review steel grade range, diameter, profile, finish, and supply format. Tolerance must be confirmed according to the order specification.','As referências abaixo reproduzem as informações publicadas pela Torcisão. Tolerâncias, composição, tratamento e demais requisitos devem ser confirmados conforme o desenho ou memorial do projeto.':'The references below reproduce information published by Torcisão. Tolerances, composition, treatment, and other requirements must be confirmed against the drawing or project specification.','Consulte os dados disponíveis para a configuração escolhida. Tolerâncias, combinações específicas e requisitos do projeto devem ser confirmados com nossa equipe.':'Review the available data for the selected configuration. Tolerances, specific combinations, and project requirements must be confirmed with our team.','A aplicação indica um ponto de partida. A seleção do aço depende dos requisitos mecânicos, dimensionais e do processo de fabricação.':'The application is a starting point. Steel selection depends on mechanical and dimensional requirements and the manufacturing process.','Informe aplicação, faixa de aço, bitola, propriedades requeridas e forma de fornecimento para direcionar a consulta à opção adequada.':'Provide the application, steel grade range, diameter, required properties, and supply format to guide the inquiry toward the appropriate option.','Use o assistente para estruturar camada, medida, conector e demais pontos técnicos que precisam ser validados no seu projeto.':'Use the assistant to organize coating, size, connector, and other technical points that need validation in your project.'
  },
  es:{
    'Arame':'Alambre','Barra':'Barra','Haste':'Varilla','Linha':'Línea','Visualização':'Visualización','Rolo':'Rollo','Tipo de haste':'Tipo de varilla','Bitola':'Diámetro','Aço':'Acero','Cobre':'Cobre','Diâmetros':'Diámetros','Comprimentos':'Longitudes','Pacotes com 10 unidades':'Paquetes de 10 unidades','Pureza ≥ 99,9%':'Pureza ≥ 99,9%','Haste + cabo':'Varilla + cable','Produto Torcisão':'Producto Torcisão','Selecione a linha Torcisão':'Selecciona la línea Torcisão','Opções da linha selecionada':'Opciones de la línea seleccionada','Passe o cursor para ampliar':'Pasa el cursor para ampliar','Redefinir':'Restablecer','OPÇÕES':'OPCIONES',
    'Arame Trefilado · Baixo Carbono':'Alambre Trefilado · Bajo Carbono','Arame Trefilado · Médio Carbono':'Alambre Trefilado · Medio Carbono','Arame Trefilado · Alto Carbono':'Alambre Trefilado · Alto Carbono','Barra Trefilada · Baixo Carbono':'Barra Trefilada · Bajo Carbono','Barra Trefilada · Médio Carbono':'Barra Trefilada · Medio Carbono','Barra Trefilada · Alto Carbono':'Barra Trefilada · Alto Carbono','Barra Trefilada · Aço Ressulfurado':'Barra Trefilada · Acero Resulfurado','Haste de Aterramento · Baixa Camada':'Varilla de Puesta a Tierra · Capa Baja','Haste de Aterramento · Alta Camada':'Varilla de Puesta a Tierra · Capa Alta',
    'Baixo Teor de Carbono':'Bajo Carbono','Médio Teor de Carbono':'Medio Carbono','Alto Teor de Carbono':'Alto Carbono','Aço ressulfurado':'Acero resulfurado',
    'Arame trefilado para aplicações industriais em que uniformidade dimensional, bitola e condição de fornecimento precisam ser avaliadas.':'Alambre trefilado para aplicaciones industriales donde deben evaluarse la uniformidad dimensional, el diámetro y la condición de suministro.','Opção para aplicações que exigem validação de propriedades mecânicas, bitola e processo.':'Opción para aplicaciones que requieren validar propiedades mecánicas, diámetro y proceso.','Opção para aplicações que pedem validação de resistência, plasticidade, dureza e processo.':'Opción para aplicaciones que requieren validar resistencia, plasticidad, dureza y proceso.',
    'Barra de perfil redondo para aplicações que exigem controle dimensional e acabamento superficial.':'Barra de perfil redondo para aplicaciones que requieren control dimensional y acabado superficial.','Barra trefilada para aplicações mecânicas em que aço, bitola, propriedades e processo precisam ser validados.':'Barra trefilada para aplicaciones mecánicas donde deben validarse el acero, el diámetro, las propiedades y el proceso.','Barra trefilada para aplicações que exigem validação de resistência mecânica, bitola e processo.':'Barra trefilada para aplicaciones que requieren validar resistencia mecánica, diámetro y proceso.','Opção em aço de corte livre para aplicações em que usinabilidade, precisão dimensional e acabamento são critérios relevantes.':'Opción en acero de fácil mecanizado para aplicaciones donde la maquinabilidad, precisión dimensional y acabado son criterios relevantes.',
    'Haste com núcleo sólido de aço-carbono SAE 1010/1020 e revestimento de cobre de 20 µm.':'Varilla con núcleo sólido de acero al carbono SAE 1010/1020 y revestimiento de cobre de 20 µm.','Haste com núcleo SAE 1010/1020 e revestimento eletrolítico de cobre de 254 µm.':'Varilla con núcleo SAE 1010/1020 y revestimiento electrolítico de cobre de 254 µm.','Conector para união entre haste e cabo em sistemas de aterramento.':'Conector para unir la varilla y el cable en sistemas de puesta a tierra.','Modelo reforçado para conexão entre haste e cabo em sistemas de aterramento.':'Modelo reforzado para conectar la varilla y el cable en sistemas de puesta a tierra.','Conector em formato U para união entre haste e cabo.':'Conector en forma de U para unir la varilla y el cable.','Modelo reforçado em formato U para conexão entre haste e cabo.':'Modelo reforzado en forma de U para conectar la varilla y el cable.',
    'Arame trefilado de baixo teor de carbono, em perfil redondo e fornecido em rolos ou spiders. Consulte bitola, tolerância e condição de fornecimento para o seu pedido.':'Alambre trefilado de bajo carbono, de perfil redondo y suministrado en rollos o spiders. Consulta diámetro, tolerancia y condición de suministro para tu pedido.','Arame trefilado de médio teor de carbono, em perfil redondo e fornecido em rolos ou spiders. A seleção deve considerar aço, bitola, requisito mecânico e processo da peça.':'Alambre trefilado de medio carbono, de perfil redondo y suministrado en rollos o spiders. La selección debe considerar acero, diámetro, requisito mecánico y proceso de la pieza.','Arame trefilado de alto teor de carbono, em perfil redondo e fornecido em rolos ou spiders. A especificação deve ser validada conforme aço, bitola, requisito mecânico e processo da peça.':'Alambre trefilado de alto carbono, de perfil redondo y suministrado en rollos o spiders. La especificación debe validarse según el acero, diámetro, requisito mecánico y proceso de la pieza.',
    'Tolerância e condições específicas de fornecimento devem ser confirmadas conforme a especificação do pedido.':'La tolerancia y las condiciones específicas de suministro deben confirmarse según la especificación del pedido.','Displays aramados':'Expositores de alambre','Utilidades domésticas':'Utilidades domésticas','Linha branca':'Línea blanca','Racks':'Racks','Telas':'Mallas','Molas':'Resortes','Cabos de aço':'Cables de acero','Componentes automotivos':'Componentes automotrices','Pregos':'Clavos',
    'Barra trefilada com alta precisão dimensional, superfície lisa e acabamento superior obtidos por processo a frio.':'Barra trefilada con alta precisión dimensional, superficie lisa y acabado superior obtenidos mediante proceso en frío.','Barra trefilada de médio carbono apresentada pela Torcisão para aplicações mecânicas que pedem equilíbrio entre resistência e processamento.':'Barra trefilada de medio carbono Torcisão para aplicaciones mecánicas que requieren equilibrio entre resistencia y procesamiento.','Barra trefilada de alto carbono da linha Torcisão para aplicações mecânicas que exigem validação de aço, resistência, tolerância e processo.':'Barra trefilada de alto carbono de la línea Torcisão para aplicaciones mecánicas que requieren validar acero, resistencia, tolerancia y proceso.','Barra trefilada para aplicações em que usinabilidade, precisão dimensional e acabamento são critérios importantes.':'Barra trefilada para aplicaciones donde la maquinabilidad, precisión dimensional y acabado son criterios importantes.','Conforme especificação / consulta':'Según especificación / consulta','Conforme especificação':'Según especificación','A classificação do aço deve ser confirmada na especificação comercial':'La clasificación del acero debe confirmarse en la especificación comercial','Usinagem e componentes seriados':'Mecanizado y componentes seriados',
    'Fixadores':'Fijadores','Autopeças':'Autopartes','Cesto metálico':'Cesta metálica','Rack metálico':'Rack metálico','Molas helicoidais':'Resortes helicoidales','Amortecedores':'Amortiguadores','Eixos':'Ejes','Engrenagens':'Engranajes','Bielas':'Bielas','Cubos de roda':'Cubos de rueda','Trilhos':'Rieles','Parafusos':'Tornillos','Porcas':'Tuercas','Pinos':'Pasadores','Hastes de amortecedor':'Vástagos de amortiguador','Sapatas de trator':'Zapatas de tractor','Peças forjadas':'Piezas forjadas','Ferramentas manuais':'Herramientas manuales','Setor automotivo':'Sector automotriz','Pistões':'Pistones','Bujões':'Tapones','Válvulas':'Válvulas','Sistemas hidráulicos':'Sistemas hidráulicos','Sistemas pneumáticos':'Sistemas neumáticos',
    'Sistemas de aterramento':'Sistemas de puesta a tierra','Geração e transmissão de energia':'Generación y transmisión de energía','Distribuição de energia':'Distribución de energía','Redes de telecomunicações':'Redes de telecomunicaciones','Aterramento de equipamentos':'Puesta a tierra de equipos','Energias renováveis':'Energías renovables','Construção industrial':'Construcción industrial','Ambientes residenciais':'Entornos residenciales','Instalações prediais':'Instalaciones de edificios','Instalações industriais':'Instalaciones industriales','Conexão entre haste e cabo':'Conexión entre varilla y cable','Medida / referência':'Medida / referencia','Disponibilidade / condição':'Disponibilidad / condición','Tolerâncias, combinações e condições específicas devem ser confirmadas com a equipe Torcisão.':'Las tolerancias, combinaciones y condiciones específicas deben confirmarse con el equipo Torcisão.','Trefilado / cobre':'Trefilado / cobre','Cobre · 20 µm':'Cobre · 20 µm','Aço-carbono SAE 1010/1020':'Acero al carbono SAE 1010/1020','Cobre eletrolítico · 254 µm':'Cobre electrolítico · 254 µm','Olhal simples / reforçado · Grampo U simples / reforçado':'Ojal simple / reforzado · Abrazadera U simple / reforzada','Simples · Reforçado':'Simple · Reforzado','Olhal':'Ojal','Grampo U':'Abrazadera U',
    'Preparando formulário…':'Preparando formulario…','Fechar cotação':'Cerrar cotización','Fechar':'Cerrar','Solicitar cotação':'Solicitar cotización',
    'Compare opções de baixo, médio e alto teor de carbono, consulte bitolas e forma de fornecimento e avance com a equipe Torcisão na validação do seu pedido.':'Compara opciones de bajo, medio y alto carbono, consulta diámetros y forma de suministro y avanza con el equipo Torcisão en la validación de tu pedido.','Soluções em barras trefiladas para aplicações que exigem precisão dimensional, acabamento e desempenho mecânico.':'Soluciones en barras trefiladas para aplicaciones que requieren precisión dimensional, acabado y desempeño mecánico.','Compare opções de baixa e alta camada, consulte medidas e conectores e avance com a equipe Torcisão na validação da sua especificação.':'Compara opciones de capa baja y alta, consulta medidas y conectores y avanza con el equipo Torcisão en la validación de tu especificación.',
    'Consulte faixa de aço, bitola, perfil, acabamento e forma de fornecimento. A tolerância deve ser confirmada conforme a especificação do pedido.':'Consulta rango de acero, diámetro, perfil, acabado y forma de suministro. La tolerancia debe confirmarse según la especificación del pedido.','As referências abaixo reproduzem as informações publicadas pela Torcisão. Tolerâncias, composição, tratamento e demais requisitos devem ser confirmados conforme o desenho ou memorial do projeto.':'Las referencias siguientes reproducen la información publicada por Torcisão. Las tolerancias, composición, tratamiento y demás requisitos deben confirmarse según el plano o memoria del proyecto.','Consulte os dados disponíveis para a configuração escolhida. Tolerâncias, combinações específicas e requisitos do projeto devem ser confirmados com nossa equipe.':'Consulta los datos disponibles para la configuración elegida. Las tolerancias, combinaciones específicas y requisitos del proyecto deben confirmarse con nuestro equipo.','A aplicação indica um ponto de partida. A seleção do aço depende dos requisitos mecânicos, dimensionais e do processo de fabricação.':'La aplicación indica un punto de partida. La selección del acero depende de los requisitos mecánicos, dimensionales y del proceso de fabricación.','Informe aplicação, faixa de aço, bitola, propriedades requeridas e forma de fornecimento para direcionar a consulta à opção adequada.':'Indica aplicación, rango de acero, diámetro, propiedades requeridas y forma de suministro para orientar la consulta hacia la opción adecuada.','Use o assistente para estruturar camada, medida, conector e demais pontos técnicos que precisam ser validados no seu projeto.':'Usa el asistente para organizar capa, medida, conector y demás puntos técnicos que deben validarse en tu proyecto.'
  }
};

const map=Object.assign({},cfg.map||{},DYNAMIC[lang]||{});
const entries=Object.entries(map).sort((a,b)=>b[0].length-a[0].length);
const active=lang==='en'||lang==='es';
const isPreview=/localhost|127\.0\.0\.1|\.app\.github\.dev$/i.test(location.hostname);

const ROUTES={
  en:{
    '/':'/en/inicio-english/',
    '/blog/':'/en/torcisao-trefilados-blog/',
    '/politicadequalidade/':'/en/quality-policy/',
    '/politicadeprivacidade/':'/en/privacy-policy/',
    '/politicadecookies/':'/en/cookie-policy/',
    '/aramebtc/':'/en/drawn-steel-wires-low-carbon/',
    '/aramemtc/':'/en/drawn-steel-wires-medium-carbon-1035-a-1050/',
    '/arameatc/':'/en/drawn-steel-wires-high-carbon-1060-a-1090/',
    '/barrabtc/':'/en/drawn-steel-bars-low-carbon-1006-a-1020/',
    '/barramtc/':'/en/drawn-steel-bars-medium-carbon-1035-a-1050/',
    '/barraatc/':'/en/drawn-steel-bars-high-carbon-1060-a-1090/',
    '/barraacoressulfurado/':'/en/resulfurized-steel-bars/',
    '/hastebc/':'/en/grounding-rod-low-coat/',
    '/hasteac/':'/en/grounding-rod-high-coat/'
  },
  es:{
    '/':'/es/inicio-espanol/',
    '/blog/':'/es/blog-de-torcisao-trefilados/',
    '/politicadequalidade/':'/es/politica-de-calidad/',
    '/politicadeprivacidade/':'/es/politica-de-privacidad/',
    '/politicadecookies/':'/es/politica-de-cookies/',
    '/aramebtc/':'/es/alambres-trefilados-bajo-carbono-1004-a-1020/',
    '/aramemtc/':'/es/alambres-trefilados-medio-carbono-1035-a-1050/',
    '/arameatc/':'/es/alambres-alto-contenido-de-carbono-1060-a-1090/',
    '/barrabtc/':'/es/barras-trefiladas-bajo-carbono-1006-a-1020/',
    '/barramtc/':'/es/barras-trefiladas-medio-carbono-1035-a-1050/',
    '/barraatc/':'/es/barras-trefiladas-alto-carbono-1060-a-1090/',
    '/barraacoressulfurado/':'/es/barras-acero-resulfurado/',
    '/hastebc/':'/es/varilla-de-puesta-a-tierra-capa-baja/',
    '/hasteac/':'/es/varilla-de-puesta-a-tierra-capa-alta/'
  }
};

function translate(text){
  let out=String(text==null?'':text);
  if(!active||!out)return out;
  for(const [from,to] of entries){
    if(from&&out.includes(from))out=out.split(from).join(to);
  }
  return out;
}

function blocked(el){
  return !el||el.nodeType!==1||!!el.closest('script,style,noscript,code,pre,[data-no-i18n]');
}

function lockLanguageLinks(){
  const links=Array.from(document.querySelectorAll('.tor-lang-grid a'));
  const codes=['pt','en','es'];
  links.forEach((a,index)=>{
    const target=codes[index];
    if(!target)return;
    a.dataset.torLanguageSwitch=target;
    if(isPreview){
      const url=new URL(location.href);
      url.searchParams.set('lang',target);
      a.setAttribute('href',url.href);
    }
  });
}

function translatedHref(href){
  if(!active||!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('javascript:'))return href;
  try{
    const url=new URL(href,location.href);
    if(url.origin!==location.origin&&url.hostname!=='torcisao.com.br'&&url.hostname!=='www.torcisao.com.br')return href;
    if(url.searchParams.has('lang'))return href;
    if(isPreview){url.protocol=location.protocol;url.host=location.host;url.searchParams.set('lang',lang);return url.href;}
    const routes=ROUTES[lang]||{};const mapped=routes[url.pathname];if(!mapped)return href;
    url.protocol=location.protocol;url.host=location.host;url.pathname=mapped;return url.href;
  }catch(e){return href;}
}

function translateAnchor(el){
  if(!active||!el||el.tagName!=='A'||!el.hasAttribute('href'))return;
  if(el.closest('.tor-lang-grid')||el.dataset.torLanguageSwitch)return;
  const old=el.getAttribute('href')||'';const next=translatedHref(old);if(next&&next!==old)el.setAttribute('href',next);
}

function translateTextNode(node){
  if(!active||!node||node.nodeType!==3||!node.nodeValue||!node.nodeValue.trim())return;
  const parent=node.parentElement;if(blocked(parent))return;const next=translate(node.nodeValue);if(next!==node.nodeValue)node.nodeValue=next;
}

function translateElement(root){
  if(!active||!root)return;
  if(root.nodeType===3){translateTextNode(root);return;}
  if(root.nodeType!==1||blocked(root))return;
  ['aria-label','title','placeholder','data-label'].forEach(attr=>{if(!root.hasAttribute(attr))return;const old=root.getAttribute(attr)||'';const next=translate(old);if(next!==old)root.setAttribute(attr,next);});
  translateAnchor(root);
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){if(!node.nodeValue||!node.nodeValue.trim())return NodeFilter.FILTER_REJECT;return blocked(node.parentElement)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});
  let node;while((node=walker.nextNode()))translateTextNode(node);
  root.querySelectorAll?.('[aria-label],[title],[placeholder],[data-label],a[href]').forEach(el=>{if(blocked(el))return;['aria-label','title','placeholder','data-label'].forEach(attr=>{if(!el.hasAttribute(attr))return;const old=el.getAttribute(attr)||'';const next=translate(old);if(next!==old)el.setAttribute(attr,next);});translateAnchor(el);});
}

function translateDocument(){if(!active)return;document.documentElement.lang=locale;if(document.body)translateElement(document.body);}

let mutating=false;
function observe(){
  if(!active||!document.body)return;
  const observer=new MutationObserver(records=>{if(mutating)return;mutating=true;try{records.forEach(record=>{if(record.type==='characterData')translateTextNode(record.target);record.addedNodes?.forEach(node=>translateElement(node));if(record.type==='attributes'&&record.target?.nodeType===1)translateElement(record.target);});}finally{queueMicrotask(()=>{mutating=false;});}});
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','data-label','href']});
}

/* Toda instância do Theo usa o idioma ativo, inclusive Home, Arame, Barra e Haste. */
const originalFetch=window.fetch?.bind(window);
if(originalFetch){window.fetch=function(input,init){try{const url=typeof input==='string'?input:(input&&input.url)||'';if(url.includes('/torcisao/v1/application-assistant')&&init&&String(init.method||'GET').toUpperCase()==='POST'){const body=init.body;if(typeof body==='string'){const parsed=JSON.parse(body);parsed.lang=lang;init=Object.assign({},init,{body:JSON.stringify(parsed)});}}}catch(e){}return originalFetch(input,init);};}

window.TorcisaoI18n={lang,locale,translate,translatedHref,refresh:translateDocument};
function init(){lockLanguageLinks();translateDocument();observe();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
