"use client";

import * as React from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  FileTextIcon,
  SettingsIcon,
  UsersIcon,
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
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export default function CommandPage() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <ComponentPage
      title="Command"
      category="Navigation"
      description="Paleta de comandos sobre cmdk: busca difusa, agrupamento, atalhos e navegação por teclado. Pode ser embutida na página ou aberta como diálogo (⌘K)."
      install="npx shadcn@latest add command"
      importCode={`import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"`}
    >
      <Demo
        title="Embutida"
        contentClassName="flex-col items-stretch"
        code={`<Command className="rounded-lg border">
  <CommandInput placeholder="Buscar comando…" />
  <CommandList>
    <CommandEmpty>Nenhum resultado.</CommandEmpty>
    <CommandGroup heading="Navegação">
      <CommandItem>Processos</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
      >
        <Command className="w-full max-w-md rounded-lg border border-border">
          <CommandInput placeholder="Buscar comando ou página…" />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Navegação">
              <CommandItem>
                <BriefcaseIcon /> Processos
                <CommandShortcut>⌘1</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <UsersIcon /> Clientes
                <CommandShortcut>⌘2</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CalendarIcon /> Agenda
                <CommandShortcut>⌘3</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Ações">
              <CommandItem>
                <FileTextIcon /> Nova petição
              </CommandItem>
              <CommandItem disabled>
                <SettingsIcon /> Configurações avançadas
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Demo>

      <Demo
        title="Como diálogo (⌘K)"
        description="Pressione ⌘K / Ctrl+K nesta página para abrir."
        code={`const [open, setOpen] = React.useState(false)

React.useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((v) => !v)
    }
  }
  document.addEventListener("keydown", down)
  return () => document.removeEventListener("keydown", down)
}, [])

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Digite um comando…" />
  <CommandList>…</CommandList>
</CommandDialog>`}
      >
        <Button variant="outline" onClick={() => setOpen(true)}>
          Abrir paleta
          <CommandShortcut>⌘K</CommandShortcut>
        </Button>

        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          title="Paleta de comandos"
          description="Busque páginas e ações do sistema"
        >
          <CommandInput placeholder="Digite um comando ou busque…" />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Sugestões">
              <CommandItem onSelect={() => setOpen(false)}>
                <BriefcaseIcon /> Ir para Processos
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <UsersIcon /> Ir para Clientes
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <CalendarIcon /> Ir para Agenda
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Demo>

      <Usage
        code={`import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useRouter } from "next/navigation"

export function CommandPalette({ open, onOpenChange }) {
  const router = useRouter()

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Buscar…" />
      <CommandList>
        <CommandItem
          onSelect={() => {
            router.push("/processos")
            onOpenChange(false)
          }}
        >
          Processos
        </CommandItem>
      </CommandList>
    </CommandDialog>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "Command · filter",
            type: "(value, search, keywords) => number",
            description:
              "Função de pontuação customizada; retorne 0 para esconder o item.",
          },
          {
            prop: "Command · shouldFilter",
            type: "boolean",
            default: "true",
            description:
              "Desligue quando a busca for feita no servidor.",
          },
          {
            prop: "CommandItem · value / keywords",
            type: "string / string[]",
            description:
              "Texto usado na busca — keywords adiciona sinônimos.",
          },
          {
            prop: "CommandItem · onSelect",
            type: "(value: string) => void",
            description: "Executado ao confirmar o item.",
          },
          {
            prop: "CommandDialog · title / description",
            type: "string",
            description:
              "Rótulos acessíveis do diálogo (renderizados em sr-only).",
          },
          {
            prop: "CommandGroup · heading",
            type: "React.ReactNode",
            description: "Título do grupo de itens.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "⌘ / Ctrl + K", description: "Atalho convencional para abrir a paleta." },
          { keys: "↑ / ↓", description: "Navega entre os resultados." },
          { keys: "Enter", description: "Executa o item selecionado." },
          { keys: "Esc", description: "Fecha o diálogo." },
          { keys: "Digitação", description: "Filtra os comandos." },
        ]}
      />

      <A11yNotes
        items={[
          "A lista usa role=listbox com aria-activedescendant — o foco permanece no input de busca.",
          "CommandDialog exige título e descrição; quando não forem visíveis, ficam em sr-only.",
          "Sempre ofereça um caminho alternativo às ações da paleta (menu ou botão visível).",
          "O estado vazio é anunciado quando a busca não retorna itens.",
          "Divulgue o atalho na interface (ex.: no botão) para que seja descoberto.",
        ]}
      />
    </ComponentPage>
  );
}
