import Image from "next/image";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

/**
 * Nosso diferencial — a proximidade no atendimento, respondida pela sala onde
 * ele acontece.
 *
 * Texto à esquerda (6), par de fotos à direita (5). A foto principal é a sala
 * de atendimento em retrato; a de apoio (recepção) entra só a partir de `lg`,
 * sobreposta ao canto inferior esquerda da principal com um anel da cor do
 * fundo, para ler como recorte e não como colagem.
 */
export function Diferencial() {
  const principal = fotosEspaco.salaAtendimentoVertical;
  const apoio = fotosEspaco.recepcaoPoltronas;
  const [lead, corpo] = sobre.diferencial.paragrafos;

  return (
    <Section surface="base" size="lg" className="overflow-clip">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12 lg:items-center">
          <Revelar className="min-w-0 lg:col-span-6">
            <p
              aria-hidden
              className="font-display text-xs tracking-[0.22em] text-gold-400"
            >
              05
            </p>

            <h2 className="mt-4 font-display text-[clamp(1.35rem,0.9rem+1.8vw,2.25rem)] leading-[1.15] tracking-tight text-balance uppercase">
              {sobre.diferencial.titulo}
            </h2>

            <div aria-hidden className="rule-gold mt-6 h-px w-16" />

            <p className="mt-6 max-w-[52ch] text-[clamp(1.0125rem,0.945rem+0.315vw,1.1813rem)] leading-relaxed text-pretty text-foreground/90">
              {lead}
            </p>
            <p className="mt-5 max-w-[56ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-muted-foreground">
              {corpo}
            </p>
          </Revelar>

          <div className="relative min-w-0 lg:col-span-5 lg:col-start-8 lg:pb-12">
            <Revelar
              variante="zoom"
              className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-xl ring-1 ring-border lg:aspect-[4/5]"
            >
              <Image
                quality={95}
                src={principal.src}
                alt={principal.alt}
                fill
                sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 38vw, 481px"
                className="object-cover object-[50%_60%]"
              />
            </Revelar>

            <Revelar
              variante="zoom"
              atraso={120}
              className="absolute -bottom-12 -left-16 hidden aspect-[3/2] w-[55%] overflow-hidden rounded-2xl shadow-lg ring-4 ring-background lg:block"
            >
              <Image
                quality={95}
                src={apoio.src}
                alt={apoio.alt}
                fill
                sizes="(max-width: 1279px) 21vw, 265px"
                className="object-cover"
              />
            </Revelar>
          </div>
        </div>
      </Container>
    </Section>
  );
}
