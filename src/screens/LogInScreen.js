import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { MA_VARIABLE } from '@env';
import Logo from '../../assets/images/motoLogo.png';
import CustomInput from '../../src/components/CustomInput';
import CustomButton from '../../src/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogInScreen(props) {
  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();
  // On définit ici les variables d'état qui vont nous servir à enregistrer les valeurs des inputs
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  //const [listErrors, setListErrors] = useState([]);

  useEffect(() => {
    // On vérifie s'il y a un token dans le local storage;
    AsyncStorage.getItem('token', function (error, value) {
      console.log('value : ', value);

      if (value) {
        console.log('token trouvé dans le store : ', value);
        props.navigation.navigate('BottomNavigator', {
          screen: 'Homepage',
        });
        props.addToken(value);
      } else {
        console.log('Pas de token dans le store');
      }
    });
  }, []);

  var handleSubmitLogin = async () => {
    console.log('click détecté sur login');
    const data = await fetch(`${MA_VARIABLE}/users/log-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `emailFromFront=${userEmail}&passwordFromFront=${userPassword}`,
    });

    var response = await data.json();
    console.log('response', response);
    if (response.result === true) {
      props.addToken(response.token);
      //ajout du token dans le local storage

      AsyncStorage.setItem('token', response.token);

      props.navigation.navigate('BottomNavigator', {
        screen: 'Homepage',
      });
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={(styles.logo, { height: height * 0.2 })}
        resizeMode='contain'
      />
      <Text>Se connecter avec une adresse mail:</Text>
      <CustomInput
        placeholder='Email'
        value={userEmail}
        setValue={setUserEmail}
        secureTextEntry={false}
      />
      <CustomInput
        placeholder='Mot de passe'
        value={userPassword}
        setValue={setUserPassword}
        secureTextEntry={true}
      />
      <KeyboardAvoidingView>
        <CustomButton
          title='SE CONNECTER'
          onPress={() => handleSubmitLogin()}
        />

        <CustomButton
          title='CREER UN COMPTE'
          onPress={() => props.navigation.navigate('SignUp')}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(LogInScreen);
