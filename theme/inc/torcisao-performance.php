<?php
if (!defined('ABSPATH')) exit;

/**
 * Fechamento técnico de performance.
 * Mantém os recursos pesados das páginas de produto somente onde são usados
 * e deixa a Home com um único controlador de galeria.
 */
function torcisao_is_product_page(){
    return is_page_template([
        'aramebtc.php','aramemtc.php','arameatc.php',
        'barrabtc.php','barramtc.php','barraatc.php','barraacoressulfurado.php',
        'hastebc.php','hasteac.php',
    ]);
}

function torcisao_scope_heavy_assets(){
    if (torcisao_is_product_page()) return;

    $product_styles = [
        'torcisao-product-pages-v9',
        'torcisao-product-pages-v10',
        'torcisao-haste-application-v11',
        'torcisao-product-interaction-v12',
        'torcisao-product-assistant-v13',
        'torcisao-barra-commercial-v14',
        'torcisao-product-spec-balance-v16',
        'torcisao-product-quote-tab-v17',
    ];
    foreach ($product_styles as $handle) wp_dequeue_style($handle);

    $product_scripts = [
        'torcisao-product-pages-v9',
        'torcisao-product-pages-v10',
        'torcisao-haste-application-v11',
        'torcisao-product-interaction-v12',
        'torcisao-product-assistant-v13',
        'torcisao-barra-commercial-v14',
        'torcisao-product-data-consistency-v16',
        'torcisao-product-quote-tab-v17',
    ];
    foreach ($product_scripts as $handle) wp_dequeue_script($handle);

    if (!is_front_page()) return;

    $uri = get_template_directory_uri();

    /* A Home usa apenas o CSS das mini galerias e um controlador único. */
    wp_enqueue_style(
        'torcisao-home-gallery-barra-v20',
        $uri.'/assets/torcisao-btc-gallery-v20.css',
        ['torcisao-explorer-depth'],
        '20260907-9'
    );
    wp_enqueue_style(
        'torcisao-home-gallery-arame-v22',
        $uri.'/assets/torcisao-arame-gallery-v22.css',
        ['torcisao-home-gallery-barra-v20'],
        '20260907-9'
    );
    wp_enqueue_style(
        'torcisao-home-gallery-haste-v23',
        $uri.'/assets/torcisao-haste-gallery-v23.css',
        ['torcisao-home-gallery-arame-v22'],
        '20260907-9'
    );
    wp_enqueue_script(
        'torcisao-home-product-gallery-v24',
        $uri.'/assets/torcisao-home-product-gallery-v24.js',
        ['torcisao-products-explorer'],
        '20260907-2',
        true
    );
}
add_action('wp_enqueue_scripts','torcisao_scope_heavy_assets',100);

/** Camada final de acessibilidade e responsividade em todas as páginas. */
function torcisao_closeout_assets(){
    $uri = get_template_directory_uri();
    wp_enqueue_style(
        'torcisao-closeout-v25',
        $uri.'/assets/torcisao-closeout-v25.css',
        ['torcisao-section-rhythm-v8'],
        '20260907-1'
    );
    wp_enqueue_script(
        'torcisao-closeout-v25',
        $uri.'/assets/torcisao-closeout-v25.js',
        ['torcisao-footer-group-v2'],
        '20260907-1',
        true
    );
}
add_action('wp_enqueue_scripts','torcisao_closeout_assets',120);

/** Usa Montserrat variável para reduzir o número de arquivos de fonte transferidos. */
function torcisao_optimize_font_src($src,$handle){
    if ($handle === 'torcisao-fonts') {
        return 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400..900&display=swap';
    }
    return $src;
}
add_filter('style_loader_src','torcisao_optimize_font_src',10,2);

/** Resource hints para terceiros críticos que aparecem no primeiro carregamento. */
function torcisao_resource_hints($urls,$relation_type){
    if ($relation_type !== 'preconnect') return $urls;

    $urls[] = 'https://fonts.googleapis.com';
    $urls[] = ['href'=>'https://fonts.gstatic.com','crossorigin'=>'anonymous'];
    $urls[] = 'https://cdn.jsdelivr.net';
    return $urls;
}
add_filter('wp_resource_hints','torcisao_resource_hints',10,2);

/** Antecipamos somente a imagem LCP inicial da Home. */
function torcisao_preload_home_lcp(){
    if (!is_front_page()) return;
    $src = esc_url(get_template_directory_uri().'/assets/barra1.webp');
    echo '<link rel="preload" as="image" href="'.$src.'" fetchpriority="high">' . "\n";
}
add_action('wp_head','torcisao_preload_home_lcp',2);
