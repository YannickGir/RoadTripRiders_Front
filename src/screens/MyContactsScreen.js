import React from "react";
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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
//-------------HEADER RNE-------------------------------
import Logo from "../../assets/images/tinyLogoRR.png";
import { Header as HeaderRNE } from "react-native-elements";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
export default function UserRoadtripsToComeScreen(props) {
  const { height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <HeaderRNE
        backgroundColor="#FFD230"
        leftComponent={
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Mon Compte", {
                screen: "MyAccountScreen",
              })
            }
          >
            <AntDesign name="arrowleft" color="#363432" size={30} />
          </TouchableOpacity>
        }
        centerComponent={{
          text: "MES CONTACTS",
          style: styles.heading,
        }}
        rightComponent={
          <View style={styles.headerRight}>
            <Image source={Logo} style={styles.logo2} />
          </View>
        }
      />
      <View style={{ marginBottom: "50%" }}></View>
      <View style={{ marginBottom: "8%" }}>
        <Image
          source={Logo}
          style={(styles.logo, { height: height * 0.2 })}
          resizeMode="contain"
        />
      </View>
      <View style={{ marginBottom: "3%" }}>
        <Text style={{ fontWeight: "bold", fontSize: 15, marginBottom: "80%" }}>
          Creation de la page en cours....
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      ></KeyboardAvoidingView>
    </View>
    // <View style={styles.container}>
    //   <HeaderRNE
    //     backgroundColor="#FFD230"
    //     centerComponent={{
    //       text: "CREE TON TRIP",
    //       style: styles.heading,
    //     }}
    //     rightComponent={
    //       <View style={styles.headerRight}>
    //         <Image source={Logo} style={styles.logo2} />
    //       </View>
    //     }
    //   />
    //   <Text>UserRoadtripsToComeScreen</Text>
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // width: deviceWidth,
    // height: deviceHeight,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 22,
    width: "100%",
    paddingVertical: "2%",
    fontWeight: "bold",
    paddingLeft: "15%",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
  },
  logo2: {
    width: "50%",
    height: "700%",
    marginBottom: "7%",
  },
});
