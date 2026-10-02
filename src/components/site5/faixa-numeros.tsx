import { Container, Section } from "@/components/site/layout/section";
import { metricas } from "@/lib/site5/conteudo";

/**
 * Números do escritório como faixa tipográfica — mesma composição da
 * variação 4 (`src/components/site2/faixa-numeros.tsx`), logo abaixo do hero:
 * algarismo em Trajan, filete vertical entre colunas, rótulo curto em caixa
 * alta. Sem título de seção (pedido do usuário, 24/09/2026).
 *
 * Dados novos do documento de 02/SET: cada número traz o período
 * ("+5.000 atendimentos realizados [2021 a 2025]"), que entra como segunda
 * linha do rótulo, no mesmo estilo.
 */
export function FaixaNumeros() {
  return (
    <Section surface="base" size="sm" className="border-t border-border">
      <Container>
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metricas.map((metrica) => (
            <div
              key={metrica.rotulo}
              className="flex min-w-0 flex-col gap-2 py-8 first:pt-0 last:pb-0 sm:px-8 sm:py-2 sm:first:pt-2 sm:first:pl-0 sm:last:pr-0 sm:last:pb-2"
            >
              <dt className="sr-only">{`${metrica.rotulo}, de ${metrica.periodo}`}</dt>
              <dd className="font-display text-[clamp(2.25rem,1.62rem+2.34vw,3.6rem)] leading-none tracking-tight">
                {metrica.valor}
              </dd>
              <p
                aria-hidden
                className="text-[0.9688rem] tracking-[0.08em] text-muted-foreground uppercase"
              >
                {metrica.rotulo}
                <span className="mt-1 block tabular-nums">{metrica.periodo}</span>
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
