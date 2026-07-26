"use client";

import * as React from "react";
import { BoldIcon, ItalicIcon, StarIcon, UnderlineIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Toggle } from "@/components/ui/toggle";

export default function TogglePage() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <ComponentPage
      title="Toggle"
      category="Inputs & Forms"
      description="Botão de dois estados (pressionado/solto). Use para ações que ligam e desligam um formato ou filtro, como negrito em um editor."
      install="npx shadcn@latest add toggle"
      importCode={`import { Toggle } from "@/components/ui/toggle"`}
    >
      <Demo
        title="Básico"
        code={`<Toggle aria-label="Negrito">
  <BoldIcon />
</Toggle>`}
      >
        <Toggle aria-label="Negrito">
          <BoldIcon />
        </Toggle>
        <Toggle aria-label="Itálico" defaultPressed>
          <ItalicIcon />
        </Toggle>
        <Toggle aria-label="Sublinhado">
          <UnderlineIcon />
        </Toggle>
      </Demo>

      <Demo
        title="Variantes"
        code={`<Toggle variant="default">…</Toggle>
<Toggle variant="outline">…</Toggle>`}
      >
        <Toggle variant="default" aria-label="Default">
          <StarIcon /> Default
        </Toggle>
        <Toggle variant="outline" aria-label="Outline">
          <StarIcon /> Outline
        </Toggle>
      </Demo>

      <Demo
        title="Tamanhos"
        code={`<Toggle size="sm">…</Toggle>
<Toggle size="default">…</Toggle>
<Toggle size="lg">…</Toggle>`}
      >
        <Toggle size="sm" variant="outline" aria-label="Pequeno">
          <BoldIcon />
        </Toggle>
        <Toggle size="default" variant="outline" aria-label="Padrão">
          <BoldIcon />
        </Toggle>
        <Toggle size="lg" variant="outline" aria-label="Grande">
          <BoldIcon />
        </Toggle>
      </Demo>

      <Demo
        title="Controlado e desabilitado"
        code={`const [pressed, setPressed] = React.useState(false)

<Toggle pressed={pressed} onPressedChange={setPressed}>
  Favorito
</Toggle>
<Toggle disabled>Indisponível</Toggle>`}
      >
        <Toggle
          pressed={pressed}
          onPressedChange={setPressed}
          variant="outline"
        >
          <StarIcon />
          {pressed ? "Favoritado" : "Favoritar"}
        </Toggle>
        <Toggle disabled variant="outline">
          Indisponível
        </Toggle>
        <Toggle disabled defaultPressed variant="outline">
          Fixo
        </Toggle>
      </Demo>

      <Usage
        code={`import { Toggle } from "@/components/ui/toggle"
import { BoldIcon } from "lucide-react"

export function BoldToggle() {
  const [bold, setBold] = React.useState(false)

  return (
    <Toggle pressed={bold} onPressedChange={setBold} aria-label="Negrito">
      <BoldIcon />
    </Toggle>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "pressed",
            type: "boolean",
            description: "Estado controlado.",
          },
          {
            prop: "defaultPressed",
            type: "boolean",
            default: "false",
            description: "Estado inicial não controlado.",
          },
          {
            prop: "onPressedChange",
            type: "(pressed: boolean) => void",
            description: "Callback ao alternar.",
          },
          {
            prop: "variant",
            type: '"default" | "outline"',
            default: '"default"',
            description: "Estilo visual.",
          },
          {
            prop: "size",
            type: '"sm" | "default" | "lg"',
            default: '"default"',
            description: "Altura e padding.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Impede a interação.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Foca o toggle." },
          { keys: "Space / Enter", description: "Alterna o estado pressionado." },
        ]}
      />

      <A11yNotes
        items={[
          "Renderiza um <button> com aria-pressed refletindo o estado.",
          "Toggles apenas com ícone exigem aria-label.",
          "Não use Toggle para navegação ou para ações que não sejam alternáveis — nesses casos use Button.",
          "Quando várias opções são mutuamente exclusivas, use Toggle Group com type='single'.",
        ]}
      />
    </ComponentPage>
  );
}
