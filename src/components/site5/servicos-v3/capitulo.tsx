import { ArrowUpIcon, InfoIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import type { AreaDeAtuacao } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

const corpo = "text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)]";

/**
 * Um capítulo = uma área, com superfície própria e o mesmo respiro em todas.
 *
 * Gramática das seções da home: trilho em 3/12 com o numeral Trajan (sticky
 * no desktop, para o visitante saber sempre em que área está) e conteúdo em
 * 8/12 a partir da coluna 5 (entre 1024 e 1279px, trilho 2/12 e conteúdo
 * 10/12 a partir da coluna 3 — em 8/12 a tabela de 3 colunas cortaria
 * palavras como "acompanhamentos" no meio). Leitura só vertical — nome, descrição, tabela de
 * itens, nota, "Voltar ao índice".
 *
 * A tabela é `grid` (fluxo por linha): itens de uma fileira dividem a altura e
 * os filetes correm na mesma linha. `min-h` comporta duas linhas no maior
 * corpo, e `auto-rows-fr` iguala as fileiras de uma mesma tabela à mais alta:
 * o passo é um só por área, quebre o texto ou não. Colunas pela contagem,
 * para fileiras sempre cheias.
 *
 * `overflow-clip`, nunca `hidden` — `hidden` quebraria o sticky do trilho.
 */
export function Capitulo({
  area,
  numero,
  superficie,
}: {
  area: AreaDeAtuacao;
  numero: number;
  superficie: "muted" | "base";
}) {
  const idTitulo = `titulo-${area.slug}`;
  const cols = area.itens.length % 3 === 0 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <Section
      id={area.slug}
      aria-labelledby={idTitulo}
      surface={superficie}
      size="md"
      className="group scroll-mt-28 overflow-clip"
    >
      <Container>
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8">
          <Revelar
            variante="esquerda"
            className="min-w-0 lg:sticky lg:top-28 lg:col-span-2 lg:self-start xl:col-span-3"
          >
            <p
              aria-hidden
              className="font-display text-[clamp(3.15rem,1.98rem+4.5vw,6.75rem)] leading-[0.85] text-gold-400 group-target:text-gold-300"
            >
              {String(numero).padStart(2, "0")}
            </p>
            <span aria-hidden className="mt-6 hidden h-px w-12 bg-gold-500/70 lg:block" />
          </Revelar>

          <div className="min-w-0 lg:col-span-10 lg:col-start-3 xl:col-span-8 xl:col-start-5">
            <Revelar>
              <h2
                id={idTitulo}
                className="max-w-[22ch] text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance"
              >
                {area.nome}
              </h2>
              <p className="mt-6 max-w-[52ch] text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-foreground/90">
                {area.descricao}
              </p>
            </Revelar>

            <Revelar atraso={80}>
              <ul
                className={cn(
                  "mt-10 grid auto-rows-fr grid-cols-1 border-b border-border md:mt-12 md:gap-x-6 xl:gap-x-10",
                  cols
                )}
              >
                {area.itens.map((item, i) => (
                  <li
                    key={item}
                    className="grid min-h-[5.375rem] min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-x-3 border-t border-border py-4"
                  >
                    <span
                      aria-hidden
                      className="font-display text-xs tracking-[0.22em] text-gold-400"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("min-w-0 leading-snug text-foreground", corpo)}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Revelar>

            {area.nota ? (
              <Revelar atraso={120}>
                <div className="mt-10 flex gap-4 rounded-2xl bg-card/60 p-6 ring-1 ring-border md:p-8">
                  <InfoIcon aria-hidden className="mt-1 size-5 shrink-0 text-gold-400" />
                  <p
                    className={cn(
                      "max-w-[62ch] min-w-0 leading-relaxed text-pretty text-foreground/85",
                      corpo
                    )}
                  >
                    {area.nota}
                  </p>
                </div>
              </Revelar>
            ) : null}

            <a
              href="#indice"
              className={cn(
                "mt-10 inline-flex min-h-11 items-center gap-2 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                corpo
              )}
            >
              <ArrowUpIcon aria-hidden className="size-4" />
              Voltar ao índice
              <span className="sr-only"> ({area.nome})</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
