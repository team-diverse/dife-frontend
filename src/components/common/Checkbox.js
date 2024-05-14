import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import FilterNotCheckIcon from '@components/connect/FilterNotCheckIcon.js';
import FilterCheckIcon from '@components/connect/FilterCheckIcon.js';
import { CustomTheme } from '@styles/CustomTheme';

const { fontSub16, fontBody14 } = CustomTheme;

const Checkbox = ({ checked, onPress, text, login=false }) => {
  const checkboxStyle = login ? styles.checkboxLogin : styles.checkbox;
  const checkboxTextStyle = login ? styles.textLogin : styles.text;

  return (
    <TouchableOpacity onPress={onPress} style={[checkboxStyle, checked && styles.checked]}>
      {checked && <FilterCheckIcon />}
      {!checked && <FilterNotCheckIcon />}
      <Text style={checkboxTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row',
    marginHorizontal: 24,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: CustomTheme.bgList,
  },
  checkboxLogin: {
    flexDirection: 'row',
    marginHorizontal: 24,
    paddingVertical: 15,
    alignItems: 'center',
  },
  text: {
    ...fontSub16,
    marginLeft: 6,
  },
  textLogin: {
    ...fontBody14,
    color: CustomTheme.textSecondary,
    marginLeft: 6,
  },
});

export default Checkbox;
