(function(){
'use strict';
const root=document.getElementById('haste-aterramento');if(!root)return;
const $=id=>document.getElementById(id),q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>Array.from(c.querySelectorAll(s));
const cfg=window.TORCISAO_HASTE_PAGE||{};
const track=(event,params={})=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event},params));};
const base=location.origin;
const commonApps=['Sistemas de aterramento','SPDA','Geração e transmissão de energia','Distribuição de energia','Redes de telecomunicações','Aterramento de equipamentos','Energias renováveis','Construção industrial'];
const connectorImages={
 'olhal-simples':'https://torcisao.com.br/wp-content/uploads/2026/09/olhalsimples.png',
 'olhal-reforcado':'https://torcisao.com.br/wp-content/uploads/2026/09/olhalreforcado.png',
 'grampo-simples':'https://torcisao.com.br/wp-content/uploads/2026/09/formatoUsimples.png',
 'grampo-reforcado':'https://torcisao.com.br/wp-content/uploads/2026/09/formatoUreforcado.png'
};
const connectorData={
 'olhal-simples':{name:'Olhal Simples',lead:'Conector Torcisão para união entre haste e cabo em sistemas de aterramento.',weight:'2 kg / 100 peças',material:'Latão ou bronze'},
 'olhal-reforcado':{name:'Olhal Reforçado',lead:'Modelo reforçado para conexão entre haste e cabo em sistemas de aterramento.',weight:'4 kg / 100 peças',material:'Latão ou bronze'},
 'grampo-simples':{name:'Grampo U Simples',lead:'Conector em formato U para união entre haste e cabo.',weight:'8,5 kg / 100 peças',material:'Latão ou bronze'},
 'grampo-reforcado':{name:'Grampo U Reforçado',lead:'Modelo reforçado em formato U para conexão entre haste e cabo.',weight:'15 kg / 100 peças',material:'Latão ou bronze'}
};
const data={
 baixa:{
   kicker:'Haste de aterramento',
   title:'Baixa Camada · 20 µm',
   lead:'Núcleo sólido de aço-carbono SAE 1010/1020 com revestimento de cobre de 20 µm. Consulte as combinações disponíveis de diâmetro e comprimento para a sua especificação.',
   image:'assets/hastebaixa.webp',
   facts:[['Camada','20 µm'],['Material','SAE 1010/1020'],['Perfil','Redondo'],['Acabamento','Trefilado / cobre']],
   specs:[['Revestimento','Cobre · 20 µm'],['Núcleo','Aço-carbono SAE 1010/1020'],['Perfil','Redondo'],['Acabamento','Trefilado / cobre']],
   availability:[
     ['9,00 mm','1.000 · 1.200 · 1.500 · 2.000 · 2.400 mm'],
     ['10,00 mm','1.000 · 1.200 · 1.500 · 2.000 · 2.400 mm'],
     ['11,00 mm','1.200 · 1.500 · 2.000 · 2.400 · 3.000 mm'],
     ['12,30 mm','1.200 · 1.500 · 2.000 · 2.400 · 3.000 mm'],
     ['12,70 mm','2.000 · 2.400 mm'],
     ['15,40 mm','1.200 · 1.500 · 2.000 · 2.400 · 3.000 mm']
   ],
   apps:commonApps
 },
 alta:{
   kicker:'Haste de aterramento',
   title:'Alta Camada · 254 µm',
   lead:'Núcleo de aço-carbono SAE 1010/1020 com revestimento eletrolítico de cobre, pureza ≥ 99,9% e camada de 254 µm, conforme ABNT NBR 13571.',
   image:'assets/hastealta.png',
   facts:[['Camada','254 µm'],['Material','SAE 1010/1020'],['Cobre','Pureza ≥ 99,9%'],['Norma','ABNT NBR 13571']],
   specs:[['Revestimento','Cobre eletrolítico · 254 µm'],['Pureza do cobre','≥ 99,9%'],['Núcleo','Aço-carbono SAE 1010/1020'],['Norma','ABNT NBR 13571'],['Tolerância','Sob consulta'],['Perfil','Redondo'],['Acabamento','Trefilado / cobre']],
   availability:[
     ['1/2” · 12,80 mm','2.400 · 3.000 mm'],
     ['5/8” · 14,30 mm','2.400 · 3.000 mm'],
     ['3/4” · 17,30 mm','2.400 · 3.000 mm'],
     ['2.000 mm','Sob consulta']
   ],
   apps:commonApps
 },
 conectores:{kicker:'Conectores para haste',title:'Olhal Simples',lead:connectorData['olhal-simples'].lead,image:connectorImages['olhal-simples'],facts:[['Norma','ABNT NBR 5370'],['Material','Latão ou bronze'],['Referência','2 kg / 100 peças'],['Aplicação','Haste + cabo']],specs:[['Norma','ABNT NBR 5370'],['Modelos','Olhal simples / reforçado · Grampo U simples / reforçado'],['Materiais','Latão ou bronze'],['Aplicação','Conexão entre haste e cabo']],availability:[['Olhal','Simples · Reforçado'],['Grampo U','Simples · Reforçado']],apps:['Sistemas de aterramento','Ambientes residenciais','Instalações prediais','Instalações industriais','Distribuição de energia','Telecomunicações']}
};
let kind=root.dataset.initialKind||'baixa',connector='olhal-simples',zoom=1;
const image=$('hfImage'),wrap=$('hfImageWrap'),lens=$('hfLens');
function themeAsset(path){if(path.startsWith('http'))return path;const themeLink=qa('link[href*="torcisao-haste-family.css"]')[0]?.href||'';const baseTheme=themeLink.split('/assets/')[0];return path.startsWith('assets/')?baseTheme+'/'+path:path;}
function facts(items){$('hfFacts').innerHTML=items.map(([a,b])=>`<div class="hf-fact"><small>${a}</small><strong>${b}</strong></div>`).join('')}
function specs(items){$('hfSpecs').innerHTML=items.map(([a,b])=>`<div class="hf-spec-row"><small>${a}</small><strong>${b}</strong></div>`).join('')}
function availability(items){$('hfAvailability').innerHTML=`<table class="hf-availability-table"><thead><tr><th>Medida / referência</th><th>Disponibilidade / condição</th></tr></thead><tbody>${items.map(([a,b])=>`<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table><p class="hf-confidential-note">Tolerâncias, combinações e condições específicas devem ser confirmadas com a equipe Torcisão.</p>`}
function render(){
 let d=data[kind];if(kind==='conectores'){const c=connectorData[connector];d=Object.assign({},d,{title:c.name,lead:c.lead,image:connectorImages[connector],facts:[['Norma','ABNT NBR 5370'],['Material',c.material],['Referência',c.weight],['Aplicação','Haste + cabo']]});}
 qa('.hf-family-tab').forEach(b=>{const on=b.dataset.hfKind===kind;b.classList.toggle('is-active',on);b.setAttribute('aria-selected',on?'true':'false')});
 $('hfKicker').textContent=d.kicker;$('hfProductTitle').textContent=d.title;$('hfProductLead').textContent=d.lead;facts(d.facts);specs(d.specs);availability(d.availability);$('hfApplications').innerHTML=d.apps.map(x=>`<li>${x}</li>`).join('');
 $('hfConnectorPicker').classList.toggle('is-visible',kind==='conectores');qa('.hf-connector-btn').forEach(b=>b.classList.toggle('is-active',b.dataset.hfConnector===connector));
 image.classList.toggle('is-connector',kind==='conectores');image.src=themeAsset(d.image);image.alt=d.title;$('hfCaptionKicker').textContent=d.kicker;$('hfCaptionTitle').textContent=d.title;$('hfCaptionMeta').textContent=kind==='conectores'?'Conector para haste':'Produto Torcisão';zoom=1;updateZoom();
}
function updateZoom(){image.style.setProperty('--hf-zoom',zoom);$('hfZoomLabel').textContent=zoom.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'×'}
qa('.hf-family-tab').forEach(b=>b.addEventListener('click',()=>{kind=b.dataset.hfKind;render();if(typeof refreshQuoteForm==='function')refreshQuoteForm();track('product_variant_select',{product:'haste_aterramento',variant:kind})}));qa('.hf-connector-btn').forEach(b=>b.addEventListener('click',()=>{connector=b.dataset.hfConnector;render();track('connector_model_select',{model:connector})}));$('hfZoomIn').addEventListener('click',()=>{zoom=Math.min(2.6,zoom+.2);updateZoom()});$('hfZoomOut').addEventListener('click',()=>{zoom=Math.max(.8,zoom-.2);updateZoom()});
wrap.addEventListener('mousemove',e=>{if(innerWidth<768)return;const r=wrap.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;wrap.style.setProperty('--tilt-y',((x/r.width-.5)*5)+'deg');wrap.style.setProperty('--tilt-x',((.5-y/r.height)*5)+'deg');lens.style.left=x+'px';lens.style.top=y+'px';lens.style.backgroundImage=`url("${image.currentSrc||image.src}")`;lens.style.backgroundSize=`${image.clientWidth*2.3}px ${image.clientHeight*2.3}px`;lens.style.backgroundPosition=`${-(x-r.width/2)*2.0 + lens.clientWidth/2}px ${-(y-r.height/2)*2.0 + lens.clientHeight/2}px`;lens.classList.add('is-visible')});wrap.addEventListener('mouseleave',()=>{wrap.style.setProperty('--tilt-x','0deg');wrap.style.setProperty('--tilt-y','0deg');lens.classList.remove('is-visible')});
const light=$('hfLightbox');function openLight(){const li=$('hfLightboxImage');li.src=image.currentSrc||image.src;li.alt=image.alt;light.classList.add('is-open');light.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}function closeLight(){light.classList.remove('is-open');light.setAttribute('aria-hidden','true');document.body.style.overflow=''}wrap.addEventListener('click',openLight);wrap.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openLight()});q('.hf-lightbox-close',light)?.addEventListener('click',closeLight);light.addEventListener('click',e=>{if(e.target===light)closeLight()});

const assistant=$('hfAssistant'),chat=$('hfChat'),input=$('hfAssistantInput');let history=[];function addMsg(role,text,loading=false){const d=document.createElement('div');d.className='hf-msg '+role+(loading?' is-loading':'');d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;return d}function openAssistant(){assistant.classList.add('is-open');assistant.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>input.focus(),100)}function closeAssistant(){assistant.classList.remove('is-open');assistant.setAttribute('aria-hidden','true');document.body.style.overflow=''}$('hfAssistantOpen')?.addEventListener('click',openAssistant);$('hfAssistantOpenBottom')?.addEventListener('click',openAssistant);q('.hf-assistant-close',assistant)?.addEventListener('click',closeAssistant);assistant.addEventListener('click',e=>{if(e.target===assistant)closeAssistant()});
$('hfManualAction').addEventListener('click',()=>{const k=$('hfManualSelect').value,d=data[k],res=$('hfManualResult');res.innerHTML=`<strong>${d.title}</strong><small>${d.lead}</small><div class="hf-manual-tags">${d.facts.slice(0,3).map(x=>`<span>${x[0]}: ${x[1]}</span>`).join('')}</div>`;res.classList.add('is-visible')});
async function send(){const text=input.value.trim();if(text.length<3)return;input.value='';addMsg('user',text);history.push({role:'user',content:text});const load=addMsg('assistant','Consultando as informações Torcisão…',true);try{const r=await fetch(cfg.rest||'/wp-json/torcisao/v1/application-assistant',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({query:text,history:history.slice(-24)})});const j=await r.json();const ans=j.answer||j.error||'Não consegui concluir essa consulta agora. Fale com um especialista da Torcisão.';load.classList.remove('is-loading');load.textContent=ans;history.push({role:'assistant',content:ans});track('theo_query',{page:'haste_aterramento',product_key:j.product_key||''})}catch(e){load.classList.remove('is-loading');load.textContent='Não consegui concluir essa consulta agora. Fale com um especialista da Torcisão.';}}$('hfAssistantSend').addEventListener('click',send);input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();send()}});

const drawer=$('hfQuoteDrawer'),tab=$('hfQuoteTab'),form=$('hfQuoteForm');let mountedFormId='';function label(open){const s=q('.btn-cta-mobile-label',tab);if(s)s.textContent=open?'Fechar':'Solicitar cotação';tab.setAttribute('aria-label',open?'Fechar cotação':'Solicitar cotação')}function currentFormId(){return cfg.formIds?.[kind]||cfg.formIds?.baixa||'8fdff701-c5a7-4684-9358-d557a70425a5'}function currentOrigin(){return kind==='alta'?'LP Haste AC':'LP Haste BC'}function mountForm(force=false){const wanted=currentFormId();if(!force&&mountedFormId===wanted&&form.querySelector('form,iframe'))return;mountedFormId=wanted;form.innerHTML='<div class="hf-form-loading">Preparando formulário…</div>';const boot=()=>{if(window.hbspt?.forms){form.innerHTML='';window.hbspt.forms.create({portalId:cfg.portalId||'50818463',formId:wanted,region:'na1',target:'#hfQuoteForm',onFormReady:function(el){const node=el instanceof Element?el:(el&&el[0])?el[0]:form.querySelector('form.hs-form');const input=node?.querySelector('input[name="pagina_de_origem_do_lead"]');if(input){input.value=currentOrigin();input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));}},onFormSubmitted:function(){track('generate_lead',{origin:'haste_quote_drawer',product:'haste_aterramento',variant:kind})}});return}setTimeout(boot,100)};if(!document.querySelector('script[src*="js.hsforms.net/forms/embed/v2.js"]')){const s=document.createElement('script');s.src='https://js.hsforms.net/forms/embed/v2.js';s.charset='utf-8';s.onload=boot;document.head.appendChild(s)}else boot()}function refreshQuoteForm(){if(drawer.classList.contains('is-open'))mountForm(true)}function openDrawer(origin='haste_aba_cotacao'){drawer.classList.add('is-open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('torcisao-form-drawer-open');label(true);mountForm();track('quote_form_open',{origin,product:'haste_aterramento',variant:kind})}function closeDrawer(){drawer.classList.remove('is-open');drawer.setAttribute('aria-hidden','true');document.body.classList.remove('torcisao-form-drawer-open');label(false)}tab.addEventListener('click',()=>drawer.classList.contains('is-open')?closeDrawer():openDrawer(tab.dataset.analyticsOrigin));q('.hf-quote-close',drawer)?.addEventListener('click',closeDrawer);qa('.js-hf-quote').forEach(b=>b.addEventListener('click',()=>openDrawer(b.dataset.analyticsOrigin||'haste_cta')));

document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(light.classList.contains('is-open'))closeLight();else if(assistant.classList.contains('is-open'))closeAssistant();else if(drawer.classList.contains('is-open'))closeDrawer()}});render();
})();
