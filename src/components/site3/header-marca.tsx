"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, PhoneIcon } from "lucide-react";

import { AssinaturaHorizontal } from "@/components/brand/logo";
import { navegacao } from "@/components/site/layout/navegacao";
import { ProgressoScroll } from "@/components/site/motion/progresso-scroll";
import { ModeToggle } from "@/components/mode-toggle";
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
 * Header da variação 3.
 *
 * Difere do header principal apenas na assinatura: em vez da assinatura
 * vertical em imagem, a assinatura horizontal — símbolo vazado dourado ao lado
 * do nome composto em Trajan.
 *
 * A geometria dessa composição virou o componente `AssinaturaHorizontal`, em
 * `@/components/brand/logo`, e está documentada na página Fundação › Logotipo
 * do styleguide. Ela nasceu aqui; mantê-la aqui inline faria a versão oficial
 * da marca depender de um header de variação de site.
 */

/** Marca o item ativo sem acender "Início" em toda rota filha. */
function estaAtivo(href: string, pathname: string) {
  return href === "/site-v1" ? pathname === "/site-v1" : pathname.startsWith(href);
}

export function HeaderMarca() {
  const pathname = usePathname();
  const [aberto, setAberto] = React.useState(false);
  const [rolou, setRolou] = React.useState(false);

  React.useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        "bg-background/80 backdrop-blur-xl backdrop-saturate-150",
        // A divisória fixa aqui é o filete dourado abaixo; a borda neutra do
        // header principal sairia empilhada com ele, somando duas linhas.
        rolou ? "shadow-sm" : null
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center gap-4 px-6 md:px-10">
        <Link
          href="/site-v3"
          className="flex shrink-0 items-center rounded-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <AssinaturaHorizontal variant="vazado-dourado" />
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
                        : "text-muted-foreground hover:text-foreground"
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

          <ModeToggle />

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

            <SheetContent side="right" className="w-[min(22rem,88vw)] p-6">
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
          bloco tipográfico do hero: dourado no centro, dissolvendo em
          transparente nas duas pontas. Fica sob o progresso de leitura, que
          corre por cima como preenchimento. */}
      <span
        aria-hidden
        className="rule-gold absolute inset-x-0 bottom-0 h-px"
      />

      <ProgressoScroll />
    </header>
  );
}
