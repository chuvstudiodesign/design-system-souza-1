"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Ajustador de posição, escala e opacidade da estampa — ferramenta de
 * desenvolvimento.
 *
 * Porte do `AjusteEstampa` do /site2 para o styleguide. A diferença está no
 * sistema de coordenadas: lá a estampa é sangrada e posicionada em
 * `left`/`bottom` percentuais com largura em `vw`, porque acompanha a viewport.
 * Aqui ela vive dentro de um cartão de largura fixa, ancorada pelo canto
 * superior direito, então tudo é `top`/`right`/`width` em pixels — e as classes
 * que saem já entram direto no `className` da capa.
 *
 * Só existe em desenvolvimento: `process.env.NODE_ENV` vira literal no build,
 * a condição fecha em `false` e o componente inteiro sai do bundle de produção.
 *
 * Escreve direto no `style` do elemento durante o arraste, sem passar por
 * estado a cada quadro — o React aqui existe só para o painel mostrar o número.
 */

/** Passo das setas, em px. O Shift multiplica. */
const PASSO = 8;
const PASSO_TURBO = 40;
const PASSO_LARGURA = 20;
const PASSO_OPACIDADE = 5;

export type PosicaoEstampa = {
  /** Distância do topo do container, em px. Negativo sangra para cima. */
  top: number;
  /** Distância da borda direita, em px. Negativo sangra para fora. */
  right: number;
  /** Largura renderizada, em px. */
  largura: number;
  /** 0 a 100. Em 100 nenhuma classe de opacidade é emitida. */
  opacidade: number;
};

const arredondar = (v: number) => Math.round(v);

/** Tailwind escreve deslocamento negativo com o hífen antes da propriedade. */
function classePosicao(prop: "top" | "right", v: number) {
  return v < 0 ? `-${prop}-[${Math.abs(v)}px]` : `${prop}-[${v}px]`;
}

function classes({ top, right, largura, opacidade }: PosicaoEstampa) {
  const partes = [
    classePosicao("top", top),
    classePosicao("right", right),
    `w-[${largura}px]`,
  ];
  // 100% é o padrão do elemento — emitir `opacity-100` seria ruído.
  if (opacidade < 100) partes.push(`opacity-${opacidade}`);
  return partes.join(" ");
}

export function AjusteEstampa({
  alvo: nomeAlvo,
  rotulo,
  padrao,
  className,
}: {
  /** Valor do `data-estampa` do elemento a mover. */
  alvo: string;
  /** Nome curto no painel. */
  rotulo: string;
  /** Valores que estão hoje nas classes, para o botão "Zerar" bater. */
  padrao: PosicaoEstampa;
  /** Posição do painel, caso haja mais de um na mesma tela. */
  className?: string;
}) {
  const [ativo, setAtivo] = React.useState(false);
  const [pos, setPos] = React.useState(padrao);
  const [copiado, setCopiado] = React.useState(false);

  const alvo = React.useRef<HTMLElement | null>(null);
  const inicio = React.useRef<{
    x: number;
    y: number;
    top: number;
    right: number;
  } | null>(null);

  React.useEffect(() => {
    alvo.current = document.querySelector<HTMLElement>(
      `[data-estampa="${nomeAlvo}"]`
    );
  }, [nomeAlvo]);

  const aplicar = React.useCallback((p: PosicaoEstampa) => {
    const el = alvo.current;
    if (!el) return;
    el.style.top = `${p.top}px`;
    el.style.right = `${p.right}px`;
    el.style.width = `${p.largura}px`;
    el.style.maxWidth = "none";
    el.style.opacity = String(p.opacidade / 100);
  }, []);

  /** Devolve o elemento ao que está escrito nas classes. */
  React.useEffect(() => {
    if (ativo) return;
    const el = alvo.current;
    if (!el) return;
    el.style.top = "";
    el.style.right = "";
    el.style.width = "";
    el.style.maxWidth = "";
    el.style.opacity = "";
  }, [ativo]);

  const mover = React.useCallback(
    (dTop: number, dRight: number, dLargura = 0, dOpacidade = 0) => {
      setPos((atual) => {
        const proximo = {
          top: arredondar(atual.top + dTop),
          right: arredondar(atual.right + dRight),
          largura: Math.max(40, arredondar(atual.largura + dLargura)),
          opacidade: Math.min(
            100,
            Math.max(0, arredondar(atual.opacidade + dOpacidade))
          ),
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
      // `right` cresce para a esquerda: seta direita precisa diminuí-lo.
      const mapa: Record<string, [number, number]> = {
        ArrowLeft: [0, passo],
        ArrowRight: [0, -passo],
        ArrowUp: [-passo, 0],
        ArrowDown: [passo, 0],
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
    inicio.current = { x: e.clientX, y: e.clientY, top: pos.top, right: pos.right };
  };

  const aoMover = (e: React.PointerEvent) => {
    const i = inicio.current;
    if (!i) return;
    // Manipulação direta em px: a estampa acompanha o ponteiro 1:1. `right`
    // mede a partir da borda direita, daí o sinal invertido no eixo horizontal.
    const proximo = {
      top: arredondar(i.top + (e.clientY - i.y)),
      right: arredondar(i.right - (e.clientX - i.x)),
      largura: pos.largura,
      opacidade: pos.opacidade,
    };
    aplicar(proximo);
    setPos(proximo);
  };

  const aoSoltar = (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    inicio.current = null;
  };

  const saida = classes(pos);

  if (process.env.NODE_ENV !== "development") return null;

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
          "fixed bottom-4 z-[100] flex w-64 flex-col gap-2 rounded-xl border border-border bg-popover/95 p-3 font-mono text-xs text-popover-foreground shadow-xl backdrop-blur",
          // Canto direito por padrão: o indicador de dev do Next ocupa o
          // inferior esquerdo e cobriria o botão de abrir.
          className ?? "right-4"
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
              {PASSO_TURBO}px de uma vez.
            </p>

            <div className="flex items-center gap-1">
              {(
                [
                  ["←", 0, PASSO],
                  ["→", 0, -PASSO],
                  ["↑", -PASSO, 0],
                  ["↓", PASSO, 0],
                ] as const
              ).map(([seta, dt, dr]) => (
                <button
                  key={seta}
                  type="button"
                  onClick={() => mover(dt, dr)}
                  className="size-7 rounded-md border border-border hover:bg-muted"
                >
                  {seta}
                </button>
              ))}
              <span className="ml-auto text-muted-foreground">
                {pos.top} / {pos.right}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="w-16 font-sans text-muted-foreground">
                tamanho
              </span>
              <button
                type="button"
                onClick={() => mover(0, 0, -PASSO_LARGURA)}
                className="size-7 rounded-md border border-border hover:bg-muted"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => mover(0, 0, PASSO_LARGURA)}
                className="size-7 rounded-md border border-border hover:bg-muted"
              >
                +
              </button>
              <span className="ml-auto text-muted-foreground">
                {pos.largura}px
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="w-16 font-sans text-muted-foreground">
                opacidade
              </span>
              <button
                type="button"
                onClick={() => mover(0, 0, 0, -PASSO_OPACIDADE)}
                className="size-7 rounded-md border border-border hover:bg-muted"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => mover(0, 0, 0, PASSO_OPACIDADE)}
                className="size-7 rounded-md border border-border hover:bg-muted"
              >
                +
              </button>
              <span className="ml-auto text-muted-foreground">
                {pos.opacidade}%
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setPos(padrao);
                aplicar(padrao);
              }}
              className="rounded-md border border-border px-2 py-1 font-sans hover:bg-muted"
            >
              Zerar
            </button>

            <code className="rounded-md bg-muted px-2 py-1 leading-relaxed break-all select-all">
              {saida}
            </code>

            <button
              type="button"
              onClick={() => {
                void navigator.clipboard.writeText(saida);
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
