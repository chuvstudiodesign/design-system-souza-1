import type { Metadata } from "next";

import { Abertura } from "@/components/site5/profissionais-v3/abertura";
import { FechoProfissionais } from "@/components/site5/profissionais-v3/fecho-profissionais";
import { Fichas } from "@/components/site5/profissionais-v3/fichas";
import { IntroducaoNavy } from "@/components/site5/profissionais-v3/introducao-navy";
import { SeletorVersao } from "@/components/site5/seletor-versao";
import { fotosEspaco, profissionaisIntro } from "@/lib/site5/conteudo";

/**
 * Profissionais da variação 5 — Versão 2 "Diretório" (era a V3; renumerada
 * em 24/09/2026 quando a V1 original foi descartada).
 *
 * Especificação: `docs/site5-specs/03-profissionais-v3.md`. Abertura com
 * mural (base) → Introdução com foto de grupo vazando (navy) → Fichas
 * (muted) → Contato com foto sangrada (base).
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
      <IntroducaoNavy />
      <Fichas />
      <FechoProfissionais />
      <SeletorVersao base="/site/profissionais" atual={2} total={2} />
    </>
  );
}
