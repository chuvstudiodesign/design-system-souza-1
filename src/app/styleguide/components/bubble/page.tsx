"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble";

const variants = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const;

export default function BubblePage() {
  return (
    <ComponentPage
      title="Bubble"
      category="New"
      description="Balão de mensagem. Sete variantes de superfície, alinhamento por autor, suporte a conteúdo clicável (asChild) e reações posicionadas na borda."
      install="npx shadcn@latest add bubble"
      importCode={`import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"`}
    >
      <Demo
        title="Variantes"
        contentClassName="flex-col items-stretch"
        code={`<Bubble variant="default"><BubbleContent>…</BubbleContent></Bubble>
<Bubble variant="muted"><BubbleContent>…</BubbleContent></Bubble>
<Bubble variant="tinted"><BubbleContent>…</BubbleContent></Bubble>
<Bubble variant="outline"><BubbleContent>…</BubbleContent></Bubble>`}
      >
        <BubbleGroup className="w-full max-w-lg">
          {variants.map((variant) => (
            <Bubble key={variant} variant={variant}>
              <BubbleContent>
                <span className="font-mono text-xs opacity-70">{variant}</span> —
                Mensagem de exemplo do escritório.
              </BubbleContent>
            </Bubble>
          ))}
        </BubbleGroup>
      </Demo>

      <Demo
        title="Alinhamento"
        contentClassName="flex-col items-stretch"
        code={`<Bubble align="start"><BubbleContent>Recebida</BubbleContent></Bubble>
<Bubble align="end"><BubbleContent>Enviada</BubbleContent></Bubble>`}
      >
        <BubbleGroup className="w-full max-w-lg">
          <Bubble variant="muted" align="start">
            <BubbleContent>
              Recebida — alinhada ao início da conversa.
            </BubbleContent>
          </Bubble>
          <Bubble align="end">
            <BubbleContent>Enviada — alinhada ao fim.</BubbleContent>
          </Bubble>
        </BubbleGroup>
      </Demo>

      <Demo
        title="Com reações"
        contentClassName="flex-col items-stretch"
        code={`<Bubble variant="muted" className="mb-3">
  <BubbleContent>Minuta aprovada pelo cliente.</BubbleContent>
  <BubbleReactions side="bottom" align="end">
    👍 2
  </BubbleReactions>
</Bubble>`}
      >
        <BubbleGroup className="w-full max-w-lg gap-6">
          <Bubble variant="muted">
            <BubbleContent>Minuta aprovada pelo cliente.</BubbleContent>
            <BubbleReactions side="bottom" align="end">
              <span aria-label="2 curtidas">👍 2</span>
            </BubbleReactions>
          </Bubble>
          <Bubble align="end">
            <BubbleContent>Ótimo, vou protocolar hoje.</BubbleContent>
            <BubbleReactions side="bottom" align="start">
              <span aria-label="1 celebração">🎉 1</span>
            </BubbleReactions>
          </Bubble>
        </BubbleGroup>
      </Demo>

      <Demo
        title="Balão clicável"
        description="asChild transforma o conteúdo em botão ou link, com estados de hover e foco."
        contentClassName="flex-col items-stretch"
        code={`<Bubble variant="outline">
  <BubbleContent asChild>
    <button type="button">Ver documento anexado</button>
  </BubbleContent>
</Bubble>`}
      >
        <BubbleGroup className="w-full max-w-lg">
          <Bubble variant="outline">
            <BubbleContent asChild>
              <button type="button">Ver documento anexado (PDF, 240 KB)</button>
            </BubbleContent>
          </Bubble>
          <Bubble variant="tinted" align="end">
            <BubbleContent asChild>
              <a href="/styleguide">Abrir processo 1000123-45</a>
            </BubbleContent>
          </Bubble>
        </BubbleGroup>
      </Demo>

      <Usage
        code={`import { Bubble, BubbleContent } from "@/components/ui/bubble"

export function AssistantBubble({ text }: { text: string }) {
  return (
    <Bubble variant="muted">
      <BubbleContent>{text}</BubbleContent>
    </Bubble>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "Bubble · variant",
            type: '"default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"',
            default: '"default"',
            description:
              "Superfície do balão. tinted deriva automaticamente da cor --primary.",
          },
          {
            prop: "Bubble · align",
            type: '"start" | "end"',
            default: '"start"',
            description:
              "Alinhamento próprio; dentro de um Message, herda o alinhamento da mensagem.",
          },
          {
            prop: "BubbleContent · asChild",
            type: "boolean",
            default: "false",
            description:
              "Renderiza o conteúdo como botão/link, ativando hover e anel de foco.",
          },
          {
            prop: "BubbleReactions · side / align",
            type: '"top" | "bottom" / "start" | "end"',
            default: '"bottom" / "end"',
            description: "Posição das reações sobre a borda do balão.",
          },
          {
            prop: "BubbleGroup",
            type: "div",
            description: "Coluna de balões com espaçamento consistente.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "A cor do balão indica o autor visualmente — leitores de tela precisam do nome do autor em texto.",
          "Balões clicáveis devem usar BubbleContent asChild com <button> ou <a>: o anel de foco já está previsto.",
          "Reações com emoji precisam de aria-label descritivo ('2 curtidas').",
          "A variante destructive comunica erro de envio; combine com texto explicativo.",
          "Largura máxima de 80% mantém a linha de leitura confortável.",
        ]}
      />
    </ComponentPage>
  );
}
