# Contato V2 "Carta" `/site5/contato/v2` — especificação de composição (art-director, 24/09/2026)

Segunda composição da página Entre em contato, para o cliente comparar com a V1 (`05-contato.md`). Mesmo sistema da home v5 (`01-home.md`): superfícies base/muted/navy, numeração em Trajan, `rule-gold`, `Revelar`, `Fio` da Sobre nós V2. Mesmo texto, palavra por palavra, de `contatoPagina` (`src/lib/site5/conteudo.ts`) e `contato` (`src/lib/site5/contato.ts`). Muda a **diagramação** e a **tipografia**.

**Ideia da V2:** a página é diagramada como uma carta em papel timbrado de escritório tradicional. Um eixo central único, simétrico, do monograma ao último bloco; títulos todos em Trajan; seções numeradas em algarismos romanos, como os capítulos de um contrato; um sumário logo abaixo do título leva direto a cada parte. É a versão que segue **a ordem do documento**: título → Envie sua mensagem → Fale com a nossa equipe → Endereço → Redes sociais.

**Como responde à crítica ("falta de classe", "padrão de tipografia"):**
- Uma voz só nos títulos: **todo título é Trajan** (H1 e os quatro H2, no mesmo tamanho). A V1 misturava H1/H2 Trajan com H2 em Inter medium.
- Inter só em **peso regular** (400) — nenhum `font-medium` no texto; nenhum rótulo em caixa-alta Inter. Caixa-alta existe só onde a fonte é Trajan.
- Números de telefone no **mesmo nível do lead**, sem cartão dourado, sem corpo gigante. O destaque do WhatsApp é um botão só, no topo.
- Simetria, respiro e numeração romana dão o registro "escritório tradicional" sem ornamento novo: monograma da marca, filete dourado, Fio centrado — tudo já existe no sistema.

## 0. Decisões gerais

| # | Bloco | Arquivo (`src/components/site5/contato-v2/`) | Superfície | Composição | Foto | Nº |
|---|---|---|---|---|---|---|
| 1 | Abertura + sumário | `abertura.tsx` (Server) | base | eixo central: monograma, H1, filete, subtítulo, CTA, sumário de 4 itens | — | — |
| 2 | Envie sua mensagem | `mensagem.tsx` (Server) + `@/components/site5/contato/formulario-contato` (Client) | muted | cabeçalho centrado; formulário numa "folha" (`Card`) centrada `max-w-3xl` | — | I |
| 3 | Fale com a nossa equipe | `atendimento.tsx` (Server) | base | cabeçalho centrado; "placa" de três números em 3 colunas com divisórias + e-mail numa linha inteira abaixo | — | II |
| 4 | Endereço | `endereco.tsx` (Server) + `@/components/site5/mapa-escritorio` | navy | cabeçalho + endereço centrados; díptico foto 5/12 + mapa 7/12 no container | `fotosEspaco.fachadaSol` | III |
| 5 | Redes sociais | `redes.tsx` (Server) | base | cabeçalho centrado; três colunas iguais com divisórias verticais (linhas no mobile) | — | IV |
| — | cabeçalho de bloco | `cabecalho.tsx` (Server, local) | — | Fio centrado + H2 + parágrafo, reutilizado nos blocos 2–5 | — | — |

Ritmo de superfície: base → muted → base → navy → base → rodapé (`bg-card`). Nunca duas iguais seguidas. Um `rule-gold` (abertura). Um `shadow-gold` (CTA da abertura). Nenhuma superfície gold.

Fotos: só `fachadaSol` (candidata não usada nesta página; na Sobre nós V3 ela é banda navy — aqui entra emoldurada, em díptico). Nenhuma foto no topo: a abertura é tipográfica, como um papel timbrado.

### 0.1 Escala tipográfica da V2 (única — nenhum outro tamanho ou peso de texto)

| Nível | Uso | Classes |
|---|---|---|
| **D — Display** | H1 | `font-display uppercase text-[clamp(2.25rem,1.1rem+4.4vw,4.5rem)] leading-[1.05] tracking-[0.04em] text-balance` |
| **T — Título** | os 4 H2 | `font-display uppercase text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.15] tracking-[0.04em] text-balance` |
| **L — Lead** | subtitulo; valores dos canais (números, e-mail); nome do escritório no endereço; nome das redes | `text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug font-normal` (19 → 22px) |
| **C — Corpo** | parágrafos dos blocos; linhas do endereço | `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed font-normal text-pretty` (17 → 19px) |
| **R — Rótulo** | nome do canal ("Telefone", "WhatsApp 1"…); rótulos do formulário; `@usuario`; itens do sumário; textos de botão | `text-[1.0625rem] leading-snug font-normal` (17px), caixa normal |
| **O — Ornamento** | algarismo romano do `Fio` | `font-display text-sm tracking-[0.22em] text-gold-400` (vem do `Fio`, `aria-hidden` — não é texto) |

Regras:
- **Pesos:** Trajan regular; Inter 400 em tudo. Botões recebem `font-normal` para sair do `font-medium` padrão do `Button`.
- **Caixa-alta:** só D, T e O (Trajan). Nenhum `uppercase` em Inter. `Sobretitulo` não é usado nesta versão.
- **Cor por nível:** D/T `text-foreground` (no navy `text-navy-foreground`); L `text-foreground` (navy: `text-navy-foreground`); C `text-foreground/80` (navy: `text-navy-foreground/80`); R `text-muted-foreground` nos canais e redes, `text-foreground` nos rótulos de campo e no sumário.
- **Medida:** C em `max-w-[56ch]`; subtítulo `max-w-[36ch]`. Tudo centrado (`text-center mx-auto`) exceto o formulário (campos alinhados à esquerda dentro da folha — formulário centrado é difícil de ler).
- Números com `tabular-nums`. E-mail com `<wbr />` depois do "@".

### 0.2 Ajuste compartilhado — `formulario-contato.tsx` (mudança mínima, V1 intacta)

Acrescentar uma prop opcional **`classes?: { rotulo?: string }`**, aplicada com `cn(rotulo, classes?.rotulo)` no `className` dos cinco `FormLabel`. Sem a prop, nada muda (V1). A V2 passa `classes={{ rotulo: "font-normal" }}` (nível R: 17px regular, `text-foreground`). Nada mais muda no componente: validação, microcópia, PENDÊNCIA #1 (nenhuma requisição, aviso honesto com WhatsApp e telefone), `aria-live`, alturas `h-14`, sem placeholder.

> O botão "Enviar mensagem" continua com o `className` do componente (`text-base`, `font-medium`). Se o orquestrador quiser rigor total da escala também no botão, acrescentar `botao?: string` a `classes` e passar `"text-[1.0625rem] font-normal"` — reportar, não improvisar.

### 0.3 Mapa do rodapé

`mapa-rodape.tsx` usa `caminho?.startsWith("/site5/contato")` — já esconde o mapa do rodapé em `/site5/contato/v2` e `/v3`. **Nenhum ajuste.** A V2 mostra o mapa no bloco Endereço.

### 0.4 Invariantes
- Um `<h1>`; `<h2>`: "Envie sua mensagem", "Fale com a nossa equipe", "Endereço", "Redes sociais" (ordem do documento).
- Grids `grid-cols-1` na base + `min-w-0` em todo filho. `Section` com `py-0` leva `md:py-0 lg:py-0`.
- Links externos `target="_blank" rel="noopener noreferrer"` + `<span className="sr-only"> (abre em nova aba)</span>`. `tel:`/`mailto:` sem nova aba.
- Foco dos botões dourados: `focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background` (no navy: `ring-offset-navy`). Links-linha: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` (no navy: `ring-gold-200`).
- `next/image` com `quality={95}`, `sizes` sempre, `(max-width: 1023px)` como corte do `lg`.
- Nada depende de hover: setas e sublinhados existem sem hover; hover só troca cor.
- Sem `hyphens-auto`.

---

## 1. Abertura + sumário — `abertura.tsx`

**Ideia:** o cabeçalho de uma carta do escritório — monograma, nome da página, uma linha de apresentação e, logo abaixo, o caminho para falar agora e o sumário do que vem.

**Dominante:** o H1 em Trajan, centrado.

- `<section className="relative isolate bg-background">` › `Container width="narrow" className="pt-28 pb-16 text-center md:pt-40 md:pb-20 lg:pt-44 lg:pb-24"`.
- Monograma: `<span aria-hidden className="mx-auto block w-fit"><BrandSymbol size={44} /></span>` (`@/components/brand/logo`; o `aria-hidden` no invólucro tira o alt do símbolo da árvore — é decoração, a marca já está no header).
- `<h1 className="mt-8 …D">` `contatoPagina.titulo`. Em 375: duas linhas ("ENTRE EM / CONTATO"); de ~900px para cima cabe numa linha (`text-balance` decide).
- `<span aria-hidden className="rule-gold mx-auto mt-8 block h-px w-32" />` — o único filete da página.
- `<p className="mx-auto mt-8 max-w-[36ch] …L text-foreground/90">` `contatoPagina.subtitulo`.
- CTA: `Button asChild size="lg" className="mt-10 h-auto min-h-14 w-full whitespace-normal px-8 py-3 text-[1.0625rem] font-normal shadow-gold sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `<WhatsAppGlyph className="size-5" />` + `home.contato.botao` ("Entrar em contato", texto do cliente já usado na home) + sr-only. **Único `shadow-gold`.** Justificativa: esta versão põe o formulário primeiro (ordem do documento), então o WhatsApp precisa estar na primeira tela.
- **Sumário** — `<nav aria-label="Seções desta página" className="mx-auto mt-14 max-w-2xl border-y border-border">` › `<ol className="grid grid-cols-2 sm:grid-cols-4">`. Quatro itens, na ordem do documento, com os textos dos próprios H2: `contatoPagina.formulario.titulo` → `#mensagem`; `atendimento.titulo` → `#atendimento`; `endereco.titulo` → `#endereco`; `redes.titulo` → `#redes`.
  - Cada `<li className="min-w-0">` › `<a className="flex min-h-16 h-full flex-col items-center justify-center gap-1 px-3 py-3 text-center rounded-md transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none">`: numeral `<span aria-hidden className="font-display text-sm tracking-[0.22em] text-gold-400">I</span>` (II, III, IV) + texto `…R text-foreground text-balance`.
  - Divisórias: `ol` com `gap-px bg-border` e cada `li` `bg-background` — o fio de 1px aparece entre as células nos dois arranjos (2×2 e 1×4) sem regra por posição.
  - "Seções desta página" é **microcópia de UI** (só leitor de tela) — aprovar com o orquestrador e registrar em `contatoPagina.formulario.ui` como `sumario`; se não for aprovada, usar `aria-labelledby` apontando para o H1.
- Motion: monograma, H1, filete, subtítulo, CTA e sumário em cascata `animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700` com `delay-0 / delay-100 / delay-150 / delay-200 / delay-300 / delay-300`; todos `motion-reduce:animate-none`. Sem `Revelar` (está na dobra).
- **375×812:** header 72 → monograma termina ~150 → H1 2 linhas (~36px) até ~240 → filete ~270 → subtítulo 2 linhas até ~370 → CTA largura total (56px) até ~470 → sumário 2×2 (2 × 64px) até ~630. CTA e sumário inteiros na primeira tela.

## 2. I — Envie sua mensagem — `mensagem.tsx`

**Ideia:** a folha de carta que o visitante preenche.

**Dominante:** a folha (o formulário emoldurado), centrada.

- `Section surface="muted" size="md" id="mensagem" className="scroll-mt-20 overflow-clip" aria-labelledby="titulo-mensagem"` › `Container`.
- `<Revelar><Cabecalho numero="I" id="titulo-mensagem" titulo={formulario.titulo} paragrafo={formulario.paragrafo} /></Revelar>`.
- **`cabecalho.tsx`** (usado nos blocos 2–5): `div.mx-auto max-w-3xl text-center` › `<Fio numero={numero} alinhamento="centro" tom={tom} />` (`@/components/site5/sobre-v2/fio` — sem rótulo, desenha traço + numeral + traço) › `<h2 id={id} className="mt-6 …T">` › `<p className="mx-auto mt-6 max-w-[56ch] …C">`. Props: `numero`, `id`, `titulo`, `paragrafo?`, `tom?: "escuro" | "navy"` (cores de H2/p conforme §0.1).
- Folha: `<Revelar variante="zoom" atraso={80} className="mx-auto mt-12 max-w-3xl md:mt-16">` › `Card className="gap-0 rounded-none bg-transparent p-0 py-0 shadow-none ring-0 sm:rounded-3xl sm:bg-card sm:p-10 sm:shadow-xl sm:ring-1 sm:ring-border lg:p-14"` › `<FormularioContato campos={formulario.campos} botao={formulario.botao} ui={formulario.ui} whatsapp={contato.whatsapps[0]} telefone={contato.telefoneFixo} classes={{ rotulo: "font-normal" }} />`.
  - No mobile a folha some (campos direto sobre o muted, largura total do container: 327px em 375) — cartão com padding a 375 apertaria os campos a ~280px. A partir de `sm` vira folha.
  - Campos seguem `bg-background` do componente: contraste claro sobre `bg-card` e sobre muted.
- Motion: `Revelar` (subir) no cabeçalho; `zoom` na folha. Reduced-motion: aparece direto (CSS do `Revelar`).

## 3. II — Fale com a nossa equipe — `atendimento.tsx`

**Ideia:** a placa do escritório — os três números lado a lado, o e-mail por extenso embaixo, tudo no mesmo corpo e no mesmo peso.

**Dominante:** a linha dos três números.

- `Section surface="base" size="md" id="atendimento" className="scroll-mt-20" aria-labelledby="titulo-atendimento"` › `Container`.
- `<Revelar><Cabecalho numero="II" id="titulo-atendimento" titulo={atendimento.titulo} paragrafo={atendimento.paragrafo} /></Revelar>`.
- Placa: `<Revelar atraso={80} asChild><ul className="mx-auto mt-12 grid max-w-5xl grid-cols-1 border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border md:mt-16">`. **Ordem do documento:** `contato.telefoneFixo`, `contato.whatsapps[0]`, `contato.whatsapps[1]`; depois, fora do grid de 3, o e-mail.
  - Cada `<li className="min-w-0 border-b border-border last:border-b-0 sm:border-b-0">` › `<a className="flex h-full min-h-28 flex-col items-center justify-center gap-2 px-4 py-6 text-center rounded-md transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none">`:
    - linha 1 `span.flex items-center gap-2.5`: glifo `aria-hidden size-5 shrink-0 text-gold-400` (`PhoneIcon` no telefone; `WhatsAppGlyph` nos dois WhatsApps) + `rotulo` …R `text-muted-foreground`;
    - linha 2 `exibicao` …L `text-foreground tabular-nums whitespace-nowrap underline decoration-gold-500/60 underline-offset-[6px]` — o **sublinhado dourado é permanente** e sinaliza o link sem depender de hover; o hover só troca o fundo da célula.
    - WhatsApps: `target="_blank"` + sr-only; telefone `tel:`.
  - Nenhum item recebe destaque de cor: equivalência tipográfica é a decisão (o destaque do WhatsApp já está no topo da página).
- E-mail: `<Revelar atraso={140}><a href={contato.email.href} className="mx-auto mt-2 flex min-h-20 max-w-5xl flex-col items-center justify-center gap-2 border-b border-border px-4 py-5 text-center sm:flex-row sm:gap-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">` — mesma anatomia: `MailIcon` + `contato.email.rotulo` (R muted) e valor (L, `underline decoration-gold-500/60 underline-offset-[6px]`, `break-words`, `<wbr />` após o "@"). Em `sm+` rótulo e valor na mesma linha.
- 768: três colunas de ~229px; o valor de 19px (~150px) cabe sem quebrar. 1024+: `max-w-5xl`, colunas de ~340px.
- 375: quatro linhas empilhadas, centradas, cada uma ≥ 112px de alvo; e-mail cabe numa linha a 19px (~310px de 327) — se não couber, quebra no `<wbr>`.

## 4. III — Endereço — `endereco.tsx`

**Ideia:** onde o escritório está — o endereço como num envelope, a fachada e o mapa lado a lado.

**Dominante:** o díptico fachada + mapa.

- `Section surface="navy" size="md" id="endereco" className="scroll-mt-20 overflow-clip" aria-labelledby="titulo-endereco"` › `Container`.
- `<Revelar><Cabecalho numero="III" tom="navy" id="titulo-endereco" titulo={contatoPagina.endereco.titulo} /></Revelar>` (sem parágrafo — o documento não tem).
- `<Revelar atraso={60}><address className="mx-auto mt-8 max-w-[40ch] text-center not-italic">`: `contato.endereco.nome` (`block …L text-navy-foreground`), `logradouro`, `bairroCidade`, `cep` (`block …C text-navy-foreground/80`).
- Botão: `Button asChild variant="outline" size="lg" className="mx-auto mt-8 flex h-auto min-h-12 w-full whitespace-normal border-navy-foreground/30 bg-transparent px-6 py-3 text-[1.0625rem] font-normal text-navy-foreground hover:bg-navy-foreground/10 sm:w-fit focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"` › `<a href={mapaLinkHref} target="_blank" rel="noopener noreferrer">` `MapPinIcon size-5` + `contatoPagina.formulario.ui.abrirMapa` + `ArrowUpRightIcon size-4` + sr-only.
- Díptico: `div.mt-14 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-12 md:gap-5`:
  - Foto `<Revelar variante="zoom" className="relative min-w-0 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-navy-foreground/15 md:col-span-5 md:aspect-auto">` › `Image src={fotosEspaco.fachadaSol.src} alt={fotosEspaco.fachadaSol.alt} fill quality={95} sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) 40vw, 32rem" className="object-cover object-[55%_50%]"`. (No `md` a foto herda a altura do mapa — `aspect-auto` + linha do grid.)
  - Mapa `<MapaEscritorio className="relative h-[22rem] min-w-0 rounded-2xl ring-1 ring-navy-foreground/15 md:col-span-7 md:h-[26rem] lg:h-[30rem]" />` — mesma receita do rodapé; aqui com raio (o `overflow-hidden` do componente recorta o iframe).
  - Mobile: foto primeiro, mapa depois (ordem do DOM = ordem visual).
- Motion: cabeçalho e endereço `Revelar`; foto `zoom`; mapa sem animação (iframe).

## 5. IV — Redes sociais — `redes.tsx`

**Ideia:** fechar a carta com os três canais oficiais, em pé de igualdade.

**Dominante:** as três colunas de rede.

- `Section surface="base" size="md" id="redes" className="scroll-mt-20" aria-labelledby="titulo-redes"` › `Container`.
- `<Revelar><Cabecalho numero="IV" id="titulo-redes" titulo={redes.titulo} paragrafo={redes.paragrafo} /></Revelar>`.
- `<ul className="mx-auto mt-12 grid max-w-4xl grid-cols-1 border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border md:mt-16">`, `contato.redes.map((rede, i) => <Revelar asChild atraso={i * 70}><li className="min-w-0 border-b border-border last:border-b-0 sm:border-b-0">…`:
  - `<a href={rede.href} target="_blank" rel="noopener noreferrer" className="flex min-h-20 items-center gap-4 px-2 py-4 transition-colors hover:bg-muted/40 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none sm:min-h-40 sm:flex-col sm:justify-center sm:gap-3 sm:px-4 sm:py-8 sm:text-center">`:
    - `glifoDaRede[rede.rede]` `aria-hidden size-7 shrink-0 text-gold-400`;
    - `span.min-w-0 flex-1 sm:flex-none`: `rede.rotulo` (`block …L text-foreground`) e, se houver, `rede.usuario` (`block …R text-muted-foreground break-words`);
    - `ArrowUpRightIcon aria-hidden size-5 shrink-0 text-muted-foreground` (no `sm+` fica abaixo do nome, centrado) + sr-only.
  - **Ícone + nome, sempre.** No mobile cada rede é uma linha horizontal (ícone, nome, seta); a partir de `sm`, colunas centradas.
- Esta seção fecha a página e encosta no rodapé (`bg-card` com `border-t`) — contraste suficiente, sem filete extra.

## 6. `src/app/site5/contato/v2/page.tsx`

```
<Abertura /> <Mensagem /> <Atendimento /> <Endereco /> <Redes />
<SeletorVersao base="/site5/contato" atual={2} />
```
`metadata`: `title: "Entre em contato"`, `description: contatoPagina.atendimento.paragrafo`, `robots: { index: false, follow: false }`, `openGraph` com `contatoPagina.titulo` e `fotosEspaco.fachadaSol` (src/width/height/alt). Comentário no topo apontando para esta spec.

## 7. Checklist
- **320:** H1 em 2 linhas sem cortar "CONTATO" (36px Trajan ≈ 250px); sumário 2×2 com textos quebrando em 2 linhas centradas; placa empilhada; e-mail quebra no `<wbr>`; nada estoura.
- **375:** CTA e sumário na primeira tela (§1); campos a 327px; redes em linhas.
- **768:** placa em 3 colunas; díptico 5/7 com foto na altura do mapa; sumário em 4 colunas.
- **1024 / 1280:** folha `max-w-3xl` com telefone/e-mail lado a lado; H1 numa linha.
- **1920:** tudo contido no eixo (`max-w-3xl`/`4xl`/`5xl`) — nada sangra; linhas nunca passam de 56ch.
- Zoom 200% / texto 150%: sem scroll horizontal (`wrap-anywhere` do layout + `min-w-0`).
- Um H1; quatro H2 na ordem do documento; um `shadow-gold`; um `rule-gold`; zero `uppercase` em Inter; zero `font-medium`/`font-semibold` em texto; nenhum texto < 17px (exceto numerais ornamentais `aria-hidden`).
- Sem JS: canais, mapa, redes e âncoras do sumário funcionam. Submit válido: nenhuma requisição de rede, aviso honesto aparece.
- Reduced-motion: cascata e `Revelar` desligados; conteúdo visível de imediato.
