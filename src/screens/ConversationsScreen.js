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
      console.log("bodyCov", body);
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
            var message = convData.last_message.content;
            if (message.length > 25) {
              message = message.substring(0, 24) + "...";
            }
            console.log("convdata", convData);
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
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={
                        {
                          // flexDirection: "row",
                          // alignSelf: "center",
                          // alignContent: "center",
                        }
                      }
                    >
                      <Image
                        style={styles.avatar}
                        size={64}
                        rounded
                        source={{
                          uri: convData.user_photo,
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.titleText}>{convData.title}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>
                          {convData.firstname}:
                        </Text>
                        <Text> {message}</Text>
                      </View>
                    </View>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingTop: "2%",
                    }}
                  >
                    
                  </View> */}
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
    flexDirection: "column",
    width: "80%",
    alignSelf: "center",

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
    marginBottom: "2%",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  avatar: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 35,
    width: 50,
    height: 50,

    marginRight: "3%",
  },
});

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}
export default connect(mapStateToProps, null)(ConversationsScreen);
