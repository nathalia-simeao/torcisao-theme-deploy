<!doctype html>
<html <?php language_attributes(); ?> data-bs-theme="light">
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<script>(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-bs-theme',t);}catch(e){}})();</script>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> data-torcisao-origin="<?php echo esc_attr(is_front_page()?'home':'pagina_produto'); ?>">
<?php wp_body_open(); ?>
<header class="tor-header" id="torHeader">
  <div class="tor-header-row">
    <a class="tor-logo" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Torcisão Trefilados - início">
      <img src="<?php echo torcisao_asset('assets/lgcabecalho400.png'); ?>" alt="Torcisão Trefilados">
    </a>

    <nav class="tor-nav" aria-label="Linhas de produtos">
      <a href="<?php echo esc_url(home_url('/aramebtc/')); ?>"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="12" r="5" stroke="currentColor" stroke-width="1.8"/><path d="M14 12h7M4 12h1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>Arame Trefilado</a>
      <a href="<?php echo esc_url(home_url('/barrabtc/')); ?>"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="9" width="18" height="6" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M7 9v6M17 9v6" stroke="currentColor" stroke-width="1.4"/></svg>Barra Trefilada</a>
      <a href="<?php echo esc_url(home_url('/hastebc/')); ?>"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 16h8M6 19h12M9 22h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>Haste de Aterramento</a>
    </nav>

    <div class="tor-actions">
      <a class="tor-blog" href="<?php echo esc_url(home_url('/blog/')); ?>">Blog</a>
      <div class="tor-control-pill" aria-label="Preferências do site">
        <button type="button" data-theme-toggle aria-label="Alternar modo claro e escuro"><i class="bi bi-circle-half"></i></button>
        <span class="tor-control-divider"></span>
        <button type="button" data-language-open aria-label="Selecionar idioma"><i class="bi bi-globe2"></i></button>
        <span class="tor-control-divider tor-menu-toggle"></span>
        <button type="button" class="tor-menu-toggle" data-menu-open aria-label="Abrir menu"><i class="bi bi-list"></i></button>
      </div>
    </div>
  </div>

  <div class="tor-calc-row">
    <button type="button" class="tor-calc-open" id="torcisaoCalcOpen" aria-label="Abrir Calculadora de aço">
      <strong>Calculadora de aço</strong>
      <span class="tor-calc-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14v4M8 18h4" stroke-linecap="round"/></svg></span>
    </button>
  </div>
</header>

<aside class="tor-mobile-panel" id="torMobilePanel" aria-label="Menu móvel">
  <div class="tor-mobile-panel-head">
    <a class="tor-mobile-brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Torcisão Trefilados - início">
      <img class="tor-mobile-brand-light" src="https://torcisao.com.br/wp-content/uploads/2026/08/1.png" alt="Torcisão Trefilados">
      <img class="tor-mobile-brand-dark" src="https://torcisao.com.br/wp-content/uploads/2026/08/2.png" alt="Torcisão Trefilados">
    </a>
    <button class="tor-close" type="button" data-menu-close aria-label="Fechar menu">×</button>
  </div>
  <nav class="tor-mobile-links" aria-label="Navegação móvel">
    <a href="<?php echo esc_url(home_url('/aramebtc/')); ?>">
      <span class="tor-mobile-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="12" r="5" stroke="currentColor" stroke-width="1.8"/><path d="M14 12h7M4 12h1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span>
      <span>Arame Trefilado</span>
      <span class="tor-mobile-link-arrow" aria-hidden="true">→</span>
    </a>
    <a href="<?php echo esc_url(home_url('/barrabtc/')); ?>">
      <span class="tor-mobile-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="18" height="6" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M7 9v6M17 9v6" stroke="currentColor" stroke-width="1.4"/></svg></span>
      <span>Barra Trefilada</span>
      <span class="tor-mobile-link-arrow" aria-hidden="true">→</span>
    </a>
    <a href="<?php echo esc_url(home_url('/hastebc/')); ?>">
      <span class="tor-mobile-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 16h8M6 19h12M9 22h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span>
      <span>Haste de Aterramento</span>
      <span class="tor-mobile-link-arrow" aria-hidden="true">→</span>
    </a>
    <a href="<?php echo esc_url(home_url('/blog/')); ?>">
      <span class="tor-mobile-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M5 4.5h11.5A2.5 2.5 0 0 1 19 7v12H7.5A2.5 2.5 0 0 1 5 16.5v-12Z" stroke="currentColor" stroke-width="1.7"/><path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span>
      <span>Blog</span>
      <span class="tor-mobile-link-arrow" aria-hidden="true">→</span>
    </a>
  </nav>
</aside>

<!-- Seletor de idioma: padrão visual inspirado no Airbnb -->
<div class="tor-modal-backdrop" id="torLanguageModal" aria-hidden="true">
  <section class="tor-modal tor-language-modal" role="dialog" aria-modal="true" aria-labelledby="torLanguageTitle">
    <div class="tor-modal-head tor-language-head">
      <div><small>IDIOMA E TRADUÇÃO</small><h2 id="torLanguageTitle">Escolha como deseja navegar</h2></div>
      <button class="tor-close" type="button" data-language-close aria-label="Fechar">×</button>
    </div>
    <div class="tor-modal-body tor-language-body">
      <button type="button" class="tor-browser-translate" data-browser-translate aria-expanded="false">
        <span class="tor-browser-translate-icon"><i class="bi bi-translate"></i></span>
        <span class="tor-browser-translate-copy"><strong>Tradução do navegador</strong><small>Use a tradução automática disponível no Chrome, Edge, Safari ou no navegador que estiver usando.</small></span>
        <span class="tor-browser-translate-status">Disponível</span>
      </button>
      <div class="tor-browser-translate-hint" id="torBrowserTranslateHint" hidden>Procure o ícone de tradução na barra de endereço ou a opção <strong>Traduzir</strong> no menu do navegador. Essa tradução é feita pelo próprio navegador.</div>

      <div class="tor-language-section-head"><strong>Ou escolha o idioma manualmente</strong><small>A navegação permanece na página correspondente quando a versão publicada estiver disponível.</small></div>
      <div class="tor-lang-grid">
        <a href="<?php echo esc_url(torcisao_current_url_for_lang('pt')); ?>"><span>🇧🇷</span><div><strong>Português</strong><small>Brasil</small></div><b>→</b></a>
        <a href="<?php echo esc_url(torcisao_current_url_for_lang('en')); ?>"><span>🇺🇸</span><div><strong>English</strong><small>International</small></div><b>→</b></a>
        <a href="<?php echo esc_url(torcisao_current_url_for_lang('es')); ?>"><span>🇪🇸</span><div><strong>Español</strong><small>Internacional</small></div><b>→</b></a>
      </div>
    </div>
  </section>
</div>

<!-- Calculadora: layout recuperado, sem etapas numeradas -->
<div class="torcisao-calc-overlay" id="torcisaoCalcOverlay" aria-hidden="true">
  <section class="torcisao-calc-modal" role="dialog" aria-modal="true" aria-labelledby="torcisaoCalcTitle">
    <div class="torcisao-calc-modal-head">
      <div><small class="torcisao-calc-eyebrow">CALCULADORA TORCISÃO</small><h2 id="torcisaoCalcTitle">Calculadora de arame trefilado</h2><div class="torcisao-calc-profile-badge" id="calcProfileBadge">PERFIL REDONDO</div><p id="calcMethodDescription">Cálculo teórico por bitola e metragem para arames Torcisão com seção circular.</p></div>
      <button type="button" class="torcisao-calc-close tor-standard-close" id="torcisaoCalcClose" aria-label="Fechar">×</button>
    </div>
    <div class="torcisao-calc-body">
      <div class="torcisao-calc-grid">
        <div class="torcisao-calc-field"><label for="calcProduto">Produto</label><select id="calcProduto"><option value="arame">Arame Trefilado</option><option value="barra">Barra Trefilada</option><option value="haste">Haste de Aterramento</option><option value="conector">Conector</option></select></div>
        <div class="torcisao-calc-field" id="calcCamadaWrap" hidden><label for="calcCamada">Tipo de haste</label><select id="calcCamada"><option value="baixa">Baixa Camada · 20 µm</option><option value="alta">Alta Camada · 254 µm</option></select></div>
        <div class="torcisao-calc-field" id="calcConectorWrap" hidden><label for="calcConector">Modelo do conector</label><select id="calcConector"><option value="olhal-simples">Olhal Simples</option><option value="olhal-reforcado">Olhal Reforçado</option><option value="grampo-simples">Grampo U Simples</option><option value="grampo-reforcado">Grampo U Reforçado</option></select><div class="torcisao-calc-help" id="calcConectorHelp"></div></div>
        <div class="torcisao-calc-field" id="calcDiametroWrap"><label for="calcDiametro">Bitola / diâmetro <span class="torcisao-calc-round-note">· perfil redondo</span></label><input id="calcDiametro" type="number" inputmode="decimal" min="0.1" step="0.01" placeholder="Ex.: 12,70 mm"><select id="calcDiametroHaste" hidden></select><div class="torcisao-calc-help" id="calcDiametroHelp">Informe o diâmetro real em milímetros.</div></div>
        <div class="torcisao-calc-field" id="calcComprimentoHasteWrap" hidden><label for="calcComprimentoHaste">Comprimento da haste</label><select id="calcComprimentoHaste"></select></div>
      </div>

      <div class="torcisao-calc-mode" role="tablist" aria-label="Modo de cálculo">
        <button type="button" class="is-active" data-calc-mode="peso">Tenho metragem / quantidade</button>
        <button type="button" data-calc-mode="tonelagem">Tenho o peso</button>
      </div>

      <div id="calcModoPeso">
        <div class="torcisao-calc-grid">
          <div class="torcisao-calc-field" id="calcMetrosWrap"><label for="calcMetros">Metragem total</label><input id="calcMetros" type="number" inputmode="decimal" min="0" step="0.01" placeholder="Ex.: 1000"><div class="torcisao-calc-help" id="calcMetrosHelp">Informe a metragem total.</div></div>
          <div class="torcisao-calc-field" id="calcQtdWrap"><label for="calcQtd">Quantidade</label><input id="calcQtd" type="number" inputmode="numeric" min="0" step="1" placeholder="Ex.: 500"></div>
          <div class="torcisao-calc-field" id="calcComprimentoPecaWrap"><label for="calcComprimentoPeca">Comprimento por barra</label><div class="torcisao-calc-inline"><input id="calcComprimentoPeca" type="number" inputmode="decimal" min="0" step="0.01" placeholder="Ex.: 6,00"><select id="calcComprimentoPecaUnidade"><option value="m">m</option><option value="mm">mm</option></select></div></div>
        </div>
      </div>

      <div id="calcModoTonelagem" hidden>
        <div class="torcisao-calc-grid">
          <div class="torcisao-calc-field"><label for="calcToneladasEntrada">Peso desejado</label><div class="torcisao-calc-inline"><input id="calcToneladasEntrada" type="number" inputmode="decimal" min="0" step="0.001" placeholder="Ex.: 550"><select id="calcPesoUnidade"><option value="kg">kg</option><option value="t">t</option></select></div></div>
          <div class="torcisao-calc-field" id="calcComprimentoInversoWrap"><label for="calcComprimentoInverso">Comprimento por barra</label><div class="torcisao-calc-inline"><input id="calcComprimentoInverso" type="number" inputmode="decimal" min="0" step="0.01" placeholder="Ex.: 6,00"><select id="calcComprimentoInversoUnidade"><option value="m">m</option><option value="mm">mm</option></select></div></div>
        </div>
      </div>

      <div class="torcisao-calc-actions"><button type="button" class="torcisao-calc-button" id="torcisaoCalcButton">Calcular</button></div>
      <div class="torcisao-calc-results" aria-live="polite"><div class="torcisao-calc-result"><small id="calcResultPrimaryLabel">Peso por metro</small><strong id="calcKgMetro">0,000 kg/m</strong></div><div class="torcisao-calc-result"><small id="calcResultSecondaryLabel">Metragem total</small><strong id="calcMetrosResultado">0,00 m</strong></div><div class="torcisao-calc-result"><small id="calcResultWeightLabel">Peso total</small><strong id="calcKgResultado">0,00 kg</strong></div><div class="torcisao-calc-result"><small>Tonelagem</small><strong id="calcTonResultado">0,000 t</strong></div></div>
      <div class="torcisao-calc-results torcisao-calc-qty" id="calcResultadoQuantidade" hidden><div class="torcisao-calc-result"><small id="calcQtdResultadoLabel">Quantidade aproximada</small><strong id="calcQtdResultado">0</strong></div></div>
      <p class="torcisao-calc-note" id="calcNote">Resultado teórico para perfil redondo. Tolerâncias dimensionais e características do material podem gerar variação no peso real. Para fechamento comercial, confirme com a equipe Torcisão.</p>
    </div>
  </section>
</div>
