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
<style id="torcisao-haste-hubspot-controller-hide-20260909">
/* Produtos de Interesse precisa existir como campo normal no HubSpot para a lógica
   dependente funcionar. A LP o esconde visualmente e preenche nos bastidores. */
#hfQuoteForm .hs_produtos_de_interesse,
#hfQuoteForm .hs-produtos_de_interesse {
  display: none !important;
}
</style>
<script id="torcisao-haste-hubspot-unified-20260909c">
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
  function normalize(v){ return String(v || '').trim().toLowerCase(); }
  function emit(field){
    if(window.jQuery){
      window.jQuery(field).trigger('input').trigger('change');
    } else {
      field.dispatchEvent(new Event('input',{bubbles:true}));
      field.dispatchEvent(new Event('change',{bubbles:true}));
    }
  }
  function findFields(form,name){
    let fields = Array.from(form.querySelectorAll('[name="'+name+'"],[name="'+name+'[]"]'));
    if(fields.length) return fields;
    const wrap = form.querySelector('.hs_'+name+', .hs-'+name);
    return wrap ? Array.from(wrap.querySelectorAll('input,select,textarea')) : [];
  }
  function setField(form,name,value){
    const fields = findFields(form,name);
    if(!fields.length) return false;
    const choices = fields.filter(f => f.type === 'checkbox' || f.type === 'radio');
    if(choices.length){
      choices.forEach(f => {
        const label = f.closest('label')?.textContent || '';
        const on = normalize(f.value) === normalize(value) || normalize(label).includes(normalize(value));
        f.checked = on;
      });
      choices.forEach(emit);
      return true;
    }
    fields.forEach(f => {
      f.value = value;
      emit(f);
    });
    return true;
  }
  function hideController(form){
    const field = findFields(form,'produtos_de_interesse')[0];
    const wrapper = field?.closest('.hs-form-field') || form.querySelector('.hs_produtos_de_interesse,.hs-produtos_de_interesse');
    if(wrapper) wrapper.style.setProperty('display','none','important');
  }
  function syncForm(){
    const form = document.querySelector('#hfQuoteForm form.hs-form, #hfQuoteForm form');
    if(!form) return;
    const productSet = setField(form,'produtos_de_interesse',currentProduct());
    setField(form,'pagina_de_origem_do_lead',currentOrigin());
    if(currentKind() === 'conectores') setField(form,'modelo_do_conector',currentConnector());
    if(productSet) hideController(form);
  }
  function scheduleSync(){
    [50,180,450,900,1400].forEach(ms => setTimeout(syncForm,ms));
  }

  document.addEventListener('DOMContentLoaded',function(){
    const target = document.getElementById('hfQuoteForm');
    if(target){
      new MutationObserver(function(){ scheduleSync(); }).observe(target,{childList:true,subtree:true});
    }
    document.querySelectorAll('.hf-family-tab,.hf-connector-btn,.js-hf-quote,#hfQuoteTab').forEach(el => el.addEventListener('click',scheduleSync));
    scheduleSync();
  });
})();
</script>
<?php
get_footer();