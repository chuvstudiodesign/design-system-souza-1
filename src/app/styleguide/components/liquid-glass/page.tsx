"use client";

import * as React from "react";
import Image from "next/image";
import {
  BellIcon,
  CompassIcon,
  LayersIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react";

import { brandAssets } from "@/components/brand/logo";
import {
  A11yNotes,
  ComponentPage,
  Demo,
  PropsTable,
  Usage,
} from "@/components/styleguide/component-page";
import { Label } from "@/components/ui/label";
import {
  LIQUID_GLASS_PRESETS,
  LiquidGlass,
  useLiquidGlassTier,
  type LiquidGlassTier,
  type LiquidGlassVariant,
  type ThicknessProfile,
} from "@/components/ui/liquid-glass";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                  Backdrops                                  */
/* -------------------------------------------------------------------------- */

const BACKDROPS = ["grade", "marca", "gold"] as const;
type BackdropKind = (typeof BACKDROPS)[number];

/**
 * Refração só é visível sobre conteúdo de alta frequência. Um fundo liso
 * mostraria apenas o blur — que é exatamente o efeito que este material não é.
 */
function Backdrop({
  kind,
  patternOffset,
}: {
  kind: BackdropKind;
  /** Desloca a estampa dentro da caixa, em % do próprio vetor. */
  patternOffset?: string;
}) {
  if (kind === "grade") {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-brand-900"
        style={{
          backgroundImage:
            // Stops de 1px cheio, não sub-pixel: o Chrome antialiasa uma faixa
            // de 0.5px e, somada a 10% de alfa, ela desaparece. O Safari
            // rasteriza a hairline, o que fazia a grade sumir só num deles.
            "linear-gradient(to right, oklch(0.7246 0.1082 92.34 / 0.1) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.7246 0.1082 92.34 / 0.1) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
    );
  }

  if (kind === "marca") {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden bg-brand-900">
        {/* Um único vetor sangrando para fora da caixa, como na página de
            Design Tokens — a estampa é uma assinatura gráfica, não uma textura
            ladrilhada. */}
        <Image
          src={brandAssets.pattern[1]}
          alt=""
          width={4085}
          height={3154}
          className="pointer-events-none absolute -top-8 -right-10 w-[115%] max-w-none"
          style={patternOffset ? { translate: patternOffset } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-gold-gradient"
    >
      {/* Estampa azul sobre o dourado — a inversão da combinação usada no
          fundo `marca`, mesmo tratamento de vetor único sangrando da caixa. */}
      <Image
        src={brandAssets.pattern[2]}
        alt=""
        width={4085}
        height={3154}
        className="pointer-events-none absolute -top-8 -right-10 w-[115%] max-w-none"
        style={patternOffset ? { translate: patternOffset } : undefined}
      />
    </div>
  );
}

function Stage({
  kind,
  className,
  patternOffset,
  children,
}: {
  kind: BackdropKind;
  className?: string;
  patternOffset?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border",
        className
      )}
    >
      <Backdrop kind={kind} patternOffset={patternOffset} />
      {/* Estes fundos são escuros independentemente do tema, então o conteúdo
          sobre o vidro precisa de foreground claro — é a mesma decisão que o
          consumidor tem de tomar ao posicionar vidro sobre mídia. */}
      <div className="relative flex min-h-56 items-center justify-center p-8 text-white">
        {children}
      </div>
    </div>
  );
}

function GlassLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium text-current drop-shadow-sm">
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Controls                                   */
/* -------------------------------------------------------------------------- */

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  columns = 2,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  columns?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs">{label}</Label>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={cn(
              "rounded-md border px-2 py-1.5 text-xs capitalize transition-colors",
              value === option
                ? "border-ring bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Knob({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format?: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <Label className="text-xs">{label}</Label>
        <span className="font-mono text-xs text-muted-foreground">
          {format ? format(value) : value}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([next]) => onChange(next)}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Playground                                 */
/* -------------------------------------------------------------------------- */

const PROFILES: ThicknessProfile[] = ["convex", "squircle", "lip", "concave"];
const VARIANTS: LiquidGlassVariant[] = ["regular", "clear"];

const DEFAULTS = {
  variant: "regular" as LiquidGlassVariant,
  profile: "convex" as ThicknessProfile,
  backdrop: "grade" as BackdropKind,
  thickness: 15,
  refraction: 1.5,
  ior: 1.5,
  dispersion: 0.5,
  blur: 3,
  noise: 0.1,
  edgeLight: 0.3,
  dim: 0,
  radius: 30,
};

function Playground() {
  const [state, setState] = React.useState(DEFAULTS);
  const tier = useLiquidGlassTier();

  const set = <K extends keyof typeof DEFAULTS>(
    key: K,
    value: (typeof DEFAULTS)[K]
  ) => setState((current) => ({ ...current, [key]: value }));

  return (
    <div className="grid w-full gap-6 xl:grid-cols-[1fr_300px]">
      <div className="flex flex-col gap-3">
        <div className="relative min-h-[26rem] w-full overflow-hidden rounded-2xl border border-border">
          <Backdrop kind={state.backdrop} />
          <div className="relative flex min-h-[26rem] items-center justify-center p-10">
            <LiquidGlass
              variant={state.variant}
              profile={state.profile}
              thickness={state.thickness}
              refraction={state.refraction}
              ior={state.ior}
              dispersion={state.dispersion}
              blur={state.blur}
              noise={state.noise}
              edgeLight={state.edgeLight}
              dim={state.dim}
              elevation="xl"
              className="h-52 w-full max-w-md"
              style={{ borderRadius: `${state.radius}px` }}
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Tier ativo:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
            {tier}
          </code>
          {tier !== "refractive"
            ? " — este navegador não executa deslocamento geométrico, então a refração não aparece."
            : " — deslocamento geométrico real do backdrop."}
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-border p-5">
        <Segmented
          label="Variante"
          options={VARIANTS}
          value={state.variant}
          onChange={(value) => set("variant", value)}
        />
        <Segmented
          label="Perfil de espessura"
          options={PROFILES}
          value={state.profile}
          onChange={(value) => set("profile", value)}
        />
        <Segmented
          label="Fundo de teste"
          options={BACKDROPS}
          value={state.backdrop}
          onChange={(value) => set("backdrop", value)}
        />

        <div className="h-px bg-border" />

        <Knob
          label="Espessura"
          value={state.thickness}
          min={4}
          max={80}
          step={1}
          format={(v) => `${v}px`}
          onChange={(v) => set("thickness", v)}
        />
        <Knob
          label="Intensidade da refração"
          value={state.refraction}
          min={0}
          max={3}
          step={0.05}
          format={(v) => `${v.toFixed(2)}×`}
          onChange={(v) => set("refraction", v)}
        />
        <Knob
          label="Índice de refração"
          value={state.ior}
          min={1}
          max={2}
          step={0.01}
          format={(v) => v.toFixed(2)}
          onChange={(v) => set("ior", v)}
        />
        <Knob
          label="Aberração cromática"
          value={state.dispersion}
          min={0}
          max={1}
          step={0.01}
          format={(v) => v.toFixed(2)}
          onChange={(v) => set("dispersion", v)}
        />

        <div className="h-px bg-border" />

        <Knob
          label="Blur"
          value={state.blur}
          min={0}
          max={40}
          step={0.5}
          format={(v) => `${v}px`}
          onChange={(v) => set("blur", v)}
        />
        <Knob
          label="Luz da borda"
          value={state.edgeLight}
          min={0}
          max={1}
          step={0.01}
          format={(v) => v.toFixed(2)}
          onChange={(v) => set("edgeLight", v)}
        />
        <Knob
          label="Ruído"
          value={state.noise}
          min={0}
          max={1}
          step={0.01}
          format={(v) => v.toFixed(2)}
          onChange={(v) => set("noise", v)}
        />
        <Knob
          label="Dimming"
          value={state.dim}
          min={0}
          max={0.6}
          step={0.01}
          format={(v) => v.toFixed(2)}
          onChange={(v) => set("dim", v)}
        />
        <Knob
          label="Raio do canto"
          value={state.radius}
          min={0}
          max={104}
          step={1}
          format={(v) => `${v}px`}
          onChange={(v) => set("radius", v)}
        />

        <button
          type="button"
          onClick={() => setState(DEFAULTS)}
          className="mt-1 rounded-md border border-border px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted"
        >
          Restaurar padrões
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                     */
/* -------------------------------------------------------------------------- */

export default function LiquidGlassPage() {
  return (
    <ComponentPage
      title="Liquid Glass"
      category="New"
      description="Material óptico que refrata o conteúdo atrás dele por deslocamento geométrico calculado com a lei de Snell — não é um preset de backdrop-filter. Camada funcional apenas: use para controles e navegação que flutuam sobre o conteúdo, nunca dentro da camada de conteúdo."
      install="npx shadcn@latest add liquid-glass"
      importCode={`import { LiquidGlass, LIQUID_GLASS_PRESETS } from "@/components/ui/liquid-glass"`}
    >
      <Demo
        title="Playground"
        description="Todas as propriedades do material em tempo real. A refração só aparece sobre conteúdo de alta frequência — troque o fundo de teste e aumente a intensidade para ver as linhas se curvarem nas extremidades."
        contentClassName="p-4"
      >
        <Playground />
      </Demo>

      <Demo
        title="Padrão do design system"
        description="A configuração oficial do material. É o que sai de <LiquidGlass /> sem nenhuma prop, e o que deve ser usado em qualquer aplicação no sistema salvo instrução em contrário."
        contentClassName="p-4"
        code={`// Todos os valores abaixo já são o default — basta:
<LiquidGlass />

// Equivalente explícito:
<LiquidGlass
  variant="regular"
  profile="convex"
  thickness={15}
  refraction={1.5}
  ior={1.5}
  dispersion={0.5}
  blur={3}
  edgeLight={0.3}
  noise={0.1}
  dim={0}
/>
// raio do canto: var(--glass-radius) = 30px`}
      >
        <div className="grid w-full gap-4 md:grid-cols-2">
          <Stage kind="marca">
            <LiquidGlass className="flex h-32 w-full max-w-xs items-center justify-center">
              <GlassLabel>Padrão sobre azul</GlassLabel>
            </LiquidGlass>
          </Stage>
          <Stage kind="gold">
            <LiquidGlass className="flex h-32 w-full max-w-xs items-center justify-center">
              <GlassLabel>Padrão sobre dourado</GlassLabel>
            </LiquidGlass>
          </Stage>
        </div>
      </Demo>

      <Demo
        title="Regular e Clear"
        description="As duas variantes do material. Regular ajusta blur e luminosidade para preservar legibilidade e é o padrão. Clear é quase totalmente transparente, para uso sobre mídia — e pede uma camada de dimming quando o fundo é claro."
        contentClassName="flex-col p-4"
        code={`<LiquidGlass variant="regular">Regular</LiquidGlass>

<LiquidGlass variant="clear">Clear</LiquidGlass>`}
      >
        <div className="grid w-full gap-4 md:grid-cols-2">
          <Stage kind="marca">
            <LiquidGlass
              variant="regular"
              className="flex h-28 w-full max-w-xs items-center justify-center"
            >
              <GlassLabel>Regular</GlassLabel>
            </LiquidGlass>
          </Stage>

          <Stage kind="gold">
            <LiquidGlass
              variant="clear"
              className="flex h-28 w-full max-w-xs items-center justify-center"
            >
              <GlassLabel>Clear</GlassLabel>
            </LiquidGlass>
          </Stage>
        </div>
      </Demo>

      <Demo
        title="Perfis de espessura"
        description="A curvatura da borda decide a largura da banda de deformação. Convex mantém curvatura ao longo de quase todo o bisel, então o fundo comprime numa faixa larga; squircle atinge o platô nos primeiros pixels e concentra tudo num fio junto à aresta."
        contentClassName="p-4"
        code={`<LiquidGlass profile="convex" />
<LiquidGlass profile="squircle" />
<LiquidGlass profile="lip" />
<LiquidGlass profile="concave" />`}
      >
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILES.map((profile) => (
            <div key={profile} className="flex flex-col gap-2">
              <Stage kind="grade" className="[&>div]:min-h-40">
                <LiquidGlass
                  profile={profile}
                  thickness={30}
                  className="size-24 rounded-[1.75rem]"
                />
              </Stage>
              <span className="text-center text-xs text-muted-foreground capitalize">
                {profile}
              </span>
            </div>
          ))}
        </div>
      </Demo>

      <Demo
        title="Presets e composição"
        description="O material deve ser usado com parcimônia e nunca empilhado. Em vez de subcomponentes que facilitariam vidro sobre vidro, os presets cobrem as camadas previstas: toolbar, panel, control e overlay."
        contentClassName="p-4"
        code={`import { LIQUID_GLASS_PRESETS, LiquidGlass } from "@/components/ui/liquid-glass"

<LiquidGlass {...LIQUID_GLASS_PRESETS.toolbar} className="rounded-full p-1.5">
  <button>…</button>
</LiquidGlass>

<LiquidGlass {...LIQUID_GLASS_PRESETS.control} asChild>
  <button type="button">Ação</button>
</LiquidGlass>`}
      >
        <div className="flex w-full flex-col gap-4">
          <Stage kind="marca" patternOffset="-10% -10%">
            <div className="flex flex-col items-center gap-5">
              <LiquidGlass
                {...LIQUID_GLASS_PRESETS.toolbar}
                className="flex items-center gap-1 rounded-full p-1.5"
              >
                {[CompassIcon, SearchIcon, LayersIcon, BellIcon].map(
                  (Icon, index) => (
                    <button
                      key={index}
                      type="button"
                      className="rounded-full p-2.5 text-current/85 transition-colors hover:bg-white/10"
                    >
                      <Icon className="size-4" />
                    </button>
                  )
                )}
              </LiquidGlass>

              <LiquidGlass {...LIQUID_GLASS_PRESETS.control} asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                >
                  <SparklesIcon className="size-4" />
                  Pressione
                </button>
              </LiquidGlass>
            </div>
          </Stage>

          <Stage kind="gold">
            <LiquidGlass
              {...LIQUID_GLASS_PRESETS.panel}
              className="flex w-full max-w-md flex-col gap-2 p-6"
            >
              <span className="font-heading text-sm font-medium">
                Preset · panel
              </span>
              <p className="text-xs leading-relaxed text-current/80">
                Material mais espesso, sombra mais profunda e lensing mais
                pronunciado — superfícies maiores pedem um vidro mais
                encorpado.
              </p>
            </LiquidGlass>
          </Stage>
        </div>
      </Demo>

      <Demo
        title="Tiers de renderização"
        description="Refração real depende de backdrop-filter aceitar um filtro SVG, o que hoje só acontece em Chromium (WebKit bug 245510). A degradação é automática — os três painéis forçam cada tier via prop."
        contentClassName="p-4"
      >
        <div className="grid w-full gap-4 md:grid-cols-3">
          {(
            [
              ["refractive", "Chromium. Deslocamento geométrico real."],
              ["frosted", "Safari e Firefox. Blur graduado nas bordas."],
              ["solid", "Reduce Transparency. Superfície opaca do tema."],
            ] as [LiquidGlassTier, string][]
          ).map(([tier, note]) => (
            <div key={tier} className="flex flex-col gap-2">
              <Stage kind="marca" className="[&>div]:min-h-44">
                <LiquidGlass
                  tier={tier}
                  thickness={24}
                  className={cn(
                    "flex h-28 w-full items-center justify-center rounded-3xl",
                    tier === "solid" && "text-card-foreground"
                  )}
                >
                  <GlassLabel>{tier}</GlassLabel>
                </LiquidGlass>
              </Stage>
              <p className="text-xs text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      </Demo>

      <PropsTable
        caption="Todas as props são opcionais. Espessura, blur e luz da borda derivam do tamanho do elemento e do índice de refração quando não informadas."
        rows={[
          {
            prop: "variant",
            type: '"regular" | "clear"',
            default: '"regular"',
            description:
              "As duas variantes do material. Regular preserva legibilidade; Clear prioriza a mídia por trás.",
          },
          {
            prop: "profile",
            type: '"squircle" | "convex" | "lip" | "concave"',
            default: '"convex"',
            description:
              "Cross-section do bisel. Convex mantém curvatura ao longo de quase todo o bisel, então a compressão do fundo se espalha por uma banda larga; squircle atinge o platô nos primeiros pixels e concentra tudo num fio junto à aresta.",
          },
          {
            prop: "thickness",
            type: "number",
            default: "auto",
            description:
              "Profundidade aparente em px. Por padrão escala com o menor lado do elemento.",
          },
          {
            prop: "refraction",
            type: "number",
            default: "1",
            description:
              "Multiplicador sobre o deslocamento calculado. Preserva a forma da queda e escala só a intensidade.",
          },
          {
            prop: "ior",
            type: "number",
            default: "1.5",
            description:
              "Índice de refração. Afeta o deslocamento e, via Fresnel, a intensidade padrão da borda.",
          },
          {
            prop: "dispersion",
            type: "number",
            default: "0.35",
            description:
              "Aberração cromática, 0–1. Separa R/G/B em três passes de deslocamento.",
          },
          {
            prop: "blur",
            type: "number",
            default: "auto",
            description:
              "Raio do espalhamento em px. Valores altos apagam o detalhe que a lente deveria dobrar.",
          },
          {
            prop: "saturation",
            type: "number",
            default: "1.5 / 1.2",
            description:
              "Multiplicador de croma do backdrop. Menor na variante Clear.",
          },
          {
            prop: "tint",
            type: "string",
            default: "var(--glass-tint)",
            description:
              "Cor do tingimento. O padrão acompanha o tema claro/escuro.",
          },
          {
            prop: "tintOpacity",
            type: "number",
            default: "0.14 / 0.05",
            description: "Alpha do tingimento, por variante.",
          },
          {
            prop: "edgeLight",
            type: "number",
            default: "auto",
            description:
              "Brilho da linha que percorre a aresta, uniforme em todo o perímetro. Derivado de ior por Schlick quando omitido.",
          },
          {
            prop: "noise",
            type: "number",
            default: "0.25",
            description:
              "Grão sutil, 0–1. Evita banding nos gradientes sobre o blur. Use 0 para remover.",
          },
          {
            prop: "elevation",
            type: '"none" | "sm" | "md" | "lg" | "xl"',
            default: '"lg"',
            description: "Sombra, mapeada nos tokens --elevation-* do tema.",
          },
          {
            prop: "dim",
            type: "boolean | number",
            default: "false",
            description:
              "Camada de dimming atrás do vidro. true aplica 35%, a referência para Clear sobre mídia clara.",
          },
          {
            prop: "interactive",
            type: "boolean",
            default: "false",
            description: "Recua ao toque.",
          },
          {
            prop: "quality",
            type: '"auto" | "high" | "low"',
            default: '"auto"',
            description:
              "low remove a aberração cromática, reduzindo de três passes para um.",
          },
          {
            prop: "tier",
            type: '"auto" | "refractive" | "frosted" | "solid"',
            default: '"auto"',
            description:
              "Sobrescreve a detecção de capacidade. Útil para demos e diagnóstico.",
          },
          {
            prop: "asChild",
            type: "boolean",
            default: "false",
            description:
              "Aplica o material sobre o elemento filho, preservando sua semântica.",
          },
        ]}
      />

      <Usage
        title="Regras de camada"
        description="Regras de uso que valem tanto quanto a implementação."
        code={`import { LIQUID_GLASS_PRESETS, LiquidGlass } from "@/components/ui/liquid-glass"

// ✅ Camada funcional: controles e navegação flutuando sobre o conteúdo
<LiquidGlass {...LIQUID_GLASS_PRESETS.toolbar} className="rounded-full p-1.5">
  <button>…</button>
</LiquidGlass>

// ✅ asChild preserva a semântica do elemento
<LiquidGlass {...LIQUID_GLASS_PRESETS.control} asChild>
  <button type="button">Ação</button>
</LiquidGlass>

// ❌ Nunca na camada de conteúdo — use Card para superfícies de conteúdo
<LiquidGlass><article>…</article></LiquidGlass>

// ❌ Nunca vidro sobre vidro — separe com fills e transparência
<LiquidGlass><LiquidGlass>…</LiquidGlass></LiquidGlass>`}
      />

      <A11yNotes
        items={[
          "prefers-reduced-transparency: reduce força o tier solid — superfície opaca, sem filtros.",
          "prefers-contrast: more adiciona contorno sólido e reforça a luz da borda.",
          "prefers-reduced-motion: reduce remove o flex ao toque. O lensing estático permanece, por ser a identidade do material.",
          "O material é decorativo: não recebe papel ARIA nem foco próprio. Com asChild, a semântica é a do elemento filho — use button, nav ou aside conforme o caso.",
          "Contraste de texto sobre vidro deve ser verificado no contexto real. A variante Regular existe justamente para os casos com texto; Clear pressupõe conteúdo bold sobre mídia.",
        ]}
      />
    </ComponentPage>
  );
}
