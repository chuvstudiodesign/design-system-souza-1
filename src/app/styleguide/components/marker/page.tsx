"use client";

import { CheckIcon, ClockIcon, InfoIcon, SparklesIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";

export default function MarkerPage() {
  return (
    <ComponentPage
      title="Marker"
      category="New"
      description="Linha de metadado dentro de conversas e listas: divisores de data, status de entrega, avisos de contexto e rótulos de sistema."
      install="npx shadcn@latest add marker"
      importCode={`import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"`}
    >
      <Demo
        title="Variantes"
        contentClassName="flex-col items-stretch"
        code={`<Marker variant="default">
  <MarkerIcon><InfoIcon /></MarkerIcon>
  <MarkerContent>Mensagem do sistema</MarkerContent>
</Marker>

<Marker variant="separator">
  <MarkerContent>Hoje</MarkerContent>
</Marker>

<Marker variant="border">
  <MarkerContent>Conversa arquivada</MarkerContent>
</Marker>`}
      >
        <div className="flex w-full max-w-lg flex-col gap-6">
          <Marker variant="default">
            <MarkerIcon>
              <InfoIcon />
            </MarkerIcon>
            <MarkerContent>
              Esta conversa é registrada para fins de auditoria.
            </MarkerContent>
          </Marker>

          <Marker variant="separator">
            <MarkerContent>Hoje</MarkerContent>
          </Marker>

          <Marker variant="border">
            <MarkerContent>Conversa arquivada em 02/04/2026</MarkerContent>
          </Marker>
        </div>
      </Demo>

      <Demo
        title="Divisores de data"
        description="Uso mais comum: separar blocos de mensagens por dia."
        contentClassName="flex-col items-stretch"
        code={`<Marker variant="separator">
  <MarkerContent>12 de março</MarkerContent>
</Marker>`}
      >
        <div className="flex w-full max-w-lg flex-col gap-4">
          {["12 de março", "18 de março", "Hoje"].map((label) => (
            <Marker key={label} variant="separator">
              <MarkerContent>{label}</MarkerContent>
            </Marker>
          ))}
        </div>
      </Demo>

      <Demo
        title="Status com ícone"
        contentClassName="flex-col items-stretch"
        code={`<Marker>
  <MarkerIcon><CheckIcon /></MarkerIcon>
  <MarkerContent>Entregue às 14:32</MarkerContent>
</Marker>`}
      >
        <div className="flex w-full max-w-lg flex-col gap-3">
          <Marker>
            <MarkerIcon>
              <CheckIcon />
            </MarkerIcon>
            <MarkerContent>Entregue às 14:32</MarkerContent>
          </Marker>
          <Marker>
            <MarkerIcon>
              <ClockIcon />
            </MarkerIcon>
            <MarkerContent>Aguardando envio ao tribunal</MarkerContent>
          </Marker>
          <Marker>
            <MarkerIcon>
              <SparklesIcon />
            </MarkerIcon>
            <MarkerContent>
              Resumo gerado automaticamente —{" "}
              <a href="/styleguide">ver detalhes</a>
            </MarkerContent>
          </Marker>
        </div>
      </Demo>

      <Usage
        code={`import { Marker, MarkerContent } from "@/components/ui/marker"

export function DateDivider({ label }: { label: string }) {
  return (
    <Marker variant="separator">
      <MarkerContent>{label}</MarkerContent>
    </Marker>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "Marker · variant",
            type: '"default" | "separator" | "border"',
            default: '"default"',
            description:
              "separator centraliza o texto entre duas linhas; border adiciona um filete inferior.",
          },
          {
            prop: "Marker · asChild",
            type: "boolean",
            default: "false",
            description: "Renderiza em outro elemento mantendo os estilos.",
          },
          {
            prop: "MarkerIcon",
            type: "span",
            description:
              "Ícone decorativo (aria-hidden) dimensionado automaticamente.",
          },
          {
            prop: "MarkerContent",
            type: "span",
            description:
              "Texto do marcador; links internos já recebem sublinhado e hover.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "MarkerIcon já é aria-hidden — o significado deve estar sempre no texto do MarkerContent.",
          "Divisores de data devem conter a data por extenso: 'Hoje' sozinho não é claro fora de contexto.",
          "Para status que mudam dinamicamente (enviado → entregue → lido), coloque o marcador em uma região aria-live discreta.",
          "Não use Marker como heading — ele é metadado, não estrutura de documento.",
        ]}
      />
    </ComponentPage>
  );
}
