import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Regua } from "@/components/site5/sobre-v3/regua";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/site5/contato";
import { fotosEspaco, home, sobre } from "@/lib/site5/conteudo";

/**
 * Fecho da V3 — a planta fecha como abriu, em banda navy: as sócias reunidas
 * no topo de uma moldura de células e o convite logo abaixo.
 *
 * "Conheça nossos profissionais" é o CTA primário (único `shadow-gold` da
 * página); WhatsApp secundário em outline. "Fechamento" não aparece — a régua
 * 06 vai sem rótulo. Botões em largura total da célula: a coluna dos botões é
 * a base da planta.
 */
export function Fechamento() {
  const foto = fotosEspaco.equipeGrupo;

  return (
    <Section surface="navy" size="lg">
      <Container>
        <Regua numero="06" tom="navy" />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-navy-foreground/15 ring-1 ring-navy-foreground/15 md:mt-16 lg:grid-cols-12">
          <Revelar
            variante="zoom"
            className="relative aspect-[3/2] min-w-0 md:aspect-[21/9] lg:col-span-12"
          >
            <Image
              quality={95}
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(max-width: 1023px) calc(100vw - 3rem), 75rem"
              className="object-cover object-[56%_40%]"
            />
          </Revelar>

          <div className="min-w-0 bg-navy p-7 md:p-10 lg:col-span-7 lg:p-12">
            <Revelar>
              <h2 className="max-w-[20ch] text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance">
                {sobre.fechamento.titulo}
              </h2>
            </Revelar>
          </div>

          <div className="min-w-0 bg-navy p-7 md:p-10 lg:col-span-5 lg:p-12">
            <Revelar atraso={100}>
              <p className="max-w-[46ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-navy-foreground/85">
                {sobre.fechamento.paragrafo}
              </p>

              <div className="mt-10 flex flex-col gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-11.5 w-full px-7 text-base shadow-gold focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  <Link href="/site/profissionais">
                    {sobre.fechamento.botao}
                    <ArrowRightIcon aria-hidden />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11.5 w-full border-navy-foreground/30 bg-transparent px-5 text-base text-navy-foreground hover:bg-navy-foreground/10"
                >
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <WhatsAppGlyph className="size-5" />
                    {home.contato.botao}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </Button>
              </div>
            </Revelar>
          </div>
        </div>
      </Container>
    </Section>
  );
}
