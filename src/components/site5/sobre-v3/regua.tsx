import { cn } from "@/lib/utils";

/**
 * Régua da Sobre nós V3 "Planta" — numeral + título sobre um fio que
 * atravessa a largura do container.
 *
 * O `Trilho` compartilhado é coluna lateral `sticky`; aqui cada bloco abre com
 * uma linha horizontal — outra geometria, por isso componente próprio.
 * `trilho.tsx` fica intocado.
 *
 * Com `as="h2"` o rótulo é o título do bloco, em Trajan; com `as="p"` é
 * sobretítulo, em rótulo pequeno. Sem rótulo, a régua é só numeral + fio.
 */

const tons = {
  /** Superfícies semânticas (base, muted, vidro) — a variação 5 é só escuro. */
  escuro: {
    borda: "border-border",
    numero: "text-gold-400",
    titulo: "text-foreground",
    rotulo: "text-muted-foreground",
  },
  /** Superfície dourada: cores fixas, tokens semânticos sumiriam no degradê. */
  gold: {
    borda: "border-brand-950/25",
    numero: "text-brand-950",
    titulo: "text-brand-950",
    rotulo: "text-brand-900",
  },
  navy: {
    borda: "border-navy-foreground/15",
    numero: "text-gold-400",
    titulo: "text-navy-foreground",
    rotulo: "text-navy-foreground/70",
  },
} as const;

export function Regua({
  numero,
  rotulo,
  as: Rotulo = "p",
  tom = "escuro",
  className,
}: {
  numero: string;
  rotulo?: string;
  as?: "p" | "h2";
  tom?: keyof typeof tons;
  className?: string;
}) {
  const cores = tons[tom];

  return (
    <div
      className={cn(
        "flex min-w-0 items-baseline gap-5 border-b pb-5 md:gap-8 md:pb-6",
        cores.borda,
        className
      )}
    >
      <span
        aria-hidden
        className={cn("shrink-0 font-display text-[0.9688rem] tracking-[0.22em]", cores.numero)}
      >
        {numero}
      </span>
      {rotulo ? (
        <Rotulo
          className={cn(
            "min-w-0",
            Rotulo === "h2"
              ? "font-display text-[clamp(1.2375rem,0.945rem+1.17vw,1.9125rem)] leading-[1.1] tracking-[0.02em] uppercase"
              : "text-[0.9688rem] tracking-[0.08em] uppercase",
            Rotulo === "h2" ? cores.titulo : cores.rotulo
          )}
        >
          {rotulo}
        </Rotulo>
      ) : null}
    </div>
  );
}
