(function(){
'use strict';
const i18n=window.TorcisaoI18n;if(!i18n||!['en','es'].includes(i18n.lang)||!('speechSynthesis' in window)||typeof window.SpeechSynthesisUtterance==='undefined')return;
const overlay=document.getElementById('torA11yOverlay');if(!overlay)return;
const read=overlay.querySelector('[data-audio-read]'),pause=overlay.querySelector('[data-audio-pause]'),stop=overlay.querySelector('[data-audio-stop]'),status=overlay.querySelector('[data-audio-status]');
if(!read||!pause||!stop||!status)return;
const synth=window.speechSynthesis;let active=false,paused=false,chunks=[],index=0;
const T=(pt,en,es)=>i18n.lang==='en'?en:es;
function message(text,on){status.textContent=text;status.classList.toggle('is-speaking',!!on)}
function controls(){pause.disabled=!active;stop.disabled=!active;pause.innerHTML=paused?'<i class="bi bi-play-fill"></i>'+T('', 'Resume','Continuar'):'<i class="bi bi-pause-fill"></i>'+T('', 'Pause','Pausar');}
function voice(){const prefix=i18n.lang==='en'?'en':'es';const locale=i18n.locale||prefix;const voices=synth.getVoices()||[];return voices.find(v=>String(v.lang).toLowerCase()===locale.toLowerCase())||voices.find(v=>String(v.lang).toLowerCase().startsWith(prefix))||null;}
function collect(){const root=document.querySelector('main')||document.body;const parts=[...root.querySelectorAll('h1,h2,h3,h4,p,li,figcaption,blockquote')].filter(el=>{if(el.closest('.tor-a11y-overlay,.tor-work-overlay,.tor-modal-backdrop,.tor-mobile-panel,.tor-footer-v2'))return false;const s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&el.getAttribute('aria-hidden')!=='true';}).map(el=>String(el.innerText||'').replace(/\s+/g,' ').trim()).filter(Boolean);return [...new Set(parts)].join('. ');}
function split(text){const sentences=String(text||'').match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[];const out=[];let bucket='';sentences.forEach(sentence=>{const clean=sentence.replace(/\s+/g,' ').trim();if(!clean)return;if((bucket+' '+clean).trim().length>620){if(bucket)out.push(bucket);bucket=clean;}else bucket=(bucket+' '+clean).trim();});if(bucket)out.push(bucket);return out;}
function finish(text){active=false;paused=false;chunks=[];index=0;controls();message(text||T('', 'Reading complete.','Lectura finalizada.'),false);}
function speak(){if(!active||index>=chunks.length){finish();return;}const u=new SpeechSynthesisUtterance(chunks[index]);u.lang=i18n.locale;u.rate=.96;u.pitch=1;const v=voice();if(v)u.voice=v;u.onstart=()=>message(T('', 'Reading the page aloud...','Leyendo la página en voz alta...'),true);u.onend=()=>{if(active){index++;speak();}};u.onerror=e=>{if(e?.error!=='canceled')finish(T('', 'Reading was interrupted by the browser.','La lectura fue interrumpida por el navegador.'));};synth.speak(u);}
read.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();synth.cancel();chunks=split(collect());index=0;paused=false;if(!chunks.length){message(T('', 'No main content was found to read on this page.','No se encontró contenido principal para leer en esta página.'),false);return;}active=true;controls();speak();},true);
pause.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();if(!active)return;if(paused){synth.resume();paused=false;message(T('', 'Reading resumed.','Lectura reanudada.'),true);}else{synth.pause();paused=true;message(T('', 'Reading paused.','Lectura pausada.'),false);}controls();},true);
stop.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();synth.cancel();finish(T('', 'Reading stopped.','Lectura detenida.'));},true);
})();
