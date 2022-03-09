import React, { useState } from "react";
import { View, Button, Platform, Text, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomTimeNewTripInput from "../components/CustomTimeNewTripInput";

const CreateRoadTripScreenFirstStep2 = () => {
  const [From, setFrom] = useState(new Date());
  const [To, setTo] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [currentSetting, setcurrentSetting] = useState("from");

  const onChange = (event, selectedDate) => {
    if (currentSetting === "from") {
      const currentDate = selectedDate || From;
      setShow(Platform.OS === "ios");
      setFrom(currentDate);
    } else {
      const currentDate = selectedDate || To;
      setShow(Platform.OS === "ios");
      setTo(currentDate);
    }
  };

  const showTimepicker = (current) => {
    setShow(true);
    setcurrentSetting(current);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text>From:</Text>
        <CustomTimeNewTripInput
          placeholder="00:00"
          keyboardType="numeric"
          onFocus={() => showTimepicker("from")}
          value={From.toLocaleTimeString()}
        />
        <Text>To:</Text>
        <CustomTimeNewTripInput
          placeholder="00:00"
          keyboardType="numeric"
          onFocus={() => showTimepicker("to")}
          value={To.toLocaleTimeString()}
        />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={From}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default CreateRoadTripScreenFirstStep2;
