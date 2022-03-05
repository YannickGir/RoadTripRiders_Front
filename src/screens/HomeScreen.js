import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Icon,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MA_VARIABLE } from '@env';
import { Card } from 'react-native-elements';
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
            <Card
              key={i}
              containerStyle={{ backgroundColor: '#FFEDAC', width: '100%' }}
            >
              <View>
                <Image style={styles.avatar} source={{}} />
                <Text></Text>
              </View>
              <View>
                <Text>{tripData.event_title}</Text>
                <Text>Stars</Text>
              </View>
              <Image />
              <View>
                <Text>Distancejhiokmhfmu</Text>
                <Text>km</Text>
              </View>
              <View>
                <Text>Durée :</Text>
                <Text>H</Text>
              </View>
              <View>
                <Text>Niveau :</Text>
                <Text>cool</Text>
              </View>
            </Card>
          );
        })
      );
    }

    loadRoadTrip();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        {roadTripList}

        <Text>Homepage Screen</Text>
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
      </ScrollView>
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
  },
});
