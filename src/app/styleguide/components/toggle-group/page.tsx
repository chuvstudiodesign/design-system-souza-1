"use client";

import * as React from "react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupPage() {
  const [align, setAlign] = React.useState("center");
  const [formats, setFormats] = React.useState<string[]>(["bold"]);

  return (
    <ComponentPage
      title="Toggle Group"
      category="Inputs & Forms"
      description="Conjunto de toggles relacionados. Em type='single' funciona como um seletor exclusivo; em type='multiple', como uma barra de formatação."
      install="npx shadcn@latest add toggle-group"
      importCode={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`}
    >
      <Demo
        title="Múltipla escolha"
        code={`<ToggleGroup type="multiple" defaultValue={["bold"]}>
  <ToggleGroupItem value="bold" aria-label="Negrito">
    <BoldIcon />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Itálico">
    <ItalicIcon />
  </ToggleGroupItem>
</ToggleGroup>`}
      >
        <ToggleGroup
          type="multiple"
          value={formats}
          onValueChange={setFormats}
          variant="outline"
        >
          <ToggleGroupItem value="bold" aria-label="Negrito">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Itálico">
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Sublinhado">
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="font-mono text-xs text-muted-foreground">
          [{formats.join(", ")}]
        </span>
      </Demo>

      <Demo
        title="Escolha única"
        code={`<ToggleGroup type="single" value={align} onValueChange={setAlign}>
  <ToggleGroupItem value="left" aria-label="Esquerda">
    <AlignLeftIcon />
  </ToggleGroupItem>
  …
</ToggleGroup>`}
      >
        <ToggleGroup
          type="single"
          value={align}
          onValueChange={(value) => value && setAlign(value)}
        >
          <ToggleGroupItem value="left" aria-label="Alinhar à esquerda">
            <AlignLeftIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Centralizar">
            <AlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Alinhar à direita">
            <AlignRightIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="font-mono text-xs text-muted-foreground">{align}</span>
      </Demo>

      <Demo
        title="Variantes e tamanhos"
        contentClassName="flex-col items-start"
        code={`<ToggleGroup type="single" variant="outline" size="sm">…</ToggleGroup>
<ToggleGroup type="single" variant="default" size="lg">…</ToggleGroup>`}
      >
        <ToggleGroup type="single" variant="outline" size="sm" defaultValue="a">
          <ToggleGroupItem value="a">Dia</ToggleGroupItem>
          <ToggleGroupItem value="b">Semana</ToggleGroupItem>
          <ToggleGroupItem value="c">Mês</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" variant="default" size="lg" defaultValue="b">
          <ToggleGroupItem value="a">Dia</ToggleGroupItem>
          <ToggleGroupItem value="b">Semana</ToggleGroupItem>
          <ToggleGroupItem value="c">Mês</ToggleGroupItem>
        </ToggleGroup>
      </Demo>

      <Demo
        title="Estados"
        code={`<ToggleGroup type="single" disabled>…</ToggleGroup>
<ToggleGroupItem value="x" disabled>…</ToggleGroupItem>`}
      >
        <ToggleGroup type="single" variant="outline" disabled defaultValue="a">
          <ToggleGroupItem value="a">Grupo desabilitado</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" variant="outline" defaultValue="a">
          <ToggleGroupItem value="a">Ativo</ToggleGroupItem>
          <ToggleGroupItem value="b" disabled>
            Item desabilitado
          </ToggleGroupItem>
        </ToggleGroup>
      </Demo>

      <Usage
        code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ViewSwitcher() {
  const [view, setView] = React.useState("week")

  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(v) => v && setView(v)}
    >
      <ToggleGroupItem value="day">Dia</ToggleGroupItem>
      <ToggleGroupItem value="week">Semana</ToggleGroupItem>
    </ToggleGroup>
  )
}`}
      />

      <PropsTable
        title="Props — ToggleGroup"
        rows={[
          {
            prop: "type",
            type: '"single" | "multiple"',
            description: "Obrigatório: define exclusividade da seleção.",
          },
          {
            prop: "value / defaultValue",
            type: "string | string[]",
            description: "String em single, array em multiple.",
          },
          {
            prop: "onValueChange",
            type: "(value: string | string[]) => void",
            description:
              "Em single pode retornar string vazia ao desmarcar — trate esse caso.",
          },
          {
            prop: "variant",
            type: '"default" | "outline"',
            default: '"default"',
            description: "Estilo herdado pelos itens.",
          },
          {
            prop: "size",
            type: '"sm" | "default" | "lg"',
            default: '"default"',
            description: "Tamanho herdado pelos itens.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Desabilita todo o grupo.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Entra no grupo (roving tabindex)." },
          { keys: "← / →", description: "Move entre os itens." },
          { keys: "Home / End", description: "Primeiro/último item." },
          { keys: "Space / Enter", description: "Alterna o item focado." },
        ]}
      />

      <A11yNotes
        items={[
          "O grupo usa role=group; em type='single' o comportamento é de radiogroup.",
          "Itens apenas com ícone exigem aria-label individual.",
          "Dê ao grupo um rótulo acessível (aria-label) descrevendo o conjunto, ex.: 'Formatação de texto'.",
          "Em type='single', permitir desmarcar produz value vazio — garanta um fallback no estado.",
        ]}
      />
    </ComponentPage>
  );
}
