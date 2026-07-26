"use client";

import * as React from "react";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";

export default function ProgressPage() {
  const [value, setValue] = React.useState(35);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setValue((current) => (current >= 100 ? 0 : current + 5));
    }, 800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <ComponentPage
      title="Progress"
      category="Feedback"
      description="Barra de progresso determinada, para operações com percentual conhecido: upload, importação, preenchimento de formulário."
      install="npx shadcn@latest add progress"
      importCode={`import { Progress } from "@/components/ui/progress"`}
    >
      <Demo
        title="Básico"
        contentClassName="flex-col items-stretch"
        code={`<Progress value={60} />`}
      >
        <div className="flex w-full max-w-md flex-col gap-4">
          <Progress value={25} aria-label="25% concluído" />
          <Progress value={60} aria-label="60% concluído" />
          <Progress value={100} aria-label="100% concluído" />
        </div>
      </Demo>

      <Demo
        title="Animado"
        description="Atualiza a cada 800ms — o valor também é comunicado em texto."
        contentClassName="flex-col items-stretch"
        code={`const [value, setValue] = React.useState(35)

<Progress value={value} aria-label={\`\${value}% concluído\`} />`}
      >
        <div className="flex w-full max-w-md flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span>Importando processos</span>
            <span className="font-mono text-xs text-muted-foreground">
              {value}%
            </span>
          </div>
          <Progress value={value} aria-label={`${value}% concluído`} />
        </div>
      </Demo>

      <Demo
        title="Com rótulo e ação"
        contentClassName="flex-col items-stretch"
        code={`<div className="flex items-center gap-3">
  <Progress value={value} className="flex-1" />
  <Button size="sm" variant="outline">Cancelar</Button>
</div>`}
      >
        <div className="flex w-full max-w-md flex-col gap-3">
          <div className="flex items-center gap-3">
            <Progress value={72} className="flex-1" aria-label="72% enviado" />
            <Button size="sm" variant="outline">
              Cancelar
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            Enviando contrato-assinado.pdf (72%)
          </div>
        </div>
      </Demo>

      <Demo
        title="Espessuras e cor"
        contentClassName="flex-col items-stretch"
        code={`<Progress value={50} className="h-2" />
<Progress value={50} className="h-3 [&>[data-slot=progress-indicator]]:bg-gold" />`}
      >
        <div className="flex w-full max-w-md flex-col gap-4">
          <Progress value={50} className="h-0.5" aria-label="Fino" />
          <Progress value={50} className="h-2" aria-label="Médio" />
          <Progress
            value={50}
            className="h-3 [&>[data-slot=progress-indicator]]:bg-gold"
            aria-label="Dourado"
          />
        </div>
      </Demo>

      <Usage
        code={`import { Progress } from "@/components/ui/progress"

export function UploadProgress({ percent }: { percent: number }) {
  return (
    <div className="flex flex-col gap-1">
      <Progress value={percent} aria-label={\`\${percent}% enviado\`} />
      <span className="text-xs text-muted-foreground">{percent}% enviado</span>
    </div>
  )
}`}
      />

      <PropsTable
        rows={[
          {
            prop: "value",
            type: "number",
            description: "Percentual atual (0–100). Omita para estado indeterminado.",
          },
          {
            prop: "max",
            type: "number",
            default: "100",
            description: "Valor máximo da escala.",
          },
          {
            prop: "getValueLabel",
            type: "(value: number, max: number) => string",
            description: "Personaliza o texto anunciado por leitores de tela.",
          },
          {
            prop: "className",
            type: "string",
            description:
              "Altura e cor; o indicador pode ser alvo via [&>[data-slot=progress-indicator]].",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Renderiza role=progressbar com aria-valuenow, aria-valuemin e aria-valuemax.",
          "Forneça aria-label (ou aria-labelledby) descrevendo o que está progredindo.",
          "Repita o percentual em texto visível — a barra sozinha não é acessível a todos.",
          "Para operações sem percentual conhecido, use Spinner em vez de Progress.",
          "Atualizações muito frequentes devem ser agrupadas para não poluir o anúncio dos leitores de tela.",
        ]}
      />
    </ComponentPage>
  );
}
