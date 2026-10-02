import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { home } from "@/lib/site5/conteudo";

import { CarrosselV2 } from "./v2-carrossel";

/**
 * Depoimentos — Versão 2: o destaque num grande container.
 *
 * Cabeçalho em duas colunas (título 7/12, parágrafo 5/12, alinhados pela
 * base). Abaixo, uma box única com filete dourado: o depoimento ativo à
 * esquerda (8/12) com aspas grandes em Trajan, e à direita (4/12) a lista dos
 * autores como navegação — o ativo marcado. Depois, o resumo em boxes.
 */
export function DepoimentosV2() {
  return (
    <Section
      id="depoimentos"
      surface="navy"
      size="lg"
      aria-labelledby="depoimentos-v2-titulo"
    >
      <Container>
        <Revelar className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-12 lg:items-end">
          <div className="min-w-0 lg:col-span-7">
            <p className="flex items-center gap-4 text-[0.9688rem] tracking-[0.08em] text-navy-foreground/60 uppercase">
              <span
                aria-hidden
                className="font-display tracking-[0.22em] text-gold-400"
              >
                03
              </span>
              <span aria-hidden className="h-px w-8 bg-gold-500/60" />
              {home.depoimentos.sobretitulo}
            </p>
            <h2
              id="depoimentos-v2-titulo"
              className="mt-6 max-w-[26ch] text-[clamp(1.35rem,1.08rem+1.08vw,2.025rem)] leading-tight font-medium tracking-tight text-balance"
            >
              {home.depoimentos.titulo}
            </h2>
          </div>
          <p className="min-w-0 max-w-[52ch] text-[0.9563rem] leading-relaxed text-pretty text-navy-foreground/75 lg:col-span-5">
            {home.depoimentos.paragrafo}
          </p>
        </Revelar>

        <CarrosselV2 />
      </Container>
    </Section>
  );
}
