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
    <View style={styles.container}>
      <CustomHeader
        onPress={() =>
          props.navigation.navigate("Homepage", { screen: "HomeScreen" })
        }
        title="SORTIES"
      />
      <View style={styles.barprogress}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={formProgress}
          stepCount={3}
        />
      </View>

      <Text style={{ paddingTop: 5 }}>ici liste des sorties :</Text>

      {/* CHOIX ITINERAIRE */}
      <View
        style={{
          alignItems: "center",
          height: "30%",
          marginTop: "5%",
        }}
      >
        <CustomButton
          title="CREER UN TRIP"
          onPress={() => props.navigation.navigate("newRoadTripFirstStep")}
        />
      </View>
    </View>

    //------------------------------------------ END OF SECOND STEP PAGE---------------------
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
    // marginTop: "10%",
  },

  barprogress: {
    width: deviceWidth,
    backgroundColor: "#FEFAEA",
    paddingTop: 15,
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
  horaires: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    maxHeight: 80,
  },
});
