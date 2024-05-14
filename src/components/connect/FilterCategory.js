import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const { fontSub16 } = CustomTheme;

const FilterCategory = ({ text='category', mbtiCnt=null, setMbtiCnt=null, hobbyCnt=null, setHobbyCnt=null, isDisabled=false }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPressed, setIsPressed] = useState(false); 

  const handlePress = () => {
    if (mbtiCnt != null) {
      if (!isActive && mbtiCnt >= 3) {
        return;
      }
      setIsActive(!isActive);
      setMbtiCnt(prevCnt => prevCnt + (isActive ? -1 : 1));
    } else if (hobbyCnt != null) {
      if (!isActive && hobbyCnt >= 3) {
        return;
      }
      setIsActive(!isActive);
      setHobbyCnt(prevCnt => prevCnt + (isActive ? -1 : 1));
    }
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
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={1}
      disabled={isDisabled}
    >
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