<?php
if (!defined('ABSPATH')) exit;

/* Preview Codespaces: detecta o host encaminhado antes de gerar URLs do tema. */
$preview_file = get_template_directory().'/inc/preview-codespaces.php';
if (file_exists($preview_file)) require_once $preview_file;

/* Idiomas PT/EN/ES: Polylang em produção e ?lang= no preview. */
$i18n_file = get_template_directory().'/inc/torcisao-i18n.php';
if (file_exists($i18n_file)) require_once $i18n_file;

/* Suplementos completos de tradução, políticas e proteção da marca. */
$translated_assets_file = get_template_directory().'/inc/torcisao-translated-page-assets.php';
if (file_exists($translated_assets_file)) require_once $translated_assets_file;

$server_i18n_hotfix_file = get_template_directory().'/inc/torcisao-server-i18n-hotfix.php';
if (file_exists($server_i18n_hotfix_file)) require_once $server_i18n_hotfix_file;


/*
 * Fonte de verdade do idioma da interface: a própria URL.
 * PT-BR é a rota sem prefixo; EN usa /en/; ES usa /es/.
 * No preview, ?lang=pt|en|es pode forçar explicitamente o idioma.
 */
function torcisao_request_language(){
    if (isset($_GET['lang'])) {
        $requested = sanitize_key(wp_unslash($_GET['lang']));
        if (in_array($requested,['pt','en','es'],true)) return $requested;
    }
    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '/';
    $path = (string) parse_url($request_uri, PHP_URL_PATH);
    if (preg_match('#^/(en|es)(?:/|$)#i',$path,$m)) return strtolower($m[1]);
    return 'pt';
}

/* Substitui os hooks antigos que podiam herdar o locale do usuário logado. */
remove_action('template_redirect','torcisao_start_i18n_buffer',-999);
remove_filter('language_attributes','torcisao_language_attributes_filter',20);
remove_filter('body_class','torcisao_i18n_body_classes');

function torcisao_translate_exact_copy($text,$map){
    $text = str_replace(['Torcisão Drawns','Torcisão Drawn'],['Torcisão Trefilados','Torcisão Trefilados'],(string)$text);
    if ($text === '') return $text;
    if (!preg_match('/^(\s*)(.*?)(\s*)$/su',$text,$m)) return $text;
    $core = $m[2];
    if ($core === 'Torcisão Trefilados') return $m[1].'Torcisão Trefilados'.$m[3];
    return $m[1].(array_key_exists($core,$map) ? $map[$core] : $core).$m[3];
}

function torcisao_translate_rendered_html_by_request($html){
    $lang = torcisao_request_language();
    if ($lang === 'pt' || !$html) return $html;
    $map = function_exists('torcisao_i18n_map') ? torcisao_i18n_map($lang) : [];
    if (!$map) return $html;
    $protected = [];
    $html = preg_replace_callback('#<(script|style)\b[^>]*>.*?</\1>#is',function($m) use (&$protected){
        $token='__TORCISAO_PROTECTED_'.count($protected).'__';
        $protected[$token]=$m[0];
        return $token;
    },$html);
    $html = preg_replace_callback('/>([^<]+)</u',function($m) use ($map){return '>'.torcisao_translate_exact_copy($m[1],$map).'<';},$html);
    $html = preg_replace_callback('/\s(aria-label|title|placeholder)=("|\')(.*?)\2/isu',function($m) use ($map){return ' '.$m[1].'='.$m[2].torcisao_translate_exact_copy($m[3],$map).$m[2];},$html);
    if ($protected) $html = strtr($html,$protected);
    return $html;
}
function torcisao_start_i18n_buffer_by_request(){
    if (torcisao_request_language() !== 'pt') ob_start('torcisao_translate_rendered_html_by_request');
}
add_action('template_redirect','torcisao_start_i18n_buffer_by_request',-999);

function torcisao_language_attributes_by_request($output){
    $locale=['pt'=>'pt-BR','en'=>'en-US','es'=>'es-ES'][torcisao_request_language()] ?? 'pt-BR';
    return preg_replace('/lang=("|\')[^"\']*("|\')/i','lang="'.esc_attr($locale).'"',$output);
}
add_filter('language_attributes','torcisao_language_attributes_by_request',20);
function torcisao_i18n_body_classes_by_request($classes){$classes[]='tor-lang-'.torcisao_request_language();return $classes;}
add_filter('body_class','torcisao_i18n_body_classes_by_request');

/* Recursos do footer: inclui o endpoint seguro do formulário de currículo. */
$footer_functions = get_template_directory().'/inc/torcisao-footer-functions.php';
if (file_exists($footer_functions)) require_once $footer_functions;

function torcisao_theme_setup(){
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form','gallery','caption','style','script']);
    register_nav_menus(['primary'=>'Menu principal']);
}
add_action('after_setup_theme','torcisao_theme_setup');

/* As páginas Home traduzidas já existem no Polylang, mas não são a page_on_front do WordPress. */
function torcisao_is_home_experience(){
    if (is_front_page()) return true;
    if (is_page([1223,1224])) return true;
    if (is_page()) {
        $slug = get_page_template_slug(get_queried_object_id());
        if (in_array($slug,['template-home-en.php','template-home-es.php'],true)) return true;
    }
    return false;
}

function torcisao_theme_assets(){
    $uri = get_template_directory_uri();
    $ver = wp_get_theme()->get('Version') ?: '2026.09.06';
    $is_home = torcisao_is_home_experience();
    $is_home_pt = is_front_page() && torcisao_request_language()==='pt';
    $is_product_page = is_page([1621,1622,1623,1627,1628,1629,1630,1631,1632]);
    $is_barra_page = is_page(1622);
    wp_enqueue_style('torcisao-fonts','https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap',[],null);
    wp_enqueue_style('bootstrap-icons','https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',[],null);
    wp_enqueue_style('torcisao-style',get_stylesheet_uri(),[],$ver);
    wp_enqueue_style('torcisao-header',$uri.'/assets/torcisao-header-recovery.css',['torcisao-style'],$ver);
    wp_enqueue_style('torcisao-header-scroll-blur',$uri.'/assets/torcisao-header-scroll-blur.css',['torcisao-header'],$ver);
    wp_enqueue_style('torcisao-phase6',$uri.'/assets/torcisao-phase6.css',['torcisao-header-scroll-blur'],$ver);
    wp_enqueue_style('torcisao-phase8',$uri.'/assets/torcisao-phase8.css',['torcisao-phase6'],$ver);
    wp_enqueue_style('torcisao-global-polish',$uri.'/assets/torcisao-global-polish.css',['torcisao-phase8'],$ver);
    wp_enqueue_style('torcisao-mobile-menu-polish',$uri.'/assets/torcisao-mobile-menu-polish.css',['torcisao-global-polish'],'20260907-4');
    wp_enqueue_style('torcisao-commercial-handoff',$uri.'/assets/torcisao-commercial-handoff.css',['torcisao-mobile-menu-polish'],$ver);
    wp_enqueue_style('torcisao-footer-recovery',$uri.'/assets/torcisao-footer-recovery.css',['torcisao-commercial-handoff'],'20260907-2');
    wp_enqueue_style('torcisao-footer-group-v2',$uri.'/assets/torcisao-footer-group-v2.css',['torcisao-footer-recovery'],'20260907-2');
    wp_enqueue_style('torcisao-footer-polish-v3',$uri.'/assets/torcisao-footer-polish-v3.css',['torcisao-footer-group-v2'],'20260907-1');
    if ($is_home) {
        wp_enqueue_style('torcisao-products-explorer',$uri.'/assets/torcisao-products-explorer.css',['torcisao-commercial-handoff'],$ver);
        wp_enqueue_style('torcisao-explorer-image-calibration',$uri.'/assets/torcisao-explorer-image-calibration.css',['torcisao-products-explorer'],$ver);
        wp_enqueue_style('torcisao-explorer-layout-phase10',$uri.'/assets/torcisao-explorer-layout-phase10.css',['torcisao-explorer-image-calibration'],$ver);
        wp_enqueue_style('torcisao-explorer-depth',$uri.'/assets/torcisao-explorer-depth.css',['torcisao-explorer-layout-phase10'],$ver);
        wp_enqueue_style('torcisao-mobile-product-tabs',$uri.'/assets/torcisao-mobile-product-tabs.css',['torcisao-explorer-depth'],'20260906-2108');
        wp_enqueue_style('torcisao-quality-recovery',$uri.'/assets/torcisao-quality-recovery.css',['torcisao-mobile-product-tabs'],$ver);
        wp_enqueue_style('torcisao-quality-polish',$uri.'/assets/torcisao-quality-polish.css',['torcisao-quality-recovery'],$ver);
        wp_enqueue_style('torcisao-social-proof',$uri.'/assets/torcisao-social-proof.css',['torcisao-quality-polish'],$ver);
        wp_enqueue_style('torcisao-motion-scrollbar-fix',$uri.'/assets/torcisao-motion-scrollbar-fix.css',['torcisao-social-proof'],'20260906-1915');
        wp_enqueue_style('torcisao-about-history',$uri.'/assets/torcisao-about-history.css',['torcisao-motion-scrollbar-fix'],$ver);
        wp_enqueue_style('torcisao-about-stability',$uri.'/assets/torcisao-about-stability.css',['torcisao-about-history'],'20260906-2325');
        wp_enqueue_style('torcisao-quote-safe-zone',$uri.'/assets/torcisao-quote-safe-zone.css',['torcisao-about-stability'],'20260906-2350');
        wp_enqueue_style('torcisao-timeline-mobile',$uri.'/assets/torcisao-timeline-mobile.css',['torcisao-quote-safe-zone'],'20260907-3');
        wp_enqueue_style('torcisao-home-mobile-final',$uri.'/assets/torcisao-home-mobile-final.css',['torcisao-timeline-mobile'],'20260907-5');
    }
    wp_enqueue_style('torcisao-mobile-blog-footer-v5',$uri.'/assets/torcisao-mobile-blog-footer-v5.css',$is_home?['torcisao-home-mobile-final']:['torcisao-footer-polish-v3'],'20260907-2');
    wp_enqueue_style('torcisao-industrial-logo-balance-v6',$uri.'/assets/torcisao-industrial-logo-balance-v6.css',['torcisao-mobile-blog-footer-v5'],'20260907-2');
    wp_enqueue_style('torcisao-global-alignment-v7',$uri.'/assets/torcisao-global-alignment-v7.css',['torcisao-industrial-logo-balance-v6'],'20260907-1');
    wp_enqueue_style('torcisao-section-rhythm-v8',$uri.'/assets/torcisao-section-rhythm-v8.css',['torcisao-global-alignment-v7'],'20260907-1');
    if ($is_product_page) {
        wp_enqueue_style('torcisao-product-pages-v9',$uri.'/assets/torcisao-product-pages-v9.css',['torcisao-section-rhythm-v8'],'20260907-1');
        wp_enqueue_style('torcisao-product-pages-v10',$uri.'/assets/torcisao-product-pages-v10.css',['torcisao-product-pages-v9'],'20260907-2');
        wp_enqueue_style('torcisao-haste-application-v11',$uri.'/assets/torcisao-haste-application-v11.css',['torcisao-product-pages-v10'],'20260907-1');
        wp_enqueue_style('torcisao-product-interaction-v12',$uri.'/assets/torcisao-product-interaction-v12.css',['torcisao-haste-application-v11'],'20260907-3');
        wp_enqueue_style('torcisao-product-assistant-v13',$uri.'/assets/torcisao-product-assistant-v13.css',['torcisao-product-interaction-v12'],'20260907-1');
        wp_enqueue_style('torcisao-barra-commercial-v14',$uri.'/assets/torcisao-barra-commercial-v14.css',['torcisao-product-assistant-v13'],'20260907-1');
        wp_enqueue_style('torcisao-product-spec-balance-v16',$uri.'/assets/torcisao-product-spec-balance-v16.css',['torcisao-barra-commercial-v14'],'20260907-1');
        wp_enqueue_style('torcisao-product-quote-tab-v17',$uri.'/assets/torcisao-product-quote-tab-v17.css',['torcisao-product-spec-balance-v16'],'20260907-1');
        if (is_page(1622)) {
            wp_enqueue_style('torcisao-btc-gallery-v20',$uri.'/assets/torcisao-btc-gallery-v20.css',['torcisao-product-quote-tab-v17'],'20260907-2');
            wp_enqueue_style('torcisao-product-stage-v21',$uri.'/assets/torcisao-product-stage-v21.css',['torcisao-btc-gallery-v20'],'20260907-1');
        }
    }
    wp_enqueue_script('torcisao-header',$uri.'/assets/torcisao-header-recovery.js',[], $ver, true);
    wp_enqueue_script('torcisao-phase8',$uri.'/assets/torcisao-phase8.js',['torcisao-header'], $ver, true);
    if ($is_home) {
        if ($is_home_pt) {
            wp_enqueue_script('torcisao-home-lazy-runtime',$uri.'/assets/torcisao-home-lazy-runtime.js',['torcisao-phase8'],'20260924-1',true);
        } else {
            wp_enqueue_script('torcisao-products-explorer',$uri.'/assets/torcisao-products-explorer.js',['torcisao-phase8'], $ver, true);
            wp_enqueue_script('torcisao-explorer-image-calibration',$uri.'/assets/torcisao-explorer-image-calibration.js',['torcisao-products-explorer'], $ver, true);
            wp_enqueue_script('torcisao-explorer-pre3d',$uri.'/assets/torcisao-explorer-pre3d.js',['torcisao-explorer-image-calibration'], $ver, true);
            wp_enqueue_script('torcisao-quality-recovery',$uri.'/assets/torcisao-quality-recovery.js',['torcisao-explorer-pre3d'], $ver, true);
            wp_enqueue_script('torcisao-social-proof',$uri.'/assets/torcisao-social-proof.js',['torcisao-quality-recovery'], '20260922-2', true);
            wp_enqueue_script('torcisao-about-history',$uri.'/assets/torcisao-about-history.js',['torcisao-phase8'], '20260906-2200', true);
            wp_enqueue_script('torcisao-timeline-mobile',$uri.'/assets/torcisao-timeline-mobile.js',['torcisao-about-history'], '20260906-2112', true);
        }
    }
    $skip_legacy_lens = $is_home || is_page(1622);
    if (!$skip_legacy_lens) {
        wp_enqueue_script('torcisao-lens-wheel-zoom',$uri.'/assets/torcisao-lens-wheel-zoom.js',$is_home?['torcisao-social-proof']:['torcisao-phase8'], $ver, true);
    }
    $commercial_handoff_dep = $skip_legacy_lens ? (($is_home_pt || !$is_home) ? ['torcisao-phase8'] : ['torcisao-social-proof']) : ['torcisao-lens-wheel-zoom'];
    wp_enqueue_script('torcisao-commercial-handoff',$uri.'/assets/torcisao-commercial-handoff.js',$commercial_handoff_dep, $ver, true);
    if ($is_product_page && !$is_barra_page) {
        wp_enqueue_script('torcisao-product-pages-v9',$uri.'/assets/torcisao-product-pages-v9.js',['torcisao-phase8'],'20260907-1',true);
        wp_enqueue_script('torcisao-product-pages-v10',$uri.'/assets/torcisao-product-pages-v10.js',['torcisao-product-pages-v9'],'20260907-1',true);
        if (is_page(1623)) {
            wp_enqueue_script('torcisao-haste-application-v11',$uri.'/assets/torcisao-haste-application-v11.js',['torcisao-product-pages-v10'],'20260907-2',true);
        }
        $interaction_dep = is_page(1623) ? ['torcisao-haste-application-v11'] : ['torcisao-product-pages-v10'];
        wp_enqueue_script('torcisao-product-interaction-v12',$uri.'/assets/torcisao-product-interaction-v12.js',$interaction_dep,'20260907-2',true);
        wp_enqueue_script('torcisao-product-assistant-v13',$uri.'/assets/torcisao-product-assistant-v13.js',['torcisao-product-interaction-v12'],'20260907-3',true);
        wp_enqueue_script('torcisao-barra-commercial-v14',$uri.'/assets/torcisao-barra-commercial-v14.js',['torcisao-product-assistant-v13'],'20260907-1',true);
        wp_enqueue_script('torcisao-product-data-consistency-v16',$uri.'/assets/torcisao-product-data-consistency-v16.js',['torcisao-barra-commercial-v14'],'20260907-1',true);
        wp_enqueue_script('torcisao-product-quote-tab-v17',$uri.'/assets/torcisao-product-quote-tab-v17.js',['torcisao-product-data-consistency-v16'],'20260907-1',true);
    }
    if (!$is_home_pt) {
        wp_enqueue_script('torcisao-footer-recovery',$uri.'/assets/torcisao-footer-recovery.js',['torcisao-commercial-handoff'], '20260907-3', true);
        wp_enqueue_script('torcisao-footer-group-v2',$uri.'/assets/torcisao-footer-group-v2.js',['torcisao-footer-recovery'], '20260907-2', true);
    }

    /* Runtime exato: evita traduções parciais como "Torcisão Drawns". */
    $request_lang = torcisao_request_language();
    if ($request_lang !== 'pt') {
        wp_enqueue_script('torcisao-i18n-runtime-v32',$uri.'/assets/torcisao-i18n-runtime-v32.js',['torcisao-footer-group-v2'],'20260907-1',true);
        wp_localize_script('torcisao-i18n-runtime-v32','TORCISAO_I18N_CONFIG',[
            'lang'=>$request_lang,
            'locale'=>['pt'=>'pt-BR','en'=>'en-US','es'=>'es-ES'][$request_lang] ?? 'pt-BR',
            'map'=>function_exists('torcisao_i18n_map') ? torcisao_i18n_map($request_lang) : [],
        ]);
    }
}
add_action('wp_enqueue_scripts','torcisao_theme_assets');

/*
 * Home PT: consolida o CSS próprio do tema no HTML para eliminar dezenas de
 * solicitações render-blocking em redes móveis. A ordem abaixo replica a
 * cascata atual. Fontes e Bootstrap Icons permanecem externos.
 */
function torcisao_is_pt_home_request(){
    return is_front_page() && function_exists('torcisao_request_language') && torcisao_request_language()==='pt';
}

function torcisao_home_inline_css(){
    if (!torcisao_is_pt_home_request()) return;

    $theme = get_template_directory();
    /* Somente o que participa da primeira viewport. */
    $files = [
        'style.css',
        'assets/torcisao-header-recovery.css',
        'assets/torcisao-header-scroll-blur.css',
        'assets/torcisao-global-polish.css',
        'assets/torcisao-mobile-menu-polish.css',
        'assets/torcisao-home.css',
        'assets/torcisao-home-phase5.css',
        'assets/torcisao-home-phase7.css',
        'assets/torcisao-home-mobile-final.css',
    ];

    $css = '';
    foreach ($files as $relative) {
        $path = $theme.'/'.$relative;
        if (!is_readable($path)) continue;
        $chunk = file_get_contents($path);
        if ($chunk === false || $chunk === '') continue;
        $css .= "\n/* ".$relative." */\n".$chunk."\n";
    }

    if ($css !== '') {
        echo "<style id=\"torcisao-home-inline-css\">\n".$css."\n</style>\n";
    }
}
add_action('wp_head','torcisao_home_inline_css',99);

function torcisao_suppress_pt_home_styles($html,$handle,$href,$media){
    if (!torcisao_is_pt_home_request()) return $html;

    /* Já estão no CSS crítico inline. */
    $critical = [
        'torcisao-style',
        'torcisao-header',
        'torcisao-header-scroll-blur',
        'torcisao-global-polish',
        'torcisao-mobile-menu-polish',
        'torcisao-home-mobile-final',
    ];

    /* Frameworks que a Home custom não utiliza. */
    $drop = [
        'wp-block-library',
        'elementor-frontend',
        'base-desktop',
        'base-mobile',
        'elementor-gf-roboto',
        'elementor-gf-robotoslab',
    ];

    if (in_array($handle,$critical,true) || in_array($handle,$drop,true)) return '';

    /* CSS abaixo da dobra baixa imediatamente, mas não segura o primeiro paint. */
    $async = [
        'torcisao-phase6',
        'torcisao-phase8',
        'torcisao-commercial-handoff',
        'torcisao-footer-recovery',
        'torcisao-footer-group-v2',
        'torcisao-footer-polish-v3',
        'torcisao-products-explorer',
        'torcisao-explorer-image-calibration',
        'torcisao-explorer-layout-phase10',
        'torcisao-explorer-depth',
        'torcisao-mobile-product-tabs',
        'torcisao-quality-recovery',
        'torcisao-quality-polish',
        'torcisao-social-proof',
        'torcisao-motion-scrollbar-fix',
        'torcisao-about-history',
        'torcisao-about-stability',
        'torcisao-quote-safe-zone',
        'torcisao-timeline-mobile',
        'torcisao-mobile-blog-footer-v5',
        'torcisao-industrial-logo-balance-v6',
        'torcisao-global-alignment-v7',
        'torcisao-section-rhythm-v8',
        'torcisao-home-gallery-barra-v20',
        'torcisao-home-gallery-arame-v22',
        'torcisao-home-gallery-haste-v23',
        'torcisao-closeout-v25',
        'torcisao-footer-segments-v39',
        'torcisao-calculator-input-polish-v40',
    ];

    if (in_array($handle,$async,true)) {
        $safe_href = esc_url($href);
        return '<link rel="preload" as="style" href="'.$safe_href.'" onload="this.onload=null;this.rel=\'stylesheet\'">'
            .'<noscript><link rel="stylesheet" href="'.$safe_href.'"></noscript>';
    }

    return $html;
}
add_filter('style_loader_tag','torcisao_suppress_pt_home_styles',PHP_INT_MAX,4);

function torcisao_async_pt_home_external_styles($html,$handle,$href,$media){
    if (!torcisao_is_pt_home_request()) return $html;
    if (!in_array($handle,['torcisao-fonts','bootstrap-icons'],true)) return $html;

    $safe_href = esc_url($href);
    return '<link rel="preload" as="style" href="'.$safe_href.'" onload="this.onload=null;this.rel=\'stylesheet\'">'
        .'<noscript><link rel="stylesheet" href="'.$safe_href.'"></noscript>';
}
add_filter('style_loader_tag','torcisao_async_pt_home_external_styles',PHP_INT_MAX-1,4);

/* Prioriza a imagem LCP da página canônica de Barra Trefilada. */
function torcisao_preload_barra_lcp_image(){
    if (!is_page(1622)) return;
    $requested = isset($_GET['tipo']) ? sanitize_key(wp_unslash($_GET['tipo'])) : 'btc';
    $map = [
        'btc' => 'assets/barra1.webp',
        'mtc' => 'assets/barra2.webp',
        'atc' => 'assets/barra3.jpg',
        'ressulfurado' => 'assets/barra4.jpg',
    ];
    $kind = isset($map[$requested]) ? $requested : 'btc';
    $href = get_template_directory_uri().'/'.$map[$kind];
    echo '<link rel="preload" as="image" href="'.esc_url($href).'" fetchpriority="high">'."\n";
}
add_action('wp_head','torcisao_preload_barra_lcp_image',2);

/*
 * Site Kit: preserva o Sign in with Google no wp-login/profile,
 * mas evita carregar a biblioteca de autenticação na página pública de Barra,
 * onde não há botão nem One Tap ativo.
 */
function torcisao_disable_public_siwg_on_barra(){
    if (!(is_front_page() || is_page([1621,1622,1623,1627,1628,1629,1630,1631,1632]))) return;
    global $wp_filter;
    if (empty($wp_filter['template_redirect']) || empty($wp_filter['template_redirect']->callbacks)) return;

    foreach ($wp_filter['template_redirect']->callbacks as $priority => $callbacks) {
        foreach ($callbacks as $callback) {
            $fn = $callback['function'] ?? null;
            if (!is_array($fn) || !is_object($fn[0] ?? null) || ($fn[1] ?? '') !== 'register_tag') continue;
            if (get_class($fn[0]) !== 'Google\\Site_Kit\\Modules\\Sign_In_With_Google') continue;
            remove_action('template_redirect', $fn, $priority);
        }
    }
}
add_action('template_redirect','torcisao_disable_public_siwg_on_barra',1);

function torcisao_asset($path){
    return esc_url(get_template_directory_uri().'/'.ltrim($path,'/'));
}

function torcisao_preview_note(){
    if (function_exists('wp_get_environment_type') && wp_get_environment_type()==='local' && current_user_can('edit_theme_options')) {
        echo '<div class="tor-preview-badge">PREVIEW GITHUB · BRANCH DE RECONSTRUÇÃO</div>';
    }
}
add_action('wp_body_open','torcisao_preview_note',1);


function torcisao_commercial_handoff_markup(){
    ?>
    <div class="tor-commercial-offer-overlay" id="torCommercialHandoff" aria-hidden="true">
      <section class="tor-commercial-offer-card" role="dialog" aria-modal="true" aria-labelledby="torCommercialHandoffTitle">
        <button type="button" class="tor-commercial-offer-close" data-commercial-close aria-label="Fechar">×</button>
        <div class="tor-commercial-offer-mark"><i class="bi bi-whatsapp"></i></div>
        <small>PRÓXIMO PASSO</small>
        <h3 id="torCommercialHandoffTitle" data-commercial-title>Quer falar com o comercial sobre isso?</h3>
        <p data-commercial-copy>Leve o histórico desta consulta para o WhatsApp e continue com a equipe Torcisão sem precisar começar do zero.</p>
        <div class="tor-commercial-offer-context" data-commercial-context></div>
        <div class="tor-commercial-offer-actions">
          <button type="button" class="tor-commercial-offer-whatsapp" data-commercial-whatsapp>Falar com o comercial no WhatsApp</button>
          <button type="button" class="tor-commercial-offer-dismiss" data-commercial-dismiss>Agora não</button>
        </div>
      </section>
    </div>
    <?php
}
add_action('wp_footer','torcisao_commercial_handoff_markup',5);

function torcisao_set_origin_field_script(){
    ?>
    <script>
    window.addEventListener('message', function(event){
      if(!event.data || event.data.type !== 'hsFormCallback' || event.data.eventName !== 'onFormReady') return;
      document.querySelectorAll('input[name="pagina_de_origem_do_lead"]').forEach(function(el){
        if(!el.value) el.value = document.body.dataset.torcisaoOrigin || location.pathname;
      });
    });
    </script>
    <?php
}
add_action('wp_footer','torcisao_set_origin_field_script',30);

/* Políticas: no preview, exibe sempre o domínio oficial e mantém contatos contidos. */
function torcisao_policy_contact_assets(){
    $policy_templates = [
        'politicadeprivacidade.php','politicadecookies.php',
        'politicadeprivacidade-en.php','politicadeprivacidade-es.php',
        'politicadecookies-en.php','politicadecookies-es.php',
    ];
    if (!is_page_template($policy_templates)) return;
    $uri = get_template_directory_uri();
    wp_enqueue_style('torcisao-policy-contact-v26',$uri.'/assets/torcisao-policy-contact-v26.css',[],'20260907-1');
    wp_enqueue_script('torcisao-policy-contact-v26',$uri.'/assets/torcisao-policy-contact-v26.js',[],'20260907-1',true);
}
add_action('wp_enqueue_scripts','torcisao_policy_contact_assets',120);

/* FAQPage JSON-LD das páginas principais de produto e guias técnicos. */
/* Guias de Hastes: PT 1674 | EN 1736 | ES 1737 */
function torcisao_output_product_faq_schema(){
    $lang = function_exists('torcisao_request_language') ? torcisao_request_language() : 'pt';
    $page_id = get_queried_object_id();
    $is_pt_product = is_page([1621,1622,1623]) && $lang === 'pt';
    $is_grounding_guide = is_single([1674,1736,1737]);

    if (!$is_pt_product && !$is_grounding_guide) return;

    $faqs = [
        1623 => [
            ['Qual a diferença entre baixa e alta camada?','A Torcisão trabalha com opções de baixa camada, de até 20 mícrons, e alta camada, de 254 mícrons. A escolha deve seguir a especificação técnica e a condição de instalação do projeto; em aplicações de SPDA, confirme a exigência normativa com o responsável técnico.'],
            ['Quais normas consultar em projetos de SPDA?','A ABNT NBR 5419:2026 trata da proteção contra descargas atmosféricas. Para hastes de aço cobreado, consulte também a ABNT NBR 13571. Para os conectores da linha Torcisão, a referência publicada é a ABNT NBR 5370. O memorial e o responsável técnico devem definir os requisitos aplicáveis ao projeto.'],
            ['O que informar para solicitar cotação?','Informe aplicação, camada, bitola, comprimento, modelo de conector ou cabo quando aplicável, quantidade e qualquer requisito técnico previsto no desenho ou memorial.'],
        ],
        1622 => [
            ['O que é barra trefilada e como ela é produzida?','Barra trefilada é um perfil de aço obtido por trefilação a frio. Nesse processo, o material passa por uma matriz para reduzir e controlar sua seção, melhorando precisão dimensional e acabamento superficial. A escolha do aço, da bitola, da tolerância e do acabamento deve seguir a aplicação da peça.'],
            ['Quais as vantagens do aço 11SMn37 na usinagem?','O 11SMn37 é um aço ressulfurado de usinabilidade melhorada. O enxofre controlado favorece inclusões de sulfeto de manganês, que ajudam na formação e na quebra do cavaco durante operações de corte.'],
            ['Qual a diferença entre barra trefilada, polida e reendireitada?','A barra trefilada passa por trabalho a frio para melhorar controle dimensional e condição superficial. Quando o projeto exige requisitos adicionais de retilineidade ou superfície, podem ser avaliadas etapas de reendireitamento e polimento.'],
            ['Como escolher entre barras BTC, MTC e ATC?','O teor de carbono é um dos fatores de seleção. Aços de baixo teor de carbono costumam ser avaliados quando conformabilidade, ductilidade ou soldabilidade têm maior peso; faixas intermediárias equilibram resistência e processamento; e aços de maior teor de carbono entram em aplicações que exigem maior dureza ou resistência ao desgaste.'],
            ['O que enviar para uma cotação técnica de barras trefiladas?','Informe grau ou especificação do aço, perfil, bitola, comprimento, quantidade, tolerâncias, acabamento, aplicação e requisitos de documentação ou ensaio.'],
            ['Onde comprar barra trefilada 11SMn37 no Brasil?','A Torcisão fabrica e fornece barras trefiladas em aço ressulfurado 11SMn37 para clientes industriais. A empresa está localizada em São Paulo e atende demandas B2B em diferentes regiões.'],
        ],
        1621 => [
            ['Qual a diferença entre arame BTC, MTC e ATC?','As siglas indicam faixas de baixo, médio e alto teor de carbono. Essa variação altera o equilíbrio entre conformabilidade, resistência e dureza, por isso a classe de aço deve ser escolhida conforme a peça e o processo de fabricação.'],
            ['Quando avaliar rolo ou spider?','Rolo e spider são formas de fornecimento diferentes. A escolha depende de manuseio, armazenamento, alimentação da linha e continuidade do processo. A disponibilidade e a condição de fornecimento devem ser confirmadas na cotação.'],
            ['O que informar para cotar arame trefilado?','Informe aplicação, classe ou faixa de aço, bitola, forma de fornecimento, quantidade e qualquer requisito de resistência, dureza, acabamento ou tolerância previsto na especificação.'],
        ],
        1674 => [
            ['Haste de 254 µm é sempre a melhor escolha?','Não existe uma resposta universal. A alta camada possui uma camada nominal de cobre mais espessa, mas a escolha deve seguir a especificação, as condições de instalação e os critérios do responsável técnico.'],
            ['Haste de 20 µm pode ser usada em SPDA?','A aplicação em um sistema de SPDA não deve ser definida apenas pela espessura da camada. É necessário verificar o projeto, a ABNT NBR 5419 e os demais requisitos aplicáveis à instalação.'],
            ['Como saber qual bitola e comprimento comprar?','Bitola e comprimento devem seguir o desenho, memorial ou especificação do projeto. Quando essa informação não estiver definida, ela deve ser validada com o responsável técnico antes da compra.'],
            ['A Torcisão trabalha com conectores para haste?','Sim. A linha contempla Olhal Simples, Olhal Reforçado, Grampo U Simples e Grampo U Reforçado. A combinação adequada deve ser confirmada de acordo com haste, condutor e projeto.'],
        ],
        1736 => [
            ['Is a 254 µm grounding rod always the best choice?','There is no universal answer. The high-layer option has a thicker nominal copper layer. However, the choice should follow the specification, installation conditions and the responsible engineer\'s criteria.'],
            ['Can a 20 µm grounding rod be used in an LPS?','The use of a rod in a lightning protection system should not be defined only by layer thickness. First, check the project and ABNT NBR 5419. Then verify the other requirements applicable to the installation.'],
            ['How do I know which diameter and length to buy?','Diameter and length should follow the drawing, technical specification or project requirements. Otherwise, validate this information with the responsible engineer before purchase.'],
            ['Does Torcisão supply grounding rod connectors?','Yes. The line includes Standard Eye Connector, Reinforced Eye Connector, Standard U-Clamp and Reinforced U-Clamp. The appropriate combination must be confirmed according to the rod, conductor and project.'],
        ],
        1737 => [
            ['¿Una varilla de 254 µm es siempre la mejor opción?','No existe una respuesta universal. La opción de alta capa tiene una capa nominal de cobre más gruesa. Sin embargo, la elección debe seguir la especificación, las condiciones de instalación y los criterios del responsable técnico.'],
            ['¿Se puede usar una varilla de 20 µm en un SPDA?','El uso de una varilla en un sistema de protección contra descargas atmosféricas no debe definirse solo por el espesor de la capa. Primero, revise el proyecto y la ABNT NBR 5419. Después, compruebe los demás requisitos aplicables a la instalación.'],
            ['¿Cómo saber qué diámetro y longitud comprar?','El diámetro y la longitud deben seguir el plano, la memoria técnica o la especificación del proyecto. De lo contrario, valide esta información con el responsable técnico antes de la compra.'],
            ['¿Torcisão suministra conectores para varillas?','Sí. La línea incluye Conector de Ojal Simple, Conector de Ojal Reforzado, Abrazadera U Simple y Abrazadera U Reforzada. La combinación adecuada debe confirmarse según la varilla, el conductor y el proyecto.'],
        ],
    ];
    if (empty($faqs[$page_id])) return;

    $main_entity = [];
    foreach ($faqs[$page_id] as $faq) {
        $main_entity[] = [
            '@type' => 'Question',
            'name' => $faq[0],
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text' => $faq[1],
            ],
        ];
    }

    $url = get_permalink($page_id);
    if (!$url) return;

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        '@id' => $url . '#faq',
        'url' => $url,
        'inLanguage' => ['pt'=>'pt-BR','en'=>'en-US','es'=>'es-ES'][$lang] ?? 'pt-BR',
        'mainEntity' => $main_entity,
    ];

    echo "\n<script type=\"application/ld+json\" id=\"torcisao-faq-schema\">";
    echo wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo "</script>\n";
}
add_action('wp_head','torcisao_output_product_faq_schema',30);



/* Enriquecimento da entidade Organization gerada pelo Yoast SEO. */
function torcisao_enrich_organization_schema($data, $context){
    $official_socials = [
        'facebook'  => 'https://www.facebook.com/torcisaotrefilados/',
        'instagram' => 'https://www.instagram.com/torcisaotrefilados/',
        'linkedin'  => 'https://www.linkedin.com/company/torcisaotrefilados/',
    ];

    $same_as = isset($data['sameAs']) && is_array($data['sameAs']) ? $data['sameAs'] : [];
    $normalized_same_as = [];

    foreach ($same_as as $url) {
        if (!is_string($url) || $url === '') continue;

        if (stripos($url, 'facebook.com/') !== false) {
            $normalized_same_as[] = $official_socials['facebook'];
        } elseif (stripos($url, 'instagram.com/') !== false) {
            $normalized_same_as[] = $official_socials['instagram'];
        } elseif (stripos($url, 'linkedin.com/') !== false) {
            $normalized_same_as[] = $official_socials['linkedin'];
        } else {
            $normalized_same_as[] = $url;
        }
    }

    foreach ($official_socials as $official_url) {
        if (!in_array($official_url, $normalized_same_as, true)) {
            $normalized_same_as[] = $official_url;
        }
    }

    $data['sameAs'] = array_values(array_unique($normalized_same_as));
    $data['alternateName'] = 'Torcisão';
    $data['taxID'] = '62.147.178/0001-17';
    $data['telephone'] = '+55 11 2334-9989';
    $data['email'] = 'contatotrefilados@torcisao.com.br';
    $data['address'] = [
        '@type' => 'PostalAddress',
        'streetAddress' => 'Rua Francisco Pedroso de Toledo, 138/166',
        'addressLocality' => 'São Paulo',
        'addressRegion' => 'SP',
        'postalCode' => '04185-150',
        'addressCountry' => 'BR',
    ];
    $data['contactPoint'] = [
        [
            '@type' => 'ContactPoint',
            'contactType' => 'sales',
            'telephone' => '+55 11 2334-9989',
            'email' => 'contatotrefilados@torcisao.com.br',
        ],
    ];

    return $data;
}
add_filter('wpseo_schema_organization','torcisao_enrich_organization_schema',11,2);



/* Product JSON-LD das páginas principais de produto em PT-BR.
 * Estrutura sem Offer: a Torcisão trabalha com cotação consultiva e não publica
 * preço, estoque ou SKU comercial no site.
 */
function torcisao_output_product_schema(){
    if (!is_page([1621,1622,1623])) return;
    if (function_exists('torcisao_request_language') && torcisao_request_language() !== 'pt') return;

    $products = [
        1623 => [
            'name' => 'Haste de Aterramento',
            'description' => 'Fabricante de hastes de aterramento de baixa e alta camada, com opções de 20 e 254 mícrons, medidas, conectores e suporte técnico para cotação.',
            'image' => [
                get_template_directory_uri().'/assets/hastebaixa.webp',
                get_template_directory_uri().'/assets/hastealta.png',
            ],
            'category' => 'Hastes de aterramento',
            'material' => ['Aço-carbono SAE 1010/1020','Cobre'],
            'additionalProperty' => [
                ['@type'=>'PropertyValue','name'=>'Camadas disponíveis','value'=>'20 µm e 254 µm'],
                ['@type'=>'PropertyValue','name'=>'Núcleo','value'=>'Aço-carbono SAE 1010/1020'],
                ['@type'=>'PropertyValue','name'=>'Perfil','value'=>'Redondo'],
                ['@type'=>'PropertyValue','name'=>'Faixa de diâmetros','value'=>'9,00 mm a 17,30 mm, conforme camada e especificação'],
                ['@type'=>'PropertyValue','name'=>'Comprimentos','value'=>'Até 3.000 mm, conforme combinação e especificação'],
                ['@type'=>'PropertyValue','name'=>'Alta camada','value'=>'254 µm de cobre eletrolítico, conforme ABNT NBR 13571'],
            ],
        ],
        1622 => [
            'name' => 'Barra Trefilada de Aço',
            'description' => 'Conheça barras trefiladas BTC, MTC, ATC e aço ressulfurado 11SMn37 da Torcisão, com precisão dimensional, acabamento e suporte técnico para cotação.',
            'image' => [
                get_template_directory_uri().'/assets/barra1.webp',
                get_template_directory_uri().'/assets/barra2.webp',
                get_template_directory_uri().'/assets/barra3.jpg',
                get_template_directory_uri().'/assets/barra4.jpg',
            ],
            'category' => 'Barras trefiladas de aço',
            'material' => ['Aço carbono','Aço ressulfurado 11SMn37'],
            'additionalProperty' => [
                ['@type'=>'PropertyValue','name'=>'Classes de aço','value'=>'BTC 1004 a 1020; MTC 1035 a 1045; ATC 1050; aço ressulfurado 11SMn37'],
                ['@type'=>'PropertyValue','name'=>'Faixa de bitolas','value'=>'2,00 mm a 15,88 mm, conforme classe de aço'],
                ['@type'=>'PropertyValue','name'=>'Perfil','value'=>'Redondo'],
                ['@type'=>'PropertyValue','name'=>'Acabamento','value'=>'Trefilado ou trefilado polido, conforme especificação'],
                ['@type'=>'PropertyValue','name'=>'Tolerância','value'=>'Conforme classe, aplicação e especificação comercial'],
                ['@type'=>'PropertyValue','name'=>'Comprimento','value'=>'Conforme especificação do pedido'],
            ],
        ],
        1621 => [
            'name' => 'Arame Trefilado de Aço',
            'description' => 'Conheça arames trefilados BTC, MTC e ATC da Torcisão, em rolos ou spiders, com opções de bitola e suporte técnico para aplicações industriais e cotação.',
            'image' => [
                'https://torcisao.com.br/wp-content/uploads/2026/09/arametrefiladorolo.png',
            ],
            'category' => 'Arames trefilados de aço',
            'material' => ['Aço carbono'],
            'additionalProperty' => [
                ['@type'=>'PropertyValue','name'=>'Classes de aço','value'=>'BTC 1004 a 1020; MTC 1035 a 1050; ATC 1060 a 1090'],
                ['@type'=>'PropertyValue','name'=>'Faixa de bitolas','value'=>'2,00 mm a 15,88 mm, conforme classe de aço'],
                ['@type'=>'PropertyValue','name'=>'Perfil','value'=>'Redondo'],
                ['@type'=>'PropertyValue','name'=>'Forma de fornecimento','value'=>'Rolos ou spiders'],
                ['@type'=>'PropertyValue','name'=>'Acabamento','value'=>'Trefilado'],
                ['@type'=>'PropertyValue','name'=>'Tolerância','value'=>'Sob consulta conforme especificação do pedido'],
            ],
        ],
    ];

    $page_id = get_queried_object_id();
    if (empty($products[$page_id])) return;

    $url = get_permalink($page_id);
    if (!$url) return;

    $data = $products[$page_id];
    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'Product',
        '@id' => $url.'#product',
        'url' => $url,
        'name' => $data['name'],
        'description' => $data['description'],
        'image' => $data['image'],
        'category' => $data['category'],
        'material' => $data['material'],
        'brand' => [
            '@type' => 'Brand',
            'name' => 'Torcisão Trefilados',
        ],
        'manufacturer' => [
            '@id' => 'https://torcisao.com.br/#organization',
        ],
        'mainEntityOfPage' => [
            '@id' => $url,
        ],
        'additionalProperty' => $data['additionalProperty'],
    ];

    echo "\n<script type=\"application/ld+json\" id=\"torcisao-product-schema\">";
    echo wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo "</script>\n";
}
add_action('wp_head','torcisao_output_product_schema',31);

