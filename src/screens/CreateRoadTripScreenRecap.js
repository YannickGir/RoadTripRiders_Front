import React, { useState, Component, useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  useWindowDimensions,
  Dimensions,
  Switch,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import CustomTimeNewTripInput from "../components/CustomTimeNewTripInput";
import CustomNewTripInput from "../components/CustomNewTripInput";
import CustomButtonOrange from "../components/CustomButtonOrange";
import CustomButtonOrangeNext from "../components/CustomButtonOrangeNext";
import CustomHeader from "../components/CustomHeader";
import CustomButtonValidation from "../components/CustomButtonValidation";
import CustomButtonChoice from "../components/CustomButtonChoice";
import CustomButtonChoiceValidate from "../components/CustomButtonChoiceValidate";
import CustomHeaderNoArrow from "../components/CustomHeaderNoArrow";
import CustomTextBackground from "../components/CustomTextBackground";
import CustomButtonModif from "../components/CustomButtonModif";

//------------pour barre de progression----nb installé : npm install react-native-step-indicator --save   -----------------------
import StepIndicator from "react-native-step-indicator";
import { color } from "react-native-elements/dist/helpers";
const labels = [
  "Cart",
  "Delivery Address",
  "Order Summary",
  "Payment Method",
  "Track",
];

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#ff8b00",
  stepStrokeUnFinishedColor: "#363432",
  separatorFinishedColor: "#ff8b00",
  separatorUnFinishedColor: "#363432",
  stepIndicatorFinishedColor: "#ff8b00",
  stepIndicatorUnFinishedColor: "#363432",
  stepIndicatorCurrentColor: "#FEFAEA",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#ff8b00",
  stepIndicatorLabelFinishedColor: "#FEFAEA",
  stepIndicatorLabelUnFinishedColor: "#FEFAEA",
  labelSize: 13,
};

export default function CreateRoadTripScreenFirstStep(props) {
  // On définit ici les variables d'état qui vont nous servir à enregistrer les valeurs des inputs
  const [event_title, setEvent_title] = useState("");
  const [date_sortie, setDate_sortie] = useState("");

  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();

  const [formProgress, setFormProgress] = useState(0);
  const [toggleButton, setToggleButton] = useState(false);

  return (
    //------------------------------------------ FIRST STEP PAGE---------------------
    <View style={styles.container}>
      <CustomHeaderNoArrow
        onPress={() =>
          props.navigation.navigate("RoadtripList", {
            screen: "RoadtripListScreen",
          })
        }
        title="RECAP DE TON TRIP"
      />
      <View style={styles.barprogress}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={3}
          stepCount={3}
        />
      </View>

      <View style={styles.switch}>
        <Text> Privé </Text>
        <Switch
          trackColor={{ false: "#363432", true: "teal" }}
          thumbColor="#FF8B00"
          ios_backgroundColor="#FEFAEA"
          onValueChange={(value) => setToggleButton(value)}
          value={toggleButton}
        />
        <Text> Public </Text>
      </View>

      <View style={{ paddingBottom: 10, paddingTop: 10 }}>
        <CustomTextBackground
          text1="Titre:"
          text2="               En avant !"
        />
        <CustomTextBackground text1="Date de départ:" text2="06/07/2022" />
        <CustomTextBackground text1="Heure de départ:" text2="09:00" />
        <CustomTextBackground text1="Heure d'arrivée:" text2="18:00 " />
        <CustomTextBackground text1="Type de ballade:" text2="Cool" />
        <CustomTextBackground text1="Type de moto:" text2="    Roadster" />
        <CustomTextBackground text1="Taille du groupe:" text2="10" />
      </View>

      <View style={styles.carte}>
        <CustomButtonModif />
        <Image source={require("../carte_trajet.jpg")} />
      </View>

      {/* VALIDATION DU TRIP */}

      <View style={{ marginBottom: "1%" }}>
        <CustomButtonValidation
          title="C'EST PARTI !"
          onPress={() =>
            props.navigation.navigate("RoadtripList", {
              screen: "RoadtripListScreen",
            })
          }
        />
      </View>
    </View>
  );
}
// onPageChange(position);
// this.setState({ currentPosition: position });

const styles = StyleSheet.create({
  switch: {
    width: deviceWidth,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  bottomPage: {
    width: deviceWidth,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: "10%",
  },

  barprogress: {
    width: deviceWidth,
    backgroundColor: "#FEFAEA",
    paddingTop: "1%",
    marginBottom: "1%",
  },
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  carte: {
    flexDirection: "column",
    alignItems: "center",
    maxHeight: "auto",
    width: "70%",
  },
});
