import React, { useState } from 'react';
import { CheckBox, Icon } from 'react-native-elements';

const CustomCheckbox = ({ title }) => {
  const [check, setCheck] = useState(false);

  return (
    <CheckBox
      title={title}
      checked={check}
      checkedColor='#ff8b00'
      onPress={() => setCheck(!check)}
    />
  );
};

export default CustomCheckbox;
