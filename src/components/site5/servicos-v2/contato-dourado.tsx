import Image from "next/image";

import { brandAssets } from "@/components/brand/logo";
import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { contato, whatsappHref } from "@/lib/site5/contato";
import { home, servicosIntro } from "@/lib/site5/conteudo";

/** Dimensões nativas da estampa. */
const ESTAMPA = { w: 4085, h: 3154 };

/**
 * Mesmo texto de `home.contato.titulo`, com espaços não separáveis dentro de
 * "Souza & Souza": o nome não se parte em "Souza / & Souza".
 */
const tituloContato = home.contato.titulo.replace(
  "Souza & Souza",
  "Souza\u00A0&\u00A0Souza"
);

const linkCanal =
  "inline-flex min-h-11 items-center font-medium text-brand-950 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-brand-950/70 focus-visible:outline-none";

/**
 * Fecho da V2 sobre a superfície dourada — a mesma "virada" do `Manifesto`
 * da home, com a estampa cortada pela borda esquerda.
 *
 * Cores fixas (`brand-950`/`brand-900`): tokens semânticos viram dourado no
 * escuro e sumiriam no degradê. Sem `shadow-gold` aqui — o da página está no
 * CTA da abertura.
 *
 * Título e parágrafo são os de `home.contato` (literais do cliente, da home);
 * o botão é o "Entre em contato" do documento de Serviços.
 */
export function ContatoDourado() {
  return (
    <Section surface="gold" size="lg" className="overflow-clip">
      <Image
        src={brandAssets.pattern[1]}
        alt=""
        aria-hidden
        data-estampa="servicos-v2"
        width={ESTAMPA.w}
        height={ESTAMPA.h}
        unoptimized
        className="pointer-events-none absolute -bottom-[118.3%] -left-[108.3%] -z-10 w-[156vw] max-w-none"
      />

      <Container>
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Revelar className="min-w-0 lg:col-span-7">
            <h2 className="max-w-[20ch] text-[clamp(1.4625rem,1.125rem+1.44vw,2.25rem)] leading-[1.1] font-medium tracking-tight text-balance text-brand-950">
              {tituloContato}
            </h2>
            <p className="mt-6 max-w-[48ch] text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-brand-900">
              {home.contato.paragrafo}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-10 h-auto min-h-11.5 w-full bg-brand-950 px-7 py-3 text-base whitespace-normal text-navy-foreground hover:bg-brand-900 focus-visible:ring-2 focus-visible:ring-brand-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-gold-400 sm:w-auto"
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppGlyph className="size-5" />
                {servicosIntro.botao}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </Button>
          </Revelar>

          <Revelar atraso={80} className="min-w-0 lg:col-span-4 lg:col-start-9">
            <ul className="border-t border-brand-950/20 text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)]">
              {contato.whatsapps.map((w) => (
                <li
                  key={w.href}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-brand-950/20 py-3"
                >
                  <span className="text-brand-900">{w.rotulo}</span>
                  <a href={w.href} target="_blank" rel="noopener noreferrer" className={linkCanal}>
                    {w.exibicao}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
              <li className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-brand-950/20 py-3">
                <span className="text-brand-900">{contato.telefoneFixo.rotulo}</span>
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
