<?php
/**
 * Drawer de cotação da Home.
 * Mantém o padrão de orelhinha lateral aprovado e carrega HubSpot sob demanda.
 */
$home_conversion_assets = get_template_directory_uri();
?>
<link rel="stylesheet" href="<?php echo esc_url($home_conversion_assets . '/assets/torcisao-home-conversion.css'); ?>?v=20260910-1">
<link rel="stylesheet" href="<?php echo esc_url($home_conversion_assets . '/assets/torcisao-home-mobile-final.css'); ?>?v=20260907-2">

<button type="button" class="home-quote-tab" id="homeQuoteTab" data-analytics-origin="home_aba_cotacao" aria-label="Faça uma cotação">
  <i class="bi bi-chat-dots-fill"></i>
  <span class="home-quote-tab-label">Faça uma cotação</span>
</button>

<div class="home-quote-drawer" id="homeQuoteDrawer" aria-hidden="true">
  <aside class="home-quote-panel" role="dialog" aria-modal="true" aria-labelledby="homeQuoteTitle">
    <div class="home-quote-head">
      <div><small>COTAÇÃO</small><h2 id="homeQuoteTitle">Faça uma cotação</h2><p>Preencha os dados para dar contexto ao atendimento comercial</p></div>
      <button type="button" class="home-quote-close" aria-label="Fechar">×</button>
    </div>
    <div id="homeQuoteForm" class="home-quote-form" data-hubspot-portal="50818463" data-hubspot-form="58fa568f-a57c-4676-a260-ade4722bf099">
      <div class="home-quote-placeholder"><span></span>O formulário será carregado ao abrir a cotação</div>
    </div>
  </aside>
</div>

<script defer src="<?php echo esc_url($home_conversion_assets . '/assets/torcisao-home-conversion.js'); ?>?v=20260906-2"></script>
