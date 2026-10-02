import { Container, Section } from "@/components/site/layout/section";
import { Area } from "@/components/site5/servicos/area";
import { IndiceLateral } from "@/components/site5/servicos/indice-lateral";
import { areas } from "@/lib/site5/conteudo";

/** Só o que o índice precisa — o resto do texto não vai para o bundle. */
const itensIndice = areas.map(({ slug, nome }) => ({ slug, nome }));

/**
 * Catálogo das 7 áreas: índice sticky em 3 colunas (só lg+) e as fichas em
 * 8 colunas a partir da 5ª. Abaixo de lg o índice some e cada ficha ganha o
 * "Voltar ao índice", que leva ao sumário da abertura.
 */
export function CatalogoAreas() {
  return (
    <Section surface="muted" size="md" className="overflow-clip">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-12">
          <IndiceLateral
            itens={itensIndice}
            className="hidden min-w-0 lg:col-span-3 lg:block"
          />
          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            {areas.map((area, i) => (
              <Area key={area.slug} area={area} numero={i + 1} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
