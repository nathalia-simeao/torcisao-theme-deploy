(function(){
'use strict';

const MEDIA='https://torcisao.com.br/wp-content/uploads/2026/09/';
const GALLERIES={
  btc:{
    label:'BTC',
    trefilada:[(window.TorcisaoImg||String)(MEDIA+'barratrefiladabtca1.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladabtca2.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladabtca3.png')],
    polida:[(window.TorcisaoImg||String)(MEDIA+'barrapolidabtca1.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidabtca2.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidabtca3.png')]
  },
  mtc:{
    label:'MTC',
    trefilada:[(window.TorcisaoImg||String)(MEDIA+'barratrefiladamtca1.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladamtca2.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladamtca3.png')],
    polida:[(window.TorcisaoImg||String)(MEDIA+'barrapolidamtca1.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidamtca2.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidamtca3.png')]
  },
  atc:{
    label:'ATC',
    trefilada:[(window.TorcisaoImg||String)(MEDIA+'barratrefiladaatca1.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladaatca2.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladaatca3.png')],
    polida:[(window.TorcisaoImg||String)(MEDIA+'barrapolidaatca1.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidaatca2.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidaatca3.png')]
  },
  ressulfurado:{
    label:'Ressulfurado',
    trefilada:[(window.TorcisaoImg||String)(MEDIA+'barratrefiladaressulfuradoa1.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladaressulfuradoa2.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladaressulfuradoa3.png')],
    polida:[(window.TorcisaoImg||String)(MEDIA+'barrapolidaressulfuradoa1.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidaressulfuradoa2.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidaressulfuradoa3.png')]
  }
};

function createPicker(stage,id){
  let picker=document.getElementById(id);
  if(picker)return picker;
  picker=document.createElement('div');
  picker.id=id;
  picker.className='tor-btc-angle-picker';
  picker.setAttribute('role','group');
  picker.innerHTML='<small>Ângulos</small>';
  stage.appendChild(picker);
  return picker;
}

function renderPicker(picker,urls,selected,onSelect,label){
  picker.setAttribute('aria-label','Ângulos da barra '+label);
  picker.innerHTML='<small>Ângulos</small>';
  urls.forEach((src,index)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='tor-btc-angle-btn'+(index===selected?' is-active':'');
    btn.setAttribute('aria-label','Ver ângulo '+(index+1));
    btn.setAttribute('aria-pressed',index===selected?'true':'false');
    const img=document.createElement('img');
    img.src=src;
    img.alt='';
    img.loading='lazy';
    img.decoding='async';
    btn.appendChild(img);
    btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();onSelect(index);});
    picker.appendChild(btn);
  });
}

function setImage(image,src,alt,meta){
  if(!image||!src)return;
  if(image.src!==src){
    image.src=src;
    image.removeAttribute('srcset');
  }
  image.alt=alt;
  if(meta)meta.textContent='Ângulo selecionado';
}

function releaseForcing(setter){
  if(typeof queueMicrotask==='function')queueMicrotask(setter);
  else Promise.resolve().then(setter);
}

function initProductPage(){
  const root=document.getElementById('barra-trefilada');
  if(!root)return;
  const stage=root.querySelector('.hf-stage');
  const image=document.getElementById('bfImage');
  const meta=document.getElementById('bfCaptionMeta');
  if(!stage||!image)return;
  const picker=createPicker(stage,'bfBtcAnglePicker');
  let angle=0;
  let finish='trefilada';
  let variant='';
  let forcing=false;

  function currentKind(){
    return root.querySelector('.hf-family-tab.is-active')?.dataset.bfKind||root.dataset.initialKind||'btc';
  }
  function currentFinish(){
    const finishPicker=document.getElementById('bfImageVariants');
    if(!finishPicker)return finish;
    const buttons=Array.from(finishPicker.querySelectorAll('.hf-image-variant'));
    const active=buttons.findIndex(b=>b.classList.contains('is-active'));
    return active===1?'polida':'trefilada';
  }
  function gallery(){return GALLERIES[variant]||null;}
  function desired(){const g=gallery();return g?g[finish][angle]:'';}

  function sync(resetAngle=false){
    const nextVariant=currentKind();
    const g=GALLERIES[nextVariant];
    picker.hidden=!g;
    if(!g)return;
    if(nextVariant!==variant){variant=nextVariant;resetAngle=true;}
    const nextFinish=currentFinish();
    if(nextFinish!==finish){finish=nextFinish;resetAngle=true;}
    if(resetAngle)angle=0;
    renderPicker(picker,g[finish],angle,index=>{angle=index;sync(false);},g.label);
    const src=desired();
    forcing=true;
    setImage(image,src,'Barra '+g.label+' '+(finish==='polida'?'polida':'trefilada')+' · ângulo '+(angle+1),meta);
    releaseForcing(()=>{forcing=false;});
  }

  root.addEventListener('click',e=>{
    if(e.target.closest('[data-bf-kind]')||e.target.closest('#bfImageVariants .hf-image-variant')){
      releaseForcing(()=>sync(true));
    }
  });

  const obs=new MutationObserver(()=>{
    if(forcing)return;
    const k=currentKind();
    if(!GALLERIES[k]){picker.hidden=true;return;}
    if(k!==variant){variant=k;angle=0;}
    const nextFinish=currentFinish();
    if(nextFinish!==finish){finish=nextFinish;angle=0;}
    const src=desired();
    if(image.src!==src)sync(false);
  });
  obs.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['class','src']});

  setTimeout(()=>sync(true),160);
}

function init(){initProductPage();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,120),{once:true});
else setTimeout(init,120);
})();
