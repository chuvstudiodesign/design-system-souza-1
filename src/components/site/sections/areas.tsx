import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import { Button } from "@/components/ui/button";
import { areasDoDireito, institucional } from "@/lib/site/conteudo";

import { Container, Section, Sobretitulo } from "../layout/section";

/**
 * Áreas de atuação.
 *
 * Correção central do site: no site antigo estes cards abriam um lightbox da
 * foto e não entregavam nada. Aqui cada um é um link para a área correspondente
 * em /site/servicos, onde o conteúdo de verdade está.
 *
 * As fotos são de banco de imagens — entram em recorte largo e discreto, como
 * apoio. As fotos reais da equipe é que ganham protagonismo, em outras seções.
 */
export function Areas() {
  return (
    <Section surface="muted" aria-labelledby="areas-titulo">
      <Container>
        <Revelar className="max-w-3xl">
          <Sobretitulo>{institucional.areasSobretitulo}</Sobretitulo>
          <h2
            id="areas-titulo"
            className="mt-6 text-[clamp(1.625rem,1.25rem+1.6vw,2.375rem)] leading-tight font-semibold tracking-tight text-balance"
          >
            {institucional.areasTitulo}
          </h2>
        </Revelar>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areasDoDireito.map((area, indice) => {
            const total =
              (area.servicos?.length ?? 0) +
              (area.subgrupos?.reduce((s, g) => s + g.servicos.length, 0) ?? 0);

            return (
              <Revelar
                key={area.slug}
                asChild
                variante="zoom"
                /* Escalonado por coluna, não por índice absoluto: numa grade de
                   3 a última linha não pode esperar 400ms para aparecer. */
                atraso={(indice % 3) * 70}
              >
              <li className="@container">
                <Link
                  href={`/site/servicos#${area.slug}`}
                  className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {area.imagem ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={area.imagem.src}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/20 to-transparent"
                      />
                    </div>
                  ) : (
                    <div
                      aria-hidden
                      className="flex aspect-[16/9] items-center justify-center bg-navy"
                    >
                      <span className="font-display text-5xl text-gold-500/25">
                        S&amp;S
                      </span>
                    </div>
                  )}

                  <div className="flex min-w-0 flex-1 flex-col p-6">
                    <h3 className="flex items-start justify-between gap-3 text-lg font-semibold text-balance">
                      {area.nome}
                      <ArrowUpRightIcon
                        aria-hidden
                        className="mt-1 size-4 shrink-0 text-gold-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none dark:text-gold-500"
                      />
                    </h3>
                    <p className="mt-auto pt-4 text-sm text-muted-foreground">
                      {total} {total === 1 ? "serviço" : "serviços"}
                    </p>
                  </div>
                </Link>
              </li>
              </Revelar>
            );
          })}
        </ul>

        <Revelar className="mt-12 flex justify-center">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href="/site/servicos">
              Ver todos os serviços
              <ArrowRightIcon aria-hidden />
            </Link>
          </Button>
        </Revelar>
      </Container>
    </Section>
  );
}
