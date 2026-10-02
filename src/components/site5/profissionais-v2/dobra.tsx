import Image from "next/image";

import { Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { enquadramento } from "@/components/site5/profissionais/enquadramento";
import { enquadramentoDobra } from "@/components/site5/profissionais-v2/enquadramento-v2";
import { tipo } from "@/components/site5/profissionais-v2/tipos";
import { cn } from "@/lib/utils";
import { rotuloPapel, type Profissional } from "@/lib/site5/conteudo";

/**
 * Uma dobra por advogada: retrato sangrado 5/12 da tela, em altura de
 * página, e a bio inteira ao lado. O lado da foto alterna a cada dobra; o
 * texto se alinha ao container pelo mesmo `calc` do `Fecho` da home.
 *
 * No celular o retrato vem primeiro, de borda a borda em 4:5.
 */
export function Dobra({
  profissional: p,
  numero,
  lado,
  superficie,
}: {
  profissional: Profissional;
  numero: number;
  lado: "esquerda" | "direita";
  superficie: "muted" | "base";
}) {
  const [bioPrincipal, bioEscritorio] = p.bio;

  return (
    <Section
      id={p.slug}
      aria-labelledby={`nome-${p.slug}`}
      surface={superficie}
      className="scroll-mt-28 overflow-clip py-0 md:py-0 lg:py-0"
    >
      <div
        className={cn(
          "grid grid-cols-1",
          lado === "esquerda"
            ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
        )}
      >
        <Revelar
          variante="zoom"
          className={cn(
            "relative aspect-[4/5] min-w-0 overflow-hidden lg:aspect-auto lg:min-h-[clamp(46rem,48vw,58rem)]",
            lado === "direita" && "lg:order-last"
          )}
        >
          <Image
            quality={95}
            src={p.foto.src}
            alt={p.foto.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 42vw"
            className={cn(
              "object-cover",
              enquadramentoDobra[p.slug] ?? enquadramento[p.slug]?.retrato
            )}
          />
        </Revelar>

        <Revelar
          variante={lado === "esquerda" ? "direita" : "esquerda"}
          className={cn(
            "min-w-0 self-center px-6 pt-10 pb-16 md:px-10 md:pt-14 md:pb-20 lg:py-28",
            lado === "esquerda"
              ? "lg:pr-[max(2.5rem,calc((100vw-var(--container-7xl))/2+2.5rem))] lg:pl-16 xl:pl-24"
              : "lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-var(--container-7xl))/2+2.5rem))] xl:pr-24"
          )}
        >
          <div className="flex items-center gap-4">
            <span aria-hidden className={tipo.numeral}>
              {String(numero).padStart(2, "0")}
            </span>
            <span aria-hidden className="h-px w-10 bg-gold-500/60" />
            <p className={cn(tipo.rotulo, "text-muted-foreground")}>
              {rotuloPapel[p.papel]}
            </p>
          </div>

          <h2
            id={`nome-${p.slug}`}
            className={cn(tipo.h2Nome, "mt-6 max-w-[18ch]")}
          >
            {p.nome}
          </h2>

          <p
            className={cn(
              tipo.corpo,
              "mt-8 max-w-[60ch] leading-relaxed text-pretty text-foreground/90"
            )}
          >
            {bioPrincipal}
          </p>
          {bioEscritorio ? (
            <p
              className={cn(
                tipo.corpo,
                "mt-8 max-w-[60ch] border-t border-border pt-6 leading-relaxed text-pretty text-muted-foreground"
              )}
            >
              {bioEscritorio}
            </p>
          ) : null}
        </Revelar>
      </div>
    </Section>
  );
}
