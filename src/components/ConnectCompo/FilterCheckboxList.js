import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import FilterNotCheckIcon from '@components/ConnectCompo/FilterNotCheckIcon.js';
import FilterCheckIcon from '@components/ConnectCompo/FilterCheckIcon.js';
import { CustomTheme } from '@styles/CustomTheme';

const { fontSub16 } = CustomTheme;

const FilterCheckboxList = ({ checked, onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.checkbox, checked && styles.checked]}>
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
  text: {
    ...fontSub16,
    marginLeft: 6,
  },
});

export default FilterCheckboxList;
