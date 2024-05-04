import React, { createContext } from 'react';
import { View } from 'react-native';
import RadioButtonItems from '@components/RadioButton/RadioButtonItems';

const RadioGroupContext = createContext({});

const RadioButtonGroup = (props) => {
  const { Provider } = RadioGroupContext;

  const { selected, children, onSelected, containerStyle } = props;

  return (
    <Provider
      value={{
        onSelected,
        selected,
      }}
    >
      <View style={[containerStyle]}>{children}</View>
    </Provider>
  );
};

RadioButtonGroup.RadioButtonItems = RadioButtonItems;

export { RadioGroupContext, RadioButtonGroup };