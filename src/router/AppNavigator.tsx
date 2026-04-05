import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { PhoneNumberInput } from '../screens/PhoneNumberInput';
import { OtpInputField } from '../screens/OtpInputField';
import { ProfileSetup } from '../screens/ProfileSetup';
import { BottomTabNavigator } from './BottomTabNavigator';
import { ChatScreen } from '../screens/main/ChatScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneNumberInput"
        component={PhoneNumberInput}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpInputField"
        component={OtpInputField}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileSetup"
        component={ProfileSetup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatDetails"
        component={ChatScreen}
        options={({ route }: any) => ({
          title: route.params?.name || 'Chat',
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
};
