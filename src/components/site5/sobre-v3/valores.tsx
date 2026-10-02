import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Regua } from "@/components/site5/sobre-v3/regua";
import { sobre } from "@/lib/site5/conteudo";

/**
 * Nossos valores — matriz de seis módulos iguais, cada um com seu número: a
 * ênfase numérica da V3.
 *
 * No celular cada célula é uma linha (numeral à esquerda, valor à direita,
 * alinhados pela linha de base); a partir de 640px vira 2×3 e depois 3×2,
 * com o numeral no topo e o valor na base.
 */
export function Valores() {
  return (
    <Section surface="base" size="lg">
      <Container>
        <Regua numero="04" rotulo={sobre.valores.titulo} as="h2" />

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border ring-1 ring-border sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {sobre.valores.itens.map((valor, i) => (
            <Revelar key={valor} asChild atraso={i * 70}>
              <li className="flex min-w-0 items-baseline gap-6 bg-card p-6 sm:min-h-56 sm:flex-col sm:items-start sm:justify-between sm:gap-10 sm:p-8 lg:min-h-64 lg:p-10">
                <span
                  aria-hidden
                  className="shrink-0 font-display text-[clamp(2.025rem,1.44rem+2.34vw,3.375rem)] leading-none text-gold-400"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 text-[clamp(1.125rem,0.99rem+0.63vw,1.4625rem)] leading-snug font-medium text-balance text-card-foreground">
                  {valor}
                </span>
              </li>
            </Revelar>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
