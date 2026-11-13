<?php
/**
 * Black Friday 2026 · apoio de desempenho ao snippet #2054 do WPCode (barra fixa + banner na home).
 *
 * O snippet troca o slider da home pelo banner só depois que a página carrega. No celular isso
 * fazia o topo encolher de ~374 px para ~117 px (CLS 0,28) e o banner, que é o maior elemento
 * da tela (LCP), só começava a baixar depois do script.
 *
 * Aqui o tema só prepara o terreno, sem mudar o visual:
 *  1) reserva desde o início a altura da barra e a proporção do banner (1920x600);
 *  2) pré-carrega a imagem do banner no <head>.
 *
 * Vale apenas na home em português, durante a campanha e com o snippet #2054 ativo.
 * Pode ser apagado depois de 30/11/2026.
 */
if (!defined('ABSPATH')) exit;

function torcisao_bf2026_active() {
    if (is_admin() || !is_front_page()) return false;
    if (function_exists('torcisao_request_language') && torcisao_request_language() !== 'pt') return false;
    if (get_post_type(2054) !== 'wpcode' || get_post_status(2054) !== 'publish') return false;
    $now = time();
    return $now >= strtotime('2026-11-01T00:00:00-03:00') && $now <= strtotime('2026-11-30T23:59:59-03:00');
}

add_action('wp_head', function () {
    if (!torcisao_bf2026_active()) return;
    /* Mesmo endereço que o snippet usa (travessão codificado), para o navegador reaproveitar o download */
    $banner = '/wp-content/uploads/2026/11/Banner-Site-%E2%80%93-Black-Friday-2026-%E2%80%93-Hastes-e-Barras.jpg';
    echo '<link rel="preload" as="image" href="' . esc_attr($banner) . '" fetchpriority="high">' . "\n";
    ?>
<style id="torcisao-bf2026-reserva">
html.tbf-on{--tbf-h:91px}
@media (max-width:1180px){html.tbf-on{--tbf-h:77px}}
@media (max-width:767px){html.tbf-on{--tbf-h:75px}}
html.tbf-on body.home .th-hero{height:auto!important;min-height:0!important;max-height:none!important;background:#262626;aspect-ratio:1920/600}
html.tbf-on body.home .th-hero>.th-hero-track,html.tbf-on body.home .th-hero>.th-hero-shade,html.tbf-on body.home .th-hero>.th-hero-dots{display:none!important}
html.tbf-on body.home .th-hero>.th-hero-content{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
</style>
    <?php
}, 1);
