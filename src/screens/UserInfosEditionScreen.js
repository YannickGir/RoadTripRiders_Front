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
  const [userAspiration, setuserAspiration] = useState(''); //envies de l'utilisateur
  const [userUsageProfil, setuserUsageProfil] = useState('New Biker'); //statut de l'utilisateur en fonction de sa participation dans l'appli
  const [userConnexionStatus, setuserConnexionStatus] = useState(''); //statut de connexion l'utilisateur par rapport au chat

  //Variables d'Etats des checkboxes
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [userGender, setUserGender] = useState('');
  const [hasPassenger, setHasPassenger] = useState(false);
  const [hasNoPassenger, setHasNoPassenger] = useState(false);

  const [userBikeCateg, setuserBikeCateg] = useState(''); //catégorie de moto de l'utilisateur
  const [userBikeBrand, setuserBikeBrand] = useState(''); //marque de la moto de l'utilisateur
  const [userBikeModel, setuserBikeModel] = useState(''); //modèle de la moto de l'utilisateur

  // if (isMale == true) {
  //   setIsFemale(false);
  //   setIsOther(false);
  //   setUserGender('male');
  // } else if (isFemale == true) {
  //   setIsMale(false);
  //   setIsOther(false);
  //   setUserGender('female');
  // } else if (isOther == true) {
  //   setIsMale(false);
  //   setIsFemale(false);
  //   setUserGender('other');
  // }

  // if (hasPassenger == true) {
  //   setHasPassenger(false);
  // } else if (hasNoPassenger == true) {
  //   setHasNoPassenger(false);
  // }

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
    var gender = '';
    if (isMale == true) {
      gender = 'male';
    } else if (isFemale == true) {
      gender = 'female';
    } else if (isOther == true) {
      gender = 'other';
    }

    const data = await fetch(`${MA_VARIABLE}/users/edit-profil`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `token=${props.token}&firstnameFromFront=${userFirstName}&lastnameFromFront=${userLastName}&birthdayFromFront=${userBirthDate}&bikeCategFromFront=${userBikeCateg}&bikeBrandFromFront=${userBikeBrand}&bikeModelFromFront=${userBikeModel}&genderFromFront=${userGender}&passengerFromFront=${hasPassenger}`,
    });
  };

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
      props.onSubmitImage(response.urlToCloudImage);
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
      console.log(response);
      props.onSubmitImage(response.urlToCloudImage);
    }
  };

  var pagecontent = <></>;

  if (formProgress == 0) {
    pagecontent = (
      <View style={styles.container}>
        <CustomHeader
          onPress={() =>
            props.navigation.navigate('BottomNavigator', {
              screen: 'MyAccountScreen',
            })
          }
          title='EDITE TON PROFIL'
        />
        <View style={styles.barprogress}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={0}
            stepCount={4}
          />
        </View>
        <Text style={{ paddingTop: '5%' }}>Quel rider es-tu ?</Text>

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
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <CustomButton title='CHARGE TON AVATAR' onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150 }}
            />
          )}
        </View>
        <Text style={{ paddingTop: '5%', paddingBottom: '5%' }}>
          Quelle est ta date de naissance ?
        </Text>
        <CustomDatePicker
          selectedValue={userBirthDate}
          onValueChange={(value, index) => setuserBirthDate(value)}
          title='DATE'
        />

        <Text style={{ paddingTop: 0, paddingBottom: '2%' }}>Ton sexe ?</Text>
        <View style={styles.secondary}>
          <CheckBox
            title='Homme'
            checkedColor='#ff8b00'
            checked={isMale}
            onPress={() => setIsMale(!isMale)}
          />
          <CheckBox
            title='Femme'
            checkedColor='#ff8b00'
            checked={isFemale}
            onPress={() => setIsFemale(!isFemale)}
          />
          <CheckBox
            title='Autre'
            checkedColor='#ff8b00'
            checked={isOther}
            onPress={() => setIsOther(!isOther)}
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
        <CustomHeader
          onPress={() => setFormProgress(formProgress - 1)}
          title='EDITE TON PROFIL'
        />
        <View style={styles.barprogress}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={1}
            stepCount={4}
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

        <Text style={{ paddingTop: '20%', paddingBottom: 0 }}>
          Dans quelle ville vis-tu ?
        </Text>
        <CustomInput
          placeholder='Ta ville'
          value={userCity}
          setValue={setuserCity}
          secureTextEntry={false}
        />

        {/* FLECHE PAGE SUIVANTE */}
        <View style={styles.bottomPage}>
          <View style={{ marginHorizontal: '40%' }}></View>
          <View style={{ marginBottom: '5%' }}>
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
        <CustomHeader
          onPress={() => setFormProgress(formProgress - 1)}
          title='EDITE TON PROFIL'
        />
        <View style={styles.barprogress}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={2}
            stepCount={4}
          />
        </View>

        <Text style={{ paddingBottom: '5%' }}>Et ta moto ?</Text>

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

        <Text
          style={{
            paddingTop: '5%',
            paddingBottom: '5%',
            alignContent: 'center',
          }}
        >
          Sa catégorie?
        </Text>
        <CustomBikeCategPicker
          selectedValue={userBikeCateg}
          onValueChange={(value, index) => setuserBikeCateg(value)}
          style={{ flex: 1 }}
        />

        {/* FLECHE PAGE SUIVANTE */}
        <View style={styles.bottomPage}>
          <View style={{ marginHorizontal: '40%' }}></View>
          <View style={{ marginTop: '10%', marginBottom: '5%' }}>
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
        <CustomHeader
          onPress={() => setFormProgress(formProgress - 1)}
          title='EDITE TON PROFIL'
        />
        <View style={styles.barprogress}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={3}
            stepCount={4}
          />
        </View>

        <Text
          style={{
            paddingTop: '5%',
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

  return <View style={{ marginTop: 25 }}>{pagecontent}</View>;
}
const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
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
    paddingTop: '3%',
    marginBottom: '3%',
  },
  text: {},
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitImage: function (urldufetch) {
      dispatch({ type: 'saveUrl', url: urldufetch });
    },
  };
}

export default connect(null, mapDispatchToProps)(UserInfosEditionScreen);
