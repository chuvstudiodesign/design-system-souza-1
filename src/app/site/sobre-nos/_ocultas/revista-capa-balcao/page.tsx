import type { Metadata } from "next";

import { Apresentacao } from "@/components/site5/sobre-v2/apresentacao";
import { Capa } from "@/components/site5/sobre-v2/capa";
import { Diferencial } from "@/components/site5/sobre-v2/diferencial";
import { Experiencia } from "@/components/site5/sobre-v2/experiencia";
import { Fechamento } from "@/components/site5/sobre-v2/fechamento";
import { Proposito } from "@/components/site5/sobre-v2/proposito";
import { Valores } from "@/components/site5/sobre-v2/valores";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

/**
 * Oculta em 27/OUT/2026 — V2 "Revista" com a capa do balcão da marca, que foi
 * a página principal de 29/SET a 27/OUT/2026 ("Versão 1" do seletor).
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
    </>
  );
}
