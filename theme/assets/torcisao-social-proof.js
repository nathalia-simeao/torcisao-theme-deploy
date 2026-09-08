(function(){
'use strict';

const segments=[
  ['bi-lightning-charge-fill','Geração e Transmissão de Energia'],
  ['bi-building-fill','Construção Civil'],
  ['bi-car-front-fill','Indústria Automotiva'],
  ['bi-bicycle','Duas Rodas'],
  ['bi-nut-fill','Fixadores'],
  ['bi-house-door-fill','Linha Branca & Moveleira'],
  ['bi-tree-fill','Linha Agrícola'],
  ['bi-sun-fill','Energias Renováveis'],
  ['bi-broadcast','Telecomunicações'],
  ['bi-tools','Ferramentas Manuais'],
  ['bi-gear-wide-connected','Máquinas e Equipamentos'],
  ['bi-lightning-fill','Distribuição de Energia'],
  ['bi-building','Estruturas Metálicas'],
  ['bi-shield-fill-check','Para-raio & Aterramento']
];

const modalData={
  vendas:{
    kicker:'RESULTADOS TORCISÃO',
    title:'+100 Milhões de Toneladas',
    paragraphs:[
      '<strong>Vendas em toneladas até 2025.</strong>',
      'Desde 2023 superamos a marca de 100 Milhões de toneladas de produtos fornecidos, solidificando nossa presença no mercado.',
      'Como resultado do nosso trabalho e da nossa história desde 1968.'
    ]
  },
  satisfacao:{
    kicker:'EXPERIÊNCIA DO CLIENTE',
    title:'95% de Satisfação',
    paragraphs:[
      '<strong>Nível de satisfação dos nossos clientes.</strong>',
      'Em nossa última pesquisa, alcançamos 95% de satisfação. Esse número representa o compromisso da Torcisão com a qualidade dos produtos, o atendimento a prazos e o suporte técnico em cada projeto.'
    ]
  },
  clientes:{
    kicker:'PRESENÇA NO MERCADO',
    title:'+11 Mil Clientes',
    paragraphs:[
      '<strong>Nossa rede de clientes atendidos.</strong>',
      'Ao longo de mais de cinco décadas de atuação, a Torcisão já atendeu mais de 11 mil empresas e projetos em diferentes segmentos, incluindo indústria, construção civil e energia.'
    ]
  }
};

function segmentMarkup(){
  return segments.concat(segments).map(function(item){
    return '<span class="ts-segment"><i class="bi '+item[0]+'"></i>'+item[1]+'</span>';
  }).join('');
}

function initCounters(section){
  const counters=[...section.querySelectorAll('[data-ts-counter]')];
  if(!counters.length)return;
  let done=false;

  function run(){
    if(done)return;
    done=true;
    counters.forEach(function(el){
      const target=Number(el.dataset.tsCounter||0);
      const suffix=el.dataset.tsSuffix||'';
      const prefix=el.dataset.tsPrefix||'';
      const duration=900;
      const start=performance.now();
      function tick(now){
        const p=Math.min(1,(now-start)/duration);
        const eased=1-Math.pow(1-p,3);
        const value=Math.round(target*eased);
        el.textContent=prefix+value+suffix;
        if(p<1)requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  if(!('IntersectionObserver' in window)){run();return;}
  const io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){run();io.disconnect();}
    });
  },{threshold:.28});
  io.observe(section);
}

function initModal(section){
  const modal=document.getElementById('tsProofModal');
  const dialog=modal?.querySelector('.ts-proof-dialog');
  const kicker=modal?.querySelector('[data-ts-modal-kicker]');
  const title=modal?.querySelector('[data-ts-modal-title]');
  const body=modal?.querySelector('[data-ts-modal-body]');
  const close=modal?.querySelector('[data-ts-modal-close]');
  if(!modal||!dialog||!kicker||!title||!body||!close)return;

  let lastTrigger=null;
  function open(key,trigger){
    const data=modalData[key];
    if(!data)return;
    lastTrigger=trigger||null;
    kicker.textContent=data.kicker;
    title.textContent=data.title;
    body.innerHTML=data.paragraphs.map(function(p){return '<p>'+p+'</p>';}).join('');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    setTimeout(function(){close.focus();},0);
  }
  function hide(){
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    lastTrigger?.focus?.();
  }

  section.addEventListener('click',function(e){
    const trigger=e.target.closest('[data-proof-modal]');
    if(trigger)open(trigger.dataset.proofModal,trigger);
  });
  close.addEventListener('click',hide);
  modal.addEventListener('click',function(e){if(e.target===modal)hide();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('is-open'))hide();});
}

function init(){
  const section=document.getElementById('numeros');
  const quality=document.getElementById('qualidade');
  const applications=document.getElementById('aplicacoes');
  if(!section)return;

  applications?.remove();

  if(quality&&quality.nextElementSibling!==section){
    quality.insertAdjacentElement('afterend',section);
  }

  section.innerHTML=`
    <div class="th-container">
      <div class="ts-proof-head">
        <span class="th-kicker">Resultados que falam por si</span>
        <h2>A Torcisão está no seu dia a dia</h2>
      </div>

      <div class="ts-proof-grid">
        <button type="button" class="ts-proof-card" data-proof-modal="vendas" aria-haspopup="dialog">
          <span class="ts-proof-icon"><i class="bi bi-box-seam"></i></span>
          <strong class="ts-proof-value" data-ts-counter="100" data-ts-prefix="+" data-ts-suffix="M">+0M</strong>
          <span class="ts-proof-label">Toneladas vendidas até 2025</span>
        </button>
        <button type="button" class="ts-proof-card" data-proof-modal="satisfacao" aria-haspopup="dialog">
          <span class="ts-proof-icon"><i class="bi bi-patch-check"></i></span>
          <strong class="ts-proof-value" data-ts-counter="95" data-ts-suffix="%">0%</strong>
          <span class="ts-proof-label">Nível de satisfação dos clientes</span>
        </button>
        <button type="button" class="ts-proof-card" data-proof-modal="clientes" aria-haspopup="dialog">
          <span class="ts-proof-icon"><i class="bi bi-people"></i></span>
          <strong class="ts-proof-value" data-ts-counter="11" data-ts-prefix="+" data-ts-suffix=" Mil">+0 Mil</strong>
          <span class="ts-proof-label">Clientes atendidos</span>
        </button>
      </div>

      <div class="ts-segments" aria-label="Segmentos atendidos pela Torcisão">
        <div class="ts-segments-track">${segmentMarkup()}</div>
      </div>
    </div>

    <div class="ts-proof-modal" id="tsProofModal" aria-hidden="true">
      <section class="ts-proof-dialog" role="dialog" aria-modal="true" aria-labelledby="tsProofModalTitle">
        <button type="button" class="ts-proof-close" data-ts-modal-close aria-label="Fechar">×</button>
        <small data-ts-modal-kicker></small>
        <h3 id="tsProofModalTitle" data-ts-modal-title></h3>
        <div data-ts-modal-body></div>
      </section>
    </div>`;

  initCounters(section);
  initModal(section);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

(function(){
'use strict';

const monthNames=['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
const LIVE_SITE='https://torcisao.com.br';

function isPreviewHost(){
  const host=String(window.location.hostname||'').toLowerCase();
  return host==='localhost'||host==='127.0.0.1'||host.endsWith('.app.github.dev')||host.endsWith('.githubpreview.dev');
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,function(ch){
    return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch];
  });
}

function stripHtml(value){
  const holder=document.createElement('div');
  holder.innerHTML=String(value??'');
  return (holder.textContent||'').trim();
}

function safeUrl(value,fallback){
  try{
    const url=new URL(String(value||''),window.location.origin);
    if(url.protocol==='http:'||url.protocol==='https:')return url.href;
  }catch(e){}
  return fallback||'#';
}

function formatDate(value){
  const raw=String(value||'');
  const match=raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if(!match)return raw;
  const month=Math.max(1,Math.min(12,Number(match[2])));
  return String(Number(match[3])).padStart(2,'0')+' '+monthNames[month-1]+' '+match[1];
}

function postCategory(post){
  const groups=post?._embedded?.['wp:term'];
  if(!Array.isArray(groups))return 'Conteúdo técnico';
  const terms=groups.flat().filter(function(term){return term&&term.taxonomy==='category';});
  const useful=terms.find(function(term){
    const n=String(term.name||'').toLowerCase();
    return n&&n!=='sem categoria'&&n!=='uncategorized';
  });
  return useful?.name||terms[0]?.name||'Conteúdo técnico';
}

function serverFallback(section){
  return [...section.querySelectorAll('.th-blog-card')].map(function(card){
    const link=card.querySelector('a');
    const title=card.querySelector('h3');
    const date=card.querySelector('small');
    return {
      title:stripHtml(title?.textContent||''),
      date:date?.textContent||'',
      link:link?.href||'#',
      category:'Conteúdo técnico'
    };
  }).filter(function(item){
    return item.title&&item.title.toLowerCase()!=='hello world!';
  });
}

function cardMarkup(item,blogUrl){
  const href=safeUrl(item.link,blogUrl);
  const title=escapeHtml(item.title);
  const date=escapeHtml(item.date);
  const category=escapeHtml(item.category||'Conteúdo técnico');
  return `
    <a class="tb-blog-card" href="${href}" aria-label="Abrir matéria: ${title}">
      <span class="tb-blog-meta">
        <span class="tb-blog-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M3 7v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </span>
        <span class="tb-blog-date">${date}</span>
      </span>
      <h3>${title}</h3>
      <span class="tb-blog-tag">${category}</span>
    </a>`;
}

function render(section,items,blogUrl){
  const cards=items.map(function(item){return cardMarkup(item,blogUrl);}).join('');
  section.innerHTML=`
    <div class="tb-blog-shell">
      <div class="tb-blog-orange" aria-hidden="true"></div>
      <div class="tb-blog-inner">
        <h2 class="tb-blog-title">Blog</h2>
        <div class="tb-blog-viewport" data-blog-viewport tabindex="0" aria-label="Matérias do blog. Deslize horizontalmente para ver mais.">
          <div class="tb-blog-track" data-blog-track>${cards}</div>
        </div>
        <div class="tb-blog-bottom">
          <div class="tb-blog-progress" data-blog-progress role="scrollbar" aria-label="Progresso das matérias" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
            <span class="tb-blog-progress-thumb" data-blog-thumb></span>
          </div>
          <a class="tb-blog-all" href="${safeUrl(blogUrl,'/blog/')}">Ver todos os conteúdos <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>`;

  const viewport=section.querySelector('[data-blog-viewport]');
  const progress=section.querySelector('[data-blog-progress]');
  const thumb=section.querySelector('[data-blog-thumb]');
  if(!viewport||!progress||!thumb)return;

  function updateProgress(){
    const total=Math.max(1,viewport.scrollWidth);
    const visible=Math.min(total,viewport.clientWidth);
    const maxScroll=Math.max(0,total-visible);
    const ratio=Math.max(.12,Math.min(1,visible/total));
    const thumbWidth=ratio*100;
    const scrollRatio=maxScroll>0?viewport.scrollLeft/maxScroll:0;
    const left=scrollRatio*(100-thumbWidth);
    thumb.style.width=thumbWidth+'%';
    thumb.style.left=left+'%';
    progress.setAttribute('aria-valuenow',String(Math.round(scrollRatio*100)));
  }

  let raf=0;
  function schedule(){
    cancelAnimationFrame(raf);
    raf=requestAnimationFrame(updateProgress);
  }

  viewport.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});

  progress.addEventListener('click',function(e){
    const rect=progress.getBoundingClientRect();
    if(!rect.width)return;
    const ratio=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
    const maxScroll=Math.max(0,viewport.scrollWidth-viewport.clientWidth);
    viewport.scrollTo({left:maxScroll*ratio,behavior:'smooth'});
  });

  viewport.addEventListener('keydown',function(e){
    if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
    e.preventDefault();
    const card=viewport.querySelector('.tb-blog-card');
    const step=(card?.getBoundingClientRect().width||280)+12;
    viewport.scrollBy({left:e.key==='ArrowRight'?step:-step,behavior:'smooth'});
  });

  requestAnimationFrame(function(){requestAnimationFrame(updateProgress);});
}

async function fetchPosts(endpoint,crossOrigin){
  const response=await fetch(endpoint.href,{
    credentials:crossOrigin?'omit':'same-origin',
    headers:{Accept:'application/json'}
  });
  if(!response.ok)throw new Error('Blog REST '+response.status);
  const posts=await response.json();
  return Array.isArray(posts)?posts:[];
}

async function initBlog(){
  const section=document.getElementById('blog');
  if(!section)return;

  const preview=isPreviewHost();
  const localBlogLink=section.querySelector('.th-blog-all')?.href||new URL('/blog/',window.location.origin).href;
  const blogUrl=preview?LIVE_SITE+'/blog/':localBlogLink;
  const fallback=serverFallback(section);

  render(section,fallback.length?fallback:[{
    title:'Carregando conteúdos do Blog Torcisão…',
    date:'',
    link:blogUrl,
    category:'Blog Torcisão'
  }],blogUrl);

  try{
    const apiBase=preview?LIVE_SITE:window.location.origin;
    const endpoint=new URL('/wp-json/wp/v2/posts',apiBase);
    endpoint.searchParams.set('per_page','8');
    endpoint.searchParams.set('status','publish');
    endpoint.searchParams.set('orderby','date');
    endpoint.searchParams.set('order','desc');
    endpoint.searchParams.set('_embed','1');

    const posts=await fetchPosts(endpoint,preview);
    if(!posts.length)return;

    const items=posts.map(function(post){
      return {
        title:stripHtml(post?.title?.rendered||''),
        date:formatDate(post?.date||''),
        link:post?.link||blogUrl,
        category:postCategory(post)
      };
    }).filter(function(item){return item.title;});

    if(items.length)render(section,items,blogUrl);
  }catch(e){
    if(preview){
      console.warn('Não foi possível carregar o Blog publicado da Torcisão no preview.',e);
    }
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initBlog);else initBlog();
})();
