/**
 * Escala tipográfica da Contato V2 — `docs/site5-specs/05-contato-v2.md` §0.1.
 *
 * Única fonte de tamanho e peso de texto da versão: nenhum componente de
 * `contato-v2/` escreve tamanho de fonte por conta própria. Trajan (caixa-alta)
 * só em D e T; Inter sempre em 400.
 */
export const escala = {
  /** D — H1. */
  display:
    "font-display text-[clamp(2.025rem,0.99rem+3.96vw,4.05rem)] leading-[1.05] tracking-[0.04em] text-balance uppercase",
  /** T — os quatro H2, no mesmo tamanho. */
  titulo:
    "font-display text-[clamp(1.35rem,0.99rem+1.44vw,2.025rem)] leading-[1.15] tracking-[0.04em] text-balance uppercase",
  /** L — subtítulo, valores dos canais, nome do escritório, nome das redes. */
  lead: "text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug font-normal",
  /** C — parágrafos e linhas do endereço. */
  corpo:
    "text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed font-normal text-pretty",
  /** R — rótulos de canal, de campo, `@usuario`, sumário, botões. */
  rotulo: "text-[0.9563rem] leading-snug font-normal",
} as const;
