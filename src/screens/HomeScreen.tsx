import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const MOCK_CHATS = [
  { id: '1', name: 'Alice', lastMessage: 'Hey, how are you?' },
  { id: '2', name: 'Bob', lastMessage: 'Meeting at 5?' },
  { id: '3', name: 'Charlie', lastMessage: 'Sure, see you then.' },
];

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const renderItem = ({ item }: { item: (typeof MOCK_CHATS)[0] }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('Chat', { chatId: item.id, name: item.name })
      }
    >
      <View style={styles.avatarPlaceholder} />
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_CHATS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 16,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: '#666',
  },
});
