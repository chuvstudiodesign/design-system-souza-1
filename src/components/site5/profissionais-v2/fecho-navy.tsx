import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { tipo } from "@/components/site5/profissionais-v2/tipos";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contato, whatsappHref } from "@/lib/site5/contato";
import { home } from "@/lib/site5/conteudo";

const linkCanal =
  "inline-flex min-h-11 items-center font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

/**
 * Fecho em navy — o fim da galeria. Sem foto: a página já tem cinco retratos
 * em escala grande. O WhatsApp carrega o único `shadow-gold` da página.
 *
 * Colunas alinhadas pelo topo (a spec pedia `items-end`): a coluna da
 * direita é bem mais alta que o título, e pela base o H2 ficava solto no pé
 * da seção com um vazio grande acima.
 */
export function FechoNavy() {
  return (
    <Section surface="navy" size="lg">
      <Container>
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-start lg:gap-x-8">
          <Revelar className="min-w-0 lg:col-span-6">
            <p className={cn(tipo.rotulo, "text-navy-foreground/70")}>
              {home.contato.sobretitulo}
            </p>
            <h2 className={cn(tipo.h2Secao, "mt-6 max-w-[18ch]")}>
              {home.contato.titulo}
            </h2>
          </Revelar>

          <Revelar atraso={80} className="min-w-0 lg:col-span-5 lg:col-start-8">
            <p
              className={cn(
                tipo.corpo,
                "max-w-[48ch] leading-relaxed text-pretty text-navy-foreground/80"
              )}
            >
              {home.contato.paragrafo}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="h-auto min-h-11.5 w-full px-7 py-3 text-base whitespace-normal shadow-gold focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:w-auto"
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppGlyph className="size-5" />
                  {home.contato.botao}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-auto min-h-11.5 w-full border-navy-foreground/30 bg-transparent px-5 py-3 text-base whitespace-normal text-navy-foreground hover:bg-navy-foreground/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-navy sm:w-auto"
              >
                <Link href="/site/servicos">
                  {home.areas.sobretitulo}
                  <ArrowRightIcon aria-hidden />
                </Link>
              </Button>
            </div>

            <ul
              className={cn(
                tipo.corpo,
                "mt-8 border-t border-navy-foreground/15 pt-4"
              )}
            >
              {contato.whatsapps.map((w) => (
                <li
                  key={w.href}
                  className="flex flex-wrap items-baseline gap-x-3"
                >
                  <span className="w-28 shrink-0 text-navy-foreground/70">
                    {w.rotulo}
                  </span>
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
              <li className="flex flex-wrap items-baseline gap-x-3">
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
