import { ArrowDownIcon } from "lucide-react";

import { Container } from "@/components/site/layout/section";
import { tipo } from "@/components/site5/profissionais-v2/tipos";
import { cn } from "@/lib/utils";
import {
  profissionais,
  profissionaisIntro,
  rotuloPapel,
} from "@/lib/site5/conteudo";

const entrada =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/**
 * Abertura tipográfica — o H1 em Trajan é o LCP. À direita, o índice dos
 * cinco nomes leva a cada dobra. Sem foto: o primeiro retrato ganha impacto
 * quando aparece, logo depois do dourado.
 */
export function Abertura() {
  return (
    <section
      aria-labelledby="titulo-profissionais"
      className="relative isolate bg-background"
    >
      <Container className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-28">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="min-w-0 lg:col-span-7">
            <h1
              id="titulo-profissionais"
              className={cn(tipo.display, entrada)}
            >
              {profissionaisIntro.titulo}
            </h1>
            <span
              aria-hidden
              className={cn(
                "rule-gold mt-8 block h-px w-24 delay-100 md:mt-10",
                entrada
              )}
            />
            <p
              className={cn(
                tipo.lead,
                "mt-8 max-w-[40ch] text-foreground/90 delay-200",
                entrada
              )}
            >
              {profissionaisIntro.subtitulo}
            </p>
          </div>

          <nav
            aria-labelledby="rotulo-perfis"
            className={cn("min-w-0 delay-300 lg:col-span-5", entrada)}
          >
            <p
              id="rotulo-perfis"
              className={cn(tipo.rotulo, "text-muted-foreground")}
            >
              {profissionaisIntro.sobretituloPerfis}
            </p>
            <ol className="mt-4 border-t border-border">
              {profissionais.map((p, i) => (
                <li key={p.slug} className="border-b border-border">
                  <a
                    href={`#${p.slug}`}
                    className="group grid min-h-16 grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-3 py-3 transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset motion-reduce:transition-none"
                  >
                    <span aria-hidden className={tipo.numeral}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          tipo.corpo,
                          "block leading-snug font-medium text-balance"
                        )}
                      >
                        {p.nome}
                      </span>
                      <span className="mt-0.5 block text-[0.9688rem] tracking-[0.08em] text-muted-foreground uppercase">
                        {rotuloPapel[p.papel]}
                      </span>
                    </span>
                    <ArrowDownIcon
                      aria-hidden
                      className="size-5 text-muted-foreground transition-transform group-hover:translate-y-0.5 group-hover:text-gold-400 group-focus-visible:text-gold-400 motion-reduce:transition-none"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </Container>
    </section>
  );
}
