import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Platform,
  Image,
  KeyboardAvoidingView,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
// import pour le header
import { Header as HeaderRNE, Card } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
// fin import pour le header

import LogInScreen from "./LogInScreen";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

function ConfirmationNewRoadtripScreen(props) {
  useEffect(() => {
    // On vérifie s'il y a un token dans l'async storage;
    var findToken = AsyncStorage.getItem("token", function () {
      if (!findToken || findToken.length === 0) {
        console.log("Pas de token dans le store");
        props.navigation.navigate("LogIn", {
          screen: "LogInScreen",
        });
      }
    });
  }, []);

  function handleLogOut() {
    // on redirige vers l'écran de connection
    props.navigation.navigate("LogIn", {
      screen: "LogInScreen",
    });
    // on enlève le token du async storage
    AsyncStorage.removeItem("token");
    console.log("token supprimé et utilisateur déconnecté");
    // on vide le store
    props.removeToken();
  }

  return (
    <SafeAreaProvider
      style={{ height: deviceHeight, backgroundColor: "#FEFAEA" }}
    >
      <HeaderRNE
        backgroundColor="#FFD230"
        centerComponent={{
          text: "ROADTRIP CREE !",
          style: styles.heading,
        }}
      />
      <View style={styles.secondary}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFD230",
            height: 140,
            width: 340,
            borderRadius: 15,
            marginTop: "5%",
            width: "90%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ fontSize: 70, paddingRight: "5%" }}>🎉</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Félicitations
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>à toi !</Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {props.userData.username}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.secondary2}>
        <Card containerStyle={styles.card}>
          <View style={styles.titleText}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {props.data_new_roadtrip.roadtripTitle} Le{" "}
              {props.data_new_roadtrip.roadtripDate}
            </Text>
          </View>

          <Image
            size={64}
            style={styles.map}
            source={{
              uri: props.data_new_roadtrip.map_itinerary,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingTop: "5%",
            }}
          >
            <View>
              <Text>Départ :</Text>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {props.data_new_roadtrip.roadtriptimeDeparture}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>Pour :</Text>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {props.data_new_roadtrip.roadtripMotoType}
              </Text>
            </View>
            <View>
              <Text>Limité à :</Text>
              <Text
                style={{
                  alignSelf: "center",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {props.data_new_roadtrip.roadtripSizeGroup} motards
              </Text>
            </View>
          </View>
        </Card>
      </View>

      <CustomButton
        title="RETOUR A L'ACCUEIL"
        onPress={() =>
          props.navigation.navigate("HomeScreen", {
            screen: "HomeScreen",
          })
        }
      />
    </SafeAreaProvider>
  );
}

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: 300,
  },
  titleText: {
    height: "15%",
    alignItems: "center",
    textAlign: "center",
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: "#FFEDAC",
    borderRadius: 15,
    width: "90%",
    paddingBottom: "5%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFEDAC",
    padding: 12,
    height: 160,
    width: 160,
    borderRadius: 15,
    margin: 10,
  },
  secondary2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 35,
    width: 50,
    height: 50,
    position: "relative",
  },
  //style pour le header
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    color: "#363432",
    fontSize: 22,
    fontWeight: "bold",
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#FFD230",
  },

  //fin du style pour le header
});

function mapDispatchToProps(dispatch) {
  return {
    removeToken: function (token) {
      dispatch({ type: "clearToken", token: token });
    },
    onSubmitClearData: function (roadtripData) {
      dispatch({ type: "clearData" });
    },
  };
}

function mapStateToProps(state) {
  return {
    data_new_roadtrip: state.data_new_roadtrip,
    token: state.token,
    userData: state.userData,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationNewRoadtripScreen);
