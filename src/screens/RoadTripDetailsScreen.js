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
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';
// fin import header
import { MA_VARIABLE } from '@env';
import CustomInputWithoutPlaceholder from '../components/CustomInputWithoutPlaceholder';
import CustomLongInputWithoutPlaceholder from '../components/CustomLongInputWithoutPlaceholder';
import CustomInputTimeWithoutPlaceholder from '../components/CustomInputTimeWithoutPlaceholder';
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
              marginTop: '5%',
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
                <Text>Titre de la sortie</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.centered}>
          <Text style={{ paddingTop: '2%', paddingBottom: '2%' }}>
            Un peu plus de détail sur ce Roadtrip
          </Text>
          <CustomLongInputWithoutPlaceholder />
          <Text style={{ paddingTop: '2%', paddingBottom: '4%' }}>
            L'itinéraire
          </Text>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/la-capsule-batch-49/image/upload/v1646669835/m4fhqwiqunvjcidxvfg2.jpg',
            }}
            style={{
              width: 340,
              height: 250,
              alignContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
            }}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
              flexDirection: 'row',
              backgroundColor: '#FFD230',
              padding: 10,
              height: 80,
              width: 340,
              borderRadius: 15,
              margin: 10,
              marginTop: '2%',
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
                XX km
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
                XX h
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
                Cool
              </Text>
            </View>
          </View>
          <Text style={{ paddingTop: '2%', paddingBottom: '2%' }}>
            <FontAwesome5 name='flag' size={24} color='#363432' /> Départ
          </Text>
          <CustomInputWithoutPlaceholder />
          <Text style={{ paddingTop: '2%', paddingBottom: '2%' }}>
            <FontAwesome5 name='flag-checkered' size={24} color='#363432' />{' '}
            Arrivée
          </Text>
          <CustomInputWithoutPlaceholder />
          <Text style={{ paddingTop: '2%' }}>
            <FontAwesome5 name='clock' size={24} color='#363432' /> Horaires
          </Text>
        </View>
        <View style={styles.secondaryTime}>
          <FontAwesome5 name='flag' size={24} color='#363432' />
          <CustomInputTimeWithoutPlaceholder />
          <FontAwesome5 name='flag-checkered' size={24} color='#363432' />
          <CustomInputTimeWithoutPlaceholder />
        </View>
        <View style={styles.secondary}>
          <View style={styles.button}>
            <FontAwesome
              name='group'
              size={60}
              color='#363432'
              style={{ paddingTop: 20, paddingBottom: 10 }}
            />
            <Text>Taille du Groupe</Text>
            <Text>XX</Text>
          </View>
          <View
            style={styles.button}
            onPress={() =>
              props.navigation.navigate('UserInfosEdition', {
                screen: 'UserInfosEditionScreen',
              })
            }
          >
            <FontAwesome5
              name='hand-peace'
              size={60}
              color='#363432'
              style={{ paddingTop: 20, paddingBottom: 10 }}
            />

            <Text>Places restantes</Text>
            <Text>XX</Text>
          </View>
        </View>
        <View style={styles.centered}>
          <Text style={{ paddingTop: '2%', paddingBottom: '2%' }}>
            <FontAwesome name='motorcycle' size={24} color='#363432' />{' '}
            Catégorie de Motos
          </Text>
          <CustomInputWithoutPlaceholder />
        </View>
        <CustomButton title="S'INSCRIRE" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFEDAC',
    padding: 10,
    height: 160,
    width: 160,
    borderRadius: 15,
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
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
