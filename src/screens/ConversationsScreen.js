import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { MA_VARIABLE } from "@env";
import { Button } from "react-native-elements";
import { connect } from "react-redux";

function ConversationsScreen(props) {
  const [conversationsList, setConversationsList] = useState([]);
  useEffect(() => {
    async function loadConversations() {
      const data = await fetch(
        `${MA_VARIABLE}/inbox/readconversation?senderToken=${props.token}`
      );
      var body = await data.json();
      console.log("body", body);
      if (body.conversationObjects == "") {
        return setConversationsList(
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              alignSelf: "center",
              textAlign: "center",
              paddingTop: "50%",
            }}
          >
            Mince ! Vous n'avez toujours pas de discution!
          </Text>
        );
      } else {
        setConversationsList(
          body.conversationObjects.map((convData, i) => {
            console.log("convData", convData);
            return (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  props.navigation.navigate("Chat", {
                    conversation_id: convData._id,
                    conversation_firstname: convData.firstname,
                  })
                }
              >
                <View style={styles.user}>
                  <Image
                    style={styles.avatar}
                    size={64}
                    rounded
                    source={{
                      uri: "https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
                    }}
                  />
                  <View style={{ justifyContent: "space-between" }}>
                    <Text style={styles.titleText}>{convData.title}</Text>

                    <Text style={{}}>
                      {convData.firstname}: {convData.messagesEvent[i].content}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        );
      }
    }

    loadConversations();
  }, []);

  return (
    <View style={styles.backgroundColor}>
      <ScrollView style={{ flex: 1 }}>{conversationsList}</ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Button
          // icon={<Icon name="envelope-o" size={20} color="#ffffff" />}
          title="Chat général"
          buttonStyle={{ backgroundColor: "#FF8B00" }}
          type="solid"
          onPress={() => props.navigation.navigate("ChatGeneral")}
        />
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
    paddingTop: 100,
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
    borderRadius: 15,
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
    paddingBottom: 20,
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
    marginRight: "10%",
  },
});

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}
export default connect(mapStateToProps, null)(ConversationsScreen);
