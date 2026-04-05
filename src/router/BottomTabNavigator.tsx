import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';
import { palette } from '../theme/colors';

// Screens
import { ContactScreen } from '../screens/main/ContactScreen';
import { ChatScreen } from '../screens/main/ChatScreen';
import { MoreScreen } from '../screens/main/MoreScreen';

// Icons
import ContactTabSvgIcon from '../assets/svgs/ContactTabSvgIcon';
import ChatTabSvgIcon from '../assets/svgs/ChatTabSvgIcon';
import MoreTabSvgIcon from '../assets/svgs/MoreTabSvgIcon';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { colors, isDark } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Contact"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 80,
          paddingBottom: 25,
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: isDark ? palette.gray600 : palette.gray300,
        tabBarLabelStyle: {
          ...typography.captionRegular,
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, focused }) => (
            <ContactTabSvgIcon color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, focused }) => (
            <ChatTabSvgIcon color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, focused }) => (
            <MoreTabSvgIcon color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
