import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingViewProps,
} from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
  Edge,
} from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';

interface ScreenProps extends SafeAreaViewProps {
  children: React.ReactNode;
  style?: import('react-native').StyleProp<import('react-native').ViewStyle>;
  keyboardAvoiding?: boolean;
  keyboardAvoidingBehavior?: KeyboardAvoidingViewProps['behavior'];
  keyboardVerticalOffset?: number;
  safeArea?: boolean;
  backgroundColor?: string;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  edges?: Edge[]; // 👈 explicit
  statusBarColor?: string;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  keyboardAvoiding = Platform.OS === 'ios',
  keyboardAvoidingBehavior = 'padding',
  keyboardVerticalOffset = 0,
  safeArea = true,
  backgroundColor,
  edges = [], // 👈 default top & bottom
  statusBarColor,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  console.warn(statusBarColor);

  // Adjust offset for iOS to account for bottom safe area when using 'padding'
  const offset =
    Platform.OS === 'ios' && keyboardAvoidingBehavior === 'padding'
      ? keyboardVerticalOffset - insets.bottom
      : keyboardVerticalOffset;

  const content = (
    <View
      style={[styles.container, backgroundColor && { backgroundColor }, style]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={statusBarColor || colors.background}
      />
      {children}
    </View>
  );

  const wrappedContent = safeArea ? (
    <SafeAreaView
      style={[styles.container, backgroundColor && { backgroundColor }]}
      edges={edges}
      {...props}
    >
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={styles.keyboardAvoiding}
          behavior={keyboardAvoidingBehavior}
          keyboardVerticalOffset={offset}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  ) : (
    <View style={[styles.container, backgroundColor && { backgroundColor }]}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={styles.keyboardAvoiding}
          behavior={keyboardAvoidingBehavior}
          keyboardVerticalOffset={offset}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </View>
  );

  return wrappedContent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
});
