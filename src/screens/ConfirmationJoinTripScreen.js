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
import { MA_VARIABLE } from "@env";
import { useIsFocused } from "@react-navigation/native";

// fin import pour le header

import LogInScreen from "./LogInScreen";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

function ConfirmationJoinTripScreen(props) {
  const [tripId, setTripId] = useState(props.route.params.tripId);
  console.log("tripid", tripId);
  const isFocused = useIsFocused();

  const [button, setButton] = useState();
  useEffect(() => {
    async function loadConversations() {
      const data = await fetch(
        `${MA_VARIABLE}/inbox/readOneconversation?tripId=${tripId}`
      );
      var body = await data.json();
      console.log("body", body);

      if (body) {
        return setButton(
          <CustomButton
            title="VOIR LA DISCUSSION"
            onPress={() =>
              props.navigation.navigate("Chat", {
                conversation_id: body._id,
              })
            }
          />
        );
      }
    }

    loadConversations();
  }, []);

  return (
    <SafeAreaProvider
      style={{ height: deviceHeight, backgroundColor: "#FEFAEA" }}
    >
      <HeaderRNE
        backgroundColor="#FFD230"
        centerComponent={{
          text: "ROADTRIP REJOINS!",
          style: styles.heading,
        }}
      />

      <Card
        containerStyle={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFD230",

          borderRadius: 15,
          marginTop: "5%",
          width: "90%",
          position: "absolute",
          bottom: "50%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 50 }}>🎉</Text>

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Félicitations {props.userData.username}!
            </Text>

            <View style={{ width: "90%", alignItems: "center" }}>
              <Text>Vous aves rejoins le roadtrip !</Text>
              <Text>
                Allez voir dans vos discusSions et discuter avec les autres
                participants!
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <View style={{ position: "absolute", bottom: 0 }}>
        {button}
        <CustomButton
          title="RETOUR A L'ACCUEIL"
          onPress={() =>
            props.navigation.navigate("HomeScreen", {
              screen: "HomeScreen",
            })
          }
        />
      </View>
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

function mapStateToProps(state) {
  return {
    data_new_roadtrip: state.data_new_roadtrip,
    token: state.token,
    userData: state.userData,
  };
}

export default connect(mapStateToProps, null)(ConfirmationJoinTripScreen);
