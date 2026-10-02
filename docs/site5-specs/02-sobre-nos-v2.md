# Sobre nós — V2 "Revista" `/site5/sobre-nos/v2` — especificação de composição (art-director, 24/09/2026)

Segunda composição da página Sobre nós, para o cliente comparar com a V1 (`02-sobre-nos.md`). Mesmo sistema da home v5 (`01-home.md`): superfícies base/muted/gold/navy, numeração de seção em Trajan, `Sobretitulo`, `rule-gold`, estampa, `Revelar`. Mesmo texto, palavra por palavra, importado de `sobre` em `src/lib/site5/conteudo.ts`. Muda a **diagramação**.

**Ideia da V2:** a página é diagramada como uma matéria de revista. Capa com foto sangrada e título sobre a imagem; abertura de texto com capitular; foto em díptico de página inteira; uma frase em página cheia; um índice tipográfico; foto sangrada com texto em cartão sobreposto; contracapa centrada. A foto real é protagonista — ocupa a largura da tela três vezes.

## 0. Decisões gerais

| # | Bloco | Arquivo (`src/components/site5/sobre-v2/`) | Superfície | Composição | Foto (`fotosEspaco`) | Nº |
|---|---|---|---|---|---|---|
| 1 | Capa | `capa.tsx` | base + foto sangrada | foto de tela cheia, título sobre a foto; parágrafo abaixo em 6/12 à direita | `recepcaoAmpla` | — |
| 2 | Apresentação | `apresentacao.tsx` | muted | H2 largo; coluna de matéria 7/12 com capitular + coluna lateral 4/12 com filete | — | 01 |
| 3 | Nossa experiência | `experiencia.tsx` | base | cabeçalho 5/12 + texto 6/12; díptico largo 5/7 abaixo | `equipeSalaApoio` + `salaEquipe` | 02 |
| 4 | Nosso propósito | `proposito.tsx` | **gold** (única) | frase em página cheia, sem coluna lateral; estampa 02 à direita | — | 03 |
| 5 | Nossos valores | `valores.tsx` | navy | rótulo + foto vertical 4/12 (lg) / índice em uma coluna 7/12 | `salaEspera` (lg+) | 04 |
| 6 | Nosso diferencial | `diferencial.tsx` | base, `py-0` no topo | foto sangrada 16:9 + cartão sobreposto 7/12 à direita | `recepcaoMarcaDetalhe` | 05 |
| 7 | (fecho da página) | `fechamento.tsx` | muted | contracapa: texto centrado + foto panorâmica larga abaixo | `equipeGrupo` | 06 |

Ritmo de superfície: base (foto) → muted → base → gold → navy → base (foto) → muted. Nunca duas iguais seguidas.

Fotos: nenhuma das cinco da V1 é repetida, exceto `equipeGrupo` — é a única foto de equipe reunida e a ponte natural para "Conheça nossos profissionais"; aqui ela recebe tratamento diferente (contracapa centrada, abaixo do texto). `fachada*` fica com a home.

### 0.1 Escala tipográfica da V2 (única — não usar outro tamanho)

| Nível | Uso | Classes |
|---|---|---|
| **Display** | H1 da capa | `font-display uppercase text-[clamp(1.875rem,0.9rem+4.6vw,5.25rem)] leading-[1.02] tracking-[0.01em]` |
| **Destaque** | frase do Propósito | `text-[clamp(1.875rem,1.1rem+3vw,3.75rem)] leading-[1.14] font-medium tracking-tight text-balance` |
| **H2 frase** (Inter) | títulos que são frase: Apresentação, fecho | `text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance` |
| **H2 capitular** (Trajan) | títulos curtos: "Nossa experiência", "Nosso diferencial" | `font-display uppercase text-[clamp(1.625rem,1.1rem+2.2vw,2.75rem)] leading-[1.12] tracking-[0.01em] text-balance` |
| **Item de índice** | os 6 valores | `text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-tight font-medium tracking-tight text-balance` |
| **Lead** | só o subtítulo da capa | `text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug text-pretty` |
| **Corpo** | todo parágrafo | `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed text-pretty` (17 → 19px) |
| **Rótulo** | `Sobretitulo` (componente) e rótulo do fio | fio: numeral `font-display text-sm tracking-[0.22em]` + rótulo `text-sm tracking-[0.08em] uppercase` |

Regras: parágrafos do mesmo bloco têm o mesmo tamanho e a mesma cor (`text-foreground/85` em base/muted; `text-navy-foreground/85` no navy; `text-brand-950` no gold). Medida do corpo 52–60ch. Trajan só no H1, nos H2 capitulares, nos numerais e na capitular do bloco 2.

### 0.2 Componente local novo — `sobre-v2/fio.tsx`

O `Trilho` compartilhado empilha numeral e rótulo numa coluna lateral `sticky`; a V2 não tem coluna lateral (a numeração corre **na linha**, como fio de revista), por isso precisa de uma variante horizontal. Não altere `trilho.tsx`.

`Fio({ numero, rotulo?, as = "p" | "h2", tom = "escuro" | "gold" | "navy", alinhamento = "inicio" | "centro", className })`:
- `div.flex min-w-0 items-center gap-4` (`justify-center` quando `alinhamento="centro"`);
- numeral `<span aria-hidden className="font-display text-sm tracking-[0.22em]">`;
- traço `<span aria-hidden className="h-px w-12 shrink-0 md:w-20">` (escuro `bg-gold-500/60`; gold `bg-brand-950/40`; navy `bg-gold-500/60`);
- rótulo no elemento `as`, `text-sm tracking-[0.08em] uppercase` (escuro `text-muted-foreground`; gold `text-brand-900`; navy `text-navy-foreground/70`). Sem rótulo, o fio é numeral + traço (e, centrado, traço + numeral + traço).
- Cores do numeral: escuro/navy `text-gold-400`; gold `text-brand-950`.

### 0.3 Imagens, CTAs, motion
- Todas `next/image`, `quality={95}`, `sizes` sempre, `alt` de `fotosEspaco`. `preload` só na capa (LCP). Nada de `unoptimized` em foto (só na estampa SVG, como na home).
- Breakpoint: `lg` = 1024 → nos `sizes` usar `(max-width: 1023px)`.
- CTAs só no fecho: primário `sobre.fechamento.botao` → `/site5/profissionais` (único `shadow-gold`); secundário outline WhatsApp `home.contato.botao`. A capa não tem botão (o documento não tem).
- Motion: capa em cascata `animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700` + `motion-reduce:animate-none`; demais blocos `Revelar` (texto `subir`, fotos `zoom` exceto a da capa). Sob reduced-motion tudo aparece direto (resolvido em CSS pelo `Revelar`).
- Sobretítulos visíveis: "Sobre nós" (rótulo de `navegacao.ts`) e `sobre.apresentacao.sobretitulo`. **"Fechamento" não aparece em lugar nenhum.**

---

## 1. Capa — `capa.tsx`

**Ideia:** abrir como capa de revista — o espaço real do escritório em tela cheia, com o nome sobre a imagem.
**Dominante:** a foto `recepcaoAmpla` (balcão de mármore, poltronas e o painel com a marca).

Estrutura (Server Component):
- `<section className="relative isolate overflow-clip bg-background">` (o `main` tem `-mt-18`: a foto começa sob o header).
- Figura: `div.relative h-[max(36rem,86svh)] lg:h-[min(60rem,100svh)] w-full` › `Image src={fotosEspaco.recepcaoAmpla.src} alt={…alt} fill preload quality={95} sizes="100vw" className="object-cover object-[62%_45%] md:object-[55%_45%]"`.
  - Proteção do header: `div aria-hidden absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background/85 to-background/0`.
  - Véu de leitura: `div aria-hidden absolute inset-x-0 bottom-0 h-[72%] bg-linear-to-t from-background via-background/80 to-background/0` (lg: `lg:h-[62%]`).
- Texto sobre a foto: `div.absolute inset-x-0 bottom-0` › `Container className="pb-12 md:pb-16 lg:pb-20"` › `div.grid grid-cols-1 lg:grid-cols-12` › `div.min-w-0 lg:col-span-10`:
  - `<Sobretitulo>` "Sobre nós";
  - `<h1>` escala **Display**, `mt-6`. O título é renderizado em dois `span.block` partindo `sobre.hero.titulo` no último espaço ("Souza & Souza" / "Advocacia") — o texto não muda, só a quebra fica controlada; leitor de tela ouve a frase inteira;
  - `div aria-hidden className="rule-gold mt-8 h-px w-24"`;
  - `<p>` `sobre.hero.subtitulo` escala **Lead**, `mt-8 max-w-[40ch] text-foreground/90`.
- Abaixo da foto, ainda na mesma `<section>`: `Container className="pt-10 pb-20 md:pt-14 md:pb-28"` › `div.grid grid-cols-1 lg:grid-cols-12` › `<p>` `sobre.hero.paragrafo` **Corpo** `min-w-0 max-w-[56ch] text-foreground/85 lg:col-span-6 lg:col-start-7 lg:border-l lg:border-gold-500/40 lg:pl-8`. É o "olho" da matéria: sai do eixo do título e ancora à direita.

Superfície: base, o véu leva a foto até o fundo da página sem corte.
Motion: cascata no texto sobre a foto (Sobretitulo sem atraso, H1 `delay-100`, filete `delay-300`, subtítulo `delay-400`); parágrafo inferior `Revelar`. Foto estática.

**375:** foto ocupa ~86svh (mín. 36rem); H1 em duas linhas de 30px ("SOUZA & SOUZA" cabe em 327px com a escala mínima), filete, subtítulo em ~5 linhas sobre o véu escuro — tudo no primeiro viewport. Rolando, o parágrafo vem em largura total, sem filete lateral. Conferir 320: "SOUZA & SOUZA" a 30px em 272px — se quebrar, baixar o mínimo do clamp para `1.75rem` (não reduzir tracking).

## 2. Apresentação — `apresentacao.tsx`

**Ideia:** a abertura da matéria — a premissa do escritório lida como texto editorial, não como bloco de site.
**Dominante:** o H2 largo, seguido da capitular dourada.

- `Section surface="muted" size="lg"` › `Container`.
- `<Fio numero="01" rotulo={sobre.apresentacao.sobretitulo} />`.
- `<Revelar>` › `<h2>` `sobre.apresentacao.titulo` **H2 frase** `mt-8 max-w-[24ch]`.
- `div.mt-12 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-16 lg:grid-cols-12`:
  - Coluna de matéria `<Revelar className="min-w-0 lg:col-span-7">`: `paragrafos[0]` e `paragrafos[1]` em **Corpo** `max-w-[58ch] text-foreground/85`, o segundo `mt-6`. Capitular só no primeiro: `first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.4em] first-letter:leading-[0.82] first-letter:text-gold-400` (o "O" ocupa três linhas; é pseudo-elemento, o texto não muda).
  - Coluna lateral `<Revelar atraso={120} className="min-w-0 border-t border-gold-500/40 pt-8 lg:col-span-4 lg:col-start-9 lg:self-end lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">`: `paragrafos[2]` em **Corpo** `max-w-[40ch] text-foreground/85`.

Os três parágrafos no mesmo tamanho e cor; a hierarquia vem da capitular e da posição, não do corpo.
**375:** fio → H2 (≈4 linhas a 28px) → parágrafo com capitular → segundo parágrafo → filete dourado horizontal → terceiro parágrafo.

## 3. Nossa experiência — `experiencia.tsx`

**Ideia:** mostrar a equipe no trabalho real, em página dupla de revista.
**Dominante:** o díptico fotográfico largo.

- `Section surface="base" size="lg" className="overflow-clip"`.
- Cabeçalho: `Container` › `div.grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-12`:
  - `<Revelar className="min-w-0 lg:col-span-5">`: `<Fio numero="02" />` (sem rótulo); `<h2>` `sobre.experiencia.titulo` **H2 capitular** `mt-6`; `div aria-hidden rule-gold mt-6 h-px w-16`.
  - `<Revelar atraso={100} className="min-w-0 lg:col-span-6 lg:col-start-7 lg:pt-12">`: `paragrafos[0]`, `paragrafos[1]` (`mt-5`) em **Corpo** `max-w-[56ch] text-foreground/85`.
- Díptico: `Container width="wide" className="mt-14 md:mt-20"` › `div.grid grid-cols-12 gap-2 md:gap-3 h-[clamp(17rem,44vw,42rem)]`:
  - `<Revelar variante="zoom" className="relative col-span-5 min-w-0 overflow-hidden rounded-2xl md:rounded-3xl">` › `Image equipeSalaApoio fill quality={95} sizes="(max-width: 1023px) 42vw, min(38vw, 36rem)" className="object-cover object-[50%_62%]"` (vertical: as duas colaboradoras nas estações, cortado abaixo dos armários).
  - `<Revelar variante="zoom" atraso={120} className="relative col-span-7 min-w-0 overflow-hidden rounded-2xl md:rounded-3xl">` › `Image salaEquipe fill quality={95} sizes="(max-width: 1023px) 58vw, min(55vw, 52rem)" className="object-cover object-[58%_55%]"`.
  - O díptico mantém 5/7 em todas as larguras (é uma unidade visual; não empilha).

**375:** fio 02 → H2 → filete → dois parágrafos → díptico com 17rem de altura (≈133px + 186px de largura, 8px de vão), ambas as fotos cortadas em retrato: a da esquerda mostra as duas colaboradoras, a da direita a mesa com monitores. Não há texto sobre foto.

## 4. Nosso propósito — `proposito.tsx`

**Ideia:** o propósito como a frase da página — composto em corpo de página cheia, sem nada ao lado.
**Dominante:** a frase `sobre.proposito.paragrafo`.

- `Section surface="gold" size="lg" className="overflow-clip"`; cores fixas `brand-950`/`brand-900` (mesmo raciocínio do `manifesto.tsx`).
- Estampa: `Image src={brandAssets.pattern[2]} alt="" aria-hidden unoptimized width={4085} height={3154} data-estampa="proposito-v2" className="pointer-events-none absolute -right-[40%] -bottom-[35%] -z-10 w-[150vw] max-w-none lg:-right-[18%] lg:-bottom-[45%] lg:w-[80vw]"` + `<AjusteEstampa alvo="proposito-v2" rotulo="estampa propósito v2" padrao={…} />`. Tom sobre tom, sangrada; é a estampa 02 para não repetir a 01 do manifesto da home. Se competir com a frase na verificação, reduzir `w` antes de remover.
- `Container`:
  - `<Fio numero="03" rotulo={sobre.proposito.titulo} as="h2" tom="gold" />`;
  - `<Revelar duracao={800}>` › `<p>` `sobre.proposito.paragrafo` **Destaque** `mt-10 md:mt-14 max-w-[30ch] text-brand-950`.
- Diferença para a V1: não há coluna 3/12 com o trilho; o rótulo corre em linha e a frase ocupa a largura da página, maior.

**375:** fio com "NOSSO PROPÓSITO" em linha (cabe: numeral + traço 48px + rótulo ≈ 290px) → frase a 30px em ~11 linhas. Estampa cortada no canto inferior direito.

## 5. Nossos valores — `valores.tsx`

**Ideia:** os seis valores lidos como um índice — grandes, um por linha, numerados.
**Dominante:** a lista.

- `Section surface="navy" size="lg" className="overflow-clip"` › `Container` › `div.grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12`.
- Coluna esquerda `div.min-w-0 lg:col-span-4 lg:sticky lg:top-28 lg:self-start`:
  - `<Fio numero="04" rotulo={sobre.valores.titulo} as="h2" tom="navy" />`;
  - foto só em lg+: `<Revelar variante="zoom" className="relative mt-12 hidden aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-navy-foreground/15 lg:block">` › `Image salaEspera fill quality={95} sizes="(max-width: 1023px) 1px, 24rem" className="object-cover object-[50%_60%]"` (poltronas junto à janela; apoio, não protagonista). Carregamento lazy padrão: oculta em < lg, não baixa.
- `<ul className="min-w-0 lg:col-span-7 lg:col-start-6">`; cada valor `<Revelar asChild atraso={i * 70}><li className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-x-4 border-t border-navy-foreground/15 py-6 last:border-b md:grid-cols-[4rem_minmax(0,1fr)] md:py-7">`:
  - `<span aria-hidden className="font-display text-sm tracking-[0.22em] text-gold-400">` `String(i + 1).padStart(2, "0")`;
  - `<span>` valor **Item de índice** `text-navy-foreground`.
- Diferença para a V1: uma coluna (não grade de 3), numerada, com a foto como contraponto vertical.

**375:** fio 04 "NOSSOS VALORES" → seis linhas com numeral à esquerda e valor a 24px; "Responsabilidade Social" quebra em duas linhas dentro da coluna `1fr`. Sem foto.

## 6. Nosso diferencial — `diferencial.tsx`

**Ideia:** a proximidade no atendimento mostrada na recepção, com o texto pousado sobre a imagem como um cartão de revista.
**Dominante:** a foto `recepcaoMarcaDetalhe` (atendente diante do painel da marca).

- `Section surface="base" className="overflow-clip pt-0 pb-24 md:pt-0 md:pb-32 lg:pt-0 lg:pb-40"`.
- Foto sangrada: `<Revelar variante="zoom" className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-[min(46rem,82svh)]">` › `Image recepcaoMarcaDetalhe fill quality={95} sizes="100vw" className="object-cover object-[50%_35%] lg:object-[40%_40%]"`. Sem overlay (o cartão resolve a leitura).
- Cartão: `Container className="relative z-10 -mt-14 md:-mt-24 lg:-mt-56"` › `div.grid grid-cols-1 lg:grid-cols-12` › `<Revelar className="min-w-0 rounded-3xl bg-card p-7 shadow-2xl ring-1 ring-border md:p-12 lg:col-span-7 lg:col-start-6 lg:p-14">`:
  - `<Fio numero="05" />`;
  - `<h2>` `sobre.diferencial.titulo` **H2 capitular** `mt-6`;
  - `div aria-hidden rule-gold mt-6 h-px w-16`;
  - `paragrafos[0]`, `paragrafos[1]` (`mt-5`) em **Corpo** `max-w-[58ch] text-foreground/85`.
- No lg o cartão cobre o terço inferior direito da foto; a atendente e a marca ficam no terço esquerdo/central, livres (`object-[40%_40%]`). Verificar em 1024 e 1920 que o cartão não cobre o rosto.

**375:** foto 4:3 em largura total → cartão sobe 3,5rem sobre a foto, com 24px de margem lateral (Container), fio → H2 → filete → dois parágrafos.

## 7. Fecho da página — `fechamento.tsx`

**Ideia:** contracapa — a trajetória resumida numa coluna centrada, o convite para conhecer as pessoas, e as pessoas logo abaixo.
**Dominante:** o H2 centrado; a foto de grupo fecha a página.

- `Section surface="muted" size="lg" className="overflow-clip"`.
- `Container` › `<Revelar className="mx-auto max-w-3xl text-center">`:
  - `<Fio numero="06" alinhamento="centro" />` (sem rótulo — "Fechamento" não aparece);
  - `<h2>` `sobre.fechamento.titulo` **H2 frase** `mx-auto mt-8 max-w-[22ch]`;
  - `div aria-hidden rule-gold mx-auto mt-8 h-px w-24`;
  - `<p>` `sobre.fechamento.paragrafo` **Corpo** `mx-auto mt-8 max-w-[56ch] text-foreground/85`;
  - `div.mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center`:
    - `Button asChild size="lg" className="h-14 w-full px-8 text-base shadow-gold focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"` › `<Link href="/site5/profissionais">` `sobre.fechamento.botao` + `ArrowRightIcon aria-hidden`;
    - `Button asChild variant="outline" size="lg" className="h-14 w-full px-6 text-base sm:w-auto"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `<WhatsAppGlyph className="size-5" />` + `home.contato.botao` + `<span className="sr-only"> (abre em nova aba)</span>`.
- Foto: `Container width="wide" className="mt-16 md:mt-24"` › `<Revelar variante="zoom" className="relative mx-auto aspect-[3/2] max-w-[80rem] overflow-hidden rounded-2xl md:aspect-[21/9] md:rounded-3xl">` › `Image equipeGrupo fill quality={95} sizes="(max-width: 1023px) calc(100vw - 3rem), min(calc(100vw - 5rem), 80rem)" className="object-cover object-[56%_40%]"`. `max-w-[80rem]` porque o original tem 2036px — acima disso a foto amolece em tela 2x.

**375:** 06 entre traços → H2 centrado (~4 linhas) → filete → parágrafo centrado → botões empilhados em largura total (primário em cima) → foto 3:2 com o grupo inteiro (o corte lateral pega só painel e planta).

---

## 8. `src/app/site5/sobre-nos/v2/page.tsx`
- Monta `Capa`, `Apresentacao`, `Experiencia`, `Proposito`, `Valores`, `Diferencial`, `Fechamento` de `@/components/site5/sobre-v2/*`, e por último `<SeletorVersao base="/site5/sobre-nos" atual={2} />`.
- `metadata`: `title: "Sobre nós"`, `description: sobre.hero.subtitulo`, `robots: { index: false, follow: false }`, `openGraph` com `sobre.hero.titulo`/`sobre.hero.subtitulo` e imagem `fotosEspaco.recepcaoAmpla` (src/width/height/alt).
- Tudo Server Component; client só `Revelar` e `AjusteEstampa` (já existentes).

## 9. Checklist
- Um `<h1>` (capa). Um `shadow-gold` (fecho). Uma superfície gold. Zero hex, zero sombra/raio arbitrário.
- Corpo ≥ 17px em todo parágrafo; parágrafos de um mesmo bloco no mesmo tamanho e cor.
- Todo grid com `grid-cols-1` na base (exceto o díptico e as linhas do índice, que são fixos por desenho) e `min-w-0` nos filhos.
- `py-0` só via `pt-0/md:pt-0/lg:pt-0` no bloco 6.
- `sizes` com `(max-width: 1023px)`; `quality={95}`; `preload` só na capa.
- Nada depende de hover. Reduced-motion: capa sem cascata, `Revelar` mostra tudo.
- Matriz 320/375/768/1024/1280/1920. Pontos de atenção: H1 em 320; véu da capa em 768 (paisagem de tablet, foto mais baixa — o texto não pode subir além do véu); cartão do bloco 6 x rosto da atendente em 1024; díptico em 768 (alturas iguais); estampa do bloco 4 em 1920.
- Texto: conferir com o `souza-content-steward` contra `Site/paginas-v5/02-sobre-nos.md`.
