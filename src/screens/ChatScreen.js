import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Card, Avatar, Input, Button } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../../src/components/CustomInput";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

function ChatScreen(props) {
  var idConv = props.route.params.conversation_id;
  console.log("name", props.route.params.conversation_firstname);
  const [conversationsList, setConversationsList] = useState([]);
  const [contentMessage, setContentMessage] = useState("");
  const [tokenMessage, setTokenMessage] = useState("");
  useEffect(() => {
    async function loadConversations() {
      const data = await fetch(
        `https://roadtripsriders1.herokuapp.com/inbox/tripchat?idConv=${idConv}`
      );
      var body = await data.json();
      console.log("body", body.conversationObjects);

      setConversationsList(
        body.conversationObjects.map((convData, i) => {
          return (
            <View key={i}>
              <View style={styles.user}>
                <Avatar
                  size={64}
                  rounded
                  source={{
                    uri: "https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
                  }}
                />
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.titleText}> {convData.firstname}: </Text>
                  <Text style={{ alignSelf: "center" }}>
                    {convData.content}
                  </Text>
                </View>
                <View></View>
              </View>
            </View>
          );
        })
      );
    }

    loadConversations();
  }, []);
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
      <ScrollView style={{ flex: 1 }}>{conversationsList}</ScrollView>
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
              onPress={() => handleSandMessage()}
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
    paddingTop: 50,
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  user: {
    flexDirection: "row",
    width: "80%",
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
    alignSelf: "center",
  },
});

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}
export default connect(mapStateToProps, null)(ChatScreen);
