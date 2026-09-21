<?php
if (!defined('ABSPATH')) exit;

/**
 * FAQPage JSON-LD das três páginas principais de produto em PT-BR.
 * O conteúdo abaixo replica exatamente as perguntas e respostas visíveis.
 */
function torcisao_product_faq_schema_data(){
    return [
        1623 => [
            [
                'question' => 'Qual a diferença entre baixa e alta camada?',
                'answer' => 'A Torcisão trabalha com opções de baixa camada, de até 20 mícrons, e alta camada, de 254 mícrons. A escolha deve seguir a especificação técnica e a condição de instalação do projeto; em aplicações de SPDA, confirme a exigência normativa com o responsável técnico.',
            ],
            [
                'question' => 'Quais normas consultar em projetos de SPDA?',
                'answer' => 'A ABNT NBR 5419:2026 trata da proteção contra descargas atmosféricas. Para hastes de aço cobreado e acessórios, verifique também a ABNT NBR 13571 e os requisitos definidos no memorial do projeto.',
            ],
            [
                'question' => 'O que informar para solicitar cotação?',
                'answer' => 'Informe aplicação, camada, bitola, comprimento, modelo de conector ou cabo quando aplicável, quantidade e qualquer requisito técnico previsto no desenho ou memorial.',
            ],
        ],
        1622 => [
            [
                'question' => 'Por que o 11SMn37 é usado em usinagem seriada?',
                'answer' => 'O 11SMn37 é um aço de usinabilidade melhorada. Seu teor controlado de enxofre favorece inclusões que ajudam na formação e na quebra do cavaco, característica útil em operações contínuas e peças torneadas em série.',
            ],
            [
                'question' => 'O 11SMn37 pode ajudar na vida da ferramenta?',
                'answer' => 'A melhor usinabilidade pode contribuir para menor esforço de corte e menor desgaste em determinadas condições, mas não existe um ganho fixo. Velocidade, avanço, ferramenta, refrigeração e rigidez do processo continuam determinantes.',
            ],
            [
                'question' => 'O que informar ao solicitar barra 11SMn37?',
                'answer' => 'Informe bitola, comprimento, tolerância, acabamento desejado, quantidade, aplicação e qualquer requisito de laudo ou especificação. Para barra polida ou reendireitada, sinalize essa necessidade já na cotação.',
            ],
        ],
        1621 => [
            [
                'question' => 'Qual a diferença entre arame BTC, MTC e ATC?',
                'answer' => 'As siglas indicam faixas de baixo, médio e alto teor de carbono. Essa variação altera o equilíbrio entre conformabilidade, resistência e dureza, por isso a classe de aço deve ser escolhida conforme a peça e o processo de fabricação.',
            ],
            [
                'question' => 'Quando avaliar rolo ou spider?',
                'answer' => 'Rolo e spider são formas de fornecimento diferentes. A escolha depende de manuseio, armazenamento, alimentação da linha e continuidade do processo. A disponibilidade e a condição de fornecimento devem ser confirmadas na cotação.',
            ],
            [
                'question' => 'O que informar para cotar arame trefilado?',
                'answer' => 'Informe aplicação, classe ou faixa de aço, bitola, forma de fornecimento, quantidade e qualquer requisito de resistência, dureza, acabamento ou tolerância previsto na especificação.',
            ],
        ],
    ];
}

function torcisao_output_product_faq_schema(){
    if (!is_page([1621,1622,1623])) return;
    if (function_exists('torcisao_request_language') && torcisao_request_language() !== 'pt') return;

    $page_id = get_queried_object_id();
    $pages = torcisao_product_faq_schema_data();
    $items = $pages[$page_id] ?? [];
    if (!$items) return;

    $main_entity = [];
    foreach ($items as $item) {
        $main_entity[] = [
            '@type' => 'Question',
            'name' => $item['question'],
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text' => $item['answer'],
            ],
        ];
    }

    $url = get_permalink($page_id);
    if (!$url) return;

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        '@id' => $url . '#faq',
        'url' => $url,
        'inLanguage' => 'pt-BR',
        'mainEntity' => $main_entity,
    ];

    echo "\n<script type=\"application/ld+json\" id=\"torcisao-faq-schema\">";
    echo wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo "</script>\n";
}
add_action('wp_head','torcisao_output_product_faq_schema',30);
