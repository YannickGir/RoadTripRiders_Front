import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  useWindowDimensions,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
//-------------HEADER RNE-------------------------------
import Logo from '../../assets/images/tinyLogoRR.png';
import Logo2 from '../../assets/images/construction.png';
import { Header as HeaderRNE } from 'react-native-elements';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
export default function MyMaintenanceScreen(props) {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <HeaderRNE
        backgroundColor='#FFD230'
        leftComponent={
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Mon Compte', {
                screen: 'MyAccountScreen',
              })
            }
          >
            <AntDesign name='arrowleft' color='#363432' size={30} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: "CARNET D'ENTRETIEN",
          style: styles.heading,
        }}
        rightComponent={
          <View style={styles.headerRight}>
            <Image source={Logo} style={styles.logo2} />
          </View>
        }
      />
      <View style={{ marginBottom: '40%' }}></View>
      <View style={{ marginBottom: '2%' }}>
        <Image
          source={Logo}
          style={(styles.logo, { height: height * 0.2 })}
          resizeMode='contain'
        />
      </View>
      <View style={{ marginBottom: '1%' }}>
        <Image
          source={Logo2}
          style={
            (styles.logo,
            { height: height * 0.5, width: width * 0.5, marginBottom: '10%' })
          }
          resizeMode='contain'
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      ></KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fde29b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    width: '100%',
    paddingVertical: '2%',
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
  },
  logo2: {
    width: '50%',
    height: '700%',
    marginBottom: '7%',
  },
});
