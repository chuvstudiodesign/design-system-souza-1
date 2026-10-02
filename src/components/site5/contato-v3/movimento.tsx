import { Revelar } from "@/components/site/motion/revelar";
import { Fio } from "@/components/site5/sobre-v2/fio";
import { cn } from "@/lib/utils";

import { colunaX, escala } from "./escala";

/**
 * Casca de cada parte da coluna da V3: superfície que sangra até a borda
 * direita (e encosta no fio dourado da foto), `Fio` com o numeral, H2 e, se o
 * documento tiver, o parágrafo. Cada parte cuida do espaço do seu conteúdo.
 */
export function Movimento({
  id,
  numero,
  titulo,
  paragrafo,
  superficie = "base",
  children,
}: {
  id: string;
  numero: string;
  titulo: string;
  paragrafo?: string;
  superficie?: "base" | "muted";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`titulo-${id}`}
      className={cn(
        "scroll-mt-20 py-16 md:py-20 lg:py-24",
        colunaX,
        superficie === "muted" ? "bg-muted/40" : "bg-background"
      )}
    >
      <div className="max-w-[42rem]">
        <Revelar>
          <Fio numero={numero} />
          <h2 id={`titulo-${id}`} className={cn("mt-6 text-foreground", escala.titulo)}>
            {titulo}
          </h2>
          {paragrafo ? (
            <p className={cn("mt-5 max-w-[52ch]", escala.corpo)}>{paragrafo}</p>
          ) : null}
        </Revelar>
        {children}
      </div>
    </section>
  );
}
