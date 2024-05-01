import React from 'react';
<<<<<<< HEAD
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
=======
import { View, Image, StyleSheet } from 'react-native';
>>>>>>> 57030e9 (feat: homepage 기본 틀 완성)
import { customTheme } from '../../styles/customTheme.js';

const HomeProfile = ({profile}) => {
  return (
<<<<<<< HEAD
    <View style={styles.rectangle} />
>>>>>>> 52cdf0d (style: component 폴더 정리)
=======
    <View style={styles.rectangle}>
      <Image source={profile} style={styles.image} />
    </View>

>>>>>>> 57030e9 (feat: homepage 기본 틀 완성)
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 116,
    height: 136,
    backgroundColor: customTheme.textDisable,
    borderRadius: 16,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 57030e9 (feat: homepage 기본 틀 완성)
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
<<<<<<< HEAD
=======
>>>>>>> 52cdf0d (style: component 폴더 정리)
=======
>>>>>>> 57030e9 (feat: homepage 기본 틀 완성)
  },
});

export default HomeProfile;
