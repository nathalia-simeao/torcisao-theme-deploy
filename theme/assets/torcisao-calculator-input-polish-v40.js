(function(){
'use strict';

function language(){
  const query=new URLSearchParams(location.search).get('lang');
  if(['pt','en','es'].includes(query))return query;
  const match=location.pathname.match(/^\/(en|es)(?:\/|$)/i);
  return match?match[1].toLowerCase():'pt';
}

const lang=language();
const copy={
  pt:{unit:'UNIDADE',up:'Aumentar quantidade',down:'Diminuir quantidade'},
  en:{unit:'UNIT',up:'Increase quantity',down:'Decrease quantity'},
  es:{unit:'UNIDAD',up:'Aumentar cantidad',down:'Disminuir cantidad'}
}[lang];
const decimalSeparator=lang==='en'?'.':',';

function parseLocale(value){
  const raw=String(value??'').trim().replace(/\s/g,'').replace(',','.');
  const n=Number.parseFloat(raw);
  return Number.isFinite(n)?n:NaN;
}
function formatMeters(value){
  if(!Number.isFinite(value))return '';
  return value.toFixed(3).replace('.',decimalSeparator);
}
function formatMillimeters(value){
  if(!Number.isFinite(value))return '';
  const rounded=Math.round(value*1000)/1000;
  return Number.isInteger(rounded)?String(rounded):String(rounded).replace('.',decimalSeparator);
}
function dispatch(input){
  input.dispatchEvent(new Event('input',{bubbles:true}));
  input.dispatchEvent(new Event('change',{bubbles:true}));
}

function enhanceQuantity(){
  const input=document.getElementById('calcQtd');
  if(!input||input.dataset.torStepperReady==='1')return !!input;
  input.dataset.torStepperReady='1';

  const shell=document.createElement('div');
  shell.className='tor-calc-qty-shell';
  input.parentNode.insertBefore(shell,input);
  shell.appendChild(input);

  const stepper=document.createElement('div');
  stepper.className='tor-calc-stepper';
  stepper.innerHTML=
    '<button type="button" class="tor-calc-step-up" aria-label="'+copy.up+'"></button>'+ 
    '<button type="button" class="tor-calc-step-down" aria-label="'+copy.down+'"></button>';
  shell.appendChild(stepper);

  function step(direction){
    const current=Number.parseInt(input.value||'0',10)||0;
    const next=Math.max(0,current+direction);
    input.value=String(next);
    dispatch(input);
    input.focus({preventScroll:true});
  }
  stepper.querySelector('.tor-calc-step-up').addEventListener('click',function(){step(1);});
  stepper.querySelector('.tor-calc-step-down').addEventListener('click',function(){step(-1);});
  return true;
}

function normalizeMeterInput(input,unitSelect,force){
  if(!input||!unitSelect||unitSelect.value!=='m')return;
  const raw=String(input.value||'').trim();
  if(!raw)return;
  let value=parseLocale(raw);
  if(!Number.isFinite(value))return;

  /* Em metros, 3000 sem separador representa 3,000 m, não 3000 m. */
  const explicitSeparator=/[,.]/.test(raw);
  if(!explicitSeparator && /^\d{4,}$/.test(raw))value=value/1000;
  if(force||!explicitSeparator||raw.indexOf(decimalSeparator)===-1)input.value=formatMeters(value);
}

function enhanceLength(inputId,selectId){
  const input=document.getElementById(inputId);
  const select=document.getElementById(selectId);
  if(!input||!select)return false;

  if(input.dataset.torLengthReady!=='1'){
    input.dataset.torLengthReady='1';
    input.type='text';
    input.setAttribute('inputmode','decimal');
    input.removeAttribute('min');
    input.removeAttribute('step');

    input.addEventListener('blur',function(){
      if(select.value==='m')normalizeMeterInput(input,select,true);
    });

    input.addEventListener('keydown',function(e){
      if(e.key==='Enter'&&select.value==='m')normalizeMeterInput(input,select,true);
    });
  }

  if(select.dataset.torUnitReady!=='1'){
    select.dataset.torUnitReady='1';
    select.dataset.torPreviousUnit=select.value||'m';
    select.addEventListener('change',function(){
      const previous=select.dataset.torPreviousUnit||'m';
      const next=select.value||'m';
      const current=parseLocale(input.value);
      if(Number.isFinite(current)&&input.value!==''){
        let converted=current;
        if(previous==='m'&&next==='mm')converted=current*1000;
        if(previous==='mm'&&next==='m')converted=current/1000;
        input.value=next==='m'?formatMeters(converted):formatMillimeters(converted);
        dispatch(input);
      }
      select.dataset.torPreviousUnit=next;
    });
  }

  const visual=select.nextElementSibling&&select.nextElementSibling.classList.contains('tor-custom-select')?select.nextElementSibling:null;
  if(!visual)return false;

  /* Desfaz a estrutura antiga que deslocava o seletor, caso ainda exista no DOM. */
  const oldControl=visual.closest('.tor-calc-unit-control');
  if(oldControl){
    const parent=oldControl.parentNode;
    parent.insertBefore(visual,oldControl);
    oldControl.remove();
  }

  if(select.dataset.torUnitCaptionReady!=='1'){
    select.dataset.torUnitCaptionReady='1';
    const inline=visual.parentElement;
    if(inline){
      inline.querySelectorAll(':scope > .tor-calc-unit-caption').forEach(function(el){el.remove();});
      const caption=document.createElement('span');
      caption.className='tor-calc-unit-caption';
      caption.textContent=copy.unit;
      inline.appendChild(caption);
    }
  }
  return true;
}

function normalizeBeforeCalculation(){
  [
    ['calcComprimentoPeca','calcComprimentoPecaUnidade'],
    ['calcComprimentoInverso','calcComprimentoInversoUnidade']
  ].forEach(function(ids){
    const input=document.getElementById(ids[0]);
    const select=document.getElementById(ids[1]);
    if(input&&select&&select.value==='m')normalizeMeterInput(input,select,true);
  });
}

function init(){
  enhanceQuantity();
  const a=enhanceLength('calcComprimentoPeca','calcComprimentoPecaUnidade');
  const b=enhanceLength('calcComprimentoInverso','calcComprimentoInversoUnidade');

  const calculate=document.getElementById('torcisaoCalcButton');
  if(calculate&&calculate.dataset.torLengthNormalizeReady!=='1'){
    calculate.dataset.torLengthNormalizeReady='1';
    calculate.addEventListener('click',normalizeBeforeCalculation,true);
  }

  return a&&b;
}

function boot(){
  init();
  let tries=0;
  const timer=setInterval(function(){
    tries+=1;
    const ready=init();
    if(ready||tries>=12)clearInterval(timer);
  },80);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
})();
