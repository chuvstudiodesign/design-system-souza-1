# Sobre nós `/site5/sobre-nos` — especificação de composição (art-director, 23/09/2026)

Mesma língua da home v5 (`01-home.md`). Página que mostra o espaço real; cada foto responde ao texto ao lado — não há galeria.

## 0. Decisões gerais

| # | Bloco | Arquivo | Superfície | Composição | Foto (`fotosEspaco`) | Trilho |
|---|---|---|---|---|---|---|
| 1 | Hero | `sobre/hero-sobre.tsx` | base + foto | texto 5 / foto 7 sangrando à direita e ao topo | `recepcaoAtendimento` | — |
| 2 | Apresentação | `sobre/apresentacao.tsx` | muted | trilho 3 + texto 8 | — | 01 |
| 3 | Nossa experiência | `sobre/experiencia.tsx` | base, py-0 | foto 7 sangrando à esquerda / texto 5 | `equipeTrabalhando` | 02 (em linha) |
| 4 | Nosso propósito | `sobre/proposito.tsx` | **gold** (única) | trilho 3 + frase grande | — | 03 |
| 5 | Nossos valores | `sobre/valores.tsx` | navy | trilho 3 + lista tipográfica 6 | — | 04 |
| 6 | Nosso diferencial | `sobre/diferencial.tsx` | base | texto 6 / par de fotos 5 | `salaAtendimentoVertical` + `recepcaoPoltronas` (lg+) | 05 (em linha) |
| 7 | Fechamento | `sobre/fechamento.tsx` | muted | panorâmica no topo, trilho 3 + texto 8 | `equipeGrupo` | 06 |

Arquivos em `src/components/site5/sobre/`.

- Trajan: H1, numerais do trilho, H2 curtos "Nossa experiência"/"Nosso diferencial" (`font-display uppercase`). H2 longos e corpo em Inter. Em Propósito e Valores o H2 é o rótulo do trilho.
- Sobretítulos permitidos: "Sobre nós" (rótulo do item em `navegacao.ts`), `sobre.apresentacao.sobretitulo`. Nenhum outro (o rótulo "Fechamento" foi retirado por decisão do orquestrador).
- Corpo `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed`; lead `clamp(1.1875rem,1.1rem+0.4vw,1.375rem)`; medida 48–62ch.
- Motion: `Revelar`; hero em cascata `animate-in … motion-reduce:animate-none`; fotos `Revelar variante="zoom"` exceto a do hero (LCP, estática).
- Imagens `/site5/espaco/*.webp` via otimizador (sem `unoptimized`), sempre `sizes`; `preload` só no hero; `alt` de `fotosEspaco`.
- Componente novo `sobre/trilho.tsx`: `Trilho({ numero, rotulo, as = "p", tom = "escuro" | "gold" | "navy" })` — numeral `font-display text-sm tracking-[0.22em]` aria-hidden + rótulo `mt-4 text-sm tracking-[0.08em] uppercase` no elemento `as`. Cores: escuro `text-gold-400`/`text-muted-foreground`; gold `text-brand-950`/`text-brand-900`; navy `text-gold-400`/`text-navy-foreground/70`. Na coluna, `lg:sticky lg:top-28 lg:self-start`.
- CTAs: sem botão no hero (o documento não tem). Fechamento: primário "Conheça nossos profissionais" (único `shadow-gold`), secundário outline WhatsApp `home.contato.botao`. Glifo de `@/components/site5/glifos`.

## 1. Hero — `hero-sobre.tsx`
Dominante: a foto da recepção (assunto, não atmosfera).
- `<section className="relative isolate overflow-clip bg-background">` › `div.grid lg:grid-cols-12 lg:min-h-[min(54rem,100svh)]` (sem Container no grid).
- Foto: `div.relative aspect-[4/3] sm:aspect-[16/10] lg:order-last lg:col-span-7 lg:aspect-auto` › `Image recepcaoAtendimento fill preload sizes="(max-width:1024px) 100vw, 58vw" className="object-cover object-[64%_45%]"`. Proteção do header: `div aria-hidden absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/80 to-background/0`. Só mobile: `div aria-hidden absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-background/0 lg:hidden`.
- Texto: `lg:col-span-5 lg:self-end px-6 pt-8 pb-20 md:px-10 md:pb-24 lg:pt-40 lg:pb-28 lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]`:
  - `<Sobretitulo>` "Sobre nós" (do `navegacao.ts`);
  - `<h1>` `sobre.hero.titulo` `mt-6 font-display uppercase text-[clamp(1.875rem,1.2rem+2vw,3rem)] leading-[1.08] tracking-[0.01em] text-balance` (se "SOUZA & SOUZA" não couber em 1280, baixar o teto do clamp — não alargar a coluna);
  - `rule-gold h-px w-24 mt-8` aria-hidden;
  - `<p>` `sobre.hero.subtitulo` `mt-8 max-w-[34ch] text-[clamp(1.1875rem,1.05rem+0.5vw,1.4375rem)] leading-snug text-foreground/90 text-pretty`;
  - `<p>` `sobre.hero.paragrafo` `mt-5 max-w-[52ch] text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed text-muted-foreground text-pretty`.
- 375: foto primeiro (y=0 sob o header), depois texto.
- Motion: cascata no texto (Sobretitulo `fade-in slide-in-from-bottom-2 fill-mode-both duration-700`; H1 `delay-100`; filete `delay-300`; parágrafos `delay-400`), `motion-reduce:animate-none`.

## 2. Apresentação — `apresentacao.tsx`
- `Section surface="muted" size="lg"` › Container › `grid gap-x-8 gap-y-10 lg:grid-cols-12`.
- `lg:col-span-3`: `<Trilho numero="01" rotulo={sobre.apresentacao.sobretitulo} />`.
- `<Revelar className="lg:col-span-8 lg:col-start-5">`: `<h2>` `titulo` `max-w-[22ch] text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance`; `paragrafos[0]` lead `mt-8 max-w-[52ch] text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug text-foreground text-pretty`; `div.mt-10 grid gap-6 border-t border-border pt-8 lg:grid-cols-2 lg:gap-10` com `paragrafos[1]` e `[2]` no corpo muted.

## 3. Nossa experiência — `experiencia.tsx`
- `Section surface="base" className="py-0 overflow-clip"` › `div.grid lg:grid-cols-12`.
- Foto: `<Revelar variante="zoom" className="relative aspect-[3/2] lg:col-span-7 lg:aspect-auto lg:min-h-[38rem]">` › `Image equipeTrabalhando fill sizes="(max-width:1024px) 100vw, 58vw" className="object-cover object-[45%_50%]"`.
- Texto: `lg:col-span-5 self-center px-6 py-16 md:px-10 md:py-24 lg:py-32 lg:pl-16 lg:pr-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]` em `Revelar`:
  - `<p aria-hidden className="font-display text-xs tracking-[0.22em] text-gold-400">02</p>`;
  - `<h2>` `experiencia.titulo` `mt-4 font-display uppercase text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-[1.15] tracking-tight text-balance`;
  - `rule-gold h-px w-16 mt-6`;
  - `paragrafos[0]` `mt-6 max-w-[48ch] text-[clamp(1.125rem,1.05rem+0.35vw,1.3125rem)] leading-relaxed text-foreground/90 text-pretty`; `paragrafos[1]` `mt-5 max-w-[48ch]` corpo muted.
- 375: foto primeiro, texto depois.

## 4. Nosso propósito — `proposito.tsx`
- `Section surface="gold" size="lg" className="overflow-clip"`, cores fixas brand-950/brand-900 (como `manifesto.tsx`).
- `lg:col-span-3`: `<Trilho numero="03" rotulo={sobre.proposito.titulo} as="h2" tom="gold" />`.
- `<Revelar duracao={800} className="lg:col-span-8 lg:col-start-5">` › `<p>` `proposito.paragrafo` `max-w-[32ch] text-[clamp(1.5rem,1.05rem+1.9vw,2.625rem)] leading-[1.2] font-medium tracking-tight text-balance text-brand-950`.
- Estampa opcional `brandAssets.pattern[1]` no canto inferior direito (`-scale-x-100`), tom sobre tom, aria-hidden — remover se competir.

## 5. Nossos valores — `valores.tsx`
- `Section surface="navy" size="md"` › Container › `grid gap-x-8 gap-y-10 lg:grid-cols-12`.
- `lg:col-span-3`: `<Trilho numero="04" rotulo={sobre.valores.titulo} as="h2" tom="navy" />`.
- `<ul className="lg:col-span-8 lg:col-start-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">`; cada item `<Revelar asChild atraso={i*70}><li className="border-t border-navy-foreground/15 pt-5 pb-8">` com `span aria-hidden block h-px w-8 bg-gold-500/70` + `span.mt-4 block text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-tight font-medium text-balance`.

## 6. Nosso diferencial — `diferencial.tsx`
- `Section surface="base" size="lg"` › Container › `grid gap-x-8 gap-y-12 lg:grid-cols-12 lg:items-center`.
- Texto `<Revelar className="lg:col-span-6">`: "05" (igual ao bloco 3), `<h2>` `diferencial.titulo` (classes do H2 do bloco 3), `rule-gold w-16 mt-6`, `paragrafos[0]` lead `mt-6 max-w-[52ch] text-[clamp(1.125rem,1.05rem+0.35vw,1.3125rem)] leading-relaxed text-foreground/90`, `paragrafos[1]` `mt-5 max-w-[56ch]` corpo muted.
- Fotos `div.relative lg:col-span-5 lg:col-start-8 lg:pb-12`:
  - principal `<Revelar variante="zoom" className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-xl ring-1 ring-border lg:aspect-[4/5]">` › `Image salaAtendimentoVertical fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover object-[50%_60%]"`;
  - apoio lg+ `<Revelar variante="zoom" atraso={120} className="absolute -bottom-12 -left-16 hidden w-[55%] aspect-[3/2] overflow-hidden rounded-2xl shadow-lg ring-4 ring-background lg:block">` › `Image recepcaoPoltronas fill sizes="22vw" className="object-cover"`.
- 375: texto, depois foto principal; apoio oculto.

## 7. Fechamento — `fechamento.tsx`
- `Section surface="muted" className="pt-0 pb-24 md:pt-20 md:pb-32 lg:pb-40 overflow-clip"`.
- Foto: `div.mx-auto max-w-[90rem] md:px-10` › `<Revelar variante="zoom" className="relative aspect-[3/2] overflow-hidden md:aspect-[21/9] md:rounded-3xl">` › `Image equipeGrupo fill sizes="(max-width:1440px) 100vw, 1440px" className="object-cover object-[50%_40%]"`. Sem overlay.
- Container `mt-14 md:mt-20` › `grid gap-x-8 gap-y-10 lg:grid-cols-12`:
  - `lg:col-span-3`: `<Trilho numero="06" />` (sem rótulo);
  - `<Revelar className="lg:col-span-8 lg:col-start-5">`: `<h2>` `fechamento.titulo` `max-w-[22ch] text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance`; `<p>` `fechamento.paragrafo` `mt-6 max-w-[58ch] …` muted; `div.mt-10 flex flex-col gap-3 sm:flex-row`:
    - `Button asChild size="lg" className="h-14 px-8 text-base shadow-gold w-full sm:w-auto"` › `<Link href="/site5/profissionais">` `fechamento.botao` + ArrowRightIcon;
    - `Button asChild variant="outline" size="lg" className="h-14 px-6 text-base w-full sm:w-auto"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` glifo WhatsApp + `home.contato.botao` + `<span className="sr-only"> (abre em nova aba)</span>`.

## 8. `src/app/site5/sobre-nos/page.tsx`
Monta os 7 blocos na ordem. `metadata`: `title: "Sobre nós"`, `description: sobre.hero.subtitulo`, `robots` noindex, `openGraph` com `sobre.hero.titulo`/subtítulo e imagem `fotosEspaco.recepcaoAtendimento`. Tudo Server Component, exceto `Revelar`.

## 9. Resolvido pelo orquestrador
- "Desde de outubro/2007" corrigido para "Desde outubro/2007" em `conteudo.ts` (erro de digitação).
- Trilho 06 sem rótulo; teto do clamp do H1 reduzido para `2.625rem` (2 linhas em 1024–1920).
- `glifos.tsx` vem da home.

## 10. Checklist
Matriz 320/375/768/1024/1280/1920. Atenção: H1 Trajan na coluna 5/12 em 1024/1280; `pl/pr-[max(...)]` dos blocos 1 e 3 em 1920; foto de apoio do bloco 6 em 1024; `min-w-0` nos filhos de grid. Um h1, um shadow-gold, uma superfície gold. Zero hex. Nada depende de hover. Reduced-motion mostra tudo.
