import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProfileMbtiStyles from '@pages/OnboadingPages/ProfileMbtiStyles';
import { CustomTheme } from '@styles/CustomTheme.js';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import Progress4 from '@components/OnboadingCompo/Progress4';
import FilterCategory from '@components/ConnectCompo/FilterCategory';
import ApplyButton from '@components/CommonCompo/ApplyButton';

const ProfileHobbyPage = () => {
    const navigation = useNavigation();
    const [mbtiCnt, setMbtiCnt] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false)
    
    const handleGoBack = () => {
        navigation.goBack();
    };

    const ProfileData = ['프로필 생성하기', '님의 MBTI를 알려주세요!'];

    const mbti = [
        'ISTP', 'ISFP', 'ENTP', 'ISFJ', 'INFJ', 'ENTJ', 'INFP', 'INTP', 'ESFP',
        'ESTP', 'ESFJ', 'INTJ', 'ESTJ', 'ENFP', 'ISTJ', 'ENFJ', '선택안함'
    ];
    const size = 3;
    const mbtiRows = [];
    for (let i = 0; i < mbti.length; i += size) {
        mbtiRows.push(mbti.slice(i, i + size));
    }

    useEffect(() => {
        if (mbtiCnt >= 1) {
          setIsDisabled(true);
        } else if (mbtiCnt < 1) {
          setIsDisabled(false);
        }
      }, [mbtiCnt]);

    return (
        <SafeAreaView style={[ProfileMbtiStyles.container]}>
            <TouchableOpacity onPress={handleGoBack}>
                <ArrowRight32 style={ProfileMbtiStyles.iconArrow} color={CustomTheme.textPrimary} />
            </TouchableOpacity>
            <View style={[ProfileMbtiStyles.iconProgress]}>
                <Progress4 />
            </View>
            <Text style={ProfileMbtiStyles.textTitle}>{ProfileData[0]}</Text>
            <Text style={ProfileMbtiStyles.textSubTitle}>{ProfileData[1]}</Text>
            <View style={ProfileMbtiStyles.containerMbti}>
                {mbtiRows.map((row, index) => (
                    <View key={index} style={ProfileMbtiStyles.rowMbti}>
                        {row.map(type => (
                            <FilterCategory
                                text={type} 
                                mbtiCnt={mbtiCnt}
                                setMbtiCnt={setMbtiCnt}
                                isDisabled={mbtiCnt >= 1} 
                            />
                        ))}
                    </View>
                ))}
            </View>
            <View style={ProfileMbtiStyles.buttonCheck}>
                <ApplyButton text="다음" onPress={() => navigation.navigate('ProfileHobby')} disabled=''/>
            </View>
        </SafeAreaView>
    )
}

export default ProfileHobbyPage;