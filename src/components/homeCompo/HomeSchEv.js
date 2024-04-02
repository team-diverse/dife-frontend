import React from 'react';
import { View, StyleSheet } from 'react-native';
import { customTheme } from '@styles/customTheme.js';

const HomeSchEv = () => {
  return (
    <View style={styles.rectangle} />
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 120,
    height: 148,
    backgroundColor: customTheme.bgBasic,
    borderRadius: 20,
  },
});

export default HomeSchEv;
