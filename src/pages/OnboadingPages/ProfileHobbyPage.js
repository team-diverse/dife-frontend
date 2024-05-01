import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProfileHobbyStyles from '@pages/OnboadingPages/ProfileHobbyStyles';
import { CustomTheme } from '@styles/CustomTheme.js';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import Progress3 from '@components/OnboadingCompo/Progress3';
import FilterCategory from '@components/ConnectCompo/FilterCategory';
import ApplyButton from '@components/CommonCompo/ApplyButton';

const ProfileHobbyPage = () => {
    const navigation = useNavigation();
    const [hobbyCnt, setHobbyCnt] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false)
    
    const handleGoBack = () => {
        navigation.goBack();
    };

    const ProfileData = ['프로필 생성하기', '님의 취미/관심사를 선택해주세요!'];

    const hobby = [
        'SNS', 'OTT', '캠핑', '쇼핑', '드라이브', '산책', '반려동물', '스포츠', 'K-POP', '사진',
        '음악', '드라마', '독서', '그림', '요리', '만화', '언어공부', '여행', '악기연주', '영화', '맛집'
    ];
    const size = 3;
    const hobbyRows = [];
    for (let i = 0; i < hobby.length; i += size) {
        hobbyRows.push(hobby.slice(i, i + size));
    }

    useEffect(() => {
        if (hobbyCnt >= 3) {
          setIsDisabled(true);
        } else if (hobbyCnt < 3) {
          setIsDisabled(false);
        }
      }, [hobbyCnt]);

    return (
        <SafeAreaView style={[ProfileHobbyStyles.container]}>
            <TouchableOpacity onPress={handleGoBack}>
                <ArrowRight32 style={ProfileHobbyStyles.iconArrow} color={CustomTheme.textPrimary} />
            </TouchableOpacity>
            <View style={[ProfileHobbyStyles.iconProgress]}>
                <Progress3 />
            </View> 
            <Text style={ProfileHobbyStyles.textTitle}>{ProfileData[0]}</Text>
            <Text style={ProfileHobbyStyles.textSubTitle}>{ProfileData[1]}</Text>
            <View style={ProfileHobbyStyles.containerHobby}>
                {hobbyRows.map((row, index) => (
                    <View key={index} style={ProfileHobbyStyles.rowHobby}>
                        {row.map(type => (
                            <FilterCategory 
                                text={type} 
                                mbtiCnt={hobbyCnt}
                                setMbtiCnt={setHobbyCnt}
                                isDisabled={hobbyCnt >= 3}
                            />
                        ))}
                    </View>
                ))}
            </View>
            <View style={ProfileHobbyStyles.buttonCheck}>
                <ApplyButton text="다음" onPress={() => navigation.navigate('ProfileLanguage')} disabled=''/>
            </View>
        </SafeAreaView>
    )
}

export default ProfileHobbyPage;