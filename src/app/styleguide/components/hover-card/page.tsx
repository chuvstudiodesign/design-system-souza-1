"use client";

import { CalendarIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function HoverCardPage() {
  return (
    <ComponentPage
      title="Hover Card"
      category="Overlay"
      description="Prévia de conteúdo exibida ao pairar sobre um link. Complementa a informação — nunca deve conter a única via de acesso a uma ação."
      install="npx shadcn@latest add hover-card"
      importCode={`import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"`}
    >
      <Demo
        title="Prévia de perfil"
        code={`<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@maria.souza</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    …
  </HoverCardContent>
</HoverCard>`}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@maria.souza</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex gap-3">
              <Avatar size="lg">
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-medium">Maria Souza</h4>
                <p className="text-sm text-muted-foreground">
                  Sócia responsável pela área empresarial. OAB/SP 123.456.
                </p>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarIcon className="size-3" /> No escritório desde 2014
                </span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Demo>

      <Demo
        title="Posicionamento e atraso"
        code={`<HoverCard openDelay={100} closeDelay={200}>
  <HoverCardContent side="right" align="start" sideOffset={8}>…</HoverCardContent>
</HoverCard>`}
      >
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <HoverCard key={side} openDelay={100} closeDelay={150}>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="sm" className="capitalize">
                {side}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent side={side} className="w-48 text-sm">
              Conteúdo ancorado em <span className="font-mono">{side}</span>.
            </HoverCardContent>
          </HoverCard>
        ))}
      </Demo>

      <Demo
        title="Prévia de documento"
        code={`<HoverCardTrigger asChild>
  <a href="#" className="underline">Contrato de honorários</a>
</HoverCardTrigger>`}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <a
              href="/styleguide"
              className="text-sm underline underline-offset-4"
            >
              Contrato de honorários — Souza &amp; Souza LTDA
            </a>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Contrato de honorários</span>
              <span className="text-xs text-muted-foreground">
                PDF · 240 KB · atualizado em 12/03/2026
              </span>
              <p className="mt-1 text-sm text-muted-foreground">
                Prestação de serviços jurídicos com honorários mensais e
                cláusula de êxito de 10%.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Demo>

      <Usage
        code={`import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function UserPreview({ user }: { user: User }) {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Link href={\`/equipe/\${user.slug}\`}>{user.name}</Link>
      </HoverCardTrigger>
      <HoverCardContent>{user.bio}</HoverCardContent>
    </HoverCard>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "openDelay",
            type: "number",
            default: "700",
            description: "Tempo (ms) de hover antes de abrir.",
          },
          {
            prop: "closeDelay",
            type: "number",
            default: "300",
            description: "Tempo (ms) antes de fechar ao sair.",
          },
          {
            prop: "open / onOpenChange",
            type: "boolean / (open: boolean) => void",
            description: "Controle externo.",
          },
          {
            prop: "side / align / sideOffset (Content)",
            type: 'string / string / number',
            description: "Posicionamento em relação ao gatilho.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Abre com hover e com foco do teclado — o gatilho precisa ser focável (link ou botão).",
          "Não é anunciado como diálogo: use apenas para conteúdo complementar, nunca essencial.",
          "Nada dentro do hover card deve ser a única forma de executar uma ação — em touch não há hover.",
          "Para conteúdo interativo que precisa receber foco de forma confiável, use Popover.",
          "Textos curtos e objetivos: o cartão fecha assim que o ponteiro sai.",
        ]}
      />
    </ComponentPage>
  );
}
