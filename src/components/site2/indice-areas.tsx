"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { brandAssets } from "@/components/brand/logo";
import { AjusteEstampa } from "@/components/site2/ajuste-estampa";
import { Container, Section } from "@/components/site/layout/section";
import { areasDoDireito, contarServicos, institucional } from "@/lib/site/conteudo";

/** Dimensões nativas da estampa — iguais nos dois arquivos. */
const ESTAMPA = { w: 4085, h: 3154 };

/**
 * Áreas de atuação como índice tipográfico.
 *
 * A home resolve isto com um grid de cards ilustrados. Aqui a imagem sai do
 * fluxo: o layout é uma lista de linhas grandes, e a fotografia só aparece no
 * painel lateral quando a linha correspondente é apontada ou recebe foco.
 *
 * Duas decisões de acessibilidade sustentam isso:
 *   · cada linha é um link real, então teclado percorre a lista e `focus`
 *     dispara a mesma revelação que o ponteiro;
 *   · o painel é decorativo (`aria-hidden`) — nenhuma informação existe apenas
 *     lá. Quem nunca vê a imagem não perde nada.
 *
 * Três das sete áreas não têm fotografia. Nesses casos o painel não apaga para
 * o vazio: mantém a última imagem, esmaecida, para não piscar durante a
 * varredura da lista.
 */

const areasComImagem = areasDoDireito.filter((area) => area.imagem);

/**
 * Por padrão cada linha é um link para a página de serviços. A `/site4` precisa
 * que algumas áreas abram um diálogo no lugar disso, então a linha aceita virar
 * botão — mas só para os slugs que o consumidor listar em `areasComDialogo`.
 * Quem não passa nada continua com a lista de links de antes, que é o que
 * `/site2` e `/site3` renderizam.
 */
export function IndiceAreas({
  areasComDialogo,
  aoAbrirArea,
}: {
  areasComDialogo?: readonly string[];
  aoAbrirArea?: (slug: string) => void;
} = {}) {
  const [ativa, setAtiva] = React.useState<string | null>(null);

  const areaAtiva = areasDoDireito.find((area) => area.slug === ativa);
  // Só troca a imagem quando a área apontada tem uma; caso contrário conserva a
  // anterior e apenas reduz a presença dela.
  const slugExibido = areaAtiva?.imagem
    ? areaAtiva.slug
    : (areasComImagem[0]?.slug ?? null);
  const painelAtenuado = !areaAtiva?.imagem;

  // A seção usa `overflow-clip`, nunca `overflow-hidden`: os dois recortam a
  // estampa sangrada igual, mas `hidden` cria um contêiner de rolagem, e aí o
  // painel de imagem `sticky` passa a se ancorar nele em vez da viewport — ou
  // seja, para de grudar. `clip` recorta sem criar scrollport.
  return (
    <Section surface="base" size="lg" className="overflow-clip">
      {/* Estampa dourada, mesma escala da seção 01. Aqui o par é o canônico do
          styleguide — traço dourado sobre o azul institucional —, então ela
          aparece bem mais do que lá, onde é tom sobre tom. */}
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
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p
              aria-hidden
              className="font-display text-sm tracking-[0.22em] text-gold-700 dark:text-gold-400"
            >
              02
            </p>
            <h2 className="mt-4 text-sm tracking-[0.08em] text-muted-foreground uppercase">
              {institucional.areasSobretitulo}
            </h2>
            <p className="mt-8 max-w-[34ch] text-pretty text-muted-foreground lg:text-[0.9375rem]">
              {institucional.areasTitulo}
            </p>
          </div>

          {/* Índice. Em telas grandes divide espaço com o painel; abaixo disso
              ocupa tudo, e o painel some. */}
          <ul className="lg:col-span-5 lg:col-start-4">
            {areasDoDireito.map((area, indice) => {
              const total = contarServicos(area);
              const estaAtiva = ativa === area.slug;
              const abreDialogo = areasComDialogo?.includes(area.slug) ?? false;

              // Idênticos nos dois casos: a linha é a mesma peça visual, muda
              // só o elemento que a envolve — âncora ou botão.
              const comuns = {
                onMouseEnter: () => setAtiva(area.slug),
                onMouseLeave: () => setAtiva(null),
                onFocus: () => setAtiva(area.slug),
                onBlur: () => setAtiva(null),
                className:
                  "group flex w-full items-baseline gap-5 py-6 text-left transition-colors duration-300 outline-none focus-visible:bg-muted/50 md:py-7",
              };

              const conteudo = (
                <>
                  <span
                    aria-hidden
                    className="font-display text-xs tracking-[0.18em] text-muted-foreground transition-colors duration-300 group-hover:text-gold-700 group-focus-visible:text-gold-700 dark:group-hover:text-gold-400 dark:group-focus-visible:text-gold-400"
                  >
                    {String(indice + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1">
                    <span
                      className={`block text-[clamp(1.375rem,1.05rem+1.3vw,2.125rem)] leading-tight font-medium tracking-tight transition-opacity duration-300 ${
                        ativa && !estaAtiva ? "opacity-40" : "opacity-100"
                      }`}
                    >
                      {area.nome}
                    </span>
                    {total > 0 ? (
                      <span className="mt-2 block text-sm text-muted-foreground">
                        {total} {total === 1 ? "serviço" : "serviços"}
                      </span>
                    ) : null}
                  </span>

                  <ArrowUpRightIcon
                    aria-hidden
                    className="size-5 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  />
                </>
              );

              return (
                <li key={area.slug} className="border-b border-border first:border-t">
                  {abreDialogo ? (
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => aoAbrirArea?.(area.slug)}
                      {...comuns}
                    >
                      {conteudo}
                    </button>
                  ) : (
                    <Link href="/site/servicos" {...comuns}>
                      {conteudo}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Painel de imagem — decorativo, some abaixo de lg. */}
          <div
            aria-hidden
            className="hidden lg:col-span-3 lg:col-start-10 lg:block"
          >
            <div className="sticky top-28">
              <div
                className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted transition-opacity duration-500 ${
                  painelAtenuado ? "opacity-45" : "opacity-100"
                }`}
              >
                {areasComImagem.map((area) => (
                  <Image
                    key={area.slug}
                    src={area.imagem!.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 0px, 22rem"
                    className={`object-cover transition-opacity duration-500 ease-out ${
                      slugExibido === area.slug ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
