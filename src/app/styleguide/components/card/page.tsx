"use client";

import { MoreHorizontalIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardPage() {
  return (
    <ComponentPage
      title="Card"
      category="Layout"
      description="Superfície de conteúdo agrupado. Usa --card, --border e --radius, com slots para cabeçalho, ação, conteúdo e rodapé."
      install="npx shadcn@latest add card"
      importCode={`import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"`}
    >
      <Demo
        title="Estrutura completa"
        contentClassName="flex-col items-stretch"
        code={`<Card>
  <CardHeader>
    <CardTitle>Consultoria empresarial</CardTitle>
    <CardDescription>Assessoria preventiva e contenciosa.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon-sm"><MoreHorizontalIcon /></Button>
    </CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>
    <Button>Saiba mais</Button>
  </CardFooter>
</Card>`}
      >
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Consultoria empresarial</CardTitle>
              <CardDescription>
                Assessoria jurídica preventiva e contenciosa.
              </CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm" aria-label="Mais opções">
                  <MoreHorizontalIcon />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Acompanhamento societário, contratos e compliance, com relatório
              mensal de movimentações.
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Contratar</Button>
              <Button size="sm" variant="ghost">
                Detalhes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Demo>

      <Demo
        title="Card de formulário"
        contentClassName="flex-col items-stretch"
        code={`<Card>
  <CardHeader>
    <CardTitle>Entrar</CardTitle>
  </CardHeader>
  <CardContent>
    <Label htmlFor="email">E-mail</Label>
    <Input id="email" />
  </CardContent>
  <CardFooter>
    <Button className="w-full">Entrar</Button>
  </CardFooter>
</Card>`}
      >
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Acessar o portal</CardTitle>
              <CardDescription>
                Área restrita a clientes e equipe.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="card-email">E-mail</Label>
                <Input id="card-email" type="email" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="card-senha">Senha</Label>
                <Input id="card-senha" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Entrar</Button>
            </CardFooter>
          </Card>
        </div>
      </Demo>

      <Demo
        title="Tamanho compacto e variação institucional"
        contentClassName="flex-col items-stretch"
        code={`<Card size="sm">…</Card>
<Card className="bg-brand-900 text-gold-50 shadow-gold">…</Card>`}
      >
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <Card size="sm">
            <CardHeader>
              <CardTitle>Compacto</CardTitle>
              <CardDescription>size=&quot;sm&quot;</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Espaçamento interno reduzido para listas densas.
            </CardContent>
          </Card>

          <Card className="border-gold-500/40 bg-brand-900 text-gold-50 shadow-gold dark:bg-brand-950">
            <CardHeader>
              <CardTitle className="font-display tracking-[0.06em]">
                Destaque
              </CardTitle>
              <CardDescription className="text-gold-100/70">
                Azul + dourado da identidade.
              </CardDescription>
              <CardAction>
                <Badge className="bg-gold text-gold-foreground">Novo</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="text-sm text-gold-100/80">
              Usado em peças institucionais e chamadas de conversão.
            </CardContent>
          </Card>
        </div>
      </Demo>

      <Usage
        code={`import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-semibold">{value}</CardContent>
    </Card>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "size (Card)",
            type: '"default" | "sm"',
            default: '"default"',
            description:
              "Controla a variável --card-spacing usada por todos os slots.",
          },
          {
            prop: "CardHeader",
            type: "div",
            description: "Grid de título, descrição e ação.",
          },
          {
            prop: "CardAction",
            type: "div",
            description:
              "Posicionado à direita do cabeçalho — botões de ícone ou badges.",
          },
          {
            prop: "CardContent",
            type: "div",
            description: "Corpo principal do card.",
          },
          {
            prop: "CardFooter",
            type: "div",
            description:
              "Rodapé com borda superior e fundo sutil; o padding inferior do card é removido automaticamente.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Card é um <div> sem semântica implícita — se ele representa um item de lista, envolva em <li> ou use role apropriado.",
          "CardTitle não gera heading automaticamente: passe asChild ou use um <h2>/<h3> quando a hierarquia importar.",
          "Cards clicáveis inteiros devem conter um link/botão real focável; não use apenas onClick no container.",
          "Mantenha contraste do texto sobre variações coloridas — a versão institucional usa gold-50/gold-100 sobre brand-900 (>7:1).",
        ]}
      />
    </ComponentPage>
  );
}
