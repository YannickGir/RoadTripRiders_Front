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

import { Card, Text, Avatar, Input, Button } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header as HeaderRNE } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import CustomInputWhite from "../components/CustomInputWhite";
import { connect } from "react-redux";
import { MA_VARIABLE } from "@env";
import AnimatedLoader from "react-native-animated-loader";

import Icon from "react-native-vector-icons/FontAwesome";
let deviceWidth = Dimensions.get("window").width;
function ChatScreen(props) {
  // const [dimensions, setDimensions] = useState({ window, screen });
  const [color, setColor] = useState("");

  var idConv = props.route.params.conversation_id;
  console.log("name", props.route.params.conversation_firstname);
  const [conversationsList, setConversationsList] = useState([]);
  const [contentMessage, setContentMessage] = useState("");
  const [tokenMessage, setTokenMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const scrollViewRef = useRef(ScrollView);
  useEffect(() => {
    async function loadConversations() {
      const data = await fetch(
        `${MA_VARIABLE}/inbox/tripchatprivate?idConv=${idConv}`
      );
      var body = await data.json();
      setVisible(false);
      console.log("body", body);

      setConversationsList(
        body.conversationObjects.map((convData, i) => {
          if (props.token != convData.senderToken) {
            var color = "#FFEDAC";
            var row = "row";
            var alignSelf = "flex-start";
          } else {
            color = "#FFD178";
            row = "row-reverse";
            alignSelf = "flex-end";
          }
          console.log("body", convData.senderToken);
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
              <View style={{ flexDirection: row }}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: convData.user_photo,
                  }}
                />
                <Text style={styles.titleText}> {convData.firstname} </Text>
              </View>

              <Text
                style={{
                  backgroundColor: color,
                  borderColor: "black",
                  borderRadius: 15,
                  padding: "3%",
                  alignSelf: "center",
                }}
              >
                {convData.content}
              </Text>
            </Card>
          );
        })
      );
    }

    loadConversations();
  }, []);

  async function reLoadConversations() {
    const data = await fetch(
      `${MA_VARIABLE}/inbox/tripchatprivate?idConv=${idConv}`
    );
    var body = await data.json();

    setConversationsList(
      body.conversationObjects.map((convData, i) => {
        if (props.token != convData.senderToken) {
          var color = "#FFEDAC";
          var row = "row";
          var alignSelf = "flex-start";
        } else {
          color = "#FFD178";
          row = "row-reverse";
          alignSelf = "flex-end";
        }
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
            <View style={{ flexDirection: row }}>
              <Image
                style={styles.avatar}
                source={{
                  uri: convData.user_photo,
                }}
              />
              <Text style={styles.titleText}> {convData.firstname} </Text>
            </View>

            <Text
              style={{
                backgroundColor: color,
                borderColor: "black",
                borderRadius: 15,
                padding: "3%",
                alignSelf: alignSelf,
              }}
            >
              {convData.content}
            </Text>
          </Card>
        );
      })
    );
  }

  var handleSandMessage = async () => {
    console.log("click détecté");
    if (contentMessage != "") {
      const data1 = await fetch(`${MA_VARIABLE}/inbox/createprivatemessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `content=${contentMessage}&senderToken=${props.token}&idConv=${idConv}`,
      });
      var response = await data1.json();
      reLoadConversations();
    }
  };

  return (
    <SafeAreaProvider style={styles.backgroundColor}>
      <HeaderRNE
        backgroundColor="#FFD230"
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
        centerComponent={{
          text: "CHAT",
          style: styles.heading,
        }}
      />

      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
        style={{ flex: 1 }}
      >
        <AnimatedLoader
          visible={visible}
          source={require("../lotties/loading-dots-in-yellow.json")}
          overlayColor="rgba(255,255,255,0.75)"
          speed={1}
          animationStyle={{ height: 200, width: 200 }}
        ></AnimatedLoader>
        {conversationsList}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ backgroundColor: "#FFD230" }}
      >
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{ paddingRight: "2%" }}>
            <FontAwesome
              name="refresh"
              size={24}
              color="#FFD230"
              onPress={() => {
                reLoadConversations();
              }}
            />
          </TouchableOpacity>
          <CustomInputWhite
            placeholder="Ton message"
            setValue={setContentMessage}
            value={contentMessage}
            style={{ backgroundColor: "#FFFF" }}
          />
          <TouchableOpacity style={{ paddingLeft: "2%" }}>
            <Ionicons
              name="send"
              size={24}
              color="#363432"
              style={{ alignItems: "center" }}
              onPress={() => {
                handleSandMessage(),
                  setContentMessage(""),
                  reLoadConversations();
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  cards: {
    backgroundColor: "#FFEDAC",
    width: "100%",
  },
  backgroundColor: {
    backgroundColor: "#FFFF",
    flex: 1,
  },

  container: {
    flex: 1,
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
  //style pour le header
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    marginBottom: 20,
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
});

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}
export default connect(mapStateToProps, null)(ChatScreen);
