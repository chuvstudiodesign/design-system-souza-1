/**
 * Escala tipográfica da Contato V3 — `docs/site5-specs/05-contato-v3.md` §0.1.
 *
 * D e T são os da home (H1 do hero; H2 de Publicações/Manifesto); L, C e R
 * iguais aos da V2. `font-medium` só em D e T; nenhuma caixa-alta; Trajan só
 * nos numerais do `Fio`. Nenhum componente de `contato-v3/` escreve tamanho de
 * fonte fora daqui.
 */
export const escala = {
  /** D — H1. */
  display:
    "text-[clamp(2.25rem,0.99rem+5.04vw,4.725rem)] leading-[0.98] font-medium tracking-[-0.03em] text-balance",
  /** T — os quatro H2. */
  titulo:
    "text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance",
  /** L — subtítulo, valores dos canais, nome do escritório, nome das redes. */
  lead: "text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug font-normal",
  /** C — parágrafos e linhas do endereço. */
  corpo:
    "text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed font-normal text-pretty text-muted-foreground",
  /** R — rótulos de canal, de campo, `@usuario`, botões. */
  rotulo: "text-[0.9563rem] leading-snug font-normal",
} as const;

/**
 * Padding horizontal da coluna de leitura — abertura e partes usam o mesmo,
 * para a borda esquerda ser uma só. No `lg+` a borda direita acompanha o
 * container do header.
 */
export const colunaX =
  "px-6 md:px-10 lg:pl-16 xl:pl-24 lg:pr-[max(2.5rem,calc((100vw-var(--container-7xl))/2+2.5rem))]";
