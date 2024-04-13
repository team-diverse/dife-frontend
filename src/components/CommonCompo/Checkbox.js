import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import FilterNotCheckIcon from '@components/ConnectCompo/FilterNotCheckIcon.js';
import FilterCheckIcon from '@components/ConnectCompo/FilterCheckIcon.js';
import { CustomTheme } from '@styles/CustomTheme';

const { fontSub16 } = CustomTheme;

const Checkbox = ({ checked, onPress, text, login=false }) => {
  const checkboxStyle = login ? styles.checkboxLogin : styles.checkbox;

  return (
    <TouchableOpacity onPress={onPress} style={[checkboxStyle, checked && styles.checked]}>
      {checked && <FilterCheckIcon />}
      {!checked && <FilterNotCheckIcon />}
      <Text style={styles.text}>{text}</Text>
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
});

export default Checkbox;
