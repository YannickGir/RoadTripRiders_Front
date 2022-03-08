import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, Platform, Image } from 'react-native';
import CustomButton from '../../src/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
// import pour le header
import { Header as HeaderRNE } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
// fin import pour le header

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
      <SafeAreaProvider>
        <HeaderRNE
          backgroundColor='#FFD230'
          centerComponent={{
            text: 'MON COMPTE',
            style: styles.heading,
          }}
        />
        <View style={styles.secondary}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFD230',
              padding: 10,
              height: 120,
              width: 340,
              borderRadius: 15,
              margin: 10,
              marginTop: '10%',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image
                  source={{ uri: props.userData.avatar }}
                  style={{
                    width: 80,
                    height: 80,
                    marginRight: '5%',
                    alignContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 50,
                  }}
                />
              </View>
              <View>
                <Text style={{ fontSize: 30 }}>
                  Hello {props.userData.username}
                </Text>
                <Text>
                  <FontAwesome name='motorcycle' size={30} color='#363432' />{' '}
                  Statut : Newbi(ker)
                </Text>
              </View>
            </View>
          </View>
        </View>
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
      </SafeAreaProvider>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  //style pour le header
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    marginBottom: 20,
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
});

function mapDispatchToProps(dispatch) {
  return {
    removeToken: function (token) {
      dispatch({ type: 'clearToken', token: token });
    },
  };
}

function mapStateToProps(state) {
  console.log('myaccountscreen state :', state);
  return { userData: state.userData };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountScreen);
