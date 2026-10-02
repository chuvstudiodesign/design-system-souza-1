import { Container, Section } from "@/components/site/layout/section";
import { Revelar } from "@/components/site/motion/revelar";
import { FormularioContato } from "@/components/site5/contato/formulario-contato";
import { Card } from "@/components/ui/card";
import { contato } from "@/lib/site5/contato";
import { contatoPagina } from "@/lib/site5/conteudo";

import { Cabecalho } from "./cabecalho";
import { escala } from "./escala";

const { formulario } = contatoPagina;

/**
 * I — Envie sua mensagem. A folha de carta que o visitante preenche: no
 * celular os campos correm direto sobre o muted (cartão com padding apertaria
 * os campos); a partir de `sm` vira folha centrada.
 *
 * PENDÊNCIA #1 — docs/PENDENCIAS.md: o envio ainda não tem destino.
 */
export function Mensagem() {
  return (
    <Section
      surface="muted"
      size="md"
      id="mensagem"
      className="scroll-mt-20 overflow-clip"
      aria-labelledby="titulo-mensagem"
    >
      <Container>
        <Revelar>
          <Cabecalho
            numero="I"
            id="titulo-mensagem"
            titulo={formulario.titulo}
            paragrafo={formulario.paragrafo}
          />
        </Revelar>

        <Revelar variante="zoom" atraso={80} className="mx-auto mt-12 max-w-3xl md:mt-16">
          <Card className="gap-0 rounded-none bg-transparent p-0 py-0 shadow-none ring-0 sm:rounded-3xl sm:bg-card sm:p-10 sm:shadow-xl sm:ring-1 sm:ring-border lg:p-14">
            <FormularioContato
              campos={formulario.campos}
              botao={formulario.botao}
              ui={formulario.ui}
              whatsapp={contato.whatsapps[0]}
              telefone={contato.telefoneFixo}
              classes={{
                rotulo: "font-normal",
                botao: escala.rotulo,
                erro: escala.rotulo,
              }}
            />
          </Card>
        </Revelar>
      </Container>
    </Section>
  );
}
