(function(){
'use strict';

const cfg=window.TORCISAO_I18N_CONFIG||{};
const requested=String(new URLSearchParams(location.search).get('lang')||'').toLowerCase();
const pathMatch=location.pathname.match(/^\/(en|es)(?:\/|$)/i);
const lang=['pt','en','es'].includes(requested)?requested:(pathMatch?pathMatch[1].toLowerCase():'pt');
const locale=({pt:'pt-BR',en:'en-US',es:'es-ES'}[lang]||'pt-BR');
const active=lang==='en'||lang==='es';
const isPreview=/localhost|127\.0\.0\.1|\.app\.github\.dev|\.githubpreview\.dev$/i.test(location.hostname);
const dictionary=new Map(Object.entries(cfg.map||{}));
const BRAND='Torcisão Trefilados';

const ROUTES={
  en:{'/':'/en/inicio-english/','/blog/':'/en/torcisao-trefilados-blog/','/politicadequalidade/':'/en/quality-policy/','/politicadeprivacidade/':'/en/privacy-policy/','/politicadecookies/':'/en/cookie-policy/','/aramebtc/':'/en/drawn-steel-wires-low-carbon/','/aramemtc/':'/en/drawn-steel-wires-medium-carbon-1035-a-1050/','/arameatc/':'/en/drawn-steel-wires-high-carbon-1060-a-1090/','/barrabtc/':'/en/drawn-steel-bars-low-carbon-1006-a-1020/','/barramtc/':'/en/drawn-steel-bars-medium-carbon-1035-a-1050/','/barraatc/':'/en/drawn-steel-bars-high-carbon-1060-a-1090/','/barraacoressulfurado/':'/en/resulfurized-steel-bars/','/hastebc/':'/en/grounding-rod-low-coat/','/hasteac/':'/en/grounding-rod-high-coat/'},
  es:{'/':'/es/inicio-espanol/','/blog/':'/es/blog-de-torcisao-trefilados/','/politicadequalidade/':'/es/politica-de-calidad/','/politicadeprivacidade/':'/es/politica-de-privacidad/','/politicadecookies/':'/es/politica-de-cookies/','/aramebtc/':'/es/alambres-trefilados-bajo-carbono-1004-a-1020/','/aramemtc/':'/es/alambres-trefilados-medio-carbono-1035-a-1050/','/arameatc/':'/es/alambres-alto-contenido-de-carbono-1060-a-1090/','/barrabtc/':'/es/barras-trefiladas-bajo-carbono-1006-a-1020/','/barramtc/':'/es/barras-trefiladas-medio-carbono-1035-a-1050/','/barraatc/':'/es/barras-trefiladas-alto-carbono-1060-a-1090/','/barraacoressulfurado/':'/es/barras-acero-resulfurado/','/hastebc/':'/es/varilla-de-puesta-a-tierra-capa-baja/','/hasteac/':'/es/varilla-de-puesta-a-tierra-capa-alta/'}
};

function repairLegacy(value){
  return String(value==null?'':value)
    .replace(/Torcisão\s+Drawns?/g,BRAND)
    .replace(/Torcisão\s+Drawn\b/g,BRAND)
    .replace(/Wire Drawn/g,'Drawn Wire')
    .replace(/Bar Drawn/g,'Drawn Bar')
    .replace(/Política de Quality/g,'Quality Policy');
}

function translateExact(value){
  let raw=repairLegacy(value);
  if(!active||!raw)return raw;
  const match=raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
  const lead=match?match[1]:'';
  const core=match?match[2]:raw;
  const tail=match?match[3]:'';
  if(core===BRAND)return lead+BRAND+tail;
  const translated=dictionary.get(core);
  return lead+(translated!==undefined?translated:core)+tail;
}

function blocked(el){
  return !el||el.nodeType!==1||!!el.closest('script,style,noscript,code,pre,[data-no-i18n]');
}
function translateTextNode(node){
  if(!node||node.nodeType!==3||!node.nodeValue||!node.nodeValue.trim()||blocked(node.parentElement))return;
  const next=translateExact(node.nodeValue);
  if(next!==node.nodeValue)node.nodeValue=next;
}
function translateAttributes(el){
  if(!el||el.nodeType!==1||blocked(el))return;
  ['aria-label','title','placeholder','data-label'].forEach(attr=>{
    if(!el.hasAttribute(attr))return;
    const old=el.getAttribute(attr)||'';
    const next=translateExact(old);
    if(next!==old)el.setAttribute(attr,next);
  });
}
function translatedHref(href){
  if(!active||!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('javascript:'))return href;
  try{
    const url=new URL(href,location.href);
    if(url.origin!==location.origin&&url.hostname!=='torcisao.com.br'&&url.hostname!=='www.torcisao.com.br')return href;
    if(isPreview){url.protocol=location.protocol;url.host=location.host;url.searchParams.set('lang',lang);return url.href;}
    const mapped=(ROUTES[lang]||{})[url.pathname];
    if(!mapped)return href;
    url.protocol=location.protocol;url.host=location.host;url.pathname=mapped;return url.href;
  }catch(e){return href;}
}
function translateAnchor(el){
  if(!active||!el||el.tagName!=='A'||!el.hasAttribute('href')||el.closest('.tor-lang-grid')||el.dataset.torLanguageSwitch)return;
  const old=el.getAttribute('href')||'';
  const next=translatedHref(old);
  if(next&&next!==old)el.setAttribute('href',next);
}
function translateElement(root){
  if(!root)return;
  if(root.nodeType===3){translateTextNode(root);return;}
  if(root.nodeType!==1||blocked(root))return;
  translateAttributes(root);translateAnchor(root);
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.nodeValue&&node.nodeValue.trim()&&!blocked(node.parentElement)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});
  let node;while((node=walker.nextNode()))translateTextNode(node);
  root.querySelectorAll?.('[aria-label],[title],[placeholder],[data-label],a[href]').forEach(el=>{translateAttributes(el);translateAnchor(el);});
}
function refresh(){
  document.documentElement.lang=locale;
  if(document.body)translateElement(document.body);
}
function register(extra){
  if(!extra||typeof extra!=='object')return;
  Object.entries(extra).forEach(([from,to])=>dictionary.set(from,to));
  refresh();
}
function lockLanguageLinks(){
  const links=Array.from(document.querySelectorAll('.tor-lang-grid a'));
  ['pt','en','es'].forEach((target,index)=>{
    const a=links[index];if(!a)return;
    a.dataset.torLanguageSwitch=target;
    if(isPreview){const url=new URL(location.href);url.searchParams.set('lang',target);a.href=url.href;}
  });
}

let busy=false;
function observe(){
  if(!document.body)return;
  const observer=new MutationObserver(records=>{
    if(busy)return;busy=true;
    try{records.forEach(record=>{if(record.type==='characterData')translateTextNode(record.target);record.addedNodes?.forEach(translateElement);if(record.type==='attributes')translateElement(record.target);});}
    finally{queueMicrotask(()=>{busy=false;});}
  });
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','data-label','href']});
}

const originalFetch=window.fetch?.bind(window);
if(originalFetch){
  window.fetch=function(input,init){
    try{
      const url=typeof input==='string'?input:(input&&input.url)||'';
      if(url.includes('/torcisao/v1/application-assistant')&&init&&String(init.method||'GET').toUpperCase()==='POST'&&typeof init.body==='string'){
        const parsed=JSON.parse(init.body);parsed.lang=lang;init=Object.assign({},init,{body:JSON.stringify(parsed)});
      }
    }catch(e){}
    return originalFetch(input,init);
  };
}

window.TorcisaoI18n={version:32,lang,locale,translate:translateExact,translatedHref,refresh,register};
function init(){lockLanguageLinks();refresh();observe();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
