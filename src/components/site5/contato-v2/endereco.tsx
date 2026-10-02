import Image from "next/image";
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";

import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { MapaEscritorio } from "@/components/site5/mapa-escritorio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contato, mapaLinkHref } from "@/lib/site5/contato";
import { contatoPagina, fotosEspaco } from "@/lib/site5/conteudo";

import { Cabecalho } from "./cabecalho";
import { escala } from "./escala";

const { endereco } = contato;
// Mesma foto do "Entre em contato" da home (IMG_4032), a pedido do cliente (02/OUT/2026).
const foto = fotosEspaco.fachadaHdr4032;

/**
 * III — Endereço, em navy. O endereço centrado como num envelope e, abaixo,
 * a fachada em largura cheia nas proporções originais (16:9, sem corte) com o
 * mapa embaixo — pedido do cliente em 29/09/2026.
 */
export function Endereco() {
  return (
    <Section
      surface="navy"
      size="md"
      id="endereco"
      className="scroll-mt-20 overflow-clip"
      aria-labelledby="titulo-endereco"
    >
      <Container>
        <Revelar>
          <Cabecalho
            numero="III"
            tom="navy"
            id="titulo-endereco"
            titulo={contatoPagina.endereco.titulo}
          />
        </Revelar>

        <Revelar atraso={60} className="text-center">
          <address className="mx-auto mt-8 max-w-[40ch] not-italic">
            <span className={cn("block text-navy-foreground", escala.lead)}>
              {endereco.nome}
            </span>
            <span className={cn("mt-2 block text-navy-foreground/80", escala.corpo)}>
              {endereco.logradouro}
            </span>
            <span className={cn("block text-navy-foreground/80", escala.corpo)}>
              {endereco.bairroCidade}
            </span>
            <span className={cn("block text-navy-foreground/80", escala.corpo)}>
              {endereco.cep}
            </span>
          </address>

          <Button
            asChild
            variant="outline"
            size="lg"
            className={cn(
              "mx-auto mt-8 flex h-auto min-h-11 w-full whitespace-normal border-navy-foreground/30 bg-transparent px-5 py-3 text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground sm:w-fit dark:border-navy-foreground/30 dark:bg-transparent dark:hover:bg-navy-foreground/10 focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
              escala.rotulo
            )}
          >
            <a href={mapaLinkHref} target="_blank" rel="noopener noreferrer">
              <MapPinIcon aria-hidden className="size-5" />
              {contatoPagina.formulario.ui.abrirMapa}
              <ArrowUpRightIcon aria-hidden className="size-4" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>
        </Revelar>

        {/* Pilha vertical: foto em cima, nas proporções originais (sem
            corte), e o mapa embaixo. */}
        <div className="mt-14 flex flex-col gap-4 md:mt-16 md:gap-5">
          <Revelar
            variante="zoom"
            className="min-w-0 overflow-hidden rounded-2xl ring-1 ring-navy-foreground/15"
          >
            <Image
              quality={95}
              src={foto.src}
              alt={foto.alt}
              width={foto.width}
              height={foto.height}
              sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc(100vw - 5rem), 75rem"
              className="block h-auto w-full"
            />
          </Revelar>

          <MapaEscritorio className="relative h-[20rem] min-w-0 rounded-2xl ring-1 ring-navy-foreground/15 md:h-[24rem] lg:h-[26rem]" />
        </div>
      </Container>
    </Section>
  );
}
