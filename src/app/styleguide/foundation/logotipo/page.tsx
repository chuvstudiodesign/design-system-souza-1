import type { Metadata } from "next";
import Image from "next/image";
import { DownloadIcon } from "lucide-react";

import {
  AssinaturaHorizontal,
  Symbol,
  Wordmark,
  brandAssets,
  pngDe,
} from "@/components/brand/logo";
import { AssetCard, ErroCard, Regra } from "@/components/styleguide/asset-card";
import { Section, Subsection } from "@/components/styleguide/section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Logotipo",
  description:
    "Assinaturas oficiais, símbolo e estampa da Souza & Souza nos três fundos da marca, com download em SVG e PNG.",
};

const PACOTE = "/brand/souza-souza-marca.zip";

/* Dimensões nativas da estampa — mesmas nos dois arquivos. */
const ESTAMPA = { w: 4085, h: 3154 };

/**
 * Um piso de tamanho, apresentado no tamanho real.
 *
 * O palco ocupa a maior parte da largura de propósito: estes ativos estão
 * renderizados no mínimo permitido, e é essa a informação da seção. Espremer o
 * ativo numa coluna estreita obrigaria a reduzi-lo abaixo do próprio mínimo
 * que ele existe para demonstrar — a página passaria a contradizer a regra.
 */
function MinimoCard({
  titulo,
  medida,
  motivo,
  children,
}: {
  titulo: string;
  medida: string;
  motivo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] sm:items-center">
      <div className="flex h-52 items-center justify-center overflow-x-auto rounded-2xl border border-border bg-secondary p-8">
        {children}
      </div>

      <div className="flex flex-col gap-2">
        {/* Rótulo e medida andam juntos: a medida é a informação principal do
            card, e empurrada para a borda oposta ela lia como um número solto. */}
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-sm font-semibold tracking-tight">{titulo}</span>
          <span className="font-mono text-xs text-gold-700 dark:text-gold-400">
            {medida}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {motivo}
        </p>
      </div>
    </div>
  );
}

export default function LogotipoPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-24">
      {/* Capa */}
      <header className="relative mt-8 overflow-hidden rounded-2xl border border-border bg-brand-900 px-10 py-12 text-gold-50 dark:bg-brand-950">
        <Image
          src={brandAssets.pattern[1]}
          alt=""
          aria-hidden
          width={ESTAMPA.w}
          height={ESTAMPA.h}
          className="pointer-events-none absolute -top-40 -right-40 w-[720px] opacity-15"
        />
        <div className="relative flex flex-col gap-5">
          <span className="font-mono text-[11px] tracking-[0.18em] text-gold-200/70 uppercase">
            Fundação
          </span>
          <h1 className="font-display text-4xl tracking-[0.06em]">Logotipo</h1>
          <div className="h-px w-24 rule-gold" />
          <p className="max-w-xl text-sm leading-relaxed text-gold-100/80">
            Todo ativo da marca em um lugar só: assinatura vertical, assinatura
            horizontal, símbolo, estampa e avatares, aplicados nos três fundos
            oficiais e prontos para baixar em vetor ou bitmap.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold-400"
            >
              <a href={PACOTE} download>
                <DownloadIcon data-icon="inline-start" />
                Baixar pacote completo
              </a>
            </Button>
            <span className="inline-flex items-center rounded-full border border-gold-500/40 px-3 py-1 font-mono text-[11px] text-gold-100/80">
              .zip · 34 arquivos · SVG + PNG
            </span>
          </div>
        </div>
      </header>

      {/* OS TRÊS FUNDOS */}
      <Section
        id="fundos"
        title="Os três fundos"
        description="A marca só é aplicada sobre um destes três fundos. A versão do logotipo é sempre determinada pelo fundo — não pelo gosto da peça."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="h-24 rounded-2xl border border-gold-600/30 bg-gold-gradient" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Degradê dourado</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                bg-gold-gradient
              </span>
              <span className="text-xs text-muted-foreground">
                Recebe a marca em <strong>azul</strong>.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-24 rounded-2xl border border-brand-800 bg-brand-900" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Azul institucional</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                bg-brand-900
              </span>
              <span className="text-xs text-muted-foreground">
                Recebe a marca em <strong>dourado</strong>.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-24 rounded-2xl border border-neutral-300 bg-white" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Branco</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                bg-white
              </span>
              <span className="text-xs text-muted-foreground">
                Recebe a marca em <strong>azul</strong>.
              </span>
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ASSINATURA VERTICAL */}
      <Section
        id="assinatura-vertical"
        title="Assinatura vertical"
        description="Símbolo acima, nome ao centro e a linha “Advocacia e Assessoria” embaixo. É a assinatura completa da marca — a que apresenta o escritório por inteiro. Pede altura, e é por isso que existe a versão horizontal."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <AssetCard
            titulo="Assinatura azul"
            descricao="Sobre o degradê dourado."
            fundo="dourado"
            svg={brandAssets.wordmark.azul}
            png={pngDe(brandAssets.wordmark.azul)}
          >
            <Wordmark variant="azul" height={64} />
          </AssetCard>

          <AssetCard
            titulo="Assinatura dourada"
            descricao="Sobre o azul institucional."
            fundo="azul"
            svg={brandAssets.wordmark.dourado}
            png={pngDe(brandAssets.wordmark.dourado)}
          >
            <Wordmark variant="dourado" height={64} />
          </AssetCard>

          <AssetCard
            titulo="Assinatura azul"
            descricao="Sobre branco — documentos, papelaria e impressos."
            fundo="branco"
            svg={brandAssets.wordmark.azul}
            png={pngDe(brandAssets.wordmark.azul)}
          >
            <Wordmark variant="azul" height={64} />
          </AssetCard>
        </div>
      </Section>

      <Separator />

      {/* ASSINATURA VERTICAL VAZADA */}
      <Section
        id="assinatura-vertical-vazada"
        title="Assinatura vertical vazada"
        description="A mesma composição vertical, em contorno. Reservada para aplicações grandes — capa, painel, fachada — onde o preenchimento sólido pesaria demais. O traço fino sobe o tamanho mínimo para 120px: abaixo disso o “&S” dentro do símbolo fecha e o miolo vira mancha."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <AssetCard
            titulo="Vazada azul"
            descricao="Sobre o degradê dourado."
            fundo="dourado"
            svg={brandAssets.wordmark["vazado-azul"]}
            png={pngDe(brandAssets.wordmark["vazado-azul"])}
          >
            <Wordmark variant="vazado-azul" height={64} formato="png" />
          </AssetCard>

          <AssetCard
            titulo="Vazada dourada"
            descricao="Sobre o azul institucional."
            fundo="azul"
            svg={brandAssets.wordmark["vazado-dourado"]}
            png={pngDe(brandAssets.wordmark["vazado-dourado"])}
          >
            <Wordmark variant="vazado-dourado" height={64} formato="png" />
          </AssetCard>

          <AssetCard
            titulo="Vazada azul"
            descricao="Sobre branco."
            fundo="branco"
            svg={brandAssets.wordmark["vazado-azul"]}
            png={pngDe(brandAssets.wordmark["vazado-azul"])}
          >
            <Wordmark variant="vazado-azul" height={64} formato="png" />
          </AssetCard>
        </div>
      </Section>

      <Separator />

      {/* ASSINATURA HORIZONTAL */}
      <Section
        id="assinatura-horizontal"
        title="Assinatura horizontal"
        description="Símbolo vazado à esquerda, nome à direita. É a versão para faixas baixas e largas — header, rodapé, assinatura de e-mail, papel timbrado — onde a assinatura vertical não caberia sem encolher até ficar ilegível."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <AssetCard
            titulo="Horizontal azul"
            descricao="Sobre o degradê dourado."
            fundo="dourado"
            svg={brandAssets.horizontal.azul}
            png={pngDe(brandAssets.horizontal.azul)}
          >
            <AssinaturaHorizontal
              variant="vazado-azul"
              textoClassName="text-brand-900"
            />
          </AssetCard>

          <AssetCard
            titulo="Horizontal dourada"
            descricao="Sobre o azul institucional."
            fundo="azul"
            svg={brandAssets.horizontal.dourado}
            png={pngDe(brandAssets.horizontal.dourado)}
          >
            <AssinaturaHorizontal
              variant="vazado-dourado"
              textoClassName="text-gold-gradient"
            />
          </AssetCard>

          <AssetCard
            titulo="Horizontal azul"
            descricao="Sobre branco."
            fundo="branco"
            svg={brandAssets.horizontal.azul}
            png={pngDe(brandAssets.horizontal.azul)}
          >
            <AssinaturaHorizontal
              variant="vazado-azul"
              textoClassName="text-brand-900"
            />
          </AssetCard>
        </div>

        <Subsection
          title="Construção"
          hint="medidas fechadas — não recompor a olho"
        >
          <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex items-center justify-center rounded-2xl border border-border bg-secondary p-8">
              <AssinaturaHorizontal
                variant="vazado-azul"
                textoClassName="text-brand-900 dark:text-gold-300"
                className="dark:hidden"
              />
              <AssinaturaHorizontal
                variant="vazado-dourado"
                textoClassName="text-gold-300"
                className="hidden dark:inline-flex"
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-left text-sm">
                <tbody>
                  {[
                    ["Símbolo", "40px de altura", "size={40}"],
                    ["Gap", "12px", "gap-3"],
                    [
                      "Texto",
                      "20px · 16px abaixo de sm",
                      "text-xl / text-base",
                    ],
                    ["Entreletra", "0.14em, caixa alta", "tracking-[0.14em]"],
                    ["Entrelinha", "igual ao corpo", "leading-none"],
                    [
                      "Deslocamento",
                      "+9% da altura do texto",
                      "translate-y-[9%]",
                    ],
                  ].map(([campo, valor, token]) => (
                    <tr
                      key={campo}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-4 py-2.5 align-top text-xs font-medium whitespace-nowrap">
                        {campo}
                      </td>
                      <td className="px-4 py-2.5 align-top text-xs text-muted-foreground">
                        {valor}
                      </td>
                      <td className="px-4 py-2.5 align-top font-mono text-[11px] text-muted-foreground">
                        {token}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            O deslocamento de <span className="font-mono">+9%</span> é ajuste
            óptico, não erro de alinhamento: as capitulares da Trajan assentam
            altas em relação ao símbolo, e a centralização geométrica pura
            deixaria o nome flutuando acima do eixo. Por ser relativo à altura
            do próprio texto, ele acompanha a troca de escala entre mobile e
            desktop sem precisar de um segundo valor.
          </p>

          <div className="rounded-2xl border border-gold-500/30 bg-accent/40 p-5">
            <p className="text-sm leading-relaxed">
              Em código, use{" "}
              <span className="font-mono text-xs">
                &lt;AssinaturaHorizontal /&gt;
              </span>{" "}
              — o nome vai como texto vivo, herda a cor do tema e é lido uma
              única vez pelo leitor de tela. Os arquivos ao lado reproduzem
              exatamente a mesma geometria, com a Trajan já convertida em
              contorno, e existem para uso fora do site: e-mail, documento,
              apresentação, material impresso.
            </p>
          </div>
        </Subsection>
      </Section>

      <Separator />

      {/* SÍMBOLO PREENCHIDO */}
      <Section
        id="simbolo"
        title="Símbolo"
        description="O monograma sozinho. Use quando a assinatura completa não couber ou quando a marca já tiver sido apresentada na mesma peça: avatar, favicon, selo, aplicativo."
      >
        <Subsection title="Preenchido" hint="aplicação padrão do símbolo">
          <div className="grid gap-5 sm:grid-cols-3">
            <AssetCard
              titulo="Símbolo azul"
              fundo="dourado"
              altura="h-36"
              svg={brandAssets.symbol.azul}
              png={pngDe(brandAssets.symbol.azul)}
            >
              <Symbol variant="azul" size={72} />
            </AssetCard>

            <AssetCard
              titulo="Símbolo dourado"
              fundo="azul"
              altura="h-36"
              svg={brandAssets.symbol.dourado}
              png={pngDe(brandAssets.symbol.dourado)}
            >
              <Symbol variant="dourado" size={72} />
            </AssetCard>

            <AssetCard
              titulo="Símbolo azul"
              fundo="branco"
              altura="h-36"
              svg={brandAssets.symbol.azul}
              png={pngDe(brandAssets.symbol.azul)}
            >
              <Symbol variant="azul" size={72} />
            </AssetCard>
          </div>
        </Subsection>

        <Subsection
          title="Vazado"
          hint="mínimo de 40px — abaixo disso o traço fecha"
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <AssetCard
              titulo="Símbolo vazado azul"
              fundo="dourado"
              altura="h-36"
              svg={brandAssets.symbol["vazado-azul"]}
              png={pngDe(brandAssets.symbol["vazado-azul"])}
            >
              <Symbol variant="vazado-azul" size={72} />
            </AssetCard>

            <AssetCard
              titulo="Símbolo vazado dourado"
              fundo="azul"
              altura="h-36"
              svg={brandAssets.symbol["vazado-dourado"]}
              png={pngDe(brandAssets.symbol["vazado-dourado"])}
            >
              <Symbol variant="vazado-dourado" size={72} />
            </AssetCard>

            <AssetCard
              titulo="Símbolo vazado azul"
              fundo="branco"
              altura="h-36"
              svg={brandAssets.symbol["vazado-azul"]}
              png={pngDe(brandAssets.symbol["vazado-azul"])}
            >
              <Symbol variant="vazado-azul" size={72} />
            </AssetCard>
          </div>
        </Subsection>
      </Section>

      <Separator />

      {/* ESTAMPA */}
      <Section
        id="estampa"
        title="Estampa"
        description="O símbolo ampliado até virar textura. Entra sangrada, cortada pela borda e sempre em opacidade baixa — é fundo, não ilustração. Nunca a use inteira e centralizada: nesse enquadramento ela compete com a assinatura."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <AssetCard
            titulo="Estampa azul"
            descricao="estampa-2 · sobre o degradê dourado"
            fundo="dourado"
            altura="h-44"
            svg={brandAssets.pattern[2]}
            png={pngDe(brandAssets.pattern[2])}
          >
            <Image
              src={brandAssets.pattern[2]}
              alt="Estampa azul aplicada sobre o degradê dourado"
              width={ESTAMPA.w}
              height={ESTAMPA.h}
              className="absolute -top-8 -right-12 w-[380px] opacity-70"
            />
          </AssetCard>

          <AssetCard
            titulo="Estampa dourada"
            descricao="estampa-1 · sobre o azul institucional"
            fundo="azul"
            altura="h-44"
            svg={brandAssets.pattern[1]}
            png={pngDe(brandAssets.pattern[1])}
          >
            <Image
              src={brandAssets.pattern[1]}
              alt="Estampa dourada aplicada sobre o azul institucional"
              width={ESTAMPA.w}
              height={ESTAMPA.h}
              className="absolute -top-8 -right-12 w-[380px] opacity-70"
            />
          </AssetCard>

          <AssetCard
            titulo="Estampa azul"
            descricao="estampa-2 · sobre branco"
            fundo="branco"
            altura="h-44"
            svg={brandAssets.pattern[2]}
            png={pngDe(brandAssets.pattern[2])}
          >
            <Image
              src={brandAssets.pattern[2]}
              alt="Estampa azul aplicada sobre branco"
              width={ESTAMPA.w}
              height={ESTAMPA.h}
              className="absolute -top-8 -right-12 w-[380px] opacity-80"
            />
          </AssetCard>
        </div>
      </Section>

      <Separator />

      {/* AVATARES */}
      <Section
        id="avatares"
        title="Avatares"
        description="Recortes circulares do símbolo, prontos para foto de perfil em redes sociais e assinatura de e-mail."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {([1, 2, 3] as const).map((n) => (
            <AssetCard
              key={n}
              titulo={`Avatar ${n}`}
              fundo="branco"
              altura="h-36"
              svg={brandAssets.avatar[n]}
              png={pngDe(brandAssets.avatar[n])}
            >
              <Image
                src={brandAssets.avatar[n]}
                alt={`Avatar ${n} da marca Souza & Souza`}
                width={96}
                height={96}
                className="rounded-full"
              />
            </AssetCard>
          ))}
        </div>
      </Section>

      <Separator />

      {/* REGRAS DE APLICAÇÃO */}
      <Section
        id="aplicacao"
        title="Regras de aplicação"
        description="O que mantém a marca reconhecível em qualquer peça."
      >
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold tracking-tight">
            Área de respiro
          </h3>
          <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-gold-500/50 bg-secondary p-6">
            {/* O respiro é o próprio padding deste bloco: 28px, a altura do
                símbolo nesta escala. A moldura tracejada é a borda dele, então
                a margem fica igual nos quatro lados por construção — e não por
                um valor escolhido a olho. */}
            <div className="relative inline-flex items-center justify-center rounded-xl border border-dashed border-border p-7">
              <Wordmark variant="azul" height={62} className="dark:hidden" />
              <Wordmark
                variant="dourado"
                height={62}
                className="hidden dark:block"
              />
            </div>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            A margem livre ao redor da assinatura equivale à{" "}
            <strong>altura do símbolo</strong> em todos os quatro lados. Nenhum
            texto, filete ou imagem entra nessa faixa.
          </p>
        </div>

        <Subsection
          title="Tamanho mínimo"
          hint="altura, medida no ativo inteiro"
        >
          <div className="flex flex-col gap-5">
            <MinimoCard
              titulo="Assinatura vertical"
              medida="88px"
              motivo="Abaixo disso a linha “Advocacia e Assessoria” fecha e o símbolo perde o contraforma interno."
            >
              <Wordmark variant="azul" height={88} className="dark:hidden" />
              <Wordmark
                variant="dourado"
                height={88}
                className="hidden dark:block"
              />
            </MinimoCard>

            <MinimoCard
              titulo="Assinatura horizontal"
              medida="40px"
              motivo="É a altura nativa em que a composição foi desenhada. Use-a como piso e escale só para cima."
            >
              <AssinaturaHorizontal
                variant="vazado-azul"
                textoClassName="text-brand-900"
                className="dark:hidden"
              />
              <AssinaturaHorizontal
                variant="vazado-dourado"
                textoClassName="text-gold-300"
                className="hidden dark:inline-flex"
              />
            </MinimoCard>

            <MinimoCard
              titulo="Símbolo isolado"
              medida="30px"
              motivo="Recomendado para favicon, avatar e selo. Na versão vazada, suba para 40px."
            >
              <Symbol variant="azul" size={30} className="dark:hidden" />
              <Symbol
                variant="dourado"
                size={30}
                className="hidden dark:block"
              />
            </MinimoCard>
          </div>
        </Subsection>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold tracking-tight">Pode</h3>
            <ul className="flex flex-col gap-2.5">
              <Regra tipo="pode">
                Escolher a versão pela cor do fundo: azul sobre dourado e sobre
                branco, dourado sobre azul.
              </Regra>
              <Regra tipo="pode">
                Escolher a orientação pela forma do espaço: a vertical quando
                houver altura, a horizontal em faixa baixa e larga.
              </Regra>
              <Regra tipo="pode">
                Usar o símbolo sozinho quando a assinatura já apareceu na mesma
                peça.
              </Regra>
              <Regra tipo="pode">
                Sangrar a estampa pela borda, em opacidade baixa, como textura
                de fundo.
              </Regra>
              <Regra tipo="pode">
                Preferir o SVG sempre que o meio aceitar vetor — só caia no PNG
                quando não houver alternativa.
              </Regra>
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold tracking-tight">Evite</h3>
            <ul className="flex flex-col gap-2.5">
              <Regra tipo="evite">
                Recolorir a assinatura fora das duas cores oficiais, ou aplicar
                o degradê dourado como preenchimento do próprio logotipo.
              </Regra>
              <Regra tipo="evite">
                Distorcer, inclinar, rotacionar ou aplicar sombra e contorno
                sobre a marca.
              </Regra>
              <Regra tipo="evite">
                Pousar a marca sobre foto sem uma superfície sólida por baixo —
                o fundo variável come o contraste.
              </Regra>
              <Regra tipo="evite">
                Usar a versão vazada em tamanho pequeno, onde o traço fecha e o
                monograma some.
              </Regra>
            </ul>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ERROS DE USO */}
      <Section
        id="erros"
        title="Erros de uso"
        description="As aplicações abaixo estão proibidas. Não são questão de gosto: cada uma quebra a marca de um jeito verificável."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ErroCard
            titulo="Assinatura vertical miniaturizada"
            motivo="Abaixo de 88px a linha “Advocacia e Assessoria” vira um borrão e o contraforma do símbolo fecha. Nesse tamanho, use a assinatura horizontal ou o símbolo isolado."
          >
            <Wordmark variant="azul" height={24} className="dark:hidden" />
            <Wordmark
              variant="dourado"
              height={24}
              className="hidden dark:block"
            />
          </ErroCard>

          <ErroCard
            titulo="Assinatura distorcida"
            motivo="Escalar sem travar a proporção engorda as capitulares da Trajan e desalinha o símbolo do eixo do nome."
          >
            <span className="inline-flex" style={{ transform: "scaleX(1.45)" }}>
              <Wordmark variant="azul" height={72} className="dark:hidden" />
              <Wordmark
                variant="dourado"
                height={72}
                className="hidden dark:block"
              />
            </span>
          </ErroCard>

          <ErroCard
            titulo="Marca sobre estampa pequena"
            motivo="A marca pode, sim, ir sobre a estampa — desde que ela esteja em linha: ampliada, sangrada pela borda e em opacidade baixa. Reduzida a um elemento pequeno atrás da assinatura, a estampa vira desenho concorrente e disputa traço a traço com o símbolo."
            fundo="relative overflow-hidden bg-brand-900"
            ornamento={
              <Image
                src={brandAssets.pattern[1]}
                alt=""
                aria-hidden
                width={ESTAMPA.w}
                height={ESTAMPA.h}
                className="pointer-events-none absolute top-1/2 left-1/2 w-[150px] -translate-x-1/2 -translate-y-1/2 opacity-80"
              />
            }
          >
            <Wordmark variant="dourado" height={72} />
          </ErroCard>

          <ErroCard
            titulo="Cor fora da paleta"
            motivo="A assinatura só existe em azul e em dourado. Recolorir para acompanhar uma peça descaracteriza a marca."
          >
            <span
              className="inline-flex"
              style={{ filter: "hue-rotate(115deg) saturate(2.4)" }}
            >
              <Wordmark variant="azul" height={72} />
            </span>
          </ErroCard>

          <ErroCard
            titulo="Contraste invertido"
            motivo="Assinatura dourada sobre o degradê dourado: 1.4:1. O olho reconstrói a forma pela memória, não pela leitura."
            fundo="bg-gold-gradient"
          >
            <Wordmark variant="dourado" height={72} />
          </ErroCard>

          <ErroCard
            titulo="Vazada em corpo pequeno"
            motivo="O contorno tem espessura fixa: reduzido, o traço se encontra e o monograma vira uma mancha sólida."
          >
            <Symbol variant="vazado-azul" size={22} className="dark:hidden" />
            <Symbol
              variant="vazado-dourado"
              size={22}
              className="hidden dark:block"
            />
          </ErroCard>
        </div>
      </Section>

      <footer className="flex items-center justify-between border-t border-border pt-8 text-xs text-muted-foreground">
        <span>Ativos originais em /public/brand</span>
        <a href={PACOTE} download className="underline underline-offset-4">
          Baixar pacote completo
        </a>
      </footer>
    </div>
  );
}
