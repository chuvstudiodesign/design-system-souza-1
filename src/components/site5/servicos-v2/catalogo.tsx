import { Container, Section } from "@/components/site/layout/section";
import { PainelArea } from "@/components/site5/servicos-v2/painel-area";
import { areas } from "@/lib/site5/conteudo";

/**
 * Catálogo da V2: os 7 painéis empilhados na largura do container, sobre a
 * superfície `muted`. O intervalo entre painéis é o mesmo em todos.
 */
export function CatalogoV2() {
  return (
    <Section surface="muted" size="md">
      <Container>
        <div className="flex flex-col gap-6 md:gap-8">
          {areas.map((area, i) => (
            <PainelArea key={area.slug} area={area} numero={i + 1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
