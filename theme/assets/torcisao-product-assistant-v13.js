(function(){
'use strict';

/* Captura o endereço enquanto este arquivo ainda é o currentScript. */
const assistantScriptSrc=document.currentScript?.src||'';

/* ============================================================
 * THEO · memória de sessão no navegador
 * Compartilha contexto entre Home, Arame, Barra e Haste sem expor regras
 * privadas. A memória expira após 12h de inatividade.
 * ============================================================ */
(function installTheoMemoryBridge(){
  if(window.__TORCISAO_THEO_MEMORY_BRIDGE__)return;
  window.__TORCISAO_THEO_MEMORY_BRIDGE__=true;
  const originalFetch=window.fetch.bind(window);
  const MEMORY_KEY='torcisao_theo_memory_v2';
  const SESSION_KEY='torcisao_theo_session_v2';
  const TTL=12*60*60*1000;
  const MAX_TURNS=36;
  const MAX_TEXT=1000;
  const now=()=>Date.now();
  const cleanText=v=>String(v||'').replace(/\s+/g,' ').trim().slice(0,MAX_TEXT);
  const makeId=()=>{try{return crypto.randomUUID()}catch(e){return 'theo-'+now().toString(36)+'-'+Math.random().toString(36).slice(2)}};
  function readSession(){
    try{
      const raw=JSON.parse(localStorage.getItem(SESSION_KEY)||'null');
      if(raw&&raw.id&&Number(raw.updated_at)&&now()-Number(raw.updated_at)<TTL)return raw;
    }catch(e){}
    const fresh={id:makeId(),updated_at:now()};
    try{localStorage.setItem(SESSION_KEY,JSON.stringify(fresh));localStorage.removeItem(MEMORY_KEY)}catch(e){}
    return fresh;
  }
  function touchSession(session){session.updated_at=now();try{localStorage.setItem(SESSION_KEY,JSON.stringify(session))}catch(e){}}
  function readMemory(){
    try{
      const raw=JSON.parse(localStorage.getItem(MEMORY_KEY)||'[]');
      if(!Array.isArray(raw))return [];
      return raw.filter(x=>x&&['user','assistant'].includes(x.role)&&cleanText(x.content)).slice(-MAX_TURNS).map(x=>({role:x.role,content:cleanText(x.content)}));
    }catch(e){return []}
  }
  function writeMemory(turns){
    const safe=(Array.isArray(turns)?turns:[]).filter(x=>x&&['user','assistant'].includes(x.role)&&cleanText(x.content)).slice(-MAX_TURNS).map(x=>({role:x.role,content:cleanText(x.content)}));
    try{localStorage.setItem(MEMORY_KEY,JSON.stringify(safe))}catch(e){}
    return safe;
  }
  function mergeHistory(a,b){
    const out=[];
    [...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])].forEach(x=>{
      if(!x||!['user','assistant'].includes(x.role))return;
      const content=cleanText(x.content);if(!content)return;
      const last=out[out.length-1];
      if(last&&last.role===x.role&&last.content===content)return;
      out.push({role:x.role,content});
    });
    return out.slice(-MAX_TURNS);
  }
  window.TorcisaoTheoMemory={
    get:function(){return readMemory()},
    clear:function(){try{localStorage.removeItem(MEMORY_KEY);localStorage.removeItem(SESSION_KEY)}catch(e){}},
    session:function(){return readSession().id}
  };
  window.fetch=async function(input,init){
    const url=typeof input==='string'?input:(input&&input.url)||'';
    const isTheo=/\/torcisao\/v1\/application-assistant(?:\?|$)/.test(url);
    if(!isTheo||!init||String(init.method||'GET').toUpperCase()!=='POST')return originalFetch(input,init);
    let payload=null;
    try{payload=typeof init.body==='string'?JSON.parse(init.body):null}catch(e){}
    if(!payload||typeof payload!=='object')return originalFetch(input,init);
    const session=readSession();
    const stored=readMemory();
    const incoming=Array.isArray(payload.history)?payload.history:[];
    const merged=mergeHistory(stored,incoming);
    const query=cleanText(payload.query);
    payload.history=merged;
    payload.session_id=session.id;
    const nextInit=Object.assign({},init,{body:JSON.stringify(payload)});
    const response=await originalFetch(input,nextInit);
    try{
      const clone=response.clone();
      const data=await clone.json();
      const answer=cleanText(data?.answer||data?.error||'');
      let next=merged;
      if(query)next=mergeHistory(next,[{role:'user',content:query}]);
      if(answer)next=mergeHistory(next,[{role:'assistant',content:answer}]);
      writeMemory(next);touchSession(session);
    }catch(e){touchSession(session)}
    return response;
  };
})();

function frameAvatar(img,extraClass){
  if(!img||img.closest('.tor-theo-avatar-frame'))return;
  const frame=document.createElement('span');
  frame.className='tor-theo-avatar-frame'+(extraClass?' '+extraClass:'');
  img.parentNode.insertBefore(frame,img);
  frame.appendChild(img);
}

function standardizeAssistant(root){
  if(!root||root.dataset.torAssistantStandardized==='1')return;
  root.dataset.torAssistantStandardized='1';
  root.classList.add('tor-product-assistant-standard');
  frameAvatar(root.querySelector('.hf-assistant-identity .hf-assistant-avatar'),'tor-theo-avatar-frame--head');
  frameAvatar(root.querySelector('.hf-theo-chat-title img'),'tor-theo-avatar-frame--chat');
}

function loadBarraHomeTolerance(){
  if(!document.getElementById('barra-trefilada')||document.documentElement.dataset.torBarraToleranceV15==='1')return;
  if(!assistantScriptSrc)return;
  document.documentElement.dataset.torBarraToleranceV15='1';
  const base=new URL(assistantScriptSrc,location.href);
  const cssUrl=new URL(base.href);
  cssUrl.pathname=cssUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-barra-tolerance-home-v15.css');
  cssUrl.search='?v=20260907-1';
  if(!document.querySelector('link[data-tor-barra-tolerance-v15]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href=cssUrl.href;link.dataset.torBarraToleranceV15='1';document.head.appendChild(link);
  }
  const jsUrl=new URL(base.href);
  jsUrl.pathname=jsUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-barra-tolerance-home-v15.js');
  jsUrl.search='?v=20260907-2';
  if(!document.querySelector('script[data-tor-barra-tolerance-v15]')){
    const script=document.createElement('script');script.src=jsUrl.href;script.dataset.torBarraToleranceV15='1';document.body.appendChild(script);
  }
}

function loadHasteConnectors(){
  if(!document.getElementById('haste-aterramento')||document.documentElement.dataset.torHasteConnectorsV18==='1')return;
  if(!assistantScriptSrc)return;
  document.documentElement.dataset.torHasteConnectorsV18='1';
  const base=new URL(assistantScriptSrc,location.href);
  const cssUrl=new URL(base.href);
  cssUrl.pathname=cssUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-haste-connectors-v18.css');
  cssUrl.search='?v=20260907-1';
  if(!document.querySelector('link[data-tor-haste-connectors-v18]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href=cssUrl.href;link.dataset.torHasteConnectorsV18='1';document.head.appendChild(link);
  }
  const jsUrl=new URL(base.href);
  jsUrl.pathname=jsUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-haste-connectors-v18.js');
  jsUrl.search='?v=20260907-1';
  if(!document.querySelector('script[data-tor-haste-connectors-v18]')){
    const script=document.createElement('script');script.src=jsUrl.href;script.dataset.torHasteConnectorsV18='1';document.body.appendChild(script);
  }
}

function loadHasteGallery(){
  if((!document.getElementById('haste-aterramento')&&!document.getElementById('produtos'))||document.documentElement.dataset.torHasteGalleryV23==='1')return;
  if(!assistantScriptSrc)return;
  document.documentElement.dataset.torHasteGalleryV23='1';
  const base=new URL(assistantScriptSrc,location.href);
  const cssUrl=new URL(base.href);
  cssUrl.pathname=cssUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-haste-gallery-v23.css');
  cssUrl.search='?v=20260907-1';
  if(!document.querySelector('link[data-tor-haste-gallery-v23]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href=cssUrl.href;link.dataset.torHasteGalleryV23='1';document.head.appendChild(link);
  }
  const jsUrl=new URL(base.href);
  jsUrl.pathname=jsUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-haste-gallery-v23.js');
  jsUrl.search='?v=20260907-9';
  if(!document.querySelector('script[data-tor-haste-gallery-v23]')){
    const script=document.createElement('script');script.src=jsUrl.href;script.dataset.torHasteGalleryV23='1';document.body.appendChild(script);
  }
}

function loadBtcGallery(){
  if((!document.getElementById('barra-trefilada')&&!document.getElementById('produtos'))||document.documentElement.dataset.torBtcGalleryV20==='1')return;
  if(!assistantScriptSrc)return;
  document.documentElement.dataset.torBtcGalleryV20='1';
  const base=new URL(assistantScriptSrc,location.href);
  const cssUrl=new URL(base.href);
  cssUrl.pathname=cssUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-btc-gallery-v20.css');
  cssUrl.search='?v=20260907-2';
  if(!document.querySelector('link[data-tor-btc-gallery-v20]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href=cssUrl.href;link.dataset.torBtcGalleryV20='1';document.head.appendChild(link);
  }
  const jsUrl=new URL(base.href);
  jsUrl.pathname=jsUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-btc-gallery-v20.js');
  jsUrl.search='?v=20260907-8';
  if(!document.querySelector('script[data-tor-btc-gallery-v20]')){
    const script=document.createElement('script');script.src=jsUrl.href;script.dataset.torBtcGalleryV20='1';document.body.appendChild(script);
  }
}

function loadArameGallery(){
  if((!document.getElementById('arame-trefilado')&&!document.getElementById('produtos'))||document.documentElement.dataset.torArameGalleryV22==='1')return;
  if(!assistantScriptSrc)return;
  document.documentElement.dataset.torArameGalleryV22='1';
  const base=new URL(assistantScriptSrc,location.href);
  const cssUrl=new URL(base.href);
  cssUrl.pathname=cssUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-arame-gallery-v22.css');
  cssUrl.search='?v=20260907-2';
  if(!document.querySelector('link[data-tor-arame-gallery-v22]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href=cssUrl.href;link.dataset.torArameGalleryV22='1';document.head.appendChild(link);
  }
  const jsUrl=new URL(base.href);
  jsUrl.pathname=jsUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-arame-gallery-v22.js');
  jsUrl.search='?v=20260907-8';
  if(!document.querySelector('script[data-tor-arame-gallery-v22]')){
    const script=document.createElement('script');script.src=jsUrl.href;script.dataset.torArameGalleryV22='1';document.body.appendChild(script);
  }
}

/* Home: um único controlador para Arame, Barra e Haste. Evita três observers
   concorrendo pela mesma imagem do explorador e reduz o uso de memória. */
function loadHomeProductGallery(){
  if(!document.getElementById('produtos')||document.documentElement.dataset.torHomeProductGalleryV24==='1')return;
  if(!assistantScriptSrc)return;
  document.documentElement.dataset.torHomeProductGalleryV24='1';
  const base=new URL(assistantScriptSrc,location.href);
  const jsUrl=new URL(base.href);
  jsUrl.pathname=jsUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-home-product-gallery-v24.js');
  jsUrl.search='?v=20260907-1';
  if(!document.querySelector('script[data-tor-home-product-gallery-v24]')){
    const script=document.createElement('script');
    script.src=jsUrl.href;
    script.dataset.torHomeProductGalleryV24='1';
    document.body.appendChild(script);
  }
}

function loadProductStagePolish(){
  if(!document.querySelector('.hf-page')||document.documentElement.dataset.torProductStageV21==='1')return;
  if(!assistantScriptSrc)return;
  document.documentElement.dataset.torProductStageV21='1';
  const base=new URL(assistantScriptSrc,location.href);
  const cssUrl=new URL(base.href);
  cssUrl.pathname=cssUrl.pathname.replace(/torcisao-product-assistant-v13\.js$/,'torcisao-product-stage-v21.css');
  cssUrl.search='?v=20260907-1';
  if(!document.querySelector('link[data-tor-product-stage-v21]')){
    const link=document.createElement('link');link.rel='stylesheet';link.href=cssUrl.href;link.dataset.torProductStageV21='1';document.head.appendChild(link);
  }
}

function init(){
  ['hfAssistant','bfAssistant','afAssistant'].forEach(function(id){standardizeAssistant(document.getElementById(id));});
  loadBarraHomeTolerance();
  loadHasteConnectors();
  loadHasteGallery();
  loadBtcGallery();
  loadArameGallery();
  loadHomeProductGallery();
  loadProductStagePolish();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
