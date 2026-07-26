"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Processo = {
  id: string;
  numero: string;
  cliente: string;
  area: string;
  status: "Ativo" | "Aguardando" | "Arquivado";
  valor: number;
};

const data: Processo[] = [
  { id: "1", numero: "1000123-45", cliente: "Souza & Souza LTDA", area: "Empresarial", status: "Ativo", valor: 45000 },
  { id: "2", numero: "1000987-21", cliente: "Construtora Aurora", area: "Trabalhista", status: "Aguardando", valor: 18500 },
  { id: "3", numero: "1001432-08", cliente: "Maria Souza", area: "Cível", status: "Ativo", valor: 12300 },
  { id: "4", numero: "1002210-77", cliente: "Transportes Vale", area: "Tributário", status: "Arquivado", valor: 76400 },
  { id: "5", numero: "1003001-19", cliente: "Padaria Central", area: "Cível", status: "Ativo", valor: 8200 },
  { id: "6", numero: "1003544-02", cliente: "Tech Nordeste S.A.", area: "Empresarial", status: "Aguardando", valor: 132000 },
  { id: "7", numero: "1004110-63", cliente: "João Pereira", area: "Trabalhista", status: "Arquivado", valor: 22750 },
];

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const columns: ColumnDef<Processo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(value === true)
        }
        aria-label="Selecionar todas as linhas"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(value === true)}
        aria-label={`Selecionar processo ${row.original.numero}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "numero",
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Número"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("numero")}</span>
    ),
  },
  {
    accessorKey: "cliente",
    header: ({ column }) => (
      <DataTableColumnHeader
        title="Cliente"
        sorted={column.getIsSorted()}
        onToggle={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
  },
  { accessorKey: "area", header: "Área" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Processo["status"];
      return (
        <Badge
          variant={status === "Arquivado" ? "secondary" : "outline"}
          className={
            status === "Ativo" ? "bg-success text-success-foreground" : undefined
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "valor",
    header: () => <span className="block text-right">Valor</span>,
    cell: ({ row }) => (
      <span className="block text-right tabular-nums">
        {currency.format(row.getValue("valor"))}
      </span>
    ),
  },
  {
    id: "acoes",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Ações do processo ${row.original.numero}`}
          >
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Abrir</DropdownMenuItem>
          <DropdownMenuItem>Duplicar</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Arquivar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function DataTablePage() {
  return (
    <ComponentPage
      title="Data Table"
      category="Data Display"
      description="Tabela de dados completa sobre @tanstack/react-table: ordenação, filtro por coluna, visibilidade de colunas, seleção de linhas e paginação — composta com os componentes Table, Input, Checkbox e Dropdown Menu."
      install="npm i @tanstack/react-table  # + npx shadcn@latest add table checkbox dropdown-menu input"
      importCode={`import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"`}
    >
      <Demo
        title="Tabela completa"
        description="Filtre por cliente, ordene pelas colunas, oculte colunas e selecione linhas."
        contentClassName="flex-col items-stretch"
        code={`const columns: ColumnDef<Processo>[] = [
  { accessorKey: "numero", header: "Número" },
  { accessorKey: "cliente", header: "Cliente" },
  {
    accessorKey: "valor",
    header: () => <span className="block text-right">Valor</span>,
    cell: ({ row }) => currency.format(row.getValue("valor")),
  },
]

<DataTable
  columns={columns}
  data={data}
  filterColumn="cliente"
  filterPlaceholder="Filtrar por cliente…"
  pageSize={5}
/>`}
      >
        <DataTable
          columns={columns}
          data={data}
          filterColumn="cliente"
          filterPlaceholder="Filtrar por cliente…"
          pageSize={5}
        />
      </Demo>

      <Demo
        title="Sem paginação e sem filtro"
        description="Para conjuntos pequenos, exiba tudo de uma vez."
        contentClassName="flex-col items-stretch"
        code={`<DataTable
  columns={columns}
  data={data.slice(0, 3)}
  enablePagination={false}
  enableColumnVisibility={false}
/>`}
      >
        <DataTable
          columns={columns.filter((column) => column.id !== "select")}
          data={data.slice(0, 3)}
          enablePagination={false}
          enableColumnVisibility={false}
        />
      </Demo>

      <Demo
        title="Estado vazio"
        contentClassName="flex-col items-stretch"
        code={`<DataTable
  columns={columns}
  data={[]}
  emptyMessage="Nenhum processo encontrado."
/>`}
      >
        <DataTable
          columns={columns.filter((column) => column.id !== "select")}
          data={[]}
          enableColumnVisibility={false}
          enablePagination={false}
          emptyMessage="Nenhum processo encontrado com esses critérios."
        />
      </Demo>

      <Usage
        title="Cabeçalho com ordenação"
        code={`{
  accessorKey: "cliente",
  header: ({ column }) => (
    <DataTableColumnHeader
      title="Cliente"
      sorted={column.getIsSorted()}
      onToggle={() => column.toggleSorting(column.getIsSorted() === "asc")}
    />
  ),
}`}
      />

      <PropsTable
        title="Props — DataTable"
        rows={[
          {
            prop: "columns",
            type: "ColumnDef<TData, TValue>[]",
            description: "Definição das colunas do TanStack Table.",
          },
          {
            prop: "data",
            type: "TData[]",
            description: "Linhas a exibir.",
          },
          {
            prop: "filterColumn",
            type: "string",
            description:
              "Id/accessorKey da coluna filtrada pelo campo de busca. Omita para esconder o filtro.",
          },
          {
            prop: "filterPlaceholder",
            type: "string",
            default: '"Filtrar…"',
            description: "Placeholder e aria-label do campo de filtro.",
          },
          {
            prop: "enableColumnVisibility",
            type: "boolean",
            default: "true",
            description: "Exibe o menu de colunas.",
          },
          {
            prop: "enablePagination / pageSize",
            type: "boolean / number",
            default: "true / 5",
            description: "Paginação client-side.",
          },
          {
            prop: "emptyMessage",
            type: "string",
            default: '"Nenhum resultado."',
            description: "Texto exibido quando não há linhas.",
          },
        ]}
      />

      <PropsTable
        title="Helpers"
        rows={[
          {
            prop: "DataTableColumnHeader",
            type: "component",
            description:
              "Botão de cabeçalho com indicador de ordenação (↑ ↓ ↕) e aria-label.",
          },
          {
            prop: "DataTablePagination",
            type: "component",
            description:
              "Controles de página + contagem de linhas selecionadas; exportado para uso avulso.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Percorre filtro, cabeçalhos, checkboxes e paginação." },
          { keys: "Enter / Space", description: "Ordena a coluna ou marca a linha." },
          { keys: "Esc", description: "Fecha o menu de colunas." },
        ]}
      />

      <A11yNotes
        items={[
          "A base é uma <table> semântica — a relação entre cabeçalhos e células é preservada.",
          "Cabeçalhos ordenáveis são botões com aria-label ('Ordenar por Cliente'); o estado é indicado por texto, não só por ícone.",
          "Cada checkbox de linha tem aria-label único identificando o registro.",
          "Anuncie a contagem de resultados após filtrar — o rodapé com 'N registro(s)' cumpre esse papel.",
          "Ações por linha ficam em Dropdown Menu com gatilho rotulado, acessível por teclado.",
        ]}
      />
    </ComponentPage>
  );
}
