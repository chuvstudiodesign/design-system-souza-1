/**
 * Escala tipográfica fechada da V2 (spec 03-profissionais-v2, §0.1).
 * Classes por extenso para o Tailwind encontrá-las.
 *
 * Desvio da spec no Display: a partir de `lg` o H1 fica na coluna de 7/12 e,
 * com o teto de 6rem, "PROFISSIONAIS" (≈8,5em em Trajan) não cabia e
 * quebrava no meio da palavra. No `lg` o tamanho passa a acompanhar a
 * coluna (≈59px a 1024, 72px a partir de 1280), sempre numa linha.
 */
export const tipo = {
  display:
    "font-display uppercase text-[clamp(1.6875rem,0.45rem+5.4vw,5.4rem)] leading-[0.95] tracking-normal hyphens-none lg:text-[clamp(3.15rem,0.9rem+3.78vw,4.05rem)]",
  h2Nome:
    "text-[clamp(1.6875rem,1.17rem+2.16vw,2.925rem)] leading-[1.08] font-medium tracking-tight text-balance",
  h2Secao:
    "text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance",
  lead: "text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty",
  corpo: "text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)]",
  numeral: "font-display text-[0.9688rem] tracking-[0.22em] text-gold-400",
  rotulo: "text-[0.9688rem] tracking-[0.08em] uppercase",
} as const;
