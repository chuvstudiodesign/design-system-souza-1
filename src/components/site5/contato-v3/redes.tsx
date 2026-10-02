import { ArrowUpRightIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import { glifoDaRede } from "@/components/site5/glifos";
import { cn } from "@/lib/utils";
import { contato } from "@/lib/site5/contato";
import { contatoPagina } from "@/lib/site5/conteudo";

import { escala } from "./escala";
import { Movimento } from "./movimento";

const { redes } = contatoPagina;

/**
 * 04 — Redes sociais. Os três canais oficiais na mesma régua da ficha de
 * atendimento — ícone + nome, sempre; glifo maior (28px) porque as redes são
 * reconhecidas pela marca.
 */
export function Redes() {
  return (
    <Movimento id="redes" numero="04" titulo={redes.titulo} paragrafo={redes.paragrafo}>
      <ul className="mt-10 border-t border-border">
        {contato.redes.map((rede, i) => {
          const Glifo = glifoDaRede[rede.rede];
          return (
            <Revelar asChild atraso={i * 70} key={rede.rede}>
              <li className="border-b border-border">
                <a
                  href={rede.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid min-h-20 grid-cols-[1.75rem_minmax(0,1fr)_1.25rem] items-center gap-x-4 rounded-md py-4 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none"
                >
                  <Glifo className="size-7 text-gold-400" />
                  <span className="min-w-0">
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
                  <ArrowUpRightIcon aria-hidden className="size-5 text-muted-foreground" />
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </Revelar>
          );
        })}
      </ul>
    </Movimento>
  );
}
