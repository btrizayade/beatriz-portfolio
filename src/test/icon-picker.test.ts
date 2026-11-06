import { describe, expect, it } from 'vitest';
import { createIconPicker } from '@/lib/icon-picker';

describe('icon picker', () => {
  it('never repeats within a group', () => {
    const p = createIconPicker(15);
    for (let i = 0; i < 500; i++) {
      const g = p.pick(3);
      expect(new Set(g).size).toBe(3);
    }
  });

  it('never repeats an icon within the last 5 picks (singles and groups mixed)', () => {
    const p = createIconPicker(15);
    const seq: number[] = [];
    for (let i = 0; i < 1000; i++) seq.push(...p.pick(i % 3 === 0 ? 1 : 2 + (i % 2)));
    for (let i = 1; i < seq.length; i++) {
      expect(seq.slice(Math.max(0, i - 5), i)).not.toContain(seq[i]);
    }
  });

  it('distributes evenly across all 15 icons', () => {
    const p = createIconPicker(15);
    const counts = Array(15).fill(0);
    for (let i = 0; i < 1500; i++) counts[p.pick(1)[0]!]++;
    expect(Math.min(...counts)).toBeGreaterThan(80);
    expect(Math.max(...counts)).toBeLessThan(120);
  });

  it('still works with very few icons', () => {
    const p = createIconPicker(3);
    for (let i = 0; i < 50; i++) expect(new Set(p.pick(3)).size).toBe(3);
  });
});
