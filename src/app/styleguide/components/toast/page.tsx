"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Button } from "@/components/ui/button";
import { ToastButton, toast } from "@/components/ui/toast";

export default function ToastPage() {
  return (
    <ComponentPage
      title="Toast"
      category="Feedback"
      description="O componente toast legado do shadcn/ui foi descontinuado em favor do Sonner. Este módulo mantém a API familiar — toast({ title, description, variant, action }) — implementada sobre o Sonner."
      install="npx shadcn@latest add sonner  # o toast legado não existe mais no registry"
      importCode={`import { toast, ToastButton } from "@/components/ui/toast"`}
    >
      <Demo
        title="Variantes"
        code={`toast({ title: "Movimentação registrada" })
toast({ title: "Documento assinado", variant: "success" })
toast({ title: "Nova versão", variant: "info" })
toast({ title: "Prazo próximo", variant: "warning" })
toast({ title: "Falha ao salvar", variant: "destructive" })`}
      >
        <Button
          variant="outline"
          onClick={() => toast({ title: "Movimentação registrada" })}
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Documento assinado",
              description: "Todas as partes concluíram a assinatura.",
              variant: "success",
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({ title: "Nova versão do contrato", variant: "info" })
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({ title: "Prazo vence em 48h", variant: "warning" })
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Falha ao salvar",
              description: "Verifique a conexão e tente novamente.",
              variant: "destructive",
            })
          }
        >
          Destructive
        </Button>
      </Demo>

      <Demo
        title="Com ação e duração"
        code={`toast({
  title: "Processo arquivado",
  description: "1000123-45.2026.8.26.0100",
  duration: 8000,
  action: { label: "Desfazer", onClick: () => restore() },
})`}
      >
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Processo arquivado",
              description: "1000123-45.2026.8.26.0100",
              duration: 8000,
              action: {
                label: "Desfazer",
                onClick: () =>
                  toast({ title: "Arquivamento desfeito", variant: "success" }),
              },
            })
          }
        >
          Com ação
        </Button>
        <Button variant="ghost" onClick={() => toast.dismiss()}>
          Limpar todos
        </Button>
      </Demo>

      <Demo
        title="ToastButton"
        description="Atalho para disparar um toast direto de um botão."
        code={`<ToastButton
  variant="outline"
  toast={{ title: "Copiado para a área de transferência" }}
>
  Copiar link
</ToastButton>`}
      >
        <ToastButton
          variant="outline"
          toast={{
            title: "Copiado para a área de transferência",
            variant: "success",
          }}
        >
          Copiar link
        </ToastButton>
        <ToastButton
          toast={{
            title: "Convite enviado",
            description: "maria@souza.adv.br",
          }}
        >
          Enviar convite
        </ToastButton>
      </Demo>

      <Demo
        title="Promise"
        code={`toast.promise(salvar(), {
  loading: "Salvando…",
  success: "Salvo",
  error: "Erro ao salvar",
})`}
      >
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(
              new Promise((resolve) => window.setTimeout(resolve, 1800)),
              {
                loading: "Salvando alterações…",
                success: "Alterações salvas",
                error: "Erro ao salvar",
              }
            )
          }
        >
          Disparar promise
        </Button>
      </Demo>

      <Usage
        code={`import { toast } from "@/components/ui/toast"

export function SaveButton({ onSave }: { onSave: () => Promise<void> }) {
  return (
    <Button
      onClick={async () => {
        try {
          await onSave()
          toast({ title: "Salvo", variant: "success" })
        } catch {
          toast({ title: "Falha ao salvar", variant: "destructive" })
        }
      }}
    >
      Salvar
    </Button>
  )
}`}
      />

      <PropsTable
        title="API — toast(options)"
        rows={[
          {
            prop: "title",
            type: "React.ReactNode",
            description: "Mensagem principal (obrigatória).",
          },
          {
            prop: "description",
            type: "React.ReactNode",
            description: "Texto secundário.",
          },
          {
            prop: "variant",
            type: '"default" | "success" | "info" | "warning" | "destructive"',
            default: '"default"',
            description: "Mapeia para o tipo correspondente do Sonner.",
          },
          {
            prop: "duration",
            type: "number",
            default: "4000",
            description: "Tempo de exibição em ms.",
          },
          {
            prop: "action / cancel",
            type: "{ label: string; onClick: (event) => void }",
            description: "Botões dentro do toast.",
          },
          {
            prop: "id",
            type: "string | number",
            description: "Permite atualizar ou remover um toast específico.",
          },
          {
            prop: "toast.promise / toast.dismiss / toast.custom",
            type: "function",
            description: "Reexportados diretamente do Sonner.",
          },
        ]}
      />

      <PropsTable
        title="Componente"
        rows={[
          {
            prop: "ToastButton · toast",
            type: "ToastOptions",
            description: "Opções disparadas no clique.",
          },
          {
            prop: "ToastButton · ...props",
            type: "React.ComponentProps<typeof Button>",
            description: "Todas as props do Button (variant, size, disabled…).",
          },
        ]}
      />

      <A11yNotes
        items={[
          "A pilha de toasts é uma região aria-live: o conteúdo é anunciado sem roubar o foco.",
          "Ações dentro do toast são alcançáveis por teclado (F6 move o foco para a região).",
          "Erros que exigem correção devem aparecer também na página (Alert), não só no toast.",
          "Mantenha o texto curto — 4 segundos é pouco para mensagens longas.",
          "Migração: o toast legado (useToast + <Toast>) foi removido do registry; esta API cobre o mesmo caso de uso sobre o Sonner.",
        ]}
      />
    </ComponentPage>
  );
}
