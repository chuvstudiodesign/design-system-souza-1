"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import type { ConfigVidro } from "@/components/site5/controle-vidro";
import { IndiceAreas } from "@/components/site5/indice-areas";
import { areasEmDestaque, type AreaDeAtuacao } from "@/lib/site5/conteudo";

/**
 * Seção de áreas da `/site` com o detalhe em pop-up.
 *
 * Toda linha do índice abre o diálogo de vidro com a descrição e os itens da
 * área; o link para a página Serviços fica no rodapé do diálogo.
 *
 * Bundle: o diálogo (Radix Dialog + LiquidGlass) não aparece na primeira
 * dobra, então sai do chunk inicial por `next/dynamic` e carrega depois da
 * hidratação. O painel de calibragem do vidro (`?vidro`) é ferramenta de
 * desenvolvimento: fora de produção entra por `import()` dinâmico; em build de
 * produção a condição é literal e o módulo nem entra no grafo.
 */
const DialogoArea = dynamic(
  () => import("@/components/site5/dialogo-area").then((m) => m.DialogoArea),
  { ssr: false }
);

const AjusteVidroDev =
  process.env.NODE_ENV !== "production"
    ? dynamic(
        () =>
          import("@/components/site5/controle-vidro").then(
            (m) => m.AjusteVidro
          ),
        { ssr: false }
      )
    : null;

export function IndiceAreasDialogo() {
  const [aberto, setAberto] = React.useState(false);
  // A área fica retida depois do fechamento de propósito: o diálogo sai com
  // animação, e limpá-la junto com `aberto` esvaziaria o painel no meio dela.
  const [area, setArea] = React.useState<AreaDeAtuacao | null>(null);

  function abrir(slug: string) {
    const encontrada = areasEmDestaque.find((item) => item.slug === slug);
    if (!encontrada) return;
    setArea(encontrada);
    setAberto(true);
  }

  const dialogo = (vidro: ConfigVidro | null) => (
    <DialogoArea
      area={area}
      open={aberto}
      onOpenChange={setAberto}
      vidro={vidro}
    />
  );

  return (
    <>
      <IndiceAreas aoAbrirArea={abrir} />
      {AjusteVidroDev ? (
        <AjusteVidroDev>{dialogo}</AjusteVidroDev>
      ) : (
        dialogo(null)
      )}
    </>
  );
}
