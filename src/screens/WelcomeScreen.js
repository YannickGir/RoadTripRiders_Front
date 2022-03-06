import React from "react";
import { StyleSheet, Button, View, Text } from "react-native";

export default function WelcomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>bienvenue dans la communauté !</Text>
      <Text>On ne te connaît pas assez! Complète ton profil de motard.</Text>

      <CustomButton
        title="COMPLETER MON PROFIL"
        onPress={() => props.navigation.navigate("UserInfos")}
      />
    </View>
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
