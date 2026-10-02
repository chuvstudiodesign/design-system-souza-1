import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Trilho } from "@/components/site5/trilho";
import { sobre } from "@/lib/site5/conteudo";

/**
 * Nossos valores — lista tipográfica sobre o azul.
 *
 * Seis palavras não pedem card nem ícone: cada valor é uma linha de peso,
 * aberta por um traço dourado curto e separada da vizinha por um filete. Em
 * `lg` as seis se arrumam em 3 × 2; no celular, uma por linha.
 */
export function Valores() {
  return (
    <Section surface="navy" size="md" className="overflow-clip">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <Trilho
            numero="04"
            rotulo={sobre.valores.titulo}
            as="h2"
            tom="navy"
            className="lg:col-span-3"
          />

          <ul className="grid grid-cols-1 min-w-0 gap-x-8 sm:grid-cols-2 lg:col-span-8 lg:col-start-5 xl:grid-cols-3">
            {sobre.valores.itens.map((valor, i) => (
              <Revelar key={valor} asChild atraso={i * 70}>
                <li className="min-w-0 border-t border-navy-foreground/15 pt-5 pb-8">
                  <span aria-hidden className="block h-px w-8 bg-gold-500/70" />
                  <span className="mt-4 block text-[clamp(1.2375rem,1.08rem+0.45vw,1.4625rem)] leading-tight font-medium text-balance">
                    {valor}
                  </span>
                </li>
              </Revelar>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
