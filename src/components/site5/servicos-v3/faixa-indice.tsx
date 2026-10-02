import { ArrowDownIcon } from "lucide-react";

import { areas } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

const ULTIMO = areas.length - 1;

/**
 * Divisórias de cada célula por posição, para que só a borda do `ol` feche a
 * faixa em qualquer largura:
 *
 * - base (1 col.): filete embaixo de todas, menos a última;
 * - sm–lg (2 col., 7º ocupando a linha): filete embaixo de todas menos a
 *   7ª (as 5ª e 6ª ficam acima dela), divisória vertical nas da esquerda
 *   (índices pares), exceto a 7ª, que é linha inteira;
 * - lg (7 col.): sem filete embaixo, divisória vertical em todas menos a última.
 */
function bordasPorPosicao(i: number) {
  const ultimo = i === ULTIMO;
  return cn(
    !ultimo && "border-b lg:border-b-0 lg:border-r",
    !ultimo && i % 2 === 0 && "sm:border-r",
    ultimo && "sm:col-span-2 lg:col-span-1"
  );
}

/**
 * Sumário da V3 em faixa com divisórias — o desenho da `FaixaNumeros` da home
 * aplicado ao índice. Destino do "Voltar ao índice" dos capítulos.
 *
 * No lg: 7 colunas, numeral e seta no topo, nome colado à base — a última
 * linha de todos os nomes fica na mesma altura. As colunas são iguais sempre
 * que cabem; `minmax(min-content,1fr)` só alarga a de "Administrativas" (a
 * palavra mais longa) o bastante para ela não ser cortada no meio. Para isso
 * o nome troca o `wrap-anywhere` herdado por `wrap-break-word` no lg — com
 * `anywhere` o min-content da coluna seria uma letra.
 */
export function FaixaIndice({ className }: { className?: string }) {
  return (
    <nav
      id="indice"
      aria-label="Índice das áreas de atuação"
      className={cn("scroll-mt-28", className)}
    >
      <ol className="grid grid-cols-1 border-y border-border sm:grid-cols-2 lg:grid-cols-[repeat(7,minmax(min-content,1fr))]">
        {areas.map((area, i) => (
          <li
            key={area.slug}
            className={cn("min-w-0 border-border", bordasPorPosicao(i))}
          >
            <a
              href={`#${area.slug}`}
              className="group flex h-full min-h-14 items-center gap-4 px-2 py-3 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset motion-reduce:transition-none sm:px-4 lg:min-h-36 lg:flex-col lg:items-start lg:justify-between lg:gap-6 lg:px-4 lg:py-6"
            >
              {/* `contents` abaixo de lg: a seta vai para a ponta direita. */}
              <span className="contents lg:flex lg:w-full lg:items-center lg:justify-between">
                <span
                  aria-hidden
                  className="w-7 shrink-0 font-display text-[0.9688rem] tracking-[0.22em] text-gold-400"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowDownIcon
                  aria-hidden
                  className="order-last ml-auto size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-gold-400 group-focus-visible:text-gold-400 motion-reduce:transition-none lg:order-none lg:ml-0"
                />
              </span>
              <span className="min-w-0 flex-1 text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-snug font-medium text-balance lg:flex-none lg:wrap-break-word">
                {area.nome}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
