<?php
/**
 * Template Name: Página de aplicação
 *
 * Conteúdo em inc/torcisao-applications.php (chave em _torcisao_app).
 */
$ta_key = function_exists('torcisao_app_current_key') ? torcisao_app_current_key() : '';
if (!$ta_key) {
    get_header();
    echo '<main class="hf-page"><section class="hf-top"><div class="hf-wrap"><h1 class="hf-title">' . esc_html(get_the_title()) . '</h1></div></section></main>';
    get_footer();
    return;
}
$ta = torcisao_app_pages()[$ta_key];
$ta_products = torcisao_app_products();
$ta_line = $ta['line'];
$ta_line_name = $ta_line === 'arame' ? 'Arame trefilado' : 'Barra trefilada';
$ta_line_url = home_url($ta_line === 'arame' ? '/arame-trefilado/' : '/barra-trefilada/');
$ta_assets = get_template_directory_uri();
$ta_wa = 'https://wa.me/551123349989?text=' . rawurlencode('Olá! Vim pela página "' . $ta['title'] . '" da Torcisão e gostaria de uma cotação.');
$ta_faq = array_merge($ta['faq'], torcisao_app_common_faq($ta_line));
$ta_chips = [
    ['label' => 'Já sei a bitola', 'step' => 'gauge', 'value' => 'yes'],
    ['label' => 'Ainda não sei', 'step' => 'gauge', 'value' => 'no'],
    ['label' => 'Quero uma cotação', 'step' => 'quote', 'value' => 'yes'],
];
get_header();
?>
<link rel="stylesheet" href="<?php echo esc_url($ta_assets . '/assets/torcisao-haste-family.css'); ?>?v=20260906">
<link rel="stylesheet" href="<?php echo esc_url($ta_assets . '/assets/torcisao-haste-aeo-v1.css'); ?>?v=20260921-2">
<link rel="stylesheet" href="<?php echo esc_url($ta_assets . '/assets/torcisao-application-page.css'); ?>?v=20261105-1">
<main class="hf-page ta-page" id="aplicacao" data-ta-key="<?php echo esc_attr($ta_key); ?>" data-ta-line="<?php echo esc_attr($ta_line); ?>">

  <section class="hf-top ta-hero"><div class="hf-wrap">
    <nav class="ta-crumbs" aria-label="Você está em">
      <a href="<?php echo esc_url(home_url('/')); ?>">Início</a><span aria-hidden="true">›</span>
      <a href="<?php echo esc_url($ta_line_url); ?>"><?php echo esc_html($ta_line_name); ?></a><span aria-hidden="true">›</span>
      <span aria-current="page"><?php echo esc_html(ucfirst($ta['app'])); ?></span>
    </nav>
    <span class="hf-eyebrow"><?php echo esc_html($ta_line_name); ?> · Aplicação</span>
    <h1 class="hf-title"><?php echo esc_html($ta['title']); ?></h1>
    <p class="hf-intro"><?php echo esc_html($ta['intro']); ?></p>
    <div class="ta-hero-actions">
      <a class="hf-btn hf-btn-primary" href="<?php echo esc_url($ta_wa); ?>" target="_blank" rel="noopener" data-analytics-origin="aplicacao_hero" data-analytics-product="<?php echo esc_attr($ta_key); ?>"><i class="bi bi-whatsapp"></i> Solicitar cotação</a>
      <button type="button" class="hf-btn hf-btn-secondary js-ta-calc" data-product="<?php echo esc_attr($ta_line); ?>"><i class="bi bi-calculator"></i> Calcular peso e metragem</button>
    </div>
    <ul class="ta-trust">
      <li><i class="bi bi-buildings"></i> Direto da fábrica</li>
      <li><i class="bi bi-patch-check"></i> ISO 9001</li>
      <li><i class="bi bi-person-gear"></i> Atendimento técnico</li>
    </ul>
  </div></section>

  <section class="hf-section ta-products-section"><div class="hf-wrap">
    <div class="hf-section-head"><span class="hf-section-kicker">Linhas indicadas</span>
      <h2 class="hf-section-title"><?php echo count($ta['products']) > 1 ? 'Opções para ' . esc_html($ta['app']) : 'A linha indicada para ' . esc_html($ta['app']); ?></h2></div>
    <div class="ta-products ta-products--<?php echo (int) min(count($ta['products']), 4); ?>">
      <?php foreach ($ta['products'] as $pk): $p = $ta_products[$pk]; ?>
      <article class="ta-product">
        <div class="ta-product-img"><img src="<?php echo esc_url($p['img']); ?>" alt="<?php echo esc_attr($p['name']); ?>" loading="lazy" decoding="async"></div>
        <div class="ta-product-body">
          <small><?php echo esc_html($ta_line_name); ?></small>
          <h3><?php echo esc_html($p['short']); ?></h3>
          <p><?php echo esc_html($p['summary']); ?></p>
          <ul class="ta-specs"><?php foreach ($p['specs'] as $s): ?><li><?php echo esc_html($s); ?></li><?php endforeach; ?></ul>
          <a class="ta-product-link" href="<?php echo esc_url(add_query_arg('tipo', $p['kind'], $ta_line_url)); ?>">Ver detalhes da linha <i class="bi bi-arrow-right"></i></a>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </div></section>

  <section class="hf-section ta-split-section"><div class="hf-wrap"><div class="ta-split">
    <div class="ta-why">
      <span class="hf-section-kicker">Na prática</span>
      <h2 class="hf-section-title"><?php echo esc_html($ta['why_title']); ?></h2>
      <p><?php echo esc_html($ta['why']); ?></p>
      <h3 class="ta-check-title">Para cotar mais rápido, informe:</h3>
      <ul class="ta-check"><?php foreach (torcisao_app_checklist($ta_line) as $c): ?><li><i class="bi bi-check2-circle"></i><?php echo esc_html($c); ?></li><?php endforeach; ?></ul>
    </div>

    <aside class="ta-theo" aria-label="Converse com o Theo">
      <div class="ta-theo-head">
        <img src="https://torcisao.com.br/wp-content/uploads/2026/09/Perfil_Theo_Torcisao.png" alt="" width="44" height="44">
        <div><strong>Theo</strong><small>Assistente de aplicação · responde na hora</small></div>
      </div>
      <div class="ta-theo-log th-chat" id="apChat" aria-live="polite"
           data-line="<?php echo esc_attr($ta_line); ?>"
           data-label="<?php echo esc_attr('Theo · ' . $ta['title']); ?>"
           data-chips="<?php echo esc_attr(wp_json_encode($ta_chips)); ?>">
        <div class="th-msg assistant"><?php echo esc_html($ta['theo']); ?></div>
      </div>
      <form class="ta-theo-form" id="apForm" autocomplete="off">
        <label class="ta-sr" for="apInput">Mensagem para o Theo</label>
        <input id="apInput" type="text" maxlength="500" placeholder="Escreva sua dúvida ou a bitola…">
        <button type="submit" id="apSend" aria-label="Enviar"><i class="bi bi-arrow-up"></i></button>
      </form>
    </aside>
  </div></div></section>

  <section class="hf-section" id="faq"><div class="hf-wrap">
    <div class="hf-mini-faq">
      <div class="hf-mini-faq-head"><span class="hf-section-kicker">Dúvidas frequentes</span><h2 class="hf-section-title"><?php echo esc_html(ucfirst($ta['app'])); ?>: perguntas comuns</h2></div>
      <div class="hf-mini-faq-grid">
        <?php foreach ($ta_faq as $f): ?><details><summary><?php echo esc_html($f[0]); ?></summary><p><?php echo esc_html($f[1]); ?></p></details><?php endforeach; ?>
      </div>
    </div>
  </div></section>

  <?php
  $ta_related = [];
  foreach ((array) $ta['related'] as $rk) {
      $url = torcisao_app_page_url($rk);
      if ($url) $ta_related[] = [torcisao_app_pages()[$rk]['title'], $url];
  }
  if ($ta_related): ?>
  <section class="hf-section ta-related"><div class="hf-wrap">
    <span class="hf-section-kicker">Veja também</span>
    <div class="ta-related-list"><?php foreach ($ta_related as [$t, $u]): ?><a href="<?php echo esc_url($u); ?>"><?php echo esc_html($t); ?> <i class="bi bi-arrow-right"></i></a><?php endforeach; ?></div>
  </div></section>
  <?php endif; ?>

  <section class="hf-cta"><div class="hf-wrap"><div class="hf-cta-box">
    <div class="hf-cta-copy"><span class="hf-section-kicker">Atendimento comercial</span>
      <h2>Vamos cotar o seu <?php echo esc_html(mb_strtolower($ta_line_name)); ?> para <?php echo esc_html($ta['app']); ?>?</h2>
      <p>Envie aço, bitola, quantidade e aplicação. O time Torcisão valida a especificação e retorna com preço e prazo.</p></div>
    <div class="hf-cta-side"><a class="hf-btn hf-btn-primary" href="<?php echo esc_url($ta_wa); ?>" target="_blank" rel="noopener" data-analytics-origin="aplicacao_cta" data-analytics-product="<?php echo esc_attr($ta_key); ?>"><i class="bi bi-whatsapp"></i> Falar com o comercial</a></div>
  </div></div></section>
</main>
<script>window.TORCISAO_APP_PAGE=<?php echo wp_json_encode(['rest' => esc_url_raw(rest_url('torcisao/v1/application-assistant')), 'key' => $ta_key, 'line' => $ta_line, 'title' => $ta['title']]); ?>;</script>
<script defer src="<?php echo esc_url($ta_assets . '/assets/torcisao-application-page.js'); ?>?v=20261105-1"></script>
<?php get_footer();
