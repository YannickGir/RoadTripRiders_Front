import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Header as HeaderRNE } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { MA_VARIABLE } from '@env';
import { connect } from 'react-redux';
import { Button, CheckBox } from 'react-native-elements';
import CustomCheckBox from '../components/CustomCheckBox';
import CustomInput from '../components/CustomInput';
import CustomDatePicker from '../components/CustomDatePicker';
import CustomTimePicker from '../components/CustomTimePicker';
import CustomButton from '../components/CustomButton';
import ImageUploadComponent from '../components/ImageUploadComponent';
import CustomButtonOrangeNext from '../components/CustomButtonOrangeNext';
import CustomButtonOrange from '../components/CustomButtonOrange';
import * as ImagePicker from 'expo-image-picker';
import CustomHeader from '../components/CustomHeader';
import CustomHeaderRNE from '../components/CustomHeaderRNE';
import CustomBikeCategPicker from '../components/CustomBikeCategPicker';
import CustomRegionPicker from '../components/CustomRegionPicker';
import CustomLongInput from '../components/CustomLongInput';

//------------pour barre de progression----nb installé : npm install react-native-step-indicator --save   -----------------------
import StepIndicator from 'react-native-step-indicator';
import { color } from 'react-native-elements/dist/helpers';
import token from '../reducers/token';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
const labels = ['User 1', 'Bike 2', 'Bike 3'];

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

function UserInfosEditionScreen(props) {
  //Variables d'Etats des inputs
  const [userFirstName, setuserFirstName] = useState(''); //prénom utilisateur
  const [userLastName, setuserLastName] = useState(''); //nom utilisateur
  const [userBirthDate, setuserBirthDate] = useState(''); //date de naissance de l'utilisateur
  const [userRegion, setuserRegion] = useState(''); //région où sort l'utilisateur
  const [userCity, setuserCity] = useState(''); //ville où vit l'utilisateur
  const [userBio, setuserBio] = useState(''); //biographie de l'utilisateur
  const [userUsageProfil, setuserUsageProfil] = useState('New Biker'); //statut de l'utilisateur en fonction de sa participation dans l'appli
  const [userConnexionStatus, setuserConnexionStatus] = useState(''); //statut de connexion l'utilisateur par rapport au chat
  const [userLatitude, setuserLatitude] = useState(0); //ville où vit l'utilisateur
  const [userLongitude, setuserLongitude] = useState(0); //ville où vit l'utilisateur

  //Variables d'Etats des checkboxes
  const [userGender, setUserGender] = useState('');
  const [hasPassenger, setHasPassenger] = useState(false);
  const [hasNoPassenger, setHasNoPassenger] = useState(false);

  const [userBikeCateg, setuserBikeCateg] = useState(''); //catégorie de moto de l'utilisateur
  const [userBikeBrand, setuserBikeBrand] = useState(''); //marque de la moto de l'utilisateur
  const [userBikeModel, setuserBikeModel] = useState(''); //modèle de la moto de l'utilisateur

  //Pour image picker
  const [image, setImage] = useState(null); // image avatar user
  const [image2, setImage2] = useState(null); // image moto user

  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();

  //pour le step indicator nous permet de faire défiler les 3 rendus dans un screen
  const [formProgress, setFormProgress] = useState(0);

  var handleSubmitUserProfil = async () => {
    console.log('click détecté sur handleSubmitUserProfil');

    var passenger;
    if (hasPassenger) {
      passenger = true;
    } else if (hasNoPassenger) {
      passenger = false;
    }

    const cityData = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${userCity}`
    );
    const cityDataResponse = await cityData.json();
    console.log(
      'cityDataResponse.features[0].geometry.coordinates[0]',
      cityDataResponse.features[0].geometry.coordinates[0]
    );
    // Une fois les coordonnées de la ville récupérées, on va modifier de facon aléatoire
    //ces coordonnées afin d'obtenir des points légèrement différents sur la carte
    // création d'un entier aléatoire entre -15 et 15 qu'on utilisera ensuite pour ajouter ou retirer 1.5km à la latitude
    // et à la longitude pour que les offres sur une même ville soient légérement distants sur une carte
    function entierAleatoire(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var entier = entierAleatoire(-15, 15);
    /// on sait que 0.001° = 111 m
    var hundredMetersMultiplier = 0.001;
    var finalLatitude =
      cityDataResponse.features[0].geometry.coordinates[1] +
      hundredMetersMultiplier * entier;
    var finalLongitude =
      cityDataResponse.features[0].geometry.coordinates[0] +
      hundredMetersMultiplier * entier;
    console.log('finalLatitude', finalLatitude);
    console.log('finalLongitude', finalLongitude);

    setuserLatitude(finalLatitude);
    setuserLongitude(finalLongitude);

    const data = await fetch(`${MA_VARIABLE}/users/edit-profil`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `token=${props.token}&firstnameFromFront=${userFirstName}&lastnameFromFront=${userLastName}&birthdayFromFront=${userBirthDate}&genderFromFront=${userGender}&passengerFromFront=${hasPassenger}&userRegionFromFront=${userRegion}&userCityFromFront=${userCity}&userBioFromFront=${userBio}&bikeCategFromFront=${userBikeCateg}&bikeBrandFromFront=${userBikeBrand}&bikeModelFromFront=${userBikeModel}&imageFromFront=${image}&image2FromFront=${image2}&userLongitudeFromFront=${finalLongitude}&userLatitudeFromFront=${finalLatitude}`,
    });

    const body = await data.json();

    if (body.result) {
      const dataUser = await fetch(
        `${MA_VARIABLE}/users/user-data?token=${props.token}`
      );
      var bodyUser = await dataUser.json();
      props.onSubmitUserData({
        avatar: bodyUser.userData.user_photo,
        username: bodyUser.userData.firstname,
      });
    } else {
      console.log('POST users/edit-profil failed', body);
    }

    // var bodyUser = await data.json();
    // console.log('usereditionscreen bodyUser', bodyUser);
  };

  //-----------------DATEPICKER-------------------------------
  const [date, setDate] = useState(new Date(1598051730000));

  //pour envoyer l'avatar vers le back et dans le store
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('result', result);
    console.log('result.uri ', result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
      var myAvatar = result.uri;

      var data = new FormData();

      data.append('avatar', {
        uri: myAvatar,
        type: 'image/jpeg',
        name: 'avatar',
      });

      var rawResponse = await fetch(`${MA_VARIABLE}/users/upload-avatar`, {
        method: 'post',
        body: data,
      });

      var response = await rawResponse.json();
      console.log(response);

      // NE PAS OUBLIER DE SET IMAGE AVEC L'URL NOUVELLEMENT GENEREE PAR CLOUDINARY
      setImage(response.urlToCloudImage);
    }
  };

  //pour envoyer l'avatar vers le back et dans le store
  const pickImage2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('result', result);
    console.log('result.uri ', result.uri);

    if (!result.cancelled) {
      setImage2(result.uri);
      var myMotoPicture = result.uri;

      data = new FormData();

      data.append('bike', {
        uri: myMotoPicture,
        type: 'image/jpeg',
        name: 'bike',
      });

      var rawResponse = await fetch(`${MA_VARIABLE}/users/upload-moto-photo`, {
        method: 'post',
        body: data,
      });

      var response = await rawResponse.json();
      //console.log(response);
      // NE PAS OUBLIER DE SET IMAGE2 AVEC L'URL NOUVELLEMENT GENEREE
      setImage2(response.urlToCloudImage);
    }
  };

  var pagecontent = <></>;

  if (formProgress == 0) {
    // gender == homme | femme | autre
    const setGenderCheckbox = (gender) => {
      setUserGender(userGender != gender ? gender : '');
    };

    pagecontent = (
      <View style={styles.container}>
        <SafeAreaProvider>
          <HeaderRNE
            backgroundColor='#FFD230'
            leftComponent={
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('BottomNavigator', {
                    screen: 'MyAccountScreen',
                  })
                }
              >
                <AntDesign name='arrowleft' color='#363432' size={30} />
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'EDITE TON PROFIL',
              style: styles.heading,
            }}
          />

          <View style={styles.barprogress}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={0}
              stepCount={4}
            />
          </View>
        </SafeAreaProvider>
        <Text style={{ paddingTop: '10%' }}>Quel rider es-tu ?</Text>

        <CustomInput
          placeholder='Prénom'
          value={userFirstName}
          setValue={setuserFirstName}
          secureTextEntry={false}
        />

        <CustomInput
          placeholder='Nom'
          value={userLastName}
          setValue={setuserLastName}
          secureTextEntry={false}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '10%',
          }}
        >
          <CustomButton title='CHARGE TON AVATAR' onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150 }}
            />
          )}
        </View>
        <Text style={{ paddingTop: '20%', paddingBottom: 0 }}>
          Quelle est ta date de naissance ?
        </Text>

        <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode='date' // The enum of date, datetime and time
          androidMode={'spinner'}
          display={'spinner'}
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
            setuserBirthDate(date);
          }}
        />
        {/* <CustomDatePicker
          selectedValue={userBirthDate}
          onChange={(value, index) => setuserBirthDate(value)}
          title='DATE'
        />
        <Text>{userBirthDate}</Text> */}

        <Text style={{ paddingTop: '5%', paddingBottom: '2%' }}>
          Ton sexe ?
        </Text>
        <View style={styles.secondary}>
          <CheckBox
            title='Homme'
            checkedColor='#ff8b00'
            checked={userGender === 'homme'}
            onPress={() => setGenderCheckbox('homme')}
          />
          <CheckBox
            title='Femme'
            checkedColor='#ff8b00'
            checked={userGender === 'femme'}
            onPress={() => setGenderCheckbox('femme')}
          />
          <CheckBox
            title='Autre'
            checkedColor='#ff8b00'
            checked={userGender === 'autre'}
            onPress={() => setGenderCheckbox('autre')}
          />
        </View>

        {/* FLECHE PAGE SUIVANTE */}
        <View style={styles.bottomPage}>
          <View style={{ marginHorizontal: '40%' }}></View>
          <View style={{ marginTop: '10%', marginBottom: '2%' }}>
            <CustomButtonOrangeNext
              onPress={() => setFormProgress(formProgress + 1)}
            />
          </View>
        </View>
      </View>
    );
  } else if (formProgress == 1) {
    pagecontent = (
      <View style={styles.container}>
        <SafeAreaProvider>
          <HeaderRNE
            backgroundColor='#FFD230'
            leftComponent={
              <TouchableOpacity
                onPress={() => setFormProgress(formProgress - 1)}
              >
                <AntDesign name='arrowleft' color='#363432' size={30} />
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'EDITE TON PROFIL',
              style: styles.heading,
            }}
          />

          <View style={styles.barprogress}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={1}
              stepCount={4}
            />
          </View>
        </SafeAreaProvider>

        <Text style={{ paddingTop: '5%', paddingBottom: 0 }}>
          Parles nous de toi:
        </Text>
        <CustomLongInput
          placeholder='Partage ta bio'
          value={userBio}
          setValue={setuserBio}
          secureTextEntry={false}
        />
        <Text style={{ paddingTop: '5%', paddingBottom: '20%' }}>
          Dans quel coin roules-tu ?
        </Text>

        <CustomRegionPicker
          selectedValue={userRegion}
          onValueChange={(value, index) => setuserRegion(value)}
        />

        {/* FLECHE PAGE SUIVANTE */}
        <View style={styles.bottomPage}>
          <View style={{ marginHorizontal: '40%' }}></View>
          <View style={{ marginTop: '10%', marginBottom: '2%' }}>
            <CustomButtonOrangeNext
              onPress={() => setFormProgress(formProgress + 1)}
            />
          </View>
        </View>
      </View>
    );
  } else if (formProgress == 2) {
    pagecontent = (
      <View style={styles.container}>
        <SafeAreaProvider>
          <HeaderRNE
            backgroundColor='#FFD230'
            leftComponent={
              <TouchableOpacity
                onPress={() => setFormProgress(formProgress - 1)}
              >
                <AntDesign name='arrowleft' color='#363432' size={30} />
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'EDITE TON PROFIL',
              style: styles.heading,
            }}
          />

          <View style={styles.barprogress}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={2}
              stepCount={4}
            />
          </View>
        </SafeAreaProvider>
        <Text style={{ paddingTop: '0%', paddingBottom: '5%' }}>
          Dans quelle ville vis-tu ?
        </Text>
        <CustomInput
          placeholder='Ta ville'
          value={userCity}
          setValue={setuserCity}
          secureTextEntry={false}
        />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ paddingTop: '5%', paddingBottom: '5%' }}>
            Et ta moto ?
          </Text>

          <CustomInput
            placeholder='Marque'
            value={userBikeBrand}
            setValue={setuserBikeBrand}
            secureTextEntry={false}
          />

          <CustomInput
            placeholder='Modèle'
            value={userBikeModel}
            setValue={setuserBikeModel}
            secureTextEntry={false}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={{
              paddingTop: '5%',
              paddingBottom: '25%',
              alignContent: 'center',
            }}
          >
            Sa catégorie?
          </Text>
          <CustomBikeCategPicker
            selectedValue={userBikeCateg}
            onValueChange={(value, index) => setuserBikeCateg(value)}
            style={{ flex: 1, paddingBottom: 20 }}
          />
        </View>
        {/* FLECHE PAGE SUIVANTE */}
        <View style={styles.bottomPage}>
          <View style={{ marginHorizontal: '40%' }}></View>
          <View style={{ marginTop: '10%', marginBottom: '2%' }}>
            <CustomButtonOrangeNext
              onPress={() => setFormProgress(formProgress + 1)}
            />
          </View>
        </View>
      </View>
    );
  } else if (formProgress == 3) {
    pagecontent = (
      <View style={styles.container}>
        <SafeAreaProvider>
          <HeaderRNE
            backgroundColor='#FFD230'
            leftComponent={
              <TouchableOpacity
                onPress={() => setFormProgress(formProgress - 1)}
              >
                <AntDesign name='arrowleft' color='#363432' size={30} />
              </TouchableOpacity>
            }
            centerComponent={{
              text: 'EDITE TON PROFIL',
              style: styles.heading,
            }}
          />

          <View style={styles.barprogress}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={3}
              stepCount={4}
            />
          </View>
        </SafeAreaProvider>

        <Text
          style={{
            paddingTop: 0,
            paddingBottom: '5%',
            alignContent: 'center',
          }}
        >
          Partage une photo
        </Text>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CustomButton title='CHARGE TA BECANE!' onPress={pickImage2} />
          {image2 && (
            <Image
              source={{ uri: image2 }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <Text style={{ paddingTop: '5%', paddingBottom: '5%' }}>
          As-tu un passager ?
        </Text>
        <View style={styles.secondary}>
          <CheckBox
            title='Oui'
            checkedColor='#ff8b00'
            checked={hasPassenger}
            onPress={() => {
              setHasPassenger(!hasPassenger), setHasNoPassenger(false);
            }}
          />
          <CheckBox
            title='Non'
            checkedColor='#ff8b00'
            checked={hasNoPassenger}
            onPress={() => {
              setHasNoPassenger(!hasNoPassenger), setHasPassenger(false);
            }}
          />
        </View>
        <View style={styles.bottomPage}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <CustomButtonOrange
              title="C'EST TOUT BON"
              onPress={() => {
                console.log('token :', props.token),
                  props.navigation.navigate('BottomNavigator', {
                    screen: 'MyAccountScreen',
                  }),
                  handleSubmitUserProfil();
              }}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }

  return <View>{pagecontent}</View>;
}
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
  bottomPage: {
    width: deviceWidth,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: '10%',
    marginTop: '10%',
    marginBottom: '10%',
  },
  barprogress: {
    width: deviceWidth,
    backgroundColor: '#FEFAEA',
    marginBottom: '3%',
    marginTop: '3%',
  },
  text: {},
});

function mapStateToProps(state) {
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
)(UserInfosEditionScreen);
