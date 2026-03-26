export const colours = {
  // Primary
  ember: '#C4623A',
  emberDim: '#A84E2A',
  emberLight: '#F5E8E0',
  peach: '#E8A87C',
  peachLight: '#FDF0E8',

  // Navy / Dark Surfaces
  navy: '#1B2B4B',
  navy2: '#162340',
  navy3: '#111820',
  cardDark: '#1C2634',

  // Warm Cream Backgrounds
  cream: '#F5F0E8',
  cream2: '#E8E0D0',
  warmWhite: '#FDFAF5',

  // Text
  ink: '#2A2520',
  muted: '#8A8070',

  // Borders
  border: '#DDD8CC',

  // Functional
  sage: '#2A7A56',
  sageLight: '#E0F0E8',
  sky: '#2E6FAA',
  skyLight: '#E0EEF8',

  // Source Badge
  youtube: '#E8593C',
  reddit: '#FF4500',
  blog: '#2A7A56',
  maps: '#2E6FAA',

  white: '#FFFFFF',
} as const;

/** Text colour helpers for dark (navy) surfaces */
export const darkText = {
  primary: '#FFFFFF',
  body: 'rgba(255,255,255,0.55)',
  meta: 'rgba(255,255,255,0.4)',
  stat: 'rgba(255,255,255,0.35)',
  tagline: 'rgba(255,255,255,0.5)',
  dotInactive: 'rgba(255,255,255,0.2)',
  skipLink: 'rgba(255,255,255,0.35)',
} as const;

/** Dark-surface overlay colours */
export const darkOverlay = {
  overlay8: 'rgba(255,255,255,0.08)',
  overlay13: 'rgba(255,255,255,0.13)',
  overlay22: 'rgba(255,255,255,0.22)',
} as const;

/** Active trip card status badge */
export const statusBadge = {
  bg: 'rgba(42,122,86,0.25)',
  text: '#5DD4A8',
} as const;
