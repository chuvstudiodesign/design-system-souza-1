import Image from "next/image";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { tipo } from "@/components/site5/profissionais-v3/tipos";
import { Trilho } from "@/components/site5/trilho";
import { cn } from "@/lib/utils";
import { fotosEspaco, profissionaisIntro } from "@/lib/site5/conteudo";

/**
 * Introdução em navy — a equipe como grupo. A foto das sócias fica contida
 * na seção, com o mesmo respiro embaixo que a seção tem em cima (o
 * transbordo para a seção seguinte foi retirado em 24/09/2026: a borda
 * inferior colada na foto parecia um erro).
 *
 * A foto tem 2036 px: nunca sangra, fica contida em `max-w-7xl`.
 */
export function IntroducaoNavy() {
  const foto = fotosEspaco.equipeGrupo;

  return (
    <Section surface="navy" size="lg">
      <Container>
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <Trilho numero="01" tom="navy" className="lg:col-span-3" />
          <Revelar className="min-w-0 lg:col-span-8 lg:col-start-5">
            <h2 className={cn(tipo.h2, "max-w-[22ch]")}>
              {profissionaisIntro.introTitulo}
            </h2>
            <p
              className={cn(
                tipo.lead,
                "mt-8 max-w-[56ch] text-navy-foreground/85"
              )}
            >
              {profissionaisIntro.introParagrafo}
            </p>
          </Revelar>
        </div>

        <Revelar
          variante="zoom"
          className="relative -mx-6 mt-14 aspect-[3/2] overflow-hidden shadow-2xl md:mx-0 md:mt-16 md:aspect-[2036/860] md:rounded-3xl md:ring-1 md:ring-navy-foreground/10 lg:mt-20"
        >
          <Image
            quality={95}
            src={foto.src}
            alt={foto.alt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) calc(100vw - 5rem), 1200px"
            className="object-cover object-[55%_35%] md:object-center"
          />
        </Revelar>
      </Container>
    </Section>
  );
}
