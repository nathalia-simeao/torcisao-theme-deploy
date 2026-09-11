(function(){
'use strict';

if(window.TorcisaoHubSpotAttribution)return;

const KEYS={
  first:'torcisao_attr_first',
  latest:'torcisao_attr_latest',
  history:'torcisao_attr_history',
  landing:'torcisao_session_landing'
};
const UTM_KEYS=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','gbraid','wbraid'];
const TARGET_FIELDS=['utm_source','utm_medium','utm_campaign','utm_history','first_utm_data','latest_utm_data','pagina_de_origem_do_lead'];

function safeParse(value){
  if(!value)return null;
  try{return JSON.parse(value);}catch(e){return value;}
}

function unwrapStored(value){
  const parsed=safeParse(value);
  if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed)&&Object.prototype.hasOwnProperty.call(parsed,'data'))return parsed.data;
  return parsed;
}

function readLocal(key){
  try{return unwrapStored(localStorage.getItem(key));}catch(e){return null;}
}

function readLanding(){
  try{return sessionStorage.getItem(KEYS.landing)||'';}catch(e){return '';}
}

function fromUrl(){
  const params=new URLSearchParams(location.search);
  const data={};
  UTM_KEYS.forEach(key=>{const value=params.get(key);if(value)data[key]=value;});
  if(Object.keys(data).length){
    data.landing_page=location.href;
    data.captured_at=new Date().toISOString();
  }
  return data;
}

function normalizeData(value){
  if(!value||typeof value!=='object'||Array.isArray(value))return {};
  const out={};
  Object.keys(value).forEach(key=>{
    const v=value[key];
    if(v!==undefined&&v!==null&&v!=='')out[key]=v;
  });
  return out;
}

function hasAttribution(data){
  return UTM_KEYS.some(key=>data&&data[key]);
}

function stringify(value){
  if(value===undefined||value===null||value==='')return '';
  if(typeof value==='string')return value;
  try{return JSON.stringify(value);}catch(e){return String(value);}
}

function snapshot(){
  const urlData=fromUrl();
  let first=normalizeData(readLocal(KEYS.first));
  let latest=normalizeData(readLocal(KEYS.latest));
  let history=readLocal(KEYS.history);

  if(!hasAttribution(latest)&&hasAttribution(urlData))latest=urlData;
  if(!hasAttribution(first)&&hasAttribution(latest))first=latest;

  if(!history||((Array.isArray(history)||typeof history==='object')&&Object.keys(history).length===0)){
    history=hasAttribution(latest)?[latest]:[];
  }

  const landing=readLanding()||first.landing_page||first.landing_url||first.page_url||latest.landing_page||location.href;

  return {first,latest,history,landing};
}

function nativeSet(field,value){
  if(!field||value===undefined||value===null||value==='')return false;
  const text=String(value);
  if(field.value===text)return true;
  const proto=field instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
  const descriptor=Object.getOwnPropertyDescriptor(proto,'value');
  if(descriptor&&descriptor.set)descriptor.set.call(field,text);else field.value=text;
  field.dispatchEvent(new Event('input',{bubbles:true}));
  field.dispatchEvent(new Event('change',{bubbles:true}));
  return true;
}

function fill(scope){
  const root=scope&&scope.querySelectorAll?scope:document;
  const data=snapshot();
  const values={
    utm_source:data.latest.utm_source||data.first.utm_source||'',
    utm_medium:data.latest.utm_medium||data.first.utm_medium||'',
    utm_campaign:data.latest.utm_campaign||data.first.utm_campaign||'',
    first_utm_data:stringify(data.first),
    latest_utm_data:stringify(data.latest),
    utm_history:stringify(data.history),
    pagina_de_origem_do_lead:data.landing
  };

  let filled=0;
  TARGET_FIELDS.forEach(name=>{
    root.querySelectorAll('input[name="'+name+'"],textarea[name="'+name+'"]')?.forEach(field=>{
      if(nativeSet(field,values[name]))filled++;
    });
  });
  return {filled,values};
}

function fillEventually(scope){
  fill(scope);
  [0,100,300,800,1500].forEach(delay=>setTimeout(()=>fill(scope),delay));
}

function scan(node){
  if(!node||node.nodeType!==1)return;
  if(node.matches?.('form.hs-form, form[data-form-id], .hbspt-form'))fillEventually(node);
  node.querySelectorAll?.('form.hs-form, form[data-form-id], .hbspt-form').forEach(fillEventually);
  if(TARGET_FIELDS.some(name=>node.matches?.('[name="'+name+'"]')))fillEventually(node.closest('form')||document);
}

const observer=new MutationObserver(mutations=>{
  mutations.forEach(mutation=>mutation.addedNodes.forEach(scan));
});

function start(){
  fillEventually(document);
  document.querySelectorAll('form.hs-form, form[data-form-id], .hbspt-form').forEach(fillEventually);
  observer.observe(document.documentElement,{childList:true,subtree:true});
}

document.addEventListener('submit',event=>fill(event.target),true);
document.addEventListener('hs-form-event:on-ready',event=>fillEventually(event.target||document));
window.addEventListener('message',event=>{
  const data=event&&event.data;
  if(!data||typeof data!=='object')return;
  if(data.type==='hsFormCallback'||data.eventName==='onFormReady')fillEventually(document);
});

window.TorcisaoHubSpotAttribution={snapshot,fill,fillEventually};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
