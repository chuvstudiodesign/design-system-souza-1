"use client";

import Link from "next/link";
import { CheckIcon, ClockIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Badge } from "@/components/ui/badge";

export default function BadgePage() {
  return (
    <ComponentPage
      title="Badge"
      category="Feedback"
      description="Etiqueta compacta para status, categorias e contadores. Seis variantes e suporte a asChild para virar link."
      install="npx shadcn@latest add badge"
      importCode={`import { Badge } from "@/components/ui/badge"`}
    >
      <Demo
        title="Variantes"
        code={`<Badge>Padrão</Badge>
<Badge variant="secondary">Secundário</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>
<Badge variant="destructive">Destrutivo</Badge>
<Badge variant="link">Link</Badge>`}
      >
        <Badge>Padrão</Badge>
        <Badge variant="secondary">Secundário</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="destructive">Destrutivo</Badge>
        <Badge variant="link">Link</Badge>
      </Demo>

      <Demo
        title="Status do escritório"
        description="Composição com os tokens semânticos e a cor dourada da marca."
        code={`<Badge className="bg-success text-success-foreground">Ativo</Badge>
<Badge className="bg-warning text-warning-foreground">Pendente</Badge>
<Badge className="bg-gold text-gold-foreground">Prioritário</Badge>`}
      >
        <Badge className="bg-success text-success-foreground">
          <CheckIcon /> Ativo
        </Badge>
        <Badge className="bg-warning text-warning-foreground">
          <ClockIcon /> Aguardando
        </Badge>
        <Badge className="bg-info text-info-foreground">Em análise</Badge>
        <Badge className="bg-gold text-gold-foreground">Prioritário</Badge>
        <Badge variant="destructive">Prazo vencido</Badge>
      </Demo>

      <Demo
        title="Com ícone e contador"
        code={`<Badge>
  <CheckIcon /> Concluído
</Badge>
<Badge variant="secondary" className="rounded-full tabular-nums">12</Badge>`}
      >
        <Badge>
          <CheckIcon /> Concluído
        </Badge>
        <Badge variant="secondary" className="rounded-full tabular-nums">
          12
        </Badge>
        <Badge variant="outline" className="rounded-full tabular-nums">
          99+
        </Badge>
      </Demo>

      <Demo
        title="Como link"
        code={`<Badge asChild>
  <Link href="/processos?status=ativo">Ver ativos</Link>
</Badge>`}
      >
        <Badge asChild>
          <Link href="/styleguide">Ver processos ativos</Link>
        </Badge>
        <Badge variant="outline" asChild>
          <Link href="/styleguide">Filtrar por cliente</Link>
        </Badge>
      </Demo>

      <Usage
        code={`import { Badge } from "@/components/ui/badge"

export function CaseStatus({ status }: { status: "ativo" | "arquivado" }) {
  return status === "ativo" ? (
    <Badge className="bg-success text-success-foreground">Ativo</Badge>
  ) : (
    <Badge variant="secondary">Arquivado</Badge>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "variant",
            type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
            default: '"default"',
            description: "Estilo visual da etiqueta.",
          },
          {
            prop: "asChild",
            type: "boolean",
            default: "false",
            description:
              "Aplica os estilos ao filho — use com next/link para badges clicáveis.",
          },
          {
            prop: "className",
            type: "string",
            description:
              "Composição com tokens semânticos (bg-success, bg-gold…).",
          },
          {
            prop: "badgeVariants",
            type: "(props) => string",
            description:
              "Helper cva exportado para reutilizar os estilos em outros elementos.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Badge é um <span> decorativo por padrão: o texto precisa ser autoexplicativo.",
          "Contadores devem ter contexto textual — 'Notificações: 12' em sr-only, por exemplo.",
          "Não use apenas cor para transmitir status: mantenha rótulo textual ou ícone com significado.",
          "Badges clicáveis devem usar asChild com <a>/<Link> para serem focáveis e anunciados como link.",
          "Os pares de cor usados (success/warning/info/gold) mantêm contraste AA com seus foregrounds.",
        ]}
      />
    </ComponentPage>
  );
}
