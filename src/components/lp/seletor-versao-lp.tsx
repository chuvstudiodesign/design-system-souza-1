import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Seletor "Versão 1 · 2 · 3" — ferramenta de comparação para o cliente, não
 * faz parte da página final. Quando a versão for escolhida, basta tirar o
 * componente da página.
 *
 * No desktop fica fixo no canto superior direito, sob o cabeçalho (embaixo
 * moram o aviso flutuante da V2). No celular não há canto livre — fixo, ele
 * cobriria o texto —, então entra no fluxo, centrado logo abaixo do
 * cabeçalho. Por isso a página o renderiza antes do `<main>`.
 */
export function SeletorVersaoLp({
  slug,
  atual,
}: {
  slug: string;
  atual: 1 | 2 | 3;
}) {
  return (
    <nav
      aria-label="Versões desta landing page"
      className="relative z-40 mx-auto mt-4 flex w-fit items-center gap-1 rounded-full bg-card/90 p-1 shadow-lg ring-1 ring-border backdrop-blur-md md:fixed md:top-22 md:right-5 md:mt-0"
    >
      <span className="hidden px-2.5 text-xs tracking-[0.12em] text-muted-foreground uppercase sm:inline">
        Versão
      </span>
      {([1, 2, 3] as const).map((n) => (
        <Link
          key={n}
          href={`/lp/${slug}/v${n}`}
          aria-current={n === atual ? "page" : undefined}
          aria-label={`Versão ${n}`}
          className={cn(
            "grid size-10 place-items-center rounded-full text-sm tabular-nums transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none",
            n === atual
              ? "bg-primary font-medium text-primary-foreground"
              : "text-foreground/80 hover:bg-muted"
          )}
        >
          {n}
        </Link>
      ))}
    </nav>
  );
}
