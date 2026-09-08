(function(){
'use strict';

function qs(sel,ctx){return (ctx||document).querySelector(sel)}
function qsa(sel,ctx){return Array.from((ctx||document).querySelectorAll(sel))}

/*
 * O Codespace usa locale en_US por padrão, mas a raiz do site Torcisão é pt-BR.
 * Só preservamos EN/ES quando a própria URL estiver explicitamente nesses idiomas.
 */
function forcePtBrOnDefaultSite(){
  const path=String(window.location.pathname||'/').toLowerCase();
  if(/^\/(en|es)(\/|$)/.test(path))return;
  const footer=qs('.tor-footer-v2');
  if(!footer)return;

  const text=function(sel,value){const el=qs(sel);if(el)el.textContent=value};
  text('#torFooterInstitutional','Institucional');
  text('#torFooterContacts','Contatos');
  text('#torFooterPayments','Formas de Pagamento');
  text('#torFooterWhere','Onde Estamos');

  const institutional=qsa('.tor-footer-links a');
  ['Política de Qualidade','Política de Privacidade','Política de Cookies','Início','Produtos','Blog'].forEach(function(label,i){if(institutional[i])institutional[i].textContent=label});

  const hours=qs('.tor-footer-hours strong');
  if(hours)hours.innerHTML='<i class="bi bi-clock"></i>Horário de atendimento';

  const workBtn=qs('[data-work-open]');
  if(workBtn)workBtn.innerHTML='<i class="bi bi-person-workspace"></i>Trabalhe conosco';
  const langBtn=qs('[data-footer-language-open]');
  if(langBtn)langBtn.innerHTML='<i class="bi bi-globe2"></i>Português (BR)';

  text('#torGroupTitle','Grupo Torcisão');
  const companySpans=qsa('.tor-footer-company-copy span');
  if(companySpans[0])companySpans[0].innerHTML='CNPJ 62.147.178/0001-17<br>Você está neste site';
  if(companySpans[1])companySpans[1].innerHTML='CNPJ 07.733.015/0001-08<br>Acesse o site da empresa';

  const associated=qs('.tor-footer-ciesp span:first-child');
  if(associated)associated.textContent='Somos associados da';
  text('.tor-footer-copy','Torcisão Copyright 2026 - Todos os direitos reservados');

  text('.tor-work-head small','TRABALHE CONOSCO');
  text('#torWorkTitle','Faça parte da nossa equipe');
  text('.tor-work-head p','Envie seu currículo diretamente para o RH ou fale com a equipe pelo WhatsApp.');

  const labels={
    'label[for="torResumeName"]':'Nome completo',
    'label[for="torResumeEmail"]':'E-mail',
    'label[for="torResumePhone"]':'Telefone / WhatsApp',
    'label[for="torResumeMessage"]':'Mensagem para o RH (opcional)'
  };
  Object.keys(labels).forEach(function(sel){text(sel,labels[sel])});
  const resumeLabel=qs('.tor-work-field > label:not([for])');
  if(resumeLabel&&!resumeLabel.classList.contains('tor-file-drop'))resumeLabel.textContent='Currículo';
  const fileStrong=qs('.tor-file-drop strong');
  if(fileStrong)fileStrong.textContent='Selecionar currículo';
  const fileHelp=qs('[data-resume-name]');
  if(fileHelp&&!qs('#torResumeFile')?.files?.length)fileHelp.textContent='PDF, DOC ou DOCX · até 5 MB';

  const consent=qs('.tor-work-consent span');
  if(consent){
    const policyHref=qs('.tor-work-consent a')?.href||'/politicadeprivacidade/';
    consent.innerHTML='Autorizo o envio dos meus dados e currículo para análise de oportunidades pela Torcisão, conforme a <a href="'+policyHref+'" target="_blank" rel="noopener">Política de Privacidade</a>.';
  }

  const submit=qs('[data-work-submit]');
  if(submit)submit.innerHTML='<i class="bi bi-send"></i>Enviar currículo para o RH';
  const whatsapp=qs('.tor-work-whatsapp');
  if(whatsapp)whatsapp.innerHTML='<i class="bi bi-whatsapp"></i>Falar com o RH no WhatsApp';

  text('.tor-a11y-head small','ACESSIBILIDADE');
  text('#torA11yTitle','Assistente de acessibilidade');
  text('.tor-a11y-head p','Ajuste a leitura do site e use o leitor por áudio. As preferências ficam salvas neste navegador.');
  const a11yActions=qsa('.tor-a11y-action strong');
  ['Aumentar texto','Diminuir texto','Mais contraste','Destacar links','Fonte legível','Reduzir movimento'].forEach(function(label,i){if(a11yActions[i])a11yActions[i].textContent=label});
  text('[data-a11y-reset]','Restaurar configurações');
}

function initGroupLogo(){
  const logo=qs('.tor-footer-company-brand img');
  if(!logo)return;
  const safeLogo='https://torcisao.com.br/wp-content/uploads/2026/08/2.png';
  logo.src=safeLogo;
  logo.addEventListener('error',function(){
    logo.style.display='none';
    logo.parentElement?.classList.add('tor-footer-logo-fallback');
  },{once:true});
}

function initLanguageBridge(){
  qsa('[data-footer-language-open]').forEach(function(btn){
    btn.addEventListener('click',function(){
      const headerButton=qs('[data-language-open]');
      if(headerButton){headerButton.click();return;}
      const modal=qs('#torLanguageModal');
      if(modal){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');}
    });
  });
}

function initWorkModal(){
  const overlay=qs('#torWorkOverlay');
  if(!overlay)return;
  const close=qs('[data-work-close]',overlay);
  const openers=qsa('[data-work-open]');
  let lastTrigger=null;

  function open(trigger){
    lastTrigger=trigger||null;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    setTimeout(function(){close?.focus();},0);
  }
  function hide(){
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    lastTrigger?.focus?.();
  }

  openers.forEach(function(btn){btn.addEventListener('click',function(){open(btn)})});
  close?.addEventListener('click',hide);
  overlay.addEventListener('click',function(e){if(e.target===overlay)hide()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&overlay.classList.contains('is-open'))hide()});

  const form=qs('#torWorkForm',overlay);
  const fileInput=qs('#torResumeFile',overlay);
  const fileName=qs('[data-resume-name]',overlay);
  const status=qs('[data-work-status]',overlay);
  const submit=qs('[data-work-submit]',overlay);
  if(fileInput&&fileName){
    fileInput.addEventListener('change',function(){
      const file=fileInput.files&&fileInput.files[0];
      fileName.textContent=file?file.name:'PDF, DOC ou DOCX · até 5 MB';
    });
  }
  if(!form)return;

  form.addEventListener('submit',async function(e){
    e.preventDefault();
    const ajaxUrl=form.dataset.ajaxUrl||'';
    if(!ajaxUrl)return;
    const hp=qs('input[name="website"]',form);
    if(hp&&hp.value)return;
    const file=fileInput?.files?.[0];
    if(!file){
      if(status){status.textContent='Selecione o currículo antes de enviar.';status.className='tor-work-status is-error';}
      return;
    }
    if(file.size>5*1024*1024){
      if(status){status.textContent='O arquivo precisa ter no máximo 5 MB.';status.className='tor-work-status is-error';}
      return;
    }
    const allowed=/\.(pdf|doc|docx)$/i;
    if(!allowed.test(file.name)){
      if(status){status.textContent='Envie o currículo em PDF, DOC ou DOCX.';status.className='tor-work-status is-error';}
      return;
    }

    const data=new FormData(form);
    data.append('action','torcisao_send_resume');
    submit?.setAttribute('disabled','disabled');
    if(status){status.textContent='Enviando seu currículo para o RH...';status.className='tor-work-status';}

    try{
      const response=await fetch(ajaxUrl,{method:'POST',body:data,credentials:'same-origin'});
      const json=await response.json();
      if(!response.ok||!json?.success)throw new Error(json?.data?.message||json?.data||'Não foi possível enviar agora.');
      form.reset();
      if(fileName)fileName.textContent='PDF, DOC ou DOCX · até 5 MB';
      if(status){status.textContent=json?.data?.message||'Currículo enviado para o RH com sucesso.';status.className='tor-work-status is-success';}
    }catch(err){
      if(status){status.textContent=err?.message||'Não foi possível enviar agora. Você também pode usar o WhatsApp do RH.';status.className='tor-work-status is-error';}
    }finally{
      submit?.removeAttribute('disabled');
    }
  });
}

const a11yKey='torcisaoA11yV2';
const a11yDefaults={font:0,contrast:false,links:false,readable:false,motion:false};
function loadA11y(){
  try{return Object.assign({},a11yDefaults,JSON.parse(localStorage.getItem(a11yKey)||'{}'))}catch(e){return Object.assign({},a11yDefaults)}
}
function saveA11y(state){try{localStorage.setItem(a11yKey,JSON.stringify(state))}catch(e){}}
function applyA11y(state){
  const html=document.documentElement;
  html.classList.remove('tor-a11y-font-1','tor-a11y-font-2','tor-a11y-font-3');
  if(state.font>0)html.classList.add('tor-a11y-font-'+Math.min(3,state.font));
  html.classList.toggle('tor-a11y-contrast',!!state.contrast);
  html.classList.toggle('tor-a11y-links',!!state.links);
  html.classList.toggle('tor-a11y-readable',!!state.readable);
  html.classList.toggle('tor-a11y-reduce-motion',!!state.motion);
}

function initAudioReader(overlay){
  const dialog=qs('.tor-a11y-dialog',overlay);
  const grid=qs('.tor-a11y-grid',overlay);
  if(!dialog||!grid||qs('.tor-a11y-audio',overlay))return;

  const audio=document.createElement('section');
  audio.className='tor-a11y-audio';
  audio.setAttribute('aria-labelledby','torA11yAudioTitle');
  audio.innerHTML='\
    <div class="tor-a11y-audio-head">\
      <span class="tor-a11y-audio-icon" aria-hidden="true"><i class="bi bi-volume-up"></i></span>\
      <div class="tor-a11y-audio-copy">\
        <strong id="torA11yAudioTitle">Leitor por áudio</strong>\
        <small>Ouça o conteúdo principal da página. O recurso usa a voz disponível no seu navegador e não substitui leitores de tela.</small>\
      </div>\
    </div>\
    <div class="tor-a11y-audio-controls">\
      <button type="button" class="tor-a11y-audio-btn is-primary" data-audio-read><i class="bi bi-play-fill"></i>Ouvir página</button>\
      <button type="button" class="tor-a11y-audio-btn" data-audio-pause disabled><i class="bi bi-pause-fill"></i>Pausar</button>\
      <button type="button" class="tor-a11y-audio-btn" data-audio-stop disabled><i class="bi bi-stop-fill"></i>Parar</button>\
    </div>\
    <p class="tor-a11y-audio-status" data-audio-status aria-live="polite">Pronto para iniciar a leitura.</p>';
  grid.insertAdjacentElement('afterend',audio);

  const readBtn=qs('[data-audio-read]',audio);
  const pauseBtn=qs('[data-audio-pause]',audio);
  const stopBtn=qs('[data-audio-stop]',audio);
  const status=qs('[data-audio-status]',audio);
  const synth=window.speechSynthesis;
  let chunks=[];
  let index=0;
  let speaking=false;
  let paused=false;

  function setStatus(message,isSpeaking){
    if(!status)return;
    status.textContent=message;
    status.classList.toggle('is-speaking',!!isSpeaking);
  }

  if(!('speechSynthesis' in window)||typeof window.SpeechSynthesisUtterance==='undefined'){
    readBtn.disabled=true;
    pauseBtn.disabled=true;
    stopBtn.disabled=true;
    setStatus('O leitor por áudio não está disponível neste navegador.',false);
    return;
  }

  function getPtVoice(){
    const voices=synth.getVoices()||[];
    return voices.find(function(v){return /^pt-BR$/i.test(v.lang)}) || voices.find(function(v){return /^pt/i.test(v.lang)}) || null;
  }

  function collectReadableText(){
    const root=qs('main')||qs('.th-home')||qs('.tor-home')||document.body;
    const selectors='h1,h2,h3,h4,p,li,figcaption,blockquote';
    const parts=qsa(selectors,root).filter(function(el){
      if(el.closest('.tor-a11y-overlay,.tor-work-overlay,.tor-modal-backdrop,.tor-mobile-panel,.tor-footer-v2'))return false;
      const style=window.getComputedStyle(el);
      return style.display!=='none'&&style.visibility!=='hidden'&&el.getAttribute('aria-hidden')!=='true';
    }).map(function(el){return String(el.innerText||'').replace(/\s+/g,' ').trim()}).filter(Boolean);

    const unique=[];
    const seen=new Set();
    parts.forEach(function(text){
      if(!seen.has(text)){seen.add(text);unique.push(text)}
    });
    return unique.join('. ');
  }

  function splitText(text){
    const sentences=String(text||'').match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[];
    const result=[];
    let bucket='';
    sentences.forEach(function(sentence){
      const clean=sentence.replace(/\s+/g,' ').trim();
      if(!clean)return;
      if((bucket+' '+clean).trim().length>620){
        if(bucket)result.push(bucket.trim());
        bucket=clean;
      }else{
        bucket=(bucket+' '+clean).trim();
      }
    });
    if(bucket)result.push(bucket.trim());
    return result;
  }

  function updateControls(){
    pauseBtn.disabled=!speaking;
    stopBtn.disabled=!speaking;
    pauseBtn.innerHTML=paused?'<i class="bi bi-play-fill"></i>Continuar':'<i class="bi bi-pause-fill"></i>Pausar';
  }

  function finish(message){
    speaking=false;
    paused=false;
    chunks=[];
    index=0;
    updateControls();
    setStatus(message||'Leitura concluída.',false);
  }

  function speakCurrent(){
    if(!speaking||index>=chunks.length){finish('Leitura concluída.');return;}
    const utterance=new SpeechSynthesisUtterance(chunks[index]);
    utterance.lang='pt-BR';
    utterance.rate=.96;
    utterance.pitch=1;
    const voice=getPtVoice();
    if(voice)utterance.voice=voice;
    utterance.onstart=function(){setStatus('Lendo a página em áudio...',true)};
    utterance.onend=function(){
      if(!speaking)return;
      index+=1;
      speakCurrent();
    };
    utterance.onerror=function(event){
      if(event&&event.error==='canceled')return;
      finish('A leitura foi interrompida pelo navegador.');
    };
    synth.speak(utterance);
  }

  readBtn.addEventListener('click',function(){
    synth.cancel();
    const content=collectReadableText();
    chunks=splitText(content);
    index=0;
    paused=false;
    if(!chunks.length){setStatus('Não encontrei conteúdo principal para ler nesta página.',false);return;}
    speaking=true;
    updateControls();
    speakCurrent();
  });

  pauseBtn.addEventListener('click',function(){
    if(!speaking)return;
    if(paused){
      synth.resume();
      paused=false;
      setStatus('Leitura retomada.',true);
    }else{
      synth.pause();
      paused=true;
      setStatus('Leitura pausada.',false);
    }
    updateControls();
  });

  stopBtn.addEventListener('click',function(){
    synth.cancel();
    finish('Leitura interrompida.');
  });

  window.addEventListener('beforeunload',function(){synth.cancel()});
}

function initAccessibility(){
  const overlay=qs('#torA11yOverlay');
  const open=qs('[data-a11y-open]');
  if(!overlay||!open)return;
  const close=qs('[data-a11y-close]',overlay);
  const state=loadA11y();
  applyA11y(state);
  initAudioReader(overlay);

  function syncButtons(){
    qsa('[data-a11y-toggle]',overlay).forEach(function(btn){
      const key=btn.dataset.a11yToggle;
      btn.setAttribute('aria-pressed',String(!!state[key]));
    });
    const fontLabel=qs('[data-a11y-font-label]',overlay);
    if(fontLabel)fontLabel.textContent=state.font===0?'Padrão':('Nível '+state.font);
  }
  function show(){
    syncButtons();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    setTimeout(function(){close?.focus();},0);
  }
  function hide(){
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    open.focus();
  }
  function commit(){applyA11y(state);saveA11y(state);syncButtons()}

  open.addEventListener('click',show);
  close?.addEventListener('click',hide);
  overlay.addEventListener('click',function(e){if(e.target===overlay)hide()});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&overlay.classList.contains('is-open'))hide();
    if(e.altKey&&String(e.key).toLowerCase()==='a'){e.preventDefault();show();}
  });

  qsa('[data-a11y-toggle]',overlay).forEach(function(btn){
    btn.addEventListener('click',function(){
      const key=btn.dataset.a11yToggle;
      if(Object.prototype.hasOwnProperty.call(state,key)){state[key]=!state[key];commit();}
    });
  });
  qs('[data-a11y-font-plus]',overlay)?.addEventListener('click',function(){state.font=Math.min(3,state.font+1);commit()});
  qs('[data-a11y-font-minus]',overlay)?.addEventListener('click',function(){state.font=Math.max(0,state.font-1);commit()});
  qs('[data-a11y-reset]',overlay)?.addEventListener('click',function(){Object.assign(state,a11yDefaults);commit()});
  syncButtons();
}

function init(){
  forcePtBrOnDefaultSite();
  initGroupLogo();
  initLanguageBridge();
  initWorkModal();
  initAccessibility();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
