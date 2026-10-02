import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Regua } from "@/components/site5/sobre-v3/regua";
import { sobre } from "@/lib/site5/conteudo";

/**
 * Apresentação — a premissa do escritório em três módulos de igual peso, como
 * três vãos de uma mesma estrutura.
 *
 * Células com filete: `gap-px` sobre o fundo `bg-border` desenha as divisões
 * (sem bordas individuais, sem hairline duplicada). Os três parágrafos têm o
 * mesmo tamanho; nenhum vira lead.
 *
 * Três colunas só a partir de `xl`: em 1024 cada célula ficava com ~26
 * caracteres por linha — medida curta demais para corpo de 17–18px. Até lá,
 * as células empilham na largura do container.
 */
export function Apresentacao() {
  return (
    <Section surface="base" size="lg">
      <Container>
        <Regua numero="01" rotulo={sobre.apresentacao.sobretitulo} />

        <Revelar>
          <h2 className="mt-10 max-w-[24ch] text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance md:mt-14">
            {sobre.apresentacao.titulo}
          </h2>
        </Revelar>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border ring-1 ring-border md:mt-16 xl:grid-cols-3">
          {sobre.apresentacao.paragrafos.map((paragrafo, i) => (
            <Revelar key={paragrafo} asChild atraso={i * 80}>
              <div className="min-w-0 bg-background p-7 md:p-10 xl:p-10">
                <span aria-hidden className="block h-px w-10 bg-gold-500/70" />
                <p className="mt-6 max-w-[58ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-foreground/85">
                  {paragrafo}
                </p>
              </div>
            </Revelar>
          ))}
        </div>
      </Container>
    </Section>
  );
}
