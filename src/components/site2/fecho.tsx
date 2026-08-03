import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Button } from "@/components/ui/button";
import { contato, marca, whatsappHref } from "@/lib/site/contato";

/**
 * Fecho da página.
 *
 * O slogan da marca vai em Trajan e caixa alta — é a única aparição de display
 * em escala grande na página inteira, e por isso funciona como assinatura.
 * Sendo curto, a fonte capitular é adequada aqui, ao contrário do H1.
 */

const canais = [
  {
    icone: PhoneIcon,
    rotulo: "WhatsApp",
    texto: contato.whatsapp.exibicao,
    href: whatsappHref,
    externo: true,
  },
  {
    icone: PhoneIcon,
    rotulo: "Telefone",
    texto: contato.telefoneFixo.exibicao,
    href: contato.telefoneFixo.href,
    externo: false,
  },
  {
    icone: MailIcon,
    rotulo: "E-mail",
    texto: contato.email.exibicao,
    href: contato.email.href,
    externo: false,
  },
] as const;

export function Fecho() {
  return (
    <Section surface="base" size="lg">
      <Container>
        <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p
              aria-hidden
              className="font-display text-sm tracking-[0.22em] text-gold-700 dark:text-gold-400"
            >
              04
            </p>
            <h2 className="mt-4 text-sm tracking-[0.08em] text-muted-foreground uppercase">
              Contato
            </h2>
          </div>

          <Revelar className="lg:col-span-9">
            <p className="font-display text-[clamp(1.5rem,1rem+2.2vw,3rem)] leading-[1.15] tracking-tight text-balance uppercase">
              {marca.slogan}
            </p>

            <div
              aria-hidden
              className="rule-gold mt-10 h-px w-full"
            />

            <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-3">
              {canais.map((canal) => (
                <div key={canal.rotulo} className="flex flex-col gap-2">
                  <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                    {canal.rotulo}
                  </p>
                  <a
                    href={canal.href}
                    {...(canal.externo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : null)}
                    className="text-base font-medium underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {canal.texto}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-8 border-t border-border pt-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="flex max-w-[42ch] items-start gap-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                <MapPinIcon aria-hidden className="mt-0.5 size-4 shrink-0" />
                {contato.endereco.completo}
              </p>

              <Button asChild size="lg" className="h-12 shrink-0 px-6 text-base">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Falar com o escritório
                </a>
              </Button>
            </div>
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
