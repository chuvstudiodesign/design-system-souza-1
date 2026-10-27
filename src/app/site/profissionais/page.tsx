import type { Metadata } from "next";

import { Abertura } from "@/components/site5/profissionais-v2/abertura";
import { Dobras } from "@/components/site5/profissionais-v2/dobras";
import { FechoNavy } from "@/components/site5/profissionais-v2/fecho-navy";
import { IntroducaoDourada } from "@/components/site5/profissionais-v2/introducao-dourada";
import { fotosEspaco, profissionaisIntro } from "@/lib/site5/conteudo";

/**
 * Profissionais da variação 5 — Versão 1 "Galeria" (era a V2; a V1 original
 * foi descartada pelo usuário em 24/09/2026). Escolhida em 27/OUT/2026; a V2
 * "Diretório" está em `_ocultas/v2`.
 *
 * Especificação: `docs/site5-specs/03-profissionais-v2.md`. Abertura (base)
 * → Introdução (gold) → 5 dobras com retrato sangrado (muted/base
 * alternadas) → Contato (navy).
 */
export const metadata: Metadata = {
  title: "Profissionais",
  description: profissionaisIntro.subtitulo,
  robots: { index: false, follow: false },
  openGraph: {
    title: profissionaisIntro.titulo,
    description: profissionaisIntro.subtitulo,
    images: [
      {
        url: fotosEspaco.equipeGrupo.src,
        width: fotosEspaco.equipeGrupo.width,
        height: fotosEspaco.equipeGrupo.height,
        alt: fotosEspaco.equipeGrupo.alt,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <Abertura />
      <IntroducaoDourada />
      <Dobras />
      <FechoNavy />
    </>
  );
}
