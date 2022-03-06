import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function CustomRegionPicker({ selectedValue, onValueChange }) {
  const [userRegion, setuserRegion] = useState('');

  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        mode='dropdown' // Android only
        style={styles.picker}
      >
        <Picker.Item label='Liste des Régions' value='Unknown' />
        <Picker.Item
          label='Auvergne-Rhône-Alpes'
          value='Auvergne-Rhône-Alpes'
        />
        <Picker.Item
          label='Bourgogne-Franche-Comté'
          value='Bourgogne-Franche-Comté'
        />
        <Picker.Item label='Bretagne' value='Bretagne' />
        <Picker.Item label='Centre-Val de Loire' value='Centre-Val de Loire' />
        <Picker.Item label='Corse' value='Corse' />
        <Picker.Item label='Grand Est' value='Grand Est' />
        <Picker.Item label='Guadeloupe' value='Guadeloupe' />
        <Picker.Item label='Guyane' value='Guyane' />
        <Picker.Item label='Hauts-de-France' value='Hauts-de-France' />
        <Picker.Item label='Île-de-France' value='Île-de-France' />
        <Picker.Item label='Martinique' value='Martinique' />
        <Picker.Item label='Mayotte' value='Mayotte' />
        <Picker.Item label='Normandie' value='Normandie' />
        <Picker.Item label='Nouvelle-Aquitaine' value='Nouvelle-Aquitaine' />
        <Picker.Item label='Occitanie' value='Occitanie' />
        <Picker.Item label='Pays de la Loire' value='Pays de la Loire' />
        <Picker.Item
          label="Provence-Alpes-Côte d'Azur"
          value="Provence-Alpes-Côte d'Azur"
        />
        <Picker.Item label='Réunion' value='Réunion' />
      </Picker>
      <Text style={{ paddingBottom: '10%' }}>Ta région: {selectedValue}</Text>
    </View>
  );
}

export default CustomRegionPicker;

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
