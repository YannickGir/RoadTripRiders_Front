import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const ImageUploadComponent = () => {
  return (
    <View style={StyleSheet.container}>
      <TouchableOpacity style={StyleSheet.uploadBtnContainer}>
        <Text style={StyleSheet.uploadBtn}>Télécharger un avatar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtnContainer: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 1,
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.5,
    fontWeight: 'bold',
  },
});

export default ImageUploadComponent;
