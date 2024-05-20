import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CustomTheme } from '@styles/CustomTheme.js';

import ConnectProfileTopBar from '@components/connect/ConnectProfileTopBar';
import HeartInac24 from '@components/Icon24/HeartInac24';
import ConnectProfileBackground from '@components/connect/ConnectProfileBackground';
import ConnectProfileStyles from '@pages/connect/ConnectProfileStyles';
import ConnectProfile from '@components/connect/ConnectProfile';
import ConnectProfileIntroduction from '@components/connect/ConnectProfileIntroduction';
import ConnectProfileTag from '@components/connect/ConnectProfileTag';
import BottomTwoButtons from '@components/common/BottomTwoButtons';
import ConnectProfileLanguage from '@components/connect/ConnectProfileLanguage';
import Report from '@components/Report';
import ConnectRequest from '@components/ConnectRequest';

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
            introduction: '안녕하세요, 저는 프랑스에서 온 에이미 입니다, 산업디자인을 전공하고 있습니다. 언제든지 채팅 주세요!! 😀',
            tags: ['여행', '사진', '스포츠', '요리', 'ENTP'],
            language: ['English / English', '한국어 / Korean'],
          };

    const [ modalReportVisible, setModalReportVisible ] = useState(false);
    const [ modalConnectVisible, setModalConnectVisible ] = useState(false);

    const handleReport = () => {
        setModalReportVisible(true);
    }

    const handleConnect = () => {
        setModalConnectVisible(true);
    };

    const handleChat = () => {
        null;
    };

    return (
        <SafeAreaView style={[ConnectProfileStyles.container, { alignItems: 'center' }]}>
            <View style={ConnectProfileStyles.topBar}>
                <ConnectProfileTopBar topBar="프로필"/>
                <HeartInac24 />
            </View>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={ConnectProfileStyles.scrollView}>
                <View style={ConnectProfileStyles.background}>
                    <ConnectProfileBackground />
                </View>
                <View style={ConnectProfileStyles.simpleProfileContainer}>
                    <ConnectProfile profile={profileData.profile}/>
                    <Text style={ConnectProfileStyles.name}>{profileData.name}</Text>
                    <Text style={ConnectProfileStyles.countryAgeMajor}>{profileData.country} | {profileData.age} | {profileData.major}</Text>
                </View>
                <View style={ConnectProfileStyles.detailProfileContainer}>
                    <Text style={ConnectProfileStyles.fontSub16}>본명</Text>
                    <Text style={ConnectProfileStyles.fontBody14}>{profileData.realname}</Text>
                    <Text style={ConnectProfileStyles.fontSub16}>한줄소개</Text>
                    <View>
                        <ConnectProfileIntroduction introduction={profileData.introduction}/>
                    </View>
                    <Text style={ConnectProfileStyles.fontSub16}>태그</Text>
                        <View style={{marginBottom: 8}}>
                            <ConnectProfileTag tag={profileData.tags}/>
                        </View>
                    <Text style={ConnectProfileStyles.fontSub16}>언어</Text>
                        <ConnectProfileLanguage language={profileData.language}/>
                        <View style={ConnectProfileStyles.languageLine}/>
                </View>
                <View style={ConnectProfileStyles.report} onPress={() => this.setState({open: true})}>
                    <TouchableOpacity onPress={handleReport}>
                        <Text style={ConnectProfileStyles.textReport}>신고하기</Text>
                    </TouchableOpacity>
                    <Report
                        modalVisible={modalReportVisible}
                        setModalVisible={setModalReportVisible}
                        reportTitle='개인 프로필 신고'
                        report1='혐오적인 컨텐츠'
                        report2='욕설/도배'
                        report3='다른 사람을 사칭함'
                        report4='기타'
                    />
                </View>
            </ScrollView>
            <BottomTwoButtons shadow='true'>
                <View text='채팅하기' onPress={handleChat} />
                <View text='커넥트 요청' onPress={handleConnect} />
            </BottomTwoButtons>
            <ConnectRequest
                modalVisible={modalConnectVisible}
                setModalVisible={setModalConnectVisible} />
        </SafeAreaView>
    )
}

export default ConnectProfilePage;