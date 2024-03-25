import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeStyles from './HomeStyles.js';

import HomeBg from '../../assets/images/svg_js/HomeBg.js';
import LogoBr from '../../components/logo/LogoBr.js';
import Notification32 from '../../components/icon32/Notification32.js';
import Homecard from '../../components/HomeCompo/Homecard.js';
import HomecardDifeF from '../../components/HomeCompo/HomecardDifeF.js';
import HomeSchEv from '../../components/HomeCompo/HomeSchEv.js';
import HomeProfile from '../../components/HomeCompo/HomeProfile.js';
import HomeSchoolInfo from '../../components/HomeCompo/HomeScoolInfo.js';
import HomeEvent from '../../components/HomeCompo/HomeEvent.js';
import HomeTag from '../../components/HomeCompo/HomeTag.js';
import HomeArrow from '../../components/HomeCompo/HomeArrow.js';
import HeartInac24 from '../../components/icon24/HeartInac24.js';
import AddFriendInac24 from '../../components/icon24/AddFriendInac24.js';
import ChatInac24 from '../../components/icon24/ChatInac24.js';
import HomeLine from '../../components/HomeCompo/HomeLine.js';
import HomecardBackBtn from '../../components/HomeCompo/HomecardBackBtn.js';

const HomePage = ({introduction = "adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.",
    name = "Amyyheart",
    country="France",
    age="23",
    }) => {
  const navigation = useNavigation();

  const [showNewCard, setShowNewCard] = useState(false);

  const handleAddFriendPress = () => {
    setShowNewCard(true);
  };

  return (
    <SafeAreaView style={HomeStyles.container}>
      <LinearGradient style={HomeStyles.linearGradient} colors={['#0029F4', '#6199C1', '#6199C1']}>
        <HomeBg style={HomeStyles.homebg} preserveAspectRatio='none' />
        
        <View style={HomeStyles.topContainer}>
          <View style={HomeStyles.logo}>
            <LogoBr />
          </View>
          <TouchableOpacity style={HomeStyles.notify} onPress={() => navigation.navigate('Notification')}>
            <Notification32 />
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
              <Text style={HomeStyles.introduction}>{introduction}</Text>
              <View style={HomeStyles.myinfoContainer}>
                <Text style={HomeStyles.TXname}>{name}</Text>
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

export default HomePage;
