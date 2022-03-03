import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
//ici même principe que sur le composant Input, on crée un bouton générique que l'on va pouvoir réutiliser partout dans l'application.
//Tous les champs modifiables deviennent donc des variables

const CustomHeaderNoArrow = ({ title, onPress }) => {
  return (
    <View style={styles.header}>
      <Text
        style={{
          color: "#363432",
          fontFamily: "poppins",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: deviceWidth,
    flex: 1,
    backgroundColor: "#FFD230",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "8%",
  },
  container: {},
  text: {},
});

export default CustomHeaderNoArrow;
