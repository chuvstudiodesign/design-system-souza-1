import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Symbol } from "@/components/brand/logo";
import { Container, Section, Sobretitulo } from "@/components/site/layout/section";
import { landingPages } from "@/lib/lp/conteudo";

export const metadata: Metadata = {
  title: { absolute: "Landing pages · Souza & Souza" },
};

const versoes = [
  { n: 1, nome: "Fiel ao documento" },
  { n: 2, nome: "Foco em conversão" },
  { n: 3, nome: "Equilíbrio + escritório" },
] as const;

/**
 * Índice interno das landing pages — para a equipe revisar, não para o
 * público (os anúncios levam direto a cada página). Lista os 6 assuntos do
 * documento com as três versões de cada um.
 */
export default function Page() {
  return (
    <main id="conteudo" className="min-w-0 flex-1">
      <Section surface="base" size="md">
        <Container>
          <span aria-hidden className="inline-flex">
            <Symbol variant="vazado-dourado" size={44} />
          </span>
          <Sobretitulo className="mt-8">Revisão interna</Sobretitulo>
          <h1 className="mt-5 text-[clamp(2rem,1.5rem+2vw,3rem)] leading-tight font-medium tracking-tight">
            Landing pages
          </h1>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-pretty text-muted-foreground">
            Seis assuntos, três versões de cada. O texto é o mesmo nas três; muda
            a composição e os recursos de conversão.
          </p>

          <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {landingPages.map((lp) => (
              <li key={lp.slug} className="rounded-2xl bg-card p-6 ring-1 ring-border">
                <p className="font-display text-xs tracking-[0.2em] text-gold-400 uppercase">
                  {lp.nome}
                </p>
                <p className="mt-3 text-[0.9688rem] leading-snug text-pretty">{lp.titulo}</p>
                <ul className="mt-5 space-y-1 border-t border-border pt-4">
                  {versoes.map((v) => (
                    <li key={v.n}>
                      <Link
                        href={`/lp/${lp.slug}/v${v.n}`}
                        className="group flex min-h-11 items-center justify-between gap-3 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <span>
                          <span className="font-medium text-foreground">V{v.n}</span> · {v.nome}
                        </span>
                        <ArrowRightIcon aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
