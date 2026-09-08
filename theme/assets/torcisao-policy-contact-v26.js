(function(){
'use strict';

const scriptSrc=document.currentScript?.src||'';
const privacy=document.querySelector('.privacy-intro-card');
const cookies=document.querySelector('.cookie-intro-card');
if(!privacy&&!cookies)return;

const canonical='https://torcisao.com.br/';
const display='torcisao.com.br';
const scoped=document.querySelectorAll('.privacy-intro-card a,.cookie-intro-card a,.contact-card a');

scoped.forEach(a=>{
  const raw=(a.getAttribute('href')||'').trim();
  if(!raw||raw.toLowerCase().startsWith('mailto:'))return;
  const haystack=(raw+' '+(a.textContent||'')).toLowerCase();
  if(haystack.includes('app.github.dev')||haystack.includes('localhost')||haystack.includes('127.0.0.1')||haystack.includes('torcisao.com.br')){
    a.setAttribute('href',canonical);
    a.textContent=display;
  }
});

/* As políticas têm texto jurídico extenso. Carregamos o complemento somente nelas. */
let attempts=0;
function bootLegal(){
  const i18n=window.TorcisaoI18n;
  if(!i18n){if(attempts++<30)setTimeout(bootLegal,60);return;}
  if(!['en','es'].includes(i18n.lang)||document.querySelector('script[data-tor-legal-i18n]'))return;

  if(typeof i18n.register!=='function'){
    i18n.register=function(extra){
      const list=Object.entries(extra||{}).sort((a,b)=>b[0].length-a[0].length);
      if(!list.length)return;
      const previous=i18n.translate.bind(i18n);
      i18n.translate=function(text){
        let out=previous(text);
        for(const [from,to] of list)if(from&&out.includes(from))out=out.split(from).join(to);
        return out;
      };
      const roots=document.querySelectorAll('.policy-content-section,.breadcrumb-bar');
      roots.forEach(root=>{
        const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
        let node;
        while((node=walker.nextNode())){
          if(!node.nodeValue||!node.nodeValue.trim()||node.parentElement?.closest('script,style'))continue;
          const next=i18n.translate(node.nodeValue);
          if(next!==node.nodeValue)node.nodeValue=next;
        }
      });
    };
  }

  if(!scriptSrc)return;
  const url=new URL(scriptSrc,location.href);
  url.pathname=url.pathname.replace(/torcisao-policy-contact-v26\.js$/,'torcisao-i18n-legal-v28.js');
  url.search='?v=20260907-1';
  const script=document.createElement('script');
  script.src=url.href;
  script.defer=true;
  script.dataset.torLegalI18n='1';
  document.body.appendChild(script);
}
bootLegal();
})();
