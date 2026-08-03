---
name: souza-design-system
description: Referência canônica do design system Souza & Souza — tokens OKLCH de marca, tipografia Trajan Pro/Inter, escala de elevação, liquid glass e as regras de uso dos ~65 componentes shadcn do projeto. Carregue SEMPRE antes de escrever qualquer JSX ou classe Tailwind no site institucional (/site) ou no styleguide. Dispara em: "componente", "seção", "layout", "cor", "tipografia", "espaçamento", "dark mode", "card", "botão", "hero", "tokens".
---

# Design System Souza & Souza

Fonte da verdade: `src/app/globals.css`. **Nunca invente um valor que já é token.**

## Regra nº 1 — zero valores hard-coded

Proibido em qualquer arquivo de `src/app/site/` ou `src/components/site/`:

- Hex, `rgb()`, `hsl()` literais → use `bg-brand-900`, `text-gold-500`, `border-neutral-200`
- `shadow-[0_4px...]` → use `shadow-sm|md|lg|xl|2xl|gold`
- `rounded-[18px]` → use `rounded-md|lg|xl|2xl|3xl|4xl`
- Fontes literais → use `font-display` (Trajan) / `font-sans` (Inter)

Se um valor parece faltar no design system, **pare e reporte** em vez de improvisar. Ampliar o sistema é decisão do orquestrador, não do executor.

## Cor

Duas escalas de marca de 11 passos cada, geradas em OKLCH preservando o matiz oficial:

| Escala | Token oficial | Uso |
|---|---|---|
| `brand-50…950` | `brand-900` = `#0C344D` | Azul institucional. Superfícies escuras, texto de autoridade |
| `gold-50…950` | `gold-500` = `#BEA450` | Dourado. Acento, filetes, destaque — **nunca** como cor de corpo de texto |
| `neutral-50…950` | — | Cinza com temperatura azul (hue 240). Texto secundário, bordas |

Tokens semânticos (preferir sempre que houver um): `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `success`, `warning`, `info`, mais os atalhos de marca `navy` e `gold`.

**A inversão no dark mode é intencional e não é bug:** no claro `--primary` é o azul `brand-900`; no escuro `--primary` vira `gold-500`. Escreva com tokens semânticos e a inversão acontece sozinha. Se você fixar `bg-brand-900`, ela não acontece — o que às vezes é o certo (uma faixa que deve ser azul nos dois temas), mas precisa ser uma escolha consciente.

### Degradê dourado

Assinatura da marca. `bg-gold-gradient` (superfície) e `text-gold-gradient` (texto preenchido). Sempre a 45°, **nunca vertical** — os dois stops são hex fechados da identidade impressa e não devem ser convertidos.

`rule-gold` é o filete dourado horizontal (transparente → dourado → transparente), recurso gráfico recorrente. Use como separador de seção em vez de um `<Separator />` genérico quando o momento pedir presença de marca.

## Tipografia

| Família | Token | Papel |
|---|---|---|
| Trajan Pro | `font-display` | **Só capitulares.** Nome da marca, títulos de seção curtos, números de destaque. Tem apenas Regular e Bold, e não tem minúsculas de verdade |
| Inter | `font-sans` | Todo o resto: corpo, UI, subtítulos, listas |

Trajan em parágrafo é erro de design — ilegível em texto corrido e destrói a hierarquia. Título longo (o H1 da home tem 132 caracteres) vai em Inter, não em Trajan.

Use o componente `<Typography>` (`src/components/ui/typography.tsx`) em vez de recriar a escala:

`display` · `h1` · `h2` · `h3` · `h4` · `p` · `lead` · `large` · `small` · `muted` · `blockquote` · `list` · `overline` · `inlineCode`

`overline` (`text-xs tracking-[0.16em] uppercase text-muted-foreground`) é o sobretítulo da identidade — use para "Áreas de Especialização", "Previdenciário" etc.

⚠️ A variante `h2` do componente traz `border-b border-border pb-2` embutida. Em seções de marketing isso quase nunca é o que se quer — passe `className` para neutralizar, ou use `h3`/`display` com tamanho ajustado.

## Espaçamento e ritmo

Escala Tailwind padrão. Convenções do site institucional:

- Padding vertical de seção: `py-20 md:py-28 lg:py-32`
- Container: `mx-auto w-full max-w-7xl px-6 md:px-10`
- Gap entre título e corpo: `space-y-4`; entre blocos: `gap-8 md:gap-12`
- Grid de cards: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`

Seções alternam superfície para criar ritmo: `bg-background` → `bg-muted/40` → `bg-navy text-navy-foreground`. Nunca três seções seguidas com a mesma superfície.

## Elevação

`shadow-2xs` → `shadow-2xl`, todas tingidas de azul da marca (não pretas). `shadow-gold` é o halo dourado — reserve para o CTA principal de uma página, no máximo um por tela.

Raio: `--radius` = `0.75rem`. Escala derivada `rounded-sm` (0.375) → `rounded-4xl` (2.4rem). Cantos generosos são parte da evolução da marca; não aperte para `rounded-md` em cards grandes.

## Liquid glass

`<LiquidGlass>` (`src/components/ui/liquid-glass.tsx`) com presets em `LIQUID_GLASS_PRESETS`: `toolbar`, `panel`, `overlay` e outros. Props: `variant` (`regular` | `clear`), `thickness`, `elevation`, `tier`.

Degrada sozinho por browser (`lensed` → `frosted` → `solid`) e respeita Reduce Transparency. **Não force `tier`** fora de demos.

No site institucional use com parcimônia: header sticky e, no máximo, um elemento flutuante. Vidro sobre vidro vira sopa visual, e cada camada custa composição no scroll.

## Componentes

~65 componentes shadcn em `src/components/ui/`, já tokenizados para a marca. **Antes de escrever qualquer UI, verifique se o componente já existe** — a página de demonstração de cada um está em `src/app/styleguide/components/<slug>/page.tsx` e mostra a API real em uso.

Nunca crie um `<div>` estilizado à mão para algo que já é `Card`, `Accordion`, `Dialog`, `Carousel`, `Tabs`, `Badge` ou `Avatar`.

`Button` — variantes `default` · `outline` · `secondary` · `ghost` · `destructive` · `link`; tamanhos `xs` · `sm` · `default` · `lg` · `icon*`. As alturas são compactas (`default` = `h-8`); para CTA de hero, suba com `size="lg"` mais `className` de altura/padding — não invente um botão novo.

Para links que parecem botões: `<Button asChild><Link href="…">…</Link></Button>`.

## Ícones

`lucide-react`. Tamanho padrão herdado do botão (`size-4`). Não misture com PNG de ícone quando existir equivalente Lucide — exceto os 6 ícones próprios da marca em `Site/imagens/` (pilares e métricas), que são ativos do cliente e devem ser preservados.

## Checklist antes de dar uma seção por pronta

1. Zero hex, zero sombra ad hoc, zero raio arbitrário
2. Renderiza correto em **claro e escuro** (o site abre no escuro)
3. Responsivo em 375 / 768 / 1280 / 1920 — sem scroll horizontal
4. Trajan só em capitulares
5. Todo componente reutilizável veio de `src/components/ui/`
6. `npx tsc --noEmit` e `npm run lint` limpos
