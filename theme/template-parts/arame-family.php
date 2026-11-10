<?php
/** Página unificada de Arame Trefilado. */
$af_initial = isset($torcisao_arame_initial) && in_array($torcisao_arame_initial, ['btc','mtc','atc'], true)
    ? $torcisao_arame_initial
    : (isset($_GET['tipo']) && in_array(sanitize_key($_GET['tipo']), ['btc','mtc','atc'], true) ? sanitize_key($_GET['tipo']) : 'btc');
$af_assets = get_template_directory_uri();
$af_iso = 'https://torcisao.com.br/wp-content/uploads/2026/09/TORCISAO-9001.pdf';
$af_whatsapp = 'https://wa.me/551123349989?text=' . rawurlencode('Olá! Vim pela página de Arame Trefilado da Torcisão e gostaria de falar com a equipe comercial sobre uma cotação.');
$af_lang = function_exists('torcisao_request_language') ? torcisao_request_language() : 'pt';
/* SEO: o Google recebe o título e o texto da opção inicial já no HTML (antes vinham vazios e só o JS preenchia) */
$af_seo = [
    'btc' => ['Baixo Teor de Carbono · 1004 a 1020', 'Arame trefilado de baixo teor de carbono, em perfil redondo e fornecido em rolos ou spiders. Consulte bitola, tolerância e condição de fornecimento para o seu pedido.'],
    'mtc' => ['Médio Teor de Carbono · 1035 a 1050', 'Arame trefilado de médio teor de carbono, em perfil redondo e fornecido em rolos ou spiders. A seleção deve considerar aço, bitola, requisito mecânico e processo da peça.'],
    'atc' => ['Alto Teor de Carbono · 1060 a 1090', 'Arame trefilado de alto teor de carbono, em perfil redondo e fornecido em rolos ou spiders. A especificação deve ser validada conforme aço, bitola, requisito mecânico e processo da peça.'],
];
$af_seo_now = $af_lang === 'pt' ? $af_seo[$af_initial] : ['', ''];
?>
<link rel="stylesheet" href="<?php echo esc_url($af_assets . '/assets/torcisao-haste-family.css'); ?>?v=20260906">
<link rel="stylesheet" href="<?php echo esc_url($af_assets . '/assets/torcisao-haste-aeo-v1.css'); ?>?v=20260921-2">
<link rel="stylesheet" href="<?php echo esc_url($af_assets . '/assets/torcisao-arame-commercial-v19.css'); ?>?v=20260907-1">
<main class="hf-page af-page" id="arame-trefilado" data-initial-kind="<?php echo esc_attr($af_initial); ?>">
  <section class="hf-top"><div class="hf-wrap">
    <span class="hf-eyebrow">Soluções em arame trefilado</span>
    <h1 class="hf-title">Arame Trefilado</h1>
    <p class="hf-intro">Compare opções de baixo, médio e alto teor de carbono, consulte bitolas e forma de fornecimento e avance com a equipe Torcisão na validação do seu pedido.</p>
    <div class="hf-family-tabs" style="--hf-tab-count:3" role="tablist" aria-label="Opções de Arame Trefilado">
      <button type="button" class="hf-family-tab" data-af-kind="btc" role="tab">Baixo Carbono</button>
      <button type="button" class="hf-family-tab" data-af-kind="mtc" role="tab">Médio Carbono</button>
      <button type="button" class="hf-family-tab" data-af-kind="atc" role="tab">Alto Carbono</button>
    </div>
  </div></section>

  <section class="hf-explorer-section"><div class="hf-wrap"><div class="hf-explorer">
    <div class="hf-copy">
      <span class="hf-product-kicker">Arame trefilado</span>
      <h2 class="hf-product-title" id="afProductTitle"><?php echo esc_html($af_seo_now[0]); ?></h2>
      <p class="hf-product-lead" id="afProductLead"><?php echo esc_html($af_seo_now[1]); ?></p>
      <div class="hf-facts" id="afFacts"></div>
      <div class="hf-actions">
        <button type="button" class="hf-btn hf-btn-primary js-af-quote" data-analytics-origin="arame_produto_principal" data-analytics-product="arame_trefilado"><i class="bi bi-whatsapp"></i> Solicitar cotação</button>
        <button type="button" class="hf-btn hf-btn-secondary" id="afAssistantOpen"><i class="bi bi-stars"></i> Não sabe qual avaliar? Use o assistente</button>
      </div>
    </div>
    <div class="hf-stage"><div class="hf-stage-toolbar"><button type="button" class="hf-tool" id="afZoomOut" aria-label="Diminuir zoom">−</button><span class="hf-tool hf-zoom-label" id="afZoomLabel">1,0×</span><button type="button" class="hf-tool" id="afZoomIn" aria-label="Aumentar zoom">+</button></div>
      <div class="hf-viewer"><div class="hf-image-wrap" id="afImageWrap" tabindex="0" role="button" aria-label="Abrir imagem ampliada"><img class="hf-image" id="afImage" src="" alt="" loading="eager" decoding="async"><div class="hf-lens" id="afLens" aria-hidden="true"></div></div><div class="hf-caption"><div><small>Arame Trefilado</small><strong id="afCaptionTitle"></strong></div><span id="afCaptionMeta"></span></div></div>
      <span class="hf-stage-note">Passe o cursor para ampliar os detalhes</span>
    </div>
  </div></div></section>

  <section class="hf-section" id="especificacoes"><div class="hf-wrap"><div class="hf-section-head"><span class="hf-section-kicker">Especificações</span><h2 class="hf-section-title">Características da opção selecionada</h2><p class="hf-section-intro">Consulte faixa de aço, bitola, perfil, acabamento e forma de fornecimento. A tolerância deve ser confirmada conforme a especificação do pedido.</p></div><div class="hf-spec-grid"><div class="hf-spec-card" id="afSpecs"></div><div class="hf-availability-card"><div class="hf-availability-head"><strong>Faixa e fornecimento</strong><small>Referências da opção selecionada</small></div><div id="afAvailability"></div></div></div><?php if ($af_lang === 'pt') : ?><div class="hf-aeo-quick" aria-label="Comparação rápida entre arames BTC, MTC e ATC"><div class="hf-aeo-quick-title"><small>Comparação rápida</small><strong>BTC x MTC x ATC</strong></div><div class="hf-aeo-quick-item"><span>BTC</span><strong>SAE 1004 a 1020</strong><p>Faixa de baixo teor de carbono, usualmente avaliada quando a conformabilidade é relevante, como em displays, utilidades, linha branca e racks.</p></div><div class="hf-aeo-quick-item"><span>MTC</span><strong>SAE 1035 a 1050</strong><p>Faixa intermediária de carbono, indicada para aplicações que exigem equilíbrio entre conformação e maior resistência mecânica.</p></div><div class="hf-aeo-quick-item"><span>ATC</span><strong>SAE 1060 a 1090</strong><p>Faixa de alto teor de carbono, usada em aplicações que exigem maior resistência, como molas, cabos de aço e componentes industriais.</p></div></div>

      <?php /* AEO: resumo técnico em texto fixo no HTML, para leitura por buscadores e assistentes de IA (não depende do JS do seletor). */ ?>
      <div class="hf-aeo-summary" id="resumo-tecnico" style="margin-top:28px">
        <div class="hf-section-head" style="margin-bottom:18px"><span class="hf-section-kicker">Resumo técnico</span><h2 class="hf-section-title" style="font-size:clamp(1.5rem,2.2vw,2.1rem)">Arame trefilado direto da fábrica</h2><p class="hf-section-intro">A Torcisão Trefilados fabrica arame de aço trefilado de baixo, médio e alto teor de carbono, em rolos ou spiders, com venda direta para distribuidores, atacadistas e indústrias de transformação em todo o Brasil. Perfil redondo, acabamento trefilado. Tolerâncias sob consulta.</p></div>
        <div class="hf-spec-grid">
          <div class="hf-availability-card">
            <div class="hf-availability-head"><strong>Ligas, bitolas e aplicações</strong><small>Faixas de aço SAE e diâmetros disponíveis</small></div>
            <table class="hf-availability-table">
              <thead><tr><th>Liga</th><th>Bitolas e aplicações</th></tr></thead>
              <tbody>
                <tr><td>BTC · SAE 1004 a 1020</td><td>2,00 a 15,88 mm · displays aramados, utilidades domésticas, linha branca, racks</td></tr>
                <tr><td>MTC · SAE 1035 a 1050</td><td>4,76 a 15,88 mm · telas, molas, cabos de aço, componentes automotivos, pregos</td></tr>
                <tr><td>ATC · SAE 1060 a 1090</td><td>4,76 a 15,88 mm · telas, molas, cabos de aço, componentes automotivos, pregos</td></tr>
              </tbody>
            </table>
          </div>
          <div class="hf-availability-card">
            <div class="hf-availability-head"><strong>Lote mínimo</strong><small>Compra direta de fábrica</small></div>
            <table class="hf-availability-table">
              <thead><tr><th>Situação</th><th>Lote mínimo</th></tr></thead>
              <tbody>
                <tr><td>Bitola padrão em estoque</td><td>1 rolo (150 kg), com retirada na fábrica e faturamento em vencimento único</td></tr>
                <tr><td>Produção em linha monobloco (bitola padrão ou não)</td><td>500 kg</td></tr>
                <tr><td>Bitola fora de estoque</td><td>2.000 kg</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="hf-spec-grid" style="margin-top:20px">
          <div class="hf-availability-card">
            <div class="hf-availability-head"><strong>Prazos de entrega</strong><small>Conforme bitola e forma de fornecimento</small></div>
            <table class="hf-availability-table">
              <thead><tr><th>Material</th><th>Prazo</th></tr></thead>
              <tbody>
                <tr><td>Arame em spider em estoque · 2,05 a 6,36 mm</td><td>3 dias úteis</td></tr>
                <tr><td>Arame fracionado / estocador · 2,05 a 6,35 mm</td><td>5 dias úteis (+1 dia útil para o interior, de 60 a 250 km)</td></tr>
                <tr><td>Arame sob produção · 6,36 a 15,88 mm</td><td>10 dias úteis</td></tr>
              </tbody>
            </table>
          </div>
          <div class="hf-availability-card">
            <div class="hf-availability-head"><strong>Rolo ou spider</strong><small>Formas de fornecimento</small></div>
            <table class="hf-availability-table">
              <thead><tr><th>Forma</th><th>Quando costuma ser indicada</th></tr></thead>
              <tbody>
                <tr><td>Spider</td><td>Arame em suporte metálico, para alimentação contínua da linha e manuseio com empilhadeira. Comum em displays, linha branca e telas de alto volume.</td></tr>
                <tr><td>Rolo</td><td>Arame em bobina amarrada, para volumes menores, desbobinador próprio ou quando o material é fracionado.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <?php endif; ?></div></section>

  <section class="hf-section" id="aplicacoes"><div class="hf-wrap"><div class="hf-section-head"><span class="hf-section-kicker">Aplicação e consulta</span><h2 class="hf-section-title">Organize os requisitos antes da cotação</h2><p class="hf-section-intro">Informe aplicação, faixa de aço, bitola, propriedades requeridas e forma de fornecimento para direcionar a consulta à opção adequada.</p></div><div class="hf-app-grid"><article class="hf-app-card"><h3>Ferramentas para avançar</h3><ul class="hf-chip-list" id="afApplications"></ul></article><article class="hf-app-card"><h3>O que informar na consulta</h3><div class="hf-variant-note"><div class="hf-variant-box"><strong>Aço e bitola</strong><p>Informe a faixa de aço e o diâmetro nominal previstos no desenho ou na especificação.</p></div><div class="hf-variant-box"><strong>Requisito mecânico</strong><p>Quando houver requisito de resistência, dureza ou outra propriedade, informe a referência prevista para a peça.</p></div><div class="hf-variant-box"><strong>Forma de fornecimento</strong><p>Indique rolo ou spider e as demais condições do pedido. A disponibilidade é confirmada durante a cotação.</p></div></div></article></div><?php if ($af_lang === 'pt') : ?>
<div class="hf-mini-faq" id="faq" style="margin-top:clamp(30px,5vw,56px)">
  <div class="hf-mini-faq-head">
    <span class="hf-section-kicker">Dúvidas frequentes</span>
  </div>
  <div class="hf-mini-faq-grid">
    <details>
      <summary>Qual a diferença entre arame BTC, MTC e ATC?</summary>
      <p>BTC, MTC e ATC representam faixas de baixo, médio e alto teor de carbono. O BTC SAE 1004 a 1020 costuma ser avaliado quando conformação e ductilidade têm maior peso. O MTC SAE 1035 a 1050 atende situações intermediárias. Já o ATC SAE 1060 a 1090 entra em aplicações que exigem maior resistência, como molas, cabos de aço e componentes industriais. A seleção final deve seguir o desenho, o processo e as propriedades exigidas para a peça.</p>
    </details>
    <details>
      <summary>Rolo ou spider: qual acondicionamento escolher?</summary>
      <p>Rolo e spider são formas diferentes de acondicionar o arame. A escolha depende do sistema de alimentação da linha, manuseio, armazenamento e continuidade do processo. A Torcisão confirma a forma de fornecimento disponível para a especificação cotada.</p>
    </details>
    <details>
      <summary>Qual é o lote mínimo de arame trefilado?</summary>
      <p>Para bitola padrão em estoque, o lote mínimo é 1 rolo de 150 kg, com retirada na fábrica e faturamento em vencimento único. Produção em linha monobloco começa em 500 kg, e bitolas fora de estoque começam em 2.000 kg.</p>
    </details>
    <details>
      <summary>Onde comprar arame trefilado MTC e ATC direto de fabricante?</summary>
      <p>A Torcisão fabrica e fornece arames trefilados para clientes industriais no Brasil. A linha inclui opções de médio e alto teor de carbono para aplicações como molas, telas, cabos de aço e componentes industriais. A equipe comercial valida bitola, aço, acondicionamento, quantidade, disponibilidade e prazo antes do pedido.</p>
    </details>
    <details>
      <summary>Como solicitar cotação de arame trefilado?</summary>
      <p>Envie classe ou grau do aço, bitola, quantidade, aplicação e forma de fornecimento. Quando houver exigência de resistência, dureza, acabamento, tolerância ou documentação, inclua esses dados na consulta.</p>
    </details>
    <details>
      <summary>Qual o prazo de entrega do arame trefilado?</summary>
      <p>Arame em spider em estoque (2,05 a 6,36 mm) sai em 3 dias úteis. Arame fracionado ou de estocador (2,05 a 6,35 mm) leva 5 dias úteis, com 1 dia útil a mais para o interior entre 60 e 250 km. Bitolas sob produção (6,36 a 15,88 mm) levam 10 dias úteis.</p>
    </details>
    <details>
      <summary>Qual arame usar para molas e telas?</summary>
      <p>Arame de médio teor de carbono (MTC, SAE 1035 a 1050) ou de alto teor de carbono (ATC, SAE 1060 a 1090), nas bitolas de 4,76 a 15,88 mm. A escolha depende da resistência exigida pela peça.</p>
    </details>
    <details>
      <summary>O que avaliar além do preço?</summary>
      <p>Em compras recorrentes, compare também consistência dimensional, acondicionamento, prazo, suporte técnico e estabilidade do fornecimento. O menor preço unitário pode perder vantagem quando há dificuldade de alimentação da linha, perdas ou retrabalho.</p>
    </details>
  </div>
</div><?php endif; ?></div></section>

  <?php if (function_exists('torcisao_seo_application_links')) torcisao_seo_application_links('arame'); ?>
  <section class="hf-section hf-quality-section"><div class="hf-wrap"><div class="hf-quality-card"><div class="hf-quality-copy"><div class="hf-quality-icon"><i class="bi bi-patch-check-fill"></i></div><div><h3>Qualidade Torcisão</h3><p>Consulte o certificado ISO 9001 da Torcisão. Requisitos específicos do item devem ser confirmados durante a cotação.</p></div></div><div class="hf-quality-actions"><a class="hf-btn hf-btn-secondary" href="<?php echo esc_url($af_iso); ?>" target="_blank" rel="noopener">Ver certificado ISO</a></div></div></div></section>

  <section class="hf-cta"><div class="hf-wrap"><div class="hf-cta-box"><div class="hf-cta-copy"><span class="hf-section-kicker">Atendimento comercial</span><h2>Pronto para avançar com sua cotação?</h2><p>Envie aplicação, faixa de aço, bitola, forma de fornecimento e quantidade para a equipe Torcisão validar a condição do pedido e preparar a cotação.</p></div><div class="hf-cta-side"><div class="hf-theo-card"><div class="hf-commercial-icon" aria-hidden="true"><i class="bi bi-headset"></i></div><div class="hf-theo-copy"><small>Equipe Torcisão</small><strong>Comercial</strong><span>(11) 2334-9989 · atendimento direto</span></div></div><div class="hf-cta-actions"><a class="hf-btn hf-btn-primary" href="<?php echo esc_url($af_whatsapp); ?>" target="_blank" rel="noopener" data-analytics-origin="arame_cta_whatsapp" data-analytics-product="arame_trefilado"><i class="bi bi-whatsapp"></i> Falar com o comercial</a><button type="button" class="hf-btn hf-btn-secondary js-af-quote" data-analytics-origin="arame_cta_final" data-analytics-product="arame_trefilado">Solicitar cotação</button></div></div></div></div></section>
</main>

<div class="hf-lightbox" id="afLightbox" aria-hidden="true"><button type="button" class="hf-lightbox-close" aria-label="Fechar">×</button><img id="afLightboxImage" src="" alt=""></div>
<div class="hf-assistant" id="afAssistant" aria-hidden="true"><div class="hf-assistant-dialog" role="dialog" aria-modal="true" aria-labelledby="afAssistantTitle"><div class="hf-assistant-head"><div class="hf-assistant-identity"><img class="hf-assistant-avatar" src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt="Theo"><div><small>Assistente de aplicação</small><h3 id="afAssistantTitle">Theo</h3><p>Use a escolha rápida ou descreva a aplicação para organizar as opções Torcisão.</p></div></div><button type="button" class="hf-assistant-close" aria-label="Fechar">×</button></div><div class="hf-assistant-body"><div class="hf-manual-block"><div class="hf-manual-head"><strong>Prefere escolher manualmente?</strong><small>Selecione uma opção para ver os principais dados antes de falar com a equipe.</small></div><div class="hf-manual-controls"><select class="hf-manual-select" id="afManualSelect"><option value="btc">Baixo Carbono · 1004 a 1020</option><option value="mtc">Médio Carbono · 1035 a 1050</option><option value="atc">Alto Carbono · 1060 a 1090</option></select><button type="button" class="hf-manual-action" id="afManualAction">Ver opção</button></div><div class="hf-manual-result" id="afManualResult"></div></div><div class="hf-assistant-divider">ou descreva a aplicação</div><div class="hf-theo-chat-title"><img src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt=""><div><strong>Converse com o Theo</strong><small>Respostas baseadas nas informações Torcisão</small></div></div><div class="hf-chat" id="afChat" aria-live="polite"><div class="hf-msg assistant">Descreva a aplicação, faixa de aço, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo os pontos sem definir condição de produção sem validação.</div></div></div><div class="hf-assistant-compose"><input class="hf-assistant-input" id="afAssistantInput" type="text" maxlength="600" placeholder="Ex.: preciso de arame para molas de..." aria-label="Mensagem para o Theo"><button type="button" class="hf-assistant-send" id="afAssistantSend" aria-label="Enviar"><i class="bi bi-arrow-up"></i></button></div></div></div>

<button type="button" class="btn-cta-mobile" id="afQuoteTab" data-analytics-origin="arame_aba_cotacao" data-analytics-product="arame_trefilado" aria-label="Solicitar cotação"><i class="bi bi-chat-dots-fill"></i><span class="btn-cta-mobile-label">Solicitar cotação</span></button>
<div class="hf-quote-drawer" id="afQuoteDrawer" aria-hidden="true"><div class="hf-quote-panel"><div class="hf-quote-head"><div><small>COTAÇÃO</small><h3>Solicite seu orçamento</h3></div><button type="button" class="hf-quote-close" aria-label="Fechar">×</button></div><div id="afQuoteForm" data-analytics-origin="arame_aba_cotacao" data-analytics-product="arame_trefilado"></div></div></div>
<script>window.TORCISAO_ARAME_PAGE=<?php echo wp_json_encode(['rest'=>esc_url_raw(rest_url('torcisao/v1/application-assistant')),'formId'=>'618563c8-4899-441b-965d-801a83009fdf','portalId'=>'50818463']); ?>;</script>
<script defer src="<?php echo esc_url($af_assets . '/assets/torcisao-arame-family.js'); ?>?v=20261105-1"></script>
<script defer src="<?php echo esc_url($af_assets . '/assets/torcisao-arame-commercial-v19.js'); ?>?v=20260907-1"></script>
