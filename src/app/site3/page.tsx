import type { Metadata } from "next";

import { Fecho } from "@/components/site2/fecho";
import { FaixaNumeros } from "@/components/site2/faixa-numeros";
import { HeroEditorial } from "@/components/site2/hero-editorial";
import { IndiceAreas } from "@/components/site2/indice-areas";
import { Manifesto } from "@/components/site2/manifesto";
import { Vozes } from "@/components/site2/vozes";

/**
 * Variação 3.
 *
 * Mesma composição editorial aprovada em `/site2` — as seções são importadas
 * dali, não copiadas, de modo que `/site2` permanece a fonte e as duas rotas
 * nunca divergem por descuido.
 *
 * A única diferença é o header: símbolo vazado dourado com o nome composto em
 * Trajan, no lugar do wordmark em imagem. Trocado no `layout.tsx` desta rota.
 */
export const metadata: Metadata = {
  title: "Variação 3 — assinatura em Trajan",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <HeroEditorial />
      <FaixaNumeros />
      <Manifesto />
      <IndiceAreas />
      <Vozes />
      <Fecho />
    </>
  );
}
