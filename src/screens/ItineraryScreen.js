import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Input, Button, Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { captureRef } from "react-native-view-shot";
import { MA_VARIABLE, APIGOOGLE } from "@env";
var polyline = require("@mapbox/polyline");

export default function ItineraryScreen() {
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

  //*****ajouter des etapes */
  const addEtap = () => {
    setMyWaypoints([...myWaypoints, `place_id:${etape_place_id}`]);
    setEtapesList([
      ...etapesList,
      {
        lieu: etape_name,
        ville: etape_city,
        latitude: etape_Lat,
        longitude: etape_Lng,
      },
    ]);
    setEtape_place_id("");
    this.GooglePlacesAutocompleteRef.clear();
    console.log("Clic detecté");
    var waypointsList = myWaypoints.join("|");
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

    var mydata = {
      departure_RegionFromFront: departure_Region,
      departure_cityFromFront: departure_city,
      departure_LatFromFront: departure_Lat,
      departure_LngFromFront: departure_Lng,
      departure_place_idFromFront: departure_place_id,
      departure_nameFromFront: departure_name,

      arrival_cityFromFront: arrival_city,
      arrival_LatFromFront: arrival_Lat,
      arrival_LngFromFront: arrival_Lng,
      arrival_place_idFromFront: arrival_place_id,
      arrival_nameFromFront: arrival_name,

      itinerary_distanceFromFront: itinerary_distance,
      itinerary_durationFromFront: itinerary_duration,

      sectotimeFromFront: sectotime,

      coords_parcoursFromFront: coords_parcours,
      pointsFromFront: points,

      myWaypointsFromFront: myWaypoints,
      listWaypointsFromFront: listWaypoints,
      etapesListFromFront: etapesList,
    };
    const data = await fetch(`{MA_VARIABLE}/itineraries/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mydata),
    });
    const theresponse = await data.json();
    console.log("console du fetch", theresponse);
  };

  //************************************************* FIN ENVOI BACK  POUR BASE DE DONNEES****************************$ */

  // ********************************************************Consultation API GOOGLE**************************$$
  const handleClick = async () => {
    var rawResponse = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?&destination=place_id:${arrival_place_id}&origin=place_id:${departure_place_id}&waypoints=${listWaypoints}&avoid=highways&key={APIGOOGLE}`
    );

    var response = await rawResponse.json();
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
        <Button
          title="Créer itineraire"
          buttonStyle={{ backgroundColor: "#eb4d4b" }}
          type="solid"
          onPress={() => itineraryClick()}
        />
        <Overlay
          isVisible={thisVisible}
          onBackdropPress={() => {
            setIsVisible(false);
          }}
        >
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
              key: "AIzaSyBLtrYmBkkQCJN95Ui6OHC0Ym3OMt98ohk",
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
                backgroundColor: "grey",
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
              key: "AIzaSyBLtrYmBkkQCJN95Ui6OHC0Ym3OMt98ohk",
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
                backgroundColor: "grey",
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
              key: "AIzaSyBLtrYmBkkQCJN95Ui6OHC0Ym3OMt98ohk",
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
                backgroundColor: "grey",
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
          <Button
            title="ajouter autre etape"
            buttonStyle={{ backgroundColor: "#eb4d4b" }}
            type="solid"
            onPress={() => addEtap()}
          />
          <Button
            title="valider"
            buttonStyle={{ backgroundColor: "#eb4d4b" }}
            type="solid"
            onPress={() => setThisVisible(false)}
          />
        </Overlay>
      </View>
      {/* <Text>{departure_city}</Text>
      <Text>{arrival_city}</Text> */}
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
        onPress={(e) => {
          selectPOI(e);
        }}
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
      <Button
        title="Valider itineraire"
        buttonStyle={{ backgroundColor: "#eb4d4b" }}
        type="solid"
        onPress={() => handleClick()}
      />
      <Button
        title="Envoi en BDD"
        buttonStyle={{ backgroundColor: "#eb4d4b" }}
        type="solid"
        onPress={() => SubmitItinerary()}
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
