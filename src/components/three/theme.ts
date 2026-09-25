/**
 * Hex mirrors of the CSS custom properties in src/styles/index.css.
 * Three.js materials need real color values, not CSS var() — kept in one
 * place so the 3D scenes and the flat UI never drift out of palette.
 */
export const THEME_3D = {
  bg: '#14130f',
  bgRaised: '#1b1a15',
  card: '#1e1c17',
  ink: '#f2ede1',
  inkMuted: '#a39c8c',
  line: '#33301f',
  accent: '#ff6a1a',
  done: '#7cffb2',
} as const
