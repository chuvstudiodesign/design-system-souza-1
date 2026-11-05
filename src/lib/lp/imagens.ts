import { fotosEspaco } from "@/lib/site5/conteudo";

import type { LandingPage } from "./conteudo";

/**
 * Fotografias das landing pages.
 *
 * Cada página tem três opções de imagem no hero, que o cliente alterna pelo
 * seletor "Imagem 1 · 2 · 3" para comparar estilos (pedido de 05/NOV/2026):
 *
 *   1. tema — foto que representa o benefício (Unsplash, licença livre);
 *   2. equipe — as sócias, a mesma foto do hero do site;
 *   3. escritório — a recepção com o painel da marca.
 *
 * As do escritório e da equipe são as fotos oficiais, lidas de
 * `@/lib/site5/conteudo` sem alteração. As de tema ficam em /public/lp.
 */

export interface FotoLp {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** `object-position` do recorte 4:5 do hero. */
  posicao?: string;
}

export const fotosTema: Record<string, FotoLp> = {
  "auxilio-acidente-urbano": {
    src: "/lp/auxilio-acidente-urbano.webp",
    width: 2400,
    height: 4625,
    alt: "Fisioterapeuta tratando o braço de um paciente",
    posicao: "50% 55%",
  },
  "auxilio-acidente-rural": {
    src: "/lp/auxilio-acidente-rural.webp",
    width: 2400,
    height: 3600,
    alt: "Trabalhador rural de chapéu e camisa azul no campo",
    posicao: "40% 30%",
  },
  "auxilio-doenca-rural": {
    src: "/lp/auxilio-doenca-rural.webp",
    width: 2400,
    height: 2400,
    alt: "Senhor de chapéu de palha com expressão pensativa",
    posicao: "55% 40%",
  },
  "auxilio-doenca-urbano": {
    src: "/lp/auxilio-doenca-urbano.webp",
    width: 2400,
    height: 1350,
    alt: "Médica conversando com um paciente no consultório",
    posicao: "62% 50%",
  },
  "salario-maternidade-rural": {
    src: "/lp/salario-maternidade-rural.webp",
    width: 2400,
    height: 3600,
    alt: "Mãe segurando o bebê no colo em um campo aberto",
    posicao: "50% 60%",
  },
  "salario-maternidade-urbano": {
    src: "/lp/salario-maternidade-urbano.webp",
    width: 2400,
    height: 3600,
    alt: "Mãe beijando o rosto do bebê deitado",
    posicao: "50% 40%",
  },
};

export const fotoEquipe: FotoLp = {
  src: "/site/home/hero.webp",
  width: 3840,
  height: 1751,
  alt: "Advogadas sócias da Souza & Souza no escritório",
  posicao: "62% 30%",
};

export const fotoEscritorio: FotoLp = {
  ...fotosEspaco.recepcaoNova,
  posicao: "55% 40%",
};

/** As três opções do hero, na ordem do seletor. */
export function opcoesHero(lp: LandingPage) {
  return [
    { rotulo: "Tema", foto: fotosTema[lp.slug] },
    { rotulo: "Equipe", foto: fotoEquipe },
    { rotulo: "Escritório", foto: fotoEscritorio },
  ];
}

/** Fotos do bloco "O Escritório" da V3. */
export const fotosBlocoEscritorio = [
  fotosEspaco.fachadaNova,
  fotosEspaco.recepcaoNova,
  fotosEspaco.sala1Nova,
] as const;
