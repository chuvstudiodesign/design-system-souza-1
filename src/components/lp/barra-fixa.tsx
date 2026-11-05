"use client";

import * as React from "react";

import { WhatsAppGlyph } from "@/components/site5/glifos";
import { cn } from "@/lib/utils";

/**
 * Barra fixa de WhatsApp no rodapé da tela, só no celular (V2 e V3).
 *
 * Entra quando o botão do hero (`#hero-cta`) sai de vista — antes disso ela
 * duplicaria o botão visível — e sai de novo quando a chamada final aparece,
 * que já tem o próprio botão. Assim o contato fica sempre a um toque, sem
 * nunca haver dois CTAs iguais na mesma tela.
 */
export function BarraFixa({ href, rotulo }: { href: string; rotulo: string }) {
  const [visivel, setVisivel] = React.useState(false);

  React.useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const fim = document.getElementById("chamada-final");
    let quadro = 0;
    const verificar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const passouHero = hero ? hero.getBoundingClientRect().bottom < 0 : true;
        const chegouFim = fim
          ? fim.getBoundingClientRect().top < window.innerHeight * 0.8
          : false;
        setVisivel(passouHero && !chegouFim);
      });
    };
    verificar();
    window.addEventListener("scroll", verificar, { passive: true });
    window.addEventListener("resize", verificar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", verificar);
      window.removeEventListener("resize", verificar);
    };
  }, []);

  return (
    <div
      aria-hidden={!visivel}
      inert={!visivel}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden",
        visivel ? "translate-y-0" : "translate-y-full"
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-base font-medium text-primary-foreground shadow-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <WhatsAppGlyph className="size-5" />
        {rotulo}
        <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
      </a>
    </div>
  );
}
