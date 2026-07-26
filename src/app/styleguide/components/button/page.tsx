"use client";

import * as React from "react";
import { ArrowRightIcon, MailIcon, TrashIcon } from "lucide-react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function ButtonPage() {
  const [loading, setLoading] = React.useState(false);

  return (
    <ComponentPage
      title="Button"
      category="Inputs & Forms"
      description="Elemento de ação primário do design system. Sete variantes e sete tamanhos, todos derivados dos tokens da marca — no tema claro o primário é o azul institucional; no escuro, o dourado."
      install="npx shadcn@latest add button"
      importCode={`import { Button } from "@/components/ui/button"`}
    >
      <Demo
        title="Variantes"
        description="default, secondary, outline, ghost, destructive e link."
        code={`<Button>Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destrutivo</Button>
<Button variant="link">Link</Button>`}
      >
        <Button>Primário</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destrutivo</Button>
        <Button variant="link">Link</Button>
      </Demo>

      <Demo
        title="Variante de marca"
        description="Extensão do projeto: botão dourado para chamadas institucionais sobre o azul."
        code={`<Button className="bg-gold text-gold-foreground hover:bg-gold-400">
  Dourado
</Button>`}
        contentClassName="bg-brand-900"
      >
        <Button className="bg-gold text-gold-foreground hover:bg-gold-400">
          Falar com o time
        </Button>
        <Button
          variant="outline"
          className="border-gold-500/50 bg-transparent text-gold-100 hover:bg-gold-500/10 hover:text-gold-50"
        >
          Saiba mais
        </Button>
      </Demo>

      <Demo
        title="Tamanhos"
        code={`<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="default">Default</Button>
<Button size="lg">LG</Button>`}
      >
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="default">Default</Button>
        <Button size="lg">LG</Button>
      </Demo>

      <Demo
        title="Ícones"
        description="Tamanhos icon-xs, icon-sm, icon e icon-lg para botões quadrados."
        code={`<Button size="icon-xs" aria-label="Excluir"><TrashIcon /></Button>
<Button size="icon" aria-label="Excluir"><TrashIcon /></Button>
<Button><MailIcon /> Enviar e-mail</Button>
<Button variant="outline">Avançar <ArrowRightIcon /></Button>`}
      >
        <Button size="icon-xs" aria-label="Excluir">
          <TrashIcon />
        </Button>
        <Button size="icon-sm" aria-label="Excluir">
          <TrashIcon />
        </Button>
        <Button size="icon" aria-label="Excluir">
          <TrashIcon />
        </Button>
        <Button size="icon-lg" aria-label="Excluir">
          <TrashIcon />
        </Button>
        <Button>
          <MailIcon /> Enviar e-mail
        </Button>
        <Button variant="outline">
          Avançar <ArrowRightIcon />
        </Button>
      </Demo>

      <Demo
        title="Estados"
        description="Disabled, loading e foco — o anel de foco usa --ring."
        code={`<Button disabled>Desabilitado</Button>
<Button disabled>
  <Spinner /> Salvando…
</Button>`}
      >
        <Button disabled>Desabilitado</Button>
        <Button variant="outline" disabled>
          Desabilitado
        </Button>
        <Button disabled={loading} onClick={() => {
          setLoading(true);
          window.setTimeout(() => setLoading(false), 1800);
        }}>
          {loading ? <Spinner /> : null}
          {loading ? "Salvando…" : "Clique para carregar"}
        </Button>
      </Demo>

      <Demo
        title="asChild"
        description="Renderiza o estilo do botão em outro elemento — útil para links."
        code={`<Button asChild>
  <a href="/styleguide">Ir para o styleguide</a>
</Button>`}
      >
        <Button asChild>
          <a href="/styleguide">Ir para o styleguide</a>
        </Button>
      </Demo>

      <Usage
        title="Uso"
        code={`import { Button } from "@/components/ui/button"

export function Actions() {
  return (
    <div className="flex gap-2">
      <Button onClick={() => save()}>Salvar</Button>
      <Button variant="outline">Cancelar</Button>
    </div>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "variant",
            type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
            default: '"default"',
            description: "Estilo visual do botão.",
          },
          {
            prop: "size",
            type: '"xs" | "sm" | "default" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg"',
            default: '"default"',
            description: "Altura e espaçamento interno.",
          },
          {
            prop: "asChild",
            type: "boolean",
            default: "false",
            description:
              "Aplica os estilos ao elemento filho em vez de renderizar um <button>.",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Desabilita a interação e reduz a opacidade.",
          },
          {
            prop: "...props",
            type: "React.ComponentProps<'button'>",
            description: "Todas as props nativas de button são repassadas.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Move o foco para o botão." },
          { keys: "Enter", description: "Ativa o botão." },
          { keys: "Space", description: "Ativa o botão." },
        ]}
      />

      <A11yNotes
        items={[
          "Renderiza um <button> nativo — papel, foco e ativação por teclado são nativos.",
          "Botões apenas com ícone exigem aria-label descrevendo a ação.",
          "O estado disabled remove o botão da ordem de tabulação; para ações assíncronas prefira manter o foco e usar aria-busy.",
          "O anel de foco (--ring) tem 3px e contraste suficiente em ambos os temas.",
          "Ao usar asChild com <a>, o elemento continua sendo um link para leitores de tela — use para navegação, não para ações.",
        ]}
      />
    </ComponentPage>
  );
}
