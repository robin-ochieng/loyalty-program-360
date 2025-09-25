export const theme = {
  colors: {
    kbBlue: '#0137A6',
    kbPurple: '#6B4DE6',
    kbGray900: '#0B0B0F',
  },
  radius: {
    sm: 6,
    md: 8,
    lg: 10,
  },
} as const;

export type Theme = typeof theme;
