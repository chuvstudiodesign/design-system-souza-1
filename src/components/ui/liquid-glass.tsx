"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import {
  buildDisplacementMap,
  detectTier,
  filterIdForSpec,
  noiseDataUri,
  releaseFilter,
  retainFilter,
  type LiquidGlassTier,
  type ThicknessProfile,
} from "@/lib/liquid-glass";
import { cn } from "@/lib/utils";

export type { LiquidGlassTier, ThicknessProfile };

export type LiquidGlassVariant = "regular" | "clear";

export interface LiquidGlassProps extends React.ComponentProps<"div"> {
  /**
   * Which of Apple's two materials to render.
   *
   * `regular` adapts to keep foreground content legible and is the right
   * default for anything with text — toolbars, sidebars, popovers. `clear` is
   * far more transparent and belongs over photography or video, where the HIG
   * expects a dimming layer underneath it if the media is bright.
   */
  variant?: LiquidGlassVariant;
  /**
   * Cross-section of the bevel, which governs how wide the deformation band is.
   *
   * `convex` is the default because it keeps curving across most of the bevel,
   * so the backdrop compresses over a broad band the way it does through real
   * glass. `squircle` reaches its plateau within the first few pixels, which
   * concentrates the whole distortion into a thin line at the outline — tighter
   * and more graphic, but much less like a physical material.
   */
  profile?: ThicknessProfile;
  /** Apparent depth of the glass, in pixels. */
  thickness?: number;
  /**
   * Multiplier on the computed displacement.
   *
   * The optics below solve a single refracting surface, which is a floor rather
   * than a target: Apple describes Liquid Glass as a meta-material, and real
   * glass also has an exit interface and internal reflection that a one-surface
   * model leaves on the table. This scales the result without touching the
   * shape of the falloff, so the band stays physically derived while the
   * strength becomes a design decision.
   */
  refraction?: number;
  /** Index of refraction. 1.5 is crown glass; higher bends and reflects more. */
  ior?: number;
  /** Chromatic aberration, 0–1. */
  dispersion?: number;
  /** Backdrop blur radius in pixels. */
  blur?: number;
  /** Backdrop saturation multiplier. */
  saturation?: number;
  /** Tint colour. Defaults to the theme-aware `--glass-tint` token. */
  tint?: string;
  /** Tint alpha, 0–1. */
  tintOpacity?: number;
  /**
   * Brightness of the line that traces the edge, 0–1.
   *
   * Even all the way round: a glass rim catches light along its whole
   * perimeter, and biasing it toward one side reads as a drop shadow rather
   * than as an edge.
   */
  edgeLight?: number;
  /** Film grain, 0–1. Suppresses banding across the blurred backdrop. */
  noise?: number;
  /** Drop shadow depth, mapped onto the design system's elevation tokens. */
  elevation?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * Dimming layer behind the glass. `true` applies the 35% the HIG prescribes
   * for clear glass over bright media; a number sets it explicitly.
   */
  dim?: boolean | number;
  /** Flex on press, the way Apple's controls respond to touch. */
  interactive?: boolean;
  /** Drops chromatic aberration under `low`, for dense lists of glass surfaces. */
  quality?: "auto" | "high" | "low";
  /** Overrides tier detection. Useful for demos and diagnostics. */
  tier?: "auto" | LiquidGlassTier;
  asChild?: boolean;
}

interface Geometry {
  width: number;
  height: number;
  radius: number;
}

/**
 * Geometry is snapped before it reaches the map generator, so dragging a
 * resize handle sweeps a handful of cached keys instead of generating a fresh
 * bitmap every frame.
 */
const GEOMETRY_STEP = 4;

function snap(value: number): number {
  return Math.round(value / GEOMETRY_STEP) * GEOMETRY_STEP;
}

function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      if (typeof window === "undefined") return () => {};
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query]
  );

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

/**
 * The tier this browser resolved to, for consumers that need to branch on it.
 *
 * The engine is an external system, so it is read through
 * `useSyncExternalStore` rather than an effect. That also gets hydration right
 * for free: the server snapshot is `frosted`, React reuses it while hydrating,
 * and the real tier lands on the first client render afterwards.
 */
function subscribeToTier(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia("(prefers-reduced-transparency: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useLiquidGlassTier(): LiquidGlassTier {
  return React.useSyncExternalStore(
    subscribeToTier,
    detectTier,
    () => "frosted" as const
  );
}

function LiquidGlass({
  variant = "regular",
  profile = "convex",
  thickness = 15,
  refraction = 1.5,
  ior = 1.5,
  dispersion = 0.5,
  blur: blurProp,
  saturation: saturationProp,
  tint,
  tintOpacity: tintOpacityProp,
  edgeLight = 0.3,
  noise = 0.1,
  elevation = "lg",
  dim = false,
  interactive = false,
  quality = "auto",
  tier: tierProp = "auto",
  asChild = false,
  className,
  style,
  children,
  ref: forwardedRef,
  ...props
}: LiquidGlassProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  // O componente mede o próprio nó, mas também precisa entregá-lo a quem o
  // envolve — Radix e afins dependem do DOM real para foco e dismiss.
  const attachRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef]
  );
  const detected = useLiquidGlassTier();
  const resolvedTier = tierProp === "auto" ? detected : tierProp;

  const moreContrast = useMediaQuery("(prefers-contrast: more)");

  const [geometry, setGeometry] = React.useState<Geometry | null>(null);

  // Measure the box and, crucially, the resolved corner radius. Reading it back
  // from computed style means the map matches whatever Tailwind class the
  // consumer used, without the component owning a second source of truth.
  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => {
      const rect = element.getBoundingClientRect();
      const radius = parseFloat(
        getComputedStyle(element).borderTopLeftRadius || "0"
      );

      const next: Geometry = {
        width: snap(rect.width),
        height: snap(rect.height),
        radius: Number.isFinite(radius) ? radius : 0,
      };

      setGeometry((current) =>
        current &&
        current.width === next.width &&
        current.height === next.height &&
        current.radius === next.radius
          ? current
          : next
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const size = geometry ? Math.min(geometry.width, geometry.height) : 0;

  // The refractive band runs wider than the material is deep. A narrow bevel
  // crowds the whole falloff against the outline; giving it room is what turns
  // the lens into a gradient the eye reads as curvature.
  const bevel = Math.min(thickness * 1.4, Math.max(size * 0.45, 1));

  // Restraint is the whole point of the blur defaults. Lensing is only legible
  // while the backdrop still has structure left to bend, so a heavy blur
  // collapses the material back into the frosted look it exists to replace.
  const isClear = variant === "clear";
  const blur = blurProp ?? (isClear ? 1.5 : 3);
  const saturation = saturationProp ?? (isClear ? 1.2 : 1.5);
  const tintOpacity = tintOpacityProp ?? (isClear ? 0.05 : 0.14);
  const dimAmount = dim === true ? 0.35 : dim === false ? 0 : dim;

  const effectiveDispersion = quality === "low" ? 0 : dispersion;

  const map = React.useMemo(() => {
    if (resolvedTier !== "refractive" || !geometry) return null;
    if (geometry.width <= 0 || geometry.height <= 0) return null;

    return buildDisplacementMap({
      width: geometry.width,
      height: geometry.height,
      radius: geometry.radius,
      profile,
      thickness,
      bevel,
      ior,
    });
  }, [resolvedTier, geometry, profile, thickness, bevel, ior]);

  // Strength scales the filter attribute, not the bitmap, so sliding it does
  // not invalidate the generated map.
  const spec = React.useMemo(
    () =>
      map
        ? {
            map,
            scale: map.scale * Math.max(refraction, 0),
            dispersion: effectiveDispersion,
          }
        : null,
    [map, refraction, effectiveDispersion]
  );

  // The id is a pure function of the spec, so it can be referenced during
  // render while the effect below owns the lifetime of the actual filter node.
  const filterId = React.useMemo(
    () => (spec ? filterIdForSpec(spec) : null),
    [spec]
  );

  React.useEffect(() => {
    if (!spec) return;
    const id = retainFilter(spec);
    return () => releaseFilter(id);
  }, [spec]);

  const tintColor = tint ?? "var(--glass-tint)";
  const refractionFilter = filterId ? `url(#${filterId})` : "";

  const cssVariables = {
    // Refraction runs first, on the sharp backdrop. Blurring before the
    // displacement would average away the very detail the lens is meant to
    // bend, leaving a frosted panel that happens to run an expensive filter.
    "--lg-backdrop": `${
      refractionFilter ? `${refractionFilter} ` : ""
    }blur(${blur}px) saturate(${saturation}) var(--glass-adjust)`,
    "--lg-tint-layer": `color-mix(in oklab, ${tintColor} ${(
      tintOpacity * 100
    ).toFixed(2)}%, transparent)`,
    "--lg-dim-layer": `rgb(0 0 0 / ${dimAmount})`,
    "--lg-noise-image": noise > 0 ? noiseDataUri(noise * 0.6) : "none",
    "--lg-depth": `${thickness}px`,
    "--lg-band": `${(thickness * 2.4).toFixed(2)}px`,
    "--lg-ring-blur": `${(blur * 0.9).toFixed(2)}px`,
    "--lg-rim": moreContrast ? Math.max(edgeLight, 0.9) : edgeLight,
    ...style,
  } as React.CSSProperties;

  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      ref={attachRef}
      data-slot="liquid-glass"
      data-variant={variant}
      data-tier={resolvedTier}
      data-elevation={elevation}
      data-interactive={interactive || undefined}
      className={cn("liquid-glass rounded-(--glass-radius)", className)}
      style={cssVariables}
      {...props}
    >
      {children}
    </Comp>
  );
}

/**
 * Starting points aligned with the layering rules in the HIG.
 *
 * The material is meant for the functional layer that floats above content —
 * toolbars, sidebars, transient controls — and explicitly not for the content
 * layer itself. These presets encode that, rather than leaving every consumer
 * to rediscover which combination of thickness and tint reads correctly at a
 * given size.
 */
export const LIQUID_GLASS_PRESETS = {
  /** Floating toolbar or tab bar. Thin, legible, unobtrusive. */
  toolbar: { variant: "regular", thickness: 16, elevation: "md" },
  /** Sidebar or sheet. Thicker material, deeper shadow, more pronounced lensing. */
  panel: { variant: "regular", thickness: 38, elevation: "xl" },
  /** Button or toggle. Small, crisp, responds to press. */
  control: {
    variant: "regular",
    thickness: 12,
    elevation: "sm",
    interactive: true,
  },
  /** Controls over photography or video. Needs a dimming layer on bright media. */
  overlay: { variant: "clear", thickness: 20, elevation: "lg", dim: true },
} as const satisfies Record<string, Partial<LiquidGlassProps>>;

export { LiquidGlass };
