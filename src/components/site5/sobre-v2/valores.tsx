import Image from "next/image";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Fio } from "@/components/site5/sobre-v2/fio";
import { fotosEspaco, sobre } from "@/lib/site5/conteudo";

/**
 * Nossos valores — os seis valores lidos como índice de revista: grandes, um
 * por linha, numerados.
 *
 * A coluna esquerda (fio + foto vertical) fica presa ao topo enquanto o
 * índice rola, a partir de `lg`. A foto é contraponto, não protagonista: só
 * existe em `lg+`, e como está oculta abaixo disso o carregamento lazy nem a
 * baixa no celular.
 */
export function Valores() {
  const foto = fotosEspaco.salaEspera;

  return (
    <Section surface="navy" size="lg" className="overflow-clip">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <Fio numero="04" rotulo={sobre.valores.titulo} as="h2" tom="navy" />

            <Revelar
              variante="zoom"
              className="relative mt-12 hidden aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-navy-foreground/15 lg:block"
            >
              <Image
                quality={95}
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 1023px) 1px, 24rem"
                className="object-cover object-[50%_60%]"
              />
            </Revelar>
          </div>

          <ul className="min-w-0 lg:col-span-7 lg:col-start-6">
            {sobre.valores.itens.map((valor, i) => (
              <Revelar key={valor} asChild atraso={i * 70}>
                <li className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-x-4 border-t border-navy-foreground/15 py-6 last:border-b md:grid-cols-[4rem_minmax(0,1fr)] md:py-7">
                  <span
                    aria-hidden
                    className="font-display text-[0.9688rem] tracking-[0.22em] text-gold-400"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[clamp(1.35rem,0.99rem+1.44vw,2.25rem)] leading-tight font-medium tracking-tight text-balance text-navy-foreground">
                    {valor}
                  </span>
                </li>
              </Revelar>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
