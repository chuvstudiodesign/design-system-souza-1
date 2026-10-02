# Profissionais V3 `/site5/profissionais/v3` — "Diretório" (art-director, 24/09/2026)

Mesma língua das specs 01–04. Arquivos em `src/components/site5/profissionais-v3/`. Rota `src/app/site5/profissionais/v3/page.tsx`. Texto palavra por palavra de `profissionaisIntro`, `profissionais`, `rotuloPapel`, `home.contato` e `fotosEspaco` (`src/lib/site5/conteudo.ts`).

## Por que existe esta versão

**Ideia da V3 em uma frase:** a página funciona como o diretório de um escritório. Primeiro um mural com as cinco advogadas lado a lado, em que o visitante escolhe por rosto e nome. Depois, uma ficha-cartão completa para cada uma, todas com o mesmo desenho, e um caminho de volta ao mural.

Como se diferencia:
- **Da V1:** o hero deixa de ser tipográfico com rostos em círculo pequenos. Vira um **mural de retratos em pé, centrado**, que é o elemento dominante da primeira tela. A introdução sai do muted sem imagem e vai para uma **dobra navy com a foto das sócias atravessando a borda** para a seção seguinte. As fichas deixam de ser linhas soltas com retrato flutuante: são **cartões fechados**, com a foto encostada na borda do cartão, na altura total. O fecho troca o navy com foto contida pela **foto sangrada** da home.
- **Da V2:** tudo aqui é contido no container (cartões, mural, foto de grupo); não há dobra por pessoa, a foto não alterna de lado e a introdução não é dourada. A V2 é galeria; a V3 é consulta.
- **Gramática da home:** trilho numerado 01–03 (`Trilho`), introdução em trilho 3/12 + conteúdo 8/12 a partir da coluna 5 (`Manifesto`), superfície navy (`Vozes`), fecho com foto sangrada e texto alinhado ao container por `calc` (`Fecho`), com o mesmo lado da home (foto à direita).

## 0. Decisões gerais

| # | Bloco | Arquivo | Superfície | Composição | Foto | Trilho |
|---|---|---|---|---|---|---|
| 1 | Abertura + mural | `abertura.tsx` + `mural.tsx` | base | H1 e subtítulo centrados; mural de 5 retratos 3:4 em 5 colunas | 5 retratos (principais) | — |
| 2 | Introdução | `introducao-navy.tsx` | **navy** | trilho 3/12 + H2 e lead 8/12; foto de grupo 12/12 atravessando a borda inferior | `fotosEspaco.equipeGrupo` | 01 |
| 3 | Fichas | `fichas.tsx` + `ficha.tsx` + `retratos.ts` | muted | 5 cartões de largura total: foto 5/12 encostada + texto 7/12 | 3 principais + associadas em `-2` | 02 "Perfis" |
| 4 | Contato | `fecho-profissionais.tsx` | base + foto sangrada, `py-0` | texto 6/12 à esquerda · foto sangrada 6/12 à direita | `fotosEspaco.recepcaoFrontal` | 03 |

- Ritmo: base → navy → muted → base. Navy uma vez, no ponto em que a página muda de "quem" para "como trabalham juntas".
- **Server Components** em todos os arquivos. Nenhum `"use client"` novo; só o `Revelar`.
- Âncoras (requisito duro): cada ficha é `<article id={p.slug} aria-labelledby={`nome-${p.slug}`} className="scroll-mt-28 …">`. O mural é `<nav id="indice" className="scroll-mt-28">`. Sem `scroll-smooth`.
- Hierarquia: **um `h1`**. `h2`: título da introdução, "Perfis" (rótulo do trilho, `as="h2"`) e título do contato. `h3`: os 5 nomes nas fichas. No mural os nomes são texto de link, não heading.
- **Um `shadow-gold`** (CTA do fecho). **Um `rule-gold`** (abertura, centrado). Sem superfície gold nem estampa: nesta versão o dourado aparece só em numerais, filetes e no CTA.
- Pesos iguais: mesma célula de mural e mesmo cartão para as cinco, na ordem do documento.
- Rótulo do papel = `rotuloPapel[p.papel]`. Não exibir `desde`. Rótulos visíveis: `profissionaisIntro.sobretituloPerfis`, `home.contato.sobretitulo` e "Voltar ao índice" (UI aprovada nas specs de Serviços). **"Introdução" não aparece** (o trilho 01 não tem rótulo, como na V1).
- Fecho: `home.contato.titulo/paragrafo/botao` (literais do cliente, como na V1) e `home.areas.sobretitulo` no secundário.

### 0.1 Escala tipográfica da V3 (fechada)

| Nível | Uso | Classes |
|---|---|---|
| **Display** | H1 | `font-display uppercase text-[clamp(1.875rem,0.5rem+6vw,5rem)] leading-[0.95] tracking-normal hyphens-none text-center` |
| **H2** | título da introdução e do contato | `text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance` |
| **H3 nome** | nome na ficha | `text-[clamp(1.625rem,1.25rem+1.6vw,2.5rem)] leading-[1.1] font-medium tracking-tight text-balance` |
| **Lead** | subtítulo, parágrafo da introdução | `text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug text-pretty` |
| **Corpo** | bios, nomes no mural (+`font-medium`, `leading-snug`), parágrafo e canais do fecho, "Voltar ao índice" | `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed` (17 → 19px) |
| **Rótulo** | numeral (Trajan) e papel/sobretítulo | numeral `font-display text-sm tracking-[0.22em] text-gold-400` (`aria-hidden`); rótulo `text-sm tracking-[0.08em] uppercase` |

Nada abaixo de 17px além dos rótulos. Medida da bio `max-w-[60ch]`. Trajan só no H1 e nos numerais. **Não usar `hyphens-auto`.**

### 0.2 Imagens, CTAs, motion
- `next/image`, `quality={95}`, `fill`, `sizes` sempre com `(max-width: 1023px)`. `alt` dos retratos = `p.foto.alt` (também nas variações `-2`: mesma pessoa, mesmo papel). `alt` das fotos do espaço = `fotosEspaco.*.alt`.
- **LCP = mural** no desktop: `preload` só no 1º retrato do mural (Paula); os outros 4 com `loading="eager"`. Nenhuma outra imagem com preload.
- Foco do botão dourado: `focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
- Motion: abertura em cascata (`animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none`); células do mural com `Revelar asChild atraso={200 + i*70}`; introdução `Revelar` no texto e `variante="zoom"` na foto; fichas `Revelar asChild` no `<article>` inteiro (sem stagger interno, porque quem chega por âncora vê a ficha completa); fecho `Revelar` no texto, `zoom` na foto. Hover da foto no mural: `motion-safe:group-hover:scale-[1.03] transition-transform duration-500`, só como reforço.

---

## 1. Abertura + mural: `abertura.tsx` + `mural.tsx` (Server)

Elemento dominante: o mural de cinco retratos. O H1 centrado funciona como título sobre ele.

### `abertura.tsx`
- `<section aria-labelledby="titulo-profissionais" className="relative isolate bg-background">` › `Container className="pt-32 pb-20 md:pt-40 md:pb-24 lg:pt-44 lg:pb-28"`.
- `div.mx-auto flex max-w-3xl flex-col items-center text-center`:
  - `<h1 id="titulo-profissionais" className="Display">` `profissionaisIntro.titulo`;
  - `span aria-hidden className="rule-gold mt-8 block h-px w-24"`;
  - `<p>` `profissionaisIntro.subtitulo` Lead `mt-8 max-w-[44ch] text-foreground/90`.
- `<Mural className="mt-14 md:mt-16 lg:mt-20" />`.
- Motion: H1 → filete `delay-100` → subtítulo `delay-200`.

### `mural.tsx`
- `<nav id="indice" aria-labelledby="titulo-profissionais" className="scroll-mt-28">` › `<ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5 lg:gap-6">`.
  - Entre 640 e 1023 são 2 colunas: o 5º item `sm:col-span-2 lg:col-span-1` (linha cheia, sem órfão).
- `<li className="min-w-0">` › `<a href={`#${p.slug}`} className="group flex h-full items-center gap-4 rounded-2xl bg-card/60 p-2 pr-4 ring-1 ring-border transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none lg:flex-col lg:items-stretch lg:gap-0 lg:bg-transparent lg:p-0 lg:ring-0 lg:hover:bg-transparent">`:
  1. **Retrato** `span.relative block aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-border lg:aspect-[3/4] lg:w-full lg:rounded-2xl lg:shadow-md` › `Image src={p.foto.src} alt="" fill quality={95} sizes="(max-width: 1023px) 96px, (max-width: 1279px) 18vw, 232px" className={cn("object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none", enquadramento[p.slug].retrato)}`. `alt=""` porque o nome está no próprio link (como no sumário da V1). Usa as fotos **principais** e o `retrato` de `@/components/site5/profissionais/enquadramento`.
  2. **Texto** `span.min-w-0 flex-1 lg:mt-4 lg:flex lg:items-start lg:justify-between lg:gap-3`:
     - `span.min-w-0`: nome Corpo `block font-medium leading-snug text-balance` + papel `mt-1 block text-sm tracking-[0.08em] uppercase text-muted-foreground`;
     - `ArrowDownIcon aria-hidden className="size-5 shrink-0 text-muted-foreground group-hover:text-gold-400 group-focus-visible:text-gold-400 lg:mt-1"` **sempre visível** (no mobile fica na ponta direita da linha: `ml-auto`).
- Proporções reais: 1024 → células de ~170 px (retrato 170 × 227, nomes em 2–3 linhas); 1280 → ~221 px (221 × 294). Nomes alinhados pelo topo (`items-start`): o de uma linha e o de duas começam na mesma altura.
- Resolução: 232 px CSS → 464 px em DPR 2, com folga para as fotos de 1700 px ou mais.

## 2. Introdução: `introducao-navy.tsx` (Server)

Elemento dominante: a foto das sócias reunidas, que atravessa a borda inferior do navy e entra na seção das fichas. É a passagem entre a equipe como grupo ("atuação integrada") e cada pessoa.

- `Section surface="navy" size="lg" className="pb-0 md:pb-0 lg:pb-0"` (sem `overflow-clip`, porque a foto precisa vazar para baixo). `relative z-10` na foto.
- Container › `div.grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8`:
  - `lg:col-span-3`: `<Trilho numero="01" tom="navy" />` (sem rótulo).
  - `<Revelar className="min-w-0 lg:col-span-8 lg:col-start-5">`: `<h2 className="H2 max-w-[22ch]">` `profissionaisIntro.introTitulo`; `<p>` `profissionaisIntro.introParagrafo` Lead `mt-8 max-w-[56ch] text-navy-foreground/85`.
- Foto: `<Revelar variante="zoom" className="relative z-10 -mx-6 mt-14 aspect-[3/2] overflow-hidden shadow-2xl md:mx-0 md:mt-16 md:aspect-[2036/860] md:rounded-3xl md:ring-1 md:ring-navy-foreground/10 lg:mt-20 -mb-[clamp(4rem,9vw,9rem)]">` (dentro do Container, depois do grid) › `Image fotosEspaco.equipeGrupo fill quality={95} sizes="(max-width: 767px) 100vw, (max-width: 1023px) calc(100vw - 5rem), 1200px" className="object-cover object-[55%_35%] md:object-center"`.
  - No celular a foto vai de borda a borda em 3:2 (a proporção nativa de 2,37:1 deixaria as pessoas com ~160 px de altura). O recorte `55%` mantém Kelly e Paula inteiras e Angela quase inteira. No `md`+, proporção nativa, contida e arredondada.
  - **Limite de resolução:** a foto tem 2036 px. Contida em 1200 px CSS ela fica nítida em DPR 1,7. Por isso **nunca sangra** e o container não passa de `max-w-7xl`. É por isso também que ela não abre a página.
  - A parte vazada (`-mb-[clamp(4rem,9vw,9rem)]`) é compensada na seção seguinte (ver 3).

## 3. Fichas: `fichas.tsx` + `ficha.tsx` + `retratos.ts` (Server)

Elemento dominante: o cartão, sempre com o mesmo desenho, com foto à esquerda e texto à direita.

### `fichas.tsx`
- `Section surface="muted" className="py-0 md:py-0 lg:py-0"` › Container `className="pt-[calc(clamp(4rem,9vw,9rem)+4rem)] pb-20 md:pt-[calc(clamp(4rem,9vw,9rem)+5rem)] md:pb-28 lg:pb-32"` (o respiro de cima soma a parte da foto que invade).
- Cabeçalho `div.grid grid-cols-1 lg:grid-cols-12` › `lg:col-span-3`: `<Trilho numero="02" rotulo={profissionaisIntro.sobretituloPerfis} as="h2" />`.
- `<div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:gap-8 lg:gap-10">` com as 5 `<Ficha profissional={p} numero={i+1} />`.

### `retratos.ts`
`Record<slug, { src: string; width: number; height: number; posicao: string }>`, com classes por extenso:

| slug | arquivo | dimensões | `posicao` (ponto de partida, conferir em 375/1024/1280) |
|---|---|---|---|
| paula-faids | `p.foto.src` | 1707 × 2560 | `object-[50%_30%]` |
| angela-borba | `p.foto.src` | 1705 × 2560 | `object-[60%_30%]` |
| kelly-marques | `p.foto.src` | 1707 × 2560 | `object-[50%_12%]` |
| barbara-matoso | `/site5/equipe/barbara-matoso-2.webp` | 2384 × 4240 | `object-[50%_18%]` |
| flavia-almeida | `/site5/equipe/flavia-almeida-2.webp` | 2232 × 3969 | `object-[60%_45%]` |

- As associadas usam as variações `-2` (Bárbara de braços cruzados; Flávia sentada à mesa). Assim o cartão mostra uma foto diferente da que está no mural. As sócias só têm uma foto, e o recorte do cartão (mais largo, mais fechado no rosto) já a diferencia da célula 3:4 do mural.
- Na Flávia `-2` o rosto está a ~66% da largura e ~44% da altura; por isso o `y` é alto.

### `ficha.tsx`
`<Revelar asChild>` › `<article id={p.slug} aria-labelledby={`nome-${p.slug}`} className="scroll-mt-28 grid grid-cols-1 overflow-hidden rounded-3xl bg-card shadow-lg ring-1 ring-border lg:grid-cols-12 lg:min-h-[34rem]">`:

1. **Foto (1º no DOM)** `div.relative aspect-[4/3] min-w-0 sm:aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:min-h-full` › `Image src={r.src} alt={p.foto.alt} fill quality={95} sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 40vw, 500px" className={cn("object-cover", r.posicao)}`. Sem raio próprio: o `overflow-hidden rounded-3xl` do cartão arredonda os cantos externos e a foto encosta na borda.
2. **Conteúdo** `div.flex min-w-0 flex-col p-6 sm:p-8 lg:col-span-7 lg:p-12 xl:p-14`:
   - `div.flex items-center gap-4`: numeral Rótulo `aria-hidden` (`01`–`05`); traço `span aria-hidden className="h-px w-10 bg-gold-500/60"`; `<p className="Rótulo text-muted-foreground">` `rotuloPapel[p.papel]`.
   - `<h3 id={`nome-${p.slug}`} className="mt-5 H3 nome max-w-[20ch]">` `p.nome`.
   - `<p>` `p.bio[0]` Corpo `mt-6 max-w-[60ch] text-foreground/90 text-pretty`.
   - `<p>` `p.bio[1]` Corpo `mt-6 max-w-[60ch] border-l-2 border-gold-500/60 pl-5 text-muted-foreground text-pretty`. É o parágrafo "Desde …, integra a Souza & Souza…", marcado pelo filete lateral dourado em todas as fichas.
   - `<a href="#indice" className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-8 Corpo text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">` `ArrowUpIcon size-4 aria-hidden` + "Voltar ao índice".
- Foto **sempre à esquerda** (diretório: o olho encontra o nome no mesmo lugar nas cinco).
- Bio inteira, sem accordion, tabs, hover ou "leia mais".
- Medidas a 1280: cartão 1200 px; foto 500 px; texto 7/12 − padding ≈ 600 px (~60ch). Paula: ~13 + 3 linhas → cartão ~720 px, foto 500 × 720 (em pé). Angela: a mais curta, fica na altura mínima de 544 px (foto 500 × 544, quase quadrada, com rosto e busto). A 1024 o texto tem ~480 px: conferir a Paula.

## 4. Contato: `fecho-profissionais.tsx` (Server)

Elemento dominante: o botão de WhatsApp com halo dourado; a foto da recepção (balcão com a marca e a atendente) diz "é aqui que você é recebido".

Desenho do `Fecho` da home, com outra foto:
- `Section surface="base" className="overflow-clip py-0 md:py-0 lg:py-0"` › `div.grid grid-cols-1 lg:grid-cols-2`.
- **Texto (1º no DOM)** `<Revelar className="min-w-0 px-6 py-20 md:px-10 md:py-28 lg:py-32 lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">`:
  - `<Trilho numero="03" rotulo={home.contato.sobretitulo} className="lg:static" />` (sem sticky aqui: a coluna não rola ao lado de nada);
  - `<h2 className="mt-6 H2 max-w-[18ch]">` `home.contato.titulo`;
  - `<p>` `home.contato.paragrafo` Corpo `mt-6 max-w-[48ch] text-muted-foreground text-pretty`;
  - `div.mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap`:
    - `Button asChild size="lg" className="h-auto min-h-14 w-full px-8 py-3 text-base whitespace-normal shadow-gold sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `WhatsAppGlyph size-5` + `home.contato.botao` + sr-only " (abre em nova aba)";
    - `Button asChild variant="outline" size="lg" className="h-auto min-h-14 w-full px-6 py-3 text-base sm:w-auto"` › `<Link href="/site5/servicos">` `home.areas.sobretitulo` + `ArrowRightIcon`.
  - `<ul className="mt-8 border-t border-border pt-4 Corpo">`: `contato.whatsapps[0..1]` e `contato.telefoneFixo`, como no fecho da home (rótulo `w-28 text-muted-foreground`, link `min-h-11 font-medium`, sr-only nos `_blank`).
- **Foto (2º)** `<Revelar variante="zoom" className="relative aspect-[4/3] min-w-0 lg:aspect-auto lg:min-h-full">` › `Image fotosEspaco.recepcaoFrontal fill quality={95} sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-[50%_45%]"`.
  - `recepcaoFrontal` (2400 × 3593, vertical) ainda não aparece em nenhuma página: é vertical e preenche bem a meia coluna alta do desktop. 960 px CSS → 1920 px em DPR 2, dentro dos 2400. No celular, 4:3 com `object-[50%_45%]` mantém a marca e a atendente. **Conferir** se a atendente não sai do quadro em 4:3; se sair, `object-[60%_55%]`.

## 5. `src/app/site5/profissionais/v3/page.tsx`

`<Abertura /> <IntroducaoNavy /> <Fichas /> <FechoProfissionais /> <SeletorVersao base="/site5/profissionais" atual={3} />`.
`metadata`: `title: "Profissionais"`, `description: profissionaisIntro.subtitulo`, `robots: { index: false, follow: false }`, `openGraph` igual à V1 (`fotosEspaco.equipeGrupo`). Comentário de topo apontando para esta spec.

## 6. Mobile 375: como se lê

1. Sob o header: H1 "PROFISSIONAIS" centrado em uma linha → filete centrado → subtítulo centrado 19px (3 linhas).
2. **Mural como lista de contatos:** 5 linhas-cartão (retrato 96 × 120 à esquerda, nome 17–18px + papel, seta ↓ à direita), com cerca de 136 px cada e gap de 12 px. Cabem 3 a 4 na primeira tela abaixo do título, e um toque abre a ficha.
3. Navy: "01" → H2 28px → parágrafo 19px → foto das sócias **de borda a borda em 3:2** (375 × 250), descendo sobre o início da área cinza.
4. Muted: "02 · PERFIS" → 5 cartões de 327 px: foto 4:3 no topo (327 × 245) → numeral + papel → nome 26px → bio 17px → "Desde…" com filete dourado à esquerda → "Voltar ao índice" (44px).
5. Fecho: "03 · Entre em contato" → H2 → parágrafo → botão dourado largura total `min-h-14` → contornado → canais → foto da recepção 4:3 de borda a borda, fechando a página antes do rodapé.
- Entre 640 e 1023: mural em 2 colunas de linhas-cartão (a Flávia ocupa a linha inteira); cartões com foto 16:10; a foto de grupo em proporção nativa, contida.

## 7. Checklist

- Matriz 320/375/768/1024/1280/1920: H1 em 320; mural em 640 (5º item `col-span-2`), 1024 (nomes em até 3 linhas, sem estouro) e 1920 (células limitadas pelo container); a foto de grupo não passa de 1200 px CSS; a sobreposição navy→muted fica idêntica em 375 e 1280 (o `clamp` usado na margem negativa e no padding é o mesmo); cartões com `min-w-0` na coluna de texto.
- Âncoras: 5 fichas pelo mural e por URL com hash (`scroll-mt-28`, e o cartão inteiro aparece abaixo do header); "Voltar ao índice" leva ao mural.
- Um h1; h2 = introdução, "Perfis", contato; h3 = nomes. Um rule-gold, um shadow-gold, sem superfície gold. Zero hex, zero sombra ou raio arbitrário.
- Nada depende de hover (setas e links sempre visíveis; o zoom do retrato só com `motion-safe`). Reduced-motion. Sem JS a página é completa.
- Imagens: `quality={95}`, `sizes` com `(max-width: 1023px)`, preload só no 1º retrato do mural, `alt=""` só no mural (o nome está no link).
