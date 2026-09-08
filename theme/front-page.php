<?php
/**
 * Home Torcisão Trefilados
 * Separada das páginas de produto. Haste aparece aqui apenas como uma das linhas do portfólio.
 */
get_header();
$home_assets = get_template_directory_uri();
?>
<link rel="stylesheet" href="<?php echo esc_url($home_assets . '/assets/torcisao-home.css'); ?>?v=20260907-4">
<link rel="stylesheet" href="<?php echo esc_url($home_assets . '/assets/torcisao-home-phase5.css'); ?>?v=20260907-1" data-tor-home-phase="5">
<link rel="stylesheet" href="<?php echo esc_url($home_assets . '/assets/torcisao-home-phase7.css'); ?>?v=20260907-1" data-tor-home-phase="7">
<style>
#produtos .tpe-image-wrap{opacity:0;transition:opacity .16s ease}
#produtos.tor-gallery-ready .tpe-image-wrap{opacity:1}
</style>

<main class="th-home" id="home">
  <section class="th-hero" aria-label="Torcisão Trefilados">
    <div class="th-hero-track" id="thHeroTrack">
      <article class="th-hero-slide is-active" data-home-hero-slide><img src="<?php echo torcisao_asset('assets/barra1.webp'); ?>" alt="Barras trefiladas Torcisão" fetchpriority="high" decoding="async"></article>
      <article class="th-hero-slide" data-home-hero-slide><img src="<?php echo torcisao_asset('assets/haste1.jpg'); ?>" alt="Hastes de aterramento Torcisão" loading="lazy" decoding="async"></article>
      <article class="th-hero-slide" data-home-hero-slide><img src="<?php echo torcisao_asset('assets/arame4.jpg'); ?>" alt="Arames trefilados Torcisão" loading="lazy" decoding="async"></article>
    </div>
    <div class="th-hero-shade"></div>
    <div class="th-container th-hero-content">
      <span class="th-eyebrow th-eyebrow-light">O aço que move o seu projeto começa aqui</span>
      <h1>Descubra as soluções da <strong>Torcisão Trefilados</strong></h1>
    </div>
    <div class="th-hero-dots" aria-label="Navegação do destaque">
      <button type="button" class="is-active" data-home-hero-dot="0" aria-label="Barras Trefiladas"></button>
      <button type="button" data-home-hero-dot="1" aria-label="Haste de Aterramento"></button>
      <button type="button" data-home-hero-dot="2" aria-label="Arames Trefilados"></button>
    </div>
  </section>

  <section class="th-section th-tools" id="ferramentas-tecnicas">
    <div class="th-container">
      <div class="th-tools-label"><span class="th-kicker">Ferramentas Técnicas</span></div>
      <div class="th-tools-grid">
        <article class="th-tool-card">
          <div class="th-tool-icon"><i class="bi bi-rulers"></i></div>
          <span class="th-tool-number">01</span>
          <h3>Consulta de Tolerância Dimensional</h3>
          <p>Consulte referências h9, h10 e h11 para barras trefiladas de perfil redondo</p>
          <button type="button" class="th-text-link" id="thToleranceOpen">Consultar tolerância <span>→</span></button>
        </article>
        <article class="th-tool-card th-tool-card-theo">
          <div class="th-theo-mini"><img src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt="Theo, assistente Torcisão"><span><small>Assistente de Aplicação</small><strong>Theo</strong></span></div>
          <span class="th-tool-number">02</span>
          <h3>Não sabe qual linha avaliar?</h3>
          <p>Escolha manualmente uma linha ou descreva a aplicação para o Theo organizar as opções Torcisão e direcionar ao próximo passo</p>
          <button type="button" class="th-text-link" id="thAssistantOpen">Abrir assistente <span>→</span></button>
        </article>
      </div>
    </div>
  </section>

  <section class="th-section th-products" id="produtos">
    <div class="th-container">
      <div class="th-section-head th-section-head-split">
        <div><span class="th-kicker">Explorador de Produtos</span><h2>Conheça nossas matérias-primas</h2></div>
        <p>Visualize as três linhas principais da Torcisão e acesse a página completa quando precisar comparar opções, medidas e aplicações</p>
      </div>
    </div>
  </section>

  <section class="th-section th-applications" id="aplicacoes">
    <div class="th-container">
      <div class="th-section-head"><span class="th-kicker">Aplicações e segmentos</span><h2>Presença em diferentes cadeias industriais</h2><p>A Torcisão atende aplicações associadas a indústria, construção, energia, máquinas, mobilidade e bens de consumo</p></div>
      <div class="th-chip-cloud" aria-label="Segmentos atendidos"><span>Agrícola</span><span>Máquinas e Equipamentos</span><span>Construção Civil</span><span>Estruturas Metálicas</span><span>Ferramentas Manuais</span><span>Eletrodomésticos</span><span>Quatro Rodas</span><span>Duas Rodas</span><span>Pesados</span><span>Náutica</span><span>Linha Branca</span><span>Móveis</span><span>Motores Elétricos</span><span>Bombas</span><span>Energia</span><span>Telecomunicações</span></div>
    </div>
  </section>

  <section class="th-section th-differentials" id="diferenciais">
    <div class="th-container">
      <div class="th-section-head th-section-head-split"><div><span class="th-kicker">Diferenciais</span><h2>Processo e informação técnica no mesmo caminho</h2></div><p>As páginas de produto concentram as especificações. A Home organiza a jornada e aproxima o cliente da consulta certa</p></div>
      <div class="th-diff-grid">
        <article><i class="bi bi-bounding-box-circles"></i><h3>Precisão dimensional</h3><p>O processo de trefilação está associado a controle dimensional e melhoria do acabamento superficial</p></article>
        <article><i class="bi bi-layers"></i><h3>Portfólio organizado</h3><p>Arames, barras e hastes têm páginas próprias para evitar mistura de especificações e facilitar a navegação</p></article>
        <article><i class="bi bi-chat-square-text"></i><h3>Suporte consultivo</h3><p>Ferramentas, Theo e equipe comercial ajudam a organizar a necessidade antes da validação final</p></article>
      </div>
    </div>
  </section>

  <section class="th-section th-quality" id="qualidade">
    <div class="th-container"><div class="th-quality-card"><div><span class="th-kicker">Qualidade</span><h2>Certificação disponível para consulta</h2><p>Acesse o certificado de qualidade da Torcisão e consulte a equipe quando o projeto tiver requisitos específicos</p></div><a class="th-pill th-pill-primary" href="https://torcisao.com.br/wp-content/uploads/2026/09/TORCISAO-9001.pdf" target="_blank" rel="noopener">Ver certificado ISO</a></div></div>
  </section>

  <section class="th-section th-numbers" id="numeros">
    <div class="th-container"><div class="th-section-head"><span class="th-kicker">Resultados que falam por si</span><h2>A Torcisão está no seu dia a dia</h2></div><div class="th-number-grid"><article><strong>1968</strong><span>Início da trajetória Torcisão</span></article><article><strong>+11 mil</strong><span>Clientes atendidos</span></article><article><strong>95%</strong><span>Nível de satisfação apresentado no material institucional</span></article></div></div>
  </section>

  <section class="th-section th-about" id="quem-somos">
    <div class="th-container th-about-grid">
      <div class="th-about-copy"><span class="th-kicker">Quem Somos</span><h2>Mais do que fornecer aço, a Torcisão entrega valorização para o projeto</h2><p>Com uma trajetória iniciada em 1968, a Torcisão atua com arames trefilados, barras trefiladas e hastes de aterramento para diferentes cadeias industriais</p><p>Conhecimento de processo, relacionamento comercial e evolução contínua fazem parte da forma como a empresa atende seus clientes</p></div>
      <figure class="th-about-image"><img src="<?php echo torcisao_asset('assets/fabrica1.webp'); ?>" alt="Ambiente industrial Torcisão" loading="lazy" decoding="async"></figure>
    </div>
    <div class="th-container th-timeline-wrap"><div class="th-timeline-head"><div><strong>Nosso crescimento conta a nossa história</strong><span>Uma trajetória construída ao longo de décadas</span></div></div><div class="th-timeline" aria-label="Linha do tempo Torcisão"><span class="is-highlight">1968</span><span>1975</span><span>1978</span><span>1999</span><span>2005</span><span>2006</span><span>2011</span><span>2013</span><span>2014</span><span>2015</span><span>2016</span><span>2017</span><span>2019</span><span>2022</span><span>2024</span></div></div>
  </section>

  <section class="th-section th-blog" id="blog">
    <div class="th-container">
      <div class="th-section-head th-section-head-split"><div><span class="th-kicker">Conteúdo Técnico</span><h2>Informação para continuar a conversa</h2></div><a class="th-text-link th-blog-all" href="<?php echo esc_url(home_url('/blog/')); ?>">Ver blog <span>→</span></a></div>
      <div class="th-blog-grid">
        <?php $home_posts = get_posts(['numberposts'=>3,'post_status'=>'publish']); if ($home_posts) : foreach ($home_posts as $post) : setup_postdata($post); ?>
          <article class="th-blog-card"><small><?php echo esc_html(get_the_date('d.m.Y')); ?></small><h3><?php the_title(); ?></h3><p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 20)); ?></p><a href="<?php the_permalink(); ?>">Ler conteúdo <span>→</span></a></article>
        <?php endforeach; wp_reset_postdata(); else: ?>
          <article class="th-blog-card th-blog-empty"><small>Blog Torcisão</small><h3>Conteúdos técnicos em atualização</h3><p>Use o Blog no menu para acessar os conteúdos publicados pela Torcisão</p><a href="<?php echo esc_url(home_url('/blog/')); ?>">Ir para o blog <span>→</span></a></article>
        <?php endif; ?>
      </div>
    </div>
  </section>

  <section class="th-final-cta">
    <div class="th-container th-final-cta-inner"><div><span class="th-kicker">Próximo passo</span><h2>Já sabe o que precisa ou quer organizar a aplicação?</h2><p>Abra a cotação ou use o Theo. As especificações completas continuam dentro da página de cada produto</p></div><div class="th-final-actions"><button type="button" class="th-pill th-pill-primary js-home-quote" data-origin="home_cta_final">Faça uma cotação</button><button type="button" class="th-pill th-pill-dark" id="thAssistantOpenBottom">Consultar o Theo</button></div></div>
  </section>
</main>

<div class="th-modal-backdrop" id="thToleranceModal" aria-hidden="true">
  <section class="th-modal th-modal-medium th-tool-modal" role="dialog" aria-modal="true" aria-labelledby="thToleranceTitle">
    <div class="th-modal-head"><div><small>FERRAMENTA TÉCNICA</small><h2 id="thToleranceTitle">Consulta de Tolerância Dimensional</h2><p>Barra trefilada · perfil redondo · processo trefilado</p></div><button type="button" class="th-modal-close" data-th-tolerance-close aria-label="Fechar">×</button></div>
    <div class="th-modal-body">
      <div class="th-tool-context"><span class="th-tool-context-icon"><i class="bi bi-rulers"></i></span><div><small>PROCESSO</small><strong>Trefilado</strong><p>Informe a bitola para consultar h9, h10 e h11</p></div></div>
      <div class="th-tolerance-input-block"><label for="thToleranceDiameter">Bitola</label><div class="th-premium-input"><input id="thToleranceDiameter" type="number" inputmode="decimal" min="1" max="250" step="0.01" placeholder="Ex.: 12,70"><span>mm</span></div></div>
      <button type="button" class="th-modal-primary" id="thToleranceRun">Consultar tolerância <i class="bi bi-arrow-right"></i></button>
      <div class="th-tolerance-result" id="thToleranceResult" aria-live="polite"><div class="th-empty-result"><span>h9 · h10 · h11</span><p>O resultado aparece aqui depois da consulta</p></div></div>
      <p class="th-modal-note"><i class="bi bi-info-circle"></i> Para acabamento polido, consulte nosso consultor</p>
    </div>
  </section>
</div>

<div class="th-modal-backdrop" id="thAssistantModal" aria-hidden="true">
  <section class="th-modal th-modal-assistant" role="dialog" aria-modal="true" aria-labelledby="thAssistantTitle">
    <div class="th-modal-head th-assistant-head">
      <div class="th-assistant-identity"><img src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt="Theo"><div><small>ASSISTENTE DE APLICAÇÃO</small><h2 id="thAssistantTitle">Theo</h2><p>Escolha manualmente ou descreva a aplicação para organizar as opções Torcisão</p></div></div>
      <button type="button" class="th-modal-close" data-th-assistant-close aria-label="Fechar">×</button>
    </div>
    <div class="th-modal-body th-assistant-body">
      <div class="th-manual-card">
        <div class="th-manual-card-head"><div><strong>Prefere escolher manualmente?</strong><p>Selecione uma linha para seguir direto à página correspondente</p></div><span>01</span></div>
        <div class="th-manual-product-choices" id="thManualProductChoices">
          <button type="button" class="is-active" data-manual-product="arame"><i class="bi bi-circle"></i><span><small>Arame</small><strong>Arame Trefilado</strong></span></button>
          <button type="button" data-manual-product="barra"><i class="bi bi-dash-lg"></i><span><small>Barra</small><strong>Barra Trefilada</strong></span></button>
          <button type="button" data-manual-product="haste"><i class="bi bi-signpost-split"></i><span><small>Aterramento</small><strong>Haste de Aterramento</strong></span></button>
        </div>
        <button type="button" class="th-manual-action" id="thManualProductRun">Ver opção selecionada <i class="bi bi-arrow-right"></i></button>
        <div class="th-manual-result" id="thManualProductResult"></div>
      </div>
      <div class="th-assistant-divider"><span>ou descreva a aplicação</span></div>
      <div class="th-theo-chat-title"><img src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt=""><div><strong>Converse com o Theo</strong><small>Respostas baseadas nas informações Torcisão</small></div></div>
      <div class="th-chat" id="thHomeChat" aria-live="polite"><div class="th-msg assistant">Olá! Conte o material, bitola, quantidade, aplicação ou requisito que você precisa avaliar. Eu organizo as opções Torcisão e indico o próximo passo</div></div>
    </div>
    <div class="th-assistant-compose"><input id="thAssistantInput" type="text" maxlength="600" placeholder="Ex.: preciso de material para fabricar pinos..." aria-label="Mensagem para o Theo"><button type="button" id="thAssistantSend" aria-label="Enviar"><i class="bi bi-arrow-up"></i></button></div>
  </section>
</div>

<?php get_template_part('template-parts/home-conversion'); ?>
<script>window.TORCISAO_HOME=<?php echo wp_json_encode(['rest'=>esc_url_raw(rest_url('torcisao/v1/application-assistant')),'urls'=>['arame'=>esc_url_raw(home_url('/aramebtc/')),'barra'=>esc_url_raw(home_url('/barrabtc/')),'haste'=>esc_url_raw(home_url('/hastebc/'))]]); ?>;</script>
<script defer src="<?php echo esc_url($home_assets . '/assets/torcisao-home-i18n-v29.js'); ?>?v=20260907-1"></script>
<script defer src="<?php echo esc_url($home_assets . '/assets/torcisao-home-stability-v35.js'); ?>?v=20260907-1"></script>
<script defer src="<?php echo esc_url($home_assets . '/assets/torcisao-home-product-gallery-v24.js'); ?>?v=20260907-3"></script>
<script defer src="<?php echo esc_url($home_assets . '/assets/torcisao-home.js'); ?>?v=20260907-5"></script>
<?php get_footer(); ?>