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

const DUMMY_CONTACTS = [
  {
    id: '1',
    name: 'Athalia Putri',
    subtext: 'Last seen yesterday',
    online: false,
  },
  { id: '2', name: 'Erlan Sadewa', subtext: 'Online', online: true },
  {
    id: '3',
    name: 'Midala Huera',
    subtext: 'Last seen 3 hours ago',
    online: false,
    hasStory: true,
  },
  { id: '4', name: 'Nafisa Gitari', subtext: 'Online', online: true },
  {
    id: '5',
    name: 'Raki Devon',
    subtext: 'Online',
    online: true,
    initials: 'RD',
    badgeColor: palette.primary,
  },
  {
    id: '6',
    name: 'Salsabila Akira',
    subtext: 'Last seen 30 minutes ago',
    online: false,
    initials: 'SA',
    hasStory: true,
    badgeColor: palette.primary,
  },
];

export const ContactScreen = () => {
  const { colors, isDark } = useTheme();

  return (
    <Screen style={[{ backgroundColor: colors.background }, styles.container]}>
      <View style={styles.header}>
        <Text style={[typography.h4Bold, { color: colors.text }]}>
          Contacts
        </Text>
        <TouchableOpacity>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 5V19M5 12H19"
              stroke={colors.text}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.searchBar,
          { backgroundColor: isDark ? palette.gray800 : palette.gray100 },
        ]}
      >
        <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <Path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke={palette.gray500}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <Text
          style={[
            typography.bodyRegular,
            { color: palette.gray500, marginLeft: 8 },
          ]}
        >
          Search
        </Text>
      </View>

      <FlatList
        data={DUMMY_CONTACTS}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing['2xl'] }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.contactRow,
              { borderBottomColor: isDark ? palette.gray800 : palette.gray100 },
            ]}
          >
            <View
              style={[
                styles.avatarContainer,
                item.hasStory && {
                  borderWidth: 2,
                  borderColor: palette.primary,
                  padding: 2,
                },
              ]}
            >
              {item.initials ? (
                <View
                  style={[
                    styles.avatarFallback,
                    { backgroundColor: item.badgeColor },
                  ]}
                >
                  <Text style={[typography.bodyBold, { color: palette.white }]}>
                    {item.initials}
                  </Text>
                </View>
              ) : (
                <View
                  style={[
                    styles.avatarFallback,
                    { backgroundColor: palette.gray200 },
                  ]}
                />
              )}
              {item.online && (
                <View
                  style={[
                    styles.onlineBadge,
                    { borderColor: colors.background },
                  ]}
                />
              )}
            </View>
            <View style={styles.contactDetails}>
              <Text style={[typography.bodyBold, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text
                style={[
                  typography.captionRegular,
                  { color: colors.textSecondary },
                ]}
              >
                {item.subtext}
              </Text>
            </View>
          </View>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: normalize(8),
    marginBottom: spacing.xl,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(28),
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: normalize(14),
    height: normalize(14),
    borderRadius: normalize(7),
    backgroundColor: palette.success,
    borderWidth: 2,
  },
  contactDetails: {
    marginLeft: spacing.md,
    flex: 1,
  },
});
