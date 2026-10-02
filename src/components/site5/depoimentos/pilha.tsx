"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { Depoimento } from "./dados";
import type { Carrossel } from "./use-carrossel";

/**
 * Os 9 depoimentos empilhados na MESMA célula de grid.
 *
 * A altura da pilha é a do mais alto, então trocar de depoimento não empurra
 * nada da página (zero CLS, mesmo com autoplay). Só o ativo fica visível; os
 * outros saem da árvore de acessibilidade com `invisible` + `aria-hidden` —
 * mas o texto de todos está no HTML servido.
 *
 * A troca é fade + 8px de translate, só opacity/transform; com
 * `prefers-reduced-motion` é instantânea.
 */
export function Pilha({
  carrossel,
  itens,
  children,
  className,
  alinhar = "start",
}: {
  carrossel: Carrossel;
  itens: Depoimento[];
  children: (depoimento: Depoimento, indice: number) => ReactNode;
  className?: string;
  alinhar?: "start" | "center";
}) {
  return (
    <div
      aria-live={carrossel.vivo}
      aria-atomic="true"
      className={cn("grid min-w-0 grid-cols-1", className)}
    >
      {itens.map((depoimento, i) => {
        const ativo = i === carrossel.indice;
        return (
          <div
            key={depoimento.autor}
            aria-hidden={!ativo}
            className={cn(
              "col-start-1 row-start-1 min-w-0",
              alinhar === "center" ? "self-center" : "self-start",
              "transition-[opacity,transform,visibility] duration-500 ease-out motion-reduce:transition-none",
              ativo
                ? "visible translate-y-0 opacity-100 delay-100"
                : "invisible translate-y-2 opacity-0"
            )}
          >
            {children(depoimento, i)}
          </div>
        );
      })}
    </div>
  );
}
