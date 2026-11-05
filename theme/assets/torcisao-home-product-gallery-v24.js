(function(){
'use strict';

if(document.documentElement.dataset.torHomeProductGalleryV24==='1')return;
document.documentElement.dataset.torHomeProductGalleryV24='1';

const MEDIA='https://torcisao.com.br/wp-content/uploads/2026/09/';

function thumbnailUrl(src){
  return String(src||'').replace(/\.png(?:\?.*)?$/i,'-150x150.png');
}
function displayUrl(src){
  const value=String(src||'');
  const mobile=window.matchMedia&&window.matchMedia('(max-width:767px)').matches;
  if(/\/barra[^/]+a[123]\.png$/i.test(value))return value.replace(/\.png$/i,mobile?'-300x300.png':'-768x768.png');
  if(/\/(arametrefiladorolo|arametrefiladospider|aramespidera1|aramespidera2)\.png$/i.test(value))return value.replace(/\.png$/i,mobile?'-300x300.png':'-768x768.png');
  if(/\/(aramera1|aramera2)\.png$/i.test(value))return mobile?value.replace(/\.png$/i,'-300x300.png'):value;
  if(/\/(baixacamada|altacamada)\.png$/i.test(value))return value.replace(/\.png$/i,mobile?'-110x300.png':'-375x1024.png');
  if(/\/hasteinteirapeca\.png$/i.test(value))return value.replace(/\.png$/i,mobile?'-200x300.png':'-768x1152.png');
  if(/\/conjunto-de-hastes\.png$/i.test(value))return value.replace(/\.png$/i,mobile?'-300x225.png':'-768x576.png');
  return value;
}
function intrinsicSize(src){
  const value=String(src||'');
  const m=value.match(/-(\d+)x(\d+)\.png$/i);
  return m?[Number(m[1]),Number(m[2])]:null;
}

const DATA={
  arame:{
    pickerId:'tpeArameAnglePicker',pickerClass:'tor-arame-angle-picker',buttonClass:'tor-arame-angle-btn',heading:'Opções',showPicker:true,
    items(state){
      const map={
        rolo:[(window.TorcisaoImg||String)(MEDIA+'arametrefiladorolo.png'),(window.TorcisaoImg||String)(MEDIA+'aramera1.png'),(window.TorcisaoImg||String)(MEDIA+'aramera2.png')],
        spider:[(window.TorcisaoImg||String)(MEDIA+'arametrefiladospider.png'),(window.TorcisaoImg||String)(MEDIA+'aramespidera1.png'),(window.TorcisaoImg||String)(MEDIA+'aramespidera2.png')]
      };
      return map[state.view]||map.spider;
    },
    signature(state){return ['arame',state.variant||'btc',state.view||'spider'].join('|');},
    alt(state,index){return 'Arame '+String(state.variant||'btc').toUpperCase()+' · '+(state.view==='rolo'?'Rolo':'Spider')+' · opção '+(index+1);}
  },
  barra:{
    pickerId:'tpeBtcAnglePicker',pickerClass:'tor-btc-angle-picker',buttonClass:'tor-btc-angle-btn',heading:'Ângulos',showPicker:true,
    items(state){
      const map={
        btc:{trefilada:[(window.TorcisaoImg||String)(MEDIA+'barratrefiladabtca1.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladabtca2.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladabtca3.png')],polida:[(window.TorcisaoImg||String)(MEDIA+'barrapolidabtca1.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidabtca2.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidabtca3.png')]},
        mtc:{trefilada:[(window.TorcisaoImg||String)(MEDIA+'barratrefiladamtca1.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladamtca2.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladamtca3.png')],polida:[(window.TorcisaoImg||String)(MEDIA+'barrapolidamtca1.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidamtca2.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidamtca3.png')]},
        atc:{trefilada:[(window.TorcisaoImg||String)(MEDIA+'barratrefiladaatca1.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladaatca2.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladaatca3.png')],polida:[(window.TorcisaoImg||String)(MEDIA+'barrapolidaatca1.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidaatca2.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidaatca3.png')]},
        ressulfurado:{trefilada:[(window.TorcisaoImg||String)(MEDIA+'barratrefiladaressulfuradoa1.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladaressulfuradoa2.png'),(window.TorcisaoImg||String)(MEDIA+'barratrefiladaressulfuradoa3.png')],polida:[(window.TorcisaoImg||String)(MEDIA+'barrapolidaressulfuradoa1.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidaressulfuradoa2.png'),(window.TorcisaoImg||String)(MEDIA+'barrapolidaressulfuradoa3.png')]}
      };
      const variant=map[state.variant]||map.btc;
      return variant[state.finish==='polida'?'polida':'trefilada'];
    },
    signature(state){return ['barra',state.variant||'btc',state.finish||'trefilada'].join('|');},
    alt(state,index){return 'Barra '+String(state.variant||'btc').toUpperCase()+' · '+(state.finish==='polida'?'Trefilada polida':'Trefilada')+' · ângulo '+(index+1);}
  },
  haste:{
    pickerId:'tpeHasteAnglePicker',pickerClass:'tor-haste-angle-picker',buttonClass:'tor-haste-angle-btn',heading:'Opções',showPicker:true,
    items(state){
      const first=state.variant==='alta'?(window.TorcisaoImg||String)(MEDIA+'altacamada.png'):(window.TorcisaoImg||String)(MEDIA+'baixacamada.png');
      return [first,(window.TorcisaoImg||String)(MEDIA+'hasteinteirapeca.png'),(window.TorcisaoImg||String)(MEDIA+'conjunto-de-hastes.png')];
    },
    signature(state){return ['haste',state.variant||'baixa'].join('|');},
    alt(state,index){return 'Haste de aterramento '+(state.variant==='alta'?'Alta Camada':'Baixa Camada')+' · opção '+(index+1);}
  },
  conectores:{
    pickerId:'tpeConnectorGalleryPicker',pickerClass:'tor-connector-gallery-picker',buttonClass:'tor-connector-gallery-btn',heading:'',showPicker:false,
    items(state){
      const map={
        'olhal-simples':(window.TorcisaoImg||String)(MEDIA+'olhalsimples.png'),
        'olhal-reforcado':(window.TorcisaoImg||String)(MEDIA+'olhalreforcado.png'),
        'grampo-simples':(window.TorcisaoImg||String)(MEDIA+'formatoUsimples.png'),
        'grampo-reforcado':(window.TorcisaoImg||String)(MEDIA+'formatoUreforcado.png')
      };
      return [map[state.variant]||map['olhal-simples']];
    },
    signature(state){return ['conectores',state.variant||'olhal-simples'].join('|');},
    alt(state){return 'Conector Torcisão · '+String(state.variant||'olhal-simples').replaceAll('-',' ');}
  }
};

function init(){
  const section=document.getElementById('produtos');
  const stage=document.getElementById('tpeStage');
  const image=document.getElementById('tpeImage');
  if(!section||!stage||!image)return;

  let activeSignature='';
  let selected=0;
  let frame=0;
  let desiredSrc='';
  let desiredAlt='';
  let revealToken=0;

  image.style.transition='opacity .12s ease';

  function activeLine(){return section.querySelector('.tpe-line-tab.is-active')?.dataset.tpeLine||'';}
  function activeValue(key){return section.querySelector('.tpe-option.is-active[data-tpe-key="'+key+'"]')?.dataset.tpeValue||'';}
  function state(){return {line:activeLine(),variant:activeValue('variant'),view:activeValue('view'),finish:activeValue('finish')};}
  function sameUrl(a,b){try{return new URL(a,location.href).href===new URL(b,location.href).href;}catch(e){return a===b;}}
  function hideImage(){image.style.opacity='0';section.classList.remove('tor-gallery-ready');}
  function revealImage(src,token){
    const done=()=>{
      if(token!==revealToken||!sameUrl(image.src,src)||!sameUrl(desiredSrc,src))return;
      requestAnimationFrame(()=>{
        if(token!==revealToken||!sameUrl(image.src,src)||!sameUrl(desiredSrc,src))return;
        image.style.opacity='1';
        section.classList.add('tor-gallery-ready');
      });
    };
    if(image.complete)done();
    else image.addEventListener('load',done,{once:true});
  }
  function applyImage(src,alt){
    if(!src)return;
    desiredSrc=src;desiredAlt=alt||'';
    const token=++revealToken;
    if(!sameUrl(image.src,src)){
      image.src=src;
      image.removeAttribute('srcset');
    }
    image.alt=desiredAlt;
    const dims=intrinsicSize(src);
    if(dims){image.width=dims[0];image.height=dims[1];}
    revealImage(src,token);
  }
  function pickerFor(line){
    const cfg=DATA[line];if(!cfg||!cfg.showPicker)return null;
    let picker=document.getElementById(cfg.pickerId);
    if(!picker){picker=document.createElement('div');picker.id=cfg.pickerId;picker.className=cfg.pickerClass;picker.setAttribute('role','group');stage.appendChild(picker);}
    return picker;
  }
  function hideAll(except=''){
    Object.entries(DATA).forEach(([line,cfg])=>{
      const picker=document.getElementById(cfg.pickerId);
      if(picker)picker.hidden=line!==except||!cfg.showPicker;
    });
  }
  function renderPicker(line,cfg,items){
    const picker=pickerFor(line);if(!picker)return;
    picker.hidden=items.length<2;
    picker.setAttribute('aria-label',cfg.heading+' do produto selecionado');
    picker.innerHTML='<small>'+cfg.heading+'</small>';
    items.forEach((src,index)=>{
      const btn=document.createElement('button');
      btn.type='button';btn.className=cfg.buttonClass+(index===selected?' is-active':'');
      btn.setAttribute('aria-label',(cfg.heading==='Ângulos'?'Ver ângulo ':'Ver opção ')+(index+1));
      btn.setAttribute('aria-pressed',index===selected?'true':'false');
      const thumb=document.createElement('img');thumb.src=thumbnailUrl(src);thumb.alt='';thumb.loading='lazy';thumb.decoding='async';thumb.width=150;thumb.height=150;btn.appendChild(thumb);
      btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();selected=index;hideImage();sync(false);});
      picker.appendChild(btn);
    });
  }
  function sync(resetOnSignature=true){
    const s=state();const cfg=DATA[s.line];
    if(!cfg){activeSignature='';selected=0;desiredSrc='';hideAll();image.style.opacity='1';section.classList.add('tor-gallery-ready');return;}
    const signature=cfg.signature(s);
    if(resetOnSignature&&signature!==activeSignature)selected=0;
    activeSignature=signature;
    const items=cfg.items(s);
    if(selected>=items.length)selected=0;
    hideAll(cfg.showPicker?s.line:'');
    renderPicker(s.line,cfg,items);
    applyImage(displayUrl(items[selected]),cfg.alt(s,selected));
  }
  function schedule(reset=true){
    cancelAnimationFrame(frame);
    frame=requestAnimationFrame(()=>{frame=0;sync(reset);});
  }

  /* Captura a troca antes do explorador pintar a foto-base antiga. */
  section.addEventListener('click',e=>{
    if(e.target.closest('.tpe-line-tab,.tpe-option')){
      hideImage();
      schedule(true);
    }
  },true);

  /* A galeria é a fonte de verdade. Se outro script terminar uma troca assíncrona
     depois dela e tentar recolocar uma foto antiga, corrigimos sem deixar o usuário ver. */
  const imageObserver=new MutationObserver(()=>{
    if(!desiredSrc)return;
    if(!sameUrl(image.src,desiredSrc)){
      hideImage();
      schedule(false);
      return;
    }
    image.alt=desiredAlt;
  });
  imageObserver.observe(image,{attributes:true,attributeFilter:['src','srcset']});

  hideImage();
  sync(true);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
