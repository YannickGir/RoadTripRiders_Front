import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Button,
  View,
  Icon,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { MA_VARIABLE } from "@env";
import { Card, Text } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../../src/components/CustomInput";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
export default function HomepageScreen(props) {
  const [roadTripList, setRoadTripList] = useState([]);
  useEffect(() => {
    async function loadRoadTrip() {
      const data = await fetch(`${MA_VARIABLE}/roadtriplist`);
      var body = await data.json();
      console.log("body", body);

      setRoadTripList(
        body.map((tripData, i) => {
          return (
            <TouchableOpacity key={i}>
              <Card
                containerStyle={{ backgroundColor: "#FFEDAC", borderRadius: 5 }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                    width: "70%",
                  }}
                >
                  <Image
                    style={styles.avatar}
                    source={{ uri: tripData.user_photo }}
                  />
                  <Text style={{ paddingLeft: "3%" }}>
                    {tripData.firstname}
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: "center",
                    width: "70%",
                    paddingBottom: "2%",
                  }}
                >
                  <Text style={styles.titleText}>{tripData.event_title}</Text>
                  <Text>
                    <FontAwesome name="star" size={14} color="black" />
                    <FontAwesome name="star" size={14} color="black" />
                    <FontAwesome name="star" size={14} color="black" />
                    <FontAwesome name="star" size={14} color="black" />
                    <FontAwesome name="star-half" size={14} color="black" />
                  </Text>
                </View>
                <Image
                  size={64}
                  style={styles.map}
                  source={{ uri: tripData.screenMap }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View>
                    <Text>Distance :</Text>
                    <Text style={{ alignSelf: "center" }}>
                      {tripData.distance}
                    </Text>
                  </View>
                  <View>
                    <Text>Durée :</Text>
                    <Text style={{ alignSelf: "center" }}>
                      {tripData.duration}
                    </Text>
                  </View>
                  <View>
                    <Text>Niveau :</Text>
                    <Text style={{ alignSelf: "center" }}>
                      {tripData.driving_type}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })
      );
    }

    loadRoadTrip();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: "100%" }}>{roadTripList}</ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
    width: deviceWidth,
  },
  avatar: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 35,
    width: 50,
    height: 50,
    position: "relative",
  },
  map: {
    width: "100%",
    height: 150,
    paddingTop: "2%",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
