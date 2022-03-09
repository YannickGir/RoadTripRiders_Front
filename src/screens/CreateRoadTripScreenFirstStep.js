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
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Card, Overlay, Rating, RatingProps } from "react-native-elements";
import { Header as HeaderRNE } from "react-native-elements";
import { RadioButton } from "react-native-paper";
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
import { MA_VARIABLE } from "@env";
import CustomBikeCategPicker2 from "../components/CustomBikeCategPicker2";
import CustomTimer from "../components/CustomTimer";
import CustomDatePicker from "../components/CustomDatePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-datepicker";
import TimePicker from "react-native-simple-time-picker";

//------------pour barre de progression----nb installé : npm install react-native-step-indicator --save   -----------------------
import StepIndicator from "react-native-step-indicator";
import { color } from "react-native-elements/dist/helpers";
import CustomButtonModif from "../components/CustomButtonModif";
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
  const [toggleButton, setToggleButton] = useState(true);
  const [stepScreen, setStepScreen] = useState();

  //store inputs first step-------------
  const [roadtripTitle, setRoadtripTitle] = useState(
    props.data_new_roadtrip.roadtripTitle
  );
  const [roadtripDate, setRoadtripDate] = useState(
    props.data_new_roadtrip.roadtripDate
  );
  const [roadtriptimeDeparture, setRoadtriptimeDeparture] = useState(
    props.data_new_roadtrip.roadtriptimeDeparture
  );
  const [roadtriptimeArrival, setRoadtriptimeArrival] = useState(
    props.data_new_roadtrip.roadtriptimeArrival
  );

  //store inputs second step-------------
  const [roadtripType, setRoadtripType] = useState("Cool");
  const [roadtripMotoType, setRoadtripMotoType] = useState("Toutes catégories");
  const [roadtripSizeGroup, setRoadtripSizeGroup] = useState(0);
  const [itineraryexist, setItineraryexist] = useState(
    props.route.params.itinerary_id
  );
  console.log(
    "props.route.params.itinerary_id",
    props.route.params.itinerary_id
  );
  const [userBikeCateg, setuserBikeCateg] = useState(""); //catégorie de moto de l'utilisateur

  const [currentScreen, setCurrentScreen] = useState();
  // console.log(roadtripType);

  //gestion des étapes---------
  //initialisation de la première étape au démarrage de la page------------------------

  //-----------------DATEPICKER-------------------------------
  const [date, setDate] = useState(new Date(1598051730000));

  //------------------------DATETIMEPICKER-----------------------------
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const [From, setFrom] = useState(new Date());
  const [To, setTo] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [currentSetting, setcurrentSetting] = useState("from");

  const onChange = (event, selectedDate) => {
    if (currentSetting === "from") {
      const currentDate = selectedDate || From;
      setShow(Platform.OS === "ios");
      setFrom(currentDate);
      setRoadtriptimeDeparture(From.toLocaleTimeString());
    } else {
      const currentDate = selectedDate || To;
      setShow(Platform.OS === "ios");
      setTo(currentDate);
      setRoadtriptimeArrival(To.toLocaleTimeString());
    }
  };

  const showTimepicker = (current) => {
    setShow(true);
    setcurrentSetting(current);
  };

  //-------------------récupération des datas nouvel itinéraire-----------------
  const [departure_city, setDeparture_city] = useState("");
  const [arrival_city, setArrival_city] = useState("");
  const [map_itinerary, setMap_itinerary] = useState("");

  //-------------------pour effet radio couleur des boutons------------------------
  const [checked, setChecked] = useState("cool");

  useEffect(() => {
    const getDataitinerary = async () => {
      const dataItinerary = await fetch(
        `${MA_VARIABLE}/itineraries/get-itinerary?itineraryIdFromFront=${props.route.params.itinerary_id}`
      );
      var dataItineraryParse = await dataItinerary.json();
      console.log("dataItineraryParse", dataItineraryParse);

      setDeparture_city(dataItineraryParse.itineraryData.start.city);
      setArrival_city(dataItineraryParse.itineraryData.arrival.city);
      setMap_itinerary(dataItineraryParse.itineraryData.snapshot);
      console.log("map_itinerary", map_itinerary);
    };
    if (props.route.params.itinerary_id) {
      getDataitinerary();
    }
  }, [props.route.params.itinerary_id]);

  var Bottom = <></>;

  if (itineraryexist == "") {
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
            <CustomButtonOrange
              title="NOUVEL ITINERAIRE"
              onPress={() => {
                setItineraryexist("ok"),
                  setFormProgress(1),
                  props.onSubmitData({
                    roadtripTitle: roadtripTitle,
                    roadtripDate: roadtripDate,
                    roadtriptimeDeparture: roadtriptimeDeparture,
                    roadtriptimeArrival: roadtriptimeArrival,
                  }),
                  props.navigation.navigate("Itinerary", {
                    screen: "ItineraryScreen",
                  });
                // console.log(currentScreen);
              }}
            />
            <CustomButton
              title="ITINERAIRE PROPOSE"
              onPress={() =>
                props.navigation.navigate("ListItineraries", {
                  screen: "ListItinerariesScreen",
                })
              }
            />
          </View>
          <View style={{ marginTop: "15%" }}>
            <Text>Aucun itinéraire choisit ou créé</Text>
          </View>
        </View>

        <View style={styles.bottomPage}>
          <View style={{ marginHorizontal: "40%" }}></View>
          <View style={{ marginTop: "10%", marginBottom: "5%" }}></View>
        </View>
      </View>
    );
  } else {
    Bottom = (
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <View
          style={{
            alignItems: "center",
            height: "30%",
            marginTop: "5%",
          }}
        >
          <Image
            style={{
              height: 200,
              width: 350,
            }}
            // source={require({ map_itinerary })}
            source={{
              uri: map_itinerary,
            }}
          />
          <View
            style={{
              width: "50%",
              flexDirection: "row",
              alignItems: "center",
              height: "30%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {departure_city}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {arrival_city}
            </Text>
          </View>
        </View>

        <View style={styles.bottomPage}>
          <View style={{ marginHorizontal: "40%" }}></View>
          <View style={{ marginTop: "80%", marginBottom: "5%" }}>
            <CustomButtonOrangeNext onPress={() => setFormProgress(2)} />
          </View>
        </View>
      </View>
    );
  }
  // console.log("props.data_new_roadtrip:", props.data_new_roadtrip);
  // console.log(formProgress);
  // console.log(itineraryexist);
  var pagecontent = <></>;

  if (formProgress == 0 || formProgress == 1) {
    pagecontent = (
      <View style={styles.container}>
        <HeaderRNE
          backgroundColor="#FFD230"
          leftComponent={
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("RoadtripList", {
                  screen: "RoadtripListScreen",
                })
              }
            >
              <AntDesign name="arrowleft" color="#363432" size={30} />
            </TouchableOpacity>
          }
          centerComponent={{
            text: "CREE TON TRIP",
            style: styles.heading,
          }}
        />

        <View style={styles.barprogress}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={formProgress}
            stepCount={3}
          />
        </View>
        <View style={styles.switch}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}> Privé </Text>
          <Switch
            trackColor={{ false: "#363432", true: "teal" }}
            thumbColor="#FF8B00"
            ios_backgroundColor="#FEFAEA"
            onValueChange={(value) => setToggleButton(value)}
            value={toggleButton}
          />
          <Text style={{ fontWeight: "bold", fontSize: 20 }}> Public </Text>
        </View>
        <View
          style={{
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          <CustomNewTripInput
            placeholder="votre titre de roadtrip"
            value={roadtripTitle}
            setValue={setRoadtripTitle}
            secureTextEntry={false}
            style={{
              justifyContent: "center",
            }}
          />
          <View style={styles.horaires}>
            <Text style={{ paddingTop: 5, fontWeight: "bold", fontSize: 20 }}>
              Date de sortie :
            </Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={date} // Initial date from state
              mode="date" // The enum of date, datetime and time
              androidMode={"spinner"}
              display={"spinner"}
              placeholder="select date"
              format="YYYY-MM-DD"
              // minDate="01-01-2016"
              // maxDate="01-01-2019"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 15,
                  backgroundColor: "#FFEDAC",
                },
              }}
              onDateChange={(date) => {
                setDate(date);
                setRoadtripDate(date);
              }}
            />
          </View>
        </View>

        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Horaires :</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Départ :</Text>
            <CustomTimer
              selectedValue={roadtriptimeDeparture}
              onValueChange={(value, index) => {
                // setuserBikeCateg(value),
                setRoadtriptimeDeparture(value),
                  (value = { roadtriptimeDeparture });
              }}
              style={{ flex: 1 }}
            />
            {/* {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={From}
                mode={"time"}
                is24Hour={true}
                display="spinner"
                onChange={onChange}
              />
            )}

            <CustomTimeNewTripInput
              placeholder="00:00"
              keyboardType="numeric"
              onFocus={() => showTimepicker("from")}
              value={From.toLocaleTimeString()}
            /> */}
          </View>
          <Text> </Text>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>Arrivée :</Text>
            <CustomTimer
              selectedValue={roadtriptimeArrival}
              onValueChange={(value, index) => {
                // setuserBikeCateg(value),
                setRoadtriptimeArrival(value),
                  (value = { roadtriptimeArrival });
              }}
              style={{ flex: 1 }}
            />
            {/* <CustomTimeNewTripInput
              placeholder="00:00"
              keyboardType="numeric"
              onFocus={() => showTimepicker("to")}
              value={To.toLocaleTimeString()}
            /> */}
          </View>
        </View>
        {Bottom}
      </View>
    );
  } else if (formProgress == 2) {
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
            currentPosition={formProgress}
            stepCount={3}
          />
        </View>
        <Card containerStyle={styles.card}>
          <View
            style={{
              marginBottom: "5%",
              marginTop: "5%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Type de Roadtrip
            </Text>
          </View>
          <View style={styles.choice2}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="cool"
                status={checked === "cool" ? "checked" : "unchecked"}
                onPress={() => {
                  setRoadtripType("cool"), setChecked("cool");
                }}
              />
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Cool</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="Sportif"
                status={checked === "Sportif" ? "checked" : "unchecked"}
                onPress={() => {
                  setRoadtripType("Sportif"), setChecked("Sportif");
                }}
              />
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Sportif</Text>
            </View>
            <View
              style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
            >
              <RadioButton
                value="Tourisme"
                status={checked === "Tourisme" ? "checked" : "unchecked"}
                onPress={() => {
                  setRoadtripType("Tourisme"), setChecked("Tourisme");
                }}
              />
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Tourisme</Text>
            </View>

            {/* <Button
                title={"Cool"}
                value={roadtripType}
                status={checked === "cool" ? "checked" : "unchecked"}
                onPress={() => setRoadtripType("Cool")}
                secureTextEntry={false}
                containerStyle={{
                  width: 80,
                }}
                buttonStyle={{
                  backgroundColor: { colorButton },
                  borderRadius: 15,
                  height: "100%",
                }}
                titleStyle={{
                  color: "#FEFAEA",
                  marginHorizontal: 10,
                  fontWeight: "bold",
                  fontSize: 10,
                }}
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
              /> */}
          </View>
        </Card>
        <Card containerStyle={styles.card}>
          <View
            style={{
              marginBottom: "5%",
              marginTop: "10%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Pour quel type de moto ?
            </Text>
            {/* <CustomBikeCategPicker
            selectedValue={userBikeCateg}
            onValueChange={(value, index) => {
              setRoadtripMotoType(value), (value = { roadtripMotoType });
            }}
            // style={{ flex: 1 }}
          /> */}
            <CustomBikeCategPicker2
              selectedValue={roadtripMotoType}
              onValueChange={(value, index) => {
                // setuserBikeCateg(value),
                setRoadtripMotoType(value), (value = { roadtripMotoType });
              }}
              style={{ flex: 1 }}
            />
            {/* <CustomNewTripInput
            placeholder="Toutes catégories"
            value={roadtripMotoType}
            setValue={setRoadtripMotoType}
          /> */}
          </View>
        </Card>
        <Card containerStyle={styles.card}>
          {/* <View style={styles.tailleGroupe}> */}
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Taille du groupe
            </Text>
          </View>
          <Text> </Text>
          <View style={{ alignItems: "center" }}>
            <CustomTimeNewTripInput
              placeholder="choisis un nombre"
              value={roadtripSizeGroup}
              setValue={setRoadtripSizeGroup}
            />
          </View>
          {/* </View> */}
        </Card>

        {/* CHOIX ITINERAIRE */}
        <View
          style={{
            alignItems: "center",
            height: "15%",
            marginTop: "5%",
          }}
        >
          <View>
            <CustomButtonValidation
              title="VALIDER !"
              onPress={() => (
                props.navigation.navigate("CreateRoadTripRecap", {
                  screen: "CreateRoadTripScreenRecap",
                }),
                props.onSubmitData({
                  roadtripTitle: roadtripTitle,
                  roadtripDate: roadtripDate,
                  roadtriptimeDeparture: roadtriptimeDeparture,
                  roadtriptimeArrival: roadtriptimeArrival,
                  roadtripMotoType: roadtripMotoType,
                  roadtripSizeGroup: roadtripSizeGroup,
                  roadtripType: roadtripType,
                  map_itinerary: map_itinerary,
                  itineraryId: itineraryexist,
                })
              )}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/images/loginbg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View>{pagecontent}</View>
    </ImageBackground>
  );
}
// onPageChange(position);
// this.setState({ currentPosition: position });

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: deviceHeight * 0.2,
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
    alignItems: "center",
    width: "90%",
  },
  switch: {
    width: deviceWidth,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  choice: {
    width: "80%",
    // alignItems: "center",
    flexDirection: "row",
    // justifyContent: "center",
    height: "50%",
    // marginBottom: "5%",
    // marginTop: "5%",
    justifyContent: "space-between",
  },
  choice2: {
    width: "80%",
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "center",
    height: "50%",
    // marginBottom: "5%",
    // marginTop: "5%",
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

  barprogress: {
    width: deviceWidth,
    backgroundColor: "#FEFAEA",
    paddingTop: "5%",
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
    onSubmitData: function (roadtripData) {
      dispatch({ type: "saveData", roadtripData: roadtripData });
    },
  };
}

function mapStateToProps(state) {
  return { data_new_roadtrip: state.data_new_roadtrip, token: state.token };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoadTripScreenFirstStep);
