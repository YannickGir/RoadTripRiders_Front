import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';

//ici même principe que sur le composant Input, on crée un bouton générique que l'on va pouvoir réutiliser partout dans l'application.
//Tous les champs modifiables deviennent donc des variables

const CustomButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Button
        title={title}
        containerStyle={{
          height: 40,
          width: 300,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{ backgroundColor: '#363432', borderRadius: 15 }}
        titleStyle={{
          color: '#FEFAEA',
          marginHorizontal: 20,
          fontWeight: 'bold',
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {},
});

export default CustomButton;
