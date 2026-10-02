import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Button } from "@/components/ui/button";
import { depoimentos, institucional } from "@/lib/site/conteudo";

/**
 * Depoimentos em chave editorial.
 *
 * A home usa carrossel de cards. Aqui um depoimento curto ocupa a escala de
 * display e três outros o sustentam em colunas, separados por filete — sem
 * card, sem sombra. A seleção é por autor, não por índice, para não quebrar
 * silenciosamente se a ordem da lista mudar.
 *
 * A nota de consentimento do cliente acompanha a seção e não é opcional.
 */

const porAutor = (autor: string) => depoimentos.find((d) => d.autor === autor);

const destaque = porAutor("Elton Dias Souto") ?? depoimentos[0];
const apoios = ["Chácara Paquetá", "Angela Noronha", "Sirlene Praxedes"]
  .map(porAutor)
  .filter((d): d is (typeof depoimentos)[number] => Boolean(d));

export function Vozes() {
  return (
    <Section surface="navy" size="lg">
      <Container>
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p
              aria-hidden
              className="font-display text-sm tracking-[0.22em] text-gold-400"
            >
              03
            </p>
            <h2 className="mt-4 text-sm tracking-[0.08em] text-navy-foreground/60 uppercase">
              Depoimentos
            </h2>
          </div>

          <Revelar className="lg:col-span-9">
            <figure>
              <blockquote className="text-[clamp(1.5rem,1.1rem+1.9vw,2.75rem)] leading-[1.18] font-medium tracking-tight text-balance">
                {destaque.texto}
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <span className="font-medium">{destaque.autor}</span>
                {destaque.servico ? (
                  <>
                    <span
                      aria-hidden
                      className="h-px w-6 bg-gold-500/60"
                    />
                    <span className="text-navy-foreground/60">
                      {destaque.servico}
                    </span>
                  </>
                ) : null}
              </figcaption>
            </figure>
          </Revelar>

          <div className="grid gap-x-8 gap-y-10 border-t border-navy-foreground/15 pt-12 md:grid-cols-3 lg:col-span-12">
            {apoios.map((depoimento, indice) => (
              <Revelar key={depoimento.autor} atraso={indice * 70} asChild>
                <figure className="flex flex-col gap-4">
                  <blockquote className="text-[0.9375rem] leading-relaxed text-pretty text-navy-foreground/75">
                    {depoimento.texto}
                  </blockquote>
                  <figcaption className="mt-auto text-sm">
                    <span className="font-medium">{depoimento.autor}</span>
                    {depoimento.servico ? (
                      <span className="mt-1 block text-navy-foreground/55">
                        {depoimento.servico}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              </Revelar>
            ))}
          </div>

          <div className="flex flex-col gap-6 border-t border-navy-foreground/15 pt-8 lg:col-span-12 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[68ch] text-sm leading-relaxed text-pretty text-navy-foreground/55">
              {institucional.depoimentosSubtitulo}
            </p>

            <Button
              asChild
              variant="link"
              className="h-auto shrink-0 px-0 text-base text-gold-400"
            >
              <Link href="/site-v1/sobre-nos">
                Ver todos os depoimentos
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
