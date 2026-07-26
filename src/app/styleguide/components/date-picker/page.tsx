"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";

export default function DatePickerPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [range, setRange] = React.useState<DateRange | undefined>();

  return (
    <ComponentPage
      title="Date Picker"
      category="Inputs & Forms"
      description="Composição oficial do shadcn (Popover + Calendar + Button) empacotada como componente. Localizado em pt-BR, com variação de data única e de intervalo."
      install="npx shadcn@latest add popover calendar  # composição documentada pelo shadcn"
      importCode={`import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"`}
    >
      <Demo
        title="Data única"
        contentClassName="flex-col items-start"
        code={`const [date, setDate] = React.useState<Date | undefined>(new Date())

<DatePicker value={date} onValueChange={setDate} />`}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="dp-audiencia">Data da audiência</Label>
          <DatePicker id="dp-audiencia" value={date} onValueChange={setDate} />
          <p className="font-mono text-xs text-muted-foreground">
            {date ? date.toISOString().slice(0, 10) : "—"}
          </p>
        </div>
      </Demo>

      <Demo
        title="Intervalo"
        contentClassName="flex-col items-start"
        code={`const [range, setRange] = React.useState<DateRange | undefined>()

<DateRangePicker value={range} onValueChange={setRange} />`}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="dp-periodo">Período do relatório</Label>
          <DateRangePicker
            id="dp-periodo"
            value={range}
            onValueChange={setRange}
          />
        </div>
      </Demo>

      <Demo
        title="Navegação por mês e ano"
        description="captionLayout='dropdown' troca o cabeçalho por seletores — útil para datas distantes, como nascimento."
        contentClassName="flex-col items-start"
        code={`<DatePicker captionLayout="dropdown" placeholder="Data de nascimento" />`}
      >
        <DatePicker
          captionLayout="dropdown"
          placeholder="Data de nascimento"
          className="w-64"
        />
      </Demo>

      <Demo
        title="Desabilitado"
        code={`<DatePicker disabled />`}
      >
        <DatePicker disabled placeholder="Indisponível" />
      </Demo>

      <Usage
        code={`import { DatePicker } from "@/components/ui/date-picker"

export function HearingDate() {
  const [date, setDate] = React.useState<Date>()

  return (
    <DatePicker
      value={date}
      onValueChange={setDate}
      placeholder="Selecione a data"
    />
  )
}`}
      />

      <PropsTable
        title="Props — DatePicker"
        rows={[
          {
            prop: "value",
            type: "Date | undefined",
            description: "Data selecionada (controlada).",
          },
          {
            prop: "onValueChange",
            type: "(date: Date | undefined) => void",
            description: "Callback ao escolher uma data; fecha o popover.",
          },
          {
            prop: "placeholder",
            type: "string",
            default: '"Selecione uma data"',
            description: "Texto exibido quando não há data.",
          },
          {
            prop: "captionLayout",
            type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
            default: '"label"',
            description: "Formato do cabeçalho de navegação do calendário.",
          },
          {
            prop: "align",
            type: '"start" | "center" | "end"',
            default: '"start"',
            description: "Alinhamento do popover.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Desabilita o gatilho.",
          },
        ]}
      />

      <PropsTable
        title="Props — DateRangePicker"
        rows={[
          {
            prop: "value",
            type: "DateRange | undefined",
            description: "Intervalo { from, to }.",
          },
          {
            prop: "onValueChange",
            type: "(range: DateRange | undefined) => void",
            description: "Callback de seleção do intervalo.",
          },
          {
            prop: "numberOfMonths",
            type: "number",
            default: "2",
            description: "Quantidade de meses exibidos lado a lado.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Enter / Space", description: "Abre o calendário." },
          { keys: "← → ↑ ↓", description: "Navega entre os dias." },
          { keys: "PageUp / PageDown", description: "Mês anterior/seguinte." },
          { keys: "Home / End", description: "Início/fim da semana." },
          { keys: "Esc", description: "Fecha e devolve o foco ao gatilho." },
        ]}
      />

      <A11yNotes
        items={[
          "O gatilho é um botão com o valor formatado como texto — leitores de tela anunciam a data selecionada.",
          "O calendário usa role=grid com dias navegáveis por setas (react-day-picker).",
          "Associe um <Label htmlFor> ao id do DatePicker.",
          "Para entrada manual rápida, ofereça também um <Input type='date'> — nem todo usuário navega bem em grades de calendário.",
          "O foco retorna ao gatilho ao fechar o popover.",
        ]}
      />
    </ComponentPage>
  );
}
