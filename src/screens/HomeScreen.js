import React from 'react'
import { StyleSheet, Button, View, Text, Icon } from 'react-native'

export default function HomepageScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Homepage Screen</Text>
      <Button
        icon={<Icon name='arrow-right' size={20} color='#eb4d4b' />}
        title='create roadtrip !'
        type='solid'
        onPress={() =>
          props.navigation.navigate('Homepage', { screen: 'CreateRoadTrip1' })
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
