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
import { connect } from "react-redux";
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
import CreateRoadTripScreenRecap from "./CreateRoadTripScreenRecap";

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

function CreateRoadTripScreenFirstStep(props) {
  // On définit ici les variables d'état qui vont nous servir à enregistrer les valeurs des inputs
  const [event_title, setEvent_title] = useState("");
  const [date_sortie, setDate_sortie] = useState("");

  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();

  // Barre de progression
  const [formProgress, setFormProgress] = useState(0);
  const [toggleButton, setToggleButton] = useState(false);
  const [stepScreen, setStepScreen] = useState();

  //store inputs first step-------------
  const [roadtripTitle, setRoadtripTitle] = useState("");
  const [roadtripDate, setRoadtripDate] = useState("");
  const [roadtriptimeDeparture, setRoadtriptimeDeparture] = useState("");
  const [roadtriptimeArrival, setRoadtriptimeArrival] = useState("");

  //store inputs second step-------------
  const [roadtripType, setRoadtripType] = useState("Cool");
  const [roadtripMotoType, setRoadtripMotoType] = useState("Toutes catégories");
  const [roadtripSizeGroup, setRoadtripSizeGroup] = useState(0);
  const [itineraryexist, setitineraryexist] = useState(
    props.route.params.itinerary_id
  );

  console.log(roadtripType);

  //gestion des étapes---------
  //initialisation de la première étape au démarrage de la page------------------------

  var Bottom = <></>;

  Bottom = (
    <View>
      <View
        style={{
          alignItems: "center",
          height: "30%",
          marginTop: "5%",
        }}
      >
        <View style={{ marginBottom: "3%" }}>
          <Image source={require("../carte_trajet.jpg")} />
        </View>
      </View>

      <View style={styles.bottomPage}>
        <View style={{ marginHorizontal: "40%" }}></View>
        <View style={{ marginTop: "10%", marginBottom: "5%" }}>
          <CustomButtonOrangeNext
            onPress={() =>
              props.navigation.navigate("CreateRoadTripRecap", {
                screen: CreateRoadTripScreenRecap,
              })
            }
          />
        </View>
      </View>
    </View>
  );

  var pagecontent = <></>;

  if (formProgress == 0) {
    pagecontent = (
      <View style={styles.container}>
        <CustomHeader
          onPress={() =>
            props.navigation.navigate("RoadtripList", {
              screen: "RoadtripListScreen",
            })
          }
          title="CREE TON TRIP"
        />
        <View style={styles.barprogress}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={0}
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
          <CustomNewTripInput
            placeholder="Titre de votre Roadtrip"
            value={roadtripTitle}
            setValue={setRoadtripTitle}
            secureTextEntry={false}
          />
          <CustomNewTripInput
            placeholder="Date de départ"
            value={roadtripDate}
            setValue={setRoadtripDate}
          />
        </View>
        <Text style={{ paddingTop: 5 }}>Horaires :</Text>
        <View style={styles.horaires}>
          <View style={{ alignItems: "center" }}>
            <Text>Départ :</Text>
            <CustomTimeNewTripInput
              placeholder="9:00"
              value={roadtriptimeDeparture}
              setValue={setRoadtriptimeDeparture}
            />
          </View>
          <Text> </Text>
          <View style={{ alignItems: "center" }}>
            <Text>Arrivée :</Text>
            <CustomTimeNewTripInput
              placeholder="16:00"
              value={roadtriptimeArrival}
              setValue={setRoadtriptimeArrival}
            />
          </View>
        </View>
        {Bottom}
      </View>
    );
  } else if (formProgress == 1) {
    pagecontent = (
      <View style={styles.container}>
        <CustomHeader
          onPress={() =>
            props.navigation.navigate("RoadtripList", {
              screen: "RoadtripListScreen",
            })
          }
          title="CREE TON TRIP"
        />
        <View style={styles.barprogress}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={2}
            stepCount={3}
          />
        </View>
        <View style={{ marginTop: "8%" }}>
          <Text> Type de Roadtrip </Text>
        </View>
        <View style={styles.choice}>
          <CustomButtonChoiceValidate
            title={"Cool"}
            value={roadtripType}
            onPress={() => setRoadtripType("Cool")}
            secureTextEntry={false}
          />
          <CustomButtonChoice
            title={"Sportif"}
            value={roadtripType}
            onPress={() => setRoadtripType("Sportif")}
            secureTextEntry={false}
          />
          <CustomButtonChoice
            title={"Tourisme"}
            value={roadtripType}
            onPress={() => setRoadtripType("Tourisme")}
            secureTextEntry={false}
          />
        </View>

        <View
          style={{
            marginBottom: "5%",
            marginTop: "10%",
            alignItems: "center",
          }}
        >
          <Text> Pour quel type de moto ? </Text>
          <CustomNewTripInput
            placeholder="Toutes catégories"
            value={roadtripMotoType}
            setValue={setRoadtripMotoType}
          />
        </View>

        <View style={styles.tailleGroupe}>
          <View style={{ alignItems: "center" }}>
            <Text>Taille du groupe :</Text>
          </View>
          <Text> </Text>
          <View style={{ alignItems: "center" }}>
            <CustomTimeNewTripInput
              placeholder="16:00"
              value={roadtripSizeGroup}
              setValue={setRoadtripSizeGroup}
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
          <View style={styles.bottomPage3}>
            <CustomButtonValidation
              title="VALIDER !"
              onPress={() =>
                props.navigation.navigate("CreateRoadTripRecap", {
                  screen: "CreateRoadTripScreenRecap",
                })
              }
            />
          </View>
        </View>
        {Bottom}
      </View>
    );
  }

  return <View>{pagecontent}</View>;
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
  choice: {
    width: "70%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: "4%",
    marginBottom: "5%",
    marginTop: "2%",
    justifyContent: "space-between",
  },

  bottomPage: {
    width: deviceWidth,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: "10%",
    // marginTop: "10%",
  },

  bottomPage3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    maxHeight: 80,
    marginTop: "30%",
  },

  barprogress: {
    width: deviceWidth,
    backgroundColor: "#FEFAEA",
    paddingTop: "3%",
    marginBottom: "3%",
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
    maxHeight: 80,
  },

  tailleGroupe: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: "10%",
    marginTop: "10%",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitTitle: function (title) {
      dispatch({ type: "saveTitle", title: title });
    },
    onSubmitDate: function (date) {
      dispatch({ type: "saveDate", url: date });
    },
    onSubmitDepartureTime: function (departure_time) {
      dispatch({ type: "saveDepartureTime", url: departure_time });
    },
    onSubmitArrivalTime: function (arrival_time) {
      dispatch({ type: "saveArrivalTime", url: arrival_time });
    },
    onSubmitRoadtripType: function (roadtrip_type) {
      dispatch({ type: "saveRoadtripType", url: roadtrip_type });
    },
    onSubmitMotoType: function (moto_type) {
      dispatch({ type: "saveMotoType", url: moto_type });
    },
    onSubmitSizeGroup: function (size_group) {
      dispatch({ type: "saveSizeGroupe", url: size_group });
    },
  };
}

export default connect(null, mapDispatchToProps)(CreateRoadTripScreenFirstStep);