import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Icon,
  Image,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import pour le header
import { Header as HeaderRNE } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Logo from '../../assets/images/tinyLogoRR.png';
// fin import pour le header

import { MA_VARIABLE, APIGOOGLE } from '@env';
import { connect } from 'react-redux';
import CustomHeaderNoArrow from '../../src/components/CustomHeaderNoArrow';
import CustomButton from '../../src/components/CustomButton';
import {
  Card,
  Text,
  Overlay,
  Rating,
  RatingProps,
} from 'react-native-elements';
//import { Fontawesome, Ionicons } from "@expo/vector-icons";
//import CustomHeader from "../components/CustomHeader";
//import LoadingOverlay from "../../components/LoadingOverlay";
//import { Header as HeaderRNE } from "react-native-elements";
//import { SafeAreaProvider } from "react-native-safe-area-context";
//import CustomButtonOrange from "../../src/components/CustomButtonOrange";

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

export default function ListItinerariesScreen(props) {
  const [itinerariesData, setItinerariesData] = useState([]);
  const [sectotime, setSectotime] = useState(''); //durée du trip en sring HH/MM

  const secToTime = (totalsecondes) => {
    hours = Math.floor(totalsecondes / 3600);
    totalsecondes %= 3600;
    minutes = Math.floor(totalsecondes / 60);
    seconds = Math.floor(totalsecondes % 60);
    return hours + 'h:' + minutes + 'min';
  };

  useEffect(() => {
    const displayItineraries = async () => {
      var rawResponse = await fetch(`${MA_VARIABLE}/itineraries/itineraryList`);
      const response = await rawResponse.json();
      //console.log("console du fetch", response);
      setItinerariesData(response.itinerariesList);

      setSectotime(secToTime(response.duration));
    };
    displayItineraries();
  }, []);

  var cardItineraries = itinerariesData.map((itinerary, i) => {
    var durationitinerary = secToTime(itinerary.duration);
    //console.log("chemin photo", itinerary.snapshot);
    return (
      <TouchableOpacity
        key={i}
        onPress={() =>
          props.navigation.navigate('DisplayItinerary', {
            screen: 'DisplayItineraryScreen',
            itinerary_id: itinerary._id,
          })
        }
      >
        <Card containerStyle={styles.card}>
          <View
            style={{
              alignSelf: 'center',
              width: '70%',
              paddingBottom: '2%',
            }}
          >
            <Text>
              <FontAwesome5 name='flag' size={15} color='black' /> Ville de
              départ: {itinerary.start.city}
            </Text>
            <Text>
              <FontAwesome5 name='flag-checkered' size={15} color='black' />{' '}
              Ville d'arrivée: {itinerary.arrival.city}
            </Text>
          </View>
          <Image
            size={64}
            style={{ height: 200, width: deviceWidth * 0.85 }}
            source={{ uri: itinerary.snapshot }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <View>
              <Text>Distance Parcours :</Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
              >
                {Math.round(itinerary.distance)} Kms
              </Text>
            </View>
            <View>
              <Text>Durée :</Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
              >
                {durationitinerary}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  });
  return (
    <SafeAreaProvider style={{ backgroundColor: '#FEFAEA' }}>
      <HeaderRNE
        backgroundColor='#FFD230'
        leftComponent={
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('newRoadTripFirstStep', {
                screen: 'CreateRoadTripScreenFirstStep',
              })
            }
          >
            <AntDesign name='arrowleft' color='#363432' size={30} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'LISTE DES ITINERAIRES',
          style: styles.heading,
        }}
        rightComponent={
          <View style={styles.headerRight}>
            <Image source={Logo} style={styles.logo2} />
          </View>
        }
      />
      <ScrollView>{cardItineraries}</ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: '#FFEDAC',
    borderRadius: 15,
  },
  heading: {
    fontSize: 18,
    width: '100%',
    paddingVertical: '2%',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
  },
  logo2: {
    width: '50%',
    height: '700%',
    marginBottom: '7%',
  },
});
