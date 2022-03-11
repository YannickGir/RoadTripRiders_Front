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
  useWindowDimensions,
} from 'react-native';
import { MA_VARIABLE } from '@env';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import CustomHeaderNoArrow from '../components/CustomHeaderNoArrow';
import CustomButton2 from '../../src/components/CustomButton2';
import {
  Card,
  Text,
  Overlay,
  Rating,
  RatingProps,
} from 'react-native-elements';
import Logo from '../../assets/images/tinyLogoRR.png';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import CustomInput from '../../src/components/CustomInput';
import LoadingOverlay from '../../src/components/LoadingOverlay';
import { Header as HeaderRNE } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomButtonOrange from '../../src/components/CustomButtonOrange';
import LottieView from 'lottie-react-native';
import AnimatedLoader from 'react-native-animated-loader';
import animationMoto from '../lotties/motorcycle-loading.json';
import CustomTextBackground2 from '../../src/components/CustomTextBackground2 ';
import { RadioButton } from 'react-native-paper';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

function CreateRoadTripScreenFirstStep(props) {
  const [roadTripList, setRoadTripList] = useState([]);
  const [visible, setVisible] = useState(true);
  const isFocused = useIsFocused();
  const scrollViewRef = useRef(ScrollView);
  const ratingProps = {};
  const [choiceList, setChoiceList] = useState('admin');
  useEffect(() => {
    async function loadUserData() {
      const dataUser = await fetch(
        `${MA_VARIABLE}/users/user-data?token=${props.token}`
      );
      var bodyUser = await dataUser.json();
      props.onSubmitUserData({
        avatar: bodyUser.userData.user_photo,
        username: bodyUser.userData.firstname,
      });
    }
    loadUserData();
  }, [props.token]);

  const { height } = useWindowDimensions();

  const [sectotime, setSectotime] = useState('');
  const secToTime = (totalsecondes) => {
    hours = Math.floor(totalsecondes / 3600);
    totalsecondes %= 3600;
    minutes = Math.floor(totalsecondes / 60);
    seconds = Math.floor(totalsecondes % 60);
    return hours + 'h:' + minutes + 'min:';
  };
  //-------------------pour effet radio couleur des boutons------------------------
  const [checked, setChecked] = useState('cool');
  useEffect(() => {
    async function loadRoadTrip() {
      const data = await fetch(`${MA_VARIABLE}roadtriplist`);
      var body = await data.json();
      // console.log("body", body);

      setRoadTripList(
        body.map((tripData, i) => {
          var durationHour = secToTime(tripData.duration);
          var durationHour2 = durationHour.slice(0, -4);
          var km = parseInt(tripData.distance);

          setVisible(false);
          return (
            <TouchableOpacity
              key={i}
              onPress={() =>
                props.navigation.navigate('RoadTripDetails', {
                  tripId: tripData._id,
                  itinerary_id: tripData.itinerary_id,
                })
              }
            >
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
                  <Rating
                    type='custom'
                    ratingColor='#f1c40f'
                    tintColor='#FFEDAC'
                    readonly
                    ratingCount={5}
                    startingValue={tripData.rating}
                    imageSize={15}
                    style={{ alignSelf: 'flex-start' }}
                  />
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
                      {km} km
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
                      {durationHour2}
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
  }, [isFocused]);
  console.log('test');
  //récupération de la liste des roadtrips dont l'utilisateur connecté est inscrit--------------------
  // useEffect(() => {
  //   console.log("useeffect activé");

  //   const getDataitinerary = async () => {
  //     const dataItinerary = await fetch(
  //       `https://roadtripridersyann.herokuapp.com/itineraries/user/get-list-participate-roadtrip?userTokenFromFront=${props.token}`
  //     );
  //     var dataItineraryParse = await dataItinerary.json();
  //     console.log("dataItineraryParse", dataItineraryParse);

  //     setDeparture_city(dataItineraryParse.itineraryData.start.city);
  //     setArrival_city(dataItineraryParse.itineraryData.arrival.city);
  //     setMap_itinerary(dataItineraryParse.itineraryData.snapshot);
  //     console.log(
  //       "dataItineraryParse.itineraryData.snapshot.",
  //       dataItineraryParse.itineraryData.snapshot
  //     );
  //   };
  //   if (props.route.params.itinerary_id) {
  //     getDataitinerary();
  //   }
  // }, [isFocused]);

  console.log('test');

  var pagecontent = <></>;

  if (choiceList == 'admin') {
    pagecontent = (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <CustomTextBackground2
          style={{ marginBottom: 10 }}
          text1={'Sorties que tu avais organisé'}
        />
        <ScrollView style={{ width: '100%' }}>
          <View style={{ flexDirection: 'column-reverse' }}>
            <AnimatedLoader
              visible={visible}
              source={require('../lotties/loading-dots-in-yellow.json')}
              overlayColor='rgba(255,255,255,0.75)'
              speed={1}
              animationStyle={{ height: 300, width: 300 }}
            ></AnimatedLoader>

            {roadTripList}
          </View>
        </ScrollView>
      </View>
    );
  } else if (choiceList == 'participate') {
    pagecontent = (
      <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
        <CustomTextBackground2 text1={"Sorties où tu t'étais inscrit"} />

        <ScrollView style={{ width: '100%' }}>
          <View style={{ flexDirection: 'column-reverse' }}>
            <AnimatedLoader
              visible={visible}
              source={require('../lotties/motorcycle-loading.json')}
              overlayColor='rgba(255,255,255,0.75)'
              speed={1}
              animationStyle={{ height: 300, width: 300 }}
            ></AnimatedLoader>

            {roadTripList}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaProvider
      style={{ backgroundColor: '#FEFAEA', alignItems: 'center' }}
    >
      <HeaderRNE
        backgroundColor='#FFD230'
        leftComponent={
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Mon Compte', {
                screen: 'MyAccountScreen',
              })
            }
          >
            <AntDesign name='arrowleft' color='#363432' size={30} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'TES SORTIES PASSEES',
          style: styles.heading,
        }}
        rightComponent={
          <View style={styles.headerRight}>
            <Image source={Logo} style={styles.logo2} />
          </View>
        }
        onPress={() => reloadRoadTrip()}
      />
      <View
        style={{
          backgroundColor: '#FEFAEA',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '5%',
          }}
        >
          <RadioButton
            value='cool'
            status={checked === 'cool' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChoiceList('admin'), setChecked('cool');
            }}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
            SORTIES ORGANISEES
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '5%',
          }}
        >
          <RadioButton
            value='Sportif'
            status={checked === 'Sportif' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChoiceList('participate'), setChecked('Sportif');
            }}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
            SORTIES INSCRIS
          </Text>
        </View>
      </View>

      {pagecontent}
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

  image: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',

    marginTop: -200,
    borderColor: 'transparent',
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

  heading: {
    fontSize: 22,
    width: '120%',
    paddingVertical: '2%',
    fontWeight: 'bold',
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

function mapStateToProps(state) {
  console.log('HOMESCREEN', state.token, state);
  return { token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitUserData: function (userDataObject) {
      dispatch({ type: 'saveUserData', userData: userDataObject });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoadTripScreenFirstStep);
