import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { useTheme } from '../../theme/ThemeContext';
import { typography } from '../../theme/typography';
import { spacing, normalize } from '../../theme/layout';
import { palette } from '../../theme/colors';
import Svg, { Path } from 'react-native-svg';

const DUMMY_STORIES = [
  { id: '1', name: 'Your Story', isAdd: true },
  { id: '2', name: 'Midala Huera', isAdd: false, initials: 'MH' },
  {
    id: '3',
    name: 'Salsabila Akira',
    isAdd: false,
    initials: 'SA',
    badgeColor: palette.primary,
  },
];

const DUMMY_CHATS = [
  {
    id: '1',
    name: 'Athalia Putri',
    snippet: 'Good morning, did you sleep well?',
    time: 'Today',
    unread: 1,
    online: true,
  },
  {
    id: '2',
    name: 'Raki Devon',
    snippet: 'How is it going?',
    time: '17/6',
    unread: 0,
    initials: 'RD',
    badgeColor: palette.primary,
  },
  {
    id: '3',
    name: 'Erlan Sadewa',
    snippet: 'Aight, noted',
    time: '17/6',
    unread: 1,
  },
];

export const ChatScreen = () => {
  const { colors, isDark } = useTheme();

  return (
    <Screen style={[{ backgroundColor: colors.background }, styles.container]}>
      <View style={styles.header}>
        <Text style={[typography.h4Bold, { color: colors.text }]}>Chats</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={{ marginRight: spacing.md }}>
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
          <TouchableOpacity>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M4 6H20M4 12H20M4 18H12"
                stroke={colors.text}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.storiesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: spacing.xl,
            gap: spacing.md,
          }}
        >
          {DUMMY_STORIES.map(story => (
            <View key={story.id} style={styles.storyWrap}>
              <View
                style={[
                  styles.storyCircle,
                  story.isAdd
                    ? { borderColor: palette.gray300 }
                    : { borderColor: palette.primary },
                ]}
              >
                {story.isAdd ? (
                  <View
                    style={[
                      styles.addStoryFallback,
                      {
                        backgroundColor: isDark
                          ? palette.gray800
                          : palette.gray100,
                      },
                    ]}
                  >
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M12 5V19M5 12H19"
                        stroke={palette.gray500}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.storyFallback,
                      { backgroundColor: story.badgeColor || palette.gray200 },
                    ]}
                  >
                    <Text
                      style={[typography.bodyBold, { color: palette.white }]}
                    >
                      {story.initials}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                numberOfLines={1}
                style={[typography.captionRegular, { color: colors.text }]}
              >
                {story.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View
        style={[
          styles.searchBar,
          {
            backgroundColor: isDark ? palette.gray800 : palette.gray100,
            marginHorizontal: spacing.xl,
          },
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
          Placeholder
        </Text>
      </View>

      <FlatList
        data={DUMMY_CHATS}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.xl,
          paddingBottom: spacing['2xl'],
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.chatRow,
              { borderBottomColor: isDark ? palette.gray800 : palette.gray100 },
            ]}
          >
            <View style={styles.avatarContainer}>
              {item.initials ? (
                <View
                  style={[
                    styles.avatarFallback,
                    { backgroundColor: item.badgeColor || palette.gray200 },
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
            <View style={styles.chatDetails}>
              <View style={styles.chatHeader}>
                <Text style={[typography.bodyBold, { color: colors.text }]}>
                  {item.name}
                </Text>
                <Text
                  style={[
                    typography.captionRegular,
                    { color: colors.textSecondary },
                  ]}
                >
                  {item.time}
                </Text>
              </View>
              <View style={styles.chatHeader}>
                <Text
                  numberOfLines={1}
                  style={[
                    typography.captionRegular,
                    { color: colors.textSecondary, flex: 1, marginRight: 8 },
                  ]}
                >
                  {item.snippet}
                </Text>
                {item.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text
                      style={[
                        typography.captionRegular,
                        {
                          color: palette.primary,
                          fontSize: 10,
                          fontWeight: '700',
                        },
                      ]}
                    >
                      {item.unread}
                    </Text>
                  </View>
                )}
              </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  storiesContainer: {
    marginBottom: spacing.xl,
    marginTop: spacing.sm,
  },
  storyWrap: {
    alignItems: 'center',
    width: normalize(60),
  },
  storyCircle: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    padding: 2,
  },
  storyFallback: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addStoryFallback: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: normalize(8),
    marginBottom: spacing.xl,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    width: normalize(52),
    height: normalize(52),
    borderRadius: normalize(26),
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
  chatDetails: {
    marginLeft: spacing.md,
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unreadBadge: {
    backgroundColor: palette.gray100,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
});
