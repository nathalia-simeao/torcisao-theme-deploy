(function(){
'use strict';
const drawer=document.getElementById('homeQuoteDrawer');
const panel=drawer?.querySelector('.home-quote-panel');
const tab=document.getElementById('homeQuoteTab');
const form=document.getElementById('homeQuoteForm');
if(!drawer||!tab||!form)return;
let mounted=false;
const track=(event,params={})=>{window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event},params));};
const requested=String(new URLSearchParams(location.search).get('lang')||'').toLowerCase();
const pathMatch=location.pathname.match(/^\/(en|es)(?:\/|$)/i);
const lang=['pt','en','es'].includes(requested)?requested:(pathMatch?pathMatch[1].toLowerCase():'pt');
const copy={
  pt:{open:'Faça uma cotação',close:'Fechar',closeAria:'Fechar cotação',preparing:'Preparando formulário…',error:'O formulário não pôde ser carregado agora. Tente novamente em instantes.'},
  en:{open:'Request a quote',close:'Close',closeAria:'Close quote',preparing:'Preparing form…',error:'The form could not be loaded right now. Please try again shortly.'},
  es:{open:'Solicita una cotización',close:'Cerrar',closeAria:'Cerrar cotización',preparing:'Preparando formulario…',error:'El formulario no pudo cargarse en este momento. Inténtalo de nuevo en unos instantes.'}
}[lang]||null;
function label(open){const s=tab.querySelector('.home-quote-tab-label');if(s)s.textContent=open?copy.close:copy.open;tab.setAttribute('aria-label',open?copy.closeAria:copy.open);}
function mount(){if(mounted)return;mounted=true;form.innerHTML='<div class="home-quote-placeholder"><span></span>'+copy.preparing+'</div>';const portalId=form.dataset.hubspotPortal||'50818463';const formId=form.dataset.hubspotForm||'58fa568f-a57c-4676-a260-ade4722bf099';const boot=()=>{if(!window.hbspt?.forms){setTimeout(boot,100);return;}form.innerHTML='';window.hbspt.forms.create({portalId,formId,region:'na1',locale:lang==='pt'?'pt-br':lang,target:'#homeQuoteForm',onFormReady:function(){track('quote_form_view',{origin:'home_aba_cotacao',product:'geral',lang});},onFormSubmitted:function(){track('generate_lead',{origin:'home_aba_cotacao',product:'geral',lang});}});};if(document.querySelector('script[src*="js.hsforms.net/forms/embed/v2.js"]')){boot();return;}const s=document.createElement('script');s.src='https://js.hsforms.net/forms/embed/v2.js';s.charset='utf-8';s.onload=boot;s.onerror=()=>{form.innerHTML='<p style="font-size:.78rem;color:#777">'+copy.error+'</p>';};document.head.appendChild(s);}
function open(origin='home_aba_cotacao'){drawer.classList.add('is-open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('home-quote-open');label(true);mount();track('quote_form_open',{origin,product:'geral',lang});setTimeout(()=>panel?.focus?.(),80);}
function close(){drawer.classList.remove('is-open');drawer.setAttribute('aria-hidden','true');document.body.classList.remove('home-quote-open');label(false);}
tab.addEventListener('click',()=>drawer.classList.contains('is-open')?close():open(tab.dataset.analyticsOrigin||'home_aba_cotacao'));drawer.querySelector('.home-quote-close')?.addEventListener('click',close);drawer.addEventListener('click',e=>{if(e.target===drawer)close();});document.querySelectorAll('.js-home-quote').forEach(btn=>btn.addEventListener('click',()=>open(btn.dataset.origin||'home_cta')));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('is-open'))close();});
})();