import { profissionais } from "@/lib/site5/conteudo";

/**
 * Foto e enquadramento do cartão de cada ficha. As associadas usam as
 * variações `-2` (o cartão mostra outra foto que a do mural); as sócias só
 * têm uma, e o recorte mais fechado do cartão já a diferencia.
 *
 * `posicao` conferido em 375, 768, 1024, 1280 e 1920. Bárbara sobe de 18%
 * (ponto de partida da spec) para 10%: a 375, em 4:3, o cabelo encostava na
 * borda. Classes por extenso.
 */
const foto = (slug: string) => profissionais.find((p) => p.slug === slug)!.foto;

export const retratos: Record<
  string,
  { src: string; width: number; height: number; posicao: string }
> = {
  "paula-faids": { ...foto("paula-faids"), posicao: "object-[50%_30%]" },
  "angela-borba": { ...foto("angela-borba"), posicao: "object-[60%_30%]" },
  "kelly-marques": { ...foto("kelly-marques"), posicao: "object-[50%_12%]" },
  "barbara-matoso": {
    src: "/site5/equipe/barbara-matoso-2.webp",
    width: 2384,
    height: 4240,
    posicao: "object-[50%_10%]",
  },
  "flavia-almeida": {
    src: "/site5/equipe/flavia-almeida-2.webp",
    width: 2232,
    height: 3969,
    posicao: "object-[60%_45%]",
  },
};
