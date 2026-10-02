# Site 5 — progresso

Plano: duplicar `/site4` como `/site5` com o copy de 02/SET/2026 e 5 páginas. Leia isto primeiro ao retomar.

| Fase | Página | Status |
|---|---|---|
| 0 | Base (conteúdo tipado, fotos, duplicação, docs do time) | ✅ concluída 23/09 |
| 1 | Home `/site5` | ✅ construída, revisada (design/responsivo/conteúdo) e corrigida |
| 2 | Sobre nós `/site5/sobre-nos` | ✅ construída, revisada e corrigida (spec `02-sobre-nos.md`) |
| 3 | Profissionais `/site5/profissionais` | ✅ construída, revisada e corrigida |
| 4 | Serviços `/site5/servicos` | ✅ construída; conteúdo revisado (ordem Tributário/Civil corrigida); links da home testados |
| 5 | Contato `/site5/contato` | ✅ construída e verificada (formulário sem envio — pendência #1) |
| 6 | Auditoria final + build | ✅ auditoria a11y/SEO aplicada; `npm run build` limpo (24/09) |

## Fase 0 — o que existe
- `Site/paginas-v5/` — copy literal do docx, uma página por arquivo
- `src/lib/site5/conteudo.ts`, `contato.ts` — conteúdo tipado
- `public/site5/espaco/` (22 fotos do espaço) e `public/site5/equipe/` (5 retratos + grupo), WebP
- `src/app/site5/`, `src/components/site5/` — cópia do site4 + seções do site2 que a home usa. Imports já apontam para site5; componentes ainda leem o formato antigo de conteúdo (resolvido na Fase 1)
- Skill `souza-site-content` e agente orquestrador atualizados com a seção "Variação 5"

## Pendências
Ver `docs/PENDENCIAS.md`.

## Decisões do orquestrador (23/09)
- Rótulos estruturais do documento ("Introdução", "Fechamento") não aparecem na tela; "Apresentação" e "Perfis" aparecem.
- "Desde de outubro/2007" corrigido (erro de digitação).
- Facebook/LinkedIn exibem só o nome da rede (o documento não traz nome de perfil).
- `Trilho` compartilhado em `src/components/site5/trilho.tsx`.
- Rodapé: corpo mínimo 16px (créditos podem ser 14px).

## Observação para o cliente
- `/site/home/hero.webp` (6,5 MB, sem compressão por decisão da v4) é servido igual no celular. Recomendar versão leve para mobile.

## 24/09
- `wrap-anywhere` herdado no layout do site5: 0px de scroll horizontal em 320–1920 e com texto 150/200% em todas as rotas.
- Rodapé: WhatsApps com ícone próprio. Build de produção limpo.

## Fase 2 — 24/09 (execução autônoma; plano em `docs/PLANO-SITE5-FASE2.md`)
- **Home:**
  - hero com a estrutura do site 4 ("Experiência jurídica…" como preâmbulo, "Protegendo seu futuro, garantindo seus direitos." como H1);
  - foto das advogadas no topo no mobile;
  - fotos em qualidade 95, regeneradas dos originais;
  - menu "Entre em contato";
  - WhatsApp flutuante só depois do hero.
- **Versões para comparar** (seletor "Versão 1 · 2 · 3" no canto inferior direito de cada página):
  - Sobre nós: V2 "Revista", V3 "Planta"
  - Profissionais: V2 "Galeria", V3 "Diretório"
  - Serviços: V2 "Painéis", V3 "Capítulos"
  - Contato: V2 "Carta", V3 "Recepção"
- Specs em `docs/site5-specs/*-v2.md` e `*-v3.md`.
- **Quando o cliente escolher:**
  - mover a versão escolhida para a rota base;
  - apagar as outras;
  - remover o `<SeletorVersao />`.

## 29/SET/2026 — escolhas do cliente

- **Fotos:** usar sempre o ensaio **Agência K+** (`Material Site/…/ESPAÇO S&S Fotos Agência K+ - Editadas`), em resolução cheia (RAW → WebP q92, `quality={95}` no `<Image>`).
- **Home / Entre em contato:** foto nova `fachada-contato.webp` (versão tratada, sem postes/carros).
- **Home / hero (desktop):** foto de fundo passou de `opacity-30` para `opacity-50` (teste, reversível — comentário no `hero-foto.tsx`).
- **Sobre nós:** escolhida a **V2 "Revista"**, agora em `/site5/sobre-nos`. V1 e V3 guardadas em `src/app/site5/sobre-nos/_ocultas/` (sem rota, não apagadas).
  - Capa → DSC03972 (`recepcao-balcao-marca.webp`); Nosso diferencial → DSC04008 (`recepcao-espelho.webp`). Demais fotos mantidas.
- **Home e Sobre nós:** sobretítulo do topo em `font-bold` (Trajan 700), reversível.
- **Contato:** escolhida a **V2 "Carta"**, agora em `/site5/contato`. V1 e V3 em `src/app/site5/contato/_ocultas/`. Foto ao lado do mapa → `fachadaContato` (a mesma do Entre em contato da home).
- **Sobre nós — comparação de capa:** `/site5/sobre-nos/v2` = mesma página, capa com IMG_4002-HDR (site antigo, `recepcao-hdr-4002.webp`). Seletor voltou com 2 versões. A que o cliente não escolher vai para `_ocultas/`.
- **Home / Entre em contato:** ordem das variações invertida (FechoV2 abre como "1").
- **Tipografia (29/SET):** em todo o Site 5, `text-sm` (14px) → `text-[0.9688rem]` (15,5px) e `text-[0.8438rem]` (13,5px) → `text-[0.9375rem]` (15px). Componentes compartilhados (`src/components/site`, `ui/`) não mudaram.
- **Pendente:** escolha de versão de Profissionais e Serviços.

## 02/OUT/2026 — Site 5 vira o site principal

- **Rotas:** o Site 5 agora é **`/site`** (pasta `src/app/site/`). As versões anteriores foram para `/site-v1` (antigo `/site`), `/site-v2`, `/site-v3` e `/site-v4`. Componentes, `lib` e fotos continuam em `components/site5`, `lib/site5` e `public/site5`, e nenhum desses caminhos mudou.
- **Redirects** (`next.config.ts`): `/site5` → `/site` e `/site5/<página>` → `/site/<página>`, só para páginas, porque as fotos ainda moram em `/site5/...`. Também `/site2–4` → `/site-v2–4` e `/site/equipe` → `/site/profissionais`.
- **Home / Entre em contato (V1 e V2):** a foto passou a ser a IMG_4032 do site antigo (`fachada-hdr-4032.webp`). A página Contato continua com `fachada-contato.webp`.
- **Home / Áreas:** fotos novas do Unsplash (licença gratuita, uso comercial), 3 por área, em `public/site5/areas/`. As setas sob a foto trocam entre elas, e o painel guarda a última área apontada.
- **Sobre nós / Nossa experiência:** o díptico passou a usar IMG_3947 (`sala-hdr-3947.webp`) e IMG_3987 (`recepcao-hdr-3987.webp`).
- **Sobre nós / Nosso propósito:** a estampa foi deslocada para o canto direito, para não ficar atrás do texto.
- **Depoimentos:** passam sozinhos com 6–10 s cada, e o mouse em cima não pausa mais.
