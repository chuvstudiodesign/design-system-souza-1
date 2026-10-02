import { Container } from "@/components/site/layout/section";
import { Mural } from "@/components/site5/profissionais-v3/mural";
import { tipo } from "@/components/site5/profissionais-v3/tipos";
import { cn } from "@/lib/utils";
import { profissionaisIntro } from "@/lib/site5/conteudo";

const entrada =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/**
 * Abertura centrada com o mural de retratos logo abaixo. O H1 funciona como
 * título do mural, que é o elemento dominante (e o LCP no desktop).
 */
export function Abertura() {
  return (
    <section
      aria-labelledby="titulo-profissionais"
      className="relative isolate bg-background"
    >
      <Container className="pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 id="titulo-profissionais" className={cn(tipo.display, entrada)}>
            {profissionaisIntro.titulo}
          </h1>
          <span
            aria-hidden
            className={cn("rule-gold mt-8 block h-px w-24 delay-100", entrada)}
          />
          <p
            className={cn(
              tipo.lead,
              "mt-8 max-w-[44ch] text-foreground/90 delay-200",
              entrada
            )}
          >
            {profissionaisIntro.subtitulo}
          </p>
        </div>

        <Mural className="mt-14 md:mt-16 lg:mt-20" />
      </Container>
    </section>
  );
}
