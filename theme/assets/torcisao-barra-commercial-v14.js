(function(){
'use strict';

const root=document.getElementById('barra-trefilada');
if(!root)return;
const $=id=>document.getElementById(id);

const data={
  btc:{
    title:'Baixo Teor de Carbono · 1006 a 1020',
    lead:'Barra trefilada de baixo teor de carbono, em perfil redondo, disponível nos acabamentos trefilado e polido. Consulte a combinação de bitola, tolerância e comprimento para o seu pedido.',
    facts:[['Faixa de aço','1006 a 1020'],['Bitola','2,00 a 15,88 mm'],['Perfil','Redondo'],['Tolerância','Sob consulta']],
    specs:[['Bitola / diâmetro','2,00 a 15,88 mm'],['Tolerância','Sob consulta'],['Acondicionamento','Feixes embalados'],['Perfil','Redondo'],['Acabamento','Trefilada ou polida']],
    availability:[['Faixa de aço','1006 a 1020'],['Bitola','2,00 a 15,88 mm'],['Acondicionamento','Feixes embalados'],['Comprimento','Conforme especificação · sob consulta']]
  },
  mtc:{
    title:'Médio Teor de Carbono · 1035 a 1050',
    lead:'Barra trefilada de médio teor de carbono, em perfil redondo, disponível nos acabamentos trefilado e polido. A especificação final depende do aço, da bitola e dos requisitos dimensionais do projeto.',
    facts:[['Faixa de aço','1035 a 1050'],['Bitola','4,76 a 15,88 mm'],['Perfil','Redondo'],['Tolerância','Sob consulta']],
    specs:[['Bitola / diâmetro','4,76 a 15,88 mm'],['Tolerância','Sob consulta'],['Acondicionamento','Feixes embalados'],['Perfil','Redondo'],['Acabamento','Trefilada ou polida']],
    availability:[['Faixa de aço','1035 a 1050'],['Bitola','4,76 a 15,88 mm'],['Acondicionamento','Feixes embalados'],['Comprimento','Conforme especificação · sob consulta']]
  },
  atc:{
    title:'Alto Teor de Carbono · 1060 a 1090',
    lead:'Barra trefilada de alto teor de carbono, em perfil redondo, disponível nos acabamentos trefilado e polido. Aço, bitola, tolerância e comprimento devem ser confirmados para a aplicação informada.',
    facts:[['Faixa de aço','1060 a 1090'],['Bitola','4,76 a 15,88 mm'],['Perfil','Redondo'],['Tolerância','Sob consulta']],
    specs:[['Bitola / diâmetro','4,76 a 15,88 mm'],['Tolerância','Sob consulta'],['Acondicionamento','Feixes embalados'],['Perfil','Redondo'],['Acabamento','Trefilada ou polida']],
    availability:[['Faixa de aço','1060 a 1090'],['Bitola','4,76 a 15,88 mm'],['Acondicionamento','Feixes embalados'],['Comprimento','Conforme especificação · sob consulta']]
  },
  ressulfurado:{
    title:'Aço Ressulfurado · 11SMn37',
    lead:'Barra trefilada em aço ressulfurado 11SMn37, com foco em aplicações de usinagem seriada e componentes automotivos, hidráulicos e pneumáticos. Consulte a especificação dimensional do item.',
    facts:[['Aço','11SMn37'],['Bitola','4,76 a 15,88 mm'],['Perfil','Redondo'],['Tolerância','Sob consulta']],
    specs:[['Bitola / diâmetro','4,76 a 15,88 mm'],['Tolerância','Sob consulta'],['Acondicionamento','Feixes embalados'],['Perfil','Redondo'],['Acabamento','Trefilada ou polida']],
    availability:[['Aço','11SMn37'],['Bitola','4,76 a 15,88 mm'],['Acondicionamento','Feixes embalados'],['Comprimento','Conforme especificação · sob consulta']]
  }
};

function kind(){
  const active=root.querySelector('.hf-family-tab.is-active');
  return active?.dataset.bfKind||root.dataset.initialKind||'btc';
}
function facts(items){return items.map(([a,b])=>`<div class="hf-fact"><small>${a}</small><strong>${b}</strong></div>`).join('')}
function rows(items){return items.map(([a,b])=>`<div class="hf-spec-row"><small>${a}</small><strong>${b}</strong></div>`).join('')}
function table(items){return `<table class="hf-availability-table"><thead><tr><th>Referência</th><th>Informação</th></tr></thead><tbody>${items.map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table>`}

function normalizePicker(){
  const picker=$('bfImageVariants');
  if(!picker)return;
  const buttons=picker.querySelectorAll('.hf-image-variant');
  if(buttons[0]&&buttons[0].textContent!=='Trefilada')buttons[0].textContent='Trefilada';
  if(buttons[1]&&buttons[1].textContent!=='Polida')buttons[1].textContent='Polida';
  if(picker.getAttribute('aria-label')!=='Acabamento da barra')picker.setAttribute('aria-label','Acabamento da barra');
}

function syncTechnical(){
  const d=data[kind()]||data.btc;
  if($('bfProductTitle'))$('bfProductTitle').textContent=d.title;
  if($('bfProductLead'))$('bfProductLead').textContent=d.lead;
  if($('bfFacts'))$('bfFacts').innerHTML=facts(d.facts);
  if($('bfSpecs'))$('bfSpecs').innerHTML=rows(d.specs);
  if($('bfAvailability'))$('bfAvailability').innerHTML=table(d.availability);
  if($('bfCaptionTitle'))$('bfCaptionTitle').textContent=d.title;
  normalizePicker();
}

function reviseCommercialCta(){
  const cta=root.querySelector('.hf-cta-box');
  if(!cta)return;
  const kicker=cta.querySelector('.hf-cta-copy .hf-section-kicker');
  const title=cta.querySelector('.hf-cta-copy h2');
  const copy=cta.querySelector('.hf-cta-copy p');
  if(kicker)kicker.textContent='Atendimento comercial';
  if(title)title.textContent='Pronto para avançar com sua cotação?';
  if(copy)copy.textContent='Envie faixa de aço, bitola, acabamento, comprimento e quantidade para a equipe Torcisão validar a condição de fornecimento e preparar a cotação.';

  const side=cta.querySelector('.hf-cta-side');
  if(side&&side.dataset.torCommercial!=='1'){
    side.dataset.torCommercial='1';
    const message=encodeURIComponent('Olá! Vim pela página de Barra Trefilada da Torcisão e gostaria de falar com a equipe comercial sobre uma cotação.');
    side.innerHTML=`<div class="hf-theo-card"><div class="hf-commercial-icon" aria-hidden="true"><i class="bi bi-headset"></i></div><div class="hf-theo-copy"><small>Equipe Torcisão</small><strong>Comercial</strong><span>(11) 2334-9989 · atendimento direto</span></div></div><div class="hf-cta-actions"><a class="hf-btn hf-btn-primary" href="https://wa.me/551123349989?text=${message}" target="_blank" rel="noopener" data-analytics-origin="barra_cta_whatsapp" data-analytics-product="barra_trefilada"><i class="bi bi-whatsapp"></i> Falar com o comercial</a><button type="button" class="hf-btn hf-btn-secondary" data-tor-barra-quote>Solicitar cotação</button></div>`;
    side.querySelector('[data-tor-barra-quote]')?.addEventListener('click',()=>document.getElementById('bfQuoteTab')?.click());
  }
}

function revisePageCopy(){
  const intro=root.querySelector('.hf-top .hf-intro');
  if(intro)intro.textContent='Compare baixo, médio e alto teor de carbono e aço ressulfurado, escolha o acabamento e consulte as especificações para a sua necessidade.';

  const specHead=root.querySelector('#especificacoes .hf-section-head');
  if(specHead){
    const title=specHead.querySelector('.hf-section-title');
    const copy=specHead.querySelector('.hf-section-intro');
    if(title)title.textContent='Características da opção selecionada';
    if(copy)copy.textContent='Consulte faixa de aço, bitola, perfil, acabamento e acondicionamento. Tolerância e comprimento devem ser confirmados conforme a especificação do pedido.';
  }

  const appHead=root.querySelector('#aplicacoes .hf-section-head');
  if(appHead){
    const title=appHead.querySelector('.hf-section-title');
    const copy=appHead.querySelector('.hf-section-intro');
    if(title)title.textContent='Organize os requisitos antes da cotação';
    if(copy)copy.textContent='Informe aço, bitola, acabamento, comprimento e processo da peça para direcionar a consulta à opção adequada.';
  }

  const quality=root.querySelector('.hf-quality-copy p');
  if(quality)quality.textContent='Consulte o certificado ISO 9001 da Torcisão. Requisitos específicos do item devem ser confirmados durante a cotação.';
  reviseCommercialCta();
}

function reviseTools(){
  const left=root.querySelector('#aplicacoes .hf-app-grid .hf-app-card:first-child');
  if(left){
    const title=left.querySelector('h3');
    if(title)title.textContent='Ferramentas para avançar';
    const tol=left.querySelector('[data-tor-tool="tolerance"]');
    if(tol){
      const strong=tol.querySelector('strong'),small=tol.querySelector('small');
      if(strong)strong.textContent='Consulta de tolerância';
      if(small)small.textContent='A tolerância é definida sob consulta conforme aço, bitola e requisito dimensional.';
    }
    const panel=left.querySelector('[data-tor-tolerance-panel]');
    if(panel)panel.innerHTML='<div class="tor-tolerance-result"><strong>Tolerância: sob consulta.</strong><br>Informe faixa de aço, bitola nominal, acabamento, comprimento e requisito dimensional para a equipe validar a condição de fornecimento.</div>';
    const assistant=left.querySelector('[data-tor-tool="assistant"]');
    if(assistant){
      const icon=assistant.querySelector('.tor-product-tool-icon');
      const strong=assistant.querySelector('strong'),small=assistant.querySelector('small');
      if(icon){icon.classList.add('tor-product-tool-icon--theo');icon.innerHTML='<img src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt="Theo">';}
      if(strong)strong.textContent='Assistente de aplicação';
      if(small)small.textContent='Organize aço, bitola, acabamento, comprimento e processo antes da cotação.';
    }
  }

  const right=root.querySelector('#aplicacoes .hf-app-grid .hf-app-card:nth-child(2)');
  if(right){
    const title=right.querySelector('h3');
    if(title)title.textContent='O que informar na consulta';
    const boxes=right.querySelectorAll('.hf-variant-box');
    const copy=[
      ['Aço e bitola','Informe a faixa de aço e o diâmetro nominal previstos no desenho ou especificação.'],
      ['Acabamento e comprimento','Indique se a necessidade é trefilada ou polida e informe o comprimento solicitado.'],
      ['Processo da peça','Usinagem, conformação, soldagem ou outra etapa de fabricação ajuda a equipe a validar a condição adequada.']
    ];
    boxes.forEach((box,i)=>{if(!copy[i])return;const s=box.querySelector('strong'),p=box.querySelector('p');if(s)s.textContent=copy[i][0];if(p)p.textContent=copy[i][1];});
  }
}

function reviseManualAssistant(){
  const select=$('bfManualSelect');
  if(select){
    const labels={btc:'Baixo Carbono · 1006 a 1020',mtc:'Médio Carbono · 1035 a 1050',atc:'Alto Carbono · 1060 a 1090',ressulfurado:'Aço Ressulfurado · 11SMn37'};
    Array.from(select.options).forEach(o=>{if(labels[o.value])o.textContent=labels[o.value];});
  }
  const action=$('bfManualAction');
  if(action&&!action.dataset.torBarraSafe){
    action.dataset.torBarraSafe='1';
    action.addEventListener('click',()=>setTimeout(()=>{
      const d=data[select?.value]||data.btc;
      const res=$('bfManualResult');
      if(!res)return;
      res.innerHTML=`<strong>${d.title}</strong><small>${d.lead}</small><div class="hf-manual-tags">${d.facts.slice(0,3).map(x=>`<span>${x[0]}: ${x[1]}</span>`).join('')}</div>`;
      res.classList.add('is-visible');
    },0));
  }
}

function syncAll(){
  revisePageCopy();
  syncTechnical();
  reviseTools();
  reviseManualAssistant();
}

root.querySelectorAll('[data-bf-kind]').forEach(btn=>btn.addEventListener('click',()=>setTimeout(syncAll,70)));
const pickerObserver=new MutationObserver(normalizePicker);
const waitPicker=setInterval(()=>{const picker=$('bfImageVariants');if(picker){clearInterval(waitPicker);pickerObserver.observe(picker,{childList:true,subtree:true,characterData:true});normalizePicker();}},100);
setTimeout(()=>clearInterval(waitPicker),5000);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(syncAll,140),{once:true});
else setTimeout(syncAll,140);
})();
