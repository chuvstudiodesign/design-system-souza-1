import { cn } from "@/lib/utils";

/**
 * Trilho numerado da página Sobre nós.
 *
 * Numeral em Trajan (decorativo, fora da árvore de acessibilidade) seguido do
 * rótulo do bloco. É o mesmo desenho que `manifesto.tsx` escreve à mão na home;
 * aqui ele se repete em quatro blocos com três superfícies diferentes, então
 * virou componente — a cor muda com o fundo, a geometria não.
 *
 * `as` decide a semântica do rótulo: em Propósito e Valores o rótulo É o
 * título do bloco (`h2`); nos demais é um sobretítulo (`p`).
 *
 * Na coluna lateral do grid, o trilho fica preso ao topo enquanto o texto
 * rola (`lg:sticky`). O pai precisa de `overflow-clip`, nunca `hidden`.
 */

const tons = {
  /** Superfícies semânticas (base, muted) — o site abre no escuro. */
  escuro: { numero: "text-gold-400", rotulo: "text-muted-foreground" },
  /** Superfície dourada: cores fixas, tokens semânticos sumiriam no degradê. */
  gold: { numero: "text-brand-950", rotulo: "text-brand-900" },
  navy: { numero: "text-gold-400", rotulo: "text-navy-foreground/70" },
} as const;

export function Trilho({
  numero,
  rotulo,
  as: Rotulo = "p",
  tom = "escuro",
  className,
}: {
  numero: string;
  /** Sem rótulo, o trilho é só o numeral (caso do Fechamento). */
  rotulo?: string;
  as?: "p" | "h2";
  tom?: keyof typeof tons;
  className?: string;
}) {
  const cores = tons[tom];

  return (
    <div className={cn("min-w-0 lg:sticky lg:top-28 lg:self-start", className)}>
      <p
        aria-hidden
        className={cn("font-display text-[0.9688rem] tracking-[0.22em]", cores.numero)}
      >
        {numero}
      </p>
      {rotulo ? (
        <Rotulo
          className={cn("mt-4 text-[0.9688rem] tracking-[0.08em] uppercase", cores.rotulo)}
        >
          {rotulo}
        </Rotulo>
      ) : null}
    </div>
  );
}
