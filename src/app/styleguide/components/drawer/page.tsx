"use client";

import * as React from "react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DrawerPage() {
  return (
    <ComponentPage
      title="Drawer"
      category="Overlay"
      description="Painel deslizante com gesto de arraste (baseado no Vaul). Pensado para mobile: o usuário pode fechar puxando, e o conteúdo acompanha o movimento do dedo."
      install="npx shadcn@latest add drawer"
      importCode={`import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"`}
    >
      <Demo
        title="Básico (bottom)"
        description="Arraste a alça para baixo para fechar."
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Abrir drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Filtrar processos</DrawerTitle>
      <DrawerDescription>Refine a listagem.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Aplicar</Button>
      <DrawerClose asChild><Button variant="outline">Cancelar</Button></DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Abrir drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader>
                <DrawerTitle>Filtrar processos</DrawerTitle>
                <DrawerDescription>
                  Refine a listagem por cliente, área ou prazo.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col gap-3 px-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="drawer-cliente">Cliente</Label>
                  <Input id="drawer-cliente" placeholder="Nome do cliente" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="drawer-numero">Número</Label>
                  <Input id="drawer-numero" placeholder="0000000-00…" />
                </div>
              </div>
              <DrawerFooter>
                <Button>Aplicar filtros</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </Demo>

      <Demo
        title="Direções"
        code={`<Drawer direction="right">…</Drawer>
<Drawer direction="left">…</Drawer>
<Drawer direction="top">…</Drawer>`}
      >
        {(["top", "right", "bottom", "left"] as const).map((direction) => (
          <Drawer key={direction} direction={direction}>
            <DrawerTrigger asChild>
              <Button variant="secondary" size="sm" className="capitalize">
                {direction}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="capitalize">
                  Drawer {direction}
                </DrawerTitle>
                <DrawerDescription>
                  Painel ancorado na direção {direction}.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Fechar</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </Demo>

      <Demo
        title="Sem modal"
        description="modal={false} mantém a página de trás interativa."
        code={`<Drawer modal={false}>…</Drawer>`}
      >
        <Drawer modal={false}>
          <DrawerTrigger asChild>
            <Button variant="outline">Drawer não modal</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader>
                <DrawerTitle>Assistente de preenchimento</DrawerTitle>
                <DrawerDescription>
                  Você pode continuar interagindo com a página enquanto este
                  painel estiver aberto.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Fechar</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </Demo>

      <Usage
        title="Responsivo: Dialog no desktop, Drawer no mobile"
        code={`import { useIsMobile } from "@/hooks/use-mobile"

export function ResponsiveModal({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild><Button>Abrir</Button></DrawerTrigger>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild><Button>Abrir</Button></DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "direction",
            type: '"top" | "right" | "bottom" | "left"',
            default: '"bottom"',
            description: "Borda de onde o painel desliza.",
          },
          {
            prop: "open / onOpenChange",
            type: "boolean / (open: boolean) => void",
            description: "Controle da visibilidade.",
          },
          {
            prop: "modal",
            type: "boolean",
            default: "true",
            description: "Bloqueia (ou não) a interação com o fundo.",
          },
          {
            prop: "snapPoints / activeSnapPoint",
            type: "(string | number)[]",
            description:
              "Pontos de parada intermediários — permite o drawer abrir parcialmente.",
          },
          {
            prop: "dismissible",
            type: "boolean",
            default: "true",
            description:
              "Quando false, o gesto de arraste não fecha o painel.",
          },
          {
            prop: "shouldScaleBackground",
            type: "boolean",
            description: "Efeito de escala no conteúdo de fundo (estilo iOS).",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Enter / Space", description: "Abre pelo gatilho." },
          { keys: "Tab / Shift+Tab", description: "Circula o foco dentro do painel." },
          { keys: "Esc", description: "Fecha o drawer." },
        ]}
      />

      <A11yNotes
        items={[
          "role=dialog com foco preso — as mesmas garantias do Dialog, mais o gesto de arraste.",
          "DrawerTitle é obrigatório para o rótulo acessível.",
          "A alça de arraste é decorativa: o fechamento também precisa estar disponível por botão e por Esc.",
          "Prefira Drawer no mobile e Dialog/Sheet no desktop — nunca dependa apenas do gesto.",
        ]}
      />
    </ComponentPage>
  );
}
