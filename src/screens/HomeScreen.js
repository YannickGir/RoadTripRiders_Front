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
  Platform,
} from "react-native";
import { MA_VARIABLE } from "@env";
import { connect } from "react-redux";
import CustomHeaderNoArrow from "../components/CustomHeaderNoArrow";
import CustomButton from "../../src/components/CustomButton";
import {
  Card,
  Text,
  Overlay,
  Rating,
  RatingProps,
} from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../../src/components/CustomInput";
import LoadingOverlay from "../../src/components/LoadingOverlay";
import { Header as HeaderRNE } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomButtonOrange from "../../src/components/CustomButtonOrange";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

type RatingsComponentProps = {};

function HomepageScreen(props) {
  const [roadTripList, setRoadTripList] = useState([]);
  const [visible, setVisible] = useState(false);
  const ratingCompleted = (rating: number) => {
    console.log("Rating is: " + rating);
  };
  const ratingProps = {};
  useEffect(() => {
    async function loadUserData() {
      const dataUser = await fetch(
        `https://roadtripridersyann.herokuapp.com/users/user-data?token=${props.token}`
      );
      var bodyUser = await dataUser.json();
      props.onSubmitUserData({
        avatar: bodyUser.userData.user_photo,
        username: bodyUser.userData.firstname,
      });
    }
    loadUserData();
  }, [props.token]);

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
      // console.log("body", body);

      setRoadTripList(
        body.map((tripData, i) => {
          var durationHour = secToTime(tripData.duration);
          var durationHour2 = durationHour.slice(0, -1);
          var km = parseInt(tripData.distance);
          console.log(
            "tripData.rating.$numberDecimal",
            tripData.rating.$numberDecimal
          );
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
                  <Rating
                    type="custom"
                    ratingColor="#f1c40f"
                    tintColor="#FFEDAC"
                    readonly
                    ratingCount={5}
                    startingValue={tripData.rating.$numberDecimal}
                    imageSize={15}
                    onFinishRating={ratingCompleted}
                    style={{ alignSelf: "flex-start" }}
                  />
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
    <SafeAreaProvider>
      <HeaderRNE
        backgroundColor="#FFD230"
        centerComponent={{
          text: "SORTIES À VENIR",
          style: styles.heading,
        }}
      />

      <Overlay isVisible={visible} style={styles.image}>
        <Image source={require("../Loading_overlay.gif")} />
      </Overlay>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Overlay isVisible={visible} style={styles.image}>
          <Image source={require("../Loading_overlay.gif")} />
        </Overlay>
        {roadTripList}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <CustomButton
          title="CREER UN TRIP"
          onPress={() =>
            props.navigation.navigate("newRoadTripFirstStep", {
              itinerary_id: "",
            })
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaProvider>
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
  heading: {
    color: "#363432",
    fontSize: 22,
    fontWeight: "bold",
  },
});

function mapStateToProps(state) {
  console.log("HOMESCREEN", state.token, state);
  return { token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitUserData: function (userDataObject) {
      dispatch({ type: "saveUserData", userData: userDataObject });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageScreen);
