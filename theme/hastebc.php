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
<script id="torcisao-haste-hubspot-unified-20260909">
(function(){
  const unifiedFormId = '8fdff701-c5a7-4684-9358-d557a70425a5';
  window.TORCISAO_HASTE_PAGE = window.TORCISAO_HASTE_PAGE || {};
  window.TORCISAO_HASTE_PAGE.formId = unifiedFormId;
  window.TORCISAO_HASTE_PAGE.formIds = { baixa: unifiedFormId, alta: unifiedFormId, conectores: unifiedFormId };

  function currentKind(){
    return document.querySelector('.hf-family-tab.is-active')?.dataset.hfKind || document.getElementById('haste-aterramento')?.dataset.initialKind || 'baixa';
  }
  function currentProduct(){
    const kind = currentKind();
    if(kind === 'alta') return 'Haste de Aterramento - Alta Camada (254 mícrons)';
    if(kind === 'conectores') return 'Conectores';
    return 'Haste de Aterramento - Baixa Camada (20 mícrons)';
  }
  function currentOrigin(){
    const kind = currentKind();
    if(kind === 'alta') return 'LP Haste | Alta Camada';
    if(kind === 'conectores') return 'LP Haste | Conectores';
    return 'LP Haste | Baixa Camada';
  }
  function currentConnector(){
    const key = document.querySelector('.hf-connector-btn.is-active')?.dataset.hfConnector || 'olhal-simples';
    return {
      'olhal-simples':'Olhal Simples',
      'olhal-reforcado':'Olhal Reforçado',
      'grampo-simples':'Grampo Tipo U - Simples',
      'grampo-reforcado':'Grampo Tipo U - Reforçado'
    }[key] || 'Olhal Simples';
  }
  function dispatch(field){
    field.dispatchEvent(new Event('input',{bubbles:true}));
    field.dispatchEvent(new Event('change',{bubbles:true}));
  }
  function setField(form,name,value){
    const fields = Array.from(form.querySelectorAll('[name="'+name+'"]'));
    if(!fields.length) return false;
    const choices = fields.filter(f => f.type === 'checkbox' || f.type === 'radio');
    if(choices.length){
      choices.forEach(f => {
        const shouldCheck = String(f.value) === String(value);
        if(f.checked !== shouldCheck){ f.checked = shouldCheck; dispatch(f); }
      });
    } else {
      fields.forEach(f => {
        if(String(f.value) !== String(value)){ f.value = value; dispatch(f); }
      });
    }
    return true;
  }
  function syncForm(){
    const form = document.querySelector('#hfQuoteForm form.hs-form, #hfQuoteForm form');
    if(!form) return;
    setField(form,'pagina_de_origem_do_lead',currentOrigin());
    setField(form,'produtos_de_interesse',currentProduct());
    if(currentKind() === 'conectores') setField(form,'modelo_do_conector',currentConnector());
  }
  function scheduleSync(){
    setTimeout(syncForm,40);
    setTimeout(syncForm,160);
    setTimeout(syncForm,450);
  }

  document.addEventListener('DOMContentLoaded',function(){
    const target = document.getElementById('hfQuoteForm');
    if(target){
      new MutationObserver(scheduleSync).observe(target,{childList:true,subtree:true});
    }
    document.querySelectorAll('.hf-family-tab,.hf-connector-btn,.js-hf-quote,#hfQuoteTab').forEach(el => el.addEventListener('click',scheduleSync));
    scheduleSync();
  });
})();
</script>
<?php
get_footer();