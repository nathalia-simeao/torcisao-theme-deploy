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
<script id="torcisao-haste-hubspot-unified-20260910a">
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
<?php if (in_array($torcisao_haste_lang, ['en','es'], true)) : ?>
<script defer src="<?php echo esc_url(get_template_directory_uri() . '/assets/torcisao-haste-i18n-v42.js'); ?>?v=20260910-1"></script>
<?php endif; ?>
<?php if ($torcisao_haste_lang === 'en') : ?>
<script id="torcisao-haste-form-i18n-en-test-20260910">
(function(){
  'use strict';

  const exact = new Map([
    ['Nome', 'Name'],
    ['Empresa', 'Company'],
    ['E-mail', 'Email'],
    ['Contato / WhatsApp', 'Contact / WhatsApp'],
    ['O que deseja cotar?', 'What would you like to quote?'],
    ['Baixa Camada', 'Low Coating'],
    ['Alta Camada', 'High Coating'],
    ['Conectores', 'Connectors'],
    ['Diâmetro - Haste Baixa Camada', 'Diameter - Low Coating Grounding Rod'],
    ['Comprimento - Haste Baixa Camada', 'Length - Low Coating Grounding Rod'],
    ['Quantidade de Peças - Baixa Camada', 'Quantity - Low Coating'],
    ['Diâmetro - Haste Alta Camada', 'Diameter - High Coating Grounding Rod'],
    ['Comprimento - Haste Alta Camada', 'Length - High Coating Grounding Rod'],
    ['Quantidade de Peças - Alta Camada', 'Quantity - High Coating'],
    ['Modelo do Conector', 'Connector Model'],
    ['Quantidade de Peças - Conectores', 'Connector Quantity'],
    ['Olhal Simples', 'Simple Eyelet'],
    ['Olhal Reforçado', 'Reinforced Eyelet'],
    ['Grampo Tipo U - Simples', 'Simple U Clamp'],
    ['Grampo Tipo U - Reforçado', 'Reinforced U Clamp'],
    ['Sob Consulta', 'On request'],
    ['Política de Cookies', 'Cookie Policy'],
    ['Política de Privacidade', 'Privacy Policy'],
    ['Enviar', 'Submit'],
    ['Preencha este campo obrigatório.', 'Please complete this required field.'],
    ['Insira um endereço de e-mail válido.', 'Please enter a valid email address.'],
    ['Insira um número de telefone válido.', 'Please enter a valid phone number.'],
    ['Selecione pelo menos uma opção.', 'Please select at least one option.']
  ]);

  const fragments = [
    ['Ao marcar as caixas abaixo, você concorda em receber comunicações da Torcisão Trefilados. Você pode cancelar a inscrição a qualquer momento.', 'By checking the boxes below, you agree to receive communications from Torcisão Trefilados. You can unsubscribe at any time.'],
    ['Para podermos responder à sua solicitação e enviar seu orçamento, precisamos do seu consentimento para armazenar e processar seus dados, de acordo com a nossa', 'To respond to your request and send your quotation, we need your consent to store and process your data in accordance with our'],
    ['Eu li e concordo com a', 'I have read and agree to the'],
    ['da Torcisão Trefilados e autorizo o processamento dos meus dados.', 'of Torcisão Trefilados and authorize the processing of my data.'],
    ['1.000 mm - Sob Consulta', '1,000 mm - On request'],
    ['2.000 mm - Sob Consulta', '2,000 mm - On request']
  ];

  function translateText(text){
    const trimmed = text.trim();
    if (!trimmed) return text;
    if (exact.has(trimmed)) {
      return text.replace(trimmed, exact.get(trimmed));
    }
    let out = text;
    fragments.forEach(([from,to]) => { out = out.split(from).join(to); });
    return out;
  }

  function translateForm(form){
    if (!form) return;
    const walker = document.createTreeWalker(form, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const translated = translateText(node.nodeValue || '');
      if (translated !== node.nodeValue) node.nodeValue = translated;
    });

    form.querySelectorAll('input[type="submit"],button[type="submit"]').forEach(button => {
      if (button.tagName === 'INPUT') button.value = 'Submit';
      else if ((button.textContent || '').trim() === 'Enviar') button.textContent = 'Submit';
    });

    form.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(field => {
      const translated = translateText(field.getAttribute('placeholder') || '');
      field.setAttribute('placeholder', translated);
    });
  }

  function boot(){
    const target = document.getElementById('hfQuoteForm');
    if (!target) return;
    const run = () => {
      const form = target.querySelector('form.hs-form, form');
      if (form) translateForm(form);
    };
    new MutationObserver(run).observe(target,{childList:true,subtree:true,characterData:true});
    run();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
</script>
<?php endif; ?>
<?php if ($torcisao_haste_lang === 'es') : ?>
<script defer src="<?php echo esc_url(get_template_directory_uri() . '/assets/torcisao-haste-form-es-v43.js'); ?>?v=20260910-1"></script>
<?php endif; ?>
<?php
get_footer();
