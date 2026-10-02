import { Container, Section } from "@/components/site/layout/section";
import { Ficha } from "@/components/site5/profissionais-v3/ficha";
import { Trilho } from "@/components/site5/trilho";
import { profissionais, profissionaisIntro } from "@/lib/site5/conteudo";

/**
 * Fichas — os cinco cartões, na ordem do documento, com respiro vertical
 * padrão (a foto de grupo da seção anterior não transborda mais para cá).
 */
export function Fichas() {
  return (
    <Section surface="muted" className="py-0 md:py-0 lg:py-0">
      <Container className="pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <Trilho
            numero="02"
            rotulo={profissionaisIntro.sobretituloPerfis}
            as="h2"
            className="lg:static lg:col-span-3"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:gap-8 lg:gap-10">
          {profissionais.map((p, i) => (
            <Ficha key={p.slug} profissional={p} numero={i + 1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
