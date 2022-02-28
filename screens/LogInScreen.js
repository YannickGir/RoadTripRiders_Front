import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import Logo from '../assets/images/moto3.png';

export default function LogInScreen(props) {
  return (
    <View style={{ flex: 1, backgroundColor: '#3498db' }}>
      <Image source={Logo} />

      <Text>Log in screen</Text>
      <Button
        title='Go to Homepage'
        onPress={() =>
          props.navigation.navigate('BottomNavigator', { screen: 'Homepage' })
        }
      />
    </View>
  );
}
