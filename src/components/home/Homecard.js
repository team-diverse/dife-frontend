import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const Homecard = () => {
  return (
    <View style={styles.rectangle} />
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 260,
    height: 360,
    backgroundColor: CustomTheme.bgBasic,
    borderRadius: 20,
  },
});

export default Homecard;
