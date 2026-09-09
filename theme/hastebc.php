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
<script id="torcisao-haste-hubspot-unified-20260909b">
(function(){
  const unifiedFormId = '8fdff701-c5a7-4684-9358-d557a70425a5';
  window.TORCISAO_HASTE_PAGE = window.TORCISAO_HASTE_PAGE || {};
  window.TORCISAO_HASTE_PAGE.formId = unifiedFormId;
  window.TORCISAO_HASTE_PAGE.formIds = { baixa: unifiedFormId, alta: unifiedFormId, conectores: unifiedFormId };

  const fieldGroups = {
    baixa: ['diametro__haste_baixa_camada','comprimento___haste_baixa_camada','quantidade_de_pecas'],
    alta: ['diametro__haste_alta_camada','comprimento__haste_alta_camada','quantidade_de_pecas__alta_camada'],
    conectores: ['modelo_do_conector','quantidade_de_pecas__conectores']
  };

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
    let fields = Array.from(form.querySelectorAll('[name="'+name+'"],[name="'+name+'[]"]'));
    if(!fields.length){
      const wrapper = form.querySelector('.hs_'+name+', .hs-'+name);
      if(wrapper) fields = Array.from(wrapper.querySelectorAll('input,select,textarea'));
    }
    if(!fields.length) return false;

    const choices = fields.filter(f => f.type === 'checkbox' || f.type === 'radio');
    if(choices.length){
      choices.forEach(f => { f.checked = String(f.value) === String(value); });
      if(window.jQuery){ window.jQuery(choices).trigger('change'); }
      else choices.forEach(dispatch);
    } else {
      fields.forEach(f => { f.value = value; });
      if(window.jQuery){ window.jQuery(fields).trigger('change'); }
      else fields.forEach(dispatch);
    }
    return true;
  }

  function fieldWrapper(form,name){
    const field = form.querySelector('[name="'+name+'"],[name="'+name+'[]"]');
    if(field) return field.closest('.hs-form-field') || field.closest('.field') || field.parentElement;
    return form.querySelector('.hs_'+name+', .hs-'+name);
  }
  function revealWrapper(wrapper){
    if(!wrapper) return;
    let node = wrapper;
    for(let i=0;i<3 && node && node.tagName !== 'FORM';i++,node=node.parentElement){
      node.hidden = false;
      node.removeAttribute('hidden');
      if(node.style && node.style.display === 'none') node.style.display = '';
    }
    wrapper.style.setProperty('display','block','important');
    wrapper.style.setProperty('visibility','visible','important');
  }
  function forceTechnicalVisibility(form){
    const kind = currentKind();
    const wanted = new Set(fieldGroups[kind] || []);
    if(kind === 'baixa' || kind === 'alta'){
      wanted.add('modelo_do_conector');
      wanted.add('quantidade_de_pecas__conectores');
    }
    Object.values(fieldGroups).flat().forEach(name => {
      const wrapper = fieldWrapper(form,name);
      if(!wrapper) return;
      if(wanted.has(name)) revealWrapper(wrapper);
      else wrapper.style.setProperty('display','none','important');
    });
  }
  function syncForm(){
    const form = document.querySelector('#hfQuoteForm form.hs-form, #hfQuoteForm form');
    if(!form) return;
    setField(form,'pagina_de_origem_do_lead',currentOrigin());
    setField(form,'produtos_de_interesse',currentProduct());
    if(currentKind() === 'conectores') setField(form,'modelo_do_conector',currentConnector());
    setTimeout(function(){ forceTechnicalVisibility(form); },20);
  }
  function scheduleSync(){
    [40,120,260,520,900].forEach(ms => setTimeout(syncForm,ms));
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