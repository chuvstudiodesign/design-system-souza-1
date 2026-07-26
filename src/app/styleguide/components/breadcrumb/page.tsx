"use client";

import { SlashIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BreadcrumbShowcasePage() {
  return (
    <ComponentPage
      title="Breadcrumb"
      category="Navigation"
      description="Trilha de navegação que mostra a posição atual na hierarquia do site e permite voltar a qualquer nível anterior."
      install="npx shadcn@latest add breadcrumb"
      importCode={`import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-start"
        code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Início</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Processo 1000123-45</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/styleguide">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/styleguide">Processos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>1000123-45.2026.8.26.0100</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Demo>

      <Demo
        title="Separador customizado"
        contentClassName="flex-col items-start"
        code={`<BreadcrumbSeparator>
  <SlashIcon />
</BreadcrumbSeparator>`}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/styleguide">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/styleguide">Clientes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Souza &amp; Souza LTDA</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Demo>

      <Demo
        title="Colapsado com menu"
        description="Trilhas longas: agrupe os níveis intermediários em um dropdown."
        contentClassName="flex-col items-start"
        code={`<BreadcrumbItem>
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-1">
      <BreadcrumbEllipsis />
      <span className="sr-only">Mostrar mais</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem>Processos</DropdownMenuItem>
      <DropdownMenuItem>Cível</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</BreadcrumbItem>`}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/styleguide">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis />
                  <span className="sr-only">Mostrar níveis intermediários</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Processos</DropdownMenuItem>
                  <DropdownMenuItem>Cível</DropdownMenuItem>
                  <DropdownMenuItem>2026</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Petição inicial</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Demo>

      <Usage
        title="Com Next.js Link"
        code={`import Link from "next/link"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"

<BreadcrumbItem>
  <BreadcrumbLink asChild>
    <Link href="/processos">Processos</Link>
  </BreadcrumbLink>
</BreadcrumbItem>`}
      />

      <PropsTable
        rows={[
          {
            prop: "Breadcrumb",
            type: "nav",
            description: "Renderiza <nav aria-label='breadcrumb'>.",
          },
          {
            prop: "BreadcrumbList",
            type: "ol",
            description: "Lista ordenada dos níveis.",
          },
          {
            prop: "BreadcrumbLink · asChild",
            type: "boolean",
            default: "false",
            description:
              "Permite usar next/link mantendo os estilos do componente.",
          },
          {
            prop: "BreadcrumbPage",
            type: "span",
            description:
              "Página atual — recebe role=link, aria-disabled e aria-current='page'.",
          },
          {
            prop: "BreadcrumbSeparator · children",
            type: "React.ReactNode",
            default: "<ChevronRight />",
            description: "Ícone ou caractere separador.",
          },
          {
            prop: "BreadcrumbEllipsis",
            type: "span",
            description: "Indicador de níveis ocultos (aria-hidden).",
          },
        ]}
      />

      <A11yNotes
        items={[
          "O <nav> já vem com aria-label='breadcrumb'.",
          "O último item deve ser BreadcrumbPage (com aria-current='page'), nunca um link.",
          "Separadores são aria-hidden — não são lidos pelos leitores de tela.",
          "Ao colapsar níveis, forneça texto em sr-only descrevendo o gatilho ('Mostrar mais').",
          "Mantenha a ordem visual igual à ordem do DOM: a trilha deve ser lida do topo da hierarquia até a página atual.",
        ]}
      />
    </ComponentPage>
  );
}
