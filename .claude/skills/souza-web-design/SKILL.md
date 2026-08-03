---
name: souza-web-design
description: Padrão de qualidade de execução do site Souza & Souza — composição, hierarquia, ritmo vertical, uso de imagem, motion e CTA, sempre dentro do design system deste projeto. Define COMO uma seção é construída com qualidade profissional, não qual estilo visual adotar (esse já está decidido nos tokens). Dispara em: "design", "layout", "composição", "hierarquia", "qualidade", "polimento", "animação", "motion", "como fica".
---

# Qualidade de execução — site Souza & Souza

**O estilo visual já está decidido.** Ele é o design system deste projeto: azul `brand-900`, dourado `gold-500`, Trajan Pro nas capitulares, Inter no resto, elevação tingida de azul, raio generoso, liquid glass. Nada disso se discute nem se importa de fora.

O que esta skill define é o **nível de execução**: composição, ritmo, responsividade, performance e polimento. É a diferença entre um site que usa os tokens certos e um site que parece profissional.

Carregue junto com `souza-design-system` (os tokens) e `souza-responsive` (a técnica).

## O site é projetado, não transcrito

O site antigo é fonte de **copy**, não de estrutura. Ele foi montado em Elementor por alguém resolvendo problemas de widget — seções empilhadas idênticas, cards que abrem lightbox de foto, item de menu que é âncora disfarçada. Nada disso se herda, nem por inércia.

Herde o texto. Projete o resto.

## O público muda o que é "moderno"

Direito previdenciário em Catalão/GO: pessoas de 55+ decidindo sobre aposentadoria, boa parte no celular, muitas com visão cansada, várias em momento difícil — benefício negado, inventário, divórcio.

Para esse público, "moderno" **não** é texto pequeno, peso fino, contraste sutil ou conteúdo que só existe no hover. Moderno aqui é: carrega rápido, funciona no polegar, lê fácil, e o botão de falar com alguém está sempre à mão.

Regra prática: **sofisticação na composição, obviedade na interação.**

## Composição

Uma seção, uma ideia. Se está encaixando dois assuntos, são duas seções.

**Evite a pilha.** O erro mais comum — e o defeito do site antigo — é toda seção ser "título centralizado, subtítulo, grid de 3 cards". Varie de propósito:

- Assimetria 5/7 ou 4/8 em vez de 6/6 sempre
- Texto à esquerda numa seção, à direita na seguinte
- Uma seção sangrando até a borda contra outra contida no container
- Um número ou uma frase ocupando muito espaço sozinho
- Lista longa em duas colunas; lista curta em uma

**Âncora visual por seção:** um elemento domina — uma foto, um número, uma frase grande. Seção sem hierarquia clara vira parede cinza.

## Hierarquia tipográfica

Três níveis por tela, no máximo: o que salta, o que orienta, o que se lê.

- **Trajan (`font-display`)** só em capitular curta: marca, sobretítulo, número de métrica. Nunca em parágrafo, nunca no H1 de 132 caracteres do hero
- **Inter** no resto
- **Corpo em 17–18px** no institucional. Não é o `text-sm` de UI densa — é texto para ler no celular aos 68 anos
- **Medida de 60–75 caracteres**: `max-w-[65ch]` em texto corrido
- `text-balance` em título, `text-pretty` em parágrafo

O `overline` do design system (uppercase, tracking aberto, muted) é o sobretítulo da marca — orienta sem competir com o título.

## Ritmo vertical

O ritmo é o que separa um site projetado de uma pilha de blocos.

- Padding varia com o peso da seção — uma seção de fecho respira mais que uma lista de serviços
- Alterne superfície: `background` → `muted/40` → `navy` → `background`. Nunca três iguais seguidas
- `rule-gold` é pontuação entre movimentos, não enfeite de toda seção. Se aparece sempre, deixa de significar
- A transição entre superfícies diferentes é onde vale um detalhe: um recorte, uma imagem atravessando a borda

## Imagem

As 24 imagens são desiguais. Trate cada uma pelo que é:

- **Fotos reais da equipe** (`capa4`, `sobre-capa2`, `capa-profissionais`, os 5 retratos) — o ativo mais valioso do site. Grandes, bem enquadradas, com respiro. São elas que provam que existe gente no escritório
- **Fotos de banco** (as 4 de área) — genéricas e substituíveis. Pequenas, em recorte, com overlay da marca. Não dê a elas o tamanho de uma foto real
- **Retratos das associadas** têm metade da resolução das sócias. Nunca lado a lado no mesmo tamanho
- **Decorativas** (caneta, balança) — elemento gráfico. Podem sangrar, receber máscara, sair do container. `aria-hidden`

Texto sobre foto: verificar contraste nos dois temas, sempre.

## Motion

Movimento orienta; não impressiona.

- Entrada de seção: fade + translate de 8–16px, 400–600ms, `ease-out`. Uma vez, não a cada passagem
- Stagger de 60–80ms em lista. Mais que isso a lista parece travada
- **Nada de scroll-jacking, parallax pesado ou animação que segura o conteúdo**
- Tudo que hover revela precisa existir sem hover — no celular não há hover
- `prefers-reduced-motion` respeitado sem exceção: com ele ligado, o conteúdo aparece direto
- Só `transform` e `opacity`. Animar `height`, `top` ou `filter` custa layout e derruba o scroll no celular
- `tw-animate-css` já está no projeto — use antes de escrever keyframe novo

## CTA

O escritório vive de contato. Em qualquer tela, falar com alguém está a um gesto.

- Um CTA primário por seção. Dois botões com o mesmo peso = nenhum
- WhatsApp é o canal real deste público. Não esconda atrás de "Fale conosco"
- Botão de hero precisa de altura maior que o `default` do design system — `h-8` é altura de UI, não de landing
- Alvo ≥ 44px; ≥ 48px no CTA principal

## Prova social

9 depoimentos reais com nome e serviço contratado são o ativo de conversão mais forte deste site. Não os enterre num carrossel automático que ninguém para para ler — deixe pelo menos um legível sem interação.

## Antes de dar uma tela por pronta

1. Dá para dizer em uma frase qual é a ideia desta seção?
2. Tem um elemento dominante, ou está tudo com o mesmo peso?
3. A composição difere da seção anterior?
4. O corpo de texto está grande o bastante para ler no celular aos 68 anos?
5. Todo conteúdo de hover existe sem hover?
6. Com `prefers-reduced-motion` ligado, ainda funciona?
7. O caminho para o WhatsApp está visível?
