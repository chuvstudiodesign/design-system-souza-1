"use client";

import { toast } from "sonner";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Button } from "@/components/ui/button";

export default function SonnerPage() {
  return (
    <ComponentPage
      title="Sonner"
      category="Feedback"
      description="Sistema de notificações efêmeras (toasts) do shadcn. O <Toaster /> já está montado em providers.tsx e segue o tema claro/escuro automaticamente."
      install="npx shadcn@latest add sonner"
      importCode={`import { toast } from "sonner"
// O <Toaster /> vive em src/components/providers.tsx`}
    >
      <Demo
        title="Tipos"
        code={`toast("Movimentação registrada")
toast.success("Documento assinado")
toast.info("Nova versão disponível")
toast.warning("Prazo se aproximando")
toast.error("Falha ao salvar")`}
      >
        <Button variant="outline" onClick={() => toast("Movimentação registrada")}>
          Padrão
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Documento assinado com sucesso")}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("Nova versão do contrato disponível")}
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Prazo vence em 48 horas")}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Falha ao salvar a petição")}
        >
          Error
        </Button>
      </Demo>

      <Demo
        title="Com descrição e ação"
        code={`toast("Processo arquivado", {
  description: "1000123-45.2026.8.26.0100",
  action: { label: "Desfazer", onClick: () => restore() },
})`}
      >
        <Button
          variant="outline"
          onClick={() =>
            toast("Processo arquivado", {
              description: "1000123-45.2026.8.26.0100 · 12/03/2026",
              action: {
                label: "Desfazer",
                onClick: () => toast.success("Arquivamento desfeito"),
              },
            })
          }
        >
          Com ação
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Confirmar exclusão?", {
              description: "Esta ação não pode ser desfeita.",
              action: {
                label: "Excluir",
                onClick: () => toast.error("Documento excluído"),
              },
              cancel: { label: "Cancelar", onClick: () => {} },
            })
          }
        >
          Com cancelar
        </Button>
      </Demo>

      <Demo
        title="Promise"
        description="Estados de carregando → sucesso/erro automaticamente."
        code={`toast.promise(salvarPeticao(), {
  loading: "Salvando…",
  success: "Petição salva",
  error: "Não foi possível salvar",
})`}
      >
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(
              new Promise((resolve) => window.setTimeout(resolve, 2000)),
              {
                loading: "Enviando ao tribunal…",
                success: "Protocolo confirmado",
                error: "Falha na comunicação",
              }
            )
          }
        >
          Disparar promise
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(
              new Promise((_, reject) => window.setTimeout(reject, 2000)),
              {
                loading: "Enviando ao tribunal…",
                success: "Protocolo confirmado",
                error: "Falha na comunicação com o tribunal",
              }
            )
          }
        >
          Promise que falha
        </Button>
      </Demo>

      <Demo
        title="Duração e persistência"
        code={`toast("Mensagem rápida", { duration: 1000 })
toast("Fica até fechar", { duration: Infinity })
toast.dismiss()`}
      >
        <Button
          variant="outline"
          onClick={() => toast("Mensagem rápida", { duration: 1000 })}
        >
          1 segundo
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Permanece até ser fechado", {
              duration: Infinity,
              action: { label: "Fechar", onClick: () => toast.dismiss() },
            })
          }
        >
          Persistente
        </Button>
        <Button variant="ghost" onClick={() => toast.dismiss()}>
          Limpar todos
        </Button>
      </Demo>

      <Usage
        title="Configuração global"
        code={`// src/components/providers.tsx
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  )
}`}
      />

      <PropsTable
        title="API — toast()"
        rows={[
          {
            prop: "toast(message, options)",
            type: "function",
            description: "Toast padrão.",
          },
          {
            prop: "toast.success / info / warning / error",
            type: "function",
            description: "Variantes com ícone e cor semântica.",
          },
          {
            prop: "toast.promise(promise, msgs)",
            type: "function",
            description: "Ciclo loading → success → error automático.",
          },
          {
            prop: "toast.custom(jsx)",
            type: "function",
            description: "Renderiza JSX completo dentro do toast.",
          },
          {
            prop: "options.description",
            type: "React.ReactNode",
            description: "Texto secundário.",
          },
          {
            prop: "options.action / options.cancel",
            type: "{ label, onClick }",
            description: "Botões dentro do toast.",
          },
          {
            prop: "options.duration",
            type: "number",
            default: "4000",
            description: "Tempo em ms; use Infinity para persistir.",
          },
          {
            prop: "toast.dismiss(id?)",
            type: "function",
            description: "Fecha um toast específico ou todos.",
          },
        ]}
      />

      <PropsTable
        title="Props — Toaster"
        rows={[
          {
            prop: "position",
            type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
            default: '"bottom-right"',
            description: "Canto onde a pilha aparece.",
          },
          {
            prop: "richColors",
            type: "boolean",
            description: "Cores mais saturadas por tipo de toast.",
          },
          {
            prop: "expand",
            type: "boolean",
            description: "Mostra todos os toasts expandidos por padrão.",
          },
          {
            prop: "closeButton",
            type: "boolean",
            description: "Exibe botão de fechar em cada toast.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "O Sonner usa uma região aria-live: novas mensagens são anunciadas sem roubar o foco.",
          "Toasts com ação podem ser alcançados por teclado (F6 leva o foco para a região de notificações).",
          "Nunca coloque em toast a única informação sobre um erro crítico — ele desaparece; use Alert na página.",
          "Duração padrão de 4s é curta para textos longos: prefira mensagens objetivas ou aumente a duração.",
          "Evite disparar múltiplos toasts em sequência para a mesma ação.",
        ]}
      />
    </ComponentPage>
  );
}
