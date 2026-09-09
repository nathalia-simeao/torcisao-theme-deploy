<?php
/**
 * Template Name: Haste de Aterramento
 * Unified page for Baixa Camada, Alta Camada and Conectores.
 */
$torcisao_haste_requested = isset($_GET['tipo']) ? sanitize_key(wp_unslash($_GET['tipo'])) : '';
$torcisao_haste_initial = in_array($torcisao_haste_requested, ['baixa','alta','conectores'], true) ? $torcisao_haste_requested : 'baixa';
get_header();
get_template_part('template-parts/haste-family');
?>
<script id="torcisao-haste-hubspot-unified-20260909d">
(function(){
  const unifiedFormId = '8fdff701-c5a7-4684-9358-d557a70425a5';
  window.TORCISAO_HASTE_PAGE = window.TORCISAO_HASTE_PAGE || {};
  window.TORCISAO_HASTE_PAGE.formId = unifiedFormId;
  window.TORCISAO_HASTE_PAGE.formIds = {
    baixa: unifiedFormId,
    alta: unifiedFormId,
    conectores: unifiedFormId
  };
})();
</script>
<?php
get_footer();
