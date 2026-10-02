"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Symbol } from "@/components/brand/logo";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { navegacao } from "@/components/site5/navegacao";
import { ProgressoScroll } from "@/components/site/motion/progresso-scroll";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contato, whatsappHref } from "@/lib/site5/contato";
import { home } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

/**
 * Header da variação 5 (herdado da variação 4).
 *
 * Herda a assinatura da variação 3 — símbolo vazado dourado com o nome
 * composto em Trajan, texto vivo em vez de wordmark em imagem. Duas diferenças:
 *
 * 1. Não há alternador de tema. Esta variação existe só no escuro.
 * 2. A barra está sempre acesa, inclusive no topo — fundo com desfoque, sombra
 *    e filete dourado não dependem de scroll. O hero segue correndo por baixo
 *    dela (o `-mt-18` do layout), então no topo o que desfoca é a própria
 *    fotografia, e a barra nunca aparece nem some no meio da rolagem.
 */

/** Marca o item ativo sem acender "Início" em toda rota filha. */
function estaAtivo(href: string, pathname: string) {
  return href === "/site" ? pathname === "/site" : pathname.startsWith(href);
}

export function HeaderMarca() {
  const pathname = usePathname();
  const [aberto, setAberto] = React.useState(false);

  return (
    <header className="tipo-100 sticky top-0 z-50 w-full bg-background/80 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center gap-3 px-6 md:px-10 xl:gap-4">
        <Link
          href="/site"
          className="flex min-h-11 min-w-0 items-center gap-3 rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {/* Ornamento: o nome ao lado já identifica a marca. */}
          <span aria-hidden className="inline-flex shrink-0">
            <Symbol variant="vazado-dourado" size={40} />
          </span>

          {/* Ajuste óptico: as capitulares da Trajan assentam alto em relação
              ao símbolo. O deslocamento é relativo à própria altura do texto,
              então acompanha a mudança de escala entre mobile e desktop. */}
          <span className="min-w-0 translate-y-[9%] truncate font-display text-[0.9375rem] leading-none min-[360px]:text-base tracking-[0.14em] whitespace-nowrap uppercase sm:text-xl lg:text-base lg:tracking-[0.12em] xl:text-xl xl:tracking-[0.14em]">
            {contato.nomeCurto.replace(" Advocacia", "")}
          </span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="flex items-center xl:gap-1">
            {navegacao.map((item) => {
              const ativo = estaAtivo(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={cn(
                      "relative block rounded-md px-2 py-2.5 text-base whitespace-nowrap transition-colors xl:px-3",
                      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                      ativo
                        ? "text-foreground"
                        : "text-foreground/70 hover:text-foreground"
                    )}
                  >
                    {item.rotulo}
                    {ativo && (
                      <span
                        aria-hidden
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gold-gradient"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-2 xl:ml-4">
          <Button
            asChild
            size="lg"
            className="hidden h-11 px-5 text-[0.9375rem] sm:inline-flex lg:px-4 xl:px-5 focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppGlyph className="size-4" />
              {home.contato.botao}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>

          <Sheet open={aberto} onOpenChange={setAberto}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-11 lg:hidden"
                aria-label="Abrir menu de navegação"
              >
                <MenuIcon aria-hidden />
              </Button>
            </SheetTrigger>

            {/* O painel sai por portal na raiz do documento, fora da árvore que
                o layout marca como escura — daí o `dark` repetido aqui. */}
            <SheetContent side="right" className="dark w-[min(22rem,88vw)] p-6">
              <SheetHeader className="p-0">
                <SheetTitle className="text-left font-display text-[0.9688rem] tracking-[0.16em]">
                  Navegação
                </SheetTitle>
              </SheetHeader>

              <nav aria-label="Principal (mobile)" className="mt-2">
                <ul className="flex flex-col gap-1">
                  {navegacao.map((item) => {
                    const ativo = estaAtivo(item.href, pathname);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setAberto(false)}
                          aria-current={ativo ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center rounded-lg px-3 text-base transition-colors",
                            ativo
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground hover:bg-muted"
                          )}
                        >
                          {item.rotulo}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
                <Button asChild size="lg" className="h-auto min-h-12 w-full py-3 text-base whitespace-normal focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppGlyph className="size-5" />
                    {home.contato.botao}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </Button>
                <a
                  href={contato.telefoneFixo.href}
                  className="inline-flex min-h-11 items-center justify-center text-center text-base text-muted-foreground underline-offset-4 hover:underline"
                >
                  {contato.telefoneFixo.exibicao}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Filete dourado de 1px — o mesmo `rule-gold` da identidade que fecha o
          bloco tipográfico do hero. Fica sob o progresso de leitura, que corre
          por cima como preenchimento. */}
      <span aria-hidden className="rule-gold absolute inset-x-0 bottom-0 h-px" />

      <ProgressoScroll />
    </header>
  );
}
