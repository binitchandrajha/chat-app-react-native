import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Screen } from '../components/ui/Screen';
import Header from '../components/ui/Header';
import { Spacer } from '../components/ui/Spacer';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { spacing, normalize } from '../theme/layout';
import { palette } from '../theme/colors';
import { LinkButton } from '../components/ui/LinkButton';

export const OtpInputField = () => {
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);
  const { colors, isDark } = useTheme();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  // Format the phone number from params, or provide a fallback for testing
  const phoneNumber = route.params?.phoneNumber || '+62 1309 - 1710 - 1920';

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleCodeChange = (text: string) => {
    // Only accept digits, up to 4 characters
    const formatted = text.replace(/[^0-9]/g, '').slice(0, 4);
    setCode(formatted);
    if (formatted.length === 4) {
      Keyboard.dismiss();
      console.log('OTP Submitted', formatted);
      navigation.navigate('ProfileSetup');
    }
  };

  return (
    <Screen style={[{ backgroundColor: colors.background }, styles.container]}>
      <View style={styles.topContainer}>
        <Header />

        <Spacer size="2xl" />

        <Text style={[typography.h4Bold, styles.title, { color: colors.text }]}>
          Enter Code
        </Text>

        <Spacer size="xs" />

        <Text
          style={[
            typography.bodyRegular,
            styles.subtitle,
            { color: colors.textSecondary },
          ]}
        >
          We have sent you an SMS with the code{'\n'}to {phoneNumber}
        </Text>

        <Spacer size="2xl" />
        <Spacer size="xl" />

        <Pressable onPress={handlePress} style={styles.otpContainer}>
          {[0, 1, 2, 3].map(index => {
            const digit = code[index];
            return (
              <View key={index} style={styles.otpBox}>
                {digit ? (
                  <Text style={[typography.h2Bold, { color: colors.text }]}>
                    {digit}
                  </Text>
                ) : (
                  <View
                    style={[
                      styles.emptyDot,
                      {
                        backgroundColor: isDark
                          ? palette.gray800
                          : palette.gray200,
                      },
                    ]}
                  />
                )}
              </View>
            );
          })}
        </Pressable>

        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={handleCodeChange}
          keyboardType="number-pad"
          maxLength={4}
          autoFocus={true}
          style={styles.hiddenInput}
        />

        <Spacer size="2xl" />
        <Spacer size="xl" />

        <LinkButton
          title="Resend Code"
          onPress={() => {}}
          textStyle={{ color: colors.primaryButton }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  topContainer: {
    flex: 1,
    paddingTop: spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    lineHeight: normalize(24),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
  },
  otpBox: {
    width: normalize(40),
    height: normalize(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDot: {
    width: normalize(16),
    height: normalize(16),
    borderRadius: normalize(8),
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
