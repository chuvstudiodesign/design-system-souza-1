"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Separator } from "@/components/ui/separator";

export default function SeparatorPage() {
  return (
    <ComponentPage
      title="Separator"
      category="Layout"
      description="Divisor visual ou semântico entre blocos de conteúdo. Usa a cor --border e suporta orientação horizontal e vertical."
      install="npx shadcn@latest add separator"
      importCode={`import { Separator } from "@/components/ui/separator"`}
    >
      <Demo
        title="Horizontal"
        contentClassName="flex-col items-stretch"
        code={`<Separator />`}
      >
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-medium">Souza &amp; Souza</h4>
            <p className="text-sm text-muted-foreground">
              Advocacia e assessoria empresarial.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Sobre</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Áreas</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Contato</span>
          </div>
        </div>
      </Demo>

      <Demo
        title="Vertical"
        code={`<div className="flex h-10 items-center gap-4">
  <span>Cível</span>
  <Separator orientation="vertical" />
  <span>Trabalhista</span>
</div>`}
      >
        <div className="flex h-10 items-center gap-4 text-sm">
          <span>Cível</span>
          <Separator orientation="vertical" />
          <span>Trabalhista</span>
          <Separator orientation="vertical" />
          <span>Empresarial</span>
        </div>
      </Demo>

      <Demo
        title="Decorativo com o filete dourado"
        description="Utilitário do projeto: rule-gold aplica o degradê da identidade."
        contentClassName="flex-col items-stretch"
        code={`<div className="h-px w-24 rule-gold" />`}
      >
        <div className="flex w-full flex-col gap-3">
          <div className="h-px w-24 rule-gold" />
          <div className="h-px w-full rule-gold" />
        </div>
      </Demo>

      <Usage
        code={`import { Separator } from "@/components/ui/separator"

export function Section() {
  return (
    <>
      <h2>Título</h2>
      <Separator className="my-4" />
      <p>Conteúdo</p>
    </>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description:
              "Direção do divisor. Na vertical, defina uma altura no elemento pai ou via className.",
          },
          {
            prop: "decorative",
            type: "boolean",
            default: "true",
            description:
              "Quando true, o divisor é ignorado por leitores de tela (role=none).",
          },
          {
            prop: "className",
            type: "string",
            description: "Margens, espessura e cor customizadas.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Com decorative=true (padrão) o separador não é anunciado — correto para divisões puramente visuais.",
          "Use decorative={false} quando a divisão tiver significado (role=separator), por exemplo entre grupos de um menu.",
          "Não use separador como substituto de heading: hierarquia semântica vem de <h2>/<h3>.",
          "Em orientação vertical, garanta altura explícita para que o elemento seja visível.",
        ]}
      />
    </ComponentPage>
  );
}
