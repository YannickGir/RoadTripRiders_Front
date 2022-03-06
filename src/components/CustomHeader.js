import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
//ici même principe que sur le composant Input, on crée un bouton générique que l'on va pouvoir réutiliser partout dans l'application.
//Tous les champs modifiables deviennent donc des variables

const CustomHeader = ({ title, onPress }) => {
  return (
    <View style={styles.header}>
      <View>
        <Button
          icon={
            <AntDesign
              onPress={onPress}
              name='arrowleft'
              size={40}
              color='black'
            />
          }
          containerStyle={{
            height: 80,
            width: 50,
            marginTop: '40%',
          }}
          buttonStyle={{ backgroundColor: '#FFD230', borderRadius: 15 }}
          titleStyle={{
            color: '#FEFAEA',
            // marginHorizontal: 20,
            fontWeight: 'bold',
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFD230',
          width: '75%',
        }}
      >
        <Text
          style={{
            color: '#363432',
            //fontFamily: 'poppins',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: deviceWidth,
    flex: 1,
    backgroundColor: '#FFD230',
    alignItems: 'center',
    flexDirection: 'row',
    maxHeight: '8%',
  },
  container: {},
  text: {},
});

export default CustomHeader;
