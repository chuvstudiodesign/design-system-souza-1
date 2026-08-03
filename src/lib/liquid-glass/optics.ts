/**
 * The optics of the material: Snell refraction and Fresnel reflectance.
 *
 * The whole displacement field is radially symmetric with respect to the edge
 * of the shape, so the expensive part of the physics only ever needs to be
 * solved once along a single axis. That is what this module produces: a 1-D
 * lookup table of displacement magnitude against penetration depth, which the
 * map generator then sweeps around the outline.
 */

import { THICKNESS_PROFILES, type ThicknessProfile } from "./profiles";

/** Resolution of the 1-D refraction table. */
export const LUT_SAMPLES = 128;

/**
 * How much of the profile's leading tip to cut away.
 *
 * Both the squircle and the circle meet the outline with a vertical tangent, so
 * their derivative is singular at `t = 0`. Sampled literally, every bit of ray
 * bending collapses into a sub-pixel sliver at the rim: the field swings by
 * ~10px across one pixel of space, which reads as a hard duplicated line and
 * aliases badly, instead of the smooth squeeze the material is supposed to have.
 *
 * Truncating the tip is also the more faithful reading of the reference. Glass
 * on Apple's platforms has a definite edge, not a knife edge — starting the
 * profile just inside the singularity gives the material a finite edge
 * thickness and puts peak displacement *on* the rim, decaying inward across the
 * whole bevel.
 */
const EDGE_TRUNCATION = 0.035;

export interface DisplacementLut {
  /** Displacement magnitude normalized to the peak, one entry per sample. */
  readonly magnitudes: Float32Array;
  /** Peak displacement in CSS pixels. Denormalizes `magnitudes`. */
  readonly peak: number;
}

export interface RefractionParams {
  profile: ThicknessProfile;
  /** Apparent depth of the material, in CSS pixels. */
  thickness: number;
  /** Width of the refractive band measured inward from the edge, in CSS pixels. */
  bevel: number;
  /** Index of refraction. 1.5 is crown glass. */
  ior: number;
}

/**
 * Solves the ray path for every sample along the bevel.
 *
 * The viewer is treated as orthographic and looking straight down the z axis,
 * which is the same simplification Apple makes — the material is a 2-D planar
 * simulation, not a raytraced solid. For each sample:
 *
 *   1. The surface slope `m` gives the angle of incidence, since the incoming
 *      ray is vertical: `tan θ₁ = m`.
 *   2. Snell's law refracts it into the glass: `sin θ₂ = sin θ₁ / ior`.
 *   3. The ray now travels at `δ = θ₁ − θ₂` from vertical, through a local
 *      glass depth of `thickness · h(t)`, before it reaches the backdrop.
 *   4. The lateral offset it accumulates over that depth is the displacement.
 *
 * Note that the displacement is zero at the very edge and peaks slightly
 * inside it. That is not a bug — at the rim the glass is infinitesimally thin,
 * so however hard it bends the ray there is no path length over which the
 * offset can accumulate. It is why real lens distortion reads as a band just
 * inside the outline rather than a hard line on it.
 *
 * No total-internal-reflection branch is needed: light travels from air into a
 * denser medium, so `sin θ₂` can never exceed 1.
 */
export function buildDisplacementLut({
  profile,
  thickness,
  bevel,
  ior,
}: RefractionParams): DisplacementLut {
  const { h, dh } = THICKNESS_PROFILES[profile];
  const magnitudes = new Float32Array(LUT_SAMPLES);
  const slopeScale = bevel > 0 ? thickness / bevel : 0;

  let peak = 0;

  const span = 1 - EDGE_TRUNCATION;

  for (let i = 0; i < LUT_SAMPLES; i += 1) {
    const t = i / (LUT_SAMPLES - 1);
    // Walk the surviving span of the profile. The chain-rule factor keeps the
    // slope in the geometry's own units after the remap.
    const u = EDGE_TRUNCATION + t * span;

    const slope = slopeScale * dh(u) * span;
    const incidence = Math.atan(slope);
    const refracted = Math.asin(Math.min(Math.sin(incidence) / ior, 1));
    const deviation = incidence - refracted;
    const depth = thickness * h(u);

    const magnitude = depth * Math.tan(deviation);
    magnitudes[i] = magnitude;
    if (magnitude > peak) peak = magnitude;
  }

  if (peak > 0) {
    for (let i = 0; i < LUT_SAMPLES; i += 1) {
      magnitudes[i] /= peak;
    }
  }

  return { magnitudes, peak };
}

/**
 * Schlick's approximation of Fresnel reflectance.
 *
 * Used to derive how bright the rim should be from the index of refraction, so
 * that raising `ior` visibly firms up the edge instead of only affecting the
 * refraction. Grazing angles approach total reflectance, which is exactly the
 * behaviour that makes glass edges catch light.
 */
export function fresnelSchlick(cosTheta: number, ior: number): number {
  const r0 = ((1 - ior) / (1 + ior)) ** 2;
  const f = Math.min(Math.max(1 - cosTheta, 0), 1);
  return r0 + (1 - r0) * f ** 5;
}

/**
 * Normal-incidence reflectance, mapped onto a usable rim opacity.
 *
 * Crown glass reflects about 4% head-on, which is far too faint to read on a
 * screen at UI scale. The material is a stylized meta-material rather than a
 * physical sample, so this lifts the response into a perceptually useful range
 * while keeping it monotonic in `ior`.
 */
export function rimOpacityForIor(ior: number): number {
  const r0 = fresnelSchlick(1, ior);
  return Math.min(Math.max(r0 * 6, 0.12), 0.85);
}
