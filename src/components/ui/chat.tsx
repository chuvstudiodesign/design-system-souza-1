"use client";

import * as React from "react";
import { ArrowUpIcon, PaperclipIcon, SquareIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Marker, MarkerContent } from "@/components/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

/**
 * Chat — composição de IA sobre as primitivas `message`, `bubble`,
 * `message-scroller` e `input-group`. Não existe um item `chat` no registry:
 * na documentação oficial o chat é montado a partir dessas peças, então
 * empacotamos o padrão aqui.
 */

export type ChatRole = "user" | "assistant";

export type ChatMessageData = {
  id: string;
  role: ChatRole;
  content: React.ReactNode;
  timestamp?: string;
  avatar?: React.ReactNode;
};

function Chat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat"
      className={cn(
        "flex h-[32rem] w-full flex-col overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
      {...props}
    />
  );
}

function ChatHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-header"
      className={cn(
        "flex items-center gap-3 border-b border-border px-4 py-3",
        className
      )}
      {...props}
    />
  );
}

/** Área rolável com autoscroll e botão "ir para o fim". */
function ChatMessages({
  className,
  children,
  autoScroll = true,
  ...props
}: React.ComponentProps<"div"> & { autoScroll?: boolean }) {
  return (
    <MessageScrollerProvider autoScroll={autoScroll} defaultScrollPosition="end">
      <MessageScroller
        data-slot="chat-messages"
        className={cn("min-h-0 flex-1", className)}
        {...props}
      >
        <MessageScrollerViewport aria-label="Histórico da conversa">
          <MessageScrollerContent className="gap-4 p-4">
            {children}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="end" />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}

/** Mensagem individual já ligada ao scroller. */
function ChatMessage({
  message,
  className,
}: {
  message: ChatMessageData;
  className?: string;
}) {
  const isUser = message.role === "user";

  return (
    <MessageScrollerItem messageId={message.id} scrollAnchor={isUser}>
      <Message align={isUser ? "end" : "start"} className={className}>
        {message.avatar ? (
          <MessageAvatar>{message.avatar}</MessageAvatar>
        ) : null}
        <MessageContent>
          <Bubble variant={isUser ? "default" : "muted"}>
            <BubbleContent>{message.content}</BubbleContent>
          </Bubble>
          {message.timestamp ? (
            <MessageFooter>{message.timestamp}</MessageFooter>
          ) : null}
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  );
}

/** Separador de contexto ("Hoje", "Nova sessão"…). */
function ChatDivider({ children }: { children: React.ReactNode }) {
  return (
    <Marker variant="separator">
      <MarkerContent>{children}</MarkerContent>
    </Marker>
  );
}

function ChatTypingIndicator({ label = "Digitando" }: { label?: string }) {
  return (
    <Message align="start">
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent className="flex items-center gap-1.5">
            <span className="sr-only">{label}</span>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden
                className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
}

/** Campo de composição com envio por Enter e botão de anexo opcional. */
function ChatComposer({
  value,
  onValueChange,
  onSend,
  onAttach,
  placeholder = "Escreva uma mensagem…",
  disabled = false,
  isStreaming = false,
  onStop,
  className,
}: {
  value: string;
  onValueChange: (value: string) => void;
  onSend: () => void;
  onAttach?: () => void;
  placeholder?: string;
  disabled?: boolean;
  isStreaming?: boolean;
  onStop?: () => void;
  className?: string;
}) {
  return (
    <div
      data-slot="chat-composer"
      className={cn("border-t border-border p-3", className)}
    >
      <InputGroup>
        <InputGroupTextarea
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          aria-label="Mensagem"
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend();
            }
          }}
        />
        <InputGroupAddon align="block-end">
          {onAttach ? (
            <InputGroupButton
              variant="ghost"
              size="icon-sm"
              aria-label="Anexar arquivo"
              onClick={onAttach}
            >
              <PaperclipIcon />
            </InputGroupButton>
          ) : null}
          {isStreaming ? (
            <Button
              size="icon-sm"
              variant="secondary"
              className="ml-auto"
              aria-label="Parar resposta"
              onClick={onStop}
            >
              <SquareIcon />
            </Button>
          ) : (
            <Button
              size="icon-sm"
              className="ml-auto"
              aria-label="Enviar mensagem"
              disabled={disabled || value.trim().length === 0}
              onClick={onSend}
            >
              <ArrowUpIcon />
            </Button>
          )}
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export {
  Chat,
  ChatHeader,
  ChatMessages,
  ChatMessage,
  ChatDivider,
  ChatTypingIndicator,
  ChatComposer,
};
