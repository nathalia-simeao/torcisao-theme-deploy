(function(){
'use strict';
const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>Array.from(c.querySelectorAll(s));

function initBrowserTranslationSwitch(){
  const control=q('[data-browser-translate]');if(!control)return;
  const status=q('.tor-browser-translate-status',control);
  const hint=document.getElementById('torBrowserTranslateHint');
  control.setAttribute('role','switch');
  control.removeAttribute('aria-expanded');
  if(status)status.setAttribute('aria-hidden','true');
  const stored=localStorage.getItem('torcisao_browser_translation');
  let on=stored===null?true:stored==='on';
  function apply(){
    control.classList.toggle('is-on',on);control.setAttribute('aria-checked',on?'true':'false');
    localStorage.setItem('torcisao_browser_translation',on?'on':'off');
    document.documentElement.setAttribute('translate',on?'yes':'no');
    if(hint){hint.classList.toggle('is-visible',on);hint.innerHTML=on?'Tradução do navegador <strong>ativada</strong>. O site permite que o navegador aplique a tradução automática conforme as preferências configuradas no Chrome, Edge, Safari ou outro navegador compatível.':'Tradução do navegador <strong>desativada</strong>. Use a seleção manual de idioma abaixo.';}
  }
  apply();
  control.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();on=!on;apply();},{capture:true});
}

function enhanceSelect(select){
  if(!select||select.dataset.torCustomSelect==='1')return;
  select.dataset.torCustomSelect='1';select.classList.add('tor-native-select');
  const root=document.createElement('div');root.className='tor-custom-select';
  const button=document.createElement('button');button.type='button';button.className='tor-custom-select-button';button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label',select.getAttribute('aria-label')||q(`label[for="${select.id}"]`)?.textContent?.trim()||'Selecionar opção');
  const menu=document.createElement('div');menu.className='tor-custom-select-menu';menu.setAttribute('role','listbox');
  root.append(button,menu);select.insertAdjacentElement('afterend',root);
  function selectedOption(){return select.options[select.selectedIndex]||select.options[0];}
  function syncButton(){const op=selectedOption();button.textContent=op?op.textContent:'Selecionar';button.disabled=select.disabled;root.classList.toggle('is-disabled',select.disabled);}
  function close(){root.classList.remove('is-open');button.setAttribute('aria-expanded','false');}
  function rebuild(){
    menu.innerHTML='';Array.from(select.options).forEach((op,index)=>{const item=document.createElement('button');item.type='button';item.className='tor-custom-select-option'+(index===select.selectedIndex?' is-selected':'');item.setAttribute('role','option');item.setAttribute('aria-selected',index===select.selectedIndex?'true':'false');item.disabled=op.disabled;item.textContent=op.textContent;item.addEventListener('click',e=>{e.stopPropagation();select.selectedIndex=index;select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));rebuild();close();button.focus();});menu.appendChild(item);});syncButton();
  }
  button.addEventListener('click',e=>{e.stopPropagation();const willOpen=!root.classList.contains('is-open');qa('.tor-custom-select.is-open').forEach(x=>{if(x!==root){x.classList.remove('is-open');q('.tor-custom-select-button',x)?.setAttribute('aria-expanded','false');}});root.classList.toggle('is-open',willOpen);button.setAttribute('aria-expanded',willOpen?'true':'false');});
  button.addEventListener('keydown',e=>{if(e.key==='Escape'){close();return;}if((e.key==='ArrowDown'||e.key==='Enter'||e.key===' ')&&!root.classList.contains('is-open')){e.preventDefault();root.classList.add('is-open');button.setAttribute('aria-expanded','true');q('.tor-custom-select-option.is-selected',menu)?.focus();}});
  select.addEventListener('change',rebuild);
  new MutationObserver(rebuild).observe(select,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled','hidden']});
  rebuild();
}
function initCustomSelects(){
  qa('.torcisao-calc-modal select,.th-modal select,.hf-assistant select').forEach(enhanceSelect);
  document.addEventListener('click',()=>qa('.tor-custom-select.is-open').forEach(x=>{x.classList.remove('is-open');q('.tor-custom-select-button',x)?.setAttribute('aria-expanded','false');}));
}

function initHeroArameImage(){
  const slides=qa('[data-home-hero-slide]');const img=slides[2]?.querySelector('img');if(!img)return;
  try{const u=new URL(img.src,location.href);u.pathname=u.pathname.replace(/\/assets\/[^/]+$/,'/assets/arame1.webp');img.src=u.href;img.setAttribute('data-phase8-arame','arame1.webp');}catch(e){}
}

function initClickableToolCards(){
  qa('#ferramentas-tecnicas .th-tool-card').forEach((card,index)=>{
    card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label',index===0?'Abrir Consulta de Tolerância Dimensional':'Abrir Assistente de Aplicação Theo');
    const activate=()=>{const btn=index===0?document.getElementById('thToleranceOpen'):document.getElementById('thAssistantOpen');btn?.click();};
    card.addEventListener('click',e=>{if(e.target.closest('button,a,input,select'))return;activate();});
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});
  });
}

const toleranceRows=[
  {min:1,max:3,h9:.025,h10:.040,h11:.060},{min:3,max:6,h9:.030,h10:.048,h11:.075},{min:6,max:10,h9:.036,h10:.058,h11:.090},{min:10,max:18,h9:.043,h10:.070,h11:.110},{min:18,max:30,h9:.052,h10:.084,h11:.130},{min:30,max:50,h9:.062,h10:.100,h11:.160},{min:50,max:80,h9:.074,h10:.120,h11:.190},{min:80,max:120,h9:.087,h10:.140,h11:.220},{min:120,max:180,h9:.100,h10:.160,h11:.250},{min:180,max:250,h9:.115,h10:null,h11:.290}
];
const parseNum=v=>{const n=parseFloat(String(v||'').replace(',','.'));return Number.isFinite(n)?n:NaN};
const br=(v,d=3)=>Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
function toleranceCard(cls,tol,nominal,consultReason=''){
  if(tol==null)return `<div><small>${cls}</small><span class="th-tol-value">Sob consulta</span>${consultReason?`<span class="th-tol-consult">${consultReason}</span>`:''}<div class="th-tol-limits"><span>Limites <b>Validar com especialista</b></span></div></div>`;
  const min=nominal-tol,max=nominal;
  return `<div><small>${cls}</small><span class="th-tol-value">0 / −${br(tol)} mm</span><div class="th-tol-limits"><span>Mínimo <b>${br(min)} mm</b></span><span>Máximo <b>${br(max)} mm</b></span></div></div>`;
}
function initToleranceCalibration(){
  const btn=document.getElementById('thToleranceRun'),input=document.getElementById('thToleranceDiameter'),out=document.getElementById('thToleranceResult');if(!btn||!input||!out)return;
  btn.addEventListener('click',()=>{
    const d=parseNum(input.value);if(!Number.isFinite(d)||d<=1||d>250)return;
    const row=toleranceRows.find(r=>d>r.min&&d<=r.max);if(!row)return;
    const h9=d<9.53?null:row.h9;
    const h9Reason=d<9.53?'h9 automático disponível a partir de 9,53 mm':'';
    out.innerHTML=`<div class="th-tolerance-values">${toleranceCard('h9',h9,d,h9Reason)}${toleranceCard('h10',row.h10,d)}${toleranceCard('h11',row.h11,d)}</div><p class="th-tolerance-range-note">Bitola nominal: ${br(d)} mm · processo trefilado · perfil redondo</p>`;
    const h9Summary=h9==null?'Sob consulta abaixo de 9,53 mm':'0 / -'+br(h9)+' mm · mínimo '+br(d-h9)+' mm · máximo '+br(d)+' mm';
    const h10Summary=row.h10==null?'Sob consulta':'0 / -'+br(row.h10)+' mm · mínimo '+br(d-row.h10)+' mm · máximo '+br(d)+' mm';
    out.dataset.commercialSummary=`Bitola: ${br(d)} mm|h9: ${h9Summary}|h10: ${h10Summary}|h11: 0 / -${br(row.h11)} mm · mínimo ${br(d-row.h11)} mm · máximo ${br(d)} mm`;
  });
}

function calculatorLines(){
  const lines=[];const value=id=>document.getElementById(id)?.value;const selected=id=>{const s=document.getElementById(id);return s?.options?.[s.selectedIndex]?.text||'';};
  const product=selected('calcProduto');if(product)lines.push(`Produto: ${product}`);
  if(value('calcCamada'))lines.push(`Tipo: ${selected('calcCamada')}`);
  if(value('calcDiametro'))lines.push(`Bitola: ${value('calcDiametro')} mm`);else if(value('calcDiametroHaste'))lines.push(`Bitola: ${selected('calcDiametroHaste')}`);
  if(value('calcComprimentoHaste'))lines.push(`Comprimento: ${selected('calcComprimentoHaste')}`);
  [['calcKgMetro','Resultado principal'],['calcMetrosResultado','Metragem / comprimento'],['calcKgResultado','Peso total'],['calcTonResultado','Tonelagem'],['calcQtdResultado','Quantidade']].forEach(([id,label])=>{const t=document.getElementById(id)?.textContent?.trim();if(t&& !/^0([,.]0+)?(?:\s|$)/.test(t))lines.push(`${label}: ${t}`);});
  return lines.length?lines:['Calculadora de aço aberta'];
}
function toleranceLines(){const out=document.getElementById('thToleranceResult');if(out?.dataset.commercialSummary)return out.dataset.commercialSummary.split('|');const d=document.getElementById('thToleranceDiameter')?.value;return d?[`Bitola consultada: ${d} mm`]:['Consulta de Tolerância Dimensional aberta'];}
function assistantLines(scope){const lines=[];qa('.th-msg,.hf-msg',scope).slice(-10).forEach(m=>{const who=m.classList.contains('user')?'Cliente':'Theo';const t=m.textContent.trim();if(t)lines.push(`${who}: ${t}`);});return lines.length?lines:['Assistente de Aplicação aberto'];}
function fallbackCommercialOffer(source,label,lines){
  setTimeout(()=>{const overlay=document.getElementById('torCommercialHandoff');if(overlay?.classList.contains('is-open'))return;window.TorcisaoCommercialHandoff?.offer({source,label,title:'Quer falar com o comercial sobre isso?',copy:'Leve o histórico desta ferramenta para o WhatsApp e continue com a equipe Torcisão sem precisar começar do zero.',lines});},220);
}
function initCommercialFallback(){
  document.addEventListener('click',e=>{
    const btn=e.target.closest('#torcisaoCalcClose,[data-th-tolerance-close],[data-th-assistant-close],#hfAssistant .hf-assistant-close,#bfAssistant .hf-assistant-close,#afAssistant .hf-assistant-close');if(!btn)return;
    if(btn.matches('#torcisaoCalcClose'))return fallbackCommercialOffer('calculadora_header','Calculadora de aço',calculatorLines());
    if(btn.matches('[data-th-tolerance-close]'))return fallbackCommercialOffer('tolerancia_dimensional','Consulta de Tolerância Dimensional',toleranceLines());
    const scope=btn.closest('.th-modal-assistant,.hf-assistant');fallbackCommercialOffer('assistente_aplicacao','Assistente de Aplicação · Theo',assistantLines(scope||document));
  },true);
}

function init(){initBrowserTranslationSwitch();initCustomSelects();initHeroArameImage();initClickableToolCards();initToleranceCalibration();initCommercialFallback();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
