import { Abertura } from "./abertura";
import { Atendimento } from "./atendimento";
import { Endereco } from "./endereco";
import { Mensagem } from "./mensagem";
import { PainelFoto } from "./painel-foto";
import { Redes } from "./redes";

/**
 * Casca da tela dividida da V3: foto 5/12 fixa à esquerda, coluna de leitura
 * 7/12 à direita. Sem `overflow` aqui nem em nenhum ancestral da foto — o
 * `sticky` depende disso; `align-items: stretch` (padrão) dá à célula da foto
 * a altura da coluna inteira.
 */
export function Recepcao() {
  return (
    <div className="relative lg:grid lg:grid-cols-12">
      <PainelFoto />
      <div className="min-w-0 lg:col-span-7">
        <Abertura />
        <Mensagem />
        <Atendimento />
        <Endereco />
        <Redes />
      </div>
    </div>
  );
}
