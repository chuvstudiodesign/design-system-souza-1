/**
 * Dados de contato canônicos da Souza & Souza Advocacia.
 *
 * Fonte: Site/paginas/07-contato.md e Site/paginas/00-globais-header-footer.md.
 * Nada aqui deve ser redigitado em componente — telefone digitado à mão é onde
 * o dígito errado entra.
 */

export const contato = {
  razaoSocial: "Souza & Souza Advocacia e Assessoria Jurídica",
  nomeCurto: "Souza & Souza Advocacia",
  cidade: "Catalão",
  uf: "GO",

  endereco: {
    logradouro: "Av Farid Miguel Safatle, Nº 771",
    complemento: "Sala 2",
    bairro: "Setor Central",
    cidade: "Catalão",
    uf: "GO",
    cep: "75701-040",
    /** Uma linha só, como aparece no rodapé do site antigo. */
    completo:
      "Av Farid Miguel Safatle, Nº 771, Sala 2, Setor Central, Catalão/GO, CEP 75701-040",
  },

  telefoneFixo: {
    exibicao: "(64) 3411-1815",
    href: "tel:+556434111815",
  },

  whatsapp: {
    exibicao: "(64) 98479-1815",
    mensagem: "Olá, visitei o site e gostaria de falar com um advogado.",
    href: "https://api.whatsapp.com/send?phone=5564984791815",
  },

  email: {
    exibicao: "atendimento@advsouzaesouza.com",
    href: "mailto:atendimento@advsouzaesouza.com",
  },

  instagram: {
    usuario: "@souzaesouza.advocacia",
    href: "https://www.instagram.com/souzaesouza.advocacia/",
  },

  /**
   * O rodapé antigo cita "Facebook: Souza & Souza Advocacia" mas não existe URL
   * de Facebook em nenhuma página do site. Enquanto o cliente não fornecer, o
   * item simplesmente não é renderizado — inventar a URL seria pior que omitir.
   */
  facebook: null,

  criadoPor: "Chuv Studio",
} as const;

/** Link de WhatsApp já com a mensagem padrão codificada. */
export const whatsappHref = `${contato.whatsapp.href}&text=${encodeURIComponent(
  contato.whatsapp.mensagem
)}`;

/** Embed do Google Maps do endereço do escritório, zoom 14 como no site antigo. */
export const mapaEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  contato.endereco.completo
)}&z=14&output=embed`;

/** Marca — aparece uma única vez no site antigo, enterrada num parágrafo. */
export const marca = {
  slogan: "Cuidamos de Causas, Cultivamos Conexões",
  assinatura: "Souza & Souza, seu Direito, Nossa Dedicação",
  descritor: "Souza & Souza Advocacia | Catalão – GO",
} as const;
