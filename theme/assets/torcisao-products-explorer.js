(function(){
'use strict';
const q=(s,c=document)=>c.querySelector(s),qa=(s,c=document)=>Array.from(c.querySelectorAll(s));
const MEDIA='https://torcisao.com.br/wp-content/uploads/2026/09/';
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const track=(event,params={})=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event},params));};

const DATA={
  arame:{
    label:'Arame',kicker:'ARAME TREFILADO',url:'/aramebtc/',defaultVariant:'btc',defaultView:'spider',
    groups:[
      {key:'variant',label:'Linha',options:[['btc','BTC · Baixo Carbono'],['mtc','MTC · Médio Carbono'],['atc','ATC · Alto Carbono']]},
      {key:'view',label:'Visualização',options:[['rolo','Rolo'],['spider','Spider']]}
    ],
    variants:{
      btc:{title:'Arame Trefilado · Baixo Carbono',lead:'Arame trefilado para aplicações industriais em que uniformidade dimensional, bitola e condição de fornecimento precisam ser avaliadas.',facts:[['Faixa de aço','1004 a 1020'],['Bitola','2,00 a 15,88 mm'],['Perfil','Redondo'],['Acondicionamento','Rolos ou spiders'],['Tolerância','Sob consulta']]},
      mtc:{title:'Arame Trefilado · Médio Carbono',lead:'Opção para aplicações que exigem validação de propriedades mecânicas, bitola e processo.',facts:[['Faixa de aço','1035 a 1050'],['Bitola','4,76 a 15,88 mm'],['Perfil','Redondo'],['Acondicionamento','Rolos ou spiders'],['Tolerância','Sob consulta']]},
      atc:{title:'Arame Trefilado · Alto Carbono',lead:'Opção para aplicações que pedem validação de resistência, plasticidade, dureza e processo.',facts:[['Faixa de aço','1060 a 1090'],['Bitola','4,76 a 15,88 mm'],['Perfil','Redondo'],['Acondicionamento','Rolos ou spiders'],['Tolerância','Sob consulta']]}
    },
    image:state=>MEDIA+(state.view==='rolo'?'arametrefiladorolo.png':'arametrefiladospider.png')
  },
  barra:{
    label:'Barra',kicker:'BARRA TREFILADA',url:'/barrabtc/',defaultVariant:'btc',defaultFinish:'trefilada',
    groups:[
      {key:'variant',label:'Linha',options:[['btc','BTC · Baixo Carbono'],['mtc','MTC · Médio Carbono'],['atc','ATC · Alto Carbono'],['ressulfurado','Aço Ressulfurado']]},
      {key:'finish',label:'Acabamento',options:[['trefilada','Trefilada'],['polida','Trefilada polida']]}
    ],
    variants:{
      btc:{title:'Barra Trefilada · Baixo Carbono',lead:'Barra de perfil redondo para aplicações que exigem controle dimensional e acabamento superficial.',facts:[['Bitola','2,00 a 15,88 mm'],['Perfil','Redondo'],['Acondicionamento','Feixes embalados'],['Acabamento','Trefilado ou trefilado polido'],['Tolerância','Sob consulta']]},
      mtc:{title:'Barra Trefilada · Médio Carbono',lead:'Barra trefilada para aplicações mecânicas em que aço, bitola, propriedades e processo precisam ser validados.',facts:[['Faixa de aço','1035 a 1050'],['Bitola','4,76 a 15,88 mm'],['Perfil','Redondo'],['Acabamento','Trefilado ou trefilado polido'],['Tolerância','h9 · h10 · h11']]},
      atc:{title:'Barra Trefilada · Alto Carbono',lead:'Barra trefilada para aplicações que exigem validação de resistência mecânica, bitola e processo.',facts:[['Faixa de aço','1060 a 1090'],['Perfil','Redondo'],['Acabamento','Trefilado ou trefilado polido'],['Tolerância','h9 · h10 · h11']]},
      ressulfurado:{title:'Barra Trefilada · Aço Ressulfurado',lead:'Opção em aço de corte livre para aplicações em que usinabilidade, precisão dimensional e acabamento são critérios relevantes.',facts:[['Aço','11SMn37'],['Perfil','Redondo'],['Acabamento','Trefilado ou trefilado polido'],['Tolerância','h9 · h10 · h11']]}
    },
    image:state=>{
      const map={
        btc:{trefilada:'barrabtctrefilada.png',polida:'barrabtctrefiladapolida.png'},
        mtc:{trefilada:'barratrefiladamtc.png',polida:'barramtctrefiladapolida.png'},
        /* ATC estava invertido na reconstrução: estes dois foram corrigidos. */
        atc:{trefilada:'battaatctrefilada.png',polida:'barraatctrefilada.png'},
        ressulfurado:{trefilada:'barraacoressulfurado.png',polida:'acoressulfuradopolido.png'}
      };
      return MEDIA+map[state.variant][state.finish];
    }
  },
  haste:{
    label:'Haste',kicker:'HASTE DE ATERRAMENTO',url:'/hastebc/',defaultVariant:'baixa',
    groups:[{key:'variant',label:'Tipo de haste',options:[['baixa','Baixa Camada · 20 µm'],['alta','Alta Camada · 254 µm']]}],
    variants:{
      baixa:{title:'Haste de Aterramento · Baixa Camada',lead:'Haste com núcleo sólido de aço-carbono SAE 1010/1020 e revestimento de cobre de 20 µm.',facts:[['Camada','20 µm'],['Material','SAE 1010/1020'],['Perfil','Redondo'],['Acondicionamento','Pacotes com 10 unidades'],['Diâmetros','9,00 · 10,00 · 11,00 · 12,30 · 12,70 · 15,40 mm'],['Comprimentos','1.000 · 1.200 · 1.500 · 2.000 · 2.400 · 3.000 mm']]},
      alta:{title:'Haste de Aterramento · Alta Camada',lead:'Haste com núcleo SAE 1010/1020 e revestimento eletrolítico de cobre de 254 µm.',facts:[['Camada','254 µm'],['Cobre','Pureza ≥ 99,9%'],['Norma','ABNT NBR 13571'],['Perfil','Redondo'],['Acondicionamento','Pacotes com 10 unidades'],['Comprimentos','2.000 · 2.400 · 3.000 mm']]}
    },
    image:state=>MEDIA+(state.variant==='alta'?'altacamada.png':'baixacamada.png')
  },
  conectores:{
    label:'Conectores',kicker:'CONECTORES',url:'/hastebc/?tipo=conectores',defaultVariant:'olhal-simples',
    groups:[{key:'variant',label:'Modelo',options:[['olhal-simples','Olhal Simples'],['olhal-reforcado','Olhal Reforçado'],['grampo-simples','Grampo U Simples'],['grampo-reforcado','Grampo U Reforçado']]}],
    variants:{
      'olhal-simples':{title:'Olhal Simples',lead:'Conector para união entre haste e cabo em sistemas de aterramento.',facts:[['Norma','ABNT NBR 5370'],['Material','Latão ou bronze'],['Referência','2 kg / 100 peças'],['Aplicação','Haste + cabo']]},
      'olhal-reforcado':{title:'Olhal Reforçado',lead:'Modelo reforçado para conexão entre haste e cabo em sistemas de aterramento.',facts:[['Norma','ABNT NBR 5370'],['Material','Latão ou bronze'],['Referência','4 kg / 100 peças'],['Aplicação','Haste + cabo']]},
      'grampo-simples':{title:'Grampo U Simples',lead:'Conector em formato U para união entre haste e cabo.',facts:[['Norma','ABNT NBR 5370'],['Material','Latão ou bronze'],['Referência','8,5 kg / 100 peças'],['Aplicação','Haste + cabo']]},
      'grampo-reforcado':{title:'Grampo U Reforçado',lead:'Modelo reforçado em formato U para conexão entre haste e cabo.',facts:[['Norma','ABNT NBR 5370'],['Material','Latão ou bronze'],['Referência','15 kg / 100 peças'],['Aplicação','Haste + cabo']]}
    },
    image:state=>MEDIA+({'olhal-simples':'olhalsimples.png','olhal-reforcado':'olhalreforcado.png','grampo-simples':'formatoUsimples.png','grampo-reforcado':'formatoUreforcado.png'})[state.variant]
  }
};

function allImageUrls(){
  const urls=new Set();
  ['rolo','spider'].forEach(view=>urls.add(DATA.arame.image({view})));
  ['btc','mtc','atc','ressulfurado'].forEach(variant=>['trefilada','polida'].forEach(finish=>urls.add(DATA.barra.image({variant,finish}))));
  ['baixa','alta'].forEach(variant=>urls.add(DATA.haste.image({variant})));
  ['olhal-simples','olhal-reforcado','grampo-simples','grampo-reforcado'].forEach(variant=>urls.add(DATA.conectores.image({variant})));
  return Array.from(urls);
}
const imageCache=new Map();
function preload(url){
  if(imageCache.has(url))return imageCache.get(url);
  const p=new Promise(resolve=>{
    const im=new Image();im.decoding='async';im.onload=()=>resolve(url);im.onerror=()=>resolve(url);im.src=url;
    if(im.complete)resolve(url);
  });
  imageCache.set(url,p);return p;
}

function init(){
  const section=document.getElementById('produtos');if(!section)return;
  const container=q('.th-container',section);if(!container)return;

  container.innerHTML=`
    <div class="tpe-head"><span class="th-kicker">Explorador de Produtos</span></div>
    <div class="tpe-line-menu" role="tablist" aria-label="Selecione a linha Torcisão">
      ${Object.entries(DATA).map(([key,d],i)=>`<button type="button" class="tpe-line-tab${i===0?' is-active':''}" data-tpe-line="${key}" role="tab">${d.label}</button>`).join('')}
    </div>
    <div class="tpe-shell" id="tpeShell">
      <aside class="tpe-options" aria-label="Opções da linha selecionada">
        <div class="tpe-options-head"><small>OPÇÕES</small><strong id="tpeOptionsTitle"></strong></div>
        <div id="tpeOptionGroups"></div>
      </aside>
      <div class="tpe-stage" id="tpeStage">
        <div class="tpe-stage-toolbar">
          <span><i class="bi bi-search"></i> Passe o cursor para ampliar</span>
          <div><button type="button" id="tpeZoomOut" aria-label="Diminuir zoom">−</button><span id="tpeZoomLabel">1,0×</span><button type="button" id="tpeZoomIn" aria-label="Aumentar zoom">+</button><button type="button" id="tpeReset" aria-label="Redefinir"><i class="bi bi-arrow-counterclockwise"></i></button></div>
        </div>
        <div class="tpe-image-wrap" id="tpeImageWrap" tabindex="0" role="button" aria-label="Abrir imagem ampliada">
          <img id="tpeImage" alt="Produto Torcisão" loading="eager" decoding="async">
          <div class="tpe-lens" id="tpeLens" aria-hidden="true" data-zoom="2,3×"></div>
        </div>
        <div class="tpe-caption"><small id="tpeCaptionKicker"></small><strong id="tpeCaptionTitle"></strong></div>
      </div>
      <aside class="tpe-info">
        <span class="tpe-info-kicker" id="tpeInfoKicker"></span>
        <h3 id="tpeInfoTitle"></h3>
        <p id="tpeInfoLead"></p>
        <div class="tpe-specs" id="tpeSpecs"></div>
        <div class="tpe-actions">
          <button type="button" class="tpe-btn tpe-btn-primary" id="tpeQuote"><i class="bi bi-whatsapp"></i> Solicitar cotação</button>
          <button type="button" class="tpe-btn tpe-btn-secondary" id="tpeAssistant"><i class="bi bi-stars"></i> Não sabe qual avaliar? Use o assistente</button>
        </div>
      </aside>
    </div>`;

  const state={line:'arame',variant:'btc',view:'spider',finish:'trefilada'};
  let zoom=1,tiltX=0,tiltY=0,lensZoom=2.3,lastPointer=null,renderToken=0;
  const image=q('#tpeImage'),wrap=q('#tpeImageWrap'),lens=q('#tpeLens'),stage=q('#tpeStage');

  function resetStateForLine(){
    const d=DATA[state.line];state.variant=d.defaultVariant;
    if(d.defaultView)state.view=d.defaultView;if(d.defaultFinish)state.finish=d.defaultFinish;
    zoom=1;tiltX=0;tiltY=0;lensZoom=2.3;lastPointer=null;
  }
  function currentData(){const d=DATA[state.line];return {line:d,variant:d.variants[state.variant]};}
  function applyImageTransform(){
    image.style.transform=`rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${zoom})`;
    q('#tpeZoomLabel').textContent=zoom.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'×';
  }
  function buildOptions(){
    const d=DATA[state.line];q('#tpeOptionsTitle').textContent=d.label;
    q('#tpeOptionGroups').innerHTML=d.groups.map(group=>`<div class="tpe-option-group"><small>${group.label}</small><div class="tpe-option-list">${group.options.map(([value,label])=>`<button type="button" class="tpe-option${state[group.key]===value?' is-active':''}" data-tpe-key="${group.key}" data-tpe-value="${value}">${label}</button>`).join('')}</div></div>`).join('');
    qa('.tpe-option',section).forEach(btn=>btn.addEventListener('click',()=>{
      state[btn.dataset.tpeKey]=btn.dataset.tpeValue;zoom=1;tiltX=0;tiltY=0;render();
      track('product_variant_select',{product_line:state.line,option_group:btn.dataset.tpeKey,option:btn.dataset.tpeValue});
    }));
  }
  async function switchImage(url,title){
    const token=++renderToken;image.classList.add('is-switching');
    await preload(url);if(token!==renderToken)return;
    image.src=url;image.alt=title;
    try{if(image.decode)await image.decode();}catch(e){}
    if(token!==renderToken)return;
    requestAnimationFrame(()=>image.classList.remove('is-switching'));
    if(lastPointer)updateLens(lastPointer.x,lastPointer.y);
  }
  function render(){
    const d=DATA[state.line],v=d.variants[state.variant];
    stage.dataset.line=state.line;
    qa('.tpe-line-tab',section).forEach(b=>{const on=b.dataset.tpeLine===state.line;b.classList.toggle('is-active',on);b.setAttribute('aria-selected',on?'true':'false');});
    buildOptions();
    switchImage(d.image(state),v.title);
    q('#tpeCaptionKicker').textContent=d.kicker;q('#tpeCaptionTitle').textContent=v.title;
    q('#tpeInfoKicker').textContent=d.kicker;q('#tpeInfoTitle').textContent=v.title;q('#tpeInfoLead').textContent=v.lead;
    q('#tpeSpecs').innerHTML=v.facts.map(([a,b])=>`<div><small>${a}</small><strong>${b}</strong></div>`).join('');
    applyImageTransform();
  }

  qa('.tpe-line-tab',section).forEach(btn=>btn.addEventListener('click',()=>{state.line=btn.dataset.tpeLine;resetStateForLine();render();track('product_line_select',{product_line:state.line});}));
  q('#tpeZoomIn').addEventListener('click',e=>{e.stopPropagation();zoom=clamp(zoom+.16,.78,2.25);applyImageTransform();});
  q('#tpeZoomOut').addEventListener('click',e=>{e.stopPropagation();zoom=clamp(zoom-.16,.78,2.25);applyImageTransform();});
  q('#tpeReset').addEventListener('click',e=>{e.stopPropagation();zoom=1;tiltX=tiltY=0;lensZoom=2.3;applyImageTransform();if(lastPointer)updateLens(lastPointer.x,lastPointer.y);});

  function updateLens(x,y){
    const r=wrap.getBoundingClientRect();
    x=clamp(x,0,r.width);y=clamp(y,0,r.height);
    lens.classList.add('is-visible');lens.style.left=x+'px';lens.style.top=y+'px';lens.dataset.zoom=lensZoom.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'×';
    lens.style.backgroundImage=`url("${image.currentSrc||image.src}")`;
    const bgW=Math.max(r.width*lensZoom,720),bgH=Math.max(r.height*lensZoom,520);
    lens.style.backgroundSize=`${bgW}px ${bgH}px`;
    lens.style.backgroundPosition=`${-(x*lensZoom-lens.clientWidth/2)}px ${-(y*lensZoom-lens.clientHeight/2)}px`;
  }
  wrap.addEventListener('pointermove',e=>{
    if(matchMedia('(pointer:coarse)').matches)return;
    const r=wrap.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    lastPointer={x,y};tiltY=clamp((x/r.width-.5)*7,-3.5,3.5);tiltX=clamp((.5-y/r.height)*7,-3.5,3.5);applyImageTransform();updateLens(x,y);
  });
  wrap.addEventListener('wheel',e=>{
    if(matchMedia('(pointer:coarse)').matches||!lens.classList.contains('is-visible'))return;
    e.preventDefault();lensZoom=clamp(lensZoom+(e.deltaY<0?.22:-.22),1.35,4.8);
    if(lastPointer)updateLens(lastPointer.x,lastPointer.y);
  },{passive:false});
  wrap.addEventListener('pointerleave',()=>{tiltX=0;tiltY=0;lastPointer=null;applyImageTransform();lens.classList.remove('is-visible');});

  /* Lightbox: abre sempre em 1x com o produto inteiro. */
  const lb=document.createElement('div');lb.className='tpe-lightbox';lb.setAttribute('aria-hidden','true');
  lb.innerHTML='<div class="tpe-lightbox-stage" role="dialog" aria-modal="true" aria-label="Imagem ampliada do produto"><div class="tpe-lightbox-tools"><button type="button" data-tpe-lb-minus aria-label="Diminuir zoom">−</button><span data-tpe-lb-label>1,0×</span><button type="button" data-tpe-lb-plus aria-label="Aumentar zoom">+</button><button type="button" data-tpe-lb-reset aria-label="Redefinir zoom"><i class="bi bi-arrow-counterclockwise"></i></button></div><button type="button" class="tpe-lightbox-close" data-tpe-lb-close aria-label="Fechar">×</button><img class="tpe-lightbox-image" alt=""><div class="tpe-lightbox-caption"></div></div>';
  document.body.appendChild(lb);
  const lbImg=q('.tpe-lightbox-image',lb),lbCaption=q('.tpe-lightbox-caption',lb),lbLabel=q('[data-tpe-lb-label]',lb);let lbZoom=1;
  function applyLb(){lbImg.style.transform=`scale(${lbZoom})`;lbLabel.textContent=lbZoom.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})+'×';}
  function openLb(){lbZoom=1;applyLb();lbImg.src=image.currentSrc||image.src;lbImg.alt=image.alt;lbCaption.textContent=q('#tpeCaptionTitle').textContent;lb.classList.add('is-open');lb.setAttribute('aria-hidden','false');document.documentElement.style.overflow='hidden';q('[data-tpe-lb-close]',lb).focus();track('product_image_expand',{product_line:state.line,variant:state.variant});}
  function closeLb(){lb.classList.remove('is-open');lb.setAttribute('aria-hidden','true');document.documentElement.style.overflow='';}
  wrap.addEventListener('click',e=>{if(e.target.closest('button'))return;openLb();});
  wrap.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLb();}});
  q('[data-tpe-lb-plus]',lb).addEventListener('click',()=>{lbZoom=clamp(lbZoom+.18,1,2.6);applyLb();});
  q('[data-tpe-lb-minus]',lb).addEventListener('click',()=>{lbZoom=clamp(lbZoom-.18,1,2.6);applyLb();});
  q('[data-tpe-lb-reset]',lb).addEventListener('click',()=>{lbZoom=1;applyLb();});
  q('[data-tpe-lb-close]',lb).addEventListener('click',closeLb);
  q('.tpe-lightbox-stage',lb).addEventListener('wheel',e=>{if(!lb.classList.contains('is-open'))return;e.preventDefault();lbZoom=clamp(lbZoom+(e.deltaY<0?.12:-.12),1,2.6);applyLb();},{passive:false});
  lb.addEventListener('click',e=>{if(e.target===lb)closeLb();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lb.classList.contains('is-open'))closeLb();});

  q('#tpeQuote').addEventListener('click',()=>{
    track('quote_form_open',{origin:'home_explorador_produtos',product_line:state.line,variant:state.variant});
    const quote=q('.js-home-quote')||q('.home-quote-tab');if(quote)quote.click();
  });
  q('#tpeAssistant').addEventListener('click',()=>{
    track('technical_tool_open',{tool:'assistente_aplicacao',origin:'home_explorador_produtos',product_line:state.line,variant:state.variant});
    q('#thAssistantOpen')?.click();
  });

  render();
  /* Não pré-carrega todas as linhas da galeria: evita tráfego e disputa de rede no primeiro carregamento. */
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();