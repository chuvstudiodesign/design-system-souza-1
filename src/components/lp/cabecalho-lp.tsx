import { Symbol } from "@/components/brand/logo";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { contato } from "@/lib/site5/contato";

/**
 * Cabeçalho das landing pages.
 *
 * Sem menu de navegação, de propósito: numa página de anúncio cada link a mais
 * é uma saída antes do contato. A marca não é link pelo mesmo motivo — só o
 * botão de WhatsApp é clicável.
 */
export function CabecalhoLp({
  whatsappHref,
  rotuloBotao,
}: {
  whatsappHref: string;
  rotuloBotao: string;
}) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/85 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-6 md:h-18 md:px-10">
        <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span aria-hidden className="inline-flex shrink-0">
            <Symbol variant="vazado-dourado" size={32} />
          </span>
          {/* No celular a entreletra fecha um pouco para o nome inteiro caber
              ao lado do botão em 360px. */}
          <span className="min-w-0 translate-y-[9%] truncate font-display text-[0.875rem] leading-none tracking-[0.08em] whitespace-nowrap uppercase min-[400px]:tracking-[0.12em] sm:text-lg sm:tracking-[0.14em]">
            {contato.nomeCurto.replace(" Advocacia", "")}
          </span>
        </span>

        <Button
          asChild
          size="sm"
          className="ml-auto h-10 shrink-0 px-3 text-sm sm:px-4"
        >
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <WhatsAppGlyph className="size-4" />
            {/* No celular estreito o texto do documento não cabe: fica só
                "WhatsApp", e o nome completo vai para o leitor de tela. */}
            <span className="hidden sm:inline">{rotuloBotao}</span>
            <span aria-hidden className="sm:hidden">
              WhatsApp
            </span>
            <span className="sr-only sm:hidden">{rotuloBotao}</span>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </Button>
      </div>
      <div aria-hidden className="rule-gold h-px w-full" />
    </header>
  );
}
