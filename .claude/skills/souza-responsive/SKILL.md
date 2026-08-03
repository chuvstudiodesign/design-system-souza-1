---
name: souza-responsive
description: Técnica de responsividade e performance do site Souza & Souza — fluid type com clamp, container queries do Tailwind v4, grids que colapsam bem, imagem com sizes correto, Core Web Vitals e a matriz de breakpoints a verificar. Carregue em qualquer tarefa que envolva layout, grid, imagem ou performance. Dispara em: "responsivo", "mobile", "breakpoint", "grid", "container query", "clamp", "performance", "LCP", "CLS", "imagem".
---

# Responsividade e performance — site Souza & Souza

Stack real: **Tailwind v4.3**, **Next 16.2**, **React 19.2**. Container queries e `@theme` são nativos aqui — não precisa de plugin, e não use técnica de 2021 quando a de 2026 já está disponível.

## Mobile-first, de verdade

A maior parte deste público chega pelo celular. Escreva o estilo base para 375px e adicione a partir daí — nunca o contrário. Se você está escrevendo `lg:` para *consertar* o mobile, a base está errada.

## Fluid type em vez de degraus

Salto de tamanho no breakpoint é visível e datado. Prefira interpolação contínua:

```
text-[clamp(2rem,1.2rem+3.5vw,4rem)]      título de hero
text-[clamp(1.05rem,1rem+0.4vw,1.2rem)]   corpo institucional
```

Regra: o mínimo do `clamp` tem que ser legível a 320px, e o termo em `rem` precisa existir para que o zoom do navegador continue funcionando — `clamp(2rem, 5vw, 4rem)` sem `rem` no meio quebra o zoom de quem tem baixa visão. Esse detalhe importa muito neste projeto.

Corpo **nunca abaixo de 17px** no site institucional.

## Container queries antes de media queries

Um card que aparece em grid de 3, em grid de 2 e sozinho numa coluna não deve depender da largura da *janela* — depende da largura *dele*:

```tsx
<div className="@container">
  <article className="flex flex-col @md:flex-row @md:items-center gap-4">
```

Use `@container` sempre que o componente for reutilizado em contextos de largura diferente. Media query fica para o que é realmente estrutural: o shell da página, o header, a troca de navegação.

## Grid

- `grid-cols-1` na base; suba com `sm:` / `lg:`
- `minmax(0,1fr)` ou `min-w-0` em filho de grid/flex — sem isso, texto longo e `<pre>` estouram o container. É a causa nº 1 de scroll horizontal
- `auto-fit` + `minmax` para grid que se adapta sozinho:
  `grid-cols-[repeat(auto-fit,minmax(min(18rem,100%),1fr))]`
- O `min(18rem,100%)` é o que impede o estouro a 320px
- Listas longas (as áreas têm até 12 itens) em `columns-2` a partir de `md`, nunca no mobile

## Imagem

- Sempre `next/image`. Import estático quando o caminho é fixo — vem com `width`, `height` e `blurDataURL` de graça
- `sizes` é **obrigatório** com `fill`. Sem ele o navegador baixa a maior variante:
  `sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 600px"`
- `priority` só na imagem de LCP — **uma por página**. Mais que isso e nenhuma é prioridade
- `aspect-ratio` no container em vez de altura fixa, para não causar CLS
- Foto de pessoa: `object-cover` com `object-position` ajustado. Enquadramento padrão corta cabeça em retrato vertical

## Toque e leitura

- Alvo ≥ 44px; ≥ 48px no CTA principal. Vale para o ícone de WhatsApp flutuante
- Espaçamento ≥ 8px entre alvos adjacentes
- Nada de conteúdo essencial atrás de hover
- `line-height` ≥ 1.6 em corpo
- Respeitar `env(safe-area-inset-*)` em elemento fixo no rodapé — o flutuante de WhatsApp não pode ficar sob a barra do iOS

## Performance

- Server Component por padrão. `"use client"` **no menor componente possível** — um `"use client"` no topo de uma seção arrasta todo o texto dela para o bundle
- Fontes já carregadas em `src/app/layout.tsx` (Trajan local + Inter). Não adicione nenhuma outra
- `next/dynamic` para o que é pesado e não aparece na primeira dobra — carrossel, mapa
- Mapa do Google em `<iframe loading="lazy">` com `title`
- Liquid glass custa composição: no máximo um elemento com vidro por tela, e nunca vidro sobre vidro
- Metas: **LCP < 2,5s · CLS < 0,1 · INP < 200ms**

## Matriz de verificação

Toda seção passa por:

| Largura | O que checar |
|---|---|
| **320** | Nada estoura. O piso real, não 375 |
| **375** | iPhone padrão — a maioria deste público |
| **768** | Tablet / transição de grid |
| **1024** | Onde o menu vira horizontal |
| **1280** | Desktop comum |
| **1920** | Container não deixa a linha longa demais |

Mais: zoom do navegador em 200% (WCAG exige) e orientação paisagem no celular.

## Sem scroll horizontal — nunca

É o defeito mais comum e o mais fácil de detectar:

```js
// no console do navegador
document.querySelectorAll('*').forEach(el => {
  if (el.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
    console.log(el)
})
```

As causas quase sempre são: filho de grid sem `min-w-0`, imagem sem `max-w-full`, `100vw` num elemento dentro de container com padding, ou palavra longa sem `break-words`.
