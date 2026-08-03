"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Parallax curto, atrelado à posição do elemento na viewport.
 *
 * O elemento anda mais devagar que o scroll — nada mais que isso. Não segura a
 * página, não empilha camadas e não muda a altura de nada: só escreve duas
 * custom properties que o CSS compõe numa `transform` única.
 *
 * O listener de scroll só existe enquanto o elemento está perto da viewport, e
 * a escrita acontece num `requestAnimationFrame` por frame. Com movimento
 * reduzido o efeito nunca liga.
 */
export function Parallax({
  /** Fração do scroll que o elemento "perde". 0.08 ≈ 50px de deriva. */
  intensidade = 0.08,
  /** Rotação máxima em graus ao longo da travessia. */
  rotacao = 0,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  intensidade?: number;
  rotacao?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const no = ref.current;
    if (!no) return;

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (semMovimento.matches) return;

    let frame = 0;

    const aplicar = () => {
      frame = 0;
      const caixa = no.getBoundingClientRect();
      // Distância do centro do elemento ao centro da viewport, normalizada.
      const centro =
        caixa.top + caixa.height / 2 - window.innerHeight / 2;

      no.style.setProperty("--parallax-y", `${(-centro * intensidade).toFixed(2)}px`);

      if (rotacao) {
        const razao = Math.max(-1, Math.min(1, centro / window.innerHeight));
        no.style.setProperty(
          "--parallax-rotacao",
          `${(-razao * rotacao).toFixed(2)}deg`
        );
      }
    };

    const agendar = () => {
      if (!frame) frame = requestAnimationFrame(aplicar);
    };

    // Só escuta o scroll enquanto o elemento está a uma tela de distância.
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          window.addEventListener("scroll", agendar, { passive: true });
          agendar();
        } else {
          window.removeEventListener("scroll", agendar);
        }
      },
      { rootMargin: "100% 0px" }
    );

    observador.observe(no);
    window.addEventListener("resize", agendar, { passive: true });

    return () => {
      observador.disconnect();
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [intensidade, rotacao]);

  return (
    <div ref={ref} data-parallax className={cn(className)} {...props}>
      {children}
    </div>
  );
}
