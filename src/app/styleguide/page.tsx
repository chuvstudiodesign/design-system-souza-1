import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2Icon, InfoIcon, TriangleAlertIcon } from "lucide-react";

import { BrandLogo, Symbol, Wordmark, brandAssets } from "@/components/brand/logo";
import { Section, Subsection, Swatch, TokenCard } from "@/components/styleguide/section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Design Tokens",
  description:
    "Cores, tipografia, raio, sombras e componentes base do design system Souza & Souza.",
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

const surfaceTokens = [
  { token: "background", className: "bg-background text-foreground" },
  { token: "card", className: "bg-card text-card-foreground" },
  { token: "popover", className: "bg-popover text-popover-foreground" },
  { token: "primary", className: "bg-primary text-primary-foreground" },
  { token: "secondary", className: "bg-secondary text-secondary-foreground" },
  { token: "muted", className: "bg-muted text-muted-foreground" },
  { token: "accent", className: "bg-accent text-accent-foreground" },
  {
    token: "destructive",
    className: "bg-destructive text-destructive-foreground",
  },
  { token: "sidebar", className: "bg-sidebar text-sidebar-foreground" },
  { token: "border", className: "bg-border text-foreground" },
  { token: "input", className: "bg-input text-foreground" },
  { token: "ring", className: "bg-ring text-background" },
];

const statusTokens = [
  { token: "success", className: "bg-success text-success-foreground" },
  { token: "warning", className: "bg-warning text-warning-foreground" },
  { token: "info", className: "bg-info text-info-foreground" },
  {
    token: "destructive",
    className: "bg-destructive text-destructive-foreground",
  },
];

const chartTokens = [
  { token: "chart-1", className: "bg-chart-1" },
  { token: "chart-2", className: "bg-chart-2" },
  { token: "chart-3", className: "bg-chart-3" },
  { token: "chart-4", className: "bg-chart-4" },
  { token: "chart-5", className: "bg-chart-5" },
];

const radii = [
  { name: "rounded-sm", hint: "6px", className: "rounded-sm" },
  { name: "rounded-md", hint: "9px", className: "rounded-md" },
  { name: "rounded-lg", hint: "12px · --radius", className: "rounded-lg" },
  { name: "rounded-xl", hint: "16px", className: "rounded-xl" },
  { name: "rounded-2xl", hint: "22px", className: "rounded-2xl" },
  { name: "rounded-full", hint: "pill", className: "rounded-full" },
];

const shadows = [
  { name: "shadow-2xs", className: "shadow-2xs" },
  { name: "shadow-xs", className: "shadow-xs" },
  { name: "shadow-sm", className: "shadow-sm" },
  { name: "shadow-md", className: "shadow-md" },
  { name: "shadow-lg", className: "shadow-lg" },
  { name: "shadow-xl", className: "shadow-xl" },
  { name: "shadow-2xl", className: "shadow-2xl" },
  { name: "shadow-gold", className: "shadow-gold" },
];

const spacing = [
  { name: "1", value: "4px", className: "w-1" },
  { name: "2", value: "8px", className: "w-2" },
  { name: "3", value: "12px", className: "w-3" },
  { name: "4", value: "16px", className: "w-4" },
  { name: "6", value: "24px", className: "w-6" },
  { name: "8", value: "32px", className: "w-8" },
  { name: "12", value: "48px", className: "w-12" },
  { name: "16", value: "64px", className: "w-16" },
  { name: "24", value: "96px", className: "w-24" },
];

export default function StyleguidePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-24">
      {/* Capa */}
      <header className="relative overflow-hidden rounded-2xl border border-border bg-brand-900 px-10 py-14 text-gold-50 mt-8 dark:bg-brand-950">
        <Image
          src={brandAssets.pattern[1]}
          alt=""
          aria-hidden
          width={4085}
          height={3154}
          className="pointer-events-none absolute -top-40 -right-40 w-[720px] opacity-15"
        />
        <div className="relative flex flex-col gap-5">
          <Wordmark variant="dourado" height={92} priority />
          <div className="h-px w-24 rule-gold" />
          <p className="max-w-xl text-sm leading-relaxed text-gold-100/80">
            Design system da Souza &amp; Souza Advocacia e Assessoria. Tokens
            derivados diretamente da identidade: azul institucional, dourado de
            prestígio, capitulares Trajan Pro e cantos suavizados.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-3 py-1 font-mono text-xs">
              <span className="size-3 rounded-full bg-brand-900 ring-1 ring-gold-500/50" />
              AZUL #0C344D
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-3 py-1 font-mono text-xs">
              <span className="size-3 rounded-full bg-gold-500" />
              DOURADO #BEA450
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-3 py-1 font-mono text-xs">
              TRAJAN PRO + INTER
            </span>
          </div>
        </div>
      </header>

      {/* MARCA */}
      <Section
        id="marca"
        title="Marca"
        description="Assinaturas oficiais, símbolo e estampa. Use a versão azul sobre fundos claros e a dourada sobre o azul institucional."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex h-48 items-center justify-center rounded-xl border border-border bg-white p-6">
            <Wordmark variant="azul" height={80} />
          </div>
          <div className="flex h-48 items-center justify-center rounded-xl border border-border bg-brand-900 p-6">
            <Wordmark variant="dourado" height={80} />
          </div>
        </div>

        <Subsection title="Símbolo" hint="preenchido e vazado">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex h-32 items-center justify-center rounded-xl border border-border bg-white">
              <Symbol variant="azul" size={64} />
            </div>
            <div className="flex h-32 items-center justify-center rounded-xl border border-border bg-white">
              <Symbol variant="vazado-azul" size={64} />
            </div>
            <div className="flex h-32 items-center justify-center rounded-xl border border-border bg-brand-900">
              <Symbol variant="dourado" size={64} />
            </div>
            <div className="flex h-32 items-center justify-center rounded-xl border border-border bg-brand-900">
              <Symbol variant="vazado-dourado" size={64} />
            </div>
          </div>
        </Subsection>

        <Subsection title="Avatares" hint="/brand/logos/svg/foto-perfil-*.svg">
          <div className="flex flex-wrap gap-4">
            {([1, 2, 3] as const).map((n) => (
              <Image
                key={n}
                src={brandAssets.avatar[n]}
                alt={`Foto de perfil ${n}`}
                width={96}
                height={96}
                className="rounded-xl border border-border"
              />
            ))}
          </div>
        </Subsection>

        <Subsection
          title="Estampa"
          hint="dourada sobre azul · azul sobre claro"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative h-48 overflow-hidden rounded-xl border border-border bg-brand-900">
              <Image
                src={brandAssets.pattern[1]}
                alt="Estampa dourada"
                width={4085}
                height={3154}
                className="absolute -top-6 -right-10 w-[420px] opacity-70"
              />
            </div>
            <div className="relative h-48 overflow-hidden rounded-xl border border-border bg-white">
              <Image
                src={brandAssets.pattern[2]}
                alt="Estampa azul"
                width={4085}
                height={3154}
                className="absolute -top-6 -right-10 w-[420px] opacity-80"
              />
            </div>
          </div>
        </Subsection>
      </Section>

      <Separator />

      {/* CORES */}
      <Section
        id="cores"
        title="Cores"
        description="Escalas geradas em OKLCH a partir das duas cores oficiais, preservando o matiz original em todos os passos."
      >
        <Subsection title="Azul institucional" hint="--brand-50 → --brand-950">
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
          <p className="text-xs text-muted-foreground">
            <span className="font-mono">--brand-900</span> é a cor oficial da
            marca (#0C344D).
          </p>
        </Subsection>

        <Subsection title="Dourado" hint="--gold-50 → --gold-950">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
            {goldScale.map((c) => (
              <Swatch
                key={c.step}
                name={c.step}
                hex={c.hex}
                className={c.className}
                labelClassName={c.step === "500" ? "text-gold-700 font-bold dark:text-gold-400" : ""}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-mono">--gold-500</span> é a cor oficial da
            marca (#BEA450).
          </p>
        </Subsection>

        <Subsection title="Neutros" hint="--neutral-50 → --neutral-950">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-11">
            {neutralScale.map((c) => (
              <Swatch
                key={c.step}
                name={c.step}
                hex={c.hex}
                className={c.className}
              />
            ))}
          </div>
        </Subsection>

        <Subsection title="Tokens de superfície" hint="claro e escuro">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {surfaceTokens.map((t) => (
              <TokenCard
                key={t.token}
                token={t.token}
                className={t.className}
              />
            ))}
          </div>
        </Subsection>

        <Subsection title="Estados semânticos" hint="AA garantido no par cor/foreground">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {statusTokens.map((t) => (
              <TokenCard key={t.token} token={t.token} className={t.className} />
            ))}
          </div>
        </Subsection>

        <Subsection title="Gráficos" hint="--chart-1 → --chart-5">
          <div className="grid grid-cols-5 gap-3">
            {chartTokens.map((t) => (
              <Swatch key={t.token} name={t.token} className={t.className} />
            ))}
          </div>
        </Subsection>
      </Section>

      <Separator />

      {/* TIPOGRAFIA */}
      <Section
        id="tipografia"
        title="Tipografia"
        description="Trajan Pro para títulos e assinaturas (capitulares da marca); Inter para textos, interface e leitura longa; Geist Mono para código e valores."
      >
        <Subsection title="Trajan Pro" hint="font-display · 400 / 700">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8">
            <p className="font-display text-5xl tracking-[0.03em]">
              Souza &amp; Souza
            </p>
            <p className="font-display text-3xl tracking-[0.06em]">
              Advocacia e Assessoria
            </p>
            <p className="font-display text-xl font-bold tracking-[0.1em]">
              O refinamento de uma marca clássica
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              font-display · TrajanPro-Regular.ttf / TrajanPro-Bold.otf
            </p>
          </div>
        </Subsection>

        <Subsection title="Inter" hint="font-sans · texto e interface">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8">
            <p className="text-4xl font-semibold tracking-tight">
              Display · 36px / semibold
            </p>
            <p className="text-2xl font-semibold tracking-tight">
              Título · 24px / semibold
            </p>
            <p className="text-lg font-medium">Subtítulo · 18px / medium</p>
            <p className="text-base">
              Corpo · 16px / regular — A transição para a nova identidade foca na
              suavização das formas, mantendo a solidez inerente ao segmento
              jurídico.
            </p>
            <p className="text-sm text-muted-foreground">
              Apoio · 14px / muted-foreground
            </p>
            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Overline · 12px / tracking largo
            </p>
          </div>
        </Subsection>

        <Subsection title="Geist Mono" hint="font-mono · dados e código">
          <div className="rounded-xl border border-border bg-card p-8">
            <p className="font-mono text-sm">
              --primary: oklch(0.3112 0.0623 240.92); /* #0C344D */
            </p>
          </div>
        </Subsection>
      </Section>

      <Separator />

      {/* RAIO */}
      <Section
        id="raio"
        title="Raio"
        description="A evolução da marca aumentou o raio de curvatura dos cantos. A base é --radius: 0.75rem (12px)."
      >
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className={`h-20 w-full border border-border bg-secondary ${r.className}`}
              />
              <span className="font-mono text-[11px]">{r.name}</span>
              <span className="text-[11px] text-muted-foreground">{r.hint}</span>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* SOMBRAS */}
      <Section
        id="sombras"
        title="Sombras"
        description="Elevação discreta, tingida com o azul da marca no tema claro. shadow-gold é reservada para destaques do dourado."
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {shadows.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-3">
              <div
                className={`h-20 w-full rounded-lg border border-border bg-card ${s.className}`}
              />
              <span className="font-mono text-[11px]">{s.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ESPAÇAMENTO */}
      <Section
        id="espacamento"
        title="Espaçamento"
        description="Ritmo de 4px. Seções respiram em múltiplos de 8; blocos internos em múltiplos de 4."
      >
        <div className="flex flex-col gap-2">
          {spacing.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <span className="w-10 font-mono text-[11px] text-muted-foreground">
                {s.name}
              </span>
              <div className={`h-4 rounded-sm bg-primary ${s.className}`} />
              <span className="font-mono text-[11px] text-muted-foreground">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* COMPONENTES */}
      <Section
        id="componentes"
        title="Componentes"
        description="Amostra dos componentes shadcn/ui já vestidos com os tokens da marca."
      >
        <Subsection title="Botões">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primário</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destrutivo</Button>
            <Button variant="link">Link</Button>
            <Button className="bg-gold text-gold-foreground hover:bg-gold-400">
              Dourado
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Desabilitado</Button>
          </div>
        </Subsection>

        <Subsection title="Badges">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Padrão</Badge>
            <Badge variant="secondary">Secundário</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destrutivo</Badge>
            <Badge className="bg-gold text-gold-foreground">Dourado</Badge>
            <Badge className="bg-success text-success-foreground">Ativo</Badge>
          </div>
        </Subsection>

        <Subsection title="Cards">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Consultoria empresarial</CardTitle>
                <CardDescription>
                  Assessoria jurídica preventiva e contenciosa para empresas.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Estrutura de card padrão usando <code>--card</code>,{" "}
                <code>--border</code> e <code>--radius</code>.
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">Saiba mais</Button>
                <Button size="sm" variant="ghost">
                  Contato
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-gold-500/40 bg-brand-900 text-gold-50 shadow-gold dark:bg-brand-950">
              <CardHeader>
                <CardTitle className="font-display tracking-[0.06em]">
                  Destaque
                </CardTitle>
                <CardDescription className="text-gold-100/70">
                  Card institucional sobre o azul da marca.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gold-100/80">
                Combinação azul + dourado usada em peças de apresentação.
              </CardContent>
              <CardFooter className="border-gold-500/20 bg-transparent">
                <Button className="bg-gold text-gold-foreground hover:bg-gold-400">
                  Falar com o time
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Subsection>

        <Subsection title="Alertas">
          <div className="flex flex-col gap-3">
            <Alert>
              <InfoIcon />
              <AlertTitle>Prazo processual atualizado</AlertTitle>
              <AlertDescription>
                O novo prazo foi registrado na agenda do caso.
              </AlertDescription>
            </Alert>
            <Alert className="border-success/40 [&_svg]:text-success">
              <CheckCircle2Icon />
              <AlertTitle>Documento assinado</AlertTitle>
              <AlertDescription>
                Todas as partes concluíram a assinatura digital.
              </AlertDescription>
            </Alert>
            <Alert className="border-warning/40 [&_svg]:text-warning">
              <TriangleAlertIcon />
              <AlertTitle>Pendência de documentação</AlertTitle>
              <AlertDescription>
                Faltam dois documentos para protocolar a petição.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <TriangleAlertIcon />
              <AlertTitle>Prazo vencido</AlertTitle>
              <AlertDescription>
                Esta ação exige providência imediata.
              </AlertDescription>
            </Alert>
          </div>
        </Subsection>

        <Subsection title="Formulário">
          <div className="grid gap-6 rounded-xl border border-border bg-card p-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="sg-nome">Nome completo</Label>
              <Input id="sg-nome" placeholder="Maria Souza" />
              <Label htmlFor="sg-email" className="mt-2">
                E-mail
              </Label>
              <Input id="sg-email" type="email" placeholder="nome@escritorio.com" />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Área de atuação</Label>
              <RadioGroup defaultValue="empresarial" className="gap-3">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="empresarial" id="sg-r1" />
                  <Label htmlFor="sg-r1" className="font-normal">
                    Empresarial
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="trabalhista" id="sg-r2" />
                  <Label htmlFor="sg-r2" className="font-normal">
                    Trabalhista
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="civil" id="sg-r3" />
                  <Label htmlFor="sg-r3" className="font-normal">
                    Cível
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </Subsection>
      </Section>

      <footer className="flex items-center justify-between border-t border-border pt-8 text-xs text-muted-foreground">
        <BrandLogo height={28} />
        <span>Design system · tokens em src/app/globals.css</span>
      </footer>
    </div>
  );
}
