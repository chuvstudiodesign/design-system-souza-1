"use client";

import {
  CheckCircle2Icon,
  InfoIcon,
  TriangleAlertIcon,
  XCircleIcon,
} from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AlertPage() {
  return (
    <ComponentPage
      title="Alert"
      category="Feedback"
      description="Mensagem persistente dentro da página, para informações contextuais, avisos e erros. Para feedback efêmero de uma ação, use Sonner/Toast."
      install="npx shadcn@latest add alert"
      importCode={`import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"`}
    >
      <Demo
        title="Padrão e destrutivo"
        contentClassName="flex-col items-stretch"
        code={`<Alert>
  <InfoIcon />
  <AlertTitle>Prazo atualizado</AlertTitle>
  <AlertDescription>O novo prazo foi registrado na agenda.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <XCircleIcon />
  <AlertTitle>Prazo vencido</AlertTitle>
  <AlertDescription>Esta ação exige providência imediata.</AlertDescription>
</Alert>`}
      >
        <div className="flex w-full flex-col gap-3">
          <Alert>
            <InfoIcon />
            <AlertTitle>Prazo processual atualizado</AlertTitle>
            <AlertDescription>
              O novo prazo foi registrado na agenda do caso.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircleIcon />
            <AlertTitle>Prazo vencido</AlertTitle>
            <AlertDescription>
              Esta ação exige providência imediata da equipe responsável.
            </AlertDescription>
          </Alert>
        </div>
      </Demo>

      <Demo
        title="Estados semânticos do projeto"
        description="Extensão com os tokens --success, --warning e --info."
        contentClassName="flex-col items-stretch"
        code={`<Alert className="border-success/40 [&_svg]:text-success">…</Alert>
<Alert className="border-warning/40 [&_svg]:text-warning">…</Alert>
<Alert className="border-info/40 [&_svg]:text-info">…</Alert>`}
      >
        <div className="flex w-full flex-col gap-3">
          <Alert className="border-success/40 [&_svg]:text-success">
            <CheckCircle2Icon />
            <AlertTitle>Documento assinado</AlertTitle>
            <AlertDescription>
              Todas as partes concluíram a assinatura digital.
            </AlertDescription>
          </Alert>
          <Alert className="border-warning/40 [&_svg]:text-warning">
            <TriangleAlertIcon />
            <AlertTitle>Pendência de documentação</AlertTitle>
            <AlertDescription>
              Faltam dois documentos para protocolar a petição.
            </AlertDescription>
          </Alert>
          <Alert className="border-info/40 [&_svg]:text-info">
            <InfoIcon />
            <AlertTitle>Nova versão do contrato</AlertTitle>
            <AlertDescription>
              A minuta foi revisada pelo time tributário.
            </AlertDescription>
          </Alert>
        </div>
      </Demo>

      <Demo
        title="Com ação"
        contentClassName="flex-col items-stretch"
        code={`<Alert>
  <TriangleAlertIcon />
  <AlertTitle>Assinatura pendente</AlertTitle>
  <AlertDescription>Três documentos aguardam sua assinatura.</AlertDescription>
  <AlertAction>
    <Button size="sm" variant="outline">Revisar</Button>
  </AlertAction>
</Alert>`}
      >
        <Alert className="w-full">
          <TriangleAlertIcon />
          <AlertTitle>Assinatura pendente</AlertTitle>
          <AlertDescription>
            Três documentos aguardam sua assinatura digital.
          </AlertDescription>
          <AlertAction>
            <Button size="sm" variant="outline">
              Revisar agora
            </Button>
          </AlertAction>
        </Alert>
      </Demo>

      <Demo
        title="Somente título"
        contentClassName="flex-col items-stretch"
        code={`<Alert>
  <InfoIcon />
  <AlertTitle>Sincronização concluída às 14h32.</AlertTitle>
</Alert>`}
      >
        <Alert className="w-full">
          <InfoIcon />
          <AlertTitle>Sincronização com o tribunal concluída às 14h32.</AlertTitle>
        </Alert>
      </Demo>

      <Usage
        code={`import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function FormError({ message }: { message: string }) {
  return (
    <Alert variant="destructive" role="alert">
      <XCircleIcon />
      <AlertTitle>Não foi possível salvar</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "variant",
            type: '"default" | "destructive"',
            default: '"default"',
            description:
              "Estilo base; outros estados (success/warning/info) são compostos por className com os tokens do projeto.",
          },
          {
            prop: "AlertTitle",
            type: "div",
            description: "Título curto — vai para a primeira linha.",
          },
          {
            prop: "AlertDescription",
            type: "div",
            description: "Texto explicativo.",
          },
          {
            prop: "AlertAction",
            type: "div",
            description: "Área de ação à direita (botão ou link).",
          },
        ]}
      />

      <A11yNotes
        items={[
          "O componente já renderiza role='alert' — leitores de tela anunciam o conteúdo assim que ele aparece.",
          "Para mensagens que surgem dinamicamente, monte o Alert no momento do evento (não deixe oculto no DOM).",
          "Nunca comunique o estado apenas pela cor: mantenha ícone + título textual.",
          "Ícones dentro do Alert são decorativos; o significado vem do texto.",
          "Alertas com muita informação devem apontar para uma página de detalhes, não crescer indefinidamente.",
        ]}
      />
    </ComponentPage>
  );
}
