# Serviços V2 `/site5/servicos/v2` — "Painéis" (art-director, 24/09/2026)

Mesma língua das specs 01–04. Arquivos em `src/components/site5/servicos-v2/`. Rota `src/app/site5/servicos/v2/page.tsx`.

## Por que existe esta versão

O que o cliente criticou na V1: bloco de título + texto corrido + lista à direita "tudo muito junto"; itens que quebram linha ao lado de itens que não quebram, cada linha com uma altura; espaçamento diferente de área para área; identidade que não conversa com a home.

**Ideia da V2 em uma frase:** cada área é um painel idêntico em estrutura — cabeçalho, grade de itens, rodapé —, e a grade é a mesma nas sete, então o olho aprende o desenho no primeiro painel e só lê conteúdo nos seis seguintes.

Como resolve:
- **Esqueleto único.** Todo painel tem as mesmas três faixas (cabeçalho 5/7 · itens · rodapé), separadas por filete. Descrição, itens e nota nunca dividem o mesmo espaço.
- **Itens em ladrilhos de altura igual** (grid com `auto-rows-fr`): um item que quebra em três linhas e outro de uma linha ocupam caixas do mesmo tamanho. A quebra deixa de ser visível como defeito de ritmo.
- **Linhas sempre cheias.** O número de colunas acompanha a contagem de itens (3 → 3 col., 4 → 4 col., 9 → 3×3). Nenhum ladrilho órfão no desktop.
- **Identidade da home:** índice em "cards de acesso" (o mesmo desenho dos botões Extrajudiciais/Diligências da home), numeral Trajan dourado grande, H2 em Inter medium na escala da home, fecho em superfície dourada com estampa (a mesma do `Manifesto`).

## 0. Decisões gerais

| # | Bloco | Arquivo | Superfície | Composição | Foto |
|---|---|---|---|---|---|
| 1 | Abertura + índice | `abertura.tsx` + `indice-cards.tsx` | base | H1 7/12 · lead + CTA 5/12; filete; índice em cards 4+3 | — |
| 2 | Catálogo | `catalogo.tsx` + `painel-area.tsx` | muted | 7 painéis empilhados, largura do container | — |
| 3 | Contato | `contato-dourado.tsx` | gold + estampa | H2 + texto + botão 7/12 · canais 4/12 | — |

- **Todos Server Components.** Nenhum `"use client"` novo (o `Revelar` já é client e é o único).
- **Sem fotografia.** A página é diagrama; a identidade vem de numeral, dourado e estampa. Foto só no OG.
- Âncoras (requisito duro): `<article id={slug}>` com `scroll-mt-28` para `previdenciario`, `trabalhista`, `tributario`, `civil`, `assessoria`, `extrajudiciais`, `diligencias`. Índice com `id="indice"` + `scroll-mt-28`. Sem `scroll-smooth`.
- Hierarquia: **um `h1`** (`servicosIntro.titulo`); `h2` = 7 nomes de área + título do contato. Sem h3.
- **Um `rule-gold`** (abertura). **Um `shadow-gold`** (CTA da abertura). **Uma superfície gold** (contato).
- Ordem das áreas: a do documento (`areas` como está).
- Textos: todos importados de `conteudo.ts` / `contato.ts`. Rótulos de UI já aprovados reaproveitados: "Voltar ao índice". Texto do contato reaproveita `home.contato.titulo` (aprovado na V1) e `home.contato.paragrafo` — **sinalizar ao orquestrador** que o parágrafo é da home (literal do cliente, mas de outra página). O botão usa `servicosIntro.botao` ("Entre em contato", o BOTÃO do documento de Serviços).

### Escala tipográfica (fechada — não usar nenhum outro tamanho)

| Nível | Uso | Classes |
|---|---|---|
| **Display** | H1 | `font-display uppercase text-[clamp(2rem,1.1rem+3.2vw,3.75rem)] leading-[1.04] tracking-[0.01em] text-balance hyphens-none` |
| **Numeral** | numeral da área no painel | `font-display text-[clamp(2.75rem,2rem+2.6vw,4.25rem)] leading-none text-gold-400` |
| **H2** | nome da área, título do contato | `text-[clamp(1.625rem,1.25rem+1.6vw,2.5rem)] leading-[1.1] font-medium tracking-tight text-balance` |
| **Lead** | parágrafo da abertura, descrição da área, parágrafo do contato | `text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug text-pretty` |
| **Corpo** | itens, nomes no índice (+`font-medium`), nota, canais, link "Voltar" | `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)]` — `leading-snug` em item/nome, `leading-relaxed` em nota |
| **Rótulo** | numerais pequenos (índice, ladrilho), sobretítulo | numeral: `font-display text-sm tracking-[0.22em] text-gold-400`; sobretítulo: `<Sobretitulo>` |

Nada abaixo de 17px exceto os rótulos Trajan (decorativos, `aria-hidden`) e o `<Sobretitulo>`.

## 1. Abertura — `abertura.tsx` (Server)

Dominante: o H1.

- `<section className="relative isolate bg-background">` › `Container className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24"`.
- `div.grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8 lg:items-end`:
  - Esq. `min-w-0 lg:col-span-7`: `<Sobretitulo>` rótulo do item "Serviços" lido de `navegacao.ts` (mesma técnica do `hero-sobre.tsx`); `<h1 className="mt-6 … Display … max-w-[16ch]">` `servicosIntro.titulo`.
  - Dir. `min-w-0 lg:col-span-5 lg:pb-2`: `<p>` `servicosIntro.paragrafo` Lead `max-w-[46ch] text-foreground/90`; `Button asChild size="lg" className="mt-8 h-14 w-full px-8 text-base shadow-gold sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `WhatsAppGlyph className="size-5"` + `servicosIntro.botao` + `<span className="sr-only"> (abre em nova aba)</span>`.
- `span aria-hidden className="rule-gold mt-14 block h-px w-full md:mt-16"` — filete na largura do container, separando "o que é" de "para onde ir".
- `<IndiceCards className="mt-10 md:mt-12" />`.
- Motion: cascata `animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none` — sobretítulo 0, H1 `delay-100`, coluna direita `delay-200`, filete `delay-300`. Índice: `Revelar` (sem atraso extra).

## 1b. Índice em cards — `indice-cards.tsx` (Server)

A ideia: os 4 "Direito …" formam a primeira fileira, os 3 serviços a segunda — linhas sempre cheias, e a divisão tem sentido.

- `<nav id="indice" aria-label="Índice das áreas de atuação" className="scroll-mt-28">` › `<ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">`.
- Cada `<li className="min-w-0">` com span por posição (i = índice 0–6):
  - i 0–3 → `lg:col-span-3`; i 4–6 → `lg:col-span-4`;
  - i 6 (7º, sobra ímpar em 2 colunas) → `sm:col-span-2 lg:col-span-4`.
- Link `<a href={`#${slug}`} className="group flex h-full min-h-16 items-center gap-4 rounded-2xl bg-card/40 px-5 py-4 ring-1 ring-border transition-colors hover:bg-card/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:transition-none lg:min-h-32 lg:flex-col lg:items-stretch lg:justify-between lg:p-6">`:
  - Linha de cima (`flex items-center justify-between gap-4 lg:w-full` — no mobile vira só o numeral à esquerda): numeral Rótulo `w-7 shrink-0` aria-hidden (`01`…`07`); `ArrowDownIcon` `size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-y-0.5 group-hover:text-gold-400 group-focus-visible:text-gold-400 motion-reduce:transition-none` — **sempre visível**; no mobile o ícone vai para a ponta direita (`order-last ml-auto` < lg).
  - Nome: `<span className="min-w-0 flex-1 lg:flex-none">` Corpo `font-medium leading-snug text-balance`.
  - No lg o nome fica colado embaixo (`justify-between`), então os 7 nomes alinham pela base em cada fileira. Nas larguras 3/12 e 4/12 nenhum nome quebra linha a 1280.
- Mesmo desenho (raio, `bg-card/40`, `ring-border`) dos cards de acesso da home — é o parentesco visual com a página base.

## 2. Catálogo — `catalogo.tsx` + `painel-area.tsx` (Server)

- `Section surface="muted" size="md"` › `Container` › `div.flex flex-col gap-6 md:gap-8` com `areas.map((a, i) => <PainelArea area={a} numero={i + 1} />)`.

### `painel-area.tsx` — o esqueleto que se repete

`<article id={slug} aria-labelledby={`titulo-${slug}`} className="scroll-mt-28 overflow-clip rounded-3xl bg-card shadow-sm ring-1 ring-border target:ring-2 target:ring-gold-500/60">` (o `target:` marca o painel de quem chega pela âncora da home — só CSS, sem hover).

**Faixa 1 — cabeçalho** `<Revelar className="grid grid-cols-1 gap-y-6 p-6 md:p-10 lg:grid-cols-12 lg:gap-x-8">`:
- Esq. `min-w-0 lg:col-span-5`: numeral Numeral `aria-hidden` (`padStart(2,"0")`); `<h2 id={`titulo-${slug}`} className="mt-4 … H2">` nome.
- Dir. `min-w-0 lg:col-span-7 lg:pt-1`: `<p>` descrição Lead `max-w-[52ch] text-foreground/90`.
- **Mesma coluna nos 7 painéis:** a descrição começa sempre no mesmo x, independentemente do tamanho do nome ou do texto. Topo alinhado (`items-start` implícito), nunca centralizado verticalmente.

**Faixa 2 — itens** `<div className="border-t border-border p-6 md:p-10">` › `<ul className={cn("grid grid-cols-1 auto-rows-fr gap-3 sm:grid-cols-2 lg:gap-4", colsLg)}>`:
- `colsLg = itens.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"` → Previdenciário/Trabalhista/Assessoria/Extrajudiciais 4 col.; Tributário/Diligências 3 col.; Civil 3×3.
- Em `sm` (2 col.) o último item de lista ímpar recebe `sm:col-span-2 lg:col-span-1`.
- Ladrilho `<li className="flex min-w-0 items-start gap-4 rounded-xl bg-background/50 p-4 ring-1 ring-border sm:min-h-36 sm:flex-col sm:gap-3 sm:p-5">`: numeral Rótulo `aria-hidden` `w-7 shrink-0 pt-0.5 sm:w-auto sm:pt-0` (`01`…) + `<span className="min-w-0">` item Corpo `leading-snug text-foreground`.
- `auto-rows-fr` + `min-h-36` = todos os ladrilhos da lista com a mesma altura; texto sempre ancorado no topo, logo abaixo do numeral. No mobile o ladrilho vira linha compacta (numeral à esquerda, texto à direita, altura pelo conteúdo, `auto-rows-fr` segura as linhas iguais dentro do painel).
- Ladrilho não é interativo: sem hover, sem cursor.
- **Sem stagger** — quem chega por âncora vê a grade inteira.

**Faixa 3 — rodapé** `<div className="flex flex-col gap-4 border-t border-border bg-muted/50 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-6">`:
- Se `area.nota`: `<p className="flex min-w-0 gap-4 max-w-[72ch]">` `InfoIcon` `size-5 shrink-0 mt-0.5 text-gold-400` aria-hidden + texto Corpo `leading-relaxed text-foreground/85`.
- Sempre: `<a href="#indice" className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start Corpo text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:self-center md:ml-auto">` `ArrowUpIcon size-4` aria-hidden + "Voltar ao índice".
- O rodapé existe nos 7 painéis (só com o link quando não há nota) — é o que mantém o esqueleto idêntico.

## 3. Contato — `contato-dourado.tsx` (Server)

Dominante: o H2 sobre o dourado — a mesma "virada de superfície" do `Manifesto` da home.

- `Section surface="gold" size="lg" className="overflow-clip"`.
- Estampa: `Image src={brandAssets.pattern[1]} alt="" aria-hidden unoptimized width={4085} height={3154} data-estampa="servicos-v2" className="pointer-events-none absolute -z-10 w-[156vw] max-w-none …"` — partir das classes de posição do `Manifesto` (`-bottom-[118.3%] -left-[108.3%]`) e ajustar olhando, para o monograma cortar pela borda esquerda. Sem `AjusteEstampa`.
- Container › `div.grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8 lg:items-end`. **Cores fixas** (dourado não aceita token semântico, ver `Manifesto`).
- Esq. `<Revelar className="min-w-0 lg:col-span-7">`: `<h2>` `home.contato.titulo` H2 `max-w-[20ch] text-brand-950`; `<p>` `home.contato.paragrafo` Lead `mt-6 max-w-[48ch] text-brand-900`; `Button asChild size="lg" className="mt-10 h-14 w-full bg-brand-950 px-8 text-base text-navy-foreground hover:bg-brand-900 focus-visible:ring-2 focus-visible:ring-brand-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-gold-400 sm:w-auto"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `WhatsAppGlyph size-5` + `servicosIntro.botao` + sr-only. **Sem `shadow-gold`** aqui (sumiria no dourado; o da página está na abertura).
- Dir. `<Revelar atraso={80} className="min-w-0 lg:col-span-4 lg:col-start-9">` › `<ul className="border-t border-brand-950/20 Corpo">`, cada `li` `flex flex-wrap items-baseline justify-between gap-x-4 border-b border-brand-950/20 py-3`: rótulo `text-brand-900` + link `inline-flex min-h-11 items-center font-medium text-brand-950 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-brand-950/70 focus-visible:outline-none`. Linhas: `contato.whatsapps[0]`, `contato.whatsapps[1]` (rótulo = `rotulo`, `_blank` + sr-only), `contato.telefoneFixo` (`tel:`). Sem endereço.

## 4. `src/app/site5/servicos/v2/page.tsx`

`<AberturaV2 /> <CatalogoV2 /> <ContatoDourado /> <SeletorVersao base="/site5/servicos" atual={2} />`.
`metadata`: `title: "Serviços"`, `description: servicosIntro.paragrafo`, `robots: { index: false, follow: false }`, `openGraph` igual à V1 (`servicosIntro.titulo`, `fotosEspaco.salaEstanteMesa`). Comentário de topo apontando para esta spec.

## 5. Mobile 375 — como se lê

1. Sob o header (72px): sobretítulo → H1 em 2 linhas ("ÁREAS DE ATUAÇÃO / JURÍDICA", 32px) → lead 19px → botão dourado largura total `h-14`.
2. Filete dourado na largura toda.
3. Índice: 7 cards-linha empilhados (`min-h-16`, gap 12px): `01  Direito Previdenciário  ↓`. Um toque leva ao painel.
4. Catálogo (muted): cada painel é um cartão de 327px com `p-6`: numeral 44px → H2 26px (quebra em até 2 linhas) → descrição 19px → filete → itens como linhas compactas em caixas (numeral à esquerda) → rodapé cinza com a nota (Previdenciário) e "Voltar ao índice".
5. Contato dourado: H2, parágrafo, botão escuro largura total, canais em linhas de 44px+.
Entre 640 e 1023: índice e itens em 2 colunas (ímpar fecha em `col-span-2`), cabeçalho do painel ainda empilhado.

## 6. Checklist

- Âncoras: os 6 links da home em 375 e 1280, por clique e por URL com hash; o painel de destino ganha o anel dourado (`:target`).
- A 1280: nenhum nome do índice quebra linha; em cada lista os ladrilhos têm altura idêntica; a descrição começa no mesmo x nos 7 painéis.
- 320: H1 cabe ("JURÍDICA" inteiro), ladrilhos não estouram (`min-w-0` no `li` e no `span`), rodapé empilha.
- Um h1; um rule-gold; um shadow-gold; uma superfície gold; zero hex, zero sombra/raio arbitrário.
- Nada depende de hover (setas sempre visíveis). `motion-reduce` em toda animação/transição. Sem JS a página é completa.
