import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export const ChatScreen = () => {
  const route = useRoute<any>();
  const { name } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>Chatting with {name}</Text>
      {/* Messages list and input will go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#666',
  },
});
