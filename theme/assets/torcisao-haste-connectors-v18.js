(function(){
'use strict';

const root=document.getElementById('haste-aterramento');
if(!root)return;

const MEDIA='https://torcisao.com.br/wp-content/uploads/2026/09/';
const $=id=>document.getElementById(id);
const qa=(s,c=document)=>Array.from(c.querySelectorAll(s));

/* Mesma fonte de dados usada no explorador de produtos da Home. */
const CONNECTORS={
  'olhal-simples':{
    title:'Olhal Simples',
    lead:'Conector para união entre haste e cabo em sistemas de aterramento.',
    image:MEDIA+'olhalsimples.png',
    facts:[['Norma','ABNT NBR 5370'],['Material','Latão ou bronze'],['Referência','2 kg / 100 peças'],['Aplicação','Haste + cabo']]
  },
  'olhal-reforcado':{
    title:'Olhal Reforçado',
    lead:'Modelo reforçado para conexão entre haste e cabo em sistemas de aterramento.',
    image:MEDIA+'olhalreforcado.png',
    facts:[['Norma','ABNT NBR 5370'],['Material','Latão ou bronze'],['Referência','4 kg / 100 peças'],['Aplicação','Haste + cabo']]
  },
  'grampo-simples':{
    title:'Grampo U Simples',
    lead:'Conector em formato U para união entre haste e cabo.',
    image:MEDIA+'formatoUsimples.png',
    facts:[['Norma','ABNT NBR 5370'],['Material','Latão ou bronze'],['Referência','8,5 kg / 100 peças'],['Aplicação','Haste + cabo']]
  },
  'grampo-reforcado':{
    title:'Grampo U Reforçado',
    lead:'Modelo reforçado em formato U para conexão entre haste e cabo.',
    image:MEDIA+'formatoUreforcado.png',
    facts:[['Norma','ABNT NBR 5370'],['Material','Latão ou bronze'],['Referência','15 kg / 100 peças'],['Aplicação','Haste + cabo']]
  }
};

let model='olhal-simples';
const picker=$('hfConnectorPicker');
const image=$('hfImage');

function connectorsActive(){
  const active=root.querySelector('[data-hf-kind].is-active');
  return (active?.dataset.hfKind||root.dataset.initialKind)==='conectores';
}

function factsHtml(items){
  return items.map(([label,value])=>`<div class="hf-fact"><small>${label}</small><strong>${value}</strong></div>`).join('');
}

function setConnectorImage(item){
  if(!image||!item)return;
  const wanted=item.image;
  image.classList.add('is-connector');
  image.removeAttribute('srcset');
  image.removeAttribute('sizes');
  if(image.getAttribute('src')!==wanted)image.setAttribute('src',wanted);
  image.alt=item.title;
}

function renderConnector(nextModel=model){
  if(!connectorsActive())return;
  if(!CONNECTORS[nextModel])nextModel='olhal-simples';
  model=nextModel;
  const item=CONNECTORS[model];

  picker?.classList.add('is-visible');
  picker?.removeAttribute('hidden');
  qa('[data-hf-connector]',root).forEach(btn=>{
    const on=btn.dataset.hfConnector===model;
    btn.classList.toggle('is-active',on);
    btn.setAttribute('aria-pressed',on?'true':'false');
  });

  if($('hfKicker'))$('hfKicker').textContent='Conectores para haste';
  if($('hfProductTitle'))$('hfProductTitle').textContent=item.title;
  if($('hfProductLead'))$('hfProductLead').textContent=item.lead;
  if($('hfFacts'))$('hfFacts').innerHTML=factsHtml(item.facts);
  if($('hfCaptionKicker'))$('hfCaptionKicker').textContent='Conectores';
  if($('hfCaptionTitle'))$('hfCaptionTitle').textContent=item.title;
  if($('hfCaptionMeta'))$('hfCaptionMeta').textContent='Conector para haste';
  setConnectorImage(item);
}

function hidePicker(){
  if(connectorsActive())return;
  picker?.classList.remove('is-visible');
  image?.classList.remove('is-connector');
}

/* O clique na aba Conectores sempre entra com Olhal Simples, como na Home. */
qa('[data-hf-kind]',root).forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(btn.dataset.hfKind==='conectores'){
      model='olhal-simples';
      [0,40,120].forEach(delay=>setTimeout(()=>renderConnector(model),delay));
    }else{
      [0,40].forEach(delay=>setTimeout(hidePicker,delay));
    }
  });
});

qa('[data-hf-connector]',root).forEach(btn=>{
  btn.addEventListener('click',e=>{
    e.preventDefault();
    model=btn.dataset.hfConnector;
    renderConnector(model);
    setTimeout(()=>renderConnector(model),30);
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:'connector_model_select',model:model,page:'haste_aterramento'});
  });
});

/* Se qualquer camada antiga tentar recolocar a imagem de haste enquanto a aba
 * Conectores estiver ativa, restaura a foto correspondente ao modelo selecionado. */
if(image){
  const observer=new MutationObserver(()=>{
    if(!connectorsActive())return;
    const item=CONNECTORS[model]||CONNECTORS['olhal-simples'];
    const current=image.getAttribute('src')||'';
    if(current!==item.image)setConnectorImage(item);
  });
  observer.observe(image,{attributes:true,attributeFilter:['src','srcset','class']});
}

function init(){
  if(connectorsActive())renderConnector(model);
  else hidePicker();
  setTimeout(()=>{if(connectorsActive())renderConnector(model);},180);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
