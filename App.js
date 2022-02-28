import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// Bottom Menu
import HomeScreen from './screens/HomeScreen';
import RidersAroundScreen from './screens/RidersAroundScreen';
import ConversationsScreen from './screens/ConversationsScreen';
import MyAccountScreen from './screens/MyAccountScreen';

//Stack Navigation
//Ecran d'accueil Logo
import LoadingScreen from './screens/LoadingScreen';

// Ecran de bienvenue pour inviter les utilisateurs à remplir leurs infos perso
import WelcomeScreen from './screens/WelcomeScreen';

//Log In Sign Up
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';

// Mes contacts dans l'onglet mon profil
import MyContactsScreen from './screens/MyContactsScreen';
// Page d'édition des infos de l'utilisateur
import UserInfosScreen from './screens/UserInfosScreen';
// Historique des roadtrips de l'utilisateur
import UserPastRoadtripsScreen from './screens/UserPastRoadtripsScreen';
//roadtrips à venir de l'utilisateur
import UserRoadtripsToComeScreen from './screens/UserRoadtripsToComeScreen';

// Profil d'un autre utilisateur
import OtherRiderProfil from './screens/OtherRiderProfil';

//Ecran des messages dans les conversations
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconNameFontAwesome;
          let iconNameIonicons;
          if (route.name === 'Homepage') {
            iconNameIonicons = 'ios-home';
            return <Ionicons name={iconNameIonicons} size={25} color={color} />;
          } else if (route.name === 'Riders') {
            iconNameFontAwesome = 'search';
            return (
              <FontAwesome name={iconNameFontAwesome} size={25} color={color} />
            );
          } else if (route.name === 'Conversations') {
            iconNameIonicons = 'chatbox';
            return <Ionicons name={iconNameIonicons} size={25} color={color} />;
          } else if (route.name === 'MyAccount') {
            iconNameFontAwesome = 'user';
            return (
              <FontAwesome name={iconNameFontAwesome} size={25} color={color} />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF8B00',
        inactiveTintColor: '#363432',
        style: {
          backgroundColor: '#FFD230',
        },
      }}
    >
      <Tab.Screen name='Homepage' component={HomeScreen} />
      <Tab.Screen name='Riders' component={RidersAroundScreen} />
      <Tab.Screen name='Conversations' component={ConversationsScreen} />
      <Tab.Screen name='MyAccount' component={MyAccountScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='LogIn' component={LogInScreen} />
        <Stack.Screen name='BottomNavigator' component={BottomNavigator} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen name='Loading' component={LoadingScreen} />
        <Stack.Screen name='MyContacts' component={MyContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
