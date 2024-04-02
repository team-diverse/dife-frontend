import React from 'react';
import { View, StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme.js';

const HomeLine = () => {
  return (
    <View style={styles.line} />
  );
};

const styles = StyleSheet.create({
  line: {
    width: 1,
    height: 39,
    backgroundColor: customTheme.borderColor,
  },
});

export default HomeLine;
