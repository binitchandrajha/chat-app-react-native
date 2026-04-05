import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WelcomeScreenSvgImage from '../assets/svgs/WelcomeScreenSvgImage';
import WelcomeScreenDarkSvgImage from '../assets/svgs/WelcomeScreenDarkSvgImage';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, borderRadius, dimensions } from '../theme/layout';
import { palette } from '../theme/colors';
import { Screen } from '../components/ui/Screen';
import { Button } from '../components/ui/Button';
import { LinkButton } from '../components/ui/LinkButton';
import { useNavigation } from '@react-navigation/native';

export const WelcomeScreen = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();

  return (
    <Screen style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {isDark ? <WelcomeScreenDarkSvgImage /> : <WelcomeScreenSvgImage />}
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              typography.h3Bold,
              styles.headingText,
              { color: colors.text },
            ]}
          >
            Connect easily with{'\n'}your family and friends{'\n'}over countries
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <LinkButton title="Terms & Privacy Policy" onPress={() => {}} />
          <Button
            title="Start Messaging"
            onPress={() => navigation.navigate('PhoneNumberInput' as never)}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing['2xl'],
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: spacing.md,
  },
  headingText: {
    textAlign: 'center',
  },
  bottomContainer: {
    gap: spacing.md,
    justifyContent: 'flex-end',
  },
  termsText: {
    textAlign: 'center',
  },
  button: {
    height: dimensions.button.height.lg,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: palette.white,
  },
});
