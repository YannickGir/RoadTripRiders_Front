import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Button,
  View,
  Platform,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { MA_VARIABLE } from "@env";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Header as HeaderRNE, HeaderProps, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import CustomButtonModif from "../components/CustomButtonModif";
import Logo from "../../assets/images/tinyLogoRR.png";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export default function RidersAroundScreen(props) {
  const captureViewRef = useRef();

  const [myLocation, setMyLocation] = useState({
    latitude: 43.2943,
    longitude: 5.3727277,
  });
  const [ridersAroundList, setRidersAroundList] = useState(<></>);

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
      }
    }

    askPermissions();
  }, []);

  useEffect(() => {
    async function results() {
      var rayon = 30;
      const data = await fetch(`${MA_VARIABLE}/users/find-riders`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `latitudeFromFront=${myLocation.latitude}&longitudeFromFront=${myLocation.longitude}&rayon=${rayon}`,
      });
      const body = await data.json();
      console.log("body", body);
      captureViewRef.current.animateToRegion({
        latitude: myLocation.latitude,
        longitude: myLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      setRidersAroundList(
        body.usersAround.map((userData, i) => {
          if (Platform.OS === "android") {
            console.log("android detecté");
            return (
              <Marker
                key={i}
                size={10}
                pinColor="#ff8b00"
                coordinate={{
                  latitude: userData.user_latitude,
                  longitude: userData.user_longitude,
                }}
                //title={`${userData.firstname} ${userData.lastname}, ${userData.user_city}`}
                //description={`Catégorie : ${userData.user_bikes[0].type} (${userData.user_bikes[0].brand} ${userData.user_bikes[0].model})`}
              >
                <View style={{ borderRadius: 10 }}>
                  <Callout
                    onPress={() =>
                      props.navigation.navigate("OtherRiderProfil", {
                        otherUserId: userData._id,
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: 250,
                        alignItems: "flex-start",
                      }}
                    >
                      <WebView
                        style={{ width: 250, height: 150 }}
                        source={{
                          html: `<img src='${userData.user_photo}' width="200" height="200" style="border-radius:500px  "/>${userData.firstname} ${userData.lastname}, ${userData.user_city}`,
                        }}
                      ></WebView>
                    </View>
                  </Callout>
                </View>
              </Marker>
            );
          } else {
            console.log("iOS detecté");

            return (
              <Marker
                key={i}
                size={10}
                pinColor="#ff8b00"
                coordinate={{
                  latitude: userData.user_latitude,
                  longitude: userData.user_longitude,
                }}
                //title={`${userData.firstname} ${userData.lastname}, ${userData.user_city}`}
                //description={`Catégorie : ${userData.user_bikes[0].type} (${userData.user_bikes[0].brand} ${userData.user_bikes[0].model})`}
              >
                <Callout
                  onPress={() =>
                    props.navigation.navigate("OtherRiderProfil", {
                      otherUserId: userData._id,
                    })
                  }
                >
                  <View
                    style={{ alignItems: "center", alignContent: "center" }}
                  >
                    <Text>
                      <Image
                        source={{ uri: userData.user_photo }}
                        style={{ height: 100, width: 100, borderRadius: 500 }}
                        resizeMode="cover"
                      />
                    </Text>
                    <Text>
                      {userData.firstname} {userData.lastname}
                    </Text>
                    <CustomButtonModif
                      title="VOIR LE PROFIL"
                      onPress={() =>
                        props.navigation.navigate("OtherRiderProfil", {
                          otherUserId: userData._id,
                        })
                      }
                    />
                  </View>
                </Callout>
              </Marker>
            );
          }
        })
      );
    }
    results();
  }, [myLocation]);
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
      <MapView
        ref={captureViewRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 46.866667, // pour centrer la carte
          longitude: 2.333333,
          latitudeDelta: 7.5, // le rayon à afficher à partir du centre
          longitudeDelta: 7.5,
        }}
        zoomEnabled={true}
      >
        {ridersAroundList}
      </MapView>
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
