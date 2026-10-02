import Image from "next/image";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Fio } from "@/components/site5/sobre-v2/fio";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

const corpo =
  "max-w-[56ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-foreground/85";

/**
 * Nossa experiência — a equipe no trabalho real, em página dupla de revista.
 *
 * Cabeçalho 5/12 + texto 6/12 e, abaixo, um díptico largo 5/7 que mantém a
 * proporção em todas as larguras: é uma unidade visual, não empilha.
 */
export function Experiencia() {
  // IMG_3947 e IMG_3987 do site antigo, a pedido do cliente (02/OUT/2026).
  const esquerda = fotosEspaco.salaHdr3947;
  const direita = fotosEspaco.recepcaoHdr3987;
  const [primeiro, segundo] = sobre.experiencia.paragrafos;

  return (
    <Section surface="base" size="lg" className="overflow-clip">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-12">
          <Revelar className="min-w-0 lg:col-span-5">
            <Fio numero="02" />
            <h2 className="mt-6 font-display text-[clamp(1.4625rem,0.99rem+1.98vw,2.475rem)] leading-[1.12] tracking-[0.01em] text-balance uppercase">
              {sobre.experiencia.titulo}
            </h2>
            <div aria-hidden className="rule-gold mt-6 h-px w-16" />
          </Revelar>

          <Revelar atraso={100} className="min-w-0 lg:col-span-6 lg:col-start-7 lg:pt-12">
            <p className={corpo}>{primeiro}</p>
            <p className={`mt-5 ${corpo}`}>{segundo}</p>
          </Revelar>
        </div>
      </Container>

      <Container width="wide" className="mt-14 md:mt-20">
        <div className="grid h-[clamp(17rem,44vw,42rem)] grid-cols-12 gap-2 md:gap-3">
          <Revelar
            variante="zoom"
            className="relative col-span-5 min-w-0 overflow-hidden rounded-2xl md:rounded-3xl"
          >
            <Image
              quality={95}
              src={esquerda.src}
              alt={esquerda.alt}
              fill
              sizes="(max-width: 1023px) 42vw, min(38vw, 36rem)"
              className="object-cover object-[45%_50%]"
            />
          </Revelar>

          <Revelar
            variante="zoom"
            atraso={120}
            className="relative col-span-7 min-w-0 overflow-hidden rounded-2xl md:rounded-3xl"
          >
            <Image
              quality={95}
              src={direita.src}
              alt={direita.alt}
              fill
              sizes="(max-width: 1023px) 58vw, min(55vw, 52rem)"
              className="object-cover object-center"
            />
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
