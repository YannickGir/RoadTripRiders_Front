import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Logo from '../../assets/images/motoLogo.png';
import CustomInput from '../../src/components/CustomInput';
import CustomButton from '../../src/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogInScreen(props) {
  // On définit ici les variables d'état qui vont nous servir à enregistrer les valeurs des inputs
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [listErrors, setListErrors] = useState([]);
  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();

  useEffect(() => {
    // On vérifie s'il y a un token dans le local storage;
    var findToken = AsyncStorage.getItem(
      'token',
      function (error, data) {
        if (findToken) {
          console.log('token trouvé dans le store : ', findToken);
          // On set userExists à true, ce qui provoquera un Redirect vers /screenhome
          setUserExists(true);
          props.token;
        } else {
          console.log('Pas de token dans le store');
        }
      },
      []
    );
  });

  var handleSubmitLogin = async () => {
    const data = await fetch('/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `emailFromFront=${userEmail}&passwordFromFront=${userPassword}`,
    });

    let body = await data.json();
  };

  //   //cette partie ne fonctionne pas ici, je pense qu'elle doit être dans le sign up?
  //   if (body.result === true) {
  //     props.token(body.token);
  //     //ajout du token dans le local storage

  //     localStorage.setItem('token', body.token);

  //     setUserExists(true);
  //   }
  // };

  // if (userExists) {
  //   var LogInButton = (
  //     <CustomButton
  //       title='SE CONNECTER'
  //       onPress={() => {
  //         handleSubmitLogin(),
  //           props.navigation.navigate('BottomNavigator', {
  //             screen: 'Homepage',
  //           });
  //       }}
  //     />
  //   );
  //     }
  // } else {
  //   LogInButton = (
  //     <CustomButton
  //       title='SE CONNECTER'
  //       onPress={() => {
  //         props.navigation.navigate({ screen: 'SignUp' });
  //       }}
  //     />
  //   );
  // }

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

      <CustomButton
        title='SE CONNECTER'
        onPress={() => {
          handleSubmitLogin(),
            props.navigation.navigate('BottomNavigator', {
              screen: 'Homepage',
            });
        }}
      />

      <CustomButton
        title='CREER UN COMPTE'
        onPress={() => {
          props.navigation.navigate('SignUp');
        }}
      />
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

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

export default connect(mapStateToProps, null)(LogInScreen);
