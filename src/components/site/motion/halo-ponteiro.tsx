"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Halo dourado do hero, com uma deriva discreta atrás do ponteiro.
 *
 * O elemento é puramente decorativo e a deriva é limitada a poucos pixels: a
 * intenção é dar vida à superfície, não puxar o olho para longe do H1. Sem
 * mouse (toque) ou com movimento reduzido ele fica exatamente onde o layout o
 * colocou — o efeito é um bônus de ponteiro fino, nunca a composição.
 */
export function HaloPonteiro({
  /** Deriva máxima em px, em cada eixo. */
  amplitude = 36,
  className,
  ...props
}: React.ComponentProps<"div"> & { amplitude?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const no = ref.current;
    const palco = no?.parentElement;
    if (!no || !palco) return;

    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let alvoX = 0;
    let alvoY = 0;
    let x = 0;
    let y = 0;

    const aoMover = (evento: PointerEvent) => {
      const caixa = palco.getBoundingClientRect();
      // -1..1 a partir do centro do palco.
      alvoX = ((evento.clientX - caixa.left) / caixa.width) * 2 - 1;
      alvoY = ((evento.clientY - caixa.top) / caixa.height) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(seguir);
    };

    // Interpolação exponencial: o halo persegue o ponteiro com atraso, o que
    // lê como massa. Ir direto ao alvo pareceria colado ao cursor.
    const seguir = () => {
      x += (alvoX - x) * 0.06;
      y += (alvoY - y) * 0.06;
      no.style.transform = `translate3d(${(x * amplitude).toFixed(2)}px, ${(y * amplitude).toFixed(2)}px, 0)`;

      frame =
        Math.abs(alvoX - x) > 0.001 || Math.abs(alvoY - y) > 0.001
          ? requestAnimationFrame(seguir)
          : 0;
    };

    palco.addEventListener("pointermove", aoMover, { passive: true });

    return () => {
      palco.removeEventListener("pointermove", aoMover);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [amplitude]);

  return <div ref={ref} aria-hidden className={cn(className)} {...props} />;
}
