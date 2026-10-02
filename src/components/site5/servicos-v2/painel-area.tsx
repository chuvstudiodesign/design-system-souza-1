import { ArrowUpIcon, InfoIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import type { AreaDeAtuacao } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

const corpo = "text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)]";

/**
 * Painel de uma área — o esqueleto que se repete nas sete.
 *
 * Três faixas fixas, separadas por filete: cabeçalho (numeral + nome em 5/12,
 * descrição em 7/12 — a descrição começa sempre no mesmo x), grade de itens
 * em ladrilhos de altura igual (`auto-rows-fr`) e rodapé (nota, quando há, e
 * "Voltar ao índice", sempre). O número de colunas acompanha a contagem de
 * itens para que nenhuma fileira fique incompleta no desktop.
 *
 * `target:` marca o painel de quem chega pela âncora da home — só CSS.
 */
export function PainelArea({
  area,
  numero,
}: {
  area: AreaDeAtuacao;
  numero: number;
}) {
  const idTitulo = `titulo-${area.slug}`;
  const total = area.itens.length;
  const colsLg = total % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  const impar = total % 2 === 1;

  return (
    <article
      id={area.slug}
      aria-labelledby={idTitulo}
      className="scroll-mt-28 overflow-clip rounded-3xl bg-card shadow-sm ring-1 ring-border target:ring-2 target:ring-gold-500/60"
    >
      <Revelar className="grid grid-cols-1 gap-y-6 p-6 md:p-10 lg:grid-cols-12 lg:gap-x-8">
        <div className="min-w-0 lg:col-span-5">
          <p
            aria-hidden
            className="font-display text-[clamp(2.475rem,1.8rem+2.34vw,3.825rem)] leading-none text-gold-400"
          >
            {String(numero).padStart(2, "0")}
          </p>
          <h2
            id={idTitulo}
            className="mt-4 text-[clamp(1.4625rem,1.125rem+1.44vw,2.25rem)] leading-[1.1] font-medium tracking-tight text-balance"
          >
            {area.nome}
          </h2>
        </div>
        <p className="max-w-[52ch] min-w-0 text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-foreground/90 lg:col-span-7 lg:pt-1">
          {area.descricao}
        </p>
      </Revelar>

      <div className="border-t border-border p-6 md:p-10">
        <ul
          className={cn(
            "grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4",
            colsLg
          )}
        >
          {area.itens.map((item, i) => (
            <li
              key={item}
              className={cn(
                "flex min-w-0 items-start gap-3 rounded-xl bg-background/50 p-4 ring-1 ring-border sm:min-h-36 sm:flex-col sm:gap-3 sm:p-5",
                impar && i === total - 1 && "sm:col-span-2 lg:col-span-1"
              )}
            >
              <span
                aria-hidden
                className="w-6 shrink-0 pt-0.5 font-display text-[0.9688rem] tracking-[0.22em] text-gold-400 sm:w-auto sm:pt-0"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={cn("min-w-0 leading-snug text-foreground", corpo)}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 border-t border-border bg-muted/50 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-6">
        {area.nota ? (
          <p className="flex max-w-[72ch] min-w-0 gap-4">
            <InfoIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-400" />
            <span className={cn("min-w-0 leading-relaxed text-pretty text-foreground/85", corpo)}>
              {area.nota}
            </span>
          </p>
        ) : null}
        <a
          href="#indice"
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center gap-2 self-start text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:ml-auto md:self-center",
            corpo
          )}
        >
          <ArrowUpIcon aria-hidden className="size-4" />
          Voltar ao índice
          <span className="sr-only"> ({area.nome})</span>
        </a>
      </div>
    </article>
  );
}
