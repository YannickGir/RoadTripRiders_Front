import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../src/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import LogInScreen from './LogInScreen';
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';

function MyAccountScreen(props) {
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
      <View style={styles.secondary}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('UserInfosEdition', {
              screen: 'UserInfosEditionScreen',
            })
          }
        >
          <MaterialCommunityIcons
            name='pen'
            size={60}
            color='#363432'
            style={{ paddingTop: 20, paddingBottom: 10 }}
          />
          <Text>Editer</Text>
          <Text>mon profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('MyContacts', {
              screen: 'MyContactsScreen',
            })
          }
        >
          <FontAwesome
            name='group'
            size={60}
            color='#363432'
            style={{ paddingTop: 20, paddingBottom: 10 }}
          />
          <Text>Mes</Text>
          <Text>contacts</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondary}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('UserPastRoadtrips', {
              screen: 'UserPastRoadtripsScreen',
            })
          }
        >
          <FontAwesome
            name='history'
            size={60}
            color='#363432'
            style={{ paddingTop: 20, paddingBottom: 10 }}
          />
          <Text>Parcours déjà</Text>
          <Text>effectués</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('UserRoadtripsToCome', {
              screen: 'UserRoadtripsToComeScreen',
            })
          }
        >
          <FontAwesome
            name='calendar'
            size={60}
            color='#363432'
            style={{ paddingTop: 20, paddingBottom: 10 }}
          />
          <Text>Mes sorties</Text>
          <Text>à venir</Text>
        </TouchableOpacity>
      </View>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#FFEDAC',
    padding: 10,
    height: 160,
    width: 160,
    borderRadius: 15,
    margin: 10,
  },
  secondary: {
    flexDirection: 'row',
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
