import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import CustomCheckBox from '../components/CustomCheckBox';
import CustomInput from '../components/CustomInput';
import CustomDatePicker from '../components/CustomDatePicker';
import CustomTimePicker from '../components/CustomTimePicker';
import CustomButton from '../components/CustomButton';
import ImageUploadComponent from '../components/ImageUploadComponent';
import * as ImagePicker from 'expo-image-picker';
import { MA_VARIABLE } from '@env';
import { connect } from 'react-redux';

function UserInfosEditionScreen() {
  //Variables d'Etats des inputs
  const [userFirstName, setuserFirstName] = useState('');
  const [userLastName, setuserLastName] = useState('');
  const [userBirthDate, setuserBirthDate] = useState('');
  //Pour image picker
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    // envoi d'un fichier avec React Native

    var data = new FormData();

    data.append('avatar', {
      uri: result.uri,
      type: 'image/jpeg',
      name: 'user_avatar',
    });

    var rawResponse = await fetch(`${MA_VARIABLE}/users/upload-avatar`, {
      method: 'post',
      body: data,
    });

    var response = await rawResponse.json();
    console.log(response);
    props.onSubmitImage(response.urlToCloudImage);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CustomButton title='CHARGES TON AVATAR' onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>

      <ImageUploadComponent />

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

      <Text>Date de naissance</Text>
      <CustomDatePicker title='DATE' />

      <Text>Sexe</Text>
      <View style={styles.secondary}>
        <CustomCheckBox title='Homme' />
        <CustomCheckBox title='Femme' />
        <CustomCheckBox title='Autre' />
      </View>

      <Text>Dans quels coins roules-tu ?</Text>

      <CustomTimePicker title='HEURE' />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    flexDirection: 'row',
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
