"use client";

import * as React from "react";
import Image from "next/image";

import type { FotoLp } from "@/lib/lp/imagens";
import { cn } from "@/lib/utils";

/**
 * Foto do hero com o seletor "Imagem 1 · 2 · 3" — ferramenta de comparação
 * para o cliente escolher o estilo de imagem (tema, equipe ou escritório), não
 * faz parte da página final. Quando houver decisão, troque este componente por
 * um `<Image>` da opção escolhida.
 *
 * As três fotos ficam montadas e só a opacidade muda: a troca é instantânea e
 * o recorte 4:5 não pula.
 */
export function ImagemHero({
  opcoes,
  className,
}: {
  opcoes: { rotulo: string; foto: FotoLp }[];
  className?: string;
}) {
  const [atual, setAtual] = React.useState(0);

  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-muted shadow-2xl ring-1 ring-border">
        {opcoes.map(({ foto }, i) => (
          <Image
            key={foto.src}
            src={foto.src}
            alt={i === atual ? foto.alt : ""}
            aria-hidden={i !== atual}
            fill
            quality={95}
            priority={i === 0}
            sizes="(max-width: 1023px) calc(100vw - 3rem), 34rem"
            style={foto.posicao ? { objectPosition: foto.posicao } : undefined}
            className={cn(
              "object-cover transition-opacity duration-500 motion-reduce:transition-none",
              i === atual ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background/70 to-transparent"
        />
      </div>

      <div
        role="group"
        aria-label="Estilo de imagem"
        className="absolute bottom-4 left-4 z-10 flex items-center gap-1 rounded-full bg-card/90 p-1 shadow-lg ring-1 ring-border backdrop-blur-md"
      >
        <span className="px-2.5 text-xs tracking-[0.12em] text-muted-foreground uppercase">
          Imagem
        </span>
        {opcoes.map(({ rotulo }, i) => (
          <button
            key={rotulo}
            type="button"
            aria-pressed={i === atual}
            aria-label={`Imagem ${i + 1}: ${rotulo}`}
            title={rotulo}
            onClick={() => setAtual(i)}
            className={cn(
              "grid size-10 place-items-center rounded-full text-sm tabular-nums transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none",
              i === atual
                ? "bg-primary font-medium text-primary-foreground"
                : "text-foreground/80 hover:bg-muted"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
