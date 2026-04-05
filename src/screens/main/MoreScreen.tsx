import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing, normalize } from '../../theme/layout';
import { palette } from '../../theme/colors';
import Svg, { Path } from 'react-native-svg';

const MENU_ITEMS = [
  { id: '1', icon: 'account', title: 'Account' },
  { id: '2', icon: 'chats', title: 'Chats' },
  { id: '3', icon: 'appearance', title: 'Appearance' },
  { id: '4', icon: 'notification', title: 'Notification' },
  { id: '5', icon: 'privacy', title: 'Privacy' },
  { id: '6', icon: 'data', title: 'Data Usage' },
];

const MENU_ITEMS_FOOTER = [
  { id: '7', icon: 'help', title: 'Help' },
  { id: '8', icon: 'invite', title: 'Invite Your Friends' },
];

const IconRenderer = ({ _name, colors }: { _name: string; colors: any }) => {
  // A simple generic icon placeholder that mimics settings icons
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={colors.text}
        strokeWidth="2"
      />
      <Path d="M8 12H16" stroke={colors.text} strokeWidth="2" />
    </Svg>
  );
};

export const MoreScreen = () => {
  const { colors, isDark } = useTheme();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.menuRow}>
      <View style={styles.menuLeft}>
        <IconRenderer _name={item.icon} colors={colors} />
        <Text
          style={[
            typography.bodyBold,
            { color: colors.text, marginLeft: spacing.md },
          ]}
        >
          {item.title}
        </Text>
      </View>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M9 18L15 12L9 6"
          stroke={colors.text}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );

  return (
    <Screen style={[{ backgroundColor: colors.background }, styles.container]}>
      <View style={styles.header}>
        <Text style={[typography.h4Bold, { color: colors.text }]}>More</Text>
      </View>

      <View style={styles.profileSection}>
        <View
          style={[
            styles.avatarPlaceholder,
            { backgroundColor: isDark ? palette.gray800 : palette.gray100 },
          ]}
        >
          <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              stroke={isDark ? palette.gray300 : palette.gray800}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <View style={styles.profileInfo}>
          <Text style={[typography.bodyBold, { color: colors.text }]}>
            Almayra Zamzamy
          </Text>
          <Text
            style={[typography.captionRegular, { color: colors.textSecondary }]}
          >
            +62 1309 - 1710 - 1920
          </Text>
        </View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M9 18L15 12L9 6"
            stroke={colors.text}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      <View style={styles.menuContainer}>
        <FlatList
          data={MENU_ITEMS}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
        />

        <View
          style={[
            styles.divider,
            { backgroundColor: isDark ? palette.gray800 : palette.gray100 },
          ]}
        />

        <FlatList
          data={MENU_ITEMS_FOOTER}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  header: {
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
  },
  avatarPlaceholder: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  menuContainer: {
    flex: 1,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: spacing.xl,
  },
});
