/**
 * Shuffle-bag picker with a recent-history window.
 * - Draws without replacement from a shuffled bag (balanced distribution).
 * - Skips indices in the recent history; relaxes oldest history first if needed.
 * - Never repeats an index within one group.
 */
export function createIconPicker(count: number, historySize = Math.min(5, Math.max(0, count - 3)), random = Math.random) {
  let bag: number[] = [];
  const history: number[] = [];

  const refill = () => {
    bag = Array.from({ length: count }, (_, i) => i);
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [bag[i], bag[j]] = [bag[j]!, bag[i]!];
    }
  };

  const pickOne = (exclude: Set<number>): number => {
    // try with full history, then relax oldest entries gradually
    for (let relax = 0; relax <= history.length; relax++) {
      const blocked = new Set([...exclude, ...history.slice(relax)]);
      if (blocked.size >= count) continue;
      for (let pass = 0; pass < 2; pass++) {
        const idx = bag.findIndex((k) => !blocked.has(k));
        if (idx >= 0) return bag.splice(idx, 1)[0]!;
        refill();
      }
    }
    return [...Array(count).keys()].find((k) => !exclude.has(k)) ?? 0;
  };

  return {
    /** Picks `n` distinct indices, honoring history. */
    pick(n = 1): number[] {
      const group = new Set<number>();
      const take = Math.min(n, count);
      for (let i = 0; i < take; i++) {
        const k = pickOne(group);
        group.add(k);
        history.push(k);
        while (history.length > historySize) history.shift();
      }
      return [...group];
    },
  };
}
