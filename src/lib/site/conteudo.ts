/**
 * Conteúdo estruturado do site institucional Souza & Souza.
 *
 * Fonte: pasta `Site/` na raiz — extração literal do site em produção,
 * reconferida contra o HTML em 27/07/2026.
 *
 * O copy é do cliente e é literal. As únicas alterações autorizadas, todas
 * aplicadas aqui, são correções de digitação do original:
 *   · `Usucapiao` → `Usucapião`, `Inventario` → `Inventário`, `Auxilio` → `Auxílio`
 *   · espaços duplos removidos
 *   · bullet solto em "pareceres e opiniões • legais" removido
 *   · "órgãos públicos, privadas ou mistos" → "privados"
 *   · "Atos de registro e averbação", que aparecia duas vezes, aparece uma
 *   · rótulo de depoimento padronizado em "Serviço contratado"
 *
 * Nada além disso. Não há OAB nem URL de Facebook porque o cliente nunca os
 * forneceu — o elemento não é renderizado em vez de receber placeholder.
 */

export interface Servico {
  texto: string;
  /** Prestado em parceria com BVZ Advogados/SP, não diretamente pelo escritório. */
  parceria?: boolean;
}

export interface Subgrupo {
  titulo: string;
  servicos: Servico[];
}

export interface AreaDoDireito {
  slug: string;
  nome: string;
  sobretitulo?: string;
  /** Nota de rodapé da área — hoje só o Tributário tem. */
  nota?: string;
  /** Imagem de card na home. Só as 4 áreas destacadas têm. */
  imagem?: { src: string; alt: string; width: number; height: number };
  servicos?: Servico[];
  subgrupos?: Subgrupo[];
}

// ---------------------------------------------------------------------------
// Áreas do direito — 7 áreas, 64 serviços
// ---------------------------------------------------------------------------

export const areasDoDireito: AreaDoDireito[] = [
  {
    slug: "previdenciario",
    nome: "Direito Previdenciário",
    sobretitulo: "Previdenciário",
    imagem: {
      src: "/site/home/area-direito-previdenciario.jpg",
      alt: "Mãe segurando uma criança no colo, representando o Direito Previdenciário",
      width: 1188,
      height: 1788,
    },
    servicos: [
      { texto: "Planejamento Previdenciário" },
      { texto: "Aposentadoria Especial" },
      { texto: "Aposentadoria por Tempo de Contribuição" },
      { texto: "Aposentadoria por Idade - Urbana; BPC/LOAS" },
      { texto: "Pensão por Morte - Urbana" },
      {
        texto:
          "Benefícios por Incapacidade (Auxílio Doença e Ap. por Invalidez)",
      },
      {
        texto:
          "Benefícios Rurais (Aposentadoria, Pensão por Morte e Benefícios por Incapacidade)",
      },
      { texto: "Revisões de benefícios" },
      { texto: "Emissão da Certidão de Tempo de Contribuição (CTC)" },
    ],
  },
  {
    slug: "trabalhista",
    nome: "Direito Trabalhista",
    sobretitulo: "Relações Trabalhistas",
    imagem: {
      src: "/site/home/area-direito-trabalhista.jpg",
      alt: "Mulher lendo documentos sobre uma mesa, representando o Direito Trabalhista",
      width: 587,
      height: 889,
    },
    servicos: [
      {
        texto:
          "Regula relações empregatícias, direitos e obrigações patronais e do empregado",
      },
      { texto: "Cálculos rescisórios" },
    ],
  },
  {
    slug: "assessoria-juridica",
    nome: "Assessoria Jurídica",
    servicos: [
      { texto: "Consultivo" },
      { texto: "Preventivo" },
      { texto: "Contencioso" },
      { texto: "Elaboração e revisão de minutas contratuais" },
    ],
  },
  {
    slug: "tributario",
    nome: "Direito Tributário",
    nota: "Parceria: BVZ Advogados/SP",
    imagem: {
      src: "/site/home/area-direito-tributario.jpg",
      alt: "Calculadora sobre gráficos financeiros impressos, representando o Direito Tributário",
      width: 1192,
      height: 1792,
    },
    servicos: [
      {
        texto:
          "Planejamento tributário envolvendo tributos diretos e indiretos",
        parceria: true,
      },
      {
        texto:
          "Elaboração de pareceres e opiniões legais em matéria tributária",
        parceria: true,
      },
      {
        texto:
          "Atuação em fiscalizações, consultas sobre interpretação da legislação tributária e contencioso administrativo e judicial em matéria fiscal",
        parceria: true,
      },
      {
        texto:
          "Isenção de IPVA; Restituição da Contribuição Previdenciária junto ao Estado de Goiás; Isenção do Imposto de Renda retido na fonte para portador de doença grave",
      },
    ],
  },
  {
    slug: "civil",
    nome: "Direito Civil",
    imagem: {
      src: "/site/home/area-direito-civil.jpg",
      alt: "Família reunida ao ar livre num parque, representando o Direito Civil",
      width: 898,
      height: 1368,
    },
    subgrupos: [
      {
        titulo: "Direito de Família",
        servicos: [
          { texto: "Planejamento Sucessório" },
          { texto: "Inventário" },
          { texto: "Divórcio" },
          { texto: "União Estável" },
          { texto: "Pensão Alimentícia" },
          { texto: "Guarda" },
          { texto: "Regulamentação de visitas" },
          { texto: "Modificação de regime de bens" },
          { texto: "Investigação de paternidade" },
          { texto: "Ação de interdição" },
          { texto: "Ação de exoneração de alimentos" },
          { texto: "Ação de revisão de alimentos" },
        ],
      },
      {
        titulo: "Geral",
        servicos: [
          { texto: "Indenização por dano material" },
          { texto: "Indenização por dano moral" },
          { texto: "Ação de cobrança" },
          { texto: "Execução de título extrajudicial" },
          { texto: "Ação declaratória de inexistência de débito" },
          { texto: "Alvará judicial" },
          { texto: "Ação da Obrigação de Fazer" },
          { texto: "Embargos de Terceiro" },
          { texto: "Ação monitória" },
          { texto: "Ação de despejo" },
          { texto: "DPVAT" },
        ],
      },
      {
        titulo: "Direito Imobiliário",
        servicos: [
          { texto: "Contratos de Imóveis" },
          { texto: "Usucapião" },
          { texto: "Ações Possessórias" },
        ],
      },
    ],
  },
  {
    slug: "extrajudicial",
    nome: "Serviços Extrajudiciais",
    sobretitulo: "Extrajudicial",
    servicos: [
      {
        texto:
          "Acompanhamento de cliente a órgão administrativo ou judiciário (Raio de 50 km)",
      },
      {
        texto:
          "Análise e Parecer de processo em andamento em órgãos administrativos e/ou judiciários",
      },
      { texto: "Intervenção para solução de conflito extrajudicial amigável" },
      { texto: "Cobrança extrajudicial" },
      { texto: "Atos de registro e averbação" },
      { texto: "Usucapião" },
      { texto: "Notificação extrajudicial" },
      { texto: "Ata notarial" },
      { texto: "Análise de contrato a pedido do cliente" },
      { texto: "Elaboração de contratos" },
      { texto: "Testamento / Doação" },
      { texto: "Inventário Extrajudicial" },
      { texto: "Intermediação para contratação de profissional Terceiro" },
    ],
  },
  {
    slug: "diligencias-administrativas",
    nome: "Diligências Administrativas",
    sobretitulo: "Diligências ADM",
    servicos: [
      { texto: "Emissão de Certidão Negativa de Autoria" },
      {
        texto: "Solicitação de Perfil Profissiográfico Previdenciário (PPP)",
      },
      {
        texto:
          "Retirada de documento junto à APS (Agência da Previdência Social) de Catalão/GO",
      },
      {
        texto:
          "Tratamento e solução de pendências junto à APS de Catalão/GO",
      },
      { texto: "Solicitação de documentos junto aos Cartórios" },
      {
        texto:
          "Acompanhamento/Assistência de clientes em órgãos públicos, privados ou mistos",
      },
      {
        texto:
          "Entrega/Devolução de documentos originais em endereço indicado pelo cliente",
      },
    ],
  },
];

/** As 4 áreas que aparecem como card na home. */
export const areasEmDestaque = areasDoDireito.filter((area) => area.imagem);

/** Total de serviços de uma área, somando os diretos e os aninhados em subgrupos. */
export function contarServicos(area: AreaDoDireito) {
  const diretos = area.servicos?.length ?? 0;
  const aninhados =
    area.subgrupos?.reduce((total, grupo) => total + grupo.servicos.length, 0) ??
    0;
  return diretos + aninhados;
}

// ---------------------------------------------------------------------------
// Equipe — 3 sócias + 2 associadas
// ---------------------------------------------------------------------------

export interface Advogada {
  nome: string;
  papel: "socia" | "associada";
  foto: { src: string; width: number; height: number };
  bio: string;
}

export const equipe: Advogada[] = [
  {
    nome: "Paula Faids Carneiro Souza Sales",
    papel: "socia",
    foto: { src: "/site/profissionais/paula-faids.jpg", width: 1707, height: 2560 },
    bio: "Advogada com formação acadêmica desde 2006. Inscrita na Ordem dos Advogados do Brasil, Seccional Goiás. Atuante em Direito Previdenciário, Empresarial e Cível. Título de Especialista em Direito Previdenciário e Direito Processual. Presidente da Comissão de Direito Previdenciário, Subseção OAB de Catalão/GO, nos triênios 2013/2015 e 2019/2021. Sócia e Advogada do Escritório Souza & Souza Advocacia desde 2007.",
  },
  {
    nome: "Angela Carneiro Souza Borba",
    papel: "socia",
    foto: { src: "/site/profissionais/angela-borba.jpg", width: 1705, height: 2560 },
    bio: "Advogada com formação acadêmica desde 2013. Inscrita na Ordem dos Advogados do Brasil, Seccional Goiás. Atuante em Direito Previdenciário, especialmente em benefícios rurais, tais como: aposentadorias, pensões e benefícios por incapacidade, além de benefício assistencial (BPC/LOAS). Sócia e Advogada do Escritório Souza & Souza Advocacia desde 2014.",
  },
  {
    nome: "Kelly Marques de Souza",
    papel: "socia",
    foto: { src: "/site/profissionais/kelly-marques.jpg", width: 1707, height: 2560 },
    bio: "Advogada com formação acadêmica desde 2001. Inscrita na Ordem dos Advogados do Brasil, Seccional Goiás. Atuante em Direito Trabalhista, Empresarial, Previdenciário e Cível. Título de Especialista em Direito e Processo do Trabalho e Direito Público. Sócia e Advogada do Escritório Souza & Souza Advocacia desde 2007.",
  },
  {
    nome: "Flávia da Silva Almeida",
    papel: "associada",
    foto: { src: "/site/associadas/flavia-almeida.jpg", width: 905, height: 1280 },
    bio: "Advogada atuante na Área do Direito Cível e inscrita na Ordem dos Advogados do Brasil, Seccional Goiás. Especialista em Direito de Família, com foco em Guarda e Visitas, Divórcio e Pensão Alimentícia. Também atua com a propositura de medidas jurídicas visando à proteção de direitos civis, tais como: Ações indenizatórias, Ações consumeristas, elaboração, revisão e acompanhamento de contratos, ações de cobrança, entre outras questões civilistas.",
  },
  {
    nome: "Bárbara de Carvalho Matoso",
    papel: "associada",
    foto: { src: "/site/associadas/barbara-matoso.jpg", width: 853, height: 1280 },
    bio: "Advogada atuante na Área do Direito Cível e inscrita na Ordem dos Advogados do Brasil, Seccional Goiás. Vasta experiência nas questões relacionadas ao Direito Sucessório, Inventário e Partilha, Direito Imobiliário, Regularização de Imóveis, Usucapião e Contratos Imobiliários, bem como para a área consumerista. Assessoria jurídica para Pessoas Físicas e Pessoas Jurídicas em ações judiciais e extrajudiciais.",
  },
];

export const socias = equipe.filter((a) => a.papel === "socia");
export const associadas = equipe.filter((a) => a.papel === "associada");

// ---------------------------------------------------------------------------
// Depoimentos — 9, todos com consentimento do cliente
// ---------------------------------------------------------------------------

export interface Depoimento {
  autor: string;
  /** `null` quando o original não informa o serviço contratado. */
  servico: string | null;
  texto: string;
}

export const depoimentos: Depoimento[] = [
  {
    autor: "Chácara Paquetá",
    servico: "Assessoria Jurídica",
    texto:
      "Gostaríamos de expressar nosso agradecimento a Dra. Kelly Marques e a equipe do escritório Souza & Souza Advocacia pelo profissionalismo, responsabilidade e ética. A dedicação da doutora nos proporciona resultados positivos, recomendamos sempre o escritório, para que outras pessoas possam alcançar sucesso em suas buscas.",
  },
  {
    autor: "Geraldo Martins",
    servico: "Aposentadoria por Idade",
    texto:
      "Quando completei 62 anos idade eu queria me aposentar. Procurei pela Dra. Angela Borba no Escritório Souza & Souza Advocacia para tratar desse assunto. Na época, fui atendido e orientado por ela com explicações claras do que deveria ser feito. Fizemos o que foi necessário e ela conseguiu me aposentar em pouco prazo. Fiquei muito satisfeito com o trabalho da doutora e da equipe do escritório. Fui muito bem atendido e estou muito satisfeito com o resultado do meu processo de aposentadoria. Tenho recomendado a Dra. Angela Borba e o Escritório Souza & Souza para amigos e conhecidos. Primeiro agradeço a Deus e depois a Dra. Angela. Estou muito feliz!",
  },
  {
    autor: "Messias Fernandes",
    servico: "Aposentadoria por Tempo de Contribuição",
    texto:
      "Quero dizer que foi uma ótima experiência que tive em contratar os serviços da Dra. Paula Faids no momento do meu processo de aposentadoria. Ela e sua equipe estão de parabéns, super indico o Escritório Souza & Souza. Obrigado! Agradeço a excelência e a dedicação pelo modo que executaram o trabalho com eficiência profissionalismo e carinho. Fiquei muito feliz com o resultado que conseguimos alcançar. Muito obrigado e um grande abraço.",
  },
  {
    autor: "William André Safatle",
    servico: "Assessoria Jurídica",
    texto:
      "O escritório Souza & Souza Advocacia nos atende com extremo profissionalismo, com tomada de decisões em conjunto, no qual a Dra Kelly Marques demonstra toda sua experiência e conhecimento nas questões que levamos a ela, conduzindo as tratativas de maneira ágil e técnica.\n\nRecomendo este escritório.",
  },
  {
    autor: "Neri Celso",
    servico: "Aposentadoria por Tempo de Contribuição",
    texto:
      "Recomendo o escritório Souza & Souza Advocacia. Está foi a minha opção, onde me foi dispensada toda atenção, assistência e acolhimento. Muito bem orientado e assistido, consegui o meu benefício em tempo recorde e com um ótimo percentual em relação ao teto do benefício do INSS. Deixo aqui o meu muito obrigado a minha advogada assistente, a Dra Paula Faids e toda a equipe do escritório que com seu empenho e profissionalismo me garantiram grandes vantagens que perdurarão pela minha vida toda.",
  },
  {
    autor: "Elton Dias Souto",
    servico: "Aposentadoria Especial",
    texto:
      "Quando precisei de assessoria jurídica, e até psicológica, fui muito bem acolhido e assessorado pela Dra. Flávia Almeida. Nota 10!",
  },
  {
    autor: "Silvia Maria",
    servico: "Aposentadoria por Idade",
    texto:
      "Quando fui me aposentar eu procurei pela assessoria jurídica da Dra. Angela Borba e do Escritório Souza & Souza Advocacia. Fui bem recebida e atendida. Percebi muito profissionalismo por parte da doutora, pois eu me aposentei muito rápido e sem muita burocracia. Foi bem tranquilo! Eu nem estava com muita expectativa e deu certo na primeira tentativa. Tenho muita gratidão pela Dra. Angela Borba e sempre indicado ela e o Escritório Souza & Souza Advocacia para amigos e conhecidos.",
  },
  {
    autor: "Sirlene Praxedes",
    servico: null,
    texto:
      "Em 2023 eu precisei de assessoria jurídica e procurei pela Dra. Bárbara Matoso e o Escritório Souza & Souza Advocacia. Fiquei muito satisfeita com o resultado dos serviços da doutora. Ela é uma profissional excelente, me passou segurança e explicou tudo sobre o meu processo, do início ao fim. Gosto muito de ser cliente da Dra. Bárbara Matoso e do Escritório Souza & Souza Advocacia. Muito obrigado por tudo!",
  },
  {
    autor: "Angela Noronha",
    servico: null,
    texto:
      "Estou extremamente satisfeita com o profissionalismo e a competência da Dra. Bárbara Matoso e toda equipe do Escritório Souza & Souza Advocacia. Ela tem me auxiliado bastante em um processo de Inventário com orientações claras e explicações sobre o meu processo. Além disso, sou sempre muito bem recebida pela doutora e por toda equipe do Escritório Souza & Souza Advocacia. São excelentes!",
  },
];

// ---------------------------------------------------------------------------
// Métricas
// ---------------------------------------------------------------------------

/**
 * Números do escritório. A nota "Métricas de 2021 a 2023" do site antigo foi
 * removida por decisão de projeto — os números seguem sem carimbo de data.
 * Quando o cliente enviar valores atualizados, é aqui que se troca.
 */
export const metricas = [
  {
    valor: "+15",
    rotulo: "anos de história",
    icone: "/site/home/icone-calendario.png",
  },
  {
    valor: "+3.000",
    rotulo: "Atendimentos",
    icone: "/site/home/icone-atendimento.png",
  },
  {
    valor: "+2.000",
    rotulo: "Processos Previdenciários",
    icone: "/site/home/icone-processos.png",
  },
] as const;

// ---------------------------------------------------------------------------
// Pilares — página Sobre nós
// ---------------------------------------------------------------------------

export const pilares = [
  {
    titulo: "Nossa Experiência",
    icone: "/site/sobre-nos/icone-1-experiencia.png",
    paragrafos: [
      "Com um histórico sólido e dinâmico, nosso escritório tem aprimorado sua prática para oferecer cada vez mais serviços especializados. Advogamos para pessoas físicas e jurídicas, atuando no direito previdenciário, trabalhista, cível e consultoria jurídica e administrativa.",
    ],
  },
  {
    titulo: "Nosso Propósito",
    icone: "/site/sobre-nos/icone-2-proposito.png",
    paragrafos: [
      "Acreditamos na importância do atendimento personalizado e humanizado. Cada cliente é único, cada caso é singular. Essa compreensão nos impulsiona em direção a melhoria contínua.",
    ],
  },
  {
    titulo: "Nosso Diferencial",
    icone: "/site/sobre-nos/icone-3-diferencial.png",
    paragrafos: [
      "O que nos diferencia vai além da qualidade técnica de nossos serviços. Acreditamos que a experiência do cliente conosco deve ser a melhor, criando uma conexão de credibilidade, confiança mútua e relação humanizada.",
      "Quando somos escolhidos, nosso objetivo é entregar mais do que uma orientação jurídica, priorizamos um atendimento personalizado, a melhor solução para cada caso e a excelência nos resultados.",
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Textos institucionais reutilizados
// ---------------------------------------------------------------------------

export const institucional = {
  heroTitulo:
    "Especialistas em Direito Previdenciário, Empresarial, Relações Trabalhistas e Assessoria Jurídica: Protegendo seu futuro, garantindo seus direitos.",
  heroParagrafo:
    "Há mais de 15 anos somos especialistas em direito previdenciário, trabalhista, cível e consultoria jurídica, oferecendo orientação segura e transparente sobre benefícios previdenciários, relações trabalhistas, contratos, relações de consumos, entre outros.",

  /** Aparece igual na Seção 2 da home e na Seção 1 de Sobre nós. */
  sobreTitulo:
    "Souza & Souza Advocacia: Orientação Jurídica com Atendimento Humanizado.",
  sobreParagrafo:
    "O nosso foco é fornecer soluções jurídicas e assessoria para pessoas físicas e jurídicas, com especialização em questões complexas. Destacando-se pela qualidade técnica, atendimento personalizado e uma abordagem humanizada, adaptando-se às necessidades de cada cliente.",

  areasSobretitulo: "Áreas de Especialização",
  areasTitulo:
    "Serviços especializados que englobam o direito previdenciário, trabalhista e cível, além de consultoria jurídica e administrativa.",

  depoimentosTitulo: "Depoimentos de clientes satisfeitos.",
  depoimentosSubtitulo:
    "Cada depoimento compartilhado aqui é divulgado com o consentimento e aprovação do cliente. Comprometemo-nos com a segurança e privacidade de todos.",
} as const;
