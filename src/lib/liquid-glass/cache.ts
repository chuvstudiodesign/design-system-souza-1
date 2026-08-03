/**
 * Bounded LRU for generated displacement maps.
 *
 * Maps are keyed by geometry and optics, with dimensions snapped upstream, so a
 * drag or a resize sweeps through a small set of repeated keys rather than
 * generating a fresh bitmap per frame. The cap keeps the retained data URLs
 * bounded — each map is a PNG of at most 512² pixels.
 */

export class LruCache<T> {
  private readonly entries = new Map<string, T>();

  constructor(private readonly capacity: number) {}

  get(key: string): T | undefined {
    const value = this.entries.get(key);
    if (value === undefined) return undefined;

    // Reinsert to mark as most recently used.
    this.entries.delete(key);
    this.entries.set(key, value);
    return value;
  }

  set(key: string, value: T): void {
    if (this.entries.has(key)) this.entries.delete(key);
    this.entries.set(key, value);

    while (this.entries.size > this.capacity) {
      const oldest = this.entries.keys().next().value;
      if (oldest === undefined) break;
      this.entries.delete(oldest);
    }
  }
}
