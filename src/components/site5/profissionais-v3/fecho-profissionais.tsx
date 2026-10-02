import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { tipo } from "@/components/site5/profissionais-v3/tipos";
import { Trilho } from "@/components/site5/trilho";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contato, whatsappHref } from "@/lib/site5/contato";
import { fotosEspaco, home } from "@/lib/site5/conteudo";

const linkCanal =
  "inline-flex min-h-11 items-center font-medium underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none";

/**
 * Fecho — desenho do `Fecho` da home: texto alinhado ao container à
 * esquerda, foto da recepção sangrada à direita ("é aqui que você é
 * recebido"). WhatsApp com o único `shadow-gold` da página.
 */
export function FechoProfissionais() {
  const foto = fotosEspaco.recepcaoFrontal;

  return (
    <Section surface="base" className="overflow-clip py-0 md:py-0 lg:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Revelar className="min-w-0 px-6 py-20 md:px-10 md:py-28 lg:py-32 lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-var(--container-7xl))/2+2.5rem))]">
          <Trilho
            numero="03"
            rotulo={home.contato.sobretitulo}
            className="lg:static"
          />
          <h2 className={cn(tipo.h2, "mt-6 max-w-[18ch]")}>
            {home.contato.titulo}
          </h2>
          <p
            className={cn(
              tipo.corpo,
              "mt-6 max-w-[48ch] text-pretty text-muted-foreground"
            )}
          >
            {home.contato.paragrafo}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              asChild
              size="lg"
              className="h-auto min-h-11.5 w-full px-7 py-3 text-base whitespace-normal shadow-gold focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
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
              className="h-auto min-h-11.5 w-full px-5 py-3 text-base whitespace-normal sm:w-auto"
            >
              <Link href="/site/servicos">
                {home.areas.sobretitulo}
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
          </div>

          <ul className={cn(tipo.corpo, "mt-8 border-t border-border pt-4")}>
            {contato.whatsapps.map((w) => (
              <li key={w.href} className="flex flex-wrap items-baseline gap-x-3">
                <span className="w-28 shrink-0 text-muted-foreground">
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
              <span className="w-28 shrink-0 text-muted-foreground">
                {contato.telefoneFixo.rotulo}
              </span>
              <a href={contato.telefoneFixo.href} className={linkCanal}>
                {contato.telefoneFixo.exibicao}
              </a>
            </li>
          </ul>
        </Revelar>

        <Revelar
          variante="zoom"
          className="relative aspect-[4/3] min-w-0 lg:aspect-auto lg:min-h-full"
        >
          <Image
            quality={95}
            src={foto.src}
            alt={foto.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-[50%_45%]"
          />
        </Revelar>
      </div>
    </Section>
  );
}
