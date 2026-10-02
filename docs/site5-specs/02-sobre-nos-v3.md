# Sobre nós — V3 "Planta" `/site5/sobre-nos/v3` — especificação de composição (art-director, 24/09/2026)

Terceira composição da página Sobre nós, para o cliente comparar com a V1 (`02-sobre-nos.md`) e a V2 (`02-sobre-nos-v2.md`). Mesmo sistema da home v5 (`01-home.md`), mesmo texto palavra por palavra (`sobre` em `src/lib/site5/conteudo.ts`). Muda a **diagramação**.

**Ideia da V3:** a página é desenhada como uma planta de arquitetura. Grade de 12 colunas rigorosa e visível: cada bloco abre com uma régua (numeral + título sobre um fio que atravessa a largura do container), e o conteúdo se organiza em células separadas por filetes de 1px (`gap-px`). Bandas de cor inteiras marcam os movimentos — navy abre e fecha a página, como fachada e fundo. Ênfase em número: o ano do hero e os numerais dos seis valores são os elementos de maior corpo depois da foto. Única página com vidro: o painel do Diferencial sobre a foto.

## 0. Decisões gerais

| # | Bloco | Arquivo (`src/components/site5/sobre-v3/`) | Superfície | Composição | Foto (`fotosEspaco`) | Nº |
|---|---|---|---|---|---|---|
| 1 | Hero | `hero.tsx` | **navy** + banda de foto | duas colunas 7/5 separadas por filete vertical; ano em Trajan grande; foto em banda larga abaixo | `fachadaSol` | — |
| 2 | Apresentação | `apresentacao.tsx` | base | régua + H2; três células iguais com filetes | — | 01 |
| 3 | Nossa experiência | `experiencia.tsx` | muted | régua; texto 5/12 + foto emoldurada 7/12 | `salaReuniao1` | 02 |
| 4 | Nosso propósito | `proposito.tsx` | **gold** (única) | régua; frase centrada no eixo da página; estampa 01 no canto superior esquerdo | — | 03 |
| 5 | Nossos valores | `valores.tsx` | base | régua; matriz 3×2 de células com numeral grande | — | 04 |
| 6 | Nosso diferencial | `diferencial.tsx` | base, `py-0` | foto de tela cheia com painel de vidro 5/12 à esquerda | `recepcaoAmplaFrontal` | 05 |
| 7 | (fecho da página) | `fechamento.tsx` | **navy** | régua; moldura de células: foto panorâmica 12/12 + H2 7/12 + texto e botões 5/12 | `equipeGrupo` | 06 |

Ritmo de superfície: navy → base → muted → gold → base → base (foto de tela cheia, lê como banda própria) → navy. Navy só nas pontas (abre e fecha); gold uma vez, no meio.

Fotos: nenhuma repete a V1 nem a V2, exceto `equipeGrupo` (única foto de equipe reunida; aqui em moldura de células, sobre navy). `fachadaSol` é outra tomada da fachada — a home usa `fachada`; esta, com o sol e as palmeiras, é a mais arquitetônica do acervo e abre a versão "planta".

### 0.1 Escala tipográfica da V3 (única — não usar outro tamanho)

| Nível | Uso | Classes |
|---|---|---|
| **Numeral display** | o ano no hero | `font-display text-gold-gradient text-[clamp(4.5rem,2.4rem+8vw,9.5rem)] leading-[0.85] tracking-[-0.01em]` |
| **H1** | nome do escritório | `font-display uppercase text-[clamp(1.875rem,1.2rem+2.6vw,3.5rem)] leading-[1.05] tracking-[0.01em]` |
| **Destaque** | frase do Propósito | `text-[clamp(1.75rem,1.05rem+2.9vw,3.5rem)] leading-[1.16] font-medium tracking-tight text-balance` |
| **H2 frase** (Inter) | Apresentação, fecho | `text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance` |
| **Título de régua** (Trajan) | "Nossa experiência", "Nosso propósito", "Nossos valores", "Nosso diferencial" | `font-display uppercase text-[clamp(1.375rem,1.05rem+1.3vw,2.125rem)] leading-[1.1] tracking-[0.02em]` |
| **Numeral de célula** | 01–06 dos valores | `font-display text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] leading-none text-gold-400` |
| **Valor** | os 6 valores | `text-[clamp(1.25rem,1.1rem+0.7vw,1.625rem)] leading-snug font-medium text-balance` |
| **Lead** | só o subtítulo do hero | `text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug text-pretty` |
| **Corpo** | todo parágrafo | `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed text-pretty` (17 → 19px) |
| **Rótulo** | `Sobretitulo`, numeral de régua, rótulo "Apresentação" | numeral `font-display text-sm tracking-[0.22em]`; rótulo `text-sm tracking-[0.08em] uppercase` |

Regras: parágrafos do mesmo bloco no mesmo tamanho e cor (`text-foreground/85` em base/muted/vidro; `text-navy-foreground/85` no navy; `text-brand-950` no gold). Medida 44–58ch. Trajan só em H1, numerais e títulos de régua.

### 0.2 Componente local novo — `sobre-v3/regua.tsx`

O `Trilho` compartilhado é coluna lateral `sticky`; a V3 abre cada bloco com uma linha horizontal que atravessa o container — outra geometria, por isso componente próprio. Não alterar `trilho.tsx`.

`Regua({ numero, rotulo?, as = "p" | "h2", tom = "escuro" | "gold" | "navy", className })`:
- `div.flex min-w-0 items-baseline gap-5 border-b pb-5 md:gap-8 md:pb-6` — borda: escuro `border-border`; gold `border-brand-950/25`; navy `border-navy-foreground/15`;
- numeral `<span aria-hidden className="shrink-0 font-display text-sm tracking-[0.22em]">` (escuro/navy `text-gold-400`; gold `text-brand-950`);
- rótulo no elemento `as`: com `as="h2"` usa **Título de régua** (cor cheia: `text-foreground` / `text-brand-950` / `text-navy-foreground`); com `as="p"` usa o **Rótulo** (`text-muted-foreground` / `text-brand-900` / `text-navy-foreground/70`). Sem rótulo, a régua é só numeral + fio.

### 0.3 Célula com filete (padrão da V3, não é componente)

Grade de células: `grid gap-px overflow-hidden rounded-3xl bg-border ring-1 ring-border` (no navy: `bg-navy-foreground/15 ring-navy-foreground/15`); cada célula com fundo cheio da superfície (`bg-background`, `bg-card`, `bg-navy`) e `min-w-0`. O `gap-px` sobre o fundo `bg-border` é o que desenha os filetes — sem bordas individuais, sem hairline duplicada.

### 0.4 Imagens, CTAs, motion, vidro
- `next/image`, `quality={95}`, `sizes` sempre com `(max-width: 1023px)`, `alt` de `fotosEspaco`, `preload` só no hero.
- CTAs só no fecho: primário `sobre.fechamento.botao` → `/site5/profissionais` (único `shadow-gold`); secundário outline WhatsApp `home.contato.botao`.
- Motion: hero em cascata (`animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700 motion-reduce:animate-none`); resto `Revelar` (células em escalonamento de 70–80ms, fotos `zoom` exceto hero).
- Vidro: `LiquidGlass` com `LIQUID_GLASS_PRESETS.panel`, **uma vez**, no bloco 6. Não forçar `tier`.
- Sobretítulos visíveis: "Sobre nós" e `sobre.apresentacao.sobretitulo`. "Fechamento" não aparece.

---

## 1. Hero — `hero.tsx`

**Ideia:** a fachada da instituição — nome, ano de início e o lugar físico, em planta.
**Dominante:** o ano "2007" em Trajan dourado, grande, na coluna direita (a foto é a segunda leitura).

Sobre o ano: é extraído do próprio `sobre.hero.paragrafo` (`/\d{4}/`) — nenhum texto novo. É decorativo (`aria-hidden`) e fica imediatamente acima do parágrafo que começa por "Desde outubro/2007", que continua inteiro e é o que o leitor de tela ouve. Se a regex não casar, o numeral não renderiza.

- `<section className="relative isolate overflow-clip bg-navy text-navy-foreground">` (o `main` tem `-mt-18`; o padding de topo desconta o header).
- `Container className="pt-36 pb-16 md:pt-44 md:pb-20 lg:pt-48 lg:pb-24"` › `div.grid grid-cols-1 gap-y-12 lg:grid-cols-12`:
  - Esquerda `div.min-w-0 lg:col-span-7 lg:pr-12`: `<Sobretitulo>` "Sobre nós"; `<h1>` **H1** `mt-6` (dois `span.block` partindo `sobre.hero.titulo` no último espaço: "Souza & Souza" / "Advocacia"); `div aria-hidden rule-gold mt-8 h-px w-24`; `<p>` `sobre.hero.subtitulo` **Lead** `mt-8 max-w-[36ch] text-navy-foreground/90`.
  - Direita `div.min-w-0 border-t border-navy-foreground/15 pt-10 lg:col-span-5 lg:self-end lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12`: `<p aria-hidden>` ano **Numeral display**; `<p>` `sobre.hero.paragrafo` **Corpo** `mt-8 max-w-[44ch] text-navy-foreground/85`.
- Banda de foto (dentro da mesma section, fora do Container): `div.relative aspect-[4/3] md:aspect-[21/9] lg:aspect-auto lg:h-[min(38rem,62svh)]` › `Image fachadaSol fill preload quality={95} sizes="100vw" className="object-cover object-[50%_58%]"`. Sem overlay; o fio superior da banda é a própria troca navy → foto.

**375:** padding de topo 9rem (header + respiro) → Sobretitulo → H1 em duas linhas (30px) → filete → subtítulo → fio horizontal → "2007" a 72px → parágrafo → foto 4:3 da fachada. O ano cai na segunda metade do primeiro viewport; a foto entra na primeira rolagem.

## 2. Apresentação — `apresentacao.tsx`

**Ideia:** a premissa do escritório em três módulos de igual peso — como três vãos de uma mesma estrutura.
**Dominante:** o H2.

- `Section surface="base" size="lg"` › `Container`.
- `<Regua numero="01" rotulo={sobre.apresentacao.sobretitulo} />` (rótulo `p`).
- `<Revelar>` › `<h2>` `sobre.apresentacao.titulo` **H2 frase** `mt-10 max-w-[24ch] md:mt-14`.
- `div.mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border ring-1 ring-border md:mt-16 lg:grid-cols-3`; para cada `paragrafos[i]`: `<Revelar asChild atraso={i * 80}><div className="min-w-0 bg-background p-7 md:p-10 lg:p-8 xl:p-10">` › `span aria-hidden block h-px w-10 bg-gold-500/70` + `<p>` **Corpo** `mt-6 max-w-[58ch] text-foreground/85`.
- Os três parágrafos no mesmo tamanho; nenhum vira lead.

**375:** régua 01 "APRESENTAÇÃO" → H2 → três células empilhadas (padding 28px) separadas por filetes de 1px, dentro de uma moldura arredondada.

## 3. Nossa experiência — `experiencia.tsx`

**Ideia:** a experiência sustentada por estrutura — texto de um lado, o espaço de atendimento do outro, na mesma grade.
**Dominante:** a foto emoldurada.

- `Section surface="muted" size="lg"` › `Container`.
- `<Regua numero="02" rotulo={sobre.experiencia.titulo} as="h2" />`.
- `div.mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-16 lg:grid-cols-12 lg:items-end`:
  - Texto `<Revelar className="min-w-0 lg:col-span-5">`: `paragrafos[0]`; `div aria-hidden className="my-6 h-px w-full bg-border"`; `paragrafos[1]` — ambos **Corpo** `max-w-[48ch] text-foreground/85`.
  - Foto `<Revelar variante="zoom" className="relative aspect-[3/2] min-w-0 overflow-hidden rounded-3xl ring-1 ring-border lg:col-span-7">` › `Image salaReuniao1 fill quality={95} sizes="(max-width: 1023px) calc(100vw - 3rem), 43rem" className="object-cover object-[50%_55%]"`.
- Diferença para a V1: foto contida e emoldurada à direita (não sangrada à esquerda), texto alinhado à base da foto, título na régua.

**375:** régua 02 com o título em Trajan (22px, cabe numa linha) → dois parágrafos com fio entre eles → foto 3:2 em largura de container.

## 4. Nosso propósito — `proposito.tsx`

**Ideia:** o propósito sobre o eixo de simetria da página — o único bloco centrado da V3.
**Dominante:** a frase.

- `Section surface="gold" size="lg" className="overflow-clip"`, cores fixas `brand-950`/`brand-900`.
- Estampa: `Image src={brandAssets.pattern[1]} alt="" aria-hidden unoptimized width={4085} height={3154} data-estampa="proposito-v3" className="pointer-events-none absolute -top-[60%] -left-[70%] -z-10 w-[170vw] max-w-none lg:-top-[70%] lg:-left-[38%] lg:w-[90vw]"` + `<AjusteEstampa alvo="proposito-v3" rotulo="estampa propósito v3" padrao={…} />`. Tom sobre tom; canto oposto ao da home para não parecer cópia do manifesto.
- `Container`:
  - `<Regua numero="03" rotulo={sobre.proposito.titulo} as="h2" tom="gold" />`;
  - `<Revelar duracao={800}>` › `<p>` `sobre.proposito.paragrafo` **Destaque** `mx-auto mt-14 max-w-[30ch] text-center text-brand-950 md:mt-20`.

**375:** régua 03 → frase centrada a 28px (~12 linhas, `text-balance` evita viúva) → estampa cortada no topo esquerdo.

## 5. Nossos valores — `valores.tsx`

**Ideia:** os valores como uma matriz de seis módulos iguais, cada um com seu número — a ênfase numérica da V3.
**Dominante:** a matriz (os numerais dourados).

- `Section surface="base" size="lg"` › `Container`.
- `<Regua numero="04" rotulo={sobre.valores.titulo} as="h2" />`.
- `<ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-border ring-1 ring-border sm:grid-cols-2 md:mt-16 lg:grid-cols-3">`; cada valor `<Revelar asChild atraso={i * 70}><li className="flex min-w-0 items-baseline gap-6 bg-card p-6 sm:min-h-56 sm:flex-col sm:items-start sm:justify-between sm:gap-10 sm:p-8 lg:min-h-64 lg:p-10">`:
  - `<span aria-hidden>` `String(i + 1).padStart(2, "0")` **Numeral de célula**;
  - `<span>` valor **Valor** `text-card-foreground`.
- Diferença para a V1 (lista tipográfica em navy) e V2 (índice de uma coluna): células de área igual, numeral como elemento dominante de cada uma.

**375:** régua 04 → seis células em uma coluna, cada uma em linha (numeral 36px à esquerda, valor 20px à direita, alinhados pela linha de base); "Responsabilidade Social" quebra em duas linhas. A partir de 640px vira 2×3 com numeral no topo e valor na base.

## 6. Nosso diferencial — `diferencial.tsx`

**Ideia:** a proximidade no atendimento vista de dentro da recepção, com o texto num painel de vidro sobre a própria cena.
**Dominante:** a foto `recepcaoAmplaFrontal` em tela cheia.

- `Section surface="base" className="overflow-clip py-0 md:py-0 lg:py-0"`.
- `div.relative lg:min-h-[min(52rem,100svh)] lg:py-24 lg:flex lg:items-center`:
  - Foto `div.relative aspect-[4/3] md:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto` › `Image recepcaoAmplaFrontal fill quality={95} sizes="100vw" className="object-cover object-[60%_50%] lg:object-[72%_50%]"` — no lg o balcão e o painel da marca ficam nos 7/12 da direita, livres; as poltronas ficam sob o painel de vidro.
  - Véu só lg: `div aria-hidden className="absolute inset-0 hidden bg-linear-to-r from-background/70 via-background/25 to-background/0 lg:block"` — garante o contraste do texto no vidro em qualquer tier.
  - `Container className="relative z-10 -mt-12 pb-24 md:-mt-20 md:pb-32 lg:mt-0 lg:pb-0"` › `div.grid grid-cols-1 lg:grid-cols-12` › `<Revelar className="min-w-0 lg:col-span-5">` › `<LiquidGlass {...LIQUID_GLASS_PRESETS.panel} className="rounded-3xl p-7 md:p-10 xl:p-12">`:
    - `<Regua numero="05" rotulo={sobre.diferencial.titulo} as="h2" />`;
    - `paragrafos[0]`, `paragrafos[1]` (`mt-5`) em **Corpo** `mt-8 max-w-[52ch] text-foreground/85` (o primeiro com `mt-8`).
- Contraste: medir AA (≥ 4,5:1) do corpo sobre o painel nos três tiers (`lensed`/`frosted`/`solid`) e com Reduce Transparency. Se algum tier ficar abaixo, subir o véu para `from-background/85` — não trocar o texto para cor mais clara nem remover o vidro.
- `LiquidGlass` é client; o conteúdo entra como `children` de Server Component.

**375:** foto 4:3 em largura total → painel de vidro sobe 3rem sobre a foto (o vidro mostra a borda da imagem através), com margens de 24px: régua 05 com título → dois parágrafos. Um único elemento de vidro na tela.

## 7. Fecho da página — `fechamento.tsx`

**Ideia:** fechar a planta como abriu — banda navy — com as sócias reunidas no topo da moldura e o convite logo abaixo.
**Dominante:** a foto de grupo dentro da moldura.

- `Section surface="navy" size="lg"` › `Container`.
- `<Regua numero="06" tom="navy" />` (sem rótulo).
- Moldura `div.mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-navy-foreground/15 ring-1 ring-navy-foreground/15 md:mt-16 lg:grid-cols-12`:
  - Célula foto `<Revelar variante="zoom" className="relative aspect-[3/2] min-w-0 md:aspect-[21/9] lg:col-span-12">` › `Image equipeGrupo fill quality={95} sizes="(max-width: 1023px) calc(100vw - 3rem), 75rem" className="object-cover object-[56%_40%]"` (o Container limita a 75rem de conteúdo; o original de 2036px segura bem até aí).
  - Célula título `div.min-w-0 bg-navy p-7 md:p-10 lg:col-span-7 lg:p-12` › `<Revelar>` › `<h2>` `sobre.fechamento.titulo` **H2 frase** `max-w-[20ch]`.
  - Célula texto `div.min-w-0 bg-navy p-7 md:p-10 lg:col-span-5 lg:p-12` › `<Revelar atraso={100}>`:
    - `<p>` `sobre.fechamento.paragrafo` **Corpo** `max-w-[46ch] text-navy-foreground/85`;
    - `div.mt-10 flex flex-col gap-3`:
      - `Button asChild size="lg" className="h-14 w-full px-8 text-base shadow-gold focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"` › `<Link href="/site5/profissionais">` `sobre.fechamento.botao` + `ArrowRightIcon aria-hidden`;
      - `Button asChild variant="outline" size="lg" className="h-14 w-full border-navy-foreground/30 bg-transparent px-6 text-base text-navy-foreground hover:bg-navy-foreground/10"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `<WhatsAppGlyph className="size-5" />` + `home.contato.botao` + `<span className="sr-only"> (abre em nova aba)</span>`.
- Botões sempre em largura total da célula (a célula tem ~30rem no lg): a coluna dos botões é a base da planta.

**375:** régua 06 → moldura: foto 3:2 com o grupo → H2 (~4 linhas) → parágrafo → dois botões em largura total (primário em cima), tudo separado por filetes de 1px.

---

## 8. `src/app/site5/sobre-nos/v3/page.tsx`
- Monta `Hero`, `Apresentacao`, `Experiencia`, `Proposito`, `Valores`, `Diferencial`, `Fechamento` de `@/components/site5/sobre-v3/*`, e por último `<SeletorVersao base="/site5/sobre-nos" atual={3} />`.
- `metadata`: `title: "Sobre nós"`, `description: sobre.hero.subtitulo`, `robots: { index: false, follow: false }`, `openGraph` com `sobre.hero.titulo`/`sobre.hero.subtitulo` e imagem `fotosEspaco.fachadaSol`.
- Server Components; client só `Revelar`, `AjusteEstampa`, `LiquidGlass`.

## 9. Checklist
- Um `<h1>`. Um `shadow-gold`. Uma superfície gold. Um `LiquidGlass`. Zero hex, zero sombra/raio arbitrário.
- Corpo ≥ 17px; parágrafos de um mesmo bloco no mesmo tamanho e cor.
- Grids com `grid-cols-1` na base e `min-w-0` nos filhos (células, colunas, `li`).
- Bloco 6 com `py-0 md:py-0 lg:py-0`.
- `sizes` com `(max-width: 1023px)`; `quality={95}`; `preload` só no hero.
- Numeral "2007" extraído do texto, `aria-hidden`; numerais 01–06 `aria-hidden`.
- Nada depende de hover. Reduced-motion: hero sem cascata, `Revelar` mostra tudo, vidro respeita Reduce Transparency.
- Matriz 320/375/768/1024/1280/1920. Pontos de atenção: "2007" e H1 em 320; filete vertical do hero em 1024 (coluna 5/12 com o numeral de 9,5rem — se estourar, baixar o teto do clamp); células da Apresentação em 1024 (medida ~28ch; aceitar ou manter 1 coluna até `xl`); painel de vidro x painel da marca em 1024 e 1920; células 2×3 dos valores em 640–1023.
- Texto: conferir com o `souza-content-steward` contra `Site/paginas-v5/02-sobre-nos.md`.
