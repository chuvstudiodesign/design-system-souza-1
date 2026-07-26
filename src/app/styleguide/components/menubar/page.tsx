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
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function MenubarPage() {
  const [showStatus, setShowStatus] = React.useState(true);
  const [zoom, setZoom] = React.useState("100");

  return (
    <ComponentPage
      title="Menubar"
      category="Navigation"
      description="Barra de menus no estilo desktop (Arquivo, Editar, Exibir…). Uma vez aberto um menu, mover o mouse ou usar as setas alterna entre os demais."
      install="npx shadcn@latest add menubar"
      importCode={`import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"`}
    >
      <Demo
        title="Barra completa"
        contentClassName="flex-col items-start"
        code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Nova petição <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Imprimir</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
      >
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Arquivo</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Nova petição <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Novo processo <MenubarShortcut>⇧⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger>Abrir recente</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Contrato — Souza LTDA</MenubarItem>
                  <MenubarItem>Petição inicial — 1000123-45</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem>
                Imprimir <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Editar</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Desfazer <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem disabled>Colar formatação</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Exibir</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem
                checked={showStatus}
                onCheckedChange={setShowStatus}
              >
                Barra de status
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarLabel>Zoom</MenubarLabel>
              <MenubarRadioGroup value={zoom} onValueChange={setZoom}>
                <MenubarRadioItem value="75">75%</MenubarRadioItem>
                <MenubarRadioItem value="100">100%</MenubarRadioItem>
                <MenubarRadioItem value="125">125%</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Ajuda</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Documentação</MenubarItem>
              <MenubarItem>Suporte</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <span className="font-mono text-xs text-muted-foreground">
          zoom: {zoom}% · status: {String(showStatus)}
        </span>
      </Demo>

      <Usage
        code={`import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function EditorMenubar({ onSave }: { onSave: () => void }) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={onSave}>Salvar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "Menubar · value / onValueChange",
            type: "string / (value: string) => void",
            description: "Menu aberto (controlado).",
          },
          {
            prop: "Menubar · loop",
            type: "boolean",
            default: "false",
            description:
              "Faz a navegação por setas voltar ao início após o último menu.",
          },
          {
            prop: "MenubarMenu · value",
            type: "string",
            description: "Identificador do menu quando controlado.",
          },
          {
            prop: "MenubarItem · variant / inset / disabled",
            type: '"default" | "destructive" / boolean / boolean',
            description: "Mesmas opções do Dropdown Menu.",
          },
          {
            prop: "MenubarCheckboxItem · checked",
            type: "boolean",
            description: "Item alternável.",
          },
          {
            prop: "MenubarRadioGroup · value",
            type: "string",
            description: "Grupo de opções exclusivas.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Entra na barra (um único stop de tabulação)." },
          { keys: "← / →", description: "Alterna entre os menus." },
          { keys: "↓ / Enter", description: "Abre o menu focado." },
          { keys: "↑ / ↓", description: "Navega entre os itens do menu aberto." },
          { keys: "Esc", description: "Fecha o menu atual." },
        ]}
      />

      <A11yNotes
        items={[
          "Implementa role=menubar com roving tabindex — toda a barra é um stop de tabulação.",
          "Atalhos exibidos (MenubarShortcut) são apenas visuais: registre os listeners de teclado na aplicação.",
          "Use Menubar em interfaces do tipo aplicativo/editor; para navegação de site, prefira Navigation Menu.",
          "Itens desabilitados permanecem anunciados com aria-disabled.",
        ]}
      />
    </ComponentPage>
  );
}
