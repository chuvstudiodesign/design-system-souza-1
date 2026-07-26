"use client";

import Image from "next/image";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioPage() {
  return (
    <ComponentPage
      title="Aspect Ratio"
      category="Layout"
      description="Container que preserva uma proporção fixa independentemente da largura disponível. Evita saltos de layout (CLS) ao carregar imagens, vídeos e mapas."
      install="npx shadcn@latest add aspect-ratio"
      importCode={`import { AspectRatio } from "@/components/ui/aspect-ratio"`}
    >
      <Demo
        title="16 / 9"
        contentClassName="flex-col items-stretch"
        code={`<AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl">
  <Image src="/brand/pattern/estampa-1.svg" alt="" fill className="object-cover" />
</AspectRatio>`}
      >
        <div className="w-full max-w-md">
          <AspectRatio
            ratio={16 / 9}
            className="overflow-hidden rounded-xl border border-border bg-brand-900"
          >
            <Image
              src="/brand/pattern/estampa-1.svg"
              alt="Estampa institucional Souza & Souza"
              fill
              className="object-cover opacity-70"
            />
          </AspectRatio>
        </div>
      </Demo>

      <Demo
        title="Proporções comuns"
        contentClassName="flex-col items-stretch"
        code={`<AspectRatio ratio={1}>…</AspectRatio>       // quadrado
<AspectRatio ratio={4 / 3}>…</AspectRatio>   // clássico
<AspectRatio ratio={21 / 9}>…</AspectRatio>  // ultrawide`}
      >
        <div className="grid w-full gap-4 sm:grid-cols-3">
          {[
            { label: "1 / 1", ratio: 1 },
            { label: "4 / 3", ratio: 4 / 3 },
            { label: "3 / 4", ratio: 3 / 4 },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <AspectRatio
                ratio={item.ratio}
                className="flex items-center justify-center rounded-lg border border-border bg-muted"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {item.label}
                </span>
              </AspectRatio>
            </div>
          ))}
        </div>
      </Demo>

      <Demo
        title="Ultrawide"
        contentClassName="flex-col items-stretch"
        code={`<AspectRatio ratio={21 / 9}>…</AspectRatio>`}
      >
        <div className="w-full">
          <AspectRatio
            ratio={21 / 9}
            className="flex items-center justify-center rounded-xl border border-border bg-brand-900 text-gold-100"
          >
            <span className="font-display tracking-[0.14em]">21 / 9</span>
          </AspectRatio>
        </div>
      </Demo>

      <Usage
        code={`import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

export function Thumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
      <Image src={src} alt={alt} fill className="object-cover" />
    </AspectRatio>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "ratio",
            type: "number",
            default: "1",
            description:
              "Proporção largura/altura — escreva como divisão (16 / 9) para clareza.",
          },
          {
            prop: "className",
            type: "string",
            description:
              "Aplicado ao container; use overflow-hidden junto de border-radius.",
          },
          {
            prop: "children",
            type: "React.ReactNode",
            description:
              "Conteúdo posicionado absolutamente para preencher o container.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "É um container puramente visual — não adiciona semântica.",
          "Imagens dentro dele continuam exigindo alt descritivo (ou alt='' quando decorativas).",
          "Fixar a proporção evita deslocamento de conteúdo durante o carregamento, o que beneficia usuários com dificuldades motoras e cognitivas.",
          "Para vídeos, mantenha os controles nativos acessíveis dentro do container.",
        ]}
      />
    </ComponentPage>
  );
}
