---
name: souza-site-content
description: Mapa do conteúdo do site institucional Souza & Souza — onde vive cada texto extraído, a arquitetura de rotas nova, os dados de contato canônicos e as regras de fidelidade ao copy do cliente. Carregue antes de escrever qualquer texto, rota ou metadado do site em /site. Dispara em: "conteúdo", "copy", "texto", "rota", "página", "serviços", "depoimentos", "equipe", "contato", "SEO", "metadata".
---

# Conteúdo do site Souza & Souza

## Onde está a matéria-prima

Pasta `Site/` na raiz do repositório — extração literal do site em produção (`advsouzaesouza.com`), reconferida contra o HTML em 27/07/2026.

| Arquivo | O que tem |
|---|---|
| `Site/01-CONTEUDO-COMPLETO.md` | Todo o copy num arquivo só |
| `Site/paginas/00-globais-header-footer.md` | Header, footer, contato, SEO, WhatsApp |
| `Site/paginas/01-home.md` … `07-contato.md` | Uma página por arquivo |
| `Site/00-MAPA-DO-SITE.md` | Navegação, comportamentos, 14 problemas catalogados |
| `Site/imagens/INVENTARIO.md` | As 24 imagens: origem, dimensões, papel |
| `Site/imagens/` | Os arquivos, em resolução original |

## Regra de fidelidade

O texto do cliente é **matéria-prima, não rascunho**. Não reescreva, não "melhore o tom", não resuma parágrafo institucional, não invente serviço, número, data, depoimento ou credencial.

Três exceções, todas já decididas:

1. **Erros de digitação são corrigidos.** `Usucapiao` → `Usucapião`, `Inventario` → `Inventário`, `Auxilio` → `Auxílio`, espaços duplos removidos, o bullet solto em "pareceres e opiniões • legais" removido, "órgãos públicos, privadas ou mistos" → "privados", o item "Atos de registro e averbação" duplicado aparece uma vez só, e os rótulos "Serviço contratado"/"Serviço Contratado" ficam padronizados em **"Serviço contratado"**.
2. **A nota "Métricas de 2021 a 2023" sai.** Os três números (+15 anos, +3.000 atendimentos, +2.000 processos previdenciários) ficam, sem carimbo de data.
3. **A seção "Publicações" da home é removida** — o feed do Instagram tem token expirado. O Instagram continua no rodapé.
4. **O slogan sai do parágrafo e vira destaque.** No pilar "Nosso Propósito", o original termina com "Cuidamos de Causas, Cultivamos Conexões: Souza & Souza, seu Direito, Nossa Dedicação." Essa frase é a única aparição do slogan em todo o site e fica enterrada no meio de um parágrafo. Ela sai do corpo do texto (em `pilares` de `conteudo.ts`) e passa a ser exibida como elemento próprio, a partir de `marca` em `contato.ts`. Nenhuma palavra é perdida — muda só onde aparece.

Nada além disso. Em dúvida, preserve o original e sinalize.

Itens que **exigem dado do cliente** e não podem ser inventados: números de OAB das 5 advogadas, URL do Facebook, métricas atualizadas. Onde faltarem, simplesmente não renderize o elemento — nunca preencha com placeholder plausível.

## Onde o copy já está estruturado

`src/lib/site/conteudo.ts` e `src/lib/site/contato.ts` já trazem tudo tipado: 7 áreas com 65 serviços, 9 depoimentos, 5 advogadas, 3 métricas, 3 pilares e os textos institucionais. **Importe de lá — não redigite texto em JSX.**

> São 65 e não os "64" citados em `Site/` porque a extração contava bullets: um bullet de Extrajudicial embalava dois serviços e o seguinte repetia um deles. Separados e deduplicados, dão 13 em vez de 12. Nenhum serviço novo foi inventado.

## Arquitetura de rotas nova

O site velho tinha 7 páginas com a mais importante órfã. O novo tem 5, sob o prefixo `/site`:

| Rota | Origem do conteúdo |
|---|---|
| `/site` | `01-home.md` — 5 seções (a de Publicações sai) |
| `/site/sobre-nos` | `02-sobre-nos.md` |
| `/site/servicos` | `03-servicos.md` + `04-servicos-2.md` unificados — 7 áreas, 65 serviços |
| `/site/equipe` | `05-profissionais.md` + `06-associadas.md` unificados — 3 sócias + 2 associadas |
| `/site/contato` | `07-contato.md` + conteúdo próprio novo |

Menu: Home · Sobre nós · Serviços · Equipe · Contato. Todo item aponta para uma página real — nenhuma âncora disfarçada de página, que é exatamente o defeito do site atual.

Os 4 cards de área da home (Previdenciário, Trabalhista, Civil, Tributário) **levam ao conteúdo real** em `/site/servicos#<area>`. No site velho eles abriam um lightbox de foto e não entregavam nada.

## Dados de contato — canônicos

Centralize em `src/lib/site/contato.ts` e importe. Nunca redigite:

| Dado | Valor |
|---|---|
| Endereço | Av Farid Miguel Safatle, Nº 771, Sala 2, Setor Central, Catalão/GO, CEP 75701-040 |
| Telefone fixo | (64) 3411-1815 |
| WhatsApp | (64) 98479-1815 |
| WhatsApp (link) | `https://api.whatsapp.com/send?phone=5564984791815` |
| Mensagem padrão | Olá, visitei o site e gostaria de falar com um advogado. |
| E-mail | atendimento@advsouzaesouza.com |
| Instagram | `https://www.instagram.com/souzaesouza.advocacia/` |
| Razão social | Souza & Souza Advocacia e Assessoria Jurídica |
| Cidade | Catalão / GO |
| Slogan | Cuidamos de Causas, Cultivamos Conexões |
| Assinatura | Souza & Souza, seu Direito, Nossa Dedicação |

O slogan e a assinatura aparecem **uma única vez** em todo o site velho, enterrados no meio do parágrafo do "Nosso Propósito". Merecem destaque próprio.

## Imagens

Ficam em `Site/imagens/` e precisam ser copiadas para `public/site/` antes do uso. Regras:

- `capa4.png` tem 3,8 MB — 38% do peso total. **Converter para WebP** antes de entrar em `public/`.
- Toda imagem precisa de `alt` descritivo. No site velho, 20 das 24 estão com `alt` vazio, incluindo todos os retratos das advogadas. Retrato recebe o nome e o papel: `alt="Paula Faids Carneiro Souza Sales, sócia e advogada"`.
- Imagem decorativa (caneta do hero, balança) recebe `alt=""` **e** `aria-hidden`, que é diferente de esquecer o alt.
- As fotos das duas associadas têm metade da resolução das sócias (~900px contra ~1706px). Não as exiba no mesmo tamanho grande — use enquadramento menor ou recorte quadrado.
- Sempre `next/image`. Import estático quando o caminho for fixo, para ganhar `width`/`height`/`blurDataURL` automáticos.

## SEO

Um `metadata` por rota. Título no padrão `<Página> — Souza & Souza Advocacia | Catalão - GO`.

**Cada página precisa de meta description própria.** No site velho 6 das 7 compartilham a mesma frase e `/contato/` não tem nenhuma.

**Exatamente um `<h1>` por página.** No site velho só a home tem `h1`; as outras 6 não têm nenhum — os títulos são `h2` de widget do Elementor.

Vale incluir JSON-LD `LegalService` com endereço, telefone e horário — é um escritório de advocacia local, e busca local é o principal canal.

---

## Variação 5 (`/site5`) — copy novo de 02/SET/2026

**Tudo acima vale para `/site`–`/site4`.** A variação 5 tem fonte própria e regras próprias. Quando a tarefa for em `/site5`, esta seção prevalece sobre qualquer decisão anterior.

### Fonte

| Arquivo | O que tem |
|---|---|
| `Material Site/Textos do site Versão Inicial 02_SET_2026.docx` | Original do cliente |
| `Site/paginas-v5/00-texto-integral.txt` | Transcrição literal do docx |
| `Site/paginas-v5/01-home.md` … `05-contato.md` | Uma página por arquivo |
| `src/lib/site5/conteudo.ts` / `contato.ts` | Tudo tipado — **importe daqui** |
| `public/site5/espaco/`, `public/site5/equipe/` | Fotos reais do escritório e das advogadas, em WebP (catálogo em `fotosEspaco`) |

### Rotas e menu

`/site5` · `/site5/sobre-nos` · `/site5/profissionais` · `/site5/servicos` · `/site5/contato`
Menu: Home · Sobre nós · Profissionais · Serviços · Contato (`src/components/site5/navegacao.ts`).

### O que muda em relação ao site 1–4

- **Publicações volta** na home — bloco com título, texto e botão "Acompanhe nossas publicações" que leva ao Instagram. Sem feed.
- **Métricas novas** com período: +5.000 atendimentos, +4.000 processos com êxito, +3.000 previdenciários com êxito — todas "2021 a 2025". O período **aparece**. O "+15 anos" não existe mais.
- **Facebook e LinkedIn têm URL** e são renderizados. **Dois WhatsApps.**
- **Sem slogan** ("Cuidamos de Causas…"): o copy novo não o traz. Não reintroduza.
- **7 áreas** com lista curta de itens cada; na home, 4 cards + 2 "botões de acesso" (Extrajudiciais, Diligências). Assessoria Jurídica só na página Serviços.
- **Depoimentos: os 9 originais**, sem reescrever (o documento pede explicitamente). Título e subtítulo da seção são os novos.
- **Formulário de contato: PENDÊNCIA** — interface completa, envio ainda não definido pelo cliente. Não integrar serviço de e-mail nem WhatsApp sem ordem. Ver `docs/PENDENCIAS.md`.
- Bio da Paula: frase repetida no docx aparece uma vez (decisão do cliente).

### Fidelidade

Mesma regra de sempre: literal. O docx tem uma frase de sobretítulo por bloco ("O Escritório", "Números", "Apresentação"…) — são rótulos de seção e podem virar sobretítulo. O sobretítulo **não** pode ser texto inventado.

### Fotos

Fotos das 3 sócias (Paula, Angela, Kelly) ainda são as do site antigo — `fotoProvisoria: true`. Bárbara e Flávia são novas. Fotos de área da home (mãe com criança etc.) ainda são banco de imagem do site antigo.
