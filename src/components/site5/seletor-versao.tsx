import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Seletor de versões — ferramenta de comparação para o cliente, não faz parte
 * do site final.
 *
 * As páginas internas da variação 5 têm três composições (V1 na rota base,
 * V2 e V3 em `/v2` e `/v3`) para o cliente escolher. O seletor fica fixo no
 * canto inferior direito (o WhatsApp flutuante ocupa o esquerdo) e é um
 * Server Component: cada página informa qual versão é.
 *
 * Quando o cliente escolher, basta remover o `<SeletorVersao />` da página
 * escolhida e apagar as rotas das outras versões.
 */
export function SeletorVersao({
  base,
  atual,
  total = 3,
}: {
  /** Rota da V1, ex.: "/site/sobre-nos". */
  base: string;
  atual: 1 | 2 | 3;
  /** Quantas versões a página ainda tem (o cliente pode descartar a 3). */
  total?: 2 | 3;
}) {
  const versoes = [
    { n: 1, href: base },
    { n: 2, href: `${base}/v2` },
    { n: 3, href: `${base}/v3` },
  ].slice(0, total);

  return (
    <nav
      aria-label="Versões desta página"
      className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 flex items-center gap-1 rounded-full bg-card/90 p-1 shadow-lg ring-1 ring-border backdrop-blur-md"
    >
      <span className="px-2.5 text-xs tracking-[0.12em] text-muted-foreground uppercase">
        Versão
      </span>
      {versoes.map((v) => (
        <Link
          key={v.n}
          href={v.href}
          aria-current={v.n === atual ? "page" : undefined}
          className={cn(
            "grid size-11 place-items-center rounded-full text-base tabular-nums transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none",
            v.n === atual
              ? "bg-primary font-medium text-primary-foreground"
              : "text-foreground/80 hover:bg-muted"
          )}
        >
          {v.n}
        </Link>
      ))}
    </nav>
  );
}
