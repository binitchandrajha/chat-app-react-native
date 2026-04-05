import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';

import { Screen } from '../components/ui/Screen';
import { Button } from '../components/ui/Button';
import { FormInput } from '../components/ui/FormInput';
import { useTheme } from '../theme/ThemeContext';
import { spacing } from '../theme/layout';
import { typography } from '../theme/typography';
import Header from '../components/ui/Header';
import { Spacer } from '../components/ui/Spacer';

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Must be only digits'),
});

export const PhoneNumberInput = () => {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();

  const [countryCode, setCountryCode] = useState<CountryCode>('ID');
  const [callingCode, setCallingCode] = useState<string>('62');
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { phoneNumber: '' },
  });

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    const formattedPhone = `+${callingCode} ${data.phoneNumber}`;
    navigation.navigate('OtpInputField', { phoneNumber: formattedPhone });
  };

  return (
    <Screen style={[{ backgroundColor: colors.background }, styles.container]}>
      <View style={styles.topContainer}>
        <Header />

        <Spacer size="2xl" />

        <Text style={[typography.h4Bold, styles.title, { color: colors.text }]}>
          Enter Your Phone Number
        </Text>

        <Text
          style={[
            typography.bodyRegular,
            styles.subtitle,
            { color: colors.textSecondary },
          ]}
        >
          Please confirm your country code and enter your phone number
        </Text>

        <View style={styles.inputWrapper}>
          <FormInput
            control={control}
            name="phoneNumber"
            placeholder="Phone Number"
            keyboardType="phone-pad"
            autoFocus={true}
            error={errors.phoneNumber}
            leftContainer={
              <TouchableOpacity
                style={styles.countryPickerTrigger}
                onPress={() => setCountryPickerVisible(true)}
              >
                <CountryPicker
                  withFilter
                  withFlag
                  withCallingCode
                  withEmoji
                  countryCode={countryCode}
                  visible={countryPickerVisible}
                  onSelect={onSelectCountry}
                  onClose={() => setCountryPickerVisible(false)}
                  containerButtonStyle={styles.hiddenPicker}
                  theme={
                    isDark
                      ? {
                          backgroundColor: colors.surface,
                          onBackgroundTextColor: colors.text,
                          fontSize: 16,
                          filterPlaceholderTextColor: colors.textSecondary,
                          activeOpacity: 0.5,
                        }
                      : {}
                  }
                />
                <Text
                  style={[
                    typography.bodyMedium,
                    { color: colors.textSecondary },
                  ]}
                >
                  +{callingCode}
                </Text>
              </TouchableOpacity>
            }
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Button title="Continue" onPress={handleSubmit(onSubmit)} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    paddingTop: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacing['2xl'],
    paddingHorizontal: spacing.md,
  },
  inputWrapper: {
    marginTop: spacing.md,
  },
  countryPickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing.sm,
  },
  hiddenPicker: {
    display: 'none',
  },
  bottomContainer: {
    paddingTop: spacing.md,
  },
});
