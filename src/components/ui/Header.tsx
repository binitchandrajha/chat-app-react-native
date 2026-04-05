import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import BackIcon from '../../assets/svgs/BackSvgIcon';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { calculateRelativeHeight, normalize } from '../../theme';

interface HeaderProps {
  style?: ViewStyle;
}

const Header = ({ style }: HeaderProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <BackIcon color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: normalize(16),
    minHeight: calculateRelativeHeight(24),
  },
  backButton: {
    width: normalize(24),
    height: normalize(24),
  },
});

export default Header;
