import Image from "next/image";
import { MapPinIcon } from "lucide-react";

import { Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { contato } from "@/lib/site5/contato";
import { home } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

import {
  BotaoFecho,
  NovaAba,
  RotuloFecho,
  canaisFecho,
  corpoFecho,
  fotoFecho,
} from "./partes";

const linkCanal =
  "inline-flex min-h-11 items-center gap-3 rounded-md font-medium underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none";

/**
 * Fecho V1 — evolução da composição atual.
 *
 * 5/12 de texto alinhado à grade do container, centrado na altura; 7/12 de
 * fachada em 3:2 que sangra até a borda direita. A foto não é mais esticada
 * até a altura do texto (o que a deixava quase quadrada): ela mantém a
 * proporção original e é a seção que cresce para acomodá-la.
 */
export function FechoV1() {
  return (
    <Section
      surface="base"
      className="overflow-clip pt-24 pb-0 md:pt-32 md:pb-0 lg:py-36"
    >
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:items-center">
        <Revelar className="min-w-0 px-6 md:px-10 lg:col-span-5 lg:pr-14 lg:pl-[max(2.5rem,calc((100vw-var(--container-7xl))/2+2.5rem))] xl:pr-20">
          <RotuloFecho />

          <h2 className="mt-8 max-w-[16ch] font-display text-[clamp(1.4625rem,0.9rem+1.98vw,2.475rem)] leading-[1.15] tracking-tight text-balance uppercase">
            {home.contato.titulo}
          </h2>

          <p className={cn(corpoFecho, "mt-8 max-w-[46ch] text-muted-foreground")}>
            {home.contato.paragrafo}
          </p>

          <BotaoFecho anelOffset="focus-visible:ring-offset-background" className="mt-12" />

          <ul className="mt-12 border-t border-border pt-6 text-[0.9563rem]">
            {canaisFecho.map(({ rotulo, exibicao, href, externo, Icone }) => (
              <li key={href} className="flex flex-wrap items-center gap-x-4 py-0.5">
                <span className="w-28 shrink-0 text-muted-foreground">{rotulo}</span>
                <a
                  href={href}
                  {...(externo
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : null)}
                  className={linkCanal}
                >
                  <Icone className="size-4 shrink-0 text-gold-400" />
                  {exibicao}
                  {externo ? <NovaAba /> : null}
                </a>
              </li>
            ))}
            <li className="mt-3 flex items-start gap-3 border-t border-border pt-5">
              <MapPinIcon aria-hidden className="mt-1.5 size-4 shrink-0 text-gold-400" />
              <address className="text-pretty text-muted-foreground not-italic">
                {contato.endereco.completo}
              </address>
            </li>
          </ul>
        </Revelar>

        <Revelar variante="zoom" asChild>
          <figure className="relative aspect-[3/2] min-w-0 overflow-hidden lg:col-span-7 lg:rounded-l-4xl lg:shadow-2xl">
            <Image
              quality={95}
              src={fotoFecho.src}
              alt={fotoFecho.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover object-center"
            />
          </figure>
        </Revelar>
      </div>
    </Section>
  );
}
