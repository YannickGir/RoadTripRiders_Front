import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

//ici même principe que sur le composant Input, on crée un bouton générique que l'on va pouvoir réutiliser partout dans l'application.
//Tous les champs modifiables deviennent donc des variables

export default function LoadingOverlay(isVisible) {
  return (
    <Overlay isVisible={isvisible} width="auto" height="auto">
      <Image source={require("../Loading_overlay.gif")} />
    </Overlay>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
  },
});
