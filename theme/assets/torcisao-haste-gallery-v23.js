(function(){
'use strict';

const MEDIA='https://torcisao.com.br/wp-content/uploads/2026/09/';
const GALLERY={
  baixa:[
    {src:MEDIA+'baixacamada.png',alt:'Haste de aterramento Torcisão · Baixa Camada'},
    {src:MEDIA+'hasteinteirapeca.png',alt:'Haste de aterramento Torcisão · peça inteira'},
    {src:MEDIA+'conjunto-de-hastes.png',alt:'Conjunto de hastes de aterramento Torcisão'}
  ],
  alta:[
    {src:MEDIA+'altacamada.png',alt:'Haste de aterramento Torcisão · Alta Camada'},
    {src:MEDIA+'hasteinteirapeca.png',alt:'Haste de aterramento Torcisão · peça inteira'},
    {src:MEDIA+'conjunto-de-hastes.png',alt:'Conjunto de hastes de aterramento Torcisão'}
  ]
};

function createPicker(stage,id){
  let picker=document.getElementById(id);
  if(picker)return picker;
  picker=document.createElement('div');
  picker.id=id;
  picker.className='tor-haste-angle-picker';
  picker.setAttribute('role','group');
  picker.innerHTML='<small>Opções</small>';
  stage.appendChild(picker);
  return picker;
}

function renderPicker(picker,items,selected,onSelect,label){
  picker.setAttribute('aria-label','Fotos da '+label);
  picker.innerHTML='<small>Opções</small>';
  items.forEach((item,index)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='tor-haste-angle-btn'+(index===selected?' is-active':'');
    btn.setAttribute('aria-label','Ver foto '+(index+1)+' da '+label);
    btn.setAttribute('aria-pressed',index===selected?'true':'false');
    const img=document.createElement('img');
    img.src=item.src;
    img.alt='';
    img.loading='lazy';
    img.decoding='async';
    btn.appendChild(img);
    btn.addEventListener('click',e=>{
      e.preventDefault();
      e.stopPropagation();
      onSelect(index);
    });
    picker.appendChild(btn);
  });
}

function applyImage(image,item,meta){
  if(!image||!item)return;
  if(image.src!==item.src){
    image.src=item.src;
    image.removeAttribute('srcset');
  }
  image.alt=item.alt||'Haste de aterramento Torcisão';
  if(meta)meta.textContent='Opção selecionada';
}

function initProductPage(){
  const root=document.getElementById('haste-aterramento');
  if(!root)return;
  const stage=root.querySelector('.hf-stage');
  const image=document.getElementById('hfImage');
  const meta=document.getElementById('hfCaptionMeta');
  if(!stage||!image)return;

  const picker=createPicker(stage,'hfHasteAnglePicker');
  let selected=0;
  let variant='';
  let forcing=false;

  function currentVariant(){
    return root.querySelector('.hf-family-tab.is-active')?.dataset.hfKind||root.dataset.initialKind||'baixa';
  }
  function currentItem(){
    const items=GALLERY[variant];
    return items ? (items[selected]||items[0]) : null;
  }
  function sync(reset=false){
    const nextVariant=currentVariant();
    if(nextVariant!==variant){variant=nextVariant;reset=true;}

    /* Conectores têm uma única foto por modelo e são controlados pelo script
       próprio. A galeria de ângulos pertence somente a Baixa/Alta Camada. */
    const items=GALLERY[variant];
    if(!items){
      selected=0;
      picker.hidden=true;
      picker.setAttribute('aria-hidden','true');
      return;
    }

    if(reset)selected=0;
    picker.hidden=false;
    picker.removeAttribute('aria-hidden');
    renderPicker(picker,items,selected,index=>{
      selected=index;
      sync(false);
    },variant==='alta'?'Haste Alta Camada':'Haste Baixa Camada');
    forcing=true;
    applyImage(image,currentItem(),meta);
    requestAnimationFrame(()=>{forcing=false;});
  }

  root.addEventListener('click',e=>{
    if(e.target.closest('[data-hf-kind]')){
      selected=0;
      setTimeout(()=>sync(true),0);
    }
  });

  const obs=new MutationObserver(()=>{
    if(forcing)return;
    const nextVariant=currentVariant();
    if(nextVariant!==variant){variant=nextVariant;selected=0;sync(true);return;}
    if(!GALLERY[nextVariant]){
      picker.hidden=true;
      picker.setAttribute('aria-hidden','true');
      return;
    }
    const wanted=currentItem();
    if(wanted&&image.src!==wanted.src)sync(false);
  });
  obs.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['class','src','aria-selected','aria-pressed']});

  setTimeout(()=>sync(true),150);
}

function init(){initProductPage();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,100),{once:true});
else setTimeout(init,100);
})();
