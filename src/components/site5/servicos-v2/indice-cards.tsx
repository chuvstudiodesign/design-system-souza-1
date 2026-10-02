import { ArrowDownIcon } from "lucide-react";

import { areas } from "@/lib/site5/conteudo";
import { cn } from "@/lib/utils";

/**
 * Span de cada card por posição: no lg os 4 "Direito …" fecham a primeira
 * fileira (3/12 cada) e os 3 serviços a segunda (4/12 cada). Em 2 colunas
 * (sm–lg) o 7º, sobra ímpar, ocupa a linha inteira.
 */
function spanPorPosicao(i: number) {
  if (i < 4) return "lg:col-span-3";
  if (i === 6) return "sm:col-span-2 lg:col-span-4";
  return "lg:col-span-4";
}

/**
 * Índice da V2 em "cards de acesso" — o mesmo desenho (raio, `bg-card/40`,
 * `ring-border`) dos botões Extrajudiciais/Diligências da home.
 *
 * Destino do "Voltar ao índice" dos painéis (`#indice`). No mobile cada card
 * é uma linha: numeral, nome, seta na ponta. No lg vira bloco: numeral e
 * seta no topo, nome colado à base — os nomes de uma fileira alinham pela
 * última linha.
 */
export function IndiceCards({ className }: { className?: string }) {
  return (
    <nav
      id="indice"
      aria-label="Índice das áreas de atuação"
      className={cn("scroll-mt-28", className)}
    >
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
        {areas.map((area, i) => (
          <li key={area.slug} className={cn("min-w-0", spanPorPosicao(i))}>
            <a
              href={`#${area.slug}`}
              className="group flex h-full min-h-16 items-center gap-4 rounded-2xl bg-card/40 px-5 py-4 ring-1 ring-border transition-colors hover:bg-card/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none lg:min-h-32 lg:flex-col lg:items-stretch lg:justify-between lg:p-6"
            >
              {/* `contents` abaixo de lg: numeral e seta viram filhos do
                  próprio link, e a seta vai para a ponta direita. */}
              <span className="contents lg:flex lg:w-full lg:items-center lg:justify-between lg:gap-4">
                <span
                  aria-hidden
                  className="w-7 shrink-0 font-display text-[0.9688rem] tracking-[0.22em] text-gold-400"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowDownIcon
                  aria-hidden
                  className="order-last ml-auto size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-y-0.5 group-hover:text-gold-400 group-focus-visible:text-gold-400 motion-reduce:transition-none lg:order-none lg:ml-0"
                />
              </span>
              <span className="min-w-0 flex-1 text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-snug font-medium text-balance lg:flex-none">
                {area.nome}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
