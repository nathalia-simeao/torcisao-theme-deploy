<?php
if (!defined('ABSPATH')) exit;

/**
 * Recebe o formulário de currículo do footer e envia o arquivo diretamente
 * para o e-mail do RH usando wp_mail. O upload temporário é removido após o envio.
 */
function torcisao_send_resume_ajax(){
    if (!check_ajax_referer('torcisao_resume', 'nonce', false)) {
        wp_send_json_error(['message'=>'Não foi possível validar o envio. Atualize a página e tente novamente.'], 403);
    }

    /* Honeypot simples contra robôs. */
    if (!empty($_POST['website'])) {
        wp_send_json_success(['message'=>'Currículo recebido.']);
    }

    $name    = sanitize_text_field(wp_unslash($_POST['name'] ?? ''));
    $email   = sanitize_email(wp_unslash($_POST['email'] ?? ''));
    $phone   = sanitize_text_field(wp_unslash($_POST['phone'] ?? ''));
    $message = sanitize_textarea_field(wp_unslash($_POST['message'] ?? ''));
    $consent = !empty($_POST['consent']);

    if ($name === '' || !is_email($email) || !$consent) {
        wp_send_json_error(['message'=>'Preencha nome, e-mail e a autorização de privacidade antes de enviar.'], 422);
    }

    if (empty($_FILES['resume']) || !isset($_FILES['resume']['error'])) {
        wp_send_json_error(['message'=>'Selecione um currículo em PDF, DOC ou DOCX.'], 422);
    }

    $file = $_FILES['resume'];
    if ((int)$file['error'] !== UPLOAD_ERR_OK) {
        wp_send_json_error(['message'=>'O arquivo não pôde ser recebido. Selecione-o novamente e tente enviar.'], 422);
    }
    if ((int)$file['size'] > 5 * 1024 * 1024) {
        wp_send_json_error(['message'=>'O currículo precisa ter no máximo 5 MB.'], 422);
    }

    $filename = sanitize_file_name($file['name']);
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    $allowed = [
        'pdf'  => 'application/pdf',
        'doc'  => 'application/msword',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!isset($allowed[$ext])) {
        wp_send_json_error(['message'=>'Formato não permitido. Envie PDF, DOC ou DOCX.'], 422);
    }

    require_once ABSPATH . 'wp-admin/includes/file.php';
    $upload = wp_handle_upload($file, [
        'test_form' => false,
        'mimes' => [
            'pdf' => 'application/pdf',
            'doc' => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
    ]);

    if (!empty($upload['error']) || empty($upload['file'])) {
        wp_send_json_error(['message'=>'Não foi possível preparar o currículo para envio. Tente novamente.'], 500);
    }

    $attachment = $upload['file'];
    $subject = 'Currículo recebido pelo site - ' . $name;
    $body  = "<h2>Novo currículo enviado pelo site da Torcisão Trefilados</h2>";
    $body .= '<p><strong>Nome:</strong> ' . esc_html($name) . '</p>';
    $body .= '<p><strong>E-mail:</strong> ' . esc_html($email) . '</p>';
    $body .= '<p><strong>Telefone / WhatsApp:</strong> ' . esc_html($phone ?: 'Não informado') . '</p>';
    if ($message !== '') $body .= '<p><strong>Mensagem:</strong><br>' . nl2br(esc_html($message)) . '</p>';
    $body .= '<p><strong>Origem:</strong> formulário Trabalhe Conosco do site.</p>';

    $headers = [
        'Content-Type: text/html; charset=UTF-8',
        'Reply-To: ' . $name . ' <' . $email . '>',
    ];

    $sent = wp_mail('rh@torcisao.com.br', $subject, $body, $headers, [$attachment]);
    if (is_file($attachment)) @unlink($attachment);

    if (!$sent) {
        wp_send_json_error(['message'=>'O servidor não confirmou o envio do e-mail. Você pode tentar novamente ou falar com o RH pelo WhatsApp.'], 500);
    }

    wp_send_json_success(['message'=>'Currículo enviado diretamente para o RH com sucesso.']);
}
add_action('wp_ajax_torcisao_send_resume', 'torcisao_send_resume_ajax');
add_action('wp_ajax_nopriv_torcisao_send_resume', 'torcisao_send_resume_ajax');

/* Fechamento técnico: performance, escopo de assets e LCP da Home. */
$performance_file = get_template_directory().'/inc/torcisao-performance.php';
if (file_exists($performance_file)) require_once $performance_file;
