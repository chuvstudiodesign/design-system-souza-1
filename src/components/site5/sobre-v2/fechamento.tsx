import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Fio } from "@/components/site5/sobre-v2/fio";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/site5/contato";
import { fotosEspaco, home, sobre } from "@/lib/site5/conteudo";

/**
 * Fecho da V2 — contracapa: a trajetória numa coluna centrada, o convite para
 * conhecer as pessoas e, logo abaixo, as pessoas.
 *
 * "Conheça nossos profissionais" é o CTA primário (único `shadow-gold` da
 * página); o WhatsApp fica como secundário, em outline. "Fechamento" é nome
 * estrutural do documento e não aparece — o fio 06 vai sem rótulo.
 *
 * A panorâmica para em 80rem: o original tem 2036px e amoleceria acima disso
 * em tela 2x.
 */
export function Fechamento() {
  const foto = fotosEspaco.equipeGrupo;

  return (
    <Section surface="muted" size="lg" className="overflow-clip">
      <Container>
        <Revelar className="mx-auto max-w-3xl text-center">
          <Fio numero="06" alinhamento="centro" />

          <h2 className="mx-auto mt-8 max-w-[22ch] text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance">
            {sobre.fechamento.titulo}
          </h2>

          <div aria-hidden className="rule-gold mx-auto mt-8 h-px w-24" />

          <p className="mx-auto mt-8 max-w-[56ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-foreground/85">
            {sobre.fechamento.paragrafo}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-11.5 w-full px-7 text-base shadow-gold focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
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
              className="h-11.5 w-full px-5 text-base sm:w-auto"
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <WhatsAppGlyph className="size-5" />
                {home.contato.botao}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </Button>
          </div>
        </Revelar>
      </Container>

      <Container width="wide" className="mt-16 md:mt-24">
        <Revelar
          variante="zoom"
          className="relative mx-auto aspect-[3/2] max-w-[80rem] overflow-hidden rounded-2xl md:aspect-[21/9] md:rounded-3xl"
        >
          <Image
            quality={95}
            src={foto.src}
            alt={foto.alt}
            fill
            sizes="(max-width: 1023px) calc(100vw - 3rem), min(calc(100vw - 5rem), 80rem)"
            className="object-cover object-[56%_40%]"
          />
        </Revelar>
      </Container>
    </Section>
  );
}
