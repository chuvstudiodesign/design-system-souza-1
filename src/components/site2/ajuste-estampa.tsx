"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Ajustador de posição e escala da estampa — ferramenta de desenvolvimento.
 *
 * A estampa entra sangrada, então onde ela é cortada pela borda é uma decisão
 * de composição que só se resolve olhando. Aqui ela se arrasta com o ponteiro
 * e as classes finais saem prontas para colar no `Manifesto`.
 *
 * Fica oculto por padrão. Para chamá-lo, acrescente `?estampa` à URL —
 * `localhost:3000/site4?estampa`. A funcionalidade continua inteira; o que
 * mudou é que ela não polui a tela em toda visita.
 *
 * Só existe em desenvolvimento: `process.env.NODE_ENV` é substituído por
 * literal no build, então em produção a condição vira `false` e o componente
 * inteiro sai do bundle.
 *
 * Escreve direto no `style` do elemento, sem passar por estado a cada quadro —
 * o React aqui existe só para o painel mostrar o número.
 */

/** Passo das setas. O Shift multiplica — antes 1% era lento demais. */
const PASSO = 2;
const PASSO_TURBO = 10;

export type PosicaoEstampa = {
  left: number;
  bottom: number;
  largura: number;
};

const arredondar = (v: number) => Math.round(v * 10) / 10;

/** Tailwind escreve deslocamento negativo com o hífen antes da propriedade. */
function classePosicao(prop: "left" | "bottom", v: number) {
  return v < 0 ? `-${prop}-[${Math.abs(v)}%]` : `${prop}-[${v}%]`;
}

export function AjusteEstampa({
  alvo: nomeAlvo,
  rotulo,
  padrao,
  className,
}: {
  /** Valor do `data-estampa` do elemento a mover. */
  alvo: string;
  /** Nome curto no painel — há mais de uma estampa na página. */
  rotulo: string;
  /** Valores que estão hoje nas classes, para o botão "Zerar" bater. */
  padrao: PosicaoEstampa;
  /** Posição do painel, para dois deles não empilharem no mesmo canto. */
  className?: string;
}) {
  const [ativo, setAtivo] = React.useState(false);
  const [pos, setPos] = React.useState(padrao);
  const [copiado, setCopiado] = React.useState(false);

  // Lido no cliente, e não por `useSearchParams`, para não forçar a rota
  // inteira a sair da renderização estática por causa de uma ferramenta.
  const [chamado, setChamado] = React.useState(false);
  React.useEffect(() => {
    setChamado(new URLSearchParams(window.location.search).has("estampa"));
  }, []);

  const alvo = React.useRef<HTMLElement | null>(null);
  const inicio = React.useRef<{
    x: number;
    y: number;
    left: number;
    bottom: number;
    w: number;
    h: number;
  } | null>(null);

  React.useEffect(() => {
    alvo.current = document.querySelector<HTMLElement>(
      `[data-estampa="${nomeAlvo}"]`
    );
  }, [nomeAlvo]);

  const aplicar = React.useCallback(
    (p: PosicaoEstampa) => {
      const el = alvo.current;
      if (!el) return;
      el.style.left = `${p.left}%`;
      el.style.bottom = `${p.bottom}%`;
      el.style.width = `${p.largura}vw`;
      el.style.maxWidth = "none";
    },
    []
  );

  /** Devolve o elemento ao que está escrito nas classes. */
  React.useEffect(() => {
    if (ativo) return;
    const el = alvo.current;
    if (!el) return;
    el.style.left = "";
    el.style.bottom = "";
    el.style.width = "";
    el.style.maxWidth = "";
  }, [ativo]);

  const mover = React.useCallback(
    (dLeft: number, dBottom: number, dLargura = 0) => {
      setPos((atual) => {
        const proximo = {
          left: arredondar(atual.left + dLeft),
          bottom: arredondar(atual.bottom + dBottom),
          largura: Math.max(10, arredondar(atual.largura + dLargura)),
        };
        aplicar(proximo);
        return proximo;
      });
    },
    [aplicar]
  );

  /** Setas de verdade, além dos botões do painel. */
  React.useEffect(() => {
    if (!ativo) return;
    const aoTeclar = (e: KeyboardEvent) => {
      const passo = e.shiftKey ? PASSO_TURBO : PASSO;
      const mapa: Record<string, [number, number]> = {
        ArrowLeft: [-passo, 0],
        ArrowRight: [passo, 0],
        ArrowUp: [0, passo],
        ArrowDown: [0, -passo],
      };
      const d = mapa[e.key];
      if (!d) return;
      e.preventDefault();
      mover(d[0], d[1]);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [ativo, mover]);

  const aoPressionar = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const caixa = e.currentTarget.getBoundingClientRect();
    inicio.current = {
      x: e.clientX,
      y: e.clientY,
      left: pos.left,
      bottom: pos.bottom,
      w: caixa.width,
      h: caixa.height,
    };
  };

  const aoMover = (e: React.PointerEvent) => {
    const i = inicio.current;
    if (!i) return;
    // Manipulação direta: a estampa acompanha o ponteiro. `bottom` cresce para
    // cima, daí o sinal invertido no eixo vertical.
    const proximo = {
      left: arredondar(i.left + ((e.clientX - i.x) / i.w) * 100),
      bottom: arredondar(i.bottom - ((e.clientY - i.y) / i.h) * 100),
      largura: pos.largura,
    };
    aplicar(proximo);
    setPos(proximo);
  };

  const aoSoltar = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    inicio.current = null;
  };

  const classes = `${classePosicao("bottom", pos.bottom)} ${classePosicao(
    "left",
    pos.left
  )} w-[${pos.largura}vw]`;

  if (process.env.NODE_ENV !== "development" || !chamado) return null;

  return (
    <>
      {ativo && (
        <div
          onPointerDown={aoPressionar}
          onPointerMove={aoMover}
          onPointerUp={aoSoltar}
          onPointerCancel={aoSoltar}
          className="absolute inset-0 z-40 cursor-grab touch-none active:cursor-grabbing"
          role="presentation"
        />
      )}

      <div
        className={cn(
          "fixed bottom-4 z-[100] flex w-60 flex-col gap-2 rounded-xl border border-border bg-popover/95 p-3 font-mono text-xs text-popover-foreground shadow-xl backdrop-blur",
          className ?? "left-4"
        )}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAtivo((v) => !v)}
            className="rounded-md bg-primary px-2 py-1 font-sans text-primary-foreground"
          >
            {ativo ? "Concluir" : "Ajustar"}
          </button>
          <span className="font-sans text-muted-foreground">{rotulo}</span>
        </div>

        {ativo && (
          <>
            <p className="font-sans leading-snug text-muted-foreground">
              Arraste a estampa, ou use as setas do teclado. Shift move{" "}
              {PASSO_TURBO}% de uma vez.
            </p>

            <div className="flex items-center gap-1">
              {(
                [
                  ["←", -PASSO, 0],
                  ["→", PASSO, 0],
                  ["↑", 0, PASSO],
                  ["↓", 0, -PASSO],
                ] as const
              ).map(([rotulo, dl, db]) => (
                <button
                  key={rotulo}
                  type="button"
                  onClick={() => mover(dl, db)}
                  className="size-7 rounded-md border border-border hover:bg-muted"
                >
                  {rotulo}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <span className="font-sans text-muted-foreground">tamanho</span>
              <button
                type="button"
                onClick={() => mover(0, 0, -10)}
                className="size-7 rounded-md border border-border hover:bg-muted"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => mover(0, 0, 10)}
                className="size-7 rounded-md border border-border hover:bg-muted"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  setPos(padrao);
                  aplicar(padrao);
                }}
                className="ml-auto rounded-md border border-border px-2 py-1 font-sans hover:bg-muted"
              >
                Zerar
              </button>
            </div>

            <code className="rounded-md bg-muted px-2 py-1 leading-relaxed break-all select-all">
              {classes}
            </code>

            <button
              type="button"
              onClick={() => {
                void navigator.clipboard.writeText(classes);
                setCopiado(true);
                setTimeout(() => setCopiado(false), 1500);
              }}
              className="rounded-md border border-border px-2 py-1 font-sans hover:bg-muted"
            >
              {copiado ? "Copiado" : "Copiar classes"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
