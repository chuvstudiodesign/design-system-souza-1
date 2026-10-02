import type { Metadata } from "next";

import { DepoimentosV2 } from "@/components/site5/depoimentos/v2";
import { FaixaNumeros } from "@/components/site5/faixa-numeros";
import { FechoV1 } from "@/components/site5/fecho/v1";
import { FechoV2 } from "@/components/site5/fecho/v2";
import { HeroFoto } from "@/components/site5/hero-foto";
import { IndiceAreasDialogo } from "@/components/site5/indice-areas-dialogo";
import { Manifesto } from "@/components/site5/manifesto";
import { Publicacoes } from "@/components/site5/publicacoes";
import { VariacoesSecao } from "@/components/site5/variacoes-secao";
import { contato } from "@/lib/site5/contato";
import { fotosEspaco, home } from "@/lib/site5/conteudo";

/**
 * Home da variação 5 — copy do cliente de 02/SET/2026.
 *
 * Mantém a linguagem da variação 4 (escuro, trilho numerado, dourado, vidro
 * nos diálogos) e segue a ordem de blocos do documento: Hero → O Escritório →
 * Áreas → Números → Depoimentos → Publicações → Entre em contato.
 * Especificação: `docs/site5-specs/01-home.md`.
 */
export const metadata: Metadata = {
  // O `template` do layout não vale para o page.tsx do mesmo segmento, então
  // o título da home é absoluto.
  title: {
    absolute: `${contato.nomeCurto} | ${contato.cidade} - ${contato.uf}`,
  },
  description: home.hero.paragrafos[0],
  openGraph: {
    title: contato.nomeCurto,
    description: home.hero.paragrafos[0],
    images: [
      {
        url: fotosEspaco.fachada.src,
        width: fotosEspaco.fachada.width,
        height: fotosEspaco.fachada.height,
        alt: fotosEspaco.fachada.alt,
      },
    ],
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <HeroFoto />
      <FaixaNumeros />
      <Manifesto />
      <IndiceAreasDialogo />
      <DepoimentosV2 />
      <Publicacoes />
      <VariacoesSecao
        rotulo="Contato"
        // Ordem invertida a pedido do cliente (29/09/2026): a antiga V2 abre
        // primeiro e aparece como "1"; a antiga V1 virou "2".
        versoes={[<FechoV2 key={2} />, <FechoV1 key={1} />]}
      />
    </>
  );
}
