(function(){
'use strict';
const $=id=>document.getElementById(id),qa=(s,c=document)=>Array.from(c.querySelectorAll(s));
const cfg=window.TORCISAO_HOME||{};
const track=(event,params={})=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event},params));};

/* Hero */
const eyebrow=document.querySelector('.th-hero-content .th-eyebrow');if(eyebrow)eyebrow.textContent='O aço que move o seu projeto começa aqui!';
const slides=qa('[data-home-hero-slide]'),dots=qa('[data-home-hero-dot]');
if(slides.length){let current=0,timer;const show=i=>{current=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('is-active',n===current));dots.forEach((d,n)=>d.classList.toggle('is-active',n===current));};const play=()=>{clearInterval(timer);timer=setInterval(()=>show(current+1),6500)};dots.forEach((d,n)=>d.addEventListener('click',()=>{show(n);play()}));show(0);play();}

/* A Home usa exclusivamente o Explorador atual de torcisao-products-explorer.js. */
function commercialOffer(opts){setTimeout(()=>window.TorcisaoCommercialHandoff?.offer(opts),120)}
function openModal(el){if(!el)return;el.classList.add('is-open');el.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}

/* Tolerância dimensional */
let toleranceSummary=[];
const toleranceModal=$('thToleranceModal');
function closeTolerance(){if(!toleranceModal?.classList.contains('is-open'))return;toleranceModal.classList.remove('is-open');toleranceModal.setAttribute('aria-hidden','true');document.body.style.overflow='';commercialOffer({source:'tolerancia_dimensional',label:'Consulta de Tolerância Dimensional',title:'Quer levar esta consulta para o comercial?',copy:'Envie a bitola e o resultado consultado para o WhatsApp da Torcisão.',lines:toleranceSummary.length?toleranceSummary:['Ferramenta: Consulta de Tolerância Dimensional']});}
$('thToleranceOpen')?.addEventListener('click',()=>{toleranceSummary=[];openModal(toleranceModal);track('technical_tool_open',{tool:'tolerancia_dimensional'})});
qa('[data-th-tolerance-close]').forEach(b=>b.addEventListener('click',closeTolerance));
toleranceModal?.addEventListener('click',e=>{if(e.target===toleranceModal)closeTolerance()});
const toleranceRows=[{min:1,max:3,h9:.025,h10:.040,h11:.060},{min:3,max:6,h9:.030,h10:.048,h11:.075},{min:6,max:10,h9:.036,h10:.058,h11:.090},{min:10,max:18,h9:.043,h10:.070,h11:.110},{min:18,max:30,h9:.052,h10:.084,h11:.130},{min:30,max:50,h9:.062,h10:.100,h11:.160},{min:50,max:80,h9:.074,h10:.120,h11:.190},{min:80,max:120,h9:.087,h10:.140,h11:.220},{min:120,max:180,h9:.100,h10:.160,h11:.250},{min:180,max:250,h9:.115,h10:null,h11:.290}];
const fmtTol=v=>v==null?'Sob consulta':'0 / −'+v.toLocaleString('pt-BR',{minimumFractionDigits:3,maximumFractionDigits:3})+' mm';
$('thToleranceRun')?.addEventListener('click',()=>{const input=$('thToleranceDiameter'),out=$('thToleranceResult');const d=parseFloat(String(input?.value||'').replace(',','.'));if(!out)return;if(!Number.isFinite(d)||d<=1||d>250){out.innerHTML='<div class="th-empty-result"><span>BITOLA</span><p>Informe uma bitola válida acima de 1 mm e até 250 mm</p></div>';window.TorcisaoI18n?.refresh?.();return;}const row=toleranceRows.find(r=>d>r.min&&d<=r.max);if(!row){out.innerHTML='<div class="th-empty-result"><span>CONSULTA</span><p>Não encontrei uma faixa para esta bitola. Consulte nosso consultor</p></div>';window.TorcisaoI18n?.refresh?.();return;}const h9=d<9.53?null:row.h9;const card=(cls,tol)=>tol==null?`<div><small>${cls}</small><strong>Sob consulta</strong></div>`:`<div><small>${cls}</small><strong>${fmtTol(tol)}</strong></div>`;out.innerHTML=`<div class="th-tolerance-values">${card('h9',h9)}${card('h10',row.h10)}${card('h11',row.h11)}</div><p class="th-tolerance-range-note">Trefilado · perfil redondo · bitola consultada: ${d.toLocaleString('pt-BR',{maximumFractionDigits:2})} mm</p>`;toleranceSummary=[`Bitola: ${d.toLocaleString('pt-BR',{maximumFractionDigits:2})} mm`,`h9: ${fmtTol(h9)}`,`h10: ${fmtTol(row.h10)}`,`h11: ${fmtTol(row.h11)}`];window.TorcisaoI18n?.refresh?.();track('technical_tool_calculate',{tool:'tolerancia_dimensional',diameter_mm:d});});
$('thToleranceDiameter')?.addEventListener('keydown',e=>{if(e.key==='Enter'){$('thToleranceRun')?.click();}});

/* Assistente geral: manual + Theo */
const assistant=$('thAssistantModal'),chat=$('thHomeChat'),input=$('thAssistantInput');let history=[],selectedManual='arame',manualUsed=false;
const manualData={arame:{name:'Arame Trefilado',text:'Baixo, Médio e Alto Teor de Carbono organizados na página de Arame Trefilado',url:cfg.urls?.arame||'/aramebtc/'},barra:{name:'Barra Trefilada',text:'Baixo, Médio e Alto Teor de Carbono e Ressulfurado organizados na página de Barra Trefilada',url:cfg.urls?.barra||'/barrabtc/'},haste:{name:'Haste de Aterramento',text:'Baixa Camada, Alta Camada e Conectores ficam dentro da página unificada de Haste de Aterramento',url:cfg.urls?.haste||'/hastebc/'}};
function assistantLines(){const lines=[];if(manualUsed){const d=manualData[selectedManual];lines.push(`Escolha manual: ${d.name}`);}history.slice(-10).forEach(m=>lines.push(`${m.role==='user'?'Cliente':'Theo'}: ${m.content}`));return lines.length?lines:['Assistente de Aplicação aberto na Home'];}
function openAssistant(){openModal(assistant);setTimeout(()=>input?.focus(),80);track('technical_tool_open',{tool:'assistente_aplicacao'})}
function closeAssistant(){if(!assistant?.classList.contains('is-open'))return;assistant.classList.remove('is-open');assistant.setAttribute('aria-hidden','true');document.body.style.overflow='';commercialOffer({source:'assistente_aplicacao_home',label:'Assistente de Aplicação · Theo',title:'Quer continuar com o comercial?',copy:'O WhatsApp leva junto o contexto da escolha manual e da conversa com o Theo.',lines:assistantLines()});}
$('thAssistantOpen')?.addEventListener('click',openAssistant);$('thAssistantOpenBottom')?.addEventListener('click',openAssistant);qa('[data-th-assistant-close]').forEach(b=>b.addEventListener('click',closeAssistant));assistant?.addEventListener('click',e=>{if(e.target===assistant)closeAssistant()});
qa('[data-manual-product]').forEach(b=>b.addEventListener('click',()=>{selectedManual=b.dataset.manualProduct;qa('[data-manual-product]').forEach(x=>x.classList.toggle('is-active',x===b));$('thManualProductResult')?.classList.remove('is-visible')}));
$('thManualProductRun')?.addEventListener('click',()=>{manualUsed=true;const d=manualData[selectedManual],r=$('thManualProductResult');if(!r)return;r.innerHTML=`<strong>${d.name}</strong><small>${d.text}</small><a href="${d.url}">Ver página do produto →</a>`;r.classList.add('is-visible');window.TorcisaoI18n?.refresh?.();track('manual_product_choice',{product:selectedManual,page:'home'});});
function addMsg(role,text){const el=document.createElement('div');el.className='th-msg '+role;el.textContent=text;chat?.appendChild(el);if(chat)chat.scrollTop=chat.scrollHeight;return el;}
async function send(){const text=(input?.value||'').trim();if(text.length<3)return;input.value='';addMsg('user',text);history.push({role:'user',content:text});const loading=addMsg('assistant','Consultando as informações Torcisão…');try{const res=await fetch(cfg.rest||'/wp-json/torcisao/v1/application-assistant',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({query:text,history:history.slice(-24),lang:window.TorcisaoI18n?.lang||'pt'})});const json=await res.json();const answer=json.answer||json.error||'Não consegui concluir a consulta agora. Fale com um especialista da Torcisão.';loading.textContent=answer;history.push({role:'assistant',content:answer});if(json.product_url){const a=document.createElement('a');a.href=json.product_url;a.textContent='Ver página do produto →';a.style.cssText='display:block;margin-top:8px;color:#ef7b30;font-weight:800;text-decoration:none';loading.appendChild(a);}window.TorcisaoI18n?.refresh?.();track('theo_query',{page:'home',product_key:json.product_key||''});}catch(err){loading.textContent='Não consegui concluir a consulta agora. Fale com um especialista da Torcisão.';window.TorcisaoI18n?.refresh?.();}}
$('thAssistantSend')?.addEventListener('click',send);input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();send()}});

document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(toleranceModal?.classList.contains('is-open'))closeTolerance();else if(assistant?.classList.contains('is-open'))closeAssistant();});

/* Clique em qualquer área dos cards técnicos. */
qa('#ferramentas-tecnicas .th-tool-card').forEach((card,index)=>{card.tabIndex=0;card.setAttribute('role','button');const activate=()=>index===0?$('thToleranceOpen')?.click():$('thAssistantOpen')?.click();card.addEventListener('click',e=>{if(e.target.closest('button,a,input,select'))return;activate();});card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});});
})();
