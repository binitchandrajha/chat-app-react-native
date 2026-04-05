import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Text,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import BackIcon from '../../assets/svgs/BackSvgIcon';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { calculateRelativeHeight, normalize } from '../../theme';

interface HeaderProps {
  style?: ViewStyle;
  title?: string;
  showBackButton?: boolean;
}

const Header = ({ style, title, showBackButton = true }: HeaderProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon color={colors.text} />
        </TouchableOpacity>
      )}
      {title && (
        <Text
          style={[typography.h5Bold, styles.titleText, { color: colors.text }]}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: normalize(16),
    minHeight: calculateRelativeHeight(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: normalize(24),
    height: normalize(24),
    marginRight: normalize(8),
  },
  titleText: {
    flex: 1,
  },
});

export default Header;
