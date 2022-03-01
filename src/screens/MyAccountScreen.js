import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import CustomButton from '../../src/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserInfosScreen(props) {
  return (
    <View style={styles.container}>
      <Text>My Account Screen</Text>
      <CustomButton
        title='SE DECONNECTER'
        onPress={() => {
          props.navigation.navigate('BottomNavigator', { screen: 'LogIn' }),
            AsyncStorage.clear();
        }}
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
