import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const { fontSub16 } = CustomTheme;

const FilterCategory = ({ text }) => {
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
  };

  const getContainerStyle = () => {
    return isActive ? styles.categoryActive : styles.categoryDefault;
  };

  const getTextStyle = () => {
    return isActive ? styles.textActive : styles.textDefault;
  };

  return (
    <TouchableOpacity onPress={handlePress}>
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
  textDefault: {
    ...fontSub16,
  },
  textActive: {
    ...fontSub16,
    color: CustomTheme.primaryMedium
  },
});

export default FilterCategory;
