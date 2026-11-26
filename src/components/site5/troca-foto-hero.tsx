"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeftRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Troca da foto do hero da home — ferramenta de comparação para o cliente
 * (26/11/2026), não faz parte do site final. Foto 1 é o ensaio em estúdio
 * ("Capa Hero Home"), foto 2 a da recepção que estava no ar. Quando o cliente
 * escolher, volte o `HeroFoto` para um `<Image>` fixo da opção escolhida e
 * tire o `BotaoTrocaFoto` do header.
 *
 * O botão mora no header e a foto no hero — árvores diferentes —, então a
 * escolha fica num armazém de módulo lido com `useSyncExternalStore`.
 */
export const opcoesFotoHero = [
  {
    desktop: "/site5/home-hero-estudio.webp",
    mobile: "/site5/home-hero-estudio-mobile.webp",
    // Pedido de 26/11/2026: as três ~7% mais para cima e a foto ~5% maior
    // (no celular, ~2%). A faixa que se abre embaixo some no degradê que leva
    // a foto ao fundo. Desktop ancorado no topo e à direita
    // (`object-[88%_0%]`, não 100%: em 1024px a primeira cortaria pela esquerda): em tela larga o corte vai todo para baixo; em tela
    // estreita (iPad, notebook pequeno), para a esquerda, atrás do texto — as
    // três ficam sempre inteiras à direita.
    ajuste: {
      desktop: "object-[88%_0%] origin-top-right scale-[1.05] -translate-y-[7%]",
      mobile: "origin-top scale-[1.05] -translate-y-[2%]",
    },
  },
  {
    desktop: "/site/home/hero.webp",
    mobile: "/site5/home-hero-mobile.webp",
    ajuste: { desktop: "", mobile: "" },
  },
] as const;

let atual = 0;
const ouvintes = new Set<() => void>();

function alternar() {
  atual = (atual + 1) % opcoesFotoHero.length;
  ouvintes.forEach((ouvir) => ouvir());
}

function useFotoAtual() {
  return React.useSyncExternalStore(
    (ouvir) => {
      ouvintes.add(ouvir);
      return () => ouvintes.delete(ouvir);
    },
    () => atual,
    () => 0
  );
}

/** As duas fotos montadas; só a escolhida aparece. Decorativas. */
export function FotoHero({
  versao,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  versao: "desktop" | "mobile";
}) {
  const escolhida = useFotoAtual();
  return (
    <>
      {opcoesFotoHero.map((op, i) => (
        <Image
          key={op[versao]}
          src={op[versao]}
          alt=""
          aria-hidden
          fill
          unoptimized
          {...props}
          className={cn(className, op.ajuste[versao], i !== escolhida && "!hidden")}
        />
      ))}
    </>
  );
}

/** Ícone de duas setas no header: alterna entre as fotos do hero. */
export function BotaoTrocaFoto({ className }: { className?: string }) {
  const escolhida = useFotoAtual();
  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={`Trocar a foto do topo (mostrando a ${escolhida + 1} de ${opcoesFotoHero.length})`}
      title="Trocar a foto do topo"
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className
      )}
    >
      <ArrowLeftRightIcon aria-hidden className="size-4" />
    </button>
  );
}
