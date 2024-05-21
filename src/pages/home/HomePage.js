import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeStyles from '@pages/home/HomeStyles.js';

import HomeBg from '@assets/images/svg_js/HomeBg.js';
import LogoBr from '@components/Logo/LogoBr.js';
import Notification32 from '@components/Icon32/Notification32.js';
import Homecard from '@components/home/Homecard.js';
import HomecardDifeF from '@components/home/HomecardDifeF.js';
import HomeSchEv from '@components/home/HomeSchEv.js';
import HomeProfile from '@components/home/HomeProfile.js';
import HomeSchoolInfo from '@components/home/HomeScoolInfo.js';
import HomeEvent from '@components/home/HomeEvent.js';
import Tag from '@components/Tag.js';
import HomeArrow from '@components/home/HomeArrow.js';
import IconHeart24 from '@components/Icon24/IconHeart24';
import IconAddFriend24 from '@components/Icon24/IconAddFriend24';
import IconChat24 from '@components/Icon24/IconChat24';
import HomeLine from '@components/home/HomeLine.js';
import HomecardBackBtn from '@components/home/HomecardBackBtn.js';
import HomecardDifeB from '@components/home/HomecardDifeB.js';
import ConnectRequest from '@components/connect/ConnectRequest';
import IconTwoUsers from '@components/home/IconTwoUsers'

const HomePage = ({cnt=3}) => {
  const navigation = useNavigation();

  const [ modalVisible, setModalVisible ] = useState(false);

  const pressButton = () => {
      setModalVisible(true);
  }

  const profileDataList = [
    {
      tags: ['istj'],
      introduction: "제 이름은 테스트용입니다.",
      age: "23"
    },
    {
      profileImg: require('../../assets/images/test_img/test_profileImg.png'),
      tags: ['enfp', 'Sports', 'Drawing'],
      introduction: "adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.",
      name: "Amyyheart",
      country: "France",
      age: "23"
    },
    {
      profileImg: require('../../assets/images/test_img/test_haedam.jpg'),
      tags: ['entp', 'music', 'running'],
      introduction: "안녕하세요! 새로운 친구를 사귀고 싶은 해담입니다. 여행을 좋아하고 새로운 경험을 즐기며 삶을 즐겁게 살고 있어요.",
      name: "개해담",
      country: "한국",
      age: "1"
    },
    {
      profileImg: require('../../assets/images/test_img/test_event.png'),
      tags: ['istj', 'study', 'reading'],
      introduction: "안녕하세요! 저는 운영체제를 사랑하는 운영이라고 합니다. 만나서 반가워요.",
      name: "운영",
      country: "한국",
      age: "23"
    },
    
  ];

  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [showMoreProfiles, setShowMoreProfiles] = useState(false);

  const handleNextProfile = () => {
    if (currentProfileIndex < profileDataList.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setShowMoreProfiles(true);
    }
  };

  const handlePrevProfile = () => {
    setShowMoreProfiles(false);
    if (currentProfileIndex > 0) {
      setCurrentProfileIndex(currentProfileIndex - 1);
    }
  };

  const profileData = profileDataList[currentProfileIndex];
  const { profileImg, tags, introduction, name, country, age } = profileData ? profileData : { profileImg: null, tags: ["tag"], introduction: "introduction", name: "name", country: "country", age: "age" };

  const [showNewCard, setShowNewCard] = useState(false);
  const [heart, setHeart] = useState(false);

  const handlehandleHeartPress = () => {
    setHeart(!heart);
  };

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
          <TouchableOpacity style={HomeStyles.notify} onPress={() => navigation.navigate('NotificationPage')}>
            <Notification32 count={cnt}/>
          </TouchableOpacity>
        </View>


        <View style={HomeStyles.textConnectWithContainer}>
          <Text style={HomeStyles.textConnect} >커넥트</Text>
          <Text style={HomeStyles.textWithnewfriend} >새로운 친구와 함께해요!</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={handlePrevProfile}>
            <HomeArrow style={{transform: [{ scaleX: -1 }] }}/>
          </TouchableOpacity>
          {showNewCard ? (
            <View style={HomeStyles.homecardContainer}>
              <View style={[HomeStyles.homecard, { alignItems: 'center' }]}>
                <Homecard />
                <View style={HomeStyles.homecardDifeF}>
                  <HomecardDifeB />
                </View>
                <View style={HomeStyles.homecardBack}>
                    <HomeProfile profile={profileImg} back={true}/>
                  <Text style={HomeStyles.viewProfile}>프로필 상세보기</Text>
                  <View style={HomeStyles.addFriendOk}>
                    <Text style={HomeStyles.textName}>{name}</Text>
                    <Text style={HomeStyles.myinfo}>에게 친구신청하시겠습니까?</Text>
                  </View>
                </View>
                <View style={HomeStyles.homecardBackBtn}>
                  <HomecardBackBtn btnText="아니오" onPress={() => setShowNewCard(false)}/>
                  <HomecardBackBtn btnText="신청하기" onPress={pressButton}/>
                </View>
                <ConnectRequest
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              </View>
            </View>
          ) : showMoreProfiles ? (
            <View style={HomeStyles.homecardContainer}>
              <View style={HomeStyles.homecard}>
                <Homecard />
                <View style={HomeStyles.homecardDifeF}>
                  <HomecardDifeF />
                </View>
                <View style={HomeStyles.homeProfile}>
                  <View style={HomeStyles.containerImage}>
                    <IconTwoUsers />
                  </View>
                  <Text style={HomeStyles.textMoreProfile}>커넥트 페이지에서{"\n"}더 많은 프로필을 탐색할 수 있어요!</Text>
                  <Text style={HomeStyles.textLoadProfile}>프로필 추가 로딩까지 20:00분</Text>
                  <TouchableOpacity style={HomeStyles.buttonAddProfile}>
                    <Text style={HomeStyles.textAddProfile}>더 많은 프로필 탐색하기</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
            </View>
          ) : (
            <View style={HomeStyles.homecardContainer}>
              <View style={HomeStyles.homecard}>
                <Homecard />
                <View style={HomeStyles.homecardDifeF}>
                  <HomecardDifeF />
                </View>
              <View style={HomeStyles.homeProfile}>
                <HomeProfile profile={profileImg}/>
                <View style={HomeStyles.tagContainer}>
                  <Tag tag={tags}/>
                </View>
                <Text style={HomeStyles.introduction}>{introduction}</Text>
                <View style={HomeStyles.myinfoContainer}>
                  <Text style={HomeStyles.textName}>{name}</Text>
                  <Text style={HomeStyles.myinfo}> | {country} | {age}</Text>
                </View>
                </View>
                <View style={HomeStyles.connectIconContainer}>
                    <IconHeart24 style={HomeStyles.connectIcon} active={heart} onPress={handlehandleHeartPress}/>
                    <HomeLine style={HomeStyles.connectIcon}/>
                    <IconAddFriend24 style={HomeStyles.connectIcon} active='true' onPress={handleAddFriendPress}/>
                    <HomeLine style={HomeStyles.connectIcon}/>
                    <IconChat24 style={HomeStyles.connectIcon} active='true'/>
                </View>
              </View>
            </View>
          )}
          <View style={HomeStyles.backgroundHomecard}>
            <Homecard />
          </View>
          <View style={[HomeStyles.backgroundHomecard, {transform: [{ scale: 0.8 }], right: -5, zIndex: -1}]}>
            <Homecard />
          </View>
          <TouchableOpacity onPress={handleNextProfile}>
            <HomeArrow />
          </TouchableOpacity>
        </View>

        <View style={HomeStyles.homeSchEv}>
          <HomeSchEv />
          <Text style={HomeStyles.textHomeSchool}>학교정보</Text>
          <HomeSchoolInfo style={HomeStyles.homeSchIcon}/>
          <TouchableOpacity style={HomeStyles.homeEvent} onPress={() => navigation.navigate('EventPage')}>
            <HomeSchEv />
            <Text style={HomeStyles.textHomeEvent}>이벤트</Text>
            <HomeEvent style={HomeStyles.iconHomeEvent}/>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomePage;
