"use client";

import { QuoteIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { depoimentos, institucional } from "@/lib/site/conteudo";

import { Container, Section, Sobretitulo } from "../layout/section";

const [destaque, ...demais] = depoimentos;

/**
 * Prova social — o ativo de conversão mais forte do site.
 *
 * O primeiro depoimento fica estático e legível sem nenhuma interação; só os
 * demais entram no carrossel. Enterrar todos num carrossel automático seria
 * desperdiçar 9 depoimentos reais, com nome e serviço contratado.
 */
export function Depoimentos() {
  return (
    <Section surface="navy" aria-labelledby="depoimentos-titulo">
      <Container>
        <Revelar className="max-w-3xl">
          <Sobretitulo className="text-gold-400">Depoimentos</Sobretitulo>
          <h2
            id="depoimentos-titulo"
            className="mt-6 text-[clamp(1.625rem,1.25rem+1.6vw,2.375rem)] leading-tight font-semibold tracking-tight text-balance"
          >
            {institucional.depoimentosTitulo}
          </h2>
          <p className="mt-5 max-w-[62ch] text-pretty text-navy-foreground/70">
            {institucional.depoimentosSubtitulo}
          </p>
        </Revelar>

        {/* Destaque — sempre visível, sem depender de interação. */}
        <Revelar
          asChild
          atraso={120}
          duracao={760}
        >
        <figure className="mt-14 border-l-2 border-gold-500 pl-6 md:pl-10">
          <QuoteIcon
            aria-hidden
            className="size-8 text-gold-500/40"
          />
          <blockquote className="mt-4 max-w-[68ch] text-[clamp(1.125rem,1rem+0.7vw,1.5rem)] leading-relaxed text-pretty">
            {destaque.texto}
          </blockquote>
          <figcaption className="mt-6 text-sm">
            <span className="font-semibold">{destaque.autor}</span>
            {destaque.servico && (
              <span className="text-navy-foreground/60">
                {" "}
                · Serviço contratado: {destaque.servico}
              </span>
            )}
          </figcaption>
        </figure>
        </Revelar>

        {/* Sem `asChild` aqui: o Carousel gerencia o próprio root e o embla
            precisa medir um nó estável. O wrapper é inerte. */}
        <Revelar atraso={200}>
        <Carousel
          opts={{ align: "start" }}
          className="mt-16"
          aria-label="Mais depoimentos de clientes"
        >
          <CarouselContent className="items-stretch">
            {demais.map((depoimento) => (
              <CarouselItem
                key={depoimento.autor}
                className="min-w-0 md:basis-1/2 lg:basis-1/3"
              >
                <figure className="flex h-full min-w-0 flex-col rounded-2xl border border-navy-foreground/12 bg-navy-foreground/[0.04] p-6">
                  <blockquote className="line-clamp-[10] flex-1 text-pretty text-navy-foreground/80">
                    {depoimento.texto}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-navy-foreground/12 pt-4 text-sm">
                    <span className="font-semibold">{depoimento.autor}</span>
                    {depoimento.servico && (
                      <span className="mt-0.5 block text-navy-foreground/55">
                        Serviço contratado: {depoimento.servico}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center gap-3">
            <CarouselPrevious className="static size-11 translate-y-0 border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" />
            <CarouselNext className="static size-11 translate-y-0 border-navy-foreground/25 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground" />
          </div>
        </Carousel>
        </Revelar>
      </Container>
    </Section>
  );
}
