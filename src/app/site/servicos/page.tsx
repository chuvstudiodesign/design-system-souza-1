import type { Metadata } from "next";

import { SeletorVersao } from "@/components/site5/seletor-versao";

import { CatalogoAreas } from "@/components/site5/servicos/catalogo-areas";
import { ContatoServicos } from "@/components/site5/servicos/contato-servicos";
import { HeroServicos } from "@/components/site5/servicos/hero-servicos";
import { fotosEspaco, servicosIntro } from "@/lib/site5/conteudo";

/**
 * Serviços da variação 5 — copy do cliente de 02/SET/2026.
 *
 * Especificação: `docs/site5-specs/04-servicos.md`. Três blocos: abertura
 * com sumário (base) → catálogo das 7 áreas (muted) → contato (navy).
 * Cada área é um `<article id={slug}>`, destino das âncoras da home.
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
      <HeroServicos />
      <CatalogoAreas />
      <ContatoServicos />
      <SeletorVersao base="/site/servicos" atual={1} />
    </>
  );
}
