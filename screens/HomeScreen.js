import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";
import React from "react";

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Button
        title="Go page A"
        onPress={() => props.navigation.navigate("PageA")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e67e22",
    alignItems: "center",
    justifyContent: "center",
  },
});
