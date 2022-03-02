import React, { useState } from 'react'
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

//Ici on réexploite ce qui a été créé pour la page Log In
export default function CreateRoadTripScreenSecondStep(props) {
  // On définit ici les variables d'état qui vont nous servir à enregistrer les valeurs des inputs
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions()

  return (
    <View style={styles.container}>
      <Text>CreateROadTrip 1</Text>
      <Button
        title='aller sur CreateRoadTrip1'
        onPress={() =>
          props.navigation.navigate('Homepage', { screen: 'CreateRoadTrip1' })
        }
      ></Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
})
