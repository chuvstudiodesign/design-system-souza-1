import Image from "next/image";

import { brandAssets } from "@/components/brand/logo";
import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { AjusteEstampa } from "@/components/site5/ajuste-estampa";
import { Regua } from "@/components/site5/sobre-v3/regua";
import { sobre } from "@/lib/site5/conteudo";

/** Dimensões nativas da estampa — iguais nos dois arquivos. */
const ESTAMPA = { w: 4085, h: 3154 };

/**
 * Nosso propósito — sobre o eixo de simetria da página: o único bloco
 * centrado da V3.
 *
 * Única superfície dourada da V3; tinta fixa `brand-950`/`brand-900` pelo
 * mesmo motivo do `Manifesto` da home. Estampa 01 no canto superior esquerdo
 * (oposto ao da home), tom sobre tom, sangrada. Posicionada por `left`/
 * `bottom` para o `AjusteEstampa` mover o mesmo eixo que as classes escrevem.
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
        data-estampa="proposito-v3"
        className="pointer-events-none absolute -top-[60%] -left-[70%] -z-10 w-[170vw] max-w-none lg:-top-[70%] lg:-left-[38%] lg:w-[90vw]"
      />

      <AjusteEstampa
        alvo="proposito-v3"
        rotulo="estampa propósito v3"
        padrao={{ left: -70, bottom: 0, largura: 170 }}
      />

      <Container>
        <Regua numero="03" rotulo={sobre.proposito.titulo} as="h2" tom="gold" />

        <Revelar duracao={800}>
          <p className="mx-auto mt-14 max-w-[30ch] text-center text-[clamp(1.575rem,0.945rem+2.61vw,3.15rem)] leading-[1.16] font-medium tracking-tight text-balance text-brand-950 md:mt-20">
            {sobre.proposito.paragrafo}
          </p>
        </Revelar>
      </Container>
    </Section>
  );
}
