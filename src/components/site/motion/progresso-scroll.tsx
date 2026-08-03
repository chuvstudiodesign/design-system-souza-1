"use client";

import * as React from "react";

/**
 * Filete de progresso de leitura, na aresta inferior do header.
 *
 * Cresce em `scaleX` a partir da esquerda — só transform, um `rAF` por frame.
 * É indicador de posição, não animação autônoma: acompanha o gesto do
 * visitante e por isso continua ativo sob `prefers-reduced-motion`.
 *
 * `aria-hidden` de propósito: a informação já está no scroll do documento e um
 * `progressbar` aqui só geraria ruído em leitor de tela.
 */
export function ProgressoScroll() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const no = ref.current;
    if (!no) return;

    let frame = 0;

    const aplicar = () => {
      frame = 0;
      const rolavel =
        document.documentElement.scrollHeight - window.innerHeight;
      const razao = rolavel > 0 ? window.scrollY / rolavel : 0;
      no.style.transform = `scaleX(${Math.min(1, Math.max(0, razao)).toFixed(4)})`;
    };

    const agendar = () => {
      if (!frame) frame = requestAnimationFrame(aplicar);
    };

    aplicar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar, { passive: true });

    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gold-gradient"
    />
  );
}
