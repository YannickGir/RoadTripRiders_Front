import React, { useState } from 'react';
import { CheckBox, Icon } from 'react-native-elements';

const CustomCheckbox = ({ title, checked, onPress }) => {
  return (
    <CheckBox
      title={title}
      checked={checked}
      checkedColor='#ff8b00'
      onPress={onPress}
    />
  );
};

export default CustomCheckbox;
