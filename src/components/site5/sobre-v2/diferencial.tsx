import Image from "next/image";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Fio } from "@/components/site5/sobre-v2/fio";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

const corpo =
  "max-w-[58ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-foreground/85";

/**
 * Nosso diferencial — a proximidade no atendimento mostrada na recepção, com
 * o texto pousado sobre a imagem como cartão de revista.
 *
 * Foto sangrada sem overlay (o cartão resolve a leitura). O cartão sobe sobre
 * a base da foto.
 *
 * Desvio da especificação: o cartão fica à ESQUERDA (colunas 1–7) e não à
 * direita. A foto é a DSC04008 (K+) espelhada pelo cliente em 29/09/2026 (PNG
 * na pasta do ensaio), para a marca refletida ler no sentido certo. À
 * esquerda, o que fica sob o cartão é a base do aparador; a marca fica livre.
 */
export function Diferencial() {
  const foto = fotosEspaco.recepcaoEspelhoInvertida;
  const [primeiro, segundo] = sobre.diferencial.paragrafos;

  return (
    <Section
      surface="base"
      className="overflow-clip pt-0 pb-24 md:pt-0 md:pb-32 lg:pt-0 lg:pb-40"
    >
      <Revelar
        variante="zoom"
        className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-[min(46rem,82svh)]"
      >
        <Image
          quality={95}
          src={foto.src}
          alt={foto.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_45%] lg:object-[50%_40%]"
        />
      </Revelar>

      <Container className="relative z-10 -mt-14 md:-mt-16 lg:-mt-56">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <Revelar className="min-w-0 rounded-3xl bg-card p-7 shadow-2xl ring-1 ring-border md:p-12 lg:col-span-7 lg:p-14">
            <Fio numero="05" />
            <h2 className="mt-6 font-display text-[clamp(1.4625rem,0.99rem+1.98vw,2.475rem)] leading-[1.12] tracking-[0.01em] text-balance uppercase">
              {sobre.diferencial.titulo}
            </h2>
            <div aria-hidden className="rule-gold mt-6 h-px w-16" />
            <p className={`mt-6 ${corpo}`}>{primeiro}</p>
            <p className={`mt-5 ${corpo}`}>{segundo}</p>
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
