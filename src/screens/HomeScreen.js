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
} from 'react-native';
import { MA_VARIABLE } from '@env';
import CustomHeaderNoArrow from '../components/CustomHeaderNoArrow';
import CustomButton from '../../src/components/CustomButton';
import { Card, Text } from 'react-native-elements';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../../src/components/CustomInput';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
export default function HomepageScreen(props) {
  const [roadTripList, setRoadTripList] = useState([]);
  useEffect(() => {
    async function loadRoadTrip() {
      const data = await fetch(`${MA_VARIABLE}/roadtriplist`);
      var body = await data.json();
      console.log('body', body);

      setRoadTripList(
        body.map((tripData, i) => {
          return (
            <TouchableOpacity key={i}>
              <Card containerStyle={styles.card}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: '70%',
                  }}
                >
                  <Image
                    style={styles.avatar}
                    source={{ uri: tripData.user_photo }}
                  />
                  <Text style={{ paddingLeft: '3%' }}>
                    {tripData.firstname}
                  </Text>
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    width: '70%',
                    paddingBottom: '2%',
                  }}
                >
                  <Text style={styles.titleText}>{tripData.event_title}</Text>
                  <Text>
                    <FontAwesome name='star' size={14} color='black' />
                    <FontAwesome name='star' size={14} color='black' />
                    <FontAwesome name='star' size={14} color='black' />
                    <FontAwesome name='star' size={14} color='black' />
                    <FontAwesome name='star-half' size={14} color='black' />
                  </Text>
                </View>
                <Image
                  size={64}
                  style={styles.map}
                  source={{ uri: tripData.screenMap }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <View>
                    <Text>Distance :</Text>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}
                    >
                      {tripData.distance} km
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
                      {tripData.duration}h
                    </Text>
                  </View>
                  <View>
                    <Text>Niveau :</Text>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}
                    >
                      {tripData.driving_type}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          );
        })
      );
    }

    loadRoadTrip();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeaderNoArrow
        containerStyle={{ paddingTop: 100 }}
        title='Sorties'
      />
      <ScrollView style={{ flex: 1, width: '100%' }}>{roadTripList}</ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <CustomButton title='CREER UN TRIP' />
        <Button
          icon={<Icon name='arrow-right' size={20} color='#eb4d4b' />}
          title='go to itinerary !'
          type='solid'
          onPress={() =>
            props.navigation.navigate('Itinerary', {
              screen: 'ItineraryScreen',
            })
          }
        />
        <Button
          icon={<Icon name='arrow-right' size={20} color='#eb4d4b' />}
          title='go to roadtripList !'
          type='solid'
          onPress={() =>
            props.navigation.navigate('RoadtripList', {
              screen: 'RoadtripListScreen',
            })
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
    paddingTop: '10%',
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
  avatar: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 35,
    width: 50,
    height: 50,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: 150,
    paddingTop: '2%',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
