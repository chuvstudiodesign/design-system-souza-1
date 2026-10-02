import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/site5/contato";
import { contatoPagina, home } from "@/lib/site5/conteudo";

import { colunaX, escala } from "./escala";

const cascata =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/**
 * Abertura da V3: o nome da página e o caminho mais curto para falar com a
 * equipe (único `shadow-gold`), alinhados à esquerda na coluna de leitura.
 * No mobile sobe sobre o degradê da foto.
 */
export function Abertura() {
  return (
    <div
      className={cn(
        "relative -mt-10 pb-16 sm:-mt-14 md:pb-20 lg:mt-0 lg:pt-44 lg:pb-24",
        colunaX
      )}
    >
      <div className="max-w-[42rem]">
        <h1 className={cn("max-w-[9ch] text-foreground", escala.display, cascata)}>
          {contatoPagina.titulo}
        </h1>

        <span
          aria-hidden
          className={cn("rule-gold mt-8 block h-px w-24 delay-150", cascata)}
        />

        <p
          className={cn(
            "mt-7 max-w-[34ch] text-pretty text-foreground/90 delay-200",
            escala.lead,
            cascata
          )}
        >
          {contatoPagina.subtitulo}
        </p>

        <Button
          asChild
          size="lg"
          className={cn(
            "mt-9 h-auto min-h-11.5 w-full whitespace-normal px-7 py-3 shadow-gold delay-300 sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            escala.rotulo,
            cascata
          )}
        >
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <WhatsAppGlyph className="size-5" />
            {home.contato.botao}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
