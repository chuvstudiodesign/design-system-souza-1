import type { Metadata } from "next";

import { SeletorVersao } from "@/components/site5/seletor-versao";
import { Apresentacao } from "@/components/site5/sobre-v2/apresentacao";
import { Capa } from "@/components/site5/sobre-v2/capa";
import { Diferencial } from "@/components/site5/sobre-v2/diferencial";
import { Experiencia } from "@/components/site5/sobre-v2/experiencia";
import { Fechamento } from "@/components/site5/sobre-v2/fechamento";
import { Proposito } from "@/components/site5/sobre-v2/proposito";
import { Valores } from "@/components/site5/sobre-v2/valores";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

/**
 * Sobre nós da variação 5 — V2 "Revista", escolhida pelo cliente em 29/SET/2026.
 *
 * A V1 e a V3 ficam guardadas em `_ocultas/` (pasta privada: o Next não gera
 * rota para ela). Para reexibir uma delas, basta mover a pasta de volta.
 *
 * Especificação: `docs/site5-specs/02-sobre-nos-v2.md`. Mesmo texto da V1,
 * outra diagramação: capa com foto sangrada, matéria com capitular, díptico,
 * frase em página cheia, índice, cartão sobre foto e contracapa. Ritmo de
 * superfície: base (foto) → muted → base → gold → navy → base (foto) → muted.
 */
export const metadata: Metadata = {
  title: "Sobre nós",
  description: sobre.hero.subtitulo,
  robots: { index: false, follow: false },
  openGraph: {
    title: sobre.hero.titulo,
    description: sobre.hero.subtitulo,
    images: [
      {
        url: fotosEspaco.recepcaoBalcaoMarca.src,
        width: fotosEspaco.recepcaoBalcaoMarca.width,
        height: fotosEspaco.recepcaoBalcaoMarca.height,
        alt: fotosEspaco.recepcaoBalcaoMarca.alt,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <Capa />
      <Apresentacao />
      <Experiencia />
      <Proposito />
      <Valores />
      <Diferencial />
      <Fechamento />
      <SeletorVersao base="/site/sobre-nos" atual={1} total={2} />
    </>
  );
}
