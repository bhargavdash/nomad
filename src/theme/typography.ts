import { TextStyle } from 'react-native';

/** Font family constants — must match expo-google-fonts loaded names */
export const fontFamily = {
  playfair700: 'PlayfairDisplay_700Bold',
  playfair800: 'PlayfairDisplay_800ExtraBold',
  dmSans300: 'DMSans_300Light',
  dmSans400: 'DMSans_400Regular',
  dmSans500: 'DMSans_500Medium',
  dmSans600: 'DMSans_600SemiBold',
  dmMono400: 'DMMono_400Regular',
  dmMono500: 'DMMono_500Medium',
} as const;

/** All font assets to load via useFonts */
export { fontFamily as fonts };

/** Full type scale from design-tokens.md */
export const typography: Record<string, TextStyle> = {
  displayXL: {
    fontFamily: fontFamily.playfair800,
    fontSize: 30,
    lineHeight: 34,
  },
  displayL: {
    fontFamily: fontFamily.playfair800,
    fontSize: 26,
    lineHeight: 30,
  },
  displayM: {
    fontFamily: fontFamily.playfair700,
    fontSize: 22,
    lineHeight: 26,
  },
  displayS: {
    fontFamily: fontFamily.playfair700,
    fontSize: 18,
    lineHeight: 22,
  },
  cardTitle: {
    fontFamily: fontFamily.playfair700,
    fontSize: 17,
    lineHeight: 22,
  },
  cardTitleS: {
    fontFamily: fontFamily.playfair700,
    fontSize: 14,
    lineHeight: 18,
  },
  bodyL: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 15,
    lineHeight: 24,
  },
  bodyM: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 14,
    lineHeight: 22,
  },
  bodyS: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 13,
    lineHeight: 20,
  },
  bodyXS: {
    fontFamily: fontFamily.dmSans400,
    fontSize: 12,
    lineHeight: 18,
  },
  labelM: {
    fontFamily: fontFamily.dmSans500,
    fontSize: 13,
    lineHeight: 18,
  },
  labelS: {
    fontFamily: fontFamily.dmSans500,
    fontSize: 12,
    lineHeight: 16,
  },
  labelXS: {
    fontFamily: fontFamily.dmSans500,
    fontSize: 10,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  monoM: {
    fontFamily: fontFamily.dmMono500,
    fontSize: 13,
    lineHeight: 18,
  },
  monoS: {
    fontFamily: fontFamily.dmMono400,
    fontSize: 11,
    lineHeight: 16,
  },
  monoXS: {
    fontFamily: fontFamily.dmMono400,
    fontSize: 10,
    lineHeight: 14,
  },
} as const;
