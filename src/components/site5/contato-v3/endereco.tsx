import { ArrowUpRightIcon, MapPinIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import { MapaEscritorio } from "@/components/site5/mapa-escritorio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contato, mapaLinkHref } from "@/lib/site5/contato";
import { contatoPagina } from "@/lib/site5/conteudo";

import { escala } from "./escala";
import { Movimento } from "./movimento";

const { endereco } = contato;

/**
 * 03 — Endereço. O endereço, o mapa emoldurado na própria coluna e o link
 * para o Google Maps logo abaixo. Sem foto da fachada: a foto da página é a
 * recepção (uma só, decisão da V3).
 */
export function Endereco() {
  return (
    <Movimento
      id="endereco"
      numero="03"
      superficie="muted"
      titulo={contatoPagina.endereco.titulo}
    >
      <Revelar atraso={80}>
        <address className="mt-8 not-italic">
          <span className={cn("block text-foreground", escala.lead)}>{endereco.nome}</span>
          <span className={cn("mt-2 block", escala.corpo)}>{endereco.logradouro}</span>
          <span className={cn("block", escala.corpo)}>{endereco.bairroCidade}</span>
          <span className={cn("block", escala.corpo)}>{endereco.cep}</span>
        </address>
      </Revelar>

      <MapaEscritorio className="relative mt-10 aspect-[4/3] w-full rounded-2xl ring-1 ring-border sm:aspect-[16/10]" />

      <Button
        asChild
        variant="outline"
        size="lg"
        className={cn(
          "mt-6 h-auto min-h-11 w-full whitespace-normal px-5 py-3 sm:w-auto focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
    </Movimento>
  );
}
