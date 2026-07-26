"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

export default function InputPage() {
  const [value, setValue] = React.useState("");

  return (
    <ComponentPage
      title="Input"
      category="Inputs & Forms"
      description="Campo de texto de linha única. Usa --input para a borda, --ring para o foco e --destructive para o estado inválido."
      install="npx shadcn@latest add input"
      importCode={`import { Input } from "@/components/ui/input"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-stretch"
        code={`<div className="flex flex-col gap-2">
  <Label htmlFor="email">E-mail</Label>
  <Input id="email" type="email" placeholder="nome@escritorio.com" />
</div>`}
      >
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="nome@escritorio.com" />
        </div>
      </Demo>

      <Demo
        title="Tipos"
        contentClassName="flex-col items-stretch"
        code={`<Input type="text" placeholder="Texto" />
<Input type="password" placeholder="Senha" />
<Input type="number" placeholder="0" />
<Input type="date" />
<Input type="file" />`}
      >
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Input type="text" placeholder="Texto" />
          <Input type="password" placeholder="Senha" />
          <Input type="number" placeholder="Número do processo" />
          <Input type="date" />
          <Input type="search" placeholder="Buscar" />
          <Input type="file" />
        </div>
      </Demo>

      <Demo
        title="Estados"
        contentClassName="flex-col items-stretch"
        code={`<Input disabled placeholder="Desabilitado" />
<Input readOnly value="Somente leitura" />
<Input aria-invalid placeholder="Inválido" />`}
      >
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Input disabled placeholder="Desabilitado" />
          <Input readOnly value="Somente leitura" />
          <Input aria-invalid defaultValue="cpf inválido" />
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Controlado"
          />
        </div>
      </Demo>

      <Demo
        title="Com InputGroup"
        description="Prefixos, sufixos e ícones sem quebrar o alinhamento do campo."
        contentClassName="flex-col items-stretch"
        code={`<InputGroup>
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupInput placeholder="Buscar processo" />
</InputGroup>`}
      >
        <div className="flex w-full max-w-sm flex-col gap-3">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Buscar processo" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>R$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="0,00" inputMode="decimal" />
          </InputGroup>
        </div>
      </Demo>

      <Usage
        code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EmailField() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">E-mail</Label>
      <Input id="email" name="email" type="email" required />
    </div>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "type",
            type: "string",
            default: '"text"',
            description:
              "Tipo nativo do input (text, email, password, number, date, file…).",
          },
          {
            prop: "value / defaultValue",
            type: "string | number",
            description: "Valor controlado ou inicial.",
          },
          {
            prop: "aria-invalid",
            type: "boolean",
            description:
              "Aplica a borda e o anel destrutivos; use junto de uma mensagem de erro.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Desabilita o campo.",
          },
          {
            prop: "...props",
            type: "React.ComponentProps<'input'>",
            description: "Todas as props nativas são repassadas.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Move o foco entre campos." },
          { keys: "Enter", description: "Submete o formulário que o contém." },
          { keys: "Esc", description: "Limpa campos do tipo search (nativo)." },
        ]}
      />

      <A11yNotes
        items={[
          "Todo input precisa de um rótulo: <Label htmlFor> ou aria-label quando o rótulo for visualmente implícito.",
          "Erros devem usar aria-invalid no campo e aria-describedby apontando para a mensagem.",
          "Placeholder não substitui rótulo — ele desaparece ao digitar.",
          "O contraste do placeholder segue --muted-foreground (mínimo 4.5:1 nos dois temas).",
        ]}
      />
    </ComponentPage>
  );
}
