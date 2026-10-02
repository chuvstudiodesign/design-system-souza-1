import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { FormularioContato } from "@/components/site5/contato/formulario-contato";
import { contato } from "@/lib/site5/contato";
import { contatoPagina } from "@/lib/site5/conteudo";

const { formulario } = contatoPagina;

/**
 * Bloco do formulário. O texto fica no servidor e vem primeiro no DOM (leitor
 * de tela ouve o contexto antes dos campos); no desktop ele vai para a direita
 * e acompanha a rolagem. Só o formulário em si é client.
 *
 * PENDÊNCIA #1 — docs/PENDENCIAS.md: o envio ainda não tem destino.
 */
export function Formulario() {
  return (
    <Section
      surface="muted"
      size="md"
      className="overflow-clip"
      aria-labelledby="titulo-formulario"
    >
      <Container>
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <Revelar className="min-w-0 lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-start">
            <h2
              id="titulo-formulario"
              className="max-w-[16ch] text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance"
            >
              {formulario.titulo}
            </h2>
            <p className="mt-6 max-w-[40ch] text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed text-pretty text-muted-foreground">
              {formulario.paragrafo}
            </p>
          </Revelar>

          <Revelar
            atraso={80}
            className="min-w-0 lg:col-span-7 lg:col-start-1 lg:row-start-1"
          >
            <FormularioContato
              campos={formulario.campos}
              botao={formulario.botao}
              ui={formulario.ui}
              whatsapp={contato.whatsapps[0]}
              telefone={contato.telefoneFixo}
            />
          </Revelar>
        </div>
      </Container>
    </Section>
  );
}
