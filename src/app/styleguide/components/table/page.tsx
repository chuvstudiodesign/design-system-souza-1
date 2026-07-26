"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const processos = [
  {
    numero: "1000123-45",
    cliente: "Souza & Souza LTDA",
    area: "Empresarial",
    status: "Ativo",
    valor: 45000,
  },
  {
    numero: "1000987-21",
    cliente: "Construtora Aurora",
    area: "Trabalhista",
    status: "Aguardando",
    valor: 18500,
  },
  {
    numero: "1001432-08",
    cliente: "Maria Souza",
    area: "Cível",
    status: "Ativo",
    valor: 12300,
  },
  {
    numero: "1002210-77",
    cliente: "Transportes Vale",
    area: "Tributário",
    status: "Arquivado",
    valor: 76400,
  },
];

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function TablePage() {
  const total = processos.reduce((sum, item) => sum + item.valor, 0);

  return (
    <ComponentPage
      title="Table"
      category="Data Display"
      description="Tabela semântica com estilos do design system. Para ordenação, filtro, seleção e paginação, use o Data Table, que compõe estes mesmos elementos."
      install="npx shadcn@latest add table"
      importCode={`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"`}
    >
      <Demo
        title="Completa"
        contentClassName="flex-col items-stretch"
        code={`<Table>
  <TableCaption>Processos ativos do escritório.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Número</TableHead>
      <TableHead className="text-right">Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>1000123-45</TableCell>
      <TableCell className="text-right">R$ 45.000,00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>…</TableFooter>
</Table>`}
      >
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <Table>
            <TableCaption>
              Processos cadastrados no escritório — março de 2026.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor da causa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processos.map((processo) => (
                <TableRow key={processo.numero}>
                  <TableCell className="font-mono text-xs">
                    {processo.numero}
                  </TableCell>
                  <TableCell className="font-medium">
                    {processo.cliente}
                  </TableCell>
                  <TableCell>{processo.area}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        processo.status === "Arquivado" ? "secondary" : "outline"
                      }
                      className={
                        processo.status === "Ativo"
                          ? "bg-success text-success-foreground"
                          : undefined
                      }
                    >
                      {processo.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {currency.format(processo.valor)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right tabular-nums">
                  {currency.format(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Demo>

      <Demo
        title="Compacta"
        contentClassName="flex-col items-stretch"
        code={`<Table className="text-xs">
  <TableRow className="[&>td]:py-1.5">…</TableRow>
</Table>`}
      >
        <div className="w-full overflow-hidden rounded-xl border border-border">
          <Table className="text-xs">
            <TableHeader>
              <TableRow>
                <TableHead className="py-2">Data</TableHead>
                <TableHead className="py-2">Movimentação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["12/03", "Petição inicial protocolada"],
                ["18/03", "Citação expedida"],
                ["02/04", "Contestação apresentada"],
              ].map(([data, texto]) => (
                <TableRow key={data} className="[&>td]:py-1.5">
                  <TableCell className="font-mono">{data}</TableCell>
                  <TableCell className="text-muted-foreground">{texto}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Demo>

      <Demo
        title="Com rolagem horizontal"
        description="Envolva a tabela em um container com overflow-x-auto quando houver muitas colunas."
        contentClassName="flex-col items-stretch"
        code={`<div className="overflow-x-auto rounded-xl border">
  <Table className="min-w-[720px]">…</Table>
</div>`}
      >
        <div className="w-full overflow-x-auto rounded-xl border border-border">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow>
                {["Número", "Cliente", "Área", "Comarca", "Responsável", "Prazo"].map(
                  (header) => (
                    <TableHead key={header}>{header}</TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-xs">1000123-45</TableCell>
                <TableCell>Souza &amp; Souza LTDA</TableCell>
                <TableCell>Empresarial</TableCell>
                <TableCell>São Paulo</TableCell>
                <TableCell>Maria Souza</TableCell>
                <TableCell>15/04/2026</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Demo>

      <Usage
        code={`import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SimpleTable({ rows }: { rows: { id: string; nome: string }[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">ID</TableHead>
          <TableHead scope="col">Nome</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.nome}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "Table",
            type: "table",
            description: "Elemento <table> com w-full e text-sm.",
          },
          {
            prop: "TableCaption",
            type: "caption",
            description:
              "Legenda da tabela — primeira coisa anunciada por leitores de tela.",
          },
          {
            prop: "TableHeader / TableBody / TableFooter",
            type: "thead / tbody / tfoot",
            description: "Seções semânticas da tabela.",
          },
          {
            prop: "TableHead",
            type: "th",
            description: "Célula de cabeçalho; aceite scope='col' ou 'row'.",
          },
          {
            prop: "TableRow · data-state",
            type: '"selected"',
            description: "Destaca linhas selecionadas (usado pelo Data Table).",
          },
          {
            prop: "TableCell",
            type: "td",
            description: "Célula de dados.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Use marcação real de tabela — nunca simule com divs: leitores de tela dependem da relação linha/coluna.",
          "TableCaption descreve o conteúdo da tabela e deve ser preenchida sempre que o contexto não for óbvio.",
          "Adicione scope='col' nos cabeçalhos de coluna e scope='row' quando a primeira célula identificar a linha.",
          "Valores numéricos devem usar tabular-nums e alinhamento à direita para facilitar a comparação.",
          "Tabelas largas precisam de container com overflow-x-auto — o container deve ser focável para permitir rolagem por teclado.",
        ]}
      />
    </ComponentPage>
  );
}
