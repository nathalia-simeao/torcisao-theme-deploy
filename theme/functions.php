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

/* FAQPage JSON-LD das páginas principais de produto em PT-BR. */
function torcisao_output_product_faq_schema(){
    if (!is_page([1621,1622,1623])) return;
    if (function_exists('torcisao_request_language') && torcisao_request_language() !== 'pt') return;

    $faqs = [
        1623 => [
            ['Qual a diferença entre baixa e alta camada?','A Torcisão trabalha com opções de baixa camada, de até 20 mícrons, e alta camada, de 254 mícrons. A escolha deve seguir a especificação técnica e a condição de instalação do projeto; em aplicações de SPDA, confirme a exigência normativa com o responsável técnico.'],
            ['Quais normas consultar em projetos de SPDA?','A ABNT NBR 5419:2026 trata da proteção contra descargas atmosféricas. Para hastes de aço cobreado e acessórios, verifique também a ABNT NBR 13571 e os requisitos definidos no memorial do projeto.'],
            ['O que informar para solicitar cotação?','Informe aplicação, camada, bitola, comprimento, modelo de conector ou cabo quando aplicável, quantidade e qualquer requisito técnico previsto no desenho ou memorial.'],
        ],
        1622 => [
            ['Por que o 11SMn37 é usado em usinagem seriada?','O 11SMn37 é um aço de usinabilidade melhorada. Seu teor controlado de enxofre favorece inclusões que ajudam na formação e na quebra do cavaco, característica útil em operações contínuas e peças torneadas em série.'],
            ['O 11SMn37 pode ajudar na vida da ferramenta?','A melhor usinabilidade pode contribuir para menor esforço de corte e menor desgaste em determinadas condições, mas não existe um ganho fixo. Velocidade, avanço, ferramenta, refrigeração e rigidez do processo continuam determinantes.'],
            ['O que informar ao solicitar barra 11SMn37?','Informe bitola, comprimento, tolerância, acabamento desejado, quantidade, aplicação e qualquer requisito de laudo ou especificação. Para barra polida ou reendireitada, sinalize essa necessidade já na cotação.'],
        ],
        1621 => [
            ['Qual a diferença entre arame BTC, MTC e ATC?','As siglas indicam faixas de baixo, médio e alto teor de carbono. Essa variação altera o equilíbrio entre conformabilidade, resistência e dureza, por isso a classe de aço deve ser escolhida conforme a peça e o processo de fabricação.'],
            ['Quando avaliar rolo ou spider?','Rolo e spider são formas de fornecimento diferentes. A escolha depende de manuseio, armazenamento, alimentação da linha e continuidade do processo. A disponibilidade e a condição de fornecimento devem ser confirmadas na cotação.'],
            ['O que informar para cotar arame trefilado?','Informe aplicação, classe ou faixa de aço, bitola, forma de fornecimento, quantidade e qualquer requisito de resistência, dureza, acabamento ou tolerância previsto na especificação.'],
        ],
    ];

    $page_id = get_queried_object_id();
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
        'inLanguage' => 'pt-BR',
        'mainEntity' => $main_entity,
    ];

    echo "\n<script type=\"application/ld+json\" id=\"torcisao-faq-schema\">";
    echo wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo "</script>\n";
}
add_action('wp_head','torcisao_output_product_faq_schema',30);



/* Enriquecimento da entidade Organization gerada pelo Yoast SEO. */
function torcisao_enrich_organization_schema($data, $context){
    $linkedin = 'https://www.linkedin.com/company/torcisaotrefilados';

    $same_as = isset($data['sameAs']) && is_array($data['sameAs']) ? $data['sameAs'] : [];
    $normalized_same_as = [];

    foreach ($same_as as $url) {
        if (!is_string($url) || $url === '') continue;
        if (stripos($url, 'linkedin.com/') !== false) {
            $normalized_same_as[] = $linkedin;
        } else {
            $normalized_same_as[] = $url;
        }
    }

    if (!in_array($linkedin, $normalized_same_as, true)) {
        $normalized_same_as[] = $linkedin;
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
                ['@type'=>'PropertyValue','name'=>'Classes de aço','value'=>'BTC 1006 a 1020; MTC 1035 a 1045; ATC 1050; aço ressulfurado 11SMn37'],
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

