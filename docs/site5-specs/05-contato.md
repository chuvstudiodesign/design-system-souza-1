# Contato `/site5/contato` — especificação de composição (art-director, 24/09/2026)

Mesma língua das specs 01–04. Arquivos em `src/components/site5/contato/`.

## Decisões do orquestrador
- **Ordem:** Atendimento (canais) ANTES do Formulário — aprovado (visitante quer falar agora; formulário ainda não envia).
- Sobretítulo "Atendimento" fica; "Formulário" sai (nome estrutural). Abertura sem sobretítulo "Contato" (repetiria o H1). Sem trilho numerado.
- **Microcópia de UI aprovada** (vai em `contatoPagina.formulario.ui` em `conteudo.ts`, comentada como "microcópia de UI, não é texto do cliente"):
  - nome vazio: "Informe seu nome."
  - telefone vazio: "Informe um telefone ou celular."
  - telefone inválido: "Confira o número e inclua o DDD."
  - e-mail inválido: "Confira o e-mail informado ou deixe o campo em branco."
  - assunto vazio: "Informe o assunto."
  - mensagem vazia: "Escreva sua mensagem."
  - aviso após envio válido: "O envio pelo formulário ainda não está disponível. Para falar com a equipe agora, use o WhatsApp ou o telefone:" + dois links com textos dos dados
  - link do mapa: "Abrir no Google Maps"
- **Mapa duplicado:** extrair o mapa do `footer.tsx` para `src/components/site5/mapa-escritorio.tsx` (Server) usado pelas duas; no rodapé, um wrapper client `mapa-rodape.tsx` (`usePathname`) retorna `null` em `/site5/contato`.
- **Parágrafo do formulário** ("A equipe retornará…") fica literal. Aviso aparece só após envio. Registrado em `docs/PENDENCIAS.md`: antes de produção, resolver o envio ou esconder o bloco do formulário.
- Sem JSON-LD (não há horário no copy).

## 0. Blocos
| # | Bloco | Arquivo | Superfície | Composição | Foto |
|---|---|---|---|---|---|
| 1 | Abertura + Atendimento | `abertura.tsx` + `painel-atendimento.tsx` (Server) | base | texto 5/12 esq.; painel 6/12 dir. | — |
| 2 | Formulário | `formulario.tsx` (Server) + `formulario-contato.tsx` (**Client**) | muted | formulário 7/12 esq., texto 4/12 dir. (sticky) | — |
| 3 | Endereço | `endereco.tsx` (Server) + `@/components/site5/mapa-escritorio` | base, py-0 | texto+foto 5/12 esq.; mapa 7/12 sangrando à direita | `fotosEspaco.fachadaDia` |
| 4 | Redes sociais | `redes.tsx` (Server) | navy | título 5/12; 3 linhas-link 6/12 | — |

- Trajan (`font-display uppercase`): H1 "Entre em contato", H2 "Endereço", H2 "Redes sociais". "Fale com a nossa equipe" e "Envie sua mensagem" em Inter `font-medium`.
- Corpo `text-[clamp(1.0625rem,1rem+0.25vw,1.1875rem)] leading-relaxed`; lead `text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] leading-snug`; nada < 17px (rótulos uppercase `text-sm` ok).
- Um h1; h2: "Fale com a nossa equipe", "Envie sua mensagem", "Endereço", "Redes sociais". Um `rule-gold` (bloco 1), um `shadow-gold` (WhatsApp 1). Sem superfície gold.
- Links externos `target="_blank" rel="noopener noreferrer"` + sr-only " (abre em nova aba)".
- Grids com `grid-cols-1` na base; `min-w-0` nos filhos. Section com `py-0` precisa `md:py-0 lg:py-0` (o size padrão tem `md:py-28`).
- Foco dos botões dourados: `focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-<superfície>`.
- Botões que podem quebrar: `h-auto min-h-* whitespace-normal py-3`.

## 1. Abertura + Atendimento
- `<section className="relative isolate bg-background">` › `Container className="pt-28 pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24"` › `div.grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8 lg:items-start`.
- Texto `min-w-0 lg:col-span-5`: `<h1>` `contatoPagina.titulo` `font-display uppercase text-[clamp(2.25rem,1rem+4.6vw,4.5rem)] leading-[1.02] tracking-[0.01em] text-balance` (2 linhas "ENTRE EM / CONTATO"; conferir 1024); `span aria-hidden rule-gold mt-8 block h-px w-24`; `<p>` `contatoPagina.subtitulo` lead `mt-8 max-w-[34ch] text-foreground/90 text-pretty`.
- `PainelAtendimento` `min-w-0 lg:col-span-6 lg:col-start-7`: `Card` que só vira cartão a partir de sm: `gap-0 rounded-none bg-transparent p-0 shadow-none ring-0 sm:rounded-3xl sm:bg-card sm:p-8 sm:shadow-xl sm:ring-1 sm:ring-border lg:p-10` (neutralizar py/gap padrão).
  - `<Sobretitulo>` `atendimento.sobretitulo`; `<h2>` `atendimento.titulo` `mt-5 text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-tight font-medium tracking-tight text-balance`; `<p>` `atendimento.paragrafo` `mt-4 max-w-[52ch] text-muted-foreground text-pretty`.
  - WhatsApps `ul.mt-8 grid gap-3`, cada `<a>` inteiro `flex flex-col rounded-2xl p-5 sm:p-6 transition-colors motion-reduce:transition-none`: linha 1 `flex items-center gap-3` = `WhatsAppGlyph size-6` + `w.rotulo` (`text-sm tracking-[0.08em] uppercase`) + `ArrowUpRightIcon ml-auto size-5`; linha 2 `w.exibicao` `mt-2 block text-[clamp(1.375rem,1.2rem+0.8vw,1.75rem)] leading-tight font-medium tabular-nums tracking-tight whitespace-nowrap`.
    - WhatsApp 1: `bg-primary text-primary-foreground shadow-gold hover:bg-primary/90` + foco gold-200/offset (card ou background conforme largura — use `ring-offset-background` e confira), rótulo `text-primary-foreground/80`.
    - WhatsApp 2: `bg-background/40 ring-1 ring-border hover:bg-muted/60`, rótulo muted, glifo `text-gold-400`, foco `focus-visible:ring-2 focus-visible:ring-ring`.
  - Telefone e e-mail `ul.mt-6 divide-y divide-border border-y border-border`; cada `<a>` `flex min-h-16 items-center gap-4 py-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:[&_.valor]:underline underline-offset-4`: `PhoneIcon`/`MailIcon` `size-5 shrink-0 text-gold-400` aria-hidden; `span.min-w-0 flex-1` com rótulo (`contato.telefoneFixo.rotulo`/`contato.email.rotulo`, `block text-sm tracking-[0.08em] uppercase text-muted-foreground`) e valor `.valor block text-[clamp(1.125rem,1.05rem+0.35vw,1.3125rem)] font-medium` — no e-mail, `<wbr>` depois do "@". `tel:`/`mailto:` sem nova aba.
- 375: botão do WhatsApp 1 visível na primeira tela (viewport 812) — se não, reduzir espaços do bloco de texto.
- Motion: H1 `animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-700`; filete `delay-150`; subtítulo `delay-200`; painel `animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500 delay-150`; todos `motion-reduce:animate-none`. Sem Revelar.

## 2. Formulário
- `Section surface="muted" size="md" className="overflow-clip" aria-labelledby="titulo-formulario"` › Container › `div.grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8`.
- Texto (1º no DOM) `<Revelar className="min-w-0 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:sticky lg:top-28 lg:self-start">`: `<h2 id="titulo-formulario">` `formulario.titulo` `max-w-[16ch] text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.1] font-medium tracking-tight text-balance`; `<p>` `formulario.paragrafo` `mt-6 max-w-[40ch] text-muted-foreground text-pretty`.
- Form (2º) `<Revelar atraso={80} className="min-w-0 lg:col-span-7 lg:col-start-1 lg:row-start-1">` › `<FormularioContato …/>`. Sem cartão.
- **`formulario-contato.tsx`** (único `"use client"`): props do server (`campos`, `botao`, `ui`, `whatsapp = contato.whatsapps[0]`, `telefone = contato.telefoneFixo`) — não importar `conteudo.ts` no client.
  - `useForm` + `zodResolver`, `mode: "onTouched"`. `Form/FormField/FormItem/FormLabel/FormControl/FormMessage` de `@/components/ui/form`; `Input`, `Textarea` de ui.
  - zod: `nome` trim min1; `telefone` trim min1 + refine (só dígitos; se >11 e começa com "55", remove; resultado 10 ou 11 dígitos); `email` trim, vazio ou e-mail válido; `assunto` trim min1; `mensagem` trim min1. `maxLength` 120/20/120/120/2000.
  - `<form noValidate className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-5">`: Nome `sm:col-span-2`; Telefone + E-mail lado a lado; Assunto e Mensagem `sm:col-span-2`; ações `sm:col-span-2 mt-2`.
  - Rótulos `formulario.campos.*` visíveis acima; **sem placeholder**. `FormItem gap-2.5`; `FormLabel text-[1.0625rem] leading-snug font-medium text-foreground data-[error=true]:text-foreground`.
  - Input `h-14 rounded-xl bg-background px-4 text-[1.0625rem] md:text-[1.0625rem] dark:bg-background`; `type="tel" inputMode="tel" autoComplete="tel"`, `type="email" inputMode="email" autoComplete="email"`, `autoComplete="name"`; `aria-required` exceto e-mail.
  - Textarea `rows={6} min-h-44 max-h-[28rem] rounded-xl bg-background dark:bg-background px-4 py-3.5 text-[1.0625rem] md:text-[1.0625rem] leading-relaxed`.
  - FormMessage `text-base leading-snug font-medium` (confira contraste de `text-destructive` sobre muted/40 ≥ 4.5:1 — se não passar, reporte).
  - Botão `type="submit" size="lg" className="h-auto min-h-14 w-full whitespace-normal px-8 py-3 text-base sm:w-auto"` + `SendIcon size-5` + `formulario.botao`. Sem shadow-gold.
  - **Submit válido (PENDÊNCIA #1):** nenhuma requisição, não limpa campos, não desabilita. `indisponivel = true` → região `div aria-live="polite"` sempre no DOM abaixo do botão, com aviso (`Alert` sem `role="alert"`; `mt-6 rounded-2xl border-gold-500/40 bg-background p-5 text-[1.0625rem] leading-relaxed` + `InfoIcon`) contendo `ui.aviso` + links `inline-flex min-h-11 underline underline-offset-4` para `whatsapp.rotulo: whatsapp.exibicao` (nova aba) e telefone (tel:). Comentário `// PENDÊNCIA #1 — docs/PENDENCIAS.md: destino do envio não definido.`

## 3. Endereço
- `Section surface="base" className="overflow-clip py-0 md:py-0 lg:py-0" aria-labelledby="titulo-endereco"` › `div.grid grid-cols-1 lg:grid-cols-12 lg:min-h-[40rem]`.
- Texto `<Revelar className="min-w-0 px-6 py-20 md:px-10 md:py-24 lg:col-span-5 lg:py-28 lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">`: `<h2 id="titulo-endereco">` `contatoPagina.endereco.titulo` Trajan `text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-[1.15] tracking-tight`; `<address className="mt-8 not-italic">` com `contato.endereco.nome` (`block text-[clamp(1.1875rem,1.1rem+0.4vw,1.375rem)] font-medium`), `logradouro`, `bairroCidade`, `cep` (`block text-foreground/85 leading-relaxed`); `Button asChild variant="outline" size="lg" className="mt-8 h-auto min-h-12 w-full whitespace-normal py-3 px-6 text-base sm:w-auto"` › `<a href={mapaLinkHref} …>` `MapPinIcon` + `ui.abrirMapa` + `ArrowUpRightIcon` + sr-only; foto `<Revelar variante="zoom" className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border lg:aspect-[3/2]">` › `Image fotosEspaco.fachadaDia fill sizes="(max-width: 1023px) calc(100vw - 3rem), 32rem" className="object-cover object-[68%_55%]"`.
- Mapa `<MapaEscritorio className="relative h-[24rem] border-t border-border lg:col-span-7 lg:h-auto lg:min-h-full lg:border-t-0 lg:border-l" />` — mesma receita do rodapé (iframe `absolute inset-0 size-full border-0`, `mapaEmbedSrc`, `loading="lazy"`, `referrerPolicy`, `title` atual, mesmo filtro e camada). Sem raio.
- `contato.ts`: `export const mapaLinkHref = \`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contato.endereco.completo)}\`;`

## 4. Redes sociais
- `Section surface="navy" size="md" aria-labelledby="titulo-redes"` › Container › `div.grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8 lg:items-end`.
- Esq. `<Revelar className="min-w-0 lg:col-span-5">`: `<h2 id="titulo-redes">` `contatoPagina.redes.titulo` (Trajan como "Endereço"); `<p>` `redes.paragrafo` `mt-6 max-w-[44ch] text-navy-foreground/75 text-pretty`.
- Dir. `<ul className="min-w-0 grid grid-cols-1 gap-3 lg:col-span-6 lg:col-start-7">`, `contato.redes.map` em `<Revelar asChild atraso={i*70}><li>` › `<a>` `flex min-h-20 items-center gap-5 rounded-2xl bg-navy-foreground/5 px-6 py-4 ring-1 ring-navy-foreground/20 transition-colors hover:bg-navy-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-200 motion-reduce:transition-none`: `glifoDaRede[rede.rede]` `size-7 shrink-0 text-gold-400`; `span.min-w-0 flex-1` com `rede.rotulo` `block text-xl font-medium` e, se houver `usuario`, `block text-base text-navy-foreground/70`; `ArrowUpRightIcon size-5 shrink-0`; sr-only. **Ícone + nome, nunca só ícone.**

## 5. `src/app/site5/contato/page.tsx`
Abertura → Formulário → Endereço → Redes. `metadata`: `title: "Contato"`, `description: contatoPagina.atendimento.paragrafo`, noindex, openGraph com `contatoPagina.titulo` e `fotosEspaco.fachadaDia`.

## 6. Checklist
320 (H1 2 linhas; número do WhatsApp numa linha; e-mail quebra no `<wbr>`), 1024 (H1 na coluna 5/12; texto do form sticky), 1920 (`pl-[max]` do Endereço alinhado). Texto ampliado 150/200% sem scroll horizontal (o layout já tem `wrap-anywhere` herdado). Nada depende de hover. Reduced-motion. Sem JS: canais, mapa e redes funcionam. Nenhuma requisição de rede no submit.
