import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Header as HeaderRNE } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const CustomHeaderRNE = (props, { onPress, headerTitle }) => {
  return (
    <SafeAreaProvider>
      <HeaderRNE
        style={{ backgroundColor: '#yellow' }}
        leftComponent={
          <TouchableOpacity onPress={onPress}>
            <AntDesign name='arrowleft' color='#363432' size={30} />
          </TouchableOpacity>
        }
        centerComponent={{ text: { headerTitle }, style: styles.heading }}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
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
});

export default CustomHeaderRNE;
