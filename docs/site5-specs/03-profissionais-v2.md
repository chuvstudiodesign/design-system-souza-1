# Profissionais V2 `/site5/profissionais/v2` — "Galeria" (art-director, 24/09/2026)

Mesma língua das specs 01–04. Arquivos em `src/components/site5/profissionais-v2/`. Rota `src/app/site5/profissionais/v2/page.tsx`. Texto palavra por palavra de `profissionaisIntro`, `profissionais`, `rotuloPapel` e `home.contato` (`src/lib/site5/conteudo.ts`).

## Por que existe esta versão

A V1 apresenta as cinco advogadas como fichas iguais numa única superfície: retrato 4/12 contido à esquerda, texto 7/12 à direita, separadas por filete. Funciona como lista; não dá a nenhuma delas a presença que o retrato pede.

**Ideia da V2 em uma frase:** cada advogada ganha uma dobra própria da página, com o retrato em escala editorial sangrando até a borda da tela e a bio ao lado, e as dobras alternam lado e superfície como as seções da home.

Como se diferencia:
- **Da V1:** a foto sai do container e ocupa 5/12 da **tela** de borda a borda, em altura de página. Cada pessoa é uma `<section>` com superfície própria (muted/base alternadas), não uma linha de lista. A foto troca de lado a cada dobra. Não há sumário com rostos: o índice é tipográfico.
- **Da V3:** a V2 não tem cartões, grade de retratos nem foto de grupo. É fotográfica e de borda a borda; a V3 é contida e funciona como diretório.
- **Gramática da home:** a abertura tipográfica corresponde ao hero; a introdução em superfície **dourada com estampa** é o `Manifesto`; as dobras com foto sangrada repetem o desenho do `Fecho` da home (grid de duas colunas, texto alinhado ao container por `calc`); o fecho em **navy** é o `Vozes`.

## 0. Decisões gerais

| # | Bloco | Arquivo | Superfície | Composição | Foto |
|---|---|---|---|---|---|
| 1 | Abertura | `abertura.tsx` | base | H1 7/12 + subtítulo; índice tipográfico dos 5 nomes em 5/12 | — |
| 2 | Introdução | `introducao-dourada.tsx` | **gold** + estampa 02 | H2 7/12 · lead 4/12 alinhado pela base | — |
| 3–7 | 5 dobras | `dobras.tsx` + `dobra.tsx` | muted, base, muted, base, muted | retrato sangrado 5/12 (esq., dir., esq., dir., esq.) + texto 7/12 | 5 retratos |
| 8 | Contato | `fecho-navy.tsx` | **navy** | H2 6/12 · texto + CTAs + canais 5/12 | — |

- Ritmo: base → gold → muted → base → muted → base → muted → navy. Nunca duas superfícies iguais seguidas. Gold e navy aparecem uma vez cada, nas duas pontas do bloco de perfis, e marcam o começo e o fim da galeria.
- **Server Components** em todos os arquivos. Nenhum `"use client"` novo; só o `Revelar` já existente.
- Âncoras (requisito duro): cada dobra é `<section id={p.slug} aria-labelledby={`nome-${p.slug}`} className="scroll-mt-28 …">`: `paula-faids`, `angela-borba`, `kelly-marques`, `barbara-matoso`, `flavia-almeida`. Sem `scroll-smooth`.
- Hierarquia: **um `h1`** (`profissionaisIntro.titulo`). `h2`: título da introdução, os 5 nomes (cada dobra é uma seção) e o título do contato. Sem h3.
- **Um `shadow-gold`** (CTA do fecho). **Um `rule-gold`** (abertura). **Uma superfície gold** (introdução).
- Ordem do documento: Paula, Angela, Kelly, Bárbara, Flávia. Sócias e associadas com o **mesmo peso**: mesma dobra, mesma altura mínima, mesma escala.
- Rótulo do papel = `rotuloPapel[p.papel]` (minúsculas no DOM, `uppercase` via CSS). Não exibir `desde` à parte. `fotoProvisoria` não muda nada.
- Textos: todos importados. Rótulos visíveis: `profissionaisIntro.sobretituloPerfis` ("Perfis") sobre o índice; `home.contato.sobretitulo` no fecho. **"Introdução" não aparece.** O fecho reaproveita `home.contato.titulo/paragrafo/botao` (literais do cliente, como na V1) e `home.areas.sobretitulo` no botão secundário (aprovado na V1).

### 0.1 Escala tipográfica da V2 (fechada: não usar outro tamanho)

| Nível | Uso | Classes |
|---|---|---|
| **Display** | H1 | `font-display uppercase text-[clamp(1.875rem,0.5rem+6vw,6rem)] leading-[0.95] tracking-normal hyphens-none` (mínimo igual ao da V1: cabe em 320) |
| **H2 nome** | nome em cada dobra | `text-[clamp(1.875rem,1.3rem+2.4vw,3.25rem)] leading-[1.08] font-medium tracking-tight text-balance` |
| **H2 seção** | título da introdução e do contato | `text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance` (a do `Manifesto`) |
| **Lead** | subtítulo da abertura, parágrafo da introdução | `text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug text-pretty` |
| **Corpo** | bios, nomes no índice (+`font-medium`), parágrafo e canais do fecho | `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)]`, com `leading-relaxed` em parágrafo e `leading-snug` em nome de índice (17 → 19px) |
| **Rótulo** | numeral (Trajan) e rótulo do papel / sobretítulos | numeral `font-display text-sm tracking-[0.22em] text-gold-400` (`aria-hidden`); rótulo `text-sm tracking-[0.08em] uppercase` |

Regras: nada abaixo de 17px além dos rótulos. Medida da bio `max-w-[60ch]`. Trajan só no H1 e nos numerais. Nomes em Inter, porque em Trajan maiúsculo, com 32 caracteres, ficariam ilegíveis. **Não usar `hyphens-auto`**: nomes e termos jurídicos quebram por palavra (`text-balance`/`text-pretty`, `break-words` só como rede).

### 0.2 Imagens, CTAs, motion
- `next/image` com `quality={95}`, `fill` e `sizes` sempre com `(max-width: 1023px)`. `alt` = `p.foto.alt`. **Sem `preload`/`priority`**: o LCP é o H1, e o primeiro retrato fica abaixo da dobra.
- Retratos: as versões principais (não `-2`). Enquadramento: reusar `enquadramento[slug].retrato` de `@/components/site5/profissionais/enquadramento` (não duplicar), com o ajuste de dobra da seção 3.
- CTA primário único da página: WhatsApp no fecho (`shadow-gold`). Os botões dourados levam `focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-<superfície>` (aqui, `ring-offset-navy`).
- Motion: abertura em cascata `animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none`. Nas demais, `Revelar`: retrato `variante="zoom"`; texto `variante="esquerda"` quando a foto está à direita e `"direita"` quando está à esquerda (o texto parece vir de trás da foto). Com reduced-motion tudo aparece direto (CSS do `Revelar`). Sem parallax, sem sticky.

---

## 1. Abertura — `abertura.tsx` (Server)

Elemento dominante: o H1 "PROFISSIONAIS" em Trajan, grande. Função: dizer em que página se está e oferecer os cinco nomes como atalhos.

- `<section aria-labelledby="titulo-profissionais" className="relative isolate bg-background">` › `Container className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-28"`.
- `div.grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8 lg:items-end`:
  - **Esq.** `min-w-0 lg:col-span-7`:
    - `<h1 id="titulo-profissionais" className="Display">` `profissionaisIntro.titulo`;
    - `span aria-hidden className="rule-gold mt-8 block h-px w-24 md:mt-10"`;
    - `<p>` `profissionaisIntro.subtitulo`, nível Lead, `mt-8 max-w-[40ch] text-foreground/90`.
  - **Dir.** `<nav aria-labelledby="rotulo-perfis" className="min-w-0 lg:col-span-5">`:
    - `<p id="rotulo-perfis" className="Rótulo text-muted-foreground">` `profissionaisIntro.sobretituloPerfis`;
    - `<ol className="mt-4 border-t border-border">`; cada `<li className="border-b border-border">` › `<a href={`#${p.slug}`} className="group grid min-h-16 grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-3 py-3 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none">`:
      - numeral Rótulo `aria-hidden` `01`…`05`;
      - `span.min-w-0`: nome Corpo `block font-medium leading-snug text-balance` + papel `mt-0.5 block text-sm tracking-[0.08em] uppercase text-muted-foreground`;
      - `ArrowDownIcon aria-hidden className="size-5 text-muted-foreground transition-transform group-hover:translate-y-0.5 group-hover:text-gold-400 group-focus-visible:text-gold-400 motion-reduce:transition-none"`, **sempre visível**.
- Sem foto. A abertura é tipográfica para o primeiro retrato ter impacto quando aparecer, logo abaixo do dourado.
- Motion: H1 → filete `delay-100` → subtítulo `delay-200` → nav `delay-300` (cascata com `motion-reduce:animate-none`).

## 2. Introdução — `introducao-dourada.tsx` (Server)

Elemento dominante: o H2 "Conhecimento técnico e atuação integrada" sobre o dourado. É a virada de superfície da página, a mesma do `Manifesto` da home.

- `Section surface="gold" size="lg" className="overflow-clip"`.
- Estampa: `Image src={brandAssets.pattern[2]} alt="" aria-hidden unoptimized width={4085} height={3154} data-estampa="profissionais-v2" className="pointer-events-none absolute -z-10 max-w-none …"`. A home e Serviços V2 usam a `estampa-1` pela esquerda; aqui entra a **estampa 2 pela borda direita**, com o monograma cortado pelo canto superior direito. Partir de `-top-[60%] -right-[70%] w-[140vw]` e ajustar olhando em 375 e 1280. Sem `AjusteEstampa`.
- Container › `div.grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8 lg:items-end`. **Cores fixas** (o dourado não aceita token semântico):
  - `<Revelar className="min-w-0 lg:col-span-7">` › `<h2 className="H2 seção max-w-[18ch] text-brand-950">` `profissionaisIntro.introTitulo`.
  - `<Revelar atraso={80} className="min-w-0 lg:col-span-4 lg:col-start-9 lg:pb-2">` › `<p>` `profissionaisIntro.introParagrafo` Lead `max-w-[44ch] text-brand-900`.
- Sem trilho numerado: os numerais desta versão pertencem às pessoas (01–05), e um "01" aqui colidiria com o "01" da Paula.
- Sem botão.

## 3. As cinco dobras: `dobras.tsx` + `dobra.tsx` (Server)

`dobras.tsx` só mapeia: `profissionais.map((p, i) => <Dobra key={p.slug} profissional={p} numero={i + 1} lado={i % 2 === 0 ? "esquerda" : "direita"} superficie={i % 2 === 0 ? "muted" : "base"} />)`.

### `dobra.tsx`

Elemento dominante: o retrato, em altura de página.

`<Section id={p.slug} aria-labelledby={`nome-${p.slug}`} surface={superficie} className="scroll-mt-28 overflow-clip py-0 md:py-0 lg:py-0">` › `div.grid grid-cols-1` +
- `lado="esquerda"`: `lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`
- `lado="direita"`: `lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]`

Sem `Container` no grid: a foto sangra até a borda da tela, e o texto se alinha ao container pelo mesmo `calc` do `Fecho` da home.

**1. Retrato (1º no DOM, abre a dobra no celular)**: `<Revelar variante="zoom" className={cn("relative aspect-[4/5] min-w-0 overflow-hidden lg:aspect-auto lg:min-h-[clamp(46rem,48vw,58rem)]", lado === "direita" && "lg:order-last")}>` › `<Image src={p.foto.src} alt={p.foto.alt} fill quality={95} sizes="(max-width: 1023px) 100vw, 42vw" className={cn("object-cover", enquadramento[p.slug].retrato)} />`.
- Sem `rounded` e sem `ring`: a foto é a própria parede da dobra. A borda entre uma dobra e a seguinte é a troca de superfície.
- Proporção real no lg: ~0,72 (1280) a ~0,87 (1920), um retrato em pé, nunca paisagem. Resolução: 5/12 de 1920 = 800 px CSS → 1600 px em DPR 2, dentro dos 1707 px das fotos das sócias.
- Enquadramento: `enquadramento[slug].retrato` serve em 375 (4:5) e em 1280. **Conferir em 1920**, onde o quadro fica mais largo e corta mais em cima e embaixo. Se algum topo de cabeça encostar na borda, criar `enquadramento-v2.ts` local só com a exceção (ponto de partida: `kelly-marques` → `object-[50%_10%]`; ela é a única de pé com o rosto a ~21% da altura).

**2. Texto (2º no DOM)**: `<Revelar variante={lado === "esquerda" ? "direita" : "esquerda"} className={cn("min-w-0 self-center px-6 pt-10 pb-16 md:px-10 md:pt-14 md:pb-20 lg:py-28", lado === "esquerda" ? "lg:pl-16 lg:pr-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] xl:pl-24" : "lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] xl:pr-24")}>`:
1. Linha de rótulo `div.flex items-center gap-4`: numeral Rótulo `aria-hidden` (`String(numero).padStart(2,"0")`); traço `span aria-hidden className="h-px w-10 bg-gold-500/60"`; `<p className="Rótulo text-muted-foreground">` `rotuloPapel[p.papel]`.
2. `<h2 id={`nome-${p.slug}`} className="mt-6 H2 nome max-w-[18ch]">` `p.nome`.
3. `<p>` `p.bio[0]`, Corpo `mt-8 max-w-[60ch] leading-relaxed text-foreground/90`.
4. `<p>` `p.bio[1]`, Corpo `mt-8 max-w-[60ch] border-t border-border pt-6 leading-relaxed text-muted-foreground`. É o parágrafo "Desde …, integra a Souza & Souza…" de todas as bios, sempre no mesmo lugar e com o mesmo filete: o olho aprende onde está.
- Bio inteira, sem accordion, hover ou "leia mais". Sem sticky.
- A 1280 a coluna de texto tem ~620 px úteis: a bio da Paula (a mais longa) dá ~12 linhas + 3, cerca de 640 px, abaixo da altura mínima da foto (736 px). Todas as dobras ficam com a mesma altura no desktop, e o texto se centraliza verticalmente.

## 4. Contato: `fecho-navy.tsx` (Server)

Elemento dominante: o botão de WhatsApp com halo dourado, sobre o navy.

- `Section surface="navy" size="lg"` › Container › `div.grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8 lg:items-end`.
- **Esq.** `<Revelar className="min-w-0 lg:col-span-6">`: `<p className="Rótulo text-navy-foreground/70">` `home.contato.sobretitulo`; `<h2 className="mt-6 H2 seção max-w-[18ch]">` `home.contato.titulo`.
- **Dir.** `<Revelar atraso={80} className="min-w-0 lg:col-span-5 lg:col-start-8">`:
  - `<p>` `home.contato.paragrafo` Corpo `max-w-[48ch] leading-relaxed text-navy-foreground/80`;
  - `div.mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap`:
    - `Button asChild size="lg" className="h-auto min-h-14 w-full px-8 py-3 text-base whitespace-normal shadow-gold sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `WhatsAppGlyph className="size-5"` + `home.contato.botao` + `<span className="sr-only"> (abre em nova aba)</span>`;
    - `Button asChild variant="outline" size="lg" className="h-auto min-h-14 w-full border-navy-foreground/30 bg-transparent px-6 py-3 text-base text-navy-foreground hover:bg-navy-foreground/10 sm:w-auto focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-navy"` › `<Link href="/site5/servicos">` `home.areas.sobretitulo` + `ArrowRightIcon`.
  - `<ul className="mt-8 border-t border-navy-foreground/15 pt-4 Corpo">`: `contato.whatsapps[0]`, `contato.whatsapps[1]` (rótulo = `rotulo`, `_blank` + sr-only) e `contato.telefoneFixo` (`tel:`). Cada `li` `flex flex-wrap items-baseline gap-x-3`: rótulo `w-28 shrink-0 text-navy-foreground/70` e link `inline-flex min-h-11 items-center font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`.
- Sem foto: a página já tem cinco retratos em escala grande, e um sexto disputaria com eles.

## 5. `src/app/site5/profissionais/v2/page.tsx`

`<Abertura /> <IntroducaoDourada /> <Dobras /> <FechoNavy /> <SeletorVersao base="/site5/profissionais" atual={2} />`.
`metadata`: `title: "Profissionais"`, `description: profissionaisIntro.subtitulo`, `robots: { index: false, follow: false }`, `openGraph` igual à V1 (`profissionaisIntro.titulo`, `fotosEspaco.equipeGrupo`, só no OG). Comentário de topo apontando para esta spec.

## 6. Mobile 375: como se lê

1. Sob o header: H1 "PROFISSIONAIS" em uma linha (~34px Trajan) → filete dourado → subtítulo 19px.
2. "PERFIS" e a lista de 5 linhas de ≥64px, cada uma com numeral, nome em 17–18px, papel e seta ↓. Um toque leva à dobra.
3. Dourado: H2 em 28px, 3 a 4 linhas → parágrafo 19px; o monograma da estampa corta o canto.
4. Cada dobra: **retrato de borda a borda em 4:5 (375 × 469)** → faixa de texto `px-6`: numeral + traço + papel → nome 30px (2 linhas) → bio 17px → filete → "Desde…". A troca muted/base marca a passagem entre as pessoas. A Paula ocupa ~1,3 tela de texto, as demais ~1.
5. Navy: sobretítulo → H2 → parágrafo → botão dourado largura total `min-h-14` → "Áreas de Especialização" contornado → canais em linhas de 44px.
- Entre 640 e 1023: igual ao celular, com `md:px-10`. O retrato continua 4:5 e de borda a borda (768 × 960: domina a tela, e é essa a intenção). O grid de duas colunas só entra no `lg`.

## 7. Checklist

- Matriz 320/375/768/1024/1280/1920: o H1 cabe em 320; nomes do índice não estouram (`min-w-0` no span); em 1024 a coluna de texto tem ≥ 480 px (conferir a bio da Paula); em 1920 os retratos não cortam cabeça e o texto fica no eixo do container (`calc`).
- Âncoras: os 5 links do índice por clique e por URL com hash; o nome aparece abaixo do header (`scroll-mt-28`). No celular a âncora cai no topo do retrato. É a intenção: rosto primeiro, nome logo abaixo.
- Um h1; h2 = introdução, 5 nomes, contato. Um rule-gold, um shadow-gold, uma superfície gold. Zero hex, zero sombra ou raio arbitrário.
- Nada depende de hover: setas sempre visíveis, hover só reforça. `motion-reduce` em toda animação e transição. Sem JS a página é completa.
- Retratos: `quality={95}`, `sizes` com `(max-width: 1023px)`, sem preload. Contraste da Rótulo `text-muted-foreground` sobre `muted/40` nos dois temas.
