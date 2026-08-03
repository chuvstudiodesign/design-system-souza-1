import type { Metadata } from "next";

import { Fecho } from "@/components/site2/fecho";
import { FaixaNumeros } from "@/components/site2/faixa-numeros";
import { Manifesto } from "@/components/site2/manifesto";
import { Vozes } from "@/components/site2/vozes";
import { HeroFoto } from "@/components/site4/hero-foto";
import { IndiceAreasDialogo } from "@/components/site4/indice-areas-dialogo";

/**
 * Variação 4.
 *
 * Parte da variação 3 — mesma sequência de seções, mesma assinatura em Trajan
 * no header — e muda duas coisas: o hero passa a ter a fotografia do escritório
 * ao fundo, e a página existe só no tema escuro.
 *
 * As seções abaixo do hero continuam importadas de `/site2`, não copiadas, de
 * modo que as quatro rotas nunca divergem por descuido.
 */
export const metadata: Metadata = {
  title: "Variação 4 — hero com fotografia",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <HeroFoto />
      <FaixaNumeros />
      <Manifesto />
      <IndiceAreasDialogo />
      <Vozes />
      <Fecho />
    </>
  );
}
