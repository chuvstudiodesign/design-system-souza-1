import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Trilho } from "@/components/site5/trilho";
import { sobre } from "@/lib/site5/conteudo";

/**
 * Apresentação — trilho 01 à esquerda, texto deslocado à direita.
 *
 * O primeiro parágrafo é a premissa do escritório e sobe para lead; os outros
 * dois descem para o corpo, lado a lado a partir de `lg`, separados por um
 * filete neutro.
 */
export function Apresentacao() {
  const [premissa, ...demais] = sobre.apresentacao.paragrafos;

  return (
    <Section surface="muted" size="lg" className="overflow-clip">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
          <Trilho
            numero="01"
            rotulo={sobre.apresentacao.sobretitulo}
            className="lg:col-span-3"
          />

          <Revelar className="min-w-0 lg:col-span-8 lg:col-start-5">
            <h2 className="max-w-[22ch] text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance">
              {sobre.apresentacao.titulo}
            </h2>

            <p className="mt-8 max-w-[52ch] text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty text-foreground">
              {premissa}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 lg:grid-cols-2 lg:gap-10">
              {demais.map((paragrafo) => (
                <p
                  key={paragrafo}
                  className="text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-muted-foreground"
                >
                  {paragrafo}
                </p>
              ))}
            </div>
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
