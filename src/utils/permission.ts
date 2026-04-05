import { Platform, Alert, Linking } from 'react-native';
import {
  check,
  request,
  RESULTS,
  Permission,
  PERMISSIONS,
} from 'react-native-permissions';

const showSettingsAlert = (title: string, message: string) => {
  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Open Settings', onPress: () => Linking.openSettings() },
  ]);
};

async function handlePermission(
  permission: Permission,
  settingsPrompt: { title: string; message: string },
) {
  try {
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Unsupported',
          'This feature is not supported on this device.',
        );
        return false;
      case RESULTS.DENIED:
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
      case RESULTS.GRANTED:
        return true;
      case RESULTS.BLOCKED:
      case RESULTS.LIMITED: // iOS limited access
        showSettingsAlert(settingsPrompt.title, settingsPrompt.message);
        return false;
    }
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
}

export const requestCameraPermission = async () => {
  const permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  return handlePermission(permission, {
    title: 'Camera Permission Needed',
    message: 'We need access to your camera so you can take a profile picture.',
  });
};

export const requestGalleryPermission = async () => {
  if (Platform.OS === 'ios') {
    return handlePermission(PERMISSIONS.IOS.PHOTO_LIBRARY, {
      title: 'Gallery Permission Needed',
      message:
        'We need access to your gallery so you can select a profile picture.',
    });
  } else {
    // Android 13+ requires READ_MEDIA_IMAGES
    if (Number(Platform.Version) >= 33) {
      return handlePermission(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, {
        title: 'Gallery Permission Needed',
        message:
          'We need access to your gallery so you can select a profile picture.',
      });
    }
    // Older Android versions
    return handlePermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, {
      title: 'Gallery Permission Needed',
      message:
        'We need access to your gallery so you can select a profile picture.',
    });
  }
};
