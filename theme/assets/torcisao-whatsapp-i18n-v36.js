(function(){
'use strict';
const requested=String(new URLSearchParams(location.search).get('lang')||'').toLowerCase();
const pathMatch=location.pathname.match(/^\/(en|es)(?:\/|$)/i);
const lang=['en','es'].includes(requested)?requested:(pathMatch?pathMatch[1].toLowerCase():(window.TorcisaoI18n?.lang||'pt'));
if(!['en','es'].includes(lang))return;
function product(){if(document.getElementById('arame-trefilado'))return 'arame';if(document.getElementById('barra-trefilada'))return 'barra';if(document.getElementById('haste-aterramento'))return 'haste';return '';}
const p=product();
const copy={
 en:{arame:'Hello! I came from the Drawn Wire page on the Torcisão Trefilados website and would like to speak with the sales team about a quote.',barra:'Hello! I came from the Drawn Bar page on the Torcisão Trefilados website and would like to speak with the sales team about a quote.',haste:'Hello! I came from the Grounding Rod page on the Torcisão Trefilados website and would like to speak with the sales team about a quote.',button:'Contact sales'},
 es:{arame:'¡Hola! Llegué desde la página de Alambre Trefilado del sitio de Torcisão Trefilados y me gustaría hablar con el equipo comercial sobre una cotización.',barra:'¡Hola! Llegué desde la página de Barra Trefilada del sitio de Torcisão Trefilados y me gustaría hablar con el equipo comercial sobre una cotización.',haste:'¡Hola! Llegué desde la página de Varillas de Puesta a Tierra del sitio de Torcisão Trefilados y me gustaría hablar con el equipo comercial sobre una cotización.',button:'Hablar con ventas'}
}[lang];
function patch(){if(!p)return;document.querySelectorAll('a[href*="wa.me/551123349989"],a[href*="api.whatsapp.com/send"]') .forEach(a=>{if(a.closest('.tor-work-dialog'))return;try{const url=new URL(a.href,location.href);if(url.hostname==='wa.me'){url.pathname='/551123349989';url.searchParams.set('text',copy[p]);a.href=url.href;}else{url.searchParams.set('phone','551123349989');url.searchParams.set('text',copy[p]);a.href=url.href;}}catch(e){}if(/Falar com o comercial|Contact sales|Hablar con ventas/i.test(a.textContent)){const icon=a.querySelector('i')?.outerHTML||'';a.innerHTML=icon+(icon?' ':'')+copy.button;}});}
patch();let scheduled=false;new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;patch();});}).observe(document.documentElement,{subtree:true,childList:true});
})();
