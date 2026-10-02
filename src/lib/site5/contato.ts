/**
 * Dados de contato canônicos da variação 5.
 *
 * Fonte: `Site/paginas-v5/05-contato.md` — texto do cliente de 02/SET/2026.
 * Diferente de `@/lib/site/contato`, que atende `/site-v1`–`/site-v4` com o copy
 * antigo: aqui entram o segundo WhatsApp e as URLs de Facebook e LinkedIn,
 * que o cliente passou a fornecer.
 *
 * Nada aqui deve ser redigitado em componente.
 */

const mensagemPadrao =
  "Olá, visitei o site e gostaria de falar com um advogado.";

function linkWhatsapp(numeroE164: string) {
  return `https://api.whatsapp.com/send?phone=${numeroE164}&text=${encodeURIComponent(
    mensagemPadrao
  )}`;
}

export const contato = {
  /** Como assina o rodapé do site antigo ("Direitos Reservados: …"). */
  razaoSocial: "Souza & Souza Advocacia e Assessoria Jurídica",
  nomeCurto: "Souza & Souza Advocacia",
  cidade: "Catalão",
  uf: "GO",
  /** Mês de fundação, como o cliente escreve: "Desde outubro/2007". */
  fundacao: "outubro/2007",

  endereco: {
    nome: "Souza & Souza Advocacia",
    logradouro: "Av. Farid Miguel Safatle, nº 771, Sala 2",
    bairroCidade: "Setor Central – Catalão/GO",
    cep: "CEP 75701-040",
    /** Uma linha só, para o mapa e o rodapé. */
    completo:
      "Av. Farid Miguel Safatle, nº 771, Sala 2, Setor Central – Catalão/GO, CEP 75701-040",
  },

  telefoneFixo: {
    rotulo: "Telefone",
    exibicao: "(64) 3411-1815",
    href: "tel:+556434111815",
  },

  whatsapps: [
    {
      rotulo: "WhatsApp 1",
      exibicao: "(64) 98479-1815",
      href: linkWhatsapp("5564984791815"),
    },
    {
      rotulo: "WhatsApp 2",
      exibicao: "(64) 98178-0019",
      href: linkWhatsapp("5564981780019"),
    },
  ],

  email: {
    rotulo: "E-mail",
    exibicao: "atendimento@advsouzaesouza.com",
    href: "mailto:atendimento@advsouzaesouza.com",
  },

  redes: [
    {
      rede: "instagram",
      rotulo: "Instagram",
      usuario: "@souzaesouza.advocacia",
      href: "https://www.instagram.com/souzaesouza.advocacia/",
    },
    {
      rede: "facebook",
      rotulo: "Facebook",
      href: "https://www.facebook.com/people/Souza-Souza-Advocacia/100090209356390/",
    },
    {
      rede: "linkedin",
      rotulo: "LinkedIn",
      href: "https://www.linkedin.com/company/souzasouza-advocacia/",
    },
  ],

  criadoPor: "Chuv Studio",
} as const;

/** WhatsApp principal — destino dos CTAs "Entrar em contato". */
export const whatsappHref = contato.whatsapps[0].href;

export const instagramHref = contato.redes[0].href;

/** Embed do Google Maps do endereço do escritório. */
export const mapaEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  contato.endereco.completo
)}&z=16&output=embed`;

/** Link para abrir o endereço no Google Maps (fora do embed). */
export const mapaLinkHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contato.endereco.completo
)}`;
