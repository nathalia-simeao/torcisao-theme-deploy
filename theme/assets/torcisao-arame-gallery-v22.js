(function(){
'use strict';

const MEDIA='https://torcisao.com.br/wp-content/uploads/2026/09/';
const GALLERY={
  rolo:[
    {src:MEDIA+'arametrefiladorolo.png'},
    {src:MEDIA+'aramera1.png'},
    {src:MEDIA+'aramera2.png'}
  ],
  spider:[
    {src:MEDIA+'arametrefiladospider.png'},
    {src:MEDIA+'aramespidera1.png'},
    {src:MEDIA+'aramespidera2.png'}
  ]
};

function createPicker(stage,id){
  let picker=document.getElementById(id);
  if(picker)return picker;
  picker=document.createElement('div');
  picker.id=id;
  picker.className='tor-arame-angle-picker';
  picker.setAttribute('role','group');
  picker.innerHTML='<small>Opções</small>';
  stage.appendChild(picker);
  return picker;
}

function renderPicker(picker,items,selected,onSelect,label){
  picker.setAttribute('aria-label','Opções de imagem do arame em '+label);
  picker.innerHTML='<small>Opções</small>';
  items.forEach((item,index)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='tor-arame-angle-btn'+(index===selected?' is-active':'');
    btn.setAttribute('aria-label','Ver opção '+(index+1));
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

function applyImage(image,item,alt,meta){
  if(!image||!item)return;
  image.classList.remove('tor-arame-clean-bg');
  if(image.src!==item.src){
    image.src=item.src;
    image.removeAttribute('srcset');
  }
  image.alt=alt;
  if(meta)meta.textContent='Opção selecionada';
}

function normalizeView(value,fallback){
  const text=String(value||'').trim().toLowerCase();
  if(text.includes('spider'))return 'spider';
  if(text.includes('rolo'))return 'rolo';
  return fallback;
}

function viewFromButton(btn,fallback){
  if(!btn)return fallback;
  return normalizeView(
    btn.dataset.afView||btn.dataset.view||btn.dataset.value||btn.dataset.tpeValue||btn.textContent,
    fallback
  );
}

function initProductPage(){
  const root=document.getElementById('arame-trefilado');
  if(!root)return;
  const stage=root.querySelector('.hf-stage');
  const image=document.getElementById('afImage');
  const meta=document.getElementById('afCaptionMeta');
  if(!stage||!image)return;

  const picker=createPicker(stage,'afArameAnglePicker');
  let selected=0;
  let view='rolo';
  let variant='';
  let forcing=false;

  function currentVariant(){
    return root.querySelector('.hf-family-tab.is-active')?.dataset.afKind||root.dataset.initialKind||'btc';
  }
  function currentView(){
    const variants=document.getElementById('afImageVariants');
    if(!variants)return view;
    const activeBtn=variants.querySelector('.hf-image-variant.is-active');
    if(activeBtn)return viewFromButton(activeBtn,view);
    const mainSrc=(image.currentSrc||image.src||'').toLowerCase();
    if(mainSrc.includes('spider'))return 'spider';
    if(mainSrc.includes('rolo'))return 'rolo';
    return view;
  }
  function currentItem(){return GALLERY[view]?.[selected]||GALLERY[view]?.[0];}

  function sync(reset=false,forcedView=''){
    const nextVariant=currentVariant();
    const nextView=normalizeView(forcedView,'')||currentView();
    if(nextVariant!==variant){variant=nextVariant;reset=true;}
    if(nextView!==view){view=nextView;reset=true;}
    if(reset)selected=0;
    const items=GALLERY[view];
    picker.hidden=!items;
    if(!items)return;
    renderPicker(picker,items,selected,index=>{selected=index;sync(false,view);},view==='spider'?'Spider':'Rolo');
    forcing=true;
    applyImage(image,currentItem(),'Arame '+variant.toUpperCase()+' · '+(view==='spider'?'Spider':'Rolo')+' · opção '+(selected+1),meta);
    requestAnimationFrame(()=>{forcing=false;});
  }

  root.addEventListener('tor:arame-view-change',e=>{
    const intended=normalizeView(e.detail?.view,view);
    view=intended;
    selected=0;
    sync(true,intended);
  });

  root.addEventListener('click',e=>{
    const viewBtn=e.target.closest('#afImageVariants .hf-image-variant');
    if(viewBtn){
      const intended=viewFromButton(viewBtn,view);
      view=intended;
      selected=0;
      setTimeout(()=>sync(true,intended),0);
      return;
    }
    if(e.target.closest('[data-af-kind]'))setTimeout(()=>sync(true),0);
  });

  const obs=new MutationObserver(()=>{
    if(forcing)return;
    const nextVariant=currentVariant();
    const nextView=currentView();
    const variantChanged=nextVariant!==variant;
    const viewChanged=nextView!==view;
    if(variantChanged){variant=nextVariant;selected=0;}
    if(viewChanged){view=nextView;selected=0;}
    if(variantChanged||viewChanged){sync(true,nextView);return;}
    const wanted=currentItem();
    if(wanted&&image.src!==wanted.src)sync(false,view);
  });
  obs.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['class','src','aria-pressed','aria-selected']});

  setTimeout(()=>sync(true),140);
}

function init(){initProductPage();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,100),{once:true});
else setTimeout(init,100);
})();
