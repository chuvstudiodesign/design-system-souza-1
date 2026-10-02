import { cn } from "@/lib/utils";

/**
 * Fio de revista da Sobre nós V2 — numeral + traço + rótulo, na mesma linha.
 *
 * O `Trilho` compartilhado empilha numeral e rótulo numa coluna lateral
 * `sticky`; a V2 não tem coluna lateral (a numeração corre na linha, como fio
 * de matéria), por isso esta variante horizontal. `trilho.tsx` fica intocado.
 *
 * `as` decide a semântica: em Propósito e Valores o rótulo É o título do bloco
 * (`h2`); em Apresentação é sobretítulo (`p`). Sem rótulo, o fio é numeral +
 * traço — e, centrado, traço + numeral + traço.
 */

const tons = {
  /** Superfícies semânticas (base, muted) — a variação 5 é só escuro. */
  escuro: {
    numero: "text-gold-400",
    traco: "bg-gold-500/60",
    rotulo: "text-muted-foreground",
  },
  /** Superfície dourada: cores fixas, tokens semânticos sumiriam no degradê. */
  gold: {
    numero: "text-brand-950",
    traco: "bg-brand-950/40",
    rotulo: "text-brand-900",
  },
  navy: {
    numero: "text-gold-400",
    traco: "bg-gold-500/60",
    rotulo: "text-navy-foreground/70",
  },
} as const;

export function Fio({
  numero,
  rotulo,
  as: Rotulo = "p",
  tom = "escuro",
  alinhamento = "inicio",
  className,
}: {
  numero: string;
  rotulo?: string;
  as?: "p" | "h2";
  tom?: keyof typeof tons;
  alinhamento?: "inicio" | "centro";
  className?: string;
}) {
  const cores = tons[tom];
  const traco = (
    <span aria-hidden className={cn("h-px w-12 shrink-0 md:w-20", cores.traco)} />
  );

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-4",
        alinhamento === "centro" && "justify-center",
        className
      )}
    >
      {alinhamento === "centro" && !rotulo ? traco : null}
      <span
        aria-hidden
        className={cn("shrink-0 font-display text-[0.9688rem] tracking-[0.22em]", cores.numero)}
      >
        {numero}
      </span>
      {traco}
      {rotulo ? (
        <Rotulo
          className={cn(
            "min-w-0 text-[0.9688rem] tracking-[0.08em] uppercase",
            cores.rotulo
          )}
        >
          {rotulo}
        </Rotulo>
      ) : null}
    </div>
  );
}
