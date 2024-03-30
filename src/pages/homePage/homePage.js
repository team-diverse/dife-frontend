import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

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
          <View style={HomeStyles.notify}>
            <Notify />
          </View>
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

export default HomePage;
