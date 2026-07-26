"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SheetPage() {
  return (
    <ComponentPage
      title="Sheet"
      category="Layout"
      description="Painel deslizante ancorado a uma borda da tela. Usa o mesmo motor de diálogo do Radix: foco preso, fechamento por Esc e overlay bloqueante."
      install="npx shadcn@latest add sheet"
      importCode={`import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"`}
    >
      <Demo
        title="Painel lateral (direita)"
        code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Editar cliente</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Editar cliente</SheetTitle>
      <SheetDescription>Altere os dados cadastrais.</SheetDescription>
    </SheetHeader>
    …
    <SheetFooter>
      <Button type="submit">Salvar</Button>
      <SheetClose asChild><Button variant="outline">Cancelar</Button></SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Editar cliente</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Editar cliente</SheetTitle>
              <SheetDescription>
                Altere os dados cadastrais do cliente.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="sheet-nome">Nome</Label>
                <Input id="sheet-nome" defaultValue="Souza & Souza LTDA" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="sheet-email">E-mail</Label>
                <Input id="sheet-email" defaultValue="contato@souza.adv.br" />
              </div>
            </div>
            <SheetFooter>
              <Button>Salvar alterações</Button>
              <SheetClose asChild>
                <Button variant="outline">Cancelar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Demo>

      <Demo
        title="Todos os lados"
        code={`<SheetContent side="top">…</SheetContent>
<SheetContent side="right">…</SheetContent>
<SheetContent side="bottom">…</SheetContent>
<SheetContent side="left">…</SheetContent>`}
      >
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="secondary" size="sm" className="capitalize">
                {side}
              </Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle className="capitalize">Painel {side}</SheetTitle>
                <SheetDescription>
                  Conteúdo ancorado na borda {side}.
                </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Fechar</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </Demo>

      <Demo
        title="Largura customizada"
        code={`<SheetContent className="w-full sm:max-w-lg">…</SheetContent>`}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Painel largo</Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Detalhes do processo</SheetTitle>
              <SheetDescription>
                Espaço maior para tabelas e formulários extensos.
              </SheetDescription>
            </SheetHeader>
            <div className="px-4 text-sm text-muted-foreground">
              Use larguras maiores apenas quando o conteúdo exigir; painéis
              muito largos competem com a página principal.
            </div>
          </SheetContent>
        </Sheet>
      </Demo>

      <Usage
        code={`import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Filters() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filtrar processos</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "open / defaultOpen",
            type: "boolean",
            description: "Controle da visibilidade.",
          },
          {
            prop: "onOpenChange",
            type: "(open: boolean) => void",
            description: "Callback de abertura/fechamento.",
          },
          {
            prop: "side (SheetContent)",
            type: '"top" | "right" | "bottom" | "left"',
            default: '"right"',
            description: "Borda de ancoragem do painel.",
          },
          {
            prop: "modal",
            type: "boolean",
            default: "true",
            description:
              "Quando false, o conteúdo atrás continua interativo (sem overlay bloqueante).",
          },
          {
            prop: "asChild (Trigger/Close)",
            type: "boolean",
            description: "Usa o filho como elemento de gatilho/fechamento.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Enter / Space", description: "Abre o painel pelo gatilho." },
          { keys: "Tab / Shift+Tab", description: "Circula o foco dentro do painel." },
          { keys: "Esc", description: "Fecha o painel e devolve o foco ao gatilho." },
        ]}
      />

      <A11yNotes
        items={[
          "Renderiza role=dialog com aria-modal — o foco fica preso enquanto aberto.",
          "SheetTitle é obrigatório para o rótulo acessível; se for oculto visualmente, use sr-only.",
          "SheetDescription vira aria-describedby do diálogo.",
          "O botão de fechar já inclui texto em sr-only.",
          "Em telas pequenas, prefira side='bottom' — é mais alcançável com o polegar.",
        ]}
      />
    </ComponentPage>
  );
}
