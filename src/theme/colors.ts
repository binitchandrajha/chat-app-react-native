export type ThemeColors = {
  background: typeof palette.white | typeof palette.gray900;
  surface: typeof palette.white | typeof palette.gray800;
  text: typeof palette.gray900 | typeof palette.gray50;
  textSecondary: typeof palette.gray600 | typeof palette.gray400;
  primary: typeof palette.primary;
  border: typeof palette.gray200 | typeof palette.gray700;
  error: typeof palette.error;
  success: typeof palette.success;
  warning: typeof palette.warning;
  primaryButton:
    | typeof palette.primaryButtonLight
    | typeof palette.primaryButtonDark;
};

export const palette = {
  // Brand colors
  primary: '#007AFF',
  secondary: '#5856D6',

  // Status colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',

  // Grayscale
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  //light mode colors
  primaryButtonLight: '#002DE3',

  //dark mode colors
  primaryButtonDark: '#375FFF',
} as const;

export const lightColors: ThemeColors = {
  background: palette.white,
  surface: palette.white,
  text: palette.gray900,
  textSecondary: palette.gray600,
  primary: palette.primary,
  border: palette.gray200,
  error: palette.error,
  success: palette.success,
  warning: palette.warning,
  primaryButton: palette.primaryButtonLight,
};

export const darkColors: ThemeColors = {
  background: palette.gray900,
  surface: palette.gray800,
  text: palette.gray50,
  textSecondary: palette.gray400,
  primary: palette.primary,
  border: palette.gray700,
  error: palette.error,
  success: palette.success,
  warning: palette.warning,
  primaryButton: palette.primaryButtonDark,
};
