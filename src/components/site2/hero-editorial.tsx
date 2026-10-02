import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container, Sobretitulo } from "@/components/site/layout/section";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/site/contato";
import { institucional } from "@/lib/site/conteudo";

/**
 * Hero editorial da variação 2.
 *
 * Nenhuma imagem: a primeira tela é tipografia e vazio. A autoridade aqui vem
 * da escala e do silêncio ao redor dela, não de fotografia.
 *
 * O `heroTitulo` do cliente tem duas orações separadas por dois-pontos — uma
 * enumeração de especialidades e uma promessa. O texto é renderizado literal,
 * incluindo a pontuação, mas as duas partes recebem pesos tipográficos
 * diferentes: a enumeração como preâmbulo, a promessa em escala de display.
 * É tratamento visual, não reescrita.
 */
const [preambulo, promessa] = (() => {
  const separador = institucional.heroTitulo.indexOf(":");
  if (separador === -1) return [null, institucional.heroTitulo] as const;
  return [
    institucional.heroTitulo.slice(0, separador + 1),
    institucional.heroTitulo.slice(separador + 1).trim(),
  ] as const;
})();

export function HeroEditorial() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <Container className="pt-28 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36">
        <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <Sobretitulo className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none">
              Advocacia e assessoria jurídica
            </Sobretitulo>
          </div>

          {preambulo ? (
            <p className="max-w-[46ch] animate-in fade-in slide-in-from-bottom-3 fill-mode-both text-[clamp(1.0625rem,1rem+0.35vw,1.375rem)] leading-snug text-pretty text-muted-foreground delay-100 duration-700 ease-out motion-reduce:animate-none lg:col-span-5 lg:mt-2">
              {preambulo}
            </p>
          ) : null}

          <h1 className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both text-[clamp(2.5rem,1.1rem+5.6vw,5.25rem)] leading-[0.98] font-medium tracking-[-0.03em] text-balance delay-200 duration-1000 ease-out motion-reduce:animate-none lg:col-span-11 lg:col-start-1">
            {promessa}
          </h1>

          {/* Filete de marca fechando o bloco tipográfico. */}
          <div
            aria-hidden
            className="rule-gold h-px w-full animate-in fade-in fill-mode-both delay-500 duration-1000 lg:col-span-12"
          />

          <div className="flex flex-col gap-x-10 gap-y-8 animate-in fade-in slide-in-from-bottom-3 fill-mode-both delay-500 duration-700 ease-out motion-reduce:animate-none lg:col-span-12 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[62ch] text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] leading-relaxed text-pretty text-muted-foreground">
              {institucional.heroParagrafo}
            </p>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 px-6 text-base"
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Falar com o escritório
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 px-4 text-base"
              >
                <Link href="/site-v1/servicos">
                  Áreas de atuação
                  <ArrowRightIcon aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
