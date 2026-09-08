(function(){
'use strict';

const CERT_PREVIEW='https://torcisao.com.br/wp-content/uploads/2026/09/TORCISAO-9001-pdf-724x1024.jpg';
const CERT_FULL='https://torcisao.com.br/wp-content/uploads/2026/09/TORCISAO-9001-pdf.jpg';
const CERT_PDF='https://torcisao.com.br/wp-content/uploads/2026/09/TORCISAO-9001.pdf';
const QUALITY_SEAL='https://torcisao.com.br/wp-content/uploads/2026/09/ChatGPT-Image-6-de-set.-de-2026-18_48_39.png';

function init(){
  const quality=document.getElementById('qualidade');
  const products=document.getElementById('produtos');
  if(!quality||!products)return;

  /* A seção aprovada vinha imediatamente depois do Explorador de Produtos. */
  if(products.nextElementSibling!==quality){
    products.insertAdjacentElement('afterend',quality);
  }

  quality.innerHTML=`
    <div class="th-container">
      <div class="tq-grid">
        <div class="tq-copy">
          <span class="tq-kicker">Qualidade Torcisão</span>
          <h2>Qualidade comprovada em cada etapa</h2>
          <p>Da inspeção ao controle dimensional, a Torcisão mantém processos documentados e rastreáveis para dar consistência ao que chega à sua operação. A certificação ISO 9001 fica disponível aqui para consulta, visualização e download.</p>

          <div class="tq-bottom">
            <div class="tq-medal" aria-label="ISO 9001 — Sistema de Gestão da Qualidade">
              <img class="tq-medal-image" src="${QUALITY_SEAL}" alt="ISO 9001 — Sistema de Gestão da Qualidade" loading="eager" decoding="async" data-no-lazy="1">
            </div>

            <div class="tq-pillars" aria-label="Pilares de qualidade">
              <div class="tq-pillar"><i class="bi bi-rulers"></i><strong>Controle dimensional</strong></div>
              <div class="tq-pillar"><i class="bi bi-search"></i><strong>Inspeção de processo</strong></div>
              <div class="tq-pillar"><i class="bi bi-diagram-3"></i><strong>Rastreabilidade</strong></div>
              <div class="tq-pillar"><i class="bi bi-file-earmark-check"></i><strong>Processos documentados</strong></div>
            </div>
          </div>
        </div>

        <article class="tq-cert-card">
          <div class="tq-cert-preview">
            <img src="${CERT_PREVIEW}" alt="Prévia do Certificado ISO 9001 da Torcisão" loading="eager" decoding="async" data-no-lazy="1" class="skip-lazy">
          </div>
          <div class="tq-cert-copy">
            <small>Documento disponível</small>
            <h3>Certificado ISO 9001</h3>
            <p>Consulte o documento diretamente no site ou faça o download do PDF para seus registros e processos de homologação.</p>
            <div class="tq-cert-actions">
              <button type="button" class="tq-cert-btn tq-cert-btn-primary" id="tqCertificateOpen"><i class="bi bi-eye"></i> Visualizar certificado</button>
              <a class="tq-cert-btn tq-cert-btn-secondary" href="${CERT_PDF}" download target="_blank" rel="noopener"><i class="bi bi-download"></i> Baixar PDF</a>
            </div>
            <span class="tq-cert-file">Arquivo: TORCISÃO 9001 – 2026 · PDF disponível para consulta.</span>
          </div>
        </article>
      </div>
    </div>

    <div class="tq-modal" id="tqCertificateModal" aria-hidden="true">
      <section class="tq-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="tqCertificateModalTitle">
        <div class="tq-modal-head">
          <small>CERTIFICADO ISO 9001</small>
          <strong id="tqCertificateModalTitle">Qualidade Torcisão</strong>
        </div>
        <button type="button" class="tq-modal-close" id="tqCertificateClose" aria-label="Fechar">×</button>
        <div class="tq-modal-body"><img src="${CERT_FULL}" alt="Certificado ISO 9001 da Torcisão" data-no-lazy="1" class="skip-lazy"></div>
      </section>
    </div>`;

  const modal=document.getElementById('tqCertificateModal');
  const open=document.getElementById('tqCertificateOpen');
  const close=document.getElementById('tqCertificateClose');

  function show(){
    modal?.classList.add('is-open');
    modal?.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  function hide(){
    modal?.classList.remove('is-open');
    modal?.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  open?.addEventListener('click',show);
  close?.addEventListener('click',hide);
  modal?.addEventListener('click',function(e){if(e.target===modal)hide();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal?.classList.contains('is-open'))hide();});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
