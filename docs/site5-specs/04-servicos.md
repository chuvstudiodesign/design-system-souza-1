# Serviços `/site5/servicos` — especificação de composição (art-director, 23/09/2026)

Mesma língua das specs 01–03. Arquivos em `src/components/site5/servicos/`.

## 0. Decisões gerais

| # | Bloco | Arquivo | Superfície | Composição | Foto |
|---|---|---|---|---|---|
| 1 | Abertura + sumário | `hero-servicos.tsx` + `sumario-areas.tsx` | base | texto 5/12 esq.; sumário numerado das 7 áreas 7/12 dir. | — |
| 2 | Catálogo | `catalogo-areas.tsx` + `area.tsx` + `indice-lateral.tsx` (client) | muted | índice sticky 3/12 (lg+) + 7 fichas 8/12 a partir da col 5 | — |
| 3 | Contato | `contato-servicos.tsx` | navy | faixa: título+CTA 7/12, canais 4/12 | — |

- **Página de consulta: sem fotografia e sem trilho de seção.** Os numerais dourados 01–07 são das áreas. Sem estampa. Foto só no OG (`fotosEspaco.salaEstanteMesa`).
- Trajan: H1, numerais 01–07, H2 da faixa de contato. Resto Inter. Corpo `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed`; lead `text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug`. Nada < 17px, nem na navegação.
- Sobretítulo único: "Serviços" lido de `navegacao.ts`. Navs com `aria-label`, sem título visível.
- **Âncoras (requisito duro):** `<article id={slug}>` com `scroll-mt-28` para os 7 slugs (`previdenciario`, `trabalhista`, `tributario`, `civil`, `assessoria`, `extrajudiciais`, `diligencias`). Sem `scroll-smooth`.
- Um `rule-gold` (bloco 1), um `shadow-gold` (bloco 3). `h1` = `servicosIntro.titulo`; `h2` = 7 nomes + título da faixa. Sem h3.
- Motion: cascata no bloco 1; `Revelar` no catálogo; **sem stagger nos itens** (quem chega por âncora vê a lista inteira).
- **Aprovado pelo orquestrador:** rótulo de UI "Voltar ao índice"; H2 da faixa final reutiliza `home.contato.titulo`.

## 1. Abertura — `hero-servicos.tsx` + `sumario-areas.tsx` (Server)
- `<section className="relative isolate bg-background">` › `Container className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24"` › `div.grid gap-y-12 lg:grid-cols-12 lg:gap-x-8 lg:items-start`.
- Texto `min-w-0 lg:col-span-5`: `<Sobretitulo>` rótulo de `navegacao.ts`; `<h1>` `servicosIntro.titulo` `mt-6 font-display uppercase text-[clamp(2rem,1.1rem+3.2vw,3.75rem)] leading-[1.04] tracking-[0.01em] text-balance max-w-[14ch] hyphens-none` ("JURÍDICA" numa linha em 320; senão mínimo `1.875rem`); `span aria-hidden rule-gold mt-8 block h-px w-24`; `<p>` `servicosIntro.paragrafo` lead `mt-8 max-w-[44ch] text-foreground/90 text-pretty`.
- Sumário `min-w-0 lg:col-span-7 lg:col-start-6 lg:pt-2`: `<nav id="sumario" aria-label="Sumário das áreas de atuação" className="scroll-mt-28">` › `<ol className="grid sm:grid-flow-col sm:grid-rows-4 sm:gap-x-8">`; cada `<li className="min-w-0 border-t border-border">` (última com border-b; em sm fechar a coluna 1 no 4º) › `<a href={`#${slug}`} className="group flex min-h-14 items-center gap-4 rounded-lg px-2 -mx-2 py-3 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none">`: numeral `font-display text-xs tracking-[0.18em] text-gold-400 w-7 shrink-0` aria-hidden; nome `min-w-0 flex-1 text-[clamp(1.125rem,1.05rem+0.4vw,1.375rem)] leading-snug font-medium text-balance`; `ArrowDownIcon` `size-5 shrink-0 text-muted-foreground` sempre visível, hover/foco → `text-gold-400 translate-y-0.5`.
- Motion: sobretítulo `animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700`; H1 `delay-100`; filete `delay-200`; parágrafo `delay-300`; li `Revelar asChild atraso={300 + i*60}`; `motion-reduce:animate-none`.

## 2. Catálogo — `catalogo-areas.tsx` (Server) + `area.tsx` (Server) + `indice-lateral.tsx` (Client)
- `Section surface="muted" size="md" className="overflow-clip"` › Container › `div.grid gap-x-8 lg:grid-cols-12`: `<IndiceLateral className="hidden lg:block lg:col-span-3" />` + `<div className="min-w-0 lg:col-span-8 lg:col-start-5">` com `areas.map((a,i) => <Area area={a} numero={i+1} />)`.
- **`indice-lateral.tsx`** (único `"use client"`): `<nav aria-label="Índice das áreas" className="lg:sticky lg:top-28 lg:self-start">` › `<ol className="border-l border-border">`; cada `<a href={`#${slug}`} aria-current={ativa === slug ? "location" : undefined} className="-ml-px flex min-h-11 items-baseline gap-3 border-l-2 border-transparent py-2 pl-4 pr-2 text-[1.0625rem] leading-snug text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=location]:border-gold-500 aria-[current=location]:text-foreground motion-reduce:transition-none">` com numeral Trajan xs gold aria-hidden + nome. Scroll-spy com `IntersectionObserver` (`rootMargin: "-112px 0px -55% 0px"`, ativa = mais alta intersectando; inicial = `location.hash` válido ou a primeira). Sem JS funciona como lista de links.
- **`area.tsx`**: `<article id={slug} aria-labelledby={`titulo-${slug}`} className="scroll-mt-28 border-t border-border py-14 md:py-16 lg:py-20 first:pt-14 last:pb-0 target:border-gold-500/70">`:
  1. Cabeçalho `<Revelar>` `flex items-baseline gap-5`: numeral `font-display text-sm tracking-[0.22em] text-gold-400` aria-hidden (`padStart(2,"0")`); `<h2 id={`titulo-${slug}`} className="min-w-0 text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] leading-[1.1] font-medium tracking-tight text-balance">` nome.
  2. Corpo `<Revelar atraso={80} className="mt-8 grid gap-y-8 lg:grid-cols-8 lg:gap-x-8">`, com `longa = itens.length > 6` (hoje só Civil):
     - curta: descrição `min-w-0 lg:col-span-4` lead `max-w-[44ch] text-foreground/90 text-pretty`; `<ul>` `min-w-0 lg:col-span-4` uma coluna;
     - longa: descrição `min-w-0 lg:col-span-8` lead `max-w-[60ch]`; `<ul>` `min-w-0 lg:col-span-8 grid sm:grid-cols-2 sm:gap-x-8`;
     - `<li className="flex gap-4 border-t border-border py-4">`: `span aria-hidden mt-[0.72em] h-px w-5 shrink-0 bg-gold-500/70` + texto `min-w-0 text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-snug text-foreground`. Fechar cada coluna com border-b (sem linha solta).
  3. Nota (se `area.nota`): `<p className="mt-2 max-w-[62ch] border-l-2 border-gold-500/60 pl-5 text-[1.0625rem] leading-relaxed text-foreground/80 text-pretty lg:col-span-8">`, depois da lista, no mesmo grid.
  4. Só < lg: `<a href="#sumario" className="mt-8 inline-flex min-h-11 items-center gap-2 text-base text-muted-foreground underline-offset-4 hover:text-foreground hover:underline lg:hidden">` `ArrowUpIcon size-4` + "Voltar ao índice".
- Sem CTA por área.

## 3. Contato — `contato-servicos.tsx` (Server)
- `Section surface="navy" size="md"` › Container › `div.grid gap-y-10 lg:grid-cols-12 lg:gap-x-8 lg:items-end`.
- Esq. `<Revelar className="min-w-0 lg:col-span-7">`: `<h2>` `home.contato.titulo` `font-display uppercase text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-[1.15] tracking-tight text-balance max-w-[22ch]`; `Button asChild size="lg" className="mt-8 h-14 w-full px-8 text-base shadow-gold sm:w-auto"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `WhatsAppGlyph className="size-5"` + `servicosIntro.botao` + sr-only " (abre em nova aba)".
- Dir. `<Revelar atraso={80} className="min-w-0 lg:col-span-4 lg:col-start-9">` › `<ul className="border-t border-navy-foreground/15 text-[1.0625rem]">`, linhas `border-b border-navy-foreground/15 py-3`: "WhatsApp" + os dois `contato.whatsapps` (links _blank); `contato.telefoneFixo.rotulo` + `tel:`. Rótulos `text-navy-foreground/70`; links `inline-flex min-h-11 items-center underline-offset-4 hover:underline`. Sem endereço.

## 4. `src/app/site5/servicos/page.tsx`
Hero → Catálogo → Contato. `metadata`: `title: "Serviços"`, `description: servicosIntro.paragrafo`, `robots` noindex, `openGraph` com `servicosIntro.titulo` e `fotosEspaco.salaEstanteMesa`.

## 5. Checklist
- Âncoras: testar os 6 links da home (4 cards via diálogo "Ver em Serviços", 2 botões de acesso) em 375 e 1280, por navegação e por URL com hash direto.
- Um h1; um rule-gold; um shadow-gold; sem gold surface; zero hex.
- Matriz: 320 (H1, "JURÍDICA"); 640 (sumário 2 colunas grid-rows-4); 1024 (índice lateral, ficha curta 4/4); 1920. `min-w-0` em todo filho de grid.
- Nada depende de hover. Reduced-motion. Sem JS o índice funciona.
