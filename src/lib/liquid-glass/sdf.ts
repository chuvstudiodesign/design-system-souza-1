/**
 * Signed distance field for a rounded rectangle, with its analytic gradient.
 *
 * The distance tells the map generator how deep into the bevel a pixel sits;
 * the gradient tells it which way the surface faces, and therefore the
 * direction the refracted ray travels. Both come out of the same handful of
 * operations, which is what keeps per-pixel generation cheap enough to run on
 * the main thread.
 */

export interface SdfSample {
  /** Signed distance to the outline. Negative inside, positive outside. */
  distance: number;
  /** Outward unit normal, x component. */
  nx: number;
  /** Outward unit normal, y component. */
  ny: number;
}

export function createSdfSample(): SdfSample {
  return { distance: 0, nx: 0, ny: 0 };
}

/**
 * Samples the field at `(lx, ly)`, expressed relative to the centre of the box.
 *
 * Writes into `out` rather than returning an object — this runs once per pixel
 * and allocating here would dominate the cost of the whole generator.
 */
export function sampleRoundedRect(
  lx: number,
  ly: number,
  halfWidth: number,
  halfHeight: number,
  radius: number,
  out: SdfSample
): void {
  const r = Math.min(radius, halfWidth, halfHeight);

  const qx = Math.abs(lx) - halfWidth + r;
  const qy = Math.abs(ly) - halfHeight + r;

  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  const outer = Math.hypot(ox, oy);

  out.distance = Math.min(Math.max(qx, qy), 0) + outer - r;

  const signX = lx < 0 ? -1 : 1;
  const signY = ly < 0 ? -1 : 1;

  if (qx > 0 && qy > 0) {
    // Inside a corner arc: the normal points along the radius.
    const inv = outer > 1e-6 ? 1 / outer : 0;
    out.nx = ox * inv * signX;
    out.ny = oy * inv * signY;
  } else if (qx > qy) {
    // Nearest edge is vertical.
    out.nx = signX;
    out.ny = 0;
  } else {
    // Nearest edge is horizontal.
    out.nx = 0;
    out.ny = signY;
  }
}
