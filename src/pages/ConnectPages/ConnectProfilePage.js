import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import Modal from 'react-native-simple-modal';

import ConnectProfileTopBar from '@components/ConnectCompo/ConnectProfileTopBar';
import HeartInac24 from '@components/Icon24/HeartInac24';
import ConnectProfileBackground from '@components/ConnectCompo/ConnectProfileBackground';
import ConnectProfileStyles from '@pages/ConnectPages/ConnectProfileStyles';
import ConnectProfile from '@components/ConnectCompo/ConnectProfile';
import ConnectProfileIntroduction from '@components/ConnectCompo/ConnectProfileIntroduction';
import Tag from '@components/Tag';
import ConnectProfileChatRequest from '@components/ConnectCompo/ConnectProfileChatRequest';
import ConnectProfileLanguage from '@components/ConnectCompo/ConnectProfileLanguage';

const ConnectProfilePage = () => {
    const profileData =
        {
            id: '1',
            profile: require('@assets/images/test_img/test_connectProfile.jpeg'),
            name: 'Amy',
            country: 'France',
            age: '23',
            major: 'Industrial Design',
            realname: 'Amy revnski',
            introduction: 'adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.',
            tag1: 'enfp',
            tag2: 'Sports',
            tag3: 'Drawing',
            language: 'English / English',
          };

    const state ={open : false};

    return (
        <SafeAreaView style={[ConnectProfileStyles.container, { alignItems: 'center' }]}>
            <View style={ConnectProfileStyles.topBar}>
                <ConnectProfileTopBar topBar="프로필"/>
                <HeartInac24 />
            </View>
            {/* <ConnectProfileBackground style={ConnectProfileStyles.background} /> */}
            <ScrollView>
                <View style={ConnectProfileStyles.simpleProfileContainer}>
                    <ConnectProfile profile={profileData.profile}/>
                    <Text style={ConnectProfileStyles.name}>{profileData.name}</Text>
                    <Text style={ConnectProfileStyles.countryAgeMajor}>{profileData.country} | {profileData.age} | {profileData.major}</Text>
                </View>
                <View style={ConnectProfileStyles.detailProfileContainer}>
                    <Text style={ConnectProfileStyles.fontSub16}>본명</Text>
                    <Text style={ConnectProfileStyles.fontBody14}>{profileData.realname}</Text>
                    <Text style={ConnectProfileStyles.fontSub16}>한줄소개</Text>
                    <ConnectProfileIntroduction introduction={profileData.introduction}/>
                    {/* 태그랑 언어 리스트로 받아서 리스트 개수만큼 증가하게끔 수정하기 */}
                    <Text style={ConnectProfileStyles.fontSub16}>태그</Text>
                        {/* <Tag /> */}
                    <Text style={ConnectProfileStyles.fontSub16}>언어</Text>
                        <ConnectProfileLanguage language={profileData.language}/>
                        <ConnectProfileLanguage language={profileData.language}/>
                </View>
                <View style={ConnectProfileStyles.report} onPress={() => this.setState({open: true})}>
                    <Text style={ConnectProfileStyles.TXreport}>신고하기</Text>
                </View>
            </ScrollView>
            <ConnectProfileChatRequest />
        </SafeAreaView>
    )
}

export default ConnectProfilePage;