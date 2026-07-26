"use client";

import * as React from "react";
import { ChevronsUpDownIcon } from "lucide-react";

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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function CollapsiblePage() {
  const [open, setOpen] = React.useState(false);

  return (
    <ComponentPage
      title="Collapsible"
      category="Layout"
      description="Primitiva de mostrar/esconder um bloco de conteúdo. Diferente do Accordion, não pressupõe lista de seções — é a base para menus expansíveis e áreas de detalhes."
      install="npx shadcn@latest add collapsible"
      importCode={`import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-stretch"
        code={`<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Ver movimentações</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}
      >
        <Collapsible className="w-full max-w-md">
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
            <span className="text-sm font-medium">
              Processo 1000123-45.2026.8.26.0100
            </span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Expandir">
                <ChevronsUpDownIcon />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2 flex flex-col gap-2">
            {[
              "12/03 — Petição inicial protocolada",
              "18/03 — Citação expedida",
              "02/04 — Contestação apresentada",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </Demo>

      <Demo
        title="Controlado"
        contentClassName="flex-col items-stretch"
        code={`const [open, setOpen] = React.useState(false)

<Collapsible open={open} onOpenChange={setOpen}>…</Collapsible>`}
      >
        <div className="flex w-full max-w-md flex-col gap-3">
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline">
                {open ? "Ocultar detalhes" : "Mostrar detalhes"}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 rounded-lg border border-border p-4 text-sm text-muted-foreground">
              Honorários contratados: 12 parcelas mensais. Reajuste anual pelo
              IPCA. Rescisão com aviso prévio de 30 dias.
            </CollapsibleContent>
          </Collapsible>
          <span className="font-mono text-xs text-muted-foreground">
            open: {String(open)}
          </span>
        </div>
      </Demo>

      <Demo
        title="Desabilitado"
        contentClassName="flex-col items-stretch"
        code={`<Collapsible disabled>…</Collapsible>`}
      >
        <Collapsible disabled className="w-full max-w-md">
          <CollapsibleTrigger asChild>
            <Button variant="outline" disabled>
              Conteúdo indisponível
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>Nunca aparece.</CollapsibleContent>
        </Collapsible>
      </Demo>

      <Usage
        code={`import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function Details({ children }: { children: React.ReactNode }) {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="ghost">Detalhes</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "open / defaultOpen",
            type: "boolean",
            description: "Estado controlado ou inicial.",
          },
          {
            prop: "onOpenChange",
            type: "(open: boolean) => void",
            description: "Callback de abertura/fechamento.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Bloqueia a interação.",
          },
          {
            prop: "asChild (Trigger)",
            type: "boolean",
            default: "false",
            description: "Usa o filho como gatilho (ex.: Button).",
          },
          {
            prop: "forceMount (Content)",
            type: "boolean",
            description:
              "Mantém o conteúdo montado — útil para animações ou SEO.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Foca o gatilho." },
          { keys: "Space / Enter", description: "Alterna o conteúdo." },
        ]}
      />

      <A11yNotes
        items={[
          "O gatilho recebe aria-expanded e aria-controls apontando para o conteúdo.",
          "Com asChild, o elemento filho precisa ser focável (button ou link).",
          "Conteúdo fechado sai da árvore de acessibilidade — não esconda informações críticas de erro dentro dele.",
          "Para grupos de seções relacionadas, prefira Accordion (navegação por setas entre gatilhos).",
        ]}
      />
    </ComponentPage>
  );
}
