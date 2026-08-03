import { DownloadIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Os três fundos oficiais em que a marca pode ser aplicada.
 * Cada um define a superfície do palco e a cor do texto de apoio que vai
 * por cima dele — o rótulo do fundo é escrito dentro do próprio palco, então
 * precisa acompanhar o contraste.
 */
export const fundos = {
  dourado: {
    rotulo: "Degradê dourado",
    detalhe: "#D4C575 → #BCA14C · 45°",
    palco: "bg-gold-gradient",
    tinta: "text-brand-950/55",
    borda: "border-gold-600/30",
  },
  azul: {
    rotulo: "Azul institucional",
    detalhe: "brand-900 · #0C344D",
    palco: "bg-brand-900",
    tinta: "text-gold-100/50",
    borda: "border-brand-800",
  },
  branco: {
    rotulo: "Branco",
    detalhe: "#FFFFFF",
    palco: "bg-white",
    tinta: "text-neutral-400",
    borda: "border-neutral-300",
  },
} as const;

export type Fundo = keyof typeof fundos;

/**
 * Palco de aplicação da marca: um fundo oficial, o ativo centralizado nele e
 * os botões para baixar o arquivo em vetor e em bitmap.
 *
 * `svg` e `png` são caminhos dentro de /public. O atributo `download` só
 * funciona em same-origin, que é o caso — os ativos são servidos estáticos.
 */
export function AssetCard({
  titulo,
  descricao,
  fundo,
  svg,
  png,
  altura = "h-44",
  className,
  children,
}: {
  titulo: string;
  descricao?: string;
  fundo: Fundo;
  svg: string;
  png: string;
  altura?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const f = fundos[fundo];

  return (
    <figure
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center border-b p-6",
          altura,
          f.palco,
          f.borda
        )}
      >
        {children}
        <span
          className={cn(
            "absolute bottom-2.5 left-3 font-mono text-[10px] tracking-wide",
            f.tinta
          )}
        >
          {f.rotulo}
        </span>
      </div>

      <figcaption className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold tracking-tight">{titulo}</span>
          {descricao ? (
            <span className="text-xs leading-relaxed text-muted-foreground">
              {descricao}
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          <BotaoDownload href={svg} formato="SVG" />
          <BotaoDownload href={png} formato="PNG" />
        </div>
      </figcaption>
    </figure>
  );
}

/** Botão de download de um formato. `download` força o save em vez de abrir. */
export function BotaoDownload({
  href,
  formato,
  variant = "outline",
}: {
  href: string;
  formato: string;
  variant?: "outline" | "secondary" | "default";
}) {
  return (
    <Button asChild size="sm" variant={variant}>
      <a href={href} download>
        <DownloadIcon data-icon="inline-start" />
        {formato}
      </a>
    </Button>
  );
}

/**
 * Aplicação proibida: o palco com o erro cometido de propósito, marcado, e a
 * frase que diz o que ele quebra.
 *
 * Um manual que só mostra o certo não previne o errado — a pessoa não
 * reconhece o próprio erro quando comete. Por isso o erro aparece renderizado,
 * e não descrito.
 */
export function ErroCard({
  titulo,
  motivo,
  fundo = "bg-secondary",
  ornamento,
  children,
}: {
  titulo: string;
  motivo: string;
  fundo?: string;
  ornamento?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col overflow-hidden rounded-2xl border border-destructive/35 bg-card">
      <div
        className={cn(
          "relative flex h-40 items-center justify-center overflow-hidden p-6",
          fundo
        )}
      >
        {ornamento}
        <div className="relative flex items-center justify-center">
          {children}
        </div>
        <span
          aria-hidden
          className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-full bg-destructive/15 text-destructive"
        >
          <XIcon className="size-3.5" />
        </span>
      </div>

      <figcaption className="flex flex-col gap-1.5 border-t border-destructive/25 p-4">
        <span className="text-sm font-semibold tracking-tight">
          <span className="sr-only">Proibido: </span>
          {titulo}
        </span>
        <span className="text-xs leading-relaxed text-muted-foreground">
          {motivo}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Regra de aplicação: o par pode / não pode, lado a lado.
 * Existe porque a parte mais frágil de um manual de marca é justamente a que
 * ninguém escreve — o que *não* fazer.
 */
export function Regra({
  tipo,
  children,
}: {
  tipo: "pode" | "evite";
  children: React.ReactNode;
}) {
  const pode = tipo === "pode";

  return (
    <li className="flex gap-2.5 text-sm leading-relaxed">
      <span
        aria-hidden
        className={cn(
          "mt-1.5 size-1.5 shrink-0 rounded-full",
          pode ? "bg-success" : "bg-destructive"
        )}
      />
      <span className={pode ? "" : "text-muted-foreground"}>
        <span className="sr-only">{pode ? "Pode: " : "Evite: "}</span>
        {children}
      </span>
    </li>
  );
}
