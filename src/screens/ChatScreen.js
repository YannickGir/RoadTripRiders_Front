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
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
function ChatScreen(props) {
  const [dimensions, setDimensions] = useState({ window, screen });

  var idConv = props.route.params.conversation_id;
  console.log("name", props.route.params.conversation_firstname);
  const [conversationsList, setConversationsList] = useState([]);
  const [contentMessage, setContentMessage] = useState("");
  const [tokenMessage, setTokenMessage] = useState("");
  const scrollViewRef = useRef(ScrollView);
  useEffect(() => {
    async function loadConversations() {
      const data = await fetch(
        `${MA_VARIABLE}/inbox/tripchat?idConv=${idConv}`
      );
      var body = await data.json();
      console.log("body", { MA_VARIABLE });

      setConversationsList(
        body.conversationObjects.map((convData, i) => {
          console.log("body", body.conversationObjects);
          return (
            <Card key={i} containerStyle={styles.user}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.avatar}
                  size={64}
                  rounded
                  source={{
                    uri: convData.user_photo,
                  }}
                />
                <View>
                  <Text style={styles.titleText}> {convData.firstname}: </Text>
                  <Text style={{ flexWrap: "wrap" }}>{convData.content}</Text>
                </View>
              </View>
            </Card>
          );
        })
      );
    }

    loadConversations();
  }, []);

  async function reLoadConversations() {
    const data = await fetch(`${MA_VARIABLE}/inbox/tripchat?idConv=${idConv}`);
    var body = await data.json();

    setConversationsList(
      body.conversationObjects.map((convData, i) => {
        return (
          <View key={i}>
            <View style={styles.user}>
              <Image
                style={styles.avatar}
                size={64}
                rounded
                source={{
                  uri: "https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.titleText}> {convData.firstname}: </Text>
                <Text style={{ flexWrap: "wrap" }}>{convData.content}</Text>
              </View>
              <View></View>
            </View>
          </View>
        );
      })
    );
  }

  var handleSandMessage = async () => {
    console.log("click détecté");
    const data1 = await fetch(
      `https://roadtripsriders1.herokuapp.com/inbox/addmessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `content=${contentMessage}&senderToken=${props.token}&idConv=${idConv}`,
      }
    );
    var response = await data1.json();
    reLoadConversations();
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
    fontSize: 20,
  },
  avatar: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 35,
    width: 70,
    height: 70,
    position: "relative",
  },
});

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}
export default connect(mapStateToProps, null)(ChatScreen);
