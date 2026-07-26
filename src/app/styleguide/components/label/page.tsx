"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LabelPage() {
  return (
    <ComponentPage
      title="Label"
      category="Inputs & Forms"
      description="Rótulo acessível para campos de formulário. Reage aos estados do controle associado (peer-disabled) e mantém a hierarquia tipográfica de 14px/medium."
      install="npx shadcn@latest add label"
      importCode={`import { Label } from "@/components/ui/label"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-stretch"
        code={`<Label htmlFor="nome">Nome completo</Label>
<Input id="nome" />`}
      >
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Label htmlFor="nome">Nome completo</Label>
          <Input id="nome" placeholder="Maria Souza" />
        </div>
      </Demo>

      <Demo
        title="Com indicador de obrigatório"
        contentClassName="flex-col items-stretch"
        code={`<Label htmlFor="oab">
  OAB <span className="text-destructive">*</span>
</Label>`}
      >
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Label htmlFor="oab">
            OAB{" "}
            <span aria-hidden className="text-destructive">
              *
            </span>
            <span className="sr-only">(obrigatório)</span>
          </Label>
          <Input id="oab" required placeholder="SP 000.000" />
        </div>
      </Demo>

      <Demo
        title="Com controle inline"
        code={`<Label htmlFor="lembrar" className="gap-2">
  <Checkbox id="lembrar" />
  Lembrar deste dispositivo
</Label>`}
      >
        <Label htmlFor="lembrar" className="gap-2">
          <Checkbox id="lembrar" />
          Lembrar deste dispositivo
        </Label>
      </Demo>

      <Demo
        title="Estado desabilitado"
        description="Com a classe peer no controle, o rótulo acompanha o estado."
        contentClassName="flex-col items-stretch"
        code={`<div className="flex flex-col gap-2">
  <Input id="bloqueado" disabled className="peer" />
  <Label htmlFor="bloqueado">Campo bloqueado</Label>
</div>`}
      >
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Input id="bloqueado" disabled className="peer" placeholder="—" />
          <Label htmlFor="bloqueado">Campo bloqueado</Label>
        </div>
      </Demo>

      <Usage
        code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function Field() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="cpf">CPF</Label>
      <Input id="cpf" inputMode="numeric" />
    </div>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "htmlFor",
            type: "string",
            description:
              "Id do controle associado — obrigatório para acessibilidade.",
          },
          {
            prop: "className",
            type: "string",
            description: "Classes adicionais (o layout base é flex + gap-2).",
          },
          {
            prop: "...props",
            type: "React.ComponentProps<typeof LabelPrimitive.Root>",
            description: "Props do Radix Label.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "htmlFor deve apontar para o id do controle — sem isso o clique no rótulo não foca o campo e leitores de tela não fazem a associação.",
          "Alternativamente, envolva o controle dentro do <Label> (associação implícita).",
          "Indicadores visuais de obrigatoriedade (*) devem ter aria-hidden e um texto alternativo em sr-only.",
          "Não use apenas placeholder como rótulo.",
        ]}
      />
    </ComponentPage>
  );
}
