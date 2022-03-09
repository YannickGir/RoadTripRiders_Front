import React, { useState } from "react";
import { View, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomDateButton from "./CustomDateButton";

const CustomTimePicker = ({ title, onChange, selectedValue }) => {
  const [date, setDate] = useState(selectedValue || new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onValueChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    onChange(selectedDate.toString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <View>
        <CustomDateButton onPress={showTimepicker} title={title} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onValueChange}
        />
      )}
    </View>
  );
};

export default CustomTimePicker;
