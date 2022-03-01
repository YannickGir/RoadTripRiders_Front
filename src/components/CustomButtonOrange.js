import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

//ici même principe que sur le composant Input, on crée un bouton générique que l'on va pouvoir réutiliser partout dans l'application.
//Tous les champs modifiables deviennent donc des variables

const CustomButtonOrange = ({ title, onPress }) => {
  return (
    <Button
      title={title}
      containerStyle={{
        height: 40,
        width: 300,
        marginHorizontal: 50,
        marginVertical: 10,
      }}
      onPress={onPress}
      buttonStyle={{ backgroundColor: "#ff8b00", borderRadius: 15 }}
      titleStyle={{
        color: "#FEFAEA",
        marginHorizontal: 20,
        fontWeight: "bold",
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {},
});

export default CustomButtonOrange;
