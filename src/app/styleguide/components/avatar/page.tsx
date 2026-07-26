"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export default function AvatarPage() {
  return (
    <ComponentPage
      title="Avatar"
      category="Data Display"
      description="Imagem de perfil com fallback automático por iniciais, três tamanhos, indicador de status e agrupamento com contador."
      install="npx shadcn@latest add avatar"
      importCode={`import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"`}
    >
      <Demo
        title="Imagem e fallback"
        code={`<Avatar>
  <AvatarImage src="/brand/logos/svg/foto-perfil-1.svg" alt="Maria Souza" />
  <AvatarFallback>MS</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback>SS</AvatarFallback>
</Avatar>`}
      >
        <Avatar>
          <AvatarImage
            src="/brand/logos/svg/foto-perfil-1.svg"
            alt="Souza & Souza"
          />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/imagem-inexistente.png" alt="Maria Souza" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
      </Demo>

      <Demo
        title="Tamanhos"
        code={`<Avatar size="sm">…</Avatar>
<Avatar size="default">…</Avatar>
<Avatar size="lg">…</Avatar>`}
      >
        <Avatar size="sm">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar size="default">
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
      </Demo>

      <Demo
        title="Com indicador de status"
        code={`<Avatar>
  <AvatarFallback>MS</AvatarFallback>
  <AvatarBadge className="bg-success" />
</Avatar>`}
      >
        <Avatar>
          <AvatarFallback>MS</AvatarFallback>
          <AvatarBadge className="bg-success" />
          <span className="sr-only">Online</span>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage
            src="/brand/logos/svg/foto-perfil-2.svg"
            alt="Souza & Souza"
          />
          <AvatarFallback>SS</AvatarFallback>
          <AvatarBadge className="bg-warning" />
          <span className="sr-only">Ausente</span>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>JP</AvatarFallback>
          <AvatarBadge className="bg-muted-foreground" />
          <span className="sr-only">Offline</span>
        </Avatar>
      </Demo>

      <Demo
        title="Grupo com contador"
        code={`<AvatarGroup>
  <Avatar><AvatarFallback>MS</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>JP</AvatarFallback></Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`}
      >
        <AvatarGroup>
          <Avatar>
            <AvatarImage
              src="/brand/logos/svg/foto-perfil-1.svg"
              alt="Equipe 1"
            />
            <AvatarFallback>E1</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="/brand/logos/svg/foto-perfil-2.svg"
              alt="Equipe 2"
            />
            <AvatarFallback>E2</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>

        <AvatarGroup>
          <Avatar size="sm">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+8</AvatarGroupCount>
        </AvatarGroup>
      </Demo>

      <Usage
        code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserAvatar({ user }: { user: { name: string; image?: string } }) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

  return (
    <Avatar>
      {user.image ? <AvatarImage src={user.image} alt={user.name} /> : null}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "Avatar · size",
            type: '"sm" | "default" | "lg"',
            default: '"default"',
            description: "24px, 32px ou 40px.",
          },
          {
            prop: "AvatarImage · src / alt",
            type: "string",
            description:
              "alt é obrigatório: use o nome da pessoa ou string vazia se o nome já estiver ao lado.",
          },
          {
            prop: "AvatarImage · onLoadingStatusChange",
            type: "(status) => void",
            description: "Acompanha o carregamento da imagem.",
          },
          {
            prop: "AvatarFallback · delayMs",
            type: "number",
            description:
              "Atraso antes de exibir o fallback, evitando piscada em conexões rápidas.",
          },
          {
            prop: "AvatarBadge",
            type: "span",
            description:
              "Indicador posicionado no canto — dê contexto textual em sr-only.",
          },
          {
            prop: "AvatarGroup / AvatarGroupCount",
            type: "div / div",
            description: "Empilhamento com sobreposição e contador de excedentes.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "AvatarImage exige alt. Se o nome do usuário já aparece ao lado, use alt='' para evitar redundância.",
          "O fallback de iniciais é decorativo — leitores de tela não devem depender dele para identificar a pessoa.",
          "Indicadores de status (AvatarBadge) precisam de texto equivalente em sr-only: 'Online', 'Ausente'.",
          "Em grupos, informe o total real ('+3 participantes') em texto acessível.",
          "Avatares clicáveis devem ser envolvidos por <button> ou <a> focável.",
        ]}
      />
    </ComponentPage>
  );
}
