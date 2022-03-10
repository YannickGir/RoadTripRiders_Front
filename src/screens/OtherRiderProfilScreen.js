import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView,
} from "react-native";
//import header
import { Header as HeaderRNE } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
// fin import header
import { MA_VARIABLE } from "@env";
import { connect } from "react-redux";
import { Button, CheckBox } from "react-native-elements";
import CustomCheckBox from "../components/CustomCheckBox";
import CustomInput from "../components/CustomInput";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTimePicker from "../components/CustomTimePicker";
import CustomButton from "../components/CustomButton";
import ImageUploadComponent from "../components/ImageUploadComponent";
import CustomButtonOrangeNext from "../components/CustomButtonOrangeNext";
import CustomButtonOrange from "../components/CustomButtonOrange";
import * as ImagePicker from "expo-image-picker";
import CustomHeader from "../components/CustomHeader";
import CustomHeaderRNE from "../components/CustomHeaderRNE";
import CustomBikeCategPicker from "../components/CustomBikeCategPicker";
import CustomRegionPicker from "../components/CustomRegionPicker";
var moment = require("moment"); // pour présentation date
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

function OtherRiderProfilScreen(props) {
  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();

  // appel de la variable récupérée de la page RidersAroundScreen
  var otherUserId = props.route.params.otherUserId;
  console.log("COUCOU dans other profil", otherUserId);

  //Variables d'Etats des inputs
  const [otherUserFirstName, setOtherUserFirstName] = useState(""); //prénom utilisateur
  const [otherUserLastName, setOtherUserLastName] = useState(""); //nom utilisateur
  const [otherUserBirthDate, setOtherUserBirthDate] = useState(""); //date de naissance de l'utilisateur
  const [otherUserRegion, setotherUserRegion] = useState(""); //région où sort l'utilisateur
  const [otherUserCity, setOtherUserCity] = useState(""); //ville où vit l'utilisateur
  const [otherUserBio, setOtherUserBio] = useState(""); //biographie de l'utilisateur
  const [otherUserUsageProfil, setOtherUserUsageProfil] = useState("New Biker"); //statut de l'utilisateur en fonction de sa participation dans l'appli
  const [otherUserConnexionStatus, setOtherUserConnexionStatus] = useState(""); //statut de connexion l'utilisateur par rapport au chat
  const [otherUserGender, setOtherUserGender] = useState("");
  const [otherHasPassenger, setOtherHasPassenger] = useState(false);
  const [otherHasNoPassenger, setOtherHasNoPassenger] = useState(false);
  const [otherUserData, setOtherUserData] = useState();

  //Variables d'Etats de la moto de l'autre utilisateur
  const [otherUserBikeCateg, setOtherUserBikeCateg] = useState(""); //catégorie de moto de l'utilisateur
  const [otherUserBikeBrand, setOtherUserBikeBrand] = useState(""); //marque de la moto de l'utilisateur
  const [otherUserBikeModel, setOtherUserBikeModel] = useState(""); //modèle de la moto de l'utilisateur

  //var otherUserId = props.route.params.otherUserId;

  const [otherUser, setOtherUser] = useState({
    otherUserData: {
      firstname: "",
      lastname: "",

      token: "",
      birth_date: "",
      gender: "",
      user_bio: "",
      user_city: "",
      user_region: "",
      user_latitude: "",
      user_longitude: "",
      bike_type: "",
      bike_brand: "",
      bike_categ: "",
    },
  });

  //console.log('otherriderprofil otherUserId 1', otherUserId);
  useEffect(() => {
    async function loadUserProfil() {
      const otherUserData = await fetch(
        `${MA_VARIABLE}/users/other-user-profil?otherUserIdfromFront=${otherUserId}`
      );
      var body = await otherUserData.json();
      console.log("body other user", body);
      setOtherUser(body);
      //console.log('otherriderprofil otherUserId 2', otherUserId);
    }

    loadUserProfil();
  }, []);

  var handleClick = async () => {
    const data = await fetch(`${MA_VARIABLE}/inbox/addprivatemessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `token=${props.token}&otherUserId=${otherUserId}`,
    });
    var response = await data.json();
    console.log("response", response);

    if (response.alreadyConv == true) {
      props.navigation.navigate("ChatPrivate", {
        conversation_id: response.conversationPrivateSaved._id,
      });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <HeaderRNE
          backgroundColor="#FFD230"
          leftComponent={
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("BottomNavigator", {
                  screen: "RidersAroundScreen",
                })
              }
            >
              <AntDesign name="arrowleft" color="#363432" size={30} />
            </TouchableOpacity>
          }
          centerComponent={{
            text: "MOTARDS",
            style: styles.heading,
          }}
        />

        <ScrollView style={{ height: deviceHeight * 0.8 }}>
          <View style={styles.secondary}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFD230",
                padding: 10,
                height: 120,
                width: 340,
                borderRadius: 15,
                margin: 10,
                marginTop: "5%",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Image
                    source={{
                      uri: `${otherUser.otherUserData.user_photo}`,
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      marginRight: "5%",
                      alignContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 20 }}>
                    {otherUser.otherUserData.firstname}
                  </Text>
                  <Text>{otherUser.otherUserData.lastname}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.centered}>
            <Text
              style={{
                paddingTop: "5%",
                paddingBottom: "1%",
                fontWeight: "bold",
              }}
            >
              Son anniversaire
            </Text>

            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="birthday-cake"
                size={24}
                color="#363432"
                style={{ alignSelf: "center", marginRight: "2%" }}
              />
              <View style={styles.inputshort}>
                <Text>
                  {moment(otherUser.otherUserData.birth_date).format("L")}
                </Text>
              </View>
            </View>

            <Text style={{ paddingTop: "5%", paddingBottom: "1%" }}>
              Son genre
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="ios-transgender"
                size={24}
                color="#363432"
                style={{ alignSelf: "center", marginRight: "2%" }}
              />
              <View style={styles.inputshort}>
                <Text>{otherUser.otherUserData.gender}</Text>
              </View>
            </View>

            <View style={styles.secondary}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFD230",
                  padding: 10,
                  height: 120,
                  width: 340,
                  borderRadius: 15,
                  margin: 10,
                  marginTop: "5%",
                }}
              >
                <Text
                  style={{
                    paddingTop: "5%",
                    paddingBottom: "1%",
                    fontWeight: "bold",
                  }}
                >
                  Sa bio
                </Text>
                <Text>{otherUser.otherUserData.user_bio}</Text>
              </View>
            </View>

            <Text style={{ paddingTop: "5%", paddingBottom: "1%" }}>
              Sa région pour sortir
            </Text>

            <View style={{ flexDirection: "row" }}>
              <FontAwesome5
                name="route"
                size={24}
                color="#363432"
                style={{ alignSelf: "center", marginRight: "2%" }}
              />
              <View style={styles.inputshort}>
                <Text>{otherUser.otherUserData.user_region}</Text>
              </View>
            </View>

            <Text style={{ paddingTop: "5%", paddingBottom: "1%" }}>
              Sa ville
            </Text>

            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                name="location-city"
                size={24}
                color="#363432"
                style={{ alignSelf: "center", marginRight: "2%" }}
              />
              <View style={styles.inputshort}>
                <Text>{otherUser.otherUserData.user_city}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ paddingTop: "5%", paddingBottom: "1%" }}>
              <FontAwesome name="motorcycle" size={30} color="#363432" /> Et sa
              moto ?
            </Text>
          </View>

          <View style={styles.secondary}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFD230",
                padding: 10,
                height: 120,
                width: 340,
                borderRadius: 15,
                margin: 10,
                marginTop: "5%",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Image
                    source={{
                      uri: `${otherUser.otherUserData.moto_picture}`,
                    }}
                    style={{
                      width: 70,
                      height: 70,
                      marginRight: "5%",
                      alignContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 20 }}>
                    {otherUser.otherUserData.bike_type}
                  </Text>
                  <Text>{otherUser.otherUserData.bike_brand}</Text>
                  <Text>{otherUser.otherUserData.bike_model}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            height: deviceHeight * 0.1,
            width: deviceWidth,
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#FEFAEA",
          }}
        >
          <Button
            icon={<Ionicons name="ios-mail" size={24} color="#FEFAEA" />}
            title=" CONTACTER"
            containerStyle={{
              height: 40,
              width: 180,
              color: "#FFD230",
            }}
            titleStyle={{
              color: "#FEFAEA",
              fontWeight: "bold",
            }}
            buttonStyle={{ backgroundColor: "#363432", borderRadius: 15 }}
            onPress={() => handleClick()}
          ></Button>
          <Button
            title="AJOUTER EN AMI"
            containerStyle={{
              height: 40,
              width: 180,
              color: "#FFD230",
            }}
            titleStyle={{
              color: "#FEFAEA",
              fontWeight: "bold",
            }}
            buttonStyle={{ backgroundColor: "#363432", borderRadius: 15 }}
            onPress={() => handleClick()}
          ></Button>
        </View>
      </SafeAreaProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight * 1,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    paddingTop: 0,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  //style genre input long
  input: {
    backgroundColor: "#FFEDAC",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    width: 250,
  },
  //style input court
  inputshort: {
    backgroundColor: "#FFEDAC",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    width: 250,
  },
  //style pour le header
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    marginBottom: 10,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    color: "#363432",
    fontSize: 22,
    fontWeight: "bold",
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#FFD230",
  },
  //fin du style pour le header
  bottomPage: {
    width: deviceWidth,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: "10%",
    marginTop: "10%",
    marginBottom: "10%",
  },
  barprogress: {
    width: deviceWidth,
    backgroundColor: "#FEFAEA",
    marginBottom: "3%",
    marginTop: "3%",
  },
  text: {},
});

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}
export default connect(mapStateToProps, null)(OtherRiderProfilScreen);
