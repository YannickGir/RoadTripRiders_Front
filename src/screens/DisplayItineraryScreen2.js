import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input, Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { captureRef } from 'react-native-view-shot';
import { MA_VARIABLE, APIGOOGLE } from '@env';
import CustomButtonOrange from '../components/CustomButtonOrange';
import CustomButton from '../components/CustomButton';
import CustomHeaderNoArrow from '../components/CustomHeaderNoArrow';
import { Dimensions } from 'react-native'; //************  pour mettre du style sur les overlays */
import CustomTextBackground from '../components/CustomTextBackground';
// import pour le header
import { Header as HeaderRNE } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
// fin import pour le header

import { connect } from 'react-redux';

var polyline = require('@mapbox/polyline');

//**************************** Variable pour mettre du style sur les overlays */
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function DisplayItineraryScreen2(props) {
  const ref = useRef();

  console.log('DisplayItineraryScreen lancé');
  const [displayItineraryData, setDisplayItineraryData] = useState([]);
  const [sectotime, setSectotime] = useState(''); //durée du trip en sring HH/MM
  //const [idrecup, setIdrecup] = useState(props.route.params.itinerary_id);
  const [etapDisplay, setEtapDisplay] = useState(<></>);
  const [startDisplay, setStartDisplay] = useState(<></>);
  const [arrivalDisplay, setArrivalDisplay] = useState(<></>);
  const [polylinePoints, setPolylinePoints] = useState([]);
  const [nomDepart, setNomDepart] = useState('');
  const [nomFinish, setNomFinish] = useState('');
  const [distance, setDistance] = useState('');
  const [listEtap, setListEtap] = useState('');

  const secToTime = (totalsecondes) => {
    hours = Math.floor(totalsecondes / 3600);
    totalsecondes %= 3600;
    minutes = Math.floor(totalsecondes / 60);
    seconds = Math.floor(totalsecondes % 60);
    return hours + 'h:' + minutes + 'min';
  };

  useEffect(() => {
    //console.log("debut Useeffect");
    const displayItinerary = async () => {
      var rawResponse = await fetch(
        `${MA_VARIABLE}/itineraries/display?id=${props.route.params.itinerary_id}`
      );
      const response = await rawResponse.json();
      console.log('console du fetch response', response);
      setDisplayItineraryData(response.itinerarychoiced);

      setSectotime(secToTime(response.itinerarychoiced.duration));
      ref.current.animateToRegion({
        latitude: response.itinerarychoiced.start.lat,
        longitude: response.itinerarychoiced.start.lon,
        latitudeDelta: 1,
        longitudeDelta: 1,
      });
      setNomDepart(response.itinerarychoiced.start.city);
      setNomFinish(response.itinerarychoiced.arrival.city);
      setDistance(response.itinerarychoiced.distance);

      setEtapDisplay(
        response.itinerarychoiced.etapes.map((etape, j) => {
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
        })
      );

      setStartDisplay(
        <Marker
          size={10}
          pinColor='black'
          coordinate={{
            latitude: response.itinerarychoiced.start.lat,
            longitude: response.itinerarychoiced.start.lon,
          }}
          title='Départ'
          description={response.itinerarychoiced.start.departure_name}
        ></Marker>
      );
      setArrivalDisplay(
        <Marker
          pinColor='black'
          coordinate={{
            latitude: response.itinerarychoiced.arrival.lat,
            longitude: response.itinerarychoiced.arrival.lon,
          }}
          title='Arrivée'
          description={response.itinerarychoiced.arrival.arrival_name}
        ></Marker>
      );
      let coords = response.itinerarychoiced.waypoints.map((point, index) => ({
        latitude: parseFloat(point.latitude),
        longitude: parseFloat(point.longitude),
      }));
      setPolylinePoints(coords);
    };
    displayItinerary();
  }, []);

  return (
    <SafeAreaProvider style={{ backgroundColor: '#FEFAEA' }}>
      <HeaderRNE
        backgroundColor='#FFD230'
        leftComponent={
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Homepage', {
                screen: 'HomeScreen',
              })
            }
          >
            <AntDesign name='arrowleft' color='#363432' size={30} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'DÉTAIL DU PARCOURS',
          style: styles.heading,
        }}
      />
      <MapView
        ref={ref}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 46.866667, // pour centrer la carte
          longitude: 2.333333,
          latitudeDelta: 7.5, // le rayon à afficher à partir du centre
          longitudeDelta: 7.5,
        }}
        zoomEnabled={true}
      >
        {startDisplay}
        {arrivalDisplay}
        {etapDisplay}
        <Polyline
          style={{}}
          coordinates={polylinePoints}
          strokeColor={'#363432'}
          strokeWidth={4}
        />
      </MapView>

      <View>
        <View
          style={{ paddingBottom: '5%', paddingTop: 10, paddingLeft: '13%' }}
        >
          <CustomTextBackground text1=' Ville de départ :' text2={nomDepart} />

          <CustomTextBackground text1="Ville d'arrivée :" text2={nomFinish} />
          <CustomTextBackground text1='Durée :' text2={sectotime} />
          <CustomTextBackground text1='Distance en KMs:' text2={distance} />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: '#363432',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#FFD230',
  },
});
