import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

//ici même principe que sur le composant Input, on crée un bouton générique que l'on va pouvoir réutiliser partout dans l'application.
//Tous les champs modifiables deviennent donc des variables

const CustomButtonChoice = ({ title, onPress }) => {
  return (
    <Button
      title={title}
      containerStyle={{
        width: 80,
      }}
      onPress={onPress}
      buttonStyle={{
        backgroundColor: "#363432",
        borderRadius: 15,
        height: "100%",
      }}
      titleStyle={{
        color: "#FEFAEA",
        marginHorizontal: 10,
        fontWeight: "bold",
        fontSize: 10,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {},
});

export default CustomButtonChoice;
