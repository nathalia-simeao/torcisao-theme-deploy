<?php
/**
 * Template editorial para matérias do Blog Torcisão.
 * Mantém o conteúdo 100% editável pelo editor padrão do WordPress.
 *
 * @package Torcisao_Trefilados
 */
get_header();

$lang = function_exists('torcisao_request_language') ? torcisao_request_language() : 'pt';
$copy = [
    'pt' => [
        'back'=>'Voltar para o blog','fallback_badge'=>'Conteúdo Torcisão','reading'=>'min de leitura','share'=>'Compartilhar','share_aria'=>'Compartilhar matéria','copy_link'=>'Copiar link','tags'=>'Tags da matéria','technical'=>'Conteúdo técnico','validate'=>'Precisa validar uma aplicação ou especificação?','specialist'=>'Falar com especialista','nav'=>'Navegação entre matérias','prev'=>'Matéria anterior','next'=>'Próxima matéria','keep'=>'Continue lendo','more'=>'Mais conteúdos Torcisão','all'=>'Ver todos','step'=>'Próximo passo','cta_title'=>'Do conteúdo para a especificação certa.','cta_text'=>'Converse com a equipe Torcisão para organizar aplicação, bitola, aço e demais requisitos do seu projeto.','wa'=>'Olá! Li a matéria “%s” no Blog da Torcisão e gostaria de falar com um especialista.'
    ],
    'en' => [
        'back'=>'Back to the blog','fallback_badge'=>'Torcisão Content','reading'=>'min read','share'=>'Share','share_aria'=>'Share article','copy_link'=>'Copy link','tags'=>'Article tags','technical'=>'Technical content','validate'=>'Need to validate an application or specification?','specialist'=>'Talk to a specialist','nav'=>'Article navigation','prev'=>'Previous article','next'=>'Next article','keep'=>'Keep reading','more'=>'More Torcisão content','all'=>'View all','step'=>'Next step','cta_title'=>'From content to the right specification.','cta_text'=>'Talk to the Torcisão team to organize application, diameter, steel grade, and other project requirements.','wa'=>'Hello! I read the article “%s” on the Torcisão Blog and would like to speak with a specialist.'
    ],
    'es' => [
        'back'=>'Volver al blog','fallback_badge'=>'Contenido Torcisão','reading'=>'min de lectura','share'=>'Compartir','share_aria'=>'Compartir artículo','copy_link'=>'Copiar enlace','tags'=>'Etiquetas del artículo','technical'=>'Contenido técnico','validate'=>'¿Necesitas validar una aplicación o especificación?','specialist'=>'Hablar con un especialista','nav'=>'Navegación entre artículos','prev'=>'Artículo anterior','next'=>'Siguiente artículo','keep'=>'Sigue leyendo','more'=>'Más contenidos Torcisão','all'=>'Ver todos','step'=>'Siguiente paso','cta_title'=>'Del contenido a la especificación correcta.','cta_text'=>'Habla con el equipo Torcisão para organizar aplicación, diámetro, acero y demás requisitos del proyecto.','wa'=>'¡Hola! Leí el artículo “%s” en el Blog de Torcisão y me gustaría hablar con un especialista.'
    ],
];
$t = $copy[$lang] ?? $copy['pt'];

while (have_posts()) : the_post();
    $post_id   = get_the_ID();
    $title     = get_the_title();
    $permalink = get_permalink();
    $categories = get_the_category();
    $primary_category = !empty($categories) ? $categories[0] : null;
    $excerpt = trim((string) get_the_excerpt());
    if ($excerpt === '') {
        $excerpt = wp_trim_words(wp_strip_all_tags(strip_shortcodes(get_the_content())), 34, '…');
    }
    $plain_content = wp_strip_all_tags(strip_shortcodes(get_the_content()));
    $word_count = str_word_count(remove_accents($plain_content));
    $reading_minutes = max(1, (int) ceil($word_count / 210));
    $thumb_id = get_post_thumbnail_id($post_id);
    $thumb_caption = $thumb_id ? wp_get_attachment_caption($thumb_id) : '';
    $share_url = rawurlencode($permalink);
    $share_title = rawurlencode($title);
    $whatsapp = 'https://wa.me/551123349989?text=' . rawurlencode(sprintf($t['wa'], $title));
?>
<link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri() . '/assets/torcisao-blog-single-v41.css'); ?>?v=20260908-2">
<main class="tor-article" id="conteudo">
    <header class="tor-article-head">
        <div class="tor-article-shell">
            <a class="tor-article-back" href="<?php echo esc_url(home_url('/blog/')); ?>"><i class="bi bi-arrow-left"></i> <?php echo esc_html($t['back']); ?></a>
            <div class="tor-article-head-inner">
                <div class="tor-article-kicker">
                    <?php if ($primary_category) : ?>
                        <a class="tor-article-badge" href="<?php echo esc_url(get_category_link($primary_category->term_id)); ?>"><?php echo esc_html($primary_category->name); ?></a>
                    <?php else : ?>
                        <span class="tor-article-badge"><?php echo esc_html($t['fallback_badge']); ?></span>
                    <?php endif; ?>
                </div>
                <h1><?php echo esc_html($title); ?></h1>
                <?php if ($excerpt) : ?><p class="tor-article-dek"><?php echo esc_html($excerpt); ?></p><?php endif; ?>
                <div class="tor-article-meta">
                    <span class="tor-article-author"><i class="bi bi-person-circle"></i> <?php echo esc_html(get_the_author()); ?></span>
                    <span><i class="bi bi-calendar3"></i> <?php echo esc_html(get_the_date('d/m/Y')); ?></span>
                    <span><i class="bi bi-clock"></i> <?php echo esc_html($reading_minutes . ' ' . $t['reading']); ?></span>
                </div>
            </div>
        </div>
    </header>

    <?php if (has_post_thumbnail()) : ?>
        <figure class="tor-article-hero">
            <div class="tor-article-hero-frame"><?php the_post_thumbnail('full', ['loading'=>'eager','decoding'=>'async']); ?></div>
            <?php if ($thumb_caption) : ?><figcaption><?php echo esc_html($thumb_caption); ?></figcaption><?php endif; ?>
        </figure>
    <?php endif; ?>

    <div class="tor-article-shell tor-article-layout">
        <aside class="tor-article-rail tor-article-rail--left" aria-label="<?php echo esc_attr($t['share_aria']); ?>">
            <div class="tor-article-sticky">
                <span class="tor-article-rail-label"><?php echo esc_html($t['share']); ?></span>
                <div class="tor-article-share">
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo esc_attr($share_url); ?>" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                    <a href="https://wa.me/?text=<?php echo esc_attr($share_title . '%20' . $share_url); ?>" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
                    <button type="button" id="torCopyArticleLink" data-url="<?php echo esc_url($permalink); ?>" aria-label="<?php echo esc_attr($t['copy_link']); ?>"><i class="bi bi-link-45deg"></i></button>
                </div>
                <div class="tor-article-progress" aria-hidden="true"><span id="torArticleProgress"></span></div>
            </div>
        </aside>

        <article class="tor-article-content" id="torArticleBody">
            <?php the_content(); ?>
            <?php if (get_the_tags()) : ?>
                <div class="tor-article-tags" aria-label="<?php echo esc_attr($t['tags']); ?>"><?php the_tags('', '', ''); ?></div>
            <?php endif; ?>
        </article>

        <aside class="tor-article-rail tor-article-rail--right">
            <div class="tor-article-sticky">
                <div class="tor-article-aside-card">
                    <small><?php echo esc_html($t['technical']); ?></small>
                    <strong><?php echo esc_html($t['validate']); ?></strong>
                    <a href="<?php echo esc_url($whatsapp); ?>" target="_blank" rel="noopener"><?php echo esc_html($t['specialist']); ?> <i class="bi bi-arrow-up-right"></i></a>
                </div>
            </div>
        </aside>
    </div>

    <section class="tor-article-after">
        <div class="tor-article-shell">
            <?php
            $prev = get_previous_post();
            $next = get_next_post();
            if ($prev || $next) :
            ?>
                <nav class="tor-article-nav" aria-label="<?php echo esc_attr($t['nav']); ?>">
                    <?php if ($prev) : ?><a href="<?php echo esc_url(get_permalink($prev)); ?>"><small><?php echo esc_html($t['prev']); ?></small><strong><?php echo esc_html(get_the_title($prev)); ?></strong></a><?php else : ?><span></span><?php endif; ?>
                    <?php if ($next) : ?><a href="<?php echo esc_url(get_permalink($next)); ?>"><small><?php echo esc_html($t['next']); ?></small><strong><?php echo esc_html(get_the_title($next)); ?></strong></a><?php endif; ?>
                </nav>
            <?php endif; ?>

            <?php
            $related_args = [
                'post_type'           => 'post',
                'post_status'         => 'publish',
                'posts_per_page'      => 3,
                'post__not_in'        => [$post_id],
                'ignore_sticky_posts' => true,
            ];
            if ($primary_category) $related_args['cat'] = $primary_category->term_id;
            $related = new WP_Query($related_args);
            if (!$related->have_posts() && $primary_category) {
                unset($related_args['cat']);
                $related = new WP_Query($related_args);
            }
            if ($related->have_posts()) :
            ?>
                <div class="tor-article-related-head"><div><span><?php echo esc_html($t['keep']); ?></span><h2><?php echo esc_html($t['more']); ?></h2></div><a href="<?php echo esc_url(home_url('/blog/')); ?>"><?php echo esc_html($t['all']); ?> <i class="bi bi-arrow-right"></i></a></div>
                <div class="tor-article-related-grid">
                    <?php while ($related->have_posts()) : $related->the_post(); ?>
                        <article class="tor-related-card"><a href="<?php the_permalink(); ?>">
                            <?php if (has_post_thumbnail()) : the_post_thumbnail('medium_large', ['loading'=>'lazy','decoding'=>'async']); else : ?><span></span><?php endif; ?>
                            <div class="tor-related-card-body"><small><?php echo esc_html(get_the_date('d.m.Y')); ?></small><h3><?php the_title(); ?></h3></div>
                        </a></article>
                    <?php endwhile; wp_reset_postdata(); ?>
                </div>
            <?php endif; ?>

            <div class="tor-article-cta">
                <div><small><?php echo esc_html($t['step']); ?></small><h3><?php echo esc_html($t['cta_title']); ?></h3><p><?php echo esc_html($t['cta_text']); ?></p></div>
                <a href="<?php echo esc_url($whatsapp); ?>" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i>&nbsp; <?php echo esc_html($t['specialist']); ?></a>
            </div>
        </div>
    </section>
</main>
<script>
(function(){
  const bar=document.getElementById('torArticleProgress'),body=document.getElementById('torArticleBody'),copy=document.getElementById('torCopyArticleLink');
  function progress(){if(!bar||!body)return;const r=body.getBoundingClientRect(),start=window.scrollY+r.top,end=start+body.offsetHeight-window.innerHeight;const p=end<=start?1:Math.max(0,Math.min(1,(window.scrollY-start)/Math.max(1,end-start)));bar.style.height=(p*100)+'%';}
  addEventListener('scroll',progress,{passive:true});addEventListener('resize',progress);progress();
  copy?.addEventListener('click',async function(){try{await navigator.clipboard.writeText(this.dataset.url||location.href);const icon=this.querySelector('i');if(icon){icon.className='bi bi-check2';setTimeout(()=>icon.className='bi bi-link-45deg',1600)}}catch(e){}}
})();
</script>
<?php endwhile; get_footer(); ?>
