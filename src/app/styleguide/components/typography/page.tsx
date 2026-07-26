"use client";

import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Prose, Typography } from "@/components/ui/typography";

export default function TypographyPage() {
  return (
    <ComponentPage
      title="Typography"
      category="Utilities"
      description="Escala tipográfica do design system. A variante display usa a Trajan Pro (capitulares oficiais da marca); as demais usam Inter. Na documentação do shadcn, Typography é um conjunto de estilos — aqui virou um componente com variantes."
      install="# não existe no registry: componente do projeto"
      importCode={`import { Typography, Prose } from "@/components/ui/typography"`}
    >
      <Demo
        title="Títulos"
        contentClassName="flex-col items-stretch"
        code={`<Typography variant="display">Souza & Souza</Typography>
<Typography variant="h1">Título H1</Typography>
<Typography variant="h2">Título H2</Typography>
<Typography variant="h3">Título H3</Typography>
<Typography variant="h4">Título H4</Typography>`}
      >
        <div className="flex w-full flex-col gap-5">
          <Typography variant="display">Souza &amp; Souza</Typography>
          <Typography variant="h1">O refinamento de uma marca</Typography>
          <Typography variant="h2">Áreas de atuação</Typography>
          <Typography variant="h3">Direito empresarial</Typography>
          <Typography variant="h4">Consultoria societária</Typography>
        </div>
      </Demo>

      <Demo
        title="Texto"
        contentClassName="flex-col items-stretch"
        code={`<Typography variant="lead">Texto de abertura.</Typography>
<Typography>Parágrafo padrão.</Typography>
<Typography variant="large">Destaque</Typography>
<Typography variant="small">Texto pequeno</Typography>
<Typography variant="muted">Texto de apoio</Typography>
<Typography variant="overline">Seção</Typography>`}
      >
        <div className="flex w-full flex-col gap-4">
          <Typography variant="overline">Sobre o escritório</Typography>
          <Typography variant="lead">
            Assessoria jurídica preventiva e contenciosa para empresas que
            valorizam previsibilidade.
          </Typography>
          <Typography>
            A transição para a nova identidade foca na suavização das formas. A
            substituição de quinas rígidas por raios de curvatura orgânicos
            traduz um posicionamento mais humano e atual, mantendo a solidez
            inerente ao segmento jurídico.
          </Typography>
          <Typography variant="large">Resultado consistente</Typography>
          <Typography variant="small">
            Dados de março de 2026, sujeitos a revisão.
          </Typography>
          <Typography variant="muted">
            Última atualização em 12/03/2026.
          </Typography>
        </div>
      </Demo>

      <Demo
        title="Citação, código e lista"
        contentClassName="flex-col items-stretch"
        code={`<Typography variant="blockquote">Citação com filete dourado.</Typography>
<Typography variant="inlineCode">--primary</Typography>
<Typography variant="list">
  <li>Item</li>
</Typography>`}
      >
        <div className="flex w-full flex-col gap-4">
          <Typography variant="blockquote">
            &ldquo;A confiança do cliente se constrói na previsibilidade de cada
            prazo cumprido.&rdquo;
          </Typography>
          <p className="text-sm">
            Os tokens vivem em{" "}
            <Typography variant="inlineCode" asChild>
              <code>src/app/globals.css</code>
            </Typography>
            .
          </p>
          <Typography variant="list" asChild>
            <ul>
              <li>Aumento do raio de curvatura dos cantos</li>
              <li>Preservação da herança e legibilidade do símbolo</li>
              <li>Metodologia estruturada compartilhada em reunião</li>
            </ul>
          </Typography>
        </div>
      </Demo>

      <Demo
        title="Prose"
        description="Container para blocos longos de conteúdo editorial."
        contentClassName="flex-col items-stretch"
        code={`<Prose>
  <h2>Título da seção</h2>
  <p>Parágrafo…</p>
  <h3>Subtítulo</h3>
  <p>Outro parágrafo…</p>
</Prose>`}
      >
        <Prose className="max-w-2xl">
          <h2>Evolução da marca</h2>
          <p>
            A nova identidade preserva o símbolo histórico do escritório e
            atualiza sua construção geométrica, com cantos mais suaves e maior
            respiro entre os elementos.
          </p>
          <h3>Aplicação</h3>
          <p>
            O azul institucional carrega a estrutura visual; o dourado marca
            hierarquia e destaque em peças de apresentação.
          </p>
        </Prose>
      </Demo>

      <Usage
        code={`import { Typography } from "@/components/ui/typography"

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="flex flex-col gap-2">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="lead">{subtitle}</Typography>
    </header>
  )
}

// asChild preserva a semântica correta
<Typography variant="h2" asChild>
  <h1>Título visualmente h2, semanticamente h1</h1>
</Typography>`}
      />

      <PropsTable
        rows={[
          {
            prop: "variant",
            type: '"display" | "h1" | "h2" | "h3" | "h4" | "p" | "lead" | "large" | "small" | "muted" | "blockquote" | "inlineCode" | "list" | "overline"',
            default: '"p"',
            description:
              "Cada variante já renderiza o elemento HTML correspondente (h1, p, ul, code…).",
          },
          {
            prop: "asChild",
            type: "boolean",
            default: "false",
            description:
              "Aplica os estilos a outro elemento — use para separar aparência de semântica.",
          },
          {
            prop: "Prose",
            type: "div",
            description:
              "Container com estilos de leitura para blocos de conteúdo com HTML livre.",
          },
          {
            prop: "typographyVariants",
            type: "(props) => string",
            description: "Helper cva exportado para reuso das classes.",
          },
        ]}
      />

      <A11yNotes
        items={[
          "Hierarquia de headings deve ser sequencial (h1 → h2 → h3), sem pular níveis — use asChild quando a aparência não corresponder ao nível semântico.",
          "Cada página deve ter exatamente um h1.",
          "A variante display usa capitulares Trajan: evite blocos longos em caixa alta, que reduzem a legibilidade.",
          "Texto muted usa --muted-foreground, com contraste mínimo de 4.5:1 nos dois temas.",
          "Não use tamanho de fonte para transmitir importância a leitores de tela — isso vem da estrutura de headings.",
        ]}
      />
    </ComponentPage>
  );
}
