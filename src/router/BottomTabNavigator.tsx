import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/main/HomeScreen';
import { SettingsScreen } from '../screens/main/SettingsScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="Chats"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Chats',
          headerTitle: 'Messages',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          headerTitle: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};
