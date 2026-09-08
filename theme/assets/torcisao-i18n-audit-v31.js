(function(){
'use strict';

const i18n=window.TorcisaoI18n;
if(!i18n||!['en','es'].includes(i18n.lang)||typeof i18n.register!=='function')return;

/*
 * "Torcisão Trefilados" é marca e nunca deve ser traduzida.
 * A camada antiga traduzia a palavra "Trefilado" dentro do nome da marca,
 * gerando "Torcisão Drawns". Este guardião corrige o texto e o isola das
 * camadas genéricas de tradução, inclusive para conteúdo criado depois por JS.
 */
const BRAND_RE=/Torcisão\s+(?:Trefilados|Drawns?)/g;
let brandBusy=false;
function protectBrandText(node){
  if(!node||node.nodeType!==3||!node.nodeValue||node.parentElement?.closest('[data-no-i18n]'))return;
  const text=node.nodeValue;
  BRAND_RE.lastIndex=0;
  if(!BRAND_RE.test(text)){BRAND_RE.lastIndex=0;return;}
  BRAND_RE.lastIndex=0;
  const frag=document.createDocumentFragment();
  let last=0,m;
  while((m=BRAND_RE.exec(text))){
    if(m.index>last)frag.appendChild(document.createTextNode(text.slice(last,m.index)));
    const span=document.createElement('span');
    span.setAttribute('data-no-i18n','brand');
    span.textContent='Torcisão Trefilados';
    frag.appendChild(span);
    last=m.index+m[0].length;
  }
  if(last<text.length)frag.appendChild(document.createTextNode(text.slice(last)));
  node.replaceWith(frag);
}
function protectBrand(root){
  if(!root)return;
  if(root.nodeType===3){protectBrandText(root);return;}
  if(root.nodeType!==1||root.closest?.('script,style,noscript,code,pre,[data-no-i18n]'))return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];let n;while((n=walker.nextNode()))nodes.push(n);
  nodes.forEach(protectBrandText);
}
const brandObserver=new MutationObserver(records=>{
  if(brandBusy)return;
  brandBusy=true;
  try{records.forEach(r=>{if(r.type==='characterData')protectBrandText(r.target);r.addedNodes?.forEach(protectBrand);});}
  finally{queueMicrotask(()=>{brandBusy=false;});}
});
if(document.body)brandObserver.observe(document.body,{subtree:true,childList:true,characterData:true});

const EN={
  /* Reparos de traduções parciais / antigas */
  'Torcisão Drawns':'Torcisão Trefilados',
  'Torcisão Drawn':'Torcisão Trefilados',
  'Wire Drawn':'Drawn Wire',
  'Bar Drawn':'Drawn Bar',
  'ARAME TREFILADO':'DRAWN WIRE',
  'BARRA TREFILADA':'DRAWN BAR',
  'HASTE DE ATERRAMENTO':'GROUNDING ROD',
  'Quality comprovada em cada etapa':'Quality proven at every stage',
  'Especialização em Grounding Rod de Grounding':'Specialization in Grounding Rods',
  'Especialização em Grounding Rod':'Specialization in Grounding Rods',

  /* Home - qualidade e certificado */
  'Qualidade comprovada em cada etapa':'Quality proven at every stage',
  'Da inspeção ao controle dimensional, a Torcisão mantém processos documentados e rastreáveis para dar consistência ao que chega à sua operação. A certificação ISO 9001 fica disponível aqui para consulta, visualização e download.':'From inspection to dimensional control, Torcisão maintains documented and traceable processes to provide consistency in every delivery. The ISO 9001 certification is available here for review, viewing, and download.',
  'Controle dimensional':'Dimensional control',
  'Inspeção de processo':'Process inspection',
  'Rastreabilidade':'Traceability',
  'Processos documentados':'Documented processes',
  'Pilares de qualidade':'Quality pillars',
  'Documento disponível':'Document available',
  'DOCUMENTO DISPONÍVEL':'DOCUMENT AVAILABLE',
  'Certificado ISO 9001':'ISO 9001 Certificate',
  'Consulte o documento diretamente no site ou faça o download do PDF para seus registros e processos de homologação.':'View the document directly on the website or download the PDF for your records and qualification processes.',
  'Visualizar certificado':'View certificate',
  'Baixar PDF':'Download PDF',
  'Arquivo: TORCISÃO 9001 – 2026 · PDF disponível para consulta.':'File: TORCISÃO 9001 - 2026 · PDF available for review.',
  'CERTIFICADO ISO 9001':'ISO 9001 CERTIFICATE',
  'Prévia do Certificado ISO 9001 da Torcisão':'Preview of Torcisão ISO 9001 Certificate',
  'Certificado ISO 9001 da Torcisão':'Torcisão ISO 9001 Certificate',

  /* Home - números / prova social e modal */
  'EXPERIÊNCIA DO CLIENTE':'CUSTOMER EXPERIENCE',
  'RESULTADOS TORCISÃO':'TORCISÃO RESULTS',
  'PRESENÇA NO MERCADO':'MARKET PRESENCE',
  '95% de Satisfação':'95% Satisfaction',
  '+100 Milhões de Toneladas':'+100 Million Tons',
  '+11 Mil Clientes':'+11 Thousand Customers',
  'Nível de satisfação dos nossos clientes.':'Customer satisfaction level.',
  'Em nossa última pesquisa, alcançamos 95% de satisfação. Esse número representa o compromisso da Torcisão com a qualidade dos produtos, o atendimento a prazos e o suporte técnico em cada projeto.':'In our latest survey, customer satisfaction reached 95%. This result reflects Torcisão’s commitment to product quality, delivery schedules, and technical support in every project.',
  'Vendas em toneladas até 2025.':'Sales volume in tons through 2025.',
  'Desde 2023 superamos a marca de 100 Milhões de toneladas de produtos fornecidos, solidificando nossa presença no mercado.':'Since 2023, we have surpassed the milestone presented in our institutional materials, strengthening our market presence.',
  'Como resultado do nosso trabalho e da nossa história desde 1968.':'A result built through our work and our history since 1968.',
  'Nossa rede de clientes atendidos.':'Our network of customers served.',
  'Ao longo de mais de cinco décadas de atuação, a Torcisão já atendeu mais de 11 mil empresas e projetos em diferentes segmentos, incluindo indústria, construção civil e energia.':'Over more than five decades, Torcisão has served more than 11 thousand companies and projects across industries including manufacturing, construction, and energy.',
  'Toneladas vendidas até 2025':'Tons sold through 2025',
  'Nível de satisfação dos clientes':'Customer satisfaction level',
  'Clientes atendidos':'Customers served',
  'Segmentos atendidos pela Torcisão':'Industries served by Torcisão',
  'Geração e Transmissão de Energia':'Power Generation and Transmission',
  'Indústria Automotiva':'Automotive Industry',
  'Linha Branca & Moveleira':'Home Appliances & Furniture',
  'Linha Agrícola':'Agricultural Industry',
  'Energias Renováveis':'Renewable Energy',
  'Distribuição de Energia':'Power Distribution',
  'Para-raio & Aterramento':'Lightning Protection & Grounding',

  /* Home - Quem Somos / MVV */
  'Mais do que fornecer barras, arames e hastes de aterramento, a Torcisão Trefilados entrega valorização para o seu projeto.':'More than supplying bars, wires, and grounding rods, Torcisão Trefilados adds value to your project.',
  'Com mais de 57 anos de história e um padrão de qualidade inquestionável.':'With more than 58 years of history and a strong commitment to quality.',
  'Com mais de 58 anos de história e um padrão de qualidade inquestionável.':'With more than 58 years of history and a strong commitment to quality.',
  'Nossa vasta experiência e rigoroso controle técnico garantem que cada produto Torcisão seja uma oportunidade de elevar a qualidade, durabilidade e o nome da sua empresa.':'Our experience and rigorous technical control help every Torcisão product contribute to quality, durability, and reliability in your operation.',
  'Nossa história é traduzida através de cinco décadas de muito trabalho, dedicação e foco no cliente.':'Our history reflects decades of work, dedication, and customer focus.',
  'Missão, visão e valores':'Mission, vision, and values',
  'Missão':'Mission',
  'Visão':'Vision',
  'Valores':'Values',
  'Trabalhando com a filosofia de melhorar continuamente processos internos e externos em produtos conforme especificações dos clientes e fornecedores das exigências de tempo, prazo, custo e qualidade, proporcionando assim maior satisfação aos clientes, para os acionistas, para os colaboradores e para os clientes. Pesquisar no mercado em conformidade com as normas e especificações dos clientes para a legislação aplicável a empresa e a documentação pertinente e, prestativamente com qualidade, prazo e preços competitivos.':'We work with a philosophy of continuous improvement in internal and external processes, meeting customer specifications and requirements for time, cost, quality, and delivery. We seek solutions aligned with applicable standards, customer requirements, legislation, and relevant documentation, with quality, reliability, competitive lead times, and competitive pricing.',
  'Ser uma indústria metalúrgica sólida e admirada, que atua com foco em crescimento sustentável, valorizando a satisfação dos clientes, colaboradores e fornecedores.':'To be a solid and respected metalworking company focused on sustainable growth and on the satisfaction of customers, employees, and suppliers.',
  'Ética':'Ethics','Confiança':'Trust','Transparência':'Transparency','Seriedade':'Responsibility','Humildade':'Humility','Conscientização sobre o Meio Ambiente':'Environmental Awareness','Valorização Social':'Social Responsibility',
  'Marco da nossa história':'MILESTONE IN OUR HISTORY',
  'MARCO DA NOSSA HISTÓRIA':'MILESTONE IN OUR HISTORY',
  'Abrir marco de ':'Open milestone ',
  'Linha do tempo Torcisão. Deslize horizontalmente em telas menores.':'Torcisão timeline. Swipe horizontally on smaller screens.',

  /* Linha do tempo - títulos */
  'Início da Jornada':'The Journey Begins',
  'Mudanças Estratégicas':'Strategic Changes',
  'Nova Sede, Nova Identidade':'New Headquarters, New Identity',
  'Novos Rumos com a Direção Atual':'A New Direction with Current Management',
  'Torcisão Industrial Ganha Vida':'Torcisão Industrial Is Founded',
  'Expansão para a construção civil':'Expansion into Construction',
  'Unidade de Protensão':'Prestressing Unit',
  'Avanço para Mineração e Túneis':'Expansion into Mining and Tunneling',
  'Especialização em Haste de Aterramento':'Specialization in Grounding Rods',
  'Ingresso no setor de Energia':'Entry into the Energy Sector',
  'Sede Própria em Ribeirão Pires':'Own Headquarters in Ribeirão Pires',
  'Unidade de Arames':'Drawn Wire Unit',
  'Inovação com Estacas Metálicas Helicoidais':'Innovation with Helical Steel Piles',
  'Nascimento do Grupo Torcisão':'Creation of Torcisão Group',
  'Aumento do Parque Fabril - 4.000 m²':'Expansion of the Manufacturing Facility - 4,000 m²',

  /* Linha do tempo - textos */
  'A Torcisão Trefilados nasce em 1968, focada no desenvolvimento de materiais para a indústria automobilística, destacando-se pelo rigoroso controle técnico e de qualidade.':'Torcisão Trefilados was founded in 1968, focused on developing materials for the automotive industry and distinguished by rigorous technical and quality control.',
  'A empresa realiza uma troca de razão social, consolidando-se como Indústria e Comércio de Ferros e Aços Trefilados, Arruelas, Rebites, Engraxadeiras, Porcas, Parafusos, Pregos e Torneados em Geral.':'The company changes its corporate name and consolidates its activities in drawn iron and steel products, washers, rivets, grease fittings, nuts, bolts, nails, and machined components.',
  'A matriz é transferida para Vila Liviero, São Paulo, marcando não apenas uma mudança de endereço, mas também uma ampliação do escopo de atuação.':'Headquarters move to Vila Liviero, São Paulo, marking both a new location and an expansion of the company’s scope of operations.',
  'A Torcisão passa por uma aquisição pela diretoria atual, impulsionando uma fase de renovação e crescimento.':'Torcisão is acquired by the current management team, beginning a new phase of renewal and growth.',
  'Surge a Torcisão Industrial, agora com sede própria, iniciando suas atividades focadas na fabricação de acessórios para escoramento, fôrmas e andaimes.':'Torcisão Industrial is established with its own headquarters, initially focused on accessories for shoring, formwork, and scaffolding.',
  'Em 2006, aproveitando o crescimento da construção civil, a Torcisão Industrial diversifica suas atividades, consolidando-se como referência na fabricação de produtos para esse setor.':'In 2006, following the growth of the construction industry, Torcisão Industrial diversifies its activities and strengthens its position in products for this sector.',
  'A empresa lançou a unidade de protensão em 2011, ampliando seu escopo de atuação para atender clientes em grandes obras no Brasil.':'The prestressing unit is launched in 2011, expanding the company’s scope to serve customers on major projects in Brazil.',
  'A Torcisão inicia a fabricação de barras roscadas em 2013, ampliando seu portfólio para atender às demandas de sustentação de rochas em escavações subterrâneas.':'In 2013, Torcisão begins manufacturing threaded bars, expanding its portfolio for rock support applications in underground excavations.',
  'A Torcisão Trefilados se especializa na fabricação de haste de aterramento, atendendo com precisão diversas obras de infraestrutura e construção civil.':'Torcisão Trefilados specializes in manufacturing grounding rods for infrastructure and construction projects.',
  'A Torcisão Trefilados se especializa na fabricação de Grounding Rod, atendendo com precisão diversas obras de infraestrutura e construção civil.':'Torcisão Trefilados specializes in manufacturing grounding rods for infrastructure and construction projects.',
  'A Torcisão Industrial expande suas atividades para o setor de energia, produzindo produtos de qualidade para fundações de obras energéticas.':'Torcisão Industrial expands into the energy sector, manufacturing products for foundations used in energy projects.',
  'A empresa muda sua sede para Ribeirão Pires em 2016, marcando uma fase de consolidação e modernização.':'The company moves its headquarters to Ribeirão Pires in 2016, marking a period of consolidation and modernization.',
  'A empresa lançou a unidade de Arames Trefilados em 2017, aumentando a sua atuação e participação no mercado e seu mix de produtos.':'The Drawn Wire unit is launched in 2017, expanding the company’s market presence and product mix.',
  'Desenvolvimento e patenteamento de Estacas Metálicas Helicoidais como solução para Provas de Carga Estática, proporcionando agilidade e eficiência nas obras.':'Development and patenting of Helical Steel Piles for static load testing, providing greater agility and efficiency on construction sites.',
  'Em 2022, a Torcisão se transforma no Grupo Torcisão, um marco que reflete a expansão e diversificação de suas atividades ao longo dos anos.':'In 2022, Torcisão becomes Torcisão Group, reflecting the expansion and diversification of its activities over the years.',
  'Com a aquisição de um galpão para estocagem de matéria-prima ampliamos nossa capacidade de armazenamento e produção.':'With the acquisition of a new raw-material storage facility, the company expands its storage and production capacity.',

  /* Produtos - textos ainda gerados em PT por JS / modais */
  'Use a escolha rápida ou descreva a aplicação para organizar as opções Torcisão.':'Use the quick selection or describe the application to organize Torcisão options.',
  'Use a escolha rápida ou descreva a peça e o processo para organizar as opções Torcisão.':'Use the quick selection or describe the component and process to organize Torcisão options.',
  'Use a escolha rápida ou descreva a aplicação para eu organizar as opções Torcisão.':'Use the quick selection or describe the application so I can organize Torcisão options.',
  'Descreva a aplicação, faixa de aço, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo os pontos sem definir condição de produção sem validação.':'Describe the application, steel grade range, diameter, quantity, or requirement you need to assess. I will organize the key points without defining production conditions before validation.',
  'Descreva a peça, aplicação, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo as opções Torcisão sem inventar especificações.':'Describe the component, application, diameter, quantity, or requirement you need to assess. I will organize Torcisão options without inventing specifications.',
  'Olá! Descreva a peça, aplicação, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo as opções Torcisão sem inventar especificações.':'Hello! Describe the component, application, diameter, quantity, or requirement you need to assess. I will organize Torcisão options without inventing specifications.',
  'Ex.: preciso de arame para molas de...':'Ex.: I need wire for springs...',
  'Ex.: preciso fabricar pinos de...':'Ex.: I need to manufacture pins...',
  'Ex.: preciso de haste para SPDA em...':'Ex.: I need a grounding rod for a lightning protection system...',
  'Informe a faixa de aço e o diâmetro nominal previstos no desenho ou na especificação.':'Provide the steel grade range and nominal diameter specified in the drawing or specification.',
  'Quando houver requisito de resistência, dureza ou outra propriedade, informe a referência prevista para a peça.':'If strength, hardness, or another property is required, provide the reference specified for the component.',
  'Indique rolo ou spider e as demais condições do pedido. A disponibilidade é confirmada durante a cotação.':'Indicate coil or spider and the other order conditions. Availability is confirmed during quotation.',
  'Confirme a classificação do material prevista no desenho ou especificação.':'Confirm the material classification specified in the drawing or specification.',
  'Bitola, comprimento e tolerância devem acompanhar a necessidade da peça.':'Diameter, length, and tolerance must match the component requirements.',
  'Usinagem, conformação, soldagem, tratamento ou acabamento podem alterar a seleção final.':'Machining, forming, welding, treatment, or finishing may affect the final selection.',
  'Bitola e comprimento compatíveis com o desenho ou memorial.':'Diameter and length must match the drawing or project specification.',
  'Norma, camada, material e condição de instalação exigidos.':'Required standard, coating, material, and installation condition.',
  'Modelo de conector e cabo previstos no sistema de aterramento.':'Connector model and cable specified for the grounding system.',
  'Preparando formulário…':'Preparing form…',
  'Fechar cotação':'Close quote',

  /* Tolerância e handoff comercial */
  'Sob consulta':'Upon request',
  'Limites':'Limits','Validar com especialista':'Validate with a specialist','Mínimo':'Minimum','Máximo':'Maximum',
  'h9 automático disponível a partir de 9,53 mm':'Automatic h9 lookup is available from 9.53 mm',
  'Bitola nominal:':'Nominal diameter:',
  'processo trefilado':'drawn process','perfil redondo':'round profile',
  'Bitola consultada:':'Diameter checked:',
  'Ferramenta: Consulta de Tolerância Dimensional':'Tool: Dimensional Tolerance Lookup',
  'Quer levar esta consulta para o comercial?':'Would you like to send this lookup to sales?',
  'Envie a bitola e o resultado consultado para o WhatsApp da Torcisão.':'Send the diameter and lookup result to Torcisão sales on WhatsApp.',
  'Quer continuar com o comercial?':'Would you like to continue with sales?',
  'O WhatsApp leva junto o contexto da escolha manual e da conversa com o Theo.':'WhatsApp will include the context from your manual selection and Theo conversation.',
  'Escolha manual: ':'Manual selection: ',
  'Cliente: ':'Customer: ',
  'Assistente de Aplicação · Haste':'Application Assistant · Grounding Rod',
  'Assistente de Aplicação · Barra':'Application Assistant · Drawn Bar',
  'Assistente de Aplicação · Arame':'Application Assistant · Drawn Wire',

  /* Calculadora - textos dinâmicos que aparecem dentro do modal */
  'DADOS TORCISÃO':'TORCISÃO DATA','PESO UNITÁRIO':'UNIT WEIGHT',
  'Quantidade de barras':'Number of bars','Quantidade de hastes':'Number of rods','Quantidade de conectores':'Number of connectors',
  'Tenho a metragem':'I have the length','Tenho a quantidade':'I have the quantity','Tenho metragem / quantidade':'I have length / quantity',
  'Peso por metro':'Weight per meter','Peso por haste':'Weight per rod','Peso por peça':'Weight per piece',
  'Metragem total':'Total length','Referência de 100 peças':'Reference for 100 pieces','Peso total estimado':'Estimated total weight','Peso total':'Total weight',
  'Quantidade aproximada de barras':'Approximate number of bars',
  'Selecione a bitola comercial Torcisão. O cálculo usa referências internas cadastradas para o modelo escolhido.':'Select the Torcisão commercial diameter. The calculation uses internal references registered for the selected model.',
  'Os pesos de conectores são referências técnicas por quantidade e não representam lote mínimo de venda.':'Connector weights are technical quantity references and do not represent a minimum sales lot.',
  'Quer transformar esse cálculo em orçamento?':'Would you like to turn this calculation into a quote?',
  'Envie o histórico da simulação para o comercial e continue no WhatsApp sem refazer as informações.':'Send the simulation details to sales and continue on WhatsApp without entering the information again.'
};

const ES={
  /* Reparos de traduções parciais / marca */
  'Torcisão Drawns':'Torcisão Trefilados',
  'Torcisão Drawn':'Torcisão Trefilados',
  'ARAME TREFILADO':'ALAMBRE TREFILADO',
  'BARRA TREFILADA':'BARRA TREFILADA',
  'HASTE DE ATERRAMENTO':'VARILLA DE PUESTA A TIERRA',
  'Quality comprovada em cada etapa':'Calidad comprobada en cada etapa',

  /* Home - qualidade */
  'Qualidade comprovada em cada etapa':'Calidad comprobada en cada etapa',
  'Da inspeção ao controle dimensional, a Torcisão mantém processos documentados e rastreáveis para dar consistência ao que chega à sua operação. A certificação ISO 9001 fica disponível aqui para consulta, visualização e download.':'Desde la inspección hasta el control dimensional, Torcisão mantiene procesos documentados y trazables para aportar consistencia a cada entrega. La certificación ISO 9001 está disponible aquí para consulta, visualización y descarga.',
  'Controle dimensional':'Control dimensional','Inspeção de processo':'Inspección de proceso','Rastreabilidade':'Trazabilidad','Processos documentados':'Procesos documentados','Pilares de qualidade':'Pilares de calidad',
  'Documento disponível':'Documento disponible','DOCUMENTO DISPONÍVEL':'DOCUMENTO DISPONIBLE','Certificado ISO 9001':'Certificado ISO 9001',
  'Consulte o documento diretamente no site ou faça o download do PDF para seus registros e processos de homologação.':'Consulta el documento directamente en el sitio o descarga el PDF para tus registros y procesos de homologación.',
  'Visualizar certificado':'Ver certificado','Baixar PDF':'Descargar PDF','Arquivo: TORCISÃO 9001 – 2026 · PDF disponível para consulta.':'Archivo: TORCISÃO 9001 - 2026 · PDF disponible para consulta.','CERTIFICADO ISO 9001':'CERTIFICADO ISO 9001',
  'Prévia do Certificado ISO 9001 da Torcisão':'Vista previa del Certificado ISO 9001 de Torcisão','Certificado ISO 9001 da Torcisão':'Certificado ISO 9001 de Torcisão',

  /* Home - prova social */
  'EXPERIÊNCIA DO CLIENTE':'EXPERIENCIA DEL CLIENTE','RESULTADOS TORCISÃO':'RESULTADOS TORCISÃO','PRESENÇA NO MERCADO':'PRESENCIA EN EL MERCADO',
  '95% de Satisfação':'95% de Satisfacción','+100 Milhões de Toneladas':'+100 Millones de Toneladas','+11 Mil Clientes':'+11 Mil Clientes',
  'Nível de satisfação dos nossos clientes.':'Nivel de satisfacción de nuestros clientes.',
  'Em nossa última pesquisa, alcançamos 95% de satisfação. Esse número representa o compromisso da Torcisão com a qualidade dos produtos, o atendimento a prazos e o suporte técnico em cada projeto.':'En nuestra última encuesta alcanzamos un 95% de satisfacción. Este resultado refleja el compromiso de Torcisão con la calidad de los productos, el cumplimiento de plazos y el soporte técnico en cada proyecto.',
  'Vendas em toneladas até 2025.':'Ventas en toneladas hasta 2025.','Desde 2023 superamos a marca de 100 Milhões de toneladas de produtos fornecidos, solidificando nossa presença no mercado.':'Desde 2023 superamos el hito presentado en nuestros materiales institucionales, fortaleciendo nuestra presencia en el mercado.','Como resultado do nosso trabalho e da nossa história desde 1968.':'Un resultado construido con nuestro trabajo y nuestra historia desde 1968.',
  'Nossa rede de clientes atendidos.':'Nuestra red de clientes atendidos.','Ao longo de mais de cinco décadas de atuação, a Torcisão já atendeu mais de 11 mil empresas e projetos em diferentes segmentos, incluindo indústria, construção civil e energia.':'A lo largo de más de cinco décadas, Torcisão ha atendido a más de 11 mil empresas y proyectos en sectores como industria, construcción y energía.',
  'Toneladas vendidas até 2025':'Toneladas vendidas hasta 2025','Nível de satisfação dos clientes':'Nivel de satisfacción de los clientes','Clientes atendidos':'Clientes atendidos','Segmentos atendidos pela Torcisão':'Sectores atendidos por Torcisão',
  'Geração e Transmissão de Energia':'Generación y Transmisión de Energía','Indústria Automotiva':'Industria Automotriz','Linha Branca & Moveleira':'Línea Blanca y Mobiliario','Linha Agrícola':'Sector Agrícola','Energias Renováveis':'Energías Renovables','Distribuição de Energia':'Distribución de Energía','Para-raio & Aterramento':'Protección contra Rayos y Puesta a Tierra',

  /* Quem Somos / MVV */
  'Mais do que fornecer barras, arames e hastes de aterramento, a Torcisão Trefilados entrega valorização para o seu projeto.':'Más que suministrar barras, alambres y varillas de puesta a tierra, Torcisão Trefilados aporta valor a tu proyecto.',
  'Com mais de 57 anos de história e um padrão de qualidade inquestionável.':'Con más de 58 años de historia y un firme compromiso con la calidad.','Com mais de 58 anos de história e um padrão de qualidade inquestionável.':'Con más de 58 años de historia y un firme compromiso con la calidad.',
  'Nossa vasta experiência e rigoroso controle técnico garantem que cada produto Torcisão seja uma oportunidade de elevar a qualidade, durabilidade e o nome da sua empresa.':'Nuestra experiencia y el riguroso control técnico ayudan a que cada producto Torcisão contribuya a la calidad, durabilidad y confiabilidad de tu operación.',
  'Nossa história é traduzida através de cinco décadas de muito trabalho, dedicação e foco no cliente.':'Nuestra historia refleja décadas de trabajo, dedicación y enfoque en el cliente.',
  'Missão, visão e valores':'Misión, visión y valores','Missão':'Misión','Visão':'Visión','Valores':'Valores',
  'Trabalhando com a filosofia de melhorar continuamente processos internos e externos em produtos conforme especificações dos clientes e fornecedores das exigências de tempo, prazo, custo e qualidade, proporcionando assim maior satisfação aos clientes, para os acionistas, para os colaboradores e para os clientes. Pesquisar no mercado em conformidade com as normas e especificações dos clientes para a legislação aplicável a empresa e a documentação pertinente e, prestativamente com qualidade, prazo e preços competitivos.':'Trabajamos con una filosofía de mejora continua de los procesos internos y externos, atendiendo las especificaciones de los clientes y los requisitos de plazo, costo y calidad. Buscamos soluciones alineadas con las normas aplicables, los requisitos del cliente, la legislación y la documentación pertinente, con calidad, confiabilidad, plazos competitivos y precios adecuados.',
  'Ser uma indústria metalúrgica sólida e admirada, que atua com foco em crescimento sustentável, valorizando a satisfação dos clientes, colaboradores e fornecedores.':'Ser una industria metalúrgica sólida y admirada, enfocada en el crecimiento sostenible y en la satisfacción de clientes, colaboradores y proveedores.',
  'Ética':'Ética','Confiança':'Confianza','Transparência':'Transparencia','Seriedade':'Responsabilidad','Humildade':'Humildad','Conscientização sobre o Meio Ambiente':'Conciencia Ambiental','Valorização Social':'Responsabilidad Social',
  'Marco da nossa história':'HITO DE NUESTRA HISTORIA','MARCO DA NOSSA HISTÓRIA':'HITO DE NUESTRA HISTORIA','Abrir marco de ':'Abrir hito de ','Linha do tempo Torcisão. Deslize horizontalmente em telas menores.':'Cronología de Torcisão. Desliza horizontalmente en pantallas pequeñas.',

  /* Linha do tempo */
  'Início da Jornada':'Inicio de la Trayectoria','Mudanças Estratégicas':'Cambios Estratégicos','Nova Sede, Nova Identidade':'Nueva Sede, Nueva Identidad','Novos Rumos com a Direção Atual':'Nueva Etapa con la Dirección Actual','Torcisão Industrial Ganha Vida':'Nace Torcisão Industrial','Expansão para a construção civil':'Expansión hacia la Construcción','Unidade de Protensão':'Unidad de Pretensado','Avanço para Mineração e Túneis':'Expansión hacia Minería y Túneles','Especialização em Haste de Aterramento':'Especialización en Varillas de Puesta a Tierra','Ingresso no setor de Energia':'Entrada en el Sector Energético','Sede Própria em Ribeirão Pires':'Sede Propia en Ribeirão Pires','Unidade de Arames':'Unidad de Alambres Trefilados','Inovação com Estacas Metálicas Helicoidais':'Innovación con Pilotes Metálicos Helicoidales','Nascimento do Grupo Torcisão':'Nacimiento del Grupo Torcisão','Aumento do Parque Fabril - 4.000 m²':'Ampliación del Parque Fabril - 4.000 m²',
  'A Torcisão Trefilados nasce em 1968, focada no desenvolvimento de materiais para a indústria automobilística, destacando-se pelo rigoroso controle técnico e de qualidade.':'Torcisão Trefilados nace en 1968, enfocada en el desarrollo de materiales para la industria automotriz y destacándose por un riguroso control técnico y de calidad.',
  'A empresa realiza uma troca de razão social, consolidando-se como Indústria e Comércio de Ferros e Aços Trefilados, Arruelas, Rebites, Engraxadeiras, Porcas, Parafusos, Pregos e Torneados em Geral.':'La empresa cambia su razón social y consolida sus actividades en hierros y aceros trefilados, arandelas, remaches, engrasadores, tuercas, tornillos, clavos y componentes mecanizados.',
  'A matriz é transferida para Vila Liviero, São Paulo, marcando não apenas uma mudança de endereço, mas também uma ampliação do escopo de atuação.':'La sede se traslada a Vila Liviero, São Paulo, marcando no solo un cambio de dirección, sino también una ampliación del alcance de las operaciones.',
  'A Torcisão passa por uma aquisição pela diretoria atual, impulsionando uma fase de renovação e crescimento.':'Torcisão es adquirida por la dirección actual, dando inicio a una nueva etapa de renovación y crecimiento.',
  'Surge a Torcisão Industrial, agora com sede própria, iniciando suas atividades focadas na fabricação de acessórios para escoramento, fôrmas e andaimes.':'Nace Torcisão Industrial con sede propia, inicialmente enfocada en accesorios para apuntalamiento, encofrados y andamios.',
  'Em 2006, aproveitando o crescimento da construção civil, a Torcisão Industrial diversifica suas atividades, consolidando-se como referência na fabricação de produtos para esse setor.':'En 2006, acompañando el crecimiento de la construcción, Torcisão Industrial diversifica sus actividades y fortalece su presencia en productos para este sector.',
  'A empresa lançou a unidade de protensão em 2011, ampliando seu escopo de atuação para atender clientes em grandes obras no Brasil.':'La unidad de pretensado se lanza en 2011, ampliando el alcance de la empresa para atender grandes proyectos en Brasil.',
  'A Torcisão inicia a fabricação de barras roscadas em 2013, ampliando seu portfólio para atender às demandas de sustentação de rochas em escavações subterrâneas.':'En 2013, Torcisão inicia la fabricación de barras roscadas, ampliando su portafolio para aplicaciones de sostenimiento de roca en excavaciones subterráneas.',
  'A Torcisão Trefilados se especializa na fabricação de haste de aterramento, atendendo com precisão diversas obras de infraestrutura e construção civil.':'Torcisão Trefilados se especializa en la fabricación de varillas de puesta a tierra para proyectos de infraestructura y construcción.',
  'A Torcisão Industrial expande suas atividades para o setor de energia, produzindo produtos de qualidade para fundações de obras energéticas.':'Torcisão Industrial amplía sus actividades hacia el sector energético, fabricando productos para cimentaciones de proyectos de energía.',
  'A empresa muda sua sede para Ribeirão Pires em 2016, marcando uma fase de consolidação e modernização.':'La empresa traslada su sede a Ribeirão Pires en 2016, marcando una etapa de consolidación y modernización.',
  'A empresa lançou a unidade de Arames Trefilados em 2017, aumentando a sua atuação e participação no mercado e seu mix de produtos.':'La unidad de Alambres Trefilados se lanza en 2017, ampliando la presencia de la empresa en el mercado y su mix de productos.',
  'Desenvolvimento e patenteamento de Estacas Metálicas Helicoidais como solução para Provas de Carga Estática, proporcionando agilidade e eficiência nas obras.':'Desarrollo y patentamiento de Pilotes Metálicos Helicoidales para pruebas de carga estática, aportando mayor agilidad y eficiencia en obra.',
  'Em 2022, a Torcisão se transforma no Grupo Torcisão, um marco que reflete a expansão e diversificação de suas atividades ao longo dos anos.':'En 2022, Torcisão se convierte en Grupo Torcisão, reflejando la expansión y diversificación de sus actividades a lo largo de los años.',
  'Com a aquisição de um galpão para estocagem de matéria-prima ampliamos nossa capacidade de armazenamento e produção.':'Con la adquisición de una nueva nave para almacenamiento de materia prima, ampliamos la capacidad de almacenamiento y producción.',

  /* Produtos / modais */
  'Use a escolha rápida ou descreva a aplicação para organizar as opções Torcisão.':'Usa la selección rápida o describe la aplicación para organizar las opciones Torcisão.','Use a escolha rápida ou descreva a peça e o processo para organizar as opções Torcisão.':'Usa la selección rápida o describe la pieza y el proceso para organizar las opciones Torcisão.','Use a escolha rápida ou descreva a aplicação para eu organizar as opções Torcisão.':'Usa la selección rápida o describe la aplicación para que pueda organizar las opciones Torcisão.',
  'Descreva a aplicação, faixa de aço, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo os pontos sem definir condição de produção sem validação.':'Describe la aplicación, el rango de acero, el diámetro, la cantidad o el requisito que necesitas evaluar. Organizaré los puntos clave sin definir condiciones de producción antes de la validación.',
  'Descreva a peça, aplicação, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo as opções Torcisão sem inventar especificações.':'Describe la pieza, aplicación, diámetro, cantidad o requisito que necesitas evaluar. Organizaré las opciones Torcisão sin inventar especificaciones.','Olá! Descreva a peça, aplicação, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo as opções Torcisão sem inventar especificações.':'¡Hola! Describe la pieza, aplicación, diámetro, cantidad o requisito que necesitas evaluar. Organizaré las opciones Torcisão sin inventar especificaciones.',
  'Ex.: preciso de arame para molas de...':'Ej.: necesito alambre para resortes...','Ex.: preciso fabricar pinos de...':'Ej.: necesito fabricar pasadores...','Ex.: preciso de haste para SPDA em...':'Ej.: necesito una varilla para un sistema de protección contra rayos...',
  'Informe a faixa de aço e o diâmetro nominal previstos no desenho ou na especificação.':'Indica el rango de acero y el diámetro nominal previstos en el plano o especificación.','Quando houver requisito de resistência, dureza ou outra propriedade, informe a referência prevista para a peça.':'Cuando exista un requisito de resistencia, dureza u otra propiedad, indica la referencia prevista para la pieza.','Indique rolo ou spider e as demais condições do pedido. A disponibilidade é confirmada durante a cotação.':'Indica rollo o spider y las demás condiciones del pedido. La disponibilidad se confirma durante la cotización.',
  'Confirme a classificação do material prevista no desenho ou especificação.':'Confirma la clasificación del material prevista en el plano o especificación.','Bitola, comprimento e tolerância devem acompanhar a necessidade da peça.':'El diámetro, la longitud y la tolerancia deben corresponder a las necesidades de la pieza.','Usinagem, conformação, soldagem, tratamento ou acabamento podem alterar a seleção final.':'El mecanizado, conformado, soldadura, tratamiento o acabado pueden modificar la selección final.','Bitola e comprimento compatíveis com o desenho ou memorial.':'El diámetro y la longitud deben ser compatibles con el plano o memoria del proyecto.','Norma, camada, material e condição de instalação exigidos.':'Norma, capa, material y condición de instalación exigidos.','Modelo de conector e cabo previstos no sistema de aterramento.':'Modelo de conector y cable previstos en el sistema de puesta a tierra.',
  'Preparando formulário…':'Preparando formulario…','Fechar cotação':'Cerrar cotización',

  /* Tolerância / handoff */
  'Limites':'Límites','Validar com especialista':'Validar con un especialista','Mínimo':'Mínimo','Máximo':'Máximo','h9 automático disponível a partir de 9,53 mm':'La consulta automática h9 está disponible a partir de 9,53 mm','Bitola nominal:':'Diámetro nominal:','processo trefilado':'proceso de trefilado','perfil redondo':'perfil redondo','Bitola consultada:':'Diámetro consultado:','Ferramenta: Consulta de Tolerância Dimensional':'Herramienta: Consulta de Tolerancia Dimensional','Quer levar esta consulta para o comercial?':'¿Quieres enviar esta consulta al equipo comercial?','Envie a bitola e o resultado consultado para o WhatsApp da Torcisão.':'Envía el diámetro y el resultado consultado al WhatsApp comercial de Torcisão.','Quer continuar com o comercial?':'¿Quieres continuar con el equipo comercial?','O WhatsApp leva junto o contexto da escolha manual e da conversa com o Theo.':'WhatsApp incluirá el contexto de tu selección manual y de la conversación con Theo.','Escolha manual: ':'Selección manual: ','Cliente: ':'Cliente: ','Assistente de Aplicação · Haste':'Asistente de Aplicación · Varilla','Assistente de Aplicação · Barra':'Asistente de Aplicación · Barra Trefilada','Assistente de Aplicação · Arame':'Asistente de Aplicación · Alambre Trefilado',

  /* Calculadora */
  'DADOS TORCISÃO':'DATOS TORCISÃO','PESO UNITÁRIO':'PESO UNITARIO','Quantidade de barras':'Cantidad de barras','Quantidade de hastes':'Cantidad de varillas','Quantidade de conectores':'Cantidad de conectores','Tenho a metragem':'Tengo la longitud','Tenho a quantidade':'Tengo la cantidad','Tenho metragem / quantidade':'Tengo longitud / cantidad','Peso por metro':'Peso por metro','Peso por haste':'Peso por varilla','Peso por peça':'Peso por pieza','Metragem total':'Longitud total','Referência de 100 peças':'Referencia de 100 piezas','Peso total estimado':'Peso total estimado','Peso total':'Peso total','Quantidade aproximada de barras':'Cantidad aproximada de barras','Selecione a bitola comercial Torcisão. O cálculo usa referências internas cadastradas para o modelo escolhido.':'Selecciona el diámetro comercial Torcisão. El cálculo utiliza referencias internas registradas para el modelo elegido.','Os pesos de conectores são referências técnicas por quantidade e não representam lote mínimo de venda.':'Los pesos de los conectores son referencias técnicas por cantidad y no representan un lote mínimo de venta.','Quer transformar esse cálculo em orçamento?':'¿Quieres convertir este cálculo en una cotización?','Envie o histórico da simulação para o comercial e continue no WhatsApp sem refazer as informações.':'Envía los datos de la simulación al equipo comercial y continúa por WhatsApp sin volver a introducir la información.'
};

/* Corrige conteúdo atual e mantém as correções para modais/partes criadas depois. */
i18n.register(i18n.lang==='en'?EN:ES);
protectBrand(document.body);

})();
