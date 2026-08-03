/**
 * Which rendering tier this browser can actually deliver.
 *
 * `backdrop-filter: url(#filter)` with `feDisplacementMap` only renders in
 * Chromium. Safari and Firefox parse the declaration, silently drop the SVG
 * reference, and leave a plain blur behind (WebKit bug 245510).
 *
 * There is no feature query that separates "accepts the syntax" from "renders
 * the filter", and the usual fallback — render a probe and read the pixels
 * back — is impossible here by construction, because reading the backdrop is
 * precisely what the platform forbids. So this sniffs the engine.
 *
 * That is a deliberate, contained tradeoff: the tier only ever selects between
 * two good-looking renderings, so a wrong guess degrades rather than breaks,
 * and the component accepts an explicit `tier` prop to override it.
 */

export type LiquidGlassTier = "refractive" | "frosted" | "solid";

interface UserAgentBrand {
  brand: string;
  version: string;
}

interface NavigatorUaData {
  brands?: UserAgentBrand[];
}

function isChromium(): boolean {
  const ua = navigator.userAgent;

  // Every browser on iOS is WebKit underneath, whatever it calls itself.
  if (/iPhone|iPad|iPod|CriOS|FxiOS|EdgiOS/.test(ua)) return false;

  const uaData = (navigator as Navigator & { userAgentData?: NavigatorUaData })
    .userAgentData;
  if (uaData?.brands?.length) {
    return uaData.brands.some((entry) => entry.brand === "Chromium");
  }

  return /Chrome|Chromium|Edg\//.test(ua);
}

function supportsBackdropFilter(): boolean {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return (
    CSS.supports("backdrop-filter", "blur(1px)") ||
    CSS.supports("-webkit-backdrop-filter", "blur(1px)")
  );
}

export function detectTier(): LiquidGlassTier {
  if (typeof window === "undefined") return "frosted";

  if (!supportsBackdropFilter()) return "solid";

  // Mirrors iOS "Reduce Transparency", which the HIG expects the material to
  // honour by turning frosted and opaque.
  if (window.matchMedia?.("(prefers-reduced-transparency: reduce)").matches) {
    return "solid";
  }

  return isChromium() ? "refractive" : "frosted";
}
