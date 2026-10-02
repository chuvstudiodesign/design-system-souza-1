"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Altura reservada ao header — igual ao `scroll-mt-28` das fichas. */
const TOPO_FAIXA = 112;
const FOLGA = 8;

export interface ItemIndice {
  slug: string;
  nome: string;
}

/**
 * Índice lateral sticky do catálogo (lg+), com scroll-spy.
 *
 * O único trecho client da página. Recebe só slug e nome — o texto das
 * áreas fica no servidor. Sem JS continua sendo uma lista de âncoras comum;
 * o observador apenas marca `aria-current="location"` na área em leitura.
 *
 * A faixa de observação começa 112px abaixo do topo (altura do header, igual
 * ao `scroll-mt-28` das fichas) e termina na metade de cima da tela. Entre as
 * fichas que a cruzam, vale a mais alta.
 */
export function IndiceLateral({
  itens,
  className,
}: {
  itens: readonly ItemIndice[];
  className?: string;
}) {
  // `null` até o primeiro retorno do observador; enquanto isso vale a
  // primeira área. Quem chega por `#slug` não vê esse estado: o observador
  // responde logo após o salto da âncora, com a ficha do hash já na faixa.
  const [observada, setObservada] = React.useState<string | null>(null);
  const ativa = observada ?? itens[0]?.slug ?? null;

  React.useEffect(() => {
    const alvos = itens
      .map((item) => document.getElementById(item.slug))
      .filter((no): no is HTMLElement => no !== null);

    // Sem observador, o índice fica como lista de âncoras marcando a primeira.
    if (typeof IntersectionObserver === "undefined" || alvos.length === 0) {
      return;
    }

    const cruzando = new Set<HTMLElement>();
    const escolher = () => {
      let maisAlta: HTMLElement | null = null;
      let topoMaisAlta = Infinity;
      for (const no of cruzando) {
        const { top, bottom } = no.getBoundingClientRect();
        // Ficha que só encosta na borda de cima da faixa já foi lida. Sem
        // esta folga, o salto por âncora (que para a ficha exatamente em
        // `TOPO_FAIXA`) marcaria a anterior, cujo filete de baixo ainda toca
        // a faixa.
        if (bottom <= TOPO_FAIXA + FOLGA) continue;
        if (top < topoMaisAlta) {
          maisAlta = no;
          topoMaisAlta = top;
        }
      }
      // Nenhuma na faixa (acima do catálogo, por exemplo): mantém a última.
      if (maisAlta) setObservada(maisAlta.id);
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          const no = entrada.target as HTMLElement;
          if (entrada.isIntersecting) cruzando.add(no);
          else cruzando.delete(no);
        }
        escolher();
      },
      { rootMargin: `-${TOPO_FAIXA}px 0px -55% 0px` }
    );

    alvos.forEach((no) => observador.observe(no));
    return () => observador.disconnect();
  }, [itens]);

  return (
    <nav
      aria-label="Índice das áreas"
      className={cn("lg:sticky lg:top-28 lg:self-start", className)}
    >
      <ol className="border-l border-border">
        {itens.map((item, i) => (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              aria-current={ativa === item.slug ? "location" : undefined}
              className="-ml-px flex min-h-11 items-baseline gap-3 border-l-2 border-transparent py-2 pr-2 pl-4 text-[0.9563rem] leading-snug text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-[current=location]:border-gold-500 aria-[current=location]:text-foreground motion-reduce:transition-none"
            >
              <span
                aria-hidden
                className="font-display text-xs tracking-[0.18em] text-gold-400"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.nome}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
