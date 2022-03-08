import React, { useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomDateButton from './CustomButton';

const CustomDatePicker = ({ title, onChange, selectedValue }) => {
  const [date, setDate] = useState(selectedValue || new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onValueChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onChange(selectedDate.toString());
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View>
      <View>
        <CustomDateButton onPress={showDatepicker} title={title} />
      </View>

      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onValueChange}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;
