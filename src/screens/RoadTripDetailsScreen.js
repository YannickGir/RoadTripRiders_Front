import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
//import header
import { Header as HeaderRNE } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';
// fin import header
import { MA_VARIABLE } from '@env';
import CustomInputWithoutPlaceholder from '../components/CustomInputWithoutPlaceholder';
import CustomLongInputWithoutPlaceholder from '../components/CustomLongInputWithoutPlaceholder';
import CustomButton from '../components/CustomButton';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const RoadTripDetailsScreen = (props) => {
  const [selectTripDesc, setSelectTripDesc] = useState('');
  const [selectDepartureCity, setSelectDepartureCity] = useState('');
  const [selectArrivalCity, setSelectArrivalCity] = useState('');
  const [selectDepartureTime, setSelectDepartureTime] = useState('');
  const [selectArrivalTime, setSelectArrivalTime] = useState('');
  const [selectBikeCateg, setSelectBikeCateg] = useState('');
  const [selectGroupSize, setSelectGroupSize] = useState('');
  const [remainingTickets, setRemainingTickets] = useState('');
  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaProvider>
          <HeaderRNE
            backgroundColor='#FFD230'
            leftComponent={
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('BottomNavigator', {
                    screen: 'HomeScreen',
                  })
                }
              >
                <AntDesign name='arrowleft' color='#363432' size={30} />
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'LE ROADTRIP',
              style: styles.heading,
            }}
          />
        </SafeAreaProvider>

        <View style={styles.secondary}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFD230',
              padding: 10,
              height: 120,
              width: 340,
              borderRadius: 15,
              margin: 10,
              marginTop: '10%',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/la-capsule-batch-49/image/upload/v1646668605/kisspng-memoji-pile-of-poo-emoji-sticker-smiley-user-avatars-5ae24b6a0ff6a1.1779418215247798820654_nukosr.png',
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: '5%',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 50,
                  }}
                />
              </View>
              <View>
                <Text style={{ fontSize: 20 }}>
                  La sortie de Prénom à ajouter
                </Text>
                <Text>
                  <FontAwesome name='motorcycle' size={30} color='#363432' />{' '}
                  Titre de la sortie
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 0,
  },
  secondary: {
    flexDirection: 'row',
  },
  //style pour le header
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    marginBottom: 10,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: '#363432',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#FFD230',
  },
  //fin du style pour le header
});

export default RoadTripDetailsScreen;
