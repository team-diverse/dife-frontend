import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeStyles from './HomeStyles.js';

import HomeBg from '@assets/images/svg_js/HomeBg.js';
import LogoBr from '@components/logo/LogoBr.js';
import Notification32 from '@components/icon32/Notification32.js';
import Homecard from '@components/homeCompo/Homecard.js';
import HomecardDifeF from '@components/homeCompo/HomecardDifeF.js';
import HomeSchEv from '@components/homeCompo/HomeSchEv.js';
import HomeProfile from '@components/homeCompo/HomeProfile.js';
import HomeSchoolInfo from '@components/homeCompo/HomeScoolInfo.js';
import HomeEvent from '@components/homeCompo/HomeEvent.js';
import HomeTag from '@components/homeCompo/homeTag.js';
import HomeArrow from '@components/homeCompo/HomeArrow.js';
import HeartInac24 from '@components/icon24/HeartInac24.js';
import AddFriendInac24 from '@components/icon24/AddFriendInac24.js';
import ChatInac24 from '@components/icon24/ChatInac24.js';
import HomeLine from '@components/homeCompo/HomeLine.js';
import HomecardBackBtn from '@components/homeCompo/HomecardBackBtn.js';
import HomecardDifeB from '@components/homeCompo/HomecardDifeB.js';


const HomePage = ({cnt=3}) => {
  const navigation = useNavigation();

  const profileDataList = [
    {
      tag1: 'istj',
      introduction: "제 이름은 테스트용입니다.",
      age: "23"
    },
    {
      profileImg: require('../../assets/images/test_img/test_profileImg.png'),
      tag1: 'enfp',
      tag2: 'Sports',
      tag3: 'Drawing',
      introduction: "adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.",
      name: "Amyyheart",
      country: "France",
      age: "23"
    },
    {
      profileImg: require('../../assets/images/test_img/test_haedam.jpg'),
      tag1: 'entp',
      tag2: 'music',
      tag3: 'running',
      introduction: "안녕하세요! 새로운 친구를 사귀고 싶은 해담입니다. 여행을 좋아하고 새로운 경험을 즐기며 삶을 즐겁게 살고 있어요.",
      name: "개해담",
      country: "한국",
      age: "1"
    },
    {
      profileImg: require('../../assets/images/test_img/test_event.png'),
      tag1: 'istj',
      tag2: 'study',
      tag3: 'reading',
      introduction: "안녕하세요! 저는 운영체제를 사랑하는 운영이라고 합니다. 만나서 반가워요.",
      name: "운영",
      country: "한국",
      age: "23"
    },
    
  ];

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handleNextProfile = () => {
    if (currentProfileIndex < profileDataList.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    }
  };

  const handlePrevProfile = () => {
    if (currentProfileIndex > 0) {
      setCurrentProfileIndex(currentProfileIndex - 1);
    }
  };

  const { profileImg=null, tag1="tag1", tag2="tag2", tag3="tag3", introduction="introduction", name="name", country="country", age="age" } = profileDataList[currentProfileIndex];

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
            <Notification32 count={cnt}/>
          </TouchableOpacity>
        </View>


        <View style={HomeStyles.textConnectWithContainer}>
          <Text style={HomeStyles.TXconnect} >커넥트</Text>
          <Text style={HomeStyles.TXwithnewfriend} >새로운 친구와 함께해요!</Text>
        </View>


        {showNewCard ? (
          <View style={HomeStyles.homecardContainer}>
            <TouchableOpacity onPress={handlePrevProfile}>
              <HomeArrow style={{transform: [{ scaleX: -1 }] }}/>
            </TouchableOpacity>
            <View style={[HomeStyles.homecard, { alignItems: 'center' }]}>
              <Homecard />
              <View style={HomeStyles.homecardDifeF}>
                <HomecardDifeB />
              </View>
              <View style={HomeStyles.homecardBack}>
                  <HomeProfile profile={profileImg} back={true}/>
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
            <TouchableOpacity onPress={handleNextProfile}>
              <HomeArrow />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={HomeStyles.homecardContainer}>
            <TouchableOpacity onPress={handlePrevProfile}>
              <HomeArrow style={{transform: [{ scaleX: -1 }] }}/>
            </TouchableOpacity>
            <View style={HomeStyles.homecard}>
              <Homecard />
              <View style={HomeStyles.homecardDifeF}>
                <HomecardDifeF />
              </View>
            <View style={HomeStyles.homeProfile}>
              <HomeProfile profile={profileImg}/>
              <View style={HomeStyles.tagContainer}>
                <HomeTag text={tag1}/>
                <HomeTag text={tag2}/>
                <HomeTag text={tag3}/>
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
            <TouchableOpacity onPress={handleNextProfile}>
              <HomeArrow />
            </TouchableOpacity>
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
