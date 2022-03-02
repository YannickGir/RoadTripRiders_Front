import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import CustomCheckBox from '../components/CustomCheckBox';
import CustomInput from '../components/CustomInput';
import CustomDatePicker from '../components/CustomDatePicker';
import CustomTimePicker from '../components/CustomTimePicker';

export default function UserInfosEditionScreen() {
  const [userFirstName, setuserFirstName] = useState('');
  const [userLastName, setuserLastName] = useState('');
  const [userBirthDate, setuserBirthDate] = useState('');

  return (
    <View style={styles.container}>
      <Text>User infos edition Screen</Text>
      <Text>Quel rider es-tu ?</Text>

      <CustomInput
        placeholder='Prénom'
        value={userFirstName}
        setValue={setuserFirstName}
        secureTextEntry={false}
      />

      <View style={styles.secondary}>
        <CustomCheckBox title='Homme' />
        <CustomCheckBox title='Femme' />
        <CustomCheckBox title='Autre' />
      </View>

      <CustomTimePicker title='HEURE' />
      <CustomDatePicker title='DATE' />
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
  secondary: {
    flexDirection: 'row',
  },
  text: {},
});
