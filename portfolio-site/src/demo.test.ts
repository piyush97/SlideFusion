import { describe, expect, it } from 'vitest';
import { demoSlides, fallbackState, getNextSlide } from './demo';

describe('static showcase fixtures', () => {
  it('keeps a deterministic 3–5 slide deck and wraps next-slide navigation', () => {
    expect(demoSlides).toHaveLength(4);
    expect(demoSlides.map((slide) => slide.id)).toEqual(['signal', 'system', 'impact', 'close']);
    expect(getNextSlide(demoSlides.length - 1)).toBe(0);
  });

  it('exposes explicit unavailable integration fallback copy', () => {
    expect(fallbackState.status).toBe('Local demo only');
    expect(fallbackState.message).toMatch(/unavailable/i);
    expect(fallbackState.actions).toContain('Export is unavailable in this static showcase.');
  });
});
