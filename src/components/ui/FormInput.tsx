import React, { ReactNode } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import {
  Controller,
  Control,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';
import { useTheme } from '../../theme/ThemeContext';
import { spacing, borderRadius, dimensions } from '../../theme/layout';
import { typography } from '../../theme/typography';
import { palette } from '../../theme/colors';

interface FormInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'name'> {
  control: Control<T>;
  name: Path<T>;
  error?: FieldError;
  containerStyle?: object;
  leftContainer?: ReactNode;
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  error,
  containerStyle,
  leftContainer,
  ...textInputProps
}: FormInputProps<T>) => {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: isDark ? palette.gray800 : palette.gray50 },
              error && { borderColor: colors.error, borderWidth: 1 },
            ]}
          >
            {leftContainer && (
              <View style={styles.leftContainer}>{leftContainer}</View>
            )}
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholderTextColor={colors.textSecondary}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...textInputProps}
            />
          </View>
        )}
      />
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: dimensions.button.height.lg,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
  },
  leftContainer: {
    marginRight: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    ...typography.bodyMedium,
    height: '100%',
  },
  errorText: {
    ...typography.captionRegular,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
