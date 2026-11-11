<?php
/**
 * Performance 2026-11 · parte 2
 *
 * A) Scripts de terceiros (Google Tag Manager/gtag e rastreamento do HubSpot) somavam
 *    ~1,4 s de processamento no celular durante o carregamento. Eles passam a carregar
 *    no primeiro toque/rolagem/tecla do visitante, ou 4 s depois que a página terminou
 *    de carregar, o que vier primeiro. Os eventos já enviados para o dataLayer ficam na
 *    fila e o GTM processa tudo quando entra. Formulários HubSpot (hsforms) NÃO são
 *    adiados. Desligar: ?torcisao_nodelay=1 ou constante TORCISAO_NO_DELAY_JS.
 *
 * B) Fotos de produto em PNG de 1254 px (~200 KB cada) ganham uma cópia WebP de 1000 px
 *    (gerada uma vez pelo próprio WordPress, ao abrir o painel). O site usa a cópia
 *    quando ela existe e cai na original quando não existe.
 */
if (!defined('ABSPATH')) exit;

/* ---------------------------------------------------------------- imagens */

/** Fotos do tema (uploads) que valem otimizar: achadas nos arquivos do próprio tema. */
function torcisao_img_candidates() {
    $dir = get_template_directory();
    $found = [];
    $files = array_merge(glob($dir . '/assets/*.js') ?: [], glob($dir . '/*.php') ?: [], glob($dir . '/inc/*.php') ?: [], glob($dir . '/template-parts/*.php') ?: []);
    foreach ($files as $f) {
        $src = @file_get_contents($f);
        if (!$src) continue;
        /* URLs completas de uploads */
        if (preg_match_all('#wp-content/uploads/(\d{4}/\d{2}/[A-Za-z0-9_.-]+\.(?:png|jpe?g))#i', $src, $m)) {
            foreach ($m[1] as $rel) $found[$rel] = true;
        }
        /* MEDIA='…/uploads/2026/09/' + 'arquivo.png' */
        if (preg_match_all("#MEDIA\s*=\s*['\"][^'\"]*wp-content/uploads/(\d{4}/\d{2})/['\"]#", $src, $mm)) {
            foreach (array_unique($mm[1]) as $folder) {
                if (preg_match_all("#MEDIA\s*\+\s*'([A-Za-z0-9_.-]+\.(?:png|jpe?g))'#i", $src, $n)) {
                    foreach ($n[1] as $name) $found[$folder . '/' . $name] = true;
                }
            }
        }
    }
    /* capas do blog: os tamanhos que o tema usa nos cards e no topo do post */
    $posts = get_posts(['post_type' => 'post', 'post_status' => ['publish', 'future'], 'numberposts' => 40, 'fields' => 'ids', 'suppress_filters' => true]);
    foreach ($posts as $pid) {
        $aid = get_post_thumbnail_id($pid);
        if (!$aid) continue;
        $file = get_post_meta($aid, '_wp_attached_file', true);
        $meta = wp_get_attachment_metadata($aid);
        if (!$file || !is_array($meta)) continue;
        $dir = dirname($file);
        foreach (['medium', 'medium_large', 'large'] as $sz) {
            if (!empty($meta['sizes'][$sz]['file']) && preg_match('/\.(png|jpe?g)$/i', $meta['sizes'][$sz]['file'])) $found[$dir . '/' . $meta['sizes'][$sz]['file']] = true;
        }
    }
    ksort($found);
    return array_keys($found);
}

/* Versões extras das fotos de produto: 640 px (celular) e 200 px (miniaturas). */
function torcisao_img_variants() { return ['md' => 640, 'sm' => 200]; }
function torcisao_img_map_v($v) {
    $map = get_option('torcisao_img_map_' . $v, []);
    return is_array($map) ? $map : [];
}
/** Gera as versões menores a partir da cópia de 1000 px já existente (barato e rápido). */
function torcisao_img_build_variants($limit = 12, $budget = 10.0) {
    if (!function_exists('wp_get_image_editor') || !wp_image_editor_supports(['mime_type' => 'image/webp'])) return;
    $up = wp_upload_dir(null, false);
    if (!empty($up['error'])) return;
    $base_dir = trailingslashit($up['basedir']); $base_url = trailingslashit($up['baseurl']);
    $start = microtime(true); $done = 0;
    $diag = ['vistos' => 0, 'sem_arquivo' => 0, 'erro_editor' => 0, 'erro_salvar' => 0, 'gerados' => 0, 'ultimo' => ''];
    foreach (torcisao_img_variants() as $v => $w) {
        $vmap = torcisao_img_map_v($v); $changed = false;
        foreach (torcisao_img_map() as $rel => $url) {
            if (isset($vmap[$rel])) continue;
            if ($done >= $limit || microtime(true) - $start > $budget) break 2;
            /* caminho local pela parte depois de /wp-content/uploads/ (não depende de http/https nem do domínio salvo) */
            $pos = strpos($url, '/wp-content/uploads/');
            if ($pos === false) continue;
            $relpath = substr($url, $pos + strlen('/wp-content/uploads/'));
            $src = $base_dir . $relpath;
            $diag['vistos']++;
            if (!is_readable($src)) { $diag['sem_arquivo']++; $diag['ultimo'] = $src; continue; }
            $done++;
            $ed = wp_get_image_editor($src);
            if (is_wp_error($ed)) { $diag['erro_editor']++; $diag['ultimo'] = $ed->get_error_message(); continue; }
            $size = $ed->get_size();
            if (empty($size['width']) || $size['width'] <= $w * 1.15) { $vmap[$rel] = $url; $changed = true; continue; }
            $ed->resize($w, null, false);
            $ed->set_quality(78);
            $dest = preg_replace('/-(\d+)\.webp$/', '-' . $w . '.webp', $src);
            if ($dest === $src) $dest = preg_replace('/\.webp$/', '-' . $w . '.webp', $src);
            $saved = $ed->save($dest, 'image/webp');
            if (is_wp_error($saved) || !is_readable($dest)) { $diag['erro_salvar']++; $diag['ultimo'] = is_wp_error($saved) ? $saved->get_error_message() : $dest; continue; }
            $diag['gerados']++;
            $vmap[$rel] = substr($url, 0, $pos + strlen('/wp-content/uploads/')) . substr($dest, strlen($base_dir));
            $changed = true;
        }
        if ($changed) update_option('torcisao_img_map_' . $v, $vmap, true);
    }
    $diag['quando'] = current_time('mysql');
    update_option('torcisao_img_variants_diag', $diag, false);
}

function torcisao_img_map() {
    $map = get_option('torcisao_img_map', []);
    return is_array($map) ? $map : [];
}

/** Gera as cópias que faltam (poucas por vez, para não pesar o painel). */
function torcisao_img_build($limit = 6, $budget = 12.0) {
    if (!function_exists('wp_get_image_editor')) return;
    /* WebP quando o servidor suporta; senão, PNG menor (800 px), que já ajuda bastante */
    $webp = wp_image_editor_supports(['mime_type' => 'image/webp']);
    $fmt = $webp ? ['image/webp', 'webp', 1000] : ['image/png', 'png', 800];
    update_option('torcisao_img_status', $webp ? 'webp' : 'png (servidor sem WebP)', false);
    $up = wp_upload_dir(null, false);
    if (!empty($up['error'])) return;
    $map = torcisao_img_map();
    $failed = get_option('torcisao_img_failed', []);
    if (!is_array($failed)) $failed = [];
    $out_dir = trailingslashit($up['basedir']) . 'torcisao-perf/img';
    $out_url = trailingslashit($up['baseurl']) . 'torcisao-perf/img';
    if (!wp_mkdir_p($out_dir)) return;
    $start = microtime(true);
    $done = 0;
    $changed = false;
    foreach (torcisao_img_candidates() as $rel) {
        if (isset($map[$rel]) || isset($failed[$rel])) continue;
        if ($done >= $limit || microtime(true) - $start > $budget) break;
        $done++;
        $src = trailingslashit($up['basedir']) . $rel;
        if (!is_readable($src)) { $failed[$rel] = 'ausente'; $changed = true; continue; }
        $name = preg_replace('/\.(png|jpe?g)$/i', '', basename($rel));
        $slug = str_replace('/', '-', dirname($rel)) . '-' . $name . '-' . $fmt[2] . '.' . $fmt[1];
        $dest = $out_dir . '/' . $slug;
        $ed = wp_get_image_editor($src);
        if (is_wp_error($ed)) { $failed[$rel] = 'editor'; $changed = true; continue; }
        $size = $ed->get_size();
        if (!empty($size['width']) && $size['width'] > $fmt[2]) $ed->resize($fmt[2], null, false);
        $ed->set_quality(80);
        $saved = $ed->save($dest, $fmt[0]);
        if (is_wp_error($saved) || !is_readable($dest)) { $failed[$rel] = 'save: ' . (is_wp_error($saved) ? $saved->get_error_message() : '?'); $changed = true; continue; }
        /* só usa a cópia se ela for realmente menor */
        if (filesize($dest) >= filesize($src)) { @unlink($dest); $failed[$rel] = 'maior'; $changed = true; continue; }
        $map[$rel] = $out_url . '/' . $slug;
        $changed = true;
    }
    if ($changed) {
        update_option('torcisao_img_map', $map, true);
        update_option('torcisao_img_failed', $failed, false);
    }
}

/* Roda ao abrir o painel e, enquanto faltar alguma, também pelo agendador do WordPress. */
add_action('admin_init', function () {
    if (wp_doing_ajax() || !current_user_can('edit_pages')) return;
    if (get_transient('torcisao_img_build_lock')) return;
    set_transient('torcisao_img_build_lock', 1, 60);
    torcisao_img_build(8, 10.0);
    torcisao_img_build_variants(12, 8.0);
    delete_transient('torcisao_img_build_lock');
});
/* Aviso no Painel com o andamento (some quando todas estiverem prontas). */
add_action('admin_notices', function () {
    if (!current_user_can('manage_options')) return;
    $screen = function_exists('get_current_screen') ? get_current_screen() : null;
    if (!$screen || $screen->id !== 'dashboard') return;
    if (isset($_GET['torcisao_img_reset']) && check_admin_referer('torcisao_img_reset')) {
        delete_option('torcisao_img_failed');
        torcisao_img_build(8, 10.0);
    }
    $vd = get_option('torcisao_img_variants_diag', []);
    $nmd = count(torcisao_img_map_v('md')); $nsm = count(torcisao_img_map_v('sm')); $nlg = count(torcisao_img_map());
    if ($nmd < $nlg || $nsm < $nlg) {
        echo '<div class="notice notice-info"><p><strong>Torcisão · versões para celular:</strong> 640 px: ' . (int) $nmd . ' de ' . (int) $nlg . ' · 200 px: ' . (int) $nsm . ' de ' . (int) $nlg
            . ($vd ? ' · última rodada ' . esc_html($vd['quando'] ?? '') . ': vistos ' . (int) ($vd['vistos'] ?? 0) . ', gerados ' . (int) ($vd['gerados'] ?? 0) . ', sem arquivo ' . (int) ($vd['sem_arquivo'] ?? 0) . ', erro editor ' . (int) ($vd['erro_editor'] ?? 0) . ', erro ao salvar ' . (int) ($vd['erro_salvar'] ?? 0) . (!empty($vd['ultimo']) ? ' · ' . esc_html(substr((string) $vd['ultimo'], -120)) : '') : ' · ainda não rodou')
            . '</p></div>';
    }
    $total = count(torcisao_img_candidates());
    $ok = count(torcisao_img_map());
    $failed = get_option('torcisao_img_failed', []);
    $failed = is_array($failed) ? $failed : [];
    if ($ok + count($failed) >= $total && !$failed) return;
    $status = get_option('torcisao_img_status', 'ainda não rodou');
    $reasons = [];
    foreach ($failed as $rel => $why) $reasons[$why] = ($reasons[$why] ?? 0) + 1;
    $txt = [];
    foreach ($reasons as $why => $n) $txt[] = esc_html($why) . ' (' . (int) $n . ')';
    $reset = wp_nonce_url(admin_url('index.php?torcisao_img_reset=1'), 'torcisao_img_reset');
    echo '<div class="notice notice-info"><p><strong>Torcisão · fotos otimizadas:</strong> ' . (int) $ok . ' de ' . (int) $total
        . ' prontas · formato: ' . esc_html($status)
        . ($txt ? ' · não otimizadas: ' . implode(', ', $txt) : '')
        . ' · <a href="' . esc_url($reset) . '">tentar de novo</a></p></div>';
});
add_action('torcisao_img_build_event', function () { torcisao_img_build(20, 25.0); torcisao_img_build_variants(40, 25.0); });
add_action('init', function () {
    if (!wp_next_scheduled('torcisao_img_build_event')) wp_schedule_event(time() + 120, 'hourly', 'torcisao_img_build_event');
});

/** Mapa no <head>: os scripts do tema trocam a foto pela cópia leve quando ela existe. */
add_action('wp_head', function () {
    $map = torcisao_img_map();
    $short = [];
    foreach ($map as $rel => $url) $short[$rel] = $url;
    $md = torcisao_img_map_v('md'); $sm = torcisao_img_map_v('sm');
    /* só o que muda de URL (sm/md iguais ao 1000 ficam de fora para o mapa não crescer à toa) */
    $md = array_filter($md, function ($u, $k) use ($map) { return ($map[$k] ?? '') !== $u; }, ARRAY_FILTER_USE_BOTH);
    $sm = array_filter($sm, function ($u, $k) use ($map) { return ($map[$k] ?? '') !== $u; }, ARRAY_FILTER_USE_BOTH);
    echo "<script id=\"torcisao-img-map\">window.TORCISAO_IMG_MAP=" . wp_json_encode($short, JSON_UNESCAPED_SLASHES)
        . ";window.TORCISAO_IMG_MD=" . wp_json_encode($md, JSON_UNESCAPED_SLASHES)
        . ";window.TORCISAO_IMG_SM=" . wp_json_encode($sm, JSON_UNESCAPED_SLASHES)
        . ";window.TorcisaoImgKey=function(u){return String(u).split('?')[0].replace(/^.*wp-content\\/uploads\\//,'')};"
        . "window.TorcisaoImg=function(u){try{var k=TorcisaoImgKey(u),mob=(window.innerWidth||1000)<768;return (mob&&window.TORCISAO_IMG_MD[k])||window.TORCISAO_IMG_MAP[k]||u}catch(e){return u}};"
        /* miniaturas: qualquer foto otimizada exibida com até 120 px troca para a versão de 200 px */
        . "(function(){var R={};function idx(){for(var k in TORCISAO_IMG_MAP){R[TORCISAO_IMG_MAP[k]]=k;if(TORCISAO_IMG_MD[k])R[TORCISAO_IMG_MD[k]]=k}}idx();"
        . "function fix(i){var s=i.getAttribute('src')||'';if(i.hasAttribute('data-tor-ss')&&(i.getAttribute('srcset')||'').indexOf(s.split('?')[0])<0){i.removeAttribute('srcset');i.removeAttribute('sizes');i.removeAttribute('data-tor-ss')}var k=R[s.split('?')[0]];if(!k||!TORCISAO_IMG_SM[k])return;if(i.complete&&!i.naturalWidth&&i.getAttribute('src'))return;var w=parseFloat(getComputedStyle(i).width)||0;if(!w&&i.complete&&i.naturalWidth)w=i.clientWidth;if(w>0&&w<=120&&s!==TORCISAO_IMG_SM[k])i.setAttribute('src',TORCISAO_IMG_SM[k])}"
        . "function scan(n){if(n.tagName==='IMG')fix(n);else if(n.querySelectorAll)[].forEach.call(n.querySelectorAll('img'),fix)}"
        . "new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==='attributes')fix(m.target);else [].forEach.call(m.addedNodes,scan)})}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});"
        . "addEventListener('load',function(){scan(document)})})();</script>\n";
}, 1);

/* ---------------------------------------------------------------- adiamento de scripts */

function torcisao_delay_enabled() {
    if (is_admin() || wp_doing_ajax() || is_feed() || is_customize_preview()) return false;
    if (defined('REST_REQUEST') && REST_REQUEST) return false;
    if (defined('TORCISAO_NO_DELAY_JS') && TORCISAO_NO_DELAY_JS) return false;
    if (isset($_GET['torcisao_nodelay'])) return false;
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    return $method === 'GET';
}

function torcisao_delay_is_third_party($attrs, $body) {
    $src = '';
    if (preg_match('/\ssrc\s*=\s*([\'"])(.*?)\1/i', $attrs, $m)) $src = $m[2];
    if (preg_match('/\stype\s*=\s*([\'"])(.*?)\1/i', $attrs, $t)) {
        $type = strtolower(trim($t[2]));
        if ($type !== '' && $type !== 'text/javascript' && $type !== 'application/javascript' && $type !== 'module') return false;
    }
    if (preg_match('/\sid\s*=\s*[\'"]torcisao/i', $attrs) && stripos($src, 'googletagmanager') === false) return false;
    $hosts = '#(googletagmanager\.com|google-analytics\.com|js\.hs-scripts\.com|js\.hs-analytics\.net|js\.hs-banner\.com|js\.hscollectedforms\.net|js\.usemessages\.com|static\.hotjar\.com|connect\.facebook\.net|clarity\.ms)#i';
    if ($src !== '') {
        if (stripos($src, 'hsforms') !== false) return false;
        return (bool) preg_match($hosts, $src);
    }
    /* inline: só o código de instalação do GTM/gtag/HubSpot, não os nossos eventos */
    if (strlen($body) > 6000) return false;
    if (preg_match('#googletagmanager\.com/gtm\.js|\bgtag\s*\(|js\.hs-scripts\.com#i', $body)) return true;
    return false;
}

function torcisao_delay_buffer($html) {
    if (!is_string($html) || stripos($html, '<html') === false || stripos($html, '</body>') === false) return $html;
    /* fotos com cópia WebP: troca no HTML (img, srcset e dados embutidos) */
    $map = torcisao_img_map();
    if ($map) {
        $from = [];
        $to = [];
        foreach ($map as $rel => $url) {
            foreach (['https://torcisao.com.br/wp-content/uploads/', '/wp-content/uploads/'] as $prefix) {
                $from[] = $prefix . $rel;
                $to[] = $url;
            }
            $from[] = 'https:\\/\\/torcisao.com.br\\/wp-content\\/uploads\\/' . str_replace('/', '\\/', $rel);
            $to[] = str_replace('/', '\\/', $url);
        }
        $html = str_replace($from, $to, $html);
        $md = torcisao_img_map_v('md');
        if ($md) {
            $lg2md = [];
            foreach ($map as $rel => $url) if (!empty($md[$rel]) && $md[$rel] !== $url) $lg2md[$url] = $md[$rel];
            if ($lg2md) {
                $html = preg_replace_callback('#<img\b(?![^>]*\ssrcset=)([^>]*?)\ssrc=(["\'])([^"\']+)\2([^>]*)>#i', function ($m) use ($lg2md) {
                    $u = $m[3];
                    if (!isset($lg2md[$u])) return $m[0];
                    return '<img' . $m[1] . ' src=' . $m[2] . $u . $m[2] . ' srcset="' . esc_attr($lg2md[$u]) . ' 640w, ' . esc_attr($u) . ' 1000w" sizes="(max-width: 767px) 92vw, 700px" data-tor-ss="1"' . $m[4] . '>';
                }, $html);
            }
        }
    }
    $count = 0;
    $html = preg_replace_callback('#<script\b([^>]*)>(.*?)</script>#is', function ($m) use (&$count) {
        $attrs = $m[1];
        $body = $m[2];
        if (!torcisao_delay_is_third_party($attrs, $body)) return $m[0];
        $count++;
        $attrs = preg_replace('/\stype\s*=\s*([\'"]).*?\1/i', '', $attrs);
        $attrs = preg_replace('/\ssrc\s*=/i', ' data-torcisao-src=', $attrs);
        return '<script type="text/torcisao-delay"' . $attrs . '>' . $body . '</script>';
    }, $html);
    if (!$count) return $html;
    $loader = <<<'JS'
<script id="torcisao-delay-loader">(function(){var go=false,ev=['pointerdown','touchstart','keydown','scroll','wheel'];
function run(){if(go)return;go=true;window.__torcisaoDelayedAt=Date.now();ev.forEach(function(e){removeEventListener(e,run,{passive:true})});
var list=[].slice.call(document.querySelectorAll('script[type="text/torcisao-delay"]'));
(function next(){var o=list.shift();if(!o)return;var s=document.createElement('script');
for(var i=0;i<o.attributes.length;i++){var a=o.attributes[i];if(a.name==='type')continue;if(a.name==='data-torcisao-src'){s.src=a.value;continue}s.setAttribute(a.name,a.value)}
if(s.src){var async=o.hasAttribute('async');s.async=async;if(!async){s.onload=s.onerror=next}o.parentNode.replaceChild(s,o);if(async)next()}
else{s.text=o.text;o.parentNode.replaceChild(s,o);next()}})()}
ev.forEach(function(e){addEventListener(e,run,{passive:true,once:true})});
function later(){setTimeout(run,4000)}if(document.readyState==='complete')later();else addEventListener('load',later);
window.TorcisaoRunDelayed=run})();</script>
JS;
    return preg_replace('#</body>#i', $loader . "\n</body>", $html, 1);
}

add_action('template_redirect', function () {
    if (torcisao_delay_enabled()) ob_start('torcisao_delay_buffer');
}, 1);

/* O tema antigo tirava o script do HubSpot da Home e da Barra (só carregava ao clicar em
   cotação), e com isso o CTA deslizante de WhatsApp nunca aparecia nessas páginas. Agora o
   script volta em todas as páginas, carregado após a 1ª interação (acima). */
add_action('after_setup_theme', function () {
    if (torcisao_delay_enabled_soft()) {
        remove_action('wp_enqueue_scripts', 'torcisao_defer_hubspot_global_script', 9999);
        remove_action('wp_footer', 'torcisao_lazy_hubspot_loader', 98);
    }
}, 20);
function torcisao_delay_enabled_soft() {
    if (defined('TORCISAO_NO_DELAY_JS') && TORCISAO_NO_DELAY_JS) return false;
    return !isset($_GET['torcisao_nodelay']);
}
