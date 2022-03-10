import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

function CustomTimerFrom({ selectedValue, onValueChange }) {
  const [userBikeCateg, setuserBikeCateg] = useState("");

  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="de" value="00:00" />
        <Picker.Item label="6:00" value="6:00" />
        <Picker.Item label="7:00" value="7:00" />
        <Picker.Item label="8:00" value="8:00" />
        <Picker.Item label="9:00" value="9:00" />
        <Picker.Item label="10:00" value="10:00" />
        <Picker.Item label="11:00" value="11:00" />
        <Picker.Item label="12:00" value="12:00" />
        <Picker.Item label="11:00" value="11:00" />
        <Picker.Item label="13:00" value="13:00" />
        <Picker.Item label="14:00" value="14:00" />
        <Picker.Item label="15:00" value="15:00" />
        <Picker.Item label="16:00" value="16:00" />
        <Picker.Item label="17:00" value="17:00" />
        <Picker.Item label="18:00" value="18:00" />
        <Picker.Item label="19:00" value="19:00" />
        <Picker.Item label="20:00" value="20:00" />
        <Picker.Item label="21:00" value="21:00" />
        <Picker.Item label="22:00" value="22:00" />
        <Picker.Item label="23:00" value="23:00" />
        <Picker.Item label="00:00" value="00:00" />
      </Picker>
    </View>
  );
}

export default CustomTimerFrom;

// Just some styles
const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  picker: {
    paddingTop: "5%",
    paddingRight: "30%",
    width: 150,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#666",
  },
});
