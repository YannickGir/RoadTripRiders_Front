import React from "react";
import { StyleSheet, Button, View, Text, Image } from "react-native";

export default function LoadingScreen() {
  return (
    <Overlay isVisible={visible} width="auto" height="auto">
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
