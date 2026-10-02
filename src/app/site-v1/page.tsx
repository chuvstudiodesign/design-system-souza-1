import { Areas } from "@/components/site/sections/areas";
import { ChamadaContato } from "@/components/site/sections/chamada-contato";
import { Depoimentos } from "@/components/site/sections/depoimentos";
import { Hero } from "@/components/site/sections/hero";
import { Metricas } from "@/components/site/sections/metricas";
import { Posicionamento } from "@/components/site/sections/posicionamento";

/**
 * Home.
 *
 * O ritmo de superfícies alterna a cada seção — navy, card, base, muted, navy,
 * base — para que nenhum par de seções vizinhas se leia como um bloco só.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Metricas />
      <Posicionamento />
      <Areas />
      <Depoimentos />
      <ChamadaContato />
    </>
  );
}
