import { Capitulo } from "@/components/site5/servicos-v3/capitulo";
import { areas } from "@/lib/site5/conteudo";

/**
 * As 7 áreas como capítulos de página inteira. A superfície alterna a partir
 * de `muted` (a abertura é `base`), e o fecho volta a `base` depois do 7º
 * (`muted`): nenhuma tripla.
 */
export function Capitulos() {
  return (
    <>
      {areas.map((area, i) => (
        <Capitulo
          key={area.slug}
          area={area}
          numero={i + 1}
          superficie={i % 2 === 0 ? "muted" : "base"}
        />
      ))}
    </>
  );
}
