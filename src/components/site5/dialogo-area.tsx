"use client";

import * as React from "react";
import Link from "next/link";
import { Dialog as DialogPrimitive } from "radix-ui";
import { ArrowRightIcon, XIcon } from "lucide-react";

import type { ConfigVidro } from "@/components/site5/controle-vidro";
import { WhatsAppGlyph } from "@/components/site5/glifos";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { whatsappHref } from "@/lib/site5/contato";
import { home, type AreaDeAtuacao } from "@/lib/site5/conteudo";

/**
 * Detalhe de uma área de atuação em pop-up de liquid glass.
 *
 * Na `/site` substitui a navegação para a página de serviços: a lista de
 * áreas continua sendo o índice, e o conteúdo abre por cima dela sem tirar o
 * visitante do lugar.
 *
 * Duas decisões estruturam o componente:
 *
 * · **O vidro é o próprio `Dialog.Content`.** `LiquidGlass` entra com `asChild`
 *   e empresta o material ao nó do Radix, em vez de envolvê-lo. Envolver criaria
 *   uma caixa a mais entre o portal e o conteúdo, e é o nó do Radix que precisa
 *   receber foco, `aria-modal` e o dismiss — por isso a composição é esta e não
 *   um `<div>` de vidro por fora. Como `DialogContent` do design system não
 *   aceita `asChild` (e já traz `bg-popover` e `max-w-sm` embutidos, que é o
 *   oposto do que este pop-up quer), a montagem usa o primitivo direto.
 *
 * · **Vidro segura a moldura, card segura o conteúdo.** O material da Apple é
 *   para a camada funcional que flutua, não para a camada de conteúdo. Então o
 *   painel é vidro e cada item da área é um `Card` — translúcido, para o vidro
 *   continuar legível por trás, mas com a estrutura e o raio do design system.
 *   Um único nível de cada: nada de vidro dentro de vidro.
 *
 * O portal monta na raiz do documento, fora da subárvore `.dark` que a `/site`
 * declara no layout — daí a classe `dark` repetida no overlay e no conteúdo.
 */

/**
 * Calibragem do vidro deste pop-up, fechada no painel `?vidro`.
 *
 * Sai do preset `panel` em três pontos, todos na direção de um vidro mais
 * presente: espessura 42 no lugar de 38, refração 1.9 no lugar de 1.5 e blur
 * 6.5 no lugar de 3. O `dim` de 0.27 é o que segura a legibilidade depois disso
 * — sem ele, o material mais transparente deixaria o texto disputar espaço com
 * o que passa por trás.
 *
 * É a única fonte desses números: o painel de ajuste parte daqui e é para cá
 * que o botão "Zerar" volta, então o que se vê ajustando é o que vai ao ar.
 */
export const VIDRO_DIALOGO: ConfigVidro = {
  variant: "regular",
  profile: "convex",
  thickness: 42,
  refraction: 1.9,
  ior: 1.48,
  dispersion: 0.5,
  blur: 6.5,
  edgeLight: 0.3,
  noise: 0.1,
  dim: 0.27,
  elevation: "xl",
  fundoOpacidade: 75, // 65 → 75: fundo mais escuro para legibilidade do pop-up (pedido 24/09)
  fundoDesfoque: 0,
};

export function DialogoArea({
  area,
  open,
  onOpenChange,
  vidro,
}: {
  /** `null` mantém o diálogo montado sem conteúdo entre uma abertura e outra. */
  area: AreaDeAtuacao | null;
  open: boolean;
  onOpenChange: (aberto: boolean) => void;
  /**
   * Só chega preenchido com o painel de ajuste em uso. Quando é `null`, o vidro
   * fica no preset estático e nada no comportamento do diálogo muda — o caminho
   * de produção não sabe que esta prop existe.
   */
  vidro?: ConfigVidro | null;
}) {
  if (!area) return null;

  // Caminho único: sem o painel, `vidro` é `null` e vale a calibragem fechada.
  // Renderizar os dois casos pelo mesmo código é o que garante que ajustar não
  // seja uma prévia de algo diferente do que a produção monta.
  const v = vidro ?? VIDRO_DIALOGO;

  return (
    // Com o painel aberto o diálogo sai do modo modal: modal trava os eventos
    // de ponteiro do resto da página e prende o foco dentro do conteúdo, o que
    // deixaria os controles inertes enquanto o pop-up estivesse aberto — que é
    // justamente quando eles precisam funcionar.
    <Dialog open={open} onOpenChange={onOpenChange} modal={!vidro}>
      <DialogPortal>
        {/* Fundo próprio, no lugar do `DialogOverlay`.
            Dois motivos, ambos de comportamento e nenhum estético:

            · O overlay do Radix carrega o `RemoveScroll`, que tranca a rolagem
              da página inteira enquanto o diálogo está aberto. Como o conteúdo
              desta área cabe na tela sem rolar, isso deixava a roda do mouse
              sem efeito em lugar nenhum. Sem o overlay do Radix não há trava, e
              a página volta a rolar por trás do pop-up, que é fixo e fica no
              lugar.

            · O `DialogOverlay` só renderiza quando o diálogo é modal, e o
              painel de ajuste precisa do modo não-modal. Com ele, os controles
              de fundo escuro e desfoque não tinham o que pintar.

            O `data-state` é escrito à mão porque este nó não passa pelo Radix,
            e o `Presence` do portal depende dele para segurar a saída até a
            animação terminar. */}
        <div
          aria-hidden
          data-state={open ? "open" : "closed"}
          className="dark fixed inset-0 z-[55] duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none"
          style={{
            backgroundColor: `color-mix(in oklab, var(--brand-950) ${v.fundoOpacidade}%, transparent)`,
            backdropFilter:
              v.fundoDesfoque > 0 ? `blur(${v.fundoDesfoque}px)` : "none",
          }}
        />

        <LiquidGlass
          variant={v.variant}
          profile={v.profile}
          thickness={v.thickness}
          refraction={v.refraction}
          ior={v.ior}
          dispersion={v.dispersion}
          blur={v.blur}
          edgeLight={v.edgeLight}
          noise={v.noise}
          dim={v.dim}
          elevation={v.elevation}
          asChild
        >
          <DialogPrimitive.Content
            // Clique no painel de ajuste é clique de fora para o Radix, e
            // fecharia o pop-up ao primeiro arrasto de slider.
            onInteractOutside={(evento) => {
              const alvo = evento.target as Element | null;
              if (alvo?.closest?.("[data-painel-vidro]")) evento.preventDefault();
            }}
            className="dark tipo-90 fixed top-1/2 left-1/2 z-[60] flex max-h-[min(48rem,calc(100dvh-2rem))] w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden text-foreground [@media(max-height:42rem)]:overflow-y-auto duration-200 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 motion-reduce:animate-none"
          >
            {/* Alvo de 44px: o X é o único meio visível de fechar. */}
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 size-11"
              >
                <XIcon aria-hidden className="size-5" />
                <span className="sr-only">Fechar</span>
              </Button>
            </DialogClose>

            {/* Cabeçalho fixo: só sobretítulo, título e o X. Em tela baixa
                tudo que não é essencial desce para a região rolável, para que
                o rodapé com as ações nunca seja cortado. O `pr` reserva o
                espaço do X só na linha do título. */}
            <div className="shrink-0 px-6 pt-8 pb-4 md:px-10 md:pt-10">
              <p className="pr-12 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {home.areas.sobretitulo}
              </p>

              <DialogTitle className="mt-3 pr-12 font-display text-[clamp(1.35rem,1.08rem+1.26vw,2.025rem)] leading-tight tracking-[0.02em] md:pr-10">
                {area.nome}
              </DialogTitle>

              <div aria-hidden className="mt-4 h-px w-24 rule-gold" />
            </div>

            {/* Descrição e itens: única região que rola. O `pt-1` dá folga ao
                `ring-1` dos cards, desenhado para fora da caixa.

                Abaixo de 34rem de altura (celular deitado) quem rola é o
                diálogo inteiro — cabeçalho e rodapé fixos não deixariam espaço
                para a lista —, e esta região passa a crescer com o conteúdo. */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-1 pb-6 md:px-10 [@media(max-height:42rem)]:flex-none [@media(max-height:42rem)]:shrink-0 [@media(max-height:42rem)]:overflow-visible">
              {/* Diagramação da v4: descrição em corpo pequeno, cards de altura
                  uniforme em 3 colunas, rodapé com botões de tamanho padrão. */}
              <DialogDescription className="mb-5 max-w-[68ch] text-[0.9688rem] leading-relaxed text-pretty text-muted-foreground">
                {area.descricao}
              </DialogDescription>

              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {area.itens.map((item, indice) => (
                  <li key={item} className="min-w-0">
                    <Card
                      size="sm"
                      className="h-full min-h-24 bg-card/45 ring-foreground/15 transition-colors duration-300 hover:bg-card/70 lg:min-h-20"
                    >
                      <CardContent className="flex min-h-0 flex-1 items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-0.5 font-display text-xs tracking-[0.18em] text-gold-400"
                        >
                          {String(indice + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 text-pretty">
                          {item}
                        </span>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>

              {area.nota ? (
                <p className="mt-6 max-w-[68ch] border-l-2 border-gold-500/60 pl-4 text-[0.9688rem] leading-relaxed text-pretty text-muted-foreground">
                  {area.nota}
                </p>
              ) : null}
            </div>

            {/* Rodapé */}
            <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-border/60 px-6 py-5 sm:flex-row sm:justify-end md:px-10">
              <Button
                asChild
                variant="ghost"
                className="w-full sm:w-auto"
              >
                <Link href={`/site/servicos#${area.slug}`}>
                  Ver em Serviços
                  <ArrowRightIcon aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppGlyph className="size-4" />
                  {home.contato.botao}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </Button>
            </div>
          </DialogPrimitive.Content>
        </LiquidGlass>
      </DialogPortal>
    </Dialog>
  );
}
