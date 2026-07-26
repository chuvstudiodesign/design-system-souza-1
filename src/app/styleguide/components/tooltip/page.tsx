"use client";

import { InfoIcon, TrashIcon } from "lucide-react";

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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TooltipPage() {
  return (
    <ComponentPage
      title="Tooltip"
      category="Overlay"
      description="Rótulo textual curto exibido ao pairar ou focar um elemento. Complementa a interface — nunca deve conter a única informação necessária para agir."
      install="npx shadcn@latest add tooltip"
      importCode={`import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"`}
    >
      <Demo
        title="Básico"
        description="O TooltipProvider já está montado globalmente em providers.tsx."
        code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon" aria-label="Excluir">
      <TrashIcon />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Excluir processo</TooltipContent>
</Tooltip>`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Excluir">
              <TrashIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Excluir processo</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Sobre este campo">
              <InfoIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Número único do processo (CNJ)
          </TooltipContent>
        </Tooltip>
      </Demo>

      <Demo
        title="Posicionamento"
        code={`<TooltipContent side="right" align="start" sideOffset={6}>…</TooltipContent>`}
      >
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" className="capitalize">
                {side}
              </Button>
            </TooltipTrigger>
            <TooltipContent side={side}>Lado {side}</TooltipContent>
          </Tooltip>
        ))}
      </Demo>

      <Demo
        title="Atraso customizado"
        code={`<TooltipProvider delayDuration={0}>
  <Tooltip>…</Tooltip>
</TooltipProvider>`}
      >
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Imediato
              </Button>
            </TooltipTrigger>
            <TooltipContent>Abre sem atraso</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={800}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                Com atraso
              </Button>
            </TooltipTrigger>
            <TooltipContent>Abre após 800ms</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Demo>

      <Usage
        code={`// providers.tsx — provider único na raiz da aplicação
<TooltipProvider delayDuration={200}>{children}</TooltipProvider>

// em qualquer componente
<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon" aria-label="Arquivar">
      <ArchiveIcon />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Arquivar processo</TooltipContent>
</Tooltip>`}
      />

      <PropsTable
        rows={[
          {
            prop: "TooltipProvider · delayDuration",
            type: "number",
            default: "700",
            description: "Tempo de hover antes de abrir (ms).",
          },
          {
            prop: "TooltipProvider · skipDelayDuration",
            type: "number",
            default: "300",
            description:
              "Janela em que tooltips seguintes abrem sem atraso.",
          },
          {
            prop: "Tooltip · open / onOpenChange",
            type: "boolean / (open: boolean) => void",
            description: "Controle externo.",
          },
          {
            prop: "TooltipTrigger · asChild",
            type: "boolean",
            default: "false",
            description:
              "Necessário para usar botões e links como gatilho (o elemento precisa ser focável).",
          },
          {
            prop: "TooltipContent · side / sideOffset",
            type: "string / number",
            description: "Posicionamento em relação ao gatilho.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Focar o gatilho exibe o tooltip." },
          { keys: "Esc", description: "Fecha o tooltip aberto." },
        ]}
      />

      <A11yNotes
        items={[
          "O conteúdo é vinculado por aria-describedby — é uma descrição, não um rótulo.",
          "Botões apenas com ícone continuam precisando de aria-label: o tooltip não substitui o nome acessível.",
          "Abre também no foco por teclado, não apenas no hover.",
          "Não funciona em toque — nunca coloque informação essencial só no tooltip.",
          "Não coloque links ou botões dentro do tooltip: para conteúdo interativo, use Popover.",
        ]}
      />
    </ComponentPage>
  );
}
