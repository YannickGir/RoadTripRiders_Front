import React from "react";
import { StyleSheet, Button, View, Text } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>
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
