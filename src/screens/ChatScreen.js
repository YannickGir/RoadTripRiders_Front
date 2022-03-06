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
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../../src/components/CustomInput";
import { connect } from "react-redux";
import { MA_VARIABLE } from "@env";
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
  const scrollViewRef = useRef(ScrollView);
  useEffect(() => {
    async function loadConversations() {
      const data = await fetch(
        `https://roadtripridersyann.herokuapp.com/inbox/tripchat?idConv=${idConv}`
      );
      var body = await data.json();
      for (let i = 0; i < body.length; i++) {}
      console.log("body", { MA_VARIABLE });

      setConversationsList(
        body.conversationObjects.map((convData, i) => {
          if (props.token != convData.senderToken) {
            var color = "#FFEDAC";
            var row = "row";
          } else {
            color = "#FF8B00";
            row = "row-reverse";
          }
          console.log("body", convData.senderToken);
          return (
            <Card
              key={i}
              containerStyle={{
                flexDirection: row,
                width: "95%",
                height: "auto",
                alignSelf: "center",
                alignItems: "center",
                backgroundColor: "#FEFAEA",
                padding: 10,

                marginTop: 10,
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
      `https://roadtripridersyann.herokuapp.com/inbox/tripchat?idConv=${idConv}`
    );
    var body = await data.json();

    setConversationsList(
      body.conversationObjects.map((convData, i) => {
        if (props.token != convData.senderToken) {
          var color = "#FFF3C7";
          var row = "row";
        } else {
          color = "#FFD178";
          row = "row-reverse";
        }
        return (
          <Card
            key={i}
            containerStyle={{
              flexDirection: row,
              width: "95%",
              height: "auto",
              alignSelf: "center",
              alignItems: "center",
              backgroundColor: "#FEFAEA",
              padding: 10,

              marginTop: 10,
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

  var handleSandMessage = async () => {
    console.log("click détecté");
    if (contentMessage != "") {
      const data1 = await fetch(`${MA_VARIABLE}/inbox/addmessage`, {
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
    <View style={styles.backgroundColor}>
      <CustomHeader
        onPress={() =>
          props.navigation.navigate("BottomNavigator", {
            screen: "ConversationScreen",
          })
        }
        title="Chat"
      />
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
        style={{ flex: 1 }}
      >
        {conversationsList}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              color="black"
              onPress={() => {
                reLoadConversations();
              }}
            />
          </TouchableOpacity>
          <CustomInput
            placeholder="Your message"
            setValue={setContentMessage}
            value={contentMessage}
          />
          <TouchableOpacity style={{ paddingLeft: "2%" }}>
            <Ionicons
              name="send"
              size={24}
              color="black"
              onPress={() => {
                handleSandMessage(),
                  setContentMessage(""),
                  reLoadConversations();
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    backgroundColor: "#FFEDAC",
    width: "100%",
  },
  backgroundColor: {
    backgroundColor: "#FEFAEA",
    paddingTop: "10%",
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
});

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}
export default connect(mapStateToProps, null)(ChatScreen);
