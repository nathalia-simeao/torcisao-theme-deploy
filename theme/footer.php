<?php
if (!defined('ABSPATH')) exit;

$footer_lang = 'pt';
if (function_exists('pll_current_language') && pll_current_language('slug')) {
    $footer_lang = pll_current_language('slug');
} else {
    $locale = get_locale();
    if (strpos($locale, 'en') === 0) $footer_lang = 'en';
    elseif (strpos($locale, 'es') === 0) $footer_lang = 'es';
}

$footer_copy = [
    'pt' => [
        'institutional'=>'Institucional','contacts'=>'Contatos','payments'=>'Formas de Pagamento','where'=>'Onde Estamos',
        'quality'=>'Política de Qualidade','privacy'=>'Política de Privacidade','cookies'=>'Política de Cookies','home'=>'Início','products'=>'Produtos','blog'=>'Blog',
        'hours'=>'Horário de atendimento','work'=>'Trabalhe conosco','language'=>'Português (BR)','group'=>'Grupo Torcisão',
        'current_company'=>'Torcisão Trefilados','industrial'=>'Torcisão Industrial','current_site'=>'Você está neste site','industrial_site'=>'Acesse o site da empresa',
        'associated'=>'Somos associados da','copyright'=>'Torcisão Copyright 2026 - Todos os direitos reservados',
        'work_kicker'=>'TRABALHE CONOSCO','work_title'=>'Faça parte da nossa equipe','work_intro'=>'Envie seu currículo diretamente para o RH ou fale com a equipe pelo WhatsApp.',
        'name'=>'Nome completo','email'=>'E-mail','phone'=>'Telefone / WhatsApp','message'=>'Mensagem para o RH (opcional)','resume'=>'Currículo','resume_help'=>'PDF, DOC ou DOCX · até 5 MB','send'=>'Enviar currículo para o RH','whatsapp'=>'Falar com o RH no WhatsApp',
        'consent'=>'Autorizo o envio dos meus dados e currículo para análise de oportunidades pela Torcisão, conforme a Política de Privacidade.',
        'a11y_kicker'=>'ACESSIBILIDADE','a11y_title'=>'Assistente de acessibilidade','a11y_intro'=>'Ajuste a leitura do site. As preferências ficam salvas neste navegador.',
        'font_up'=>'Aumentar texto','font_down'=>'Diminuir texto','contrast'=>'Mais contraste','links'=>'Destacar links','readable'=>'Fonte legível','motion'=>'Reduzir movimento','reset'=>'Restaurar configurações'
    ],
    'en' => [
        'institutional'=>'Institutional','contacts'=>'Contacts','payments'=>'Payment Methods','where'=>'Where We Are',
        'quality'=>'Quality Policy','privacy'=>'Privacy Policy','cookies'=>'Cookie Policy','home'=>'Home','products'=>'Products','blog'=>'Blog',
        'hours'=>'Business hours','work'=>'Work with us','language'=>'English','group'=>'Torcisão Group',
        'current_company'=>'Torcisão Trefilados','industrial'=>'Torcisão Industrial','current_site'=>'You are on this website','industrial_site'=>'Visit company website',
        'associated'=>'We are members of','copyright'=>'Torcisão Copyright 2026 - All rights reserved',
        'work_kicker'=>'WORK WITH US','work_title'=>'Join our team','work_intro'=>'Send your resume directly to HR or contact the team on WhatsApp.',
        'name'=>'Full name','email'=>'Email','phone'=>'Phone / WhatsApp','message'=>'Message to HR (optional)','resume'=>'Resume','resume_help'=>'PDF, DOC or DOCX · up to 5 MB','send'=>'Send resume to HR','whatsapp'=>'Chat with HR on WhatsApp',
        'consent'=>'I authorize sending my data and resume for Torcisão recruitment analysis, according to the Privacy Policy.',
        'a11y_kicker'=>'ACCESSIBILITY','a11y_title'=>'Accessibility assistant','a11y_intro'=>'Adjust website reading. Preferences are saved in this browser.',
        'font_up'=>'Increase text','font_down'=>'Decrease text','contrast'=>'More contrast','links'=>'Highlight links','readable'=>'Readable font','motion'=>'Reduce motion','reset'=>'Reset settings'
    ],
    'es' => [
        'institutional'=>'Institucional','contacts'=>'Contactos','payments'=>'Formas de Pago','where'=>'Dónde Estamos',
        'quality'=>'Política de Calidad','privacy'=>'Política de Privacidad','cookies'=>'Política de Cookies','home'=>'Inicio','products'=>'Productos','blog'=>'Blog',
        'hours'=>'Horario de atención','work'=>'Trabaja con nosotros','language'=>'Español','group'=>'Grupo Torcisão',
        'current_company'=>'Torcisão Trefilados','industrial'=>'Torcisão Industrial','current_site'=>'Estás en este sitio','industrial_site'=>'Accede al sitio de la empresa',
        'associated'=>'Somos miembros de','copyright'=>'Torcisão Copyright 2026 - Todos los derechos reservados',
        'work_kicker'=>'TRABAJA CON NOSOTROS','work_title'=>'Sé parte de nuestro equipo','work_intro'=>'Envía tu currículum directamente a RR.HH. o habla con el equipo por WhatsApp.',
        'name'=>'Nombre completo','email'=>'E-mail','phone'=>'Teléfono / WhatsApp','message'=>'Mensaje para RR.HH. (opcional)','resume'=>'Currículum','resume_help'=>'PDF, DOC o DOCX · hasta 5 MB','send'=>'Enviar currículum a RR.HH.','whatsapp'=>'Hablar con RR.HH. por WhatsApp',
        'consent'=>'Autorizo el envío de mis datos y currículum para análisis de oportunidades por Torcisão, según la Política de Privacidad.',
        'a11y_kicker'=>'ACCESIBILIDAD','a11y_title'=>'Asistente de accesibilidad','a11y_intro'=>'Ajusta la lectura del sitio. Las preferencias se guardan en este navegador.',
        'font_up'=>'Aumentar texto','font_down'=>'Disminuir texto','contrast'=>'Más contraste','links'=>'Destacar enlaces','readable'=>'Fuente legible','motion'=>'Reducir movimiento','reset'=>'Restaurar configuración'
    ]
];
$t = $footer_copy[$footer_lang] ?? $footer_copy['pt'];
?>

<footer class="site-footer tor-footer-v2" id="rodape">
  <div class="tor-footer-main">
    <div class="tor-footer-wrap">
      <div class="tor-footer-data">
        <section aria-labelledby="torFooterInstitutional">
          <h2 class="tor-footer-title" id="torFooterInstitutional"><?php echo esc_html($t['institutional']); ?></h2>
          <nav class="tor-footer-links" aria-label="<?php echo esc_attr($t['institutional']); ?>">
            <a href="<?php echo esc_url(home_url('/politicadequalidade/')); ?>"><?php echo esc_html($t['quality']); ?></a>
            <a href="<?php echo esc_url(home_url('/politicadeprivacidade/')); ?>"><?php echo esc_html($t['privacy']); ?></a>
            <a href="<?php echo esc_url(home_url('/politicadecookies/')); ?>"><?php echo esc_html($t['cookies']); ?></a>
            <a href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html($t['home']); ?></a>
            <a href="<?php echo esc_url(home_url('/#produtos')); ?>"><?php echo esc_html($t['products']); ?></a>
            <a href="<?php echo esc_url(home_url('/blog/')); ?>"><?php echo esc_html($t['blog']); ?></a>
          </nav>
        </section>

        <section aria-labelledby="torFooterContacts">
          <h2 class="tor-footer-title" id="torFooterContacts"><?php echo esc_html($t['contacts']); ?></h2>
          <div class="tor-footer-contact-list">
            <a class="tor-footer-contact-link" href="tel:+551123349989"><span class="tor-footer-iconbox"><i class="bi bi-telephone"></i></span><span>(11) 2334-9989</span></a>
            <a class="tor-footer-contact-link" href="mailto:contatotrefilados@torcisao.com.br"><span class="tor-footer-iconbox"><i class="bi bi-envelope"></i></span><span>contatotrefilados@torcisao.com.br</span></a>
          </div>
          <div class="tor-footer-social" aria-label="Redes sociais Torcisão">
            <a href="https://www.instagram.com/torcisao/" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="https://www.linkedin.com/company/torcisaotrefilados/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="https://www.facebook.com/torcisao" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          </div>
          <div class="tor-footer-hours">
            <strong><i class="bi bi-clock"></i><?php echo esc_html($t['hours']); ?></strong>
            <p>Seg. a qui. 08:00–17:50<br>Sex. 08:00–17:40</p>
          </div>
        </section>

        <section aria-labelledby="torFooterPayments">
          <h2 class="tor-footer-title" id="torFooterPayments"><?php echo esc_html($t['payments']); ?></h2>
          <div class="tor-footer-payments" aria-label="Formas de pagamento aceitas">
            <span class="tor-pay tor-pay-visa">VISA</span>
            <span class="tor-pay" aria-label="Mastercard"><svg viewBox="0 0 58 34" aria-hidden="true"><circle cx="22" cy="17" r="11" fill="#eb001b"/><circle cx="36" cy="17" r="11" fill="#f79e1b"/><path d="M29 8.7a11 11 0 0 1 0 16.6 11 11 0 0 1 0-16.6Z" fill="#ff5f00"/></svg></span>
            <span class="tor-pay tor-pay-elo">elo<span style="color:#ef7b30">•</span></span>
            <span class="tor-pay tor-pay-boleto"><span>▥<br>BOLETO</span></span>
            <span class="tor-pay tor-pay-pix">◇ PIX</span>
            <span class="tor-pay tor-pay-bndes">BNDES</span>
          </div>
          <div class="tor-footer-action-stack">
            <button type="button" class="tor-footer-pill" data-work-open><i class="bi bi-person-workspace"></i><?php echo esc_html($t['work']); ?></button>
            <button type="button" class="tor-footer-pill" data-footer-language-open><i class="bi bi-globe2"></i><?php echo esc_html($t['language']); ?></button>
          </div>
        </section>

        <section aria-labelledby="torFooterWhere">
          <h2 class="tor-footer-title" id="torFooterWhere"><?php echo esc_html($t['where']); ?></h2>
          <a class="tor-footer-address" href="https://www.google.com/maps/search/?api=1&query=Rua+Francisco+Pedroso+de+Toledo,+138,+Vila+Livieiro,+Sao+Paulo,+SP" target="_blank" rel="noopener">
            Rua Francisco Pedroso de Toledo, 138/166<br>Vila Liviero - São Paulo/SP<br>CEP: 04185-150
          </a>
          <div class="tor-footer-map" aria-label="Mapa interativo da Torcisão Trefilados">
            <iframe title="Localização da Torcisão Trefilados" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen src="https://www.google.com/maps?q=Rua%20Francisco%20Pedroso%20de%20Toledo%20138%2C%20Vila%20Livieiro%2C%20S%C3%A3o%20Paulo%20SP%2004185-150&z=16&output=embed"></iframe>
          </div>
          <div class="tor-footer-map-hint"><i class="bi bi-arrows-move"></i> Arraste o mapa e use os controles para ampliar ou reduzir.</div>
        </section>
      </div>
    </div>
  </div>

  <section class="tor-footer-group" aria-labelledby="torGroupTitle">
    <div class="tor-footer-wrap">
      <div class="tor-footer-group-shell">
        <p class="tor-footer-group-label" id="torGroupTitle"><?php echo esc_html($t['group']); ?></p>
        <div class="tor-footer-company-grid">
          <div class="tor-footer-company" aria-label="Torcisão Trefilados">
            <div class="tor-footer-company-brand"><img src="<?php echo torcisao_asset('assets/lgcabecalhoclara220.png'); ?>" alt="Torcisão Trefilados"></div>
            <div class="tor-footer-company-copy"><strong><?php echo esc_html($t['current_company']); ?></strong><span>CNPJ 62.147.178/0001-17<br><?php echo esc_html($t['current_site']); ?></span></div>
            <span class="tor-footer-company-arrow" aria-hidden="true">•</span>
          </div>
          <a class="tor-footer-company" href="https://torcisao.ind.br/" target="_blank" rel="noopener" aria-label="Acessar o site da Torcisão Industrial">
            <div class="tor-footer-company-brand">
              <span class="tor-industrial-logo" aria-hidden="true"><span class="tor-industrial-mark"></span><span class="tor-industrial-word"><strong>TORCISÃO</strong><small>INDUSTRIAL</small></span></span>
            </div>
            <div class="tor-footer-company-copy"><strong><?php echo esc_html($t['industrial']); ?></strong><span>CNPJ 07.733.015/0001-08<br><?php echo esc_html($t['industrial_site']); ?></span></div>
            <span class="tor-footer-company-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <div class="tor-footer-bottom">
    <div class="tor-footer-wrap tor-footer-bottom-row">
      <div class="tor-footer-ciesp"><span><?php echo esc_html($t['associated']); ?></span><span class="tor-ciesp-logo" aria-label="CIESP">CIESP</span></div>
      <div class="tor-footer-copy"><?php echo esc_html($t['copyright']); ?></div>
      <button type="button" class="tor-accessibility-open" data-a11y-open aria-label="Abrir assistente de acessibilidade" title="Acessibilidade (Alt+A)"><i class="bi bi-universal-access-circle"></i></button>
    </div>
  </div>
</footer>

<div class="tor-work-overlay" id="torWorkOverlay" aria-hidden="true">
  <section class="tor-work-dialog" role="dialog" aria-modal="true" aria-labelledby="torWorkTitle">
    <div class="tor-work-head">
      <button type="button" class="tor-modal-x" data-work-close aria-label="Fechar">×</button>
      <small><?php echo esc_html($t['work_kicker']); ?></small>
      <h2 id="torWorkTitle"><?php echo esc_html($t['work_title']); ?></h2>
      <p><?php echo esc_html($t['work_intro']); ?></p>
    </div>
    <div class="tor-work-body">
      <div class="tor-work-channels">
        <a class="tor-work-channel" href="mailto:rh@torcisao.com.br"><i class="bi bi-envelope-at"></i><span><strong>E-mail</strong>rh@torcisao.com.br</span></a>
        <a class="tor-work-channel" href="https://wa.me/5511940301592" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i><span><strong>WhatsApp</strong>(11) 94030-1592</span></a>
      </div>

      <form class="tor-work-form" id="torWorkForm" enctype="multipart/form-data" data-ajax-url="<?php echo esc_url(admin_url('admin-ajax.php')); ?>">
        <input type="hidden" name="nonce" value="<?php echo esc_attr(wp_create_nonce('torcisao_resume')); ?>">
        <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0">
        <div class="tor-work-form-grid">
          <div class="tor-work-field"><label for="torResumeName"><?php echo esc_html($t['name']); ?></label><input id="torResumeName" name="name" type="text" required autocomplete="name"></div>
          <div class="tor-work-field"><label for="torResumeEmail"><?php echo esc_html($t['email']); ?></label><input id="torResumeEmail" name="email" type="email" required autocomplete="email"></div>
        </div>
        <div class="tor-work-form-grid">
          <div class="tor-work-field"><label for="torResumePhone"><?php echo esc_html($t['phone']); ?></label><input id="torResumePhone" name="phone" type="tel" autocomplete="tel"></div>
          <div class="tor-work-field"><label for="torResumeMessage"><?php echo esc_html($t['message']); ?></label><textarea id="torResumeMessage" name="message"></textarea></div>
        </div>
        <div class="tor-work-field">
          <label><?php echo esc_html($t['resume']); ?></label>
          <label class="tor-file-drop" for="torResumeFile"><input id="torResumeFile" name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required><span><i class="bi bi-cloud-arrow-up"></i><strong>Selecionar currículo</strong><small data-resume-name><?php echo esc_html($t['resume_help']); ?></small></span></label>
        </div>
        <label class="tor-work-consent"><input type="checkbox" name="consent" value="1" required><span><?php echo esc_html($t['consent']); ?> <a href="<?php echo esc_url(home_url('/politicadeprivacidade/')); ?>" target="_blank" rel="noopener">Política de Privacidade</a>.</span></label>
        <div class="tor-work-submit-row">
          <button class="tor-work-submit" type="submit" data-work-submit><i class="bi bi-send"></i><?php echo esc_html($t['send']); ?></button>
          <a class="tor-work-whatsapp" href="https://wa.me/5511940301592" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i><?php echo esc_html($t['whatsapp']); ?></a>
        </div>
        <p class="tor-work-status" data-work-status aria-live="polite"></p>
      </form>
    </div>
  </section>
</div>

<div class="tor-a11y-overlay" id="torA11yOverlay" aria-hidden="true">
  <section class="tor-a11y-dialog" role="dialog" aria-modal="true" aria-labelledby="torA11yTitle">
    <button type="button" class="tor-modal-x" data-a11y-close aria-label="Fechar">×</button>
    <div class="tor-a11y-head"><small><?php echo esc_html($t['a11y_kicker']); ?></small><h2 id="torA11yTitle"><?php echo esc_html($t['a11y_title']); ?></h2><p><?php echo esc_html($t['a11y_intro']); ?></p></div>
    <div class="tor-a11y-grid">
      <button type="button" class="tor-a11y-action" data-a11y-font-plus><i class="bi bi-fonts"></i><strong><?php echo esc_html($t['font_up']); ?></strong><small data-a11y-font-label>Padrão</small></button>
      <button type="button" class="tor-a11y-action" data-a11y-font-minus><i class="bi bi-dash-circle"></i><strong><?php echo esc_html($t['font_down']); ?></strong><small>Reduz um nível por clique</small></button>
      <button type="button" class="tor-a11y-action" data-a11y-toggle="contrast" aria-pressed="false"><i class="bi bi-circle-half"></i><strong><?php echo esc_html($t['contrast']); ?></strong><small>Reforça a separação visual</small></button>
      <button type="button" class="tor-a11y-action" data-a11y-toggle="links" aria-pressed="false"><i class="bi bi-link-45deg"></i><strong><?php echo esc_html($t['links']); ?></strong><small>Sublinha links e ações</small></button>
      <button type="button" class="tor-a11y-action" data-a11y-toggle="readable" aria-pressed="false"><i class="bi bi-type"></i><strong><?php echo esc_html($t['readable']); ?></strong><small>Troca para uma fonte simples</small></button>
      <button type="button" class="tor-a11y-action" data-a11y-toggle="motion" aria-pressed="false"><i class="bi bi-pause-circle"></i><strong><?php echo esc_html($t['motion']); ?></strong><small>Desativa animações e transições</small></button>
    </div>
    <button type="button" class="tor-a11y-reset" data-a11y-reset><?php echo esc_html($t['reset']); ?></button>
  </section>
</div>

<?php wp_footer(); ?>
</body>
</html>
