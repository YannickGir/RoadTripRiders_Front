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
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
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

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export default function OtherRiderProfilScreen(props) {
  //Variables d'Etats des inputs
  const [otherUserFirstName, setOtherUserFirstName] = useState(""); //prénom utilisateur
  const [otherUserLastName, setOtherUserLastName] = useState(""); //nom utilisateur
  const [otherUserBirthDate, setOtherUserBirthDate] = useState(""); //date de naissance de l'utilisateur
  const [otherUserRegion, setotherUserRegion] = useState(""); //région où sort l'utilisateur
  const [otherUserCity, setOtherUserCity] = useState(""); //ville où vit l'utilisateur
  const [otherUserBio, setOtherUserBio] = useState(""); //biographie de l'utilisateur
  const [otherUserUsageProfil, setOtherUserUsageProfil] = useState("New Biker"); //statut de l'utilisateur en fonction de sa participation dans l'appli
  const [otherUserConnexionStatus, setOtherUserConnexionStatus] = useState(""); //statut de connexion l'utilisateur par rapport au chat

  //Variables d'Etats des checkboxes
  const [otherUserGender, setOtherUserGender] = useState("");
  const [otherHasPassenger, setOtherHasPassenger] = useState(false);
  const [otherHasNoPassenger, setOtherHasNoPassenger] = useState(false);

  const [otherUserBikeCateg, setOtherUserBikeCateg] = useState(""); //catégorie de moto de l'utilisateur
  const [otherUserBikeBrand, setOtherUserBikeBrand] = useState(""); //marque de la moto de l'utilisateur
  const [otherUserBikeModel, setOtherUserBikeModel] = useState(""); //modèle de la moto de l'utilisateur

  //Pour image picker
  //const [image, setImage] = useState(null); // image avatar user
  //const [image2, setImage2] = useState(null); // image moto user

  // on enregistre la dimension de l'écran de l'utilisateur
  const { height } = useWindowDimensions();

  //pour le step indicator nous permet de faire défiler les 3 rendus dans un screen
  const [formProgress, setFormProgress] = useState(0);

  var handleSubmitUserProfil = async () => {
    console.log("click détecté sur handleSubmitUserProfil");

    var passenger;
    if (hasPassenger) {
      passenger = true;
    } else if (hasNoPassenger) {
      passenger = false;
    }

    const data = await fetch(`${MA_VARIABLE}/users/edit-profil`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `token=${props.token}&firstnameFromFront=${userFirstName}&lastnameFromFront=${userLastName}&birthdayFromFront=${userBirthDate}&genderFromFront=${userGender}&passengerFromFront=${hasPassenger}&userRegionFromFront=${userRegion}&userCityFromFront=${userCity}&userBioFromFront=${userBio}&bikeCategFromFront=${userBikeCateg}&bikeBrandFromFront=${userBikeBrand}&bikeModelFromFront=${userBikeModel}&imageFromFront=${image}&image2FromFront=${image2}`,
    });

    const body = await data.json();

    if (body.result) {
      const dataUser = await fetch(
        `${MA_VARIABLE}/users/user-data?token=${props.token}`
      );
      var bodyUser = await dataUser.json();
      props.onSubmitUserData({
        avatar: bodyUser.userData.user_photo,
        username: bodyUser.userData.firstname,
      });
    } else {
      console.log("POST users/edit-profil failed", body);
    }

    // var bodyUser = await data.json();
    // console.log('usereditionscreen bodyUser', bodyUser);
  };

  // gender == male | female | other
  const setGenderCheckbox = (gender) => {
    setUserGender(userGender != gender ? gender : "");
  };

  return (
    <SafeAreaProvider style={styles.container}>
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
                  uri: "https://res.cloudinary.com/la-capsule-batch-49/image/upload/v1646668605/kisspng-memoji-pile-of-poo-emoji-sticker-smiley-user-avatars-5ae24b6a0ff6a1.1779418215247798820654_nukosr.png",
                }}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: "5%",
                  alignContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderRadius: 50,
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>{otherUserFirstName}</Text>
              <Text>{otherUserLastName}</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={{ paddingTop: "10%" }}>Quel rider est-il/elle ?</Text>

      <View style={styles.inputshort}>
        <Text>{otherUserBirthDate}</Text>
      </View>

      <View style={styles.inputshort}>
        <Text>{otherUserGender}</Text>
      </View>

      <View style={styles.inputshort}>
        <Text>{otherUserGender}</Text>
      </View>

      <Text style={{ paddingTop: "20%", paddingBottom: 0 }}>
        Quelle est ta date de naissance ?
      </Text>

      <Text style={{ paddingTop: "5%", paddingBottom: 0 }}>
        Un peu plus sur lui/elle:
      </Text>
      <CustomLongInput
        placeholder="Partage ta bio"
        value={userBio}
        setValue={setuserBio}
        secureTextEntry={false}
      />
      <Text style={{ paddingTop: "5%", paddingBottom: "20%" }}>
        Dans quel coin roules-tu ?
      </Text>

      <CustomRegionPicker
        selectedValue={userRegion}
        onValueChange={(value, index) => setuserRegion(value)}
      />

      <Text style={{ paddingTop: "0%", paddingBottom: "5%" }}>
        Dans quelle ville vis-tu ?
      </Text>
      <CustomInput
        placeholder="Ta ville"
        value={userCity}
        setValue={setuserCity}
        secureTextEntry={false}
      />
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ paddingTop: "5%", paddingBottom: "5%" }}>
          <FontAwesome name="motorcycle" size={30} color="#363432" /> Et sa moto
          ?
        </Text>

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
                    uri: "https://res.cloudinary.com/la-capsule-batch-49/image/upload/v1646668605/kisspng-memoji-pile-of-poo-emoji-sticker-smiley-user-avatars-5ae24b6a0ff6a1.1779418215247798820654_nukosr.png",
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: "5%",
                    alignContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 50,
                  }}
                />
              </View>
              <View>
                <Text style={{ fontSize: 20 }}>{otherUserBikeModel}</Text>
                <Text>{otherUserBikeBrand}</Text>
                <Text>{otherUserBikeCateg}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={{ paddingTop: "5%", paddingBottom: "5%" }}>
          Sa catégorie?
        </Text>
        <CustomBikeCategPicker
          selectedValue={userBikeCateg}
          onValueChange={(value, index) => setuserBikeCateg(value)}
          style={{ flex: 1, paddingBottom: 20 }}
        />
      </View>

      <Text
        style={{
          paddingTop: 0,
          paddingBottom: "5%",
          alignContent: "center",
        }}
      >
        Partage une photo
      </Text>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomButton title="CHARGE TA BECANE!" onPress={pickImage2} />
        {image2 && (
          <Image source={{ uri: image2 }} style={{ width: 200, height: 200 }} />
        )}
      </View>

      <Text style={{ paddingTop: "5%", paddingBottom: "5%" }}>
        As-tu un passager ?
      </Text>
      <View style={styles.secondary}>
        <CheckBox
          title="Oui"
          checkedColor="#ff8b00"
          checked={hasPassenger}
          onPress={() => {
            setHasPassenger(!hasPassenger), setHasNoPassenger(false);
          }}
        />
        <CheckBox
          title="Non"
          checkedColor="#ff8b00"
          checked={hasNoPassenger}
          onPress={() => {
            setHasNoPassenger(!hasNoPassenger), setHasPassenger(false);
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: deviceWidth,
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#FEFAEA",
        }}
      >
        <Button
          title="CALCULER ITINÉRAIRE"
          containerStyle={{
            height: 40,
            color: "#FFD230",
          }}
          titleStyle={{
            color: "#FEFAEA",
            fontWeight: "bold",
          }}
          buttonStyle={{ backgroundColor: "#363432" }}
          onPress={() => handleClick()}
        ></Button>
        <Button
          title="SUIVANT"
          onPress={() => SubmitItinerary()}
          buttonStyle={{ backgroundColor: "#ff8b00" }}
          icon={{
            name: "arrow-circle-right",
            type: "font-awesome",
            size: 19,
            color: "white",
          }}
        ></Button>
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    paddingTop: 0,
  },
  secondary: {
    flexDirection: "row",
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
