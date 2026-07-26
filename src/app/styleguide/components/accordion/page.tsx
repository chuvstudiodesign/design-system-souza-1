"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  A11yNotes,
  ComponentPage,
  Demo,
  KeyboardTable,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";

const faq = [
  {
    value: "prazos",
    question: "Como funciona o acompanhamento de prazos?",
    answer:
      "Cada processo cadastrado gera alertas automáticos 48h antes do vencimento, enviados por e-mail e exibidos no painel da equipe.",
  },
  {
    value: "honorarios",
    question: "Quais modelos de honorários estão disponíveis?",
    answer:
      "Trabalhamos com honorários mensais, por ato processual e de êxito, sempre formalizados em contrato antes do início dos trabalhos.",
  },
  {
    value: "documentos",
    question: "Onde ficam armazenados os documentos?",
    answer:
      "Em repositório criptografado, com trilha de auditoria e acesso restrito aos advogados responsáveis pelo caso.",
  },
];

export default function AccordionPage() {
  return (
    <ComponentPage
      title="Accordion"
      category="Layout"
      description="Lista vertical de seções expansíveis. Ideal para FAQs e formulários longos, reduzindo a carga visual sem esconder conteúdo dos leitores de tela."
      install="npx shadcn@latest add accordion"
      importCode={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`}
    >
      <Demo
        title="Uma seção por vez"
        description="type='single' com collapsible permite fechar a seção aberta."
        contentClassName="flex-col items-stretch"
        code={`<Accordion type="single" collapsible defaultValue="prazos">
  <AccordionItem value="prazos">
    <AccordionTrigger>Como funcionam os prazos?</AccordionTrigger>
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion
          type="single"
          collapsible
          defaultValue="prazos"
          className="w-full"
        >
          {faq.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Demo>

      <Demo
        title="Múltiplas seções abertas"
        contentClassName="flex-col items-stretch"
        code={`<Accordion type="multiple" defaultValue={["a", "b"]}>…</Accordion>`}
      >
        <Accordion
          type="multiple"
          defaultValue={["prazos", "honorarios"]}
          className="w-full"
        >
          {faq.map((item) => (
            <AccordionItem key={item.value} value={`m-${item.value}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Demo>

      <Demo
        title="Item desabilitado"
        contentClassName="flex-col items-stretch"
        code={`<AccordionItem value="x" disabled>…</AccordionItem>`}
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ativo">
            <AccordionTrigger>Seção disponível</AccordionTrigger>
            <AccordionContent>
              Conteúdo acessível normalmente.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="bloqueado" disabled>
            <AccordionTrigger>Seção bloqueada</AccordionTrigger>
            <AccordionContent>Nunca será exibida.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Demo>

      <Usage
        code={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faq({ items }: { items: { id: string; q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}`}
      />

      <PropsTable
        title="Props — Accordion"
        rows={[
          {
            prop: "type",
            type: '"single" | "multiple"',
            description: "Obrigatório: uma ou várias seções abertas.",
          },
          {
            prop: "collapsible",
            type: "boolean",
            default: "false",
            description:
              "Em type='single', permite fechar a seção atualmente aberta.",
          },
          {
            prop: "value / defaultValue",
            type: "string | string[]",
            description: "Seções abertas.",
          },
          {
            prop: "onValueChange",
            type: "(value: string | string[]) => void",
            description: "Callback de abertura/fechamento.",
          },
          {
            prop: "orientation",
            type: '"vertical" | "horizontal"',
            default: '"vertical"',
            description: "Direção da navegação por setas.",
          },
        ]}
      />

      <PropsTable
        title="Props — AccordionItem"
        rows={[
          {
            prop: "value",
            type: "string",
            description: "Identificador único da seção (obrigatório).",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Impede abrir/fechar a seção.",
          },
        ]}
      />

      <KeyboardTable
        rows={[
          { keys: "Tab", description: "Move entre os gatilhos." },
          { keys: "Space / Enter", description: "Abre ou fecha a seção focada." },
          { keys: "↑ / ↓", description: "Move o foco entre os gatilhos." },
          { keys: "Home / End", description: "Primeiro/último gatilho." },
        ]}
      />

      <A11yNotes
        items={[
          "Cada gatilho é um <button> dentro de um heading, com aria-expanded e aria-controls.",
          "O conteúdo tem role=region e aria-labelledby apontando para o gatilho.",
          "O conteúdo fechado é removido do fluxo, mas o padrão de foco continua previsível.",
          "Evite colocar formulários longos com validação dentro de seções fechadas: erros invisíveis confundem o usuário.",
        ]}
      />
    </ComponentPage>
  );
}
