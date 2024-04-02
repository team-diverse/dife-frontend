import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme.js';

const HomeProfile = ({profile}) => {
  return (
    <View style={styles.rectangle}>
      <Image source={profile} style={styles.image} />
    </View>

  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 116,
    height: 136,
    backgroundColor: customTheme.textDisable,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default HomeProfile;
