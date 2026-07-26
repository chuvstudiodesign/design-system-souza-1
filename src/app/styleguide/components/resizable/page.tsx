"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function ResizablePage() {
  return (
    <ComponentPage
      title="Resizable"
      category="Layout"
      description="Painéis redimensionáveis sobre react-resizable-panels. Ideal para editores, visualizadores de documentos e layouts em duas colunas com divisor arrastável."
      install="npx shadcn@latest add resizable"
      importCode={`import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"`}
    >
      <Demo
        title="Horizontal"
        contentClassName="flex-col items-stretch"
        code={`<ResizablePanelGroup orientation="horizontal" className="rounded-lg border">
  <ResizablePanel defaultSize="40%">Painel A</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize="60%">Painel B</ResizablePanel>
</ResizablePanelGroup>`}
      >
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-48 w-full rounded-lg border border-border"
        >
          <ResizablePanel defaultSize="40%" minSize="20%">
            <div className="flex h-full items-center justify-center p-4 text-sm">
              Processos
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="60%" minSize="30%">
            <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
              Detalhes do processo selecionado
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Demo>

      <Demo
        title="Vertical"
        contentClassName="flex-col items-stretch"
        code={`<ResizablePanelGroup orientation="vertical">…</ResizablePanelGroup>`}
      >
        <ResizablePanelGroup
          orientation="vertical"
          className="h-56 w-full rounded-lg border border-border"
        >
          <ResizablePanel defaultSize="60%">
            <div className="flex h-full items-center justify-center p-4 text-sm">
              Editor da petição
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="40%">
            <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
              Pré-visualização
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Demo>

      <Demo
        title="Grupos aninhados"
        contentClassName="flex-col items-stretch"
        code={`<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel>…</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>
    <ResizablePanelGroup orientation="vertical">…</ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>`}
      >
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-56 w-full rounded-lg border border-border"
        >
          <ResizablePanel defaultSize="30%" minSize="15%">
            <div className="flex h-full items-center justify-center p-4 text-sm">
              Navegação
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="70%">
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel defaultSize="65%">
                <div className="flex h-full items-center justify-center p-4 text-sm">
                  Documento
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize="35%">
                <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
                  Anotações
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Demo>

      <Usage
        code={`import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function Workspace() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      defaultLayout={savedLayout}
      onLayoutChanged={(layout) => persist(layout)}
    >
      <ResizablePanel id="nav" defaultSize="25%" minSize="15%" collapsible>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <Editor />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`}
      />

      <PropsTable
        title="Props — ResizablePanelGroup"
        rows={[
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description:
              "Eixo de redimensionamento (na v4 substituiu a antiga prop direction).",
          },
          {
            prop: "defaultLayout",
            type: "Layout",
            description:
              "Layout inicial por id de painel — combine com onLayoutChanged para persistir entre sessões.",
          },
          {
            prop: "onLayoutChange / onLayoutChanged",
            type: "(layout: Layout) => void",
            description:
              "Durante o arraste e ao soltar, respectivamente. Use o segundo para salvar.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Desliga o redimensionamento de todo o grupo.",
          },
        ]}
      />

      <PropsTable
        title="Props — ResizablePanel / ResizableHandle"
        rows={[
          {
            prop: "defaultSize (Panel)",
            type: "number | string",
            description: 'Tamanho inicial — aceite "40%" ou "320px".',
          },
          {
            prop: "minSize / maxSize (Panel)",
            type: "number | string",
            description: "Limites de redimensionamento.",
          },
          {
            prop: "collapsible / collapsedSize (Panel)",
            type: "boolean / number | string",
            description: "Permite colapsar o painel até um tamanho mínimo.",
          },
          {
            prop: "withHandle (Handle)",
            type: "boolean",
            default: "false",
            description: "Exibe o indicador visual de arraste.",
          },
          {
            prop: "disabled (Handle)",
            type: "boolean",
            default: "false",
            description: "Trava o divisor.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Foca o divisor." },
          { keys: "← / →", description: "Redimensiona em grupos horizontais." },
          { keys: "↑ / ↓", description: "Redimensiona em grupos verticais." },
          { keys: "Home / End", description: "Move o divisor ao mínimo/máximo." },
          { keys: "Enter", description: "Colapsa/expande painéis colapsáveis." },
        ]}
      />

      <A11yNotes
        items={[
          "O divisor é um elemento focável com role=separator e aria-valuenow refletindo a proporção atual.",
          "O redimensionamento por teclado é obrigatório — nunca desabilite o foco do handle.",
          "Dê aria-label ao handle quando houver vários divisores na mesma tela.",
          "Garanta minSize suficiente para que o conteúdo continue legível ao encolher.",
        ]}
      />
    </ComponentPage>
  );
}
