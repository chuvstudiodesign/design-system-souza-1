import { Fragment } from "react";
import { MailIcon, PhoneIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { cn } from "@/lib/utils";
import { contato } from "@/lib/site5/contato";
import { contatoPagina } from "@/lib/site5/conteudo";

import { Cabecalho } from "./cabecalho";
import { escala } from "./escala";

const { atendimento } = contatoPagina;

/** Ordem do documento: Telefone, WhatsApp 1, WhatsApp 2 (o e-mail vem abaixo). */
const numeros = [
  { ...contato.telefoneFixo, Glifo: PhoneIcon, externo: false },
  { ...contato.whatsapps[0], Glifo: WhatsAppGlyph, externo: true },
  { ...contato.whatsapps[1], Glifo: WhatsAppGlyph, externo: true },
] as const;

const alvo =
  "rounded-md transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none";

/** Sublinhado dourado permanente: sinaliza o link sem depender de hover. */
const valor = cn(
  escala.lead,
  "text-foreground underline decoration-gold-500/60 underline-offset-[6px]"
);

/**
 * II — Fale com a nossa equipe. A "placa" do escritório: três números lado a
 * lado, no mesmo corpo e peso (nenhum destaque de cor — o WhatsApp já é o CTA
 * da abertura), e o e-mail por extenso numa linha inteira embaixo.
 */
export function Atendimento() {
  const [usuario, dominio] = contato.email.exibicao.split("@");

  return (
    <Section
      surface="base"
      size="md"
      id="atendimento"
      className="scroll-mt-20"
      aria-labelledby="titulo-atendimento"
    >
      <Container>
        <Revelar>
          <Cabecalho
            numero="II"
            id="titulo-atendimento"
            titulo={atendimento.titulo}
            paragrafo={atendimento.paragrafo}
          />
        </Revelar>

        <Revelar atraso={80} asChild>
          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border md:mt-16">
            {numeros.map(({ Glifo, externo, ...canal }) => (
              <li
                key={canal.href}
                className="min-w-0 border-b border-border last:border-b-0 sm:border-b-0"
              >
                <a
                  href={canal.href}
                  {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : null)}
                  className={cn(
                    "flex h-full min-h-28 flex-col items-center justify-center gap-2 px-4 py-6 text-center",
                    alvo
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Glifo aria-hidden className="size-5 shrink-0 text-gold-400" />
                    <span className={cn(escala.rotulo, "text-muted-foreground")}>
                      {canal.rotulo}
                    </span>
                  </span>
                  <span className="sr-only">: </span>
                  {/* DDD e número nunca se partem por dentro; com o texto
                      ampliado, o número desce inteiro para a linha de baixo. */}
                  <span className={cn(valor, "tabular-nums")}>
                    {canal.exibicao.split(" ").map((parte, j) => (
                      <Fragment key={parte}>
                        {j > 0 ? " " : null}
                        <span className="whitespace-nowrap">{parte}</span>
                      </Fragment>
                    ))}
                  </span>
                  {externo ? <span className="sr-only"> (abre em nova aba)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </Revelar>

        <Revelar atraso={140} className="mx-auto mt-2 max-w-5xl border-b border-border">
          <a
            href={contato.email.href}
            className={cn(
              "flex min-h-20 flex-col items-center justify-center gap-2 px-4 py-5 text-center sm:flex-row sm:gap-4",
              alvo
            )}
          >
            <span className="flex items-center gap-2.5">
              <MailIcon aria-hidden className="size-5 shrink-0 text-gold-400" />
              <span className={cn(escala.rotulo, "text-muted-foreground")}>
                {contato.email.rotulo}
              </span>
            </span>
            <span className="sr-only">: </span>
            <span className={cn(valor, "min-w-0")}>
              {usuario}@
              <wbr />
              {dominio}
            </span>
          </a>
        </Revelar>
      </Container>
    </Section>
  );
}
