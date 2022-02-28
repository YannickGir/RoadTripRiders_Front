import React from "react";
import { StyleSheet, Button, View, Text } from "react-native";

export default function LogInScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Log in screen</Text>
      <Button
        title="Go to Homepage"
        onPress={() =>
          props.navigation.navigate("BottomNavigator", { screen: "Homepage" })
        }
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
