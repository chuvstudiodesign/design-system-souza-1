"use client";

import * as React from "react";
import { BriefcaseIcon, FileTextIcon, UsersIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsPage() {
  const [value, setValue] = React.useState("processos");

  return (
    <ComponentPage
      title="Tabs"
      category="Navigation"
      description="Alternância entre painéis de conteúdo relacionados. Suporta orientação horizontal/vertical, variante de linha e ativação automática ou manual."
      install="npx shadcn@latest add tabs"
      importCode={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-stretch"
        code={`<Tabs defaultValue="processos">
  <TabsList>
    <TabsTrigger value="processos">Processos</TabsTrigger>
    <TabsTrigger value="clientes">Clientes</TabsTrigger>
  </TabsList>
  <TabsContent value="processos">…</TabsContent>
  <TabsContent value="clientes">…</TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="processos" className="w-full max-w-lg">
          <TabsList>
            <TabsTrigger value="processos">Processos</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>
          <TabsContent
            value="processos"
            className="rounded-lg border border-border p-4 text-sm text-muted-foreground"
          >
            12 processos ativos, 3 com prazo nos próximos 7 dias.
          </TabsContent>
          <TabsContent
            value="clientes"
            className="rounded-lg border border-border p-4 text-sm text-muted-foreground"
          >
            48 clientes cadastrados, 5 novos neste mês.
          </TabsContent>
          <TabsContent
            value="documentos"
            className="rounded-lg border border-border p-4 text-sm text-muted-foreground"
          >
            136 documentos armazenados no repositório do escritório.
          </TabsContent>
        </Tabs>
      </Demo>

      <Demo
        title="Variante line"
        contentClassName="flex-col items-stretch"
        code={`<TabsList variant="line">…</TabsList>`}
      >
        <Tabs defaultValue="resumo" className="w-full max-w-lg">
          <TabsList variant="line">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="andamento">Andamento</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          </TabsList>
          <TabsContent value="resumo" className="p-4 text-sm text-muted-foreground">
            Visão geral do caso e das partes envolvidas.
          </TabsContent>
          <TabsContent
            value="andamento"
            className="p-4 text-sm text-muted-foreground"
          >
            Linha do tempo das movimentações processuais.
          </TabsContent>
          <TabsContent
            value="financeiro"
            className="p-4 text-sm text-muted-foreground"
          >
            Honorários, custas e reembolsos vinculados ao processo.
          </TabsContent>
        </Tabs>
      </Demo>

      <Demo
        title="Com ícones e item desabilitado"
        contentClassName="flex-col items-stretch"
        code={`<TabsTrigger value="x">
  <BriefcaseIcon /> Processos
</TabsTrigger>
<TabsTrigger value="y" disabled>Indisponível</TabsTrigger>`}
      >
        <Tabs
          value={value}
          onValueChange={setValue}
          className="w-full max-w-lg"
        >
          <TabsList>
            <TabsTrigger value="processos">
              <BriefcaseIcon /> Processos
            </TabsTrigger>
            <TabsTrigger value="clientes">
              <UsersIcon /> Clientes
            </TabsTrigger>
            <TabsTrigger value="arquivados" disabled>
              <FileTextIcon /> Arquivados
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="processos"
            className="rounded-lg border border-border p-4 text-sm text-muted-foreground"
          >
            Aba ativa: <span className="font-mono">{value}</span>
          </TabsContent>
          <TabsContent
            value="clientes"
            className="rounded-lg border border-border p-4 text-sm text-muted-foreground"
          >
            Aba ativa: <span className="font-mono">{value}</span>
          </TabsContent>
        </Tabs>
      </Demo>

      <Demo
        title="Vertical"
        contentClassName="flex-col items-stretch"
        code={`<Tabs orientation="vertical" className="flex-row">…</Tabs>`}
      >
        <Tabs
          defaultValue="a"
          orientation="vertical"
          className="flex w-full max-w-lg flex-row gap-4"
        >
          <TabsList>
            <TabsTrigger value="a">Geral</TabsTrigger>
            <TabsTrigger value="b">Equipe</TabsTrigger>
            <TabsTrigger value="c">Faturamento</TabsTrigger>
          </TabsList>
          <div className="flex-1">
            <TabsContent value="a" className="text-sm text-muted-foreground">
              Configurações gerais do escritório.
            </TabsContent>
            <TabsContent value="b" className="text-sm text-muted-foreground">
              Advogados, estagiários e permissões.
            </TabsContent>
            <TabsContent value="c" className="text-sm text-muted-foreground">
              Dados de cobrança e notas fiscais.
            </TabsContent>
          </div>
        </Tabs>
      </Demo>

      <Usage
        code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CaseTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Resumo</TabsTrigger>
        <TabsTrigger value="timeline">Andamento</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">…</TabsContent>
      <TabsContent value="timeline">…</TabsContent>
    </Tabs>
  )
}`}
      />

      <PropsTable
        title="Props — Tabs"
        rows={[
          {
            prop: "value / defaultValue",
            type: "string",
            description: "Aba ativa.",
          },
          {
            prop: "onValueChange",
            type: "(value: string) => void",
            description: "Callback de troca de aba.",
          },
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Direção da lista e da navegação por setas.",
          },
          {
            prop: "activationMode",
            type: '"automatic" | "manual"',
            default: '"automatic"',
            description:
              "Automatic ativa ao focar; manual exige Enter/Space (melhor quando o conteúdo é pesado).",
          },
        ]}
      />

      <PropsTable
        title="Props — TabsList / TabsTrigger"
        rows={[
          {
            prop: "variant (TabsList)",
            type: '"default" | "line"',
            default: '"default"',
            description: "Fundo sólido ou sublinhado.",
          },
          {
            prop: "value (TabsTrigger/TabsContent)",
            type: "string",
            description: "Chave que vincula gatilho e painel (obrigatório).",
          },
          {
            prop: "disabled (TabsTrigger)",
            type: "boolean",
            default: "false",
            description: "Desabilita a aba.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Entra na lista de abas e vai para o painel." },
          { keys: "← / →", description: "Navega entre abas (orientação horizontal)." },
          { keys: "↑ / ↓", description: "Navega entre abas (orientação vertical)." },
          { keys: "Home / End", description: "Primeira/última aba." },
          {
            keys: "Enter / Space",
            description: "Ativa a aba focada em activationMode='manual'.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Estrutura ARIA completa: role=tablist, role=tab (com aria-selected) e role=tabpanel vinculado por aria-controls/aria-labelledby.",
          "Apenas a aba ativa fica na ordem de tabulação (roving tabindex).",
          "Use activationMode='manual' quando trocar de aba dispara requisições — evita carregar conteúdo só por navegar com setas.",
          "Não use Tabs para navegação entre páginas: para isso use links reais.",
          "Abas com ícone e sem texto precisam de aria-label.",
        ]}
      />
    </ComponentPage>
  );
}
