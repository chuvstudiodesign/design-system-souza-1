import Image from "next/image";

import { brandAssets } from "@/components/brand/logo";
import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Trilho } from "@/components/site5/trilho";
import { sobre } from "@/lib/site5/conteudo";

/** Dimensões nativas da estampa — iguais nos dois arquivos. */
const ESTAMPA = { w: 4085, h: 3154 };

/**
 * Nosso propósito — a única superfície dourada da página.
 *
 * Uma frase só, em escala grande: é o elemento dominante do bloco. Como no
 * `Manifesto` da home, nenhuma cor aqui é semântica — `primary` e
 * `muted-foreground` viram dourado no escuro e sumiriam no degradê. A tinta é
 * `brand-950`.
 *
 * A estampa repete o recurso da home espelhada no canto oposto (inferior
 * direito), tom sobre tom, sangrada pela borda. É fundo, não ilustração.
 * SVG com `unoptimized` pelo mesmo motivo do `Manifesto`.
 */
export function Proposito() {
  return (
    <Section surface="gold" size="lg" className="overflow-clip">
      <Image
        src={brandAssets.pattern[1]}
        alt=""
        aria-hidden
        width={ESTAMPA.w}
        height={ESTAMPA.h}
        unoptimized
        className="pointer-events-none absolute -right-[108.3%] -bottom-[118.3%] -z-10 w-[156vw] max-w-none -scale-x-100"
      />

      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <Trilho
            numero="03"
            rotulo={sobre.proposito.titulo}
            as="h2"
            tom="gold"
            className="lg:col-span-3"
          />

          <Revelar duracao={800} className="min-w-0 lg:col-span-8 lg:col-start-5">
            <p className="max-w-[32ch] text-[clamp(1.35rem,0.945rem+1.71vw,2.3625rem)] leading-[1.2] font-medium tracking-tight text-balance text-brand-950">
              {sobre.proposito.paragrafo}
            </p>
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
