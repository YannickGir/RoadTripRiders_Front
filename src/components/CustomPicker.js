import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function CustomPicker() {
  const [userBikeCateg, setuserBikeCateg] = useState('');

  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={userBikeCateg}
        onValueChange={(value, index) => setuserBikeCateg(value)}
        mode='dropdown' // Android only
        style={styles.picker}
      >
        <Picker.Item label='Liste des catégories' value='Unknown' />
        <Picker.Item label='Routières' value='Routières' />
        <Picker.Item label='Roadsters' value='Roadsters' />
        <Picker.Item label='Trails' value='Trails' />
        <Picker.Item label='Sportives' value='Sportives' />
        <Picker.Item label='Supermotards' value='Supermotards' />
        <Picker.Item label='Customs' value='Customs' />
      </Picker>
      <Text style={styles.text}>Ta catégorie: {userBikeCateg}</Text>
    </View>
  );
}

export default CustomPicker;

// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#666',
  },
});
