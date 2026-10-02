import type { Metadata } from "next";

import { SeletorVersao } from "@/components/site5/seletor-versao";

import { Apresentacao } from "@/components/site5/sobre/apresentacao";
import { Diferencial } from "@/components/site5/sobre/diferencial";
import { Experiencia } from "@/components/site5/sobre/experiencia";
import { Fechamento } from "@/components/site5/sobre/fechamento";
import { HeroSobre } from "@/components/site5/sobre/hero-sobre";
import { Proposito } from "@/components/site5/sobre/proposito";
import { Valores } from "@/components/site5/sobre/valores";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

/**
 * Sobre nós da variação 5 — copy do cliente de 02/SET/2026.
 *
 * Especificação: `docs/site5-specs/02-sobre-nos.md`. Sete blocos na ordem do
 * documento, alternando superfície: base (foto) → muted → base (foto) →
 * gold → navy → base → muted.
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
        url: fotosEspaco.recepcaoAtendimento.src,
        width: fotosEspaco.recepcaoAtendimento.width,
        height: fotosEspaco.recepcaoAtendimento.height,
        alt: fotosEspaco.recepcaoAtendimento.alt,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <HeroSobre />
      <Apresentacao />
      <Experiencia />
      <Proposito />
      <Valores />
      <Diferencial />
      <Fechamento />
      <SeletorVersao base="/site/sobre-nos" atual={1} />
    </>
  );
}
