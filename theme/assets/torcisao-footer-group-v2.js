(function(){
'use strict';

function initGroupSection(){
  const shell=document.querySelector('.tor-footer-v2 .tor-footer-group-shell');
  if(!shell)return;

  const trefLogo='https://torcisao.com.br/wp-content/uploads/2025/12/lgcabecalhoclara400.png';
  const industrialLogo='https://torcisao.com.br/wp-content/uploads/2026/09/logo-grupo-torcisao-e1729107151557.png';

  shell.innerHTML=`
    <div class="tor-footer-group-intro">
      <p class="tor-footer-group-eyebrow">GRUPO TORCISÃO</p>
      <p class="tor-footer-group-tagline">Construindo o Futuro com Excelência e Inovação</p>
    </div>
    <div class="tor-footer-company-grid">
      <a class="tor-footer-company tor-footer-company--trefilados" href="/" aria-label="Acessar Torcisão Trefilados">
        <div class="tor-footer-company-brand tor-footer-company-brand--trefilados">
          <img src="${trefLogo}" alt="Torcisão Trefilados">
        </div>
        <div class="tor-footer-company-copy">
          <strong>Torcisão Trefilados</strong>
          <span>CNPJ 62.147.178/0001-17</span>
        </div>
        <span class="tor-footer-company-arrow" aria-hidden="true">↗</span>
      </a>

      <a class="tor-footer-company tor-footer-company--industrial" href="https://torcisao.ind.br/" target="_blank" rel="noopener" aria-label="Acessar Torcisão Industrial">
        <div class="tor-footer-company-brand tor-footer-company-brand--industrial">
          <img src="${industrialLogo}" alt="Grupo Torcisão">
          <span class="tor-footer-industrial-label">INDUSTRIAL</span>
        </div>
        <div class="tor-footer-company-copy">
          <strong>Torcisão Industrial</strong>
          <span>CNPJ 07.733.015/0001-08</span>
        </div>
        <span class="tor-footer-company-arrow" aria-hidden="true">↗</span>
      </a>
    </div>`;
}

function initSocialLinks(){
  const social=document.querySelector('.tor-footer-v2 .tor-footer-social');
  if(!social)return;
  const instagram=social.querySelector('a[aria-label="Instagram"]');
  const facebook=social.querySelector('a[aria-label="Facebook"]');
  if(instagram)instagram.href='https://www.instagram.com/torcisaotrefilados/';
  if(facebook)facebook.href='https://www.facebook.com/torcisaotrefilados/';
}

function initBrazilPhone(){
  const original=document.querySelector('#torWorkOverlay #torResumePhone');
  if(!original||original.dataset.brPhoneReady==='1')return;
  original.dataset.brPhoneReady='1';

  const field=original.closest('.tor-work-field');
  if(!field)return;
  const label=field.querySelector('label[for="torResumePhone"]');
  if(label)label.setAttribute('for','torResumePhoneNumber');

  const ddds=[
    ['11','SP'],['12','SP'],['13','SP'],['14','SP'],['15','SP'],['16','SP'],['17','SP'],['18','SP'],['19','SP'],
    ['21','RJ'],['22','RJ'],['24','RJ'],['27','ES'],['28','ES'],
    ['31','MG'],['32','MG'],['33','MG'],['34','MG'],['35','MG'],['37','MG'],['38','MG'],
    ['41','PR'],['42','PR'],['43','PR'],['44','PR'],['45','PR'],['46','PR'],
    ['47','SC'],['48','SC'],['49','SC'],
    ['51','RS'],['53','RS'],['54','RS'],['55','RS'],
    ['61','DF'],['62','GO'],['63','TO'],['64','GO'],
    ['65','MT'],['66','MT'],['67','MS'],['68','AC'],['69','RO'],
    ['71','BA'],['73','BA'],['74','BA'],['75','BA'],['77','BA'],['79','SE'],
    ['81','PE'],['82','AL'],['83','PB'],['84','RN'],['85','CE'],['86','PI'],['87','PE'],['88','CE'],['89','PI'],
    ['91','PA'],['92','AM'],['93','PA'],['94','PA'],['95','RR'],['96','AP'],['97','AM'],['98','MA'],['99','MA']
  ];

  const wrapper=document.createElement('div');
  wrapper.className='tor-phone-br';
  wrapper.innerHTML=`
    <span class="tor-phone-ddi" aria-label="Código do Brasil"><span class="tor-phone-flag" aria-hidden="true">🇧🇷</span><strong>+55</strong></span>
    <div class="tor-phone-ddd-control">
      <button type="button" class="tor-phone-ddd-trigger" id="torResumePhoneDDDTrigger" aria-haspopup="listbox" aria-expanded="false">
        <span data-ddd-label>DDD</span><i class="bi bi-chevron-down" aria-hidden="true"></i>
      </button>
      <div class="tor-phone-ddd-menu" role="listbox" aria-label="Selecione o DDD" tabindex="-1" hidden>
        ${ddds.map(function(item){return '<button type="button" class="tor-phone-ddd-option" role="option" data-ddd="'+item[0]+'" data-uf="'+item[1]+'" aria-selected="false"><span>('+item[0]+')</span><small>'+item[1]+'</small></button>';}).join('')}
      </div>
    </div>
    <input class="tor-phone-local" id="torResumePhoneNumber" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="10" placeholder="99999-9999 / 3333-3333" aria-label="Número de telefone fixo ou celular">
  `;
  const helper=document.createElement('small');
  helper.className='tor-phone-helper';
  helper.textContent='Aceita telefone fixo com 8 dígitos ou celular com 9 dígitos.';

  original.type='hidden';
  original.removeAttribute('autocomplete');
  original.insertAdjacentElement('afterend',wrapper);
  wrapper.insertAdjacentElement('afterend',helper);

  const control=wrapper.querySelector('.tor-phone-ddd-control');
  const trigger=wrapper.querySelector('.tor-phone-ddd-trigger');
  const menu=wrapper.querySelector('.tor-phone-ddd-menu');
  const labelEl=wrapper.querySelector('[data-ddd-label]');
  const number=wrapper.querySelector('#torResumePhoneNumber');
  const options=[...wrapper.querySelectorAll('.tor-phone-ddd-option')];
  let dddValue='';

  function digits(value){return String(value||'').replace(/\D/g,'');}
  function maskLocal(value){
    const n=digits(value).slice(0,9);
    if(n.length<=4)return n;
    if(n.length<=8)return n.slice(0,4)+'-'+n.slice(4);
    return n.slice(0,5)+'-'+n.slice(5);
  }
  function sync(){
    const local=digits(number.value);
    original.value=(dddValue&&local)?('+55 '+dddValue+' '+local):'';
  }
  function closeMenu(focusTrigger){
    menu.hidden=true;
    trigger.setAttribute('aria-expanded','false');
    control.classList.remove('is-open');
    if(focusTrigger)trigger.focus();
  }
  function openMenu(){
    menu.hidden=false;
    trigger.setAttribute('aria-expanded','true');
    control.classList.add('is-open');
    const selected=options.find(function(opt){return opt.dataset.ddd===dddValue;});
    requestAnimationFrame(function(){(selected||options[0])?.focus();});
  }
  function selectDDD(option){
    if(!option)return;
    dddValue=option.dataset.ddd||'';
    labelEl.textContent=dddValue?'('+dddValue+')':'DDD';
    options.forEach(function(opt){opt.setAttribute('aria-selected',String(opt===option));});
    sync();
    closeMenu(true);
  }

  trigger.addEventListener('click',function(){
    if(menu.hidden)openMenu();else closeMenu(false);
  });
  options.forEach(function(option){
    option.addEventListener('click',function(){selectDDD(option);});
  });
  menu.addEventListener('keydown',function(e){
    const active=document.activeElement;
    const index=options.indexOf(active);
    if(e.key==='Escape'){e.preventDefault();closeMenu(true);return;}
    if(e.key==='Enter'||e.key===' '){
      if(active&&active.classList.contains('tor-phone-ddd-option')){e.preventDefault();selectDDD(active);}
      return;
    }
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){
      e.preventDefault();
      const step=e.key==='ArrowDown'?1:-1;
      const next=index<0?0:(index+step+options.length)%options.length;
      options[next].focus();
    }
  });
  document.addEventListener('click',function(e){
    if(!control.contains(e.target))closeMenu(false);
  });

  number.addEventListener('input',function(){number.value=maskLocal(number.value);sync();});
  number.addEventListener('blur',sync);

  const existing=digits(original.value);
  if(existing){
    let br=existing;
    if(br.indexOf('55')===0&&br.length>=12)br=br.slice(2);
    if(br.length>=10){
      const currentDDD=br.slice(0,2);
      const matching=options.find(function(opt){return opt.dataset.ddd===currentDDD;});
      if(matching){dddValue=currentDDD;labelEl.textContent='('+currentDDD+')';matching.setAttribute('aria-selected','true');}
      number.value=maskLocal(br.slice(2));
      sync();
    }
  }

  const form=original.closest('form');
  form?.addEventListener('reset',function(){
    setTimeout(function(){
      dddValue='';
      labelEl.textContent='DDD';
      options.forEach(function(opt){opt.setAttribute('aria-selected','false');});
      number.value='';
      original.value='';
      closeMenu(false);
    },0);
  });
}

function getSaoPauloDateParts(){
  try{
    const parts=new Intl.DateTimeFormat('en-CA',{
      timeZone:'America/Sao_Paulo',
      year:'numeric',month:'2-digit',day:'2-digit'
    }).formatToParts(new Date());
    const values={};
    parts.forEach(function(part){if(part.type!=='literal')values[part.type]=Number(part.value);});
    return {year:values.year,month:values.month,day:values.day};
  }catch(e){
    const now=new Date();
    return {year:now.getFullYear(),month:now.getMonth()+1,day:now.getDate()};
  }
}

function initDynamicDates(){
  const today=getSaoPauloDateParts();
  const foundationYear=1968;
  const anniversaryMonth=7;
  const anniversaryDay=29;
  const anniversaryPassed=today.month>anniversaryMonth || (today.month===anniversaryMonth && today.day>=anniversaryDay);
  const companyAge=Math.max(0,today.year-foundationYear-(anniversaryPassed?0:1));

  const copyright=document.querySelector('.tor-footer-v2 .tor-footer-copy');
  if(copyright)copyright.textContent='Torcisão Copyright '+today.year+' - Todos os direitos reservados';

  const aboutParagraphs=[...document.querySelectorAll('#quem-somos .tor-about-copy p')];
  const ageParagraph=aboutParagraphs.find(function(p){return /^Com mais de \d+ anos de história/i.test(String(p.textContent||'').trim());});
  if(ageParagraph){
    ageParagraph.textContent='Com mais de '+companyAge+' anos de história e um padrão de qualidade inquestionável.';
  }
}

function init(){
  initGroupSection();
  initSocialLinks();
  initBrazilPhone();
  initDynamicDates();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
}else{
  init();
}
})();
