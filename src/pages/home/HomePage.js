import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import HomeStyles from '@pages/home/HomeStyles.js';

import HomeBg from '@assets/images/svg_js/HomeBg.js';
import LogoBr from '@components/Logo/LogoBr.js';
import Notification32 from '@components/Icon32/Notification32.js';
import HomeSchEv from '@components/home/HomeSchEv.js';
import HomeSchoolInfo from '@components/home/HomeScoolInfo.js';
import HomeEvent from '@components/home/HomeEvent.js';
import HomeArrow from '@components/home/HomeArrow.js';
import HomeCardBack from '@components/home/HomeCardBack';
import HomeCardFront from '@components/home/HomeCardFront';
import HomeCard from '@components/home/HomeCard';
import HomeCardLast from '@components/home/HomeCardLast';
import { useOnboarding } from 'src/states/OnboardingContext.js';
import { getRandomMembersByCount } from 'config/api';

const HomePage = ({cnt=3}) => {
  const navigation = useNavigation();

  const [profileDataList, setProfileDataList] = useState([]);
  const { onboardingData } = useOnboarding();
  const RANDOM_MEMBER_COUNT = 10;

  useEffect(() => {
    axios.get('http://192.168.45.135:8080/api/members/random?count=10', {
      headers: {
        'Authorization': `Bearer ${onboardingData.accessToken}`,
        'Content-Type': 'application/json'
      },
      })
      .then(response => {
        // console.log(response.data);
        function cleanHobbies(hobbies) {
          return hobbies.map(hobby => hobby.replace(/[\[\]"]/g, ''));
        }
        const updatedData = response.data.map(data => {
          if (data.mbti !== null) {
            const cleanedHobbies = cleanHobbies(data.hobbies);
            const tags = [data.mbti, ...cleanedHobbies];
            return { ...data, tags };
          }
          return data;
        });
        // console.log(updatedData);
        setProfileDataList(updatedData);
      })
      .catch(error => {
        console.error('오류:', error.response ? error.response.data : error.message);
      });
  }, []);

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
  const { id, profilePresignUrl, tags, bio, username, country, age } = profileData ? profileData : { profileFileName: null, tags: ["tag"], bio: "bio", username: "username", country: "country", age: "age" };

  // useEffect(() => {
  //   console.log(profilePresignUrl);
  // }, [profileDataList[currentProfileIndex]])

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
                <HomeCardBack profileImg={profilePresignUrl} name={username} onPress={() => setShowNewCard(false)}/>
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
                  profileImg={profilePresignUrl}
                  tags={tags}
                  introduction={bio}
                  name={username}
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
