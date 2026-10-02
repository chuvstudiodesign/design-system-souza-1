import { Dobra } from "@/components/site5/profissionais-v2/dobra";
import { profissionais } from "@/lib/site5/conteudo";

/**
 * As cinco dobras, na ordem do documento. Foto alterna esquerda/direita e a
 * superfície alterna muted/base.
 */
export function Dobras() {
  return (
    <>
      {profissionais.map((p, i) => (
        <Dobra
          key={p.slug}
          profissional={p}
          numero={i + 1}
          lado={i % 2 === 0 ? "esquerda" : "direita"}
          superficie={i % 2 === 0 ? "muted" : "base"}
        />
      ))}
    </>
  );
}
