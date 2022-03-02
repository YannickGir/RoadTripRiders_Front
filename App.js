import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { provider, Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import token from "./src/reducers/token";

// Bottom Menu
import HomeScreen from "./src/screens/HomeScreen";
import RidersAroundScreen from "./src/screens/RidersAroundScreen";
import ConversationsScreen from "./src/screens/ConversationsScreen";
import MyAccountScreen from "./src/screens/MyAccountScreen";

//Stack Navigation
//Ecran d'accueil Logo
import LoadingScreen from "./src/screens/LoadingScreen";

// Ecran de bienvenue pour inviter les utilisateurs à remplir leurs infos perso
import WelcomeScreen from "./src/screens/WelcomeScreen";

//Log In Sign Up
import LogInScreen from "./src/screens/LogInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

// Mes contacts dans l'onglet mon profil
import MyContactsScreen from "./src/screens/MyContactsScreen";
// Page d'édition des infos de l'utilisateur
import UserInfosScreen from "./src/screens/UserInfosScreen";
// Historique des roadtrips de l'utilisateur
import UserPastRoadtripsScreen from "./src/screens/UserPastRoadtripsScreen";
//roadtrips à venir de l'utilisateur
import UserRoadtripsToComeScreen from "./src/screens/UserRoadtripsToComeScreen";

// Profil d'un autre utilisateur
import OtherRiderProfil from "./src/screens/OtherRiderProfil";

//Ecran des messages dans les conversations
import ChatScreen from "./src/screens/ChatScreen";

//Ecrans de création de roadtrips
import CreateRoadTripScreenFirstStep from "./src/screens/CreateRoadTripScreenFirstStep";
import CreateRoadTripScreenSecondStep from "./src/screens/CreateRoadTripScreenSecondStep";
import CreateRoadTripScreenFinalStep from "./src/screens/CreateRoadTripScreenFinalStep";

import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

const store = createStore(combineReducers({ token }));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconNameFontAwesome;
          let iconNameIonicons;
          if (route.name === "Homepage") {
            iconNameIonicons = "ios-home";
            return <Ionicons name={iconNameIonicons} size={25} color={color} />;
          } else if (route.name === "Riders") {
            iconNameFontAwesome = "search";
            return (
              <FontAwesome name={iconNameFontAwesome} size={25} color={color} />
            );
          } else if (route.name === "Conversations") {
            iconNameIonicons = "chatbox";
            return <Ionicons name={iconNameIonicons} size={25} color={color} />;
          } else if (route.name === "MyAccount") {
            iconNameFontAwesome = "user";
            return (
              <FontAwesome name={iconNameFontAwesome} size={25} color={color} />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: "#FF8B00",
        inactiveTintColor: "#363432",
        style: {
          backgroundColor: "#FFD230",
        },
      }}
    >
      <Tab.Screen name="Homepage" component={HomeScreen} />
      <Tab.Screen name="Riders" component={RidersAroundScreen} />
      <Tab.Screen name="Conversations" component={ConversationsScreen} />
      <Tab.Screen name="MyAccount" component={MyAccountScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="MyContacts" component={MyContactsScreen} />
          <Stack.Screen
            name="newRoadTripFirstStep"
            component={CreateRoadTripScreenFirstStep}
          />
          <Stack.Screen
            name="newRoadTripSecondStep"
            component={CreateRoadTripScreenSecondStep}
          />
          <Stack.Screen
            name="newRoadTripFinalStep"
            component={CreateRoadTripScreenFinalStep}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
  },
});
