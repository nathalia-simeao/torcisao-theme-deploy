(function(){
'use strict';
const requested=String(new URLSearchParams(location.search).get('lang')||'').toLowerCase();
const pathMatch=location.pathname.match(/^\/(en|es)(?:\/|$)/i);
const lang=['en','es'].includes(requested)?requested:(pathMatch?pathMatch[1].toLowerCase():(window.TorcisaoI18n?.lang||'pt'));
if(!['en','es'].includes(lang))return;

const EN={
  'A Torcisão Trefilados nasce em 1968, focada no desenvolvimento de materiais para a indústria automobilística, destacando-se pelo rigoroso controle técnico e de qualidade.':'Torcisão Trefilados was founded in 1968, focused on developing materials for the automotive industry and distinguished by rigorous technical and quality control.',
  'A empresa realiza uma troca de razão social, consolidando-se como Indústria e Comércio de Ferros e Aços Trefilados, Arruelas, Rebites, Engraxadeiras, Porcas, Parafusos, Pregos e Torneados em Geral.':'The company changes its corporate name and consolidates its activities in drawn iron and steel products, washers, rivets, grease fittings, nuts, bolts, nails, and machined components.',
  'A matriz é transferida para Vila Liviero, São Paulo, marcando não apenas uma mudança de endereço, mas também uma ampliação do escopo de atuação.':'Headquarters move to Vila Liviero, São Paulo, marking both a new location and an expansion of the company’s scope of operations.',
  'A Torcisão passa por uma aquisição pela diretoria atual, impulsionando uma fase de renovação e crescimento.':'Torcisão is acquired by the current management team, beginning a new phase of renewal and growth.',
  'Surge a Torcisão Industrial, agora com sede própria, iniciando suas atividades focadas na fabricação de acessórios para escoramento, fôrmas e andaimes.':'Torcisão Industrial is established with its own headquarters, initially focused on accessories for shoring, formwork, and scaffolding.',
  'Em 2006, aproveitando o crescimento da construção civil, a Torcisão Industrial diversifica suas atividades, consolidando-se como referência na fabricação de produtos para esse setor.':'In 2006, following the growth of the construction industry, Torcisão Industrial diversifies its activities and strengthens its position in products for this sector.',
  'A empresa lançou a unidade de protensão em 2011, ampliando seu escopo de atuação para atender clientes em grandes obras no Brasil.':'The prestressing unit is launched in 2011, expanding the company’s scope to serve customers on major projects in Brazil.',
  'A Torcisão inicia a fabricação de barras roscadas em 2013, ampliando seu portfólio para atender às demandas de sustentação de rochas em escavações subterrâneas.':'In 2013, Torcisão begins manufacturing threaded bars, expanding its portfolio for rock support applications in underground excavations.',
  'A Torcisão Trefilados se especializa na fabricação de haste de aterramento, atendendo com precisão diversas obras de infraestrutura e construção civil.':'Torcisão Trefilados specializes in manufacturing grounding rods for infrastructure and construction projects.',
  'A Torcisão Industrial expande suas atividades para o setor de energia, produzindo produtos de qualidade para fundações de obras energéticas.':'Torcisão Industrial expands into the energy sector, manufacturing products for foundations used in energy projects.',
  'A empresa muda sua sede para Ribeirão Pires em 2016, marcando uma fase de consolidação e modernização.':'The company moves its headquarters to Ribeirão Pires in 2016, marking a period of consolidation and modernization.',
  'A empresa lançou a unidade de Arames Trefilados em 2017, aumentando a sua atuação e participação no mercado e seu mix de produtos.':'The Drawn Wire unit is launched in 2017, expanding the company’s market presence and product mix.',
  'Desenvolvimento e patenteamento de Estacas Metálicas Helicoidais como solução para Provas de Carga Estática, proporcionando agilidade e eficiência nas obras.':'Development and patenting of Helical Steel Piles for static load testing, providing greater agility and efficiency on construction sites.',
  'Em 2022, a Torcisão se transforma no Grupo Torcisão, um marco que reflete a expansão e diversificação de suas atividades ao longo dos anos.':'In 2022, Torcisão becomes Torcisão Group, reflecting the expansion and diversification of its activities over the years.',
  'Com a aquisição de um galpão para estocagem de matéria-prima ampliamos nossa capacidade de armazenamento e produção.':'With the acquisition of a new raw-material storage facility, the company expands its storage and production capacity.'
};
const ES={
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
  'Com a aquisição de um galpão para estocagem de matéria-prima ampliamos nossa capacidade de armazenamento e produção.':'Con la adquisición de una nueva nave para almacenamiento de materia prima, ampliamos la capacidad de almacenamiento y producción.'
};
const map=lang==='en'?EN:ES;
const selector='p,h1,h2,h3,h4,h5,h6,small,strong,span,button';
let scheduled=false;
function normalize(s){return String(s||'').replace(/\s+/g,' ').trim();}
function fixElement(el){
  if(!el||el.matches?.('[data-no-i18n]')||el.closest?.('script,style,noscript,code,pre'))return;
  const key=normalize(el.textContent);
  if(map[key])el.textContent=map[key];
}
function scan(root=document){
  if(root.nodeType===1&&root.matches?.(selector))fixElement(root);
  root.querySelectorAll?.(selector).forEach(fixElement);
}
function schedule(){
  if(scheduled)return;scheduled=true;
  setTimeout(()=>{scheduled=false;scan(document);},0);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();