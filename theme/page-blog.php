<?php
/**
 * Template Name: Blog
 *
 * @package Torcisao_Trefilados
 */
get_header();

$search_query = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';
$paged = get_query_var('paged') ? get_query_var('paged') : (get_query_var('page') ? get_query_var('page') : 1);
$args = ['post_type' => 'post', 'posts_per_page' => 6, 'paged' => $paged];
if ($search_query !== '') $args['s'] = $search_query;
$blog_query = new WP_Query($args);

$remote_posts = [];
$remote_categories = [];
$preview_home = (string) home_url('/');
$is_preview = (
    (function_exists('wp_get_environment_type') && wp_get_environment_type() === 'local') ||
    strpos($preview_home, 'localhost') !== false ||
    strpos($preview_home, '127.0.0.1') !== false
);

if ($is_preview && !$blog_query->have_posts()) {
    $remote_args = [
        'per_page' => 20,
        'status'   => 'publish',
        '_embed'   => 1,
    ];
    if ($search_query !== '') $remote_args['search'] = $search_query;

    $remote_url = add_query_arg($remote_args, 'https://torcisao.com.br/wp-json/wp/v2/posts');
    $response = wp_remote_get($remote_url, ['timeout' => 10]);
    if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
        $decoded = json_decode(wp_remote_retrieve_body($response), true);
        if (is_array($decoded)) $remote_posts = $decoded;
    }

    $cat_response = wp_remote_get(
        'https://torcisao.com.br/wp-json/wp/v2/categories?per_page=100&hide_empty=false',
        ['timeout' => 10]
    );
    if (!is_wp_error($cat_response) && wp_remote_retrieve_response_code($cat_response) === 200) {
        $decoded_cats = json_decode(wp_remote_retrieve_body($cat_response), true);
        if (is_array($decoded_cats)) {
            foreach ($decoded_cats as $category) {
                $link = $category['link'] ?? '';
                if ($link && strpos($link, '/en/') === false && strpos($link, '/es/') === false) {
                    $remote_categories[] = $category;
                }
            }
        }
    }
}

function tor_blog_remote_meta($post) {
    $title = wp_strip_all_tags($post['title']['rendered'] ?? '');
    $excerpt = wp_strip_all_tags($post['excerpt']['rendered'] ?? '');
    $link = $post['link'] ?? '#';
    $date = !empty($post['date']) ? date_i18n('d/m/Y', strtotime($post['date'])) : '';
    $author = $post['_embedded']['author'][0]['name'] ?? 'Torcisão';
    $thumb = '';
    if (!empty($post['_embedded']['wp:featuredmedia'][0]['source_url'])) {
        $thumb = $post['_embedded']['wp:featuredmedia'][0]['source_url'];
    }
    $cat = '';
    if (!empty($post['_embedded']['wp:term'])) {
        foreach ($post['_embedded']['wp:term'] as $terms) {
            if (!empty($terms[0]['taxonomy']) && $terms[0]['taxonomy'] === 'category') {
                $cat = $terms[0]['name'] ?? '';
                break;
            }
        }
    }
    return compact('title', 'excerpt', 'link', 'date', 'author', 'thumb', 'cat');
}
?>
<style>
.tor-blog-page{padding-top:118px;background:var(--th-bg,#f5f3f1);color:var(--th-ink,#18191b);min-height:70vh}.tor-blog-hero{padding:56px 0 38px;border-bottom:1px solid rgba(24,25,27,.08)}.tor-blog-container{width:min(1180px,calc(100% - 48px));margin:0 auto}.tor-blog-hero h1{margin:0;text-align:center;font-size:clamp(2.4rem,5vw,4.7rem);line-height:.98;font-weight:800;letter-spacing:-.05em}.tor-blog-hero p{text-align:center;color:#747a80;font-size:1.05rem;margin:18px 0 0}.tor-blog-search{max-width:640px;margin:30px auto 0;display:flex;background:#fff;border:1px solid rgba(24,25,27,.10);border-radius:999px;padding:6px;box-shadow:0 14px 35px rgba(24,25,27,.07)}.tor-blog-search input{flex:1;min-width:0;border:0;background:transparent;padding:0 18px;font:500 .95rem/1.2 Montserrat,sans-serif;outline:0;color:#18191b}.tor-blog-search button,.tor-blog-read{border:0;border-radius:999px;background:#ef7b30;color:#fff;font-weight:800;padding:14px 24px;text-decoration:none;cursor:pointer}.tor-blog-content{padding:52px 0 74px}.tor-blog-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(280px,.8fr);gap:36px}.tor-blog-main>h2{margin:0 0 26px;font-size:clamp(1.8rem,3vw,2.55rem);font-weight:800;letter-spacing:-.03em}.tor-blog-card{background:#fff;border:1px solid rgba(24,25,27,.09);border-radius:28px;overflow:hidden;margin-bottom:22px;box-shadow:0 16px 38px rgba(24,25,27,.06);transition:transform .2s ease,box-shadow .2s ease}.tor-blog-card:hover{transform:translateY(-3px);box-shadow:0 22px 50px rgba(24,25,27,.10)}.tor-blog-card--featured img{display:block;width:100%;height:340px;object-fit:cover}.tor-blog-card-body{padding:28px}.tor-blog-badge{display:inline-flex;border-radius:999px;background:#fff1e8;color:#ef6f21;font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:8px 11px}.tor-blog-card h3{margin:14px 0 8px;font-size:1.55rem;line-height:1.15;font-weight:800}.tor-blog-meta{font-size:.82rem;color:#7b8085}.tor-blog-summary{color:#5f656b;line-height:1.7}.tor-blog-card--compact{display:grid;grid-template-columns:230px minmax(0,1fr)}.tor-blog-card--compact img{width:100%;height:100%;min-height:210px;object-fit:cover}.tor-blog-link{display:inline-flex;color:#ef6f21;text-decoration:none;font-weight:800}.tor-blog-sidebox{background:#fff;border:1px solid rgba(24,25,27,.09);border-radius:24px;padding:24px;margin-bottom:20px}.tor-blog-sidebox h4{font-size:1.15rem;margin:0 0 14px;font-weight:800}.tor-blog-sidebox ul{list-style:none;margin:0;padding:0}.tor-blog-sidebox li+li{border-top:1px solid rgba(24,25,27,.08)}.tor-blog-sidebox a{display:block;padding:11px 0;color:#333;text-decoration:none;font-size:.9rem}.tor-blog-pagination ul{list-style:none;padding:0;display:flex;gap:8px;flex-wrap:wrap}.tor-blog-pagination a,.tor-blog-pagination span{display:grid;place-items:center;min-width:40px;height:40px;border-radius:999px;border:1px solid rgba(24,25,27,.12);text-decoration:none;color:inherit;padding:0 12px}.tor-blog-pagination .current{background:#ef7b30;color:#fff;border-color:#ef7b30}
html[data-bs-theme="dark"] .tor-blog-page{background:#101112;color:#f7f7f7}html[data-bs-theme="dark"] .tor-blog-card,html[data-bs-theme="dark"] .tor-blog-sidebox,html[data-bs-theme="dark"] .tor-blog-search{background:#1c1d1f;border-color:rgba(255,255,255,.1)}html[data-bs-theme="dark"] .tor-blog-search input{color:#fff}html[data-bs-theme="dark"] .tor-blog-summary,html[data-bs-theme="dark"] .tor-blog-meta,html[data-bs-theme="dark"] .tor-blog-hero p{color:#b9bec3}html[data-bs-theme="dark"] .tor-blog-sidebox a{color:#eee}
@media(max-width:900px){.tor-blog-page{padding-top:96px}.tor-blog-grid{grid-template-columns:1fr}.tor-blog-card--compact{grid-template-columns:160px minmax(0,1fr)}}@media(max-width:620px){.tor-blog-container{width:min(100% - 28px,1180px)}.tor-blog-hero{padding:38px 0 30px}.tor-blog-search{margin-top:22px}.tor-blog-search button{padding:13px 18px}.tor-blog-card--featured img{height:220px}.tor-blog-card--compact{grid-template-columns:1fr}.tor-blog-card--compact img{height:190px}.tor-blog-card-body{padding:21px}.tor-blog-content{padding-top:34px}}
</style>
<main class="tor-blog-page">
<section class="tor-blog-hero"><div class="tor-blog-container"><h1>Blog Torcisão - Inovação e Qualidade</h1><p>Acompanhe as últimas tendências e novidades do setor.</p><form class="tor-blog-search" role="search" method="get" action="<?php echo esc_url(home_url('/blog/')); ?>"><input type="text" name="s" placeholder="Buscar por palavra-chave..." aria-label="Buscar" value="<?php echo esc_attr($search_query); ?>"><button type="submit">Buscar</button></form></div></section>
<section class="tor-blog-content"><div class="tor-blog-container"><div class="tor-blog-grid"><div class="tor-blog-main"><h2><?php echo $search_query!==''?'Resultados para: “'.esc_html($search_query).'”':'Artigos Mais Recentes'; ?></h2>
<?php if($blog_query->have_posts()): $post_index=0; while($blog_query->have_posts()): $blog_query->the_post(); $categories=get_the_category();$cat_name=!empty($categories)?$categories[0]->name:'';$thumb=get_the_post_thumbnail_url(get_the_ID(),'large');$fallback=get_template_directory_uri().'/assets/barra2.webp'; if($post_index===0&&$search_query===''): ?>
<article class="tor-blog-card tor-blog-card--featured"><img src="<?php echo esc_url($thumb?:$fallback); ?>" alt="<?php the_title_attribute(); ?>"><div class="tor-blog-card-body"><?php if($cat_name): ?><span class="tor-blog-badge"><?php echo esc_html(mb_strtoupper($cat_name)); ?></span><?php endif; ?><h3><?php the_title(); ?></h3><p class="tor-blog-meta">Publicado em <?php echo get_the_date('d/m/Y'); ?> por <?php the_author(); ?></p><p class="tor-blog-summary"><?php echo esc_html(wp_trim_words(get_the_excerpt(),30)); ?></p><a class="tor-blog-read" href="<?php the_permalink(); ?>">Leia o Artigo Completo</a></div></article>
<?php else: ?><article class="tor-blog-card tor-blog-card--compact"><img src="<?php echo esc_url($thumb?:$fallback); ?>" alt="<?php the_title_attribute(); ?>"><div class="tor-blog-card-body"><?php if($cat_name): ?><span class="tor-blog-badge"><?php echo esc_html(mb_strtoupper($cat_name)); ?></span><?php endif; ?><h3><?php the_title(); ?></h3><p class="tor-blog-meta">Publicado em <?php echo get_the_date('d/m/Y'); ?> por <?php the_author(); ?></p><p class="tor-blog-summary"><?php echo esc_html(wp_trim_words(get_the_excerpt(),20)); ?></p><a class="tor-blog-link" href="<?php the_permalink(); ?>">Continuar Lendo →</a></div></article><?php endif; $post_index++; endwhile; ?>
<nav class="tor-blog-pagination" aria-label="Navegação de páginas do blog"><?php echo paginate_links(['total'=>$blog_query->max_num_pages,'current'=>$paged,'prev_text'=>'← Anterior','next_text'=>'Próxima →','type'=>'list']); ?></nav>
<?php elseif($remote_posts): $fallback=get_template_directory_uri().'/assets/barra2.webp'; foreach($remote_posts as $post_index=>$remote): $m=tor_blog_remote_meta($remote); $featured=$post_index===0&&$search_query===''; ?>
<article class="tor-blog-card <?php echo $featured?'tor-blog-card--featured':'tor-blog-card--compact'; ?>"><img src="<?php echo esc_url($m['thumb']?:$fallback); ?>" alt="<?php echo esc_attr($m['title']); ?>"><div class="tor-blog-card-body"><?php if($m['cat']): ?><span class="tor-blog-badge"><?php echo esc_html(mb_strtoupper($m['cat'])); ?></span><?php endif; ?><h3><?php echo esc_html($m['title']); ?></h3><p class="tor-blog-meta">Publicado em <?php echo esc_html($m['date']); ?> por <?php echo esc_html($m['author']); ?></p><p class="tor-blog-summary"><?php echo esc_html(wp_trim_words($m['excerpt'],$featured?30:20)); ?></p><a class="<?php echo $featured?'tor-blog-read':'tor-blog-link'; ?>" href="<?php echo esc_url($m['link']); ?>" target="_blank" rel="noopener"><?php echo $featured?'Leia o Artigo Completo':'Continuar Lendo →'; ?></a></div></article>
<?php endforeach; else: ?><p>Nenhum artigo encontrado<?php echo $search_query!==''?' para “'.esc_html($search_query).'”':''; ?>.</p><?php endif; wp_reset_postdata(); ?></div>
<aside class="tor-blog-sidebar"><div class="tor-blog-sidebox"><h4>Categorias</h4><ul>
<?php if($is_preview && $remote_categories): foreach($remote_categories as $category): ?><li><a href="<?php echo esc_url($category['link'] ?? 'https://torcisao.com.br/blog/'); ?>" target="_blank" rel="noopener"><?php echo esc_html($category['name'] ?? ''); ?> (<?php echo intval($category['count'] ?? 0); ?>)</a></li><?php endforeach; else: $cats=get_categories(['orderby'=>'count','order'=>'DESC','hide_empty'=>false]); foreach($cats as $category): ?><li><a href="<?php echo esc_url(get_category_link($category->term_id)); ?>"><?php echo esc_html($category->name); ?> (<?php echo intval($category->count); ?>)</a></li><?php endforeach; endif; ?>
</ul></div><div class="tor-blog-sidebox"><h4>Mais Lidos</h4><ul><?php $popular=new WP_Query(['post_type'=>'post','posts_per_page'=>3,'orderby'=>'comment_count','order'=>'DESC']);if($popular->have_posts()){while($popular->have_posts()):$popular->the_post();?><li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li><?php endwhile;wp_reset_postdata();}elseif($remote_posts){foreach(array_slice($remote_posts,0,3) as $remote){$m=tor_blog_remote_meta($remote);echo '<li><a href="'.esc_url($m['link']).'" target="_blank" rel="noopener">'.esc_html($m['title']).'</a></li>';}} ?></ul></div></aside>
</div></div></section></main>
<?php get_footer(); ?>