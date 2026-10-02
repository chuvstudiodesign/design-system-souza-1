import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";

import { Revelar } from "@/components/site/motion/revelar";
import { enquadramento } from "@/components/site5/profissionais/enquadramento";
import { enquadramentoMural } from "@/components/site5/profissionais-v3/enquadramento-mural";
import { tipo } from "@/components/site5/profissionais-v3/tipos";
import { cn } from "@/lib/utils";
import { profissionais, rotuloPapel } from "@/lib/site5/conteudo";

/**
 * Mural — as cinco advogadas lado a lado, em retratos 3:4. É o índice da
 * página (`#indice`, destino do "Voltar ao índice"). No celular vira lista
 * de contatos; entre 640 e 1023, duas colunas com a 5ª em linha cheia.
 *
 * `alt=""` nos retratos: o nome está no próprio link. Abaixo de `lg` a
 * miniatura aproxima no rosto (`enquadramento-mural.ts`); por isso `sizes`
 * pede 176 px e o zoom de hover só existe no `lg` (senão desfaria o 1,8×).
 */
export function Mural({ className }: { className?: string }) {
  return (
    <nav
      id="indice"
      aria-labelledby="titulo-profissionais"
      className={cn("scroll-mt-28", className)}
    >
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 lg:gap-6">
        {profissionais.map((p, i) => (
          <Revelar key={p.slug} asChild atraso={200 + i * 70}>
            <li
              className={cn(
                "min-w-0",
                i === profissionais.length - 1 && "sm:col-span-2 lg:col-span-1"
              )}
            >
              <a
                href={`#${p.slug}`}
                className="group flex h-full items-center gap-4 rounded-2xl bg-card/60 p-2 pr-4 ring-1 ring-border transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none lg:flex-col lg:items-stretch lg:gap-0 lg:bg-transparent lg:p-0 lg:ring-0 lg:hover:bg-transparent"
              >
                <span className="relative block aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-border lg:aspect-[3/4] lg:w-full lg:rounded-2xl lg:shadow-md">
                  <Image
                    quality={95}
                    src={p.foto.src}
                    alt=""
                    fill
                    preload={i === 0}
                    loading={i === 0 ? undefined : "eager"}
                    sizes="(max-width: 1023px) 176px, (max-width: 1279px) 18vw, 232px"
                    className={cn(
                      "object-cover transition-transform duration-500 motion-reduce:transition-none lg:motion-safe:group-hover:scale-[1.03]",
                      enquadramento[p.slug]?.retrato,
                      enquadramentoMural[p.slug]
                    )}
                  />
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-3 lg:mt-4 lg:items-start lg:justify-between">
                  <span className="min-w-0">
                    <span
                      className={cn(
                        tipo.corpo,
                        "block leading-snug font-medium text-balance"
                      )}
                    >
                      {p.nome}
                    </span>
                    <span className="mt-1 block text-[0.9688rem] tracking-[0.08em] text-muted-foreground uppercase">
                      {rotuloPapel[p.papel]}
                    </span>
                  </span>
                  <ArrowDownIcon
                    aria-hidden
                    className="ml-auto size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-gold-400 group-focus-visible:text-gold-400 motion-reduce:transition-none lg:mt-1 lg:ml-0"
                  />
                </span>
              </a>
            </li>
          </Revelar>
        ))}
      </ol>
    </nav>
  );
}
