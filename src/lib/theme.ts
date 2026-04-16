// Theme configuration - centralized theme values

export const THEMES = {
  light: 'light',
  dark: 'dark',
} as const;

export type Theme = typeof THEMES[keyof typeof THEMES];

// Color palette
export const COLORS = {
  // Accents - cyberpunk inspired
  accent: {
    pink: '#ec4899',
    cyan: '#06b6d4',
    purple: '#a855f7',
    green: '#22c55e',
    yellow: '#eab308',
    orange: '#f97316',
    red: '#ef4444',
    blue: '#3b82f6',
    violet: '#8b5cf6',
  },
  
  // Semantic
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
  info: '#06b6d4',
  
  // Neutral (dynamic via CSS)
  bg: 'var(--bg-color)',
  bgSecondary: 'var(--bg-secondary)',
  card: 'var(--card-bg)',
  text: 'var(--text-color)',
  border: 'var(--border-color)',
} as const;

// Spacing scale
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

// Typography
export const TYPOGRAPHY = {
  fonts: {
    sans: "'Inter', sans-serif",
    display: "'Outfit', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },
} as const;

// Border styles
export const BORDERS = {
  width: '2px',
  widthThick: '4px',
  radius: '0',
  radiusSm: '0.125rem',
  radiusMd: '0.25rem',
  radiusLg: '0.5rem',
} as const;

// Shadows
export const SHADOWS = {
  brutal: '4px 4px 0 var(--border-color)',
  brutalHover: '2px 2px 0 var(--border-color)',
  brutalLg: '8px 8px 0 var(--border-color)',
} as const;

// Z-index scale
export const Z_INDEX = {
  base: 0,
  dropdown: 40,
  sticky: 50,
  modal: 100,
  tooltip: 150,
  toast: 200,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Animation thresholds for scroll
export const SCROLL_THRESHOLDS = {
  showHeader: 10,
  showToTop: 100,
  fadeIn: 150,
} as const;

// Export all theme config
export const THEME = {
  THEMES,
  COLORS,
  SPACING,
  TYPOGRAPHY,
  BORDERS,
  SHADOWS,
  Z_INDEX,
  BREAKPOINTS,
  SCROLL_THRESHOLDS,
} as const;

// Default export for convenience
export default THEME;