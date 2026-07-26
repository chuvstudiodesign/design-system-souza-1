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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaPage() {
  const [value, setValue] = React.useState("");
  const max = 280;

  return (
    <ComponentPage
      title="Textarea"
      category="Inputs & Forms"
      description="Campo de texto multilinha. Compartilha borda, foco e estados de erro com o Input, com altura mínima confortável para leitura."
      install="npx shadcn@latest add textarea"
      importCode={`import { Textarea } from "@/components/ui/textarea"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-stretch"
        code={`<Label htmlFor="resumo">Resumo do caso</Label>
<Textarea id="resumo" placeholder="Descreva os fatos…" />`}
      >
        <div className="flex w-full max-w-lg flex-col gap-2">
          <Label htmlFor="resumo">Resumo do caso</Label>
          <Textarea id="resumo" placeholder="Descreva os fatos relevantes…" />
        </div>
      </Demo>

      <Demo
        title="Estados"
        contentClassName="flex-col items-stretch"
        code={`<Textarea disabled placeholder="Desabilitado" />
<Textarea readOnly value="Somente leitura" />
<Textarea aria-invalid defaultValue="Texto inválido" />`}
      >
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Textarea disabled placeholder="Desabilitado" />
          <Textarea readOnly value="Somente leitura" />
          <Textarea aria-invalid defaultValue="Campo obrigatório não preenchido" />
          <Textarea rows={6} placeholder="rows = 6" />
        </div>
      </Demo>

      <Demo
        title="Contador de caracteres"
        contentClassName="flex-col items-stretch"
        code={`const [value, setValue] = React.useState("")

<Textarea
  value={value}
  maxLength={280}
  onChange={(e) => setValue(e.target.value)}
  aria-describedby="contador"
/>
<p id="contador" className="text-xs text-muted-foreground">
  {value.length}/280
</p>`}
      >
        <div className="flex w-full max-w-lg flex-col gap-2">
          <Label htmlFor="peticao">Petição resumida</Label>
          <Textarea
            id="peticao"
            value={value}
            maxLength={max}
            onChange={(event) => setValue(event.target.value)}
            aria-describedby="contador"
            placeholder="Máximo de 280 caracteres"
          />
          <p
            id="contador"
            className="self-end font-mono text-xs text-muted-foreground"
          >
            {value.length}/{max}
          </p>
        </div>
      </Demo>

      <Usage
        code={`import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function Notes() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="notes">Anotações</Label>
      <Textarea id="notes" name="notes" rows={5} />
    </div>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "rows",
            type: "number",
            description: "Número de linhas visíveis.",
          },
          {
            prop: "maxLength",
            type: "number",
            description: "Limite de caracteres (validação nativa).",
          },
          {
            prop: "value / defaultValue",
            type: "string",
            description: "Conteúdo controlado ou inicial.",
          },
          {
            prop: "aria-invalid",
            type: "boolean",
            description: "Aplica o estilo de erro.",
          },
          {
            prop: "...props",
            type: "React.ComponentProps<'textarea'>",
            description: "Props nativas repassadas.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Move o foco (não insere tabulação)." },
          { keys: "Enter", description: "Quebra de linha." },
          {
            keys: "Ctrl/⌘ + Enter",
            description: "Convenção comum para enviar o formulário (implemente no onKeyDown).",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Associe sempre um <Label htmlFor> ao id do campo.",
          "Contadores de caracteres devem ser referenciados por aria-describedby e atualizados em texto, não apenas visualmente.",
          "Evite desabilitar o redimensionamento sem necessidade — usuários com baixa visão dependem disso.",
          "Para mensagens de erro, combine aria-invalid com aria-describedby.",
        ]}
      />
    </ComponentPage>
  );
}
