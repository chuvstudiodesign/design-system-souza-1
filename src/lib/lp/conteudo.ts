/**
 * Landing pages de campanha — texto do cliente ("Textos - Landing Page.docx",
 * enviado em 05/NOV/2026), extraído do documento por script, sem redigitar.
 *
 * Fidelidade: nenhuma frase daqui pode ser reescrita nos componentes. As três
 * versões de cada página (V1 fiel, V2 conversão, V3 equilíbrio) usam este
 * mesmo texto; o que muda entre elas é a composição e os recursos de
 * conversão em volta.
 *
 * Estas páginas vivem em /lp e não compartilham rota nem layout com o site
 * institucional em /site.
 */

export type TemaLp = "acidente" | "doenca" | "maternidade";
export type PublicoLp = "urbano" | "rural";

export interface LandingPage {
  slug: string;
  tema: TemaLp;
  publico: PublicoLp;
  /** Como o documento nomeia a página: "Auxílio-Acidente · Urbano". */
  nome: string;
  /** Título da página (SEO). */
  seo: string;
  titulo: string;
  subtitulo: string;
  /** Botão do topo. */
  botao: string;
  /** "Texto da página", parágrafo a parágrafo como no documento. */
  paragrafos: string[];
  /** O parágrafo "Para começar, vale separar…" — destacado nas versões. */
  documentos: string;
  faq: { pergunta: string; resposta: string }[];
  chamadaFinal: string;
  botaoFinal: string;
}

export const landingPages: LandingPage[] = [
  {
    slug: "auxilio-acidente-urbano",
    tema: "acidente",
    publico: "urbano",
    nome: "Auxílio-Acidente · Urbano",
    seo: "Auxílio-Acidente Urbano | Souza & Souza",
    titulo: "Sofreu um acidente e ficou com sequela? Entenda o auxílio-acidente.",
    subtitulo: "Veja se o seu caso pode ser analisado e qual é o primeiro passo.",
    botao: "Falar com a equipe no WhatsApp",
    paragrafos: [
      "Um acidente muda a rotina. Mesmo depois do tratamento, muita gente fica com uma limitação que atrapalha o trabalho de antes: levantar peso, ficar em pé por muito tempo, usar a mão como usava. Se foi o seu caso, existe um benefício do INSS pensado para isso: o auxílio-acidente.",
      "Ele pode ser analisado quando o acidente, no trabalho ou fora dele, deixa uma sequela permanente que reduz a sua capacidade de trabalhar. Vale para quem tem carteira assinada, para o empregado doméstico e para o trabalhador avulso, e não exige tempo mínimo de contribuição.",
      "Cada caso é diferente, e o que mais pesa na análise são os laudos e os documentos de trabalho. Por isso, aqui na Souza & Souza a gente começa ouvindo o que aconteceu com você, confere sua documentação e explica, em linguagem simples, quais são os caminhos possíveis. Só depois você decide como seguir.",
    ],
    documentos: "Para começar, vale separar seus documentos pessoais e CPF, a carteira de trabalho, a CAT (se o acidente foi no trabalho) e os laudos, exames e receitas médicas.",
    faq: [
      { pergunta: "Já voltei a trabalhar. Ainda posso ter direito?", resposta: "Pode, desde que a sequela reduza a capacidade para o trabalho que você exercia. Cada caso é analisado individualmente." },
      { pergunta: "O acidente foi fora do trabalho. Isso muda algo?", resposta: "O auxílio-acidente também pode ser analisado em acidentes que não aconteceram no trabalho." },
    ],
    chamadaFinal: "Ficou com dúvida se o seu caso se encaixa? Conte o que aconteceu. Nossa equipe, em Catalão e região, responde pelo WhatsApp e explica os próximos passos.",
    botaoFinal: "Quero conversar com a equipe",
  },
  {
    slug: "auxilio-acidente-rural",
    tema: "acidente",
    publico: "rural",
    nome: "Auxílio-Acidente · Rural",
    seo: "Auxílio-Acidente Rural | Souza & Souza",
    titulo: "Sofreu um acidente no campo e ficou com sequela? Entenda o auxílio-acidente.",
    subtitulo: "Veja se o seu caso pode ser analisado e qual é o primeiro passo.",
    botao: "Falar com a equipe no WhatsApp",
    paragrafos: [
      "Trabalhar no campo exige o corpo inteiro. Quando um acidente deixa uma limitação, como dificuldade para carregar peso, usar a mão ou ficar muito tempo em pé, o serviço de antes fica mais difícil. Se isso aconteceu com você, existe um benefício do INSS para esses casos: o auxílio-acidente.",
      "Ele pode ser analisado quando o acidente deixa uma sequela permanente que reduz a sua capacidade de trabalhar. Vale para o empregado rural e para o produtor em regime de economia familiar, e não exige tempo mínimo de contribuição. O INSS observa se você era segurado na data do acidente e se o problema que ficou atrapalha o seu trabalho.",
      "No campo, o maior desafio costuma ser comprovar o trabalho, e isso tem solução. Notas de produtor, contratos de arrendamento, declaração do sindicato rural e a carteira de trabalho ajudam a contar essa história.",
      "A Souza & Souza atua com benefícios rurais: a gente ouve o que aconteceu, confere o que você tem em mãos e explica, em linguagem simples, quais são os caminhos. Só depois você decide como seguir.",
    ],
    documentos: "Para começar, vale separar seus documentos pessoais e CPF, laudos, exames e receitas médicas, o boletim de ocorrência ou a CAT (se houver) e o que comprove o seu trabalho na roça.",
    faq: [
      { pergunta: "Já voltei a trabalhar. Ainda posso ter direito?", resposta: "Pode, desde que a sequela atrapalhe o trabalho que você fazia. Cada caso é analisado individualmente." },
      { pergunta: "Tenho poucos papéis do trabalho na roça. Tem problema?", resposta: "Muita gente começa assim. A gente explica quais documentos ajudam e como conseguir cada um." },
    ],
    chamadaFinal: "Sofreu um acidente no campo e ficou com dúvida? Conte o que aconteceu. Nossa equipe responde pelo WhatsApp e explica os próximos passos.",
    botaoFinal: "Quero conversar com a equipe",
  },
  {
    slug: "auxilio-doenca-rural",
    tema: "doenca",
    publico: "rural",
    nome: "Auxílio-Doença · Rural",
    seo: "Auxílio-Doença Rural | Souza & Souza",
    titulo: "Doente ou machucado e sem conseguir trabalhar na roça? Entenda o auxílio-doença.",
    subtitulo: "O benefício, hoje chamado de auxílio por incapacidade temporária, pode ser analisado para quem trabalha no campo.",
    botao: "Falar com a equipe no WhatsApp",
    paragrafos: [
      "Quando uma doença ou uma lesão derruba você e o trabalho na roça para a preocupação vem junto: como fica o sustento da família enquanto você se recupera? Para essas situações existe o auxílio-doença, hoje chamado de auxílio por incapacidade temporária.",
      "Ele pode ser analisado quando você fica sem condições de trabalhar por mais de 15 dias e a incapacidade é confirmada em perícia do INSS. Vale para o empregado rural e para o produtor em regime de economia familiar. Em regra, é preciso comprovar 12 meses de trabalho no campo, mas essa exigência muda em caso de acidente e em algumas doenças graves previstas em lei.",
      "Muitos pedidos são negados por falta de prova do trabalho rural ou por problemas nos laudos, e isso nem sempre é o fim da história. A Souza & Souza analisa o motivo, orienta sobre a perícia e ajuda a organizar a documentação. Você sabe cada passo e decide com clareza como seguir.",
    ],
    documentos: "Para começar, vale separar seus documentos pessoais e CPF, atestados, laudos e exames recentes, notas de produtor, contratos ou declaração do sindicato rural e, se o pedido já foi negado, a carta de decisão do INSS.",
    faq: [
      { pergunta: "Meu pedido foi negado. Posso tentar de novo?", resposta: "Em muitos casos, sim. Analisamos o motivo da negativa e vemos se cabe novo pedido ou recurso." },
      { pergunta: "Preciso ter pago o INSS?", resposta: "O trabalhador rural pode comprovar o tempo de atividade no campo. A análise é feita caso a caso." },
    ],
    chamadaFinal: "Está sem conseguir trabalhar e com dúvida sobre o benefício? Conte sua situação. Nossa equipe responde pelo WhatsApp e explica os próximos passos.",
    botaoFinal: "Quero conversar com a equipe",
  },
  {
    slug: "auxilio-doenca-urbano",
    tema: "doenca",
    publico: "urbano",
    nome: "Auxílio-Doença · Urbano",
    seo: "Auxílio-Doença Urbano | Souza & Souza",
    titulo: "Afastado do trabalho por doença ou acidente? Entenda o auxílio-doença.",
    subtitulo: "O benefício, hoje chamado de auxílio por incapacidade temporária, pode ser analisado com orientação.",
    botao: "Falar com a equipe no WhatsApp",
    paragrafos: [
      "Ficar sem trabalhar por causa da saúde já é difícil. Ficar sem renda ao mesmo tempo piora tudo. O auxílio-doença, hoje chamado de auxílio por incapacidade temporária, existe justamente para proteger o trabalhador nesse período.",
      "Ele pode ser analisado quando a doença ou a lesão impede você de trabalhar por mais de 15 dias e a incapacidade é confirmada pela perícia do INSS. Vale para quem tem carteira assinada e para quem contribui por conta própria. Em regra, são necessárias 12 contribuições, mas a exigência muda em acidentes e em algumas doenças graves. Para o empregado, a empresa paga os 15 primeiros dias e o INSS paga a partir do 16º.",
      "Se o INSS negou ou encerrou o seu benefício, vale entender o motivo antes de desistir.",
      "Aqui na Souza & Souza a gente confere o seu CNIS, analisa os laudos, orienta sobre a perícia e explica os caminhos possíveis, sem juridiquês. Você decide como seguir com todas as informações.",
    ],
    documentos: "Para começar, vale separar seus documentos pessoais e CPF, carteira de trabalho, CNIS ou carnês de contribuição, atestados, laudos e exames recentes e, se o pedido foi negado, a carta de decisão do INSS.",
    faq: [
      { pergunta: "O INSS negou meu pedido. E agora?", resposta: "Em muitos casos é possível reavaliar. Analisamos o motivo da negativa e vemos se cabe novo pedido ou recurso." },
      { pergunta: "Quantas contribuições preciso ter?", resposta: "Em regra, 12 contribuições, com exceções para acidentes e algumas doenças. Conferimos o seu CNIS para ver a sua situação." },
    ],
    chamadaFinal: "Está afastado e com dúvida sobre o que fazer? Conte sua situação. Nossa equipe, em Catalão e região, responde pelo WhatsApp e explica os próximos passos.",
    botaoFinal: "Quero conversar com a equipe",
  },
  {
    slug: "salario-maternidade-rural",
    tema: "maternidade",
    publico: "rural",
    nome: "Salário-Maternidade · Rural",
    seo: "Salário-Maternidade Rural | Souza & Souza",
    titulo: "Teve bebê e trabalha no campo? Veja se o salário-maternidade se aplica a você.",
    subtitulo: "São 120 dias de benefício, com regras próprias para quem trabalha na roça.",
    botao: "Falar com a equipe no WhatsApp",
    paragrafos: [
      "A chegada de um filho traz alegria e mais despesas, justo quando você precisa se afastar do trabalho para cuidar do bebê. O salário-maternidade existe para dar esse apoio por 120 dias.",
      "Ele pode ser analisado para a trabalhadora rural que teve filho, adotou ou recebeu a guarda judicial de uma criança. Quem trabalha em regime de economia familiar precisa comprovar 10 meses de atividade rural antes do parto, e esses meses podem ser intercalados. A empregada rural não tem tempo mínimo, e o pagamento é feito pelo empregador. O pedido pode ser feito em até 5 anos do nascimento.",
      "O ponto que mais pesa é comprovar o trabalho no campo, e documentos em nome do marido ou da família também podem ajudar.",
      "A Souza & Souza confere o que você tem, explica o que falta e como conseguir, e acompanha o pedido. Tudo em linguagem simples, e você decide como seguir.",
    ],
    documentos: "Para começar, vale separar a certidão de nascimento (ou o termo de guarda), seus documentos pessoais e CPF e o que comprove o seu trabalho rural: notas de produtor, declaração do sindicato ou outros documentos da família.",
    faq: [
      { pergunta: "Meu filho já nasceu há algum tempo. Ainda dá?", resposta: "O pedido pode ser feito em até 5 anos do nascimento. Vale conferir o seu caso." },
      { pergunta: "Trabalho com meu marido na roça. Isso conta?", resposta: "Documentos em nome da família podem ajudar a comprovar o trabalho rural. Analisamos caso a caso." },
    ],
    chamadaFinal: "Teve bebê e ficou com dúvida sobre o benefício? Conte sua situação. Nossa equipe responde pelo WhatsApp e explica os próximos passos.",
    botaoFinal: "Quero conversar com a equipe",
  },
  {
    slug: "salario-maternidade-urbano",
    tema: "maternidade",
    publico: "urbano",
    nome: "Salário-Maternidade · Urbano",
    seo: "Salário-Maternidade Urbano | Souza & Souza",
    titulo: "Teve bebê ou adotou? Saiba se você pode receber o salário-maternidade.",
    subtitulo: "São 120 dias de benefício. As regras mudam conforme o seu tipo de trabalho ou de contribuição.",
    botao: "Falar com a equipe no WhatsApp",
    paragrafos: [
      "Um filho novo muda a casa, a rotina e as contas. Em meio a tudo isso, saber que existe um benefício para o período de afastamento ajuda a planejar com mais tranquilidade.",
      "É o salário-maternidade, que dura 120 dias.",
      "Ele pode ser analisado para quem teve filho, adotou ou recebeu a guarda judicial de uma criança. Empregada com carteira assinada, doméstica e avulsa não precisam de tempo mínimo de contribuição. Autônoma, MEI e contribuinte facultativa precisam de 10 contribuições, número que pode ser menor em parto antecipado. O pedido pode ser feito em até 5 anos do nascimento.",
      "Como as regras mudam conforme o tipo de vínculo, o mais seguro é olhar o seu caso com calma. Aqui na Souza & Souza a gente confere seu CNIS e suas contribuições, explica o que falta, se faltar, e acompanha o pedido. Você decide como seguir, com todas as informações.",
    ],
    documentos: "Para começar, vale separar a certidão de nascimento (ou o termo de guarda), seus documentos pessoais e CPF, a carteira de trabalho, o CNIS ou os comprovantes de contribuição e, se for empregada, o comprovante de afastamento.",
    faq: [
      { pergunta: "Sou MEI. Posso receber?", resposta: "Em geral, sim, desde que as contribuições estejam em dia e a carência seja cumprida. Conferimos as suas guias." },
      { pergunta: "Meu filho já nasceu há algum tempo. Ainda dá?", resposta: "O pedido pode ser feito em até 5 anos do nascimento. Vale conferir o seu caso." },
    ],
    chamadaFinal: "Teve bebê ou adotou e ficou com dúvida? Conte sua situação. Nossa equipe, em Catalão e região, responde pelo WhatsApp e explica os próximos passos.",
    botaoFinal: "Quero conversar com a equipe",
  },
];

/** Textos comuns a todas as páginas. */
export const comumLp = {
  aviso: ["Conteúdo informativo.", "Cada benefício possui requisitos próprios e cada caso exige análise individual. Não há garantia de resultado."],
  identificacao: "Souza & Souza Advocacia e Assessoria Jurídica · Catalão – GO",
  /**
   * O documento pede "Nome e número de inscrição na OAB dos advogados responsáveis, conforme o material oficial do escritório".
   * Esses dados não estão no documento nem no site: fica marcado até o
   * escritório enviar. Não preencher de memória.
   */
  oabResponsaveis: null as string | null,
} as const;

export function landingPorSlug(slug: string) {
  return landingPages.find((p) => p.slug === slug);
}

