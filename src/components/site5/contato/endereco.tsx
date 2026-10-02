import Image from "next/image";
import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";

import { Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { MapaEscritorio } from "@/components/site5/mapa-escritorio";
import { Button } from "@/components/ui/button";
import { contato, mapaLinkHref } from "@/lib/site5/contato";
import { contatoPagina, fotosEspaco } from "@/lib/site5/conteudo";

const { endereco } = contato;
const foto = fotosEspaco.fachadaDia;

/**
 * Endereço: texto e fachada à esquerda, mapa sangrando até a borda direita.
 *
 * Sem Container — a coluna de texto reproduz o recuo do container com
 * `pl-[max(...)]`, para alinhar com o resto da página em telas largas
 * enquanto o mapa corre até a borda.
 */
export function Endereco() {
  return (
    <Section
      surface="base"
      className="overflow-clip py-0 md:py-0 lg:py-0"
      aria-labelledby="titulo-endereco"
    >
      <div className="grid grid-cols-1 lg:min-h-[40rem] lg:grid-cols-12">
        <Revelar className="min-w-0 px-6 py-20 md:px-10 md:py-24 lg:col-span-5 lg:py-28 lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-var(--container-7xl))/2+2.5rem))]">
          <h2
            id="titulo-endereco"
            className="font-display text-[clamp(1.35rem,0.9rem+1.8vw,2.25rem)] leading-[1.15] tracking-tight uppercase"
          >
            {contatoPagina.endereco.titulo}
          </h2>

          <address className="mt-8 text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] not-italic">
            <span className="block text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] font-medium">
              {endereco.nome}
            </span>
            <span className="mt-2 block leading-relaxed text-foreground/85">
              {endereco.logradouro}
            </span>
            <span className="block leading-relaxed text-foreground/85">
              {endereco.bairroCidade}
            </span>
            <span className="block leading-relaxed text-foreground/85">
              {endereco.cep}
            </span>
          </address>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-8 h-auto min-h-11 w-full whitespace-normal px-5 py-3 text-base sm:w-auto"
          >
            <a href={mapaLinkHref} target="_blank" rel="noopener noreferrer">
              <MapPinIcon aria-hidden className="size-5" />
              {contatoPagina.formulario.ui.abrirMapa}
              <ArrowUpRightIcon aria-hidden className="size-4" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>

          <Revelar
            variante="zoom"
            className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border lg:aspect-[3/2]"
          >
            <Image
              quality={95}
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(max-width: 1023px) calc(100vw - 3rem), 32rem"
              className="object-cover object-[68%_55%]"
            />
          </Revelar>
        </Revelar>

        <MapaEscritorio className="relative h-[24rem] border-t border-border lg:col-span-7 lg:h-auto lg:min-h-full lg:border-t-0 lg:border-l" />
      </div>
    </Section>
  );
}
