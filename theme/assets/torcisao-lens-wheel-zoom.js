(function(){
'use strict';
const q=(s,c=document)=>c.querySelector(s);
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

function bindLens(config){
  const wrap=q(config.wrap),lens=q(config.lens),img=q(config.img);
  if(!wrap||!lens||!img)return;

  let factor=config.base||2.3;
  let lastX=null,lastY=null;

  function applyLens(){
    if(lastX===null||lastY===null||!lens.classList.contains('is-visible'))return;
    const r=wrap.getBoundingClientRect();
    const x=clamp(lastX,0,r.width),y=clamp(lastY,0,r.height);

    lens.dataset.zoom=factor.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'×';

    if(config.mode==='stage'){
      lens.style.backgroundImage=`url("${img.currentSrc||img.src}")`;
      lens.style.backgroundSize=`${Math.max(r.width*factor,720)}px auto`;
      lens.style.backgroundPosition=`${clamp((x/r.width)*100,0,100)}% ${clamp((y/r.height)*100,0,100)}%`;
      return;
    }

    lens.style.backgroundImage=`url("${img.currentSrc||img.src}")`;
    lens.style.backgroundSize=`${Math.max(img.clientWidth*factor,1)}px ${Math.max(img.clientHeight*factor,1)}px`;
    const positionFactor=Math.max(.8,factor-.3);
    lens.style.backgroundPosition=`${-(x-r.width/2)*positionFactor+lens.clientWidth/2}px ${-(y-r.height/2)*positionFactor+lens.clientHeight/2}px`;
  }

  wrap.addEventListener('pointermove',function(e){
    if(window.innerWidth<768||matchMedia('(pointer:coarse)').matches)return;
    const r=wrap.getBoundingClientRect();
    lastX=e.clientX-r.left;lastY=e.clientY-r.top;
    requestAnimationFrame(applyLens);
  });

  wrap.addEventListener('wheel',function(e){
    if(window.innerWidth<768||matchMedia('(pointer:coarse)').matches)return;
    if(!lens.classList.contains('is-visible'))return;
    e.preventDefault();
    factor=clamp(factor+(e.deltaY<0?.22:-.22),config.min||1.35,config.max||4.8);
    applyLens();
  },{passive:false});

  wrap.addEventListener('mouseleave',function(){lastX=null;lastY=null;});
}

function init(){
  bindLens({wrap:'#thProductImageWrap',lens:'.th-product-lens',img:'#thProductImage',base:1.9,min:1.35,max:4.8,mode:'stage'});
  bindLens({wrap:'#hfImageWrap',lens:'#hfLens',img:'#hfImage',base:2.3,min:1.35,max:4.8});
  bindLens({wrap:'#afImageWrap',lens:'#afLens',img:'#afImage',base:2.3,min:1.35,max:4.8});
  bindLens({wrap:'#bfImageWrap',lens:'#bfLens',img:'#bfImage',base:2.3,min:1.35,max:4.8});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
