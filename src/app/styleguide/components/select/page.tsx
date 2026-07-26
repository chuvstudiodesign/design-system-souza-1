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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectPage() {
  const [value, setValue] = React.useState("sp");

  return (
    <ComponentPage
      title="Select"
      category="Inputs & Forms"
      description="Lista suspensa de escolha única sobre Radix Select. Renderiza em portal, com tipagem por primeira letra, agrupamento e rolagem automática."
      install="npx shadcn@latest add select"
      importCode={`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`}
    >
      <Demo
        title="Básico"
        code={`<Select>
  <SelectTrigger className="w-56">
    <SelectValue placeholder="Selecione a área" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="civil">Cível</SelectItem>
    <SelectItem value="trabalhista">Trabalhista</SelectItem>
  </SelectContent>
</Select>`}
      >
        <Select>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Selecione a área" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="civil">Cível</SelectItem>
            <SelectItem value="trabalhista">Trabalhista</SelectItem>
            <SelectItem value="empresarial">Empresarial</SelectItem>
            <SelectItem value="tributario">Tributário</SelectItem>
          </SelectContent>
        </Select>
      </Demo>

      <Demo
        title="Com grupos e separador"
        code={`<SelectContent>
  <SelectGroup>
    <SelectLabel>Sudeste</SelectLabel>
    <SelectItem value="sp">São Paulo</SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>
    <SelectLabel>Sul</SelectLabel>
    <SelectItem value="pr">Paraná</SelectItem>
  </SelectGroup>
</SelectContent>`}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="uf">Comarca</Label>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger id="uf" className="w-56">
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sudeste</SelectLabel>
                <SelectItem value="sp">São Paulo</SelectItem>
                <SelectItem value="rj">Rio de Janeiro</SelectItem>
                <SelectItem value="mg">Minas Gerais</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Sul</SelectLabel>
                <SelectItem value="pr">Paraná</SelectItem>
                <SelectItem value="sc">Santa Catarina</SelectItem>
                <SelectItem value="rs">Rio Grande do Sul</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="font-mono text-xs text-muted-foreground">
            valor: {value}
          </p>
        </div>
      </Demo>

      <Demo
        title="Estados"
        code={`<Select disabled>…</Select>
<SelectItem value="x" disabled>Indisponível</SelectItem>
<SelectTrigger aria-invalid>…</SelectTrigger>`}
      >
        <Select disabled>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Desabilitado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">A</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-44" aria-invalid>
            <SelectValue placeholder="Campo inválido" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Opção A</SelectItem>
            <SelectItem value="b" disabled>
              Opção indisponível
            </SelectItem>
          </SelectContent>
        </Select>
      </Demo>

      <Demo
        title="Tamanhos do gatilho"
        code={`<SelectTrigger size="sm">…</SelectTrigger>
<SelectTrigger size="default">…</SelectTrigger>`}
      >
        <Select defaultValue="1">
          <SelectTrigger size="sm" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Compacto</SelectItem>
            <SelectItem value="2">Outra opção</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="1">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Padrão</SelectItem>
            <SelectItem value="2">Outra opção</SelectItem>
          </SelectContent>
        </Select>
      </Demo>

      <Usage
        code={`import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AreaSelect() {
  return (
    <Select name="area" defaultValue="civil">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Área de atuação" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="civil">Cível</SelectItem>
        <SelectItem value="trabalhista">Trabalhista</SelectItem>
      </SelectContent>
    </Select>
  )
}`}
      />

      <PropsTable
        title="Props — Select (root)"
        rows={[
          {
            prop: "value / defaultValue",
            type: "string",
            description: "Item selecionado.",
          },
          {
            prop: "onValueChange",
            type: "(value: string) => void",
            description: "Callback de seleção.",
          },
          {
            prop: "open / onOpenChange",
            type: "boolean / (open: boolean) => void",
            description: "Controle da abertura do menu.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Desabilita o componente inteiro.",
          },
          {
            prop: "name / required",
            type: "string / boolean",
            description: "Integração com formulários nativos.",
          },
        ]}
      />

      <PropsTable
        title="Props — SelectTrigger / SelectContent"
        rows={[
          {
            prop: "size (Trigger)",
            type: '"sm" | "default"',
            default: '"default"',
            description: "Altura do gatilho.",
          },
          {
            prop: "position (Content)",
            type: '"item-aligned" | "popper"',
            default: '"popper"',
            description: "Estratégia de posicionamento do painel.",
          },
          {
            prop: "side / align (Content)",
            type: "string",
            description: "Lado e alinhamento em relação ao gatilho.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Space / Enter", description: "Abre o menu e seleciona o item focado." },
          { keys: "↑ / ↓", description: "Navega entre as opções." },
          { keys: "Home / End", description: "Vai para a primeira/última opção." },
          { keys: "A–Z", description: "Busca por digitação (typeahead)." },
          { keys: "Esc", description: "Fecha o menu e devolve o foco ao gatilho." },
        ]}
      />

      <A11yNotes
        items={[
          "Segue o padrão WAI-ARIA de listbox: o gatilho tem role=combobox e aria-expanded, o painel role=listbox.",
          "Associe um <Label htmlFor> ao id do SelectTrigger.",
          "O foco é preso no painel enquanto aberto e retorna ao gatilho ao fechar.",
          "Para muitas opções com busca, prefira o Combobox — ele oferece filtro por texto.",
          "Itens desabilitados continuam anunciados, com aria-disabled.",
        ]}
      />
    </ComponentPage>
  );
}
