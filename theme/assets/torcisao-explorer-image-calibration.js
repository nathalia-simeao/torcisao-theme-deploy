(function(){
'use strict';
const q=(s,c=document)=>c.querySelector(s);
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

function init(){
  const wrap=q('#tpeImageWrap');
  const image=q('#tpeImage');
  const lens=q('#tpeLens');
  const label=q('#tpeZoomLabel');
  const stage=q('#tpeStage');
  const lightbox=q('.tpe-lightbox');
  if(!wrap||!image||!lens||!stage)return;

  let lensZoom=2.3;
  let lastClient=null;
  let moveRaf=0;

  function stageZoom(){
    const raw=(label?.textContent||'1').replace('×','').replace(',','.').trim();
    const n=parseFloat(raw);
    return Number.isFinite(n)?n:1;
  }

  function imageRect(){
    return image.getBoundingClientRect();
  }

  function isOverRenderedImage(clientX,clientY){
    const r=imageRect();
    return r.width>1&&r.height>1&&clientX>=r.left&&clientX<=r.right&&clientY>=r.top&&clientY<=r.bottom;
  }

  function hideLens(){
    lens.classList.remove('is-visible');
  }

  /*
   * Mapeamento 1:1 entre cursor e bitmap exibido.
   * A referência é o getBoundingClientRect() REAL da imagem já renderizada,
   * nunca o tamanho da coluna/painel.
   */
  function paintLens(clientX,clientY){
    const ir=imageRect();
    if(ir.width<2||ir.height<2||clientX<ir.left||clientX>ir.right||clientY<ir.top||clientY>ir.bottom){
      hideLens();
      return;
    }

    const wr=wrap.getBoundingClientRect();
    const px=clamp((clientX-ir.left)/ir.width,0,1);
    const py=clamp((clientY-ir.top)/ir.height,0,1);
    const localX=clientX-wr.left;
    const localY=clientY-wr.top;

    lens.style.left=localX+'px';
    lens.style.top=localY+'px';
    lens.dataset.zoom=lensZoom.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'×';
    lens.style.backgroundImage=`url("${image.currentSrc||image.src}")`;

    const bgW=ir.width*lensZoom;
    const bgH=ir.height*lensZoom;
    const bgX=(lens.offsetWidth/2)-(px*bgW);
    const bgY=(lens.offsetHeight/2)-(py*bgH);

    lens.style.backgroundSize=`${bgW}px ${bgH}px`;
    lens.style.backgroundPosition=`${bgX}px ${bgY}px`;
    lens.classList.add('is-visible');
  }

  /*
   * Mantém o produto no mesmo centro e preserva apenas o leve início de giro
   * aplicado pelo efeito pré-3D através de variáveis CSS.
   */
  function keepProductCentered(){
    const z=stageZoom();
    image.style.transform=`perspective(1200px) rotateX(var(--tpe-turn-x,0deg)) rotateY(var(--tpe-turn-y,0deg)) scale(${z})`;
  }

  wrap.addEventListener('pointermove',function(e){
    if(window.innerWidth<768||matchMedia('(pointer:coarse)').matches)return;
    e.stopImmediatePropagation();
    lastClient={x:e.clientX,y:e.clientY};
    cancelAnimationFrame(moveRaf);
    keepProductCentered();
    moveRaf=requestAnimationFrame(()=>paintLens(e.clientX,e.clientY));
  },true);

  wrap.addEventListener('wheel',function(e){
    if(window.innerWidth<768||matchMedia('(pointer:coarse)').matches)return;
    if(!isOverRenderedImage(e.clientX,e.clientY))return;
    e.preventDefault();
    e.stopImmediatePropagation();
    lastClient={x:e.clientX,y:e.clientY};
    lensZoom=clamp(lensZoom+(e.deltaY<0?.22:-.22),1.35,4.8);
    paintLens(e.clientX,e.clientY);
  },{capture:true,passive:false});

  wrap.addEventListener('pointerleave',function(){
    cancelAnimationFrame(moveRaf);
    lastClient=null;
    keepProductCentered();
    hideLens();
  },true);

  image.addEventListener('load',function(){
    keepProductCentered();
    hideLens();
    if(lastClient)requestAnimationFrame(()=>paintLens(lastClient.x,lastClient.y));
  });

  /* Mantém painel e modal com a mesma linha e o mesmo enquadramento-base. */
  function syncLightbox(){
    if(!lightbox)return;
    lightbox.dataset.line=stage.dataset.line||'';
    const lbImg=q('.tpe-lightbox-image',lightbox);
    const lbLabel=q('[data-tpe-lb-label]',lightbox);
    if(lbImg&&lightbox.classList.contains('is-open')){
      lbImg.style.transform='scale(1)';
      if(lbLabel)lbLabel.textContent='1,0×';
    }
  }

  wrap.addEventListener('click',()=>requestAnimationFrame(syncLightbox),true);
  document.addEventListener('click',function(e){
    const tab=e.target.closest?.('.tpe-line-tab');
    if(tab&&lightbox)lightbox.dataset.line=tab.dataset.tpeLine||'';
  },true);
  if(lightbox)new MutationObserver(syncLightbox).observe(lightbox,{attributes:true,attributeFilter:['class']});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
