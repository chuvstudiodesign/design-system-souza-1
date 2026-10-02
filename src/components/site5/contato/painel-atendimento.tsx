import { Fragment } from "react";
import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "lucide-react";

import { Sobretitulo } from "@/components/site/layout/section";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { contato } from "@/lib/site5/contato";
import { contatoPagina } from "@/lib/site5/conteudo";

const { atendimento } = contatoPagina;

/** Estilo de cada WhatsApp: o 1 é o CTA principal da página (único `shadow-gold`). */
const estiloWhatsapp = [
  {
    alvo: "bg-primary text-primary-foreground shadow-gold hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:focus-visible:ring-offset-card",
    rotulo: "text-primary-foreground/80",
    glifo: "",
  },
  {
    alvo: "bg-background/40 ring-1 ring-border hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring",
    rotulo: "text-muted-foreground",
    glifo: "text-gold-400",
  },
] as const;

const linhaCanal =
  "flex min-h-16 items-center gap-4 rounded-md py-3 underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none hover:[&_.valor]:underline";

/**
 * Painel "Fale com a nossa equipe": os dois WhatsApps como alvos grandes,
 * telefone e e-mail em linhas. No celular não é cartão — o fundo e a moldura
 * só aparecem a partir de `sm`, para não empilhar caixa dentro de margem.
 */
export function PainelAtendimento({ className }: { className?: string }) {
  const [usuario, dominio] = contato.email.exibicao.split("@");

  return (
    <Card
      className={cn(
        "gap-0 overflow-visible rounded-none bg-transparent p-0 text-base shadow-none ring-0 sm:rounded-3xl sm:bg-card sm:p-8 sm:shadow-xl sm:ring-1 sm:ring-border lg:p-10",
        className
      )}
    >
      <Sobretitulo>{atendimento.sobretitulo}</Sobretitulo>
      <h2 className="mt-5 text-[clamp(1.2375rem,0.99rem+0.9vw,1.6875rem)] leading-tight font-medium tracking-tight text-balance">
        {atendimento.titulo}
      </h2>
      <p className="mt-4 max-w-[52ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-muted-foreground">
        {atendimento.paragrafo}
      </p>

      <ul className="mt-8 grid gap-3">
        {contato.whatsapps.map((w, i) => {
          const estilo = estiloWhatsapp[i] ?? estiloWhatsapp[1];
          return (
            <li key={w.href} className="min-w-0">
              <a
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex flex-col rounded-2xl p-5 transition-colors focus-visible:outline-none motion-reduce:transition-none sm:p-6",
                  estilo.alvo
                )}
              >
                <span className="flex items-center gap-3">
                  <WhatsAppGlyph className={cn("size-6 shrink-0", estilo.glifo)} />
                  <span
                    className={cn(
                      "text-[0.9688rem] tracking-[0.08em] uppercase",
                      estilo.rotulo
                    )}
                  >
                    {w.rotulo}
                  </span>
                  <span className="sr-only">: </span>
                  <ArrowUpRightIcon aria-hidden className="ml-auto size-5 shrink-0" />
                </span>
                {/* DDD e número nunca se partem por dentro; com o texto
                    ampliado a 200%, o número desce inteiro para a linha de baixo. */}
                <span className="mt-2 block text-[clamp(1.2375rem,1.08rem+0.72vw,1.575rem)] leading-tight font-medium tracking-tight tabular-nums">
                  {w.exibicao.split(" ").map((parte, j) => (
                    <Fragment key={parte}>
                      {j > 0 ? " " : null}
                      <span className="whitespace-nowrap">{parte}</span>
                    </Fragment>
                  ))}
                </span>
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          );
        })}
      </ul>

      <ul className="mt-6 divide-y divide-border border-y border-border">
        <li>
          <a href={contato.telefoneFixo.href} className={linhaCanal}>
            <PhoneIcon aria-hidden className="size-5 shrink-0 text-gold-400" />
            <span className="min-w-0 flex-1">
              <span className="block text-[0.9688rem] tracking-[0.08em] text-muted-foreground uppercase">
                {contato.telefoneFixo.rotulo}
              </span>
              <span className="sr-only">: </span>
              <span className="valor block text-[clamp(1.0125rem,0.945rem+0.315vw,1.1813rem)] font-medium tabular-nums">
                {contato.telefoneFixo.exibicao}
              </span>
            </span>
          </a>
        </li>
        <li>
          <a href={contato.email.href} className={linhaCanal}>
            <MailIcon aria-hidden className="size-5 shrink-0 text-gold-400" />
            <span className="min-w-0 flex-1">
              <span className="block text-[0.9688rem] tracking-[0.08em] text-muted-foreground uppercase">
                {contato.email.rotulo}
              </span>
              <span className="sr-only">: </span>
              <span className="valor block text-[clamp(1.0125rem,0.945rem+0.315vw,1.1813rem)] font-medium">
                {usuario}@
                <wbr />
                {dominio}
              </span>
            </span>
          </a>
        </li>
      </ul>
    </Card>
  );
}
