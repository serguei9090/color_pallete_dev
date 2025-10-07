import { describe, expect, it } from 'vitest';
import { PRESET_THEMES, ROLE_ORDER } from './themes';

describe('PRESET_THEMES', () => {
  it('includes light and dark variants with consistent role coverage', () => {
    expect(PRESET_THEMES.length).toBeGreaterThan(0);
    for (const theme of PRESET_THEMES) {
      for (const mode of ['light', 'dark'] as const) {
        const colors = theme.variants[mode].colors;
        expect(colors).toHaveLength(ROLE_ORDER.length);
        const roles = colors.map((color) => color.role);
        expect(new Set(roles).size).toBe(ROLE_ORDER.length);
      }
    }
  });
});
