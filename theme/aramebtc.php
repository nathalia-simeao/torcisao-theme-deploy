<?php
/**
 * Template Name: Arame Trefilado
 * Página unificada da linha de arames trefilados.
 */
$torcisao_arame_requested = isset($_GET['tipo']) ? sanitize_key(wp_unslash($_GET['tipo'])) : '';
$torcisao_arame_initial = in_array($torcisao_arame_requested, ['btc','mtc','atc'], true) ? $torcisao_arame_requested : 'btc';
get_header();
get_template_part('template-parts/arame-family');
get_footer();
