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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupPage() {
  const [value, setValue] = React.useState("mensal");

  return (
    <ComponentPage
      title="Radio Group"
      category="Inputs & Forms"
      description="Escolha única entre opções mutuamente exclusivas. O grupo inteiro é um único ponto de tabulação, com navegação por setas entre as opções."
      install="npx shadcn@latest add radio-group"
      importCode={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-start"
        code={`<RadioGroup defaultValue="civil">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="civil" id="r1" />
    <Label htmlFor="r1">Cível</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="trabalhista" id="r2" />
    <Label htmlFor="r2">Trabalhista</Label>
  </div>
</RadioGroup>`}
      >
        <RadioGroup defaultValue="civil" className="gap-3">
          {[
            { value: "civil", label: "Cível" },
            { value: "trabalhista", label: "Trabalhista" },
            { value: "empresarial", label: "Empresarial" },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem value={option.value} id={`area-${option.value}`} />
              <Label htmlFor={`area-${option.value}`} className="font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Demo>

      <Demo
        title="Horizontal"
        code={`<RadioGroup defaultValue="sim" className="flex flex-row gap-6">
  …
</RadioGroup>`}
      >
        <RadioGroup defaultValue="sim" className="flex flex-row gap-6">
          {["sim", "nao", "talvez"].map((option) => (
            <div key={option} className="flex items-center gap-2">
              <RadioGroupItem value={option} id={`h-${option}`} />
              <Label htmlFor={`h-${option}`} className="font-normal capitalize">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Demo>

      <Demo
        title="Controlado com cartões"
        contentClassName="flex-col items-stretch"
        code={`const [value, setValue] = React.useState("mensal")

<RadioGroup value={value} onValueChange={setValue}>
  <Label className="flex items-start gap-3 rounded-lg border p-4 has-data-[state=checked]:border-primary">
    <RadioGroupItem value="mensal" />
    …
  </Label>
</RadioGroup>`}
      >
        <RadioGroup
          value={value}
          onValueChange={setValue}
          className="grid w-full gap-3 sm:grid-cols-2"
        >
          {[
            {
              value: "mensal",
              title: "Honorários mensais",
              hint: "Cobrança recorrente com relatório mensal.",
            },
            {
              value: "exito",
              title: "Honorários de êxito",
              hint: "Percentual sobre o resultado obtido.",
            },
          ].map((plan) => (
            <Label
              key={plan.value}
              htmlFor={`plan-${plan.value}`}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 font-normal transition-colors has-data-[state=checked]:border-primary has-data-[state=checked]:bg-accent/40"
            >
              <RadioGroupItem
                value={plan.value}
                id={`plan-${plan.value}`}
                className="mt-0.5"
              />
              <span className="flex flex-col gap-1">
                <span className="text-sm font-medium">{plan.title}</span>
                <span className="text-sm text-muted-foreground">
                  {plan.hint}
                </span>
              </span>
            </Label>
          ))}
        </RadioGroup>
      </Demo>

      <Demo
        title="Desabilitado"
        contentClassName="flex-col items-start"
        code={`<RadioGroup defaultValue="a" disabled>…</RadioGroup>
<RadioGroupItem value="c" disabled />`}
      >
        <RadioGroup defaultValue="a" className="gap-3">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="a" id="d1" />
            <Label htmlFor="d1" className="font-normal">
              Disponível
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="b" id="d2" disabled />
            <Label htmlFor="d2" className="font-normal">
              Opção indisponível
            </Label>
          </div>
        </RadioGroup>
      </Demo>

      <Usage
        code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function Plan() {
  return (
    <RadioGroup name="plan" defaultValue="mensal">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="mensal" id="mensal" />
        <Label htmlFor="mensal">Mensal</Label>
      </div>
    </RadioGroup>
  )
}`}
      />

      <PropsTable
        title="Props — RadioGroup"
        rows={[
          {
            prop: "value / defaultValue",
            type: "string",
            description: "Opção selecionada (controlada ou inicial).",
          },
          {
            prop: "onValueChange",
            type: "(value: string) => void",
            description: "Callback ao selecionar uma opção.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Desabilita todas as opções.",
          },
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"vertical"',
            description: "Direção da navegação por setas.",
          },
          {
            prop: "name",
            type: "string",
            description: "Nome do campo em formulários nativos.",
          },
        ]}
      />

      <PropsTable
        title="Props — RadioGroupItem"
        rows={[
          {
            prop: "value",
            type: "string",
            description: "Valor único da opção (obrigatório).",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Desabilita apenas esta opção.",
          },
          {
            prop: "id",
            type: "string",
            description: "Necessário para associar o <Label htmlFor>.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          {
            keys: "Tab",
            description:
              "Entra no grupo, focando a opção selecionada (ou a primeira).",
          },
          { keys: "↑ / ←", description: "Seleciona a opção anterior." },
          { keys: "↓ / →", description: "Seleciona a próxima opção." },
          { keys: "Space", description: "Seleciona a opção focada." },
        ]}
      />

      <A11yNotes
        items={[
          "O grupo usa role=radiogroup e cada item role=radio, seguindo o padrão WAI-ARIA.",
          "Todo o grupo é um único stop de tabulação (roving tabindex).",
          "Dê ao grupo um rótulo acessível com aria-label ou aria-labelledby apontando para o título da pergunta.",
          "Cada item precisa de um <Label htmlFor> — o clique no rótulo seleciona a opção.",
        ]}
      />
    </ComponentPage>
  );
}
