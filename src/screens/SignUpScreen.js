import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import { MA_VARIABLE } from "@env";
import Logo from "../../assets/images/motoLogo.png";
import CustomInput from "../../src/components/CustomInput";
import CustomButton from "../../src/components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Ici on réexploite ce qui a été créé pour la page Log In
function SignUpScreen(props) {
  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();
  // On définit ici les variables d'état qui vont nous servir à enregistrer les valeurs des inputs
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // ici on définit les variables d'état qui vont nous permettre d'afficher des messages d'erreurs
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [listErrorsSignup, setErrorsSignup] = useState([]);

  useEffect(() => {
    console.log("find token :", findToken);
    // On vérifie s'il y a un token dans le local storage;
    var findToken = AsyncStorage.getItem("token", function (error, data) {
      console.log("data :", data);
      if (data) {
        console.log("token trouvé dans le store : ", findToken);
        props.navigation.navigate("BottomNavigator", {
          screen: "Homepage",
        });
      } else {
        console.log("Pas de token dans le store");
      }
    });
  }, []);

  var handleSubmitSignUp = async () => {
    console.log("click détecté");

    //On rajoute toutes les conditions d'affichage des messages d'erreurs
    var emailValid = false;
    if (userEmail.length == 0) {
      setEmailError("L'Email est requis");
    } else if (userEmail.length < 6) {
      setEmailError("L'Email doit faire plus de 6 caractères");
    } else if (userEmail.indexOf(" ") >= 0) {
      setEmailError("L'Email ne peut pas contenir d'espace");
    } else {
      setEmailError("");
      emailValid = true;
    }

    var passwordValid = false;
    if (userPassword.length == 0) {
      setPasswordError("La mot de passe est requis");
    } else if (userPassword.length < 6) {
      setPasswordError("Le mot de passe doit faire plus de 6 caractères");
    } else if (userPassword.indexOf(" ") >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else {
      setPasswordError("");
      passwordValid = true;
    }

    if (emailValid && passwordValid) {
      const data = await fetch(`${MA_VARIABLE}/users/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `emailFromFront=${userEmail}&passwordFromFront=${userPassword}`,
      });
      var response = await data.json();
      console.log(response);
      if (response.result === true) {
        //ajout du token dans le store
        props.addToken(response.token);
        //ajout du token dans le local storage
        AsyncStorage.setItem("token", response.token);
        Alert.alert("Compte crée!", "avec ton Email: " + userEmail);
        setUserEmail("");
        setUserPassword("");

        props.navigation.navigate("BottomNavigator", {
          screen: "Homepage",
        });
      } else {
        setErrorsSignup(response.error);
      }
    }
  };

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return <Text>{error}</Text>;
  });

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={(styles.logo, { height: height * 0.2 })}
        resizeMode="contain"
      />
      <Text>S'inscrire avec une adresse mail:</Text>
      <CustomInput
        autoCapitalize="none"
        placeholder="Email"
        value={userEmail}
        setValue={setUserEmail}
        secureTextEntry={false}
      />
      <Text>{emailError}</Text>
      <CustomInput
        autoCapitalize="none"
        placeholder="Mot de passe"
        value={userPassword}
        setValue={setUserPassword}
        secureTextEntry={true}
      />
      <Text>{passwordError}</Text>
      {tabErrorsSignup}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <CustomButton title="S'INSCRIRE" onPress={() => handleSubmitSignUp()} />
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(SignUpScreen);
