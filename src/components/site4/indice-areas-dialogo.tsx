"use client";

import * as React from "react";

import { IndiceAreas } from "@/components/site2/indice-areas";
import { useAjusteVidro } from "@/components/site4/controle-vidro";
import { DialogoArea } from "@/components/site4/dialogo-area";
import { areasDoDireito, type AreaDoDireito } from "@/lib/site/conteudo";

/**
 * A seção de áreas da `/site4` com o detalhe em pop-up.
 *
 * O índice em si é o mesmo componente de `/site2` — o layout da seção não muda.
 * O que muda é o destino do clique: as áreas listadas aqui abrem o diálogo de
 * vidro no lugar de navegar para a página de serviços.
 *
 * Com as sete cobertas, a rota não usa mais o link para `/site/servicos`. O
 * mecanismo de opt-in fica de pé mesmo assim: é ele que mantém `/site2` e
 * `/site3` no comportamento antigo, já que os três compartilham o componente.
 */
const AREAS_COM_DIALOGO = areasDoDireito.map((area) => area.slug);

export function IndiceAreasDialogo() {
  const [aberto, setAberto] = React.useState(false);
  // A área fica retida depois do fechamento de propósito: o diálogo sai com
  // animação, e limpá-la junto com `aberto` esvaziaria o painel no meio dela.
  // Só a próxima abertura substitui o conteúdo.
  const [area, setArea] = React.useState<AreaDoDireito | null>(null);

  // `null` fora de desenvolvimento e sem `?vidro` na URL.
  const { config: vidro, painel } = useAjusteVidro();

  function abrir(slug: string) {
    const encontrada = areasDoDireito.find((item) => item.slug === slug);
    if (!encontrada) return;
    setArea(encontrada);
    setAberto(true);
  }

  return (
    <>
      <IndiceAreas areasComDialogo={AREAS_COM_DIALOGO} aoAbrirArea={abrir} />

      <DialogoArea
        area={area}
        open={aberto}
        onOpenChange={setAberto}
        vidro={vidro}
      />

      {painel}
    </>
  );
}
