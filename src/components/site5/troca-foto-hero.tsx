"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Troca da foto do hero da home — ferramenta de comparação para o cliente
 * (26/11/2026), não faz parte do site final. Foto 1 é o ensaio em estúdio
 * ("Capa Hero Home"), foto 2 a da recepção que estava no ar. Quando o cliente
 * escolher, volte o `HeroFoto` para um `<Image>` fixo da opção escolhida.
 *
 * O estado mora num contexto porque a foto aparece em dois lugares do hero:
 * fundo no desktop e faixa no topo do celular.
 */
export const opcoesFotoHero = [
  {
    desktop: "/site5/home-hero-estudio.webp",
    mobile: "/site5/home-hero-estudio-mobile.webp",
  },
  { desktop: "/site/home/hero.webp", mobile: "/site5/home-hero-mobile.webp" },
] as const;

const Contexto = React.createContext<{
  atual: number;
  setAtual: (i: number) => void;
}>({ atual: 0, setAtual: () => {} });

export function TrocaFotoHero({ children }: { children: React.ReactNode }) {
  const [atual, setAtual] = React.useState(0);
  return (
    <Contexto.Provider value={{ atual, setAtual }}>{children}</Contexto.Provider>
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
  const { atual } = React.useContext(Contexto);
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
          className={cn(className, i !== atual && "!hidden")}
        />
      ))}
    </>
  );
}

export function SeletorFotoHero({ className }: { className?: string }) {
  const { atual, setAtual } = React.useContext(Contexto);
  return (
    <div
      role="group"
      aria-label="Foto do topo"
      className={cn(
        "z-30 flex items-center gap-1 rounded-full bg-card/90 p-1 shadow-lg ring-1 ring-border backdrop-blur-md",
        className
      )}
    >
      <span className="px-2.5 text-xs tracking-[0.12em] text-muted-foreground uppercase">
        Foto
      </span>
      {opcoesFotoHero.map((_, i) => (
        <button
          key={i}
          type="button"
          aria-pressed={i === atual}
          onClick={() => setAtual(i)}
          className={cn(
            "grid size-10 place-items-center rounded-full text-base tabular-nums transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none",
            i === atual
              ? "bg-primary font-medium text-primary-foreground"
              : "text-foreground/80 hover:bg-muted"
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
