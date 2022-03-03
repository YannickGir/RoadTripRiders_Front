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
    //------------------------------------------ FIRST STEP PAGE---------------------
    <View style={styles.container}>
      <CustomHeader
        onPress={() =>
          props.navigation.navigate("Homepage", { screen: "HomeScreen" })
        }
      />
      <View style={styles.barprogress}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={formProgress}
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
            placeholder="9:00"
            value={date_sortie}
            setValue={setDate_sortie}
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

      {/* CHOIX ITINERAIRE */}
      <View
        style={{
          alignItems: "center",
          height: "30%",
          marginTop: "5%",
        }}
      >
        <View style={{ marginBottom: "3%" }}>
          <CustomButtonOrange
            title="NOUVEL ITINERAIRE"
            onPress={() => props.navigation.navigate("newRoadTripFirstStep")}
          />
          <CustomButton
            title="ITINERAIRE PROPOSE"
            onPress={() => props.navigation.navigate("newRoadTripFirstStep")}
          />
        </View>
        <View style={{ marginTop: "15%" }}>
          <Text>Aucun itinéraire choisit ou créé</Text>
        </View>
      </View>

      {/* FLECHE PAGE SUIVANTE */}
      <View style={styles.bottomPage}>
        <View style={{ marginHorizontal: "40%" }}></View>
        <View style={{ marginTop: "10%", marginBottom: "5%" }}>
          <CustomButtonOrangeNext
            title="NOUVEL ITINERAIRE"
            onPress={
              (() =>
                props.navigation.navigate("I", {
                  screen: "RoadtripListScreen",
                }),
              () => setFormProgress(1))
            }
          />
        </View>
      </View>
    </View>

    //------------------------------------------ END OF FIRST STEP PAGE---------------------

    //------------------------------------------ THIRD STEP PAGE---------------------

    // <View style={styles.container}>
    //   <CustomHeader
    //     onPress={() =>
    //       props.navigation.navigate("RoadtripList", {
    //         screen: "RoadtripListScreen",
    //       })
    //     }
    //     title="CREE TON TRIP"
    //   />
    //   <View style={styles.barprogress}>
    //     <StepIndicator
    //       customStyles={customStyles}
    //       currentPosition={formProgress}
    //       stepCount={3}
    //     />
    //   </View>

    //   <View style={styles.switch}>
    //     <Text> Privé </Text>
    //     <Switch
    //       trackColor={{ false: "#363432", true: "teal" }}
    //       thumbColor="#FF8B00"
    //       ios_backgroundColor="#FEFAEA"
    //       onValueChange={(value) => setToggleButton(value)}
    //       value={toggleButton}
    //     />
    //     <Text> Public </Text>
    //   </View>

    //   <View style={{ paddingBottom: 10, paddingTop: 10 }}>
    //     <CustomTimeNewTripInput2
    //       placeholder="Titre de votre Roadtrip"
    //       value={event_title}
    //       setValue={setEvent_title}
    //     />
    //     <CustomTimeNewTripInput2
    //       placeholder="Date de départ"
    //       value={date_sortie}
    //       setValue={setDate_sortie}
    //     />
    //   </View>

    //   <Text style={{ paddingTop: 5 }}>Horaires :</Text>
    //   <View style={styles.horaires}>
    //     <View style={{ alignItems: "center" }}>
    //       <Text>Départ :</Text>
    //       <CustomTimeNewTripInput
    //         placeholder="9:00"
    //         value={date_sortie}
    //         setValue={setDate_sortie}
    //       />
    //     </View>
    //     <Text> </Text>
    //     <View style={{ alignItems: "center" }}>
    //       <Text>Arrivée :</Text>
    //       <CustomTimeNewTripInput
    //         placeholder="16:00"
    //         value={date_sortie}
    //         setValue={setDate_sortie}
    //       />
    //     </View>
    //   </View>

    //   {/* CHOIX ITINERAIRE */}
    //   <View
    //     style={{
    //       alignItems: "center",
    //       height: "30%",
    //       marginTop: "5%",
    //     }}
    //   >
    //     <View style={{ marginBottom: "3%" }}>
    //       <CustomButtonOrange
    //         title="NOUVEL ITINERAIRE"
    //         onPress={() => props.navigation.navigate("newRoadTripFirstStep")}
    //       />
    //       <CustomButton
    //         title="ITINERAIRE PROPOSE"
    //         onPress={() => props.navigation.navigate("newRoadTripFirstStep")}
    //       />
    //     </View>
    //     <View style={{ marginTop: "15%" }}>
    //       <Text>Aucun itinéraire choisit ou créé</Text>
    //     </View>
    //   </View>

    //   {/* FLECHE PAGE SUIVANTE */}
    //   <View style={styles.bottomPage}>
    //     <View style={{ marginHorizontal: "40%" }}></View>
    //     <View style={{ marginTop: "10%", marginBottom: "5%" }}>
    //       <CustomButtonOrangeNext
    //         title="NOUVEL ITINERAIRE"
    //         onPress={
    //           (() => props.navigation.navigate("newRoadTripFirstStep"),
    //           () => setFormProgress(1))
    //         }
    //       />
    //     </View>
    //   </View>
    // </View>

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
