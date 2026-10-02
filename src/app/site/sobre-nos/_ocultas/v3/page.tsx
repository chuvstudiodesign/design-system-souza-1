import type { Metadata } from "next";

import { SeletorVersao } from "@/components/site5/seletor-versao";
import { Apresentacao } from "@/components/site5/sobre-v3/apresentacao";
import { Diferencial } from "@/components/site5/sobre-v3/diferencial";
import { Experiencia } from "@/components/site5/sobre-v3/experiencia";
import { Fechamento } from "@/components/site5/sobre-v3/fechamento";
import { Hero } from "@/components/site5/sobre-v3/hero";
import { Proposito } from "@/components/site5/sobre-v3/proposito";
import { Valores } from "@/components/site5/sobre-v3/valores";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

/**
 * Sobre nós da variação 5 — V3 "Planta".
 *
 * Especificação: `docs/site5-specs/02-sobre-nos-v3.md`. Mesmo texto da V1,
 * diagramado como planta de arquitetura: réguas, células com filete, bandas
 * navy nas pontas e um único painel de vidro. Ritmo de superfície: navy →
 * base → muted → gold → base → base (foto) → navy.
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
        url: fotosEspaco.fachadaSol.src,
        width: fotosEspaco.fachadaSol.width,
        height: fotosEspaco.fachadaSol.height,
        alt: fotosEspaco.fachadaSol.alt,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <Hero />
      <Apresentacao />
      <Experiencia />
      <Proposito />
      <Valores />
      <Diferencial />
      <Fechamento />
      <SeletorVersao base="/site/sobre-nos" atual={3} />
    </>
  );
}
