import Image from "next/image";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Regua } from "@/components/site5/sobre-v3/regua";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

const corpo =
  "max-w-[48ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-foreground/85";

/**
 * Nossa experiência — texto de um lado, o espaço de atendimento do outro, na
 * mesma grade. Foto contida e emoldurada à direita; o texto se alinha à base
 * dela. O título mora na régua.
 */
export function Experiencia() {
  const foto = fotosEspaco.salaReuniao1;
  const [primeiro, segundo] = sobre.experiencia.paragrafos;

  return (
    <Section surface="muted" size="lg">
      <Container>
        <Regua numero="02" rotulo={sobre.experiencia.titulo} as="h2" />

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-16 lg:grid-cols-12 lg:items-end">
          <Revelar className="min-w-0 lg:col-span-5">
            <p className={corpo}>{primeiro}</p>
            <div aria-hidden className="my-6 h-px w-full bg-border" />
            <p className={corpo}>{segundo}</p>
          </Revelar>

          <Revelar
            variante="zoom"
            className="relative aspect-[3/2] min-w-0 overflow-hidden rounded-3xl ring-1 ring-border lg:col-span-7"
          >
            <Image
              quality={95}
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(max-width: 1023px) calc(100vw - 3rem), 43rem"
              className="object-cover object-[50%_55%]"
            />
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
