/* 2026-11 · Explorador de produtos da home: textos que ficavam em português em /en/ e /es/. */
(function(){
'use strict';
const i18n=window.TorcisaoI18n;if(!i18n||typeof i18n.register!=='function'||!['en','es'].includes(i18n.lang))return;
const EN={
  'Explorador de produtos Torcisão':'Torcisão product explorer',
  'BTC · Baixo Carbono':'Low Carbon','MTC · Médio Carbono':'Medium Carbon','ATC · Alto Carbono':'High Carbon',
  'Trefilada polida':'Polished drawn','CONECTORES':'CONNECTORS','Diâmetros':'Diameters','Comprimentos':'Lengths','Cobre':'Copper',
  'Pureza ≥ 99,9%':'Purity ≥ 99.9%','Pacotes com 10 unidades':'Bundles of 10 units',
  '1004 a 1020':'1004 to 1020','1035 a 1050':'1035 to 1050','1060 a 1090':'1060 to 1090',
  '2,00 a 15,88 mm':'2.00 to 15.88 mm','4,76 a 15,88 mm':'4.76 to 15.88 mm',
  '9,00 · 10,00 · 11,00 · 12,30 · 12,70 · 15,40 mm':'9.00 · 10.00 · 11.00 · 12.30 · 12.70 · 15.40 mm',
  '1.000 · 1.200 · 1.500 · 2.000 · 2.400 · 3.000 mm':'1,000 · 1,200 · 1,500 · 2,000 · 2,400 · 3,000 mm',
  '2.000 · 2.400 · 3.000 mm':'2,000 · 2,400 · 3,000 mm',
  '2 kg / 100 peças':'2 kg / 100 pieces','4 kg / 100 peças':'4 kg / 100 pieces','8,5 kg / 100 peças':'8.5 kg / 100 pieces','15 kg / 100 peças':'15 kg / 100 pieces',
  'Arame trefilado para aplicações industriais em que uniformidade dimensional, bitola e condição de fornecimento precisam ser avaliadas.':'Drawn wire for industrial applications where dimensional uniformity, diameter and supply condition need to be assessed.',
  'Opção para aplicações que exigem validação de propriedades mecânicas, bitola e processo.':'Option for applications that require validation of mechanical properties, diameter and process.',
  'Opção para aplicações que pedem validação de resistência, plasticidade, dureza e processo.':'Option for applications that require validation of strength, plasticity, hardness and process.',
  'Barra de perfil redondo para aplicações que exigem controle dimensional e acabamento superficial.':'Round bar for applications that require dimensional control and surface finish.',
  'Barra trefilada para aplicações mecânicas em que aço, bitola, propriedades e processo precisam ser validados.':'Drawn bar for mechanical applications where steel grade, diameter, properties and process need to be validated.',
  'Barra trefilada para aplicações que exigem validação de resistência mecânica, bitola e processo.':'Drawn bar for applications that require validation of mechanical strength, diameter and process.',
  'Opção em aço de corte livre para aplicações em que usinabilidade, precisão dimensional e acabamento são critérios relevantes.':'Free-cutting steel option for applications where machinability, dimensional accuracy and finish are relevant criteria.',
  'Haste com núcleo sólido de aço-carbono SAE 1010/1020 e revestimento de cobre de 20 µm.':'Rod with a solid SAE 1010/1020 carbon steel core and a 20 µm copper coating.',
  'Haste com núcleo SAE 1010/1020 e revestimento eletrolítico de cobre de 254 µm.':'Rod with an SAE 1010/1020 core and a 254 µm electrolytic copper coating.',
  'Conector para união entre haste e cabo em sistemas de aterramento.':'Connector for joining rod and cable in grounding systems.',
  'Modelo reforçado para conexão entre haste e cabo em sistemas de aterramento.':'Reinforced model for connecting rod and cable in grounding systems.',
  'Conector em formato U para união entre haste e cabo.':'U-shaped connector for joining rod and cable.',
  'Modelo reforçado em formato U para conexão entre haste e cabo.':'Reinforced U-shaped model for connecting rod and cable.'
};
const ES={
  'Explorador de produtos Torcisão':'Explorador de productos Torcisão',
  'BTC · Baixo Carbono':'Bajo Carbono','MTC · Médio Carbono':'Medio Carbono','ATC · Alto Carbono':'Alto Carbono',
  'Trefilada polida':'Trefilada pulida','CONECTORES':'CONECTORES','Diâmetros':'Diámetros','Comprimentos':'Longitudes','Cobre':'Cobre',
  'Pureza ≥ 99,9%':'Pureza ≥ 99,9%','Pacotes com 10 unidades':'Paquetes de 10 unidades',
  '1004 a 1020':'1004 a 1020','1035 a 1050':'1035 a 1050','1060 a 1090':'1060 a 1090',
  '2 kg / 100 peças':'2 kg / 100 piezas','4 kg / 100 peças':'4 kg / 100 piezas','8,5 kg / 100 peças':'8,5 kg / 100 piezas','15 kg / 100 peças':'15 kg / 100 piezas',
  'Arame trefilado para aplicações industriais em que uniformidade dimensional, bitola e condição de fornecimento precisam ser avaliadas.':'Alambre trefilado para aplicaciones industriales en las que deben evaluarse la uniformidad dimensional, el diámetro y la condición de suministro.',
  'Opção para aplicações que exigem validação de propriedades mecânicas, bitola e processo.':'Opción para aplicaciones que requieren validar propiedades mecánicas, diámetro y proceso.',
  'Opção para aplicações que pedem validação de resistência, plasticidade, dureza e processo.':'Opción para aplicaciones que requieren validar resistencia, plasticidad, dureza y proceso.',
  'Barra de perfil redondo para aplicações que exigem controle dimensional e acabamento superficial.':'Barra de perfil redondo para aplicaciones que requieren control dimensional y acabado superficial.',
  'Barra trefilada para aplicações mecânicas em que aço, bitola, propriedades e processo precisam ser validados.':'Barra trefilada para aplicaciones mecánicas en las que deben validarse acero, diámetro, propiedades y proceso.',
  'Barra trefilada para aplicações que exigem validação de resistência mecânica, bitola e processo.':'Barra trefilada para aplicaciones que requieren validar resistencia mecánica, diámetro y proceso.',
  'Opção em aço de corte livre para aplicações em que usinabilidade, precisão dimensional e acabamento são critérios relevantes.':'Opción en acero de fácil mecanizado para aplicaciones en las que la maquinabilidad, la precisión dimensional y el acabado son criterios relevantes.',
  'Haste com núcleo sólido de aço-carbono SAE 1010/1020 e revestimento de cobre de 20 µm.':'Varilla con núcleo sólido de acero al carbono SAE 1010/1020 y revestimiento de cobre de 20 µm.',
  'Haste com núcleo SAE 1010/1020 e revestimento eletrolítico de cobre de 254 µm.':'Varilla con núcleo SAE 1010/1020 y revestimiento electrolítico de cobre de 254 µm.',
  'Conector para união entre haste e cabo em sistemas de aterramento.':'Conector para la unión entre varilla y cable en sistemas de puesta a tierra.',
  'Modelo reforçado para conexão entre haste e cabo em sistemas de aterramento.':'Modelo reforzado para la conexión entre varilla y cable en sistemas de puesta a tierra.',
  'Conector em formato U para união entre haste e cabo.':'Conector en forma de U para la unión entre varilla y cable.',
  'Modelo reforçado em formato U para conexão entre haste e cabo.':'Modelo reforzado en forma de U para la conexión entre varilla y cable.'
};
i18n.register(i18n.lang==='en'?EN:ES);
if(typeof i18n.refresh==='function')i18n.refresh();
})();
