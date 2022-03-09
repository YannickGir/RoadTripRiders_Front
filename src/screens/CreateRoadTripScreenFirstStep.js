import React, { useState, Component, useEffect } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  useWindowDimensions,
  Dimensions,
  Switch,
} from 'react-native';
import { connect } from 'react-redux';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomTimeNewTripInput from '../components/CustomTimeNewTripInput';
import CustomNewTripInput from '../components/CustomNewTripInput';
import CustomButtonOrange from '../components/CustomButtonOrange';
import CustomButtonOrangeNext from '../components/CustomButtonOrangeNext';
import CustomHeader from '../components/CustomHeader';
import CustomButtonValidation from '../components/CustomButtonValidation';
import CustomButtonChoice from '../components/CustomButtonChoice';
import CustomButtonChoiceValidate from '../components/CustomButtonChoiceValidate';
import { MA_VARIABLE } from '@env';
import CustomBikeCategPicker2 from '../components/CustomBikeCategPicker2';
import CustomDatePicker from '../components/CustomDatePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-simple-time-picker';

//------------pour barre de progression----nb installé : npm install react-native-step-indicator --save   -----------------------
import StepIndicator from 'react-native-step-indicator';
import { color } from 'react-native-elements/dist/helpers';
const labels = [
  'Cart',
  'Delivery Address',
  'Order Summary',
  'Payment Method',
  'Track',
];

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#ff8b00',
  stepStrokeUnFinishedColor: '#363432',
  separatorFinishedColor: '#ff8b00',
  separatorUnFinishedColor: '#363432',
  stepIndicatorFinishedColor: '#ff8b00',
  stepIndicatorUnFinishedColor: '#363432',
  stepIndicatorCurrentColor: '#FEFAEA',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ff8b00',
  stepIndicatorLabelFinishedColor: '#FEFAEA',
  stepIndicatorLabelUnFinishedColor: '#FEFAEA',
  labelSize: 13,
};

function CreateRoadTripScreenFirstStep(props) {
  // On définit ici les variables d'état qui vont nous servir à enregistrer les valeurs des inputs
  const [event_title, setEvent_title] = useState('');
  const [date_sortie, setDate_sortie] = useState('');

  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();

  // Barre de progression
  const [formProgress, setFormProgress] = useState(0);
  const [toggleButton, setToggleButton] = useState(true);
  const [stepScreen, setStepScreen] = useState();

  //store inputs first step-------------
  const [roadtripTitle, setRoadtripTitle] = useState(
    props.data_new_roadtrip.roadtripTitle
  );
  const [roadtripDate, setRoadtripDate] = useState(
    props.data_new_roadtrip.roadtripDate
  );
  const [roadtriptimeDeparture, setRoadtriptimeDeparture] = useState(
    props.data_new_roadtrip.roadtriptimeDeparture
  );
  const [roadtriptimeArrival, setRoadtriptimeArrival] = useState(
    props.data_new_roadtrip.roadtriptimeArrival
  );

  //store inputs second step-------------
  const [roadtripType, setRoadtripType] = useState('Cool');
  const [roadtripMotoType, setRoadtripMotoType] = useState('Toutes catégories');
  const [roadtripSizeGroup, setRoadtripSizeGroup] = useState(0);
  const [itineraryexist, setItineraryexist] = useState(
    props.route.params.itinerary_id
  );
  console.log(
    'props.route.params.itinerary_id',
    props.route.params.itinerary_id
  );
  const [userBikeCateg, setuserBikeCateg] = useState(''); //catégorie de moto de l'utilisateur

  const [currentScreen, setCurrentScreen] = useState();
  // console.log(roadtripType);

  //gestion des étapes---------
  //initialisation de la première étape au démarrage de la page------------------------
  const [date, setDate] = useState(new Date(1598051730000));
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  //-------------------récupération des datas nouvel itinéraire-----------------
  const [departure_city, setDeparture_city] = useState('');
  const [arrival_city, setArrival_city] = useState('');
  const [map_itinerary, setMap_itinerary] = useState('');

  useEffect(() => {
    const getDataitinerary = async () => {
      const dataItinerary = await fetch(
        `${MA_VARIABLE}/itineraries/get-itinerary?itineraryIdFromFront=${props.route.params.itinerary_id}`
      );
      var dataItineraryParse = await dataItinerary.json();
      // console.log(
      //   "dataItineraryParse.itineraryData.start.city",
      //   dataItineraryParse.itineraryData.start.city
      // );
      // console.log(
      //   "dataItineraryParse.itineraryData.start.city",
      //   dataItineraryParse.itineraryData.arrival.city
      // );

      // console.log(
      //   "dataItineraryParse.itineraryData.snapshot",
      //   dataItineraryParse.itineraryData.snapshot
      // );

      setDeparture_city(dataItineraryParse.itineraryData.start.city);
      setArrival_city(dataItineraryParse.itineraryData.arrival.city);
      setMap_itinerary(dataItineraryParse.itineraryData.snapshot);
      console.log('map_itinerary', map_itinerary);
    };
    if (props.route.params.itinerary_id) {
      getDataitinerary();
    }
  }, [props.route.params.itinerary_id]);

  var Bottom = <></>;

  if (itineraryexist == '') {
    Bottom = (
      <View>
        <View
          style={{
            alignItems: 'center',
            height: '30%',
            marginTop: '5%',
          }}
        >
          <View style={{ marginBottom: '3%' }}>
            <CustomButtonOrange
              title='NOUVEL ITINERAIRE'
              onPress={() => {
                setItineraryexist('ok'),
                  setFormProgress(1),
                  props.onSubmitData({
                    roadtripTitle: roadtripTitle,
                    roadtripDate: roadtripDate,
                    roadtriptimeDeparture: roadtriptimeDeparture,
                    roadtriptimeArrival: roadtriptimeArrival,
                  }),
                  props.navigation.navigate('Itinerary', {
                    screen: 'ItineraryScreen',
                  });
                // console.log(currentScreen);
              }}
            />
            <CustomButton
              title='ITINERAIRE PROPOSE'
              onPress={() =>
                props.navigation.navigate('ListItineraries', {
                  screen: 'ListItinerariesScreen',
                })
              }
            />
          </View>
          <View style={{ marginTop: '15%' }}>
            <Text>Aucun itinéraire choisit ou créé</Text>
          </View>
        </View>

        <View style={styles.bottomPage}>
          <View style={{ marginHorizontal: '40%' }}></View>
          <View style={{ marginTop: '10%', marginBottom: '5%' }}></View>
        </View>
      </View>
    );
  } else {
    Bottom = (
      <View
        style={{
          flexDirection: 'column',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            height: '30%',
            marginTop: '5%',
          }}
        >
          <Image
            style={{
              height: 200,
              width: 350,
            }}
            // source={require({ map_itinerary })}
            source={{
              uri: map_itinerary,
            }}
          />
          <View
            style={{
              width: '50%',
              flexDirection: 'row',
              alignItems: 'center',
              height: '30%',
              justifyContent: 'space-between',
            }}
          >
            <Text>{departure_city}</Text>
            <Text>{arrival_city}</Text>
          </View>
        </View>

        <View style={styles.bottomPage}>
          <View style={{ marginHorizontal: '40%' }}></View>
          <View style={{ marginTop: '80%', marginBottom: '5%' }}>
            <CustomButtonOrangeNext onPress={() => setFormProgress(2)} />
          </View>
        </View>
      </View>
    );
  }
  // console.log("props.data_new_roadtrip:", props.data_new_roadtrip);
  // console.log(formProgress);
  // console.log(itineraryexist);
  var pagecontent = <></>;

  if (formProgress == 0 || formProgress == 1) {
    pagecontent = (
      <View style={styles.container}>
        <CustomHeader
          onPress={() =>
            props.navigation.navigate('RoadtripList', {
              screen: 'RoadtripListScreen',
            })
          }
          title='CREE TON TRIP'
        />
        <View style={styles.barprogress}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={formProgress}
            stepCount={3}
          />
        </View>
        <View style={styles.switch}>
          <Text> Privé </Text>
          <Switch
            trackColor={{ false: '#363432', true: 'teal' }}
            thumbColor='#FF8B00'
            ios_backgroundColor='#FEFAEA'
            onValueChange={(value) => setToggleButton(value)}
            value={toggleButton}
          />
          <Text> Public </Text>
        </View>
        <View
          style={{
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          <CustomNewTripInput
            placeholder='votre titre de roadtrip'
            value={roadtripTitle}
            setValue={setRoadtripTitle}
            secureTextEntry={false}
            style={{
              justifyContent: 'center',
            }}
          />
          <View style={styles.horaires}>
            <Text style={{ paddingTop: 5 }}>Date de sortie :</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={date} // Initial date from state
              mode='date' // The enum of date, datetime and time
              placeholder='select date'
              format='YYYY-MM-DD'
              // minDate="01-01-2016"
              // maxDate="01-01-2019"
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  borderRadius: 15,
                  backgroundColor: '#FFEDAC',
                },
              }}
              onDateChange={(date) => {
                setDate(date);
                setRoadtripDate(date);
              }}
            />
            {/* <CustomNewTripInput
            placeholder="Date de sortie"
            value={roadtripDate}
            setValue={setRoadtripDate}
          /> */}
          </View>
        </View>

        <Text style={{ paddingTop: 5 }}>Horaires :</Text>
        <View style={{ flexDirection: 'row' }}>
          {/* <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View> */}

          {/* <Text>
          Selected Time: {selectedHours}:{selectedMinutes}
          </Text>
          <TimePicker
          selectedHours={selectedHours}
          selectedMinutes={selectedMinutes}
          onChange={(hours, minutes) => {
            setSelectedHours(hours);
            setSelectedMinutes(minutes);
          }}
          /> */}
          {/* <View> */}
          <View style={{ alignItems: 'center' }}>
            {/* <Text>Départ :</Text> */}
            {/* <View> */}
            <Button onPress={showTimepicker} title='Départ!' />
            {/* </View> */}
            {/* {show && ( */}
            {/* -------------------------CI DESSOUS A REMETTRE------------- */}
            {/* <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              onPress={(date) => {
                setDate(date);
                setRoadtripDate(date);
              }}
            /> */}
            {/* -------------------------A REMETTRE------------- */}
            {/* )} */}
            {/* </View> */}
            <CustomTimeNewTripInput
              placeholder='9:00'
              value={roadtriptimeDeparture}
              setValue={setRoadtriptimeDeparture}
            />
          </View>
          <Text> </Text>
          <View style={{ alignItems: 'center' }}>
            <Button onPress={showTimepicker} title='Arrivée!' />
            {/* <Text>Arrivée :</Text> */}
            <CustomTimeNewTripInput
              placeholder='16:00'
              value={roadtriptimeArrival}
              setValue={setRoadtriptimeArrival}
            />
          </View>
        </View>
        {Bottom}
      </View>
    );
  } else if (formProgress == 2) {
    pagecontent = (
      <View style={styles.container}>
        <CustomHeader
          onPress={() =>
            props.navigation.navigate('RoadtripList', {
              screen: 'RoadtripListScreen',
            })
          }
          title='CREE TON TRIP'
        />
        <View style={styles.barprogress}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={formProgress}
            stepCount={3}
          />
        </View>
        <View style={{ marginTop: '8%' }}>
          <Text> Type de Roadtrip </Text>
        </View>
        <View style={styles.choice}>
          <CustomButtonChoiceValidate
            title={'Cool'}
            value={roadtripType}
            onPress={() => setRoadtripType('Cool')}
            secureTextEntry={false}
          />
          <CustomButtonChoice
            title={'Sportif'}
            value={roadtripType}
            onPress={() => setRoadtripType('Sportif')}
            secureTextEntry={false}
          />
          <CustomButtonChoice
            title={'Tourisme'}
            value={roadtripType}
            onPress={() => setRoadtripType('Tourisme')}
            secureTextEntry={false}
          />
        </View>

        <View
          style={{
            marginBottom: '5%',
            marginTop: '10%',
            alignItems: 'center',
          }}
        >
          <Text> Pour quel type de moto ? </Text>
          {/* <CustomBikeCategPicker
            selectedValue={userBikeCateg}
            onValueChange={(value, index) => {
              setRoadtripMotoType(value), (value = { roadtripMotoType });
            }}
            // style={{ flex: 1 }}
          /> */}
          <CustomBikeCategPicker2
            selectedValue={roadtripMotoType}
            onValueChange={(value, index) => {
              // setuserBikeCateg(value),
              setRoadtripMotoType(value), (value = { roadtripMotoType });
            }}
            style={{ flex: 1 }}
          />
          {/* <CustomNewTripInput
            placeholder="Toutes catégories"
            value={roadtripMotoType}
            setValue={setRoadtripMotoType}
          /> */}
        </View>

        <View style={styles.tailleGroupe}>
          <View style={{ alignItems: 'center' }}>
            <Text>Taille du groupe :</Text>
          </View>
          <Text> </Text>
          <View style={{ alignItems: 'center' }}>
            <CustomTimeNewTripInput
              placeholder='choisis un nombre'
              value={roadtripSizeGroup}
              setValue={setRoadtripSizeGroup}
            />
          </View>
        </View>

        {/* CHOIX ITINERAIRE */}
        <View
          style={{
            alignItems: 'center',
            height: '30%',
            marginTop: '5%',
          }}
        >
          <View style={styles.bottomPage3}>
            <CustomButtonValidation
              title='VALIDER !'
              onPress={() => (
                props.navigation.navigate('CreateRoadTripRecap', {
                  screen: 'CreateRoadTripScreenRecap',
                }),
                props.onSubmitData({
                  roadtripTitle: roadtripTitle,
                  roadtripDate: roadtripDate,
                  roadtriptimeDeparture: roadtriptimeDeparture,
                  roadtriptimeArrival: roadtriptimeArrival,
                  roadtripMotoType: roadtripMotoType,
                  roadtripSizeGroup: roadtripSizeGroup,
                  roadtripType: roadtripType,
                  map_itinerary: map_itinerary,
                })
              )}
            />
          </View>
        </View>
      </View>
    );
  }

  return <View>{pagecontent}</View>;
}
// onPageChange(position);
// this.setState({ currentPosition: position });

const styles = StyleSheet.create({
  switch: {
    width: deviceWidth,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  choice: {
    width: '70%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '4%',
    marginBottom: '5%',
    marginTop: '2%',
    justifyContent: 'space-between',
  },

  bottomPage: {
    width: deviceWidth,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: '10%',
    // marginTop: "10%",
  },

  barprogress: {
    width: deviceWidth,
    backgroundColor: '#FEFAEA',
    paddingTop: '3%',
    marginBottom: '3%',
  },
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  horaires: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 80,
  },

  tailleGroupe: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: '10%',
    marginTop: '10%',
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitData: function (roadtripData) {
      dispatch({ type: 'saveData', roadtripData: roadtripData });
    },
  };
}

function mapStateToProps(state) {
  return { data_new_roadtrip: state.data_new_roadtrip, token: state.token };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoadTripScreenFirstStep);
