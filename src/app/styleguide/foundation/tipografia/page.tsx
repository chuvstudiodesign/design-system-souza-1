import type { Metadata } from "next";

import { Regra } from "@/components/styleguide/asset-card";
import { Section } from "@/components/styleguide/section";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tipografia",
  description:
    "Trajan Pro, Inter e Geist Mono no design system Souza & Souza — cada estilo isolado, com ficha técnica e regra de uso.",
};

/**
 * Uma amostra tipográfica isolada: o texto em tamanho real, a ficha técnica do
 * estilo e a frase que explica quando usá-lo.
 *
 * Cada estilo mora no seu próprio bloco de propósito. Empilhados dentro de um
 * cartão só, os tamanhos se comparam entre si e viram uma escala decorativa;
 * separados, cada um é lido como uma decisão de projeto — que é o que são.
 */
function Especime({
  amostra,
  amostraClassName,
  nome,
  ficha,
  uso,
  destaque,
}: {
  amostra: string;
  amostraClassName: string;
  nome: string;
  ficha: string;
  uso: string;
  destaque?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border bg-card",
        destaque ? "border-gold-500/40 shadow-gold" : "border-border shadow-xs"
      )}
    >
      <div className="flex min-h-32 items-center overflow-x-auto px-8 py-7">
        <p className={cn("whitespace-nowrap", amostraClassName)}>{amostra}</p>
      </div>

      <div className="flex flex-col gap-1 border-t border-border bg-muted/40 px-8 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="text-sm font-semibold tracking-tight">{nome}</span>
          <span className="font-mono text-[11px] text-muted-foreground">
            {ficha}
          </span>
        </div>
        <span className="text-xs leading-relaxed text-muted-foreground">
          {uso}
        </span>
      </div>
    </div>
  );
}

export default function TipografiaPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-24">
      {/* Capa */}
      <header className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-10">
        <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Fundação
        </span>
        <h1 className="font-display text-4xl tracking-[0.06em]">Tipografia</h1>
        <div className="h-px w-24 rule-gold" />
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Três famílias, com fronteiras rígidas entre elas. Trajan Pro assina;
          Inter comunica; Geist Mono registra dado. A tentação de usar a
          capitular da marca em mais lugares do que ela aguenta é o erro mais
          comum de um sistema com fonte clássica — e é justamente o que estas
          páginas existem para conter.
        </p>
      </header>

      {/* AS TRÊS FAMÍLIAS */}
      <Section
        id="familias"
        title="As três famílias"
        description="Antes de escolher um tamanho, escolha a família. A decisão é do papel do texto, não da vontade da peça."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-2xl border border-gold-500/40 bg-card p-6">
            <span className="font-display text-4xl">Aa</span>
            <div className="h-px w-12 rule-gold" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Trajan Pro</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                font-display
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              A capitular romana da identidade. Só assinatura, título curto e
              numeral de destaque. Regular e Bold — não existe itálico nem peso
              intermediário.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <span className="text-4xl font-semibold tracking-tight">Aa</span>
            <div className="h-px w-12 bg-border" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Inter</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                font-sans
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Todo o resto: corpo, interface, subtítulo, lista, rótulo. É a
              fonte que o visitante realmente lê — e por isso ocupa mais de 90%
              do texto do site.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <span className="font-mono text-4xl">Aa</span>
            <div className="h-px w-12 bg-border" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Geist Mono</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                font-mono
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Valor de token, trecho de código, número de processo. Onde o
              alinhamento por caractere importa mais que a leitura fluida.
            </p>
          </div>
        </div>
      </Section>

      <Separator />

      {/* TRAJAN PRO */}
      <Section
        id="trajan"
        title="Trajan Pro"
        description="Três estilos, e só três. Cada um abaixo está isolado no seu próprio bloco, com a ficha técnica de tamanho, peso e entreletra — porque em Trajan o espacejamento não é detalhe de acabamento, é o que separa a marca de um título genérico em serifada."
      >
        <div className="flex flex-col gap-5">
          <Especime
            destaque
            amostra="Souza & Souza"
            amostraClassName="font-display text-5xl tracking-[0.03em]"
            nome="Assinatura"
            ficha="48px · Regular · tracking 0.03em"
            uso="O nome da marca escrito por extenso. Entreletra mais fechada que os demais estilos — é a única aplicação em que as capitulares se aproximam, e é assim que a assinatura foi desenhada."
          />

          <Especime
            amostra="Advocacia e Assessoria"
            amostraClassName="font-display text-3xl tracking-[0.06em]"
            nome="Descritor"
            ficha="30px · Regular · tracking 0.06em"
            uso="A linha de apoio que acompanha a assinatura, e o título de seção institucional. A entreletra abre para que a linha se leia como um sobretítulo e não dispute com o nome acima dela."
          />

          <Especime
            amostra="O refinamento de uma marca clássica"
            amostraClassName="font-display text-xl font-bold tracking-[0.1em]"
            nome="Chamada em Bold"
            ficha="20px · Bold · tracking 0.1em"
            uso="Frase curta de abertura de seção, no máximo uma por página. Em Bold o desenho engorda e fecha os contraformas: a entreletra precisa abrir para 0.1em para compensar, senão as letras colam."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold tracking-tight">Pode</h3>
            <ul className="flex flex-col gap-2.5">
              <Regra tipo="pode">
                Nome da marca, título de seção curto e numeral de destaque.
              </Regra>
              <Regra tipo="pode">
                Entreletra a partir de <span className="font-mono text-xs">0.02em</span>{" "}
                — o mínimo já vem aplicado pela classe{" "}
                <span className="font-mono text-xs">font-display</span>.
              </Regra>
              <Regra tipo="pode">
                Caixa alta, que é o desenho nativo da fonte.
              </Regra>
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold tracking-tight">Evite</h3>
            <ul className="flex flex-col gap-2.5">
              <Regra tipo="evite">
                Parágrafo em Trajan. É ilegível em texto corrido e destrói a
                hierarquia da página.
              </Regra>
              <Regra tipo="evite">
                Título longo — o H1 da home tem 132 caracteres e vai em Inter,
                não aqui.
              </Regra>
              <Regra tipo="evite">
                Esperar minúsculas de verdade: as &ldquo;minúsculas&rdquo; do
                Trajan são versaletes, e um texto misto sai visualmente
                desnivelado.
              </Regra>
              <Regra tipo="evite">
                Abaixo de 14px. As serifas finas somem e o texto vira sujeira.
              </Regra>
            </ul>
          </div>
        </div>

        <p className="font-mono text-[11px] text-muted-foreground">
          TrajanPro-Regular.ttf · TrajanPro-Bold.otf
        </p>
      </Section>

      <Separator />

      {/* INTER */}
      <Section
        id="inter"
        title="Inter"
        description="A escala de leitura. Seis estilos, cada um com um papel fixo na hierarquia da página — do display do hero até o overline que rotula uma seção."
      >
        <div className="flex flex-col gap-5">
          <Especime
            amostra="Display · 36px / semibold"
            amostraClassName="text-4xl font-semibold tracking-tight"
            nome="Display"
            ficha="36px · Semibold · tracking -0.025em"
            uso="Título principal de página. A entreletra fecha porque, em corpo grande, o espaçamento padrão parece frouxo."
          />

          <Especime
            amostra="Título · 24px / semibold"
            amostraClassName="text-2xl font-semibold tracking-tight"
            nome="Título"
            ficha="24px · Semibold · tracking -0.025em"
            uso="Abertura de seção dentro de uma página. É o degrau imediatamente abaixo do display."
          />

          <Especime
            amostra="Subtítulo · 18px / medium"
            amostraClassName="text-lg font-medium"
            nome="Subtítulo"
            ficha="18px · Medium"
            uso="Linha de apoio sob um título, e título de card. Medium em vez de semibold para não competir com o degrau acima."
          />

          <Especime
            amostra="Corpo · 16px / regular"
            amostraClassName="text-base"
            nome="Corpo"
            ficha="16px · Regular · leading 1.6"
            uso="O texto de leitura do site. Mantenha a linha entre 60 e 75 caracteres — acima disso o olho perde o retorno de linha."
          />

          <Especime
            amostra="Apoio · 14px / muted-foreground"
            amostraClassName="text-sm text-muted-foreground"
            nome="Apoio"
            ficha="14px · Regular · --muted-foreground"
            uso="Legenda, nota de rodapé, texto auxiliar de formulário. A cor já carrega a hierarquia — não reduza mais o tamanho."
          />

          <Especime
            amostra="Overline · sobretítulo de seção"
            amostraClassName="text-xs tracking-[0.14em] text-muted-foreground uppercase"
            nome="Overline"
            ficha="12px · Regular · tracking 0.14em · uppercase"
            uso='O sobretítulo da identidade: "Áreas de Especialização", "Previdenciário". A caixa alta com entreletra larga ecoa o Trajan sem precisar usá-lo.'
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-base leading-relaxed">
            A transição para a nova identidade foca na suavização das formas,
            mantendo a solidez inerente ao segmento jurídico. Este parágrafo
            existe para mostrar Inter no papel em que ela realmente trabalha —
            texto corrido, com entrelinha aberta e medida controlada. Compare
            com a mesma frase em Trajan e a razão da fronteira entre as duas
            famílias fica evidente sem precisar de argumento.
          </p>
        </div>
      </Section>

      <Separator />

      {/* GEIST MONO */}
      <Section
        id="mono"
        title="Geist Mono"
        description="Dado e código. Entra quando o alinhamento por caractere vale mais que a fluidez da leitura."
      >
        <div className="flex flex-col gap-5">
          <Especime
            amostra="--primary: oklch(0.3112 0.0623 240.92);"
            amostraClassName="font-mono text-sm"
            nome="Código e token"
            ficha="14px · Regular"
            uso="Valor de variável, trecho de CSS, nome de classe dentro do styleguide."
          />

          <Especime
            amostra="0008372-45.2024.8.26.0100"
            amostraClassName="font-mono text-base"
            nome="Número estruturado"
            ficha="16px · Regular · tabular"
            uso="Número de processo, OAB, CNPJ. A largura fixa mantém os dígitos alinhados quando vários aparecem empilhados numa tabela."
          />
        </div>
      </Section>

      <Separator />

      {/* COMPONENTE */}
      <Section
        id="componente"
        title="Na prática"
        description="Não recrie a escala à mão. O componente Typography já traz todos os estilos acima como variantes."
      >
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="font-mono text-sm leading-relaxed">
            {"<Typography variant=\"display\">…</Typography>"}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "display",
              "h1",
              "h2",
              "h3",
              "h4",
              "p",
              "lead",
              "large",
              "small",
              "muted",
              "blockquote",
              "list",
              "overline",
              "inlineCode",
            ].map((v) => (
              <span
                key={v}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gold-500/30 bg-accent/40 p-5">
          <p className="text-sm leading-relaxed">
            <strong>Atenção à variante h2:</strong> ela vem com{" "}
            <span className="font-mono text-xs">border-b border-border pb-2</span>{" "}
            embutido. Em seção de marketing isso quase nunca é o desejado —
            passe <span className="font-mono text-xs">className</span> para
            neutralizar, ou use <span className="font-mono text-xs">h3</span> com
            o tamanho ajustado.
          </p>
        </div>
      </Section>

      <footer className="flex items-center justify-between border-t border-border pt-8 text-xs text-muted-foreground">
        <span>src/components/ui/typography.tsx</span>
        <span>Trajan Pro · Inter · Geist Mono</span>
      </footer>
    </div>
  );
}
