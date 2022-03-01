import React from "react";
import { StyleSheet, Button, View, Text } from "react-native";

export default function HomepageScreen() {
  return (
    <View style={styles.container}>
      <Text>Homepage Screen</Text>
      <Button
        icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
        title="create roadtrip !"
        type="solid"
        onPress={() => {
          props.navigation.navigate("BottomNavigator", {
            screen: "newRoadTripFirstStep",
          });
        }}
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
