import type { Metadata } from "next";

import { SeletorVersao } from "@/components/site5/seletor-versao";
import { AberturaV2 } from "@/components/site5/servicos-v2/abertura";
import { CatalogoV2 } from "@/components/site5/servicos-v2/catalogo";
import { ContatoDourado } from "@/components/site5/servicos-v2/contato-dourado";
import { fotosEspaco, servicosIntro } from "@/lib/site5/conteudo";

/**
 * Serviços V2 — "Painéis".
 *
 * Especificação: `docs/site5-specs/04-servicos-v2.md`. Abertura + índice em
 * cards (base) → 7 painéis de esqueleto idêntico (muted) → contato (gold).
 * Cada painel é um `<article id={slug}>`, destino das âncoras da home.
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
      <AberturaV2 />
      <CatalogoV2 />
      <ContatoDourado />
      <SeletorVersao base="/site/servicos" atual={2} />
    </>
  );
}
