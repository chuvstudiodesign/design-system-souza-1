# Profissionais `/site5/profissionais` — especificação de composição (art-director, 23/09/2026)

Mesma língua de `01-home.md` e `02-sobre-nos.md`. Arquivos em `src/components/site5/profissionais/`.

## 0. Decisões gerais

| # | Bloco | Arquivo | Superfície | Composição | Foto | Trilho |
|---|---|---|---|---|---|---|
| 1 | Hero | `hero-profissionais.tsx` (+ sumário) | base | H1 Trajan 8/12, subtítulo 4/12 embaixo; sumário com os 5 rostos em círculo | recorte do rosto | — |
| 2 | Introdução | `introducao.tsx` | muted | trilho 3 + texto 8 | — | 01 |
| 3 | Perfis | `perfis.tsx` + `perfil.tsx` + `enquadramento.ts` | base | 5 fichas iguais: retrato 4/12, texto 7/12 | 5 retratos 4:5 | 02 |
| 4 | Fechamento | `fechamento-profissionais.tsx` | navy | foto contida 6/12 à esquerda, texto+CTA 5/12 | `salaReuniaoFrontal` | 03 |

- **`Trilho`**: importar de `@/components/site5/trilho` (o orquestrador move de `sobre/trilho.tsx` para lá antes do build).
- Trajan só no H1 "PROFISSIONAIS" e nos numerais. Nomes em Inter.
- Corpo `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed`; lead `clamp(1.1875rem,1.1rem+0.4vw,1.375rem)`; medida 52–60ch.
- **Decisões do orquestrador sobre rótulos:** trilho 01 **sem rótulo** (só o numeral — "Introdução" é nome estrutural do documento, como "Fechamento" no Sobre). Trilho 02 com rótulo `profissionaisIntro.sobretituloPerfis` ("Perfis", adicionado em `conteudo.ts`). Trilho 03 com `home.contato.sobretitulo`.
- Pesos iguais para sócias e associadas; ordem do documento (Paula, Angela, Kelly, Bárbara, Flávia).
- Rótulo do papel = trecho literal da bio: `papel === "socia"` → "sócia e advogada"; `"associada"` → "associada e advogada" (minúsculas no DOM, `uppercase` via CSS). Não exibir `desde` à parte.
- Motion: `Revelar`; hero em cascata `animate-in … motion-reduce:animate-none`; fotos `variante="zoom"`.
- Imagens: `next/image` com `sizes`, sem preload/priority (LCP é o H1). Alt de `profissionais[i].foto.alt`; no sumário `alt=""` (nome ao lado). `rule-gold` uma vez (hero).

## 1. Hero — `hero-profissionais.tsx`
Tipográfico e funcional (sem foto de ambiente — as protagonistas são as pessoas, no bloco 3).
- `<section className="relative isolate bg-background">` › `Container` `pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24`.
- `div.grid gap-y-8 lg:grid-cols-12 lg:gap-x-8 lg:items-end`:
  - `<h1 id="titulo-profissionais">` `profissionaisIntro.titulo` `lg:col-span-8 font-display uppercase text-[clamp(2.25rem,1rem+5.5vw,5.5rem)] leading-[0.95] tracking-normal hyphens-none` (se estourar em 320, mínimo `2.125rem`);
  - `div.lg:col-span-4 lg:col-start-9 lg:pb-3`: `<p>` `profissionaisIntro.subtitulo` lead `max-w-[34ch] text-foreground/90 text-pretty` + `span aria-hidden rule-gold block h-px w-24 mt-8`.
- Sumário: `<nav aria-labelledby="titulo-profissionais" className="mt-14 border-t border-border pt-8 lg:mt-20">` › `<ul className="grid gap-1 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 lg:gap-6">`; cada `<li>` › `<a href={`#${p.slug}`} className="group flex min-h-16 items-center gap-4 rounded-2xl p-2 -mx-2 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex-col lg:items-start lg:gap-4">`:
  - rosto `span.relative size-16 shrink-0 overflow-hidden rounded-full ring-1 ring-border lg:size-24` › `Image fill alt="" sizes="(min-width:1024px) 192px, 128px" className={cn("object-cover", enquadramento[slug].rosto)}`;
  - `span.min-w-0`: nome `block text-[1.0625rem] font-medium leading-snug text-balance` + rótulo `mt-1 block text-sm tracking-[0.08em] uppercase text-muted-foreground`.
- Não usar `Avatar` do shadcn (sem next/image nem object-position).
- Motion: H1 `animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700`; subtítulo+filete `delay-150`; cada li `Revelar asChild atraso={250 + i*70}`.

## 2. Introdução — `introducao.tsx`
- `Section surface="muted" size="md"` › Container › `grid gap-x-8 gap-y-10 lg:grid-cols-12`.
- `lg:col-span-3`: `<Trilho numero="01" />` (sem rótulo — se a API exigir `rotulo`, torná-lo opcional).
- `<Revelar className="min-w-0 lg:col-span-8 lg:col-start-5">`: `<h2>` `introTitulo` `max-w-[22ch] text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance`; `<p>` `introParagrafo` lead `mt-8 max-w-[56ch] leading-snug text-foreground/90 text-pretty`.

## 3. Perfis — `perfis.tsx` + `perfil.tsx` + `enquadramento.ts`
- `Section surface="base" size="md"` › Container. Cabeçalho `grid lg:grid-cols-12` › `lg:col-span-3` `<Trilho numero="02" rotulo={profissionaisIntro.sobretituloPerfis} as="h2" />`.
- `<div className="mt-12 lg:mt-16">` com os 5 `<Perfil>`.
- `perfil.tsx`: `<article id={slug} aria-labelledby={`nome-${slug}`} className="scroll-mt-28 grid gap-y-6 border-t border-border py-12 md:py-16 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-0 lg:py-20 last:pb-0">`:
  1. Cabeçalho (1º no DOM) `<Revelar className="min-w-0 lg:col-span-7 lg:col-start-6 lg:row-start-1">`: `<p className="text-sm tracking-[0.08em] uppercase text-gold-400">` rótulo; `<h3 id={`nome-${slug}`} className="mt-3 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.15] font-medium tracking-tight text-balance">` nome.
  2. Retrato (2º) `<Revelar variante="zoom" className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-border lg:col-span-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-start">` › `Image fill sizes="(max-width:1024px) min(28rem,100vw), 30vw" className={cn("object-cover", enquadramento[slug].retrato)}`.
  3. Bio (3º) `<Revelar atraso={80} className="min-w-0 max-w-[60ch] space-y-5 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:mt-6">`: `bio[0]` corpo `text-foreground/90 text-pretty`; `bio[1]` corpo `text-muted-foreground text-pretty`.
- Bios inteiras, sem accordion/hover/"leia mais". Sem sticky. `fotoProvisoria` não muda nada.
- `enquadramento.ts`: `Record<slug, { retrato: string; rosto: string }>` com classes por extenso. Pontos de partida (conferir visualmente em 375 e 1280 — nunca cortar o topo da cabeça):

| slug | `retrato` | `rosto` |
|---|---|---|
| paula-faids | `object-[50%_15%]` | `object-[50%_0%] scale-[2] origin-[55%_30%]` |
| angela-borba | `object-[50%_25%]` | `object-[50%_0%] scale-[2.2] origin-[64%_46%]` |
| kelly-marques | `object-[50%_20%]` | `object-[50%_0%] scale-[2.2] origin-[57%_38%]` |
| barbara-matoso | `object-[50%_15%]` | `object-[50%_0%] scale-[1.8] origin-[50%_37%]` |
| flavia-almeida | `object-[50%_18%]` | `object-[50%_0%] scale-[2] origin-[61%_44%]` |

Usar as versões principais (não `-2`).

## 4. Fechamento — `fechamento-profissionais.tsx`
- `Section surface="navy" size="lg" className="overflow-clip"` › Container › `grid gap-y-12 lg:grid-cols-12 lg:gap-x-8 lg:items-center`.
- Texto (1º no DOM) `<Revelar className="min-w-0 lg:col-span-5 lg:col-start-8">`: `<Trilho numero="03" rotulo={home.contato.sobretitulo} tom="navy" />`; `<h2>` `home.contato.titulo` `mt-6 max-w-[20ch] text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance`; `<p>` `home.contato.paragrafo` corpo `mt-6 max-w-[48ch] text-navy-foreground/75 text-pretty`; `div.mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap`:
  - `Button asChild size="lg" className="h-14 w-full px-8 text-base shadow-gold sm:w-auto"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `WhatsAppGlyph className="size-5"` + `home.contato.botao` + sr-only " (abre em nova aba)";
  - `Button asChild variant="outline" size="lg" className="h-14 w-full border-navy-foreground/30 bg-transparent px-6 text-base text-navy-foreground hover:bg-navy-foreground/10 sm:w-auto"` › `<Link href="/site5/servicos">` `home.areas.sobretitulo` + ArrowRightIcon.
- Foto (2º) `<Revelar variante="zoom" className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-navy-foreground/10 lg:order-first lg:col-span-6 lg:row-start-1">` › `Image fotosEspaco.salaReuniaoFrontal fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-[50%_55%]"` (confirmado: é a IMG_3962).

## 5. `src/app/site5/profissionais/page.tsx`
Hero → Introdução → Perfis → Fechamento. `metadata`: `title: "Profissionais"`, `description: profissionaisIntro.subtitulo`, `robots` noindex, `openGraph` com `fotosEspaco.equipeGrupo` (só OG).

## 6. Checklist
Matriz 320/375/768/1024/1280/1920: H1 em 320 e 1024; sumário em sm e lg; grade das fichas em 1024; `min-w-0`. Um h1; h2 = título da Introdução, "Perfis", título do fechamento; nomes h3. Um shadow-gold, um rule-gold, sem gold surface. Zero hex. Nada depende de hover. Reduced-motion. `scroll-mt-28` nas âncoras.
