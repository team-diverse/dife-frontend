import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeStyles from '@pages/home/HomeStyles.js';

import HomeBg from '@assets/images/svg_js/HomeBg.js';
import LogoBr from '@components/Logo/LogoBr.js';
import Notification32 from '@components/Icon32/Notification32.js';
import HomecardDifeF from '@components/home/HomecardDifeF.js';
import HomeSchEv from '@components/home/HomeSchEv.js';
import HomeSchoolInfo from '@components/home/HomeScoolInfo.js';
import HomeEvent from '@components/home/HomeEvent.js';
import HomeArrow from '@components/home/HomeArrow.js';
import IconTwoUsers from '@components/home/IconTwoUsers'
import HomeCardBack from '@components/home/HomeCardBack';
import HomeCardFront from '@components/home/HomeCardFront';
import HomeCard from '@components/home/HomeCard';
import HomeCardLast from '@components/home/HomeCardLast';

const HomePage = ({cnt=3}) => {
  const navigation = useNavigation();

  const profileDataList = [
    {
      id: 1,
      profileImg: require('../../assets/images/test_img/test_profileImg.png'),
      tags: ['enfp', 'Sports', 'Drawing'],
      introduction: "adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.",
      name: "Amyyheart",
      country: "France",
      age: "23"
    },
    {
      id: 2,
      profileImg: require('../../assets/images/test_img/test_haedam.jpg'),
      tags: ['entp', 'music', 'running'],
      introduction: "안녕하세요! 새로운 친구를 사귀고 싶은 해담입니다. 여행을 좋아하고 새로운 경험을 즐기며 삶을 즐겁게 살고 있어요.",
      name: "개해담",
      country: "한국",
      age: "1"
    },
    {
      id: 3,
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
    if (showMoreProfiles) {
      setShowMoreProfiles(false);
    } else if (currentProfileIndex > 0) {
      setCurrentProfileIndex(currentProfileIndex - 1);
    }
  };

  const profileData = profileDataList[currentProfileIndex];
  const { id, profileImg, tags, introduction, name, country, age } = profileData ? profileData : { profileImg: null, tags: ["tag"], introduction: "introduction", name: "name", country: "country", age: "age" };

  const [showNewCard, setShowNewCard] = useState(false);
  const [isLiked, setIsLiked] = useState({});

  const handleIsLikedPress = () => {
    setIsLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
              <View style={HomeStyles.homecard}>
                <HomeCardBack profileImg={profileImg} name={name} onPress={() => setShowNewCard(false)}/>
              </View>
            </View>
          ) : showMoreProfiles ? (
            <View style={HomeStyles.homecardContainer}>
              <View style={HomeStyles.homecard}>
                <HomeCardLast />
              </View>
            </View>
          ) : (
            <View style={HomeStyles.homecardContainer}>
              <View style={HomeStyles.homecard}>
                <HomeCardFront
                  profileImg={profileImg}
                  tags={tags}
                  introduction={introduction}
                  name={name}
                  country={country}
                  age={age}
                  onPress={() => setShowNewCard(true)}
                  isLikedOnPress={() => handleIsLikedPress(id)}
                  isLikedActive={isLiked[id] || false} />
              </View>
            </View>
          )}
          <View style={HomeStyles.backgroundHomecard}>
            <HomeCard />
          </View>
          <View style={[HomeStyles.backgroundHomecard, {transform: [{ scale: 0.8 }], right: -5, zIndex: -1}]}>
            <HomeCard />
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
