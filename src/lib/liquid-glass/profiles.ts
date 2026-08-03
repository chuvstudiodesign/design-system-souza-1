/**
 * Thickness profiles — the cross-section of the glass bevel.
 *
 * Every profile is expressed as a height function `h(t)` over the normalized
 * penetration `t ∈ [0, 1]`, where `t = 0` sits exactly on the outer edge and
 * `t = 1` reaches the flat plateau at the centre of the element. `h` returns a
 * normalized height in `[0, 1]` that later gets multiplied by the material's
 * apparent thickness in pixels.
 *
 * The derivative `dh` is what actually drives the optics: the slope of the
 * surface at a point is what determines the angle of incidence, and therefore
 * how far Snell's law bends the ray. It is provided analytically rather than by
 * finite differences because the interesting profiles have a vertical tangent
 * at the edge, exactly where a numeric derivative falls apart.
 */

export type ThicknessProfile = "squircle" | "convex" | "lip" | "concave";

export interface ProfileFunctions {
  /** Normalized surface height at penetration `t`. */
  h(t: number): number;
  /** dh/dt at penetration `t`, clamped to a finite slope. */
  dh(t: number): number;
}

/**
 * Slopes go to infinity at the rim of a convex profile. Capping at 64 keeps the
 * math finite while still representing an 89.1° angle of incidence — visually
 * indistinguishable from vertical, and it keeps `Infinity` out of the LUT.
 */
const MAX_SLOPE = 64;

function clampSlope(value: number): number {
  if (!Number.isFinite(value)) return MAX_SLOPE;
  return Math.min(Math.max(value, -MAX_SLOPE), MAX_SLOPE);
}

/**
 * Quartic superellipse — a squircle in cross-section. This is the profile that
 * reads closest to Apple's material: it reaches the plateau more gently than a
 * circle, so the refraction gradient is smoother and the rim distortion spreads
 * over a wider band instead of collapsing into a hard ring.
 */
const squircle: ProfileFunctions = {
  h(t) {
    const u = 1 - t;
    return Math.pow(Math.max(1 - u * u * u * u, 0), 0.25);
  },
  dh(t) {
    const u = 1 - t;
    const base = 1 - u * u * u * u;
    if (base <= 1e-9) return MAX_SLOPE;
    return clampSlope((u * u * u) / Math.pow(base, 0.75));
  },
};

/** Spherical dome. Sharper interior transition than the squircle. */
const convex: ProfileFunctions = {
  h(t) {
    const u = 1 - t;
    return Math.sqrt(Math.max(1 - u * u, 0));
  },
  dh(t) {
    const u = 1 - t;
    const base = 1 - u * u;
    if (base <= 1e-9) return MAX_SLOPE;
    return clampSlope(u / Math.sqrt(base));
  },
};

/** Dished surface. Diverges rays instead of converging them. */
const concave: ProfileFunctions = {
  h(t) {
    return 1 - Math.sqrt(Math.max(1 - t * t, 0));
  },
  dh(t) {
    const base = 1 - t * t;
    if (base <= 1e-9) return MAX_SLOPE;
    return clampSlope(t / Math.sqrt(base));
  },
};

/**
 * Raised rim with a shallow dip behind it, like the lip of a poured glass.
 * The rim reuses the squircle so the edge keeps its vertical tangent, then a
 * half-sine subtracts a dip that settles back to the plateau at `t = 1`.
 */
const LIP_RIM = 0.4;
const LIP_DIP = 0.12;

const lip: ProfileFunctions = {
  h(t) {
    const rim = squircle.h(Math.min(t / LIP_RIM, 1));
    if (t <= LIP_RIM) return rim;
    const phase = (Math.PI * (t - LIP_RIM)) / (1 - LIP_RIM);
    return rim - LIP_DIP * Math.sin(phase);
  },
  dh(t) {
    const rimSlope = t < LIP_RIM ? squircle.dh(t / LIP_RIM) / LIP_RIM : 0;
    if (t <= LIP_RIM) return clampSlope(rimSlope);
    const phase = (Math.PI * (t - LIP_RIM)) / (1 - LIP_RIM);
    const dipSlope = (Math.PI / (1 - LIP_RIM)) * Math.cos(phase);
    return clampSlope(rimSlope - LIP_DIP * dipSlope);
  },
};

export const THICKNESS_PROFILES: Record<ThicknessProfile, ProfileFunctions> = {
  squircle,
  convex,
  lip,
  concave,
};
