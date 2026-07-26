"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const mensal = [
  { mes: "Jan", novos: 12, encerrados: 8 },
  { mes: "Fev", novos: 18, encerrados: 11 },
  { mes: "Mar", novos: 14, encerrados: 15 },
  { mes: "Abr", novos: 22, encerrados: 12 },
  { mes: "Mai", novos: 19, encerrados: 17 },
  { mes: "Jun", novos: 25, encerrados: 14 },
];

const chartConfig = {
  novos: { label: "Novos processos", color: "var(--chart-1)" },
  encerrados: { label: "Encerrados", color: "var(--chart-2)" },
} satisfies ChartConfig;

const areasData = [
  { area: "Empresarial", casos: 38, fill: "var(--chart-1)" },
  { area: "Trabalhista", casos: 26, fill: "var(--chart-2)" },
  { area: "Cível", casos: 21, fill: "var(--chart-3)" },
  { area: "Tributário", casos: 15, fill: "var(--chart-4)" },
];

const pieConfig = {
  casos: { label: "Casos" },
  Empresarial: { label: "Empresarial", color: "var(--chart-1)" },
  Trabalhista: { label: "Trabalhista", color: "var(--chart-2)" },
  Cível: { label: "Cível", color: "var(--chart-3)" },
  Tributário: { label: "Tributário", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function ChartPage() {
  return (
    <ComponentPage
      title="Chart"
      category="Data Display"
      description="Wrapper do Recharts com tema integrado: as cores vêm de --chart-1…5, o tooltip e a legenda seguem os tokens e o container é responsivo por padrão."
      install="npx shadcn@latest add chart"
      importCode={`import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"`}
    >
      <Demo
        title="Barras"
        contentClassName="flex-col items-stretch"
        code={`const chartConfig = {
  novos: { label: "Novos processos", color: "var(--chart-1)" },
  encerrados: { label: "Encerrados", color: "var(--chart-2)" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="h-64 w-full">
  <BarChart data={mensal}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="novos" fill="var(--color-novos)" radius={4} />
    <Bar dataKey="encerrados" fill="var(--color-encerrados)" radius={4} />
  </BarChart>
</ChartContainer>`}
      >
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart data={mensal}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="mes" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="novos" fill="var(--color-novos)" radius={4} />
            <Bar dataKey="encerrados" fill="var(--color-encerrados)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Demo>

      <Demo
        title="Linha"
        contentClassName="flex-col items-stretch"
        code={`<ChartContainer config={chartConfig} className="h-64 w-full">
  <LineChart data={mensal}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="mes" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Line dataKey="novos" stroke="var(--color-novos)" strokeWidth={2} dot={false} />
  </LineChart>
</ChartContainer>`}
      >
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <LineChart data={mensal}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="mes" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="novos"
              stroke="var(--color-novos)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="encerrados"
              stroke="var(--color-encerrados)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </Demo>

      <Demo
        title="Área"
        contentClassName="flex-col items-stretch"
        code={`<AreaChart data={mensal}>
  <Area
    dataKey="novos"
    stroke="var(--color-novos)"
    fill="var(--color-novos)"
    fillOpacity={0.2}
  />
</AreaChart>`}
      >
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart data={mensal}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="mes" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="novos"
              type="natural"
              stroke="var(--color-novos)"
              fill="var(--color-novos)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ChartContainer>
      </Demo>

      <Demo
        title="Pizza / rosca"
        contentClassName="flex-col items-stretch"
        code={`<ChartContainer config={pieConfig} className="h-64">
  <PieChart>
    <ChartTooltip content={<ChartTooltipContent nameKey="area" />} />
    <Pie data={areasData} dataKey="casos" nameKey="area" innerRadius={50} />
  </PieChart>
</ChartContainer>`}
      >
        <ChartContainer config={pieConfig} className="mx-auto h-64">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="area" />} />
            <Pie
              data={areasData}
              dataKey="casos"
              nameKey="area"
              innerRadius={50}
              strokeWidth={2}
            >
              {areasData.map((entry) => (
                <Cell key={entry.area} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="area" />} />
          </PieChart>
        </ChartContainer>
      </Demo>

      <Usage
        code={`import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, XAxis } from "recharts"

const config = {
  receita: { label: "Receita", color: "var(--chart-1)" },
} satisfies ChartConfig

export function RevenueChart({ data }: { data: { mes: string; receita: number }[] }) {
  return (
    <ChartContainer config={config} className="h-64 w-full">
      <BarChart data={data}>
        <XAxis dataKey="mes" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="receita" fill="var(--color-receita)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "ChartContainer · config",
            type: "ChartConfig",
            description:
              "Mapa chave → { label, color, icon }. Cada chave gera a variável CSS --color-<chave>.",
          },
          {
            prop: "ChartContainer · children",
            type: "ReactElement",
            description:
              "Um único gráfico do Recharts; o ResponsiveContainer é aplicado automaticamente.",
          },
          {
            prop: "ChartTooltipContent · indicator",
            type: '"dot" | "line" | "dashed"',
            default: '"dot"',
            description: "Forma do marcador de série no tooltip.",
          },
          {
            prop: "ChartTooltipContent · nameKey / labelKey",
            type: "string",
            description:
              "Campos usados para nome da série e rótulo do cabeçalho.",
          },
          {
            prop: "ChartTooltipContent · hideLabel / hideIndicator",
            type: "boolean",
            description: "Simplifica o tooltip.",
          },
          {
            prop: "ChartLegendContent · nameKey",
            type: "string",
            description: "Campo usado nos rótulos da legenda.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Gráficos são imagens de dados: forneça também uma tabela ou resumo textual dos números.",
          "Não dependa apenas da cor para diferenciar séries — use rótulos na legenda e, quando possível, padrões ou formatos distintos.",
          "As cores --chart-1…5 do projeto foram escolhidas para serem distinguíveis nos dois temas.",
          "O tooltip só aparece no hover: garanta que a informação essencial esteja nos eixos e na legenda.",
          "Defina altura explícita no ChartContainer para evitar salto de layout.",
        ]}
      />
    </ComponentPage>
  );
}
