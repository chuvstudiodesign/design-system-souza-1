/**
 * Navegação da variação 5.
 *
 * Rótulos e ordem seguem o documento do cliente de 02/SET/2026: Home, Sobre
 * nós, Profissionais, Serviços e Entre em contato. Todo item aponta para uma
 * página real.
 */
export interface ItemNav {
  rotulo: string;
  href: string;
}

export const navegacao: ItemNav[] = [
  { rotulo: "Home", href: "/site" },
  { rotulo: "Sobre nós", href: "/site/sobre-nos" },
  { rotulo: "Profissionais", href: "/site/profissionais" },
  { rotulo: "Serviços", href: "/site/servicos" },
  { rotulo: "Entre em contato", href: "/site/contato" },
];
