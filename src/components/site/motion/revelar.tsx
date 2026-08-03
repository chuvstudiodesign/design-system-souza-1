"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Revela o conteúdo quando ele entra na viewport — uma vez só, nunca de novo.
 *
 * Todo o estado visual mora no CSS (`[data-revelar]` em `globals.css`); aqui só
 * vive a decisão de quando marcar `visivel`. Duas consequências disso: a
 * transição roda inteira no compositor, e `prefers-reduced-motion` é resolvido
 * pelo próprio CSS mesmo que este componente nunca hidrate.
 *
 * Use `asChild` sempre que o wrapper quebraria a semântica ou o layout — num
 * `<li>` de grid, numa `<figure>`, num filho direto de flex.
 */

type Variante = "subir" | "esquerda" | "direita" | "zoom";

export function Revelar({
  variante = "subir",
  atraso = 0,
  duracao,
  /** Antecipa a entrada: dispara com a seção ainda 12% abaixo da dobra. */
  margem = "0px 0px -12% 0px",
  asChild = false,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  variante?: Variante;
  /** Atraso em ms. Em lista, escalone de 60–80ms por item. */
  atraso?: number;
  /** Duração em ms. Padrão 620ms. */
  duracao?: number;
  margem?: string;
  asChild?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = React.useState(false);

  React.useEffect(() => {
    const no = ref.current;
    if (!no || visivel) return;

    // Sem IntersectionObserver o conteúdo simplesmente aparece. Degradar para
    // "invisível" seria perder a página inteira por causa de uma animação.
    // Escrito direto no DOM: é só o atributo, não vale um ciclo de render.
    if (typeof IntersectionObserver === "undefined") {
      no.dataset.revelar = "visivel";
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setVisivel(true);
        observador.disconnect();
      },
      { rootMargin: margem, threshold: 0.01 }
    );

    observador.observe(no);
    return () => observador.disconnect();
  }, [margem, visivel]);

  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      ref={ref}
      data-revelar={visivel ? "visivel" : ""}
      data-variante={variante}
      className={cn(className)}
      style={
        {
          ...(atraso ? { "--revelar-atraso": `${atraso}ms` } : null),
          ...(duracao ? { "--revelar-duracao": `${duracao}ms` } : null),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
