"use client";

import { Card } from "@/components/ui/card";
import { home } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

import { Botoes, Contador, Progresso } from "./controles";
import { doisDigitos, ordem, tempos } from "./dados";
import { Citacao } from "./leitura";
import { Pilha } from "./pilha";
import { useCarrossel } from "./use-carrossel";

/**
 * Escala única do destaque — a que o depoimento de Elton Dias Souto usava.
 * Todos os depoimentos no mesmo tamanho; o comprimento é que é padronizado
 * (ver `trecho()` em `dados.ts`).
 */
const ESCALA =
  "text-[clamp(1.0688rem,0.945rem+0.63vw,1.4625rem)] leading-[1.35] font-medium tracking-tight text-pretty";

/** Parte interativa da V2 — container com destaque + índice de autores. */
export function CarrosselV2() {
  const { ligarBarra, ligarArea, ...carrossel } = useCarrossel(tempos);

  return (
    <Card
      ref={ligarArea}
      className="mt-14 scroll-mt-28 gap-0 rounded-3xl bg-navy-foreground/5 p-0 text-navy-foreground shadow-xl ring-1 ring-gold-500/35 md:mt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col p-6 sm:p-10 lg:col-span-8 lg:p-14">
          <div
            {...carrossel.destaqueProps}
            className="flex flex-1 flex-col [&>*]:flex-1"
          >
            <Pilha carrossel={carrossel} itens={ordem} alinhar="center">
              {(depoimento) => (
                <figure>
                  <span
                    aria-hidden
                    className="-mb-3 block font-display text-[4.05rem] leading-none text-gold-400 select-none md:-mb-5 md:text-[5.4rem]"
                  >
                    &ldquo;
                  </span>
                  <Citacao
                    depoimento={depoimento}
                    aoAbrir={carrossel.segurar}
                    className={cn("max-w-[60ch]", ESCALA)}
                    classeLink="text-gold-400"
                  />
                  <figcaption className="mt-8 text-[0.9563rem]">
                    <span className="block font-medium">
                      {depoimento.autor}
                    </span>
                    {depoimento.servico ? (
                      <span className="mt-1 block text-navy-foreground/60">
                        {depoimento.servico}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              )}
            </Pilha>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-5 pt-10 sm:flex-nowrap">
            <Contador carrossel={carrossel} />
            <Progresso
              ligarBarra={ligarBarra}
              className="order-last basis-full sm:order-none sm:flex-1 sm:basis-auto"
            />
            <Botoes carrossel={carrossel} className="ml-auto sm:ml-0" />
          </div>
        </div>

        {/* Índice de autores: ao lado do destaque no desktop, abaixo dele
              (em duas colunas a partir de sm) no celular e no tablet. */}
        <nav
          aria-label={home.depoimentos.sobretitulo}
          className="min-w-0 border-t border-navy-foreground/12 lg:col-span-4 lg:border-t-0 lg:border-l"
        >
          <ol className="grid grid-cols-1 py-4 sm:grid-cols-2 sm:py-6 lg:grid-cols-1">
            {ordem.map((depoimento, i) => {
              const ativo = i === carrossel.indice;
              return (
                <li key={depoimento.autor}>
                  <button
                    type="button"
                    aria-current={ativo ? "true" : undefined}
                    onClick={() => carrossel.ir(i)}
                    {...carrossel.setasProps}
                    className={cn(
                      "relative flex min-h-11 w-full items-baseline gap-4 px-6 py-3.5 text-left sm:px-8 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none",
                      ativo
                        ? "bg-navy-foreground/8"
                        : "hover:bg-navy-foreground/5"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-2 left-0 w-0.5 origin-top bg-gold-400 transition-transform duration-500 motion-reduce:transition-none",
                        ativo ? "scale-y-100" : "scale-y-0"
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "shrink-0 font-display text-xs tracking-[0.18em] tabular-nums",
                        ativo ? "text-gold-400" : "text-navy-foreground/45"
                      )}
                    >
                      {doisDigitos(i + 1)}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-base font-medium",
                          ativo
                            ? "text-navy-foreground"
                            : "text-navy-foreground/75"
                        )}
                      >
                        {depoimento.autor}
                      </span>
                      {depoimento.servico ? (
                        <span className="mt-0.5 block text-[0.9688rem] text-navy-foreground/55">
                          {depoimento.servico}
                        </span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </Card>
  );
}
