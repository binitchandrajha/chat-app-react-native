export const fonts = {
  thin: 'Mulish-ExtraLight',
  extralight: 'Mulish-ExtraLight',
  light: 'Mulish-Light',
  regular: 'Mulish-Regular',
  medium: 'Mulish-Medium',
  semibold: 'Mulish-SemiBold',
  bold: 'Mulish-Bold',
  extrabold: 'Mulish-ExtraBold',
  black: 'Mulish-Black',
} as const;

export type FontType = keyof typeof fonts;
