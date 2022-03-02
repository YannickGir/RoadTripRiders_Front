import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

export default function UserInfosEditionScreen() {
  return (
    <View style={styles.container}>
      <Text>User infos edition Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
