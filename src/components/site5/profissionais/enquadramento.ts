/**
 * Enquadramento de cada retrato — conferido visualmente em 375 e 1280.
 *
 * `retrato`: `object-position` do recorte 4:5 da ficha. As fotos são 2:3
 * (sócias) ou ~9:16 (associadas), então só o eixo vertical corta; o valor
 * garante que o topo da cabeça nunca sai do quadro.
 *
 * `rosto`: recorte circular do sumário. A imagem é ancorada no topo
 * (`object-[50%_0%]`, que mostra o quadrado superior da foto) e ampliada por
 * `scale` a partir de uma origem calculada para que o rosto caia no centro do
 * círculo: origem = (0,5 − s·p) / (1 − s), com `p` = centro do rosto nesse
 * quadrado. Por isso a origem não coincide com o rosto.
 *
 * Classes por extenso para o Tailwind encontrá-las no código.
 */
export const enquadramento: Record<string, { retrato: string; rosto: string }> =
  {
    "paula-faids": {
      retrato: "object-[50%_15%]",
      rosto: "object-[50%_0%] scale-[2.2] origin-[60%_61%]",
    },
    "angela-borba": {
      retrato: "object-[50%_25%]",
      rosto: "object-[50%_0%] scale-[2.1] origin-[77%_55%]",
    },
    "kelly-marques": {
      retrato: "object-[50%_20%]",
      rosto: "object-[50%_0%] scale-[2] origin-[65%_20%]",
    },
    "barbara-matoso": {
      retrato: "object-[50%_15%]",
      rosto: "object-[50%_0%] scale-[1.7] origin-[62%_65%]",
    },
    "flavia-almeida": {
      retrato: "object-[50%_18%]",
      rosto: "object-[50%_0%] scale-[1.7] origin-[84%_69%]",
    },
  };
