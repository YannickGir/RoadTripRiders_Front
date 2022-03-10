import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Header as HeaderRNE, HeaderProps, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Logo from "../../assets/images/tinyLogoRR.png";
import { AntDesign } from "@expo/vector-icons";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export default function RidersAroundScreen(props) {
  const [myLocation, setMyLocation] = useState({
    latitude: 43.2943,
    longitude: 5.3727277,
  });
  const [mapDisplay, setMapDisplay] = useState(
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 46.866667, // pour centrer la carte
        longitude: 2.333333,
        latitudeDelta: 7.5, // le rayon à afficher à partir du centre
        longitudeDelta: 7.5,
      }}
      zoomEnabled={true}
    ></MapView>
  );
  useEffect(() => {
    async function askPermissions() {
      var { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        var location = await Location.getCurrentPositionAsync({});
        console.log("location", location);
        setMyLocation(location.coords);
        setMapDisplay(
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.coords.latitude, // pour centrer la carte
              longitude: location.coords.longitude,
              latitudeDelta: 0.0622, // le rayon à afficher à partir du centre
              longitudeDelta: 0.0421,
            }}
            zoomEnabled={true}
          ></MapView>
        );
      }
    }

    askPermissions();
  }, []);

  return (
    <SafeAreaProvider>
      <HeaderRNE
        backgroundColor="#FFD230"
        centerComponent={{
          text: "TROUVE DES RIDERS",
          style: styles.heading,
        }}
        rightComponent={
          <View style={styles.headerRight}>
            <Image source={Logo} style={styles.logo2} />
          </View>
        }
      />
      {/* <HeaderRNE
        backgroundColor="#FFD230"
        leftComponent={{
          icon: "location-outline",
          type: "ionicon",

          color: "#363432",
        }}
        centerComponent={{
          text: "TROUVER DES RIDERS",
          style: styles.heading,
        }}
      /> */}
      {mapDisplay}
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    fontSize: 22,
    width: "100%",
    paddingVertical: "2%",
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
  },
  logo2: {
    width: "50%",
    height: "700%",
    marginBottom: "7%",
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#FFD230",
  },
});
