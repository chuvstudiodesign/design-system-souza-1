"use client";

import * as React from "react";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [range, setRange] = React.useState<DateRange | undefined>();
  const [multiple, setMultiple] = React.useState<Date[] | undefined>();

  return (
    <ComponentPage
      title="Calendar"
      category="Data Display"
      description="Calendário sobre react-day-picker v10, localizado em pt-BR. Suporta seleção única, múltipla e por intervalo, datas desabilitadas e navegação por dropdown."
      install="npx shadcn@latest add calendar"
      importCode={`import { Calendar } from "@/components/ui/calendar"`}
    >
      <Demo
        title="Seleção única"
        contentClassName="flex-col items-start"
        code={`const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={ptBR}
  className="rounded-lg border"
/>`}
      >
        <div className="flex flex-col gap-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ptBR}
            className="rounded-lg border border-border"
          />
          <p className="font-mono text-xs text-muted-foreground">
            {date ? date.toLocaleDateString("pt-BR") : "nenhuma data"}
          </p>
        </div>
      </Demo>

      <Demo
        title="Intervalo"
        contentClassName="flex-col items-start"
        code={`<Calendar
  mode="range"
  selected={range}
  onSelect={setRange}
  numberOfMonths={2}
  locale={ptBR}
/>`}
      >
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          locale={ptBR}
          className="rounded-lg border border-border"
        />
      </Demo>

      <Demo
        title="Múltiplas datas e dias desabilitados"
        contentClassName="flex-col items-start"
        code={`<Calendar
  mode="multiple"
  selected={multiple}
  onSelect={setMultiple}
  disabled={{ dayOfWeek: [0, 6] }}
  locale={ptBR}
/>`}
      >
        <div className="flex flex-col gap-2">
          <Calendar
            mode="multiple"
            selected={multiple}
            onSelect={setMultiple}
            disabled={{ dayOfWeek: [0, 6] }}
            locale={ptBR}
            className="rounded-lg border border-border"
          />
          <p className="font-mono text-xs text-muted-foreground">
            {multiple?.length ?? 0} data(s) · fins de semana desabilitados
          </p>
        </div>
      </Demo>

      <Demo
        title="Navegação por dropdown"
        description="captionLayout='dropdown' facilita ir para meses e anos distantes."
        contentClassName="flex-col items-start"
        code={`<Calendar
  mode="single"
  captionLayout="dropdown"
  startMonth={new Date(2020, 0)}
  endMonth={new Date(2030, 11)}
  locale={ptBR}
/>`}
      >
        <Calendar
          mode="single"
          captionLayout="dropdown"
          startMonth={new Date(2020, 0)}
          endMonth={new Date(2030, 11)}
          locale={ptBR}
          className="rounded-lg border border-border"
        />
      </Demo>

      <Usage
        code={`import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"

export function HearingCalendar() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={{ before: new Date() }}
      locale={ptBR}
    />
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "mode",
            type: '"single" | "multiple" | "range"',
            default: '"single"',
            description: "Tipo de seleção.",
          },
          {
            prop: "selected / onSelect",
            type: "Date | Date[] | DateRange",
            description: "Valor selecionado conforme o mode.",
          },
          {
            prop: "disabled",
            type: "Matcher | Matcher[]",
            description:
              "Datas bloqueadas: { before }, { after }, { dayOfWeek }, arrays de datas…",
          },
          {
            prop: "numberOfMonths",
            type: "number",
            default: "1",
            description: "Meses exibidos lado a lado.",
          },
          {
            prop: "captionLayout",
            type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
            default: '"label"',
            description: "Formato do cabeçalho de navegação.",
          },
          {
            prop: "startMonth / endMonth",
            type: "Date",
            description: "Limites de navegação (necessários com dropdown).",
          },
          {
            prop: "locale",
            type: "Locale",
            description: "Locale do date-fns — use ptBR para português.",
          },
          {
            prop: "showOutsideDays",
            type: "boolean",
            default: "true",
            description: "Exibe os dias dos meses vizinhos.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "← / →", description: "Dia anterior/seguinte." },
          { keys: "↑ / ↓", description: "Semana anterior/seguinte." },
          { keys: "PageUp / PageDown", description: "Mês anterior/seguinte." },
          { keys: "Home / End", description: "Início/fim da semana." },
          { keys: "Enter / Space", description: "Seleciona o dia focado." },
        ]}
      />

      <A11yNotes
        items={[
          "Renderiza uma grade (role=grid) com navegação por setas — padrão WAI-ARIA de datepicker.",
          "Cada dia é um botão com rótulo completo da data lido por leitores de tela.",
          "Datas desabilitadas usam aria-disabled e continuam navegáveis, permitindo entender o motivo do bloqueio.",
          "Para entrada rápida de datas conhecidas, ofereça também um campo de texto.",
          "Defina locale para que nomes de meses e dias sejam anunciados no idioma correto.",
        ]}
      />
    </ComponentPage>
  );
}
