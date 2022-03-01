import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, Platform } from 'react-native';
import CustomButton from '../../src/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import LogInScreen from './LogInScreen';

function MyAccountScreen(props) {
  const [token, setToken] = useState('');
  const [tokenInLS, setTokenInLS] = useState(false);

  useEffect(() => {
    // On vérifie s'il y a un token dans l'async storage;
    var findToken = AsyncStorage.getItem('token', function () {
      if (!findToken || findToken.length === 0) {
        console.log('Pas de token dans le store');
        props.navigation.navigate('LogIn', {
          screen: 'LogInScreen',
        });
      }
    });
  }, []);

  function handleLogOut() {
    // on redirige vers l'écran de connection
    props.navigation.navigate('LogIn', {
      screen: 'LogInScreen',
    });
    // on enlève le token du async storage
    AsyncStorage.removeItem('token');
    console.log('token supprimé et utilisateur déconnecté');
    // on vide le store
    props.removeToken();
  }

  return (
    <View style={styles.container}>
      <Text>My Account Screen</Text>
      <CustomButton title='SE DECONNECTER' onPress={() => handleLogOut()} />
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
});

function mapDispatchToProps(dispatch) {
  return {
    removeToken: function (token) {
      dispatch({ type: 'clearToken', token: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(MyAccountScreen);
