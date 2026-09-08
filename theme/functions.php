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
    wp_enqueue_style('torcisao-product-pages-v9',$uri.'/assets/torcisao-product-pages-v9.css',['torcisao-section-rhythm-v8'],'20260907-1');
    wp_enqueue_style('torcisao-product-pages-v10',$uri.'/assets/torcisao-product-pages-v10.css',['torcisao-product-pages-v9'],'20260907-2');
    wp_enqueue_style('torcisao-haste-application-v11',$uri.'/assets/torcisao-haste-application-v11.css',['torcisao-product-pages-v10'],'20260907-1');
    wp_enqueue_style('torcisao-product-interaction-v12',$uri.'/assets/torcisao-product-interaction-v12.css',['torcisao-haste-application-v11'],'20260907-3');
    wp_enqueue_style('torcisao-product-assistant-v13',$uri.'/assets/torcisao-product-assistant-v13.css',['torcisao-product-interaction-v12'],'20260907-1');
    wp_enqueue_style('torcisao-barra-commercial-v14',$uri.'/assets/torcisao-barra-commercial-v14.css',['torcisao-product-assistant-v13'],'20260907-1');
    wp_enqueue_style('torcisao-product-spec-balance-v16',$uri.'/assets/torcisao-product-spec-balance-v16.css',['torcisao-barra-commercial-v14'],'20260907-1');
    wp_enqueue_style('torcisao-product-quote-tab-v17',$uri.'/assets/torcisao-product-quote-tab-v17.css',['torcisao-product-spec-balance-v16'],'20260907-1');
    wp_enqueue_script('torcisao-header',$uri.'/assets/torcisao-header-recovery.js',[], $ver, true);
    wp_enqueue_script('torcisao-phase8',$uri.'/assets/torcisao-phase8.js',['torcisao-header'], $ver, true);
    if ($is_home) {
        wp_enqueue_script('torcisao-products-explorer',$uri.'/assets/torcisao-products-explorer.js',['torcisao-phase8'], $ver, true);
        wp_enqueue_script('torcisao-explorer-image-calibration',$uri.'/assets/torcisao-explorer-image-calibration.js',['torcisao-products-explorer'], $ver, true);
        wp_enqueue_script('torcisao-explorer-pre3d',$uri.'/assets/torcisao-explorer-pre3d.js',['torcisao-explorer-image-calibration'], $ver, true);
        wp_enqueue_script('torcisao-quality-recovery',$uri.'/assets/torcisao-quality-recovery.js',['torcisao-explorer-pre3d'], $ver, true);
        wp_enqueue_script('torcisao-social-proof',$uri.'/assets/torcisao-social-proof.js',['torcisao-quality-recovery'], '20260907-6', true);
        wp_enqueue_script('torcisao-about-history',$uri.'/assets/torcisao-about-history.js',['torcisao-phase8'], '20260906-2200', true);
        wp_enqueue_script('torcisao-timeline-mobile',$uri.'/assets/torcisao-timeline-mobile.js',['torcisao-about-history'], '20260906-2112', true);
    }
    wp_enqueue_script('torcisao-lens-wheel-zoom',$uri.'/assets/torcisao-lens-wheel-zoom.js',$is_home?['torcisao-social-proof']:['torcisao-phase8'], $ver, true);
    wp_enqueue_script('torcisao-commercial-handoff',$uri.'/assets/torcisao-commercial-handoff.js',['torcisao-lens-wheel-zoom'], $ver, true);
    wp_enqueue_script('torcisao-product-pages-v9',$uri.'/assets/torcisao-product-pages-v9.js',['torcisao-phase8'],'20260907-1',true);
    wp_enqueue_script('torcisao-product-pages-v10',$uri.'/assets/torcisao-product-pages-v10.js',['torcisao-product-pages-v9'],'20260907-1',true);
    wp_enqueue_script('torcisao-haste-application-v11',$uri.'/assets/torcisao-haste-application-v11.js',['torcisao-product-pages-v10'],'20260907-2',true);
    wp_enqueue_script('torcisao-product-interaction-v12',$uri.'/assets/torcisao-product-interaction-v12.js',['torcisao-haste-application-v11'],'20260907-2',true);
    wp_enqueue_script('torcisao-product-assistant-v13',$uri.'/assets/torcisao-product-assistant-v13.js',['torcisao-product-interaction-v12'],'20260907-3',true);
    wp_enqueue_script('torcisao-barra-commercial-v14',$uri.'/assets/torcisao-barra-commercial-v14.js',['torcisao-product-assistant-v13'],'20260907-1',true);
    wp_enqueue_script('torcisao-product-data-consistency-v16',$uri.'/assets/torcisao-product-data-consistency-v16.js',['torcisao-barra-commercial-v14'],'20260907-1',true);
    wp_enqueue_script('torcisao-product-quote-tab-v17',$uri.'/assets/torcisao-product-quote-tab-v17.js',['torcisao-product-data-consistency-v16'],'20260907-1',true);
    wp_enqueue_script('torcisao-footer-recovery',$uri.'/assets/torcisao-footer-recovery.js',['torcisao-commercial-handoff'], '20260907-3', true);
    wp_enqueue_script('torcisao-footer-group-v2',$uri.'/assets/torcisao-footer-group-v2.js',['torcisao-footer-recovery'], '20260907-2', true);

    /* Runtime exato: evita traduções parciais como "Torcisão Drawns". */
    $request_lang = torcisao_request_language();
    wp_enqueue_script('torcisao-i18n-runtime-v32',$uri.'/assets/torcisao-i18n-runtime-v32.js',['torcisao-footer-group-v2'],'20260907-1',true);
    wp_localize_script('torcisao-i18n-runtime-v32','TORCISAO_I18N_CONFIG',[
        'lang'=>$request_lang,
        'locale'=>['pt'=>'pt-BR','en'=>'en-US','es'=>'es-ES'][$request_lang] ?? 'pt-BR',
        'map'=>function_exists('torcisao_i18n_map') ? torcisao_i18n_map($request_lang) : [],
    ]);
}
add_action('wp_enqueue_scripts','torcisao_theme_assets');

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