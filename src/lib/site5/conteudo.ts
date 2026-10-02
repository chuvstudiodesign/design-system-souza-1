/**
 * Conteúdo estruturado da variação 5 do site Souza & Souza.
 *
 * Fonte: `Material Site/Textos do site Versão Inicial 02_SET_2026.docx`,
 * transcrito literalmente em `Site/paginas-v5/`. Este é o copy novo do
 * cliente e substitui, só para `/site`, o de `@/lib/site/conteudo`.
 *
 * O texto é literal. Alterações autorizadas, todas aplicadas aqui:
 *   · Bio da Paula: a frase "Conselheira Deliberativa da OABPrev GO/TO Gestão
 *     2023-2026 e Gestão 2026-2029" vinha repetida duas vezes seguidas no
 *     documento — aparece uma vez (decisão do cliente, 23/09/2026).
 *   · Sobre nós: "Desde de outubro/2007" → "Desde outubro/2007" (erro de
 *     digitação; a home do mesmo documento escreve sem o "de").
 *   · Quebras de linha no meio de frase, vindas do Word, foram unidas.
 *
 * Os depoimentos NÃO são reescritos: o documento pede os originais, que vêm
 * de `@/lib/site/conteudo` sem alteração.
 */

export { depoimentos, type Depoimento } from "@/lib/site/conteudo";

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------

export const home = {
  hero: {
    sobretitulo: "Advocacia e Assessoria Jurídica em Catalão/GO",
    /** Frase do documento — no layout da v4 ocupa o lugar do preâmbulo. */
    titulo: "Experiência jurídica para orientar decisões e proteger direitos.",
    /**
     * Frase grande do hero da v4, mantida por instrução do usuário (24/09/2026:
     * "embaixo naquele texto grande protegendo seu futuro e garantindo seus
     * direitos pode manter"). É a única frase fora do documento de 02/SET.
     */
    promessa: "Protegendo seu futuro, garantindo seus direitos.",
    paragrafos: [
      "Desde outubro/2007, a Souza & Souza Advocacia atua em Catalão e região com orientação jurídica especializada para pessoas, famílias e empresas.",
      "O Escritório atua em Direito Previdenciário, Trabalhista, Civil, Tributário e em consultoria e assessoria jurídica, oferecendo atendimento humanizado, análise individual de cada demanda e comunicação clara e transparente.",
    ],
  },

  escritorio: {
    sobretitulo: "O Escritório",
    titulo: "Advocacia construída com confiança, experiência e proximidade",
    paragrafos: [
      "A Souza & Souza Advocacia desenvolve um trabalho pautado na confiança, conhecimento técnico, excelência, transparência e atendimento humanizado.",
      "Cada caso é analisado de forma individual, considerando seus aspectos jurídicos e as necessidades de quem busca pela melhor solução jurídica, tornando questões complexas mais compreensíveis e oferecendo acompanhamento responsável e transparente em todas as etapas do processo.",
    ],
    botao: "Conheça a Souza & Souza",
  },

  areas: {
    sobretitulo: "Áreas de Especialização",
    titulo:
      "Orientação jurídica especializada para pessoas, famílias e empresas em diferentes áreas do Direito.",
  },

  numeros: {
    sobretitulo: "Números",
  },

  depoimentos: {
    sobretitulo: "Depoimentos",
    titulo:
      "Experiências de quem já foi atendido pelo Escritório Souza & Souza",
    paragrafo:
      "Cada atendimento representa uma história e uma necessidade diferente. Conheça experiências compartilhadas por pessoas e empresas que já receberam orientação jurídica da Souza & Souza Advocacia.",
  },

  publicacoes: {
    sobretitulo: "Publicações",
    titulo: "Informação jurídica em linguagem clara",
    paragrafo:
      "Conteúdos sobre temas jurídicos que fazem parte do cotidiano de pessoas, famílias e empresas, apresentados de forma objetiva, clara e informativa.",
    /** Leva direto ao Instagram. */
    botao: "Acompanhe nossas publicações",
  },

  contato: {
    sobretitulo: "Entre em contato",
    titulo: "Fale com a Souza & Souza Advocacia",
    paragrafo:
      "Para informações sobre o Escritório, áreas de atuação e canais de atendimento, entre em contato com nossa equipe.",
    /** Leva direto ao WhatsApp. */
    botao: "Entrar em contato",
  },
} as const;

/** "+5.000 atendimentos realizados [2021 a 2025]" — o período vai à parte. */
export const metricas = [
  { valor: "+5.000", rotulo: "atendimentos realizados", periodo: "2021 a 2025" },
  { valor: "+4.000", rotulo: "processos com êxito", periodo: "2021 a 2025" },
  {
    valor: "+3.000",
    rotulo: "processos previdenciários com êxito",
    periodo: "2021 a 2025",
  },
] as const;

// ---------------------------------------------------------------------------
// Áreas de atuação — página Serviços (7) e resumo da home
// ---------------------------------------------------------------------------

export interface AreaDeAtuacao {
  slug: string;
  nome: string;
  /** Parágrafo de abertura na página Serviços. */
  descricao: string;
  itens: string[];
  /** Frase de fechamento da área, quando o documento traz uma. */
  nota?: string;
  /**
   * Texto curto da home. As 4 áreas principais aparecem como cards; as duas
   * com `acesso: true` aparecem como "botões de acesso" logo abaixo delas.
   * Assessoria Jurídica não tem resumo — só existe na página Serviços.
   */
  resumoHome?: string;
  acesso?: boolean;
  /**
   * Fotos do painel da home — só as 4 áreas principais. São 3 por área e o
   * visitante troca entre elas pelas setas sob a foto. `posicao` é o
   * `object-position` do recorte 3:4 (útil nas fotos horizontais).
   */
  imagens?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    posicao?: string;
  }[];
}

export const servicosIntro = {
  titulo: "Áreas de atuação jurídica",
  paragrafo:
    "A Souza & Souza Advocacia oferece serviços jurídicos para pessoas, famílias e empresas em Catalão e região. O Escritório atua em diferentes áreas do Direito, com acompanhamento de demandas judiciais, extrajudiciais e administrativas.",
  botao: "Entre em contato",
} as const;

export const areas: AreaDeAtuacao[] = [
  {
    slug: "previdenciario",
    nome: "Direito Previdenciário",
    descricao:
      "Orientação jurídica em demandas relacionadas ao planejamento e a concessão de aposentadorias e benefícios previdenciários urbanos e rurais, garantindo o direito de trabalhadores e contribuintes.",
    itens: [
      "Pensão por morte",
      "Benefícios por incapacidade",
      "BPC/LOAS, quando aplicável",
      "Revisões e outras demandas previdenciárias",
    ],
    nota: "Aposentadorias e benefícios previdenciários possuem requisitos próprios e devem ser analisados conforme cada caso para alcance do melhor resultado.",
    resumoHome:
      "Planejamento e concessão de benefícios previdenciários urbanos e rurais, além de outras demandas previdenciárias.",
    imagens: [
      { src: "/site5/areas/previdenciario-1.webp", width: 1800, height: 2700, alt: "Mãe sorrindo com o filho no colo em um jardim" },
      { src: "/site5/areas/previdenciario-2.webp", width: 1800, height: 2700, alt: "Filho abraçando a mãe em casa" },
      { src: "/site5/areas/previdenciario-3.webp", width: 1800, height: 2520, alt: "Mãe e filho abraçados na rua" },
    ],
  },
  {
    slug: "trabalhista",
    nome: "Direito Trabalhista",
    descricao:
      "Atuação em demandas decorrentes das relações de trabalho, tanto no consultivo e preventivo quanto no contencioso e acompanhamento de ações trabalhistas.",
    itens: [
      "Cálculo de verbas rescisórias",
      "Insalubridade, periculosidade e outras condições de trabalho",
      "Análise de direitos e obrigações trabalhistas",
      "Orientação em conflitos decorrentes das relações de emprego",
    ],
    resumoHome:
      "Atuação em demandas relacionadas às relações de trabalho e demais direitos e obrigações de empregados e empregadores.",
    imagens: [
      { src: "/site5/areas/trabalhista-1.webp", width: 1800, height: 2700, alt: "Mulher sentada lendo uma folha de papel" },
      { src: "/site5/areas/trabalhista-2.webp", width: 1800, height: 2710, alt: "Mulher de óculos lendo um papel com atenção" },
      { src: "/site5/areas/trabalhista-3.webp", width: 1800, height: 2700, alt: "Mulher de óculos lendo documentos à mesa" },
    ],
  },
  {
    slug: "tributario",
    nome: "Direito Tributário",
    descricao:
      "Orientação em questões relacionadas à legislação tributária, obrigações fiscais e situações que envolvam pessoas físicas, famílias, empresas e atividades econômicas.",
    itens: [
      "Análise de casos tributários",
      "Orientação sobre obrigações e procedimentos",
      "Demandas administrativas e judiciais de natureza tributária",
    ],
    resumoHome:
      "Demandas sobre direitos e obrigações tributárias, envolvendo pessoas físicas, empresas e atividades econômicas.",
    imagens: [
      { src: "/site5/areas/tributario-1.webp", width: 1800, height: 1200, alt: "Mãos fazendo contas em uma calculadora ao lado do teclado", posicao: "78% 60%" },
      { src: "/site5/areas/tributario-2.webp", width: 1800, height: 1201, alt: "Mãos com calculadora, caderno e notebook sobre a mesa", posicao: "62% 60%" },
      { src: "/site5/areas/tributario-3.webp", width: 1800, height: 1200, alt: "Mão preenchendo um formulário ao lado de calculadora e notebook", posicao: "62% 50%" },
    ],
  },
  {
    slug: "civil",
    nome: "Direito Civil",
    descricao:
      "Atuação em relações privadas, contratuais, patrimoniais, familiares, sucessórias e imobiliárias.",
    itens: [
      "Inventário e partilha",
      "Herança e sucessão",
      "Pensão alimentícia e exoneração de alimentos",
      "Divórcio e questões familiares",
      "Análise e elaboração de contratos",
      "Compra e venda",
      "Cobranças e obrigações",
      "Regularização de imóveis",
      "Demandas relacionadas à posse e propriedade",
    ],
    resumoHome:
      "Atuação em contratos, herança, inventário, questões familiares, imobiliárias e outras demandas do Direito Civil.",
    imagens: [
      { src: "/site5/areas/civil-1.webp", width: 1800, height: 2699, alt: "Pai, mãe e filhos sentados no chão sorrindo" },
      { src: "/site5/areas/civil-2.webp", width: 1800, height: 2700, alt: "Pai e mãe deitados no chão brincando com a filha" },
      { src: "/site5/areas/civil-3.webp", width: 1800, height: 2700, alt: "Família reunida ao ar livre ao pôr do sol" },
    ],
  },
  {
    slug: "assessoria",
    nome: "Assessoria Jurídica",
    descricao:
      "Acompanhamento preventivo para empresas, produtores rurais e organizações que precisam incorporar análise jurídica às decisões do dia a dia.",
    itens: [
      "Análise e elaboração de contratos e pareceres",
      "Orientação consultiva e preventiva",
      "Apoio jurídico em relações comerciais",
      "Análise de riscos e procedimentos",
    ],
  },
  {
    slug: "extrajudiciais",
    nome: "Serviços Extrajudiciais",
    descricao:
      "Acompanhamento de procedimentos que podem ser realizados fora do Poder Judiciário, conforme requisitos legais de cada situação.",
    itens: [
      "Procedimentos em cartórios",
      "Escrituras e regularizações",
      "Atos e documentos extrajudiciais",
      "Orientação documental",
    ],
    resumoHome:
      "Orientações em procedimentos realizados fora do Judiciário, incluindo regularizações, escrituras, atos cartorários e outras demandas extrajudiciais.",
    acesso: true,
  },
  {
    slug: "diligencias",
    nome: "Diligências Administrativas",
    descricao:
      "Realização e acompanhamento de procedimentos perante órgãos públicos, instituições e repartições administrativas.",
    itens: [
      "Protocolos e acompanhamentos",
      "Levantamento e organização documental",
      "Diligências perante órgãos e instituições",
    ],
    resumoHome:
      "Acompanhamento de procedimentos perante órgãos públicos, instituições e repartições administrativas, de acordo com a necessidade de cada cliente.",
    acesso: true,
  },
];

/**
 * As 4 áreas que aparecem como card na home, na ordem da home.
 *
 * O documento lista as áreas em ordens diferentes em cada página: na home
 * Civil vem antes de Tributário; em Serviços, depois. `areas` segue a ordem
 * de Serviços; aqui se reordena para a home.
 */
const ordemHome = ["previdenciario", "trabalhista", "civil", "tributario"];
export const areasEmDestaque = ordemHome.map(
  (slug) => areas.find((a) => a.slug === slug)!
);
/** Os 2 "botões de acesso" da home. */
export const areasDeAcesso = areas.filter((a) => a.acesso);

// ---------------------------------------------------------------------------
// Sobre nós
// ---------------------------------------------------------------------------

export const sobre = {
  hero: {
    titulo: "Souza & Souza Advocacia",
    subtitulo:
      "Experiência, proximidade e orientação jurídica qualificada em Catalão e região.",
    paragrafo:
      "Desde outubro/2007, a Souza & Souza Advocacia atua no atendimento a pessoas, famílias e empresas, reunindo excelência técnica, atendimento personalizado e humanizado e uma comunicação próxima com cada cliente.",
  },

  apresentacao: {
    sobretitulo: "Apresentação",
    titulo: "Orientação jurídica com atendimento personalizado e humanizado",
    paragrafos: [
      "O trabalho da Souza & Souza Advocacia parte de uma premissa simples: compreender a realidade de cada cliente antes de analisar a questão jurídica.",
      "Ao longo de sua trajetória, o Escritório consolidou uma atuação multidisciplinar, acompanhando demandas judiciais, extrajudiciais e administrativas em diferentes áreas do Direito.",
      "A equipe busca traduzir questões jurídicas complexas em orientações claras, mantendo transparência na comunicação e acompanhamento responsável durante cada etapa do processo.",
    ],
  },

  experiencia: {
    titulo: "Nossa experiência",
    paragrafos: [
      "A experiência construída ao longo dos anos permite ao Escritório atuar em diferentes contextos jurídicos, desde demandas individuais e familiares até questões empresariais e administrativas.",
      "Essa atuação é sustentada pela capacidade técnica e atualização constante da equipe e pela análise cuidadosa das particularidades de cada caso.",
    ],
  },

  proposito: {
    titulo: "Nosso propósito",
    paragrafo:
      "Ser o Escritório de advocacia que se dedica a encontrar a melhor solução jurídica para cada demanda de nossos clientes, garantindo o seu direito e acreditando na importância do atendimento personalizado e humanizado.",
  },

  valores: {
    titulo: "Nossos valores",
    itens: [
      "Confiança",
      "Excelência técnica",
      "Relação humanizada",
      "Inovação",
      "Valorizar o nosso time",
      "Responsabilidade Social",
    ],
  },

  diferencial: {
    titulo: "Nosso diferencial",
    paragrafos: [
      "A proximidade no atendimento faz parte da identidade da Souza & Souza. Mais do que apresentar informações técnicas, o Escritório busca estabelecer uma comunicação compreensível, transparente e adequada à realidade de cada cliente.",
      "A integração entre diferentes áreas do Direito também permite uma visão mais ampla das demandas, especialmente quando uma mesma situação envolve aspectos previdenciários, trabalhistas, civis, tributários ou empresariais.",
    ],
  },

  fechamento: {
    titulo: "Uma trajetória construída com responsabilidade",
    paragrafo:
      "A Souza & Souza Advocacia segue desenvolvendo sua atuação em Catalão e região com o compromisso de unir experiência, excelência técnica, atualização profissional e relações baseadas na confiança.",
    botao: "Conheça nossos profissionais",
  },
} as const;

// ---------------------------------------------------------------------------
// Profissionais
// ---------------------------------------------------------------------------

export const profissionaisIntro = {
  titulo: "Profissionais",
  /** Rótulo do documento ("Perfis"), usado no trilho da lista. */
  sobretituloPerfis: "Perfis",
  subtitulo:
    "Conheça a equipe de profissionais do Direito responsável pela atuação jurídica do Escritório.",
  introTitulo: "Conhecimento técnico e atuação integrada",
  introParagrafo:
    "A equipe da Souza & Souza Advocacia reúne profissionais com experiência em áreas de atuação complementares. Essa integração permite analisar diferentes aspectos de uma demanda e oferecer a melhor orientação e solução jurídica de forma clara e responsável.",
} as const;

export interface Profissional {
  slug: string;
  nome: string;
  papel: "socia" | "associada";
  /** Ano de inscrição, para exibição de apoio — já consta na bio. */
  desde: string;
  foto: { src: string; alt: string; width: number; height: number };
  /**
   * `true` quando a foto ainda é a do site antigo e o cliente vai mandar uma
   * nova. Serve só de lembrete — não muda nada na renderização.
   */
  fotoProvisoria?: boolean;
  bio: string[];
}

export const profissionais: Profissional[] = [
  {
    slug: "paula-faids",
    nome: "Paula Faids Carneiro Souza Sales",
    papel: "socia",
    desde: "2006",
    foto: {
      src: "/site5/equipe/paula-faids.webp",
      alt: "Paula Faids Carneiro Souza Sales, sócia e advogada",
      width: 1707,
      height: 2560,
    },
    fotoProvisoria: true,
    bio: [
      "Advogada desde 2006, inscrita na OAB – Seccional Goiás, com atuação em Direito Previdenciário e Civil. É especialista em Direito Previdenciário e Direito Processual Civil e possui trajetória de atuação institucional na OAB-GO, tendo presidido a Comissão de Direito Previdenciário da Subseção de Catalão/GO nos triênios 2013–2015 e 2019–2021, Conselheira Deliberativa da OABPrev GO/TO Gestão 2023-2026 e Gestão 2026-2029 e Vice-Presidente da Comissão de Orçamento e Contas da OAB/GO Triênio 2025-2027.",
      "Desde 2007, integra a Souza & Souza Advocacia como sócia e advogada, contribuindo com sua experiência para a atuação jurídica do Escritório.",
    ],
  },
  {
    slug: "angela-borba",
    nome: "Angela Carneiro Souza Borba",
    papel: "socia",
    desde: "2013",
    foto: {
      src: "/site5/equipe/angela-borba.webp",
      alt: "Angela Carneiro Souza Borba, sócia e advogada",
      width: 1705,
      height: 2560,
    },
    fotoProvisoria: true,
    bio: [
      "Advogada desde 2013, inscrita na OAB – Seccional Goiás, com atuação em Direito Previdenciário, especialmente em demandas relacionadas a benefícios rurais, como aposentadorias, pensão por morte e benefícios por incapacidade.",
      "Também atua em questões relacionadas ao Benefício de Prestação Continuada (BPC/LOAS). Desde 2014, integra a Souza & Souza Advocacia como sócia e advogada contribuindo com sua experiência para a atuação jurídica do Escritório.",
    ],
  },
  {
    slug: "kelly-marques",
    nome: "Kelly Marques de Souza",
    papel: "socia",
    desde: "2001",
    foto: {
      src: "/site5/equipe/kelly-marques.webp",
      alt: "Kelly Marques de Souza, sócia e advogada",
      width: 1707,
      height: 2560,
    },
    fotoProvisoria: true,
    bio: [
      "Advogada desde 2001, inscrita na OAB – Seccional Goiás, com atuação nas áreas de Direito Trabalhista, Empresarial, Previdenciário e Civil. É especialista em Direito e Processo do Trabalho, Direito Público e Direito Médico e Hospitalar, reunindo formação especializada e experiência em diferentes áreas do Direito.",
      "Desde 2007, integra a Souza & Souza Advocacia como sócia e advogada, contribuindo com sua experiência para a atuação jurídica do Escritório.",
    ],
  },
  {
    slug: "barbara-matoso",
    nome: "Bárbara de Carvalho Matoso",
    papel: "associada",
    desde: "2015",
    foto: {
      src: "/site5/equipe/barbara-matoso.webp",
      alt: "Bárbara de Carvalho Matoso, associada e advogada",
      width: 2384,
      height: 4240,
    },
    bio: [
      "Advogada desde 2015, inscrita na OAB – Seccional Goiás, com atuação em Direito Civil e ampla experiência em Direito Sucessório, Inventário e Partilha, Direito Imobiliário, Regularização de Imóveis, Usucapião e Contratos Imobiliários. Também atua em demandas relacionadas ao Direito do Consumidor e presta assessoria jurídica para pessoas físicas e jurídicas, tanto em procedimentos judiciais quanto extrajudiciais.",
      "Desde 2019, integra a Souza & Souza Advocacia como associada e advogada, contribuindo com sua experiência para a atuação jurídica do Escritório.",
    ],
  },
  {
    slug: "flavia-almeida",
    nome: "Flávia da Silva Almeida",
    papel: "associada",
    desde: "2021",
    foto: {
      src: "/site5/equipe/flavia-almeida.webp",
      alt: "Flávia da Silva Almeida, associada e advogada",
      width: 2134,
      height: 3796,
    },
    bio: [
      "Advogada desde 2021, inscrita na OAB – Seccional Goiás, com atuação em Direito Civil e especialização em Direito de Família. Sua atuação é especialmente direcionada às demandas familiares, envolvendo divórcio, guarda, convivência familiar, pensão alimentícia, revisão e exoneração de alimentos, reconhecimento e dissolução de união estável, entre outras questões decorrentes das relações familiares. Também atua em ações indenizatórias, relações de consumo, ações de cobrança e outros conflitos de natureza patrimonial e obrigacional.",
      "Desde 2025, integra a Souza & Souza Advocacia como associada e advogada, contribuindo com sua experiência para a atuação jurídica do Escritório.",
    ],
  },
];

/**
 * Rótulo do papel, como a própria bio escreve ("…integra a Souza & Souza
 * Advocacia como sócia e advogada").
 */
export const rotuloPapel = {
  socia: "sócia e advogada",
  associada: "associada e advogada",
} as const satisfies Record<Profissional["papel"], string>;

// ---------------------------------------------------------------------------
// Contato
// ---------------------------------------------------------------------------

export const contatoPagina = {
  titulo: "Entre em contato",
  subtitulo: "Canais de atendimento da Souza & Souza Advocacia.",

  formulario: {
    sobretitulo: "Formulário",
    titulo: "Envie sua mensagem",
    paragrafo:
      "Preencha seus dados e informe, de forma breve, o assunto sobre o qual deseja receber informações. A equipe retornará pelos canais de atendimento do Escritório.",
    campos: {
      nome: "Nome",
      telefone: "Telefone ou celular",
      email: "E-mail, se aplicável",
      assunto: "Assunto",
      mensagem: "Mensagem",
    },
    botao: "Enviar mensagem",
    /**
     * Microcópia de UI, não é texto do cliente — aprovada pelo orquestrador
     * (spec `docs/site5-specs/05-contato.md`). Mensagens de validação, o aviso
     * de envio indisponível (PENDÊNCIA #1) e o rótulo do link do mapa.
     */
    ui: {
      erros: {
        nomeVazio: "Informe seu nome.",
        telefoneVazio: "Informe um telefone ou celular.",
        telefoneInvalido: "Confira o número e inclua o DDD.",
        emailInvalido: "Confira o e-mail informado ou deixe o campo em branco.",
        assuntoVazio: "Informe o assunto.",
        mensagemVazia: "Escreva sua mensagem.",
      },
      aviso:
        "O envio pelo formulário ainda não está disponível. Para falar com a equipe agora, use o WhatsApp ou o telefone:",
      abrirMapa: "Abrir no Google Maps",
    },
  },

  atendimento: {
    sobretitulo: "Atendimento",
    titulo: "Fale com a nossa equipe",
    paragrafo:
      "Utilize os canais oficiais da Souza & Souza Advocacia para informações sobre atendimento, áreas de atuação e a localização do Escritório.",
  },

  endereco: { titulo: "Endereço" },

  redes: {
    titulo: "Redes sociais",
    paragrafo:
      "Acompanhe os canais oficiais da Souza & Souza Advocacia para conteúdos informativos e atualizações do Escritório.",
  },
} as const;

// ---------------------------------------------------------------------------
// Fotografias do espaço — `public/site5/espaco/`
// ---------------------------------------------------------------------------

/**
 * Catálogo das fotos reais do escritório, já convertidas para WebP.
 * K+ = ensaio da Agência K+ (inclui pessoas); HDR = ensaio do site antigo
 * (ambientes vazios). Os componentes escolhem daqui pelo nome.
 */
export const fotosEspaco = {
  recepcaoAtendimento: { src: "/site5/espaco/recepcao-atendimento.webp", width: 3200, height: 2137, alt: "Recepção da Souza & Souza com o painel da marca e atendente no balcão" },
  recepcaoMarcaDetalhe: { src: "/site5/espaco/recepcao-marca-detalhe.webp", width: 3200, height: 2137, alt: "Painel com a marca Souza & Souza Advocacia e Assessoria na recepção" },
  recepcaoBancada: { src: "/site5/espaco/recepcao-bancada.webp", width: 3200, height: 2137, alt: "Bancada da recepção com objetos decorativos e o painel da marca" },
  recepcaoFrontal: { src: "/site5/espaco/recepcao-frontal.webp", width: 2400, height: 3593, alt: "Balcão de mármore da recepção diante do painel da marca" },
  recepcaoLateral: { src: "/site5/espaco/recepcao-lateral.webp", width: 2400, height: 3593, alt: "Vista lateral do balcão da recepção" },
  recepcaoAmpla: { src: "/site5/espaco/recepcao-ampla.webp", width: 3200, height: 2133, alt: "Recepção ampla com poltronas e o painel da marca" },
  recepcaoAmplaFrontal: { src: "/site5/espaco/recepcao-ampla-frontal.webp", width: 3200, height: 2133, alt: "Recepção com balcão de mármore e poltronas de espera" },
  recepcaoPoltronas: { src: "/site5/espaco/recepcao-poltronas.webp", width: 3200, height: 2133, alt: "Poltronas de espera diante do balcão da recepção" },
  salaEspera: { src: "/site5/espaco/sala-espera.webp", width: 2400, height: 3593, alt: "Sala de espera com poltronas junto à janela" },
  salaEquipe: { src: "/site5/espaco/sala-equipe.webp", width: 3200, height: 2137, alt: "Sala de trabalho da equipe com estações e estante" },
  equipeTrabalhando: { src: "/site5/espaco/equipe-trabalhando.webp", width: 3200, height: 2137, alt: "Equipe do escritório trabalhando nas estações de atendimento" },
  equipeSalaApoio: { src: "/site5/espaco/equipe-sala-apoio.webp", width: 2400, height: 3593, alt: "Integrantes da equipe trabalhando em sala de apoio do escritório" },
  salaAtendimentoVertical: { src: "/site5/espaco/sala-atendimento-vertical.webp", width: 2000, height: 3557, alt: "Sala de atendimento com mesa, duas cadeiras para o cliente e armários com iluminação" },
  salaReuniao1: { src: "/site5/espaco/sala-reuniao-1.webp", width: 3200, height: 2133, alt: "Sala de atendimento com mesa em madeira clara" },
  salaReuniao2: { src: "/site5/espaco/sala-reuniao-2.webp", width: 3200, height: 2133, alt: "Sala de atendimento com mesa e cadeiras" },
  salaReuniaoFrontal: { src: "/site5/espaco/sala-reuniao-frontal.webp", width: 3200, height: 2133, alt: "Vista frontal de sala de atendimento" },
  salaEstante: { src: "/site5/espaco/sala-estante.webp", width: 3200, height: 2133, alt: "Sala de atendimento com estante" },
  salaEstanteMesa: { src: "/site5/espaco/sala-estante-mesa.webp", width: 3200, height: 2133, alt: "Mesa de atendimento diante da estante" },
  salaEstanteLateral: { src: "/site5/espaco/sala-estante-lateral.webp", width: 3200, height: 2133, alt: "Vista lateral de sala de atendimento com estante" },
  recepcaoBalcaoMarca: { src: "/site5/espaco/recepcao-balcao-marca.webp", width: 4240, height: 2832, alt: "Recepção da Souza & Souza com o painel da marca, o balcão de mármore e a atendente" },
  recepcaoEspelho: { src: "/site5/espaco/recepcao-espelho.webp", width: 4240, height: 2832, alt: "Aparador da recepção com vasos verdes e o espelho refletindo o painel da marca" },
  recepcaoHdr4002: { src: "/site5/espaco/recepcao-hdr-4002.webp", width: 4743, height: 3162, alt: "Recepção da Souza & Souza com o painel da marca, o balcão de mármore e as poltronas de espera" },
  recepcaoEspelhoInvertida: { src: "/site5/espaco/recepcao-espelho-invertida.webp", width: 4240, height: 2384, alt: "Aparador da recepção com vasos verdes diante do painel com a marca Souza & Souza e a atendente ao fundo" },
  fachada: { src: "/site5/espaco/fachada.webp", width: 3200, height: 2133, alt: "Fachada do escritório Souza & Souza em Catalão" },
  fachadaSol: { src: "/site5/espaco/fachada-sol.webp", width: 3200, height: 2133, alt: "Fachada do escritório Souza & Souza com palmeiras" },
  fachadaDia: { src: "/site5/espaco/fachada-dia.webp", width: 3200, height: 2137, alt: "Fachada do escritório Souza & Souza vista da rua" },
  fachadaContato: { src: "/site5/espaco/fachada-contato.webp", width: 4240, height: 2384, alt: "Fachada do escritório Souza & Souza vista da rua" },
  fachadaHdr4032: { src: "/site5/espaco/fachada-hdr-4032.webp", width: 4743, height: 3162, alt: "Fachada do escritório Souza & Souza com palmeiras, vista da rua" },
  salaHdr3947: { src: "/site5/espaco/sala-hdr-3947.webp", width: 4743, height: 3162, alt: "Sala de atendimento com mesa em madeira, cadeiras e armários iluminados" },
  recepcaoHdr3987: { src: "/site5/espaco/recepcao-hdr-3987.webp", width: 4743, height: 3162, alt: "Recepção com balcão de mármore, poltronas de espera e o painel da marca Souza & Souza" },
  equipeGrupo: { src: "/site5/equipe/grupo.webp", width: 2036, height: 860, alt: "Advogadas sócias da Souza & Souza reunidas na recepção" },
} as const;
