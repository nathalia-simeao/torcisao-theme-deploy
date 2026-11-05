/* ============================================================
 * TORCISÃO · trava de resultado + contato nas ferramentas (2026-11)
 *
 * - Calculadora de aço: mostra o peso por metro; peso total, metragem,
 *   tonelagem e quantidade liberam com nome, e-mail e WhatsApp.
 * - Tolerância dimensional: mostra h11; h9 e h10 liberam com o contato.
 * - Theo: depois da 2ª troca o servidor marca ask_contact e aparece
 *   um cartão de contato dentro da conversa.
 * - O visitante se identifica uma vez; depois todas as ferramentas ficam
 *   liberadas e cada histórico (cálculo, tolerância, conversa) é anexado
 *   ao contato no HubSpot ao fechar a ferramenta.
 * - O antigo modal "quer falar com o comercial?" ao fechar deixa de abrir;
 *   o WhatsApp com histórico fica dentro das próprias ferramentas.
 * ============================================================ */
(function(){
'use strict';
if(window.TorcisaoLeadGate)return;

const STORE_KEY='torcisao_lead_v1';
const DECLINE_KEY='torcisao_lead_declined_v1';
const ASKED_KEY='torcisao_lead_theo_asked_v1';
const SID_KEY='torcisao_lead_sid_v1';
const ENDPOINT='/wp-json/torcisao/v1/lead';
const HISTORY_ENDPOINT='/wp-json/torcisao/v1/lead/history';
const PHONE='551123349989';

/* ---------- idioma ---------- */
function lang(){
  const q=String(new URLSearchParams(location.search).get('lang')||'').toLowerCase();
  if(['pt','en','es'].includes(q))return q;
  const p=location.pathname.match(/^\/(en|es)(?:\/|$)/i);if(p)return p[1].toLowerCase();
  const l=(window.TorcisaoI18n&&window.TorcisaoI18n.lang)||document.documentElement.lang||'pt';
  return /^en/i.test(l)?'en':/^es/i.test(l)?'es':'pt';
}
const T={
  pt:{
    calcTitle:'Veja o resultado completo',
    calcCopy:'Peso total, metragem, tonelagem e quantidade ficam disponíveis assim que você se identificar. Uma vez só: depois as ferramentas ficam liberadas.',
    tolTitle:'Veja as tolerâncias h9 e h10',
    tolCopy:'A faixa h11 já está aberta. Para ver h9 e h10 com os limites mínimo e máximo, deixe seu contato. Uma vez só.',
    theoTitle:'Quer que o comercial continue daqui?',
    theoCopy:'Deixe seu contato e o time recebe o resumo desta conversa. Ninguém vai pedir para você repetir nada.',
    name:'Nome',email:'E-mail',phone:'WhatsApp',
    phPhone:'(11) 99999-9999',
    consent:'Autorizo a Torcisão a usar estes dados para retornar sobre minha consulta, conforme a',
    privacy:'Política de Privacidade',privacyUrl:'/politicadeprivacidade/',
    submit:'Ver resultado completo',submitTheo:'Enviar para o comercial',
    sending:'Enviando…',
    errName:'Informe seu nome.',errEmail:'Informe um e-mail válido.',errPhone:'Informe um telefone com DDD.',errConsent:'Marque a autorização para continuar.',
    errGeneric:'Não consegui enviar agora. Tente de novo em instantes.',
    later:'Agora não',
    thanksTheo:'Pronto! O time comercial já recebeu esta conversa e vai te procurar.',
    unlocked:'Resultado liberado',
    whatsapp:'Falar com o comercial no WhatsApp',
    whatsappHint:'O histórico desta consulta vai junto na mensagem.',
    waIntro:'Olá! Eu estava usando uma ferramenta no site da Torcisão e gostaria de falar com o comercial.',
    waOrigin:'Origem',waOutro:'Gostaria de continuar este atendimento pelo WhatsApp.',waHistory:'O que eu consultei no site:',
    fabLabel:'Falar no WhatsApp',fabTitle:'Fale com o comercial no WhatsApp',
    fabCopy:'Preencha seus dados e o time comercial continua a conversa com você pelo WhatsApp.',
    fabLoading:'Carregando o formulário…',fabFail:'Não consegui carregar o formulário agora. Você pode chamar direto:',
    fabIntro:'Olá! Vim pelo site da Torcisão e gostaria de falar com o comercial.',
    fabOpen:'Abrir WhatsApp',fabClose:'Minimizar',
    locked:'Liberado com seu contato'
  },
  en:{
    calcTitle:'See the full result',
    calcCopy:'Total weight, length, tonnage and quantity unlock as soon as you identify yourself. Just once: after that every tool stays unlocked.',
    tolTitle:'See the h9 and h10 tolerances',
    tolCopy:'The h11 band is already open. Leave your contact to see h9 and h10 with minimum and maximum limits. Just once.',
    theoTitle:'Want our sales team to pick up from here?',
    theoCopy:'Leave your contact and the team receives a summary of this conversation. Nobody will ask you to repeat anything.',
    name:'Name',email:'Email',phone:'WhatsApp / phone',
    phPhone:'+1 555 123 4567',
    consent:'I authorize Torcisão to use this data to follow up on my request, according to the',
    privacy:'Privacy Policy',privacyUrl:'/en/politicadeprivacidade/',
    submit:'See full result',submitTheo:'Send to sales',
    sending:'Sending…',
    errName:'Please enter your name.',errEmail:'Please enter a valid email.',errPhone:'Please enter a phone number with area code.',errConsent:'Please check the authorization to continue.',
    errGeneric:'Could not send right now. Please try again in a moment.',
    later:'Not now',
    thanksTheo:'Done! Our sales team has this conversation and will reach out.',
    unlocked:'Result unlocked',
    whatsapp:'Talk to sales on WhatsApp',
    whatsappHint:'This lookup history goes with the message.',
    waIntro:'Hello! I was using a tool on the Torcisão website and would like to talk to sales.',
    waOrigin:'Source',waOutro:'I would like to continue on WhatsApp.',waHistory:'What I looked up on the site:',
    fabLabel:'Chat on WhatsApp',fabTitle:'Talk to sales on WhatsApp',
    fabCopy:'Fill in your details and our sales team will continue the conversation with you on WhatsApp.',
    fabLoading:'Loading the form…',fabFail:'Could not load the form right now. You can message us directly:',
    fabIntro:'Hello! I came from the Torcisão website and would like to talk to sales.',
    fabOpen:'Open WhatsApp',fabClose:'Minimize',
    locked:'Unlocked with your contact'
  },
  es:{
    calcTitle:'Mira el resultado completo',
    calcCopy:'Peso total, metraje, tonelaje y cantidad se liberan en cuanto te identifiques. Una sola vez: después todas las herramientas quedan liberadas.',
    tolTitle:'Mira las tolerancias h9 y h10',
    tolCopy:'La franja h11 ya está abierta. Deja tu contacto para ver h9 y h10 con los límites mínimo y máximo. Una sola vez.',
    theoTitle:'¿Quieres que el equipo comercial siga desde aquí?',
    theoCopy:'Deja tu contacto y el equipo recibe el resumen de esta conversación. Nadie te pedirá repetir nada.',
    name:'Nombre',email:'Correo',phone:'WhatsApp / teléfono',
    phPhone:'+34 600 000 000',
    consent:'Autorizo a Torcisão a usar estos datos para responder a mi consulta, según la',
    privacy:'Política de Privacidad',privacyUrl:'/es/politicadeprivacidade/',
    submit:'Ver resultado completo',submitTheo:'Enviar al comercial',
    sending:'Enviando…',
    errName:'Indica tu nombre.',errEmail:'Indica un correo válido.',errPhone:'Indica un teléfono con prefijo.',errConsent:'Marca la autorización para continuar.',
    errGeneric:'No pude enviarlo ahora. Inténtalo de nuevo en un momento.',
    later:'Ahora no',
    thanksTheo:'¡Listo! El equipo comercial ya tiene esta conversación y te contactará.',
    unlocked:'Resultado liberado',
    whatsapp:'Hablar con el comercial por WhatsApp',
    whatsappHint:'El historial de esta consulta va en el mensaje.',
    waIntro:'¡Hola! Estaba usando una herramienta en el sitio de Torcisão y me gustaría hablar con el comercial.',
    waOrigin:'Origen',waOutro:'Me gustaría continuar por WhatsApp.',waHistory:'Lo que consulté en el sitio:',
    fabLabel:'Hablar por WhatsApp',fabTitle:'Habla con el comercial por WhatsApp',
    fabCopy:'Completa tus datos y el equipo comercial continuará la conversación contigo por WhatsApp.',
    fabLoading:'Cargando el formulario…',fabFail:'No pude cargar el formulario ahora. Puedes escribirnos directo:',
    fabIntro:'¡Hola! Vengo del sitio de Torcisão y me gustaría hablar con el comercial.',
    fabOpen:'Abrir WhatsApp',fabClose:'Minimizar',
    locked:'Liberado con tu contacto'
  }
};
const t=k=>(T[lang()]||T.pt)[k]||T.pt[k];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const track=(event,params)=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event},params||{}));};

/* ---------- origem (UTM) ---------- */
function utmValues(){try{return (window.TorcisaoHubSpotAttribution&&window.TorcisaoHubSpotAttribution.values())||{}}catch(e){return {}}}

/* ---------- estado do lead ---------- */
let memoryLead=null;
function getLead(){
  if(memoryLead)return memoryLead;
  try{
    const raw=JSON.parse(localStorage.getItem(STORE_KEY)||'null');
    /* identificação vale 30 dias (mesmo prazo do vínculo com o lead no servidor) */
    if(raw&&raw.token&&raw.at&&Date.now()-raw.at<30*24*60*60*1000){memoryLead=raw;return raw;}
    if(raw)localStorage.removeItem(STORE_KEY);
  }catch(e){}
  return null;
}
function setLead(lead){memoryLead=lead;try{localStorage.setItem(STORE_KEY,JSON.stringify(lead))}catch(e){}}
const isUnlocked=()=>!!getLead();
function theoDeclined(){try{return sessionStorage.getItem(DECLINE_KEY)==='1'}catch(e){return false}}
function setTheoDeclined(){try{sessionStorage.setItem(DECLINE_KEY,'1')}catch(e){}}
let askedMem=false;
function theoAsked(){if(askedMem)return true;try{return sessionStorage.getItem(ASKED_KEY)==='1'}catch(e){return false}}
function setTheoAsked(){askedMem=true;try{sessionStorage.setItem(ASKED_KEY,'1')}catch(e){}}
let sidMem='';
function sessionId(){try{const shared=window.TorcisaoTheoMemory&&window.TorcisaoTheoMemory.session&&window.TorcisaoTheoMemory.session();if(shared)return shared;}catch(e){}if(sidMem)return sidMem;try{sidMem=sessionStorage.getItem(SID_KEY)||'';}catch(e){}if(!sidMem){try{sidMem=crypto.randomUUID()}catch(e){sidMem='tor-'+Date.now().toString(36)+Math.random().toString(36).slice(2,12)}try{sessionStorage.setItem(SID_KEY,sidMem)}catch(e){}}return sidMem;}

function cleanLines(lines){
  const out=[];let size=0;
  (Array.isArray(lines)?lines:[]).forEach(v=>{let s=String(v||'').replace(/\s+/g,' ').trim();if(!s)return;if(s.length>500)s=s.slice(0,497)+'…';if(size+s.length>5500)return;out.push(s);size+=s.length;});
  return out;
}

/* ---------- histórico para o HubSpot ---------- */
const sentHistory=new Set();
function syncHistory(opts){
  const lead=getLead();if(!lead)return;
  const lines=cleanLines(opts&&opts.lines);if(!lines.length)return;
  const sig=(opts.source||'')+'|'+lines.join('|');if(sentHistory.has(sig))return;sentHistory.add(sig);
  const payload=JSON.stringify({lead_token:lead.token,source:opts.source||'ferramenta',label:opts.label||'Ferramenta do site',lines,page:location.href});
  try{
    if(navigator.sendBeacon&&navigator.sendBeacon(HISTORY_ENDPOINT,new Blob([payload],{type:'application/json'})))return;
  }catch(e){}
  try{fetch(HISTORY_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',keepalive:true,body:payload}).catch(()=>{})}catch(e){}
}

/* ---------- memória do que o cliente fez nas ferramentas ----------
 * Guarda o último uso de cada ferramenta (cálculo, tolerância, conversa
 * do Theo) por 3 horas, mesmo trocando de página. Esse histórico vai em
 * QUALQUER botão de WhatsApp do comercial e no lead do HubSpot. */
const CTX_KEY='torcisao_tool_history_v1';
const CTX_TTL=3*60*60*1000;
let ctxMem={};
function readCtx(){
  let all=ctxMem;
  try{all=JSON.parse(localStorage.getItem(CTX_KEY)||'{}')||{}}catch(e){}
  const now=Date.now();Object.keys(all).forEach(k=>{if(!all[k]||now-all[k].at>CTX_TTL)delete all[k];});
  return all;
}
function remember(opts){
  if(!opts)return;const lines=cleanLines(opts.lines);if(!lines.length)return;
  const all=readCtx();all[opts.source||'ferramenta']={label:opts.label||'Ferramenta do site',lines,at:Date.now()};
  ctxMem=all;try{localStorage.setItem(CTX_KEY,JSON.stringify(all))}catch(e){}
}
function recentContexts(exceptSource){
  return Object.entries(readCtx()).filter(([k])=>k!==exceptSource).sort((a,b)=>b[1].at-a[1].at).slice(0,3)
    .map(([k,v])=>({source:k,label:v.label,lines:v.lines}));
}
const shortLines=c=>/assistente|theo/i.test(c.source+c.label)?c.lines.slice(-8):c.lines;
function historyBlock(ctxs){
  const out=[t('waHistory')];
  ctxs.forEach(c=>{out.push('',`• ${c.label}`,...shortLines(c));});
  return out.join('\n');
}
function syncAllHistory(){recentContexts().forEach(syncHistory);}

/* ---------- WhatsApp com histórico ---------- */
function openWhatsApp(opts){
  opts=opts||{};
  remember(opts);
  const lines=cleanLines(opts.lines);
  const msg=[t('waIntro'),'',`${t('waOrigin')}: ${opts.label||'Site'}`];
  const lead=getLead();if(lead&&lead.name)msg.push(`${t('name')}: ${lead.name}`);
  if(lines.length)msg.push('',...shortLines({source:opts.source||'',label:opts.label||'',lines}));
  const others=recentContexts(opts.source);
  if(others.length)msg.push('',historyBlock(others));
  msg.push('',t('waOutro'));
  syncHistory(opts);others.forEach(syncHistory);
  track('whatsapp_click',{origin:opts.source||'ferramenta',context_preserved:(lines.length||others.length)?'yes':'no',lead_identified:lead?'yes':'no'});
  skipWrap=true;
  try{window.open(waUrl(msg),'_blank','noopener');}finally{skipWrap=false;}
}
function waUrl(msg){return 'https://wa.me/'+PHONE+'?text='+encodeURIComponent(msg.join('\n'));}

/* Qualquer outro caminho para o WhatsApp do comercial (botão do topo,
   páginas de produto, rodapé, scripts antigos) também leva o histórico. */
function isCommercialWa(href){
  try{
    const u=new URL(href,location.href);
    if(u.hostname==='wa.me')return u.pathname.replace(/\D/g,'')===PHONE?u:null;
    if(/(^|\.)whatsapp\.com$/.test(u.hostname)&&(u.searchParams.get('phone')||'').replace(/\D/g,'')===PHONE)return u;
  }catch(e){}
  return null;
}
let skipWrap=false;
function withHistory(href){
  if(skipWrap)return href;
  const u=isCommercialWa(href);if(!u)return href;
  const ctxs=recentContexts();if(!ctxs.length)return href;
  const base=u.searchParams.get('text')||t('waIntro');
  if(base.includes(t('waHistory'))||ctxs.every(c=>c.lines.every(l=>base.includes(l))))return href;
  u.searchParams.set('text',base+'\n\n'+historyBlock(ctxs));
  ctxs.forEach(syncHistory);
  track('whatsapp_click',{origin:'link_site',context_preserved:'yes',lead_identified:getLead()?'yes':'no'});
  return u.href.replace(/\+/g,'%20');
}
document.addEventListener('click',e=>{
  const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
  const next=withHistory(a.href);if(next!==a.href)a.href=next;
},true);
(function wrapOpen(){
  if(window.__TORCISAO_WA_OPEN__)return;window.__TORCISAO_WA_OPEN__=true;
  const base=window.open;
  window.open=function(url,...rest){try{if(typeof url==='string')url=withHistory(url);}catch(e){}return base.call(window,url,...rest);};
})();
function whatsappButton(getOpts,extraClass){
  const wrap=document.createElement('div');
  wrap.className='tor-wa-inline'+(extraClass?' '+extraClass:'');
  wrap.innerHTML=`<button type="button" class="tor-wa-inline-btn"><i class="bi bi-whatsapp" aria-hidden="true"></i><span>${esc(t('whatsapp'))}</span></button><small>${esc(t('whatsappHint'))}</small>`;
  wrap.querySelector('button').addEventListener('click',()=>openWhatsApp(getOpts()));
  return wrap;
}

/* ---------- formulário ---------- */
function gateForm(kind,getOpts,onDone,onLater){
  const box=document.createElement('div');
  box.className='tor-lead-gate tor-lead-gate--'+kind;
  const title=kind==='calc'?t('calcTitle'):kind==='tol'?t('tolTitle'):t('theoTitle');
  const copy=kind==='calc'?t('calcCopy'):kind==='tol'?t('tolCopy'):t('theoCopy');
  const uid='tlg'+Math.random().toString(36).slice(2,8);
  box.innerHTML=`
    <div class="tor-lead-gate-head"><span class="tor-lead-gate-lock" aria-hidden="true"><i class="bi ${kind==='theo'?'bi-person-lines-fill':'bi-unlock'}"></i></span><div><strong>${esc(title)}</strong><p>${esc(copy)}</p></div></div>
    <form novalidate>
      <div class="tor-lead-gate-fields">
        <label><span>${esc(t('name'))}</span><input name="name" type="text" autocomplete="name" required maxlength="80"></label>
        <label><span>${esc(t('email'))}</span><input name="email" type="email" autocomplete="email" inputmode="email" required maxlength="120"></label>
        <label><span>${esc(t('phone'))}</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="24" placeholder="${esc(t('phPhone'))}"></label>
      </div>
      <label class="tor-lead-gate-hp" aria-hidden="true">Website<input name="website" type="text" tabindex="-1" autocomplete="off"></label>
      <label class="tor-lead-gate-consent" for="${uid}"><input id="${uid}" name="consent" type="checkbox" required><span>${esc(t('consent'))} <a href="${esc(t('privacyUrl'))}" target="_blank" rel="noopener">${esc(t('privacy'))}</a>.</span></label>
      <p class="tor-lead-gate-error" role="alert" hidden></p>
      <div class="tor-lead-gate-actions">
        <button type="submit" class="tor-lead-gate-submit">${esc(kind==='theo'?t('submitTheo'):t('submit'))}</button>
        ${onLater?`<button type="button" class="tor-lead-gate-later">${esc(t('later'))}</button>`:''}
      </div>
    </form>`;
  const form=box.querySelector('form'),err=box.querySelector('.tor-lead-gate-error'),btn=box.querySelector('.tor-lead-gate-submit');
  box.querySelector('.tor-lead-gate-later')?.addEventListener('click',onLater);
  function fail(msg,field){err.textContent=msg;err.hidden=false;if(field)form.elements[field]?.focus();}
  form.addEventListener('submit',async e=>{
    e.preventDefault();err.hidden=true;
    const name=form.elements.name.value.trim(),email=form.elements.email.value.trim(),phone=form.elements.phone.value.trim();
    if(name.length<2)return fail(t('errName'),'name');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))return fail(t('errEmail'),'email');
    if(phone.replace(/\D/g,'').length<10)return fail(t('errPhone'),'phone');
    if(!form.elements.consent.checked)return fail(t('errConsent'),'consent');
    const opts=getOpts()||{};
    btn.disabled=true;const label=btn.textContent;btn.textContent=t('sending');
    try{
      const res=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({
        name,email,phone,consent:true,consent_text:t('consent')+' '+t('privacy'),website:form.elements.website.value,
        source:opts.source||kind,label:opts.label||'',lines:cleanLines(opts.lines),page:location.href,lang:lang(),utm:utmValues()
      })});
      const json=await res.json().catch(()=>({}));
      if(!res.ok||!json.ok){
        const f=(json.fields||[])[0];
        return fail(f==='email'?t('errEmail'):f==='phone'?t('errPhone'):f==='name'?t('errName'):f==='consent'?t('errConsent'):t('errGeneric'),f);
      }
      setLead({token:json.lead_token,name,first_name:json.first_name||name.split(/\s+/)[0],at:Date.now()});
      sentHistory.add((opts.source||kind)+'|'+cleanLines(opts.lines).join('|'));
      track('generate_lead',{lead_source:opts.source||kind,tool:kind});
      remember(opts);setTimeout(syncAllHistory,300);
      onDone();
    }catch(ex){fail(t('errGeneric'));}
    finally{btn.disabled=false;btn.textContent=label;}
  });
  return box;
}

/* ============================================================
 * 1) CALCULADORA DE AÇO (modal do header, todas as páginas)
 * ============================================================ */
function calcLines(){
  const modal=document.querySelector('.torcisao-calc-modal');if(!modal)return [];
  const lines=[];
  const visible=el=>el&&!el.closest('[hidden]')&&el.offsetParent!==null;
  modal.querySelectorAll('.torcisao-calc-field').forEach(f=>{
    if(!visible(f))return;
    const label=f.querySelector('label')?.textContent.replace(/·.*$/,'').trim();
    const ctl=[...f.querySelectorAll('select,input')].find(visible);if(!label||!ctl)return;
    const val=ctl.tagName==='SELECT'?ctl.options[ctl.selectedIndex]?.text:ctl.value;
    if(String(val||'').trim()){const unit=f.querySelector('.torcisao-calc-inline select');lines.push(`${label}: ${val}${unit&&unit!==ctl?' '+unit.value:''}`);}
  });
  modal.querySelectorAll('.torcisao-calc-results .torcisao-calc-result').forEach(r=>{
    if(!visible(r))return;const k=r.querySelector('small')?.textContent.trim(),v=r.querySelector('strong')?.textContent.trim();if(k&&v)lines.push(`${k}: ${v}`);
  });
  return lines;
}
const calcOpts=()=>({source:'calculadora_header',label:'Calculadora de aço',lines:calcLines()});
function calcHasResult(){
  const v=document.getElementById('calcKgResultado')?.textContent||'';
  return /[1-9]/.test(v)||/[1-9]/.test(document.getElementById('calcKgMetro')?.textContent||'');
}
function refreshCalc(){
  const modal=document.querySelector('.torcisao-calc-modal');if(!modal)return;
  const results=modal.querySelector('.torcisao-calc-results');if(!results)return;
  let slot=modal.querySelector('.tor-lead-slot--calc');
  if(!slot){slot=document.createElement('div');slot.className='tor-lead-slot tor-lead-slot--calc';const note=modal.querySelector('#calcNote');(note||results).insertAdjacentElement(note?'beforebegin':'afterend',slot);}
  if(!calcHasResult()){modal.classList.remove('tor-gated');slot.innerHTML='';return;}
  remember(calcOpts());
  if(isUnlocked()){
    modal.classList.remove('tor-gated');
    if(!slot.querySelector('.tor-wa-inline')){slot.innerHTML='';slot.appendChild(whatsappButton(calcOpts));}
    return;
  }
  modal.classList.add('tor-gated');
  if(!slot.querySelector('.tor-lead-gate')){
    slot.innerHTML='';
    slot.appendChild(gateForm('calc',calcOpts,()=>{unlockAll();}));
  }
}
document.addEventListener('click',e=>{
  if(e.target.closest?.('#torcisaoCalcButton'))setTimeout(refreshCalc,30);
},true);
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&e.target.closest?.('.torcisao-calc-modal'))setTimeout(refreshCalc,60);
},true);

/* ============================================================
 * 2) TOLERÂNCIA (Home e páginas de produto)
 * ============================================================ */
const TOL_TARGETS=[
  {id:'thToleranceResult',values:'.th-tolerance-values',source:'tolerancia_dimensional',label:'Consulta de Tolerância Dimensional'},
  {id:'torProductTolResult',values:'.tor-product-tol-values',source:'tolerancia_dimensional_produto',label:'Consulta de Tolerância Dimensional · Produto'}
];
function tolLines(cfg,out){
  if(out.dataset.commercialSummary)return out.dataset.commercialSummary.split('|');
  const lines=[];
  out.querySelectorAll(cfg.values+' > div').forEach(card=>{const k=card.querySelector('small')?.textContent.trim();const v=[...card.querySelectorAll('strong,.th-tol-value,.th-tol-limits span')].map(x=>x.textContent.replace(/\s+/g,' ').trim()).join(' · ');if(k&&v)lines.push(`${k}: ${v}`);});
  const note=out.querySelector('p')?.textContent.trim();if(note)lines.unshift(note);
  return lines;
}
function refreshTol(cfg){
  const out=document.getElementById(cfg.id);if(!out)return;
  const values=out.querySelector(cfg.values);
  const opts=()=>({source:cfg.source,label:cfg.label,lines:tolLines(cfg,out)});
  let slot=out.parentElement?.querySelector(':scope > .tor-lead-slot--tol[data-for="'+cfg.id+'"]');
  if(!slot){slot=document.createElement('div');slot.className='tor-lead-slot tor-lead-slot--tol';slot.dataset.for=cfg.id;out.insertAdjacentElement('afterend',slot);}
  if(!values){out.classList.remove('tor-gated');slot.innerHTML='';return;}
  remember(opts());
  if(isUnlocked()){
    out.classList.remove('tor-gated');
    if(!slot.querySelector('.tor-wa-inline')){slot.innerHTML='';slot.appendChild(whatsappButton(opts));}
    return;
  }
  out.classList.add('tor-gated');
  if(!slot.querySelector('.tor-lead-gate')){slot.innerHTML='';slot.appendChild(gateForm('tol',opts,()=>{unlockAll();}));}
}
function watchTol(){
  TOL_TARGETS.forEach(cfg=>{
    const out=document.getElementById(cfg.id);if(!out||out.dataset.torLeadWatch)return;
    out.dataset.torLeadWatch='1';
    new MutationObserver(()=>refreshTol(cfg)).observe(out,{childList:true});
    refreshTol(cfg);
  });
}

function unlockAll(){
  refreshCalc();TOL_TARGETS.forEach(refreshTol);
  document.querySelectorAll('.tor-lead-gate--theo').forEach(g=>{const p=document.createElement('div');p.className='tor-lead-thanks';p.textContent=t('thanksTheo');g.replaceWith(p);});
  track('tool_result_unlocked',{lang:lang()});
}

/* ============================================================
 * 3) THEO — contato dentro da conversa + WhatsApp com histórico
 * ============================================================ */
function openAssistantRoot(){
  return [...document.querySelectorAll('#thAssistantModal,.hf-assistant')].find(el=>el.classList.contains('is-open'))
    ||document.querySelector('.ta-theo')||null; /* Theo embutido nas páginas de aplicação */
}
function chatLog(root){return root?.querySelector('#thHomeChat,#hfChat,#bfChat,#afChat,[id$="Chat"],.hf-chat,.th-chat')||null;}
function conversationLines(root){
  const lines=[];
  (root?root.querySelectorAll('.th-msg,.hf-msg'):[]).forEach(m=>{
    if(m.classList.contains('loading')||m.closest('.tor-lead-gate'))return;
    const txt=(m.innerText||m.textContent||'').replace(/\s+/g,' ').trim();if(!txt||/^(Consultando as informa|Checking Torcis|Consultando la informa)/i.test(txt))return;
    lines.push(`${m.classList.contains('user')?'Cliente':'Theo'}: ${txt}`);
  });
  return lines.slice(-24);
}
function theoLabel(root){
  const inline=root?.querySelector?.('#apChat');if(inline&&inline.dataset.label)return inline.dataset.label;
  const id=root?.id||'';return id==='hfAssistant'?'Theo · Haste':id==='bfAssistant'?'Theo · Barra':id==='afAssistant'?'Theo · Arame':'Theo · Assistente de Aplicação';
}
const theoOpts=root=>()=>({source:'assistente_aplicacao',label:theoLabel(root),lines:conversationLines(root)});

/* ---------- Theo guiado: botões de resposta rápida ---------- */
const CHATS=[
  {chat:'thHomeChat',input:'thAssistantInput',send:'thAssistantSend',line:''},
  {chat:'afChat',input:'afAssistantInput',send:'afAssistantSend',line:'arame'},
  {chat:'bfChat',input:'bfAssistantInput',send:'bfAssistantSend',line:'barra'},
  {chat:'hfChat',input:'hfAssistantInput',send:'hfAssistantSend',line:'haste'}
];
(function(){const ap=document.getElementById('apChat');if(!ap)return;
  let start=null;try{start=JSON.parse(ap.dataset.chips||'null')}catch(e){}
  CHATS.push({chat:'apChat',input:'apInput',send:'apSend',line:ap.dataset.line||'',start});})();
const START={
  pt:{line:[['Arame trefilado','line','arame'],['Barra trefilada','line','barra'],['Haste de aterramento','line','haste'],['Outra coisa','line','outro']],
      arame:[['Molas','app','arame_mtc:2'],['Telas','app','arame_mtc:0'],['Gradil','app','arame_btc:2'],['Cabos','app','arame_mtc:1'],['Outra aplicação','app','outro']],
      barra:[['Fixadores','app','barra_btc:0'],['Autopeças','app','barra_btc:1'],['Pinos','app','barra_ressulfurado:1'],['Molas Helicoidais','app','barra_btc:4'],['Sistemas Hidráulicos','app','barra_ressulfurado:6'],['Outra aplicação','app','outro']],
      haste:[['Baixa camada','haste','haste_baixa'],['Alta camada','haste','haste_alta'],['Conectores','haste','conectores'],['Não sei qual escolher','haste','nao_sei']]},
  en:{line:[['Drawn wire','line','arame'],['Drawn bar','line','barra'],['Grounding rod','line','haste'],['Something else','line','outro']],
      arame:[['Springs','app','arame_mtc:2'],['Mesh','app','arame_mtc:0'],['Fencing','app','arame_btc:2'],['Cables','app','arame_mtc:1'],['Other application','app','outro']],
      barra:[['Fasteners','app','barra_btc:0'],['Auto Parts','app','barra_btc:1'],['Pins','app','barra_ressulfurado:1'],['Helical Springs','app','barra_btc:4'],['Hydraulic Systems','app','barra_ressulfurado:6'],['Other application','app','outro']],
      haste:[['Low coating','haste','haste_baixa'],['High coating','haste','haste_alta'],['Connectors','haste','conectores'],["I'm not sure which",'haste','nao_sei']]},
  es:{line:[['Alambre trefilado','line','arame'],['Barra trefilada','line','barra'],['Varilla de tierra','line','haste'],['Otra cosa','line','outro']],
      arame:[['Resortes','app','arame_mtc:2'],['Mallas','app','arame_mtc:0'],['Cercados','app','arame_btc:2'],['Cables','app','arame_mtc:1'],['Otra aplicación','app','outro']],
      barra:[['Fijadores','app','barra_btc:0'],['Autopartes','app','barra_btc:1'],['Pasadores','app','barra_ressulfurado:1'],['Resortes Helicoidales','app','barra_btc:4'],['Sistemas Hidráulicos','app','barra_ressulfurado:6'],['Otra aplicación','app','outro']],
      haste:[['Capa baja','haste','haste_baixa'],['Capa alta','haste','haste_alta'],['Conectores','haste','conectores'],['No sé cuál elegir','haste','nao_sei']]}
};
let pendingGuided=null;
const chatCfg=el=>CHATS.find(c=>el&&(el.id===c.chat||el.querySelector?.('#'+c.chat)))||null;
function cfgForRoot(root){return root?CHATS.find(c=>root.querySelector('#'+c.chat))||null:null;}
function clearChips(log){log&&log.querySelectorAll(':scope > .tor-chips').forEach(n=>n.remove());}
function renderChips(cfg,chips){
  const log=document.getElementById(cfg.chat);if(!log||!chips||!chips.length)return;
  clearChips(log);
  const row=document.createElement('div');row.className='tor-chips';row.setAttribute('role','group');
  chips.forEach(c=>{
    const b=document.createElement('button');b.type='button';b.className='tor-chip';b.textContent=c.label;
    b.addEventListener('click',()=>{
      const input=document.getElementById(cfg.input),send=document.getElementById(cfg.send);if(!input||!send)return;
      clearChips(log);pendingGuided={step:c.step,value:c.value};
      input.value=c.label;input.dispatchEvent(new Event('input',{bubbles:true}));send.click();
      track('theo_quick_reply',{step:c.step,value:c.value});
    });
    row.appendChild(b);
  });
  const answers=log.querySelectorAll('.th-msg.assistant,.hf-msg.assistant');
  const last=answers[answers.length-1];
  if(last&&last.parentElement===log)last.insertAdjacentElement('afterend',row);else log.appendChild(row);
  log.scrollTop=log.scrollHeight;
}
function startChips(cfg){
  const log=document.getElementById(cfg.chat);if(!log||log.offsetParent===null)return;
  if(log.querySelector('.th-msg.user,.hf-msg.user,.tor-chips'))return;
  if(cfg.start){renderChips(cfg,cfg.start);return;}
  const set=(START[lang()]||START.pt)[cfg.line||'line'];
  renderChips(cfg,set.map(([label,step,value])=>({label,step,value})));
}
function watchChats(){
  CHATS.forEach(cfg=>{
    const log=document.getElementById(cfg.chat);if(!log||log.dataset.torChips)return;
    log.dataset.torChips='1';
    const root=log.closest('.th-modal-backdrop,.hf-assistant,[role="dialog"]')||log.parentElement;
    new MutationObserver(()=>setTimeout(()=>startChips(cfg),60)).observe(root,{attributes:true,attributeFilter:['class','hidden','aria-hidden','style']});
    startChips(cfg);
  });
}

function placeTheoExtras(root){
  const log=chatLog(root);if(!log)return;
  const answers=log.querySelectorAll('.th-msg.assistant,.hf-msg.assistant');
  /* O contato é pedido pelo próprio Theo na conversa; aqui só o WhatsApp,
     a partir da 2ª resposta, sempre logo abaixo da última mensagem dele. */
  const asked=log.querySelectorAll('.th-msg.user,.hf-msg.user').length;
  if(asked<2||!answers.length)return;
  const last=answers[answers.length-1];
  let wa=log.querySelector(':scope > .tor-wa-inline--theo');
  if(!wa)wa=whatsappButton(theoOpts(root),'tor-wa-inline--theo');
  const anchor=last.nextElementSibling&&last.nextElementSibling.classList.contains('tor-chips')?last.nextElementSibling:last;
  anchor.insertAdjacentElement('afterend',wa);
  log.scrollTop=log.scrollHeight;
}

/* Intercepta as chamadas do Theo (Home, Arame, Barra, Haste) sem reescrever cada chat. */
(function wrapFetch(){
  if(window.__TORCISAO_LEAD_FETCH__)return;window.__TORCISAO_LEAD_FETCH__=true;
  const base=window.fetch.bind(window);
  window.fetch=function(input,init){
    const url=typeof input==='string'?input:(input&&input.url)||'';
    if(!/\/torcisao\/v1\/application-assistant/.test(url)||!init||typeof init.body!=='string')return base(input,init);
    const root=openAssistantRoot();
    try{
      const body=JSON.parse(init.body);
      const lead=getLead();
      body.lead_known=!!lead;
      if(lead&&lead.first_name)body.first_name=lead.first_name;
      if(theoDeclined())body.contact_declined=true;
      if(!body.session_id)body.session_id=sessionId();
      if(!body.utm)body.utm=utmValues();
      const cfg=cfgForRoot(root);
      if(cfg){body.theo_line=cfg.line;clearChips(document.getElementById(cfg.chat));}
      if(pendingGuided){body.guided=pendingGuided;pendingGuided=null;}
      if(!body.lang)body.lang=lang();
      init=Object.assign({},init,{body:JSON.stringify(body)});
    }catch(e){}
    return base(input,init).then(res=>{
      try{
        res.clone().json().then(json=>{
          /* O cliente passou o contato na conversa: o servidor já criou o lead. */
          if(json&&json.lead_token&&!getLead()){
            setLead({token:json.lead_token,name:json.first_name||'',first_name:json.first_name||'',at:Date.now()});
            track('generate_lead',{lead_source:'assistente_aplicacao',tool:'theo_chat'});
            setTimeout(()=>recentContexts('assistente_aplicacao').forEach(syncHistory),600);
            refreshCalc();TOL_TARGETS.forEach(refreshTol);
          }
          /* espera o chat desenhar a resposta */
          let tries=0;const tick=()=>{
            const r=root||openAssistantRoot();const log=chatLog(r);
            const loading=log&&log.querySelector('.loading,.is-loading,[data-loading]')||(log&&[...log.querySelectorAll('.th-msg.assistant,.hf-msg.assistant')].slice(-1).some(m=>/^(Consultando as informa|Checking Torcis|Consultando la informa)/i.test(m.textContent||'')));
            if((!log||loading)&&tries++<20)return setTimeout(tick,150);
            if(r){const cfg=cfgForRoot(r);if(cfg&&json&&json.chips)renderChips(cfg,json.chips);placeTheoExtras(r);remember(theoOpts(r)());}
          };setTimeout(tick,120);
        }).catch(()=>{});
      }catch(e){}
      return res;
    });
  };
})();

/* ============================================================
 * 4) Fechar uma ferramenta só fecha — o histórico vai para o HubSpot
 *    se o visitante já se identificou.
 * ============================================================ */
function installHandoffOverride(){
  const api=window.TorcisaoCommercialHandoff;
  if(!api||api.__torLead)return;
  api.offer=function(opts){remember(opts||{});syncHistory(opts||{});};
  api.whatsapp=openWhatsApp;
  api.__torLead=true;
}
/* Fechamento dos chats: garante o envio da conversa completa. */
document.addEventListener('click',e=>{
  const btn=e.target.closest?.('[data-th-assistant-close],.hf-assistant-close,.th-modal-close');
  if(!btn)return;const root=btn.closest('#thAssistantModal,.hf-assistant');
  if(root)syncHistory(theoOpts(root)());
},true);
window.addEventListener('pagehide',()=>{
  const root=openAssistantRoot();if(root)syncHistory(theoOpts(root)());
});


/* ============================================================
 * 5) BOTÃO FLUTUANTE DO WHATSAPP (todas as páginas)
 *    Abre o formulário "Form - WhatsApp Comercial" do HubSpot (com os
 *    campos ocultos de UTM e o envio configurado no próprio HubSpot).
 *    Fechar só minimiza: o botão fica no canto da tela.
 * ============================================================ */
const FAB_KEY='torcisao_wa_fab_v1';
const WA_FORM_ID='03daab2d-d895-407d-8922-0d169fa54ae2';
function fabState(){try{return JSON.parse(localStorage.getItem(FAB_KEY)||'{}')||{}}catch(e){return {}}}
function fabSave(v){try{localStorage.setItem(FAB_KEY,JSON.stringify(Object.assign(fabState(),v)))}catch(e){}}
let hsLoading=null;
function loadHsForms(){
  if(window.hbspt&&window.hbspt.forms)return Promise.resolve();
  if(hsLoading)return hsLoading;
  hsLoading=new Promise((ok,ko)=>{
    let s=document.querySelector('script[src*="js.hsforms.net/forms/embed/v2.js"]');
    if(!s){s=document.createElement('script');s.src='https://js.hsforms.net/forms/embed/v2.js';s.charset='utf-8';s.async=true;document.head.appendChild(s);}
    const t0=Date.now();
    (function wait(){if(window.hbspt&&window.hbspt.forms)return ok();if(Date.now()-t0>15000)return ko(new Error('hsforms'));setTimeout(wait,120);})();
  });
  return hsLoading;
}
function installWaFab(){
  if(document.getElementById('torWaFab')||!document.body)return;
  const root=document.createElement('div');
  root.id='torWaFab';root.className='tor-wa-fab';
  root.innerHTML=`
    <section class="tor-wa-panel" role="dialog" aria-modal="false" aria-labelledby="torWaFabTitle" hidden>
      <header class="tor-wa-panel-head">
        <span class="tor-wa-panel-icon" aria-hidden="true"><i class="bi bi-whatsapp"></i></span>
        <div><strong id="torWaFabTitle">${esc(t('fabTitle'))}</strong><p>${esc(t('fabCopy'))}</p></div>
        <button type="button" class="tor-wa-panel-x" aria-label="${esc(t('fabClose'))}" data-close>×</button>
      </header>
      <div class="tor-wa-hs" id="torWaHsForm"><p class="tor-wa-loading">${esc(t('fabLoading'))}</p></div>
    </section>
    <button type="button" class="tor-wa-fab-btn" aria-label="${esc(t('fabLabel'))}" aria-expanded="false"><i class="bi bi-whatsapp" aria-hidden="true"></i><span>${esc(t('fabLabel'))}</span></button>`;
  document.body.appendChild(root);
  const panel=root.querySelector('.tor-wa-panel'),fab=root.querySelector('.tor-wa-fab-btn'),host=root.querySelector('#torWaHsForm');
  let mounted=false;
  function mount(){
    if(mounted)return;mounted=true;
    loadHsForms().then(()=>{
      host.innerHTML='';
      window.hbspt.forms.create({portalId:'50818463',formId:WA_FORM_ID,region:'na1',target:'#torWaHsForm',
        onFormSubmitted:()=>{fabSave({sentAt:Date.now()});track('generate_lead',{lead_source:'whatsapp_widget',tool:'whatsapp'});syncAllHistory();}
      });
    }).catch(()=>{
      mounted=false;
      host.innerHTML=`<p class="tor-wa-loading">${esc(t('fabFail'))}</p><a class="tor-wa-submit" target="_blank" rel="noopener" href="https://wa.me/${PHONE}?text=${encodeURIComponent(t('fabIntro'))}"><i class="bi bi-whatsapp" aria-hidden="true"></i> ${esc(t('fabOpen'))}</a>`;
    });
  }
  function open(auto){
    mount();
    panel.hidden=false;root.classList.add('is-open');fab.setAttribute('aria-expanded','true');
    track('whatsapp_widget_open',{auto:auto?'yes':'no'});
  }
  function close(){panel.hidden=true;root.classList.remove('is-open');fab.setAttribute('aria-expanded','false');fabSave({closedAt:Date.now()});}
  fab.addEventListener('click',()=>panel.hidden?open(false):close());
  root.querySelector('[data-close]').addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)close();});
  /* Abre sozinho uma vez a cada 7 dias para quem ainda não enviou;
     fechar só minimiza para o botão do canto. */
  const st=fabState(),week=7*24*60*60*1000;
  const recently=(st.closedAt&&Date.now()-st.closedAt<week)||(st.sentAt&&Date.now()-st.sentAt<week);
  if(!recently){
    setTimeout(()=>{
      if(!panel.hidden)return;
      if(document.querySelector('.tor-commercial-offer-overlay.is-open,#thAssistantModal.is-open,.hf-assistant.is-open,[aria-modal="true"]:not([hidden]):not(.tor-wa-panel)'))return;
      open(true);
    },20000);
  }
}

/* ---------- API pública ---------- */
window.TorcisaoLeadGate={isUnlocked,getLead,syncHistory,whatsapp:openWhatsApp,refresh:()=>{refreshCalc();watchTol();TOL_TARGETS.forEach(refreshTol);}};

function init(){
  installHandoffOverride();
  installWaFab();
  watchTol();
  watchChats();
  document.addEventListener('click',()=>setTimeout(()=>{watchChats();CHATS.forEach(startChips);},350),true);
  /* a tolerância de produto e a da Home são criadas por scripts tardios */
  new MutationObserver(()=>{watchTol();installHandoffOverride();}).observe(document.body,{childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
