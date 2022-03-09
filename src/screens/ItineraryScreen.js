import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Header as HeaderRNE } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input, Button, Overlay, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { captureRef } from 'react-native-view-shot';
import { MA_VARIABLE, APIGOOGLE } from '@env';
import CustomButtonOrange from '../components/CustomButtonOrange';
import CustomButton from '../components/CustomButton';
import CustomHeaderNoArrow from '../components/CustomHeaderNoArrow';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native'; //************  pour mettre du style sur les overlays */
import CustomTextBackground from '../components/CustomTextBackground';

var polyline = require('@mapbox/polyline');

//**************************** Variable pour mettre du style sur les overlays */
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function ItineraryScreen(props) {
  const [departure_city, setDeparture_city] = useState(''); //Nom de la ville  de depart
  const [departure_Region, setDeparture_Region] = useState(''); //Nom de la region du popint de depart
  const [departure_Lat, setDeparture_Lat] = useState(0); //latitude du point de départ
  const [departure_Lng, setDeparture_Lng] = useState(0); //longitude du point de départ
  const [departure_place_id, setDeparture_place_id] = useState(''); //place ID du point de depart
  const [departure_name, setDeparture_name] = useState(''); //nom du lieu de départ
  const [arrival_city, setArrival_city] = useState(''); //nom de la ville d'arrivée
  const [arrival_Lat, setArrival_Lat] = useState(0); //latitude de l'arrivée
  const [arrival_Lng, setArrival_Lng] = useState(0); //longitude de l'arrivée
  const [arrival_place_id, setArrival_place_id] = useState(''); //place ID de l'arrivée
  const [arrival_name, setArrival_name] = useState(''); //nom du lieu d'arrivée
  const [etape_city, setEtape_city] = useState(''); //non envoye en BDD
  const [etape_Lat, setEtape_Lat] = useState(0); //non envoye en BDD
  const [etape_Lng, setEtape_Lng] = useState(0); //non envoye en BDD
  const [etape_place_id, setEtape_place_id] = useState(''); //non envoye en BDD
  const [etape_name, setEtape_name] = useState(''); //non envoye en BDD
  const [itinerary_distance, setItinerary_distance] = useState(0); //distance totale en nombre arrondi en KM
  const [itinerary_duration, setItinerary_duration] = useState(0); //durée du trip en secondes
  const [coords_parcours, setCoords_parcours] = useState([]); //tous les points du parcours(Map de points)
  const [points, setPoints] = useState(''); //Polyline décodee
  const [thisVisible, setThisVisible] = useState(false); // pour afficher  Overlay DEPART
  const [thisVisible1, setThisVisible1] = useState(false); // pour afficher  Overlay ARRIVEE
  const [thisVisible2, setThisVisible2] = useState(false); // pour Overlay des etapes
  const [myInitialRegion, setMyInitialRegion] = useState({
    latitude: 46.8566,
    longitude: 2.3522,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  }); // coordonnées initiales de la map
  const [myWaypoints, setMyWaypoints] = useState([]); //liste de tous les points d'etapes
  const [listWaypoints, setListWaypoints] = useState(''); //liste des waypoints envoyés a google en string apres le JOIN de mywaypoints
  const [etapesList, setEtapesList] = useState([]); //contient nom du lieu, nom de la ville,latitude, longitude, de chaque point d'etape
  const [theFinalEtapesStr, setTheFinalEtapesStr] = useState('');
  const [nameEtapesList, setNameEtapesList] = useState([]);
  const [arrivalButtonVisible, setArrivalButtonVisible] = useState(false);
  const [durationDisplay, setDurationDisplay] = useState('');
  const captureViewRef = useRef();
  const ref = useRef();
  console.log('etapesList', etapesList);

  const itineraryClick = () => {
    setThisVisible(true);
  };
  // console.log("essai");
  //*****ajouter des etapes */
  const addEtap = (placeid, etapename, etapecity, etapelat, etapelon) => {
    console.log('etape_name', etapename);
    var wayp = [...myWaypoints, `place_id:${placeid}`];
    setMyWaypoints(wayp);
    setNameEtapesList([...nameEtapesList, etapename]);
    console.log('nameEtapesList', nameEtapesList);
    setEtapesList([
      ...etapesList,
      {
        lieu: etapename,
        ville: etapecity,
        latitude: etapelat,
        longitude: etapelon,
      },
    ]);

    // console.log("Clic detecté");
    if (myWaypoints.length > 1) {
      var waypointsList = myWaypoints.join('|');
      set;
    } else {
      var waypointsList = `place_id:${etape_place_id}`;
    }
    setEtape_place_id('');

    setListWaypoints(waypointsList);
  };
  var topDisplay = <></>;
  var bottomButtons = (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title='CRÉER ITINÉRAIRE'
        containerStyle={{
          height: 40,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => itineraryClick()}
        buttonStyle={{ backgroundColor: '#ff8b00', borderRadius: 15 }}
        titleStyle={{
          color: '#FEFAEA',
          marginHorizontal: 20,
          fontWeight: 'bold',
        }}
        alignSelf='center'
      />
    </View>
  );
  if (departure_city !== '' && itinerary_distance === 0) {
    bottomButtons = (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: deviceWidth,
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#FEFAEA',
        }}
      >
        <Button
          title='CALCULER ITINÉRAIRE'
          containerStyle={{
            height: 40,
            color: '#FFD230',
          }}
          titleStyle={{
            color: '#FEFAEA',
            fontWeight: 'bold',
          }}
          buttonStyle={{ backgroundColor: '#363432' }}
          onPress={() => handleClick()}
        ></Button>
      </View>
    );
  } else if (departure_city !== '' && itinerary_distance !== 0) {
    topDisplay = (
      <View style={{}}>
        <Text
          h4
          h4Style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 5,
            backgroundColor: 'white',
          }}
        >
          {'Distance : ' + itinerary_distance + ' ' + 'km'}
        </Text>
        <Text
          h4
          h4Style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 5,
            marginTop: 2,
            backgroundColor: 'white',
          }}
        >
          {'Durée : ' + durationDisplay}
        </Text>
      </View>
    );
    bottomButtons = (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: deviceWidth,
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#FEFAEA',
        }}
      >
        <View style={{}}>
          <Text
            h4
            h4Style={{
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 5,
              backgroundColor: 'white',
            }}
          >
            {'Distance : ' + itinerary_distance + ' ' + 'km'}
          </Text>
          <Text
            h4
            h4Style={{
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 5,
              marginTop: 2,
              backgroundColor: 'white',
            }}
          >
            {'Durée : ' + durationDisplay}
          </Text>
        </View>

        <Button
          title='GO'
          onPress={() => SubmitItinerary()}
          buttonStyle={{ backgroundColor: '#ff8b00' }}
          titleStyle={{ fontWeight: 'bold' }}
          icon={{
            name: 'arrow-circle-right',
            type: 'font-awesome',
            size: 19,
            color: 'white',
          }}
        ></Button>
      </View>
    );
  }
  //*****fin ajout etapes dans waypoints****$ */

  // ****************************$créer des Marker pour chaque etape***********************
  var markerEtapes = etapesList.map((etape, j) => {
    return (
      <Marker
        key={j}
        pinColor='#ff8b00'
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
    // console.log("envoi Fetch");

    //********************INSERTION VERSION MATHIEU ***************/

    var macapture = await captureRef(captureViewRef, {
      format: 'jpg',
      quality: 0.7,
    });
    // console.log(macapture);

    var data = new FormData();
    data.append('macarte', {
      uri: macapture,
      type: 'image/jpeg',
      name: 'macarte.jpg',
    });

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
        arrival_name: arrival_name,
      },
      region_name: departure_Region,
      duration: itinerary_duration,
      distance: itinerary_distance,
      coords_parcours: coords_parcours,
      etapesList: etapesList,
    };
    // console.log("mydata2 :", mydata2);

    data.append('mydata', JSON.stringify(mydata2));
    var rawResponse = await fetch(`${MA_VARIABLE}/itineraries/add`, {
      method: 'POST',
      body: data,
    });
    const response = await rawResponse.json();
    console.log('console du fetch', response.newItinerary._id);

    props.navigation.navigate('newRoadTripFirstStep', {
      screen: 'CreateRoadTripScreenFirstStep',
      itinerary_id: response.newItinerary._id,
    });
  };

  //************************************************* FIN ENVOI BACK  POUR BASE DE DONNEES****************************$ */

  // ********************************************************Consultation API GOOGLE**************************$$
  const handleClick = async () => {
    // console.log("listWaypoints", listWaypoints);
    // console.log("myWaypoints", myWaypoints);
    var finalWaypointStr = myWaypoints.join('|');
    var theFINALFINALETAPESSTR = nameEtapesList.join(';');
    setTheFinalEtapesStr(theFINALFINALETAPESSTR);
    console.log(
      'fetch sur google :',
      `https://maps.googleapis.com/maps/api/directions/json?&destination=place_id:${arrival_place_id}&origin=place_id:${departure_place_id}&waypoints=${finalWaypointStr}&avoid=highways&key=${APIGOOGLE}`
    );
    var rawResponse = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?&destination=place_id:${arrival_place_id}&origin=place_id:${departure_place_id}&waypoints=${finalWaypointStr}&avoid=highways&key=AIzaSyBLtrYmBkkQCJN95Ui6OHC0Ym3OMt98ohk`
    );

    var response = await rawResponse.json();

    //******** CALCUL DISTANCE TOTALE ************/

    var totalDistance = 0;
    for (var i = 0; i < response.routes[0].legs.length; i++) {
      totalDistance = totalDistance + response.routes[0].legs[i].distance.value;
    }
    var arrondi = Math.round(totalDistance * 0.001);

    setItinerary_distance(arrondi);

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
      return hours + 'h ' + minutes + 'min';
    };
    setDurationDisplay(secToTime(totalDuration));

    //***Recuperation de la POLYLINE venant de Google********$ */
    let points = polyline.decode(response.routes[0].overview_polyline.points);
    //console.log("points", points);
    let coords = points.map((point, index) => ({
      latitude: point[0],
      longitude: point[1],
    }));
    setCoords_parcours(coords);

    //****** fin de traitement de Polyline qui vient de Google */
    //*************************************************************************PREPARATION ENVOI BDD***********$ */
  };
  var departureDisplay = <></>;
  if (departure_city !== '' && departure_name !== departure_city) {
    departureDisplay = (
      <HideWithKeyboard>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#FEFAEA',
            marginTop: 15,
            marginBottom: 5,
            alignItems: 'center',
          }}
        >
          <FontAwesome5 name='flag' size={24} color='black' />
          <Text h3 h3Style={{ alignSelf: 'center' }}>
            {departure_city}
          </Text>
          <Text h5 h5Style={{ alignSelf: 'center' }}>
            {departure_name}
          </Text>
        </View>
      </HideWithKeyboard>
    );
  } else if (departure_city !== '' && departure_city == departure_name) {
    departureDisplay = (
      <HideWithKeyboard>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#FEFAEA',
            marginBottom: 20,
            marginTop: 15,
            alignItems: 'center',
          }}
        >
          <FontAwesome5 name='flag' size={24} color='black' />
          <Text h4 h4Style={{ alignSelf: 'center' }}>
            {departure_city}
          </Text>
        </View>
      </HideWithKeyboard>
    );
  }

  var arrivalDisplay = <></>;
  if (arrival_city !== '' && arrival_name !== arrival_city) {
    arrivalDisplay = (
      <HideWithKeyboard>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#FEFAEA',
            alignItems: 'center',
          }}
        >
          <FontAwesome5 name='flag-checkered' size={24} color='black' />
          <Text h3 h3Style={{ alignSelf: 'center' }}>
            {arrival_city}
          </Text>
          <Text h5 h5Style={{ alignSelf: 'center' }}>
            {arrival_name}
          </Text>
        </View>
      </HideWithKeyboard>
    );
  } else if (arrival_city !== '' && arrival_city == arrival_name) {
    arrivalDisplay = (
      <HideWithKeyboard>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#FEFAEA',
            alignItems: 'center',
          }}
        >
          <FontAwesome5 name='flag-checkered' size={24} color='black' />
          <Text h4 h4Style={{ alignSelf: 'center' }}>
            {arrival_city}
          </Text>
        </View>
      </HideWithKeyboard>
    );
  }

  var etapesDisplay = <></>;
  if (arrival_city !== '' && arrival_name !== arrival_city) {
    etapesDisplay = (
      <HideWithKeyboard>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#FEFAEA',
            alignItems: 'center',
          }}
        >
          <FontAwesome5 name='flag-checkered' size={24} color='black' />
          <Text h3 h3Style={{ alignSelf: 'center' }}>
            {arrival_city}
          </Text>
          <Text h5 h5Style={{ alignSelf: 'center' }}>
            {arrival_name}
          </Text>
        </View>
      </HideWithKeyboard>
    );
  } else if (arrival_city !== '' && arrival_city == arrival_name) {
    etapesDisplay = (
      <HideWithKeyboard>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#FEFAEA',
            alignItems: 'center',
          }}
        >
          <FontAwesome5 name='flag-checkered' size={24} color='black' />
          <Text h4 h4Style={{ alignSelf: 'center' }}>
            {arrival_city}
          </Text>
        </View>
      </HideWithKeyboard>
    );
  }
  var overlays = (
    <View>
      <Overlay
        isVisible={thisVisible}
        onBackdropPress={() => {
          setThisVisible(false);
        }}
        overlayStyle={{
          borderRadius: 10,
          marginTop: deviceHeight * 0.05,
          marginBottom: deviceHeight * 0.02,
          marginHorizontal: deviceWidth * 0.02,
          height: deviceHeight * 0.5,
        }}
      >
        <View
          style={{
            width: deviceWidth * 0.85,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text h4 h3Style={{ alignSelf: 'center' }}>
            On part d'où ?
          </Text>
          <GooglePlacesAutocomplete
            placeholder='Sélectionnez un lieu de départ...'
            fetchDetails={true}
            onPress={(data, details = null) => {
              setDeparture_Lat(details.geometry.location.lat);

              setDeparture_Lng(details.geometry.location.lng);
              setDeparture_place_id(details.place_id);
              setDeparture_name(details.name);
              setArrivalButtonVisible(true);

              for (var i = 0; i < details.address_components.length; i++) {
                if (details.address_components[i].types[0] == 'locality') {
                  setDeparture_city(details.address_components[i].long_name);
                }
              }
            }}
            query={{
              key: `${APIGOOGLE}`,
              language: 'fr',
            }}
            textInputProps={{
              InputComp: Input,
              leftIcon: { type: 'font-awesome', name: 'search' },
              errorStyle: { color: 'red' },
            }}
            enablePoweredByContainer={false}
            styles={{
              textInputContainer: {
                backgroundColor: '#FFF9DA',
                width: '100%',
                alignSelf: 'center',
                borderWidth: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginTop: 10,
                marginBottom: 10,
              },
              textInput: {
                color: 'black',
                fontSize: 16,
              },

              listView: {
                color: 'black',
              },
              row: {
                backgroundColor: '#FFF9DA',
                padding: 13,
                height: 44,
                flexDirection: 'row',
                width: '100%',
                alignSelf: 'center',
              },
            }}
          />
          {departureDisplay}
        </View>

        <HideWithKeyboard>
          <Button
            title='VALIDER'
            icon={{
              name: 'arrow-circle-right',
              type: 'font-awesome',
              size: 19,
              color: 'white',
            }}
            isVisible={arrivalButtonVisible}
            containerStyle={{
              height: 40,
              width: '60%',
              marginHorizontal: 0,
              marginVertical: 10,
              alignSelf: 'center',
            }}
            onPress={() => {
              setThisVisible(false),
                setThisVisible1(true),
                setThisVisible2(false);
            }}
            buttonStyle={{
              backgroundColor: '#ff8b00',
              borderRadius: 15,
            }}
            titleStyle={{
              color: 'white',
              fontWeight: 'bold',
              alignSelf: 'center',
            }}
          />
        </HideWithKeyboard>
      </Overlay>
      <Overlay
        isVisible={thisVisible1}
        onBackdropPress={() => {
          setThisVisible(false);
          setThisVisible2(false);
        }}
        overlayStyle={{
          borderRadius: 10,
          marginTop: deviceHeight * 0.05,
          marginBottom: deviceHeight * 0.02,
          marginHorizontal: deviceWidth * 0.02,
          height: deviceHeight * 0.7,
        }}
      >
        <View
          style={{
            width: deviceWidth * 0.85,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text h4 h3Style={{ alignSelf: 'center' }}>
            On va où ?
          </Text>
          <GooglePlacesAutocomplete
            placeholder="Sélectionnez le point d'arrivée ..."
            fetchDetails={true}
            onPress={(data, details = null) => {
              setArrival_Lat(details.geometry.location.lat);

              setArrival_Lng(details.geometry.location.lng);
              setArrival_place_id(details.place_id);
              setArrival_name(details.name);

              for (var i = 0; i < details.address_components.length; i++) {
                if (details.address_components[i].types[0] == 'locality') {
                  setArrival_city(details.address_components[i].long_name);
                }
              }
            }}
            query={{
              key: `${APIGOOGLE}`,
              language: 'fr',
            }}
            textInputProps={{
              InputComp: Input,
              leftIcon: { type: 'font-awesome', name: 'search' },
              errorStyle: { color: 'red' },
            }}
            enablePoweredByContainer={false}
            styles={{
              textInputContainer: {
                backgroundColor: '#FFF9DA',
                width: '100%',
                alignSelf: 'center',
                borderWidth: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginTop: 30,
                marginBottom: 10,
              },
              textInput: {
                color: 'black',
                fontSize: 16,
              },

              listView: {
                color: 'black',
              },
              row: {
                backgroundColor: '#FFF9DA',
                padding: 13,
                height: 44,
                flexDirection: 'row',
                width: '100%',
                alignSelf: 'center',
              },
            }}
          />
        </View>

        {departureDisplay}
        {arrivalDisplay}
        <HideWithKeyboard>
          <Button
            title='ÉTAPES'
            containerStyle={{
              height: 40,
              marginVertical: 10,
            }}
            icon={{
              name: 'plus',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            onPress={() => {
              setThisVisible2(true), setThisVisible1(false);
              setThisVisible(false);
            }}
            buttonStyle={{
              backgroundColor: '#ff8b00',
              borderRadius: 15,
            }}
            titleStyle={{
              color: '#FEFAEA',
              fontWeight: 'bold',
              alignSelf: 'center',
            }}
          />
          <Button
            title='VALIDER'
            icon={{
              name: 'check-circle',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            containerStyle={{
              height: 40,
              marginHorizontal: 0,
              marginVertical: 10,
              marginLeft: 5,
            }}
            onPress={() => setThisVisible1(false)}
            buttonStyle={{
              backgroundColor: '#363432',
              borderRadius: 15,
            }}
            titleStyle={{
              color: '#FEFAEA',
              fontWeight: 'bold',
              alignSelf: 'center',
            }}
          />
        </HideWithKeyboard>
      </Overlay>

      <Overlay
        isVisible={thisVisible2}
        onBackdropPress={() => {
          setThisVisible(false);
          setThisVisible1(false);
        }}
        overlayStyle={{
          borderRadius: 10,
          marginTop: deviceHeight * 0.05,
          marginBottom: deviceHeight * 0.02,
          marginHorizontal: deviceWidth * 0.02,
          height: deviceHeight * 0.7,
        }}
      >
        <View
          style={{
            width: deviceWidth * 0.85,
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text h4 h3Style={{ alignSelf: 'center' }}>
            Les étapes du roadtrip
          </Text>
          <GooglePlacesAutocomplete
            placeholder="Sélectionnez l'étape..."
            ref={ref}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setEtape_Lat(details.geometry.location.lat);
              // console.log(
              //   "details.geometry.location.lng  Etape=",
              //   details.geometry.location.lng
              // );
              setEtape_Lng(details.geometry.location.lng);
              // console.log("details.place_id   Etape=", details.place_id);
              setEtape_place_id(details.place_id);
              // console.log("details.name  Etape=", details.name);
              setEtape_name(details.name);
              //****ajout fonction mathieu******
              var cityname = '';
              for (var i = 0; i < details.address_components.length; i++) {
                if (details.address_components[i].types[0] == 'locality') {
                  cityname = details.address_components[i].long_name;
                }
              }
              addEtap(
                details.place_id,
                details.name,
                cityname,
                details.geometry.location.lat,
                details.geometry.location.lng
              );
            }}
            query={{
              key: `${APIGOOGLE}`,
              language: 'fr',
            }}
            textInputProps={{
              InputComp: Input,
              leftIcon: { type: 'font-awesome', name: 'search' },
              errorStyle: { color: 'red' },
            }}
            enablePoweredByContainer={false}
            styles={{
              textInputContainer: {
                backgroundColor: '#FFF9DA',
                width: '100%',
                alignSelf: 'center',
                borderWidth: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                marginTop: 30,
                marginBottom: 10,
              },
              textInput: {
                color: 'black',
                fontSize: 16,
              },

              listView: {
                color: 'black',
              },
              row: {
                backgroundColor: '#FFF9DA',
                padding: 13,
                height: 44,
                flexDirection: 'row',
                width: '100%',
                alignSelf: 'center',
              },
            }}
          />
        </View>
        <HideWithKeyboard>
          <Button
            title='AJOUTER UNE ÉTAPE'
            containerStyle={{
              height: 40,
              marginVertical: 10,
            }}
            icon={{
              name: 'plus',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            onPress={() => {
              ref.current?.clear();
            }}
            buttonStyle={{
              backgroundColor: '#ff8b00',
              borderRadius: 15,
            }}
            titleStyle={{
              color: '#FEFAEA',
              fontWeight: 'bold',
              alignSelf: 'center',
            }}
          />
          <Button
            title='VALIDER'
            icon={{
              name: 'check-circle',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            containerStyle={{
              height: 40,
              marginHorizontal: 0,
              marginVertical: 10,
              marginLeft: 5,
            }}
            onPress={() => {
              setThisVisible(false), setThisVisible1(false);
              setThisVisible2(false);
              captureViewRef.current.animateToRegion({
                latitude: departure_Lat,
                longitude: departure_Lng,
                latitudeDelta: 1,
                longitudeDelta: 1,
              });
            }}
            buttonStyle={{
              backgroundColor: '#363432',
              borderRadius: 15,
            }}
            titleStyle={{
              color: '#FEFAEA',
              fontWeight: 'bold',
              alignSelf: 'center',
            }}
          />
        </HideWithKeyboard>
      </Overlay>
    </View>
  );
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: '#FEFAEA',
        width: deviceWidth,
        alignContent: 'center',
      }}
    >
      <HeaderRNE
        backgroundColor='#FFD230'
        centerComponent={{
          text: 'CRÉATION ITINÉRAIRE',
          style: styles.heading,
        }}
      />

      <MapView
        ref={captureViewRef}
        style={{
          height: deviceHeight * 0.7,
        }}
        initialRegion={myInitialRegion}
      >
        <Marker
          size={10}
          pinColor='#ff8b00'
          coordinate={{
            latitude: departure_Lat,
            longitude: departure_Lng,
          }}
          title={`${departure_city}`}
          description={departure_name}
        ></Marker>
        <Marker
          size={10}
          pinColor='#ff8b00'
          coordinate={{
            latitude: arrival_Lat,
            longitude: arrival_Lng,
          }}
          title={`${arrival_city}`}
          description={arrival_name}
        ></Marker>
        {markerEtapes}
        <Polyline
          style={{}}
          coordinates={coords_parcours}
          strokeColor={'#363432'}
          strokeWidth={4}
        />
      </MapView>

      {bottomButtons}
      {overlays}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#363432',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
