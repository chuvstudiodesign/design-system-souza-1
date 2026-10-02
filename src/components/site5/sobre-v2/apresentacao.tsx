import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { Fio } from "@/components/site5/sobre-v2/fio";
import { sobre } from "@/lib/site5/conteudo";

const corpo =
  "text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-foreground/85";

/**
 * Apresentação — a abertura da matéria.
 *
 * H2 largo, coluna de texto 7/12 aberta por capitular dourada e uma coluna
 * lateral 4/12 com filete. Os três parágrafos têm o mesmo tamanho e cor: a
 * hierarquia vem da capitular e da posição, não do corpo. A capitular é
 * pseudo-elemento (`first-letter`) — o texto não muda.
 */
export function Apresentacao() {
  const [primeiro, segundo, terceiro] = sobre.apresentacao.paragrafos;

  return (
    <Section surface="muted" size="lg" className="overflow-clip">
      <Container>
        <Fio numero="01" rotulo={sobre.apresentacao.sobretitulo} />

        <Revelar>
          <h2 className="mt-8 max-w-[24ch] text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance">
            {sobre.apresentacao.titulo}
          </h2>
        </Revelar>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-16 lg:grid-cols-12">
          <Revelar className="min-w-0 lg:col-span-7">
            <p
              className={`max-w-[58ch] ${corpo} first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-[3.4em] first-letter:leading-[0.82] first-letter:text-gold-400`}
            >
              {primeiro}
            </p>
            <p className={`mt-6 max-w-[58ch] ${corpo}`}>{segundo}</p>
          </Revelar>

          <Revelar
            atraso={120}
            className="min-w-0 border-t border-gold-500/40 pt-8 lg:col-span-4 lg:col-start-9 lg:self-end lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
          >
            <p className={`max-w-[40ch] ${corpo}`}>{terceiro}</p>
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
