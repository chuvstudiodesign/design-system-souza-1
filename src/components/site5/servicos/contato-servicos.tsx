import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { contato, whatsappHref } from "@/lib/site5/contato";
import { home, servicosIntro } from "@/lib/site5/conteudo";

/** Mesma string do `linkCanal` do fecho da home — copiada, não importada. */
const linkCanal =
  "inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-primary hover:underline";

/**
 * Faixa de contato que fecha a página Serviços.
 *
 * Título + CTA de WhatsApp (o único `shadow-gold` da página) à esquerda;
 * canais diretos à direita. Sem endereço — isso é da página Contato.
 */
export function ContatoServicos() {
  return (
    <Section surface="navy" size="md">
      <Container>
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Revelar className="min-w-0 lg:col-span-7">
            <h2 className="max-w-[22ch] font-display text-[clamp(1.35rem,0.9rem+1.8vw,2.25rem)] leading-[1.15] tracking-tight text-balance uppercase">
              {home.contato.titulo}
            </h2>

            <Button
              asChild
              size="lg"
              className="mt-8 h-auto min-h-11.5 w-full whitespace-normal py-3 px-7 text-base shadow-gold sm:w-auto"
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppGlyph className="size-5" />
                {servicosIntro.botao}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </Button>
          </Revelar>

          <Revelar atraso={80} className="min-w-0 lg:col-span-4 lg:col-start-9">
            <ul className="border-t border-navy-foreground/15 text-[0.9563rem]">
              {/* Um número por linha, com o rótulo de `contato.whatsapps`
                  ("WhatsApp 1", "WhatsApp 2"), como no rodapé. */}
              {contato.whatsapps.map((w) => (
                <li
                  key={w.href}
                  className="flex flex-wrap items-center gap-x-3 border-b border-navy-foreground/15 py-3"
                >
                  <span className="w-28 shrink-0 text-navy-foreground/70">{w.rotulo}</span>
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkCanal}
                  >
                    {w.exibicao}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
              <li className="flex flex-wrap items-center gap-x-3 border-b border-navy-foreground/15 py-3">
                <span className="w-28 shrink-0 text-navy-foreground/70">
                  {contato.telefoneFixo.rotulo}
                </span>
                <a href={contato.telefoneFixo.href} className={linkCanal}>
                  {contato.telefoneFixo.exibicao}
                </a>
              </li>
            </ul>
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
