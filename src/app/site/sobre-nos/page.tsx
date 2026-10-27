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
 * Sobre nós da variação 5 — V2 "Revista" com a capa IMG_4002-HDR, escolhida
 * pelo cliente em 27/OUT/2026 (era a "Versão 2" do seletor).
 *
 * A versão com a capa do balcão da marca e as antigas V1 e V3 ficam em
 * `_ocultas/` (pasta privada: o Next não gera rota para ela).
 *
 * Especificação: `docs/site5-specs/02-sobre-nos-v2.md`.
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
        url: fotosEspaco.recepcaoHdr4002.src,
        width: fotosEspaco.recepcaoHdr4002.width,
        height: fotosEspaco.recepcaoHdr4002.height,
        alt: fotosEspaco.recepcaoHdr4002.alt,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <Capa
        foto={fotosEspaco.recepcaoHdr4002}
        enquadramento="object-[65%_0%] md:object-[55%_0%]"
        // Desce a foto para o topo começar abaixo do header e não cortar o
        // painel da marca (pedido de 29/09/2026). Reverter: remover a prop.
        deslocamento="top-10"
      />
      <Apresentacao />
      <Experiencia />
      <Proposito />
      <Valores />
      <Diferencial />
      <Fechamento />
    </>
  );
}
