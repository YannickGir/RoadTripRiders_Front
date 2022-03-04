import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { MA_VARIABLE } from '@env';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
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

//------------pour barre de progression----nb installé : npm install react-native-step-indicator --save   -----------------------
import StepIndicator from 'react-native-step-indicator';
import { color } from 'react-native-elements/dist/helpers';
const labels = ['User 1', 'User 2', 'Bike 3'];

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
  const [userFirstName, setuserFirstName] = useState('');
  const [userLastName, setuserLastName] = useState('');
  const [userBirthDate, setuserBirthDate] = useState('');
  const [userBikeCateg, setuserBikeCateg] = useState('');
  const [userBikeBrand, setuserBikeBrand] = useState('');
  const [userBikeModel, setuserBikeModel] = useState('');

  //Variables d'Etats des checkboxes
  const [isMale, setIsMale] = useState('false');
  const [isFemale, setIsFemale] = useState('false');
  const [isOther, setIsOther] = useState('false');
  const [userGender, setUserGender] = useState('');
  const [hasPassenger, setHasPassenger] = useState('false');
  const [hasNoPassenger, setHasNoPassenger] = useState('false');

  if (isMale == true) {
    setIsFemale(false);
    setIsOther(false);
  } else if (isFemale == true) {
    setIsMale(false);
    setIsOther(false);
  } else if (isOther == true) {
    setIsMale(false);
    setIsFemale(false);
  }

  //Pour image picker
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();

  //pour le step indicator
  const [formProgress, setFormProgress] = useState(0);

  // //on initialise au premier écran
  // useEffect(() => {
  //   console.log('test useeffect');
  //   setStepScreen(UserEditionStep1);
  // }, []);

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

      var data = new FormData();

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
            stepCount={2}
          />
        </View>

        <Text>Quel rider es-tu ?</Text>

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
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <Text>Date de naissance</Text>
        <CustomDatePicker title='DATE' />

        <Text>Sexe</Text>
        <View style={styles.secondary}>
          <CustomCheckBox
            title='Homme'
            checked={isMale}
            onPress={
              isMale
                ? () => setIsMale(false)
                : () => {
                    setIsMale(true), setIsFemale(false), setIsOther(false);
                  }
            }
          />
          <CustomCheckBox
            title='Femme'
            checked={isFemale}
            onPress={
              isFemale
                ? () => setIsFemale(false)
                : () => {
                    setIsFemale(true), setIsMale(false), setIsOther(false);
                  }
            }
          />
          <CustomCheckBox
            title='Autre'
            checked={isOther}
            onPress={
              isOther
                ? () => setIsOther(false)
                : () => {
                    setIsOther(true), setIsMale(false), setIsFemale(false);
                  }
            }
          />
        </View>

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
            stepCount={2}
          />
        </View>

        <Text>Et ta moto ?</Text>

        <CustomInput
          placeholder='Catégorie'
          value={userBikeCateg}
          setValue={setuserBikeCateg}
          secureTextEntry={false}
        />

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

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <CustomButton title='CHARGE TA BECANE!' onPress={pickImage2} />
          {image2 && (
            <Image
              source={{ uri: image2 }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <Text>As-tu un passager ?</Text>
        <View style={styles.secondary}>
          <CustomCheckBox
            title='Oui'
            checked={hasPassenger}
            onPress={() => setHasPassenger(!hasPassenger)}
          />
          <CustomCheckBox
            title='Non'
            checked={hasNoPassenger}
            onPress={() => setHasPassenger(!hasNoPassenger)}
          />
        </View>
        <KeyboardAvoidingView>
          <CustomButton
            title="C'EST TOUT BON"
            onPress={() =>
              props.navigation.navigate('BottomNavigator', {
                screen: 'MyAccountScreen',
              })
            }
          />
        </KeyboardAvoidingView>
      </View>
    );
  }

  return <View style={{ marginTop: 25 }}>{pagecontent}</View>;
}
const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
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
    // marginTop: "10%",
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
