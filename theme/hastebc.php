<?php
/**
 * Template Name: Haste de Aterramento
 * Unified page for Baixa Camada, Alta Camada and Conectores.
 */
$torcisao_haste_requested = isset($_GET['tipo']) ? sanitize_key(wp_unslash($_GET['tipo'])) : '';
$torcisao_haste_initial = in_array($torcisao_haste_requested, ['baixa','alta','conectores'], true) ? $torcisao_haste_requested : 'baixa';
$torcisao_haste_lang = function_exists('torcisao_request_language') ? torcisao_request_language() : 'pt';
get_header();
get_template_part('template-parts/haste-family');
?>
<script id="torcisao-haste-hubspot-unified-20260910c">
(function(){
  'use strict';
  const unifiedFormId = '8fdff701-c5a7-4684-9358-d557a70425a5';
  const unifiedFormIds = Object.freeze({
    baixa: unifiedFormId,
    alta: unifiedFormId,
    conectores: unifiedFormId
  });
  const cfg = window.TORCISAO_HASTE_PAGE = window.TORCISAO_HASTE_PAGE || {};
  cfg.portalId = '50818463';

  try {
    Object.defineProperty(cfg, 'formId', {
      configurable: false,
      enumerable: true,
      get: function(){ return unifiedFormId; },
      set: function(){}
    });
    Object.defineProperty(cfg, 'formIds', {
      configurable: false,
      enumerable: true,
      get: function(){ return unifiedFormIds; },
      set: function(){}
    });
  } catch (e) {
    cfg.formId = unifiedFormId;
    cfg.formIds = unifiedFormIds;
  }
})();
</script>
<script defer src="<?php echo esc_url(get_template_directory_uri() . '/assets/torcisao-haste-form-router-v44.js'); ?>?v=20260910-1334"></script>
<script defer src="<?php echo esc_url(get_template_directory_uri() . '/assets/torcisao-haste-form-i18n-v45.js'); ?>?v=20260910-1408"></script>
<?php if (in_array($torcisao_haste_lang, ['en','es'], true)) : ?>
<script defer src="<?php echo esc_url(get_template_directory_uri() . '/assets/torcisao-haste-i18n-v42.js'); ?>?v=20260910-1"></script>
<?php endif; ?>
<?php
get_footer();
