import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const HomeProfile = ({ profile=null, back=false }) => {
  const containerStyle = back ? { width: 100.647, height: 118 } : null;

  return (
    <View style={[styles.rectangle, containerStyle]}>
      <Image source={profile} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 116,
    height: 136,
    backgroundColor: CustomTheme.textDisable,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default HomeProfile;