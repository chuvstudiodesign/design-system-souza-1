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
import { Switch } from "@/components/ui/switch";

export default function SwitchPage() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <ComponentPage
      title="Switch"
      category="Inputs & Forms"
      description="Alternador booleano com efeito imediato. Use quando a mudança é aplicada na hora; para escolhas confirmadas por um botão, prefira Checkbox."
      install="npx shadcn@latest add switch"
      importCode={`import { Switch } from "@/components/ui/switch"`}
    >
      <Demo
        title="Básico"
        code={`<div className="flex items-center gap-2">
  <Switch id="modo-avancado" />
  <Label htmlFor="modo-avancado">Modo avançado</Label>
</div>`}
      >
        <div className="flex items-center gap-2">
          <Switch id="modo-avancado" />
          <Label htmlFor="modo-avancado">Modo avançado</Label>
        </div>
      </Demo>

      <Demo
        title="Estados"
        code={`<Switch />
<Switch defaultChecked />
<Switch disabled />
<Switch disabled defaultChecked />`}
      >
        <div className="flex items-center gap-2">
          <Switch id="s1" />
          <Label htmlFor="s1">Desligado</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="s2" defaultChecked />
          <Label htmlFor="s2">Ligado</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="s3" disabled />
          <Label htmlFor="s3">Desabilitado</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="s4" disabled defaultChecked />
          <Label htmlFor="s4">Desabilitado ligado</Label>
        </div>
      </Demo>

      <Demo
        title="Controlado com descrição"
        contentClassName="flex-col items-stretch"
        code={`const [enabled, setEnabled] = React.useState(true)

<div className="flex items-start justify-between gap-6 rounded-lg border p-4">
  <div>
    <Label htmlFor="alertas">Alertas de prazo</Label>
    <p className="text-sm text-muted-foreground">
      Enviar e-mail 48h antes de cada prazo.
    </p>
  </div>
  <Switch id="alertas" checked={enabled} onCheckedChange={setEnabled} />
</div>`}
      >
        <div className="flex w-full max-w-lg items-start justify-between gap-6 rounded-lg border border-border p-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="alertas">Alertas de prazo</Label>
            <p className="text-sm text-muted-foreground">
              Enviar e-mail 48h antes de cada prazo processual.
            </p>
          </div>
          <Switch
            id="alertas"
            checked={enabled}
            onCheckedChange={setEnabled}
            aria-describedby="alertas-hint"
          />
        </div>
        <p id="alertas-hint" className="text-xs text-muted-foreground">
          Estado: <span className="font-mono">{String(enabled)}</span>
        </p>
      </Demo>

      <Usage
        code={`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function Preference() {
  const [checked, setChecked] = React.useState(false)

  return (
    <div className="flex items-center gap-2">
      <Switch id="darkmode" checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor="darkmode">Tema escuro</Label>
    </div>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "checked",
            type: "boolean",
            description: "Estado controlado.",
          },
          {
            prop: "defaultChecked",
            type: "boolean",
            default: "false",
            description: "Estado inicial não controlado.",
          },
          {
            prop: "onCheckedChange",
            type: "(checked: boolean) => void",
            description: "Callback de mudança.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Impede a interação.",
          },
          {
            prop: "name / value",
            type: "string",
            description: "Integração com formulários nativos.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Move o foco para o switch." },
          { keys: "Space", description: "Alterna o estado." },
          { keys: "Enter", description: "Alterna o estado." },
        ]}
      />

      <A11yNotes
        items={[
          "Implementa role=switch com aria-checked — leitores de tela anunciam 'ligado/desligado'.",
          "Use rótulo visível associado por htmlFor; evite depender apenas de ícones.",
          "A mudança deve ter efeito imediato. Se exigir confirmação, use Checkbox + botão.",
          "Não use switch para ações destrutivas sem confirmação adicional.",
        ]}
      />
    </ComponentPage>
  );
}
