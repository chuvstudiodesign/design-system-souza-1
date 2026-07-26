"use client";

import * as React from "react";
import {
  FileTextIcon,
  ImageIcon,
  PaperclipIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";
import { Spinner } from "@/components/ui/spinner";

export default function AttachmentPage() {
  const [files, setFiles] = React.useState([
    { id: "1", name: "peticao-inicial.pdf", size: "240 KB" },
    { id: "2", name: "procuracao.pdf", size: "96 KB" },
    { id: "3", name: "contrato-social.pdf", size: "1,2 MB" },
  ]);

  return (
    <ComponentPage
      title="Attachment"
      category="New"
      description="Cartão de arquivo anexado, com estados de upload, orientação horizontal ou vertical, ações rápidas e agrupamento com rolagem horizontal."
      install="npx shadcn@latest add attachment"
      importCode={`import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"`}
    >
      <Demo
        title="Estados"
        contentClassName="flex-col items-stretch"
        code={`<Attachment state="uploading">…</Attachment>
<Attachment state="processing">…</Attachment>
<Attachment state="done">…</Attachment>
<Attachment state="error">…</Attachment>
<Attachment state="idle">…</Attachment>`}
      >
        <div className="flex w-full flex-col gap-3">
          <Attachment state="uploading">
            <AttachmentMedia>
              <Spinner />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>enviando-contrato.pdf</AttachmentTitle>
              <AttachmentDescription>Enviando… 62%</AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment state="processing">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>ocr-documento.pdf</AttachmentTitle>
              <AttachmentDescription>Processando texto…</AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment state="done">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>peticao-inicial.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 240 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remover anexo">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>

          <Attachment state="error">
            <AttachmentMedia>
              <TriangleAlertIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>anexo-corrompido.pdf</AttachmentTitle>
              <AttachmentDescription>
                Falha no upload — tente novamente
              </AttachmentDescription>
            </AttachmentContent>
          </Attachment>

          <Attachment state="idle">
            <AttachmentMedia>
              <PaperclipIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Adicionar documento</AttachmentTitle>
              <AttachmentDescription>PDF, DOCX até 20 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentTrigger aria-label="Adicionar documento" />
          </Attachment>
        </div>
      </Demo>

      <Demo
        title="Tamanhos"
        contentClassName="flex-col items-stretch"
        code={`<Attachment size="xs">…</Attachment>
<Attachment size="sm">…</Attachment>
<Attachment size="default">…</Attachment>`}
      >
        <div className="flex w-full flex-col gap-3">
          {(["xs", "sm", "default"] as const).map((size) => (
            <Attachment key={size} size={size}>
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>procuracao.pdf</AttachmentTitle>
                <AttachmentDescription>size = {size}</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          ))}
        </div>
      </Demo>

      <Demo
        title="Orientação vertical"
        description="Cartões em coluna, no formato de miniatura."
        contentClassName="flex-col items-stretch"
        code={`<Attachment orientation="vertical">
  <AttachmentMedia variant="image">
    <img src="…" alt="" />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>foto-audiencia.jpg</AttachmentTitle>
  </AttachmentContent>
</Attachment>`}
      >
        <div className="flex flex-wrap gap-3">
          {["planta-baixa.jpg", "assinatura.png", "certidao.jpg"].map((name) => (
            <Attachment key={name} orientation="vertical">
              <AttachmentMedia>
                <ImageIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{name}</AttachmentTitle>
                <AttachmentDescription>JPG</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label={`Remover ${name}`}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          ))}
        </div>
      </Demo>

      <Demo
        title="Grupo com rolagem"
        description="AttachmentGroup rola horizontalmente com snap, sem quebrar o layout."
        contentClassName="flex-col items-stretch"
        code={`<AttachmentGroup>
  {files.map((file) => (
    <Attachment key={file.id}>…</Attachment>
  ))}
</AttachmentGroup>`}
      >
        <AttachmentGroup className="w-full">
          {files.map((file) => (
            <Attachment key={file.id} size="sm">
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{file.name}</AttachmentTitle>
                <AttachmentDescription>{file.size}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction
                  aria-label={`Remover ${file.name}`}
                  onClick={() =>
                    setFiles((current) =>
                      current.filter((item) => item.id !== file.id)
                    )
                  }
                >
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          ))}
          {files.length === 0 ? (
            <span className="text-sm text-muted-foreground">
              Nenhum anexo restante.
            </span>
          ) : null}
        </AttachmentGroup>
      </Demo>

      <Usage
        code={`import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

export function FileCard({ file }: { file: { name: string; size: string; state: "uploading" | "done" | "error" } }) {
  return (
    <Attachment state={file.state}>
      <AttachmentMedia><FileTextIcon /></AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{file.name}</AttachmentTitle>
        <AttachmentDescription>{file.size}</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "Attachment · state",
            type: '"idle" | "uploading" | "processing" | "error" | "done"',
            default: '"done"',
            description:
              "Controla borda, opacidade e o efeito shimmer no título.",
          },
          {
            prop: "Attachment · size",
            type: '"xs" | "sm" | "default"',
            default: '"default"',
            description: "Escala do cartão e da miniatura.",
          },
          {
            prop: "Attachment · orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Linha compacta ou miniatura em coluna.",
          },
          {
            prop: "AttachmentMedia · variant",
            type: '"icon" | "image"',
            default: '"icon"',
            description:
              "image ajusta o preenchimento para <img> em proporção quadrada.",
          },
          {
            prop: "AttachmentAction",
            type: "Button",
            description:
              "Botão de ícone (ghost, icon-xs) para remover, baixar ou repetir o upload.",
          },
          {
            prop: "AttachmentTrigger",
            type: "button",
            description:
              "Área clicável que cobre todo o cartão — exige aria-label.",
          },
          {
            prop: "AttachmentGroup",
            type: "div",
            description: "Faixa horizontal rolável com snap.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Toda AttachmentAction precisa de aria-label incluindo o nome do arquivo ('Remover procuracao.pdf').",
          "Estados de upload devem ser comunicados também em texto (AttachmentDescription), não só pela animação.",
          "Erros precisam explicar a causa e o próximo passo — 'Falha no upload, tente novamente'.",
          "Quando usar AttachmentTrigger, garanta que ele seja o único elemento focável do cartão para não duplicar a tabulação.",
          "AttachmentGroup mantém a rolagem por teclado; não remova o foco do container.",
        ]}
      />
    </ComponentPage>
  );
}
