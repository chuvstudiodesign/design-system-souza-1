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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxPage() {
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(
    "indeterminate"
  );
  const [areas, setAreas] = React.useState<string[]>(["civil"]);

  return (
    <ComponentPage
      title="Checkbox"
      category="Inputs & Forms"
      description="Caixa de seleção sobre Radix Checkbox. Suporta os três estados (marcado, desmarcado e indeterminado) e herda as cores de --primary e --input."
      install="npx shadcn@latest add checkbox"
      importCode={`import { Checkbox } from "@/components/ui/checkbox"`}
    >
      <Demo
        title="Básico"
        code={`<div className="flex items-center gap-2">
  <Checkbox id="termos" />
  <Label htmlFor="termos">Aceito os termos</Label>
</div>`}
      >
        <div className="flex items-center gap-2">
          <Checkbox id="termos" />
          <Label htmlFor="termos">Aceito os termos de uso</Label>
        </div>
      </Demo>

      <Demo
        title="Estados"
        code={`<Checkbox defaultChecked />
<Checkbox checked="indeterminate" />
<Checkbox disabled />
<Checkbox disabled defaultChecked />`}
      >
        <div className="flex items-center gap-2">
          <Checkbox id="c1" />
          <Label htmlFor="c1">Padrão</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="c2" defaultChecked />
          <Label htmlFor="c2">Marcado</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="c3" checked="indeterminate" />
          <Label htmlFor="c3">Indeterminado</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="c4" disabled />
          <Label htmlFor="c4">Desabilitado</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="c5" disabled defaultChecked />
          <Label htmlFor="c5">Desabilitado marcado</Label>
        </div>
      </Demo>

      <Demo
        title="Controlado"
        description="Alterna entre os três estados a cada clique."
        code={`const [checked, setChecked] = React.useState<boolean | "indeterminate">("indeterminate")

<Checkbox checked={checked} onCheckedChange={setChecked} />`}
      >
        <div className="flex items-center gap-2">
          <Checkbox
            id="controlado"
            checked={checked}
            onCheckedChange={(value) => setChecked(value)}
          />
          <Label htmlFor="controlado">
            Estado atual: <span className="font-mono">{String(checked)}</span>
          </Label>
        </div>
      </Demo>

      <Demo
        title="Grupo com descrição"
        description="Checkbox alinhado ao topo com texto de apoio."
        contentClassName="flex-col items-start"
        code={`<div className="flex items-start gap-3">
  <Checkbox id="notif" defaultChecked />
  <div className="flex flex-col gap-1">
    <Label htmlFor="notif">Notificações de prazo</Label>
    <p className="text-sm text-muted-foreground">
      Receba um alerta 48h antes de cada prazo processual.
    </p>
  </div>
</div>`}
      >
        {[
          { id: "civil", label: "Cível", hint: "Contratos, família e sucessões." },
          {
            id: "trabalhista",
            label: "Trabalhista",
            hint: "Reclamatórias e acordos.",
          },
          {
            id: "empresarial",
            label: "Empresarial",
            hint: "Societário e compliance.",
          },
        ].map((area) => (
          <div key={area.id} className="flex items-start gap-3">
            <Checkbox
              id={area.id}
              checked={areas.includes(area.id)}
              onCheckedChange={(value) =>
                setAreas((prev) =>
                  value === true
                    ? [...prev, area.id]
                    : prev.filter((item) => item !== area.id)
                )
              }
            />
            <div className="flex flex-col gap-1">
              <Label htmlFor={area.id}>{area.label}</Label>
              <p className="text-sm text-muted-foreground">{area.hint}</p>
            </div>
          </div>
        ))}
      </Demo>

      <Usage
        code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function Terms() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" name="terms" required />
      <Label htmlFor="terms">Aceito os termos</Label>
    </div>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "checked",
            type: 'boolean | "indeterminate"',
            description: "Estado controlado da caixa.",
          },
          {
            prop: "defaultChecked",
            type: "boolean",
            default: "false",
            description: "Estado inicial no modo não controlado.",
          },
          {
            prop: "onCheckedChange",
            type: '(checked: boolean | "indeterminate") => void',
            description: "Disparado a cada mudança de estado.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Impede interação.",
          },
          {
            prop: "required",
            type: "boolean",
            default: "false",
            description: "Marca o campo como obrigatório no formulário.",
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
          { keys: "Tab", description: "Move o foco para a caixa." },
          { keys: "Space", description: "Alterna entre marcado e desmarcado." },
        ]}
      />

      <A11yNotes
        items={[
          "Segue o padrão WAI-ARIA de checkbox tri-state (aria-checked = true | false | mixed).",
          "Sempre associe um <Label htmlFor> ao id da caixa — o clique no rótulo também alterna o estado.",
          "O estado indeterminado é apenas visual/semântico: no envio do formulário ele conta como desmarcado.",
          "Textos de apoio devem ser referenciados por aria-describedby quando forem essenciais à decisão.",
        ]}
      />
    </ComponentPage>
  );
}
