# Contato V3 "Recepção" `/site5/contato/v3` — especificação de composição (art-director, 24/09/2026)

Terceira composição da página Entre em contato, para o cliente comparar com a V1 (`05-contato.md`) e a V2 (`05-contato-v2.md`). Mesmo sistema da home v5 (`01-home.md`): escala do H1 e dos H2 da home, numeração `01–04` em Trajan com traço dourado (`Fio`), `rule-gold`, `Revelar`, superfícies base/muted. Mesmo texto, palavra por palavra, de `contatoPagina` e `contato`. Muda a **diagramação** e a **tipografia**.

**Ideia da V3:** a página é uma tela dividida, como a recepção do escritório vista de frente. À esquerda, a fotografia vertical do balcão de mármore com o painel da marca fica **fixa** enquanto se rola; à direita, uma coluna única de leitura desce pela ordem do documento — título, Envie sua mensagem, Fale com a nossa equipe, Endereço, Redes sociais —, com as partes alternando base e muted. Nada centrado, nada de cartão: alinhamento à esquerda, uma coluna de texto com medida controlada, e o espaço real do escritório presente o tempo todo.

**Como responde à crítica ("falta de classe", "padrão de tipografia"):**
- A escala é **a da home**, não uma nova: H1 = o H1 do hero da home; H2 = os H2 de Publicações/Manifesto; corpo, lead e rótulo idênticos à V2. Quem vem da home reconhece a voz.
- **Dois pesos, nenhum a mais:** Inter medium só em H1 e H2; tudo o mais Inter regular. Nenhuma caixa-alta em Inter; Trajan só nos numerais `01–04` (ornamento, `aria-hidden`).
- A elegância vem da **fotografia real tratada como protagonista** (metade da tela, sangrada, fixa) e da disciplina da coluna (uma borda esquerda, uma medida), não de cartões e cores. Números de telefone no nível do lead, numa ficha de linhas finas.
- Um só destaque de cor na página: o botão do WhatsApp na abertura (`shadow-gold`).

## 0. Decisões gerais

| # | Bloco | Arquivo (`src/components/site5/contato-v3/`) | Superfície | Composição | Foto | Nº |
|---|---|---|---|---|---|---|
| — | Casca da tela dividida | `recepcao.tsx` (Server) | — | `lg:grid-cols-12`: foto 5/12 fixa (sticky, altura da janela) + coluna 7/12 | — | — |
| — | Painel da foto | `painel-foto.tsx` (Server) | foto sangrada | mobile: faixa no topo; `lg+`: 5/12, `sticky top-0 h-dvh` | `fotosEspaco.recepcaoFrontal` | — |
| 1 | Abertura | `abertura.tsx` (Server) | base | H1, filete, subtítulo, CTA, alinhados à esquerda | — | — |
| 2 | Envie sua mensagem | `mensagem.tsx` (Server) + `@/components/site5/contato/formulario-contato` (Client) | muted | cabeçalho + formulário na coluna | — | 01 |
| 3 | Fale com a nossa equipe | `atendimento.tsx` (Server) | base | cabeçalho + ficha de 4 linhas (rótulo \| valor) | — | 02 |
| 4 | Endereço | `endereco.tsx` (Server) + `@/components/site5/mapa-escritorio` | muted | cabeçalho + endereço + mapa emoldurado 4:3 + botão | — | 03 |
| 5 | Redes sociais | `redes.tsx` (Server) | base | cabeçalho + 3 linhas de rede | — | 04 |
| — | casca de cada parte | `movimento.tsx` (Server, local) | base \| muted | padding da coluna, `Fio`, H2, parágrafo | — | — |

Ritmo: na coluna, base → muted → base → muted → base; a foto fixa à esquerda é a constante e o contraste. Depois, rodapé (`bg-card`). Um `rule-gold` (abertura). Um `shadow-gold` (CTA da abertura). Sem navy, sem gold, sem cartões — é a versão mais despojada das três.

Foto: `recepcaoFrontal` (2400×3593, vertical — balcão de mármore diante do painel com a marca, atendente ao fundo). Candidata não usada no site; a única vertical do acervo com a marca em destaque. Nenhuma outra foto na página.

### 0.1 Escala tipográfica da V3 (única — nenhum outro tamanho ou peso de texto)

| Nível | Uso | Classes |
|---|---|---|
| **D — Display** | H1 (= H1 do hero da home) | `text-[clamp(2.5rem,1.1rem+5.6vw,5.25rem)] leading-[0.98] font-medium tracking-[-0.03em] text-balance` |
| **T — Título** | os 4 H2 (= H2 de Publicações da home) | `text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance` |
| **L — Lead** | subtítulo; valores dos canais; nome do escritório; nome das redes | `text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug font-normal` (19 → 22px) |
| **C — Corpo** | parágrafos; linhas do endereço | `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed font-normal text-pretty text-muted-foreground` (17 → 19px) |
| **R — Rótulo** | nome do canal; rótulos do formulário; `@usuario`; textos de botão | `text-[1.0625rem] leading-snug font-normal` (17px), caixa normal |
| **O — Ornamento** | numeral `01–04` do `Fio` | `font-display text-sm tracking-[0.22em] text-gold-400` + traço dourado (do `Fio`, `aria-hidden`) |

Regras:
- **Pesos:** `font-medium` só em D e T. Botões `font-normal`.
- **Caixa-alta:** nenhuma. Trajan só nos numerais. `Sobretitulo` não é usado ("Formulário"/"Atendimento" continuam fora, como na V1 e V2 — o numeral já marca a parte).
- **Cor:** D/T/L `text-foreground`; C `text-muted-foreground`; R `text-muted-foreground` nos canais e redes, `text-foreground` nos rótulos de campo. O subtítulo (L) em `text-foreground/90`.
- **Medida:** tudo dentro de `max-w-[42rem]` na coluna; C em `max-w-[52ch]`.
- Números com `tabular-nums`; e-mail com `<wbr />` depois do "@".

### 0.2 Ajuste compartilhado — `formulario-contato.tsx`
Mesma mudança descrita em `05-contato-v2.md` §0.2 (prop opcional `classes?: { rotulo?: string }`, V1 intacta). A V3 passa `classes={{ rotulo: "font-normal" }}`. Os campos seguem `bg-background` do componente — a parte do formulário é muted, então o campo se destaca como na V1. Envio: PENDÊNCIA #1 inalterada (nenhuma requisição; aviso honesto).

### 0.3 Mapa do rodapé
`mapa-rodape.tsx` já esconde o mapa do rodapé em qualquer caminho que comece com `/site5/contato` — cobre `/v3`. **Nenhum ajuste.** A V3 mostra o mapa na parte 03.

### 0.4 Invariantes
- Um `<h1>`; `<h2>` na ordem do documento: "Envie sua mensagem", "Fale com a nossa equipe", "Endereço", "Redes sociais".
- Grids `grid-cols-1` na base + `min-w-0` em todo filho. Esta página não usa `Section` (a casca é `recepcao.tsx`); se algum bloco usar, `py-0 md:py-0 lg:py-0`.
- **Sticky:** nenhum ancestral da coluna da foto pode ter `overflow-hidden`/`overflow-auto` (use `overflow-clip` só onde precisar, e nunca na casca). O `<main>` do layout não tem overflow — ok.
- Links externos `target="_blank" rel="noopener noreferrer"` + sr-only " (abre em nova aba)". `tel:`/`mailto:` sem nova aba.
- Foco: botão dourado `focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background`; botão outline na parte muted `ring-offset-background` também (muted/40 é translúcido sobre background); linhas-link `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md`.
- `next/image` `quality={95}`, `sizes` com `(max-width: 1023px)`.
- Nada depende de hover. Sem `hyphens-auto`.

---

## Casca — `recepcao.tsx`

- `<div className="relative lg:grid lg:grid-cols-12">` (sem `overflow`; `align-items` padrão `stretch`, para a célula da foto ter a altura da coluna inteira e o sticky funcionar).
- `<PainelFoto />` na primeira célula (`lg:col-span-5`); `<div className="min-w-0 lg:col-span-7">` com `<Abertura /> <Mensagem /> <Atendimento /> <Endereco /> <Redes />`.
- DOM: foto → abertura → partes. Leitor de tela: a foto tem alt informativo (é o espaço real) e vem antes do H1 — aceitável, é o mesmo padrão do hero da home no mobile; se o auditor preferir, `order` visual com a foto depois no DOM (`lg:order-first`).

## Painel da foto — `painel-foto.tsx`

**Ideia:** a recepção do escritório presente a página inteira.

- Célula `div.relative min-w-0 lg:col-span-5`.
- Moldura `div.relative mt-18 aspect-[5/4] max-h-[60svh] w-full overflow-hidden sm:aspect-[16/9] lg:sticky lg:top-0 lg:mt-0 lg:aspect-auto lg:h-dvh lg:max-h-none [@media(orientation:landscape)_and_(max-height:30rem)]:aspect-[21/9]`.
  - `mt-18` no mobile/tablet: a foto começa abaixo do header, como no hero da home. No `lg+` ela sobe por trás do header transparente (o `<main>` tem `-mt-18`).
- `Image src={fotosEspaco.recepcaoFrontal.src} alt={fotosEspaco.recepcaoFrontal.alt} fill preload quality={95} sizes="(max-width: 1023px) 100vw, 42vw" className="object-cover object-[50%_30%] lg:object-[50%_45%]"`. **É o LCP:** `preload`, sem `Revelar`, sem animação.
  - Enquadramento: mobile 5:4 corta na altura do painel com a marca e do topo do balcão; 16:9 (sm–md) idem; `lg` mostra a foto quase inteira (balcão + painel + atendente).
- Camadas (`aria-hidden`, `pointer-events-none`):
  - Base, só < lg: `absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-background/0 to-background` (a foto funde no azul antes do H1 — mesma receita do hero da home).
  - Topo, só lg+: `absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background/80 to-background/0` — legibilidade do logotipo do header sobre o mármore claro.
  - Borda direita, só lg+: `absolute inset-y-0 right-0 w-px bg-gold-500/40` — fio dourado vertical que separa foto e coluna (1px, não é `rule-gold`).
- Sem texto sobre a foto (mármore claro não sustenta contraste sem véu pesado).

## 1. Abertura — `abertura.tsx`

**Ideia:** o nome da página e o caminho mais curto para falar com a equipe.

**Dominante:** o H1.

- `<div className="relative -mt-10 px-6 pb-16 sm:-mt-14 md:px-10 md:pb-20 lg:mt-0 lg:pt-44 lg:pb-24 lg:pl-16 xl:pl-24 lg:pr-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">` › `div.max-w-[42rem]`. (Mesmo padding horizontal de `movimento.tsx` — a borda esquerda da coluna é uma só.)
- `<h1 className="…D">` `contatoPagina.titulo` — 2 linhas ("Entre em / contato") em todas as larguras da coluna; `max-w-[9ch]` garante a quebra igual.
- `<span aria-hidden className="rule-gold mt-8 block h-px w-24" />`.
- `<p className="mt-7 max-w-[34ch] …L text-foreground/90">` `contatoPagina.subtitulo`.
- CTA `Button asChild size="lg" className="mt-9 h-auto min-h-14 w-full whitespace-normal px-8 py-3 text-[1.0625rem] font-normal shadow-gold sm:w-auto focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-background"` › `<a href={whatsappHref} target="_blank" rel="noopener noreferrer">` `WhatsAppGlyph size-5` + `home.contato.botao` + sr-only. **Único `shadow-gold`.**
- Motion: H1, filete, subtítulo, CTA em cascata `animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700` (`delay-0/150/200/300`), `motion-reduce:animate-none`. Foto sem animação.
- **375×812:** header 72 → foto 5:4 = 300px (até 372) → abertura sobe 40px sobre o degradê → H1 2 linhas de 40px até ~415 → filete ~447 → subtítulo 2 linhas até ~530 → CTA largura total até ~610. CTA na primeira tela, com a foto acima.
- **1024:** coluna 7/12 ≈ 597px, útil ≈ 493px; H1 a ~70px em 2 linhas. **1440:** H1 84px; coluna útil 42rem.

## Casca das partes — `movimento.tsx`

`Movimento({ id, numero, titulo, paragrafo?, superficie = "base" | "muted", children })`:
- `<section id={id} aria-labelledby={`titulo-${id}`} className={cn("scroll-mt-20 px-6 py-16 md:px-10 md:py-20 lg:py-24 lg:pl-16 xl:pl-24 lg:pr-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]", superficie === "muted" ? "bg-muted/40" : "bg-background")}>` — a superfície sangra até a borda direita da tela e encosta no fio dourado da foto.
- `div.max-w-[42rem]` › `<Revelar><Fio numero={numero} /></Revelar>` (`@/components/site5/sobre-v2/fio`, alinhamento início, tom escuro, sem rótulo = numeral + traço) › `<h2 id={`titulo-${id}`} className="mt-6 …T">` › se houver, `<p className="mt-5 max-w-[52ch] …C">` › `children` (cada parte cuida do seu `mt-10`).
- `Revelar` no cabeçalho (subir) e no conteúdo (`atraso={80}`).

## 2. 01 — Envie sua mensagem — `mensagem.tsx`

**Ideia:** preencher e mandar, sem distração.

**Dominante:** o formulário.

- `<Movimento id="mensagem" numero="01" superficie="muted" titulo={formulario.titulo} paragrafo={formulario.paragrafo}>` › `<Revelar atraso={80} className="mt-10 min-w-0">` › `<FormularioContato campos={formulario.campos} botao={formulario.botao} ui={formulario.ui} whatsapp={contato.whatsapps[0]} telefone={contato.telefoneFixo} classes={{ rotulo: "font-normal" }} />`.
- Sem cartão: os campos (`bg-background`, `h-14`, `rounded-xl`) sobre o muted bastam.
- 1024: coluna útil ~493px → Telefone e E-mail lado a lado a ~236px cada (cabe; o `sm:grid-cols-2` do componente dispara pela janela). 375: tudo em uma coluna de 327px.

## 3. 02 — Fale com a nossa equipe — `atendimento.tsx`

**Ideia:** os quatro canais como uma ficha — rótulo à esquerda, valor à direita, linhas finas.

**Dominante:** a ficha.

- `<Movimento id="atendimento" numero="02" titulo={atendimento.titulo} paragrafo={atendimento.paragrafo}>` › `<Revelar atraso={80} asChild><ul className="@container mt-10 border-t border-border">`.
- Ordem do documento: `contato.telefoneFixo`, `contato.whatsapps[0]`, `contato.whatsapps[1]`, `contato.email`.
- Cada `<li className="border-b border-border">` › `<a className="grid min-h-[4.5rem] grid-cols-[1.25rem_minmax(0,1fr)_1.25rem] items-center gap-x-4 rounded-md py-4 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none">`:
  - glifo `aria-hidden size-5 text-gold-400` (`PhoneIcon`, `WhatsAppGlyph`, `WhatsAppGlyph`, `MailIcon`);
  - `span.grid min-w-0 gap-0.5 @md:grid-cols-[9rem_minmax(0,1fr)] @md:items-baseline @md:gap-x-6`: `rotulo` (…R `text-muted-foreground`) + `exibicao` (…L `text-foreground tabular-nums break-words`; e-mail com `<wbr />` após "@");
  - seta: `ArrowUpRightIcon` nos WhatsApps (nova aba, + sr-only), `ArrowRightIcon` no telefone e no e-mail — `aria-hidden size-5 text-muted-foreground`, sempre visível.
- Container query (`@md` = 28rem da largura da lista): na coluna de 1024+ (≥ 493px) rótulo e valor ficam na mesma linha, com os valores alinhados numa segunda coluna — a "ficha". Abaixo disso (375, 768 com a coluna cheia ainda passa de 28rem → também em linha; em 320–430 empilha) o rótulo fica sobre o valor.
- Sem destaque de cor em nenhum canal — o destaque já é o botão da abertura.

## 4. 03 — Endereço — `endereco.tsx`

**Ideia:** onde fica, com o mapa emoldurado na própria coluna.

**Dominante:** o mapa.

- `<Movimento id="endereco" numero="03" superficie="muted" titulo={contatoPagina.endereco.titulo}>` (sem parágrafo).
- `<Revelar atraso={80}><address className="mt-8 not-italic">`: `contato.endereco.nome` (`block …L text-foreground`), `logradouro`, `bairroCidade`, `cep` (`block …C`).
- Mapa: `<MapaEscritorio className="relative mt-10 aspect-[4/3] w-full rounded-2xl ring-1 ring-border sm:aspect-[16/10]" />` (mesma receita; raio recortado pelo `overflow-hidden` do componente).
- Botão logo abaixo do mapa: `Button asChild variant="outline" size="lg" className="mt-6 h-auto min-h-12 w-full whitespace-normal px-6 py-3 text-[1.0625rem] font-normal sm:w-auto focus-visible:ring-2 focus-visible:ring-ring"` › `<a href={mapaLinkHref} target="_blank" rel="noopener noreferrer">` `MapPinIcon size-5` + `contatoPagina.formulario.ui.abrirMapa` + `ArrowUpRightIcon size-4` + sr-only.
- Sem foto da fachada: a foto da página é a recepção (uma foto só é decisão da V3).

## 5. 04 — Redes sociais — `redes.tsx`

**Ideia:** os três canais oficiais, na mesma régua da ficha de atendimento.

**Dominante:** a lista de redes.

- `<Movimento id="redes" numero="04" titulo={redes.titulo} paragrafo={redes.paragrafo}>` › `<ul className="mt-10 border-t border-border">`, `contato.redes.map((rede, i) => <Revelar asChild atraso={i * 70}><li className="border-b border-border">`:
  - `<a href={rede.href} target="_blank" rel="noopener noreferrer" className="grid min-h-20 grid-cols-[1.75rem_minmax(0,1fr)_1.25rem] items-center gap-x-4 rounded-md py-4 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none">`: `glifoDaRede[rede.rede]` `aria-hidden size-7 text-gold-400`; `span.min-w-0` com `rede.rotulo` (`block …L`) e, se houver, `rede.usuario` (`block …R text-muted-foreground break-words`); `ArrowUpRightIcon aria-hidden size-5 text-muted-foreground`; sr-only.
- **Ícone + nome, sempre.** Glifo maior que o da ficha (28 vs 20px) — as redes são reconhecidas pela marca.
- Última parte da coluna: fundo base encosta no rodapé (`bg-card` + `border-t`). Aqui o sticky da foto termina e ela sobe com a página.

## 6. `src/app/site5/contato/v3/page.tsx`

```
<Recepcao />
<SeletorVersao base="/site5/contato" atual={3} />
```
`metadata`: `title: "Entre em contato"`, `description: contatoPagina.atendimento.paragrafo`, `robots: { index: false, follow: false }`, `openGraph` com `contatoPagina.titulo` e `fotosEspaco.recepcaoFrontal`. Comentário no topo apontando para esta spec.

## 7. Checklist
- **320:** foto 5:4 (256px); H1 40px em 2 linhas; ficha empilhada (rótulo sobre valor); e-mail quebra no `<wbr>`; nada estoura.
- **375:** CTA na primeira tela (§1); formulário em uma coluna; redes em linhas de 80px.
- **768:** foto 16:9 em faixa; coluna em largura total com `md:px-10`; ficha em linha (lista ≥ 28rem).
- **1024:** split 5/7; foto `h-dvh` fixa durante toda a rolagem da coluna; conferir que o sticky solta no fim (antes do rodapé) e que o header lê bem sobre o degradê do topo.
- **1280 / 1920:** `lg:pr-[max(…)]` alinha a borda direita do conteúdo com o container do header; coluna útil limitada a 42rem; a foto em 1920 = ~800×1080 (arquivo tem 2400px de largura — nítido a 2x).
- **Paisagem no celular:** faixa 21:9, H1 logo abaixo.
- Zoom 200% / texto 150%: sem scroll horizontal; no `lg` com zoom 200% a janela efetiva cai abaixo de 1024 e a página volta ao empilhado.
- Um H1; quatro H2 na ordem do documento; um `shadow-gold`; um `rule-gold`; zero `uppercase`; `font-medium` só em H1/H2; nenhum texto < 17px (exceto numerais `aria-hidden`).
- Sem JS: foto, canais, mapa e redes funcionam; sticky é CSS puro. Submit válido: nenhuma requisição.
- Reduced-motion: cascata e `Revelar` desligados.
