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
import HomeSchoolInfo from '../../components/homeCompo/HomeScoolInfo.js';
import HomeEvent from '../../components/homeCompo/HomeEvent.js';
import HomeTag from '../../components/homeCompo/homeTag.js';
import HomeArrow from '../../components/homeCompo/HomeArrow.js';
import HeartInac24 from '../../components/icon_24/heart_inac_24.js';
import AddFriendInac24 from '../../components/icon_24/addFriend_inac_24.js';
import ChatInac24 from '../../components/icon_24/chat_inac_24.js';
import HomeLine from '../../components/homeCompo/HomeLine.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const { fontHead18, fontSub16, fontCaption } = customTheme;

const HomePage = ({introduion = "adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.",
    name = "Amyyheart",
    country="France",
    age="23"}) => {
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

        <View style={styles.textConnectWithContainer}>
          <Text style={styles.TXconnect} >커넥트</Text>
          <Text style={styles.TXwithnewfriend} >새로운 친구와 함께해요!</Text>
        </View>

        <View style={styles.homecardContainer}>
          <HomeArrow style={{transform: [{ scaleX: -1 }] }}/>
          <View style={styles.homecard}>
            <Homecard />
            <View style={styles.homecardDifeF}>
              <HomecardDifeF />
            </View>
            <View style={styles.homeProfile}>
              <HomeProfile profile={require('../../assets/images/test_img/test_haedam.jpg')}/>
              <View style={styles.tagContainer}>
                <HomeTag text="Enfp"/>
                <HomeTag text="Sports"/>
                <HomeTag text="Drawing"/>
              </View>
              <Text style={styles.introdution}>{introduion}</Text>
              <View style={styles.myinfoContainer}>
                <Text style={[styles.TXname, { fontWeight: 'NotoSansCJKkr-Medium' }]}>{name}</Text>
                <Text style={styles.myinfo}> | {country} | {age}</Text>
              </View>
            </View>
            <View style={styles.connectIconContainer}>
                <HeartInac24 style={styles.connectIcon}/>
                <HomeLine style={styles.connectIcon}/>
                <AddFriendInac24 style={styles.connectIcon}/>
                <HomeLine style={styles.connectIcon}/>
                <ChatInac24 style={styles.connectIcon}/>
            </View>
          </View>
          <HomeArrow />
        </View>

        <View style={styles.homeSchEv}>
          <HomeSchEv />
          <Text style={styles.TXhomeSch}>학교정보</Text>
          <HomeSchoolInfo style={styles.homeSchIcon}/>
          <View style={styles.homeEv}>
            <HomeSchEv />
            <Text style={styles.TXhomeEv}>이벤트</Text>
            <HomeEvent style={styles.homeEvIcon}/>
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
  textConnectWithContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 25,
    marginRight: 83,
  },
  TXconnect: {
    ...fontHead18,
    color: customTheme.bgList,
    marginRight: 4,
  },
  TXwithnewfriend: {
    ...fontCaption,
    color: customTheme.bgList,
  },
  homecardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    top: 70,
  },
  homeProfile: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 6,
  },
  introdution: {
    ...fontCaption,
    width: 200,
    height: 51,
    marginTop: 6,
    marginBottom: 6,
  },
  myinfoContainer: {
    flexDirection: 'row',
    // marginTop: 6,
  },
  TXname: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'NotoSansCJKkr-Bold',
  },
  myinfo: {
    ...fontCaption,
  },
  connectIconContainer: {
    position: 'absolute',
    left: 10,
    bottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectIcon: {
    marginHorizontal: 28,
  },
  homeSchEv: {
    flexDirection: 'row',
    marginTop: 28,
    shadowColor: '#3C454E4A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 6,
  },
  TXhomeSch: {
    ...fontSub16,
    position: 'absolute',
    top: 12,
    left: 12,
  },
  homeSchIcon: {
    position: 'absolute',
    top: 35,
    left: 40,
  },
  homeEv: {
    position: 'relative',
    marginLeft: 21,
  },
  TXhomeEv: {
    ...fontSub16,
    position: 'absolute',
    top: 12,
    left: 12,
  },
  homeEvIcon: {
    position: 'absolute',
    top: 48,
    left: 47,
  },
  
});

export default HomePage;
