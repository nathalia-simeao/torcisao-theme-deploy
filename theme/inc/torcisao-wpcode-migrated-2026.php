<?php
/**
 * Snippets que estavam no WPCode, trazidos para o tema em 2026-11 para ficarem versionados
 * no GitHub junto com o resto do site.
 *
 *   #1638  EN - Padronização de nomenclatura Torcisão
 *   #2057  SEO-01 | Home EN/ES - remover scripts exclusivos de produtos
 *   #2058  SEO-02 | Home EN/ES - scripts sob demanda
 *   #2055  301 - URLs antigas com 404  -> foi para inc/torcisao-seo-2026.php
 *
 * Enquanto o snippet original ainda estiver ativo no WPCode, a cópia daqui não roda duas
 * vezes: ela se desliga sozinha e só assume quando o snippet é desativado no WPCode.
 */
if (!defined('ABSPATH')) exit;

/* ------------------------------------------------------------------
 * #1638 · EN - Padronização de nomenclatura Torcisão
 * ------------------------------------------------------------------ */
/** O snippet original ainda está ativo no WPCode? (ativo = publicado) */
function torcisao_theme_wpcode_active($id) {
    return get_post_type($id) === 'wpcode' && get_post_status($id) === 'publish';
}

function torcisao_theme_is_english_request() {
    if (torcisao_theme_wpcode_active(1638)) return false;
    return !is_admin() && !wp_doing_ajax() && function_exists('pll_current_language') && pll_current_language('slug') === 'en';
}

add_action('wp', function () {
    if (!torcisao_theme_is_english_request()) return;
    ob_start(function ($html) {
        $replacements = [
            'Torcisão Trefiladoss' => 'Torcisão Trefilados',
            /* Só remove um "s" solto ("Trefilados s "), sem engolir a palavra seguinte (ex.: "solutions") */
            'Torcisão Trefilados s ' => 'Torcisão Trefilados ',
            'Drawn Steel Wires' => 'Drawn Wire',
            'Drawn Steel Bars' => 'Drawn Bar',
            'Grounding Rod – High Coat' => 'Grounding Rod – High Copper Coating',
            'Grounding Rod – Low Coat' => 'Grounding Rod – Low Copper Coating',
            'Grounding Rod - High Coat' => 'Grounding Rod - High Copper Coating',
            'Grounding Rod - Low Coat' => 'Grounding Rod - Low Copper Coating',
            'Low Coating ·' => 'Low Copper Coating ·',
            'High Coating ·' => 'High Copper Coating ·',
            'Torcisão Is Part of Your Everyday' => 'Torcisão Is Part of Your Everyday Life',
            /* Formas já corretas ficam como estão (a troca pode rodar mais de uma vez) */
            'Torcisão Is Part of Your Everyday Life' => 'Torcisão Is Part of Your Everyday Life',
            'Grounding Rod – High Coating' => 'Grounding Rod – High Copper Coating',
            'Grounding Rod – Low Coating' => 'Grounding Rod – Low Copper Coating',
            'Grounding Rod - High Coating' => 'Grounding Rod - High Copper Coating',
            'Grounding Rod - Low Coating' => 'Grounding Rod - Low Copper Coating',
            'With over 57 years of history' => 'With over 58 years of history',
            'we celebrate 57 years of dedication and excellence' => 'we celebrate 58 years of dedication and excellence',
        ];
        return strtr($html, $replacements);
    });
}, 0);

add_action('wp_footer', function () {
    if (!torcisao_theme_is_english_request()) return;
    ?>
    <script id="torcisao-en-coating-labels">
    (function () {
        function normalizeCoatingLabels() {
            document.querySelectorAll('h2').forEach(function (el) {
                var text = el.textContent || '';
                var next = text.replace('Low Coating', 'Low Copper Coating').replace('High Coating', 'High Copper Coating');
                if (next !== text) el.textContent = next;
            });
        }
        normalizeCoatingLabels();
        if (document.body && window.MutationObserver) {
            new MutationObserver(normalizeCoatingLabels).observe(document.body, { childList: true, subtree: true, characterData: true });
        }
    })();
    </script>
    <?php
}, 100);

/* ------------------------------------------------------------------
 * #2057 · SEO-01 · Home EN/ES: remove scripts que só servem às páginas de produto.
 * Não toca em GTM, GA4, HubSpot, consentimento, formulários ou WhatsApp.
 * ------------------------------------------------------------------ */
function torcisao_theme_is_translated_home() {
    return !is_admin() && is_page([1223, 1224]);
}

add_action('wp_footer', function () {
    if (function_exists('torcisao_seo01_is_translated_home') || !torcisao_theme_is_translated_home()) return;
    $GLOBALS['torcisao_theme_seo01_buffering'] = true;
    ob_start();
}, 99);

add_action('wp_footer', function () {
    if (empty($GLOBALS['torcisao_theme_seo01_buffering']) || ob_get_level() < 1) return;
    $GLOBALS['torcisao_theme_seo01_buffering'] = false;
    $html = ob_get_clean();
    /* Cada arquivo abaixo já se encerra quando não encontra o componente de produto. */
    foreach ([
        'torcisao-product-page-i18n-v42.js',
        'torcisao-product-page-i18n-v43.js',
        'torcisao-product-form-i18n-v41.js',
        'torcisao-products-en-audit-v44.js',
    ] as $filename) {
        $pattern = '~<script\s+defer\s+src=["\x27][^"\x27]*' . preg_quote($filename, '~') . '(?:\?[^"\x27]*)?["\x27]\s*></script>\s*~i';
        $replaced = preg_replace($pattern, '', $html);
        if (is_string($replaced)) $html = $replaced;
    }
    echo $html;
}, 101);

/* ------------------------------------------------------------------
 * #2058 · SEO-02 · Home EN/ES: seções abaixo da dobra carregam sob demanda.
 * Não altera GTM, HubSpot, cookies, formulários nem a home em português.
 * ------------------------------------------------------------------ */
add_action('wp_enqueue_scripts', function () {
    if (function_exists('torcisao_seo02_translated_home') || !torcisao_theme_is_translated_home()) return;
    foreach ([
        'torcisao-products-explorer',
        'torcisao-explorer-image-calibration',
        'torcisao-explorer-pre3d',
        'torcisao-quality-recovery',
        'torcisao-social-proof',
        'torcisao-about-history',
        'torcisao-timeline-mobile',
    ] as $handle) wp_dequeue_script($handle);

    /* O CTA comercial não usa as funções de social-proof (era só dependência de ordem). */
    global $wp_scripts;
    if ($wp_scripts && isset($wp_scripts->registered['torcisao-commercial-handoff'])) {
        $wp_scripts->registered['torcisao-commercial-handoff']->deps = ['torcisao-phase8'];
    }
}, 9998);

add_action('wp_footer', function () {
    if (function_exists('torcisao_seo02_translated_home') || !torcisao_theme_is_translated_home()) return;
    $base = trailingslashit(get_template_directory_uri()) . 'assets/';
    ?>
<script id="torcisao-seo02-below-fold">
(function(){
  'use strict';
  if(window.__torcisaoSeo02) return;
  window.__torcisaoSeo02 = true;
  var base = <?php echo wp_json_encode($base); ?>;
  var loaded = {};
  function load(file,ver){
    if(loaded[file]) return loaded[file];
    loaded[file] = new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src=base+file+'?ver='+encodeURIComponent(ver);
      s.async=false;
      s.onload=resolve;
      s.onerror=function(){delete loaded[file];reject(new Error(file));};
      document.body.appendChild(s);
    });
    return loaded[file];
  }
  function near(sel,run,margin){
    var el=document.querySelector(sel);
    if(!el)return;
    var started=false;
    function once(){
      if(started)return;
      started=true;
      Promise.resolve().then(run).catch(function(err){
        if(window.console)console.warn('SEO-02: loading deferred section',err);
      });
    }
    if(!('IntersectionObserver' in window)){once();return;}
    var io=new IntersectionObserver(function(entries){
      if(entries.some(function(e){return e.isIntersecting;})){
        io.disconnect();once();
      }
    },{rootMargin:(margin||'350px')+' 0px'});
    io.observe(el);
  }
  function init(){
    near('#produtos',function(){
      return load('torcisao-products-explorer.js','2026.11.06.1')
        .then(function(){return load('torcisao-explorer-image-calibration.js','2026.11.06.1');})
        .then(function(){return load('torcisao-explorer-pre3d.js','2026.11.06.1');});
    },'270px');
    near('#qualidade',function(){return load('torcisao-quality-recovery.js','2026.11.06.1');},'450px');
    near('#numeros',function(){return load('torcisao-social-proof.js','20260922-2');},'450px');
    near('#quem-somos',function(){
      return load('torcisao-about-history.js','20260906-2200')
        .then(function(){return load('torcisao-timeline-mobile.js','20260906-2112');});
    },'450px');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
</script>
    <?php
}, 70);
