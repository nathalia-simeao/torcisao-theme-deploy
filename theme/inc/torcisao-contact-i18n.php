<?php
/**
 * Contato em inglês e espanhol · 2026-11
 *
 * A página /contato/ (português) é a fonte única do layout. As versões /en/contact/ e
 * /es/contacto/ são páginas do Polylang ligadas a ela como tradução: o conteúdo é o da
 * página em português, com os textos trocados pelas traduções abaixo. Assim, ajuste de
 * layout feito no /contato/ vale para os três idiomas; texto novo precisa entrar aqui.
 */
if (!defined('ABSPATH')) exit;

const TORCISAO_CONTACT_I18N_VERSION = '2026.11.12.1';

function torcisao_contact_pt_page() {
    $p = get_page_by_path('contato');
    return ($p && $p->post_status === 'publish') ? $p : null;
}

/** ID da página de contato no idioma pedido (0 se ainda não existe ou não está publicada). */
function torcisao_contact_page_id($lang) {
    if ($lang === 'pt') { $p = torcisao_contact_pt_page(); return $p ? (int) $p->ID : 0; }
    $id = (int) (get_option('torcisao_contact_page_ids', [])[$lang] ?? 0);
    return ($id && get_post_status($id) === 'publish') ? $id : 0;
}

/** URL da página de contato no idioma pedido ('' se não houver). */
function torcisao_contact_url($lang = 'pt') {
    $id = torcisao_contact_page_id($lang);
    return $id ? (string) get_permalink($id) : '';
}

function torcisao_contact_meta($lang) {
    return [
        'en' => [
            'title' => 'Contact', 'slug' => 'contact',
            'seo_title' => 'Contact and Quotes | Drawn Steel | Torcisão Trefilados',
            'seo_desc' => 'Contact Torcisão Trefilados for drawn bars, drawn wire and grounding rods. Request a quote by WhatsApp, phone or e-mail, direct from the factory in São Paulo.',
            'wa' => 'Hello! I came from the Torcisão contact page and would like to request a quote.',
        ],
        'es' => [
            'title' => 'Contacto', 'slug' => 'contacto',
            'seo_title' => 'Contacto y Cotización | Acero Trefilado | Torcisão Trefilados',
            'seo_desc' => 'Contacta a Torcisão Trefilados para barras trefiladas, alambre trefilado y varillas de puesta a tierra. Solicita tu cotización por WhatsApp, teléfono o e-mail.',
            'wa' => '¡Hola! Vengo de la página de contacto de Torcisão y me gustaría solicitar una cotización.',
        ],
    ][$lang] ?? null;
}

/** Textos da página de contato: português => tradução. */
function torcisao_contact_strings($lang) {
    $en = [
        'Fale com a Torcisão' => 'Talk to Torcisão',
        'Contato e' => 'Contact and',
        'cotação' => 'quotes',
        'de aço trefilado' => 'for drawn steel',
        'Precisa de barras trefiladas, arame trefilado ou hastes de aterramento? Fale direto com a equipe comercial da Torcisão Trefilados pelo WhatsApp, telefone ou e-mail. Respondemos em horário comercial e ajudamos a validar aço, bitola e forma de fornecimento do seu pedido.' => 'Need drawn bars, drawn wire or grounding rods? Talk directly to the Torcisão Trefilados sales team by WhatsApp, phone or e-mail. We reply during business hours (Brasília time) and help you validate the steel grade, diameter and supply form for your order.',
        'Solicitar cotação no WhatsApp' => 'Request a quote on WhatsApp',
        'São Paulo/SP' => 'São Paulo, Brazil',
        'Equipe comercial' => 'Sales team',
        'Seg. a qui. 08:00–17:50 · Sex. 08:00–17:40' => 'Mon–Thu 08:00–17:50 · Fri 08:00–17:40',
        'Canais de atendimento' => 'Contact channels',
        'Escolha como prefere falar com a gente' => 'Choose how you prefer to reach us',
        'WhatsApp comercial' => 'Sales WhatsApp',
        'O caminho mais rápido para cotação e dúvidas técnicas.' => 'The fastest way to get a quote and answers to technical questions.',
        'Telefone' => 'Phone',
        'Atendimento direto com a equipe comercial.' => 'Direct line to the sales team.',
        'E-mail' => 'E-mail',
        'Ideal para enviar desenhos, especificações e pedidos.' => 'Best for sending drawings, specifications and orders.',
        'Endereço' => 'Address',
        'Vila Liviero, São Paulo/SP' => 'Vila Liviero, São Paulo, Brazil',
        'Rua Francisco Pedroso de Toledo, 138/166 · CEP 04185-150' => 'Rua Francisco Pedroso de Toledo, 138/166 · ZIP 04185-150',
        'Cotação mais rápida' => 'Faster quotes',
        'O que enviar para agilizar seu orçamento' => 'What to send to speed up your quote',
        'Com estas informações a equipe Torcisão valida a condição do pedido e prepara a cotação sem idas e vindas:' => 'With this information the Torcisão team validates the order conditions and prepares the quote without back-and-forth:',
        'Produto e aplicação:' => 'Product and application:',
        'barra trefilada, arame trefilado ou haste de aterramento, e onde será usado.' => 'drawn bar, drawn wire or grounding rod, and where it will be used.',
        'Aço:' => 'Steel:',
        'baixo, médio ou alto carbono, ou aço ressulfurado (ex.: 11SMn37).' => 'low, medium or high carbon, or resulfurized steel (e.g. 11SMn37).',
        'Bitola e comprimento:' => 'Diameter and length:',
        'diâmetro ou medida do perfil e comprimento desejado.' => 'diameter or profile size and the required length.',
        'Forma de fornecimento:' => 'Supply form:',
        'barras, rolos ou spider; para hastes, a camada de cobre.' => 'bars, coils or spiders; for rods, the copper coating.',
        'Quantidade e prazo:' => 'Quantity and lead time:',
        'volume do pedido e data de entrega desejada.' => 'order volume and required delivery date.',
        'Enviar dados da cotação' => 'Send quote details',
        'Onde estamos' => 'Where we are',
        'Visite a Torcisão Trefilados' => 'Visit Torcisão Trefilados',
        'Seg. a qui.' => 'Mon–Thu',
        '08:00 às 17:50' => '08:00 to 17:50',
        'Sexta' => 'Friday',
        '08:00 às 17:40' => '08:00 to 17:40',
        'Quer trabalhar na Torcisão?' => 'Want to work at Torcisão?',
        'Envie seu currículo para o RH, assim ele não se mistura com os pedidos de cotação.' => 'Send your résumé to HR so it does not get mixed with quote requests.',
        'WhatsApp do RH' => 'HR WhatsApp',
        'Atendimento comercial' => 'Sales support',
        'Pronto para avançar com sua cotação?' => 'Ready to move forward with your quote?',
        'Antes de falar com a equipe, conheça as linhas de produto e veja bitolas, aços e formas de fornecimento.' => 'Before talking to the team, explore the product lines and check diameters, steel grades and supply forms.',
        'Barras trefiladas' => 'Drawn bars',
        'Arame trefilado' => 'Drawn wire',
        'Hastes de aterramento' => 'Grounding rods',
        'Falar com o comercial' => 'Talk to sales',
        'Arame trefilado em rolo e spider e barras trefiladas da Torcisão' => 'Torcisão drawn wire in coil and spider and drawn bars',
        'Barras trefiladas de aço ressulfurado 11SMn37 e peças usinadas' => '11SMn37 resulfurized steel drawn bars and machined parts',
        'Hastes de aterramento cobreadas e conectores Torcisão' => 'Torcisão copper-coated grounding rods and connectors',
        'Mapa da Torcisão Trefilados' => 'Map of Torcisão Trefilados',
    ];
    $es = [
        'Fale com a Torcisão' => 'Habla con Torcisão',
        'Contato e' => 'Contacto y',
        'cotação' => 'cotización',
        'de aço trefilado' => 'de acero trefilado',
        'Precisa de barras trefiladas, arame trefilado ou hastes de aterramento? Fale direto com a equipe comercial da Torcisão Trefilados pelo WhatsApp, telefone ou e-mail. Respondemos em horário comercial e ajudamos a validar aço, bitola e forma de fornecimento do seu pedido.' => '¿Necesitas barras trefiladas, alambre trefilado o varillas de puesta a tierra? Habla directamente con el equipo comercial de Torcisão Trefilados por WhatsApp, teléfono o e-mail. Respondemos en horario comercial (hora de Brasilia) y te ayudamos a validar acero, diámetro y forma de suministro de tu pedido.',
        'Solicitar cotação no WhatsApp' => 'Solicitar cotización por WhatsApp',
        'São Paulo/SP' => 'São Paulo, Brasil',
        'Equipe comercial' => 'Equipo comercial',
        'Seg. a qui. 08:00–17:50 · Sex. 08:00–17:40' => 'Lun. a jue. 08:00–17:50 · Vie. 08:00–17:40',
        'Canais de atendimento' => 'Canales de atención',
        'Escolha como prefere falar com a gente' => 'Elige cómo prefieres hablar con nosotros',
        'WhatsApp comercial' => 'WhatsApp comercial',
        'O caminho mais rápido para cotação e dúvidas técnicas.' => 'La vía más rápida para cotizaciones y dudas técnicas.',
        'Telefone' => 'Teléfono',
        'Atendimento direto com a equipe comercial.' => 'Atención directa con el equipo comercial.',
        'E-mail' => 'E-mail',
        'Ideal para enviar desenhos, especificações e pedidos.' => 'Ideal para enviar planos, especificaciones y pedidos.',
        'Endereço' => 'Dirección',
        'Vila Liviero, São Paulo/SP' => 'Vila Liviero, São Paulo, Brasil',
        'Rua Francisco Pedroso de Toledo, 138/166 · CEP 04185-150' => 'Rua Francisco Pedroso de Toledo, 138/166 · CP 04185-150',
        'Cotação mais rápida' => 'Cotización más rápida',
        'O que enviar para agilizar seu orçamento' => 'Qué enviar para agilizar tu cotización',
        'Com estas informações a equipe Torcisão valida a condição do pedido e prepara a cotação sem idas e vindas:' => 'Con esta información, el equipo Torcisão valida las condiciones del pedido y prepara la cotización sin idas y vueltas:',
        'Produto e aplicação:' => 'Producto y aplicación:',
        'barra trefilada, arame trefilado ou haste de aterramento, e onde será usado.' => 'barra trefilada, alambre trefilado o varilla de puesta a tierra, y dónde se usará.',
        'Aço:' => 'Acero:',
        'baixo, médio ou alto carbono, ou aço ressulfurado (ex.: 11SMn37).' => 'bajo, medio o alto carbono, o acero resulfurado (ej.: 11SMn37).',
        'Bitola e comprimento:' => 'Diámetro y longitud:',
        'diâmetro ou medida do perfil e comprimento desejado.' => 'diámetro o medida del perfil y longitud deseada.',
        'Forma de fornecimento:' => 'Forma de suministro:',
        'barras, rolos ou spider; para hastes, a camada de cobre.' => 'barras, rollos o spider; para varillas, la capa de cobre.',
        'Quantidade e prazo:' => 'Cantidad y plazo:',
        'volume do pedido e data de entrega desejada.' => 'volumen del pedido y fecha de entrega deseada.',
        'Enviar dados da cotação' => 'Enviar datos de la cotización',
        'Onde estamos' => 'Dónde estamos',
        'Visite a Torcisão Trefilados' => 'Visita Torcisão Trefilados',
        'Seg. a qui.' => 'Lun. a jue.',
        '08:00 às 17:50' => '08:00 a 17:50',
        'Sexta' => 'Viernes',
        '08:00 às 17:40' => '08:00 a 17:40',
        'Quer trabalhar na Torcisão?' => '¿Quieres trabajar en Torcisão?',
        'Envie seu currículo para o RH, assim ele não se mistura com os pedidos de cotação.' => 'Envía tu currículum a RR.HH., así no se mezcla con las solicitudes de cotización.',
        'WhatsApp do RH' => 'WhatsApp de RR.HH.',
        'Atendimento comercial' => 'Atención comercial',
        'Pronto para avançar com sua cotação?' => '¿Listo para avanzar con tu cotización?',
        'Antes de falar com a equipe, conheça as linhas de produto e veja bitolas, aços e formas de fornecimento.' => 'Antes de hablar con el equipo, conoce las líneas de producto y consulta diámetros, aceros y formas de suministro.',
        'Barras trefiladas' => 'Barras trefiladas',
        'Arame trefilado' => 'Alambre trefilado',
        'Hastes de aterramento' => 'Varillas de puesta a tierra',
        'Falar com o comercial' => 'Hablar con ventas',
        'Arame trefilado em rolo e spider e barras trefiladas da Torcisão' => 'Alambre trefilado en rollo y spider y barras trefiladas de Torcisão',
        'Barras trefiladas de aço ressulfurado 11SMn37 e peças usinadas' => 'Barras trefiladas de acero resulfurado 11SMn37 y piezas mecanizadas',
        'Hastes de aterramento cobreadas e conectores Torcisão' => 'Varillas de puesta a tierra cobreadas y conectores Torcisão',
        'Mapa da Torcisão Trefilados' => 'Mapa de Torcisão Trefilados',
    ];
    return $lang === 'en' ? $en : ($lang === 'es' ? $es : []);
}

/** Aplica as traduções ao HTML da página em português. */
function torcisao_contact_translate_html($html, $lang) {
    $map = torcisao_contact_strings($lang);
    $meta = torcisao_contact_meta($lang);
    if (!$map || !$meta) return $html;

    /* A página em português usa &nbsp; para não deixar palavra sozinha na última linha:
       a busca ignora esses espaços e a tradução recebe o mesmo cuidado. */
    $plain = function ($text) {
        $text = html_entity_decode((string) $text, ENT_QUOTES, 'UTF-8');
        return trim(preg_replace('/[\s\x{00A0}]+/u', ' ', $text));
    };
    $swap = function ($text) use ($map, $plain) {
        $key = $plain($text);
        if ($key === '' || !isset($map[$key])) return $text;
        $out = esc_html($map[$key]);
        if (substr_count($out, ' ') >= 3) $out = preg_replace('/ (?=[^ ]*$)/', '&nbsp;', $out);
        preg_match('/^(\s*).*?(\s*)$/su', (string) $text, $m);
        return ($m[1] ?? '') . $out . ($m[2] ?? '');
    };
    /* <style> e <script> ficam intocados */
    $keep = [];
    $html = preg_replace_callback('#<(script|style)\b[^>]*>.*?</\1>#is', function ($m) use (&$keep) {
        $k = '__TOR_CONTACT_KEEP_' . count($keep) . '__';
        $keep[$k] = $m[0];
        return $k;
    }, $html);
    $html = preg_replace_callback('/>([^<]+)</u', function ($m) use ($swap) { return '>' . $swap($m[1]) . '<'; }, $html);
    $html = preg_replace_callback('/\s(alt|aria-label|title)=(["\'])(.*?)\2/isu', function ($m) use ($map, $plain) {
        $v = $plain($m[3]);
        return isset($map[$v]) ? ' ' . $m[1] . '=' . $m[2] . esc_attr($map[$v]) . $m[2] : $m[0];
    }, $html);

    /* Links: páginas de produto no idioma certo e mensagem do WhatsApp comercial traduzida */
    if (function_exists('torcisao_page_url')) {
        foreach (['barra' => '/barra-trefilada/', 'arame' => '/arame-trefilado/', 'haste' => '/haste-de-aterramento/'] as $key => $path) {
            $html = str_replace('href="https://torcisao.com.br' . $path . '"', 'href="' . esc_url(torcisao_page_url($key, $lang)) . '"', $html);
        }
    }
    $html = preg_replace('#(https://wa\.me/551123349989\?text=)[^"\']*#', '${1}' . rawurlencode($meta['wa']), $html);

    return $keep ? strtr($html, $keep) : $html;
}

/* Nas páginas EN/ES, o conteúdo exibido é o da página em português, traduzido. */
add_filter('the_content', function ($content) {
    static $busy = false;
    if ($busy || is_admin() || !is_page()) return $content;
    $ids = (array) get_option('torcisao_contact_page_ids', []);
    $lang = array_search((int) get_queried_object_id(), array_map('intval', $ids), true);
    if (!$lang || get_the_ID() !== (int) get_queried_object_id()) return $content;
    $pt = torcisao_contact_pt_page();
    if (!$pt) return $content;
    $busy = true;
    $html = apply_filters('the_content', $pt->post_content);
    $busy = false;
    return torcisao_contact_translate_html($html, $lang);
}, 5);

/* Cria as páginas EN/ES uma vez, já ligadas à página em português no Polylang. */
add_action('admin_init', function () {
    if (!current_user_can('publish_pages') || get_option('torcisao_contact_i18n_version') === TORCISAO_CONTACT_I18N_VERSION) return;
    if (!function_exists('pll_set_post_language') || !function_exists('pll_save_post_translations')) return;
    $pt = torcisao_contact_pt_page();
    if (!$pt) return;

    $ids = (array) get_option('torcisao_contact_page_ids', []);
    foreach (['en', 'es'] as $lang) {
        if (!empty($ids[$lang]) && get_post($ids[$lang])) continue;
        $m = torcisao_contact_meta($lang);
        $id = wp_insert_post([
            'post_type' => 'page',
            'post_status' => 'publish',
            'post_title' => $m['title'],
            'post_name' => $m['slug'],
            'post_content' => '<!-- Conteúdo gerado a partir da página /contato/ (ver inc/torcisao-contact-i18n.php no tema). -->',
            'meta_input' => [
                '_wp_page_template' => (string) get_page_template_slug($pt->ID),
                '_yoast_wpseo_title' => $m['seo_title'],
                '_yoast_wpseo_metadesc' => $m['seo_desc'],
            ],
        ], true);
        if (is_wp_error($id) || !$id) continue;
        pll_set_post_language($id, $lang);
        $ids[$lang] = (int) $id;
    }
    if (function_exists('pll_get_post_language') && !pll_get_post_language($pt->ID)) pll_set_post_language($pt->ID, 'pt');
    $tr = ['pt' => (int) $pt->ID];
    foreach (['en', 'es'] as $lang) if (!empty($ids[$lang])) $tr[$lang] = (int) $ids[$lang];
    if (count($tr) > 1) pll_save_post_translations($tr);

    update_option('torcisao_contact_page_ids', $ids, false);
    if (!empty($ids['en']) && !empty($ids['es'])) update_option('torcisao_contact_i18n_version', TORCISAO_CONTACT_I18N_VERSION, false);
});
