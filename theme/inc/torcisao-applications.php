<?php
/**
 * Páginas de aplicação 2026-11 · conteúdo.
 *
 * Uma página por aplicação ("Arame trefilado para molas", "Barra trefilada para
 * fixadores"…), para anúncios e busca orgânica. Todo dado técnico (linhas
 * indicadas, aços, bitolas, fornecimento) vem do catálogo aprovado do Theo —
 * os textos só explicam e conduzem para a cotação.
 *
 * As páginas são criadas como RASCUNHO em Páginas (filhas de /arame-trefilado/
 * e /barra-trefilada/). Revise e publique pelo painel.
 */
if (!defined('ABSPATH')) exit;

const TORCISAO_APP_PAGES_VERSION = '2026.11.12.1';
const TORCISAO_APP_MEDIA = 'https://torcisao.com.br/wp-content/uploads/2026/09/';

/** Linhas do catálogo (espelho do catálogo aprovado do Theo). */
function torcisao_app_products() {
    /* rolo, spider e detalhe do spider — para cada linha ter a sua foto */
    $arame_rolo = TORCISAO_APP_MEDIA . 'arametrefiladorolo-768x768.png';
    $arame_spider = TORCISAO_APP_MEDIA . 'arametrefiladospider-768x768.png';
    $arame_detalhe = TORCISAO_APP_MEDIA . 'aramespidera1-768x768.png';
    return [
        'arame_btc' => ['name' => 'Arame Trefilado - Baixo Teor de Carbono', 'short' => 'Baixo Teor de Carbono', 'line' => 'arame', 'kind' => 'btc', 'img' => $arame_rolo,
            'summary' => 'Arame trefilado de baixo teor de carbono para aplicações industriais e componentes conformados.',
            'specs' => ['Aços 1004 a 1020', 'Bitola 2,00 a 15,88 mm', 'Perfil redondo', 'Rolos ou spiders']],
        'arame_mtc' => ['name' => 'Arame Trefilado - Médio Teor de Carbono', 'short' => 'Médio Teor de Carbono', 'line' => 'arame', 'kind' => 'mtc', 'img' => $arame_spider,
            'summary' => 'Arame trefilado de médio teor de carbono para aplicações que exigem validação de propriedades mecânicas e processo.',
            'specs' => ['Aços 1035 a 1050', 'Bitola 4,76 a 15,88 mm', 'Perfil redondo', 'Rolos ou spiders']],
        'arame_atc' => ['name' => 'Arame Trefilado - Alto Teor de Carbono', 'short' => 'Alto Teor de Carbono', 'line' => 'arame', 'kind' => 'atc', 'img' => $arame_detalhe,
            'summary' => 'Arame trefilado de alto teor de carbono para aplicações que exigem validação de resistência, plasticidade, dureza e processo.',
            'specs' => ['Aços 1060 a 1090', 'Bitola 4,76 a 15,88 mm', 'Perfil redondo', 'Rolos ou spiders']],
        'barra_btc' => ['name' => 'Barra Trefilada - Baixo Teor de Carbono', 'short' => 'Baixo Teor de Carbono', 'line' => 'barra', 'kind' => 'btc', 'img' => TORCISAO_APP_MEDIA . 'barratrefiladabtca1.png',
            'summary' => 'Barra trefilada de baixo teor de carbono para aplicações industriais com requisitos dimensionais e de acabamento.',
            'specs' => ['Aços 1004 a 1020', 'Bitola 2,00 a 15,88 mm', 'Perfil redondo', 'Tolerância sob consulta']],
        'barra_mtc' => ['name' => 'Barra Trefilada - Médio Teor de Carbono', 'short' => 'Médio Teor de Carbono', 'line' => 'barra', 'kind' => 'mtc', 'img' => TORCISAO_APP_MEDIA . 'barratrefiladamtca1.png',
            'summary' => 'Barra trefilada de médio teor de carbono para aplicações mecânicas que pedem validação de resistência, dimensão e processo.',
            'specs' => ['Aços 1035 a 1050', 'Bitola 4,76 a 15,88 mm', 'Perfil redondo', 'Tolerância sob consulta']],
        'barra_atc' => ['name' => 'Barra Trefilada - Alto Teor de Carbono', 'short' => 'Alto Teor de Carbono', 'line' => 'barra', 'kind' => 'atc', 'img' => TORCISAO_APP_MEDIA . 'barratrefiladaatca1.png',
            'summary' => 'Barra trefilada de alto teor de carbono para aplicações mecânicas que exigem validação de aço, resistência e processo.',
            'specs' => ['Aços 1060 a 1090', 'Bitola 4,76 a 15,88 mm', 'Perfil redondo', 'Tolerância sob consulta']],
        'barra_ressulfurado' => ['name' => 'Barra Trefilada - Aço Ressulfurado', 'short' => 'Aço Ressulfurado 11SMn37', 'line' => 'barra', 'kind' => 'ressulfurado', 'img' => TORCISAO_APP_MEDIA . 'barratrefiladaressulfuradoa1.png',
            'summary' => 'Barra trefilada em aço ressulfurado 11SMn37 para aplicações em que usinabilidade, precisão dimensional e acabamento são critérios importantes.',
            'specs' => ['Aço 11SMn37', 'Bitola 4,76 a 15,88 mm', 'Perfil redondo', 'Tolerância sob consulta']],
        /* Hastes de aterramento: mesmos dados publicados em /haste-de-aterramento/ */
        'haste_baixa' => ['name' => 'Haste de Aterramento - Baixa Camada', 'short' => 'Baixa Camada · até 20 µm', 'line' => 'haste', 'kind' => 'baixa', 'img' => get_template_directory_uri() . '/assets/hastebaixa.webp',
            'summary' => 'Haste de aterramento de aço cobreado com camada de cobre de até 20 µm.',
            'specs' => ['Camada de cobre de até 20 µm', 'Diâmetros de 9,00 a 15,40 mm', 'Comprimentos de 1,00 a 3,00 m', 'Lote mínimo de 100 peças']],
        'haste_alta' => ['name' => 'Haste de Aterramento - Alta Camada', 'short' => 'Alta Camada · 254 µm', 'line' => 'haste', 'kind' => 'alta', 'img' => get_template_directory_uri() . '/assets/hastealta.png',
            'summary' => 'Haste de aterramento de aço cobreado com camada de cobre de 254 µm.',
            'specs' => ['Camada de cobre de 254 µm', 'Bitolas de 1/2”, 5/8” e 3/4”', 'Comprimentos de 2,40 m e 3,00 m', 'Lote mínimo de 30 peças']],
    ];
}

/** Formulário de cotação do HubSpot (o mesmo das páginas de produto). */
function torcisao_app_form_id($line) {
    if ($line === 'haste') return '8fdff701-c5a7-4684-9358-d557a70425a5';
    return $line === 'arame' ? '618563c8-4899-441b-965d-801a83009fdf' : '7032f62e-b2f6-486a-8db7-bd2822b5db93';
}

/** O que pedir na cotação, por linha. */
function torcisao_app_checklist($line) {
    if ($line === 'arame') return [
        'Aço ou faixa de carbono prevista (se já tiver)',
        'Bitola em milímetros',
        'Quantidade (kg ou toneladas) e frequência de compra',
        'Forma de fornecimento: rolo ou spider',
        'Exigências de resistência, dureza, acabamento ou documentação',
    ];
    if ($line === 'haste') return [
        'Camada de cobre: baixa (até 20 µm) ou alta (254 µm)',
        'Bitola e comprimento da haste',
        'Quantidade de peças',
        'Modelo de conector ou cabo, quando aplicável',
        'Requisitos do desenho ou memorial do projeto',
    ];
    return [
        'Aço previsto (se já tiver)',
        'Bitola em milímetros',
        'Comprimento das barras',
        'Quantidade (kg ou toneladas) e frequência de compra',
        'Tolerância, acabamento ou documentação exigidos',
    ];
}

/** As páginas. */
function torcisao_app_pages() {
    return [
        /* ---------------- ARAME ---------------- */
        'arame-molas' => [
            'line' => 'arame', 'slug' => 'para-molas', 'app' => 'molas',
            'title' => 'Arame trefilado para molas',
            'seo_title' => 'Arame Trefilado para Molas | Direto da Fábrica | Torcisão',
            'meta' => 'Arame trefilado de médio e alto teor de carbono para fabricação de molas. Rolos ou spiders, bitolas de 4,76 a 15,88 mm. Peça sua cotação à Torcisão.',
            'intro' => 'Fabrica molas e precisa de um fornecedor de arame com consistência lote a lote? A Torcisão produz arame trefilado de médio e alto teor de carbono para quem fabrica molas, com atendimento técnico para chegar à especificação certa.',
            'why_title' => 'O que pesa na escolha do arame para molas',
            'why' => 'Na fabricação de molas, o arame precisa responder bem ao enrolamento e entregar a resistência que a peça exige. Por isso a escolha costuma ficar entre o médio e o alto teor de carbono: quanto maior a exigência de resistência da mola, mais o alto carbono entra na avaliação. A especificação final depende do tipo de mola, da bitola e do processo, e é validada com o nosso time técnico.',
            'products' => ['arame_mtc', 'arame_atc'],
            'theo' => 'Oi! Eu sou o Theo. Pra molas, a gente costuma indicar o arame de médio ou alto teor de carbono. Você já sabe a bitola que precisa?',
            'faq' => [
                ['Qual arame trefilado usar para fabricar molas?', 'Para molas, a Torcisão indica o arame trefilado de médio teor de carbono (aços 1035 a 1050) ou de alto teor de carbono (aços 1060 a 1090). Molas com maior exigência de resistência tendem a pedir o alto carbono. A escolha final considera o tipo de mola, a bitola e o processo, e é validada pela equipe técnica durante a cotação.'],
                ['Quais bitolas de arame para molas a Torcisão fornece?', 'As linhas de médio e alto teor de carbono vão de 4,76 a 15,88 mm, em perfil redondo, fornecidas em rolos ou spiders. A disponibilidade de cada bitola é confirmada na cotação.'],
            ],
            'related' => ['arame-cabos', 'barra-molas'],
        ],
        'arame-telas' => [
            'line' => 'arame', 'slug' => 'para-telas', 'app' => 'telas',
            'title' => 'Arame trefilado para telas',
            'seo_title' => 'Arame Trefilado para Telas | Fabricante | Torcisão',
            'meta' => 'Arame trefilado de médio teor de carbono para fabricação de telas. Aços 1035 a 1050, rolos ou spiders. Solicite sua cotação direto com a Torcisão.',
            'intro' => 'Produz telas e quer um arame que mantenha o ritmo da sua linha? A Torcisão fabrica arame trefilado de médio teor de carbono para produção de telas, fornecido em rolos ou spiders.',
            'why_title' => 'O que avaliar no arame para telas',
            'why' => 'Em telas, além das propriedades mecânicas, conta muito a regularidade do arame ao longo do rolo: variação de bitola e de acabamento atrapalha a alimentação da máquina e gera perda. Por isso vale definir com o fornecedor a bitola, o aço e a forma de acondicionamento que melhor conversam com o seu equipamento.',
            'products' => ['arame_mtc'],
            'theo' => 'Oi! Eu sou o Theo. Pra telas, o caminho aqui é o nosso arame de médio teor de carbono. Você já sabe a bitola que precisa?',
            'faq' => [
                ['Qual arame trefilado é indicado para telas?', 'Para telas, a Torcisão indica o arame trefilado de médio teor de carbono, com aços de 1035 a 1050 e bitolas de 4,76 a 15,88 mm. A especificação final é validada com a equipe técnica conforme o tipo de tela e o equipamento.'],
                ['Rolo ou spider: qual escolher para produzir telas?', 'Depende do sistema de alimentação da sua linha, do manuseio e do armazenamento. A Torcisão confirma a forma de fornecimento disponível para a especificação cotada.'],
            ],
            'related' => ['arame-gradil', 'arame-molas'],
        ],
        'arame-cabos' => [
            'line' => 'arame', 'slug' => 'para-cabos-de-aco', 'app' => 'cabos de aço',
            'title' => 'Arame trefilado para cabos de aço',
            'seo_title' => 'Arame Trefilado para Cabos de Aço | Torcisão Trefilados',
            'meta' => 'Arame trefilado de médio e alto teor de carbono para cabos e cabos de aço. Bitolas de 4,76 a 15,88 mm em rolos ou spiders. Fale com a Torcisão.',
            'intro' => 'Fabrica cabos ou cabos de aço? A Torcisão produz arame trefilado de médio e alto teor de carbono para essa aplicação, com suporte técnico para definir aço, bitola e fornecimento.',
            'why_title' => 'O que pesa na escolha do arame para cabos',
            'why' => 'Cabos de aço trabalham sob tração e esforço repetido, então resistência e uniformidade do arame são decisivas. O médio teor de carbono atende cabos em geral, e o alto teor de carbono entra quando a exigência de resistência é maior. A escolha final depende da construção do cabo e é validada com o nosso time técnico.',
            'products' => ['arame_mtc', 'arame_atc'],
            'theo' => 'Oi! Eu sou o Theo. Pra cabos, a gente costuma indicar o arame de médio ou alto teor de carbono. Você já sabe a bitola que precisa?',
            'faq' => [
                ['Qual arame trefilado usar para fabricar cabos de aço?', 'A Torcisão indica o arame trefilado de médio teor de carbono (aços 1035 a 1050) para cabos e o de alto teor de carbono (aços 1060 a 1090) para cabos de aço com maior exigência de resistência. A especificação é validada na cotação.'],
                ['Quais bitolas estão disponíveis?', 'As linhas de médio e alto teor de carbono vão de 4,76 a 15,88 mm, em perfil redondo, fornecidas em rolos ou spiders. A disponibilidade de cada bitola é confirmada na cotação.'],
            ],
            'related' => ['arame-molas', 'arame-telas'],
        ],
        'arame-gradil' => [
            'line' => 'arame', 'slug' => 'para-gradil-e-aramados', 'app' => 'gradil e aramados',
            'title' => 'Arame trefilado para gradil e aramados',
            'seo_title' => 'Arame Trefilado para Gradil e Aramados | Torcisão',
            'meta' => 'Arame trefilado de baixo carbono para gradil, displays, cestos, racks e carrinhos. Bitolas de 2,00 a 15,88 mm, em rolos ou spiders. Cote com a Torcisão.',
            'intro' => 'Fabrica gradil, displays aramados, cestos, racks ou carrinhos de supermercado? A Torcisão produz arame trefilado de baixo teor de carbono para peças conformadas, em bitolas de 2,00 a 15,88 mm.',
            'why_title' => 'Por que baixo carbono para peças aramadas',
            'why' => 'Gradis e aramados passam por dobra, conformação e solda. Nesses casos, conformabilidade e ductilidade costumam pesar mais que resistência máxima, e é aí que o arame de baixo teor de carbono entra. A escolha final considera a bitola, o processo e o acabamento da peça.',
            'products' => ['arame_btc'],
            'theo' => 'Oi! Eu sou o Theo. Pra gradil e aramados, o caminho aqui é o nosso arame de baixo teor de carbono. Você já sabe a bitola que precisa?',
            'faq' => [
                ['Qual arame trefilado é indicado para gradil?', 'Para gradil e peças aramadas, a Torcisão indica o arame trefilado de baixo teor de carbono, com aços de 1004 a 1020, bitolas de 2,00 a 15,88 mm, em rolos ou spiders.'],
                ['O arame de baixo carbono serve para displays, cestos e carrinhos?', 'Sim. Displays aramados, cestos aramados, racks metálicos, carrinhos de supermercado, utilidades domésticas e linha branca estão entre as aplicações da linha de baixo teor de carbono. A especificação final é validada na cotação.'],
            ],
            'related' => ['arame-telas', 'arame-cabos'],
        ],

        /* ---------------- BARRA ---------------- */
        'barra-fixadores' => [
            'line' => 'barra', 'slug' => 'para-fixadores', 'app' => 'fixadores',
            'title' => 'Barra trefilada para fixadores',
            'seo_title' => 'Barra Trefilada para Fixadores e Parafusos | Torcisão',
            'meta' => 'Barra trefilada de baixo, médio e alto teor de carbono para fixadores. Perfil redondo, bitolas até 15,88 mm. Peça sua cotação à Torcisão.',
            'intro' => 'Fabrica fixadores? A Torcisão produz barras trefiladas de baixo, médio e alto teor de carbono, em perfil redondo, com atendimento técnico para chegar ao aço e à bitola certos.',
            'why_title' => 'Como escolher a barra para fixadores',
            'why' => 'O teor de carbono acompanha a exigência mecânica do fixador: o baixo carbono atende peças com foco em conformação e acabamento, e o médio e o alto entram quando a peça pede mais resistência. Precisão dimensional e acabamento também contam, porque impactam a usinagem e a montagem.',
            'products' => ['barra_btc', 'barra_mtc', 'barra_atc'],
            'theo' => 'Oi! Eu sou o Theo. Pra fixadores, a gente trabalha com barra de baixo, médio e alto teor de carbono, conforme a exigência da peça. Você já sabe a bitola que precisa?',
            'faq' => [
                ['Qual barra trefilada usar para fixadores?', 'A Torcisão fornece barra trefilada de baixo (aços 1004 a 1020), médio (1035 a 1050) e alto teor de carbono (1060 a 1090) para fixadores. A escolha depende da exigência mecânica da peça e é validada na cotação.'],
                ['Qual a faixa de bitolas?', 'Baixo carbono de 2,00 a 15,88 mm; médio e alto carbono de 4,76 a 15,88 mm, em perfil redondo. A tolerância é definida sob consulta.'],
            ],
            'related' => ['barra-autopecas', 'barra-pinos'],
        ],
        'barra-autopecas' => [
            'line' => 'barra', 'slug' => 'para-autopecas', 'app' => 'autopeças',
            'title' => 'Barra trefilada para autopeças',
            'seo_title' => 'Barra Trefilada para Autopeças e Setor Automotivo | Torcisão',
            'meta' => 'Barras trefiladas de baixo, médio e alto carbono e aço ressulfurado 11SMn37 para autopeças. Bitolas até 15,88 mm. Cote com a Torcisão.',
            'intro' => 'Fornece para o setor automotivo? A Torcisão produz barras trefiladas de baixo, médio e alto teor de carbono e em aço ressulfurado 11SMn37 para autopeças, com tolerância definida sob consulta.',
            'why_title' => 'Como escolher a barra para autopeças',
            'why' => 'No automotivo, a escolha costuma passar por dois caminhos: peças que exigem resistência mecânica, atendidas pelas linhas de carbono, e peças muito usinadas, em que o aço ressulfurado 11SMn37 se destaca pela usinabilidade, precisão dimensional e acabamento. A especificação final é validada com o nosso time técnico.',
            'products' => ['barra_btc', 'barra_mtc', 'barra_atc', 'barra_ressulfurado'],
            'theo' => 'Oi! Eu sou o Theo. Pra autopeças, a gente tem barra de baixo, médio e alto carbono e também em aço ressulfurado, que é ótimo pra usinagem. Você já sabe a bitola que precisa?',
            'faq' => [
                ['Qual barra trefilada usar em autopeças?', 'Depende da peça: para exigência de resistência mecânica, as linhas de baixo, médio e alto teor de carbono; para peças com muita usinagem, o aço ressulfurado 11SMn37. A Torcisão valida a especificação durante a cotação.'],
                ['O que é o aço ressulfurado 11SMn37?', 'É um aço de corte fácil, indicado quando usinabilidade, precisão dimensional e acabamento são critérios importantes, como em pinos, pistões, bujões, válvulas e porcas.'],
            ],
            'related' => ['barra-pinos', 'barra-molas'],
        ],
        'barra-pinos' => [
            'line' => 'barra', 'slug' => 'para-pinos-e-pistoes', 'app' => 'pinos e pistões',
            'title' => 'Barra trefilada para pinos, pistões e bujões',
            'seo_title' => 'Barra Trefilada para Pinos e Pistões | Aço 11SMn37 | Torcisão',
            'meta' => 'Barra trefilada em aço ressulfurado 11SMn37 para pinos, pistões e bujões: usinabilidade e precisão dimensional. Bitolas de 4,76 a 15,88 mm.',
            'intro' => 'Usina pinos, pistões ou bujões? A Torcisão produz barra trefilada em aço ressulfurado 11SMn37, pensada para peças em que usinabilidade, precisão dimensional e acabamento fazem diferença.',
            'why_title' => 'Por que aço ressulfurado para peças usinadas',
            'why' => 'Em peças torneadas em série, a barra precisa render na máquina: cavaco curto, bom acabamento e dimensão estável reduzem parada e retrabalho. É exatamente para isso que o aço ressulfurado 11SMn37 é usado. A tolerância é definida sob consulta, conforme a peça.',
            'products' => ['barra_ressulfurado'],
            'theo' => 'Oi! Eu sou o Theo. Pra pinos e pistões, o caminho aqui é a nossa barra em aço ressulfurado 11SMn37. Você já sabe a bitola que precisa?',
            'faq' => [
                ['Qual barra usar para fabricar pinos?', 'Para pinos, pistões e bujões, a Torcisão indica a barra trefilada em aço ressulfurado 11SMn37, com bitolas de 4,76 a 15,88 mm e perfil redondo. A tolerância é definida sob consulta.'],
                ['Por que o aço 11SMn37 é bom para usinagem?', 'Ele é um aço ressulfurado, de corte fácil, indicado quando usinabilidade, precisão dimensional e acabamento são critérios importantes.'],
            ],
            'related' => ['barra-hidraulicos', 'barra-autopecas'],
        ],
        'barra-hidraulicos' => [
            'line' => 'barra', 'slug' => 'para-sistemas-hidraulicos-e-pneumaticos', 'app' => 'sistemas hidráulicos e pneumáticos',
            'title' => 'Barra trefilada para sistemas hidráulicos e pneumáticos',
            'seo_title' => 'Barra Trefilada para Hidráulica e Pneumática | Torcisão',
            'meta' => 'Barra trefilada em aço ressulfurado 11SMn37 para válvulas, porcas e componentes hidráulicos e pneumáticos. Bitolas de 4,76 a 15,88 mm.',
            'intro' => 'Fabrica válvulas, porcas ou componentes para sistemas hidráulicos e pneumáticos? A Torcisão produz barra trefilada em aço ressulfurado 11SMn37 para peças usinadas com exigência de precisão e acabamento.',
            'why_title' => 'O que importa em componentes hidráulicos e pneumáticos',
            'why' => 'Componentes que vedam ou conduzem fluidos dependem de dimensão precisa e bom acabamento. O aço ressulfurado 11SMn37 é usado justamente quando a peça passa por muita usinagem e precisa sair da máquina com qualidade. A tolerância é definida sob consulta.',
            'products' => ['barra_ressulfurado'],
            'theo' => 'Oi! Eu sou o Theo. Pra componentes hidráulicos e pneumáticos, o caminho aqui é a nossa barra em aço ressulfurado 11SMn37. Você já sabe a bitola que precisa?',
            'faq' => [
                ['Qual barra trefilada usar em válvulas e componentes hidráulicos?', 'A Torcisão indica a barra trefilada em aço ressulfurado 11SMn37, com bitolas de 4,76 a 15,88 mm, para válvulas, porcas e componentes de sistemas hidráulicos e pneumáticos. A tolerância é definida sob consulta.'],
            ],
            'related' => ['barra-pinos', 'barra-autopecas'],
        ],
        'barra-molas' => [
            'line' => 'barra', 'slug' => 'para-molas-helicoidais-e-amortecedores', 'app' => 'molas helicoidais e amortecedores',
            'title' => 'Barra trefilada para molas helicoidais e amortecedores',
            'seo_title' => 'Barra Trefilada para Molas Helicoidais e Amortecedores | Torcisão',
            'meta' => 'Barra trefilada de baixo, médio e alto teor de carbono para molas helicoidais e amortecedores. Bitolas até 15,88 mm. Peça cotação à Torcisão.',
            'intro' => 'Fabrica molas helicoidais ou componentes de amortecedores? A Torcisão produz barras trefiladas de baixo, médio e alto teor de carbono para essas aplicações, com atendimento técnico para definir o aço certo.',
            'why_title' => 'Como escolher a barra para molas helicoidais',
            'why' => 'Molas helicoidais e amortecedores trabalham com carga repetida, então o teor de carbono acompanha a exigência de resistência da peça. A escolha final depende do projeto, da bitola e do processo, e é validada com o nosso time técnico.',
            'products' => ['barra_btc', 'barra_mtc', 'barra_atc'],
            'theo' => 'Oi! Eu sou o Theo. Pra molas helicoidais e amortecedores, a gente trabalha com barra de baixo, médio e alto teor de carbono. Você já sabe a bitola que precisa?',
            'faq' => [
                ['Qual barra trefilada usar para molas helicoidais?', 'A Torcisão fornece barra trefilada de baixo, médio e alto teor de carbono para molas helicoidais e amortecedores. Quanto maior a exigência de resistência, mais o médio e o alto carbono entram na avaliação. A especificação é validada na cotação.'],
            ],
            'related' => ['arame-molas', 'barra-autopecas'],
        ],
        /* ---------------- HASTE DE ATERRAMENTO ---------------- */
        'haste-spda' => [
            'line' => 'haste', 'slug' => 'para-spda', 'app' => 'SPDA',
            'title' => 'Haste de aterramento para SPDA',
            'seo_title' => 'Haste de Aterramento para SPDA | Fabricante | Torcisão',
            'meta' => 'Haste de aterramento cobreada para SPDA, em baixa camada (até 20 µm) e alta camada (254 µm), com conectores no mesmo pedido. Cote direto com a fábrica.',
            'intro' => 'Projeta ou instala sistemas de proteção contra descargas atmosféricas? A Torcisão fabrica hastes de aterramento cobreadas de baixa e alta camada e fornece os conectores no mesmo pedido, com venda direta de fábrica.',
            'why_title' => 'O que conferir na haste para SPDA',
            'why' => 'Em SPDA, a especificação da haste vem do projeto: camada de cobre, bitola e comprimento são definidos pelo memorial e pelo responsável técnico, com base na ABNT NBR 5419:2026. Para hastes de aço cobreado, vale consultar também a ABNT NBR 13571. Na cotação, informe a camada exigida e o modelo de conector previsto, para que haste e conexão cheguem compatíveis.',
            'products' => ['haste_alta', 'haste_baixa'],
            'theo' => 'Oi! Eu sou o Theo. Pra SPDA, a camada da haste segue o que o projeto pede: baixa (até 20 µm) ou alta (254 µm). Você já sabe a bitola e o comprimento?',
            'faq' => [
                ['Qual haste de aterramento usar em SPDA?', 'A escolha segue o projeto. A Torcisão fabrica haste de baixa camada, de até 20 µm, e de alta camada, de 254 µm. Em SPDA, confirme a exigência normativa de camada, bitola e comprimento com o responsável técnico, com base na ABNT NBR 5419:2026.'],
                ['Quais medidas de haste de alta camada a Torcisão fabrica?', 'Alta camada (254 µm) em 1/2”, 5/8” e 3/4”, com 2,40 m e 3,00 m. O comprimento de 2,00 m é sob consulta.'],
                ['A Torcisão fornece os conectores junto com as hastes?', 'Sim. Os conectores Olhal e Grampo U, com referência publicada na ABNT NBR 5370, podem ser cotados e entregues no mesmo pedido das hastes.'],
            ],
            'related' => ['haste-construtoras', 'haste-distribuidores'],
        ],
        'haste-distribuidores' => [
            'line' => 'haste', 'slug' => 'para-distribuidores-e-revendas', 'app' => 'distribuidores e revendas',
            'title' => 'Haste de aterramento para distribuidores e revendas',
            'seo_title' => 'Haste de Aterramento para Distribuidores e Revendas | Torcisão',
            'meta' => 'Fabricante de haste de aterramento cobreada para distribuidores e revendas de material elétrico. Baixa e alta camada, pacotes com 10 unidades. Peça cotação.',
            'intro' => 'Revende material elétrico e precisa de um fabricante de hastes de aterramento com fornecimento regular? A Torcisão vende direto da fábrica para distribuidores e atacadistas, com hastes de baixa e alta camada e conectores no mesmo pedido.',
            'why_title' => 'O que pesa na compra para revenda',
            'why' => 'Para quem revende, contam a regularidade do fornecimento, o mix de bitolas e comprimentos e a documentação do produto. A Torcisão fornece as hastes em pacotes com 10 unidades e confirma disponibilidade e prazo em cada proposta. Hastes e conectores podem seguir no mesmo pedido, o que simplifica a conferência e a logística.',
            'products' => ['haste_baixa', 'haste_alta'],
            'theo' => 'Oi! Eu sou o Theo. Pra revenda, a gente trabalha com haste de baixa camada (até 20 µm) e de alta camada (254 µm). Você já sabe quais bitolas e comprimentos quer cotar?',
            'faq' => [
                ['Quais medidas de haste de aterramento a Torcisão fabrica?', 'Alta camada (254 µm) em 1/2”, 5/8” e 3/4”, com 2,40 m e 3,00 m. Baixa camada (20 µm) de 9,00 a 15,40 mm, com comprimentos de 1,00 m a 3,00 m.'],
                ['Como as hastes são embaladas?', 'As hastes são fornecidas em pacotes com 10 unidades.'],
                ['Posso cotar hastes e conectores no mesmo pedido?', 'Sim. A Torcisão atende distribuidores, atacadistas, construtoras e instaladores de SPDA com venda direta de fábrica, e hastes e conectores podem ser cotados e entregues no mesmo pedido.'],
            ],
            'related' => ['haste-spda', 'haste-construtoras'],
        ],
        'haste-construtoras' => [
            'line' => 'haste', 'slug' => 'para-construtoras-e-instaladores', 'app' => 'construtoras e instaladores',
            'title' => 'Haste de aterramento para construtoras e instaladores',
            'seo_title' => 'Haste de Aterramento para Construtoras e Instaladores | Torcisão',
            'meta' => 'Haste de aterramento cobreada para obras e instalações de aterramento e SPDA. Baixa e alta camada, conectores no mesmo pedido. Cote direto com a Torcisão.',
            'intro' => 'Executa obras ou instala sistemas de aterramento e SPDA? A Torcisão fabrica hastes de aterramento cobreadas e atende construtoras e instaladores com venda direta de fábrica.',
            'why_title' => 'Como evitar retrabalho na compra da haste',
            'why' => 'Em obra, o que evita retrabalho é comprar a haste exatamente como o memorial descreve: camada, bitola, comprimento e modelo de conector. Com esses dados na cotação, a equipe confirma disponibilidade e prazo, e hastes e conectores chegam no mesmo pedido.',
            'products' => ['haste_alta', 'haste_baixa'],
            'theo' => 'Oi! Eu sou o Theo. Pra obra, o melhor é cotar a haste como está no memorial: camada, bitola e comprimento. Você já tem esses dados?',
            'faq' => [
                ['O que informar para cotar hastes para uma obra?', 'Informe aplicação, camada, bitola, comprimento, modelo de conector ou cabo quando aplicável, quantidade e qualquer requisito técnico previsto no desenho ou memorial.'],
                ['Qual a diferença entre baixa e alta camada?', 'A Torcisão trabalha com opções de baixa camada, de até 20 mícrons, e alta camada, de 254 mícrons. A escolha deve seguir a especificação técnica e a condição de instalação do projeto; em aplicações de SPDA, confirme a exigência normativa com o responsável técnico.'],
                ['Qual o prazo de entrega das hastes?', 'O prazo é confirmado em cada proposta. Hastes em estoque têm o atendimento mais rápido; itens que dependem de trefilação ou banho de cobre seguem a programação da linha. Em caso de urgência, informe a data necessária na cotação.'],
            ],
            'related' => ['haste-spda', 'haste-distribuidores'],
        ],
    ];
}

/** FAQ comum (vale para todas). */
function torcisao_app_common_faq($line) {
    if ($line === 'haste') return [
        ['Qual é o lote mínimo?', '30 peças para a haste de alta camada (254 µm) e 100 peças para a haste de baixa camada (20 µm). Os conectores são cotados no mesmo pedido das hastes.'],
        ['Como solicitar uma cotação?', 'Preencha o formulário de cotação nesta página, ou fale com o comercial pelo WhatsApp ou pelo Theo, informando camada, bitola, comprimento, quantidade e aplicação. Se houver requisito de norma, conector ou documentação, inclua esses dados.'],
    ];
    return [
        ['Qual é o pedido mínimo?', 'O lote mínimo varia conforme o aço, a bitola, a condição de produção, o ' . ($line === 'arame' ? 'acondicionamento' : 'comprimento') . ' e a quantidade. A Torcisão confirma a condição comercial durante a cotação.'],
        ['Como solicitar uma cotação?', 'Preencha o formulário de cotação nesta página, ou fale com o comercial pelo WhatsApp ou pelo Theo, informando aço, bitola, quantidade e aplicação. Se houver exigência de resistência, dureza, acabamento, tolerância ou documentação, inclua esses dados.'],
    ];
}

function torcisao_app_page_url($key) {
    $id = (int) (get_option('torcisao_app_page_ids', [])[$key] ?? 0);
    if ($id && get_post_status($id) === 'publish') return get_permalink($id);
    return '';
}

function torcisao_app_current_key() {
    if (!is_page()) return '';
    $key = (string) get_post_meta(get_queried_object_id(), '_torcisao_app', true);
    return isset(torcisao_app_pages()[$key]) ? $key : '';
}

/* ------------------------------------------------------------
 * Criação das páginas (rascunho), uma vez por versão
 * ------------------------------------------------------------ */
add_action('admin_init', function () {
    if (!current_user_can('publish_pages') || get_option('torcisao_app_pages_version') === TORCISAO_APP_PAGES_VERSION) return;
    $ids = (array) get_option('torcisao_app_page_ids', []);
    $parents = ['arame' => get_page_by_path('arame-trefilado'), 'barra' => get_page_by_path('barra-trefilada'), 'haste' => get_page_by_path('haste-de-aterramento')];
    $created = 0;
    foreach (torcisao_app_pages() as $key => $p) {
        if (array_key_exists($key, $ids)) continue;   // já criada antes (se foi apagada de propósito, não recria)
        $parent = $parents[$p['line']] ?? null;
        $id = wp_insert_post([
            'post_type' => 'page',
            'post_status' => 'draft',
            'post_title' => $p['title'],
            'post_name' => $p['slug'],
            'post_parent' => $parent ? (int) $parent->ID : 0,
            'post_content' => '',
            'meta_input' => [
                '_wp_page_template' => 'template-aplicacao.php',
                '_torcisao_app' => $key,
                '_yoast_wpseo_title' => $p['seo_title'],
                '_yoast_wpseo_metadesc' => $p['meta'],
                '_yoast_wpseo_focuskw' => mb_strtolower($p['title']),
            ],
        ], true);
        if (is_wp_error($id)) continue;
        if (function_exists('pll_set_post_language')) pll_set_post_language($id, 'pt');
        $ids[$key] = (int) $id;
        $created++;
    }
    update_option('torcisao_app_page_ids', $ids, false);
    update_option('torcisao_app_pages_version', TORCISAO_APP_PAGES_VERSION, false);
    if ($created) set_transient('torcisao_app_pages_notice', $created, WEEK_IN_SECONDS);
});

/* Frase-chave do Yoast nas páginas já criadas (uma vez) */
add_action('admin_init', function () {
    if (!current_user_can('edit_pages') || get_option('torcisao_app_focuskw_done') === '1') return;
    foreach ((array) get_option('torcisao_app_page_ids', []) as $key => $id) {
        $p = torcisao_app_pages()[$key] ?? null;
        if ($p && $id && !get_post_meta($id, '_yoast_wpseo_focuskw', true)) update_post_meta($id, '_yoast_wpseo_focuskw', mb_strtolower($p['title']));
    }
    update_option('torcisao_app_focuskw_done', '1', false);
}, 30);

/* Páginas retiradas (ex.: arame para pregos — a Torcisão não fabrica arame para prego) */
function torcisao_app_retired() { return ['arame-pregos']; }
add_action('admin_init', function () {
    if (!current_user_can('delete_pages') || get_option('torcisao_app_retired_done') === TORCISAO_APP_PAGES_VERSION) return;
    $ids = (array) get_option('torcisao_app_page_ids', []);
    foreach (torcisao_app_retired() as $key) {
        $id = (int) ($ids[$key] ?? 0);
        if ($id && get_post_status($id) === 'draft') wp_trash_post($id);   // vai para a lixeira (dá para restaurar)
    }
    update_option('torcisao_app_retired_done', TORCISAO_APP_PAGES_VERSION, false);
}, 20);
add_action('template_redirect', function () {
    if (!is_page()) return;
    $key = (string) get_post_meta(get_queried_object_id(), '_torcisao_app', true);
    if ($key && in_array($key, torcisao_app_retired(), true)) { wp_safe_redirect(home_url('/arame-trefilado/'), 301); exit; }
});

add_action('admin_notices', function () {
    $n = (int) get_transient('torcisao_app_pages_notice');
    if (!$n || !current_user_can('publish_pages')) return;
    $url = admin_url('edit.php?post_type=page&post_status=draft');
    echo '<div class="notice notice-info is-dismissible"><p><strong>Páginas de aplicação:</strong> ' . (int) $n . ' páginas foram criadas como rascunho (ex.: "Arame trefilado para molas"). <a href="' . esc_url($url) . '">Revisar e publicar</a></p></div>';
});

/* Template disponível no seletor de modelo da página */
add_filter('theme_page_templates', function ($templates) {
    $templates['template-aplicacao.php'] = 'Página de aplicação';
    return $templates;
});

/* FAQ em dados estruturados */
add_action('wp_head', function () {
    $key = torcisao_app_current_key();
    if (!$key) return;
    $p = torcisao_app_pages()[$key];
    $faq = array_merge($p['faq'], torcisao_app_common_faq($p['line']));
    $url = get_permalink();
    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        '@id' => $url . '#faq',
        'url' => $url,
        'inLanguage' => 'pt-BR',
        'mainEntity' => array_map(function ($f) { return ['@type' => 'Question', 'name' => $f[0], 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f[1]]]; }, $faq),
    ];
    echo "\n<script type=\"application/ld+json\" id=\"torcisao-app-faq-schema\">" . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "</script>\n";
}, 30);

/* Sem Yoast, ao menos título e descrição */
add_filter('pre_get_document_title', function ($title) {
    if (defined('WPSEO_VERSION')) return $title;
    $key = torcisao_app_current_key();
    return $key ? torcisao_app_pages()[$key]['seo_title'] : $title;
}, 20);
add_action('wp_head', function () {
    if (defined('WPSEO_VERSION')) return;
    $key = torcisao_app_current_key();
    if ($key) echo '<meta name="description" content="' . esc_attr(torcisao_app_pages()[$key]['meta']) . "\">\n";
}, 1);
