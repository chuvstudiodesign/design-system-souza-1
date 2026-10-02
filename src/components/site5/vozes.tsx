import { ChevronDownIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { depoimentos, home, type Depoimento } from "@/lib/site5/conteudo";

/**
 * Depoimentos em chave editorial.
 *
 * Um depoimento curto ocupa a escala de display, três outros o sustentam em
 * colunas separadas por filete — sem card, sem sombra. Os cinco restantes
 * ficam num `Collapsible`: todos os 9 originais estão na página, mas só quatro
 * pedem leitura de cara. A seleção é por autor, não por índice, para não
 * quebrar silenciosamente se a ordem da lista mudar.
 *
 * Server Component: o `Collapsible` do design system é o único trecho client,
 * e o rótulo do gatilho troca por `data-state` em CSS, sem estado aqui.
 */

const porAutor = (autor: string) => depoimentos.find((d) => d.autor === autor);
const selecionar = (autores: string[]) =>
  autores.map(porAutor).filter((d): d is Depoimento => Boolean(d));

const destaque = porAutor("Elton Dias Souto") ?? depoimentos[0];
const apoios = selecionar(["Neri Celso", "Chácara Paquetá", "Angela Noronha"]);
const restantes = selecionar([
  "Geraldo Martins",
  "Messias Fernandes",
  "William André Safatle",
  "Silvia Maria",
  "Sirlene Praxedes",
]);

function Apoio({ depoimento }: { depoimento: Depoimento }) {
  return (
    <figure className="flex min-w-0 flex-col gap-4">
      <blockquote className="text-[0.9563rem] leading-relaxed whitespace-pre-line text-pretty text-navy-foreground/80">
        {depoimento.texto}
      </blockquote>
      <figcaption className="mt-auto text-[0.9563rem]">
        <span className="font-medium">{depoimento.autor}</span>
        {depoimento.servico ? (
          <span className="mt-1 block text-navy-foreground/60">
            {depoimento.servico}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function Vozes() {
  return (
    <Section surface="navy" size="lg">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p
              aria-hidden
              className="font-display text-[0.9688rem] tracking-[0.22em] text-gold-400"
            >
              03
            </p>
            <p className="mt-4 text-[0.9688rem] tracking-[0.08em] text-navy-foreground/60 uppercase">
              {home.depoimentos.sobretitulo}
            </p>
          </div>

          <Revelar className="min-w-0 lg:col-span-9">
            <h2 className="max-w-[30ch] text-[clamp(1.35rem,1.08rem+1.08vw,2.025rem)] leading-tight font-medium tracking-tight text-balance">
              {home.depoimentos.titulo}
            </h2>
            <p className="mt-5 max-w-[62ch] text-[0.9563rem] leading-relaxed text-pretty text-navy-foreground/75">
              {home.depoimentos.paragrafo}
            </p>

            <figure className="mt-14">
              <blockquote className="text-[clamp(1.35rem,0.99rem+1.71vw,2.475rem)] leading-[1.18] font-medium tracking-tight text-balance">
                {destaque.texto}
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.9563rem]">
                <span className="font-medium">{destaque.autor}</span>
                {destaque.servico ? (
                  <>
                    <span aria-hidden className="h-px w-6 bg-gold-500/60" />
                    <span className="text-navy-foreground/60">
                      {destaque.servico}
                    </span>
                  </>
                ) : null}
              </figcaption>
            </figure>
          </Revelar>

          <div className="border-t border-navy-foreground/15 pt-12 lg:col-span-12">
            <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-3">
              {apoios.map((depoimento, indice) => (
                <Revelar key={depoimento.autor} atraso={indice * 70} asChild>
                  <div className="min-w-0">
                    <Apoio depoimento={depoimento} />
                  </div>
                </Revelar>
              ))}
            </div>

            {restantes.length > 0 ? (
              <Collapsible className="mt-12">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="link"
                    className="group h-auto min-h-11 max-w-full px-0 text-left text-base whitespace-normal text-gold-400"
                  >
                    <span className="group-data-[state=open]:hidden">
                      Ver todos os depoimentos
                    </span>
                    <span className="hidden group-data-[state=open]:inline">
                      Ver menos depoimentos
                    </span>
                    <ChevronDownIcon
                      aria-hidden
                      className="transition-transform duration-300 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                    />
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent
                  forceMount
                  className="data-[state=closed]:hidden"
                >
                  <div className="mt-12 grid grid-cols-1 animate-in gap-x-10 gap-y-12 border-t border-navy-foreground/15 pt-12 duration-300 fade-in motion-reduce:animate-none lg:grid-cols-3">
                    {restantes.map((depoimento) => (
                      <Apoio key={depoimento.autor} depoimento={depoimento} />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
