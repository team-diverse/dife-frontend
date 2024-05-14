import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const ConnectTop = () => {
  return (
    <View style={styles.rectangle} />
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: '100%',
    height: 175,
    backgroundColor: CustomTheme.primaryMedium,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});

export default ConnectTop;