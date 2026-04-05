import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Spacing, spacing, normalize } from '../../theme/layout';

interface SpacerProps {
  /**
   * Explicit height. Can be a number (will be normalized) or a Spacing key.
   */
  height?: number | Spacing;

  /**
   * Explicit width. Can be a number (will be normalized) or a Spacing key.
   */
  width?: number | Spacing;

  /**
   * Shortcut for defining spacing based on theme tokens.
   * If `horizontal` is true, applies to width. Otherwise applies to height.
   */
  size?: Spacing;

  /**
   * Used with `size`. If true, `size` applies to width.
   */
  horizontal?: boolean;

  /**
   * If true, the spacer will take up all available space.
   */
  flex?: boolean;

  style?: ViewStyle;
}

export const Spacer: React.FC<SpacerProps> = ({
  height,
  width,
  size,
  horizontal = false,
  flex,
  style,
}) => {
  const getDimension = (value?: number | Spacing): number => {
    if (typeof value === 'number') {
      return normalize(value);
    }
    if (typeof value === 'string' && spacing[value]) {
      return normalize(spacing[value]);
    }
    return 0;
  };

  let finalHeight = getDimension(height);
  let finalWidth = getDimension(width);

  // If `size` is present, it overrides or sets the dimension based on direction
  if (size) {
    const sizeVal = normalize(spacing[size]);
    if (horizontal) {
      finalWidth = sizeVal;
    } else {
      finalHeight = sizeVal;
    }
  }

  const styles: ViewStyle = {
    height: finalHeight,
    width: finalWidth,
    flex: flex ? 1 : undefined,
  };

  return <View style={[styles, style]} />;
};
