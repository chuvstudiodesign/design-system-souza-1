import { ArrowUpIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import type { AreaDeAtuacao } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

/** Acima disso a lista passa a ocupar a largura toda, em duas colunas. */
const LIMITE_LISTA_CURTA = 6;

/**
 * Ficha de uma área de atuação — destino das âncoras da home
 * (`/site/servicos#<slug>`).
 *
 * Os itens não têm stagger: quem chega por âncora cai no meio da página e
 * precisa ver a lista inteira de uma vez. Sem CTA por área — o contato vem
 * uma vez só, na faixa final.
 */
export function Area({
  area,
  numero,
}: {
  area: AreaDeAtuacao;
  numero: number;
}) {
  const longa = area.itens.length > LIMITE_LISTA_CURTA;
  const idTitulo = `titulo-${area.slug}`;
  const ultimo = area.itens.length - 1;

  return (
    <article
      id={area.slug}
      aria-labelledby={idTitulo}
      className="scroll-mt-28 border-t border-border py-14 first:pt-14 last:pb-0 target:border-gold-500/70 md:py-16 lg:py-20"
    >
      <Revelar className="flex items-baseline gap-5">
        <span
          aria-hidden
          className="font-display text-[0.9688rem] tracking-[0.22em] text-gold-400"
        >
          {String(numero).padStart(2, "0")}
        </span>
        <h2
          id={idTitulo}
          className="min-w-0 text-[clamp(1.575rem,1.17rem+1.62vw,2.475rem)] leading-[1.1] font-medium tracking-tight text-balance"
        >
          {area.nome}
        </h2>
      </Revelar>

      <Revelar
        atraso={80}
        className="mt-8 grid grid-cols-1 gap-y-8 lg:grid-cols-8 lg:gap-x-8"
      >
        <p
          className={cn(
            "min-w-0 text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-foreground/90",
            longa ? "max-w-[60ch] lg:col-span-8" : "max-w-[44ch] lg:col-span-4"
          )}
        >
          {area.descricao}
        </p>

        <ul
          className={cn(
            "min-w-0",
            longa ? "grid sm:grid-cols-2 sm:gap-x-8 lg:col-span-8" : "lg:col-span-4"
          )}
        >
          {area.itens.map((item, i) => (
            <li
              key={item}
              className={cn(
                "flex gap-4 border-t border-border py-4",
                i === ultimo && "border-b",
                // Em duas colunas (fluxo por linha) a outra coluna termina no
                // penúltimo item — ele também fecha com filete.
                longa && i === ultimo - 1 && "sm:border-b"
              )}
            >
              <span
                aria-hidden
                className="mt-[0.72em] h-px w-5 shrink-0 bg-gold-500/70"
              />
              <span className="min-w-0 text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-snug text-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {area.nota ? (
          <p className="mt-2 max-w-[62ch] border-l-2 border-gold-500/60 pl-5 text-[0.9563rem] leading-relaxed text-pretty text-foreground/80 lg:col-span-8">
            {area.nota}
          </p>
        ) : null}
      </Revelar>

      <a
        href="#sumario"
        className="mt-8 inline-flex min-h-11 items-center gap-2 text-base text-muted-foreground underline-offset-4 hover:text-foreground hover:underline lg:hidden"
      >
        <ArrowUpIcon aria-hidden className="size-4" />
        Voltar ao índice
        <span className="sr-only"> ({area.nome})</span>
      </a>
    </article>
  );
}
