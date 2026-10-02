import { ArrowUpRightIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { glifoDaRede } from "@/components/site5/glifos";
import { contato } from "@/lib/site5/contato";
import { contatoPagina } from "@/lib/site5/conteudo";

const { redes } = contatoPagina;

/**
 * Redes sociais — o cliente pediu para avaliar "ícones ou links": aqui é
 * ícone + nome, nunca só ícone. Cada rede é uma linha inteira clicável.
 */
export function Redes() {
  return (
    <Section surface="navy" size="md" aria-labelledby="titulo-redes">
      <Container>
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Revelar className="min-w-0 lg:col-span-5">
            <h2
              id="titulo-redes"
              className="font-display text-[clamp(1.35rem,0.9rem+1.8vw,2.25rem)] leading-[1.15] tracking-tight uppercase"
            >
              {redes.titulo}
            </h2>
            <p className="mt-6 max-w-[44ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-navy-foreground/75">
              {redes.paragrafo}
            </p>
          </Revelar>

          <ul className="grid min-w-0 grid-cols-1 gap-3 lg:col-span-6 lg:col-start-7">
            {contato.redes.map((rede, i) => {
              const Glifo = glifoDaRede[rede.rede];
              return (
                <Revelar asChild atraso={i * 70} key={rede.rede}>
                  <li className="min-w-0">
                    <a
                      href={rede.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-20 items-center gap-5 rounded-2xl bg-navy-foreground/5 px-6 py-4 ring-1 ring-navy-foreground/20 transition-colors hover:bg-navy-foreground/10 focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:outline-none motion-reduce:transition-none"
                    >
                      <Glifo className="size-7 shrink-0 text-gold-400" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-xl font-medium">
                          {rede.rotulo}
                        </span>
                        {"usuario" in rede ? (
                          <>
                          <span className="sr-only">: </span>
                          <span className="block text-base text-navy-foreground/70">
                            {rede.usuario}
                          </span>
                          </>
                        ) : null}
                      </span>
                      <ArrowUpRightIcon aria-hidden className="size-5 shrink-0" />
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </li>
                </Revelar>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
