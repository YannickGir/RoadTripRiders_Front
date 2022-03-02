import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import React from 'react';

//ici même principe que sur le composant Input, on crée un bouton générique que l'on va pouvoir réutiliser partout dans l'application.
//Tous les champs modifiables deviennent donc des variables

const CustomDateButton = ({ title, onPress }) => {
  return (
    <Button
      title={title}
      icon={{
        name: 'chevron-down',
        type: 'font-awesome',
        size: 15,
        color: '#FEFAEA',
      }}
      iconRight
      containerStyle={{
        height: 40,
        width: 150,
        marginHorizontal: 50,
        marginVertical: 10,
      }}
      onPress={onPress}
      buttonStyle={{ backgroundColor: '#363432', borderRadius: 15 }}
      titleStyle={{
        color: '#FEFAEA',
        marginHorizontal: 20,
        fontWeight: 'bold',
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {},
});

export default CustomDateButton;
