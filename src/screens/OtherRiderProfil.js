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

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

function OtherRiderProfilScreen(props) {
  //Variables d'Etats des inputs
  const [otheUserFirstName, setOtherUserFirstName] = useState(''); //prénom utilisateur
  const [otherUserLastName, setOtherUserLastName] = useState(''); //nom utilisateur
  const [otherUserBirthDate, setOtherUserBirthDate] = useState(''); //date de naissance de l'utilisateur
  const [otherUserRegion, setotherUserRegion] = useState(''); //région où sort l'utilisateur
  const [otherUserCity, setOtherUserCity] = useState(''); //ville où vit l'utilisateur
  const [otherUserBio, setOtherUserBio] = useState(''); //biographie de l'utilisateur
  const [otherUserUsageProfil, setOtherUserUsageProfil] = useState('New Biker'); //statut de l'utilisateur en fonction de sa participation dans l'appli
  const [otherUserConnexionStatus, setOtherUserConnexionStatus] = useState(''); //statut de connexion l'utilisateur par rapport au chat

  //Variables d'Etats des checkboxes
  const [otherUserGender, setOtherUserGender] = useState('');
  const [otherHasPassenger, setOtherHasPassenger] = useState(false);
  const [otherHasNoPassenger, setOtherHasNoPassenger] = useState(false);

  const [otherUserBikeCateg, setOtherUserBikeCateg] = useState(''); //catégorie de moto de l'utilisateur
  const [otherUserBikeBrand, setOtherUserBikeBrand] = useState(''); //marque de la moto de l'utilisateur
  const [otherUserBikeModel, setOtherUserBikeModel] = useState(''); //modèle de la moto de l'utilisateur

  //Pour image picker
  //const [image, setImage] = useState(null); // image avatar user
  //const [image2, setImage2] = useState(null); // image moto user

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

    const data = await fetch(`${MA_VARIABLE}/users/edit-profil`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `token=${props.token}&firstnameFromFront=${userFirstName}&lastnameFromFront=${userLastName}&birthdayFromFront=${userBirthDate}&genderFromFront=${userGender}&passengerFromFront=${hasPassenger}&userRegionFromFront=${userRegion}&userCityFromFront=${userCity}&userBioFromFront=${userBio}&bikeCategFromFront=${userBikeCateg}&bikeBrandFromFront=${userBikeBrand}&bikeModelFromFront=${userBikeModel}&imageFromFront=${image}&image2FromFront=${image2}`,
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

  // gender == male | female | other
  const setGenderCheckbox = (gender) => {
    setUserGender(userGender != gender ? gender : '');
  };

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <HeaderRNE
          backgroundColor='#FFD230'
          leftComponent={
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('BottomNavigator', {
                  screen: 'RidersAroundScreen',
                })
              }
            >
              <AntDesign name='arrowleft' color='#363432' size={30} />
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'MOTARDS',
            style: styles.heading,
          }}
        />
      </SafeAreaProvider>
      <Text style={{ paddingTop: '10%' }}>Quel rider est-il/elle ?</Text>

      <View style={styles.inputshort}>
        <Text>{otherUserFirstName}</Text>
      </View>

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
          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
        )}
      </View>
      <Text style={{ paddingTop: '20%', paddingBottom: 0 }}>
        Quelle est ta date de naissance ?
      </Text>

      <CustomDatePicker
        selectedValue={userBirthDate}
        onChange={(value, index) => setuserBirthDate(value)}
        title='DATE'
      />
      <Text>{userBirthDate}</Text>

      <Text style={{ paddingTop: '5%', paddingBottom: '2%' }}>Ton sexe ?</Text>
      <View style={styles.secondary}>
        <CheckBox
          title='Homme'
          checkedColor='#ff8b00'
          checked={userGender === 'male'}
          onPress={() => setGenderCheckbox('male')}
        />
        <CheckBox
          title='Femme'
          checkedColor='#ff8b00'
          checked={userGender === 'female'}
          onPress={() => setGenderCheckbox('female')}
        />
        <CheckBox
          title='Autre'
          checkedColor='#ff8b00'
          checked={userGender === 'other'}
          onPress={() => setGenderCheckbox('other')}
        />
      </View>

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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: deviceWidth,
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#FEFAEA',
          }}
        >
          <Button
            title='CALCULER ITINÉRAIRE'
            containerStyle={{
              height: 40,
              color: '#FFD230',
            }}
            titleStyle={{
              color: '#FEFAEA',
              fontWeight: 'bold',
            }}
            buttonStyle={{ backgroundColor: '#363432' }}
            onPress={() => handleClick()}
          ></Button>
          <Button
            title='SUIVANT'
            onPress={() => SubmitItinerary()}
            buttonStyle={{ backgroundColor: '#ff8b00' }}
            icon={{
              name: 'arrow-circle-right',
              type: 'font-awesome',
              size: 19,
              color: 'white',
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
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
  //style genre input long
  input: {
    backgroundColor: '#FFEDAC',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    width: 250,
  },
  //style input court
  inputshort: {
    backgroundColor: '#FFEDAC',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    width: 250,
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
