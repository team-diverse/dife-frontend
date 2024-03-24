import React from 'react';
<<<<<<< HEAD
import { View, Image, StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme.js';

const HomeProfile = ({profile}) => {
  return (
    <View style={styles.rectangle}>
      <Image source={profile} style={styles.image} />
    </View>

=======
import { View, StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme.js';

const HomeProfile = () => {
  return (
    <View style={styles.rectangle} />
>>>>>>> 52cdf0d (style: component 폴더 정리)
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 116,
    height: 136,
    backgroundColor: customTheme.textDisable,
    borderRadius: 16,
<<<<<<< HEAD
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
=======
>>>>>>> 52cdf0d (style: component 폴더 정리)
  },
});

export default HomeProfile;
