import Image from "next/image";

import { brandAssets } from "@/components/brand/logo";
import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { AjusteEstampa } from "@/components/site5/ajuste-estampa";
import { Fio } from "@/components/site5/sobre-v2/fio";
import { sobre } from "@/lib/site5/conteudo";

/** Dimensões nativas da estampa — iguais nos dois arquivos. */
const ESTAMPA = { w: 4085, h: 3154 };

/**
 * Nosso propósito — a frase da página, em corpo de página cheia.
 *
 * Única superfície dourada da V2. Como no `Manifesto` da home, nenhuma cor
 * aqui é semântica (viraria dourado no escuro e sumiria no degradê): a tinta
 * é `brand-950`/`brand-900`. Sem coluna lateral — o rótulo corre em linha no
 * fio e a frase ocupa a largura da página.
 *
 * Estampa 02 (a home usa a 01), tom sobre tom, deslocada para o canto inferior
 * direito — posicionada por `left` (e não `right`) para o `AjusteEstampa`
 * mover o mesmo eixo que as classes escrevem. SVG com `unoptimized` pelo mesmo motivo do `Manifesto`.
 */
export function Proposito() {
  return (
    <Section surface="gold" size="lg" className="overflow-clip">
      <Image
        src={brandAssets.pattern[2]}
        alt=""
        aria-hidden
        width={ESTAMPA.w}
        height={ESTAMPA.h}
        unoptimized
        data-estampa="proposito-v2"
        className="pointer-events-none absolute -bottom-[18%] left-[48%] -z-10 w-[110vw] max-w-none lg:-bottom-[30%] lg:left-[75%] lg:w-[48vw]"
      />

      <AjusteEstampa
        alvo="proposito-v2"
        rotulo="estampa propósito v2"
        padrao={{ left: 48, bottom: -18, largura: 110 }}
      />

      <Container>
        <Fio numero="03" rotulo={sobre.proposito.titulo} as="h2" tom="gold" />

        <Revelar duracao={800}>
          <p className="mt-10 max-w-[30ch] text-[clamp(1.6875rem,0.99rem+2.7vw,3.375rem)] leading-[1.14] font-medium tracking-tight text-balance text-brand-950 md:mt-14">
            {sobre.proposito.paragrafo}
          </p>
        </Revelar>
      </Container>
    </Section>
  );
}
