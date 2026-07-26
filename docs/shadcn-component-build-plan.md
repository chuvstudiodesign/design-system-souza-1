# Plano de Execução — Biblioteca completa shadcn/ui (Design System Souza & Souza)

> Documento vivo. É a **fonte única de verdade** do progresso desta tarefa.
> Qualquer execução futura deve ler este arquivo, identificar o primeiro item
> pendente do checklist e continuar exatamente de lá.

**Última atualização:** 2026-07-26

---

## 1. Objetivo

Implementar a biblioteca oficial completa do shadcn/ui dentro deste projeto,
vestida com os tokens da marca Souza & Souza, com **página de showcase
documentada** para cada componente dentro do styleguide.

## 2. Estratégia de execução

1. Instalar via `npx shadcn@latest add <componentes>` tudo que existe no registry
   `@shadcn` (style `radix-nova`, já configurado em `components.json`).
2. Construir manualmente, com primitivas shadcn, o que **não existe** no registry
   (`form` no radix-nova, `date-picker`, `data-table`, `typography`, `toast`, `chat`).
3. Criar um kit de documentação reutilizável (`src/components/styleguide/`) para
   que cada página de showcase seja consistente: preview + código + props +
   acessibilidade + teclado.
4. Gerar uma página por componente em
   `src/app/styleguide/components/<slug>/page.tsx`.
5. Registrar cada componente em `src/app/styleguide/navigation.ts`.
6. Validar com `npm run build` + `npm run lint` e inspeção visual (light/dark).

## 3. Workflow por componente

1. Verificar no registry (MCP `search_items_in_registries` / `view_items_in_registries`).
2. Instalar (`npx shadcn@latest add`) — ou construir com primitivas se não existir.
3. Customizar apenas quando agrega (variantes extras, wrappers, estados).
4. Criar showcase em `src/app/styleguide/components/<slug>/page.tsx`.
5. Documentar: import, uso, props, variantes, acessibilidade, teclado, ARIA.
6. Atualizar `navigation.ts`.
7. Marcar como concluído neste documento.

## 4. Decisões de implementação

| # | Decisão | Motivo |
|---|---------|--------|
| 1 | Style `radix-nova` mantido | Já era o style do projeto; é o mais recente do registry. |
| 2 | `form.tsx` escrito à mão | O registry `radix-nova` publica `form` **sem arquivos** (foi substituído por `Field`). Mantivemos a API canônica (`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`) para compatibilidade com a documentação oficial. |
| 3 | `date-picker`, `data-table`, `typography`, `toast`, `chat` construídos | Não são itens `registry:ui` — na documentação oficial são páginas de composição. Implementados como componentes reutilizáveis seguindo os mesmos padrões. |
| 4 | `toast` como wrapper do Sonner | O `toast` legado foi descontinuado pelo shadcn em favor do Sonner; expomos uma API `toast()` compatível baseada em Sonner. |
| 5 | `data-table` usa `@tanstack/react-table` | É a stack oficial da documentação do shadcn para Data Table. |
| 6 | Páginas de showcase são Client Components | A maioria das demos exige estado/interatividade; sem `export const metadata` nessas páginas (título vem do layout do styleguide). |
| 7 | Kit de documentação compartilhado | `ComponentPage`, `DemoBlock`, `PropsTable`, `KeyboardTable`, `A11yNotes` garantem consistência e reduzem duplicação. |
| 8 | Componentes extras instalados | `button-group`, `item`, `kbd`, `native-select`, `input-group`, `empty`, `spinner`, `direction` vieram como dependências do registry; ficam disponíveis mesmo sem página dedicada obrigatória. |

## 5. Progresso atual — 100% CONCLUÍDO

- Fase 1 — Instalação do registry: **concluída** (61 itens `registry:ui` instalados).
- Fase 2 — Componentes customizados: **concluída** (`form`, `date-picker`, `data-table`, `typography`, `toast`, `chat`).
- Fase 3 — Showcases + navegação: **concluída** (58 páginas em `src/app/styleguide/components/`, todas registradas em `navigation.ts`).
- Validação: `npm run build` OK (63 rotas estáticas), `npx tsc --noEmit` OK,
  `npm run lint` sem erros (1 warning conhecido — ver seção 7).
- Inspeção visual: light e dark verificados via Chrome headless.

## 6. Checklist de componentes

### New
- [x] Attachment
- [x] Bubble
- [x] Marker
- [x] Message
- [x] Message Scroller

### Inputs & Forms
- [x] Button
- [x] Checkbox
- [x] Combobox
- [x] Date Picker
- [x] Field
- [x] Form
- [x] Input
- [x] Input OTP
- [x] Label
- [x] Radio Group
- [x] Select
- [x] Slider
- [x] Switch
- [x] Textarea
- [x] Toggle
- [x] Toggle Group

### Layout
- [x] Accordion
- [x] Aspect Ratio
- [x] Card
- [x] Carousel
- [x] Collapsible
- [x] Resizable
- [x] Scroll Area
- [x] Separator
- [x] Sheet
- [x] Sidebar
- [x] Skeleton

### Navigation
- [x] Breadcrumb
- [x] Command
- [x] Context Menu
- [x] Dropdown Menu
- [x] Menubar
- [x] Navigation Menu
- [x] Pagination
- [x] Tabs

### Overlay
- [x] Alert Dialog
- [x] Dialog
- [x] Drawer
- [x] Hover Card
- [x] Popover
- [x] Tooltip

### Feedback
- [x] Alert
- [x] Badge
- [x] Progress
- [x] Sonner
- [x] Toast

### Data Display
- [x] Avatar
- [x] Calendar
- [x] Chart
- [x] Data Table
- [x] Table

### Utilities
- [x] Typography

### AI
- [x] Chat

## 7. Problemas encontrados e soluções

| Problema | Solução |
|----------|---------|
| `npx shadcn add form` falha silenciosamente | O item existe no registry mas sem arquivos no style `radix-nova`. Implementado manualmente em `src/components/ui/form.tsx` a partir da versão canônica. |
| `react-resizable-panels` v4 mudou a API | A prop `direction` virou `orientation`, `autoSaveId` deu lugar a `defaultLayout` + `onLayoutChanged` e os tamanhos aceitam string (`"40%"`). Demos e documentação atualizadas para a v4. |
| `ComboboxChip` não aceita `value` | No Base UI o valor vem do contexto do chip; a demo passa apenas o children. |
| Colisão de nome em `breadcrumb/page.tsx` | O componente `BreadcrumbPage` do shadcn conflitava com o nome padrão da página; a página foi renomeada para `BreadcrumbShowcasePage`. |
| Lint `react-hooks/set-state-in-effect` no Carousel | O `carousel.tsx` do registry chama `setState` no corpo do efeito. A leitura inicial passou a rodar em um `setTimeout(…, 0)` (com cleanup), mantendo a API intacta. |
| Warning `react-hooks/incompatible-library` no Data Table | Esperado: o React Compiler não memoiza componentes que usam `useReactTable()`. É apenas um aviso do compilador, sem impacto funcional — mantido por ser a stack oficial do shadcn para Data Table. |

## 8. Estrutura entregue

```
docs/shadcn-component-build-plan.md      # este documento
src/components/ui/                       # 64 componentes (61 do registry + 5 customizados + form)
src/components/styleguide/
  ├── section.tsx                        # blocos da página de tokens
  └── component-page.tsx                 # ComponentPage, Demo, PropsTable, KeyboardTable, A11yNotes, Usage
src/app/styleguide/
  ├── layout.tsx                         # sidebar com todas as seções
  ├── navigation.ts                      # 58 componentes agrupados por categoria
  ├── page.tsx                           # design tokens
  └── components/<slug>/page.tsx         # 58 showcases
```

Cada showcase contém: instalação, import, demos por variante/tamanho/estado,
exemplos de código copiáveis, tabela de props, tabela de teclado (quando aplicável)
e notas de acessibilidade/ARIA.

## 9. Próxima ação

Nenhuma pendência nesta tarefa. Evoluções naturais a partir daqui:

- páginas para os componentes extras do registry (`button-group`, `item`, `kbd`,
  `native-select`, `input-group`, `empty`, `spinner`), hoje instalados mas sem showcase dedicado;
- blocos compostos (dashboard, login, formulários longos) usando estes componentes;
- testes de interação/acessibilidade automatizados sobre as páginas do styleguide.
