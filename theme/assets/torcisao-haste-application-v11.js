(function(){
'use strict';
function init(){
  const root=document.getElementById('haste-aterramento');
  if(!root)return;
  const grid=root.querySelector('#aplicacoes .hf-app-grid');
  const left=grid?.querySelector('.hf-app-card');
  if(!left||left.dataset.torHasteAssistantMounted)return;
  left.dataset.torHasteAssistantMounted='1';
  left.classList.add('tor-haste-assistant-card');
  left.innerHTML=`
    <h3>Assistente de aplicação</h3>
    <p class="tor-haste-assistant-copy">Descreva a instalação, medida, camada, conector ou requisito do projeto. O Theo organiza os pontos que precisam ser avaliados antes da cotação.</p>
    <button type="button" class="tor-product-tool" data-tor-haste-assistant>
      <span class="tor-product-tool-icon tor-product-tool-icon--theo"><img class="tor-haste-assistant-avatar" src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt="Theo"></span>
      <span><strong>Consultar o Theo</strong><small>Organize a necessidade técnica sem navegar por uma lista de aplicações soltas.</small></span>
      <span class="tor-product-tool-arrow">↗</span>
    </button>`;
  left.querySelector('[data-tor-haste-assistant]')?.addEventListener('click',()=>document.getElementById('hfAssistantOpen')?.click());
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
