import Image from "next/image";

import { brandAssets } from "@/components/brand/logo";
import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { tipo } from "@/components/site5/profissionais-v2/tipos";
import { cn } from "@/lib/utils";
import { profissionaisIntro } from "@/lib/site5/conteudo";

/** Dimensões nativas da estampa. */
const ESTAMPA = { w: 4085, h: 3154 };

/**
 * Introdução em superfície dourada — a virada da página, como o `Manifesto`
 * da home. Cores fixas (`brand-950`/`brand-900`): token semântico viraria
 * dourado no tema escuro e sumiria no degradê.
 *
 * Estampa 02 pela borda direita, monograma cortado pelo canto superior
 * direito. SVG `unoptimized` pelo mesmo motivo do `Manifesto`.
 */
export function IntroducaoDourada() {
  return (
    <Section surface="gold" size="lg" className="overflow-clip">
      <Image
        src={brandAssets.pattern[2]}
        alt=""
        aria-hidden
        unoptimized
        width={ESTAMPA.w}
        height={ESTAMPA.h}
        data-estampa="profissionais-v2"
        className="pointer-events-none absolute -top-[60%] -right-[70%] -z-10 w-[140vw] max-w-none"
      />

      <Container>
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <Revelar className="min-w-0 lg:col-span-7">
            <h2 className={cn(tipo.h2Secao, "max-w-[18ch] text-brand-950")}>
              {profissionaisIntro.introTitulo}
            </h2>
          </Revelar>
          <Revelar
            atraso={80}
            className="min-w-0 lg:col-span-4 lg:col-start-9 lg:pb-2"
          >
            <p className={cn(tipo.lead, "max-w-[44ch] text-brand-900")}>
              {profissionaisIntro.introParagrafo}
            </p>
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
