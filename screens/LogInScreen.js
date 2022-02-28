import React from 'react';
import { Button, View, Text } from 'react-native';

export default function LogInScreen(props) {
  return (
    <View style={{ flex: 1, backgroundColor: '#3498db' }}>
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
