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
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

const comarcas = [
  "São Paulo",
  "Campinas",
  "Santos",
  "Ribeirão Preto",
  "Sorocaba",
  "Curitiba",
  "Porto Alegre",
  "Belo Horizonte",
];

export default function ComboboxPage() {
  const [value, setValue] = React.useState<string | null>("Campinas");
  const [tags, setTags] = React.useState<string[]>(["Cível"]);

  return (
    <ComponentPage
      title="Combobox"
      category="Inputs & Forms"
      description="Campo de autocomplete construído sobre o Base UI Combobox: filtro por digitação, seleção única ou múltipla com chips e lista virtualizável em portal."
      install="npx shadcn@latest add combobox"
      importCode={`import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-start"
        code={`<Combobox items={comarcas}>
  <ComboboxInput placeholder="Buscar comarca…" className="w-64" />
  <ComboboxContent>
    <ComboboxEmpty>Nenhuma comarca encontrada.</ComboboxEmpty>
    <ComboboxList>
      {(item: string) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
      >
        <Combobox items={comarcas}>
          <ComboboxInput placeholder="Buscar comarca…" className="w-64" />
          <ComboboxContent>
            <ComboboxEmpty>Nenhuma comarca encontrada.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Demo>

      <Demo
        title="Controlado"
        contentClassName="flex-col items-start"
        code={`const [value, setValue] = React.useState<string | null>("Campinas")

<Combobox items={comarcas} value={value} onValueChange={setValue}>
  …
</Combobox>`}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="comarca">Comarca principal</Label>
          <Combobox
            items={comarcas}
            value={value}
            onValueChange={(next) => setValue(next)}
          >
            <ComboboxInput
              id="comarca"
              placeholder="Buscar comarca…"
              className="w-64"
              showClear
            />
            <ComboboxContent>
              <ComboboxEmpty>Nenhuma comarca encontrada.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <p className="font-mono text-xs text-muted-foreground">
            valor: {value ?? "—"}
          </p>
        </div>
      </Demo>

      <Demo
        title="Múltiplo com chips"
        contentClassName="flex-col items-start"
        code={`<Combobox items={areas} multiple value={tags} onValueChange={setTags}>
  <ComboboxChips className="w-80">
    {tags.map((tag) => (
      <ComboboxChip key={tag}>{tag}</ComboboxChip>
    ))}
    <ComboboxChipsInput placeholder="Adicionar área…" />
  </ComboboxChips>
  <ComboboxContent>…</ComboboxContent>
</Combobox>`}
      >
        <Combobox
          items={["Cível", "Trabalhista", "Empresarial", "Tributário", "Penal"]}
          multiple
          value={tags}
          onValueChange={(next) => setTags(next)}
        >
          <ComboboxChips className="w-80">
            {tags.map((tag) => (
              <ComboboxChip key={tag}>{tag}</ComboboxChip>
            ))}
            <ComboboxChipsInput placeholder="Adicionar área…" />
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxEmpty>Nenhuma área encontrada.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Demo>

      <Demo
        title="Desabilitado"
        contentClassName="flex-col items-start"
        code={`<Combobox items={comarcas} disabled>
  <ComboboxInput disabled placeholder="Indisponível" />
</Combobox>`}
      >
        <Combobox items={comarcas} disabled>
          <ComboboxInput
            disabled
            placeholder="Indisponível"
            className="w-64"
          />
          <ComboboxContent>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Demo>

      <Usage
        code={`import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

export function ComarcaPicker({ items }: { items: string[] }) {
  const [value, setValue] = React.useState<string | null>(null)

  return (
    <Combobox items={items} value={value} onValueChange={setValue}>
      <ComboboxInput placeholder="Buscar…" />
      <ComboboxContent>
        <ComboboxEmpty>Sem resultados.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`}
      />

      <PropsTable
        title="Props — Combobox (root)"
        rows={[
          {
            prop: "items",
            type: "T[]",
            description:
              "Coleção usada para filtro automático e para o render prop da lista.",
          },
          {
            prop: "value / defaultValue",
            type: "T | T[] | null",
            description: "Item(ns) selecionado(s).",
          },
          {
            prop: "onValueChange",
            type: "(value, details) => void",
            description: "Callback de seleção.",
          },
          {
            prop: "multiple",
            type: "boolean",
            default: "false",
            description: "Permite selecionar vários itens (use com chips).",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Desabilita o campo.",
          },
          {
            prop: "itemToStringLabel / itemToStringValue",
            type: "(item: T) => string",
            description:
              "Conversão quando os itens são objetos ({ value, label } é detectado automaticamente).",
          },
        ]}
      />

      <PropsTable
        title="Props — ComboboxInput / ComboboxContent"
        rows={[
          {
            prop: "showTrigger (Input)",
            type: "boolean",
            default: "true",
            description: "Exibe o botão de abrir a lista.",
          },
          {
            prop: "showClear (Input)",
            type: "boolean",
            default: "false",
            description: "Exibe o botão de limpar a seleção.",
          },
          {
            prop: "side / align / sideOffset (Content)",
            type: "string | number",
            description: "Posicionamento do painel em relação à âncora.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Digitação", description: "Filtra a lista em tempo real." },
          { keys: "↓ / ↑", description: "Navega entre os resultados." },
          { keys: "Enter", description: "Seleciona o item destacado." },
          { keys: "Esc", description: "Fecha a lista mantendo o foco no campo." },
          {
            keys: "Backspace",
            description: "No modo chips, remove o último item selecionado.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Segue o padrão WAI-ARIA combobox: input com role=combobox, aria-expanded e aria-controls apontando para a lista.",
          "O item destacado é comunicado por aria-activedescendant — o foco permanece no input.",
          "Sempre forneça rótulo (Label htmlFor ou aria-label).",
          "O estado vazio (ComboboxEmpty) é anunciado quando o filtro não retorna resultados.",
          "No modo múltiplo, cada chip tem botão de remoção acessível por teclado.",
        ]}
      />
    </ComponentPage>
  );
}
