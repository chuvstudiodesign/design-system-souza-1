"use client";

import * as React from "react";
import {
  CopyIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownMenuPage() {
  const [showArchived, setShowArchived] = React.useState(true);
  const [order, setOrder] = React.useState("recentes");

  return (
    <ComponentPage
      title="Dropdown Menu"
      category="Navigation"
      description="Menu de ações acionado por um botão. Suporta grupos, submenus, itens de checkbox e rádio, atalhos e variante destrutiva."
      install="npx shadcn@latest add dropdown-menu"
      importCode={`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`}
    >
      <Demo
        title="Básico"
        code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Ações</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Conta</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Perfil</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Sair</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Ações</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserIcon /> Perfil
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon /> Configurações
                <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOutIcon /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Demo>

      <Demo
        title="Checkbox e rádio"
        code={`<DropdownMenuCheckboxItem checked={v} onCheckedChange={setV}>
  Mostrar arquivados
</DropdownMenuCheckboxItem>

<DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
  <DropdownMenuRadioItem value="recentes">Mais recentes</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filtros da lista</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Exibição</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showArchived}
              onCheckedChange={setShowArchived}
            >
              Mostrar arquivados
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
              <DropdownMenuRadioItem value="recentes">
                Mais recentes
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="antigos">
                Mais antigos
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="prazo">
                Prazo mais próximo
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="font-mono text-xs text-muted-foreground">
          {order} · arquivados: {String(showArchived)}
        </span>
      </Demo>

      <Demo
        title="Submenu e itens desabilitados"
        code={`<DropdownMenuSub>
  <DropdownMenuSubTrigger>Compartilhar</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Por e-mail</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Mais opções">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <CopyIcon /> Duplicar processo
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Compartilhar</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Por e-mail</DropdownMenuItem>
                <DropdownMenuItem>Link com senha</DropdownMenuItem>
                <DropdownMenuItem disabled>Portal do cliente</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <TrashIcon /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Demo>

      <Usage
        code={`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function RowActions({ onDelete }: { onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Ações da linha">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={onDelete} variant="destructive">
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "open / onOpenChange",
            type: "boolean / (open: boolean) => void",
            description: "Controle externo do menu.",
          },
          {
            prop: "align / side / sideOffset (Content)",
            type: '"start" | "center" | "end" / "top" | "right" | "bottom" | "left" / number',
            description: "Posicionamento em relação ao gatilho.",
          },
          {
            prop: "variant (Item)",
            type: '"default" | "destructive"',
            default: '"default"',
            description: "Item destrutivo usa a cor --destructive.",
          },
          {
            prop: "inset (Item/Label)",
            type: "boolean",
            description: "Adiciona recuo para alinhar com itens que têm ícone.",
          },
          {
            prop: "onSelect (Item)",
            type: "(event: Event) => void",
            description:
              "Chame event.preventDefault() para manter o menu aberto após a seleção.",
          },
          {
            prop: "checked / onCheckedChange (CheckboxItem)",
            type: "boolean / (checked: boolean) => void",
            description: "Estado do item de checkbox.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Enter / Space / ↓", description: "Abre o menu." },
          { keys: "↑ / ↓", description: "Navega entre os itens." },
          { keys: "→", description: "Abre o submenu focado." },
          { keys: "←", description: "Fecha o submenu." },
          { keys: "A–Z", description: "Busca por digitação." },
          { keys: "Esc", description: "Fecha e devolve o foco ao gatilho." },
        ]}
      />

      <A11yNotes
        items={[
          "role=menu com itens role=menuitem / menuitemcheckbox / menuitemradio.",
          "O foco fica preso no menu enquanto aberto e retorna ao gatilho ao fechar.",
          "Gatilhos apenas com ícone precisam de aria-label.",
          "Não use dropdown para navegação primária do site — prefira Navigation Menu com links reais.",
          "Ações destrutivas devem confirmar com Alert Dialog antes de executar.",
        ]}
      />
    </ComponentPage>
  );
}
