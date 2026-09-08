(function(){
'use strict';

const root=document.getElementById('barra-trefilada');
if(!root)return;

/* A página de Barra reutiliza a MESMA ferramenta da Home: mesmo markup,
 * mesma tabela h9/h10/h11, mesmas exceções comerciais e mesmo handoff. */
function ensureHomeToleranceModal(){
  if(document.getElementById('thToleranceModal'))return document.getElementById('thToleranceModal');
  const host=document.createElement('div');
  host.innerHTML=`<div class="th-modal-backdrop" id="thToleranceModal" aria-hidden="true">
    <section class="th-modal th-modal-medium th-tool-modal" role="dialog" aria-modal="true" aria-labelledby="thToleranceTitle">
      <div class="th-modal-head"><div><small>FERRAMENTA TÉCNICA</small><h2 id="thToleranceTitle">Consulta de Tolerância Dimensional</h2><p>Barra trefilada · perfil redondo · processo trefilado</p></div><button type="button" class="th-modal-close" data-th-tolerance-close aria-label="Fechar">×</button></div>
      <div class="th-modal-body">
        <div class="th-tool-context"><span class="th-tool-context-icon"><i class="bi bi-rulers"></i></span><div><small>PROCESSO</small><strong>Trefilado</strong><p>Informe a bitola para consultar h9, h10 e h11</p></div></div>
        <div class="th-tolerance-input-block"><label for="thToleranceDiameter">Bitola</label><div class="th-premium-input"><input id="thToleranceDiameter" type="number" inputmode="decimal" min="1" max="250" step="0.01" placeholder="Ex.: 12,70"><span>mm</span></div></div>
        <button type="button" class="th-modal-primary" id="thToleranceRun">Consultar tolerância <i class="bi bi-arrow-right"></i></button>
        <div class="th-tolerance-result" id="thToleranceResult" aria-live="polite"><div class="th-empty-result"><span>h9 · h10 · h11</span><p>O resultado aparece aqui depois da consulta</p></div></div>
        <p class="th-modal-note"><i class="bi bi-info-circle"></i> Para acabamento polido, consulte nosso consultor</p>
      </div>
    </section>
  </div>`;
  const modal=host.firstElementChild;
  document.body.appendChild(modal);
  return modal;
}

const toleranceModal=ensureHomeToleranceModal();
const input=document.getElementById('thToleranceDiameter');
const run=document.getElementById('thToleranceRun');
const out=document.getElementById('thToleranceResult');

/* Cópia da calibração final já usada na Home. Não existe seletor de classe:
 * a consulta devolve h9, h10 e h11 juntas, como na ferramenta original. */
const toleranceRows=[
  {min:1,max:3,h9:.025,h10:.040,h11:.060},
  {min:3,max:6,h9:.030,h10:.048,h11:.075},
  {min:6,max:10,h9:.036,h10:.058,h11:.090},
  {min:10,max:18,h9:.043,h10:.070,h11:.110},
  {min:18,max:30,h9:.052,h10:.084,h11:.130},
  {min:30,max:50,h9:.062,h10:.100,h11:.160},
  {min:50,max:80,h9:.074,h10:.120,h11:.190},
  {min:80,max:120,h9:.087,h10:.140,h11:.220},
  {min:120,max:180,h9:.100,h10:.160,h11:.250},
  {min:180,max:250,h9:.115,h10:null,h11:.290}
];
const parseNum=v=>{const n=parseFloat(String(v||'').replace(',','.'));return Number.isFinite(n)?n:NaN};
const br=(v,d=3)=>Number(v).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
function toleranceCard(cls,tol,nominal,consultReason=''){
  if(tol==null)return `<div><small>${cls}</small><span class="th-tol-value">Sob consulta</span>${consultReason?`<span class="th-tol-consult">${consultReason}</span>`:''}<div class="th-tol-limits"><span>Limites <b>Validar com especialista</b></span></div></div>`;
  const min=nominal-tol,max=nominal;
  return `<div><small>${cls}</small><span class="th-tol-value">0 / −${br(tol)} mm</span><div class="th-tol-limits"><span>Mínimo <b>${br(min)} mm</b></span><span>Máximo <b>${br(max)} mm</b></span></div></div>`;
}

function calculate(){
  const d=parseNum(input?.value);
  if(!out)return;
  if(!Number.isFinite(d)||d<=1||d>250){
    out.innerHTML='<div class="th-empty-result"><span>BITOLA</span><p>Informe uma bitola válida acima de 1 mm e até 250 mm</p></div>';
    delete out.dataset.commercialSummary;
    return;
  }
  const row=toleranceRows.find(r=>d>r.min&&d<=r.max);
  if(!row){
    out.innerHTML='<div class="th-empty-result"><span>CONSULTA</span><p>Não encontrei uma faixa para esta bitola. Consulte nosso consultor</p></div>';
    delete out.dataset.commercialSummary;
    return;
  }

  const h9=d<9.53?null:row.h9;
  const h9Reason=d<9.53?'h9 automático disponível a partir de 9,53 mm':'';
  out.innerHTML=`<div class="th-tolerance-values">${toleranceCard('h9',h9,d,h9Reason)}${toleranceCard('h10',row.h10,d)}${toleranceCard('h11',row.h11,d)}</div><p class="th-tolerance-range-note">Bitola nominal: ${br(d)} mm · processo trefilado · perfil redondo</p>`;

  const h9Summary=h9==null?'Sob consulta abaixo de 9,53 mm':'0 / -'+br(h9)+' mm · mínimo '+br(d-h9)+' mm · máximo '+br(d)+' mm';
  const h10Summary=row.h10==null?'Sob consulta':'0 / -'+br(row.h10)+' mm · mínimo '+br(d-row.h10)+' mm · máximo '+br(d)+' mm';
  out.dataset.commercialSummary=`Bitola: ${br(d)} mm|h9: ${h9Summary}|h10: ${h10Summary}|h11: 0 / -${br(row.h11)} mm · mínimo ${br(d-row.h11)} mm · máximo ${br(d)} mm`;

  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event:'technical_tool_calculate',tool:'tolerancia_dimensional',diameter_mm:d,page:'barra_trefilada'});
}

run?.addEventListener('click',calculate);
input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();calculate();}});

function openTolerance(){
  toleranceModal.classList.add('is-open');
  toleranceModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event:'technical_tool_open',tool:'tolerancia_dimensional',page:'barra_trefilada'});
  setTimeout(()=>input?.focus(),80);
}

function summaryLines(){
  if(out?.dataset.commercialSummary)return out.dataset.commercialSummary.split('|');
  const d=input?.value;
  return d?[`Bitola consultada: ${d} mm`]:['Ferramenta: Consulta de Tolerância Dimensional'];
}

function offerCommercial(){
  setTimeout(()=>window.TorcisaoCommercialHandoff?.offer({
    source:'tolerancia_dimensional',
    label:'Consulta de Tolerância Dimensional',
    title:'Quer levar esta consulta para o comercial?',
    copy:'Envie a bitola e o resultado consultado para o WhatsApp da Torcisão.',
    lines:summaryLines()
  }),120);
}

function closeTolerance(){
  if(!toleranceModal.classList.contains('is-open'))return;
  toleranceModal.classList.remove('is-open');
  toleranceModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  offerCommercial();
}

toleranceModal.querySelector('[data-th-tolerance-close]')?.addEventListener('click',closeTolerance);
toleranceModal.addEventListener('click',e=>{if(e.target===toleranceModal)closeTolerance()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toleranceModal.classList.contains('is-open'))closeTolerance()});

function replaceInventedTool(){
  const card=root.querySelector('#aplicacoes .hf-app-grid .hf-app-card:first-child');
  const old=card?.querySelector('[data-tor-tool="tolerance"]');
  if(!card||!old)return false;
  if(old.dataset.torHomeTolerance==='1')return true;

  /* Clone sem listeners: elimina a calculadora criada em product-pages-v10. */
  const clean=old.cloneNode(true);
  clean.dataset.torHomeTolerance='1';
  const strong=clean.querySelector('strong');
  const small=clean.querySelector('small');
  if(strong)strong.textContent='Consulta de Tolerância Dimensional';
  if(small)small.textContent='Consulte referências h9, h10 e h11 para barras trefiladas de perfil redondo.';
  clean.addEventListener('click',openTolerance);
  old.replaceWith(clean);

  card.querySelector('[data-tor-tolerance-panel]')?.remove();
  return true;
}

/* v10/v14 montam o card alguns milissegundos depois. A camada final troca
 * somente a ferramenta de tolerância e deixa o Theo intacto. */
let attempts=0;
const timer=setInterval(()=>{
  attempts++;
  if(replaceInventedTool()||attempts>50)clearInterval(timer);
},60);

})();
