import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Header as HeaderRNE } from "react-native-elements";
import { Card, Text, Avatar, Input, Button } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import CustomHeader from "../components/CustomHeader";
import CustomInput from "../../src/components/CustomInput";
import { connect } from "react-redux";
import { MA_VARIABLE } from "@env";
import Icon from "react-native-vector-icons/FontAwesome";
//-------------HEADER RNE-------------------------------
import Logo from "../../assets/images/tinyLogoRR.png";
import { AntDesign } from "@expo/vector-icons";
import socketIOClient from "socket.io-client";
var socket = socketIOClient("https://roadtripsriders3.herokuapp.com");

function ChatGeneralScreen(props) {
  const scrollViewRef = useRef(ScrollView);
  const [currentMessage, setCurrentMessage] = useState();
  const [listMessage, setListMessage] = useState([]);

  useEffect(() => {
    socket.on("sendMessageToAll", (newMessageData) => {
      setListMessage([...listMessage, newMessageData]);
    });
  }, [listMessage]);

  console.log("listMessage", listMessage);
  var listMessageItem = listMessage.map((messageData, i) => {
    if (props.token != messageData.senderToken) {
      var color = "#FFEDAC";
      var row = "row";
      var alignSelf = "flex-start";
    } else {
      color = "#FFD178";
      row = "row-reverse";
      alignSelf = "flex-end";
    }
    // var msg = messageData.message.replace(/:\)/g, "\u263A");
    // msg = msg.replace(/:\(/g, "\u2639");
    // msg = msg.replace(/:p/g, "\uD83D\uDE1B");

    // msg = msg.replace(/[a-z]*fuck[a-z]*/gi, "\u2022\u2022\u2022");

    return (
      <Card
        key={i}
        containerStyle={{
          flexDirection: row,
          width: "66%",
          height: "auto",
          alignSelf: alignSelf,
          alignItems: "center",
          backgroundColor: "#FEFAEA",
          padding: 10,
          marginTop: 10,
          borderRadius: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingBottom: "2%",
            alignSelf: "flex-end",
          }}
        >
          <Image style={styles.avatar} source={{ uri: messageData.avatar }} />
          <Text style={styles.titleText}> {messageData.pseudo} </Text>
        </View>

        <Text
          style={{
            backgroundColor: color,
            borderColor: "black",

            borderRadius: 15,
            padding: "3%",
            alignItems: "center",
            alignSelf: alignSelf,
          }}
        >
          {messageData.message}
        </Text>
      </Card>
    );
  });

  return (
    <SafeAreaProvider style={styles.backgroundColor}>
      <HeaderRNE
        backgroundColor="#FFD230"
        centerComponent={{
          text: "CHAT GENERAL",
          style: styles.heading,
        }}
        rightComponent={
          <View style={styles.headerRight}>
            <Image source={Logo} style={styles.logo2} />
          </View>
        }
        leftComponent={
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("BottomNavigator", {
                screen: "ConversationScreen",
              })
            }
          >
            <AntDesign name="arrowleft" color="#363432" size={30} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
        style={{ flex: 1 }}
      >
        {listMessageItem}
      </ScrollView>
      <KeyboardAvoidingView
        style={{ backgroundColor: "#FFD230" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Votre message"
            containerStyle={styles.input}
            onChangeText={(msg) => setCurrentMessage(msg)}
            value={currentMessage}
          />
          <TouchableOpacity style={{ paddingLeft: "2%" }}>
            <Ionicons
              name="send"
              size={24}
              color="black"
              onPress={() => {
                socket.emit("sendMessage", {
                  message: currentMessage,
                  pseudo: props.userData.username,
                  avatar: props.userData.avatar,
                  senderToken: props.token,
                });
                setCurrentMessage("");
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingTop: "10%",
  },
  container: {
    flex: 1,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
  },
  user: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#FFEDAC",
    padding: 10,
    borderRadius: 35,
    marginTop: 10,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
  },
  text: {},
  avatar: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 35,
    width: 50,
    height: 50,
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
  heading: {
    fontSize: 22,
    width: "100%",
    paddingVertical: "2%",
    fontWeight: "bold",
    paddingLeft: "10%",
  },
  input: {
    backgroundColor: "#FFEDAC",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    width: "70%",
    height: "70%",
  },
  backgroundColor: {
    backgroundColor: "#FFFF",

    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    userData: state.userData,
    token: state.token,
  };
}
export default connect(mapStateToProps, null)(ChatGeneralScreen);
