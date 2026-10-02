"use client";

import { ArrowUpRightIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { trecho, type Depoimento } from "./dados";

/**
 * O texto do destaque, sempre no mesmo tamanho de fonte.
 *
 * Depoimento até o comprimento-alvo aparece inteiro; o mais longo aparece
 * como trecho (`trecho()` em `dados.ts`) e ganha "Ler depoimento completo",
 * que abre o texto integral num diálogo. Diálogo e não expansão: expandir
 * quebraria a altura fixa do destaque e empurraria a página. Enquanto o
 * diálogo está aberto, `aoAbrir(true)` segura o carrossel.
 *
 * O portal do Radix monta fora da subárvore `.dark` da `/site`, por isso o
 * `dark` repetido no conteúdo (mesma solução de `dialogo-area.tsx`).
 */
export function Citacao({
  depoimento,
  aoAbrir,
  className,
  classeLink,
}: {
  depoimento: Depoimento;
  aoAbrir: (aberto: boolean) => void;
  /** Escala tipográfica do destaque — a mesma para todos os depoimentos. */
  className?: string;
  classeLink?: string;
}) {
  const { texto, cortado } = trecho(depoimento.texto);

  return (
    <>
      <blockquote className={cn("whitespace-pre-line", className)}>
        {texto}
      </blockquote>

      {cortado ? (
        <Dialog onOpenChange={aoAbrir}>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className={cn(
                "mt-4 h-auto min-h-11 max-w-full gap-1.5 px-0 text-base whitespace-normal underline-offset-4",
                classeLink
              )}
            >
              Ler depoimento completo
              <ArrowUpRightIcon aria-hidden className="size-4" />
            </Button>
          </DialogTrigger>

          <DialogContent
            showCloseButton={false}
            className="dark max-h-[min(40rem,calc(100dvh-2rem))] gap-0 overflow-y-auto overscroll-contain rounded-3xl bg-popover p-7 text-popover-foreground shadow-2xl ring-1 ring-gold-500/30 sm:max-w-2xl sm:p-10 md:p-12"
          >
            <span
              aria-hidden
              className="-mb-4 block font-display text-[4.05rem] leading-none text-gold-400 select-none"
            >
              &ldquo;
            </span>
            <blockquote className="text-[clamp(0.9563rem,0.9rem+0.27vw,1.125rem)] leading-relaxed whitespace-pre-line text-pretty">
              {depoimento.texto}
            </blockquote>
            <div className="mt-8 border-t border-border pt-6">
              <DialogTitle className="text-[0.9563rem] leading-snug font-medium">
                {depoimento.autor}
              </DialogTitle>
              {depoimento.servico ? (
                <DialogDescription className="mt-1 text-[0.9563rem] text-muted-foreground">
                  {depoimento.servico}
                </DialogDescription>
              ) : (
                <DialogDescription className="sr-only">
                  {depoimento.autor}
                </DialogDescription>
              )}
            </div>

            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 size-11 rounded-full [&_svg:not([class*='size-'])]:size-5"
              >
                <XIcon aria-hidden />
                <span className="sr-only">Fechar</span>
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
