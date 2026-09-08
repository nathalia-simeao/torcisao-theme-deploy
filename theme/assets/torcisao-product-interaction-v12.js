(function(){
'use strict';

const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

function readScale(image){
  const raw=getComputedStyle(image).getPropertyValue('--hf-zoom');
  const n=parseFloat(raw);
  return Number.isFinite(n)&&n>0?n:1;
}

function bindExactLens(wrapSelector,lensSelector,imageSelector){
  const wrap=document.querySelector(wrapSelector);
  const lens=document.querySelector(lensSelector);
  const image=document.querySelector(imageSelector);
  if(!wrap||!lens||!image||wrap.dataset.torExactLens==='1')return;

  wrap.dataset.torExactLens='1';
  lens.dataset.torExactLens='1';

  let factor=2.55;
  let lastEvent=null;
  let raf=0;

  function geometry(){
    const wr=wrap.getBoundingClientRect();
    const scale=readScale(image);
    const baseW=image.clientWidth||image.offsetWidth||1;
    const baseH=image.clientHeight||image.offsetHeight||1;
    const visibleW=baseW*scale;
    const visibleH=baseH*scale;
    const left=(wrap.clientWidth-visibleW)/2;
    const top=(wrap.clientHeight-visibleH)/2;
    return {wr,scale,visibleW,visibleH,left,top};
  }

  function hide(){
    lens.classList.remove('is-visible');
    wrap.style.setProperty('--tor-tilt-x','0deg');
    wrap.style.setProperty('--tor-tilt-y','0deg');
  }

  function paint(){
    raf=0;
    if(!lastEvent||window.innerWidth<768||matchMedia('(pointer:coarse)').matches){hide();return;}

    const g=geometry();
    const px=lastEvent.clientX-g.wr.left;
    const py=lastEvent.clientY-g.wr.top;
    const x=px-g.left;
    const y=py-g.top;

    if(x<0||y<0||x>g.visibleW||y>g.visibleH){hide();return;}

    /* O efeito 3D continua leve, mas não participa da matemática da lupa. */
    const nx=clamp(x/g.visibleW,0,1);
    const ny=clamp(y/g.visibleH,0,1);
    wrap.style.setProperty('--tor-tilt-y',((nx-.5)*3.6).toFixed(2)+'deg');
    wrap.style.setProperty('--tor-tilt-x',((.5-ny)*3.6).toFixed(2)+'deg');

    const lensW=lens.clientWidth||136;
    const lensH=lens.clientHeight||136;

    lens.style.left=px+'px';
    lens.style.top=py+'px';
    lens.style.backgroundImage=`url("${image.currentSrc||image.src}")`;
    lens.style.backgroundSize=`${g.visibleW*factor}px ${g.visibleH*factor}px`;
    lens.style.backgroundPosition=`${lensW/2-x*factor}px ${lensH/2-y*factor}px`;
    lens.classList.add('is-visible');
  }

  function schedule(e){
    lastEvent=e;
    if(raf)cancelAnimationFrame(raf);
    raf=requestAnimationFrame(paint);
  }

  /* Registrados por último para sobrescrever os handlers antigos sem desmontá-los. */
  wrap.addEventListener('pointermove',schedule);
  wrap.addEventListener('mousemove',schedule);
  wrap.addEventListener('pointerleave',()=>{lastEvent=null;hide()});
  wrap.addEventListener('mouseleave',()=>{lastEvent=null;hide()});

  /* Intercepta o wheel antes da versão antiga, mantendo o foco exatamente no cursor. */
  wrap.addEventListener('wheel',function(e){
    if(window.innerWidth<768||matchMedia('(pointer:coarse)').matches||!lens.classList.contains('is-visible'))return;
    e.preventDefault();
    e.stopImmediatePropagation();
    factor=clamp(factor+(e.deltaY<0?.22:-.22),1.55,4.8);
    if(lastEvent)paint();
  },{passive:false,capture:true});

  /* Recalibra ao trocar a imagem/variação. */
  image.addEventListener('load',()=>{if(lastEvent)schedule(lastEvent)});
}

function init(){
  bindExactLens('#hfImageWrap','#hfLens','#hfImage');
  bindExactLens('#afImageWrap','#afLens','#afImage');
  bindExactLens('#bfImageWrap','#bfLens','#bfImage');
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,80),{once:true});
else setTimeout(init,80);
})();
