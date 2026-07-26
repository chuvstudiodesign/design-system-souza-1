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
import { Slider } from "@/components/ui/slider";

export default function SliderPage() {
  const [value, setValue] = React.useState([35]);
  const [range, setRange] = React.useState([2000, 8000]);

  return (
    <ComponentPage
      title="Slider"
      category="Inputs & Forms"
      description="Seleção de valor em um intervalo contínuo ou discreto. Suporta múltiplos marcadores (faixa), passo customizado e orientação vertical."
      install="npx shadcn@latest add slider"
      importCode={`import { Slider } from "@/components/ui/slider"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-stretch"
        code={`<Slider defaultValue={[50]} max={100} step={1} />`}
      >
        <div className="w-full max-w-md">
          <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />
        </div>
      </Demo>

      <Demo
        title="Controlado"
        contentClassName="flex-col items-stretch"
        code={`const [value, setValue] = React.useState([35])

<Slider value={value} onValueChange={setValue} max={100} step={5} />`}
      >
        <div className="flex w-full max-w-md flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="progresso">Percentual de conclusão</Label>
            <span className="font-mono text-xs text-muted-foreground">
              {value[0]}%
            </span>
          </div>
          <Slider
            id="progresso"
            value={value}
            onValueChange={setValue}
            max={100}
            step={5}
          />
        </div>
      </Demo>

      <Demo
        title="Faixa (dois marcadores)"
        contentClassName="flex-col items-stretch"
        code={`const [range, setRange] = React.useState([2000, 8000])

<Slider
  value={range}
  onValueChange={setRange}
  min={0}
  max={20000}
  step={500}
/>`}
      >
        <div className="flex w-full max-w-md flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label>Faixa de honorários</Label>
            <span className="font-mono text-xs text-muted-foreground">
              R$ {range[0].toLocaleString("pt-BR")} — R${" "}
              {range[1].toLocaleString("pt-BR")}
            </span>
          </div>
          <Slider
            value={range}
            onValueChange={setRange}
            min={0}
            max={20000}
            step={500}
            aria-label="Faixa de honorários"
          />
        </div>
      </Demo>

      <Demo
        title="Estados e orientação"
        contentClassName="items-start"
        code={`<Slider defaultValue={[40]} disabled />
<Slider defaultValue={[40]} orientation="vertical" className="h-40" />`}
      >
        <div className="w-full max-w-xs">
          <Slider defaultValue={[40]} disabled aria-label="Desabilitado" />
        </div>
        <div className="h-40">
          <Slider
            defaultValue={[40]}
            orientation="vertical"
            className="h-40"
            aria-label="Vertical"
          />
        </div>
      </Demo>

      <Usage
        code={`import { Slider } from "@/components/ui/slider"

export function Zoom() {
  const [value, setValue] = React.useState([100])

  return (
    <Slider
      value={value}
      onValueChange={setValue}
      min={50}
      max={200}
      step={10}
      aria-label="Zoom"
    />
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "value / defaultValue",
            type: "number[]",
            description:
              "Array de valores — um item por marcador (1 = simples, 2 = faixa).",
          },
          {
            prop: "onValueChange",
            type: "(value: number[]) => void",
            description: "Disparado durante o arraste.",
          },
          {
            prop: "onValueCommit",
            type: "(value: number[]) => void",
            description: "Disparado ao soltar — ideal para requisições.",
          },
          { prop: "min", type: "number", default: "0", description: "Valor mínimo." },
          { prop: "max", type: "number", default: "100", description: "Valor máximo." },
          { prop: "step", type: "number", default: "1", description: "Incremento." },
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Direção do controle.",
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
          { keys: "← / ↓", description: "Diminui um passo." },
          { keys: "→ / ↑", description: "Aumenta um passo." },
          { keys: "Page Up / Page Down", description: "Salta vários passos." },
          { keys: "Home / End", description: "Vai para o mínimo/máximo." },
        ]}
      />

      <A11yNotes
        items={[
          "Cada marcador é um role=slider com aria-valuemin, aria-valuemax e aria-valuenow.",
          "Forneça aria-label (ou aria-labelledby) — em faixas, rotule cada extremidade quando fizer sentido.",
          "Exiba o valor em texto ao lado do controle: nem todo usuário percebe a posição do marcador.",
          "Use onValueCommit para efeitos custosos, evitando disparos a cada pixel arrastado.",
        ]}
      />
    </ComponentPage>
  );
}
