"use client";

import * as React from "react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPage() {
  const [loading, setLoading] = React.useState(true);

  return (
    <ComponentPage
      title="Skeleton"
      category="Layout"
      description="Placeholder animado que reserva o espaço do conteúdo enquanto ele carrega, evitando saltos de layout e a sensação de tela travada."
      install="npx shadcn@latest add skeleton"
      importCode={`import { Skeleton } from "@/components/ui/skeleton"`}
    >
      <Demo
        title="Formas básicas"
        contentClassName="flex-col items-stretch"
        code={`<Skeleton className="h-4 w-48" />
<Skeleton className="size-12 rounded-full" />
<Skeleton className="h-24 w-full rounded-xl" />`}
      >
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-64" />
          <div className="flex items-center gap-3">
            <Skeleton className="size-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </Demo>

      <Demo
        title="Skeleton de card"
        description="Reproduza a estrutura real do conteúdo — mesmas alturas e espaçamentos."
        contentClassName="flex-col items-stretch"
        code={`<Card>
  <CardHeader className="gap-2">
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-3 w-56" />
  </CardHeader>
  <CardContent className="flex flex-col gap-2">
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-4/5" />
  </CardContent>
</Card>`}
      >
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader className="gap-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>
          </Card>
        </div>
      </Demo>

      <Demo
        title="Alternando carregamento"
        contentClassName="flex-col items-stretch"
        code={`{loading ? <Skeleton className="h-6 w-56" /> : <p>Conteúdo carregado</p>}`}
      >
        <div className="flex w-full max-w-md flex-col gap-4">
          <Button
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() => setLoading((v) => !v)}
          >
            {loading ? "Mostrar conteúdo" : "Mostrar skeleton"}
          </Button>
          <div aria-live="polite" aria-busy={loading}>
            {loading ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-56" />
                <Skeleton className="h-3 w-72" />
                <Skeleton className="h-3 w-64" />
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <p className="font-medium">Processo 1000123-45.2026.8.26.0100</p>
                <p className="text-sm text-muted-foreground">
                  Última movimentação em 02/04 — contestação apresentada.
                </p>
              </div>
            )}
          </div>
        </div>
      </Demo>

      <Usage
        code={`import { Skeleton } from "@/components/ui/skeleton"

export function ListSkeleton() {
  return (
    <div className="flex flex-col gap-2" aria-busy>
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-lg" />
      ))}
    </div>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "className",
            type: "string",
            description:
              "Define a forma: altura, largura e border-radius do placeholder.",
          },
          {
            prop: "...props",
            type: "React.ComponentProps<'div'>",
            description: "Props nativas repassadas ao elemento.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Envolva a região que carrega com aria-busy='true' e aria-live='polite' para anunciar a troca de estado.",
          "O skeleton em si é decorativo — não precisa de texto alternativo.",
          "Evite animações longas ou intensas: respeitam prefers-reduced-motion via utilitários do Tailwind quando necessário.",
          "Mantenha as dimensões próximas do conteúdo real; skeletons desproporcionais causam salto de layout ao carregar.",
        ]}
      />
    </ComponentPage>
  );
}
