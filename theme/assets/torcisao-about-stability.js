(function(){
  'use strict';

  function applyYearLabels(){
    var buttons = document.querySelectorAll('body.home .tor-year-btn');
    if(!buttons.length) return false;

    buttons.forEach(function(btn){
      var span = btn.querySelector('span');
      var label = span ? span.textContent.trim() : '';
      if(label) btn.setAttribute('data-year-label', label);
    });

    /* Força um repaint leve sem mudar largura/scrollbar da página. */
    var shell = document.querySelector('body.home .tor-timeline-shell');
    if(shell){
      shell.classList.add('is-layout-syncing');
      void shell.offsetWidth;
      requestAnimationFrame(function(){ shell.classList.remove('is-layout-syncing'); });
    }
    return true;
  }

  function boot(){
    if(applyYearLabels()) return;

    /* O bloco é montado pelo script de Quem Somos. Observamos apenas até ele existir. */
    var target = document.getElementById('quem-somos') || document.body;
    var observer = new MutationObserver(function(){
      if(applyYearLabels()) observer.disconnect();
    });
    observer.observe(target,{childList:true,subtree:true});

    setTimeout(function(){
      applyYearLabels();
      observer.disconnect();
    },1200);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded',boot,{once:true});
  } else {
    boot();
  }
})();
