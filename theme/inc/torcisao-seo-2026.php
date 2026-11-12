<?php
/**
 * SEO 2026-11
 *
 * 1) Endereços do site antigo (/produtos/…, páginas .php, /arames-selecao-de-produtos/)
 *    davam 404 depois da reconstrução — e eram eles que o Google ainda conhecia.
 *    Agora redirecionam (301) para a página nova equivalente, levando a relevância junto.
 * 2) Links internos das páginas de produto para as páginas de aplicação publicadas.
 */
if (!defined('ABSPATH')) exit;

/** Destino novo para um caminho antigo (ou '' se não for um endereço antigo conhecido). */
function torcisao_seo_legacy_target($path) {
    $p = strtolower(trim((string) $path, '/'));
    if ($p === '') return '';
    $exact = [
        'produtos/haste-terra' => '/haste-de-aterramento/',
        'produtos/trefilacao-de-fio-maquina' => '/arame-trefilado/',
        'arames-selecao-de-produtos' => '/arame-trefilado/',
        'produtos/aco-retificado' => '/barra-trefilada/',
        'produtos/aco-retificado-1020' => '/barra-trefilada/',
        'produtos/aco-retificado-1045' => '/barra-trefilada/',
        'produtos/aco-descascado-1045' => '/barra-trefilada/',
        /* Prefixo /pt/ do Polylang antigo: o português fica sem prefixo. Sem isto o
           WordPress "chutava" /pt/inicio/ para a home em inglês (/en/inicio-english/). */
        'pt' => '/',
        'pt/inicio' => '/',
        /* Vieram do snippet #2055 do WPCode (404 no Search Console em 11/2026) */
        'home' => '/',
        'index.html' => '/',
        'produtos-trefilados' => '/',
    ];
    if (isset($exact[$p])) return $exact[$p];

    /* Demais páginas antigas: /produtos/qualquer-coisa e páginas .php do site estático */
    $legacy = strpos($p, 'produtos/') === 0 || substr($p, -4) === '.php';
    if (!$legacy) return '';
    if (preg_match('/haste|terra|aterramento|conector/', $p)) return '/haste-de-aterramento/';
    if (preg_match('/arame|fio|wire/', $p)) return '/arame-trefilado/';
    if (preg_match('/barra|aco|trefil|retific|descasc|redond|sextav|quadrad|chato|cantoneira/', $p)) return '/barra-trefilada/';
    return '/';
}

/* Só age em 404: nunca muda páginas que existem. Roda antes do "chute" de URL do WordPress. */
add_action('template_redirect', function () {
    if (!is_404()) return;
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if (!in_array($method, ['GET', 'HEAD'], true)) return;
    $path = (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    /* Página de exemplo padrão do WordPress: removida de vez (410). Veio do snippet #2055. */
    if (strtolower(trim($path, '/')) === 'pagina-exemplo') { status_header(410); nocache_headers(); return; }
    $target = torcisao_seo_legacy_target($path);
    if ($target === '') return;
    wp_safe_redirect(home_url($target), 301, 'Torcisao legacy');
    exit;
}, 1);

/** Bloco "Por aplicação" nas páginas de produto (só páginas publicadas, só em português). */
function torcisao_seo_application_links($line) {
    if (!function_exists('torcisao_app_pages')) return;
    $lang = function_exists('torcisao_request_language') ? torcisao_request_language() : 'pt';
    if ($lang !== 'pt') return;
    $links = [];
    foreach (torcisao_app_pages() as $key => $p) {
        if ($p['line'] !== $line) continue;
        $url = torcisao_app_page_url($key);
        if ($url) $links[] = [$p['title'], $url];
    }
    if (!$links) return;
    $name = ['arame' => 'o arame trefilado', 'barra' => 'a barra trefilada', 'haste' => 'a haste de aterramento'][$line] ?? 'a barra trefilada';
    $for = $line === 'haste' ? 'para o seu projeto' : 'para o que você fabrica';
    echo '<section class="hf-section ta-applinks"><div class="hf-wrap">';
    echo '<div class="hf-section-head"><span class="hf-section-kicker">Por aplicação</span><h2 class="hf-section-title">Encontre ' . esc_html($name) . ' ' . esc_html($for) . '</h2></div>';
    echo '<div class="ta-applinks-grid">';
    foreach ($links as [$t, $u]) echo '<a href="' . esc_url($u) . '"><span>' . esc_html($t) . '</span><i class="bi bi-arrow-right" aria-hidden="true"></i></a>';
    echo '</div></div></section>';
    echo '<style>.ta-applinks-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:12px}.ta-applinks-grid a{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:18px 20px;border-radius:18px;border:1px solid var(--hf-line);background:var(--hf-card);color:var(--hf-ink);font-weight:700;font-size:.95rem;text-decoration:none;transition:border-color .15s,transform .15s}.ta-applinks-grid a:hover{border-color:var(--hf-orange);transform:translateY(-1px)}.ta-applinks-grid i{color:var(--hf-orange)}</style>';
}

/**
 * Bloco "Artigos técnicos" nas páginas de produto, nos três idiomas.
 * Os posts do blog tinham pouquíssimos links internos e o Google os deixava como
 * "Detectada, mas não indexada". Este bloco liga cada linha de produto aos artigos
 * do mesmo assunto. Só mostra posts publicados (post agendado aparece sozinho quando
 * entra no ar); slug inexistente é ignorado. No máximo 6 artigos por página.
 */
function torcisao_seo_related_posts_map($lang = 'pt') {
    if ($lang === 'en') return [
        'barra' => ['7-criteria-choose-11smn37-cold-drawn-bar-supplier', 'torcisao-products-drawn-bars-wire-grounding-rods'],
        'arame' => ['torcisao-products-drawn-bars-wire-grounding-rods'],
        'haste' => ['grounding-rod-guide-20-254-microns-standards-specification', 'torcisao-products-drawn-bars-wire-grounding-rods'],
    ];
    if ($lang === 'es') return [
        'barra' => ['7-criterios-elegir-proveedor-barras-trefiladas-acero-11smn37', 'productos-torcisao-barras-alambres-varillas-puesta-tierra'],
        'arame' => ['productos-torcisao-barras-alambres-varillas-puesta-tierra'],
        'haste' => ['guia-varillas-puesta-tierra-20-254-micras-normas-especificacion', 'productos-torcisao-barras-alambres-varillas-puesta-tierra'],
    ];
    return [
        'barra' => [
            'barra-trefilada-bitolas-normas-tolerancias',
            'barra-trefilada-reendireitada-polida',
            '7-criterios-para-escolher-fabricante-de-barras-trefiladas-em-aco-11smn37',
            'aco-11smn37-usinagem-quebra-cavaco',
            'como-homologar-fornecedor-aco-trefilado-contratos-longo-prazo',
            'orcamento-barras-arames-trefilados',
            'prazo-entrega-barras-arames-trefilados',
        ],
        'arame' => [
            'orcamento-barras-arames-trefilados',
            'prazo-entrega-barras-arames-trefilados',
            'como-homologar-fornecedor-aco-trefilado-contratos-longo-prazo',
            'produtos-torcisao-trefilados',
        ],
        'haste' => [
            'guia-tecnico-hastes-aterramento-20-254-microns',
            'comprar-hastes-aterramento-direto-fabricante',
            'hastes-aterramento-conectores-mesmo-pedido',
            'conectores-haste-aterramento-tipos-aplicacoes',
            'fabricante-hastes-aterramento-distribuidoras-eletricas',
            'normas-abnt-hastes-aterramento-conectores-spda',
        ],
    ];
}

function torcisao_seo_related_posts($line) {
    $lang = function_exists('torcisao_request_language') ? torcisao_request_language() : 'pt';
    if (!in_array($lang, ['pt', 'en', 'es'], true)) $lang = 'pt';
    $map = torcisao_seo_related_posts_map($lang);
    if (empty($map[$line])) return;

    $posts = [];
    foreach ($map[$line] as $slug) {
        $p = get_page_by_path($slug, OBJECT, 'post');
        if ($p && $p->post_status === 'publish') $posts[] = $p;
        if (count($posts) >= 6) break;
    }
    if (!$posts) return;

    $t = [
        'pt' => ['kicker' => 'Artigos técnicos', 'title' => 'Conteúdo para decidir melhor sobre %s', 'tag' => 'Blog Torcisão', 'more' => 'Ler artigo', 'all' => 'Ver todos os artigos do blog',
            'names' => ['barra' => 'barras trefiladas', 'arame' => 'arame trefilado', 'haste' => 'hastes de aterramento']],
        'en' => ['kicker' => 'Technical articles', 'title' => 'Content to help you decide on %s', 'tag' => 'Torcisão Blog', 'more' => 'Read article', 'all' => 'See all blog articles',
            'names' => ['barra' => 'drawn bars', 'arame' => 'drawn wire', 'haste' => 'grounding rods']],
        'es' => ['kicker' => 'Artículos técnicos', 'title' => 'Contenido para decidir mejor sobre %s', 'tag' => 'Blog Torcisão', 'more' => 'Leer artículo', 'all' => 'Ver todos los artículos del blog',
            'names' => ['barra' => 'barras trefiladas', 'arame' => 'alambre trefilado', 'haste' => 'varillas de puesta a tierra']],
    ][$lang];
    $blog_url = ($lang !== 'pt' && function_exists('torcisao_page_url')) ? torcisao_page_url('blog', $lang) : home_url('/blog/');

    echo '<section class="hf-section ts-related"><div class="hf-wrap">';
    echo '<div class="hf-section-head"><span class="hf-section-kicker">' . esc_html($t['kicker']) . '</span><h2 class="hf-section-title">' . esc_html(sprintf($t['title'], $t['names'][$line])) . '</h2></div>';
    echo '<div class="ts-related-grid">';
    foreach ($posts as $p) {
        $excerpt = has_excerpt($p) ? $p->post_excerpt : wp_strip_all_tags(strip_shortcodes($p->post_content));
        $excerpt = wp_trim_words($excerpt, 22, '…');
        echo '<a class="ts-related-card" href="' . esc_url(get_permalink($p)) . '">';
        echo '<small>' . esc_html($t['tag']) . '</small>';
        echo '<strong>' . esc_html(get_the_title($p)) . '</strong>';
        echo '<span class="ts-related-excerpt">' . esc_html($excerpt) . '</span>';
        echo '<span class="ts-related-more">' . esc_html($t['more']) . ' <i class="bi bi-arrow-right" aria-hidden="true"></i></span>';
        echo '</a>';
    }
    echo '</div>';
    echo '<p class="ts-related-all"><a href="' . esc_url($blog_url) . '">' . esc_html($t['all']) . ' <i class="bi bi-arrow-right" aria-hidden="true"></i></a></p>';
    echo '</div></section>';
    echo '<style>.ts-related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:14px}.ts-related-card{display:flex;flex-direction:column;gap:10px;padding:22px;border-radius:18px;border:1px solid var(--hf-line);background:var(--hf-card);color:var(--hf-ink);text-decoration:none;transition:border-color .15s,transform .15s}.ts-related-card:hover{border-color:var(--hf-orange);transform:translateY(-2px)}.ts-related-card small{color:var(--hf-orange);font-size:.64rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.ts-related-card strong{font-size:1.02rem;line-height:1.35;font-weight:800;text-wrap:balance}.ts-related-excerpt{color:var(--hf-text);font-size:.8rem;line-height:1.6;text-wrap:pretty}.ts-related-more{margin-top:auto;padding-top:6px;color:var(--hf-orange);font-size:.78rem;font-weight:800}.ts-related-all{margin:20px 0 0}.ts-related-all a{color:var(--hf-orange);font-weight:800;font-size:.85rem;text-decoration:none}</style>';
}
