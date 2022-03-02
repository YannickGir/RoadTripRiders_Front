import React, { useEffect, useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import { Card, Avatar, ScrollView } from "react-native-elements";

export default function ConversationsScreen() {
  const [conversationsList, setConversationsList] = useState([]);
  useEffect(() => {
    async function loadConversations() {
      const data = await fetch(
        "https://roadtripsriders.herokuapp.com/inbox/readconversation?senderToken=121325651651651651"
      );
      var body = await data.json();
      console.log("body[0].messagesEvent", body[0][0].messagesEvent[0].content);
      setConversationsList(
        body.map((convData, i) => {
          console.log("convData", convData[0].messagesEvent[0].content);
          return (
            <Card key={i}>
              <Avatar
                size={64}
                rounded
                source={{
                  uri: "https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
                }}
              />

              <Text style={styles.name}>
                {convData.myInfo.trip.event_title}
              </Text>

              <Text>
                {convData.myInfo.user.firstname}:
                {convData[0].messagesEvent[0].content}
              </Text>
            </Card>
          );
        })
      );
    }

    loadConversations();
  }, []);

  return <View style={styles.conta}>{conversationsList}</View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAEA",
    alignItems: "center",
    justifyContent: "center",
  },
});
