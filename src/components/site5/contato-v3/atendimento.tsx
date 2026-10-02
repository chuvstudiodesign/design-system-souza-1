import { Fragment } from "react";
import { ArrowRightIcon, ArrowUpRightIcon, MailIcon, PhoneIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { cn } from "@/lib/utils";
import { contato } from "@/lib/site5/contato";
import { contatoPagina } from "@/lib/site5/conteudo";

import { escala } from "./escala";
import { Movimento } from "./movimento";

const { atendimento } = contatoPagina;
const [usuario, dominio] = contato.email.exibicao.split("@");

/** Ordem do documento: Telefone, WhatsApp 1, WhatsApp 2, E-mail. */
const linhas = [
  { ...contato.telefoneFixo, Glifo: PhoneIcon, externo: false, email: false },
  { ...contato.whatsapps[0], Glifo: WhatsAppGlyph, externo: true, email: false },
  { ...contato.whatsapps[1], Glifo: WhatsAppGlyph, externo: true, email: false },
  { ...contato.email, Glifo: MailIcon, externo: false, email: true },
] as const;

/**
 * 02 — Fale com a nossa equipe. Os quatro canais como uma ficha de linhas
 * finas: rótulo à esquerda, valor alinhado numa segunda coluna quando a lista
 * tem ≥ 28rem (container query); abaixo disso, rótulo sobre valor. Nenhum
 * destaque de cor — o destaque é o botão da abertura.
 */
export function Atendimento() {
  return (
    <Movimento
      id="atendimento"
      numero="02"
      titulo={atendimento.titulo}
      paragrafo={atendimento.paragrafo}
    >
      <Revelar atraso={80} asChild>
        <ul className="@container mt-10 border-t border-border">
          {linhas.map(({ Glifo, externo, email, ...canal }) => {
            const Seta = externo ? ArrowUpRightIcon : ArrowRightIcon;
            return (
              <li key={canal.href} className="border-b border-border">
                <a
                  href={canal.href}
                  {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                  className="grid min-h-[4.5rem] grid-cols-[1.25rem_minmax(0,1fr)_1.25rem] items-center gap-x-4 rounded-md py-4 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none"
                >
                  <Glifo aria-hidden className="size-5 text-gold-400" />
                  <span className="grid min-w-0 grid-cols-1 gap-0.5 @md:grid-cols-[9rem_minmax(0,1fr)] @md:items-baseline @md:gap-x-6">
                    <span className={cn("text-muted-foreground", escala.rotulo)}>
                      {canal.rotulo}
                    </span>
                    <span className="sr-only">: </span>
                    <span className={cn("text-foreground tabular-nums", escala.lead)}>
                      {email ? (
                        <>
                          {usuario}@
                          <wbr />
                          {dominio}
                        </>
                      ) : (
                        // DDD e número nunca se partem por dentro.
                        canal.exibicao.split(" ").map((parte, j) => (
                          <Fragment key={parte}>
                            {j > 0 ? " " : null}
                            <span className="whitespace-nowrap">{parte}</span>
                          </Fragment>
                        ))
                      )}
                    </span>
                  </span>
                  <Seta aria-hidden className="size-5 text-muted-foreground" />
                  {externo ? <span className="sr-only"> (abre em nova aba)</span> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </Revelar>
    </Movimento>
  );
}
