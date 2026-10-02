"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Alternador de versões de UMA seção — ferramenta de comparação para o
 * cliente, não faz parte do site final.
 *
 * Recebe as versões já renderizadas no servidor (`versoes`) e mostra uma de
 * cada vez, com um seletor discreto "Versão 1 · 2 · 3" fixo no canto superior
 * direito da seção. Quando o cliente escolher, basta trocar este componente
 * pela versão escolhida.
 */
export function VariacoesSecao({
  rotulo,
  versoes,
}: {
  /** Nome da seção, para o leitor de tela: "Depoimentos", "Contato"… */
  rotulo: string;
  versoes: ReactNode[];
}) {
  const [atual, setAtual] = useState(0);

  return (
    <div className="relative">
      <div
        role="group"
        aria-label={`Versões da seção ${rotulo}`}
        className="absolute top-4 right-4 z-30 flex items-center gap-1 rounded-full bg-card/90 p-1 shadow-lg ring-1 ring-border backdrop-blur-md md:top-6 md:right-6"
      >
        <span className="px-2.5 text-xs tracking-[0.12em] text-muted-foreground uppercase">
          Versão
        </span>
        {versoes.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === atual}
            onClick={() => setAtual(i)}
            className={cn(
              "grid size-10 place-items-center rounded-full text-base tabular-nums transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none",
              i === atual
                ? "bg-primary font-medium text-primary-foreground"
                : "text-foreground/80 hover:bg-muted"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {versoes[atual]}
    </div>
  );
}
