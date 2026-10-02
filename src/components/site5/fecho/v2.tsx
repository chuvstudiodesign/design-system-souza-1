import Image from "next/image";
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Card } from "@/components/ui/card";
import { contato, mapaLinkHref } from "@/lib/site5/contato";
import { contatoPagina, home } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

import {
  BotaoFecho,
  NovaAba,
  RotuloFecho,
  canaisFecho,
  corpoFecho,
  fotoFecho,
} from "./partes";

const rotuloCanal =
  "text-[0.9375rem] tracking-[0.12em] text-muted-foreground uppercase";

const linkCanal =
  "inline-flex min-h-11 items-center gap-2.5 rounded-md text-[1.0688rem] font-medium underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none";

/**
 * Fecho V2 — a fachada em faixa larga, de borda a borda, e o contato num
 * cartão que sobe sobre a base da foto.
 *
 * A foto vem primeiro, larga (3:2 no celular, 16:9 no tablet, 2:1 no
 * desktop): a fachada tem o prédio ocupando quase toda a altura do quadro,
 * então o corte mais largo que isso (21:9) passaria a amputar o telhado ou a
 * escada que o cartão cobre. O cartão entra sobre a faixa de grama/calçada,
 * que é a parte da foto que não diz nada.
 */
export function FechoV2() {
  return (
    <Section surface="base" className="overflow-clip pt-0 pb-24 md:pt-0 md:pb-32 lg:pt-0 lg:pb-40">
      <Revelar variante="zoom" asChild>
        <figure className="relative aspect-[3/2] w-full md:aspect-video lg:aspect-[2/1]">
          <Image
            quality={95}
            src={fotoFecho.src}
            alt={fotoFecho.alt}
            fill
            sizes="100vw"
            className="object-cover object-[50%_45%] md:object-[50%_58%]"
          />
          {/* Assenta a base da foto na superfície, sob o cartão. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/5 bg-linear-to-t from-background to-transparent"
          />
        </figure>
      </Revelar>

      <Container className="relative z-10 -mt-12 md:-mt-16 lg:-mt-24">
        <Revelar asChild>
          <Card className="gap-0 rounded-3xl px-6 py-10 text-base shadow-2xl ring-border md:rounded-4xl md:px-12 md:py-14 lg:px-16 lg:py-16">
            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-12">
              <div className="min-w-0 lg:col-span-6">
                <RotuloFecho />
                <h2 className="mt-8 max-w-[18ch] font-display text-[clamp(1.4625rem,0.9rem+1.98vw,2.475rem)] leading-[1.15] tracking-tight text-balance uppercase">
                  {home.contato.titulo}
                </h2>
              </div>

              <div className="min-w-0 lg:col-span-6 lg:self-end">
                <p className={cn(corpoFecho, "max-w-[46ch] text-muted-foreground")}>
                  {home.contato.paragrafo}
                </p>
                <BotaoFecho anelOffset="focus-visible:ring-offset-card" className="mt-8" />
              </div>
            </div>

            <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-border pt-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.5fr)]">
              {canaisFecho.map(({ rotulo, exibicao, href, externo, Icone }) => (
                <li key={href} className="min-w-0">
                  <p className={rotuloCanal}>{rotulo}</p>
                  <a
                    href={href}
                    {...(externo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : null)}
                    className={cn(linkCanal, "mt-1")}
                  >
                    <Icone className="size-5 shrink-0 text-gold-400" />
                    {exibicao}
                    {externo ? <NovaAba /> : null}
                  </a>
                </li>
              ))}
              <li className="min-w-0 sm:col-span-2 lg:col-span-1">
                <p className={rotuloCanal}>{contatoPagina.endereco.titulo}</p>
                <address className="mt-3 text-[0.9563rem] leading-relaxed text-pretty not-italic">
                  <span className="block">{contato.endereco.logradouro}</span>
                  <span className="block text-muted-foreground">
                    {contato.endereco.bairroCidade}, {contato.endereco.cep}
                  </span>
                </address>
                <a
                  href={mapaLinkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-md text-[0.9563rem] font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <MapPinIcon aria-hidden className="size-4 shrink-0" />
                  {contatoPagina.formulario.ui.abrirMapa}
                  <ArrowUpRightIcon aria-hidden className="size-4 shrink-0" />
                  <NovaAba />
                </a>
              </li>
            </ul>
          </Card>
        </Revelar>
      </Container>
    </Section>
  );
}
