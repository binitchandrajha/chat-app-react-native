import React from 'react';
import { typography, useTheme } from '../theme';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface LinkButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  activeOpacity = 0.8,
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={style}
      activeOpacity={activeOpacity}
      onPress={onPress}
    >
      <Text
        style={[
          typography.bodyMedium,
          styles.termsText,
          { color: colors.text },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  termsText: {
    textAlign: 'center',
  },
});
