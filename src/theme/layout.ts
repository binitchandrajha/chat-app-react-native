import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;
// Use the smaller dimension for width calculations to support safe landscape layout if needed
const scaleWidth = SCREEN_WIDTH / DESIGN_WIDTH;
const scaleHeight = SCREEN_HEIGHT / DESIGN_HEIGHT;

export const normalize = (size: number, factor = 0.5): number => {
  // factor=0.5 means only apply 50% of the scaling difference
  const newSize = size + (size * scaleWidth - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const spacing = {
  xxs: normalize(2),
  xs: normalize(4),
  xsPlus: normalize(6),
  sm: normalize(8),
  smPlus: normalize(10),
  mdSm: normalize(12),
  mdSmPlus: normalize(14),
  md: normalize(16),
  mdXs: normalize(18),
  mdPlus: normalize(20),
  lgSm: normalize(22),
  lg: normalize(24),
  xl: normalize(32),
  xlSm: normalize(36),
  xlPlus: normalize(40),
  '2xl': normalize(48),
  '2xlSm': normalize(52),
  '2xlMd': normalize(56),
  '3xl': normalize(64),
  '4xl': normalize(96),
  '5xl': normalize(128),
} as const;

export const borderRadius = {
  none: normalize(0),
  sm: normalize(4),
  md: normalize(8),
  lg: normalize(12),
  xl: normalize(16),
  mdPlus: normalize(20),
  xlPlus: normalize(40),
  '2xl': normalize(24),
  '3xl': normalize(32),
  full: normalize(9999),
} as const;

export const shadows = {
  none: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

export const dimensions = {
  // Screen dimensions (will be updated dynamically)
  screen: {
    width: 0,
    height: 0,
  },

  // Component dimensions
  header: {
    height: 56,
  },

  tabBar: {
    height: 64,
  },

  button: {
    height: {
      sm: 32,
      md: 44,
      lg: 56,
    },
  },

  input: {
    height: 44,
  },

  avatar: {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  },

  icon: {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
} as const;

export const Device = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmallDevice: SCREEN_WIDTH < 375,
};

export const calculateRelativeWidth = (width: number): number => {
  return PixelRatio.roundToNearestPixel(width * scaleWidth);
};

export const calculateRelativeHeight = (height: number): number => {
  return PixelRatio.roundToNearestPixel(height * scaleHeight);
};

export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
export type Shadow = keyof typeof shadows;
