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

export default function ChatGeneralScreen() {
  const scrollViewRef = useRef(ScrollView);
  return (
    <View style={styles.container}>
      <View style={styles.backgroundColor}>
        <CustomHeader
          style={styles.header}
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
        ></ScrollView>
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
              // setValue={setContentMessage}
              // value={contentMessage}
            />
            <TouchableOpacity style={{ paddingLeft: "2%" }}>
              <Ionicons
                name="send"
                size={24}
                color="black"
                // onPress={() => {
                //   handleSandMessage(),
                //     setContentMessage(""),
                //     reLoadConversations();
                // }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
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
});
