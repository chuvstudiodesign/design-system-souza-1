import Image from "next/image";
import { MapPinIcon } from "lucide-react";

import { Section, Sobretitulo } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { contato, whatsappHref } from "@/lib/site5/contato";
import { fotosEspaco, home } from "@/lib/site5/conteudo";

/**
 * Fecho da página — "Entre em contato".
 *
 * Duas metades sangradas: texto à esquerda, alinhado à grade do container
 * pelo `pl-[max(...)]`, e a fachada real do escritório à direita, de borda a
 * borda. É a primeira vez que a home mostra o prédio, e é aqui que ela deve
 * mostrar: logo antes do endereço.
 *
 * O CTA principal carrega o único `shadow-gold` da página. Abaixo dele, os
 * canais diretos (dois WhatsApps, telefone fixo, endereço) para quem prefere
 * ligar ou ir até lá.
 */
const linkCanal =
  "inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-primary hover:underline";

export function Fecho() {
  const foto = fotosEspaco.fachada;

  return (
    <Section surface="base" className="overflow-clip py-0 md:py-0 lg:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Revelar className="min-w-0 px-6 py-24 md:px-10 md:py-32 lg:py-40 lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-var(--container-7xl))/2+2.5rem))]">
          <p
            aria-hidden
            className="font-display text-[0.9688rem] tracking-[0.22em] text-gold-400"
          >
            04
          </p>
          <Sobretitulo className="mt-4">{home.contato.sobretitulo}</Sobretitulo>

          <h2 className="mt-6 font-display text-[clamp(1.35rem,0.9rem+1.8vw,2.25rem)] leading-[1.15] tracking-tight text-balance uppercase">
            {home.contato.titulo}
          </h2>

          <p className="mt-6 max-w-[48ch] text-[clamp(0.9563rem,0.9rem+0.27vw,1.0688rem)] leading-relaxed text-pretty text-muted-foreground">
            {home.contato.paragrafo}
          </p>

          <Button
            asChild
            size="lg"
            className="mt-10 h-auto min-h-11.5 w-full px-7 py-3 text-base whitespace-normal shadow-gold sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppGlyph className="size-5" />
              {home.contato.botao}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>

          <ul className="mt-8 border-t border-border pt-6 text-[0.9563rem]">
            {contato.whatsapps.map((w) => (
              <li key={w.href} className="flex flex-wrap items-center gap-x-3 py-0.5">
                <span className="w-28 shrink-0 text-muted-foreground">{w.rotulo}</span>
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
            <li className="flex flex-wrap items-center gap-x-3 py-0.5">
              <span className="w-28 shrink-0 text-muted-foreground">
                {contato.telefoneFixo.rotulo}
              </span>
              <a href={contato.telefoneFixo.href} className={linkCanal}>
                {contato.telefoneFixo.exibicao}
              </a>
            </li>
            <li className="flex items-start gap-3 py-2.5">
              <MapPinIcon
                aria-hidden
                className="mt-1.5 size-4 shrink-0 text-muted-foreground"
              />
              <address className="text-pretty not-italic">
                {contato.endereco.completo}
              </address>
            </li>
          </ul>
        </Revelar>

        <Revelar
          variante="zoom"
          className="relative aspect-[4/3] lg:aspect-auto lg:min-h-full"
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
