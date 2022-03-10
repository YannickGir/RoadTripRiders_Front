import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
//import header
import { Header as HeaderRNE } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
// fin import header
import { MA_VARIABLE } from '@env';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import CustomButton from '../components/CustomButton';

var moment = require('moment'); // pour présentation date
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

function UserInfosScreen(props) {
  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();

  const [user, setUser] = useState({
    userData: {
      firstname: '',
      lastname: '',
      user_photo: '',
      token: '',
      birth_date: '',
      gender: '',
      user_bio: '',
      user_city: '',
      user_region: '',
      user_latitude: '',
      user_longitude: '',
      bike_type: '',
      bike_brand: '',
      bike_categ: '',
      moto_picture: '',
    },
  });

  useEffect(() => {
    async function loadMyProfil() {
      const userData = await fetch(
        `${MA_VARIABLE}/users/my-profile?tokenFromFront=${props.token}`
      );
      var body = await userData.json();
      console.log('body other user', body);
      setUser(body);
    }

    loadMyProfil();
  }, []);

  return (
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
            text: 'MON PROFIL',
            style: styles.heading,
          }}
        />

        <ScrollView style={{ height: deviceHeight * 0.8 }}>
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
                marginTop: '5%',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Image
                    source={{
                      uri: `${user.userData.user_photo}`,
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      marginRight: '5%',
                      alignContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 20 }}>
                    {user.userData.firstname}
                  </Text>
                  <Text>{user.userData.lastname}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.centered}>
            <Text
              style={{
                paddingTop: '5%',
                paddingBottom: '1%',
                fontWeight: 'bold',
              }}
            >
              Mon anniversaire
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <FontAwesome
                name='birthday-cake'
                size={24}
                color='#363432'
                style={{ alignSelf: 'center', marginRight: '2%' }}
              />
              <View style={styles.inputshort}>
                <Text>{moment(user.userData.birth_date).format('L')}</Text>
              </View>
            </View>

            <Text
              style={{
                paddingTop: '5%',
                paddingBottom: '1%',
                fontWeight: 'bold',
              }}
            >
              Mon genre
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons
                name='ios-transgender'
                size={24}
                color='#363432'
                style={{ alignSelf: 'center', marginRight: '2%' }}
              />
              <View style={styles.inputshort}>
                <Text>{user.userData.gender}</Text>
              </View>
            </View>

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
                  marginTop: '5%',
                }}
              >
                <Text
                  style={{
                    paddingTop: '1%',
                    paddingBottom: '2%',
                    fontWeight: 'bold',
                  }}
                >
                  Ma bio
                </Text>
                <Text>{user.userData.user_bio}</Text>
              </View>
            </View>

            <Text
              style={{
                paddingTop: '5%',
                paddingBottom: '1%',
                fontWeight: 'bold',
              }}
            >
              Ma région pour sortir
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <FontAwesome5
                name='route'
                size={24}
                color='#363432'
                style={{ alignSelf: 'center', marginRight: '2%' }}
              />
              <View style={styles.inputshort}>
                <Text>{user.userData.user_region}</Text>
              </View>
            </View>

            <Text
              style={{
                paddingTop: '5%',
                paddingBottom: '1%',
                fontWeight: 'bold',
              }}
            >
              Ma ville
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons
                name='location-city'
                size={24}
                color='#363432'
                style={{ alignSelf: 'center', marginRight: '2%' }}
              />
              <View style={styles.inputshort}>
                <Text>{user.userData.user_city}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={{
                paddingTop: '5%',
                paddingBottom: '1%',
                fontWeight: 'bold',
              }}
            >
              <FontAwesome name='motorcycle' size={30} color='#363432' /> Et ma
              moto ?
            </Text>
          </View>

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
                marginTop: '5%',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Image
                    source={{
                      uri: `${user.userData.moto_picture}`,
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      marginRight: '5%',
                      alignContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 20 }}>
                    {user.userData.bike_type}
                  </Text>
                  <Text>{user.userData.bike_brand}</Text>
                  <Text>{user.userData.bike_model}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            height: deviceHeight * 0.1,
            width: deviceWidth,
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#FEFAEA',
          }}
        >
          <CustomButton
            icon={<Ionicons name='ios-mail' size={24} color='#FEFAEA' />}
            title='RETOUR SUR MON COMPTE'
            containerStyle={{
              height: 40,
              width: 180,
              color: '#FFD230',
            }}
            titleStyle={{
              color: '#FEFAEA',
              fontWeight: 'bold',
            }}
            buttonStyle={{ backgroundColor: '#363432', borderRadius: 15 }}
            onPress={() =>
              props.navigation.navigate('BottomNavigator', {
                screen: 'MyAccountScreen',
              })
            }
          ></CustomButton>
        </View>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight * 1,
    backgroundColor: '#FEFAEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: 0,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

function mapStateToProps(state) {
  console.log('HOMESCREEN', state.token, state);
  return { token: state.token };
}

export default connect(mapStateToProps, null)(UserInfosScreen);
