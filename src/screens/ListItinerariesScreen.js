import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Icon,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
        <Card>
          <View
            style={{
              alignSelf: 'center',
              width: '70%',
              paddingBottom: '2%',
            }}
          >
            <Text>Ville de départ :{itinerary.start.city}</Text>
            <Text>Ville d'arrivée :{itinerary.arrival.city}</Text>
          </View>
          <Image
            size={64}
            style={{ height: 200, width: 350 }}
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
  return <ScrollView>{cardItineraries}</ScrollView>;
}
