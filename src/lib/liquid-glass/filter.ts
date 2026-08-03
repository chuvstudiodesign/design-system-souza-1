/**
 * Owns the SVG filters that perform the refraction.
 *
 * Filters are a global, document-level resource — much like a stylesheet — so
 * they are managed imperatively in a single hidden `<svg>` rather than rendered
 * per instance. Identical geometry and optics produce an identical key, so a
 * grid of matching panels shares one filter node between them, and refcounting
 * removes it once the last user unmounts.
 */

import type { DisplacementMap } from "./displacement";

const SVG_NS = "http://www.w3.org/2000/svg";
const HOST_ID = "liquid-glass-defs";

export interface FilterSpec {
  map: DisplacementMap;
  /**
   * Displacement scale in CSS pixels, already multiplied by the material's
   * refraction strength. Kept separate from the map so that changing strength
   * only rewrites an attribute — the bitmap is normalized and stays cached.
   */
  scale: number;
  /**
   * Chromatic aberration, 0–1.
   *
   * Dispersion in real glass comes from the index of refraction varying with
   * wavelength: blue bends hardest, red least. That is reproduced by running
   * the same displacement three times at spread scales and keeping one colour
   * channel from each pass.
   */
  dispersion: number;
}

interface Entry {
  count: number;
  node: SVGFilterElement;
}

const entries = new Map<string, Entry>();
let host: SVGSVGElement | null = null;

function ensureHost(): SVGSVGElement {
  if (host?.isConnected) return host;

  const existing = document.getElementById(HOST_ID);
  if (existing instanceof SVGSVGElement) {
    host = existing;
    return host;
  }

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("id", HOST_ID);
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  // Kept in the layout at zero size rather than `display: none`, because a
  // fully hidden subtree lets some engines skip resolving filter references.
  svg.setAttribute(
    "style",
    "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none"
  );

  document.body.appendChild(svg);
  host = svg;
  return svg;
}

/**
 * The element id a spec maps to.
 *
 * Pure and stable, so a component can reference the filter during render while
 * the node itself is created by an effect after commit.
 */
export function filterIdForSpec(spec: FilterSpec): string {
  return `lg-${specKey(spec)}`;
}

function specKey(spec: FilterSpec): string {
  const { map, scale, dispersion } = spec;
  return [
    map.width,
    map.height,
    scale.toFixed(2),
    dispersion.toFixed(3),
    // The bitmap itself is the remaining degree of freedom. Hashing it keeps
    // the key short while staying sensitive to a changed profile or thickness.
    hash(map.href),
  ].join("-");
}

/** FNV-1a. Fast, allocation-free, and good enough to key a cache. */
function hash(value: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

function createPrimitive<K extends keyof SVGElementTagNameMap>(
  name: K,
  attributes: Record<string, string | number>
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attributes)) {
    node.setAttribute(key, String(value));
  }
  return node;
}

function buildFilterNode(id: string, spec: FilterSpec): SVGFilterElement {
  const { map, scale, dispersion } = spec;

  const filter = document.createElementNS(SVG_NS, "filter");
  filter.setAttribute("id", id);
  // Pin the filter region to the element's border box. The default region is
  // inflated by 10% on every side, which would slide the map out of alignment
  // with the shape it was generated for.
  filter.setAttribute("filterUnits", "objectBoundingBox");
  filter.setAttribute("x", "0");
  filter.setAttribute("y", "0");
  filter.setAttribute("width", "1");
  filter.setAttribute("height", "1");
  filter.setAttribute("primitiveUnits", "userSpaceOnUse");
  // Without this the pipeline runs in linear RGB and the backdrop comes back
  // visibly washed out.
  filter.setAttribute("color-interpolation-filters", "sRGB");

  const image = createPrimitive("feImage", {
    x: 0,
    y: 0,
    width: map.width,
    height: map.height,
    preserveAspectRatio: "none",
    result: "map",
  });
  image.setAttribute("href", map.href);
  // Older engines still resolve the namespaced form first.
  image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", map.href);
  filter.appendChild(image);

  if (dispersion <= 0.001) {
    filter.appendChild(
      createPrimitive("feDisplacementMap", {
        in: "SourceGraphic",
        in2: "map",
        scale: scale.toFixed(3),
        xChannelSelector: "R",
        yChannelSelector: "G",
      })
    );
    return filter;
  }

  // Red bends least, blue most. The spread is centred on the nominal scale so
  // that raising dispersion does not also change the overall refraction.
  const spread = dispersion * 0.5;
  const channels = [
    { name: "R", scale: scale * (1 - spread), matrix: RED_ONLY },
    { name: "G", scale, matrix: GREEN_ONLY },
    { name: "B", scale: scale * (1 + spread), matrix: BLUE_ONLY },
  ] as const;

  for (const channel of channels) {
    filter.appendChild(
      createPrimitive("feDisplacementMap", {
        in: "SourceGraphic",
        in2: "map",
        scale: channel.scale.toFixed(3),
        xChannelSelector: "R",
        yChannelSelector: "G",
        result: `disp${channel.name}`,
      })
    );
    filter.appendChild(
      createPrimitive("feColorMatrix", {
        in: `disp${channel.name}`,
        type: "matrix",
        values: channel.matrix,
        result: `only${channel.name}`,
      })
    );
  }

  // Recombination is a screen blend rather than an arithmetic add.
  //
  // The obvious approach — zero the alpha on two of the passes and add all
  // three — silently discards them: `feColorMatrix` works on unpremultiplied
  // colour, so an isolated channel carried at alpha 0 gets multiplied straight
  // back to black the moment the pipeline premultiplies again. Every pass
  // therefore keeps its alpha, and screen recombines them. For channels that
  // are disjoint by construction, `1 − (1 − a)(1 − b)` is exactly `a + b`, so
  // this is lossless rather than merely close.
  filter.appendChild(
    createPrimitive("feBlend", {
      in: "onlyR",
      in2: "onlyG",
      mode: "screen",
      result: "redGreen",
    })
  );
  filter.appendChild(
    createPrimitive("feBlend", {
      in: "redGreen",
      in2: "onlyB",
      mode: "screen",
    })
  );

  return filter;
}

const RED_ONLY = "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0";
const GREEN_ONLY = "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0";
const BLUE_ONLY = "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0";

/**
 * Registers a filter and returns its element id.
 *
 * Every call must be paired with `releaseFilter`, which is what keeps the
 * shared `<svg>` from accumulating dead definitions.
 */
export function retainFilter(spec: FilterSpec): string {
  const id = filterIdForSpec(spec);
  const existing = entries.get(id);

  if (existing) {
    existing.count += 1;
    return id;
  }

  const node = buildFilterNode(id, spec);
  ensureHost().appendChild(node);
  entries.set(id, { count: 1, node });
  return id;
}

export function releaseFilter(id: string): void {
  const entry = entries.get(id);
  if (!entry) return;

  entry.count -= 1;
  if (entry.count > 0) return;

  entry.node.remove();
  entries.delete(id);
}
