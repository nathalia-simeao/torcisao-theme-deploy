<?php
/**
 * Template Name: Política de Qualidade
 *
 * @package Torcisao_Trefilados
 */

get_header();
?>

<style>
    /* ============================================================
       AJUSTES DO BANNER (FAIXA SUPERIOR)
       ============================================================ */
    .banner-ajustado {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        padding-top: 30px !important;
        padding-bottom: 30px !important;
        background-color: #ff6600;
        position: relative;
        z-index: 1;
    }
    
    .banner-ajustado .page-main-title {
        margin: 0 !important; 
        color: #ffffff;
        text-align: center;
        font-size: 1.5rem !important;
        line-height: 1.25;
    }

    /* Modo Noturno */
    [data-bs-theme="dark"] .banner-ajustado {
        background-color: #e0e0e0 !important;
    }
    [data-bs-theme="dark"] .banner-ajustado .page-main-title {
        color: #ff6600 !important;
    }
    
    .pagina-institucional {
        margin-top: 0 !important;
        padding-top: 138px !important;
    }

    /* ============================================================
       ANIMAÇÃO T-O-R-C-I-S-Ã-O
       ============================================================ */
    .politica-qualidade-container { padding-top: 40px; }
    
    .torcisao-grid-wrapper {
        display: flex;
        justify-content: flex-start;
        padding-left: 10%;
    }
    
    .lista-torcisao { list-style: none; padding: 0; margin: 0; }
    
    .politica-item { 
        cursor: pointer; 
        margin-bottom: 25px; 
        display: flex; 
        align-items: center; 
        position: relative; 
    }
    
    /* ============================================================
       LETRA SVG: CONTORNO APENAS POR FORA (USANDO MÁSCARAS)
       Cores correndo: #2C292A, #606060, #E7E5E3, #F47C38
       ============================================================ */
    .texto-letra { 
        width: 60px; 
        height: 60px;
        display: inline-block; 
        transition: transform 0.3s;
        vertical-align: middle;
    }
    
    .texto-letra .letra-svg {
        width: 100%;
        height: 100%;
        overflow: visible;
        display: block;
    }
    
    .texto-letra .letra-svg text {
        font-size: 48px;
        font-weight: 700;
        font-family: inherit;
    }
    
    /* Camada do preenchimento — laranja sólido */
    .texto-letra .letra-fill {
        fill: #ff6600;
        stroke: none;
    }
    
    /* Camada do contorno — só borda, mascarada pra aparecer só por fora */
    .texto-letra .letra-stroke {
        fill: none;
        stroke: url(#grad-torcisao-correndo);
        stroke-width: 4; /* 4px de stroke total = 2px visíveis por fora */
        stroke-linejoin: round;
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    /* Texto usado como máscara (esconde a parte interna do stroke) */
    .texto-letra .letra-mask-text {
        fill: black;
        stroke: none;
    }
    
    /* No hover: zoom leve + contorno colorido aparece */
    .politica-item:hover .texto-letra { 
        transform: scale(1.1);
    }
    
    .politica-item:hover .texto-letra .letra-stroke {
        opacity: 1;
    }
    
    /* ============================================================
       FRASE QUE APARECE AO LADO
       ============================================================ */
    .frase-hover {
        position: absolute;
        left: 70px; 
        top: 50%;
        transform: translateY(-50%); 
        background: rgba(255, 102, 0, 0.1);
        padding: 5px 15px;
        border-radius: 20px;
        border-left: 4px solid #ff6600;
        font-weight: 500;
        color: var(--bs-body-color);
        white-space: nowrap;
        pointer-events: none;
        z-index: 100;
    }

    .frase-fixa { display: block; }

    @media (max-width: 768px) {
        .pagina-institucional { padding-top: 106px !important; }
        .banner-ajustado { margin-top: 0 !important; padding-top: 24px !important; padding-bottom: 24px !important; }
        .banner-ajustado .page-main-title { font-size: 1.15rem !important; padding: 0 18px; }
        .torcisao-grid-wrapper { padding-left: 4%; }
        .frase-hover { position: static; transform: none; margin-left: 10px; white-space: normal; }
    }
</style>

<!-- SVG escondido com a definição do gradiente animado (cores correndo) -->
<svg width="0" height="0" style="position:absolute;">
    <defs>
        <linearGradient id="grad-torcisao-correndo" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#2C292A">
                <animate attributeName="offset" values="-1;0;1" dur="3s" repeatCount="indefinite"/>
            </stop>
            <stop offset="33%" stop-color="#606060">
                <animate attributeName="offset" values="-0.66;0.33;1.33" dur="3s" repeatCount="indefinite"/>
            </stop>
            <stop offset="66%" stop-color="#E7E5E3">
                <animate attributeName="offset" values="-0.33;0.66;1.66" dur="3s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stop-color="#F47C38">
                <animate attributeName="offset" values="0;1;2" dur="3s" repeatCount="indefinite"/>
            </stop>
        </linearGradient>
    </defs>
</svg>

<main class="pagina-institucional">
    <div class="page-header-doc banner-ajustado"> 
        <div class="container">
            <h1 class="page-main-title fw-bold">
                Passe o mouse em cima da letra e leia a nossa Política de Qualidade
            </h1>
        </div>
    </div>

    <section class="politica-qualidade-container py-5">
        <div class="container">
            <div class="torcisao-grid-wrapper"> 
                <ul class="lista-torcisao">
                    <?php
                    $politica_itens = [
                        ['T','odos compromissados permanentemente com:','T1'],
                        ['O','bservação criteriosa das necessidades dos clientes.','O1'],
                        ['R','enovação e adequação constantes de nossos processos.','R1'],
                        ['C','umprir prazos, mantendo a qualidade.','C1'],
                        ['I','nvestir na melhoria continua do sistema de qualidade.','I1'],
                        ['S','atisfação dos clientes garantindo uma parceria confiável.','S1'],
                        ['Ã','mbiente de trabalho agradável.','A1'],
                        ['O','bjetificar cada vez mais ações e negociações eficazes.','O2'],
                    ];
                    foreach ($politica_itens as [$letra,$texto,$mask]) : ?>
                    <li class="politica-item" data-letra="<?php echo esc_attr($letra); ?>" data-texto="<?php echo esc_attr($texto); ?>">
                        <span class="texto-letra">
                            <svg viewBox="0 0 60 60" class="letra-svg">
                                <defs>
                                    <mask id="mask-letra-<?php echo esc_attr($mask); ?>">
                                        <rect width="100%" height="100%" fill="white"/>
                                        <text x="30" y="48" text-anchor="middle" class="letra-mask-text"><?php echo esc_html($letra); ?></text>
                                    </mask>
                                </defs>
                                <text x="30" y="48" text-anchor="middle" class="letra-stroke" mask="url(#mask-letra-<?php echo esc_attr($mask); ?>)"><?php echo esc_html($letra); ?></text>
                                <text x="30" y="48" text-anchor="middle" class="letra-fill"><?php echo esc_html($letra); ?></text>
                            </svg>
                        </span>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </section>
</main>

<script>
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.politica-item').forEach(function(item){
    const show=function(){
      let frase=item.querySelector('.frase-hover');
      if(!frase){
        frase=document.createElement('span');
        frase.className='frase-hover';
        frase.textContent=item.dataset.texto || '';
        item.appendChild(frase);
      }
    };
    const hide=function(){ const frase=item.querySelector('.frase-hover'); if(frase) frase.remove(); };
    item.addEventListener('mouseenter',show);
    item.addEventListener('mouseleave',hide);
    item.addEventListener('focusin',show);
    item.addEventListener('focusout',hide);
    item.addEventListener('click',function(){ const frase=item.querySelector('.frase-hover'); frase ? hide() : show(); });
  });
});
</script>

<?php get_footer(); ?>