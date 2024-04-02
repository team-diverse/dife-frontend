import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { customTheme } from '@styles/customTheme.js';

const { fontCaption } = customTheme;

const HomecardBackBtn = ({ btnText, onPress }) => {
  const btnStyle = btnText === '신청하기' ? styles.btnApply : styles.btnCancel;
  const btnTextStyle = btnText === '신청하기' ? styles.btnTextA : styles.btnTextC;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.btn, btnStyle]}>
        <Text style={btnTextStyle}>{btnText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 102,
    height: 37,
    backgroundColor: customTheme.bgBasic,
    borderWidth: 1,
    borderColor: customTheme.primaryMedium,
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  btnApply: {
    backgroundColor: customTheme.primaryMedium,

  },
  btnCancel: {
    backgroundColor: customTheme.bgBasic,
  },
  btnTextA: {
    ...fontCaption,
    color: customTheme.bgBasic,
  },
  btnTextC: {
    ...fontCaption,
  },
});

export default HomecardBackBtn;
