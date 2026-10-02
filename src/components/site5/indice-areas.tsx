"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { brandAssets } from "@/components/brand/logo";
import { AjusteEstampa } from "@/components/site5/ajuste-estampa";
import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Card } from "@/components/ui/card";
import { areasDeAcesso, areasEmDestaque, home } from "@/lib/site5/conteudo";

/** Dimensões nativas da estampa — iguais nos dois arquivos. */
const ESTAMPA = { w: 4085, h: 3154 };

/**
 * Áreas de especialização como índice tipográfico.
 *
 * As 4 áreas principais são linhas grandes; cada uma abre o diálogo com a
 * descrição e os itens da área. A fotografia só aparece no painel lateral
 * (≥ lg), decorativa, com 3 fotos por área trocadas pelas setas sob ela —
 * nenhuma informação existe apenas lá, e
 * o resumo e a seta de cada linha ficam sempre visíveis, sem depender de hover.
 *
 * Abaixo da lista, os dois "botões de acesso" do documento (Extrajudiciais e
 * Diligências) levam direto à página Serviços.
 */
export function IndiceAreas({
  aoAbrirArea,
}: {
  aoAbrirArea: (slug: string) => void;
}) {
  // Ponteiro e teclado guardados à parte: tirar o mouse de uma linha não
  // pode apagar a área que está com foco, e vice-versa.
  const [hover, setHover] = React.useState<string | null>(null);
  const [foco, setFoco] = React.useState<string | null>(null);
  const ativa = hover ?? foco;

  // O painel guarda a última área apontada (e não volta à primeira quando o
  // ponteiro sai da lista): é preciso descer até as setas sob a foto sem
  // perder a área que se estava vendo.
  const [slugExibido, setSlugExibido] = React.useState(
    areasEmDestaque[0]?.slug ?? null
  );

  // Foto atual de cada área — cada uma lembra a sua posição no carrossel.
  const [fotoPorArea, setFotoPorArea] = React.useState<Record<string, number>>(
    {}
  );
  const areaExibida = areasEmDestaque.find((a) => a.slug === slugExibido);
  const totalFotos = areaExibida?.imagens?.length ?? 0;
  const fotoAtual = slugExibido ? (fotoPorArea[slugExibido] ?? 0) : 0;

  function passarFoto(direcao: 1 | -1) {
    if (!slugExibido || totalFotos < 2) return;
    setFotoPorArea((atual) => ({
      ...atual,
      [slugExibido]:
        ((atual[slugExibido] ?? 0) + direcao + totalFotos) % totalFotos,
    }));
  }

  // `overflow-clip`, não `overflow-hidden`: `hidden` criaria um contêiner de
  // rolagem e o painel `sticky` deixaria de grudar na viewport.
  return (
    <Section
      id="areas"
      surface="base"
      size="lg"
      className="scroll-mt-24 overflow-clip"
    >
      <Image
        src={brandAssets.pattern[1]}
        alt=""
        aria-hidden
        data-estampa="areas"
        width={ESTAMPA.w}
        height={ESTAMPA.h}
        unoptimized
        className="pointer-events-none absolute -bottom-[0.3%] left-[76.9%] -z-10 w-[156vw] max-w-none"
      />

      <AjusteEstampa
        alvo="areas"
        rotulo="estampa 02"
        padrao={{ left: 76.9, bottom: -0.3, largura: 156 }}
        className="left-[17rem]"
      />

      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p
              aria-hidden
              className="font-display text-[0.9688rem] tracking-[0.22em] text-gold-400"
            >
              02
            </p>
            <h2 className="mt-4 text-[0.9688rem] tracking-[0.08em] text-muted-foreground uppercase">
              {home.areas.sobretitulo}
            </h2>
            <p className="mt-8 max-w-[34ch] text-pretty text-muted-foreground lg:text-[0.9375rem]">
              {home.areas.titulo}
            </p>
          </div>

          <Revelar className="min-w-0 lg:col-span-5 lg:col-start-4">
            <ul>
              {areasEmDestaque.map((area, indice) => {
                const estaAtiva = ativa === area.slug;

                return (
                  <li
                    key={area.slug}
                    className="border-b border-border first:border-t"
                  >
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => aoAbrirArea(area.slug)}
                      onMouseEnter={() => {
                        setHover(area.slug);
                        setSlugExibido(area.slug);
                      }}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => {
                        setFoco(area.slug);
                        setSlugExibido(area.slug);
                      }}
                      onBlur={() => setFoco(null)}
                      className="group flex w-full items-baseline gap-5 py-6 text-left transition-colors duration-300 outline-none focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset md:py-7"
                    >
                      <span
                        aria-hidden
                        className="font-display text-xs tracking-[0.18em] text-muted-foreground transition-colors duration-300 group-hover:text-gold-400 group-focus-visible:text-gold-400"
                      >
                        {String(indice + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block text-[clamp(1.2375rem,0.945rem+1.17vw,1.9125rem)] leading-tight font-medium tracking-tight transition-opacity duration-300 motion-reduce:transition-none ${
                            ativa && !estaAtiva ? "opacity-40" : "opacity-100"
                          }`}
                        >
                          {area.nome}
                        </span>
                        <span className="mt-2 block max-w-[52ch] text-[0.9688rem] leading-relaxed text-pretty text-muted-foreground">
                          {area.resumoHome}
                        </span>
                      </span>

                      <ArrowUpRightIcon
                        aria-hidden
                        className="size-5 shrink-0 self-center text-muted-foreground transition duration-300 group-hover:translate-x-0.5 group-hover:text-gold-400 group-focus-visible:translate-x-0.5 group-focus-visible:text-gold-400 motion-reduce:transition-none"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </Revelar>

          {/* Painel de imagem — some abaixo de lg. As fotos são decorativas
              (alt vazio); as setas trocam entre as 3 fotos da área exibida. */}
          <div className="hidden lg:col-span-3 lg:col-start-10 lg:block">
            <div className="sticky top-28">
              <div
                aria-hidden
                className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted"
              >
                {areasEmDestaque.flatMap((area) =>
                  (area.imagens ?? []).map((imagem, indiceFoto) => {
                    const visivel =
                      slugExibido === area.slug &&
                      (fotoPorArea[area.slug] ?? 0) === indiceFoto;
                    return (
                      <Image
                        quality={95}
                        key={imagem.src}
                        src={imagem.src}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 0px, 22rem"
                        style={
                          imagem.posicao
                            ? { objectPosition: imagem.posicao }
                            : undefined
                        }
                        className={`object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                          visivel ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    );
                  })
                )}
              </div>

              {totalFotos > 1 && areaExibida ? (
                <div className="mt-4 flex items-center justify-between gap-4">
                  <span
                    aria-live="polite"
                    className="font-display text-xs tracking-[0.18em] text-muted-foreground"
                  >
                    {String(fotoAtual + 1).padStart(2, "0")} /{" "}
                    {String(totalFotos).padStart(2, "0")}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => passarFoto(-1)}
                      aria-label={`Foto anterior de ${areaExibida.nome}`}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors outline-none hover:border-gold-400 hover:text-gold-400 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                    >
                      <ChevronLeftIcon aria-hidden className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => passarFoto(1)}
                      aria-label={`Próxima foto de ${areaExibida.nome}`}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors outline-none hover:border-gold-400 hover:text-gold-400 focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                    >
                      <ChevronRightIcon aria-hidden className="size-5" />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Botões de acesso — Extrajudiciais e Diligências. */}
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:col-span-9 lg:col-start-4">
            {areasDeAcesso.map((area, indice) => (
              <Revelar key={area.slug} atraso={indice * 70} asChild>
                <li className="min-w-0">
                  <Link
                    href={`/site/servicos#${area.slug}`}
                    className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Card className="h-full gap-2 rounded-2xl bg-card/40 p-6 ring-1 ring-border transition-colors hover:bg-card/70 motion-reduce:transition-none">
                      <span className="flex items-start justify-between gap-4">
                        <span className="min-w-0 text-lg font-medium break-words">{area.nome}</span>
                        <ArrowRightIcon
                          aria-hidden
                          className="mt-1 size-5 shrink-0 text-muted-foreground transition duration-300 group-hover:translate-x-0.5 group-hover:text-gold-400 group-focus-visible:text-gold-400 motion-reduce:transition-none"
                        />
                      </span>
                      <span className="block text-[0.9563rem] leading-relaxed text-pretty text-muted-foreground">
                        {area.resumoHome}
                      </span>
                    </Card>
                  </Link>
                </li>
              </Revelar>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
