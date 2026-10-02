/**
 * Escala tipográfica fechada da V3 (spec 03-profissionais-v3, §0.1).
 * Classes por extenso para o Tailwind encontrá-las.
 */
export const tipo = {
  display:
    "font-display uppercase text-[clamp(1.6875rem,0.45rem+5.4vw,4.5rem)] leading-[0.95] tracking-normal hyphens-none text-center",
  h2: "text-[clamp(1.575rem,1.08rem+1.98vw,2.7rem)] leading-[1.1] font-medium tracking-tight text-balance",
  h3Nome:
    "text-[clamp(1.4625rem,1.125rem+1.44vw,2.25rem)] leading-[1.1] font-medium tracking-tight text-balance",
  lead: "text-[clamp(1.0688rem,0.99rem+0.36vw,1.2375rem)] leading-snug text-pretty",
  corpo: "text-[clamp(0.9563rem,0.9rem+0.225vw,1.0688rem)] leading-relaxed",
  numeral: "font-display text-[0.9688rem] tracking-[0.22em] text-gold-400",
  rotulo: "text-[0.9688rem] tracking-[0.08em] uppercase",
} as const;

