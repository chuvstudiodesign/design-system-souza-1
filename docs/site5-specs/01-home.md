# Home `/site5` — especificação de composição (art-director, 23/09/2026)

Mantém a linguagem da v4 (escuro, trilho numerado, dourado, vidro nos diálogos) e ajusta ao copy novo.

## 0. Decisões gerais

**Ordem (a do documento):** Hero → O Escritório → Áreas → Números → Depoimentos → Publicações → Entre em contato.

| # | Seção | Arquivo | Superfície | `size` | Trilho |
|---|---|---|---|---|---|
| 1 | Hero | hero-foto.tsx | base + foto | próprio | — |
| 2 | O Escritório | manifesto.tsx | gold | lg | 01 |
| 3 | Áreas | indice-areas*.tsx, dialogo-area.tsx | base + estampa | lg | 02 |
| 4 | Números | faixa-numeros.tsx | muted | sm | — |
| 5 | Depoimentos | vozes.tsx | navy | lg | 03 |
| 6 | Publicações | **publicacoes.tsx (novo)** | muted | md | — |
| 7 | Entre em contato | fecho.tsx | base + foto sangrada | py-0 | 04 |

- Fotos reais: Hero mantém `/site/home/hero.webp` (atmosfera 30%). Fecho usa `fotosEspaco.fachada`. As demais fotos do espaço ficam para Sobre nós.
- Labels: hero reaproveita textos do cliente ("Entrar em contato" = `home.contato.botao`; "Áreas de Especialização" = `home.areas.sobretitulo`). Remover microcópias inventadas da v4 ("Falar com o escritório", "Fale com o escritório para orientação sobre o seu caso.", "Conhecer o escritório"). Labels de UI aprovados: "Ver em Serviços", "Ver todos os depoimentos", "Ver menos depoimentos".
- Novo `src/components/site5/glifos.tsx`: extrair `InstagramGlyph` (de footer.tsx) e o glifo do WhatsApp (de whatsapp-float.tsx), mais glifos de Facebook e LinkedIn para o footer. Todos importam de lá.

## 1. Hero — `hero-foto.tsx`
Dominante: H1 `home.hero.titulo`.
- **Permanece:** foto opacity-30 object-left unoptimized preload aria-hidden; degradê `from-background/0 to-background`; paddings `pt-28 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36`; `rule-gold`; cascata `animate-in … motion-reduce:animate-none`.
- **Muda:** remover lógica preambulo/promessa. H1 inteiro, `lg:col-span-10 text-balance`, mesma escala `text-[clamp(2.5rem,1.1rem+5.6vw,5.25rem)] leading-[0.98] tracking-[-0.03em] font-medium`. Sobretítulo `<Sobretitulo>` = `home.hero.sobretitulo`.
- Após o filete: grid `lg:grid-cols-12 lg:items-end`.
  - Esq. `lg:col-span-7`: p1 `text-[clamp(1.125rem,1.05rem+0.35vw,1.3125rem)] text-foreground/85 max-w-[56ch] text-pretty leading-relaxed`; p2 `mt-4 text-[clamp(1.0625rem,1rem+0.25vw,1.125rem)] text-muted-foreground max-w-[62ch] leading-relaxed`.
  - Dir. `lg:col-span-5 lg:justify-self-end`, `flex flex-col gap-3 sm:flex-row`: primário `Button size="lg" className="h-12 px-6 text-base"` glifo WhatsApp + "Entrar em contato" → `whatsappHref` (_blank noopener); secundário `variant="ghost"` "Áreas de Especialização" + ArrowDownIcon → `#areas`.
- Mobile: sobretítulo → H1 → filete → p1 → p2 → botões `w-full`.

## 2. O Escritório — `manifesto.tsx`
Dominante: H2 `home.escritorio.titulo` sobre dourado.
- **Permanece:** `Section surface="gold" size="lg" className="overflow-clip"`, estampa pattern[1] + AjusteEstampa, grid trilho 3/12 + 8/12 a partir da col 5, cores fixas brand-950/brand-900, Revelar.
- Trilho: "01" (Trajan, brand-950) + `home.escritorio.sobretitulo` como `<p>` (`text-sm tracking-[0.08em] uppercase text-brand-900`).
- H2 `max-w-[22ch]`, escala `clamp(1.75rem,1.2rem+2.2vw,3rem)`.
- p1 lead `mt-8 max-w-[52ch] text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug text-brand-950`; p2 `mt-5 max-w-[62ch] text-[clamp(1.0625rem,1rem+0.3vw,1.1875rem)] leading-relaxed text-brand-900`.
- Botão (não link): `Button asChild size="lg" className="mt-10 h-12 px-6 text-base bg-brand-950 text-navy-foreground hover:bg-brand-900 w-full sm:w-auto"` → `<Link href="/site5/sobre-nos">` `home.escritorio.botao` + ArrowRightIcon.

## 3. Áreas
### 3a. `indice-areas.tsx`
- **Permanece:** `Section surface="base" size="lg" className="overflow-clip"`, estampa 02 + AjusteEstampa, trilho 3/12, lista `lg:col-span-5 lg:col-start-4`, painel sticky decorativo `lg:col-span-3 lg:col-start-10 aspect-[3/4] rounded-2xl` (oculto < lg, aria-hidden, crossfade), linhas `border-b first:border-t`, número Trajan, `opacity-40` nas não ativas.
- Dados: `areasEmDestaque` (4) + `areasDeAcesso` (2); remover `contarServicos` e "N serviços"; `institucional.*` → `home.areas.*`.
- `<section id="areas" className="scroll-mt-24 …">`.
- Trilho: "02" + `<h2>` = `home.areas.sobretitulo`; abaixo `<p>` `home.areas.titulo` `mt-6 max-w-[34ch] text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty`.
- Linha: nome `clamp(1.375rem,1.05rem+1.3vw,2.125rem)`; `resumoHome` sempre visível `mt-2 block text-[1.0625rem] leading-relaxed text-muted-foreground max-w-[52ch]`; ArrowUpRightIcon sempre visível em muted, hover/focus → `text-gold-400` + translate-x. Nada depende de hover.
- Toda linha é `<button aria-haspopup="dialog">`; remover opt-in `areasComDialogo` e ramo `<Link href="/site/servicos">`. Props: `aoAbrirArea: (slug) => void`. Remover `painelAtenuado`; estado inicial = 1ª área.
- **Bloco de acesso novo** abaixo da lista: `lg:col-span-9 lg:col-start-4 mt-4 grid gap-4 sm:grid-cols-2`. Cada item `<Link href={`/site5/servicos#${slug}`} className="group …focus-visible:ring-2 ring-ring">` envolvendo `Card` `rounded-2xl bg-card/40 ring-1 ring-border p-6 transition-colors hover:bg-card/70`: nome `text-lg font-medium` + ArrowRightIcon à direita (sempre visível); `resumoHome` `mt-2 text-[1.0625rem] leading-relaxed text-muted-foreground`. Sem número nem foto.
- Motion: Revelar na lista e nos tiles (atraso 0/70); crossfade `motion-reduce:transition-none`.

### 3b. `indice-areas-dialogo.tsx`
Tipo `AreaDeAtuacao`, fonte `areasEmDestaque`, remover `AREAS_COM_DIALOGO`; resto permanece.

### 3c. `dialogo-area.tsx`
- **Permanece:** LiquidGlass asChild em DialogPrimitive.Content, VIDRO_DIALOGO, fundo próprio com data-state, `modal={!vidro}`, onInteractOutside, `dark` no portal, cabeçalho/corpo rolável/rodapé, Card translúcido por item.
- **Sai:** ROTULOS_VITRINE, agrupar/subgrupos/contarServicos, asterisco de parceria, altura fixa e line-clamp, `title=`.
- Largura `w-[min(48rem,calc(100vw-2rem))]`.
- Cabeçalho: sobretítulo `home.areas.sobretitulo`; DialogTitle `area.nome` Trajan; `rule-gold w-24`; DialogDescription `area.descricao` `mt-4 max-w-[60ch] text-[1.0625rem] leading-relaxed text-foreground/85`.
- Corpo: `<ul className="grid gap-3 sm:grid-cols-2">` com `area.itens`; cada li `Card size="sm"` `bg-card/45 ring-foreground/15`, altura auto; número Trajan `text-gold-400 text-xs` + texto `text-[1.0625rem] leading-snug`.
- `area.nota`: `mt-6 border-l-2 border-gold-500/60 pl-4 text-base leading-relaxed text-muted-foreground max-w-[60ch]`.
- Rodapé: `flex flex-col-reverse gap-3 sm:flex-row sm:justify-end`: `Button variant="outline" size="lg" asChild` → `/site5/servicos#${slug}` "Ver em Serviços" + ArrowRightIcon; `Button size="lg" asChild` glifo WhatsApp + `home.contato.botao` → `whatsappHref`. Ambos `w-full sm:w-auto h-11`. Remover frase inventada e botão Fechar do rodapé.
- X de fechar: alvo 44px (`size-11`), `top-3 right-3`.
- `motion-reduce:animate-none` no conteúdo e no fundo.

## 4. Números — `faixa-numeros.tsx`
- `surface="muted" size="sm"`, remover border-t. `dl` 3 colunas `sm:divide-x`, `divide-y` no mobile.
- Cabeçalho acima do dl: `flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-10`: `<Sobretitulo>` `home.numeros.sobretitulo` + período uma vez (`text-base text-muted-foreground`) — se todos `periodo` iguais mostra uma vez, senão por item.
- Numeral `font-display text-[clamp(2.75rem,1.9rem+3vw,4.5rem)] leading-none`.
- Rótulo `mt-3 text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-snug text-foreground/80 max-w-[22ch]`, caixa normal.
- A11y: `<dt className="sr-only">` = `${rotulo}, de ${periodo}`; rótulo visível aria-hidden.
- Revelar asChild atraso i*70. Sem contador animado.

## 5. Depoimentos — `vozes.tsx`
- **Permanece:** `Section surface="navy" size="lg"`, trilho 3/12 número `text-gold-400`, destaque blockquote `clamp(1.5rem,1.1rem+1.9vw,2.75rem)` (Elton Dias Souto), figcaption autor + filete + serviço (omitido se null), apoios sem card separados por `border-t border-navy-foreground/15`, seleção por autor.
- Trilho: "03" + `home.depoimentos.sobretitulo` (`<p>`).
- Coluna 9/12 antes do destaque: `<h2>` `home.depoimentos.titulo` `text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-medium tracking-tight text-balance max-w-[30ch]`; `<p>` `home.depoimentos.paragrafo` `mt-5 max-w-[62ch] text-[1.0625rem] leading-relaxed text-navy-foreground/75`; `mt-14` e o figure destaque.
- Apoios visíveis (3): Neri Celso, Chácara Paquetá, Angela Noronha. `grid gap-x-10 gap-y-12 lg:grid-cols-3` (sem md:grid-cols-3). Texto `text-[1.0625rem] leading-relaxed text-navy-foreground/80`, `whitespace-pre-line`.
- Os 5 restantes (Geraldo, Messias, William, Silvia, Sirlene) num `Collapsible` (ui): trigger `Button variant="link" className="h-auto px-0 text-base text-gold-400"` "Ver todos os depoimentos"/"Ver menos depoimentos" + ChevronDownIcon `data-[state=open]:rotate-180`; `CollapsibleContent forceMount className="data-[state=closed]:hidden"`; mesmo grid, `mt-12 border-t pt-12`; entrada `animate-in fade-in duration-300 motion-reduce:animate-none`.
- Remover rodapé com `depoimentosSubtitulo` e link para `/site/sobre-nos`.

## 6. Publicações — `publicacoes.tsx` (NOVO)
Peças: Section, Container, Sobretitulo, Card, Button, BrandSymbol (o do Footer), InstagramGlyph.
- `Section surface="muted" size="md"` › Container › `grid gap-12 lg:grid-cols-12 lg:items-center`.
- Esq. `lg:col-span-6`: `<Sobretitulo>` `home.publicacoes.sobretitulo`; `<h2>` `home.publicacoes.titulo` `mt-5 text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance max-w-[18ch]`; `<p>` `mt-6 max-w-[52ch] text-[clamp(1.0625rem,1rem+0.3vw,1.1875rem)] leading-relaxed text-muted-foreground text-pretty`.
- Dir. `lg:col-span-5 lg:col-start-8`: `Card` `rounded-3xl bg-card ring-1 ring-border shadow-lg p-8 md:p-10`:
  - Perfil `flex items-center gap-5`: avatar `size-20 shrink-0 rounded-full bg-gold-gradient p-1` › `size-full rounded-full bg-card grid place-items-center` › `<BrandSymbol size={40} />` aria-hidden; ao lado (`min-w-0`) "Instagram" + InstagramGlyph `size-4` (`flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-muted-foreground`) e `contato.redes[0].usuario` `mt-1 text-xl font-medium break-words`.
  - `div aria-hidden className="rule-gold my-8 h-px w-full"`.
  - `Button asChild size="lg" className="h-12 w-full text-base"` › `<a href={instagramHref} target="_blank" rel="noopener noreferrer">` `home.publicacoes.botao` + ArrowUpRightIcon + `<span className="sr-only"> (abre em nova aba)</span>`.
- Sem Facebook/LinkedIn aqui, sem posts falsos, sem imagem. Revelar no texto; `Revelar variante="zoom" atraso={80}` no cartão.

## 7. Entre em contato — `fecho.tsx` (reescrita)
- **Sai:** `marca.slogan`, grade de 3 canais com e-mail, layout trilho+9.
- `Section surface="base" className="py-0 overflow-clip"` › `div.grid lg:grid-cols-2` (sem Container no grid).
- Texto: `px-6 py-24 md:px-10 md:py-32 lg:py-40 lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]`:
  - "04" Trajan xs `text-gold-400` aria-hidden; `<Sobretitulo className="mt-4">` `home.contato.sobretitulo`;
  - `<h2>` `home.contato.titulo` `mt-6 font-display uppercase text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-[1.15] tracking-tight text-balance`;
  - `<p>` `mt-6 max-w-[48ch] text-[clamp(1.0625rem,1rem+0.3vw,1.1875rem)] leading-relaxed text-muted-foreground`;
  - CTA `Button asChild size="lg" className="mt-10 h-14 px-8 text-base shadow-gold w-full sm:w-auto"` glifo WhatsApp + `home.contato.botao` → `whatsappHref` (único shadow-gold da página);
  - `mt-8 border-t border-border pt-6` ul `text-base`: "WhatsApp" + os dois `contato.whatsapps` (links _blank); "Telefone" + `contato.telefoneFixo` (tel:); MapPinIcon + `contato.endereco.completo`. Rótulos muted, links `underline-offset-4 hover:underline`, `py-2.5` por linha.
- Foto: `relative aspect-[4/3] lg:aspect-auto lg:min-h-full` › `Image src={fotosEspaco.fachada.src} alt={fotosEspaco.fachada.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-[50%_45%]"`. Sem priority, sem overlay. Mobile: texto primeiro, foto depois em largura total.
- Revelar no texto; `Revelar variante="zoom"` na foto.

## 8. `src/app/site5/page.tsx`
`<HeroFoto /> <Manifesto /> <IndiceAreasDialogo /> <FaixaNumeros /> <Vozes /> <Publicacoes /> <Fecho />`. Atualizar comentário; metadata com `description` = `home.hero.paragrafos[0]`, `robots` noindex.

## 9. Layout compartilhado (necessário para compilar)
- `footer.tsx`: remover `marca.slogan` (parágrafo passa a "Advocacia e assessoria jurídica em Catalão/GO" — composto de `home.hero.sobretitulo`, usar esse texto literal); `contato.whatsapp` → os dois `contato.whatsapps`; `contato.instagram` → as 3 `contato.redes` com ícones; remover `razaoSocial` (usar `nomeCurto`); links internos → rotas `/site5`; glifos de `glifos.tsx`.
- `header-marca.tsx`: `contato.whatsapp` → `whatsappHref`/`contato.whatsapps[0]`; logo → `/site5`.
- `whatsapp-float.tsx`: usar `whatsappHref` do site5 e glifo de `glifos.tsx`.

## 10. Checklist
- Corpo ≥ 17px em tudo. Nada depende de hover.
- Matriz 320/375/768/1024/1280/1920; atenção: `min-w-0` no @usuário; `pl-[max(...)]` do Fecho em 1920; diálogo em 375.
- Um `<h1>`. Um `shadow-gold`. Zero hex, zero sombra/raio arbitrário.
