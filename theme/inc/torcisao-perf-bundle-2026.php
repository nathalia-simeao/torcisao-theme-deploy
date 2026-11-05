<?php
/**
 * Performance 2026-11 (Core Web Vitals no celular)
 *
 * O PageSpeed mostrava 37 arquivos bloqueando a renderização: cada CSS do tema
 * (v9, v10, v11… criados ao longo das fases) era uma requisição separada, e no
 * celular cada uma custa uma ida e volta antes da página aparecer (LCP > 4 s).
 *
 * 1) Junta todos os CSS do tema que vão no <head> em UM arquivo, na mesma ordem
 *    de antes (a cascata não muda). O arquivo é gerado uma vez e reaproveitado;
 *    muda sozinho quando algum CSS do tema muda (hash por data de alteração).
 * 2) Bootstrap Icons deixa de bloquear a renderização (carrega logo depois).
 * 3) Pré-conexão com as fontes e o CDN.
 * 4) O script de UTM passa a ser "defer" (continua rodando antes do formulário).
 *
 * Para desligar o pacote e voltar aos arquivos separados: ?torcisao_nobundle=1
 * ou a constante TORCISAO_NO_CSS_BUNDLE.
 */
if (!defined('ABSPATH')) exit;

function torcisao_perf_bundle_enabled() {
    if (is_admin() || is_customize_preview()) return false;
    if (defined('TORCISAO_NO_CSS_BUNDLE') && TORCISAO_NO_CSS_BUNDLE) return false;
    if (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) return false;
    if (isset($_GET['torcisao_nobundle'])) return false;
    return true;
}

/** Caminho local de um CSS do tema a partir da URL registrada (ou '' se não for do tema). */
function torcisao_perf_local_css($src) {
    $src = (string) $src;
    if ($src === '') return '';
    $base_uri = get_template_directory_uri();
    $base_dir = get_template_directory();
    $clean = preg_replace('/[?#].*$/', '', $src);
    $clean = preg_replace('#^https?:#', '', $clean);
    $base = preg_replace('#^https?:#', '', $base_uri);
    if (strpos($clean, $base . '/') !== 0) return '';
    $rel = substr($clean, strlen($base) + 1);
    if ($rel === '' || strpos($rel, '..') !== false || substr($rel, -4) !== '.css') return '';
    $file = $base_dir . '/' . $rel;
    return is_readable($file) ? $file : '';
}

/** Reescreve url(...) relativos para absolutos, já que o pacote fica em outra pasta. */
function torcisao_perf_fix_urls($css, $file) {
    $dir_url = get_template_directory_uri() . '/' . ltrim(str_replace('\\', '/', substr(dirname($file), strlen(get_template_directory()))), '/');
    $dir_url = rtrim($dir_url, '/');
    return preg_replace_callback('/url\(\s*([\'"]?)([^\'")]+)\1\s*\)/i', function ($m) use ($dir_url) {
        $u = trim($m[2]);
        if ($u === '' || preg_match('#^(data:|https?:|//|/|\#)#i', $u)) return $m[0];
        return 'url(' . $m[1] . $dir_url . '/' . $u . $m[1] . ')';
    }, $css);
}

function torcisao_perf_bundle_styles() {
    static $ran = false;
    if ($ran || !torcisao_perf_bundle_enabled()) return;
    $ran = true;

    $styles = wp_styles();
    if (empty($styles->queue)) return;

    $styles->all_deps($styles->queue);
    $order = $styles->to_do;
    $styles->to_do = [];

    $bundle = [];      // handle => arquivo
    $sig = [];
    foreach ($order as $h) {
        if (in_array($h, $styles->done, true)) continue;
        $obj = $styles->registered[$h] ?? null;
        if (!$obj || !$obj->src) continue;
        $media = $obj->args ?: 'all';
        if ($media !== 'all' && $media !== 'screen') continue;
        if (!empty($obj->extra['conditional']) || !empty($obj->extra['alt'])) continue;
        $file = torcisao_perf_local_css($obj->src);
        if (!$file) continue;
        $after = isset($obj->extra['after']) ? implode("\n", (array) $obj->extra['after']) : '';
        $bundle[$h] = [$file, $after];
        $sig[] = $h . ':' . filemtime($file) . ':' . filesize($file) . ':' . md5($after);
    }
    if (count($bundle) < 3) return;

    $up = wp_upload_dir(null, false);
    if (!empty($up['error'])) return;
    $dir = trailingslashit($up['basedir']) . 'torcisao-perf';
    $url = trailingslashit($up['baseurl']) . 'torcisao-perf';
    $key = substr(md5(implode('|', $sig) . '|v1'), 0, 16);
    $path = $dir . '/tema-' . $key . '.css';

    if (!is_readable($path)) {
        if (!wp_mkdir_p($dir)) return;
        $out = "/* Torcisão · CSS do tema em um arquivo (gerado automaticamente) */\n";
        foreach ($bundle as $h => [$file, $after]) {
            $css = file_get_contents($file);
            if ($css === false) return;
            $out .= "\n/* {$h} */\n" . torcisao_perf_fix_urls($css, $file) . "\n";
            if ($after !== '') $out .= $after . "\n";
        }
        $tmp = $path . '.' . wp_generate_password(6, false) . '.tmp';
        if (file_put_contents($tmp, $out) === false) return;
        @rename($tmp, $path);
        if (!is_readable($path)) return;
        /* limpa pacotes antigos (mantém os 6 mais recentes) */
        $old = glob($dir . '/tema-*.css') ?: [];
        if (count($old) > 6) {
            usort($old, function ($a, $b) { return filemtime($b) - filemtime($a); });
            foreach (array_slice($old, 6) as $f) @unlink($f);
        }
    }

    /* O pacote entra no lugar do último CSS do tema: depende de tudo que vinha antes dele. */
    $handles = array_keys($bundle);
    $last = end($handles);
    $deps = [];
    foreach ($order as $h) {
        if ($h === $last) break;
        if (!isset($bundle[$h])) $deps[] = $h;
    }
    foreach ($handles as $h) {
        $styles->done[] = $h;
    }
    wp_register_style('torcisao-bundle', $url . '/tema-' . $key . '.css', $deps, null);
    wp_enqueue_style('torcisao-bundle');
    /* quem dependia de um CSS do tema agora depende do pacote */
    foreach ($styles->queue as $h) {
        $obj = $styles->registered[$h] ?? null;
        if (!$obj || isset($bundle[$h]) || $h === 'torcisao-bundle') continue;
        if (array_intersect((array) $obj->deps, $handles)) $obj->deps[] = 'torcisao-bundle';
    }
}
add_action('wp_print_styles', 'torcisao_perf_bundle_styles', 0);

/* Ícones: carregam sem segurar a primeira pintura. */
add_filter('style_loader_tag', function ($tag, $handle, $href) {
    if (is_admin() || $handle !== 'bootstrap-icons') return $tag;
    $async = str_replace([" media='all'", ' media="all"'], [" media='print' onload=\"this.media='all'\"", ' media="print" onload="this.media=\'all\'"'], $tag);
    if ($async === $tag) return $tag;
    return $async . '<noscript>' . $tag . '</noscript>';
}, 10, 3);

/* Pré-conexão com quem serve fontes e ícones. */
add_filter('wp_resource_hints', function ($urls, $type) {
    if ($type !== 'preconnect') return $urls;
    $urls[] = ['href' => 'https://fonts.googleapis.com'];
    $urls[] = ['href' => 'https://fonts.gstatic.com', 'crossorigin'];
    $urls[] = ['href' => 'https://cdn.jsdelivr.net', 'crossorigin'];
    return $urls;
}, 10, 2);

/* UTM: defer (o script já espera o DOM e observa formulários que aparecem depois). */
add_filter('script_loader_tag', function ($tag, $handle) {
    if ($handle !== 'torcisao-hubspot-attribution' || strpos($tag, ' defer') !== false) return $tag;
    return str_replace('<script ', '<script defer ', $tag);
}, 20, 2);
