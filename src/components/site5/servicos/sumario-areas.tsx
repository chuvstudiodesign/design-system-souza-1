import { ArrowDownIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import { areas } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

/**
 * Sumário numerado das 7 áreas, ao lado do H1.
 *
 * É o destino do "Voltar ao índice" das fichas (`#sumario`). A partir de `sm`
 * vira duas colunas em fluxo vertical (4 + 3): cada coluna se fecha com o
 * próprio filete de baixo, sem linha solta.
 */
export function SumarioAreas({ className }: { className?: string }) {
  return (
    <nav
      id="sumario"
      aria-label="Sumário das áreas de atuação"
      className={cn("scroll-mt-28", className)}
    >
      <ol className="grid grid-cols-1 sm:grid-flow-col sm:grid-rows-4 sm:gap-x-8">
        {areas.map((area, i) => (
          <Revelar asChild key={area.slug} atraso={300 + i * 60}>
            <li
              className={cn(
                "min-w-0 border-t border-border",
                i === areas.length - 1 && "border-b",
                i === 3 && "sm:border-b"
              )}
            >
              <a
                href={`#${area.slug}`}
                className="group -mx-2 flex min-h-14 items-center gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none"
              >
                <span
                  aria-hidden
                  className="w-7 shrink-0 font-display text-xs tracking-[0.18em] text-gold-400"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-[clamp(1.0125rem,0.945rem+0.36vw,1.2375rem)] leading-snug font-medium text-balance">
                  {area.nome}
                </span>
                <ArrowDownIcon
                  aria-hidden
                  className="size-5 shrink-0 text-muted-foreground transition-[color,transform] group-hover:translate-y-0.5 group-hover:text-gold-400 group-focus-visible:translate-y-0.5 group-focus-visible:text-gold-400 motion-reduce:transition-none"
                />
              </a>
            </li>
          </Revelar>
        ))}
      </ol>
    </nav>
  );
}
