(function(){
'use strict';

const $=(id)=>document.getElementById(id);
const qa=(s,c=document)=>Array.from(c.querySelectorAll(s));

const technical={
  arame:{
    btc:{title:'Baixo Teor de Carbono · 1006 a 1020',facts:[['Faixa de aço','1006 a 1020'],['Bitola','2,00 a 15,88 mm'],['Perfil','Redondo'],['Acondicionamento','Rolos ou spiders']],specs:[['Bitola / diâmetro','2,00 a 15,88 mm'],['Tolerância','Sob consulta'],['Acondicionamento','Rolos ou spiders'],['Perfil','Redondo'],['Acabamento','Trefilado']],availability:[['Faixa de aço','1006 a 1020'],['Bitola','2,00 a 15,88 mm'],['Tolerância','Sob consulta'],['Fornecimento','Rolos ou spiders']]},
    mtc:{title:'Médio Teor de Carbono · 1035 a 1050',facts:[['Faixa de aço','1035 a 1050'],['Bitola','4,76 a 15,88 mm'],['Perfil','Redondo'],['Acondicionamento','Rolos ou spiders']],specs:[['Bitola / diâmetro','4,76 a 15,88 mm'],['Tolerância','Sob consulta'],['Acondicionamento','Rolos ou spiders'],['Perfil','Redondo'],['Acabamento','Trefilado']],availability:[['Faixa de aço','1035 a 1050'],['Bitola','4,76 a 15,88 mm'],['Tolerância','Sob consulta'],['Fornecimento','Rolos ou spiders']]},
    atc:{title:'Alto Teor de Carbono · 1060 a 1090',facts:[['Faixa de aço','1060 a 1090'],['Bitola','4,76 a 15,88 mm'],['Perfil','Redondo'],['Acondicionamento','Rolos ou spiders']],specs:[['Bitola / diâmetro','4,76 a 15,88 mm'],['Tolerância','Sob consulta'],['Acondicionamento','Rolos ou spiders'],['Perfil','Redondo'],['Acabamento','Trefilado']],availability:[['Faixa de aço','1060 a 1090'],['Bitola','4,76 a 15,88 mm'],['Tolerância','Sob consulta'],['Fornecimento','Rolos ou spiders']]}
  },
  barra:{
    btc:{title:'Baixo Teor de Carbono · 1006 a 1020',facts:[['Faixa de aço','1006 a 1020'],['Bitola','2,00 a 15,88 mm'],['Perfil','Redondo'],['Tolerância','Sob consulta']],specs:[['Bitola / diâmetro','2,00 a 15,88 mm'],['Tolerância','Sob consulta'],['Acondicionamento','Feixes embalados'],['Perfil','Redondo'],['Acabamento','Trefilado ou trefilado polido']],availability:[['Faixa de aço','1006 a 1020'],['Bitola','2,00 a 15,88 mm'],['Tolerância','Sob consulta'],['Comprimento','Conforme especificação / consulta']]},
    mtc:{title:'Médio Teor de Carbono · 1035 a 1050',facts:[['Faixa de aço','1035 a 1050'],['Bitola','4,76 a 15,88 mm'],['Tolerância','h9 · h10 · h11'],['Perfil','Redondo']],specs:[['Bitola / diâmetro','4,76 a 15,88 mm'],['Tolerância','h9 · h10 · h11'],['Comprimento','Conforme especificação'],['Perfil','Redondo'],['Acabamento','Trefilado ou trefilado polido']],availability:[['Faixa de aço','1035 a 1050'],['Bitola','4,76 a 15,88 mm'],['Tolerância','h9 · h10 · h11'],['Comprimento','Conforme especificação']]},
    atc:{title:'Alto Teor de Carbono · 1060 a 1090',facts:[['Faixa de aço','1060 a 1090'],['Bitola','2,00 a 15,88 mm'],['Tolerância','h9 · h10 · h11'],['Perfil','Redondo']],specs:[['Bitola / diâmetro','2,00 a 15,88 mm'],['Tolerância','h9 · h10 · h11'],['Comprimento','Conforme especificação'],['Perfil','Redondo'],['Acabamento','Trefilado ou trefilado polido']],availability:[['Faixa de aço','1060 a 1090'],['Bitola','2,00 a 15,88 mm'],['Tolerância','h9 · h10 · h11'],['Comprimento','Conforme especificação']]},
    ressulfurado:{title:'Aço Ressulfurado',facts:[['Linha','Aço ressulfurado'],['Bitola','2,00 a 15,88 mm'],['Perfil','Redondo'],['Tolerância','h9 · h10 · h11']],specs:[['Bitola / diâmetro','2,00 a 15,88 mm'],['Tolerância','h9 · h10 · h11'],['Comprimento','Sob consulta / conforme especificação'],['Perfil','Redondo'],['Acabamento','Trefilado']],availability:[['Bitola','2,00 a 15,88 mm'],['Tolerância','h9 · h10 · h11'],['Comprimento','Sob consulta / conforme especificação']]}
  },
  haste:{
    baixa:{specs:[['Revestimento','Cobre · 20 µm'],['Núcleo','Aço-carbono SAE 1010/1020'],['Perfil','Redondo'],['Acabamento','Trefilado / cobre']],availability:[['9,00 mm','1.000 · 1.200 · 1.500 · 2.000 · 2.400 mm'],['10,00 mm','1.000 · 1.200 · 1.500 · 2.000 · 2.400 mm'],['11,00 mm','1.200 · 1.500 · 2.000 · 2.400 · 3.000 mm'],['12,30 mm','1.200 · 1.500 · 2.000 · 2.400 · 3.000 mm'],['12,70 mm','2.000 · 2.400 mm'],['15,40 mm','1.200 · 1.500 · 2.000 · 2.400 · 3.000 mm']]},
    alta:{specs:[['Revestimento','Cobre eletrolítico · 254 µm'],['Pureza do cobre','≥ 99,9%'],['Núcleo','Aço-carbono SAE 1010/1020'],['Norma','ABNT NBR 13571'],['Tolerância','Sob consulta'],['Perfil','Redondo'],['Acabamento','Trefilado / cobre']],availability:[['1/2” · 12,80 mm','2.400 · 3.000 mm'],['5/8” · 14,30 mm','2.400 · 3.000 mm'],['3/4” · 17,30 mm','2.400 · 3.000 mm'],['2.000 mm','Sob consulta']]}
  }
};

function rows(items){return items.map(([a,b])=>`<div class="hf-spec-row"><small>${a}</small><strong>${b}</strong></div>`).join('')}
function table(items,headingA='Referência',headingB='Informação'){
  return `<table class="hf-availability-table"><thead><tr><th>${headingA}</th><th>${headingB}</th></tr></thead><tbody>${items.map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table>`;
}
function factHtml(items){return items.map(([a,b])=>`<div class="hf-fact"><small>${a}</small><strong>${b}</strong></div>`).join('')}
function active(root,key){const b=root.querySelector('.hf-family-tab.is-active');return b?.dataset[key]||root.dataset.initialKind||''}

function syncTechnical(){
  const arame=$('arame-trefilado');
  if(arame){
    const k=active(arame,'afKind'),d=technical.arame[k];
    if(d){$('afProductTitle').textContent=d.title;$('afFacts').innerHTML=factHtml(d.facts);$('afSpecs').innerHTML=rows(d.specs);$('afAvailability').innerHTML=table(d.availability);$('afCaptionTitle').textContent=d.title;}
  }
  const barra=$('barra-trefilada');
  if(barra){
    const k=active(barra,'bfKind'),d=technical.barra[k];
    if(d){$('bfProductTitle').textContent=d.title;$('bfFacts').innerHTML=factHtml(d.facts);$('bfSpecs').innerHTML=rows(d.specs);$('bfAvailability').innerHTML=table(d.availability);$('bfCaptionTitle').textContent=d.title;}
  }
  const haste=$('haste-aterramento');
  if(haste){
    const k=active(haste,'hfKind'),d=technical.haste[k];
    if(d){$('hfSpecs').innerHTML=rows(d.specs);$('hfAvailability').innerHTML=table(d.availability,k==='baixa'?'Diâmetro':'Referência','Comprimento / condição');}
  }
}

function toleranceValue(size,grade){
  const d=Math.max(2,Math.min(18,Number(size)||0));
  const i=0.45*Math.cbrt(d)+0.001*d;
  const mult={h9:40,h10:64,h11:100}[grade]||40;
  return (i*mult)/1000;
}
function toolsMarkup(type){
  const isBar=type==='barra';
  return `<h3>Ferramentas para avaliar</h3><div class="tor-product-tools">
    <button type="button" class="tor-product-tool" data-tor-tool="tolerance"><span class="tor-product-tool-icon"><i class="bi bi-rulers"></i></span><span><strong>${isBar?'Calculadora de tolerância':'Tolerância do arame'}</strong><small>${isBar?'Simule h9, h10 e h11 pela bitola informada.':'As tolerâncias são definidas sob consulta conforme bitola e aplicação.'}</small></span><span class="tor-product-tool-arrow">↗</span></button>
    <button type="button" class="tor-product-tool" data-tor-tool="assistant"><span class="tor-product-tool-icon"><i class="bi bi-stars"></i></span><span><strong>Assistente de aplicação</strong><small>Use o Theo para organizar produto, bitola e requisitos do projeto.</small></span><span class="tor-product-tool-arrow">↗</span></button>
  </div><div class="tor-tolerance-panel" data-tor-tolerance-panel>${isBar?`<div class="tor-tolerance-grid"><div class="tor-tolerance-field"><label>Bitola nominal (mm)</label><input type="number" min="2" max="15.88" step="0.01" value="10" data-tor-dia></div><div class="tor-tolerance-field"><label>Classe</label><select data-tor-grade><option value="h9">h9</option><option value="h10">h10</option><option value="h11">h11</option></select></div><button type="button" class="tor-tolerance-calc" data-tor-calc>Calcular</button></div><div class="tor-tolerance-result" data-tor-result>Informe a bitola para simular a faixa dimensional.</div>`:`<div class="tor-tolerance-result"><strong>Tolerância: sob consulta.</strong><br>Para arames BTC, MTC e ATC, a tolerância publicada depende da bitola, aplicação e condição de fornecimento. Use o Theo para organizar a especificação antes da cotação.</div>`}</div>`;
}
function mountTools(root,type){
  const app=root.querySelector('#aplicacoes .hf-app-grid');if(!app)return;
  const left=app.querySelector('.hf-app-card');if(!left||left.dataset.torToolsMounted)return;
  left.dataset.torToolsMounted='1';left.innerHTML=toolsMarkup(type);
  const panel=left.querySelector('[data-tor-tolerance-panel]');
  left.querySelector('[data-tor-tool="tolerance"]')?.addEventListener('click',()=>panel?.classList.toggle('is-open'));
  left.querySelector('[data-tor-tool="assistant"]')?.addEventListener('click',()=>root.querySelector(type==='barra'?'#bfAssistantOpen':'#afAssistantOpen')?.click());
  left.querySelector('[data-tor-calc]')?.addEventListener('click',()=>{
    const dia=Number(left.querySelector('[data-tor-dia]')?.value||0),grade=left.querySelector('[data-tor-grade]')?.value||'h9',out=left.querySelector('[data-tor-result]');
    if(!out)return;if(!dia||dia<2||dia>15.88){out.textContent='Informe uma bitola entre 2,00 e 15,88 mm.';return;}
    const tol=toleranceValue(dia,grade),min=dia-tol;
    out.innerHTML=`Para eixo <strong>${grade}</strong> com nominal <strong>${dia.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})} mm</strong>, a simulação resulta em aproximadamente <strong>${min.toLocaleString('pt-BR',{minimumFractionDigits:3,maximumFractionDigits:3})} a ${dia.toLocaleString('pt-BR',{minimumFractionDigits:3,maximumFractionDigits:3})} mm</strong>. Valide a tolerância final na especificação comercial.`;
  });
}

function calibrateLens(root,image,wrap,lens){
  if(!root||!image||!wrap||!lens||wrap.dataset.torLensCalibrated)return;
  wrap.dataset.torLensCalibrated='1';
  wrap.addEventListener('mousemove',(e)=>{
    if(innerWidth<768)return;
    const wr=wrap.getBoundingClientRect(),ir=image.getBoundingClientRect();
    const px=e.clientX-wr.left,py=e.clientY-wr.top;
    const rx=e.clientX-ir.left,ry=e.clientY-ir.top;
    const inside=rx>=0&&ry>=0&&rx<=ir.width&&ry<=ir.height;
    if(!inside){lens.classList.remove('is-visible');wrap.style.setProperty('--tor-tilt-x','0deg');wrap.style.setProperty('--tor-tilt-y','0deg');return;}
    const nx=rx/ir.width,ny=ry/ir.height;
    wrap.style.setProperty('--tor-tilt-y',((nx-.5)*4.2).toFixed(2)+'deg');
    wrap.style.setProperty('--tor-tilt-x',((.5-ny)*4.2).toFixed(2)+'deg');
    lens.style.left=px+'px';lens.style.top=py+'px';
    const factor=2.45,half=lens.offsetWidth/2;
    lens.style.backgroundImage=`url("${image.currentSrc||image.src}")`;
    lens.style.backgroundSize=`${ir.width*factor}px ${ir.height*factor}px`;
    lens.style.backgroundPosition=`${half-rx*factor}px ${half-ry*factor}px`;
    lens.classList.add('is-visible');
  });
  wrap.addEventListener('mouseleave',()=>{lens.classList.remove('is-visible');wrap.style.setProperty('--tor-tilt-x','0deg');wrap.style.setProperty('--tor-tilt-y','0deg')});
}

function bind(){
  const arame=$('arame-trefilado');
  if(arame){qa('[data-af-kind]',arame).forEach(b=>b.addEventListener('click',()=>setTimeout(syncTechnical,0)));mountTools(arame,'arame');calibrateLens(arame,$('afImage'),$('afImageWrap'),$('afLens'));}
  const barra=$('barra-trefilada');
  if(barra){qa('[data-bf-kind]',barra).forEach(b=>b.addEventListener('click',()=>setTimeout(syncTechnical,0)));mountTools(barra,'barra');calibrateLens(barra,$('bfImage'),$('bfImageWrap'),$('bfLens'));}
  const haste=$('haste-aterramento');
  if(haste){qa('[data-hf-kind]',haste).forEach(b=>b.addEventListener('click',()=>setTimeout(syncTechnical,0)));calibrateLens(haste,$('hfImage'),$('hfImageWrap'),$('hfLens'));}
  syncTechnical();
}

function start(){setTimeout(bind,40)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
