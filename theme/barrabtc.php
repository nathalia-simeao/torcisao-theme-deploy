<?php
/**
 * Template Name: Barra Trefilada
 * Página unificada da linha de barras trefiladas.
 */
$torcisao_barra_requested = isset($_GET['tipo']) ? sanitize_key(wp_unslash($_GET['tipo'])) : '';
$torcisao_barra_initial = in_array($torcisao_barra_requested, ['btc','mtc','atc','ressulfurado'], true) ? $torcisao_barra_requested : 'btc';
get_header();
get_template_part('template-parts/barra-family');
get_footer();
