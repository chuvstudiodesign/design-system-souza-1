/**
 * Navegação do site institucional.
 *
 * Todo item aponta para uma página real. O site antigo tinha "Serviços" como
 * âncora para uma seção da própria home, e as duas páginas com o conteúdo de
 * verdade ficavam fora do menu — o defeito que esta estrutura corrige.
 */
export interface ItemNav {
  rotulo: string;
  href: string;
}

export const navegacao: ItemNav[] = [
  { rotulo: "Início", href: "/site" },
  { rotulo: "O escritório", href: "/site/sobre-nos" },
  { rotulo: "Serviços", href: "/site/servicos" },
  { rotulo: "Equipe", href: "/site/equipe" },
  { rotulo: "Contato", href: "/site/contato" },
];
