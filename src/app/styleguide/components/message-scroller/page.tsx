"use client";

import * as React from "react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { Message, MessageContent } from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

type Msg = { id: string; role: "user" | "assistant"; text: string };

const initial: Msg[] = Array.from({ length: 14 }, (_, index) => ({
  id: `m-${index}`,
  role: index % 2 === 0 ? "assistant" : "user",
  text:
    index % 2 === 0
      ? `Resposta ${index / 2 + 1}: o andamento do processo foi atualizado com a juntada da petição.`
      : `Pergunta ${Math.ceil(index / 2)}: qual é o próximo prazo?`,
}));

export default function MessageScrollerPage() {
  const [messages, setMessages] = React.useState(initial);

  return (
    <ComponentPage
      title="Message Scroller"
      category="New"
      description="Viewport de conversa com autoscroll inteligente: acompanha as mensagens novas quando você está no fim, preserva a posição quando você rolou para cima e oferece um botão de retorno."
      install="npx shadcn@latest add message-scroller"
      importCode={`import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "@/components/ui/message-scroller"`}
    >
      <Demo
        title="Conversa com autoscroll"
        description="Role para cima e clique em Adicionar mensagem: o botão de retorno aparece e a posição é preservada."
        contentClassName="flex-col items-stretch p-0"
        code={`<MessageScrollerProvider autoScroll defaultScrollPosition="end">
  <MessageScroller className="h-80">
    <MessageScrollerViewport aria-label="Histórico da conversa">
      <MessageScrollerContent className="p-4">
        {messages.map((m) => (
          <MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role === "user"}>
            <Message align={m.role === "user" ? "end" : "start"}>
              <MessageContent>
                <Bubble variant={m.role === "user" ? "default" : "muted"}>
                  <BubbleContent>{m.text}</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton direction="end" />
  </MessageScroller>
</MessageScrollerProvider>`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="text-sm font-medium">Atendimento</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setMessages((current) => [
                  ...current,
                  {
                    id: `m-${current.length}`,
                    role: current.length % 2 === 0 ? "assistant" : "user",
                    text: `Nova mensagem ${current.length + 1} adicionada ao final da conversa.`,
                  },
                ])
              }
            >
              Adicionar mensagem
            </Button>
          </div>

          <MessageScrollerProvider autoScroll defaultScrollPosition="end">
            <MessageScroller className="h-80">
              <MessageScrollerViewport aria-label="Histórico da conversa">
                <MessageScrollerContent className="gap-4 p-4">
                  <Marker variant="separator">
                    <MarkerContent>Hoje</MarkerContent>
                  </Marker>
                  {messages.map((message) => (
                    <MessageScrollerItem
                      key={message.id}
                      messageId={message.id}
                      scrollAnchor={message.role === "user"}
                    >
                      <Message
                        align={message.role === "user" ? "end" : "start"}
                      >
                        <MessageContent>
                          <Bubble
                            variant={
                              message.role === "user" ? "default" : "muted"
                            }
                          >
                            <BubbleContent>{message.text}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton direction="end" />
            </MessageScroller>
          </MessageScrollerProvider>
        </div>
      </Demo>

      <Usage
        title="Controle programático"
        description="O hook useMessageScroller expõe métodos imperativos de rolagem."
        code={`import { useMessageScroller } from "@/components/ui/message-scroller"

function ScrollControls() {
  const { scrollToEnd, scrollToStart, scrollToMessage } = useMessageScroller()

  return (
    <>
      <Button onClick={() => scrollToEnd({ behavior: "smooth" })}>Ir ao fim</Button>
      <Button onClick={() => scrollToStart()}>Ir ao início</Button>
      <Button onClick={() => scrollToMessage("m-3", { align: "center" })}>
        Ir à mensagem
      </Button>
    </>
  )
}

// precisa estar dentro de <MessageScrollerProvider>`}
      />

      <PropsTable
        title="Props — MessageScrollerProvider"
        rows={[
          {
            prop: "autoScroll",
            type: "boolean",
            description:
              "Segue as mensagens novas enquanto o usuário estiver no fim da lista.",
          },
          {
            prop: "defaultScrollPosition",
            type: '"start" | "end" | "last-anchor"',
            description:
              "Posição inicial ao montar — last-anchor volta à última mensagem âncora.",
          },
          {
            prop: "scrollEdgeThreshold",
            type: "number",
            description:
              "Distância (px) do fim para considerar que o usuário está 'no fim'.",
          },
          {
            prop: "scrollPreviousItemPeek / scrollMargin",
            type: "number",
            description: "Ajuste fino do enquadramento ao rolar até um item.",
          },
        ]}
      />

      <PropsTable
        title="Props — partes"
        rows={[
          {
            prop: "MessageScrollerViewport · preserveScrollOnPrepend",
            type: "boolean",
            description:
              "Mantém a posição ao carregar mensagens antigas no topo (scroll infinito reverso).",
          },
          {
            prop: "MessageScrollerItem · messageId",
            type: "string",
            description: "Identificador usado por scrollToMessage e pela visibilidade.",
          },
          {
            prop: "MessageScrollerItem · scrollAnchor",
            type: "boolean",
            default: "false",
            description:
              "Marca a mensagem como âncora — normalmente as do próprio usuário.",
          },
          {
            prop: "MessageScrollerButton · direction",
            type: '"start" | "end"',
            default: '"end"',
            description:
              "Botão flutuante que aparece quando há conteúdo fora da vista.",
          },
          {
            prop: "useMessageScrollerScrollable() / useMessageScrollerVisibility()",
            type: "hooks",
            description:
              "Estado de rolagem disponível e itens visíveis no momento.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Dê aria-label ao Viewport descrevendo a região ('Histórico da conversa').",
          "Para anunciar mensagens que chegam, envolva o conteúdo em uma região aria-live='polite' — evite 'assertive', que interrompe o usuário.",
          "O autoscroll respeita a intenção do usuário: se ele rolou para cima, a lista não pula sozinha.",
          "O botão de retorno é focável e possui texto em sr-only.",
          "O viewport mantém rolagem por teclado (setas, Page Up/Down, Home/End).",
        ]}
      />
    </ComponentPage>
  );
}
