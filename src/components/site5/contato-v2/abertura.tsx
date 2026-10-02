import { BrandSymbol } from "@/components/brand/logo";
import { Container } from "@/components/site/layout/section";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/site5/contato";
import { contatoPagina, home } from "@/lib/site5/conteudo";

import { escala } from "./escala";

const cascata =
  "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

/** Sumário na ordem do documento, com os textos dos próprios H2. */
const sumario = [
  { numero: "I", href: "#mensagem", texto: contatoPagina.formulario.titulo },
  { numero: "II", href: "#atendimento", texto: contatoPagina.atendimento.titulo },
  { numero: "III", href: "#endereco", texto: contatoPagina.endereco.titulo },
  { numero: "IV", href: "#redes", texto: contatoPagina.redes.titulo },
] as const;

/**
 * Abertura da V2 "Carta": o cabeçalho de um papel timbrado — monograma, nome
 * da página, filete, apresentação, o WhatsApp (único `shadow-gold`) e o
 * sumário das quatro partes. Tipográfica, sem foto.
 *
 * O sumário é rotulado pelo H1: a microcópia "Seções desta página" prevista na
 * spec (§1) não está registrada em `conteudo.ts`, então vale o fallback.
 */
export function Abertura() {
  return (
    <section className="relative isolate bg-background">
      {/* Container padrão (não `narrow`): o H1 precisa de ~900px para caber
          numa linha a partir do `lg`; os demais itens têm medida própria. */}
      <Container
        className="pt-28 pb-16 text-center md:pt-40 md:pb-20 lg:pt-44 lg:pb-24"
      >
        <span aria-hidden className={cn("mx-auto block w-fit", cascata)}>
          <BrandSymbol size={44} />
        </span>

        <h1
          id="titulo-contato"
          className={cn("mt-8 text-foreground delay-100", escala.display, cascata)}
        >
          {contatoPagina.titulo}
        </h1>

        <span
          aria-hidden
          className={cn("rule-gold mx-auto mt-8 block h-px w-32 delay-150", cascata)}
        />

        <p
          className={cn(
            "mx-auto mt-8 max-w-[36ch] text-balance text-foreground/90 delay-200",
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
            "mt-10 h-auto min-h-11.5 w-full whitespace-normal px-7 py-3 shadow-gold delay-300 sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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

        <nav
          aria-labelledby="titulo-contato"
          className={cn(
            "mx-auto mt-14 max-w-2xl border-y border-border delay-300",
            cascata
          )}
        >
          <ol className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
            {sumario.map((item) => (
              <li key={item.href} className="min-w-0 bg-background">
                <a
                  href={item.href}
                  className="flex h-full min-h-16 flex-col items-center justify-start gap-1 rounded-md px-3 py-3 text-center transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none"
                >
                  <span
                    aria-hidden
                    className="font-display text-[0.9688rem] tracking-[0.22em] text-gold-400"
                  >
                    {item.numero}
                  </span>
                  <span className={cn("text-balance text-foreground", escala.rotulo)}>
                    {item.texto}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </section>
  );
}
