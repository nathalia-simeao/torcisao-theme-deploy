<?php
/** Página unificada de Barra Trefilada. */
$bf_initial = isset($torcisao_barra_initial) && in_array($torcisao_barra_initial, ['btc','mtc','atc','ressulfurado'], true)
    ? $torcisao_barra_initial
    : (isset($_GET['tipo']) && in_array(sanitize_key($_GET['tipo']), ['btc','mtc','atc','ressulfurado'], true) ? sanitize_key($_GET['tipo']) : 'btc');
$bf_assets = get_template_directory_uri();
$bf_iso = 'https://torcisao.com.br/wp-content/uploads/2026/09/TORCISAO-9001.pdf';
$bf_lang = function_exists('torcisao_request_language') ? torcisao_request_language() : 'pt';
?>
<link rel="stylesheet" href="<?php echo esc_url($bf_assets . '/assets/torcisao-haste-family.css'); ?>?v=20260906">
<link rel="stylesheet" href="<?php echo esc_url($bf_assets . '/assets/torcisao-haste-aeo-v1.css'); ?>?v=20260921-2">
<main class="hf-page bf-page" id="barra-trefilada" data-initial-kind="<?php echo esc_attr($bf_initial); ?>">
  <section class="hf-top"><div class="hf-wrap">
    <span class="hf-eyebrow">Linha Torcisão Trefilados</span>
    <h1 class="hf-title">Barra Trefilada</h1>
    <p class="hf-intro">Soluções em barras trefiladas para aplicações que exigem precisão dimensional, acabamento e desempenho mecânico.</p>
    <div class="hf-family-tabs" style="--hf-tab-count:4" role="tablist" aria-label="Opções de Barra Trefilada">
      <button type="button" class="hf-family-tab" data-bf-kind="btc" role="tab">Baixo Carbono</button>
      <button type="button" class="hf-family-tab" data-bf-kind="mtc" role="tab">Médio Carbono</button>
      <button type="button" class="hf-family-tab" data-bf-kind="atc" role="tab">Alto Carbono</button>
      <button type="button" class="hf-family-tab" data-bf-kind="ressulfurado" role="tab">Ressulfurado</button>
    </div>
  </div></section>

  <section class="hf-explorer-section"><div class="hf-wrap"><div class="hf-explorer">
    <div class="hf-copy">
      <span class="hf-product-kicker">Barra trefilada</span>
      <h2 class="hf-product-title" id="bfProductTitle"></h2>
      <p class="hf-product-lead" id="bfProductLead"></p>
      <div class="hf-facts" id="bfFacts"></div>
      <div class="hf-actions">
        <button type="button" class="hf-btn hf-btn-primary js-bf-quote" data-analytics-origin="barra_produto_principal" data-analytics-product="barra_trefilada"><i class="bi bi-whatsapp"></i> Solicitar cotação</button>
        <button type="button" class="hf-btn hf-btn-secondary" id="bfAssistantOpen"><i class="bi bi-stars"></i> Não sabe qual avaliar? Use o assistente</button>
      </div>
    </div>
    <div class="hf-stage"><div class="hf-stage-toolbar"><button type="button" class="hf-tool" id="bfZoomOut" aria-label="Diminuir zoom">−</button><span class="hf-tool hf-zoom-label" id="bfZoomLabel">1,0×</span><button type="button" class="hf-tool" id="bfZoomIn" aria-label="Aumentar zoom">+</button></div>
      <div class="hf-viewer"><div class="hf-image-wrap" id="bfImageWrap" tabindex="0" role="button" aria-label="Abrir imagem ampliada"><img class="hf-image" id="bfImage" src="" alt="" loading="eager" decoding="async"><div class="hf-lens" id="bfLens" aria-hidden="true"></div></div><div class="hf-caption"><div><small>Barra Trefilada</small><strong id="bfCaptionTitle"></strong></div><span id="bfCaptionMeta"></span></div></div>
      <span class="hf-stage-note">Passe o cursor para ampliar os detalhes</span>
    </div>
  </div></div></section>

  <section class="hf-section" id="especificacoes"><div class="hf-wrap"><div class="hf-section-head"><span class="hf-section-kicker">Especificações</span><h2 class="hf-section-title">Dados técnicos para avaliar a aplicação</h2><p class="hf-section-intro">As referências abaixo reproduzem as informações publicadas pela Torcisão. Tolerâncias, composição, tratamento e demais requisitos devem ser confirmados conforme o desenho ou memorial do projeto.</p></div><div class="hf-spec-grid"><div class="hf-spec-card" id="bfSpecs"></div><div class="hf-availability-card"><div class="hf-availability-head"><strong>Faixa e fornecimento</strong><small>Referências da opção selecionada</small></div><div id="bfAvailability"></div></div></div><?php if ($bf_lang === 'pt') : ?><div class="hf-aeo-quick" aria-label="Comparação rápida de acabamento e usinagem em barras trefiladas"><div class="hf-aeo-quick-title"><small>Comparação rápida</small><strong>Acabamento e usinagem</strong></div><div class="hf-aeo-quick-item"><span>Barra trefilada</span><strong>Precisão dimensional</strong><p>O trabalho a frio melhora acabamento e controle dimensional. A tolerância final deve seguir o desenho e a especificação do pedido.</p></div><div class="hf-aeo-quick-item"><span>Polida / reendireitada</span><strong>Etapa adicional</strong><p>Pode ser avaliada quando o projeto exige condição adicional de superfície ou retilineidade. Confirme acabamento e tolerância na cotação.</p></div><div class="hf-aeo-quick-item"><span>11SMn37</span><strong>Usinabilidade melhorada</strong><p>O aço ressulfurado favorece a formação e a quebra do cavaco em usinagem seriada. Bitola, tolerância e acabamento continuam sendo especificados separadamente.</p></div></div><?php endif; ?></div></section>

  <section class="hf-section" id="aplicacoes"><div class="hf-wrap"><div class="hf-section-head"><span class="hf-section-kicker">Aplicações</span><h2 class="hf-section-title">Onde cada linha pode ser avaliada</h2><p class="hf-section-intro">A aplicação indica um ponto de partida. A seleção do aço depende dos requisitos mecânicos, dimensionais e do processo de fabricação.</p></div><div class="hf-app-grid"><article class="hf-app-card"><h3>Aplicações publicadas</h3><ul class="hf-chip-list" id="bfApplications"></ul></article><article class="hf-app-card"><h3>O que validar no projeto</h3><div class="hf-variant-note"><div class="hf-variant-box"><strong>Aço / teor de carbono</strong><p>Confirme a classificação do material prevista no desenho ou especificação.</p></div><div class="hf-variant-box"><strong>Dimensão e tolerância</strong><p>Bitola, comprimento e tolerância devem acompanhar a necessidade da peça.</p></div><div class="hf-variant-box"><strong>Processo</strong><p>Usinagem, conformação, soldagem, tratamento ou acabamento podem alterar a seleção final.</p></div></div></article></div><?php if ($bf_lang === 'pt') : ?>
<div class="hf-section-head" id="guia-tecnico-barras" style="margin-top:clamp(30px,5vw,56px)">
  <span class="hf-section-kicker">Guia técnico</span>
  <h2 class="hf-section-title">Como especificar barras trefiladas para usinagem e aplicações industriais</h2>
  <p class="hf-section-intro">A escolha entre aço de baixo, médio ou alto teor de carbono, 11SMn37 e diferentes condições de acabamento deve partir da aplicação, do processo de fabricação e dos requisitos do desenho. Os pontos abaixo ajudam a estruturar essa avaliação antes da cotação.</p>
</div>
<div class="hf-app-grid">
  <article class="hf-app-card">
    <h3>Quais as vantagens do aço 11SMn37 na usinagem?</h3>
    <p>O 11SMn37 é um aço ressulfurado de usinabilidade melhorada. O enxofre controlado favorece a formação de inclusões de sulfeto de manganês, que ajudam na formação e na quebra do cavaco durante operações de corte.</p>
    <p>Em usinagem seriada, essa característica pode contribuir para maior estabilidade do processo e produtividade. O efeito sobre velocidade de corte, acabamento e vida útil da ferramenta depende também da geometria da peça, ferramenta, lubrificação, parâmetros de usinagem e condição de fornecimento.</p>
    <p>Por isso, a especificação deve considerar em conjunto aço, bitola, tolerância, acabamento, propriedades exigidas e aplicação final.</p>
  </article>
  <article class="hf-app-card">
    <h3>Qual a diferença entre barra trefilada, polida e reendireitada?</h3>
    <p>A barra trefilada passa por trabalho a frio para obter melhor controle dimensional e condição superficial em relação ao material de origem. Quando o projeto exige requisitos adicionais de retilineidade ou superfície, podem ser avaliadas etapas complementares de reendireitamento e polimento.</p>
    <p>Polimento ou reendireitamento não substituem a especificação dimensional do desenho. Diâmetro, ovalização, retilineidade, rugosidade, comprimento e tolerância devem ser definidos conforme a função da peça e confirmados no fornecimento.</p>
  </article>
  <article class="hf-app-card">
    <h3>Como escolher entre barras BTC, MTC e ATC?</h3>
    <p>O teor de carbono é um dos fatores de seleção, mas não deve ser usado sozinho. Aços de baixo teor de carbono costumam ser avaliados quando conformabilidade, ductilidade ou soldabilidade têm maior peso. Faixas intermediárias podem atender aplicações que exigem equilíbrio entre resistência e processamento. Aços de maior teor de carbono entram em avaliações em que dureza, resistência ao desgaste ou resposta a tratamento térmico são relevantes.</p>
    <p>Para autopeças, pinos, hastes, componentes de amortecedores e outras peças críticas, a definição deve considerar desenho, carregamento, fadiga, tratamento térmico, usinagem, acabamento e propriedades mecânicas finais. A equipe Torcisão avalia a opção de fornecimento a partir desses requisitos, sem substituir a especificação técnica do projeto.</p>
  </article>
  <article class="hf-app-card">
    <h3>O que enviar para uma cotação técnica de barras trefiladas?</h3>
    <p>Informe o grau ou especificação do aço, perfil, bitola, comprimento, quantidade, tolerâncias, acabamento desejado, aplicação, condição de tratamento quando aplicável e requisitos de documentação ou ensaio.</p>
    <p>Quanto mais completa a especificação, mais objetiva fica a análise de viabilidade, disponibilidade e condição comercial. Para aço ressulfurado, veja também o <a href="<?php echo esc_url(home_url('/2026/09/15/7-criterios-para-escolher-fabricante-de-barras-trefiladas-em-aco-11smn37/')); ?>">guia de compra de barras 11SMn37</a>.</p>
  </article>
</div>
<div class="hf-mini-faq" id="faq"><div class="hf-mini-faq-head"><span class="hf-section-kicker">Dúvidas rápidas</span><h3>Perguntas frequentes sobre barra trefilada</h3></div><div class="hf-mini-faq-grid"><details><summary>Por que o 11SMn37 é usado em usinagem seriada?</summary><p>O 11SMn37 é um aço de usinabilidade melhorada. Seu teor controlado de enxofre favorece inclusões que ajudam na formação e na quebra do cavaco, característica útil em operações contínuas e peças torneadas em série.</p></details><details><summary>Qual a diferença entre barra trefilada e barra polida ou reendireitada?</summary><p>A barra trefilada já recebe ganho de precisão dimensional e acabamento pelo trabalho a frio. Quando o projeto exige condição adicional de superfície ou retilineidade, pode ser avaliada uma barra polida ou reendireitada. A tolerância final deve ser confirmada conforme desenho, aplicação e especificação do pedido.</p></details><details><summary>O que informar ao solicitar barra 11SMn37?</summary><p>Informe bitola, comprimento, tolerância, acabamento desejado, quantidade, aplicação e qualquer requisito de laudo ou especificação. Para barra polida ou reendireitada, sinalize essa necessidade já na cotação.</p></details></div></div><?php endif; ?></div></section>

  <section class="hf-section hf-quality-section"><div class="hf-wrap"><div class="hf-quality-card"><div class="hf-quality-copy"><div class="hf-quality-icon"><i class="bi bi-patch-check-fill"></i></div><div><h3>Qualidade Torcisão</h3><p>Consulte o certificado de qualidade e valide com nossa equipe qualquer requisito específico do seu projeto.</p></div></div><div class="hf-quality-actions"><a class="hf-btn hf-btn-secondary" href="<?php echo esc_url($bf_iso); ?>" target="_blank" rel="noopener">Ver certificado ISO</a></div></div></div></section>

  <section class="hf-cta"><div class="hf-wrap"><div class="hf-cta-box"><div class="hf-cta-copy"><span class="hf-section-kicker">Suporte técnico e comercial</span><h2>Precisa confirmar qual barra deve entrar na avaliação?</h2><p>Use o Theo para organizar a necessidade ou fale diretamente com a equipe Torcisão para validar especificação e cotação.</p></div><div class="hf-cta-side"><div class="hf-theo-card"><img class="hf-theo-avatar" src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt="Theo, assistente da Torcisão"><div class="hf-theo-copy"><small>Assistente Torcisão</small><strong>Theo</strong><span>Aplicação, produto e próximos passos</span></div></div><div class="hf-cta-actions"><button type="button" class="hf-btn hf-btn-primary" id="bfAssistantOpenBottom"><i class="bi bi-stars"></i> Consultar o Theo</button><button type="button" class="hf-btn hf-btn-secondary js-bf-quote" data-analytics-origin="barra_cta_final" data-analytics-product="barra_trefilada">Solicitar cotação</button></div></div></div></div></section>
</main>

<div class="hf-lightbox" id="bfLightbox" aria-hidden="true"><button type="button" class="hf-lightbox-close" aria-label="Fechar">×</button><img id="bfLightboxImage" src="" alt=""></div>
<div class="hf-assistant" id="bfAssistant" aria-hidden="true"><div class="hf-assistant-dialog" role="dialog" aria-modal="true" aria-labelledby="bfAssistantTitle"><div class="hf-assistant-head"><div class="hf-assistant-identity"><img class="hf-assistant-avatar" src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt="Theo"><div><small>Assistente de aplicação</small><h3 id="bfAssistantTitle">Theo</h3><p>Use a escolha rápida ou descreva a peça e o processo para organizar as opções Torcisão.</p></div></div><button type="button" class="hf-assistant-close" aria-label="Fechar">×</button></div><div class="hf-assistant-body"><div class="hf-manual-block"><div class="hf-manual-head"><strong>Prefere escolher manualmente?</strong><small>Selecione uma opção para ver os principais dados antes de falar com a equipe.</small></div><div class="hf-manual-controls"><select class="hf-manual-select" id="bfManualSelect"><option value="btc">Baixo Carbono · 1006 a 1020</option><option value="mtc">Médio Carbono · 1035 a 1045</option><option value="atc">Alto Carbono · 1050</option><option value="ressulfurado">Aço Ressulfurado</option></select><button type="button" class="hf-manual-action" id="bfManualAction">Ver opção</button></div><div class="hf-manual-result" id="bfManualResult"></div></div><div class="hf-assistant-divider">ou descreva a aplicação</div><div class="hf-theo-chat-title"><img src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt=""><div><strong>Converse com o Theo</strong><small>Respostas baseadas nas informações Torcisão</small></div></div><div class="hf-chat" id="bfChat" aria-live="polite"><div class="hf-msg assistant">Descreva a peça, aplicação, bitola, quantidade ou requisito que você precisa avaliar. Eu organizo as opções Torcisão sem inventar especificações.</div></div></div><div class="hf-assistant-compose"><input class="hf-assistant-input" id="bfAssistantInput" type="text" maxlength="600" placeholder="Ex.: preciso fabricar pinos de..." aria-label="Mensagem para o Theo"><button type="button" class="hf-assistant-send" id="bfAssistantSend" aria-label="Enviar"><i class="bi bi-arrow-up"></i></button></div></div></div>

<button type="button" class="btn-cta-mobile" id="bfQuoteTab" data-analytics-origin="barra_aba_cotacao" data-analytics-product="barra_trefilada" aria-label="Solicitar cotação"><i class="bi bi-chat-dots-fill"></i><span class="btn-cta-mobile-label">Solicitar cotação</span></button>
<div class="hf-quote-drawer" id="bfQuoteDrawer" aria-hidden="true"><div class="hf-quote-panel"><div class="hf-quote-head"><div><small>COTAÇÃO</small><h3>Solicite seu orçamento</h3></div><button type="button" class="hf-quote-close" aria-label="Fechar">×</button></div><div id="bfQuoteForm" data-analytics-origin="barra_aba_cotacao" data-analytics-product="barra_trefilada"></div></div></div>
<script>window.TORCISAO_BARRA_PAGE=<?php echo wp_json_encode(['rest'=>esc_url_raw(rest_url('torcisao/v1/application-assistant')),'formId'=>'7032f62e-b2f6-486a-8db7-bd2822b5db93','portalId'=>'50818463']); ?>;</script>
<script defer src="<?php echo esc_url($bf_assets . '/assets/torcisao-barra-family.js'); ?>?v=20260906"></script>
