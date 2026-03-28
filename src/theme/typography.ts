import { TextStyle } from 'react-native';

/**
 * Semantic font family tokens.
 *
 * Three families, each with role-named weights:
 *   display / displayBold  — Playfair Display  — headings, card titles, hero text
 *   body / bodyLight / label / labelStrong — DM Sans — body copy, UI labels, buttons
 *   mono / monoMedium      — DM Mono           — numbers, time, progress, badges
 */
export const fontFamily = {
  // Playfair Display — display / headings
  displayBold: 'PlayfairDisplay_800ExtraBold', // hero titles, H1, sign-in banner
  display: 'PlayfairDisplay_700Bold', // card titles, section headings, greeting

  // DM Sans — body / UI
  body: 'DMSans_400Regular', // body copy, placeholders, meta text
  bodyLight: 'DMSans_300Light', // light descriptive text (e.g. insight body)
  label: 'DMSans_500Medium', // UI labels, chips, inactive tab labels
  labelStrong: 'DMSans_600SemiBold', // buttons, active tab labels, section labels

  // DM Mono — numbers / time / progress
  mono: 'DMMono_400Regular', // durations, source badges, postcard meta
  monoMedium: 'DMMono_500Medium', // time labels, progress %, ticker
} as const;

/** Full type scale — values match design-tokens.md exactly */
export const typography: Record<string, TextStyle> = {
  // ── Playfair Display ──────────────────────────────────────────────
  displayXL: {
    fontFamily: fontFamily.displayBold,
    fontSize: 30,
    lineHeight: 34,
  },
  displayL: {
    fontFamily: fontFamily.displayBold,
    fontSize: 26,
    lineHeight: 30,
  },
  displayM: {
    fontFamily: fontFamily.display,
    fontSize: 22,
    lineHeight: 26,
  },
  displayS: {
    fontFamily: fontFamily.display,
    fontSize: 18,
    lineHeight: 22,
  },
  cardTitle: {
    fontFamily: fontFamily.display,
    fontSize: 17,
    lineHeight: 22,
  },
  cardTitleS: {
    fontFamily: fontFamily.display,
    fontSize: 14,
    lineHeight: 18,
  },

  // ── DM Sans — body ────────────────────────────────────────────────
  bodyL: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    lineHeight: 24,
  },
  bodyM: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    lineHeight: 22,
  },
  bodyS: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    lineHeight: 20,
  },
  bodyXS: {
    fontFamily: fontFamily.body,
    fontSize: 12,
    lineHeight: 18,
  },

  // ── DM Sans — labels ──────────────────────────────────────────────
  labelM: {
    fontFamily: fontFamily.label,
    fontSize: 13,
    lineHeight: 18,
  },
  labelS: {
    fontFamily: fontFamily.label,
    fontSize: 12,
    lineHeight: 16,
  },
  labelXS: {
    fontFamily: fontFamily.label,
    fontSize: 10,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.8, // 0.08em @ 10px
  },

  // ── DM Mono ───────────────────────────────────────────────────────
  monoM: {
    fontFamily: fontFamily.monoMedium,
    fontSize: 13,
    lineHeight: 18,
  },
  monoS: {
    fontFamily: fontFamily.mono,
    fontSize: 11,
    lineHeight: 16,
  },
  monoXS: {
    fontFamily: fontFamily.mono,
    fontSize: 10,
    lineHeight: 14,
  },
} as const;
