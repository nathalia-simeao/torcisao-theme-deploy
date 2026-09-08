(function(){
'use strict';

function clamp(v,min,max){return Math.max(min,Math.min(max,v));}

function init(){
  const stage=document.getElementById('tpeStage');
  const wrap=document.getElementById('tpeImageWrap');
  const image=document.getElementById('tpeImage');
  const zoomLabel=document.getElementById('tpeZoomLabel');
  const specs=document.getElementById('tpeSpecs');
  const infoTitle=document.getElementById('tpeInfoTitle');
  if(!stage||!wrap||!image)return;

  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=window.matchMedia&&window.matchMedia('(pointer: coarse)').matches;
  let raf=0;
  let lastPointer=null;

  function currentZoom(){
    const raw=(zoomLabel?.textContent||'1').replace('×','').replace(',','.').trim();
    const z=parseFloat(raw);
    return Number.isFinite(z)?z:1;
  }

  function applyTransform(){
    image.style.transform=`perspective(1200px) rotateX(var(--tpe-turn-x,0deg)) rotateY(var(--tpe-turn-y,0deg)) scale(${currentZoom()})`;
  }

  function resetDepth(){
    wrap.classList.remove('is-pre3d-active');
    stage.style.setProperty('--tpe-turn-x','0deg');
    stage.style.setProperty('--tpe-turn-y','0deg');
    stage.style.setProperty('--tpe-depth-x','0px');
    stage.style.setProperty('--tpe-depth-y','18px');
    stage.style.setProperty('--tpe-depth-soft-x','0px');
    stage.style.setProperty('--tpe-depth-soft-y','30px');
    stage.style.setProperty('--tpe-light-x','50%');
    stage.style.setProperty('--tpe-light-y','42%');
    stage.style.setProperty('--tpe-shadow-shift-x','0px');
    applyTransform();
  }

  function applyMotion(clientX,clientY){
    const r=wrap.getBoundingClientRect();
    if(r.width<2||r.height<2)return;

    const nx=clamp((clientX-r.left)/r.width,0,1);
    const ny=clamp((clientY-r.top)/r.height,0,1);
    const dx=nx-.5;
    const dy=ny-.5;

    /*
     * Pré-3D: não desloca a peça. Ela apenas inicia um giro muito leve,
     * predominantemente no eixo Y, como se o usuário começasse a contorná-la.
     */
    const turnY=(dx*3.2).toFixed(3)+'deg';
    const turnX=(-dy*.9).toFixed(3)+'deg';
    stage.style.setProperty('--tpe-turn-y',turnY);
    stage.style.setProperty('--tpe-turn-x',turnX);
    applyTransform();

    /* Luz acompanha o cursor e as sombras respondem no sentido oposto. */
    stage.style.setProperty('--tpe-light-x',(nx*100).toFixed(1)+'%');
    stage.style.setProperty('--tpe-light-y',(ny*100).toFixed(1)+'%');
    stage.style.setProperty('--tpe-depth-x',(-dx*12).toFixed(2)+'px');
    stage.style.setProperty('--tpe-depth-y',(17+(-dy*4)).toFixed(2)+'px');
    stage.style.setProperty('--tpe-depth-soft-x',(-dx*20).toFixed(2)+'px');
    stage.style.setProperty('--tpe-depth-soft-y',(30+(-dy*6)).toFixed(2)+'px');
    stage.style.setProperty('--tpe-shadow-shift-x',(dx*10).toFixed(2)+'px');
    wrap.classList.add('is-pre3d-active');
  }

  if(!reduce&&!coarse&&window.innerWidth>=768){
    document.addEventListener('pointermove',function(e){
      if(!wrap.contains(e.target))return;
      lastPointer={x:e.clientX,y:e.clientY};
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(function(){applyMotion(e.clientX,e.clientY);});
    },true);

    wrap.addEventListener('pointerenter',function(){wrap.classList.add('is-pre3d-active');},{capture:true,passive:true});
    wrap.addEventListener('pointerleave',function(){
      cancelAnimationFrame(raf);
      lastPointer=null;
      requestAnimationFrame(resetDepth);
    },{capture:true,passive:true});

    ['tpeZoomIn','tpeZoomOut','tpeReset'].forEach(function(id){
      document.getElementById(id)?.addEventListener('click',function(){
        requestAnimationFrame(function(){
          if(lastPointer)applyMotion(lastPointer.x,lastPointer.y);else resetDepth();
        });
      });
    });
  }

  /* Evita repetir o nome da linha no kicker e no título da coluna técnica. */
  function simplifyInfoTitle(){
    if(!infoTitle)return;
    const activeLine=document.querySelector('.tpe-line-tab.is-active')?.dataset.tpeLine||'';
    let title=(infoTitle.textContent||'').trim();
    const prefixes={
      arame:/^Arame\s+Trefilado\s*[·•\-:]\s*/i,
      barra:/^Barra\s+Trefilada\s*[·•\-:]\s*/i,
      haste:/^Haste\s+de\s+Aterramento\s*[·•\-:]\s*/i
    };
    const rx=prefixes[activeLine];
    if(rx){
      const compact=title.replace(rx,'').trim();
      if(compact&&compact!==title)infoTitle.textContent=compact;
    }
  }

  /* Corrige a referência comercial BTC no painel sem alterar o layout aprovado. */
  function patchBtcFacts(){
    if(!specs)return;
    const activeLine=document.querySelector('.tpe-line-tab.is-active')?.dataset.tpeLine||'';
    const title=(infoTitle?.textContent||'').toLowerCase();
    if((activeLine!=='arame'&&activeLine!=='barra')||!title.includes('baixo carbono'))return;

    let row=Array.from(specs.children).find(function(el){
      return (el.querySelector('small')?.textContent||'').trim().toLowerCase()==='faixa de aço';
    });

    if(!row&&activeLine==='barra'){
      row=document.createElement('div');
      const small=document.createElement('small');
      const strong=document.createElement('strong');
      small.textContent='Faixa de aço';
      strong.textContent='1004 a 1020';
      row.appendChild(small);row.appendChild(strong);
      specs.prepend(row);
      return;
    }

    const value=row?.querySelector('strong');
    if(value&&value.textContent.trim()!=='1004 a 1020')value.textContent='1004 a 1020';
  }

  function polishPanelCopy(){
    simplifyInfoTitle();
    patchBtcFacts();
  }

  polishPanelCopy();
  if(specs){
    new MutationObserver(function(){patchBtcFacts();}).observe(specs,{childList:true,subtree:true,characterData:true});
  }
  document.addEventListener('click',function(e){
    if(e.target.closest?.('.tpe-line-tab,.tpe-option'))requestAnimationFrame(polishPanelCopy);
  },true);

  resetDepth();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
