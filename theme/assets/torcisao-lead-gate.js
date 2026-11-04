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
    waOrigin:'Origem',waOutro:'Gostaria de continuar este atendimento pelo WhatsApp.',
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
    waOrigin:'Source',waOutro:'I would like to continue on WhatsApp.',
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
    waOrigin:'Origen',waOutro:'Me gustaría continuar por WhatsApp.',
    locked:'Liberado con tu contacto'
  }
};
const t=k=>(T[lang()]||T.pt)[k]||T.pt[k];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const track=(event,params)=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event},params||{}));};

/* ---------- estado do lead ---------- */
let memoryLead=null;
function getLead(){
  if(memoryLead)return memoryLead;
  try{const raw=JSON.parse(localStorage.getItem(STORE_KEY)||'null');if(raw&&raw.token){memoryLead=raw;return raw;}}catch(e){}
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

/* ---------- WhatsApp com histórico ---------- */
function openWhatsApp(opts){
  opts=opts||{};
  const lines=cleanLines(opts.lines);
  const msg=[t('waIntro'),'',`${t('waOrigin')}: ${opts.label||'Site'}`];
  const lead=getLead();if(lead&&lead.name)msg.push(`${t('name')}: ${lead.name}`);
  if(lines.length)msg.push('',...lines);
  msg.push('',t('waOutro'));
  syncHistory(opts);
  track('whatsapp_click',{origin:opts.source||'ferramenta',context_preserved:lines.length?'yes':'no',lead_identified:lead?'yes':'no'});
  window.open('https://wa.me/'+PHONE+'?text='+encodeURIComponent(msg.join('\n')),'_blank','noopener');
}
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
        source:opts.source||kind,label:opts.label||'',lines:cleanLines(opts.lines),page:location.href,lang:lang()
      })});
      const json=await res.json().catch(()=>({}));
      if(!res.ok||!json.ok){
        const f=(json.fields||[])[0];
        return fail(f==='email'?t('errEmail'):f==='phone'?t('errPhone'):f==='name'?t('errName'):f==='consent'?t('errConsent'):t('errGeneric'),f);
      }
      setLead({token:json.lead_token,name,first_name:json.first_name||name.split(/\s+/)[0],at:Date.now()});
      sentHistory.add((opts.source||kind)+'|'+cleanLines(opts.lines).join('|'));
      track('generate_lead',{lead_source:opts.source||kind,tool:kind});
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
  return [...document.querySelectorAll('#thAssistantModal,.hf-assistant')].find(el=>el.classList.contains('is-open'))||null;
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
  const id=root?.id||'';return id==='hfAssistant'?'Theo · Haste':id==='bfAssistant'?'Theo · Barra':id==='afAssistant'?'Theo · Arame':'Theo · Assistente de Aplicação';
}
const theoOpts=root=>()=>({source:'assistente_aplicacao',label:theoLabel(root),lines:conversationLines(root)});

function placeTheoExtras(root,askContact){
  const log=chatLog(root);if(!log)return;
  const answers=log.querySelectorAll('.th-msg.assistant,.hf-msg.assistant');
  const last=answers[answers.length-1];if(!last)return;
  /* WhatsApp sempre logo abaixo da última resposta do Theo. */
  let wa=log.querySelector(':scope > .tor-wa-inline--theo');
  if(!wa)wa=whatsappButton(theoOpts(root),'tor-wa-inline--theo');
  if(askContact&&!isUnlocked()&&!theoDeclined()&&!log.querySelector('.tor-lead-gate--theo')){
    setTheoAsked();
    const gate=gateForm('theo',theoOpts(root),()=>{unlockAll();},()=>{setTheoDeclined();gate.remove();});
    last.insertAdjacentElement('afterend',gate);
    gate.insertAdjacentElement('afterend',wa);
  }else{
    const gate=log.querySelector('.tor-lead-gate--theo');
    (gate&&gate.previousElementSibling===last?gate:last).insertAdjacentElement('afterend',wa);
  }
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
      if(theoDeclined()||theoAsked())body.contact_declined=true;
      if(!body.session_id)body.session_id=sessionId();
      if(!body.lang)body.lang=lang();
      init=Object.assign({},init,{body:JSON.stringify(body)});
    }catch(e){}
    return base(input,init).then(res=>{
      try{
        res.clone().json().then(json=>{
          const ask=!!(json&&json.ask_contact);
          /* espera o chat desenhar a resposta */
          let tries=0;const tick=()=>{
            const r=root||openAssistantRoot();const log=chatLog(r);
            const loading=log&&log.querySelector('.loading,.is-loading,[data-loading]');
            if((!log||loading)&&tries++<20)return setTimeout(tick,150);
            if(r)placeTheoExtras(r,ask);
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
  api.offer=function(opts){syncHistory(opts||{});};
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

/* ---------- API pública ---------- */
window.TorcisaoLeadGate={isUnlocked,getLead,syncHistory,whatsapp:openWhatsApp,refresh:()=>{refreshCalc();watchTol();TOL_TARGETS.forEach(refreshTol);}};

function init(){
  installHandoffOverride();
  watchTol();
  /* a tolerância de produto e a da Home são criadas por scripts tardios */
  new MutationObserver(()=>{watchTol();installHandoffOverride();}).observe(document.body,{childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
