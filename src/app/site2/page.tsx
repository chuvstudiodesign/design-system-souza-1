import type { Metadata } from "next";

import { Fecho } from "@/components/site2/fecho";
import { FaixaNumeros } from "@/components/site2/faixa-numeros";
import { HeroEditorial } from "@/components/site2/hero-editorial";
import { IndiceAreas } from "@/components/site2/indice-areas";
import { Manifesto } from "@/components/site2/manifesto";
import { Vozes } from "@/components/site2/vozes";

/**
 * Variação 1 da home — editorial tipográfica.
 *
 * O mesmo conteúdo da home principal, em outra forma: nenhuma fotografia acima
 * da dobra, escala tipográfica como elemento dominante, seções numeradas e
 * assimetria de colunas no lugar da ilustração.
 *
 * Ritmo de superfícies: base → base (separada por filete) → muted → base →
 * navy → base. Nunca três iguais em sequência.
 */
/**
 * Variação e home principal carregam o mesmo copy do cliente. Deixar as duas
 * indexáveis seria canibalização de SEO — enquanto isto for um estudo, não
 * entra em índice.
 */
export const metadata: Metadata = {
  title: "Variação 1 — editorial",
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
