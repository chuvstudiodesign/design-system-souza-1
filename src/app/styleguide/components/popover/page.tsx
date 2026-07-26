"use client";

import * as React from "react";
import { SettingsIcon } from "lucide-react";

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
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

export default function PopoverPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <ComponentPage
      title="Popover"
      category="Overlay"
      description="Painel flutuante ancorado a um gatilho, com conteúdo interativo. Diferente do Tooltip (apenas texto) e do Dialog (bloqueia a página)."
      install="npx shadcn@latest add popover"
      importCode={`import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"`}
    >
      <Demo
        title="Com formulário"
        code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Dimensões</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <PopoverHeader>
      <PopoverTitle>Dimensões</PopoverTitle>
      <PopoverDescription>Ajuste o tamanho do bloco.</PopoverDescription>
    </PopoverHeader>
    …
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <SettingsIcon /> Preferências da lista
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <PopoverHeader>
              <PopoverTitle>Preferências</PopoverTitle>
              <PopoverDescription>
                Ajustes aplicados apenas a esta visualização.
              </PopoverDescription>
            </PopoverHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="pop-itens">Itens por página</Label>
                <Input id="pop-itens" type="number" defaultValue={20} />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Densidade</Label>
                <Slider defaultValue={[50]} aria-label="Densidade" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Demo>

      <Demo
        title="Posicionamento"
        code={`<PopoverContent side="right" align="start" sideOffset={8}>…</PopoverContent>`}
      >
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Popover key={side}>
            <PopoverTrigger asChild>
              <Button variant="secondary" size="sm" className="capitalize">
                {side}
              </Button>
            </PopoverTrigger>
            <PopoverContent side={side} className="w-48 text-sm">
              Painel ancorado em <span className="font-mono">{side}</span>.
            </PopoverContent>
          </Popover>
        ))}
      </Demo>

      <Demo
        title="Controlado"
        code={`const [open, setOpen] = React.useState(false)

<Popover open={open} onOpenChange={setOpen}>…</Popover>`}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {open ? "Fechar" : "Abrir"} painel
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 text-sm">
            Estado controlado externamente:{" "}
            <span className="font-mono">{String(open)}</span>
            <div className="mt-3">
              <Button size="sm" onClick={() => setOpen(false)}>
                Fechar
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </Demo>

      <Usage
        code={`import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function FilterPopover({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        {children}
      </PopoverContent>
    </Popover>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "open / defaultOpen / onOpenChange",
            type: "boolean / (open: boolean) => void",
            description: "Controle da visibilidade.",
          },
          {
            prop: "modal",
            type: "boolean",
            default: "false",
            description:
              "Quando true, prende o foco e bloqueia a interação de fundo.",
          },
          {
            prop: "side / align (Content)",
            type: '"top" | "right" | "bottom" | "left" / "start" | "center" | "end"',
            default: '"bottom" / "center"',
            description: "Posição relativa ao gatilho.",
          },
          {
            prop: "sideOffset / alignOffset (Content)",
            type: "number",
            description: "Distância em px do gatilho.",
          },
          {
            prop: "PopoverAnchor",
            type: "component",
            description:
              "Permite ancorar o painel em um elemento diferente do gatilho.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Enter / Space", description: "Abre o popover." },
          { keys: "Tab", description: "Navega pelos controles internos." },
          { keys: "Esc", description: "Fecha e devolve o foco ao gatilho." },
        ]}
      />

      <A11yNotes
        items={[
          "O gatilho recebe aria-expanded e aria-controls; o painel é rotulado por PopoverTitle quando presente.",
          "Ao abrir, o foco vai para o primeiro elemento focável do painel; ao fechar, retorna ao gatilho.",
          "Não use Popover para conteúdo puramente textual de apoio — nesse caso, Tooltip é mais leve.",
          "Se o conteúdo exigir decisão bloqueante, use Dialog.",
          "Gatilhos apenas com ícone precisam de aria-label.",
        ]}
      />
    </ComponentPage>
  );
}
