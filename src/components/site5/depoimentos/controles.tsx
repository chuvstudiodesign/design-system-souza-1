"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { doisDigitos } from "./dados";
import type { Carrossel } from "./use-carrossel";

/**
 * Controles do carrossel (faixa navy): contador "01 / 09", barra de tempo de
 * leitura e os dois botões redondos (anterior · próximo). Sem botão de pausa
 * — ver `use-carrossel.ts`.
 */

export function Contador({
  carrossel,
  className,
}: {
  carrossel: Carrossel;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "shrink-0 text-[0.9688rem] tracking-[0.18em] tabular-nums",
        "text-navy-foreground/60",
        className
      )}
    >
      <span className={"font-display text-base text-gold-400"}>
        {doisDigitos(carrossel.indice + 1)}
      </span>
      <span aria-hidden className="mx-2">
        /
      </span>
      <span className="font-display">{doisDigitos(carrossel.total)}</span>
    </p>
  );
}

/** Barra fina que enche no tempo de leitura do depoimento. */
export function Progresso({
  ligarBarra,
  className,
}: {
  /** `ligarBarra` do `useCarrossel` — a barra é o relógio do carrossel. */
  ligarBarra: (el: HTMLSpanElement | null) => void;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative block h-px min-w-0 overflow-visible",
        "bg-navy-foreground/15",
        className
      )}
    >
      <span
        ref={ligarBarra}
        className="absolute inset-x-0 -top-px block h-0.75 origin-left scale-x-0 rounded-full bg-gold-500"
      />
    </span>
  );
}

export function Botoes({
  carrossel,
  className,
}: {
  carrossel: Carrossel;
  className?: string;
}) {
  const estilo =
    "size-11 rounded-full text-navy-foreground ring-1 ring-navy-foreground/25 transition-colors hover:bg-navy-foreground/10 hover:text-navy-foreground motion-reduce:transition-none dark:hover:bg-navy-foreground/10 [&_svg:not([class*='size-'])]:size-5";

  return (
    <div className={cn("flex shrink-0 items-center gap-3", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Depoimento anterior"
        onClick={carrossel.anterior}
        className={estilo}
        {...carrossel.setasProps}
      >
        <ChevronLeftIcon aria-hidden />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Próximo depoimento"
        onClick={carrossel.proximo}
        className={estilo}
        {...carrossel.setasProps}
      >
        <ChevronRightIcon aria-hidden />
      </Button>
    </div>
  );
}
