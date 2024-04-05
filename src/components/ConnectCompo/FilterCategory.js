import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const { fontSub16 } = CustomTheme;

const FilterCategory = ({ text }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPressed, setIsPressed] = useState(false); 

  const handlePressIn = () => {
    setIsPressed(true); 
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePress = () => {
    setIsActive(!isActive);
  };

  const getContainerStyle = () => {
    if (isActive) {
      return styles.categoryActive;
    } else if (isPressed) {
      return styles.categoryPressed;
    } else {
      return styles.categoryDefault;
    }
  };

  const getTextStyle = () => {
    if (isActive) {
      return styles.textActive;
    } else if (isPressed) {
      return styles.textPressed;
    } else {
      return styles.textDefault;
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}>
      <View style={getContainerStyle()}>
        <Text style={getTextStyle()}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryDefault: {
    width: 102,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CustomTheme.bgBasic,
    paddingVertical: 8,
    marginHorizontal: 5.5,
    marginVertical: 4,
    borderWidth: 2,
    borderColor: '#D9EAFF',
    borderRadius: 43,
  },
  categoryActive: {
    width: 102,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CustomTheme.bgBasic,
    paddingVertical: 8,
    marginHorizontal: 5.5,
    marginVertical: 4,
    borderWidth: 2,
    borderColor: CustomTheme.primaryMedium,
    borderRadius: 43,
  },
  categoryPressed: {
    width: 102,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CustomTheme.primaryBg,
    paddingVertical: 8,
    marginHorizontal: 5.5,
    marginVertical: 4,
    borderWidth: 2,
    borderColor: CustomTheme.primaryBg,
    borderRadius: 43,
  },
  textDefault: {
    ...fontSub16,
  },
  textActive: {
    ...fontSub16,
    color: CustomTheme.primaryMedium,
  },
  textPressed: {
    ...fontSub16,
    color: '#8C8D91',
  },
});

export default FilterCategory;
