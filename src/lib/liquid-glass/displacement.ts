/**
 * Generates the displacement map consumed by `feDisplacementMap`.
 *
 * The map is an RGBA bitmap where the red channel encodes horizontal offset and
 * the green channel encodes vertical offset, both around a neutral midpoint.
 * The filter reads it as a vector field and resamples the backdrop through it,
 * which is what produces genuine refraction rather than a blur.
 *
 * Cost control, in order of impact:
 *
 *   - The physics is solved once into a 1-D table (see `optics.ts`), so the
 *     per-pixel work is one SDF evaluation plus a table lookup.
 *   - Only one quadrant is computed. A centred rounded rectangle is symmetric
 *     about both axes, so the other three are sign flips of the first.
 *   - The bitmap is capped at 512px on its long side. The field is smooth, and
 *     `feImage` resamples it bilinearly across the element, so extra resolution
 *     buys nothing visible.
 *
 * A 400×200 panel therefore costs roughly 40k quadrant pixels — low single-digit
 * milliseconds, synchronous, and only on a geometry change. That is the reason
 * this is plain TypeScript and not a GPU pass: standing up a WebGL context and
 * reading pixels back out of it would cost more than the computation it saves.
 */

import { LruCache } from "./cache";
import { buildDisplacementLut, LUT_SAMPLES } from "./optics";
import type { ThicknessProfile } from "./profiles";
import { createSdfSample, sampleRoundedRect } from "./sdf";

/** Longest side of the generated bitmap, in pixels. */
const MAX_MAP_SIZE = 512;

export interface DisplacementMapRequest {
  width: number;
  height: number;
  radius: number;
  profile: ThicknessProfile;
  thickness: number;
  bevel: number;
  ior: number;
}

export interface DisplacementMap {
  /** PNG data URL, ready for `feImage`. */
  href: string;
  /**
   * Value for the `scale` attribute of `feDisplacementMap`, in CSS pixels.
   *
   * The filter computes `scale × (channel / 255 − 0.5)`, so a channel driven to
   * either extreme yields `±scale / 2`. Doubling the peak displacement makes
   * the extremes land exactly on it.
   */
  scale: number;
  width: number;
  height: number;
}

const cache = new LruCache<DisplacementMap>(24);

function cacheKey(request: DisplacementMapRequest): string {
  const { width, height, radius, profile, thickness, bevel, ior } = request;
  return [
    width,
    height,
    radius.toFixed(1),
    profile,
    thickness.toFixed(1),
    bevel.toFixed(1),
    ior.toFixed(3),
  ].join(":");
}

/**
 * Builds — or returns a cached — displacement map.
 *
 * Returns `null` during server rendering, where there is no canvas to encode
 * with. Callers treat that as "no refraction yet" and upgrade on the client.
 */
export function buildDisplacementMap(
  request: DisplacementMapRequest
): DisplacementMap | null {
  if (typeof document === "undefined") return null;
  if (request.width <= 0 || request.height <= 0) return null;

  const key = cacheKey(request);
  const cached = cache.get(key);
  if (cached) return cached;

  const map = generate(request);
  if (map) cache.set(key, map);
  return map;
}

function generate(request: DisplacementMapRequest): DisplacementMap | null {
  const { width, height, radius, profile, thickness, bevel, ior } = request;

  // Downscale the bitmap, keeping the aspect ratio so `preserveAspectRatio`
  // can stay disabled and the map stretches exactly onto the element box.
  const longest = Math.max(width, height);
  const k = longest > MAX_MAP_SIZE ? MAX_MAP_SIZE / longest : 1;
  const mapWidth = Math.max(2, Math.round(width * k));
  const mapHeight = Math.max(2, Math.round(height * k));

  const lut = buildDisplacementLut({ profile, thickness, bevel, ior });
  if (lut.peak <= 0) return null;

  // Geometry is evaluated in the bitmap's own coordinate space, so every length
  // is scaled by `k`. Displacement magnitudes stay in CSS pixels — they describe
  // how far the filter should reach on screen, not inside the bitmap.
  const halfWidth = mapWidth / 2;
  const halfHeight = mapHeight / 2;
  const mapRadius = radius * k;
  const mapBevel = Math.max(bevel * k, 1e-3);

  const quadWidth = Math.ceil(mapWidth / 2);
  const quadHeight = Math.ceil(mapHeight / 2);
  const quadX = new Float32Array(quadWidth * quadHeight);
  const quadY = new Float32Array(quadWidth * quadHeight);

  const sample = createSdfSample();
  const lastIndex = LUT_SAMPLES - 1;

  for (let j = 0; j < quadHeight; j += 1) {
    const ly = j + 0.5 - halfHeight;
    for (let i = 0; i < quadWidth; i += 1) {
      const lx = i + 0.5 - halfWidth;

      sampleRoundedRect(lx, ly, halfWidth, halfHeight, mapRadius, sample);

      // Outside the outline there is no glass, so nothing is displaced.
      if (sample.distance >= 0) continue;

      const penetration = -sample.distance;
      const t = Math.min(penetration / mapBevel, 1);
      const magnitude = lut.magnitudes[Math.round(t * lastIndex)];

      // The normal points outward, and so does the displacement: to make the
      // rim appear to pull the surroundings inward, each pixel has to sample
      // the backdrop from further out.
      const index = j * quadWidth + i;
      quadX[index] = sample.nx * magnitude;
      quadY[index] = sample.ny * magnitude;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = mapWidth;
  canvas.height = mapHeight;

  const context = canvas.getContext("2d");
  if (!context) return null;

  const image = context.createImageData(mapWidth, mapHeight);
  const pixels = image.data;

  for (let y = 0; y < mapHeight; y += 1) {
    const mirroredY = y < quadHeight ? y : mapHeight - 1 - y;
    const signY = y < quadHeight ? 1 : -1;
    const row = mirroredY * quadWidth;

    for (let x = 0; x < mapWidth; x += 1) {
      const mirroredX = x < quadWidth ? x : mapWidth - 1 - x;
      const signX = x < quadWidth ? 1 : -1;
      const source = row + mirroredX;

      const dx = quadX[source] * signX;
      const dy = quadY[source] * signY;

      const target = (y * mapWidth + x) * 4;
      pixels[target] = encodeChannel(dx);
      pixels[target + 1] = encodeChannel(dy);
      pixels[target + 2] = 0;
      pixels[target + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);

  return {
    href: canvas.toDataURL("image/png"),
    scale: lut.peak * 2,
    width: mapWidth,
    height: mapHeight,
  };
}

/** Maps a normalized offset in `[-1, 1]` onto a symmetric 8-bit channel. */
function encodeChannel(normalized: number): number {
  const value = Math.round(127.5 + normalized * 127.5);
  return Math.min(Math.max(value, 0), 255);
}
