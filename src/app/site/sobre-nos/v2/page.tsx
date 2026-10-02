import type { Metadata } from "next";

import { SeletorVersao } from "@/components/site5/seletor-versao";
import { Apresentacao } from "@/components/site5/sobre-v2/apresentacao";
import { Capa } from "@/components/site5/sobre-v2/capa";
import { Diferencial } from "@/components/site5/sobre-v2/diferencial";
import { Experiencia } from "@/components/site5/sobre-v2/experiencia";
import { Fechamento } from "@/components/site5/sobre-v2/fechamento";
import { Proposito } from "@/components/site5/sobre-v2/proposito";
import { Valores } from "@/components/site5/sobre-v2/valores";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

/**
 * Sobre nós — variante da V2 "Revista" para comparação (29/SET/2026).
 *
 * Idêntica à página principal (`../page.tsx`); só muda a foto da capa, que
 * aqui é a IMG_4002-HDR do ensaio do site antigo. Quando o cliente decidir,
 * a escolhida fica na rota base e esta pasta vai para `_ocultas/`.
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
      <SeletorVersao base="/site/sobre-nos" atual={2} total={2} />
    </>
  );
}
