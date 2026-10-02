import { Revelar } from "@/components/site/motion/revelar";
import { FormularioContato } from "@/components/site5/contato/formulario-contato";
import { contato } from "@/lib/site5/contato";
import { contatoPagina } from "@/lib/site5/conteudo";

import { escala } from "./escala";
import { Movimento } from "./movimento";

const { formulario } = contatoPagina;

/**
 * 01 — Envie sua mensagem. Sem cartão: os campos (`bg-background`) sobre o
 * muted bastam.
 *
 * PENDÊNCIA #1 — docs/PENDENCIAS.md: o envio ainda não tem destino.
 */
export function Mensagem() {
  return (
    <Movimento
      id="mensagem"
      numero="01"
      superficie="muted"
      titulo={formulario.titulo}
      paragrafo={formulario.paragrafo}
    >
      <Revelar atraso={80} className="mt-10 min-w-0">
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
      </Revelar>
    </Movimento>
  );
}
