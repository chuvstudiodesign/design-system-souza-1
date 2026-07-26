"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function FieldPage() {
  return (
    <ComponentPage
      title="Field"
      category="Inputs & Forms"
      description="Estrutura de campo de formulário do shadcn: rótulo, descrição, erro e orientação (vertical, horizontal ou responsive) sem depender de biblioteca de formulários."
      install="npx shadcn@latest add field"
      importCode={`import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"`}
    >
      <Demo
        title="Campo simples"
        contentClassName="flex-col items-stretch"
        code={`<Field>
  <FieldLabel htmlFor="nome">Nome completo</FieldLabel>
  <Input id="nome" />
  <FieldDescription>Como consta no contrato social.</FieldDescription>
</Field>`}
      >
        <div className="w-full max-w-lg">
          <Field>
            <FieldLabel htmlFor="f-nome">Nome completo</FieldLabel>
            <Input id="f-nome" placeholder="Souza & Souza Advocacia" />
            <FieldDescription>
              Como consta no contrato social do escritório.
            </FieldDescription>
          </Field>
        </div>
      </Demo>

      <Demo
        title="Estado inválido"
        contentClassName="flex-col items-stretch"
        code={`<Field data-invalid>
  <FieldLabel htmlFor="cnpj">CNPJ</FieldLabel>
  <Input id="cnpj" aria-invalid />
  <FieldError errors={[{ message: "CNPJ inválido." }]} />
</Field>`}
      >
        <div className="w-full max-w-lg">
          <Field data-invalid>
            <FieldLabel htmlFor="f-cnpj">CNPJ</FieldLabel>
            <Input id="f-cnpj" aria-invalid defaultValue="00.000.000/0000-00" />
            <FieldError errors={[{ message: "CNPJ inválido ou inexistente." }]} />
          </Field>
        </div>
      </Demo>

      <Demo
        title="Orientação horizontal"
        contentClassName="flex-col items-stretch"
        code={`<Field orientation="horizontal">
  <FieldContent>
    <FieldTitle>Notificações</FieldTitle>
    <FieldDescription>Receber alertas por e-mail.</FieldDescription>
  </FieldContent>
  <Switch />
</Field>`}
      >
        <div className="flex w-full max-w-lg flex-col gap-4">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Notificações por e-mail</FieldTitle>
              <FieldDescription>
                Alertas de prazo, audiências e movimentações.
              </FieldDescription>
            </FieldContent>
            <Switch defaultChecked />
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <Checkbox id="f-termos" />
            <FieldContent>
              <FieldLabel htmlFor="f-termos">Aceito os termos</FieldLabel>
              <FieldDescription>
                Li e concordo com a política de privacidade.
              </FieldDescription>
            </FieldContent>
          </Field>
        </div>
      </Demo>

      <Demo
        title="FieldSet + FieldGroup"
        description="Agrupa campos relacionados com legenda semântica (<fieldset>/<legend>)."
        contentClassName="flex-col items-stretch"
        code={`<FieldSet>
  <FieldLegend>Dados do processo</FieldLegend>
  <FieldGroup>
    <Field>…</Field>
    <Field>…</Field>
  </FieldGroup>
</FieldSet>`}
      >
        <div className="w-full max-w-lg">
          <FieldSet>
            <FieldLegend>Dados do processo</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="f-num">Número do processo</FieldLabel>
                <Input id="f-num" placeholder="0000000-00.0000.0.00.0000" />
              </Field>
              <Field>
                <FieldLabel htmlFor="f-obs">Observações</FieldLabel>
                <Textarea id="f-obs" rows={3} />
                <FieldDescription>
                  Visível apenas para a equipe interna.
                </FieldDescription>
              </Field>
              <FieldSet>
                <FieldLegend variant="label">Prioridade</FieldLegend>
                <RadioGroup defaultValue="normal" className="gap-2">
                  {["baixa", "normal", "alta"].map((level) => (
                    <Field key={level} orientation="horizontal">
                      <RadioGroupItem value={level} id={`f-${level}`} />
                      <FieldLabel htmlFor={`f-${level}`} className="capitalize">
                        {level}
                      </FieldLabel>
                    </Field>
                  ))}
                </RadioGroup>
              </FieldSet>
            </FieldGroup>
          </FieldSet>
        </div>
      </Demo>

      <Usage
        code={`import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function EmailField({ error }: { error?: string }) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor="email">E-mail</FieldLabel>
      <Input id="email" type="email" aria-invalid={!!error} />
      <FieldDescription>Usado para envio de intimações.</FieldDescription>
      {error ? <FieldError errors={[{ message: error }]} /> : null}
    </Field>
  )
}`}
      />

      <PropsTable
        title="Props — Field"
        rows={[
          {
            prop: "orientation",
            type: '"vertical" | "horizontal" | "responsive"',
            default: '"vertical"',
            description: "Disposição entre rótulo e controle.",
          },
          {
            prop: "data-invalid",
            type: "boolean",
            description:
              "Aplica a cor destrutiva ao conjunto (rótulo, descrição e borda).",
          },
        ]}
      />

      <PropsTable
        title="Props — FieldError / FieldLegend"
        rows={[
          {
            prop: "errors (FieldError)",
            type: "Array<{ message?: string }>",
            description:
              "Lista de erros — duplicatas são removidas e renderizadas como lista quando há mais de um.",
          },
          {
            prop: "variant (FieldLegend)",
            type: '"legend" | "label"',
            default: '"legend"',
            description: "Tamanho tipográfico da legenda do fieldset.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "FieldSet + FieldLegend renderizam <fieldset> e <legend> reais — a forma correta de agrupar rádios e checkboxes relacionados.",
          "FieldLabel precisa de htmlFor apontando para o id do controle.",
          "FieldError deve ser referenciado por aria-describedby no controle; use aria-invalid no input.",
          "Em orientação horizontal, mantenha a ordem do DOM (rótulo antes do controle) para leitores de tela.",
        ]}
      />
    </ComponentPage>
  );
}
