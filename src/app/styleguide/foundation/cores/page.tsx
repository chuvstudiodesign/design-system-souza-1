import type { Metadata } from "next";

import { Section, Subsection, Swatch, TokenCard } from "@/components/styleguide/section";
import { Regra } from "@/components/styleguide/asset-card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Cores",
  description:
    "Escalas OKLCH da Souza & Souza, tokens semânticos e as regras de uso de cada faixa da paleta.",
};

const brandScale = [
  { step: "50", hex: "#F1F7FD", className: "bg-brand-50" },
  { step: "100", hex: "#E0EDF8", className: "bg-brand-100" },
  { step: "200", hex: "#C6DEF0", className: "bg-brand-200" },
  { step: "300", hex: "#A2C7E3", className: "bg-brand-300" },
  { step: "400", hex: "#75AAD1", className: "bg-brand-400" },
  { step: "500", hex: "#4A8CB9", className: "bg-brand-500" },
  { step: "600", hex: "#276C99", className: "bg-brand-600" },
  { step: "700", hex: "#195378", className: "bg-brand-700" },
  { step: "800", hex: "#134361", className: "bg-brand-800" },
  { step: "900", hex: "#0C344D", className: "bg-brand-900" },
  { step: "950", hex: "#031E2F", className: "bg-brand-950" },
];

const goldScale = [
  { step: "50", hex: "#FCF7E8", className: "bg-gold-50" },
  { step: "100", hex: "#F7EED2", className: "bg-gold-100" },
  { step: "200", hex: "#EEDFB1", className: "bg-gold-200" },
  { step: "300", hex: "#E0CB8B", className: "bg-gold-300" },
  { step: "400", hex: "#D0B76B", className: "bg-gold-400" },
  { step: "500", hex: "#BEA450", className: "bg-gold-500" },
  { step: "600", hex: "#A48C3A", className: "bg-gold-600" },
  { step: "700", hex: "#877128", className: "bg-gold-700" },
  { step: "800", hex: "#69581D", className: "bg-gold-800" },
  { step: "900", hex: "#504214", className: "bg-gold-900" },
  { step: "950", hex: "#32290A", className: "bg-gold-950" },
];

const neutralScale = [
  { step: "50", hex: "#F8FAFC", className: "bg-neutral-50" },
  { step: "100", hex: "#F2F5F7", className: "bg-neutral-100" },
  { step: "200", hex: "#E4E8EB", className: "bg-neutral-200" },
  { step: "300", hex: "#D2D8DC", className: "bg-neutral-300" },
  { step: "400", hex: "#A5ADB2", className: "bg-neutral-400" },
  { step: "500", hex: "#7D868C", className: "bg-neutral-500" },
  { step: "600", hex: "#61696F", className: "bg-neutral-600" },
  { step: "700", hex: "#4A5157", className: "bg-neutral-700" },
  { step: "800", hex: "#343A3F", className: "bg-neutral-800" },
  { step: "900", hex: "#21272B", className: "bg-neutral-900" },
  { step: "950", hex: "#10161A", className: "bg-neutral-950" },
];

/** Como ler uma escala: cada faixa tem um papel, não é um degradê decorativo. */
const faixas = [
  {
    faixa: "50 – 200",
    papel: "Superfícies",
    uso: "Fundo de seção, faixa alternada, estado hover de item de lista. Nunca recebe texto pequeno por cima em cor da mesma escala.",
  },
  {
    faixa: "300 – 400",
    papel: "Bordas e divisores",
    uso: "Contorno de card, filete, borda de input. No dourado, também o traço decorativo.",
  },
  {
    faixa: "500 – 600",
    papel: "Elementos ativos",
    uso: "Ícone, gráfico, foco, badge. É onde as duas cores oficiais vivem — brand-500 e gold-500.",
  },
  {
    faixa: "700 – 950",
    papel: "Texto e superfícies escuras",
    uso: "Texto de autoridade, fundo institucional, dark mode. brand-900 é a cor oficial da marca.",
  },
];

const surfaceTokens = [
  { token: "background", className: "bg-background text-foreground", note: "Fundo da página" },
  { token: "card", className: "bg-card text-card-foreground", note: "Superfície elevada" },
  { token: "popover", className: "bg-popover text-popover-foreground", note: "Camada flutuante" },
  { token: "primary", className: "bg-primary text-primary-foreground", note: "Ação principal" },
  { token: "secondary", className: "bg-secondary text-secondary-foreground", note: "Ação de apoio" },
  { token: "muted", className: "bg-muted text-muted-foreground", note: "Conteúdo secundário" },
  { token: "accent", className: "bg-accent text-accent-foreground", note: "Realce dourado leve" },
  { token: "destructive", className: "bg-destructive text-destructive-foreground", note: "Ação perigosa" },
  { token: "sidebar", className: "bg-sidebar text-sidebar-foreground", note: "Navegação lateral" },
  { token: "border", className: "bg-border text-foreground", note: "Contorno" },
  { token: "input", className: "bg-input text-foreground", note: "Borda de campo" },
  { token: "ring", className: "bg-ring text-background", note: "Anel de foco" },
];

const statusTokens = [
  { token: "success", className: "bg-success text-success-foreground", note: "Concluído, assinado" },
  { token: "warning", className: "bg-warning text-warning-foreground", note: "Pendência, atenção" },
  { token: "info", className: "bg-info text-info-foreground", note: "Aviso neutro" },
  { token: "destructive", className: "bg-destructive text-destructive-foreground", note: "Erro, prazo vencido" },
];

const chartTokens = [
  { token: "chart-1", className: "bg-chart-1" },
  { token: "chart-2", className: "bg-chart-2" },
  { token: "chart-3", className: "bg-chart-3" },
  { token: "chart-4", className: "bg-chart-4" },
  { token: "chart-5", className: "bg-chart-5" },
];

/**
 * Combinações verificadas: o texto sobre o fundo passa em AA.
 * As razões são calculadas pela fórmula WCAG 2.1 sobre os hex oficiais. No
 * degradê, o valor reportado é o do ponto mais escuro (#BCA14C) — o pior caso.
 */
const pares = [
  {
    rotulo: "Azul + branco",
    className: "bg-brand-900 text-gold-50",
    razao: "12.3:1",
    uso: "Faixa institucional, rodapé, hero escuro.",
  },
  {
    rotulo: "Dourado + azul",
    className: "bg-gold-gradient text-brand-950",
    razao: "6.8:1",
    uso: "Destaque, CTA de conversão, cartão de honra.",
  },
  {
    rotulo: "Branco + azul",
    className: "bg-white text-brand-900",
    razao: "13.0:1",
    uso: "Corpo de página, documento, papelaria.",
  },
  {
    rotulo: "Azul + dourado",
    className: "bg-brand-900 text-gold-400",
    razao: "6.6:1",
    uso: "Título e número sobre o azul. Só em texto grande.",
  },
];

export default function CoresPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-24">
      {/* Capa */}
      <header className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-10">
        <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Fundação
        </span>
        <h1 className="font-display text-4xl tracking-[0.06em]">Cores</h1>
        <div className="h-px w-24 rule-gold" />
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A marca tem duas cores: o azul <strong>#0C344D</strong> e o dourado{" "}
          <strong>#BEA450</strong>. Todo o resto da paleta é derivado delas em
          OKLCH, preservando o matiz original em cada passo — por isso um{" "}
          <span className="font-mono">brand-300</span> continua sendo,
          inequivocamente, o azul da Souza &amp; Souza clareado, e não outro
          azul qualquer.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <div className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
            <span className="size-8 rounded-lg bg-brand-900" />
            <span className="flex flex-col leading-tight">
              <span className="text-xs font-semibold">Azul institucional</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                #0C344D · brand-900
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
            <span className="size-8 rounded-lg bg-gold-500" />
            <span className="flex flex-col leading-tight">
              <span className="text-xs font-semibold">Dourado</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                #BEA450 · gold-500
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border px-4 py-3">
            <span className="size-8 rounded-lg bg-gold-gradient" />
            <span className="flex flex-col leading-tight">
              <span className="text-xs font-semibold">Degradê dourado</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                #D4C575 → #BCA14C
              </span>
            </span>
          </div>
        </div>
      </header>

      {/* COMO LER UMA ESCALA */}
      <Section
        id="escalas"
        title="Como ler uma escala"
        description="Os onze passos não são decoração: cada faixa tem uma função fixa. Escolher o passo pelo papel, e não pela aparência, é o que mantém a interface coerente entre telas feitas por pessoas diferentes."
      >
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60">
              <tr className="border-b border-border">
                <th className="px-5 py-3 font-mono text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  Faixa
                </th>
                <th className="px-5 py-3 font-mono text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  Papel
                </th>
                <th className="px-5 py-3 font-mono text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  Uso
                </th>
              </tr>
            </thead>
            <tbody>
              {faixas.map((f) => (
                <tr key={f.faixa} className="border-b border-border last:border-0">
                  <td className="px-5 py-4 align-top font-mono text-xs whitespace-nowrap">
                    {f.faixa}
                  </td>
                  <td className="px-5 py-4 align-top text-sm font-medium whitespace-nowrap">
                    {f.papel}
                  </td>
                  <td className="px-5 py-4 align-top text-sm leading-relaxed text-muted-foreground">
                    {f.uso}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Separator />

      {/* AZUL */}
      <Section
        id="azul"
        title="Azul institucional"
        description="A cor de autoridade da marca. É ela que carrega texto de leitura, superfície escura e a estrutura da interface no tema claro."
      >
        <Subsection title="Escala" hint="--brand-50 → --brand-950">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
            {brandScale.map((c) => (
              <Swatch
                key={c.step}
                name={c.step}
                hex={c.hex}
                className={c.className}
                labelClassName={c.step === "900" ? "text-primary font-bold" : ""}
              />
            ))}
          </div>
        </Subsection>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold tracking-tight">Pode</h3>
            <ul className="flex flex-col gap-2.5">
              <Regra tipo="pode">
                <span className="font-mono text-xs">brand-900</span> como fundo
                de faixa institucional e como cor de título no tema claro.
              </Regra>
              <Regra tipo="pode">
                <span className="font-mono text-xs">brand-950</span> para o
                texto de corpo — é o <span className="font-mono text-xs">--foreground</span>{" "}
                do tema claro.
              </Regra>
              <Regra tipo="pode">
                <span className="font-mono text-xs">brand-50/100</span> como
                fundo de seção alternada, no lugar de um cinza neutro.
              </Regra>
            </ul>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold tracking-tight">Evite</h3>
            <ul className="flex flex-col gap-2.5">
              <Regra tipo="evite">
                <span className="font-mono text-xs">brand-400/500</span> em
                texto pequeno sobre branco — o contraste cai abaixo de AA.
              </Regra>
              <Regra tipo="evite">
                Empilhar <span className="font-mono text-xs">brand-800</span>{" "}
                sobre <span className="font-mono text-xs">brand-900</span>: a
                diferença some em tela calibrada de forma diferente.
              </Regra>
              <Regra tipo="evite">
                Introduzir um azul de fora da escala porque &ldquo;fica
                parecido&rdquo;.
              </Regra>
            </ul>
          </div>
        </div>
      </Section>

      <Separator />

      {/* DOURADO */}
      <Section
        id="dourado"
        title="Dourado"
        description="O dourado é acento, não superfície de leitura. Ele aparece pouco e, por aparecer pouco, é o que dá o tom de prestígio da marca. Se estiver em toda parte, deixou de significar destaque."
      >
        <Subsection title="Escala" hint="--gold-50 → --gold-950">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
            {goldScale.map((c) => (
              <Swatch
                key={c.step}
                name={c.step}
                hex={c.hex}
                className={c.className}
                labelClassName={
                  c.step === "500" ? "text-gold-700 font-bold dark:text-gold-400" : ""
                }
              />
            ))}
          </div>
        </Subsection>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold tracking-tight">Pode</h3>
            <ul className="flex flex-col gap-2.5">
              <Regra tipo="pode">
                Filete, moldura, ícone de destaque e numeral grande.
              </Regra>
              <Regra tipo="pode">
                <span className="font-mono text-xs">gold-300/400</span> como cor
                de texto <em>sobre o azul</em> — no escuro é onde o dourado
                respira melhor.
              </Regra>
              <Regra tipo="pode">
                <span className="font-mono text-xs">gold-700/800</span> quando
                precisar de dourado legível sobre fundo claro.
              </Regra>
            </ul>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold tracking-tight">Evite</h3>
            <ul className="flex flex-col gap-2.5">
              <Regra tipo="evite">
                Dourado em corpo de texto. Em qualquer passo, em qualquer fundo.
              </Regra>
              <Regra tipo="evite">
                <span className="font-mono text-xs">gold-500</span> como cor de
                texto sobre branco — 2.4:1, reprova em AA com folga.
              </Regra>
              <Regra tipo="evite">
                Mais de um elemento dourado disputando atenção na mesma dobra.
              </Regra>
            </ul>
          </div>
        </div>
      </Section>

      <Separator />

      {/* DEGRADÊ */}
      <Section
        id="degrade"
        title="Degradê dourado"
        description="A assinatura dourada da marca em superfície. Os dois pontos são hexadecimais fechados da identidade impressa — não são derivados da escala OKLCH e não devem ser convertidos, porque o arredondamento afastaria a tela do material gráfico."
      >
        <div className="flex h-40 items-center justify-center rounded-2xl border border-gold-600/30 bg-gold-gradient">
          <span className="font-display text-2xl tracking-[0.08em] text-brand-950">
            Souza &amp; Souza
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
            <span className="font-mono text-xs">bg-gold-gradient</span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              Superfície. Recebe a marca e o texto em azul.
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
            <span className="font-mono text-xs">text-gold-gradient</span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              Texto preenchido pelo degradê. Só em corpo grande — abaixo de
              24px a variação vira ruído.
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
            <span className="font-mono text-xs">rule-gold</span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              Filete horizontal transparente → dourado → transparente.
              Separador com presença de marca.
            </span>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Sempre a <strong>45°</strong>. Um degradê dourado na vertical lê como
          reflexo de metal barato; na diagonal, lê como folha aplicada. É essa
          a diferença que a identidade compra.
        </p>
      </Section>

      <Separator />

      {/* NEUTROS */}
      <Section
        id="neutros"
        title="Neutros"
        description="Cinza com temperatura azul (hue 240). Um cinza puro ao lado do azul da marca parece esverdeado — este não parece."
      >
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
          {neutralScale.map((c) => (
            <Swatch key={c.step} name={c.step} hex={c.hex} className={c.className} />
          ))}
        </div>
      </Section>

      <Separator />

      {/* TOKENS SEMÂNTICOS */}
      <Section
        id="tokens"
        title="Tokens semânticos"
        description="Esta é a camada com que se escreve interface. Um token diz o papel do elemento, não a cor dele — e é por isso que a mesma linha de código funciona nos dois temas."
      >
        <div className="rounded-2xl border border-gold-500/30 bg-accent/40 p-5">
          <p className="text-sm leading-relaxed">
            <strong>A inversão no escuro é intencional.</strong> No tema claro{" "}
            <span className="font-mono text-xs">--primary</span> é o azul{" "}
            <span className="font-mono text-xs">brand-900</span>; no escuro ele
            vira <span className="font-mono text-xs">gold-500</span>, porque o
            azul sobre fundo azul deixaria de ser hierarquia. Escreva com o
            token e a troca acontece sozinha. Fixar{" "}
            <span className="font-mono text-xs">bg-brand-900</span> congela a
            cor nos dois temas — o que às vezes é exatamente o certo, mas
            precisa ser uma escolha, não um descuido.
          </p>
        </div>

        <Subsection title="Superfícies" hint="claro e escuro">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {surfaceTokens.map((t) => (
              <TokenCard
                key={t.token}
                token={t.token}
                className={t.className}
                note={t.note}
              />
            ))}
          </div>
        </Subsection>

        <Subsection title="Estados" hint="par cor/foreground garantido em AA">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {statusTokens.map((t) => (
              <TokenCard
                key={t.token}
                token={t.token}
                className={t.className}
                note={t.note}
              />
            ))}
          </div>
        </Subsection>

        <Subsection title="Gráficos" hint="--chart-1 → --chart-5">
          <div className="grid grid-cols-5 gap-3">
            {chartTokens.map((t) => (
              <Swatch key={t.token} name={t.token} className={t.className} />
            ))}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            A sequência alterna azul e dourado de propósito: séries vizinhas
            nunca caem na mesma família, o que mantém as linhas distinguíveis
            mesmo em impressão em escala de cinza.
          </p>
        </Subsection>
      </Section>

      <Separator />

      {/* PARES */}
      <Section
        id="pares"
        title="Pares aprovados"
        description="Combinações de fundo e texto já verificadas. Quando a dúvida for “essa cor pode ir sobre essa outra?”, comece por aqui."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pares.map((p) => (
            <div key={p.rotulo} className="flex flex-col gap-3">
              <div
                className={`flex h-28 items-center justify-center rounded-2xl border border-border/60 text-center text-sm font-medium ${p.className}`}
              >
                Aa
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold">{p.rotulo}</span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {p.razao}
                </span>
                <span className="text-[11px] leading-relaxed text-muted-foreground">
                  {p.uso}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <footer className="flex items-center justify-between border-t border-border pt-8 text-xs text-muted-foreground">
        <span>Tokens em src/app/globals.css</span>
        <span>OKLCH · matiz preservado em toda a escala</span>
      </footer>
    </div>
  );
}
