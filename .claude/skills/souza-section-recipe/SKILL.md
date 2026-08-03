---
name: souza-section-recipe
description: Procedimento padrão para construir UMA seção do site institucional Souza & Souza de ponta a ponta — estrutura de arquivos, contrato de componente, responsividade, dark mode, acessibilidade e verificação obrigatória antes de entregar. Carregue no início de cada tarefa de construção de seção. Dispara em: "construir seção", "montar seção", "hero", "próxima seção", "section".
---

# Receita de seção — site Souza & Souza

Uma seção por vez, entregue completa. Seção meio pronta é pior que seção não começada: some no meio de um diff e ninguém revisa de novo.

## Antes de escrever

1. Carregue `souza-design-system`, `souza-site-content`, `souza-web-design` e `souza-responsive`. Não são opcionais.
2. Leia o arquivo de conteúdo da seção em `Site/paginas/` e o dado tipado em `src/lib/site/conteudo.ts` — o texto vem de lá, não redigitado em JSX.
2b. Se houver especificação do `souza-art-director`, ela manda na composição. Divergir dela exige justificativa no relatório.
3. `ls src/components/ui/` e confirme quais componentes já resolvem o problema. Reaproveitar é o caminho normal; criar é a exceção que precisa de justificativa.
4. Confira o styleguide do componente escolhido (`src/app/styleguide/components/<slug>/page.tsx`) para ver a API real, não a que você imagina.

## Onde os arquivos moram

```
src/app/site/
  layout.tsx              ← header + footer + WhatsApp flutuante
  page.tsx                ← home, compõe as seções
  sobre-nos/page.tsx
  servicos/page.tsx
  equipe/page.tsx
  contato/page.tsx

src/components/site/
  layout/                 ← header, footer, container, section-shell
  sections/               ← uma seção = um arquivo
  ...

src/lib/site/
  contato.ts              ← dados de contato canônicos
  conteudo.ts             ← copy estruturado (serviços, depoimentos, equipe)
```

Uma seção = um arquivo em `src/components/site/sections/`, export nomeado, sem props obrigatórias quando o conteúdo é fixo. A `page.tsx` só compõe:

```tsx
export default function Page() {
  return (
    <>
      <HeroSection />
      <SobreSection />
      <AreasSection />
    </>
  );
}
```

## Server por padrão

Toda seção é Server Component. `"use client"` só quando houver estado, efeito ou listener — e então isole **só a parte interativa** num componente filho, mantendo o texto no servidor. Carrossel de depoimentos é client; a seção que o contém não precisa ser.

## Contrato visual

Toda seção começa por um shell consistente:

```tsx
<section id="…" className="py-20 md:py-28 lg:py-32">
  <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
    …
  </div>
</section>
```

O `id` é obrigatório em qualquer seção que possa virar destino de âncora (as áreas do direito em `/site/servicos` recebem uma cada).

Alterne a superfície em relação à seção anterior — `bg-background`, `bg-muted/40`, `bg-navy text-navy-foreground`. Três seções seguidas na mesma superfície viram um bloco só aos olhos.

## Responsividade

Mobile-first. Verificar em 375 / 768 / 1280 / 1920.

- Nada de largura fixa em px em container
- Grid colapsa para 1 coluna antes de 640px
- Imagem sempre com `sizes` quando usa `fill`
- Título de hero: `text-3xl sm:text-4xl lg:text-5xl` — não deixe o H1 de 132 caracteres virar 8 linhas no celular
- Zero scroll horizontal. Se aparecer, quase sempre é uma imagem sem `max-w-full` ou um grid sem `min-w-0`

## Dark mode

O site abre no escuro e o usuário pode trocar. **As duas versões são de primeira classe** — não trate o claro como fallback.

Escreva com tokens semânticos e o tema resolve sozinho. Quando fixar uma cor de escala (`bg-brand-900`) porque a faixa deve ser azul nos dois temas, verifique o contraste do texto por cima nos dois. Lembre que no escuro `--primary` vira dourado.

## Acessibilidade

- Um `h1` por página; hierarquia sem pular nível
- Contraste mínimo 4.5:1 em texto de corpo — **dourado sobre branco reprova**, use `gold-700`+ ou dourado sobre azul escuro
- Alvo de toque ≥ 44px em mobile
- `alt` descritivo em foto de pessoa; `alt=""` + `aria-hidden` em decorativa
- Foco visível — não remova o `ring` dos componentes
- Modal/accordion vindos de `src/components/ui/` já trazem o comportamento de teclado; não recrie à mão

## Verificação obrigatória

Antes de reportar a seção como pronta:

```bash
npx tsc --noEmit
npm run lint
```

Ambos limpos. Erro de tipo ou lint = seção não entregue.

Se houver ambiente de execução disponível, confira a rota renderizando de verdade — nos dois temas.

## O que reportar

Ao terminar, informe: arquivos criados/alterados, componentes do design system reaproveitados, qualquer componente novo criado **com a justificativa**, decisões visuais tomadas, e o que ficou pendente ou dependendo de dado do cliente.

Não declare pronto o que não verificou. Se o build quebrou, diga que quebrou e mostre a saída.
