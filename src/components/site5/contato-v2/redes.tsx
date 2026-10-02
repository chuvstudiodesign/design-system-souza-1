import { ArrowUpRightIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { glifoDaRede } from "@/components/site5/glifos";
import { cn } from "@/lib/utils";
import { contato } from "@/lib/site5/contato";
import { contatoPagina } from "@/lib/site5/conteudo";

import { Cabecalho } from "./cabecalho";
import { escala } from "./escala";

const { redes } = contatoPagina;

/**
 * IV — Redes sociais. Fecha a carta com os três canais oficiais em pé de
 * igualdade: ícone + nome, sempre. No celular cada rede é uma linha; a partir
 * de `sm`, três colunas centradas com divisórias.
 */
export function Redes() {
  return (
    <Section
      surface="base"
      size="md"
      id="redes"
      className="scroll-mt-20"
      aria-labelledby="titulo-redes"
    >
      <Container>
        <Revelar>
          <Cabecalho
            numero="IV"
            id="titulo-redes"
            titulo={redes.titulo}
            paragrafo={redes.paragrafo}
          />
        </Revelar>

        <ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border md:mt-16">
          {contato.redes.map((rede, i) => {
            const Glifo = glifoDaRede[rede.rede];
            return (
              <Revelar asChild atraso={i * 70} key={rede.rede}>
                <li className="min-w-0 border-b border-border last:border-b-0 sm:border-b-0">
                  <a
                    href={rede.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full min-h-20 items-center gap-4 rounded-md px-2 py-4 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none sm:min-h-40 sm:flex-col sm:justify-start sm:gap-3 sm:px-4 sm:py-8 sm:text-center"
                  >
                    <Glifo className="size-7 shrink-0 text-gold-400" />
                    <span className="min-w-0 flex-1 sm:flex-none">
                      <span className={cn("block text-foreground", escala.lead)}>
                        {rede.rotulo}
                      </span>
                      {"usuario" in rede ? (
                        <>
                          <span className="sr-only">: </span>
                          <span
                            className={cn(
                              "mt-1 block text-muted-foreground",
                              escala.rotulo
                            )}
                          >
                            {rede.usuario}
                          </span>
                        </>
                      ) : null}
                    </span>
                    <ArrowUpRightIcon
                      aria-hidden
                      className="size-5 shrink-0 text-muted-foreground"
                    />
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              </Revelar>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
