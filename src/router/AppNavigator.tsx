import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { ChatScreen } from '../screens/main/ChatScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { PhoneNumberInput } from '../screens/PhoneNumberInput';
import { OtpInputField } from '../screens/OtpInputField';

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
        name="OtpInputField"
        component={OtpInputField}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneNumberInput"
        component={PhoneNumberInput}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }: any) => ({
          title: route.params?.name || 'Chat',
          headerBackTitle: 'Back',
        })}
      />
    </Stack.Navigator>
  );
};
