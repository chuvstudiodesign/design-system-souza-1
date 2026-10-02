# Plano de desenvolvimento — Site 5, fase 2

> Pedido do usuário em 24/09/2026 (madrugada), para execução autônoma de ponta a ponta enquanto ele dorme.
> **Se a sessão cair: leia este arquivo, ache o primeiro item `[ ]` e continue dali.** Não pergunte nada ao usuário. Marque cada item `[x]` ao concluir.

## Regras que valem para tudo

- [x] Sites 1 a 4 **não podem mudar**. O `/site4/sobre-nos` continuar vazio é o correto.
- **Texto:** exatamente o do documento `Material Site/Textos do site Versão Inicial 02_SET_2026.docx`, transcrito em `Site/paginas-v5/`. Não criar, não adaptar, não resumir.
  - Única exceção pedida pelo usuário: manter "Protegendo seu futuro, garantindo seus direitos." no hero (ver Home).
- **Diagramação é do site, não do documento.** Tamanhos e estrutura seguem o design system e a Home. Parágrafos do mesmo bloco têm o mesmo tamanho.
- **Imagens em qualidade máxima**, do jeito do hero: sem recompressão visível.
- **Mobile e desktop** precisam funcionar muito bem.
- **Execução:** a Home vem primeiro. Ao terminar, começar **automaticamente** as variações das páginas.

## Etapa 1 — Home `/site5` (prioridade)

### 1.1 Hero no desktop igual ao do site 4
- [x] Mesma estrutura do `src/components/site4/hero-foto.tsx`:
  - sobretítulo
  - frase menor (preâmbulo) em 5/12 colunas
  - título grande
  - filete dourado
  - parágrafo e botões na mesma linha
- [x] O preâmbulo, onde o site 4 diz "Especialistas em Direito Previdenciário… Jurídica:", passa a ser **"Experiência jurídica para orientar decisões e proteger direitos."**
- [x] O título grande fica **"Protegendo seu futuro, garantindo seus direitos."**
  - Mantido por instrução do usuário: "embaixo naquele texto grande protegendo seu futuro e garantindo seus direitos pode manter".
- [x] "Desde outubro/2007…" e "O Escritório atua em…" ficam **no mesmo tamanho e estilo** do parágrafo do site 4 ("Há mais de 15 anos…"), como um bloco só.

### 1.2 Hero no mobile
- [x] A foto das advogadas vai no **topo**, enquadrada nelas (hoje no mobile só aparece o fundo). O texto vem embaixo, com transição fluida.
- [x] Desktop continua com a foto de fundo a 30%.

### 1.3 Imagens em qualidade máxima
- [x] Hero volta a ser `unoptimized`, o arquivo original, como no site 4. Isso **desfaz** a otimização de 24/09, porque o usuário prioriza qualidade.
- [x] Regerar todas as fotos de `public/site5/` a partir dos originais, em qualidade alta (WebP q95, largura maior).
- [x] Servir em qualidade 95: `images.qualities` no `next.config.ts` + `quality={95}` nas imagens do site 5.
- [x] Conferir as fotos da Home: áreas, fachada e Publicações.

### 1.4 Nomenclatura e texto fiéis ao documento
- [x] Menu com os nomes das páginas do documento: Home · Sobre nós · Profissionais · Serviços · **Entre em contato**.
- [x] Conferência palavra por palavra, feita pelo content-steward, das 5 páginas contra `Site/paginas-v5/`. Corrigir tudo o que divergir.

### 1.5 Mobile impecável
- [x] Auditoria completa da Home pelo responsive-engineer: 320, 375, 390, 414, 768, 1024, 1280 e 1920, com texto ampliado e em paisagem. Corrigir os achados.
- [x] Verificação visual com capturas em 375 e 1440.
- [x] `tsc`, `eslint` e `npm run build` limpos.

## Etapa 2 — Duas versões novas de cada página interna

- A versão atual continua como **Versão 1**. As novas ficam em `/site5/<página>/v2` e `/site5/<página>/v3`.
- O menu aponta para a versão 1.
- Um seletor discreto "Versão 1 · 2 · 3" aparece nessas páginas para comparar.
- Mesma linguagem da Home (design system, superfícies, trilho, dourado), mas **composições realmente diferentes entre si**: estrutura das dobras, ritmo de cores e forma de apresentar o conteúdo.
- Processo por página:
  1. o art-director especifica a V2 e a V3 juntas, garantindo que sejam distintas;
  2. o builder constrói as duas;
  3. revisão de design/responsivo e de conteúdo;
  4. correções;
  5. marcar aqui.

### 2.0 Infraestrutura
- [x] Componente do seletor de versões (`src/components/site5/seletor-versao.tsx`), já incluído nas 4 páginas V1.

### 2.1 Sobre nós
- [x] Spec V2 + V3
- [x] Construção V2 + V3
- [x] Revisão (design/responsivo + conteúdo)
- [x] Correções aplicadas

### 2.2 Profissionais
- [x] Spec V2 + V3
- [x] Construção V2 + V3
- [x] Revisão
- [x] Correções aplicadas

### 2.3 Serviços
Feedback do usuário sobre a V1: estrutura confusa, com título, texto corrido e lista à direita "tudo muito junto". Linhas em que um texto quebra e o outro não, com espaçamentos diferentes.
- [x] Spec V2 + V3, com listas de ritmo regular, altura e espaçamento consistentes e hierarquia clara.
- [x] Construção V2 + V3
- [x] Revisão
- [x] Correções aplicadas

### 2.4 Contato
Feedback do usuário sobre a V1: "falta de classe" e padrão tipográfico incerto.
- [x] Spec V2 + V3, mais elegantes e com escala tipográfica rigorosa, sem misturar estilos.
- [x] Construção V2 + V3
- [x] Revisão
- [x] Correções aplicadas

## Etapa 3 — Fechamento
- [x] Varredura de scroll horizontal em todas as rotas (320–1920 e texto a 200%).
- [x] `tsc`, `eslint` e `npm run build` limpos. Sites 1 a 4 intactos (`git status`).
- [x] Atualizar `docs/site5-progresso.md` e `docs/PENDENCIAS.md`.
- [x] Relatório final para o usuário, em português: links de todas as versões, o que mudou, o que falta do cliente.

## Registro de execução
<!-- Anotar aqui, com data, decisões e problemas. -->
- 24/09: hero reescrito (estrutura v4; foto no topo no mobile, com enquadramento em 64%/78%). `unoptimized` restaurado no hero.
- 24/09: fotos regeneradas dos originais (RAW → TIFF sem perda → WebP q95, até 3200px); `images.qualities: [75, 95]` + `quality={95}` em 11 imagens.
- 24/09: menu "Entre em contato"; marca menor no header em lg para não truncar em 1024.
- Fotos das áreas da home: a origem é pequena (Trabalhista tem 587px). Não há como melhorar sem arquivo novo — vai para as pendências.
- 24/09: specs de Sobre nós V2/V3 e Serviços V2/V3 encomendadas em paralelo à auditoria da Home (só especificação, sem tocar em código). Arquivos esperados: `docs/site5-specs/02-sobre-nos-v2.md`, `-v3.md`, `04-servicos-v2.md`, `-v3.md`.
- 24/09: conferência de texto das 5 páginas: todos os textos de `conteudo.ts`/`contato.ts` batem com o docx. Decisões:
  - caixa alta via CSS é diagramação e fica;
  - CTAs que reaproveitam texto do próprio docx ficam (nada inventado);
  - números passam a mostrar o período em cada linha, como no docx;
  - "LinkedIn" fica com a grafia correta (o docx traz "Linkdin");
  - o @ do Instagram vem da URL;
  - Contato V1 mantém canais antes do formulário; as V2/V3 podem seguir a ordem do docx.
- 24/09: auditoria mobile da Home aplicada:
  - hero quadrado no mobile, com limite de altura em paisagem (`max-h-[70svh]`, 21/9);
  - foto do mobile é um arquivo próprio, 2880px q95 (~480 KB, eager + fetchPriority high), no lugar de 6,5 MB;
  - WhatsApp flutuante só aparece depois do CTA do hero e reinicia a cada rota;
  - rodapé com espaço para o flutuante;
  - Fecho com cada WhatsApp em linha própria;
  - diálogo rola inteiro abaixo de 42rem de altura;
  - Publicações sem estouro a 200%;
  - corpo do rodapé com 17px e links do menu com 44px.
  - Foto de fundo do desktop continua `object-left`, como na v4 (o usuário quer o desktop igual ao site 4).
- 24/09: **Etapa 1 (Home) concluída.** Build limpo, 0 de scroll horizontal (320–1920, texto 150/200%).
- 24/09: mapa do rodapé escondido em todas as versões de contato (`startsWith`).
- 24/09: em construção: Serviços V2/V3 e Sobre nós V2/V3. Em especificação: Profissionais V2/V3 e Contato V2/V3.
- 24/09: specs de Profissionais prontas — V2 "Galeria" (dobra por pessoa, retrato sangrado alternando lados) e V3 "Diretório" (mural de retratos + fichas em cartão). Construção iniciada.
- 24/09 ~06:50: o limite de uso interrompeu 4 agentes. Ao retomar, o disco mostrava:
  - Serviços V2/V3 e Sobre nós V2/V3 prontos (200);
  - Profissionais V2 pronta e V3 ainda não iniciada;
  - specs de Contato completas.
  Os builders foram retomados com o contexto preservado, e a construção de Contato V2/V3 foi iniciada.
- 24/09: **Serviços V2 ("Painéis") e V3 ("Capítulos") prontas.** tsc/eslint limpos, 0 de scroll horizontal, âncoras ok, linhas de itens com altura uniforme e nenhuma palavra cortada. Conferido visualmente pelo orquestrador. A revisão final (design + conteúdo) de todas as versões será feita em lote na Etapa 3.
- 24/09: **Contato V2 ("Carta") e V3 ("Recepção") prontas.**
  - Seguem a ordem do docx e têm escala tipográfica fixa em `escala.ts` por versão.
  - O formulário é reutilizado; ganhou a prop opcional `classes`, sem efeito na V1.
  - 0 de scroll horizontal, 0 requisições no envio.
  - Conferido visualmente pelo orquestrador.
- 24/09: **Sobre nós V2 ("Revista") e V3 ("Planta") prontas.**
  - Contraste do vidro da V3 ≥ 6:1 nos 3 tiers.
  - Card da V2 foi para a esquerda, para não cobrir a atendente.
  - 0 de scroll horizontal.
  - Conferido visualmente pelo orquestrador.
- 24/09: **Profissionais V2 ("Galeria") e V3 ("Diretório") prontas.** Retratos conferidos sem corte em 375, 1024 e 1920.
- 24/09: **Etapa 3.**
  - Conferência de texto das 8 versões novas: nenhum texto inventado, omitido ou fora de ordem.
  - Botão "Áreas de Especialização" nos fechos de Profissionais V2/V3 mantido, por coerência com a V1.
  - Texto alternativo de `equipeSalaApoio` neutralizado (pode ser Bárbara e Flávia — confirmar com o cliente).
  - Varredura: 0 de scroll horizontal nas 13 rotas do site 5, de 320 a 1920 e com texto a 150/200%.
  - `npm run build` limpo (88 páginas). Sites 1 a 4 intactos.
- 24/09: **Plano concluído.** Relatório final entregue ao usuário.

---

# Fase 2B — Ajustes da Home pedidos em 24/09 (manhã)

- [x] Hero: botões "Entrar em contato" e "Áreas de Especialização" **ao lado** do texto, como no site 4. Removido o `lg:flex-wrap`, que jogava os botões para baixo.
- [x] Números logo abaixo do hero, **sem o título "Números"**, no estilo exato do site 4, com os dados novos. O Escritório passa a ser a 3ª seção.
- [x] Áreas: tipografia do site 4.
  - Resumo das áreas em `text-sm`; intro em `lg:text-[0.9375rem]`.
  - Diálogo com largura fixa de 64rem, itens em 3 colunas, texto pequeno, caixas de altura uniforme e botões de tamanho padrão.
- [ ] Depoimentos em 3 versões, com seletor "Versão 1 · 2 · 3" dentro da seção.
  - Todas com: depoimento em destaque passando sozinho (tempo proporcional ao tamanho do texto), botões elegantes de voltar e avançar, rolagem automática que continua depois do clique, e abaixo um resumo em boxes com "Ver todos os depoimentos".
  - A V1 melhora a atual; a V2 e a V3 são interfaces diferentes.
- [ ] "Fale com a Souza & Souza" (Fecho) em 3 versões, com seletor dentro da seção.
  - Foto nova DSC04915 (`fotosEspaco.fachadaDia`, da Agência K+, gerada do RAW em q95), perto da proporção original (≈3:2, não quadrada).
  - Seção mais alta e texto com mais respiro.
- [ ] Verificação: `tsc`, `eslint`, build, sem scroll horizontal, capturas em 375 e 1440.
- [x] Fecho em 3 versões (V1 foto 3:2 sangrando, V2 foto larga 2:1 com card sobreposto, V3 navy com moldura e boxes). **V3 descartada pelo usuário (24/09)**; ficam V1 e V2 no seletor.
- [x] Fundo escuro do pop-up das áreas: opacidade 65 → 75.
- [x] Depoimentos (feedback de 24/09): **só a V2 ficou (V1 e V3 descartadas pelo usuário)**, sem seletor.
  - sem botão de pausa;
  - V3 descartada; fica V1 (para pensar) + V2 (preferida);
  - V2 sem a grade de resumo e sem "Ver todos";
  - todos no mesmo tamanho de fonte (referência: destaque do Elton);
  - comprimento padronizado perto do do William, como trecho com "…" e "Ler depoimento completo" — o texto original não é alterado;
  - container de altura fixa.
- [x] Profissionais: V1 original descartada.
  - "Galeria" (antiga V2) virou a **Versão 1**, na rota base.
  - "Diretório" (antiga V3) virou a **Versão 2**, em `/v2`.
  - A rota `/v3` foi removida e o seletor mostra só 1 · 2 (prop `total`).
  - Na "Diretório", a foto de grupo não transborda mais para a seção de baixo: a seção navy tem padding inferior normal.
- [x] Escala tipográfica 90% em todo o site 5, exceto o menu superior (pedido de 24/09).
  - 159 tamanhos `text-[…]` em 60 arquivos multiplicados por 0,9.
  - Classe `.tipo-90` em `globals.css`, que reduz a escala padrão do Tailwind; aplicada no layout do site 5 e no diálogo das áreas. `.tipo-100` devolve a escala original no header.
  - Botões em 20 arquivos: h-14 → 12.5, h-12 → 11, px-8 → 7, px-6 → 5. O mínimo continua 44px.
  - Com isso o corpo passa de 17px para cerca de 15–16px. A regra antiga de "corpo ≥ 17px" foi substituída por decisão do usuário.
  - Para desfazer: remover `tipo-90` do layout e reverter o commit.
