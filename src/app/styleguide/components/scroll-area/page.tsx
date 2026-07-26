"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const movimentacoes = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  data: `${String((index % 28) + 1).padStart(2, "0")}/03/2026`,
  texto: [
    "Petição juntada aos autos",
    "Despacho publicado",
    "Audiência designada",
    "Certidão expedida",
  ][index % 4],
}));

export default function ScrollAreaPage() {
  return (
    <ComponentPage
      title="Scroll Area"
      category="Layout"
      description="Área de rolagem com barra estilizada e consistente entre navegadores, mantendo a rolagem nativa por roda, toque e teclado."
      install="npx shadcn@latest add scroll-area"
      importCode={`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"`}
    >
      <Demo
        title="Vertical"
        contentClassName="flex-col items-stretch"
        code={`<ScrollArea className="h-64 w-full rounded-lg border">
  <div className="p-4">…</div>
</ScrollArea>`}
      >
        <ScrollArea className="h-64 w-full max-w-md rounded-lg border border-border">
          <div className="p-4">
            <h4 className="mb-3 text-sm font-medium">Movimentações</h4>
            {movimentacoes.map((item) => (
              <div key={item.id}>
                <div className="flex items-baseline justify-between gap-4 py-2 text-sm">
                  <span className="text-muted-foreground">{item.texto}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.data}
                  </span>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      </Demo>

      <Demo
        title="Horizontal"
        contentClassName="flex-col items-stretch"
        code={`<ScrollArea className="w-full whitespace-nowrap rounded-lg border">
  <div className="flex gap-4 p-4">…</div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
      >
        <ScrollArea className="w-full max-w-md rounded-lg border border-border whitespace-nowrap">
          <div className="flex gap-4 p-4">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-muted text-sm"
              >
                {index + 1}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Demo>

      <Demo
        title="Lista compacta"
        description="Combinação frequente: altura fixa + itens densos dentro de um card."
        contentClassName="flex-col items-stretch"
        code={`<ScrollArea className="h-40">
  <ul className="flex flex-col">…</ul>
</ScrollArea>`}
      >
        <ScrollArea className="h-40 w-full max-w-xs rounded-lg border border-border">
          <ul className="flex flex-col p-1">
            {[
              "São Paulo",
              "Campinas",
              "Santos",
              "Ribeirão Preto",
              "Sorocaba",
              "Curitiba",
              "Porto Alegre",
              "Belo Horizonte",
              "Salvador",
              "Recife",
            ].map((comarca) => (
              <li
                key={comarca}
                className="rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {comarca}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </Demo>

      <Usage
        code={`import { ScrollArea } from "@/components/ui/scroll-area"

export function Timeline({ items }: { items: string[] }) {
  return (
    <ScrollArea className="h-72 rounded-lg border">
      <div className="p-4">
        {items.map((item) => (
          <p key={item} className="py-1 text-sm">{item}</p>
        ))}
      </div>
    </ScrollArea>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "className",
            type: "string",
            description:
              "Defina altura/largura fixas — sem isso não há rolagem.",
          },
          {
            prop: "type",
            type: '"auto" | "always" | "scroll" | "hover"',
            default: '"hover"',
            description: "Quando a barra de rolagem fica visível.",
          },
          {
            prop: "scrollHideDelay",
            type: "number",
            default: "600",
            description: "Tempo (ms) até esconder a barra após a rolagem.",
          },
          {
            prop: "orientation (ScrollBar)",
            type: '"vertical" | "horizontal"',
            default: '"vertical"',
            description:
              "Adicione uma ScrollBar horizontal quando o conteúdo exceder a largura.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "↑ / ↓", description: "Rola verticalmente com a área focada." },
          { keys: "Page Up / Page Down", description: "Rola uma tela por vez." },
          { keys: "Home / End", description: "Topo/fim do conteúdo." },
          { keys: "Shift + roda", description: "Rolagem horizontal." },
        ]}
      />

      <A11yNotes
        items={[
          "A área rolável permanece navegável por teclado — o viewport recebe foco quando há overflow.",
          "Não remova a rolagem nativa: usuários de leitores de tela e de zoom dependem dela.",
          "Para listas longas, considere rótulo com aria-label descrevendo o conteúdo da região.",
          "Evite aninhar múltiplas áreas roláveis — confunde a navegação por teclado.",
        ]}
      />
    </ComponentPage>
  );
}
