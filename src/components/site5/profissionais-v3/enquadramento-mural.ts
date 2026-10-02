/**
 * Recorte da miniatura do mural abaixo de `lg` (96 px, 4:5). Com o
 * `enquadramento[slug].retrato` da V1 a miniatura mostrava o corpo inteiro e
 * o rosto ficava com ~15 px. Aqui a imagem é ancorada no topo e ampliada
 * 1,8× a partir de uma origem que leva o rosto a (50%, 42%) do quadro:
 * origem = (1,8·p − alvo) / 0,8, com `p` = posição do rosto derivada dos
 * dados de `rosto` em `profissionais/enquadramento.ts`.
 *
 * No `lg` a célula é o retrato 3:4 grande, e vale o `retrato` da V1.
 * Classes por extenso para o Tailwind.
 */
export const enquadramentoMural: Record<string, string> = {
  "paula-faids": "max-lg:object-[50%_0%] max-lg:scale-[1.8] max-lg:origin-[62%_48%]",
  "angela-borba": "max-lg:object-[50%_0%] max-lg:scale-[1.8] max-lg:origin-[82%_42%]",
  "kelly-marques": "max-lg:object-[50%_0%] max-lg:scale-[1.8] max-lg:origin-[67%_11%]",
  "barbara-matoso": "max-lg:object-[50%_0%] max-lg:scale-[1.8] max-lg:origin-[61%_49%]",
  "flavia-almeida": "max-lg:object-[50%_0%] max-lg:scale-[1.8] max-lg:origin-[82%_52%]",
};
