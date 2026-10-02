/**
 * Exceções de enquadramento da dobra da V2 sobre `enquadramento[slug].retrato`
 * (V1). O quadro da dobra muda de proporção com a largura (4:5 no celular,
 * ~0,72 a 1280, ~0,87 a 1920), e onde o valor da V1 não serve, a exceção
 * entra aqui. Classes por extenso para o Tailwind.
 */
export const enquadramentoDobra: Record<string, string> = {};
