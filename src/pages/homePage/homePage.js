import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { customTheme } from '../../styles/customTheme.js';

import HomeBg from '../../assets/images/svg_js/home_bg.js';
import LogoBr from '../../components/logo/logo_br.js';
import Notify from '../../components/icon_32/notification_32.js';
import Homecard from '../../components/homeCompo/Homecard.js';
import HomecardDifeF from '../../components/homeCompo/homecard_dife_f.js';
import HomeSchEv from '../../components/homeCompo/HomeSchEv.js';
import HomeProfile from '../../components/homeCompo/HomeProfile.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const { fontHead18, fontCaption } = customTheme;

const HomePage = () => {
  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <View style={styles.container}>
      <LinearGradient style={[styles.linearGradient, { paddingTop: statusBarHeight }]} colors={['#0029F4', '#6199C1', '#6199C1']}>
        <HomeBg style={styles.svg} preserveAspectRatio='none'/>
        <View style={styles.topContainer}>
          <View style={styles.logo}>
            <LogoBr />
          </View>
          <View style={styles.notify}>
            <Notify />
          </View>
        </View>
        <View style={styles.text}>
          <Text style={styles.TXconnect} >커넥트</Text>
          <Text style={styles.TXwithnewfriend} >새로운 친구와 함께해요!</Text>
        </View>
        <View style={styles.homecard}>
          <Homecard />
          <View style={styles.homecardDifeF}>
            <HomecardDifeF />
        </View>
          <View style={styles.homeProfile}>
            <HomeProfile />
          </View>
        <View style={styles.homeSchEv}>
          <HomeSchEv />
          <HomeSchEv />
        </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
  topContainer: {
    flexDirection: 'row',
  },
  logo: {
    flex: 1,
    marginTop: 1,
    marginLeft: -8
  },
  notify: {
    marginTop: 7,
    marginRight: 25,
  },
  text: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 25,
  },
  TXconnect: {
    ...fontHead18,
    color: customTheme.bgList,
  },
  TXwithnewfriend: {
    ...fontCaption,
    color: customTheme.bgList,
  },
  homecard: {
    position: 'relative',
    top: 8,
    shadowColor: '#3C454E4A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 6,
  },
  homecardDifeF: {
    position: 'absolute',
    top: 120,
  },
  homeProfile: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  homeSchEv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },
});

export default HomePage;
