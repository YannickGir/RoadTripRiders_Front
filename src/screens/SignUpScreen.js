import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
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

  useEffect(() => {
    console.log("find token :", findToken);
    // On vérifie s'il y a un token dans le local storage;
    var findToken = AsyncStorage.getItem("tokenInLS", function (error, data) {
      console.log("data :", data);
      if (data) {
        console.log("token trouvé dans le store : ", findToken);
        setTokenInLS(data);
        setTokenInLSExists(true);
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
    const data = await fetch(
      `https://roadtripsriders.herokuapp.com/users/sign-up`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `emailFromFront=${userEmail}&passwordFromFront=${userPassword}`,
      }
    );
    var response = await data.json();
    console.log(response);
    if (response.result === true) {
      //ajout du token dans le store
      props.addToken(response.token);
      //ajout du token dans le local storage
      AsyncStorage.setItem("token", response.token);

      props.navigation.navigate("BottomNavigator", {
        screen: "Homepage",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={(styles.logo, { height: height * 0.2 })}
        resizeMode="contain"
      />
      <Text>S'inscrire avec une adresse mail:</Text>
      <CustomInput
        placeholder="Email"
        value={userEmail}
        setValue={setUserEmail}
        secureTextEntry={false}
      />
      <CustomInput
        placeholder="Mot de passe"
        value={userPassword}
        setValue={setUserPassword}
        secureTextEntry={true}
      />

      <CustomButton title="S'INSCRIRE" onPress={() => handleSubmitSignUp()} />
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
