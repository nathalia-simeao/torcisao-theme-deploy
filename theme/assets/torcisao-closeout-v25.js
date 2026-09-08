(function(){
'use strict';

const q=(s,c=document)=>c.querySelector(s);
const qa=(s,c=document)=>Array.from(c.querySelectorAll(s));

function focusables(root){
  if(!root)return [];
  return qa('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',root)
    .filter(el=>el.offsetParent!==null&&el.getAttribute('aria-hidden')!=='true');
}

function trapTab(e,root){
  if(e.key!=='Tab')return;
  const items=focusables(root);
  if(!items.length)return;
  const first=items[0],last=items[items.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
}

function initSkipLink(){
  const main=q('main');
  if(!main||q('.tor-skip-link'))return;
  if(!main.id)main.id='tor-main-content';
  if(!main.hasAttribute('tabindex'))main.setAttribute('tabindex','-1');
  const link=document.createElement('a');
  link.className='tor-skip-link';
  link.href='#'+main.id;
  link.textContent='Ir para o conteúdo principal';
  link.addEventListener('click',()=>setTimeout(()=>main.focus({preventScroll:true}),0));
  document.body.insertBefore(link,document.body.firstChild);
}

function initMobileMenuA11y(){
  const panel=q('#torMobilePanel');
  if(!panel)return;
  const openers=qa('[data-menu-open]');
  const close=q('[data-menu-close]',panel);
  let lastTrigger=null;
  let wasOpen=panel.classList.contains('is-open');

  panel.setAttribute('aria-hidden',wasOpen?'false':'true');
  openers.forEach(btn=>{
    btn.setAttribute('aria-controls','torMobilePanel');
    btn.setAttribute('aria-expanded',wasOpen?'true':'false');
    btn.addEventListener('click',()=>{lastTrigger=btn;},{capture:true});
  });

  function sync(){
    const open=panel.classList.contains('is-open');
    panel.setAttribute('aria-hidden',open?'false':'true');
    openers.forEach(btn=>btn.setAttribute('aria-expanded',open?'true':'false'));
    if(open&&!wasOpen)setTimeout(()=>close?.focus(),0);
    if(!open&&wasOpen&&lastTrigger)setTimeout(()=>lastTrigger?.focus(),0);
    wasOpen=open;
  }

  new MutationObserver(sync).observe(panel,{attributes:true,attributeFilter:['class']});
  panel.addEventListener('keydown',e=>trapTab(e,panel));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&panel.classList.contains('is-open')){
      e.preventDefault();
      close?.click();
    }
  });
}

function initLanguageA11y(){
  const modal=q('#torLanguageModal');
  if(!modal)return;
  const dialog=q('[role="dialog"]',modal)||modal;
  const openers=qa('[data-language-open],[data-footer-language-open]');
  let lastTrigger=null;
  let wasOpen=modal.classList.contains('is-open');

  openers.forEach(btn=>{
    btn.setAttribute('aria-haspopup','dialog');
    btn.setAttribute('aria-controls','torLanguageModal');
    btn.addEventListener('click',()=>{lastTrigger=btn;},{capture:true});
  });

  function sync(){
    const open=modal.classList.contains('is-open');
    modal.setAttribute('aria-hidden',open?'false':'true');
    if(open&&!wasOpen){
      const close=q('[data-language-close]',modal);
      setTimeout(()=>close?.focus(),0);
    }
    if(!open&&wasOpen&&lastTrigger)setTimeout(()=>lastTrigger?.focus(),0);
    wasOpen=open;
  }

  new MutationObserver(sync).observe(modal,{attributes:true,attributeFilter:['class']});
  dialog.addEventListener('keydown',e=>trapTab(e,dialog));
}

function initDialogLabels(){
  qa('[role="dialog"]').forEach(dialog=>{
    if(dialog.hasAttribute('aria-label')||dialog.hasAttribute('aria-labelledby'))return;
    const title=q('h1,h2,h3,[data-dialog-title]',dialog);
    if(!title)return;
    if(!title.id)title.id='tor-dialog-title-'+Math.random().toString(36).slice(2,9);
    dialog.setAttribute('aria-labelledby',title.id);
  });
}

function initQualityPolicyA11y(){
  const items=qa('.politica-qualidade-container .politica-item');
  if(!items.length)return;
  const mobile=matchMedia('(max-width:768px)').matches;
  const title=q('.banner-ajustado .page-main-title');
  if(mobile&&title)title.textContent='Toque nas letras e leia a nossa Política de Qualidade';

  items.forEach(item=>{
    item.setAttribute('role','button');
    item.setAttribute('tabindex','0');
    item.setAttribute('aria-expanded',item.querySelector('.frase-hover')?'true':'false');
    item.addEventListener('click',()=>setTimeout(()=>item.setAttribute('aria-expanded',item.querySelector('.frase-hover')?'true':'false'),0));
    item.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();item.click();}
    });
  });
}

function init(){
  initSkipLink();
  initMobileMenuA11y();
  initLanguageA11y();
  initDialogLabels();
  initQualityPolicyA11y();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
