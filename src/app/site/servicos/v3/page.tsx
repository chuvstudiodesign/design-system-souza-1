import type { Metadata } from "next";

import { SeletorVersao } from "@/components/site5/seletor-versao";
import { AberturaV3 } from "@/components/site5/servicos-v3/abertura";
import { Capitulos } from "@/components/site5/servicos-v3/capitulos";
import { FechoServicos } from "@/components/site5/servicos-v3/fecho-servicos";
import { fotosEspaco, servicosIntro } from "@/lib/site5/conteudo";

/**
 * Serviços V3 — "Capítulos".
 *
 * Especificação: `docs/site5-specs/04-servicos-v3.md`. Abertura + faixa de
 * índice (base) → 7 capítulos alternando muted/base, cada um uma
 * `<section id={slug}>` destino das âncoras da home → fecho com foto (base).
 */
export const metadata: Metadata = {
  title: "Serviços",
  description: servicosIntro.paragrafo,
  robots: { index: false, follow: false },
  openGraph: {
    title: servicosIntro.titulo,
    description: servicosIntro.paragrafo,
    images: [
      {
        url: fotosEspaco.salaEstanteMesa.src,
        width: fotosEspaco.salaEstanteMesa.width,
        height: fotosEspaco.salaEstanteMesa.height,
        alt: fotosEspaco.salaEstanteMesa.alt,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <AberturaV3 />
      <Capitulos />
      <FechoServicos />
      <SeletorVersao base="/site/servicos" atual={3} />
    </>
  );
}
