import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Card, Avatar } from "react-native-elements";
import { connect } from "react-redux";

function ConversationsScreen(props) {
  const [conversationsList, setConversationsList] = useState([]);
  useEffect(() => {
    async function loadConversations() {
      const data = await fetch(
        `https://roadtripsriders1.herokuapp.com/inbox/readconversation?senderToken=${props.token}`
      );
      var body = await data.json();

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

                  <Text style={{ alignSelf: "center" }}>
                    {convData.firstname}: {convData.messagesEvent[i].content}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      );
    }

    loadConversations();
  }, []);

  return <View style={styles.backgroundColor}>{conversationsList}</View>;
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
