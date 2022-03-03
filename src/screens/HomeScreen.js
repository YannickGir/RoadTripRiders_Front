import React from "react";
import { StyleSheet, Button, View, Text, Icon } from "react-native";

export default function HomepageScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Homepage Screen</Text>
      <Button
        icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
        title="go to itinerary !"
        type="solid"
        onPress={() =>
          props.navigation.navigate("Itinerary", {
            screen: "ItineraryScreen",
          })
        }
      />
      <Button
        icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
        title="go to roadtripList !"
        type="solid"
        onPress={() =>
          props.navigation.navigate("RoadtripList", {
            screen: "RoadtripListScreen",
          })
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
