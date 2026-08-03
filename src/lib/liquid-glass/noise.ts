/**
 * Static film grain.
 *
 * Wide, low-contrast gradients over a blurred backdrop are exactly the
 * conditions that produce visible banding on 8-bit displays. A sub-percent
 * layer of noise breaks up the quantization steps, and it also does some of the
 * work of selling the material as a physical surface rather than a gradient.
 *
 * Generated once per opacity as an inline SVG data URI: no network request, no
 * canvas, and the browser rasterizes it a single time.
 */

import { LruCache } from "./cache";

const cache = new LruCache<string>(8);

export function noiseDataUri(opacity: number): string {
  const alpha = Math.min(Math.max(opacity, 0), 1);
  const key = alpha.toFixed(3);

  const cached = cache.get(key);
  if (cached) return cached;

  // `stitchTiles` keeps the pattern seamless where the background repeats.
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">` +
    `<filter id="n" x="0" y="0" width="100%" height="100%">` +
    `<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>` +
    `<feColorMatrix type="saturate" values="0"/>` +
    `</filter>` +
    `<rect width="160" height="160" filter="url(#n)" opacity="${key}"/>` +
    `</svg>`;

  const uri = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  cache.set(key, uri);
  return uri;
}
