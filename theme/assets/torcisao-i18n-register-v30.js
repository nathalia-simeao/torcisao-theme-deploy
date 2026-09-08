(function(){
'use strict';
const i18n=window.TorcisaoI18n;if(!i18n||!['en','es'].includes(i18n.lang)||typeof i18n.register==='function')return;
i18n.register=function(extra){
  if(!extra||typeof extra!=='object')return;
  const entries=Object.entries(extra).sort((a,b)=>b[0].length-a[0].length);
  const translate=text=>{let out=String(text==null?'':text);for(const [from,to] of entries){if(from&&out.includes(from))out=out.split(from).join(to);}return out;};
  const blocked=el=>!el||el.nodeType!==1||!!el.closest('script,style,noscript,code,pre,[data-no-i18n]');
  const textNode=node=>{if(!node||node.nodeType!==3||!node.nodeValue||!node.nodeValue.trim()||blocked(node.parentElement))return;const next=translate(node.nodeValue);if(next!==node.nodeValue)node.nodeValue=next;};
  const element=root=>{
    if(!root)return;
    if(root.nodeType===3){textNode(root);return;}
    if(root.nodeType!==1||blocked(root))return;
    ['aria-label','title','placeholder','data-label'].forEach(attr=>{if(root.hasAttribute(attr)){const old=root.getAttribute(attr)||'';const next=translate(old);if(next!==old)root.setAttribute(attr,next);}});
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.nodeValue&&node.nodeValue.trim()&&!blocked(node.parentElement)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});
    let node;while((node=walker.nextNode()))textNode(node);
    root.querySelectorAll?.('[aria-label],[title],[placeholder],[data-label]').forEach(el=>{if(blocked(el))return;['aria-label','title','placeholder','data-label'].forEach(attr=>{if(el.hasAttribute(attr)){const old=el.getAttribute(attr)||'';const next=translate(old);if(next!==old)el.setAttribute(attr,next);}});});
  };
  if(document.body)element(document.body);
  if(!document.body)return;
  let busy=false;
  const observer=new MutationObserver(records=>{if(busy)return;busy=true;try{records.forEach(record=>{if(record.type==='characterData')textNode(record.target);record.addedNodes?.forEach(element);if(record.type==='attributes')element(record.target);});}finally{queueMicrotask(()=>{busy=false;});}});
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','data-label']});
};
})();
