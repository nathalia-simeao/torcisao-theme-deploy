(function(){
  'use strict';

  function init(){
    var shell = document.querySelector('body.home .tor-timeline-shell');
    if(!shell || shell.dataset.mobileScrollReady === '1') return;

    shell.dataset.mobileScrollReady = '1';

    var bar = document.createElement('div');
    bar.className = 'tor-timeline-mobile-scrollbar';
    bar.setAttribute('aria-hidden','true');

    var thumb = document.createElement('span');
    thumb.className = 'tor-timeline-mobile-scrollbar-thumb';
    bar.appendChild(thumb);

    shell.insertAdjacentElement('afterend',bar);

    function update(){
      var maxScroll = Math.max(0, shell.scrollWidth - shell.clientWidth);
      var ratio = shell.scrollWidth > 0 ? shell.clientWidth / shell.scrollWidth : 1;
      var trackWidth = bar.clientWidth || 1;
      var thumbWidth = Math.max(28, Math.min(trackWidth, trackWidth * ratio));
      var maxThumbMove = Math.max(0, trackWidth - thumbWidth);
      var progress = maxScroll > 0 ? shell.scrollLeft / maxScroll : 0;

      thumb.style.width = thumbWidth + 'px';
      thumb.style.transform = 'translate3d(' + (maxThumbMove * progress) + 'px,0,0)';
      bar.style.display = maxScroll > 2 ? 'block' : 'none';
    }

    shell.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update,{passive:true});

    if('ResizeObserver' in window){
      var ro = new ResizeObserver(update);
      ro.observe(shell);
      var timeline = shell.querySelector('.tor-timeline');
      if(timeline) ro.observe(timeline);
    }

    requestAnimationFrame(function(){
      update();
      requestAnimationFrame(update);
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
