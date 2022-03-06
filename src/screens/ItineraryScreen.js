import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Input, Button, Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { captureRef } from "react-native-view-shot";
import { MA_VARIABLE, APIGOOGLE } from "@env";
import CustomButtonOrange from "../components/CustomButtonOrange";
import CustomButton from "../components/CustomButton";
import CustomHeaderNoArrow from "../components/CustomHeaderNoArrow";

var polyline = require("@mapbox/polyline");

//---------------IMPORTS A LAISSER POUR DEMO !!!------
import CreateRoadTripScreenFirstStep2 from "./CreateRoadTripScreenFirstStep2";

export default function ItineraryScreen(props) {
  const [departure_city, setDeparture_city] = useState(""); //Nom de la ville  de depart
  const [departure_Region, setDeparture_Region] = useState(""); //Nom de la region du popint de depart
  const [departure_Lat, setDeparture_Lat] = useState(0); //latitude du point de départ
  const [departure_Lng, setDeparture_Lng] = useState(0); //longitude du point de départ
  const [departure_place_id, setDeparture_place_id] = useState(""); //place ID du point de depart
  const [departure_name, setDeparture_name] = useState(""); //nom du lieu de départ
  const [arrival_city, setArrival_city] = useState(""); //nom de la ville d'arrivée
  const [arrival_Lat, setArrival_Lat] = useState(0); //latitude de l'arrivée
  const [arrival_Lng, setArrival_Lng] = useState(0); //longitude de l'arrivée
  const [arrival_place_id, setArrival_place_id] = useState(""); //place ID de l'arrivée
  const [arrival_name, setArrival_name] = useState(""); //nom du lieu d'arrivée
  const [etape_city, setEtape_city] = useState(""); //non envoye en BDD
  const [etape_Lat, setEtape_Lat] = useState(0); //non envoye en BDD
  const [etape_Lng, setEtape_Lng] = useState(0); //non envoye en BDD
  const [etape_place_id, setEtape_place_id] = useState(""); //non envoye en BDD
  const [etape_name, setEtape_name] = useState(""); //non envoye en BDD
  const [itinerary_distance, setItinerary_distance] = useState(0); //distance totale en nombre arrondi en KM
  const [itinerary_duration, setItinerary_duration] = useState(0); //durée du trip en secondes
  const [sectotime, setSectotime] = useState(""); //durée du trip en sting HH/MM/SS
  const [coords_parcours, setCoords_parcours] = useState([]); //tous les points du parcours(Map de points)
  const [points, setPoints] = useState(""); //Polyline décodee
  const [thisVisible, setThisVisible] = useState(false); // pour afficher premier Overlay
  const [thisVisible2, setThisVisible2] = useState(false); // pour Overlay des etapes
  const [isVisible, setIsVisible] = useState(false);

  const [myInitialRegion, setMyInitialRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 15,
    longitudeDelta: 15,
  }); // coordonnées initiales de la map
  const [myWaypoints, setMyWaypoints] = useState([]); //liste de tous les points d'etapes
  const [listWaypoints, setListWaypoints] = useState(""); //liste des waypoints envoyés a google en string apres le JOIN de mywaypoints
  const [etapesList, setEtapesList] = useState([]); //contient nom du lieu, nom de la ville,latitude, longitude, de chaque point d'etape
  const captureViewRef = useRef();

  const itineraryClick = () => {
    setThisVisible(true);
  };
  console.log("essai");
  //*****ajouter des etapes */
  const addEtap = () => {
    var wayp = [...myWaypoints, `place_id:${etape_place_id}`];
    setMyWaypoints(wayp);
    setEtapesList([
      ...etapesList,
      {
        lieu: etape_name,
        ville: etape_city,
        latitude: etape_Lat,
        longitude: etape_Lng,
      },
    ]);

    this.GooglePlacesAutocompleteRef.clear();
    console.log("Clic detecté");
    if (myWaypoints.length > 1) {
      var waypointsList = myWaypoints.join("|");
    } else {
      var waypointsList = `place_id:${etape_place_id}`;
    }
    setEtape_place_id("");
    setListWaypoints(waypointsList);
  };
  //*****fin ajout etapes dans waypoints****$ */

  // ****************************$créer des Marker pour chaque etape***********************
  var markerEtapes = etapesList.map((etape, j) => {
    return (
      <Marker
        key={j}
        pinColor="red"
        coordinate={{
          latitude: etape.latitude,
          longitude: etape.longitude,
        }}
        title={etape.lieu}
        description={etape.ville}
      />
    );
  });

  //***************** Fin création des markers d'etape */

  //************************************************* DEBUT ENVOI BACK  POUR BASE DE DONNEES****************************$ */

  var SubmitItinerary = async () => {
    console.log("envoi Fetch");

    //********************INSERTION VERSION MATHIEU ***************/

    var macapture = await captureRef(captureViewRef, {
      format: "jpg",
      quality: 0.7,
    });
    console.log(macapture);

    var data = new FormData();
    data.append("macarte", {
      uri: macapture,
      type: "image/jpeg",
      name: "macarte.jpg",
    });

    // var mydata = {
    //   departure_RegionFromFront: departure_Region,
    //   departure_cityFromFront: departure_city,
    //   departure_LatFromFront: departure_Lat,
    //   departure_LngFromFront: departure_Lng,
    //   departure_place_idFromFront: departure_place_id,
    //   departure_nameFromFront: departure_name,

    //   arrival_cityFromFront: arrival_city,
    //   arrival_LatFromFront: arrival_Lat,
    //   arrival_LngFromFront: arrival_Lng,
    //   arrival_place_idFromFront: arrival_place_id,
    //   arrival_nameFromFront: arrival_name,

    //   itinerary_distanceFromFront: itinerary_distance,
    //   itinerary_durationFromFront: itinerary_duration,

    //   sectotimeFromFront: sectotime,

    //   coords_parcoursFromFront: coords_parcours,
    //   pointsFromFront: points,

    //   myWaypointsFromFront: myWaypoints,
    //   listWaypointsFromFront: listWaypoints,
    //   etapesListFromFront: etapesList,
    // };
    // // On ajoute toutes infos complémentaires qu'on veut passer au backend
    // data.append("myydata", mydata);

    //***************envoi de mathieu data2*******************/
    var mydata2 = {
      start: {
        region: departure_Region,
        city: departure_city,
        lat: departure_Lat,
        lon: departure_Lng,
        place_id: departure_place_id,
        departure_name: departure_name,
      },
      arrival: {
        city: arrival_city,
        lat: arrival_Lat,
        lon: arrival_Lng,
        place_id: arrival_place_id,
        departure_name: arrival_name,
      },
      region_name: departure_Region,
      duration: itinerary_duration,
      distance: itinerary_distance,
      coords_parcours: coords_parcours,
      etapesList: etapesList,
    };
    console.log("mydata2 :", mydata2);

    data.append("mydata", JSON.stringify(mydata2));
    var rawResponse = await fetch(`${MA_VARIABLE}/itineraries/add`, {
      method: "POST",
      body: data,
    });
    const response = await rawResponse.json();
    console.log("console du fetch", response);

    props.navigation.navigate("RoadtripList", {
      screen: "newRoadTripFirstStep",
      itinerary_id: response.newItininerary._id,
    });

    //*************** fin envoi mathieu data2 */
    //************************** Ancienne version envoi fetch base sur data */
    // var rawResponse = await fetch(
    //   "https://safe-dusk-02200.herokuapp.com/itineraries/add",
    //   {
    //     method: "POST",
    //     body: data,
    //   }
    // );
    // console.log(data);
    // var response = await rawResponse.json();
    // console.log("reponse de cloudinary : ", response);
    //********************************************FIN INSERTION PROVENANT DE MATHIEU***** */
    //   var mydata = {
    //     departure_RegionFromFront: departure_Region,
    //     departure_cityFromFront: departure_city,
    //     departure_LatFromFront: departure_Lat,
    //     departure_LngFromFront: departure_Lng,
    //     departure_place_idFromFront: departure_place_id,
    //     departure_nameFromFront: departure_name,

    //     arrival_cityFromFront: arrival_city,
    //     arrival_LatFromFront: arrival_Lat,
    //     arrival_LngFromFront: arrival_Lng,
    //     arrival_place_idFromFront: arrival_place_id,
    //     arrival_nameFromFront: arrival_name,

    //     itinerary_distanceFromFront: itinerary_distance,
    //     itinerary_durationFromFront: itinerary_duration,

    //     sectotimeFromFront: sectotime,

    //     coords_parcoursFromFront: coords_parcours,
    //     pointsFromFront: points,

    //     myWaypointsFromFront: myWaypoints,
    //     listWaypointsFromFront: listWaypoints,
    //     etapesListFromFront: etapesList,
    //   };
    //   const data = await fetch(`${MA_VARIABLE}/itineraries/add`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(mydata),
    //   });
    //   const theresponse = await data.json();
    //   console.log("console du fetch", theresponse);
  };

  //************************************************* FIN ENVOI BACK  POUR BASE DE DONNEES****************************$ */

  // ********************************************************Consultation API GOOGLE**************************$$
  const handleClick = async () => {
    console.log("listWaypoints", listWaypoints);
    console.log("myWaypoints", myWaypoints);
    var finalWaypointStr = myWaypoints.join("|");

    await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?&destination=place_id:${arrival_place_id}&origin=place_id:${departure_place_id}&waypoints=${finalWaypointStr}&avoid=highways&key=AIzaSyBYP36DdQshZpnFEayBaalJRcOw-tWJlT8`
    );

    // var response = await rawResponse.json();

    //console.log("reponse google", response);
    /*  var namecity = response(["nom"]);
  console.log(namecity); */

    // console.log("km parcours", response.routes[0].legs[0].distance.VALUE);
    // setItinerary_distance(response.routes[0].legs[0].distance.value);
    // console.log("durée parcours", response.routes[0].legs[0].duration.value);
    // setItinerary_duration(response.routes[0].legs[0].duration.value);

    //******** CALCUL DISTANCE TOTALE ************/

    var totalDistance = 0;
    for (var i = 0; i < response.routes[0].legs.length; i++) {
      totalDistance = totalDistance + response.routes[0].legs[i].distance.value;
    }

    setItinerary_distance(totalDistance * 0.001);

    //**********FIN de CALCUL DISTANCE******$ */

    //*********$ Calcul DUREE TOTALE ************* */

    var totalDuration = 0;
    for (var i = 0; i < response.routes[0].legs.length; i++) {
      totalDuration = totalDuration + response.routes[0].legs[i].duration.value;
    }
    setItinerary_duration(totalDuration); //total a totalDuration
    const secToTime = (totalsecondes) => {
      hours = Math.floor(totalsecondes / 3600);
      totalsecondes %= 3600;
      minutes = Math.floor(totalsecondes / 60);
      seconds = Math.floor(totalsecondes % 60);
      return hours + "h:" + minutes + "min:";
    };
    setSectotime(secToTime(totalDuration));
    //*********Fin calcul duree totale******
    //console.log("duration", itinerary_duration);
    //console.log("distance=", itinerary_distance);

    //***Recuperation de la POLYLINE venant de Google********$ */
    let points = polyline.decode(response.routes[0].overview_polyline.points);
    //console.log("points", points);
    let coords = points.map((point, index) => ({
      latitude: point[0],
      longitude: point[1],
    }));
    //console.log("coords", coords);
    setCoords_parcours(coords);
    captureViewRef.current.animateToRegion({
      latitude: departure_Lat,
      longitude: departure_Lng,
      latitudeDelta: 4,
      longitudeDelta: 4,
    });
    //coords est donc un tableau d'objets

    //****** fin de traitement de Polyline qui vient de Google */
    //*************************************************************************PREPARATION ENVOI BDD***********$ */
  };
  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <View style={{ height: 150 }}>
        <CustomHeaderNoArrow
          onPress={() =>
            props.navigation.navigate("HomeScreen", {
              screen: "HomeScreen",
            })
          }
        />
        <CustomButtonOrange
          title="CREER ITINERAIRE"
          onPress={() => itineraryClick()}
        />
        <Overlay
          isVisible={thisVisible}
          onBackdropPress={() => {
            setIsVisible(false);
          }}
        >
          <Text></Text>
          <Text></Text>
          <GooglePlacesAutocomplete
            placeholder="Ville depart"
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              //console.log("data complète renvoyée par google my places : ", data);

              //console.log(details);
              //const gpsDepartLat = details.geometry.location.lat;
              //const gpsDepartLon = details.geometry.location.lng;

              /*   async function loadnameposition() {
              var rawResponse = await fetch(
                `https://geo.api.gouv.fr/communes?lat=${gpsDepartLat}&lon=${gpsDepartLon}&fields=region`
              );
              var response = await rawResponse.json();
              //console.log(response[0]);
              var namecity = response[0].nom;
              console.log("namecity Depart", namecity);
              setDeparture_city(namecity)
              var nomRegion = response[0].region.nom;
              console.log("nomRegion Depart", nomRegion);
              setDeparture_Region(nomRegion)
            }
            loadnameposition(); */
              console.log(
                "details.address_components[0].long_name  Départ=",
                details.address_components[0].long_name
              );
              console.log(
                "details.address_components[2].long_name  Départ=",
                details.address_components[2].long_name
              );
              console.log(
                "details.geometry.location.lat Départ=",
                details.geometry.location.lat
              );
              setDeparture_Lat(details.geometry.location.lat);
              console.log(
                "details.geometry.location.lng  Départ=",
                details.geometry.location.lng
              );
              setDeparture_Lng(details.geometry.location.lng);
              console.log("details.place_id   Départ=", details.place_id);
              setDeparture_place_id(details.place_id);
              console.log("details.name  Départ=", details.name);
              setDeparture_name(details.name);
              //****ajout fonction mathieu******
              for (var i = 0; i < details.address_components.length; i++) {
                if (details.address_components[i].types[0] == "locality") {
                  console.log(
                    "la ville est : ",
                    details.address_components[i].long_name
                  );
                  setDeparture_city(details.address_components[i].long_name);
                  // setOriginCity(details.address_components[i].long_name)
                  //setOriginName(details.name)
                }
              }
              for (var i = 0; i < details.address_components.length; i++) {
                if (
                  details.address_components[i].types[0] ==
                  "administrative_area_level_1"
                ) {
                  console.log(
                    "la Region est : ",
                    details.address_components[i].long_name
                  );
                  setDeparture_Region(details.address_components[i].long_name);
                  // setOriginCity(details.address_components[i].long_name)
                  //setOriginName(details.name)
                }
              }

              /*  props.onClickAddOrigin(data.place_id);
          props.onClickAddOriginData(details); */
            }}
            query={{
              key: `${APIGOOGLE}`,
              language: "fr",
            }}
            textInputProps={{
              InputComp: Input,
              leftIcon: { type: "font-awesome", name: "search" },
              errorStyle: { color: "red" },
            }}
            styles={{
              height: 20,
              textInputContainer: {
                backgroundColor: "#FFD230",
              },
              textInput: {
                color: "black",
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: "#FFF9DA",
              },
            }}
          />

          <GooglePlacesAutocomplete
            placeholder="Ville Arrivée"
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              //console.log("data complète renvoyée par google my places : ", data);
              //console.log(details);
              /*  const gpsArrivalLat = details.geometry.location.lat;
            const gpsArrivalLon = details.geometry.location.lng;

            async function loadnameposition2() {
              var rawResponse2 = await fetch(
                `https://geo.api.gouv.fr/communes?lat=${gpsArrivalLat}&lon=${gpsArrivalLon}&fields=region`
              );
              var response2 = await rawResponse2.json();
              //console.log(response[0]);
              var namecity2 = response2[0].nom;
              console.log("namecity arrival", namecity2);
              var nomRegion2 = response2[0].region.nom;
              console.log("nomRegion Arrival", nomRegion2);
            }
            loadnameposition2(); */
              console.log(
                "details.address_components[0].long_name  Arrivée=",
                details.address_components[0].long_name
              );
              console.log(
                "details.address_components[2].long_name  Arrivée=",
                details.address_components[2].long_name
              );
              console.log(
                "details.geometry.location.lat Arrivée=",
                details.geometry.location.lat
              );
              setArrival_Lat(details.geometry.location.lat);
              console.log(
                "details.geometry.location.lng  Arrivée=",
                details.geometry.location.lng
              );
              setArrival_Lng(details.geometry.location.lng);
              console.log("details.place_id   Arrivée=", details.place_id);
              setArrival_place_id(details.place_id);
              console.log("details.name  Arrivée=", details.name);
              setArrival_name(details.name);

              for (var i = 0; i < details.address_components.length; i++) {
                if (details.address_components[i].types[0] == "locality") {
                  console.log(
                    "la ville est : ",
                    details.address_components[i].long_name
                  );
                  setArrival_city(details.address_components[i].long_name);
                  // setOriginCity(details.address_components[i].long_name)
                  //setOriginName(details.name)
                }
              }
              for (var i = 0; i < details.address_components.length; i++) {
                if (
                  details.address_components[i].types[0] ==
                  "administrative_area_level_1"
                ) {
                  console.log(
                    "la Region est : ",
                    details.address_components[i].long_name
                  );
                }
              }

              /*  props.onClickAddOrigin(data.place_id);
          props.onClickAddOriginData(details); */
              /* console.log("depart", departure_city);
            console.log("Arrivée", arrival_city); */
            }}
            query={{
              key: `${APIGOOGLE}`,
              language: "fr",
            }}
            textInputProps={{
              InputComp: Input,
              leftIcon: { type: "font-awesome", name: "search" },
              errorStyle: { color: "red" },
            }}
            styles={{
              height: 20,
              textInputContainer: {
                backgroundColor: "#FFD230",
              },
              textInput: {
                color: "black",
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: "#FFF9DA",
              },
            }}
          />
          <CustomButtonOrange
            title="AJOUTER DES ETAPES"
            onPress={() => {
              setThisVisible2(true), setThisVisible(false);
            }}
          />
          <CustomButton title="VALIDER" onPress={() => setThisVisible(false)} />
        </Overlay>

        <Overlay
          isVisible={thisVisible2}
          onBackdropPress={() => {
            setIsVisible(false);
          }}
        >
          <Text></Text>
          <Text></Text>
          <GooglePlacesAutocomplete
            placeholder=" Etape"
            fetchDetails={true}
            ref={(instance) => {
              this.GooglePlacesAutocompleteRef = instance;
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              //console.log("data complète renvoyée par google my places : ", data);

              //console.log(details);
              //const gpsDepartLat = details.geometry.location.lat;
              //const gpsDepartLon = details.geometry.location.lng;

              /*   async function loadnameposition() {
              var rawResponse = await fetch(
                `https://geo.api.gouv.fr/communes?lat=${gpsDepartLat}&lon=${gpsDepartLon}&fields=region`
              );
              var response = await rawResponse.json();
              //console.log(response[0]);
              var namecity = response[0].nom;
              console.log("namecity Depart", namecity);
              setDeparture_city(namecity)
              var nomRegion = response[0].region.nom;
              console.log("nomRegion Depart", nomRegion);
              setDeparture_Region(nomRegion)
            }
            loadnameposition(); */
              console.log(
                "details.address_components[0].long_name  Etape=",
                details.address_components[0].long_name
              );
              console.log(
                "details.address_components[2].long_name  Etape=",
                details.address_components[2].long_name
              );
              console.log(
                "details.geometry.location.lat Etape=",
                details.geometry.location.lat
              );
              setEtape_Lat(details.geometry.location.lat);
              console.log(
                "details.geometry.location.lng  Etape=",
                details.geometry.location.lng
              );
              setEtape_Lng(details.geometry.location.lng);
              console.log("details.place_id   Etape=", details.place_id);
              setEtape_place_id(details.place_id);
              console.log("details.name  Etape=", details.name);
              setEtape_name(details.name);
              //****ajout fonction mathieu******
              for (var i = 0; i < details.address_components.length; i++) {
                if (details.address_components[i].types[0] == "locality") {
                  console.log(
                    "la ville est : ",
                    details.address_components[i].long_name
                  );
                  setEtape_city(details.address_components[i].long_name);
                  // setOriginCity(details.address_components[i].long_name)
                  //setOriginName(details.name)
                }
              }
              for (var i = 0; i < details.address_components.length; i++) {
                if (
                  details.address_components[i].types[0] ==
                  "administrative_area_level_1"
                ) {
                  console.log(
                    "la Region est : ",
                    details.address_components[i].long_name
                  );
                  // setOriginCity(details.address_components[i].long_name)
                  //setOriginName(details.name)
                }
              }

              /*  props.onClickAddOrigin(data.place_id);
          props.onClickAddOriginData(details); */
            }}
            query={{
              key: `${APIGOOGLE}`,
              language: "fr",
            }}
            textInputProps={{
              InputComp: Input,
              leftIcon: { type: "font-awesome", name: "search" },
              errorStyle: { color: "red" },
            }}
            styles={{
              height: 20,
              textInputContainer: {
                backgroundColor: "#FFD230",
              },
              textInput: {
                color: "black",
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: "#FFF9DA",
              },
            }}
          />
          <CustomButtonOrange
            title="AJOUTER UNE ETAPE"
            onPress={() => addEtap()}
          />
          <CustomButton
            title="VALIDER"
            onPress={() => {
              setThisVisible(false), setThisVisible2(false);
            }}
          />
        </Overlay>
      </View>
      {/* <Text>{departure_city}</Text>
      <Text>{arrival_city}</Text> */}
      <Text>"Etapes "{etapesList.name}</Text>
      <Text>"Etapes "{listWaypoints}</Text>
      <Text>"Lieu de départ"{departure_name}</Text>
      <Text>"Ville de départ"{departure_city}</Text>
      <Text>"Ville d'arrivée"{arrival_city}</Text>
      <Text>"Lieu d'arrivée"{arrival_name}</Text>
      <Text>"duration"{sectotime}</Text>
      <Text>"distance"{itinerary_distance}"KM"</Text>
      {/* <Button
      title={"faire itineraire"}
      onPress={}>

      </Button> */}
      <MapView
        ref={captureViewRef}
        style={{ flex: 1 }}
        initialRegion={myInitialRegion}
      >
        <Marker
          size={10}
          pinColor="black"
          coordinate={{
            latitude: departure_Lat,
            longitude: departure_Lng,
          }}
          title="Départ"
          description={departure_name}
        ></Marker>
        <Marker
          icon={<Icon name="fa-motorcycle" size={20} color="#ffffff" />}
          pinColor="black"
          coordinate={{
            latitude: arrival_Lat,
            longitude: arrival_Lng,
          }}
          title="Arrivee"
          description={arrival_name}
        ></Marker>
        {/* <Marker
          icon={<Icon name="fa-motorcycle" size={20} color="#ffffff" />}
          pinColor="black"
          coordinate={{
            latitude: etape_Lat,
            longitude: etape_Lng,
          }}
          title="Etape"
          description={etape_name}
        ></Marker> */}
        {markerEtapes}
        <Polyline
          style={{}}
          coordinates={coords_parcours}
          strokeColor={"#000"}
          strokeWidth={3}
          lineDashPattern={[1]}
        />

        {/* <Input onChangeText={(value) => setText(value)} value={text} />
      <Button title="valider" /> */}
      </MapView>
      <CustomButton title="VALIDER ITINERAIRE" onPress={() => handleClick()} />
      <CustomButtonOrange
        title="ENVOI EN BDD"
        onPress={() => SubmitItinerary()}
      />
      {/*//----------------------BUTTON CI APRES A LAISSER POUR DEMO !!!!!*/}
      <CustomButton
        title="CREER UN TRIP"
        onPress={() =>
          props.navigation.navigate("newRoadTripFirstStep2", {
            screen: CreateRoadTripScreenFirstStep2,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
