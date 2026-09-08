<?php
if (!defined('ABSPATH')) exit;

/*
 * Regra de marca: "Torcisão Trefilados" nunca é traduzido.
 * O guardião externo recebe o HTML já processado pelas demais camadas.
 */
if (!function_exists('torcisao_brand_output_guard')) {
    function torcisao_brand_output_guard($html){
        if (!$html) return $html;
        return str_replace(
            ['Torcisão Drawns','Torcisão Drawn','Torcisão Trefilado'],
            ['Torcisão Trefilados','Torcisão Trefilados','Torcisão Trefilados'],
            $html
        );
    }
    function torcisao_start_brand_output_guard(){
        $lang = function_exists('torcisao_request_language') ? torcisao_request_language() : 'pt';
        if (in_array($lang,['en','es'],true)) ob_start('torcisao_brand_output_guard');
    }
    add_action('template_redirect','torcisao_start_brand_output_guard',-1000);
}

/* URLs públicas das páginas unificadas de produto. */
if (!function_exists('torcisao_product_url')) {
    function torcisao_product_url($product,$lang=null,$tipo=''){
        if (!$lang) $lang = function_exists('torcisao_request_language') ? torcisao_request_language() : 'pt';
        if (!in_array($lang,['pt','en','es'],true)) $lang='pt';
        $slugs=[
            'pt'=>['arame'=>'arame-trefilado','barra'=>'barra-trefilada','haste'=>'haste-de-aterramento'],
            'en'=>['arame'=>'drawn-wire','barra'=>'drawn-bar','haste'=>'grounding-rod'],
            'es'=>['arame'=>'alambre-trefilado','barra'=>'barra-trefilada','haste'=>'varilla-de-puesta-a-tierra'],
        ];
        if (!isset($slugs[$lang][$product])) return home_url('/');
        $base='';
        if (function_exists('pll_home_url')) $base=(string) pll_home_url($lang);
        if (!$base) $base=home_url($lang==='pt'?'/':'/'.$lang.'/');
        $url=trailingslashit($base).$slugs[$lang][$product].'/';
        if ($tipo!=='') $url=add_query_arg('tipo',sanitize_key($tipo),$url);
        return $url;
    }
}

/*
 * O header e alguns componentes antigos ainda nascem com os slugs históricos.
 * Esta camada troca somente os destinos de produto no HTML final, sem mexer no layout.
 */
if (!function_exists('torcisao_product_link_output_guard')) {
    function torcisao_product_link_output_guard($html){
        if (!$html) return $html;
        $lang=function_exists('torcisao_request_language')?torcisao_request_language():'pt';
        $legacy=[
            'arame'=>home_url('/aramebtc/'),
            'barra'=>home_url('/barrabtc/'),
            'haste'=>home_url('/hastebc/'),
        ];
        foreach ($legacy as $product=>$old) {
            $new=torcisao_product_url($product,$lang);
            $html=str_replace($old,$new,$html);
        }
        $paths=[
            '/aramebtc/'=>parse_url(torcisao_product_url('arame',$lang),PHP_URL_PATH),
            '/barrabtc/'=>parse_url(torcisao_product_url('barra',$lang),PHP_URL_PATH),
            '/hastebc/'=>parse_url(torcisao_product_url('haste',$lang),PHP_URL_PATH),
        ];
        return str_replace(array_keys($paths),array_values($paths),$html);
    }
    function torcisao_start_product_link_output_guard(){ ob_start('torcisao_product_link_output_guard'); }
    add_action('template_redirect','torcisao_start_product_link_output_guard',-1002);
}

/* URLs antigas continuam válidas via 301 e preservam a opção previamente acessada. */
if (!function_exists('torcisao_redirect_legacy_product_urls')) {
    function torcisao_redirect_legacy_product_urls(){
        if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST)) return;
        $method=$_SERVER['REQUEST_METHOD']??'GET';
        if (!in_array($method,['GET','HEAD'],true)) return;
        $path=(string) parse_url($_SERVER['REQUEST_URI']??'/',PHP_URL_PATH);
        $path=trim($path,'/');
        if ($path==='') return;
        $segments=explode('/',$path);
        $lang=function_exists('torcisao_request_language')?torcisao_request_language():'pt';
        if (in_array($segments[0]??'',['en','es'],true)) array_shift($segments);
        $slug=end($segments);
        $maps=[
            'pt'=>[
                'aramebtc'=>['arame','btc'],'aramemtc'=>['arame','mtc'],'arameatc'=>['arame','atc'],
                'barrabtc'=>['barra','btc'],'barramtc'=>['barra','mtc'],'barraatc'=>['barra','atc'],'barraacoressulfurado'=>['barra','ressulfurado'],
                'hastebc'=>['haste','baixa'],'hasteac'=>['haste','alta'],
            ],
            'en'=>[
                'drawn-steel-wires-low-carbon'=>['arame','btc'],'drawn-steel-wires-medium-carbon-1035-a-1050'=>['arame','mtc'],'drawn-steel-wires-high-carbon-1060-a-1090'=>['arame','atc'],
                'drawn-steel-bars-low-carbon-1006-a-1020'=>['barra','btc'],'drawn-steel-bars-medium-carbon-1035-a-1050'=>['barra','mtc'],'drawn-steel-bars-high-carbon-1060-a-1090'=>['barra','atc'],'resulfurized-steel-bars'=>['barra','ressulfurado'],
                'grounding-rod-low-coat'=>['haste','baixa'],'grounding-rod-high-coat'=>['haste','alta'],
            ],
            'es'=>[
                'alambres-trefilados-bajo-carbono-1004-a-1020'=>['arame','btc'],'alambres-trefilados-medio-carbono-1035-a-1050'=>['arame','mtc'],'alambres-alto-contenido-de-carbono-1060-a-1090'=>['arame','atc'],
                'barras-trefiladas-bajo-carbono-1006-a-1020'=>['barra','btc'],'barras-trefiladas-medio-carbono-1035-a-1050'=>['barra','mtc'],'barras-trefiladas-alto-carbono-1060-a-1090'=>['barra','atc'],'barras-acero-resulfurado'=>['barra','ressulfurado'],
                'varilla-de-puesta-a-tierra-capa-baja'=>['haste','baixa'],'varilla-de-puesta-a-tierra-capa-alta'=>['haste','alta'],
            ],
        ];
        if (!isset($maps[$lang][$slug])) return;
        [$product,$tipo]=$maps[$lang][$slug];
        wp_safe_redirect(torcisao_product_url($product,$lang,$tipo),301);
        exit;
    }
    add_action('template_redirect','torcisao_redirect_legacy_product_urls',1);
}

/* A tolerância de Arame/Barra usa o mesmo padrão de modal técnico da Home em todos os idiomas. */
if (!function_exists('torcisao_product_tolerance_modal_assets')) {
    function torcisao_product_tolerance_modal_assets(){
        $uri = get_template_directory_uri();
        wp_enqueue_style('torcisao-product-tolerance-modal-v36',$uri.'/assets/torcisao-product-tolerance-modal-v36.css',[],'20260907-1');
        wp_enqueue_script('torcisao-product-tolerance-modal-v36',$uri.'/assets/torcisao-product-tolerance-modal-v36.js',[],'20260907-1',true);
    }
    add_action('wp_enqueue_scripts','torcisao_product_tolerance_modal_assets',125);
}

/*
 * Correção definitiva da calculadora de Haste.
 * É carregada com arquivo/versionamento próprios para não depender de cópias antigas
 * do controlador geral do header que possam existir em cache no preview.
 */
if (!function_exists('torcisao_haste_calculator_fix_assets')) {
    function torcisao_haste_calculator_fix_assets(){
        $uri = get_template_directory_uri();
        wp_enqueue_script(
            'torcisao-haste-calculator-fix-v38',
            $uri.'/assets/torcisao-haste-calculator-fix-v38.js',
            ['torcisao-header'],
            '20260908-1115',
            true
        );
    }
    add_action('wp_enqueue_scripts','torcisao_haste_calculator_fix_assets',130);
}

/* Segmentos das duas unidades do Grupo Torcisão, com cópia própria em PT/EN/ES. */
if (!function_exists('torcisao_footer_segments_assets')) {
    function torcisao_footer_segments_assets(){
        $uri = get_template_directory_uri();
        wp_enqueue_style(
            'torcisao-footer-segments-v39',
            $uri.'/assets/torcisao-footer-segments-v39.css',
            ['torcisao-footer-group-v2'],
            '20260908-1'
        );
        wp_enqueue_script(
            'torcisao-footer-segments-v39',
            $uri.'/assets/torcisao-footer-segments-v39.js',
            ['torcisao-footer-group-v2'],
            '20260908-1',
            true
        );
    }
    add_action('wp_enqueue_scripts','torcisao_footer_segments_assets',135);
}

/* Entradas da calculadora: stepper discreto, campos numéricos limpos e unidade explícita sem alterar o layout. */
if (!function_exists('torcisao_calculator_input_polish_assets')) {
    function torcisao_calculator_input_polish_assets(){
        $uri = get_template_directory_uri();
        wp_enqueue_style(
            'torcisao-calculator-input-polish-v40',
            $uri.'/assets/torcisao-calculator-input-polish-v40.css',
            ['torcisao-phase8'],
            '20260908-1222'
        );
        wp_enqueue_script(
            'torcisao-calculator-input-polish-v40',
            $uri.'/assets/torcisao-calculator-input-polish-v40.js',
            ['torcisao-phase8'],
            '20260908-1222',
            true
        );
    }
    add_action('wp_enqueue_scripts','torcisao_calculator_input_polish_assets',140);
}

if (!function_exists('torcisao_translated_page_assets')) {
    function torcisao_translated_page_assets(){
        $lang = function_exists('torcisao_request_language') ? torcisao_request_language() : 'pt';
        if (!in_array($lang,['en','es'],true)) return;
        $uri = get_template_directory_uri();
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-i18n-register-v30.js?v=20260907-2').'"></script>';
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-i18n-legal-v28.js?v=20260907-3').'"></script>';
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-i18n-audit-v31.js?v=20260907-3').'"></script>';
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-i18n-catalog-v32.js?v=20260907-1').'"></script>';
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-i18n-final-v33.js?v=20260907-1').'"></script>';
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-blog-i18n-v34.js?v=20260907-1').'"></script>';
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-audio-i18n-v33.js?v=20260907-1').'"></script>';
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-i18n-home-modal-v35.js?v=20260907-1').'"></script>';
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-i18n-fixes-v36.js?v=20260907-1').'"></script>';
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-product-application-i18n-v37.js?v=20260907-1').'"></script>';
        echo '<script defer src="'.esc_url($uri.'/assets/torcisao-whatsapp-i18n-v36.js?v=20260907-1').'"></script>';
    }
    add_action('wp_footer','torcisao_translated_page_assets',100);
}
