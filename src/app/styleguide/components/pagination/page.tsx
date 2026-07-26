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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationPage() {
  const [page, setPage] = React.useState(3);
  const total = 8;

  return (
    <ComponentPage
      title="Pagination"
      category="Navigation"
      description="Navegação entre páginas de uma listagem. Renderiza links reais (bom para SEO e para abrir em nova aba) ou botões, quando a paginação é client-side."
      install="npx shadcn@latest add pagination"
      importCode={`import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-stretch"
        code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">12</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Demo>

      <Demo
        title="Controlado (client-side)"
        description="Sem href, os itens viram botões — ideal para listas paginadas em memória."
        contentClassName="flex-col items-stretch"
        code={`const [page, setPage] = React.useState(3)

<PaginationLink
  isActive={page === n}
  onClick={() => setPage(n)}
  aria-current={page === n ? "page" : undefined}
>
  {n}
</PaginationLink>`}
      >
        <div className="flex w-full flex-col gap-3">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-disabled={page === 1}
                  className={
                    page === 1 ? "pointer-events-none opacity-50" : undefined
                  }
                />
              </PaginationItem>
              {Array.from({ length: total }, (_, index) => index + 1).map(
                (n) => (
                  <PaginationItem key={n}>
                    <PaginationLink
                      isActive={page === n}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(total, p + 1))}
                  aria-disabled={page === total}
                  className={
                    page === total ? "pointer-events-none opacity-50" : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <p
            aria-live="polite"
            className="text-center font-mono text-xs text-muted-foreground"
          >
            Página {page} de {total}
          </p>
        </div>
      </Demo>

      <Demo
        title="Compacta"
        description="Apenas anterior/próximo, com o indicador textual no meio."
        contentClassName="flex-col items-stretch"
        code={`<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <span className="px-4 text-sm">2 / 8</span>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <span className="px-4 font-mono text-sm text-muted-foreground">
              2 / 8
            </span>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Demo>

      <Usage
        title="Com Next.js Link"
        code={`import Link from "next/link"

<PaginationItem>
  <PaginationLink asChild isActive={page === 2}>
    <Link href="/processos?page=2">2</Link>
  </PaginationLink>
</PaginationItem>`}
      />

      <PropsTable
        rows={[
          {
            prop: "Pagination",
            type: "nav",
            description: "Renderiza <nav role='navigation' aria-label='pagination'>.",
          },
          {
            prop: "PaginationLink · isActive",
            type: "boolean",
            default: "false",
            description:
              "Marca a página atual (aplica aria-current='page' e a variante outline).",
          },
          {
            prop: "PaginationLink · size",
            type: '"icon" | "default" | "sm" | "lg"',
            default: '"icon"',
            description: "Tamanho herdado do Button.",
          },
          {
            prop: "PaginationLink · asChild",
            type: "boolean",
            description: "Permite usar next/link.",
          },
          {
            prop: "PaginationPrevious / PaginationNext",
            type: "a | button",
            description: "Atalhos com ícone e rótulo textual.",
          },
          {
            prop: "PaginationEllipsis",
            type: "span",
            description: "Indica páginas ocultas; é aria-hidden.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Percorre os links de página." },
          { keys: "Enter", description: "Navega para a página focada." },
          { keys: "Space", description: "Ativa quando o item é um botão." },
        ]}
      />

      <A11yNotes
        items={[
          "A raiz já possui aria-label='pagination'.",
          "A página atual usa aria-current='page' — não desabilite o link atual, apenas marque-o.",
          "Anuncie mudanças de página em uma região aria-live quando a navegação for client-side.",
          "Botões desabilitados nas extremidades devem usar aria-disabled + pointer-events-none, mantendo o foco previsível.",
          "As reticências são decorativas (aria-hidden) e possuem texto 'Mais páginas' em sr-only.",
        ]}
      />
    </ComponentPage>
  );
}
