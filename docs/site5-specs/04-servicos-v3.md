# Serviços V3 `/site5/servicos/v3` — "Capítulos" (art-director, 24/09/2026)

Mesma língua das specs 01–04. Arquivos em `src/components/site5/servicos-v3/`. Rota `src/app/site5/servicos/v3/page.tsx`.

## Por que existe esta versão

Crítica à V1: título, texto corrido e lista lado a lado "tudo muito junto"; linhas de alturas diferentes porque um item quebra e o vizinho não; espaçamento irregular entre áreas; identidade descolada da home.

**Ideia da V3 em uma frase:** cada área vira um capítulo de página inteira, construído exatamente com a gramática das seções da home — trilho à esquerda com numeral, conteúdo em 8/12 a partir da coluna 5, superfícies alternadas —, e a lista de itens é uma tabela de linhas de altura fixa.

Como resolve:
- **Uma área por seção, com fundo próprio.** As sete alternam `muted`/`base` de ponta a ponta, então a fronteira entre áreas é uma mudança de superfície, não um filete perdido no meio da coluna. Espaçamento idêntico (`Section size="md"`) em todas.
- **Leitura vertical, nunca lado a lado:** nome → descrição → itens → nota, cada um na largura da coluna de conteúdo. Nada de texto corrido disputando espaço com a lista.
- **Itens em tabela alinhada:** `grid` (não `columns`), então itens da mesma fileira compartilham altura e os filetes correm contínuos; `min-h` fixo dá o mesmo passo a toda linha, quebre o texto ou não. Colunas pela contagem (4 → 2×2, 3 → 3×1, 9 → 3×3): fileiras sempre cheias.
- **Identidade da home:** o trilho numerado (01, 02 … da home) vira o elemento dominante — numeral Trajan gigante, preso ao topo enquanto o capítulo rola. Índice em faixa com divisórias, o mesmo desenho da `FaixaNumeros`. Fecho com foto sangrada, o mesmo desenho do `Fecho` da home.

**Diferença radical para a V2:** V2 é contida (painéis-cartão sobre um fundo único, itens em caixas, fecho dourado, sem foto). V3 é de borda a borda (capítulos-seção, itens em linhas de tabela sem caixa, numeral gigante em trilho sticky, fecho com fotografia). **Para a V1:** a V1 tinha um índice lateral fixo e as áreas numa coluna só, na mesma superfície, com descrição e lista lado a lado; a V3 não tem índice lateral, dá a cada área uma superfície e empilha tudo.

## 0. Decisões gerais

| # | Bloco | Arquivo | Superfície | Composição | Foto |
|---|---|---|---|---|---|
| 1 | Abertura + índice | `abertura.tsx` + `faixa-indice.tsx` | base | H1 9/12; lead 6/12 deslocado; faixa de 7 colunas com divisórias | — |
| 2–8 | 7 capítulos | `capitulo.tsx` (×7) | muted, base, muted, base, muted, base, muted | trilho 3/12 (numeral sticky) + conteúdo 8/12 a partir da col. 5 | — |
| 9 | Contato | `fecho-servicos.tsx` | base + foto sangrada | foto 6/12 à esquerda, texto 6/12 | `fotosEspaco.salaEstanteMesa` |

- Superfícies: base → muted → base → … → muted → base. Nunca três iguais seguidas.
- **Todos Server Components.** Nenhum `"use client"` novo (só o `Revelar` existente).
- Âncoras (requisito duro): cada capítulo é `<section id={slug} aria-labelledby={`titulo-${slug}`} className="scroll-mt-28 …">` — `previdenciario`, `trabalhista`, `tributario`, `civil`, `assessoria`, `extrajudiciais`, `diligencias`. Índice `id="indice"` + `scroll-mt-28`. Sem `scroll-smooth`.
- Hierarquia: **um `h1`**; `h2` = 7 nomes + título do fecho. Sem h3.
- **Um `rule-gold`** (abertura). **Um `shadow-gold`** (CTA do fecho). Sem superfície gold nem estampa — o dourado aparece só nos numerais, no filete e no CTA.
- Textos importados de `conteudo.ts` / `contato.ts`. "Voltar ao índice" (aprovado). Fecho: `home.contato.sobretitulo`, `home.contato.titulo`, `home.contato.paragrafo` (literais do cliente, da home — **sinalizar ao orquestrador**) e botão `servicosIntro.botao`.

### Escala tipográfica (fechada)

| Nível | Uso | Classes |
|---|---|---|
| **Display** | H1 | `font-display uppercase text-[clamp(2.25rem,1rem+4.6vw,4.5rem)] leading-[1.02] tracking-[0.01em] text-balance hyphens-none` (mesma do H1 de Contato) |
| **Numeral** | numeral do capítulo | `font-display text-[clamp(3.5rem,2.2rem+5vw,7.5rem)] leading-[0.85] text-gold-400` |
| **H2** | nome da área, título do fecho | `text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance` (a do `Manifesto` da home) |
| **Lead** | parágrafo da abertura, descrição da área | `text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug text-pretty` |
| **Corpo** | itens, nomes no índice (+`font-medium`), nota, parágrafo e canais do fecho, "Voltar ao índice" | `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)]` — `leading-snug` em item/nome, `leading-relaxed` em parágrafo/nota |
| **Rótulo** | numeral pequeno (índice, itens), sobretítulo | `font-display text-sm tracking-[0.22em] text-gold-400` / `<Sobretitulo>` |

## 1. Abertura — `abertura.tsx` (Server)

Dominante: o H1 em Trajan, largo.

- `<section className="relative isolate bg-background">` › `Container className="pt-32 pb-14 md:pt-40 md:pb-16 lg:pt-44 lg:pb-20"`.
- `div.grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8`:
  - `min-w-0 lg:col-span-9`: `<Sobretitulo>` rótulo "Serviços" de `navegacao.ts`; `<h1 className="mt-6 Display max-w-[18ch]">` `servicosIntro.titulo` (duas linhas no desktop: "ÁREAS DE ATUAÇÃO / JURÍDICA").
  - `span aria-hidden className="rule-gold mt-10 block h-px w-24 lg:col-span-12"`.
  - `<p>` `servicosIntro.paragrafo` Lead `mt-8 max-w-[52ch] text-foreground/90 min-w-0 lg:col-span-6 lg:col-start-5` — deslocado para a coluna 5, **a mesma coluna onde começa o conteúdo de todos os capítulos abaixo**: o eixo da página é estabelecido aqui.
- `<FaixaIndice className="mt-14 md:mt-16" />`.
- Sem botão na abertura (o header e o WhatsApp flutuante já dão o contato; o CTA com `shadow-gold` fica no fecho).
- Motion: cascata `animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 ease-out motion-reduce:animate-none` — sobretítulo, H1 `delay-100`, filete `delay-200`, parágrafo `delay-300`. Faixa: `Revelar`.

## 1b. Faixa de índice — `faixa-indice.tsx` (Server)

Mesmo desenho da `FaixaNumeros` da home (colunas iguais, divisórias verticais) aplicado ao sumário.

- `<nav id="indice" aria-label="Índice das áreas de atuação" className="scroll-mt-28">` › `<ol className="grid grid-cols-1 border-y border-border sm:grid-cols-2 lg:grid-cols-7">`.
- `<li className="min-w-0 border-b border-border last:border-b-0 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">`; o 7º `sm:col-span-2 lg:col-span-1` (e sem `border-r` em sm).
  - Em `sm` a última linha precisa perder o `border-b`: itens 5–7 (índices 4, 5, 6) → `sm:max-lg:…` ajustar para que só a borda do `ol` feche. O builder resolve com classes por índice, não com seletor mágico.
- Link `<a href={`#${slug}`} className="group flex h-full min-h-14 items-center gap-4 px-2 py-3 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset motion-reduce:transition-none sm:px-4 lg:min-h-36 lg:flex-col lg:items-start lg:justify-between lg:px-5 lg:py-6">`:
  - Topo (`flex w-full items-center justify-between` no lg): numeral Rótulo aria-hidden `w-7 shrink-0`; `ArrowDownIcon size-5 text-muted-foreground group-hover:text-gold-400 group-focus-visible:text-gold-400` sempre visível (no mobile vai para a ponta direita: `order-last ml-auto lg:order-none lg:ml-0`).
  - Nome `min-w-0 flex-1 lg:flex-none` Corpo `font-medium leading-snug text-balance`. No lg as 7 colunas têm ~170px: todo nome ocupa 2 linhas, exceto "Direito Civil" — alinhados **pela base** (`justify-between`), a última linha de todos fica na mesma altura.

## 2. Capítulos — `capitulos.tsx` + `capitulo.tsx` (Server)

`capitulos.tsx` só mapeia: `areas.map((a, i) => <Capitulo area={a} numero={i + 1} superficie={i % 2 === 0 ? "muted" : "base"} />)`.

### `capitulo.tsx`

`<Section id={slug} aria-labelledby={`titulo-${slug}`} surface={superficie} size="md" className="scroll-mt-28 overflow-clip">` › `Container` › `div.grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-8`.

(`overflow-clip`, nunca `hidden` — o trilho é sticky.)

**Trilho** `<div className="min-w-0 lg:col-span-3 lg:sticky lg:top-28 lg:self-start">`:
- `<p aria-hidden className="Numeral">` `padStart(2,"0")`.
- `span aria-hidden className="mt-6 hidden h-px w-12 bg-gold-500/70 lg:block"` — o traço curto do `Sobretitulo`, em escala.
- Revelar `variante="esquerda"` no trilho.
- Enquanto o capítulo rola no desktop, o numeral fica preso ao lado do conteúdo: o visitante sabe sempre em que área está sem precisar de índice lateral.

**Conteúdo** `<div className="min-w-0 lg:col-span-8 lg:col-start-5">`:
1. `<Revelar>`: `<h2 id={`titulo-${slug}`} className="H2 max-w-[22ch]">` nome; `<p>` descrição Lead `mt-6 max-w-[52ch] text-foreground/90`.
2. `<Revelar atraso={80}>` › `<ul className={cn("mt-10 grid grid-cols-1 border-b border-border md:gap-x-10 md:mt-12", cols)}>`:
   - `cols = itens.length % 3 === 0 ? "md:grid-cols-3" : "md:grid-cols-2"` → 4 itens = 2×2; 3 itens = uma fileira de 3; Civil = 3×3. Toda fileira cheia.
   - `<li className="grid min-h-[4.75rem] min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-x-3 border-t border-border py-4">`: numeral Rótulo `text-xs` aria-hidden (`01`…) + `<span className="min-w-0">` item Corpo `leading-snug text-foreground`.
   - Como é `grid` com fluxo por linha, os dois (ou três) itens de uma fileira têm a mesma altura e os filetes superiores correm na mesma linha; o `border-b` do `ul` fecha a tabela uma vez só. `min-h` acomoda duas linhas: item de uma linha e item de duas ocupam o mesmo passo. `items-center` centra o texto na linha.
   - **Sem stagger** nos itens.
3. Nota (se `area.nota`): `<Revelar atraso={120}>` › `<div className="mt-10 flex gap-4 rounded-2xl bg-card/60 p-6 ring-1 ring-border md:p-8">` `InfoIcon size-5 shrink-0 mt-1 text-gold-400` aria-hidden + `<p className="max-w-[62ch] Corpo leading-relaxed text-foreground/85">` nota. Caixa própria, depois da tabela: impossível confundir com item.
4. `<a href="#indice" className="mt-10 inline-flex min-h-11 items-center gap-2 Corpo text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">` `ArrowUpIcon size-4` aria-hidden + "Voltar ao índice". Em todas as larguras, sempre no mesmo lugar (fim do capítulo).

Estado de chegada por âncora: `target:` na section não muda o fundo; basta o numeral — `group` na section e `group-target:text-gold-300` no numeral (se o variant não compilar, dispensar; não é requisito).

## 3. Fecho — `fecho-servicos.tsx` (Server)

Espelho do `Fecho` da home: mesma construção, foto do outro lado.

- `Section surface="base" className="overflow-clip py-0 md:py-0 lg:py-0"` › `div.grid grid-cols-1 lg:grid-cols-2` (sem Container no grid).
- Foto `relative aspect-[4/3] min-w-0 lg:aspect-auto lg:min-h-full` (primeira no DOM = à esquerda no desktop): `<Image src={fotosEspaco.salaEstanteMesa.src} alt={fotosEspaco.salaEstanteMesa.alt} fill quality={95} sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-[50%_50%]" />`. Sem `preload` (não é LCP), sem overlay. `Revelar variante="zoom"`.
- Texto `min-w-0 px-6 py-20 md:px-10 md:py-28 lg:py-36 lg:pl-16 lg:pr-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]` (o `pr` alinha à grade do container, como o `pl` do Fecho da home). `<Revelar>`:
  - `<Sobretitulo>` `home.contato.sobretitulo`;
  - `<h2>` `home.contato.titulo` H2 `mt-6 max-w-[20ch]`;
  - `<p>` `home.contato.paragrafo` Corpo `leading-relaxed mt-6 max-w-[48ch] text-muted-foreground`;
  - `Button asChild size="lg" className="mt-10 h-14 w-full px-8 text-base shadow-gold sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `WhatsAppGlyph size-5` + `servicosIntro.botao` + sr-only " (abre em nova aba)" — **o único `shadow-gold`**;
  - `<ul className="mt-10 border-t border-border Corpo">`, linhas `flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border py-2.5`: rótulo `text-muted-foreground` + link `inline-flex min-h-11 items-center underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`: os dois `contato.whatsapps` (`_blank` + sr-only) e `contato.telefoneFixo` (`tel:`). Sem endereço.
- Mobile: **texto primeiro, foto depois** — inverter com `order-last lg:order-none` na foto.

## 4. `src/app/site5/servicos/v3/page.tsx`

`<AberturaV3 /> <Capitulos /> <FechoServicos /> <SeletorVersao base="/site5/servicos" atual={3} />`.
`metadata`: `title: "Serviços"`, `description: servicosIntro.paragrafo`, `robots: { index: false, follow: false }`, `openGraph` igual à V1. Comentário de topo apontando para esta spec.

## 5. Mobile 375 — como se lê

1. Sobretítulo → H1 36px em 3 linhas ("ÁREAS DE / ATUAÇÃO / JURÍDICA") → filete curto → lead 19px na largura toda.
2. Índice: 7 linhas de 56px+ separadas por filete (`01  Direito Previdenciário  ↓`), entre dois filetes de borda.
3. Cada capítulo ocupa uma faixa de fundo próprio (muted/base alternados, `py-20`): numeral 56px no topo (não sticky) → H2 28px → descrição 19px → tabela em **uma coluna**, linhas de 76px com numeral à esquerda e filete entre elas → nota em caixa (Previdenciário) → "Voltar ao índice".
4. Fecho: sobretítulo, H2, parágrafo, botão dourado largura total, canais; foto 4:3 em largura total no fim.
Em 768–1023: tabela em 2 ou 3 colunas (pela contagem), trilho ainda empilhado sobre o conteúdo; índice em 2 colunas (7º em `col-span-2`).

## 6. Checklist

- Âncoras: os 6 links da home em 375 e 1280, por clique e por URL com hash; o H2 aparece logo abaixo do header (112px de margem).
- A 1280: numeral sticky acompanha cada capítulo e para no fim dele; em cada tabela os filetes de uma fileira estão na mesma altura; o conteúdo dos 7 capítulos começa no mesmo x que o parágrafo da abertura (coluna 5).
- Superfícies em sequência: base, muted, base, muted, base, muted, base, muted, base — nenhuma tripla.
- 320: H1 sem cortar "JURÍDICA"; `min-w-0` em todo filho de grid; linha da tabela não estoura.
- 1920: `pr-[max(...)]` do fecho alinha com o container.
- Um h1; um rule-gold; um shadow-gold; zero hex, zero sombra/raio arbitrário.
- Nada depende de hover. `motion-reduce` em tudo. Sem JS a página é completa.
