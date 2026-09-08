<?php
/** Unified Haste de Aterramento experience. */
$hf_initial = isset($torcisao_haste_initial) && in_array($torcisao_haste_initial, ['baixa','alta','conectores'], true)
    ? $torcisao_haste_initial
    : (isset($_GET['tipo']) && in_array(sanitize_key($_GET['tipo']), ['baixa','alta','conectores'], true) ? sanitize_key($_GET['tipo']) : 'baixa');
$hf_assets = get_template_directory_uri();
$hf_iso = 'https://torcisao.com.br/wp-content/uploads/2026/09/TORCISAO-9001.pdf';
$hf_whatsapp = 'https://wa.me/551123349989?text=' . rawurlencode('Olá! Vim pela página de Haste de Aterramento da Torcisão e gostaria de falar com a equipe comercial sobre uma cotação.');
?>
<link rel="stylesheet" href="<?php echo esc_url($hf_assets . '/assets/torcisao-haste-family.css'); ?>?v=20260905">
<main class="hf-page" id="haste-aterramento" data-initial-kind="<?php echo esc_attr($hf_initial); ?>">
  <section class="hf-top">
    <div class="hf-wrap">
      <span class="hf-eyebrow">Soluções para aterramento</span>
      <h1 class="hf-title">Haste de Aterramento</h1>
      <p class="hf-intro">Compare opções de baixa e alta camada, consulte medidas e conectores e avance com a equipe Torcisão na validação da sua especificação.</p>
      <div class="hf-family-tabs" role="tablist" aria-label="Opções de Haste de Aterramento">
        <button type="button" class="hf-family-tab" data-hf-kind="baixa" role="tab">Baixa Camada</button>
        <button type="button" class="hf-family-tab" data-hf-kind="alta" role="tab">Alta Camada</button>
        <button type="button" class="hf-family-tab" data-hf-kind="conectores" role="tab">Conectores</button>
      </div>
    </div>
  </section>

  <section class="hf-explorer-section">
    <div class="hf-wrap">
      <div class="hf-explorer" id="hfExplorer">
        <div class="hf-copy">
          <span class="hf-product-kicker" id="hfKicker">Haste de aterramento</span>
          <h2 class="hf-product-title" id="hfProductTitle"></h2>
          <p class="hf-product-lead" id="hfProductLead"></p>
          <div class="hf-facts" id="hfFacts"></div>
          <div class="hf-connector-picker" id="hfConnectorPicker">
            <span class="hf-picker-label">Modelo</span>
            <div class="hf-connector-options">
              <button type="button" class="hf-connector-btn" data-hf-connector="olhal-simples">Olhal Simples</button>
              <button type="button" class="hf-connector-btn" data-hf-connector="olhal-reforcado">Olhal Reforçado</button>
              <button type="button" class="hf-connector-btn" data-hf-connector="grampo-simples">Grampo U Simples</button>
              <button type="button" class="hf-connector-btn" data-hf-connector="grampo-reforcado">Grampo U Reforçado</button>
            </div>
          </div>
          <div class="hf-actions">
            <button type="button" class="hf-btn hf-btn-primary js-hf-quote" data-analytics-origin="haste_produto_principal" data-analytics-product="haste_aterramento"><i class="bi bi-whatsapp"></i> Solicitar cotação</button>
            <button type="button" class="hf-btn hf-btn-secondary" id="hfAssistantOpen"><i class="bi bi-stars"></i> Não sabe qual avaliar? Use o assistente</button>
          </div>
        </div>

        <div class="hf-stage" id="hfStage">
          <div class="hf-stage-toolbar"><button type="button" class="hf-tool" id="hfZoomOut" aria-label="Diminuir zoom">−</button><span class="hf-tool hf-zoom-label" id="hfZoomLabel">1,0×</span><button type="button" class="hf-tool" id="hfZoomIn" aria-label="Aumentar zoom">+</button></div>
          <div class="hf-viewer">
            <div class="hf-image-wrap" id="hfImageWrap" tabindex="0" role="button" aria-label="Abrir imagem ampliada">
              <img class="hf-image" id="hfImage" src="" alt="" loading="eager" decoding="async">
              <div class="hf-lens" id="hfLens" aria-hidden="true"></div>
            </div>
            <div class="hf-caption"><div><small id="hfCaptionKicker"></small><strong id="hfCaptionTitle"></strong></div><span id="hfCaptionMeta"></span></div>
          </div>
          <span class="hf-stage-note">Passe o cursor para ampliar os detalhes</span>
        </div>
      </div>
    </div>
  </section>

  <section class="hf-section" id="especificacoes">
    <div class="hf-wrap">
      <div class="hf-section-head"><span class="hf-section-kicker">Especificações</span><h2 class="hf-section-title">Medidas e características da opção selecionada</h2><p class="hf-section-intro">Consulte os dados disponíveis para a configuração escolhida. Tolerâncias, combinações específicas e requisitos do projeto devem ser confirmados com nossa equipe.</p></div>
      <div class="hf-spec-grid">
        <div class="hf-spec-card" id="hfSpecs"></div>
        <div class="hf-availability-card"><div class="hf-availability-head"><strong id="hfAvailabilityTitle">Medidas disponíveis</strong><small id="hfAvailabilitySubtitle">Referências da opção selecionada</small></div><div id="hfAvailability"></div></div>
      </div>
    </div>
  </section>

  <section class="hf-section" id="aplicacoes">
    <div class="hf-wrap">
      <div class="hf-section-head"><span class="hf-section-kicker">Aplicações</span><h2 class="hf-section-title">Organize os requisitos antes da cotação</h2><p class="hf-section-intro">Use o assistente para estruturar camada, medida, conector e demais pontos técnicos que precisam ser validados no seu projeto.</p></div>
      <div class="hf-app-grid">
        <article class="hf-app-card"><h3>Aplicações publicadas</h3><ul class="hf-chip-list" id="hfApplications"></ul></article>
        <article class="hf-app-card"><h3>O que validar no projeto</h3><div class="hf-variant-note"><div class="hf-variant-box"><strong>Dimensão</strong><p>Bitola e comprimento compatíveis com o desenho ou memorial.</p></div><div class="hf-variant-box"><strong>Requisito técnico</strong><p>Norma, camada, material e condição de instalação exigidos.</p></div><div class="hf-variant-box"><strong>Conexão</strong><p>Modelo de conector e cabo previstos no sistema de aterramento.</p></div></div></article>
      </div>
    </div>
  </section>

  <section class="hf-section hf-quality-section">
    <div class="hf-wrap"><div class="hf-quality-card"><div class="hf-quality-copy"><div class="hf-quality-icon"><i class="bi bi-patch-check-fill"></i></div><div><h3>Qualidade Torcisão</h3><p>Consulte o certificado ISO e, quando necessário, valide requisitos específicos com nossa equipe.</p></div></div><div class="hf-quality-actions"><a class="hf-btn hf-btn-secondary" href="<?php echo esc_url($hf_iso); ?>" target="_blank" rel="noopener">Ver certificado ISO</a></div></div></div>
  </section>

  <section class="hf-cta">
    <div class="hf-wrap"><div class="hf-cta-box"><div class="hf-cta-copy"><span class="hf-section-kicker">Atendimento comercial</span><h2>Pronto para avançar com sua cotação?</h2><p>Envie sua necessidade ao comercial. Nossa equipe dá sequência à validação da especificação e ao atendimento da cotação.</p></div><div class="hf-cta-side"><div class="hf-theo-card"><div class="hf-commercial-icon" aria-hidden="true"><i class="bi bi-headset"></i></div><div class="hf-theo-copy"><small>Equipe Torcisão</small><strong>Comercial</strong><span>(11) 2334-9989 · atendimento direto</span></div></div><div class="hf-cta-actions"><a class="hf-btn hf-btn-primary" href="<?php echo esc_url($hf_whatsapp); ?>" target="_blank" rel="noopener" data-analytics-origin="haste_cta_whatsapp" data-analytics-product="haste_aterramento"><i class="bi bi-whatsapp"></i> Falar com o comercial</a><button type="button" class="hf-btn hf-btn-secondary js-hf-quote" data-analytics-origin="haste_cta_final" data-analytics-product="haste_aterramento">Solicitar cotação</button></div></div></div></div>
  </section>
</main>

<!-- lightbox -->
<div class="hf-lightbox" id="hfLightbox" aria-hidden="true"><button type="button" class="hf-lightbox-close" aria-label="Fechar">×</button><img id="hfLightboxImage" src="" alt=""></div>

<!-- assistant: manual + Theo -->
<div class="hf-assistant" id="hfAssistant" aria-hidden="true">
  <div class="hf-assistant-dialog" role="dialog" aria-modal="true" aria-labelledby="hfAssistantTitle">
    <div class="hf-assistant-head"><div class="hf-assistant-identity"><img class="hf-assistant-avatar" src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt="Theo"><div><small>Assistente de aplicação</small><h3 id="hfAssistantTitle">Theo</h3><p>Use a escolha rápida ou descreva a aplicação para eu organizar as opções Torcisão.</p></div></div><button type="button" class="hf-assistant-close" aria-label="Fechar">×</button></div>
    <div class="hf-assistant-body">
      <div class="hf-manual-block"><div class="hf-manual-head"><strong>Prefere escolher manualmente?</strong><small>Selecione uma opção para ver os principais dados antes de falar com a equipe.</small></div><div class="hf-manual-controls"><select class="hf-manual-select" id="hfManualSelect"><option value="baixa">Haste Baixa Camada</option><option value="alta">Haste Alta Camada</option><option value="conectores">Conectores para haste</option></select><button type="button" class="hf-manual-action" id="hfManualAction">Ver opção</button></div><div class="hf-manual-result" id="hfManualResult"></div></div>
      <div class="hf-assistant-divider">ou descreva a aplicação</div>
      <div class="hf-theo-chat-title"><img src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt=""><div><strong>Converse com o Theo</strong><small>Respostas baseadas nas informações Torcisão</small></div></div>
      <div class="hf-chat" id="hfChat" aria-live="polite"><div class="hf-msg assistant">Olá! Descreva a peça, aplicação, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo as opções Torcisão sem inventar especificações.</div></div>
    </div>
    <div class="hf-assistant-compose"><input class="hf-assistant-input" id="hfAssistantInput" type="text" maxlength="600" placeholder="Ex.: preciso de haste para SPDA em..." aria-label="Mensagem para o Theo"><button type="button" class="hf-assistant-send" id="hfAssistantSend" aria-label="Enviar"><i class="bi bi-arrow-up"></i></button></div>
  </div>
</div>

<!-- fixed quote tab + drawer -->
<button type="button" class="btn-cta-mobile" id="hfQuoteTab" data-analytics-origin="haste_aba_cotacao" data-analytics-product="haste_aterramento" aria-label="Solicitar cotação"><i class="bi bi-chat-dots-fill"></i><span class="btn-cta-mobile-label">Solicitar cotação</span></button>
<div class="hf-quote-drawer" id="hfQuoteDrawer" aria-hidden="true"><div class="hf-quote-panel"><div class="hf-quote-head"><div><small>COTAÇÃO</small><h3>Solicite seu orçamento</h3></div><button type="button" class="hf-quote-close" aria-label="Fechar">×</button></div><div id="hfQuoteForm" data-analytics-origin="haste_aba_cotacao" data-analytics-product="haste_aterramento"></div></div></div>
<script>window.TORCISAO_HASTE_PAGE=<?php echo wp_json_encode(['rest'=>esc_url_raw(rest_url('torcisao/v1/application-assistant')),'portalId'=>'50818463','formIds'=>['baixa'=>'8fdff701-c5a7-4684-9358-d557a70425a5','alta'=>'f836d957-0755-4223-a714-0f9f5cdb22f7','conectores'=>'8fdff701-c5a7-4684-9358-d557a70425a5']]); ?>;</script>
<script defer src="<?php echo esc_url($hf_assets . '/assets/torcisao-haste-family.js'); ?>?v=20260905"></script>
