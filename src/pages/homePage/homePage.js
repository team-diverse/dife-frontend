<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

import HomeStyles from './homeStyles.js';

import { useNavigation } from '@react-navigation/native';
import { View, Text, StatusBar } from 'react-native';
=======
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
=======
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
>>>>>>> f1c9494 (refactor: 상태바 높이 고려하기 위해 SafeAreaView 추가)

>>>>>>> 9d6afdd (feat: stack navigation 기능 추가 및 eventpage 관련 파일 생성)
import HomeStyles from './homeStyles.js';

import { useNavigation } from '@react-navigation/native';

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
import HomecardBackBtn from '../../components/homeCompo/HomecardBackBtn.js';

const HomePage = ({introduion = "adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.",
    name = "Amyyheart",
    country="France",
    age="23",
    }) => {
  const navigation = useNavigation();
<<<<<<< HEAD
<<<<<<< HEAD

  const [showNewCard, setShowNewCard] = useState(false);

  const handleAddFriendPress = () => {
    setShowNewCard(true);
  };

  return (
    <SafeAreaView style={HomeStyles.container}>
      <LinearGradient style={HomeStyles.linearGradient} colors={['#0029F4', '#6199C1', '#6199C1']}>
        <HomeBg style={HomeStyles.svg} preserveAspectRatio='none'/>
        
        <View style={HomeStyles.topContainer}>
          <View style={HomeStyles.logo}>
            <LogoBr />
          </View>
          <TouchableOpacity style={HomeStyles.notify} onPress={() => navigation.navigate('Notification')}>
            <Notify />
          </TouchableOpacity>
        </View>


        <View style={HomeStyles.textConnectWithContainer}>
          <Text style={HomeStyles.TXconnect} >커넥트</Text>
          <Text style={HomeStyles.TXwithnewfriend} >새로운 친구와 함께해요!</Text>
        </View>


        {showNewCard ? (
          <View style={HomeStyles.homecardContainer}>
            <HomeArrow style={{transform: [{ scaleX: -1 }] }}/>
            <View style={[HomeStyles.homecard, { alignItems: 'center' }]}>
              <Homecard />
              <View style={HomeStyles.homecardDifeF}>
                <HomecardDifeF />
              </View>
              <View style={HomeStyles.homecardBack}>
                <HomeProfile profile={require('../../assets/images/test_img/test_haedam.jpg')}/>
                <Text style={HomeStyles.viewProfile}>프로필 상세보기</Text>
                <View style={HomeStyles.addFriendOk}>
                  <Text style={HomeStyles.TXname}>{name}</Text>
                  <Text style={HomeStyles.myinfo}>에게 친구신청하시겠습니까?</Text>
                </View>
                
              </View>
              <View style={HomeStyles.homecardBackBtn}>
                  <HomecardBackBtn btnText="아니오" onPress={() => setShowNewCard(false)} />
                  <HomecardBackBtn btnText="신청하기"/>
                </View>
            </View>
            <HomeArrow />
          </View>
        ) : (
          <View style={HomeStyles.homecardContainer}>
            <HomeArrow style={{transform: [{ scaleX: -1 }] }}/>
            <View style={HomeStyles.homecard}>
              <Homecard />
              <View style={HomeStyles.homecardDifeF}>
                <HomecardDifeF />
              </View>
            <View style={HomeStyles.homeProfile}>
              <HomeProfile profile={require('../../assets/images/test_img/test_haedam.jpg')}/>
              <View style={HomeStyles.tagContainer}>
                <HomeTag text="Enfp"/>
                <HomeTag text="Sports"/>
                <HomeTag text="Drawing"/>
              </View>
              <Text style={HomeStyles.introdution}>{introduion}</Text>
              <View style={HomeStyles.myinfoContainer}>
                <Text style={[HomeStyles.TXname, { fontWeight: 'NotoSansCJKkr-Medium' }]}>{name}</Text>
                <Text style={HomeStyles.myinfo}> | {country} | {age}</Text>
              </View>
              </View>
              <View style={HomeStyles.connectIconContainer}>
                  <HeartInac24 style={HomeStyles.connectIcon}/>
                  <HomeLine style={HomeStyles.connectIcon}/>
                  <AddFriendInac24 style={HomeStyles.connectIcon} onPress={handleAddFriendPress}/>
                  <HomeLine style={HomeStyles.connectIcon}/>
                  <ChatInac24 style={HomeStyles.connectIcon}/>
              </View>
            </View>
          <HomeArrow />
          </View>
        )}


        <View style={HomeStyles.homeSchEv}>
          <HomeSchEv />
          <Text style={HomeStyles.TXhomeSch}>학교정보</Text>
          <HomeSchoolInfo style={HomeStyles.homeSchIcon}/>
          <TouchableOpacity style={HomeStyles.homeEv} onPress={() => navigation.navigate('Event')}>
            <HomeSchEv />
            <Text style={HomeStyles.TXhomeEv}>이벤트</Text>
            <HomeEvent style={HomeStyles.homeEvIcon}/>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
=======
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 0a96641 (feat: homepage 카드 뒷면 틀 완성)
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { customTheme } from '../../styles/customTheme.js';

=======
import { View, Text, StatusBar } from 'react-native';
import HomeStyles from './homeStyles.js';
>>>>>>> 609215a (refactor: styleSheet 다른 파일로 분리)

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
import HomecardBackBtn from '../../components/homeCompo/HomecardBackBtn.js';

const HomePage = ({introduion = "adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.",
    name = "Amyyheart",
    country="France",
    age="23"}) => {
=======
>>>>>>> 9d6afdd (feat: stack navigation 기능 추가 및 eventpage 관련 파일 생성)
  const statusBarHeight = StatusBar.currentHeight || 0;
=======
>>>>>>> f1c9494 (refactor: 상태바 높이 고려하기 위해 SafeAreaView 추가)

  const [showNewCard, setShowNewCard] = useState(false);

  const handleAddFriendPress = () => {
    setShowNewCard(true);
  };

  return (
    <SafeAreaView style={HomeStyles.container}>
      <LinearGradient style={HomeStyles.linearGradient} colors={['#0029F4', '#6199C1', '#6199C1']}>
        <HomeBg style={HomeStyles.svg} preserveAspectRatio='none'/>
        
        <View style={HomeStyles.topContainer}>
          <View style={HomeStyles.logo}>
            <LogoBr />
          </View>
          <TouchableOpacity style={HomeStyles.notify} onPress={() => navigation.navigate('Notification')}>
            <Notify />
          </TouchableOpacity>
        </View>


        <View style={HomeStyles.textConnectWithContainer}>
          <Text style={HomeStyles.TXconnect} >커넥트</Text>
          <Text style={HomeStyles.TXwithnewfriend} >새로운 친구와 함께해요!</Text>
        </View>


        {showNewCard ? (
          <View style={HomeStyles.homecardContainer}>
            <HomeArrow style={{transform: [{ scaleX: -1 }] }}/>
            <View style={[HomeStyles.homecard, { alignItems: 'center' }]}>
              <Homecard />
              <View style={HomeStyles.homecardDifeF}>
                <HomecardDifeF />
              </View>
              <View style={HomeStyles.homecardBack}>
                <HomeProfile profile={require('../../assets/images/test_img/test_haedam.jpg')}/>
                <Text style={HomeStyles.viewProfile}>프로필 상세보기</Text>
                <View style={HomeStyles.addFriendOk}>
                  <Text style={HomeStyles.TXname}>{name}</Text>
                  <Text style={HomeStyles.myinfo}>에게 친구신청하시겠습니까?</Text>
                </View>
                
              </View>
              <View style={HomeStyles.homecardBackBtn}>
                  <HomecardBackBtn btnText="아니오" onPress={() => setShowNewCard(false)} />
                  <HomecardBackBtn btnText="신청하기"/>
                </View>
            </View>
            <HomeArrow />
          </View>
        ) : (
          <View style={HomeStyles.homecardContainer}>
            <HomeArrow style={{transform: [{ scaleX: -1 }] }}/>
            <View style={HomeStyles.homecard}>
              <Homecard />
              <View style={HomeStyles.homecardDifeF}>
                <HomecardDifeF />
              </View>
            <View style={HomeStyles.homeProfile}>
              <HomeProfile profile={require('../../assets/images/test_img/test_haedam.jpg')}/>
              <View style={HomeStyles.tagContainer}>
                <HomeTag text="Enfp"/>
                <HomeTag text="Sports"/>
                <HomeTag text="Drawing"/>
              </View>
              <Text style={HomeStyles.introduction}>{introduion}</Text>
              <View style={HomeStyles.myinfoContainer}>
                <Text style={[HomeStyles.TXname, { fontFamily: 'NotoSansCJKkr-Medium' }]}>{name}</Text>
                <Text style={HomeStyles.myinfo}> | {country} | {age}</Text>
              </View>
              </View>
              <View style={HomeStyles.connectIconContainer}>
                  <HeartInac24 style={HomeStyles.connectIcon}/>
                  <HomeLine style={HomeStyles.connectIcon}/>
                  <AddFriendInac24 style={HomeStyles.connectIcon} onPress={handleAddFriendPress}/>
                  <HomeLine style={HomeStyles.connectIcon}/>
                  <ChatInac24 style={HomeStyles.connectIcon}/>
              </View>
            </View>
          <HomeArrow />
          </View>
        )}


        <View style={HomeStyles.homeSchEv}>
          <HomeSchEv />
          <Text style={HomeStyles.TXhomeSch}>학교정보</Text>
          <HomeSchoolInfo style={HomeStyles.homeSchIcon}/>
          <TouchableOpacity style={HomeStyles.homeEv} onPress={() => navigation.navigate('Event')}>
            <HomeSchEv />
            <Text style={HomeStyles.TXhomeEv}>이벤트</Text>
            <HomeEvent style={HomeStyles.homeEvIcon}/>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

<<<<<<< HEAD
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


  homecardBack: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
  },
  viewProfile: {
    ...fontCaption,
    color: customTheme.textSecondary,
    marginTop: 20,
    textDecorationLine: 'underline'
  },
  addFriendOk: {
    flexDirection: 'row',
    marginTop: 33,
  },
  homecardBackBtn: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 20,
  },
  
});
>>>>>>> fcb351d (feat: homePage 기본 틀 구현)

=======
>>>>>>> 609215a (refactor: styleSheet 다른 파일로 분리)
export default HomePage;
