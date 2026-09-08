(function(){
  'use strict';

  var section = document.getElementById('quem-somos');
  if(!section || section.dataset.aboutHistoryRecovered === '1') return;

  var timeline = [
    {year:1968,title:'Início da Jornada',text:'A Torcisão Trefilados nasce em 1968, focada no desenvolvimento de materiais para a indústria automobilística, destacando-se pelo rigoroso controle técnico e de qualidade.',milestone:true},
    {year:1975,title:'Mudanças Estratégicas',text:'A empresa realiza uma troca de razão social, consolidando-se como Indústria e Comércio de Ferros e Aços Trefilados, Arruelas, Rebites, Engraxadeiras, Porcas, Parafusos, Pregos e Torneados em Geral.',milestone:false},
    {year:1978,title:'Nova Sede, Nova Identidade',text:'A matriz é transferida para Vila Liviero, São Paulo, marcando não apenas uma mudança de endereço, mas também uma ampliação do escopo de atuação.',milestone:false},
    {year:1999,title:'Novos Rumos com a Direção Atual',text:'A Torcisão passa por uma aquisição pela diretoria atual, impulsionando uma fase de renovação e crescimento.',milestone:true},
    {year:2005,title:'Torcisão Industrial Ganha Vida',text:'Surge a Torcisão Industrial, agora com sede própria, iniciando suas atividades focadas na fabricação de acessórios para escoramento, fôrmas e andaimes.',milestone:true},
    {year:2006,title:'Expansão para a construção civil',text:'Em 2006, aproveitando o crescimento da construção civil, a Torcisão Industrial diversifica suas atividades, consolidando-se como referência na fabricação de produtos para esse setor.',milestone:false},
    {year:2011,title:'Unidade de Protensão',text:'A empresa lançou a unidade de protensão em 2011, ampliando seu escopo de atuação para atender clientes em grandes obras no Brasil.',milestone:false},
    {year:2013,title:'Avanço para Mineração e Túneis',text:'A Torcisão inicia a fabricação de barras roscadas em 2013, ampliando seu portfólio para atender às demandas de sustentação de rochas em escavações subterrâneas.',milestone:false},
    {year:2014,title:'Especialização em Haste de Aterramento',text:'A Torcisão Trefilados se especializa na fabricação de haste de aterramento, atendendo com precisão diversas obras de infraestrutura e construção civil.',milestone:true},
    {year:2015,title:'Ingresso no setor de Energia',text:'A Torcisão Industrial expande suas atividades para o setor de energia, produzindo produtos de qualidade para fundações de obras energéticas.',milestone:false},
    {year:2016,title:'Sede Própria em Ribeirão Pires',text:'A empresa muda sua sede para Ribeirão Pires em 2016, marcando uma fase de consolidação e modernização.',milestone:true},
    {year:2017,title:'Unidade de Arames',text:'A empresa lançou a unidade de Arames Trefilados em 2017, aumentando a sua atuação e participação no mercado e seu mix de produtos.',milestone:true},
    {year:2019,title:'Inovação com Estacas Metálicas Helicoidais',text:'Desenvolvimento e patenteamento de Estacas Metálicas Helicoidais como solução para Provas de Carga Estática, proporcionando agilidade e eficiência nas obras.',milestone:false},
    {year:2022,title:'Nascimento do Grupo Torcisão',text:'Em 2022, a Torcisão se transforma no Grupo Torcisão, um marco que reflete a expansão e diversificação de suas atividades ao longo dos anos.',milestone:true},
    {year:2024,title:'Aumento do Parque Fabril - 4.000 m²',text:'Com a aquisição de um galpão para estocagem de matéria-prima ampliamos nossa capacidade de armazenamento e produção.',milestone:true}
  ];

  var mvv = {
    missao:{
      label:'Missão',
      icon:'bi-bullseye',
      text:'Trabalhando com a filosofia de melhorar continuamente processos internos e externos em produtos conforme especificações dos clientes e fornecedores das exigências de tempo, prazo, custo e qualidade, proporcionando assim maior satisfação aos clientes, para os acionistas, para os colaboradores e para os clientes. Pesquisar no mercado em conformidade com as normas e especificações dos clientes para a legislação aplicável a empresa e a documentação pertinente e, prestativamente com qualidade, prazo e preços competitivos.'
    },
    visao:{
      label:'Visão',
      icon:'bi-eye',
      text:'Ser uma indústria metalúrgica sólida e admirada, que atua com foco em crescimento sustentável, valorizando a satisfação dos clientes, colaboradores e fornecedores.'
    },
    valores:{
      label:'Valores',
      icon:'bi-stars',
      values:['Ética','Confiança','Transparência','Seriedade','Humildade','Conscientização sobre o Meio Ambiente','Valorização Social']
    }
  };

  function medalMarkup(item){
    if(!item.milestone){
      return '<span class="tor-year-medal tor-year-medal-placeholder" aria-hidden="true"></span>';
    }
    return '<span class="tor-year-medal" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">' +
        '<path d="M12 2.2l1.35 1.18 1.78-.23.76 1.63 1.67.67-.08 1.8 1.25 1.28-.9 1.56.51 1.72-1.48 1.02-.42 1.75-1.79.17-1.08 1.44L12 15.45l-1.57.86-1.08-1.44-1.79-.17-.42-1.75-1.48-1.02.51-1.72-.9-1.56 1.25-1.28-.08-1.8 1.67-.67.76-1.63 1.78.23L12 2.2z" fill="currentColor"/>' +
        '<circle cx="12" cy="9" r="3.25" fill="none" stroke="rgba(255,255,255,.86)" stroke-width="1.35"/>' +
        '<path d="M9.3 14.35L8 22l4-2.45L16 22l-1.3-7.65" fill="currentColor"/>' +
      '</svg>' +
    '</span>';
  }

  section.dataset.aboutHistoryRecovered = '1';
  section.className = 'tor-about-history';
  section.innerHTML = '' +
    '<div class="tor-about-container">' +
      '<div class="tor-about-top">' +
        '<div class="tor-about-copy">' +
          '<span class="tor-about-kicker">Quem Somos</span>' +
          '<h2>Torcisão Trefilados</h2>' +
          '<p class="tor-about-lead">Mais do que fornecer barras, arames e hastes de aterramento, a Torcisão Trefilados entrega valorização para o seu projeto.</p>' +
          '<p>Com mais de 57 anos de história e um padrão de qualidade inquestionável.</p>' +
          '<p>Nossa vasta experiência e rigoroso controle técnico garantem que cada produto Torcisão seja uma oportunidade de elevar a qualidade, durabilidade e o nome da sua empresa.</p>' +
        '</div>' +
        '<div class="tor-mvv-list" aria-label="Missão, visão e valores">' +
          '<button type="button" class="tor-mvv-btn" data-tor-mvv="missao"><i class="bi bi-bullseye"></i><span>Missão</span></button>' +
          '<button type="button" class="tor-mvv-btn" data-tor-mvv="visao"><i class="bi bi-eye"></i><span>Visão</span></button>' +
          '<button type="button" class="tor-mvv-btn" data-tor-mvv="valores"><i class="bi bi-stars"></i><span>Valores</span></button>' +
        '</div>' +
      '</div>' +
      '<div class="tor-history">' +
        '<div class="tor-history-head"><h3>Nosso crescimento conta a nossa história</h3><p>Nossa história é traduzida através de cinco décadas de muito trabalho, dedicação e foco no cliente.</p></div>' +
        '<div class="tor-timeline-shell" tabindex="0" aria-label="Linha do tempo Torcisão. Deslize horizontalmente em telas menores.">' +
          '<div class="tor-timeline">' + timeline.map(function(item,index){
            return '<button type="button" class="tor-year-btn'+(item.milestone?' is-milestone':'')+'" data-year-label="'+item.year+'" data-tor-year-index="'+index+'" aria-label="Abrir marco de '+item.year+'">'+medalMarkup(item)+'<span>'+item.year+'</span></button>';
          }).join('') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var modal = document.createElement('div');
  modal.className = 'tor-about-modal';
  modal.id = 'torAboutHistoryModal';
  modal.setAttribute('aria-hidden','true');
  modal.innerHTML = '' +
    '<section class="tor-about-dialog" role="dialog" aria-modal="true" aria-labelledby="torAboutModalTitle">' +
      '<button type="button" class="tor-about-close" data-tor-about-close aria-label="Fechar">×</button>' +
      '<div data-tor-about-content></div>' +
    '</section>';
  document.body.appendChild(modal);

  var content = modal.querySelector('[data-tor-about-content]');
  var lastFocus = null;
  var activeIndex = -1;
  var timer = null;

  function stopCounter(){
    if(timer){clearTimeout(timer);timer=null;}
  }

  function animateYear(target){
    stopCounter();
    var node = modal.querySelector('[data-tor-history-counter]');
    if(!node) return;
    var current = 1968;
    node.textContent = String(current);
    if(target <= 1968) return;
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      node.textContent = String(target);
      return;
    }
    var steps = target - 1968;
    var delay = Math.max(13, Math.min(42, Math.round(850 / Math.max(1,steps))));
    function tick(){
      current += 1;
      node.textContent = String(current);
      if(current < target) timer = setTimeout(tick,delay);
      else timer = null;
    }
    timer = setTimeout(tick,delay);
  }

  function setTimelineCurrent(index){
    section.querySelectorAll('[data-tor-year-index]').forEach(function(btn,i){
      btn.classList.toggle('is-current',i===index);
    });
  }

  function stabilizeTimeline(){
    var shell = section.querySelector('.tor-timeline-shell');
    var row = section.querySelector('.tor-timeline');
    if(!shell || !row) return;
    row.classList.add('is-ready');
    shell.classList.add('is-ready');
    void row.offsetWidth;
    requestAnimationFrame(function(){
      row.style.transform = 'translateZ(0)';
      void row.offsetWidth;
      row.style.removeProperty('transform');
    });
  }

  setTimelineCurrent(-1);
  stabilizeTimeline();
  requestAnimationFrame(function(){
    setTimelineCurrent(-1);
    stabilizeTimeline();
  });
  window.addEventListener('pageshow',function(){
    setTimelineCurrent(-1);
    stabilizeTimeline();
  });

  function renderYear(index){
    activeIndex = index;
    var item = timeline[index];
    if(!item) return;
    var prev = timeline[index-1];
    var next = timeline[index+1];
    content.innerHTML = '' +
      '<span class="tor-history-modal-kicker">Marco da nossa história</span>' +
      '<strong class="tor-history-counter" data-tor-history-counter>1968</strong>' +
      '<h3 id="torAboutModalTitle">'+item.title+'</h3>' +
      '<p>'+item.text+'</p>' +
      '<div class="tor-history-nav">' +
        '<button type="button" data-tor-history-prev '+(!prev?'disabled':'')+'><i class="bi bi-arrow-left"></i><span>'+(prev?prev.year:'Anterior')+'</span></button>' +
        '<button type="button" data-tor-history-next '+(!next?'disabled':'')+'><span>'+(next?next.year:'Próximo')+'</span><i class="bi bi-arrow-right"></i></button>' +
      '</div>';
    setTimelineCurrent(index);
    animateYear(item.year);
    var prevBtn = content.querySelector('[data-tor-history-prev]');
    var nextBtn = content.querySelector('[data-tor-history-next]');
    if(prevBtn && prev) prevBtn.addEventListener('click',function(){renderYear(index-1);});
    if(nextBtn && next) nextBtn.addEventListener('click',function(){renderYear(index+1);});
  }

  function renderMvv(key){
    activeIndex = -1;
    stopCounter();
    setTimelineCurrent(-1);
    var item = mvv[key];
    if(!item) return;
    var body = item.values
      ? '<div class="tor-values">'+item.values.map(function(value){return '<span>'+value+'</span>';}).join('')+'</div>'
      : '<p>'+item.text+'</p>';
    content.innerHTML = '' +
      '<span class="tor-mvv-modal-kicker">Quem Somos</span>' +
      '<h3 id="torAboutModalTitle"><i class="bi '+item.icon+'" style="color:var(--th-orange,#ef7b30);margin-right:.45rem"></i>'+item.label+'</h3>' +
      body;
  }

  function openModal(){
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.documentElement.style.overflow = 'hidden';
    var close = modal.querySelector('[data-tor-about-close]');
    if(close) setTimeout(function(){close.focus();},30);
  }

  function closeModal(){
    stopCounter();
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.documentElement.style.removeProperty('overflow');
    setTimelineCurrent(-1);
    stabilizeTimeline();
    if(lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  section.addEventListener('click',function(event){
    var yearBtn = event.target.closest('[data-tor-year-index]');
    if(yearBtn){
      renderYear(parseInt(yearBtn.getAttribute('data-tor-year-index'),10));
      openModal();
      return;
    }
    var mvvBtn = event.target.closest('[data-tor-mvv]');
    if(mvvBtn){
      renderMvv(mvvBtn.getAttribute('data-tor-mvv'));
      openModal();
    }
  });

  modal.addEventListener('click',function(event){
    if(event.target === modal || event.target.closest('[data-tor-about-close]')) closeModal();
  });
  document.addEventListener('keydown',function(event){
    if(event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    if(!modal.classList.contains('is-open') || activeIndex < 0) return;
    if(event.key === 'ArrowLeft' && activeIndex > 0){event.preventDefault();renderYear(activeIndex-1);}
    if(event.key === 'ArrowRight' && activeIndex < timeline.length-1){event.preventDefault();renderYear(activeIndex+1);}
  });
})();
