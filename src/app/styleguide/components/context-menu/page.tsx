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
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function ContextMenuPage() {
  const [starred, setStarred] = React.useState(true);
  const [view, setView] = React.useState("lista");

  return (
    <ComponentPage
      title="Context Menu"
      category="Navigation"
      description="Menu acionado pelo clique direito (ou toque longo) sobre um elemento. Mesma estrutura do Dropdown Menu, com submenus, checkboxes e rádios."
      install="npx shadcn@latest add context-menu"
      importCode={`import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"`}
    >
      <Demo
        title="Básico"
        description="Clique com o botão direito na área tracejada."
        contentClassName="flex-col items-stretch"
        code={`<ContextMenu>
  <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-lg border border-dashed">
    Clique com o botão direito
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Abrir</ContextMenuItem>
    <ContextMenuItem variant="destructive">Excluir</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
      >
        <ContextMenu>
          <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Clique com o botão direito aqui
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuLabel>Documento</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuItem>
              Abrir
              <ContextMenuShortcut>⌘O</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Renomear
              <ContextMenuShortcut>F2</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>Mover para</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem>Processos ativos</ContextMenuItem>
                <ContextMenuItem>Arquivo morto</ContextMenuItem>
                <ContextMenuItem disabled>Lixeira do cliente</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">
              Excluir
              <ContextMenuShortcut>⌫</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Demo>

      <Demo
        title="Checkbox e rádio"
        contentClassName="flex-col items-stretch"
        code={`<ContextMenuCheckboxItem checked={starred} onCheckedChange={setStarred}>
  Favoritar
</ContextMenuCheckboxItem>

<ContextMenuRadioGroup value={view} onValueChange={setView}>
  <ContextMenuRadioItem value="lista">Lista</ContextMenuRadioItem>
  <ContextMenuRadioItem value="grade">Grade</ContextMenuRadioItem>
</ContextMenuRadioGroup>`}
      >
        <ContextMenu>
          <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
            Preferências de exibição (botão direito)
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuCheckboxItem
              checked={starred}
              onCheckedChange={setStarred}
            >
              Favoritar processo
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuLabel>Visualização</ContextMenuLabel>
            <ContextMenuRadioGroup value={view} onValueChange={setView}>
              <ContextMenuRadioItem value="lista">Lista</ContextMenuRadioItem>
              <ContextMenuRadioItem value="grade">Grade</ContextMenuRadioItem>
              <ContextMenuRadioItem value="tabela">Tabela</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
        <span className="font-mono text-xs text-muted-foreground">
          {view} · favorito: {String(starred)}
        </span>
      </Demo>

      <Usage
        code={`import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function FileRow({ file }: { file: string }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="row">{file}</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Baixar</ContextMenuItem>
        <ContextMenuItem variant="destructive">Excluir</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "ContextMenuTrigger · asChild",
            type: "boolean",
            default: "false",
            description: "Usa o elemento filho como área de clique direito.",
          },
          {
            prop: "ContextMenuTrigger · disabled",
            type: "boolean",
            default: "false",
            description: "Desativa a abertura do menu.",
          },
          {
            prop: "ContextMenuContent · alignOffset / collisionPadding",
            type: "number",
            description: "Ajuste fino do posicionamento junto ao cursor.",
          },
          {
            prop: "ContextMenuItem · variant",
            type: '"default" | "destructive"',
            default: '"default"',
            description: "Item destrutivo com a cor --destructive.",
          },
          {
            prop: "ContextMenuItem · inset",
            type: "boolean",
            description: "Recuo para alinhar com itens que têm indicador.",
          },
          {
            prop: "onOpenChange",
            type: "(open: boolean) => void",
            description: "Notifica abertura/fechamento.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          {
            keys: "Menu / Shift + F10",
            description: "Abre o menu de contexto pelo teclado.",
          },
          { keys: "↑ / ↓", description: "Navega entre os itens." },
          { keys: "→ / ←", description: "Abre/fecha submenus." },
          { keys: "Enter", description: "Executa o item focado." },
          { keys: "Esc", description: "Fecha o menu." },
        ]}
      />

      <A11yNotes
        items={[
          "Toda ação disponível no menu de contexto precisa ter um caminho alternativo visível (botão ou dropdown) — clique direito não é descobrível.",
          "O componente responde às teclas Menu e Shift+F10, o padrão de sistema para menus de contexto.",
          "role=menu com foco preso enquanto aberto; Esc devolve o foco ao gatilho.",
          "Em dispositivos touch, o gatilho responde ao toque longo.",
        ]}
      />
    </ComponentPage>
  );
}
