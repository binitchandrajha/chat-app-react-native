import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

import { Screen } from '../components/ui/Screen';
import Header from '../components/ui/Header';
import { FormInput } from '../components/ui/FormInput';
import { Button } from '../components/ui/Button';
import { Spacer } from '../components/ui/Spacer';
import { useTheme } from '../theme/ThemeContext';
import { spacing, normalize } from '../theme/layout';
import { palette } from '../theme/colors';

import UserPlaceholderSvgIcon from '../assets/svgs/UserPlaceholderSvgIcon';
import PlusBadgeSvgIcon from '../assets/svgs/PlusBadgeSvgIcon';
import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../utils/permission';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().optional(),
});

export const ProfileSetup = () => {
  const { colors, isDark } = useTheme();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ firstName: string; lastName?: string }>({
    resolver: yupResolver(schema) as any,
    defaultValues: { firstName: '', lastName: '' },
  });

  const onSubmit = (data: any) => {
    console.log('Profile Data Saved', { ...data, avatarUri });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  const handleImageSelection = async (type: 'camera' | 'gallery') => {
    let hasPermission = false;
    if (type === 'camera') {
      hasPermission = await requestCameraPermission();
    } else {
      hasPermission = await requestGalleryPermission();
    }

    if (!hasPermission) return;

    const options: any = {
      mediaType: 'photo',
      quality: 1,
    };

    const handler = type === 'camera' ? launchCamera : launchImageLibrary;

    handler(options, (response: ImagePickerResponse) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert(
          'Image Picker Error',
          response.errorMessage || 'Unknown error',
        );
        return;
      }

      if (response.assets && response.assets.length > 0) {
        setAvatarUri(response.assets[0].uri || null);
      }
    });
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Upload Profile Picture',
      'Choose an option to upload your picture',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Photo', onPress: () => handleImageSelection('camera') },
        {
          text: 'Choose from Gallery',
          onPress: () => handleImageSelection('gallery'),
        },
      ],
    );
  };

  return (
    <Screen style={[{ backgroundColor: colors.background }, styles.container]}>
      <View style={styles.topContainer}>
        <Header title="Your Profile" showBackButton={true} />

        <Spacer size="2xl" />
        <Spacer size="xl" />

        <View style={styles.avatarContainer}>
          <TouchableOpacity
            onPress={showImagePickerOptions}
            style={[
              styles.avatarCircle,
              { backgroundColor: isDark ? palette.gray800 : palette.gray100 },
            ]}
          >
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <UserPlaceholderSvgIcon
                color={isDark ? colors.text : palette.gray800}
              />
            )}

            <View style={styles.plusBadge}>
              <PlusBadgeSvgIcon
                fillColor={isDark ? colors.text : palette.gray800}
                plusColor={isDark ? colors.background : colors.background}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Spacer size="2xl" />
        <Spacer size="xl" />

        <FormInput
          control={control}
          name="firstName"
          placeholder="First Name (Required)"
          autoFocus={true}
          error={errors.firstName}
        />

        <Spacer size="md" />

        <FormInput
          control={control}
          name="lastName"
          placeholder="Last Name (Optional)"
          error={errors.lastName}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
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
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: normalize(120),
    height: normalize(120),
    borderRadius: normalize(60),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarImage: {
    width: normalize(120),
    height: normalize(120),
    borderRadius: normalize(60),
  },
  plusBadge: {
    position: 'absolute',
    bottom: normalize(4),
    right: normalize(4),
    width: normalize(28),
    height: normalize(28),
    borderRadius: normalize(14),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    paddingTop: spacing.md,
  },
});
