import React from 'react';
import {
  AccessibilityInfo,
  AccessibilityRole,
  AccessibilityState,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import { fonts } from '../../theme/font';

interface AccessibleViewProps extends ViewProps {
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: AccessibilityState;
  accessible?: boolean;
  testID?: string;
}

/**
 * Accessible View Component
 * Enhanced view with better accessibility support
 */
export const AccessibleView: React.FC<AccessibleViewProps> = ({
  children,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  accessibilityState,
  accessible = true,
  testID,
  ...props
}) => (
  <View
    accessible={accessible}
    accessibilityLabel={accessibilityLabel}
    accessibilityHint={accessibilityHint}
    accessibilityRole={accessibilityRole}
    accessibilityState={accessibilityState}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

interface AccessibleButtonProps extends TouchableOpacityProps {
  accessibilityLabel: string;
  accessibilityHint?: string;
  accessibilityState?: AccessibilityState;
  testID?: string;
}

/**
 * Accessible Button Component
 * Enhanced button with proper accessibility
 */
export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  accessibilityLabel,
  accessibilityHint,
  accessibilityState,
  testID,
  disabled,
  ...props
}) => (
  <TouchableOpacity
    accessible
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    accessibilityHint={accessibilityHint}
    accessibilityState={{
      disabled: disabled || false,
      ...accessibilityState,
    }}
    testID={testID}
    disabled={disabled}
    {...props}
  >
    {children}
  </TouchableOpacity>
);

interface AccessibleTextProps extends TextProps {
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  isHeading?: boolean;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Accessible Text Component
 * Enhanced text with proper accessibility
 */
export const AccessibleText: React.FC<AccessibleTextProps> = ({
  children,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'text',
  isHeading = false,
  headingLevel,
  style,
  ...props
}) => {
  const role = isHeading ? 'header' : accessibilityRole;

  // Resolve styles to compute the effective font weight
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const weight = flattenedStyle.fontWeight || '400';
  const styleFontFamily = flattenedStyle.fontFamily;

  // 1. Map weight to our Inter font files
  const mappedFontFamily =
    weight === '500' || weight === 'medium' || weight === 500
      ? fonts.medium
      : weight === '600' || weight === 'semibold' || weight === 600
      ? fonts.semibold
      : weight === '700' ||
        weight === '800' ||
        weight === '900' ||
        weight === 'bold' ||
        weight === 700 ||
        weight === 800 ||
        weight === 900
      ? fonts.bold
      : fonts.regular;

  // 2. Determine final font family
  // If style already has one of our Inter fonts, respect it. Otherwise, use mapped weight.
  const isCustomInter =
    styleFontFamily && Object.values(fonts).includes(styleFontFamily as any);
  const finalFontFamily = isCustomInter ? styleFontFamily : mappedFontFamily;

  // 3. Strip fontWeight if we are using a specific Inter file to prevent resolution issues
  const cleanStyle = { ...flattenedStyle };
  if (finalFontFamily) {
    delete cleanStyle.fontWeight;
  }

  return (
    <Text
      accessible
      accessibilityRole={role}
      accessibilityLabel={
        accessibilityLabel ||
        (typeof children === 'string' ? children : undefined)
      }
      accessibilityHint={accessibilityHint}
      style={[{ fontFamily: finalFontFamily }, cleanStyle]}
      {...(isHeading && headingLevel && { 'aria-level': headingLevel })}
      {...props}
    >
      {children}
    </Text>
  );
};

/**
 * Accessibility Utilities
 */
export class AccessibilityUtils {
  /**
   * Announce message to screen reader
   */
  static announce(message: string, _options?: { queue?: boolean }) {
    AccessibilityInfo.announceForAccessibility(message);
  }

  /**
   * Check if screen reader is enabled
   */
  static async isScreenReaderEnabled(): Promise<boolean> {
    return AccessibilityInfo.isScreenReaderEnabled();
  }

  /**
   * Check if reduce motion is enabled
   */
  static async isReduceMotionEnabled(): Promise<boolean> {
    return AccessibilityInfo.isReduceMotionEnabled();
  }

  /**
   * Check if reduce transparency is enabled
   */
  static async isReduceTransparencyEnabled(): Promise<boolean> {
    return AccessibilityInfo.isReduceTransparencyEnabled();
  }

  /**
   * Set accessibility focus to element
   */
  static setAccessibilityFocus(reactTag: number) {
    AccessibilityInfo.setAccessibilityFocus(reactTag);
  }
}

/**
 * Hook for accessibility preferences
 */
export const useAccessibility = () => {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] =
    React.useState(false);
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] =
    React.useState(false);
  const [isReduceTransparencyEnabled, setIsReduceTransparencyEnabled] =
    React.useState(false);

  React.useEffect(() => {
    // Check initial states
    AccessibilityUtils.isScreenReaderEnabled().then(setIsScreenReaderEnabled);
    AccessibilityUtils.isReduceMotionEnabled().then(setIsReduceMotionEnabled);
    AccessibilityUtils.isReduceTransparencyEnabled().then(
      setIsReduceTransparencyEnabled,
    );

    // Listen for changes
    const screenReaderSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      setIsScreenReaderEnabled,
    );

    const reduceMotionSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setIsReduceMotionEnabled,
    );

    const reduceTransparencySubscription = AccessibilityInfo.addEventListener(
      'reduceTransparencyChanged',
      setIsReduceTransparencyEnabled,
    );

    return () => {
      screenReaderSubscription?.remove();
      reduceMotionSubscription?.remove();
      reduceTransparencySubscription?.remove();
    };
  }, []);

  return {
    isScreenReaderEnabled,
    isReduceMotionEnabled,
    isReduceTransparencyEnabled,
    announce: AccessibilityUtils.announce,
  };
};
