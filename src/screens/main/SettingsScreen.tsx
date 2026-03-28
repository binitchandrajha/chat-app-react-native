import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppStore } from '../../store/useAppStore';

export const SettingsScreen = () => {
  const currentUser = useAppStore(state => state.currentUser);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.profileSection}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.name}>{currentUser?.name || 'Guest'}</Text>
        <Text style={styles.subtitle}>ID: {currentUser?.id}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
