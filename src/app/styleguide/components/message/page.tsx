"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";

export default function MessagePage() {
  return (
    <ComponentPage
      title="Message"
      category="New"
      description="Estrutura de uma mensagem em conversas: alinhamento por autor, avatar, cabeçalho, conteúdo e rodapé. É a moldura — o balão visual vem do Bubble."
      install="npx shadcn@latest add message"
      importCode={`import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"`}
    >
      <Demo
        title="Conversa básica"
        contentClassName="flex-col items-stretch"
        code={`<MessageGroup>
  <Message align="start">
    <MessageAvatar>
      <Avatar size="sm"><AvatarFallback>SS</AvatarFallback></Avatar>
    </MessageAvatar>
    <MessageContent>
      <Bubble variant="muted">
        <BubbleContent>Bom dia! Como posso ajudar?</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>

  <Message align="end">
    <MessageContent>
      <Bubble>
        <BubbleContent>Preciso do andamento do processo.</BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
</MessageGroup>`}
      >
        <MessageGroup className="w-full max-w-lg">
          <Message align="start">
            <MessageAvatar>
              <Avatar size="sm">
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  Bom dia! Como posso ajudar com o seu caso hoje?
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          <Message align="end">
            <MessageContent>
              <Bubble>
                <BubbleContent>
                  Preciso do andamento do processo 1000123-45.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          <Message align="start">
            <MessageAvatar>
              <Avatar size="sm">
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  A contestação foi apresentada em 02/04. O próximo prazo é a
                  réplica, em 15/04.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
      </Demo>

      <Demo
        title="Com cabeçalho e rodapé"
        contentClassName="flex-col items-stretch"
        code={`<Message align="start">
  <MessageAvatar>…</MessageAvatar>
  <MessageContent>
    <MessageHeader>Maria Souza · Sócia</MessageHeader>
    <Bubble variant="muted">
      <BubbleContent>…</BubbleContent>
    </Bubble>
    <MessageFooter>14:32 · lida</MessageFooter>
  </MessageContent>
</Message>`}
      >
        <MessageGroup className="w-full max-w-lg">
          <Message align="start">
            <MessageAvatar>
              <Avatar size="sm">
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <MessageHeader>Maria Souza · Sócia</MessageHeader>
              <Bubble variant="muted">
                <BubbleContent>
                  Anexei a minuta revisada para sua leitura.
                </BubbleContent>
              </Bubble>
              <MessageFooter>14:32</MessageFooter>
            </MessageContent>
          </Message>

          <Message align="end">
            <MessageContent>
              <Bubble>
                <BubbleContent>Perfeito, vou revisar hoje.</BubbleContent>
              </Bubble>
              <MessageFooter>14:35 · lida</MessageFooter>
            </MessageContent>
          </Message>
        </MessageGroup>
      </Demo>

      <Demo
        title="Mensagens sequenciais"
        description="Sem repetir o avatar quando o mesmo autor envia várias mensagens."
        contentClassName="flex-col items-stretch"
        code={`<MessageGroup>
  <Message align="end">
    <MessageContent>
      <Bubble><BubbleContent>Primeira</BubbleContent></Bubble>
      <Bubble><BubbleContent>Segunda</BubbleContent></Bubble>
    </MessageContent>
  </Message>
</MessageGroup>`}
      >
        <MessageGroup className="w-full max-w-lg">
          <Message align="end">
            <MessageContent>
              <Bubble>
                <BubbleContent>Bom dia!</BubbleContent>
              </Bubble>
              <Bubble>
                <BubbleContent>
                  Consegue confirmar a audiência de quinta?
                </BubbleContent>
              </Bubble>
              <Bubble>
                <BubbleContent>É presencial ou por vídeo?</BubbleContent>
              </Bubble>
              <MessageFooter>09:12</MessageFooter>
            </MessageContent>
          </Message>
        </MessageGroup>
      </Demo>

      <Usage
        code={`import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import { Bubble, BubbleContent } from "@/components/ui/bubble"

export function ChatMessage({ message }: { message: { role: string; text: string } }) {
  const isUser = message.role === "user"

  return (
    <Message align={isUser ? "end" : "start"}>
      {!isUser ? <MessageAvatar><Avatar /></MessageAvatar> : null}
      <MessageContent>
        <Bubble variant={isUser ? "default" : "muted"}>
          <BubbleContent>{message.text}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "Message · align",
            type: '"start" | "end"',
            default: '"start"',
            description:
              "end inverte a direção da linha — use para as mensagens do próprio usuário.",
          },
          {
            prop: "MessageGroup",
            type: "div",
            description: "Empilha mensagens com espaçamento consistente.",
          },
          {
            prop: "MessageAvatar",
            type: "div",
            description:
              "Avatar alinhado à base da mensagem; sobe automaticamente quando há rodapé.",
          },
          {
            prop: "MessageContent",
            type: "div",
            description:
              "Coluna com balões, cabeçalho e rodapé; alinha à direita quando align='end'.",
          },
          {
            prop: "MessageHeader / MessageFooter",
            type: "div",
            description:
              "Metadados: autor, horário, status de leitura, ações rápidas.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Message é apenas estrutura visual: a região da conversa deve ter role='log' ou aria-live='polite' no container que recebe novas mensagens.",
          "O alinhamento à direita não é percebido por leitores de tela — sempre identifique o autor em texto (MessageHeader ou sr-only).",
          "Horários devem usar <time dateTime> quando forem relevantes.",
          "Avatares decorativos podem usar alt vazio, desde que o nome do autor esteja no texto.",
        ]}
      />
    </ComponentPage>
  );
}
