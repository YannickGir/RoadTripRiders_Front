import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

export default function UserInfosScreen(props) {
  return (
    <View style={styles.container}>
      <Text>My Account Screen</Text>
      <CustomButton
        title='SE DECONNECTER'
        onPress={() =>
          props.navigation.navigate('BottomNavigator', { screen: 'LogIn' })
        }
      />
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
