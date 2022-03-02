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
import CustomTimeNewTripInput2 from "../components/CustomTimeNewTripInput2";
import CustomButtonOrange from "../components/CustomButtonOrange";

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

  // const [formProgress, setFormProgress] = useState(0);
  const [toggleButton, setToggleButton] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: "#363432",
            fontFamily: "poppins",
            fontWeight: "bold",
          }}
        >
          CREE TON TRIP
        </Text>
      </View>

      <View style={styles.barprogress}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={2}
          stepCount={5}
        />
      </View>

      <Switch
        trackColor={{ false: "#363432", true: "teal" }}
        thumbColor="#FF8B00"
        ios_backgroundColor="#FEFAEA"
        onValueChange={() => setToggleButton(true)}
      />

      <View style={{ paddingBottom: 10, paddingTop: 10 }}>
        <CustomTimeNewTripInput2
          placeholder="Titre de votre Roadtrip"
          value={event_title}
          setValue={setEvent_title}
        />
        <CustomTimeNewTripInput2
          placeholder="Date de départ"
          value={date_sortie}
          setValue={setDate_sortie}
        />
      </View>

      <Text style={{ paddingTop: 5 }}>Horaires :</Text>
      <View style={styles.horaires}>
        <View style={{ alignItems: "center" }}>
          <Text>Départ :</Text>
          <CustomTimeNewTripInput
            placeholder="09:00"
            value={event_title}
            setValue={setEvent_title}
          />
        </View>
        <Text> </Text>
        <View style={{ alignItems: "center" }}>
          <Text>Arrivée :</Text>
          <CustomTimeNewTripInput
            placeholder="16:00"
            value={date_sortie}
            setValue={setDate_sortie}
          />
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={{ marginBottom: 20 }}>
          <CustomButtonOrange
            title="NOUVEL ITINERAIRE"
            onPress={() => props.navigation.navigate("newRoadTripFirstStep")}
          />
          <CustomButton
            title="ITINERAIRE PROPOSE"
            onPress={() => props.navigation.navigate("newRoadTripFirstStep")}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Aucun itinéraire choisit ou créé</Text>
        </View>
      </View>
    </View>
  );
}
// onPageChange(position);
// this.setState({ currentPosition: position });

const styles = StyleSheet.create({
  header: {
    width: deviceWidth,
    marginBottom: 5,
    marginTop: 5,
    flex: 1,
    backgroundColor: "#FFD230",
    padding: 20,
    alignItems: "center",
  },
  barprogress: {
    width: deviceWidth,
    flex: 1,
    backgroundColor: "#FEFAEA",
  },
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 200,
    paddingTop: 5,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  horaires: {
    flex: 2,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // padding: 30,
    justifyContent: "space-between",
    paddingBottom: 5,
  },
});
