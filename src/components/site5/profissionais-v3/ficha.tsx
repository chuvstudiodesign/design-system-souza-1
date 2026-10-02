import Image from "next/image";
import { ArrowUpIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import { retratos } from "@/components/site5/profissionais-v3/retratos";
import { tipo } from "@/components/site5/profissionais-v3/tipos";
import { cn } from "@/lib/utils";
import { rotuloPapel, type Profissional } from "@/lib/site5/conteudo";

/**
 * Ficha-cartão: foto sempre à esquerda, encostada na borda e na altura total
 * do cartão; texto 7/12 à direita. Mesmo desenho para as cinco. A bio vai
 * inteira. O `Revelar` envolve o cartão todo (sem stagger interno): quem
 * chega por âncora vê a ficha completa.
 */
export function Ficha({
  profissional: p,
  numero,
}: {
  profissional: Profissional;
  numero: number;
}) {
  const r = retratos[p.slug];
  const [bioPrincipal, bioEscritorio] = p.bio;

  return (
    <Revelar asChild>
      <article
        id={p.slug}
        aria-labelledby={`nome-${p.slug}`}
        className="grid scroll-mt-28 grid-cols-1 overflow-hidden rounded-3xl bg-card shadow-lg ring-1 ring-border lg:min-h-[34rem] lg:grid-cols-12"
      >
        <div className="relative aspect-[4/3] min-w-0 sm:aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:min-h-full">
          <Image
            quality={95}
            src={r.src}
            alt={p.foto.alt}
            fill
            sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 40vw, 500px"
            className={cn("object-cover", r.posicao)}
          />
        </div>

        <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:col-span-7 lg:p-12 xl:p-14">
          <div className="flex items-center gap-4">
            <span aria-hidden className={tipo.numeral}>
              {String(numero).padStart(2, "0")}
            </span>
            <span aria-hidden className="h-px w-10 bg-gold-500/60" />
            <p className={cn(tipo.rotulo, "text-muted-foreground")}>
              {rotuloPapel[p.papel]}
            </p>
          </div>

          <h3
            id={`nome-${p.slug}`}
            className={cn(tipo.h3Nome, "mt-5 max-w-[20ch]")}
          >
            {p.nome}
          </h3>

          <p
            className={cn(
              tipo.corpo,
              "mt-6 max-w-[60ch] text-pretty text-foreground/90"
            )}
          >
            {bioPrincipal}
          </p>
          {bioEscritorio ? (
            <p
              className={cn(
                tipo.corpo,
                "mt-6 max-w-[60ch] border-l-2 border-gold-500/60 pl-5 text-pretty text-muted-foreground"
              )}
            >
              {bioEscritorio}
            </p>
          ) : null}

          <a
            href="#indice"
            className={cn(
              tipo.corpo,
              "mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-8 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            )}
          >
            <ArrowUpIcon aria-hidden className="size-4" />
            Voltar ao índice
          </a>
        </div>
      </article>
    </Revelar>
  );
}
