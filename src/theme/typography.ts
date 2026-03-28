import { TextStyle } from 'react-native';
import { fonts } from './font';
import { normalize } from './layout';

export const fontSizes = {
  xxxs: normalize(8),
  xxs: normalize(10),
  xs: normalize(12),
  sm: normalize(14),
  base: normalize(16),
  lg: normalize(18),
  xl: normalize(20),
  mdXl: normalize(22),
  '2xl': normalize(24),
  '3xl': normalize(30),
  '4xl': normalize(36),
  '5xl': normalize(48),
  '6xl': normalize(60),
} as const;

export const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

export const lineHeights = {
  none: 1,
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

/* -----------------------------------
   Helper to reduce duplication
------------------------------------ */
const createTextStyle = (
  fontFamily: string,
  fontSize: number,
  lineHeightMultiplier: number,
): TextStyle => ({
  fontFamily,
  fontSize,
  lineHeight: fontSize * lineHeightMultiplier,
});

/* -----------------------------------
   Typography Scale
------------------------------------ */
export const typography = {
  /* =====================
      H1 – 36
   ====================== */
  h1Regular: createTextStyle(
    fonts.regular,
    fontSizes['4xl'],
    lineHeights.tight,
  ),
  h1Medium: createTextStyle(fonts.medium, fontSizes['4xl'], lineHeights.tight),
  h1SemiBold: createTextStyle(
    fonts.semibold,
    fontSizes['4xl'],
    lineHeights.tight,
  ),
  h1Bold: createTextStyle(fonts.bold, fontSizes['4xl'], lineHeights.tight),

  /* =====================
      H2 – 30
   ====================== */
  h2Regular: createTextStyle(
    fonts.regular,
    fontSizes['3xl'],
    lineHeights.tight,
  ),
  h2Medium: createTextStyle(fonts.medium, fontSizes['3xl'], lineHeights.tight),
  h2SemiBold: createTextStyle(
    fonts.semibold,
    fontSizes['3xl'],
    lineHeights.tight,
  ),
  h2Bold: createTextStyle(fonts.bold, fontSizes['3xl'], lineHeights.tight),

  /* =====================
      H3 – 24
   ====================== */
  h3Regular: createTextStyle(fonts.regular, fontSizes['2xl'], lineHeights.snug),
  h3Medium: createTextStyle(fonts.medium, fontSizes['2xl'], lineHeights.snug),
  h3SemiBold: createTextStyle(
    fonts.semibold,
    fontSizes['2xl'],
    lineHeights.snug,
  ),
  h3Bold: createTextStyle(fonts.bold, fontSizes['2xl'], lineHeights.snug),

  /* =====================
      MDH4 – 22
   ====================== */
  mdH4Regular: createTextStyle(fonts.regular, fontSizes.xl, lineHeights.snug),
  mdH4Medium: createTextStyle(fonts.medium, fontSizes.xl, lineHeights.snug),
  mdH4SemiBold: createTextStyle(fonts.semibold, fontSizes.xl, lineHeights.snug),
  mdH4Bold: createTextStyle(fonts.bold, fontSizes.xl, lineHeights.snug),

  /* =====================
      H4 – 20
   ====================== */
  h4Regular: createTextStyle(fonts.regular, fontSizes.xl, lineHeights.snug),
  h4Medium: createTextStyle(fonts.medium, fontSizes.xl, lineHeights.snug),
  h4SemiBold: createTextStyle(fonts.semibold, fontSizes.xl, lineHeights.snug),
  h4Bold: createTextStyle(fonts.bold, fontSizes.xl, lineHeights.snug),

  /* =====================
      H5 – 18
   ====================== */
  h5Regular: createTextStyle(fonts.regular, fontSizes.lg, lineHeights.normal),
  h5Medium: createTextStyle(fonts.medium, fontSizes.lg, lineHeights.normal),
  h5SemiBold: createTextStyle(fonts.semibold, fontSizes.lg, lineHeights.normal),
  h5Bold: createTextStyle(fonts.bold, fontSizes.lg, lineHeights.normal),

  /* =====================
      Body – 16
   ====================== */
  bodyRegular: createTextStyle(
    fonts.regular,
    fontSizes.base,
    lineHeights.normal,
  ),
  bodyMedium: createTextStyle(fonts.medium, fontSizes.base, lineHeights.normal),
  bodySemiBold: createTextStyle(
    fonts.semibold,
    fontSizes.base,
    lineHeights.normal,
  ),
  bodyBold: createTextStyle(fonts.bold, fontSizes.base, lineHeights.normal),

  /* =====================
      Small / Caption – 14 / 12
   ====================== */
  bodySmallRegular: createTextStyle(
    fonts.regular,
    fontSizes.sm,
    lineHeights.normal,
  ),
  bodySmallMedium: createTextStyle(
    fonts.medium,
    fontSizes.sm,
    lineHeights.normal,
  ),
  bodySmallSemiBold: createTextStyle(
    fonts.semibold,
    fontSizes.sm,
    lineHeights.normal,
  ),
  bodySmallBold: createTextStyle(fonts.bold, fontSizes.sm, lineHeights.normal),
  captionRegular: createTextStyle(
    fonts.regular,
    fontSizes.xs,
    lineHeights.normal,
  ),
  captionMedium: createTextStyle(
    fonts.medium,
    fontSizes.xs,
    lineHeights.normal,
  ),
  captionSemiBold: createTextStyle(
    fonts.semibold,
    fontSizes.xs,
    lineHeights.normal,
  ),

  /* =====================
      Extra Small / Micro – 10 / 8
   ====================== */
  captionSmallRegular: createTextStyle(
    fonts.regular,
    fontSizes.xxs,
    lineHeights.normal,
  ),
  captionSmallMedium: createTextStyle(
    fonts.medium,
    fontSizes.xxs,
    lineHeights.normal,
  ),
  captionSmallBold: createTextStyle(
    fonts.bold,
    fontSizes.xxs,
    lineHeights.normal,
  ),

  microRegular: createTextStyle(
    fonts.regular,
    fontSizes.xxxs,
    lineHeights.normal,
  ),
  microMedium: createTextStyle(
    fonts.medium,
    fontSizes.xxxs,
    lineHeights.normal,
  ),
  microBold: createTextStyle(fonts.bold, fontSizes.xxxs, lineHeights.normal),
};

export type Typography = typeof typography;
export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type LineHeight = keyof typeof lineHeights;
