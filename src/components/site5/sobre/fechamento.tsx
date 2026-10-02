import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Trilho } from "@/components/site5/trilho";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/site5/contato";
import { fotosEspaco, home, sobre } from "@/lib/site5/conteudo";

/**
 * Fechamento — as sócias reunidas abrem o bloco em panorâmica, e o texto
 * encerra a página levando às pessoas: "Conheça nossos profissionais" é o CTA
 * primário (único `shadow-gold` da página). O WhatsApp fica como secundário,
 * em outline, para quem já quer falar.
 *
 * No celular a panorâmica sangra de borda a borda; a partir de `md` ganha
 * margem e cantos.
 */
export function Fechamento() {
  const foto = fotosEspaco.equipeGrupo;

  return (
    <Section
      surface="muted"
      className="overflow-clip pt-0 pb-24 md:pt-20 md:pb-32 lg:pb-40"
    >
      <div className="mx-auto max-w-[90rem] md:px-10">
        <Revelar
          variante="zoom"
          className="relative aspect-[3/2] overflow-hidden md:aspect-[21/9] md:rounded-3xl"
        >
          <Image
            quality={95}
            src={foto.src}
            alt={foto.alt}
            fill
            sizes="(max-width: 1439px) 100vw, 1360px"
            className="object-cover object-[50%_40%]"
          />
        </Revelar>
      </div>

      <Container className="mt-14 md:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          {/* Só o numeral: "Fechamento" é nome estrutural do documento do
              cliente, não texto para o visitante. */}
          <Trilho numero="06" className="lg:col-span-3" />

          <Revelar className="min-w-0 lg:col-span-8 lg:col-start-5">
            <h2 className="max-w-[22ch] text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance">
              {sobre.fechamento.titulo}
            </h2>

            <p className="mt-6 max-w-[58ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-muted-foreground">
              {sobre.fechamento.paragrafo}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
        </div>
      </Container>
    </Section>
  );
}
