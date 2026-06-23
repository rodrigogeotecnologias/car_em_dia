export const mockProperty = {
  nome: 'Fazenda Ipê Amarelo',
  municipio: 'Brazlândia',
  estado: 'DF',
  numeroCar: 'DF-5300108-1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P',
  matricula: '98765',
  areaTotal: 85.0, // hectares
  indiceRegularidade: 88,
  
  // Coordenadas centrais para o mapa (Brazlândia - DF)
  center: [-15.6500, -48.1500],
  
  // Limites da propriedade declarada pelo usuário
  limites: [
    [-15.6450, -48.1550],
    [-15.6450, -48.1450],
    [-15.6550, -48.1450],
    [-15.6550, -48.1550]
  ],

  // BASE OFICIAL: Hidrografia (Rio simulado cortando a propriedade)
  hidrografia: [
    [-15.6450, -48.1500],
    [-15.6500, -48.1480],
    [-15.6550, -48.1520]
  ],

  // BASE OFICIAL: APP exigida por lei (calculada pelo sistema a partir do rio)
  appOficial: [
    [-15.6450, -48.1510], [-15.6500, -48.1490], [-15.6550, -48.1530],
    [-15.6550, -48.1510], [-15.6500, -48.1470], [-15.6450, -48.1490]
  ],

  // DECLARADO PELO USUÁRIO: APP (Insuficiente - gera alerta amarelo)
  appDeclarada: [
    [-15.6450, -48.1505], [-15.6500, -48.1485], [-15.6550, -48.1525],
    [-15.6550, -48.1515], [-15.6500, -48.1475], [-15.6450, -48.1495]
  ],
  
  // DECLARADO PELO USUÁRIO: Reserva Legal (Verde - Regular)
  reservaLegal: [
    [-15.6520, -48.1540],
    [-15.6520, -48.1490],
    [-15.6540, -48.1490],
    [-15.6540, -48.1540]
  ],

  // DECLARADO PELO USUÁRIO: Áreas Consolidadas
  usoAlternativo: [
    [-15.6460, -48.1540],
    [-15.6460, -48.1515],
    [-15.6510, -48.1515],
    [-15.6510, -48.1540]
  ],

  pendencias: [
    {
      id: 1,
      tipo: 'APP',
      status: 'warning', // amarelo
      tituloTecnico: 'APP Declarada Inferior à APP Oficial',
      explicacaoSimples: 'A faixa de proteção ao redor do rio que você declarou está menor do que os 30 metros exigidos por lei para esse tipo de curso d\'água.',
      impactos: [
        'Necessidade de retificar o polígono da APP no CAR.',
        'Atraso na validação estadual.'
      ],
      recomendacao: 'No mapa, compare a camada "APP (Sua Declaração)" em amarelo com a camada "APP Oficial (Base do Governo)" em vermelho. Você precisa corrigir o seu desenho para cobrir toda a área vermelha.'
    },
    {
      id: 2,
      tipo: 'Reserva Legal',
      status: 'success', // verde
      tituloTecnico: 'Reserva Legal Declarada Regular',
      explicacaoSimples: 'A área separada para preservação na sua propriedade atende à porcentagem mínima exigida para o bioma Cerrado (20%).',
      impactos: [],
      recomendacao: 'Mantenha a conservação desta área. Nenhuma ação corretiva é necessária no momento.'
    },
    {
      id: 3,
      tipo: 'Uso do Solo',
      status: 'warning', // amarelo
      tituloTecnico: 'Área Consolidada Próxima à APP',
      explicacaoSimples: 'Identificamos que parte da sua área de plantio/pastagem está muito próxima à beira do rio.',
      impactos: [
        'Risco de contaminação hídrica.',
        'Possível questionamento do órgão ambiental.'
      ],
      recomendacao: 'Certifique-se de não utilizar agrotóxicos na divisa com a área de preservação. Nenhuma retificação no mapa é obrigatória se respeitar os limites.'
    }
  ]
};
