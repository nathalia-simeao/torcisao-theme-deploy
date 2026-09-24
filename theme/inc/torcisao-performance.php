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
}
add_action('wp_enqueue_scripts','torcisao_scope_heavy_assets',100);

/** Camada final de acessibilidade e responsividade em todas as páginas. */
function torcisao_closeout_assets(){
    $uri = get_template_directory_uri();
    wp_enqueue_style(
        'torcisao-closeout-v25',
        $uri.'/assets/torcisao-closeout-v25.css',
        ['torcisao-global-alignment-v7'],
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

/**
 * Páginas custom não usam o conteúdo renderizado pelo Gutenberg/Elementor.
 * Remove apenas assets de framework que não participam do layout dessas rotas.
 */
function torcisao_trim_custom_template_assets(){
    $is_custom_product = torcisao_is_product_page();
    $is_custom_home = is_front_page();

    if ($is_custom_home || $is_custom_product) {
        wp_dequeue_style('wp-block-library');
    }

    if ($is_custom_home) {
        foreach ([
            'elementor-frontend',
            'base-desktop',
            'base-mobile',
            'elementor-gf-roboto',
            'elementor-gf-robotoslab',
        ] as $handle) {
            wp_dequeue_style($handle);
        }
    }
}
add_action('wp_enqueue_scripts','torcisao_trim_custom_template_assets',999);

/**
 * HubSpot permanece disponível, mas sai do caminho crítico da Home e da Barra PT.
 * O formulário custom continua carregando o embed de Forms quando a cotação é aberta.
 * O tracking global entra somente quando existe intenção comercial explícita.
 */
function torcisao_defer_hubspot_global_script(){
    if (!(is_front_page() || is_page(1622))) return;

    global $wp_scripts;
    if ($wp_scripts && !empty($wp_scripts->queue)) {
        foreach ((array) $wp_scripts->queue as $handle) {
            $registered = $wp_scripts->registered[$handle] ?? null;
            $src = is_object($registered) ? (string) ($registered->src ?? '') : '';
            if (strpos($src,'js.hs-scripts.com') !== false) {
                wp_dequeue_script($handle);
            }
        }
    }

    foreach (['leadin-script-loader-js','leadin-script-loader','hubspot'] as $handle) {
        wp_dequeue_script($handle);
    }
}
add_action('wp_enqueue_scripts','torcisao_defer_hubspot_global_script',9999);

function torcisao_lazy_hubspot_loader(){
    if (!(is_front_page() || is_page(1622))) return;
    ?>
    <script id="torcisao-hubspot-lazy-loader">
    (function(){
      if(window.__torcisaoHubSpotLazy)return;
      window.__torcisaoHubSpotLazy=true;
      var loaded=false;
      var selector='#homeQuoteTab,.js-home-quote,#tpeQuote,#bfQuoteTab,.js-bf-quote,[data-commercial-whatsapp]';
      function load(){
        if(loaded||document.getElementById('hs-script-loader'))return;
        loaded=true;
        var s=document.createElement('script');
        s.id='hs-script-loader';
        s.async=true;
        s.defer=true;
        s.src='https://js.hs-scripts.com/50818463.js?integration=WordPress&ver=11.3.75';
        document.body.appendChild(s);
      }
      function commercialIntent(event){
        var target=event.target&&event.target.closest?event.target.closest(selector):null;
        if(target)load();
      }
      document.addEventListener('pointerover',commercialIntent,{passive:true,capture:true});
      document.addEventListener('focusin',commercialIntent,true);
      document.addEventListener('click',commercialIntent,true);
      window.TorcisaoLoadHubSpot=load;
    })();
    </script>
    <?php
}
add_action('wp_footer','torcisao_lazy_hubspot_loader',98);

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
