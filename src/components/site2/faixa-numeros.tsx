import { Container, Section } from "@/components/site/layout/section";
import { metricas } from "@/lib/site/conteudo";

/**
 * Números do escritório como faixa tipográfica.
 *
 * A home usa ícone + contador animado. Aqui os ícones saem de cena e sobra o
 * algarismo em Trajan, separado por filete vertical — a leitura é de índice
 * impresso, não de painel de estatística.
 */
export function FaixaNumeros() {
  return (
    <Section surface="base" size="sm" className="border-t border-border">
      <Container>
        <dl className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metricas.map((metrica) => (
            <div
              key={metrica.rotulo}
              className="flex flex-col gap-2 py-8 first:pt-0 last:pb-0 sm:px-8 sm:py-2 sm:first:pt-2 sm:first:pl-0 sm:last:pr-0 sm:last:pb-2"
            >
              <dt className="sr-only">{metrica.rotulo}</dt>
              <dd className="font-display text-[clamp(2.5rem,1.8rem+2.6vw,4rem)] leading-none tracking-tight">
                {metrica.valor}
              </dd>
              <p
                aria-hidden
                className="text-sm tracking-[0.08em] text-muted-foreground uppercase"
              >
                {metrica.rotulo}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
