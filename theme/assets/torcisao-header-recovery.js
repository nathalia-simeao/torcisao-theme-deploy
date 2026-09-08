(function(){
'use strict';
const $=(id)=>document.getElementById(id),q=(sel,ctx=document)=>ctx.querySelector(sel),qa=(sel,ctx=document)=>Array.from(ctx.querySelectorAll(sel));
const track=(event,params={})=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event},params));};
const fmt=(v,d)=>Number(v||0).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const num=(v)=>{const n=parseFloat(String(v??'').trim().replace(',','.'));return Number.isFinite(n)?n:0;};
const mValue=(v,u)=>u==='mm'?num(v)/1000:num(v);
/* Barra/Arame mantêm o coeficiente aprovado. Haste usa referências internas de diâmetro nominal sem expô-las na interface. */
const kgm=(d)=>Math.pow(num(d),2)*0.006165;
const kgmHaste=(d)=>Math.pow(num(d),2)*0.00616;

function initHeader(){
  const header=$('torHeader');if(!header)return;
  const sync=()=>header.classList.toggle('is-compact',innerWidth>=992&&scrollY>48);
  sync();addEventListener('scroll',sync,{passive:true});addEventListener('resize',sync,{passive:true});
}
function initTheme(){
  const saved=localStorage.getItem('theme');if(saved)document.documentElement.setAttribute('data-bs-theme',saved);
  qa('[data-theme-toggle]').forEach(btn=>btn.addEventListener('click',()=>{const next=document.documentElement.getAttribute('data-bs-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-bs-theme',next);localStorage.setItem('theme',next)}));
}
function initMenu(){const p=$('torMobilePanel');if(!p)return;qa('[data-menu-open]').forEach(b=>b.addEventListener('click',()=>p.classList.add('is-open')));qa('[data-menu-close]').forEach(b=>b.addEventListener('click',()=>p.classList.remove('is-open')));qa('a',p).forEach(a=>a.addEventListener('click',()=>p.classList.remove('is-open')))}

function initLanguage(){
  const modal=$('torLanguageModal');if(!modal)return;
  const open=()=>{modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
  const close=()=>{modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
  qa('[data-language-open]').forEach(b=>b.addEventListener('click',open));q('[data-language-close]',modal)?.addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('is-open'))close()});
  const browserBtn=q('[data-browser-translate]',modal),hint=$('torBrowserTranslateHint');browserBtn?.addEventListener('click',()=>{const next=hint.hasAttribute('hidden');if(next)hint.removeAttribute('hidden');else hint.setAttribute('hidden','');browserBtn.setAttribute('aria-expanded',next?'true':'false')});
}

function initCalculator(){
  const overlay=$('torcisaoCalcOverlay');if(!overlay)return;
  const openBtn=$('torcisaoCalcOpen'),closeBtn=$('torcisaoCalcClose');
  const produto=$('calcProduto'),camada=$('calcCamada'),conector=$('calcConector'),diam=$('calcDiametro'),diamHaste=$('calcDiametroHaste'),compHaste=$('calcComprimentoHaste');
  const camadaWrap=$('calcCamadaWrap'),conectorWrap=$('calcConectorWrap'),diamWrap=$('calcDiametroWrap'),compHasteWrap=$('calcComprimentoHasteWrap');
  const metrosWrap=$('calcMetrosWrap'),qtdWrap=$('calcQtdWrap'),compPecaWrap=$('calcComprimentoPecaWrap'),compInvWrap=$('calcComprimentoInversoWrap');
  const metros=$('calcMetros'),qtd=$('calcQtd'),compPeca=$('calcComprimentoPeca'),compPecaU=$('calcComprimentoPecaUnidade'),pesoIn=$('calcToneladasEntrada'),pesoU=$('calcPesoUnidade'),compInv=$('calcComprimentoInverso'),compInvU=$('calcComprimentoInversoUnidade');
  const modePeso=$('calcModoPeso'),modeTon=$('calcModoTonelagem'),qtyBox=$('calcResultadoQuantidade');
  let mode='peso',lastSummary=[];
  const haste={
    baixa:{'9.00':{label:'9,00 mm',nominal:8.55,lengths:[2.40,2.00,1.50,1.20,1.00]},'10.00':{label:'10,00 mm',nominal:9.48,lengths:[2.40,2.00,1.50,1.20,1.00]},'11.00':{label:'11,00 mm',nominal:10.48,lengths:[3.00,2.40,2.00,1.50,1.20]},'12.30':{label:'12,30 mm',nominal:11.67,lengths:[3.00,2.40,2.00,1.50,1.20,1.00]},'12.70':{label:'12,70 mm',nominal:12.70,lengths:[3.00,2.40,2.00]},'15.40':{label:'15,40 mm',nominal:14.60,lengths:[3.00,2.40,2.00,1.50,1.20,1.00]}},
    alta:{'1/2':{label:'1/2"',nominal:12.80,lengths:[2.40,3.00,2.00]},'5/8':{label:'5/8"',nominal:14.30,lengths:[3.00,2.40,2.00]},'3/4':{label:'3/4"',nominal:17.30,lengths:[3.00,2.40,2.00]}}
  };
  const connectors={'olhal-simples':{label:'Olhal Simples',piece:0.020,hundred:2},'olhal-reforcado':{label:'Olhal Reforçado',piece:0.040,hundred:4},'grampo-simples':{label:'Grampo U Simples',piece:0.085,hundred:8.5},'grampo-reforcado':{label:'Grampo U Reforçado',piece:0.150,hundred:15}};
  function reset(){
    $('calcKgMetro').textContent=produto.value==='haste'?'0,0000 kg/haste':produto.value==='conector'?'0,000 kg/peça':'0,000 kg/m';
    $('calcMetrosResultado').textContent=produto.value==='conector'?'0 kg / 100 peças':'0,00 m';$('calcKgResultado').textContent='0,00 kg';$('calcTonResultado').textContent='0,000 t';$('calcQtdResultado').textContent='0';qtyBox.hidden=true;lastSummary=[];
  }
  function fillHaste(){const data=haste[camada.value];diamHaste.innerHTML='';Object.entries(data).forEach(([v,it])=>diamHaste.add(new Option(it.label,v)));diamHaste.hidden=false;fillLengths();}
  function fillLengths(){const it=haste[camada.value]?.[diamHaste.value];compHaste.innerHTML='';(it?.lengths||[]).forEach(v=>compHaste.add(new Option(`${fmt(v,2)} m · ${Math.round(v*1000).toLocaleString('pt-BR')} mm`,v.toFixed(2))));$('calcDiametroHelp').textContent='Selecione a bitola comercial Torcisão. O cálculo usa referências internas cadastradas para o modelo escolhido.';}
  function pieceWeight(){const it=haste[camada.value]?.[diamHaste.value],len=num(compHaste.value),nominal=num(it?.nominal);if(!it||!len||!nominal)return 0;return kgmHaste(nominal)*len;}
  function updateConnector(){const it=connectors[conector.value];$('calcConectorHelp').textContent=it?`Referência de peso: ${fmt(it.hundred,it.hundred%1?1:0)} kg a cada 100 peças · ${fmt(it.piece,3)} kg/peça.`:'';}
  function updateUI(){
    const p=produto.value,h=p==='haste',a=p==='arame',b=p==='barra',c=p==='conector';camadaWrap.hidden=!h;conectorWrap.hidden=!c;compHasteWrap.hidden=!h;diamWrap.hidden=c;diam.hidden=!(a||b);diamHaste.hidden=!h;metrosWrap.hidden=!(a||b);qtdWrap.hidden=!(b||h||c);compPecaWrap.hidden=!b;compInvWrap.hidden=!b;
    if(a){$('torcisaoCalcTitle').textContent='Calculadora de arame trefilado';$('calcProfileBadge').textContent='PERFIL REDONDO';$('calcMethodDescription').textContent='Cálculo teórico por bitola e metragem para arames Torcisão com seção circular.';$('calcNote').textContent='Resultado teórico para arames de perfil redondo. Acondicionamento e condições comerciais devem ser confirmados com a equipe Torcisão.';}
    if(b){$('torcisaoCalcTitle').textContent='Calculadora de barra trefilada';$('calcProfileBadge').textContent='PERFIL REDONDO';$('calcMethodDescription').textContent='Cálculo teórico por bitola e comprimento para barras Torcisão de seção circular.';$('calcNote').textContent='Resultado teórico para barras de perfil redondo. Tolerâncias dimensionais e características do material podem gerar variação no peso real.';}
    if(h){$('torcisaoCalcTitle').textContent='Calculadora de haste de aterramento';$('calcProfileBadge').textContent='DADOS TORCISÃO';$('calcMethodDescription').textContent='Cálculo separado por modelo, bitola comercial e comprimento conforme referências técnicas da Torcisão.';$('calcNote').textContent='As combinações sem peso de referência validado ficam sob consulta da equipe Torcisão.';fillHaste();}
    if(c){$('torcisaoCalcTitle').textContent='Calculadora de conectores';$('calcProfileBadge').textContent='PESO UNITÁRIO';$('calcMethodDescription').textContent='Cálculo por peso de referência de cada modelo, sem uso de bitola ou kg/m.';$('calcNote').textContent='Os pesos de conectores são referências técnicas por quantidade e não representam lote mínimo de venda.';updateConnector();}
    q('label[for="calcQtd"]').textContent=b?'Quantidade de barras':h?'Quantidade de hastes':c?'Quantidade de conectores':'Quantidade';q('[data-calc-mode="peso"]').textContent=b?'Tenho metragem / quantidade':a?'Tenho a metragem':'Tenho a quantidade';$('calcResultPrimaryLabel').textContent=(a||b)?'Peso por metro':h?'Peso por haste':'Peso por peça';$('calcResultSecondaryLabel').textContent=(a||b)?'Metragem total':h?'Comprimento da haste':'Referência de 100 peças';$('calcResultWeightLabel').textContent=h||c?'Peso total estimado':'Peso total';$('calcQtdResultadoLabel').textContent=b?'Quantidade aproximada de barras':h?'Quantidade de hastes':c?'Quantidade de conectores':'Quantidade';reset();
  }
  function offerCommercial(){const labels={arame:'Arame Trefilado',barra:'Barra Trefilada',haste:'Haste de Aterramento',conector:'Conector'};const baseLines=[`Produto: ${labels[produto.value]||produto.value}`];const lines=lastSummary.length?lastSummary:baseLines;setTimeout(()=>window.TorcisaoCommercialHandoff?.offer({source:'calculadora_header',label:'Calculadora de aço',title:'Quer transformar esse cálculo em orçamento?',copy:'Envie o histórico da simulação para o comercial e continue no WhatsApp sem refazer as informações.',lines}),120);}
  function open(){overlay.classList.add('is-open');overlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';track('calculator_open',{calculator:'aco',origin:'header'});}
  function close(withOffer=true){overlay.classList.remove('is-open');overlay.setAttribute('aria-hidden','true');document.body.style.overflow='';if(withOffer)offerCommercial();}
  function calculate(){
    const p=produto.value,w=num(pesoIn.value)*(pesoU.value==='t'?1000:1);reset();const labels={arame:'Arame Trefilado',barra:'Barra Trefilada',haste:'Haste de Aterramento',conector:'Conector'};lastSummary=[`Produto: ${labels[p]}`];
    if(p==='arame'||p==='barra'){
      const k=kgm(diam.value);if(!k)return alert('Informe uma bitola válida para calcular.');let m=0,kg=0,qb=0;if(mode==='peso'){if(p==='arame'){m=num(metros.value);if(!m)return alert('Informe a metragem total do arame.');}else{const mi=num(metros.value),qv=Math.floor(num(qtd.value)),cp=mValue(compPeca.value,compPecaU.value);if(mi>0)m=mi;else if(qv>0&&cp>0){m=qv*cp;qb=qv;}else return alert('Para barras, informe a metragem total ou a quantidade junto com o comprimento de cada barra.');}kg=k*m;}else{if(!w)return alert('Informe o peso desejado.');kg=w;m=kg/k;if(p==='barra'){const cp=mValue(compInv.value,compInvU.value);if(!cp)return alert('Informe o comprimento de cada barra para calcular a quantidade aproximada.');qb=Math.ceil(m/cp);}}
      $('calcKgMetro').textContent=`${fmt(k,3)} kg/m`;$('calcMetrosResultado').textContent=`${fmt(m,2)} m`;$('calcKgResultado').textContent=`${fmt(kg,2)} kg`;$('calcTonResultado').textContent=`${fmt(kg/1000,3)} t`;if(qb){$('calcQtdResultado').textContent=qb.toLocaleString('pt-BR');qtyBox.hidden=false;}lastSummary.push(`Bitola / diâmetro: ${fmt(num(diam.value),2)} mm`,`Peso por metro: ${fmt(k,3)} kg/m`,`Metragem calculada: ${fmt(m,2)} m`,`Peso calculado: ${fmt(kg,2)} kg`);if(qb)lastSummary.push(`Quantidade aproximada: ${qb.toLocaleString('pt-BR')} barras`);
    }else if(p==='haste'){
      const pw=pieceWeight(),len=num(compHaste.value);if(!pw)return alert('Ainda não há peso de referência validado para esta combinação. Consulte a equipe Torcisão.');let qv=0,kg=0;if(mode==='peso'){qv=Math.floor(num(qtd.value));if(!qv)return alert('Informe a quantidade de hastes.');kg=qv*pw;}else{if(!w)return alert('Informe o peso desejado.');qv=Math.ceil(w/pw);kg=qv*pw;}$('calcKgMetro').textContent=`${fmt(pw,4)} kg/haste`;$('calcMetrosResultado').textContent=`${fmt(len,2)} m · ${Math.round(len*1000).toLocaleString('pt-BR')} mm`;$('calcKgResultado').textContent=`${fmt(kg,2)} kg`;$('calcTonResultado').textContent=`${fmt(kg/1000,3)} t`;$('calcQtdResultado').textContent=qv.toLocaleString('pt-BR');qtyBox.hidden=false;lastSummary.push(`Tipo: ${camada.options[camada.selectedIndex].text}`,`Bitola: ${diamHaste.options[diamHaste.selectedIndex]?.text||''}`,`Comprimento: ${Math.round(len*1000).toLocaleString('pt-BR')} mm`,`Peso por haste: ${fmt(pw,4)} kg`,`Quantidade: ${qv.toLocaleString('pt-BR')}`,`Peso total estimado: ${fmt(kg,2)} kg`);
    }else{
      const it=connectors[conector.value];let qv=0,kg=0;if(mode==='peso'){qv=Math.floor(num(qtd.value));if(!qv)return alert('Informe a quantidade de conectores.');kg=qv*it.piece;}else{if(!w)return alert('Informe o peso desejado.');qv=Math.ceil(w/it.piece);kg=qv*it.piece;}$('calcKgMetro').textContent=`${fmt(it.piece,3)} kg/peça`;$('calcMetrosResultado').textContent=`${fmt(it.hundred,it.hundred%1?1:0)} kg / 100 peças`;$('calcKgResultado').textContent=`${fmt(kg,2)} kg`;$('calcTonResultado').textContent=`${fmt(kg/1000,3)} t`;$('calcQtdResultado').textContent=qv.toLocaleString('pt-BR');qtyBox.hidden=false;lastSummary.push(`Modelo: ${it.label}`,`Referência: ${fmt(it.hundred,it.hundred%1?1:0)} kg / 100 peças`,`Quantidade: ${qv.toLocaleString('pt-BR')}`,`Peso total estimado: ${fmt(kg,2)} kg`);
    }track('calculator_calculate',{calculator:'aco',product:p,mode});
  }
  openBtn?.addEventListener('click',open);closeBtn?.addEventListener('click',()=>close(true));overlay.addEventListener('click',e=>{if(e.target===overlay)close(true)});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('is-open'))close(true)});qa('[data-calc-mode]').forEach(btn=>btn.addEventListener('click',()=>{mode=btn.dataset.calcMode;qa('[data-calc-mode]').forEach(x=>x.classList.toggle('is-active',x===btn));modePeso.hidden=mode!=='peso';modeTon.hidden=mode!=='tonelagem';reset();}));produto.addEventListener('change',updateUI);camada.addEventListener('change',fillHaste);diamHaste.addEventListener('change',fillLengths);conector.addEventListener('change',()=>{updateConnector();reset();});compHaste?.addEventListener('change',reset);$('torcisaoCalcButton')?.addEventListener('click',calculate);updateUI();
}

document.addEventListener('DOMContentLoaded',()=>{initHeader();initTheme();initLanguage();initMenu();initCalculator()});
})();