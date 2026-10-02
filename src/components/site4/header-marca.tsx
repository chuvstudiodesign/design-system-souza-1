"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, PhoneIcon } from "lucide-react";

import { Symbol } from "@/components/brand/logo";
import { navegacao } from "@/components/site/layout/navegacao";
import { ProgressoScroll } from "@/components/site/motion/progresso-scroll";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { contato, whatsappHref } from "@/lib/site/contato";
import { cn } from "@/lib/utils";

/**
 * Header da variação 4.
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
  return href === "/site-v1" ? pathname === "/site-v1" : pathname.startsWith(href);
}

export function HeaderMarca() {
  const pathname = usePathname();
  const [aberto, setAberto] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center gap-4 px-6 md:px-10">
        <Link
          href="/site-v4"
          className="flex shrink-0 items-center gap-3 rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {/* Ornamento: o nome ao lado já identifica a marca. */}
          <span aria-hidden className="inline-flex">
            <Symbol variant="vazado-dourado" size={40} />
          </span>

          {/* Ajuste óptico: as capitulares da Trajan assentam alto em relação
              ao símbolo. O deslocamento é relativo à própria altura do texto,
              então acompanha a mudança de escala entre mobile e desktop. */}
          <span className="translate-y-[9%] font-display text-base leading-none tracking-[0.14em] whitespace-nowrap uppercase sm:text-xl">
            {contato.nomeCurto.replace(" Advocacia", "")}
          </span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navegacao.map((item) => {
              const ativo = estaAtivo(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={cn(
                      "relative block rounded-md px-3 py-2 text-[0.9375rem] transition-colors",
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

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <Button
            asChild
            size="lg"
            className="hidden h-11 px-5 text-[0.9375rem] sm:inline-flex"
          >
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <PhoneIcon aria-hidden />
              Falar com o escritório
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
                <SheetTitle className="text-left font-display text-sm tracking-[0.16em]">
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
                <Button asChild size="lg" className="h-12 w-full text-base">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PhoneIcon aria-hidden />
                    Falar no WhatsApp
                  </a>
                </Button>
                <a
                  href={contato.telefoneFixo.href}
                  className="text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
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
