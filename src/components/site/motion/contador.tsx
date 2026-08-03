"use client";

import * as React from "react";

const formatador = new Intl.NumberFormat("pt-BR");

/** Separa "+3.000" em prefixo "+" e o inteiro 3000. */
function decompor(valor: string) {
  const digitos = valor.replace(/\D/g, "");
  if (!digitos) return null;
  return {
    prefixo: valor.slice(0, valor.indexOf(digitos[0])),
    alvo: Number(digitos),
  };
}

/**
 * Conta até o número quando ele entra na viewport.
 *
 * A contagem escreve `textContent` direto no nó, sem passar por estado: são
 * ~80 quadros por número e nenhum deles muda a árvore React. O nó é estático
 * do ponto de vista do React, então não há risco de a escrita ser desfeita.
 *
 * O valor verdadeiro fica sempre no DOM num `sr-only` — quem usa leitor de tela
 * ouve "+3.000", nunca um número a meio caminho. A contagem visível é
 * `aria-hidden` e existe só para o olho.
 *
 * Nunca anima um número que já estava na tela na hidratação: sair do valor
 * final, voltar a zero e recontar seria um salto, não uma entrada. Com
 * movimento reduzido, ou sem JS, o número simplesmente já está certo.
 */
export function Contador({
  valor,
  duracao = 1400,
  className,
}: {
  valor: string;
  duracao?: number;
  className?: string;
}) {
  const partes = React.useMemo(() => decompor(valor), [valor]);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const no = ref.current;
    if (!no || !partes) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const caixa = no.getBoundingClientRect();
    if (caixa.top < window.innerHeight && caixa.bottom > 0) return;

    const escrever = (n: number) => {
      no.textContent = partes.prefixo + formatador.format(n);
    };

    escrever(0);

    let frame = 0;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();

        const inicio = performance.now();

        const passo = (agora: number) => {
          const t = Math.min(1, (agora - inicio) / duracao);
          // easeOutExpo: acelera cedo e assenta no alvo, em vez de rodar o
          // número em velocidade constante até parar de repente.
          const suave = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          escrever(Math.round(partes.alvo * suave));
          if (t < 1) frame = requestAnimationFrame(passo);
        };

        frame = requestAnimationFrame(passo);
      },
      { threshold: 0.4 }
    );

    observador.observe(no);

    return () => {
      observador.disconnect();
      if (frame) cancelAnimationFrame(frame);
      escrever(partes.alvo);
    };
  }, [partes, duracao]);

  if (!partes) return <span className={className}>{valor}</span>;

  return (
    <span className={className}>
      <span ref={ref} aria-hidden className="tabular-nums">
        {partes.prefixo}
        {formatador.format(partes.alvo)}
      </span>
      <span className="sr-only">{valor}</span>
    </span>
  );
}
