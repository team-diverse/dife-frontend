import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const HomeSchEv = () => {
  return (
    <View style={styles.rectangle} />
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 120,
    height: 148,
    backgroundColor: CustomTheme.bgBasic,
    borderRadius: 20,
  },
});

export default HomeSchEv;
