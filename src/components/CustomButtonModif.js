import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Input, Button } from "react-native-elements";

// On crée un composant qui pourra être injecté partout dans l'application car nous avons de nombreux inputs
// on passe en argument toutes les valeurs que l'on va changer d'un input à l'autre
const CustomButtonModif = ({ onPress, title }) => {
  return (
    <Button
      title={title}
      containerStyle={{
        width: 90,
      }}
      onPress={onPress}
      buttonStyle={{
        backgroundColor: "#ff8b00",
        borderRadius: 15,
        // height: "100%",
      }}
      titleStyle={{
        color: "#363432",
        fontWeight: "bold",
        fontSize: 12,
      }}
    />
  );
};

// const styles = StyleSheet.create({
//   container: {},
//   text: {},
// });

export default CustomButtonModif;
