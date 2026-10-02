"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";

import type { ConfigVidro } from "@/components/site4/controle-vidro";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { whatsappHref } from "@/lib/site/contato";
import { contarServicos, type AreaDoDireito, type Servico } from "@/lib/site/conteudo";

/**
 * Detalhe de uma área do direito em pop-up de liquid glass.
 *
 * Substitui, na `/site-v4`, a navegação para a página de serviços: a lista de
 * áreas continua sendo o índice, e o conteúdo abre por cima dela sem tirar o
 * visitante do lugar.
 *
 * Duas decisões estruturam o componente:
 *
 * · **O vidro é o próprio `Dialog.Content`.** `LiquidGlass` entra com `asChild`
 *   e empresta o material ao nó do Radix, em vez de envolvê-lo. Envolver criaria
 *   uma caixa a mais entre o portal e o conteúdo, e é o nó do Radix que precisa
 *   receber foco, `aria-modal` e o dismiss — por isso a composição é esta e não
 *   um `<div>` de vidro por fora. Como `DialogContent` do design system não
 *   aceita `asChild` (e já traz `bg-popover` e `max-w-sm` embutidos, que é o
 *   oposto do que este pop-up quer), a montagem usa o primitivo direto.
 *
 * · **Vidro segura a moldura, card segura o conteúdo.** O material da Apple é
 *   para a camada funcional que flutua, não para a camada de conteúdo. Então o
 *   painel é vidro e cada serviço é um `Card` — translúcido, para o vidro
 *   continuar legível por trás, mas com a estrutura e o raio do design system.
 *   Um único nível de cada: nada de vidro dentro de vidro.
 *
 * O portal monta na raiz do documento, fora da subárvore `.dark` que a `/site-v4`
 * declara no layout — daí a classe `dark` repetida no overlay e no conteúdo.
 */

/**
 * Calibragem do vidro deste pop-up, fechada no painel `?vidro`.
 *
 * Sai do preset `panel` em três pontos, todos na direção de um vidro mais
 * presente: espessura 42 no lugar de 38, refração 1.9 no lugar de 1.5 e blur
 * 6.5 no lugar de 3. O `dim` de 0.27 é o que segura a legibilidade depois disso
 * — sem ele, o material mais transparente deixaria o texto disputar espaço com
 * o que passa por trás.
 *
 * É a única fonte desses números: o painel de ajuste parte daqui e é para cá
 * que o botão "Zerar" volta, então o que se vê ajustando é o que vai ao ar.
 */
export const VIDRO_DIALOGO: ConfigVidro = {
  variant: "regular",
  profile: "convex",
  thickness: 42,
  refraction: 1.9,
  ior: 1.48,
  dispersion: 0.5,
  blur: 6.5,
  edgeLight: 0.3,
  noise: 0.1,
  dim: 0.27,
  elevation: "xl",
  fundoOpacidade: 65,
  fundoDesfoque: 2,
};

/** Serviços de uma área, já achatados em grupos rotulados. */
function agrupar(area: AreaDoDireito): { titulo?: string; servicos: Servico[] }[] {
  if (area.subgrupos?.length) {
    return area.subgrupos.map((grupo) => ({
      titulo: grupo.titulo,
      servicos: grupo.servicos,
    }));
  }
  return area.servicos?.length ? [{ servicos: area.servicos }] : [];
}

/**
 * Rótulos de vitrine, em faixa fechada de comprimento.
 *
 * A extração literal em `conteudo.ts` mistura entradas de 5 e de 157
 * caracteres, e numa grade de cards isso vira uma parede de blocos de pesos
 * diferentes. Aqui cada serviço recebe um rótulo entre 48 e 64 caracteres, a
 * medida dos dois que já estavam certos no Previdenciário: "Benefícios por
 * Incapacidade…" (64) e "Emissão da Certidão…" (50). Todos ocupam duas linhas.
 *
 * O que entra na expansão é só a definição corrente do próprio instituto — o
 * que caracteriza a aposentadoria especial, o que uma ação monitória exige, o
 * que a sigla BPC/LOAS quer dizer. Nenhuma promessa de resultado, nenhum
 * serviço que o escritório não tenha listado, nada sobre o escritório. O texto
 * do cliente segue intocado na fonte e acessível pelo `title` de cada card.
 *
 * O índice é por área, e não só pelo texto: "Usucapião" aparece no Civil e no
 * Extrajudicial com sentidos diferentes — imóvel pela via judicial num, ato de
 * cartório no outro — e um mapa plano daria o mesmo rótulo aos dois.
 *
 * Serviço sem entrada aqui cai no texto canônico. É o caso dos que já nascem
 * na faixa certa, e é também a falha correta se alguém editar `conteudo.ts`:
 * a chave deixa de casar e o card volta a exibir o original do cliente.
 */
const ROTULOS_VITRINE: Record<string, Record<string, string>> = {
  previdenciario: {
    "Planejamento Previdenciário":
      "Planejamento Previdenciário e análise de tempo de contribuição",
    "Aposentadoria Especial":
      "Aposentadoria Especial por atividade insalubre ou perigosa",
    "Aposentadoria por Tempo de Contribuição":
      "Aposentadoria por Tempo de Contribuição e regras de transição",
    "Aposentadoria por Idade - Urbana; BPC/LOAS":
      "Aposentadoria por Idade Urbana e Benefício Assistencial BPC/LOAS",
    "Pensão por Morte - Urbana":
      "Pensão por Morte Urbana para os dependentes do segurado",
    "Benefícios Rurais (Aposentadoria, Pensão por Morte e Benefícios por Incapacidade)":
      "Benefícios Rurais: aposentadoria, pensão e incapacidade",
    "Revisões de benefícios":
      "Revisão de benefícios já concedidos e correção de valores",
  },

  trabalhista: {
    "Regula relações empregatícias, direitos e obrigações patronais e do empregado":
      "Relações empregatícias, direitos e obrigações das partes",
    "Cálculos rescisórios":
      "Cálculos rescisórios e conferência das verbas devidas",
  },

  "assessoria-juridica": {
    Consultivo: "Consultivo: orientação jurídica para decisões do dia a dia",
    Preventivo: "Preventivo: análise de riscos antes que virem litígio",
    Contencioso:
      "Contencioso: atuação em processos judiciais e administrativos",
    "Elaboração e revisão de minutas contratuais":
      "Elaboração e revisão de minutas e cláusulas contratuais",
  },

  tributario: {
    "Planejamento tributário envolvendo tributos diretos e indiretos":
      "Planejamento tributário de tributos diretos e indiretos",
    "Elaboração de pareceres e opiniões legais em matéria tributária":
      "Pareceres e opiniões legais em matéria tributária",
    "Atuação em fiscalizações, consultas sobre interpretação da legislação tributária e contencioso administrativo e judicial em matéria fiscal":
      "Fiscalizações, consultas e contencioso em matéria fiscal",
    "Isenção de IPVA; Restituição da Contribuição Previdenciária junto ao Estado de Goiás; Isenção do Imposto de Renda retido na fonte para portador de doença grave":
      "Isenção de IPVA, isenção de IR por doença grave e restituição",
  },

  civil: {
    "Planejamento Sucessório":
      "Planejamento Sucessório para organizar a herança em vida",
    Inventário: "Inventário judicial e partilha de bens entre herdeiros",
    Divórcio: "Divórcio consensual ou litigioso, com partilha de bens",
    "União Estável":
      "União Estável: reconhecimento, contrato e dissolução",
    "Pensão Alimentícia":
      "Pensão Alimentícia: fixação, cobrança e execução judicial",
    Guarda: "Guarda de filhos menores, unilateral ou compartilhada",
    "Regulamentação de visitas":
      "Regulamentação de visitas e convivência com os filhos",
    "Modificação de regime de bens":
      "Modificação do regime de bens adotado no casamento",
    "Investigação de paternidade":
      "Ação de investigação e reconhecimento de paternidade",
    "Ação de interdição":
      "Ação de interdição e nomeação de curador do incapaz",
    "Ação de exoneração de alimentos":
      "Ação de exoneração da obrigação de prestar alimentos",
    "Ação de revisão de alimentos":
      "Ação de revisão do valor fixado da pensão alimentícia",
    "Indenização por dano material":
      "Indenização por dano material e prejuízo patrimonial",
    "Indenização por dano moral":
      "Indenização por dano moral e abalo à honra ou à imagem",
    "Ação de cobrança":
      "Ação de cobrança judicial de valores devidos e não pagos",
    "Execução de título extrajudicial":
      "Execução de título extrajudicial, como cheque e contrato",
    "Ação declaratória de inexistência de débito":
      "Ação declaratória de inexistência de débito indevido",
    "Alvará judicial":
      "Alvará judicial para levantamento de valores e de bens",
    "Ação da Obrigação de Fazer":
      "Ação de obrigação de fazer para cumprimento do acordado",
    "Embargos de Terceiro":
      "Embargos de Terceiro em defesa de bem indevidamente penhorado",
    "Ação monitória":
      "Ação monitória com base em prova escrita sem força executiva",
    "Ação de despejo":
      "Ação de despejo por falta de pagamento ou fim do contrato",
    DPVAT: "DPVAT: indenização por invalidez ou morte em acidente",
    "Contratos de Imóveis":
      "Contratos de imóveis para compra, venda e locação",
    Usucapião: "Usucapião de imóvel pela via judicial ou extrajudicial",
    "Ações Possessórias":
      "Ações possessórias de reintegração e manutenção de posse",
  },

  extrajudicial: {
    "Acompanhamento de cliente a órgão administrativo ou judiciário (Raio de 50 km)":
      "Acompanhamento a órgão administrativo ou judiciário, 50 km",
    "Análise e Parecer de processo em andamento em órgãos administrativos e/ou judiciários":
      "Análise e parecer de processo em andamento em qualquer órgão",
    "Cobrança extrajudicial":
      "Cobrança extrajudicial de dívida antes de acionar a Justiça",
    "Atos de registro e averbação":
      "Atos de registro e de averbação junto aos cartórios competentes",
    Usucapião: "Usucapião extrajudicial conduzido diretamente em cartório",
    "Notificação extrajudicial":
      "Notificação extrajudicial para constituir a parte em mora",
    "Ata notarial":
      "Ata notarial para registrar fato com fé pública em cartório",
    "Análise de contrato a pedido do cliente":
      "Análise de contrato a pedido do cliente, com parecer",
    "Elaboração de contratos":
      "Elaboração de contratos ajustados ao caso do cliente",
    "Testamento / Doação":
      "Testamento e doação para planejamento sucessório em vida",
    "Inventário Extrajudicial":
      "Inventário extrajudicial feito em cartório, sem processo",
  },

  "diligencias-administrativas": {
    "Emissão de Certidão Negativa de Autoria":
      "Emissão de Certidão Negativa de Autoria junto ao órgão",
    "Retirada de documento junto à APS (Agência da Previdência Social) de Catalão/GO":
      "Retirada de documento na Agência da Previdência de Catalão",
    "Solicitação de documentos junto aos Cartórios":
      "Solicitação de documentos e certidões junto aos cartórios",
    "Acompanhamento/Assistência de clientes em órgãos públicos, privados ou mistos":
      "Acompanhamento de clientes em órgãos públicos ou privados",
    "Entrega/Devolução de documentos originais em endereço indicado pelo cliente":
      "Entrega de documentos originais no endereço indicado",
  },
};

/**
 * Card de serviço: altura fixa e teto de texto fixo, sempre em par.
 *
 * A altura e o `line-clamp` têm de descrever o mesmo número de linhas. Se a
 * caixa comportar menos do que o clamp permite, o texto vaza; se comportar
 * mais, sobra vão embaixo de todo card.
 *
 * Duas linhas só cabem com folga onde a coluna é larga. Abaixo de `lg` a grade
 * fecha em uma ou duas colunas estreitas e o mesmo rótulo passa a quebrar em
 * três, então o par sobe junto: `h-24`/`line-clamp-3` no estreito, `h-20`/
 * `line-clamp-2` no largo. Sem isso, a versão compacta cortaria texto no
 * celular.
 */
function CardServico({
  servico,
  numero,
  slugArea,
}: {
  servico: Servico;
  numero: number;
  slugArea: string;
}) {
  const rotulo = ROTULOS_VITRINE[slugArea]?.[servico.texto] ?? servico.texto;

  return (
    <Card
      size="sm"
      className="h-24 bg-card/45 ring-foreground/15 transition-colors duration-300 hover:bg-card/70 lg:h-20"
    >
      <CardContent className="flex min-h-0 flex-1 items-start gap-3">
        <span
          aria-hidden
          className="mt-0.5 font-display text-xs tracking-[0.18em] text-gold-400"
        >
          {String(numero).padStart(2, "0")}
        </span>
        <span
          className="line-clamp-3 flex-1 text-pretty lg:line-clamp-2"
          title={servico.texto}
        >
          {rotulo}
          {/* Marca de parceria como asterisco, não como `Badge`.
              O selo ocupava uma linha inteira dentro de um texto já cortado em
              duas, e no Tributário empurrava o rótulo para fora da caixa. O
              asterisco cabe no fim da última linha e é resolvido pela nota do
              cliente ao pé da lista, que já diz de quem é a parceria. */}
          {servico.parceria ? (
            <span className="text-gold-400" aria-hidden>
              {" *"}
            </span>
          ) : null}
        </span>
      </CardContent>
    </Card>
  );
}

export function DialogoArea({
  area,
  open,
  onOpenChange,
  vidro,
}: {
  /** `null` mantém o diálogo montado sem conteúdo entre uma abertura e outra. */
  area: AreaDoDireito | null;
  open: boolean;
  onOpenChange: (aberto: boolean) => void;
  /**
   * Só chega preenchido com o painel de ajuste em uso. Quando é `null`, o vidro
   * fica no preset estático e nada no comportamento do diálogo muda — o caminho
   * de produção não sabe que esta prop existe.
   */
  vidro?: ConfigVidro | null;
}) {
  if (!area) return null;

  const grupos = agrupar(area);
  const total = contarServicos(area);

  // Caminho único: sem o painel, `vidro` é `null` e vale a calibragem fechada.
  // Renderizar os dois casos pelo mesmo código é o que garante que ajustar não
  // seja uma prévia de algo diferente do que a produção monta.
  const v = vidro ?? VIDRO_DIALOGO;

  return (
    // Com o painel aberto o diálogo sai do modo modal: modal trava os eventos
    // de ponteiro do resto da página e prende o foco dentro do conteúdo, o que
    // deixaria os controles inertes enquanto o pop-up estivesse aberto — que é
    // justamente quando eles precisam funcionar.
    <Dialog open={open} onOpenChange={onOpenChange} modal={!vidro}>
      <DialogPortal>
        {/* Fundo próprio, no lugar do `DialogOverlay`.
            Dois motivos, ambos de comportamento e nenhum estético:

            · O overlay do Radix carrega o `RemoveScroll`, que tranca a rolagem
              da página inteira enquanto o diálogo está aberto. Como o conteúdo
              desta área cabe na tela sem rolar, isso deixava a roda do mouse
              sem efeito em lugar nenhum. Sem o overlay do Radix não há trava, e
              a página volta a rolar por trás do pop-up, que é fixo e fica no
              lugar.

            · O `DialogOverlay` só renderiza quando o diálogo é modal, e o
              painel de ajuste precisa do modo não-modal. Com ele, os controles
              de fundo escuro e desfoque não tinham o que pintar.

            O `data-state` é escrito à mão porque este nó não passa pelo Radix,
            e o `Presence` do portal depende dele para segurar a saída até a
            animação terminar. */}
        <div
          aria-hidden
          data-state={open ? "open" : "closed"}
          className="dark fixed inset-0 z-40 duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          style={{
            backgroundColor: `color-mix(in oklab, var(--brand-950) ${v.fundoOpacidade}%, transparent)`,
            backdropFilter:
              v.fundoDesfoque > 0 ? `blur(${v.fundoDesfoque}px)` : "none",
          }}
        />

        <LiquidGlass
          variant={v.variant}
          profile={v.profile}
          thickness={v.thickness}
          refraction={v.refraction}
          ior={v.ior}
          dispersion={v.dispersion}
          blur={v.blur}
          edgeLight={v.edgeLight}
          noise={v.noise}
          dim={v.dim}
          elevation={v.elevation}
          asChild
        >
          <DialogPrimitive.Content
            // Clique no painel de ajuste é clique de fora para o Radix, e
            // fecharia o pop-up ao primeiro arrasto de slider.
            onInteractOutside={(evento) => {
              const alvo = evento.target as Element | null;
              if (alvo?.closest?.("[data-painel-vidro]")) evento.preventDefault();
            }}
            className="dark fixed top-1/2 left-1/2 z-50 flex max-h-[min(48rem,calc(100dvh-2rem))] w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden text-foreground duration-200 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          >
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute top-4 right-4 z-10"
              >
                <XIcon />
                <span className="sr-only">Fechar</span>
              </Button>
            </DialogClose>

            {/* Cabeçalho */}
            <div className="shrink-0 px-6 pt-8 pr-16 pb-5 md:px-10 md:pt-10 md:pr-20">
              {area.sobretitulo ? (
                <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  {area.sobretitulo}
                </p>
              ) : null}

              <DialogTitle className="mt-3 font-display text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-tight tracking-[0.02em]">
                {area.nome}
              </DialogTitle>

              <div className="mt-4 h-px w-24 rule-gold" />

              <DialogDescription className="mt-4">
                {total} {total === 1 ? "serviço" : "serviços"} nesta área de
                atuação.
              </DialogDescription>
            </div>

            {/* Serviços, única região que rola.
                O `pt-1` não é respiro: o anel dos cards (`ring-1`) é desenhado
                para fora da caixa, e sem essa folga o contêiner de rolagem
                decepa o pixel de cima dos cards da primeira fileira. Os 4px
                saíram do `pb` do cabeçalho, então o espaçamento entre os dois
                blocos continua o mesmo. */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-1 pb-6 md:px-10">
              {grupos.map((grupo, indiceGrupo) => (
                <section
                  key={grupo.titulo ?? indiceGrupo}
                  className={indiceGrupo > 0 ? "mt-8" : undefined}
                >
                  {grupo.titulo ? (
                    <h3 className="mb-3 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                      {grupo.titulo}
                    </h3>
                  ) : null}

                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {grupo.servicos.map((servico, indice) => (
                      <li key={servico.texto}>
                        <CardServico
                          servico={servico}
                          numero={indice + 1}
                          slugArea={area.slug}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              {area.nota ? (
                <p className="mt-6 text-sm text-muted-foreground">
                  <span aria-hidden className="text-gold-400">
                    *{" "}
                  </span>
                  {area.nota}
                </p>
              ) : null}
            </div>

            {/* Rodapé */}
            <div className="flex shrink-0 flex-col gap-3 border-t border-border/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-10">
              <p className="text-sm text-muted-foreground">
                Fale com o escritório para orientação sobre o seu caso.
              </p>
              <div className="flex gap-3">
                <DialogClose asChild>
                  <Button variant="ghost">Fechar</Button>
                </DialogClose>
                <Button asChild>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </DialogPrimitive.Content>
        </LiquidGlass>
      </DialogPortal>
    </Dialog>
  );
}
