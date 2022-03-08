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
import CustomHeaderNoArrow from "../components/CustomHeaderNoArrow";
import CustomButton from "../../src/components/CustomButton";
import { Card, Text, Overlay } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../../src/components/CustomInput";
import LoadingOverlay from "../../src/components/LoadingOverlay";
import CustomButtonOrange from "../../src/components/CustomButtonOrange";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
export default function HomepageScreen(props) {
  const [roadTripList, setRoadTripList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [sectotime, setSectotime] = useState("");
  const secToTime = (totalsecondes) => {
    hours = Math.floor(totalsecondes / 3600);
    totalsecondes %= 3600;
    minutes = Math.floor(totalsecondes / 60);
    seconds = Math.floor(totalsecondes % 60);
    return hours + "h:" + minutes + "min:";
  };
  useEffect(() => {
    async function loadRoadTrip() {
      const data = await fetch(
        `https://roadtripridersyann.herokuapp.com/roadtriplist`
      );
      var body = await data.json();
      console.log("body", body);

      setRoadTripList(
        body.map((tripData, i) => {
          var durationHour = secToTime(tripData.duration);
          var durationHour2 = durationHour.slice(0, -1);
          var km = parseInt(tripData.distance);
          console.log("tripdata", tripData);
          return (
            <TouchableOpacity
              key={i}
              onPress={() =>
                props.navigation.navigate("RoadTripDetails", {
                  trip_id: tripData._id,
                  itinerary_id: tripData.itinerary_id,
                })
              }
            >
              <Card containerStyle={styles.card}>
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
                    <Text
                      style={{
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 15,
                      }}
                    >
                      {km} km
                    </Text>
                  </View>
                  <View>
                    <Text>Durée :</Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 15,
                      }}
                    >
                      {durationHour2}
                    </Text>
                  </View>
                  <View>
                    <Text>Niveau :</Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 15,
                      }}
                    >
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
      <CustomHeaderNoArrow
        containerStyle={{ paddingTop: 100 }}
        title="Sorties"
      />
      <Overlay isVisible={visible} style={styles.image}>
        <Image source={require("../Loading_overlay.gif")} />
      </Overlay>
      <ScrollView style={{ flex: 1, width: "100%" }}>{roadTripList}</ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <CustomButton title="CREER UN TRIP" />
        <CustomButtonOrange
          icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
          title="go to itinerary !"
          type="solid"
          onPress={() =>
            props.navigation.navigate("Itinerary", {
              screen: "ItineraryScreen",
            })
          }
        />

        <CustomButtonOrange
          title="go to roadtripList !"
          onPress={async () => (
            setVisible(true),
            props.navigation.navigate("RoadtripList", {
              screen: "RoadtripListScreen",
            })
          )}
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
    paddingTop: "10%",
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: "#FFEDAC",
    borderRadius: 15,
  },

  image: {
    width: null,
    resizeMode: "contain",
    height: 220,
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
