(function(){
'use strict';

const MEDIA='https://torcisao.com.br/wp-content/uploads/2026/09/';

const exactImages={
  haste:{
    baixa:[{label:'Baixa Camada',url:MEDIA+'baixacamada.png'}],
    alta:[{label:'Alta Camada',url:MEDIA+'altacamada.png'}]
  },
  arame:{
    btc:[
      {label:'Rolo',url:MEDIA+'arametrefiladorolo.png'},
      {label:'Spider',url:MEDIA+'arametrefiladospider.png'}
    ],
    mtc:[
      {label:'Rolo',url:MEDIA+'arametrefiladorolo.png'},
      {label:'Spider',url:MEDIA+'arametrefiladospider.png'}
    ],
    atc:[
      {label:'Rolo',url:MEDIA+'arametrefiladorolo.png'},
      {label:'Spider',url:MEDIA+'arametrefiladospider.png'}
    ]
  },
  barra:{
    btc:[
      {label:'Baixo Carbono',url:MEDIA+'barrabtctrefilada.png'},
      {label:'Sem polimento',url:MEDIA+'barratrefiladasempolimento.png'}
    ],
    mtc:[
      {label:'Trefilada',url:MEDIA+'barratrefiladamtc.png'},
      {label:'Trefilada polida',url:MEDIA+'barramtctrefiladapolida.png'}
    ],
    atc:[
      {label:'Trefilada',url:MEDIA+'barratrefiladaatca1.png'},
      {label:'Polida',url:MEDIA+'barrapolidaatca1.png'}
    ],
    ressulfurado:[
      {label:'Trefilada',url:MEDIA+'barratrefiladaressulfuradoa1.png'},
      {label:'Polida',url:MEDIA+'barrapolidaressulfuradoa1.png'}
    ]
  }
};

function activeKind(root,dataKey){
  const active=root.querySelector('.hf-family-tab.is-active');
  return (active&&active.dataset[dataKey])||root.dataset.initialKind||'';
}

function setExactImage(image,url,alt,captionMeta,label){
  if(!image||!url)return;
  image.src=url;
  image.removeAttribute('srcset');
  if(alt)image.alt=alt;
  if(captionMeta)captionMeta.textContent=label||'Produto Torcisão';
}

function mountPicker(stage,id){
  let picker=document.getElementById(id);
  if(picker)return picker;
  picker=document.createElement('div');
  picker.id=id;
  picker.className='hf-image-variants';
  picker.setAttribute('role','group');
  picker.setAttribute('aria-label','Fotos do produto');
  stage.prepend(picker);
  return picker;
}

function renderPicker(picker,items,selected,onSelect){
  picker.innerHTML='';
  items.forEach((item,index)=>{
    const button=document.createElement('button');
    button.type='button';
    button.className='hf-image-variant'+(index===selected?' is-active':'');
    button.textContent=item.label;
    button.setAttribute('aria-pressed',index===selected?'true':'false');
    button.addEventListener('click',()=>onSelect(index));
    picker.appendChild(button);
  });
  picker.hidden=items.length<2;
}

function initHaste(){
  const root=document.getElementById('haste-aterramento');
  if(!root)return;
  const image=document.getElementById('hfImage');
  const captionMeta=document.getElementById('hfCaptionMeta');
  const title=document.getElementById('hfProductTitle');

  function sync(){
    const kind=activeKind(root,'hfKind');
    const item=exactImages.haste[kind]?.[0];
    if(!item)return;
    setExactImage(image,item.url,title?.textContent||item.label,captionMeta,'Foto oficial Torcisão');
  }

  root.querySelectorAll('[data-hf-kind]').forEach(button=>button.addEventListener('click',()=>setTimeout(sync,0)));
  sync();
}

function initArame(){
  const root=document.getElementById('arame-trefilado');
  if(!root)return;
  const stage=root.querySelector('.hf-stage');
  const image=document.getElementById('afImage');
  const captionMeta=document.getElementById('afCaptionMeta');
  const title=document.getElementById('afProductTitle');
  if(!stage||!image)return;
  const picker=mountPicker(stage,'afImageVariants');
  let selected=0;

  function sync(reset){
    const kind=activeKind(root,'afKind');
    const items=exactImages.arame[kind]||[];
    if(reset)selected=0;
    if(selected>=items.length)selected=0;
    const item=items[selected];
    if(!item)return;
    setExactImage(image,item.url,title?.textContent||'Arame Trefilado',captionMeta,'Acondicionamento · '+item.label);
    renderPicker(picker,items,selected,index=>{
      selected=index;
      sync(false);
      const selectedItem=items[index];
      root.dispatchEvent(new CustomEvent('tor:arame-view-change',{detail:{view:selectedItem?.label||''}}));
    });
  }

  root.querySelectorAll('[data-af-kind]').forEach(button=>button.addEventListener('click',()=>setTimeout(()=>sync(true),0)));
  sync(true);
}

function initBarra(){
  const root=document.getElementById('barra-trefilada');
  if(!root)return;
  const stage=root.querySelector('.hf-stage');
  const image=document.getElementById('bfImage');
  const captionMeta=document.getElementById('bfCaptionMeta');
  const title=document.getElementById('bfProductTitle');
  if(!stage||!image)return;
  const picker=mountPicker(stage,'bfImageVariants');
  let selected=0;

  function sync(reset){
    const kind=activeKind(root,'bfKind');
    const items=exactImages.barra[kind]||[];
    if(reset)selected=0;
    if(selected>=items.length)selected=0;
    const item=items[selected];
    if(!item)return;
    setExactImage(image,item.url,title?.textContent||'Barra Trefilada',captionMeta,item.label);
    renderPicker(picker,items,selected,index=>{selected=index;sync(false);});
  }

  root.querySelectorAll('[data-bf-kind]').forEach(button=>button.addEventListener('click',()=>setTimeout(()=>sync(true),0)));
  sync(true);
}

function init(){
  initHaste();
  initArame();
  initBarra();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else setTimeout(init,0);
})();
