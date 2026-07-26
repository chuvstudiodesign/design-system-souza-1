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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Chat,
  ChatComposer,
  ChatDivider,
  ChatHeader,
  ChatMessage,
  ChatMessages,
  ChatTypingIndicator,
  type ChatMessageData,
} from "@/components/ui/chat";
import { BrandSymbol } from "@/components/brand/logo";

const initialMessages: ChatMessageData[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Olá! Sou o assistente do escritório Souza & Souza. Posso consultar andamentos, prazos e documentos dos seus processos.",
    timestamp: "09:00",
    avatar: (
      <Avatar size="sm">
        <AvatarFallback>SS</AvatarFallback>
      </Avatar>
    ),
  },
  {
    id: "2",
    role: "user",
    content: "Qual o próximo prazo do processo 1000123-45?",
    timestamp: "09:01",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "O próximo prazo é a réplica, com vencimento em 15/04/2026. A contestação foi apresentada em 02/04.",
    timestamp: "09:01",
    avatar: (
      <Avatar size="sm">
        <AvatarFallback>SS</AvatarFallback>
      </Avatar>
    ),
  },
];

export default function ChatPage() {
  const [messages, setMessages] =
    React.useState<ChatMessageData[]>(initialMessages);
  const [value, setValue] = React.useState("");
  const [isStreaming, setIsStreaming] = React.useState(false);

  function send() {
    const text = value.trim();
    if (!text) return;

    const userMessage: ChatMessageData = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((current) => [...current, userMessage]);
    setValue("");
    setIsStreaming(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content:
            "Consultei o sistema: nenhuma movimentação nova desde a última atualização. Posso avisar por e-mail quando houver.",
          timestamp: new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          avatar: (
            <Avatar size="sm">
              <AvatarFallback>SS</AvatarFallback>
            </Avatar>
          ),
        },
      ]);
      setIsStreaming(false);
    }, 1600);
  }

  return (
    <ComponentPage
      title="Chat"
      category="AI"
      description="Interface de conversa completa, composta a partir das primitivas Message, Bubble, Message Scroller e Input Group. Não existe um item 'chat' no registry — na documentação oficial ele é montado com essas peças, e aqui o padrão está empacotado."
      install="npx shadcn@latest add message bubble message-scroller input-group avatar"
      importCode={`import {
  Chat,
  ChatComposer,
  ChatDivider,
  ChatHeader,
  ChatMessage,
  ChatMessages,
  ChatTypingIndicator,
} from "@/components/ui/chat"`}
    >
      <Demo
        title="Chat funcional"
        description="Digite e pressione Enter (Shift+Enter quebra a linha). A resposta simulada chega em ~1,6s."
        contentClassName="flex-col items-stretch p-0"
        code={`const [messages, setMessages] = React.useState<ChatMessageData[]>([])
const [value, setValue] = React.useState("")

<Chat>
  <ChatHeader>…</ChatHeader>
  <ChatMessages>
    <ChatDivider>Hoje</ChatDivider>
    {messages.map((message) => (
      <ChatMessage key={message.id} message={message} />
    ))}
    {isStreaming ? <ChatTypingIndicator /> : null}
  </ChatMessages>
  <ChatComposer
    value={value}
    onValueChange={setValue}
    onSend={send}
    isStreaming={isStreaming}
    onStop={() => setIsStreaming(false)}
  />
</Chat>`}
      >
        <Chat className="w-full">
          <ChatHeader>
            <BrandSymbol size={24} />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium">Assistente Souza</span>
              <span className="text-xs text-muted-foreground">
                Consulta de processos e prazos
              </span>
            </div>
            <Badge variant="secondary" className="ml-auto">
              Beta
            </Badge>
          </ChatHeader>

          <ChatMessages>
            <ChatDivider>Hoje</ChatDivider>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isStreaming ? <ChatTypingIndicator /> : null}
          </ChatMessages>

          <ChatComposer
            value={value}
            onValueChange={setValue}
            onSend={send}
            onAttach={() => undefined}
            isStreaming={isStreaming}
            onStop={() => setIsStreaming(false)}
          />
        </Chat>
      </Demo>

      <Demo
        title="Indicador de digitação"
        contentClassName="flex-col items-stretch"
        code={`{isLoading ? <ChatTypingIndicator label="Digitando" /> : null}`}
      >
        <div className="w-full max-w-md rounded-lg border border-border p-4">
          <ChatTypingIndicator />
        </div>
      </Demo>

      <Usage
        title="Integração com a AI SDK"
        code={`"use client"

import { useChat } from "@ai-sdk/react"
import { Chat, ChatComposer, ChatMessage, ChatMessages } from "@/components/ui/chat"

export function AssistantChat() {
  const { messages, input, setInput, handleSubmit, status } = useChat()

  return (
    <Chat>
      <ChatMessages>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={{
              id: message.id,
              role: message.role === "user" ? "user" : "assistant",
              content: message.content,
            }}
          />
        ))}
      </ChatMessages>
      <ChatComposer
        value={input}
        onValueChange={setInput}
        onSend={() => handleSubmit()}
        isStreaming={status === "streaming"}
      />
    </Chat>
  )
}`}
      />

      <PropsTable
        title="Componentes"
        rows={[
          {
            prop: "Chat",
            type: "div",
            description:
              "Container com altura fixa, borda e overflow controlado.",
          },
          {
            prop: "ChatHeader",
            type: "div",
            description: "Cabeçalho com identificação do assistente e ações.",
          },
          {
            prop: "ChatMessages · autoScroll",
            type: "boolean",
            default: "true",
            description:
              "Envolve o MessageScroller com autoscroll e botão de retorno.",
          },
          {
            prop: "ChatMessage · message",
            type: "ChatMessageData",
            description:
              "{ id, role: 'user' | 'assistant', content, timestamp?, avatar? }.",
          },
          {
            prop: "ChatDivider",
            type: "component",
            description: "Marcador de contexto entre blocos ('Hoje', 'Nova sessão').",
          },
          {
            prop: "ChatTypingIndicator · label",
            type: "string",
            default: '"Digitando"',
            description: "Texto anunciado a leitores de tela.",
          },
        ]}
      />

      <PropsTable
        title="Props — ChatComposer"
        rows={[
          {
            prop: "value / onValueChange",
            type: "string / (value: string) => void",
            description: "Campo controlado da mensagem.",
          },
          {
            prop: "onSend",
            type: "() => void",
            description: "Disparado no botão e no Enter (sem Shift).",
          },
          {
            prop: "onAttach",
            type: "() => void",
            description: "Exibe o botão de anexo quando fornecido.",
          },
          {
            prop: "isStreaming / onStop",
            type: "boolean / () => void",
            description:
              "Durante o streaming, o botão de envio vira botão de parar.",
          },
          {
            prop: "disabled / placeholder",
            type: "boolean / string",
            description: "Estado e texto de apoio do campo.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Enter", description: "Envia a mensagem." },
          { keys: "Shift + Enter", description: "Quebra de linha." },
          { keys: "Tab", description: "Alterna entre campo, anexo e envio." },
          {
            keys: "↑ / ↓ / Page Up / Page Down",
            description: "Rola o histórico quando o viewport está focado.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "O viewport da conversa tem aria-label; para anunciar respostas que chegam, envolva a lista em aria-live='polite'.",
          "O alinhamento visual não identifica o autor para leitores de tela — inclua o papel no texto ou em sr-only.",
          "O indicador de digitação tem rótulo textual em sr-only; os pontos animados são aria-hidden.",
          "O botão de envio fica desabilitado com o campo vazio e é substituído por 'Parar resposta' durante o streaming.",
          "Respostas de IA devem vir acompanhadas de aviso de verificação quando afetarem decisões jurídicas.",
        ]}
      />
    </ComponentPage>
  );
}
