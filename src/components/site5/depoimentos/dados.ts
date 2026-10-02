import { depoimentos, type Depoimento } from "@/lib/site5/conteudo";

/**
 * Dados compartilhados pelas três versões da seção Depoimentos.
 *
 * Nenhum texto é tocado aqui: só a ORDEM de apresentação muda. O carrossel
 * abre num depoimento curto (lê-se de relance) e alterna curtos e longos para
 * o ritmo não cansar. A seleção é por autor, e qualquer depoimento que não
 * esteja na lista entra no fim — se a lista crescer, nada some.
 */
const PREFERENCIA = [
  "Elton Dias Souto",
  "Neri Celso",
  "Chácara Paquetá",
  "Geraldo Martins",
  "William André Safatle",
  "Silvia Maria",
  "Angela Noronha",
  "Messias Fernandes",
  "Sirlene Praxedes",
];

export const ordem: Depoimento[] = [
  ...PREFERENCIA.map((autor) => depoimentos.find((d) => d.autor === autor)),
  ...depoimentos.filter((d) => !PREFERENCIA.includes(d.autor)),
].filter((d): d is Depoimento => Boolean(d));

/**
 * Tempo de leitura: ~40 ms por caractere, nunca menos de 6 s nem mais de
 * 10 s. Encurtado a pedido do cliente (02/OUT/2026): os depoimentos têm que
 * ficar passando sozinhos, poucos segundos cada.
 */
export function tempoDeLeitura(texto: string) {
  return Math.min(10_000, Math.max(6_000, texto.length * 40));
}

/** "01 / 09" */
export const doisDigitos = (n: number) => String(n).padStart(2, "0");

/**
 * Comprimento-alvo do destaque: o depoimento de William André Safatle (o
 * usuário o escolheu como medida) mais 10%. Todos os depoimentos aparecem no
 * MESMO tamanho de fonte; os que passam do alvo aparecem como trecho, com
 * "Ler depoimento completo" levando ao texto integral.
 */
const REFERENCIA = "William André Safatle";
export const ALVO = Math.round(
  (ordem.find((d) => d.autor === REFERENCIA)?.texto.length ?? 300) * 1.1
);

/**
 * Trecho de um depoimento: corta no último limite de palavra antes do alvo e
 * termina com "…". Nenhuma palavra é trocada nem reescrita — só a pontuação
 * solta no ponto de corte sai, para não ficar ",…". Textos dentro do alvo
 * voltam inteiros.
 */
export function trecho(texto: string, alvo: number = ALVO) {
  if (texto.length <= alvo) return { texto, cortado: false };
  // Até o último espaço antes do alvo: a palavra partida pelo corte sai.
  let base = texto.slice(0, alvo + 1).replace(/\s+\S*$/u, "");
  // Abreviatura de tratamento no fim ("da Dra.") ficaria órfã do nome.
  while (/\s(?:Dra?|Sra?)\.$/u.test(base)) base = base.replace(/\s+\S+$/u, "");
  base = base.replace(/[\s,;:.!?\u2013\u2014-]+$/u, "");
  return { texto: `${base}…`, cortado: true };
}

/**
 * Tempo de cada depoimento no carrossel — medido pelo texto que aparece no
 * destaque (o trecho), não pelo integral: quem quer o integral abre o
 * diálogo, e o carrossel espera enquanto ele está aberto.
 */
export const tempos = ordem.map((d) => tempoDeLeitura(trecho(d.texto).texto));

export type { Depoimento };
