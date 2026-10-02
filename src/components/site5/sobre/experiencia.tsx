import Image from "next/image";

import { Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

/**
 * Nossa experiência — a equipe trabalhando, sangrando à esquerda, responde ao
 * texto sobre capacidade técnica à direita. Espelha o hero (foto à direita),
 * o que dá o zigue-zague da página.
 *
 * Sem padding vertical na seção: a foto encosta nas duas vizinhas. O texto é
 * alinhado à grade do container pelo `pr-[max(...)]`.
 */
export function Experiencia() {
  const foto = fotosEspaco.equipeTrabalhando;
  const [lead, corpo] = sobre.experiencia.paragrafos;

  return (
    <Section surface="base" className="overflow-clip py-0 md:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <Revelar
          variante="zoom"
          className="relative aspect-[3/2] min-w-0 lg:col-span-7 lg:aspect-auto lg:min-h-[38rem]"
        >
          <Image
            quality={95}
            src={foto.src}
            alt={foto.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 58vw"
            className="object-cover object-[45%_50%]"
          />
        </Revelar>

        <Revelar className="min-w-0 self-center px-6 py-16 md:px-10 md:py-24 lg:col-span-5 lg:py-32 lg:pr-[max(2.5rem,calc((100vw-var(--container-7xl))/2+2.5rem))] lg:pl-16">
          <p
            aria-hidden
            className="font-display text-xs tracking-[0.22em] text-gold-400"
          >
            02
          </p>

          <h2 className="mt-4 font-display text-[clamp(1.35rem,0.9rem+1.8vw,2.25rem)] leading-[1.15] tracking-tight text-balance uppercase">
            {sobre.experiencia.titulo}
          </h2>

          <div aria-hidden className="rule-gold mt-6 h-px w-16" />

          <p className="mt-6 max-w-[48ch] text-[clamp(1.0125rem,0.945rem+0.315vw,1.1813rem)] leading-relaxed text-pretty text-foreground/90">
            {lead}
          </p>
          <p className="mt-5 max-w-[48ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-muted-foreground">
            {corpo}
          </p>
        </Revelar>
      </div>
    </Section>
  );
}
