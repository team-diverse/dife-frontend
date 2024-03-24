import React from 'react';
import { View, StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme.js';

const HomeProfile = () => {
  return (
    <View style={styles.rectangle} />
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 116,
    height: 136,
    backgroundColor: customTheme.textDisable,
    borderRadius: 16,
  },
});

export default HomeProfile;
