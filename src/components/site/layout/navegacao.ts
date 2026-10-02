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
  { rotulo: "Início", href: "/site-v1" },
  { rotulo: "O escritório", href: "/site-v1/sobre-nos" },
  { rotulo: "Serviços", href: "/site-v1/servicos" },
  { rotulo: "Equipe", href: "/site-v1/equipe" },
  { rotulo: "Contato", href: "/site-v1/contato" },
];
