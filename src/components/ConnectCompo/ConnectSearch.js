import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const ConnectSearch = () => {
  return (
    <View style={styles.rectangle} />
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 286,
    height: 48,
    backgroundColor: CustomTheme.bgBasic,
    borderRadius: 24,
  },
});

export default ConnectSearch;