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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <ComponentPage
      title="Dialog"
      category="Overlay"
      description="Janela modal sobre a página. Prende o foco, bloqueia a rolagem de fundo e fecha com Esc ou clique no overlay — para confirmações críticas use Alert Dialog."
      install="npx shadcn@latest add dialog"
      importCode={`import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"`}
    >
      <Demo
        title="Formulário em modal"
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Editar perfil</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogDescription>Atualize seus dados.</DialogDescription>
    </DialogHeader>
    …
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
      <Button type="submit">Salvar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Editar perfil</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar perfil</DialogTitle>
              <DialogDescription>
                Atualize seus dados de contato. As alterações são aplicadas
                imediatamente.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="dialog-nome">Nome</Label>
                <Input id="dialog-nome" defaultValue="Maria Souza" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="dialog-oab">OAB</Label>
                <Input id="dialog-oab" defaultValue="SP 123.456" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button>Salvar alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Demo>

      <Demo
        title="Controlado"
        code={`const [open, setOpen] = React.useState(false)

<Dialog open={open} onOpenChange={setOpen}>…</Dialog>`}
      >
        <Button onClick={() => setOpen(true)}>Abrir por estado</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Diálogo controlado</DialogTitle>
              <DialogDescription>
                O estado vive fora do componente — útil para abrir após uma
                resposta do servidor.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Entendi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <span className="font-mono text-xs text-muted-foreground">
          open: {String(open)}
        </span>
      </Demo>

      <Demo
        title="Tamanhos e conteúdo longo"
        code={`<DialogContent className="sm:max-w-2xl">…</DialogContent>
<DialogContent className="max-h-[80vh] overflow-y-auto">…</DialogContent>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Diálogo largo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Termos de prestação de serviços</DialogTitle>
              <DialogDescription>
                Documento completo do contrato padrão.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[50vh] overflow-y-auto text-sm text-muted-foreground">
              {Array.from({ length: 8 }, (_, index) => (
                <p key={index} className="mb-3">
                  Cláusula {index + 1} — As partes acordam que os serviços
                  jurídicos serão prestados conforme o escopo definido na
                  proposta anexa, observadas as normas do Código de Ética e
                  Disciplina da OAB.
                </p>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Fechar</Button>
              </DialogClose>
              <Button>Aceitar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Demo>

      <Usage
        code={`import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function NewCaseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Novo processo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo processo</DialogTitle>
        </DialogHeader>
        <NewCaseForm />
      </DialogContent>
    </Dialog>
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
            prop: "modal",
            type: "boolean",
            default: "true",
            description:
              "Quando false, o conteúdo de fundo continua interativo e a rolagem não é bloqueada.",
          },
          {
            prop: "showCloseButton (DialogContent)",
            type: "boolean",
            default: "true",
            description: "Exibe o X no canto superior direito.",
          },
          {
            prop: "onInteractOutside / onEscapeKeyDown",
            type: "(event) => void",
            description:
              "Chame event.preventDefault() para impedir o fechamento (ex.: formulário sujo).",
          },
          {
            prop: "DialogTitle / DialogDescription",
            type: "h2 / p",
            description:
              "Rótulos acessíveis do diálogo — use sr-only se não forem visíveis.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Enter / Space", description: "Abre pelo gatilho." },
          { keys: "Tab / Shift+Tab", description: "Circula o foco dentro do diálogo." },
          { keys: "Esc", description: "Fecha e devolve o foco ao gatilho." },
        ]}
      />

      <A11yNotes
        items={[
          "role=dialog com aria-modal: o restante da página fica inerte para leitores de tela.",
          "DialogTitle é obrigatório — sem ele o Radix emite aviso e o diálogo fica sem rótulo.",
          "O foco entra no diálogo ao abrir e retorna ao gatilho ao fechar.",
          "Evite abrir diálogos dentro de diálogos; prefira etapas dentro do mesmo modal.",
          "Se houver dados não salvos, intercepte onInteractOutside para confirmar o descarte.",
        ]}
      />
    </ComponentPage>
  );
}
