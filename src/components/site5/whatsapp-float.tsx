"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { WhatsAppGlyph } from "@/components/site5/glifos";
import { whatsappHref } from "@/lib/site5/contato";
import { home } from "@/lib/site5/conteudo";

/**
 * Botão flutuante de WhatsApp — o canal real deste público.
 *
 * Veste a marca em vez do verde do aplicativo: degradê dourado oficial no
 * fundo, glifo no azul `brand-900`. O par é o mesmo do CTA principal do hero,
 * então o botão lê como continuação do site e não como widget colado por cima.
 *
 * Ancorado à esquerda: à direita ele cobria o canto da fotografia do hero e
 * disputava com o CTA principal do hero, que mora nesse lado.
 *
 * Quadrado de canto arredondado em vez de círculo. O raio é `rounded-xl`
 * (16px) e não o `rounded-2xl` da marca: 25px num alvo de 52px comeria metade
 * do lado e devolveria a forma ao círculo de onde saiu — o raio de 25px foi
 * calibrado para superfícies grandes, como card e painel.
 *
 * Fica acima da safe area do iOS para não cair sob a barra inferior, e o alvo
 * tem 52px, acima do mínimo de 44px.
 *
 * Na home, só aparece depois que os botões do hero (`#hero-cta`) saem da tela:
 * antes disso ele cobria o título no celular e duplicava o CTA visível. Nas
 * páginas sem `#hero-cta`, aparece desde o início.
 */
export function WhatsAppFloat() {
  // O layout não remonta entre rotas: a `key` reinicia o estado a cada página.
  const pathname = usePathname();
  return <BotaoFlutuante key={pathname} naHome={pathname === "/site"} />;
}

function BotaoFlutuante({ naHome }: { naHome: boolean }) {
  // Na home começa oculto (o hero tem o CTA); nas demais, visível.
  const [visivel, setVisivel] = useState(!naHome);

  useEffect(() => {
    const alvo = document.getElementById("hero-cta");
    if (!alvo) return;
    // Posição direta a cada rolagem: um IntersectionObserver perde o evento
    // quando a rolagem salta o alvo de uma vez (âncora, tecla End).
    let quadro = 0;
    const verificar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() =>
        setVisivel(alvo.getBoundingClientRect().bottom < 0)
      );
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
    <a
      data-visivel={visivel}
      aria-hidden={visivel ? undefined : true}
      tabIndex={visivel ? undefined : -1}
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${home.contato.botao} pelo WhatsApp (abre em nova aba)`}
      className="group fixed left-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 flex size-13 items-center justify-center rounded-xl bg-gold-gradient text-brand-900 shadow-lg transition-[opacity,translate,scale] duration-300 hover:scale-105 data-[visivel=false]:pointer-events-none data-[visivel=false]:translate-y-4 data-[visivel=false]:opacity-0 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <WhatsAppGlyph className="size-7" />
    </a>
  );
}
