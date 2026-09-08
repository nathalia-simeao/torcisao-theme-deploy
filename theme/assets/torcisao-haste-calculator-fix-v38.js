(function(){
'use strict';

const NUM=(v)=>{const n=parseFloat(String(v??'').trim().replace(',','.'));return Number.isFinite(n)?n:0;};
const KG_COEF=0.00616;
const HASTE_DIAMETERS={
  baixa:{'9.00':8.55,'10.00':9.48,'11.00':10.48,'12.30':11.67,'12.70':12.70,'15.40':14.60},
  alta:{'1/2':12.80,'5/8':14.30,'3/4':17.30}
};
let applying=false;
let observer=null;

function locale(){
  if(document.body.classList.contains('tor-lang-en'))return 'en-US';
  if(document.body.classList.contains('tor-lang-es'))return 'es-ES';
  return 'pt-BR';
}
function fmt(v,d){return Number(v||0).toLocaleString(locale(),{minimumFractionDigits:d,maximumFractionDigits:d});}
function currentMode(){
  const active=document.querySelector('[data-calc-mode].is-active');
  if(active?.dataset?.calcMode)return active.dataset.calcMode;
  const qty=document.getElementById('calcQtdWrap');
  return qty && !qty.hidden ? 'peso' : 'tonelagem';
}
function currentNominal(){
  const camada=document.getElementById('calcCamada')?.value;
  const bitola=document.getElementById('calcDiametroHaste')?.value;
  return NUM(HASTE_DIAMETERS[camada]?.[bitola]);
}
function pieceWeight(){
  const nominal=currentNominal();
  const len=NUM(document.getElementById('calcComprimentoHaste')?.value);
  if(!nominal||!len)return 0;
  return nominal*nominal*KG_COEF*len;
}
function renderHasteResult(){
  if(applying)return;
  const produto=document.getElementById('calcProduto');
  if(!produto||produto.value!=='haste')return;
  const pw=pieceWeight();
  const len=NUM(document.getElementById('calcComprimentoHaste')?.value);
  if(!pw||!len)return;

  const qtd=document.getElementById('calcQtd');
  const pesoIn=document.getElementById('calcToneladasEntrada');
  const pesoU=document.getElementById('calcPesoUnidade');
  const mode=currentMode();
  let qv=0,kg=0;

  if(mode==='tonelagem'){
    const wanted=NUM(pesoIn?.value)*(pesoU?.value==='t'?1000:1);
    if(!wanted)return;
    qv=Math.ceil(wanted/pw);
    kg=qv*pw;
  }else{
    qv=Math.floor(NUM(qtd?.value));
    if(!qv)return;
    kg=qv*pw;
  }

  applying=true;
  try{
    const primary=document.getElementById('calcKgMetro');
    const secondary=document.getElementById('calcMetrosResultado');
    const total=document.getElementById('calcKgResultado');
    const tons=document.getElementById('calcTonResultado');
    const qout=document.getElementById('calcQtdResultado');
    const qbox=document.getElementById('calcResultadoQuantidade');

    if(primary)primary.textContent=`${fmt(pw,4)} kg/haste`;
    if(secondary)secondary.textContent=`${fmt(len,2)} m · ${Math.round(len*1000).toLocaleString(locale())} mm`;
    if(total)total.textContent=`${fmt(kg,2)} kg`;
    if(tons)tons.textContent=`${fmt(kg/1000,3)} t`;
    if(qout)qout.textContent=qv.toLocaleString(locale());
    if(qbox)qbox.hidden=false;
  }finally{
    applying=false;
  }
}

function scheduleRender(){
  [0,16,50,120,250].forEach(ms=>setTimeout(renderHasteResult,ms));
  requestAnimationFrame(()=>requestAnimationFrame(renderHasteResult));
}

function bindCalculator(){
  const btn=document.getElementById('torcisaoCalcButton');
  if(btn&&!btn.dataset.hasteFormulaBound){
    btn.dataset.hasteFormulaBound='1';
    btn.addEventListener('click',scheduleRender,true);
    btn.addEventListener('click',scheduleRender,false);
  }
  document.addEventListener('click',(event)=>{
    if(event.target.closest('#torcisaoCalcButton'))scheduleRender();
  },true);

  const primary=document.getElementById('calcKgMetro');
  if(primary&&!observer){
    observer=new MutationObserver(()=>{
      if(applying)return;
      const produto=document.getElementById('calcProduto');
      if(produto?.value==='haste')setTimeout(renderHasteResult,0);
    });
    observer.observe(primary,{childList:true,characterData:true,subtree:true});
  }
}

function patchCommercialOffer(){
  const api=window.TorcisaoCommercialHandoff;
  if(!api||typeof api.offer!=='function'||api.__hasteCalcFixed)return false;
  const original=api.offer.bind(api);
  api.offer=function(opts={}){
    const produto=document.getElementById('calcProduto');
    if(opts.source==='calculadora_header'&&produto?.value==='haste'){
      renderHasteResult();
      const text=(id)=>document.getElementById(id)?.textContent?.trim()||'';
      const selected=(id)=>{const s=document.getElementById(id);return s?.options?.[s.selectedIndex]?.text||'';};
      opts=Object.assign({},opts,{lines:[
        `Produto: ${selected('calcProduto')||'Haste de Aterramento'}`,
        `Tipo: ${selected('calcCamada')}`,
        `Bitola: ${selected('calcDiametroHaste')}`,
        `Comprimento: ${selected('calcComprimentoHaste')}`,
        `Peso por haste: ${text('calcKgMetro')}`,
        `Quantidade: ${text('calcQtdResultado')}`,
        `Peso total estimado: ${text('calcKgResultado')}`,
        `Tonelagem: ${text('calcTonResultado')}`
      ].filter(Boolean)});
    }
    return original(opts);
  };
  api.__hasteCalcFixed=true;
  return true;
}

function init(){
  bindCalculator();
  if(!patchCommercialOffer()){
    let tries=0;
    const timer=setInterval(()=>{tries++;bindCalculator();if(patchCommercialOffer()||tries>60)clearInterval(timer);},100);
  }
  window.TorcisaoHasteCalculator={recalculate:renderHasteResult,formula:'D² × 0,00616 × comprimento'};
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
