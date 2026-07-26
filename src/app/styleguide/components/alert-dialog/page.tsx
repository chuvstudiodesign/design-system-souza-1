"use client";

import * as React from "react";
import { TriangleAlertIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function AlertDialogPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <ComponentPage
      title="Alert Dialog"
      category="Overlay"
      description="Diálogo modal que interrompe o fluxo para confirmar uma ação importante ou destrutiva. Não pode ser fechado clicando fora — exige uma escolha explícita."
      install="npx shadcn@latest add alert-dialog"
      importCode={`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`}
    >
      <Demo
        title="Confirmação destrutiva"
        code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Excluir processo</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Excluir este processo?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação não pode ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={onDelete}>Excluir</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Excluir processo</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir este processo?</AlertDialogTitle>
              <AlertDialogDescription>
                Todos os documentos, prazos e anotações vinculados serão
                removidos permanentemente. Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  toast({
                    title: "Processo excluído",
                    variant: "destructive",
                  })
                }
              >
                Excluir definitivamente
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Demo>

      <Demo
        title="Com mídia/ícone"
        code={`<AlertDialogContent>
  <AlertDialogMedia>
    <TriangleAlertIcon />
  </AlertDialogMedia>
  <AlertDialogHeader>…</AlertDialogHeader>
</AlertDialogContent>`}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Encerrar contrato</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogMedia>
              <TriangleAlertIcon />
            </AlertDialogMedia>
            <AlertDialogHeader>
              <AlertDialogTitle>Encerrar o contrato?</AlertDialogTitle>
              <AlertDialogDescription>
                O cliente será notificado e o acesso ao portal será suspenso em
                30 dias.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Voltar</AlertDialogCancel>
              <AlertDialogAction>Encerrar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Demo>

      <Demo
        title="Controlado"
        description="Abra a partir de qualquer lugar — útil após uma ação assíncrona."
        code={`const [open, setOpen] = React.useState(false)

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>…</AlertDialogContent>
</AlertDialog>`}
      >
        <Button variant="outline" onClick={() => setOpen(true)}>
          Abrir confirmação
        </Button>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publicar alterações?</AlertDialogTitle>
              <AlertDialogDescription>
                As mudanças ficarão visíveis para todo o escritório.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  toast({ title: "Alterações publicadas", variant: "success" })
                }
              >
                Publicar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Demo>

      <Usage
        code={`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeleteButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Excluir</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "open / defaultOpen / onOpenChange",
            type: "boolean / (open: boolean) => void",
            description: "Controle da visibilidade.",
          },
          {
            prop: "AlertDialogAction",
            type: "button",
            description:
              "Botão de confirmação — fecha o diálogo automaticamente ao ser acionado.",
          },
          {
            prop: "AlertDialogCancel",
            type: "button",
            description:
              "Botão de cancelamento; recebe o foco inicial ao abrir.",
          },
          {
            prop: "AlertDialogMedia",
            type: "div",
            description: "Área para ícone ou ilustração acima do título.",
          },
          {
            prop: "AlertDialogTitle / AlertDialogDescription",
            type: "h2 / p",
            description:
              "Obrigatórios: são o aria-labelledby e o aria-describedby do diálogo.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab / Shift+Tab", description: "Circula entre Cancelar e Confirmar." },
          { keys: "Enter", description: "Aciona o botão focado." },
          { keys: "Esc", description: "Cancela e fecha o diálogo." },
        ]}
      />

      <A11yNotes
        items={[
          "Usa role=alertdialog: leitores de tela anunciam imediatamente título e descrição.",
          "Clicar no overlay não fecha — a decisão precisa ser explícita (diferente do Dialog).",
          "O foco inicial vai para o botão Cancelar, protegendo contra confirmações acidentais.",
          "Título e descrição são obrigatórios; descreva a consequência real ('não pode ser desfeita').",
          "Use apenas para decisões críticas — excesso de confirmações leva o usuário a ignorá-las.",
        ]}
      />
    </ComponentPage>
  );
}
