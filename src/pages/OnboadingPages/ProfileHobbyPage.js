import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProfileHobbyStyles from '@pages/OnboadingPages/ProfileHobbyStyles';
import { CustomTheme } from '@styles/CustomTheme.js';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import Progress4 from '@components/OnboadingCompo/Progress4';
import FilterCategory from '@components/ConnectCompo/FilterCategory';
import ApplyButton from '@components/CommonCompo/ApplyButton';

const ProfileHobbyPage = () => {
    const navigation = useNavigation();
    const [hobbyCnt, setHobbyCnt] = useState(0);
    const [selectedHobby, setSelectedHobby] = useState([]);
    
    const handleGoBack = () => {
        navigation.goBack();
    };

    const { onboardingData, updateOnboardingData } = useOnboarding();

    const ProfileData = ['프로필 생성하기', `${onboardingData.username}님의 취미/관심사를 선택해주세요!`];

    const hobby = [
        'SNS', 'OTT', '캠핑', '쇼핑', '드라이브', '산책', '반려동물', '스포츠', 'K-POP', '사진',
        '음악', '드라마', '독서', '그림', '요리', '만화', '언어공부', '여행', '악기연주', '영화', '맛집'
    ];
    const size = 3;
    const hobbyRows = [];
    for (let i = 0; i < hobby.length; i += size) {
        hobbyRows.push(hobby.slice(i, i + size));
    }

    const handleSelectHobby = (hobby) => {
        setSelectedHobby(prevHobbies => [...prevHobbies, hobby]);
    };

    const handleDataSave = () => {
        updateOnboardingData({ hobbies: selectedHobby });
        console.log('hobby: ', selectedHobby)  // 값이 배열에 저장이 안 됨 으아악
        navigation.navigate('ProfileLanguage');
    };

    return (
        <SafeAreaView style={[ProfileHobbyStyles.container]}>
            <TouchableOpacity onPress={handleGoBack}>
                <ArrowRight32 style={ProfileHobbyStyles.iconArrow} color={CustomTheme.textPrimary} />
            </TouchableOpacity>
            <View style={[ProfileHobbyStyles.iconProgress]}>
                <Progress4 />
            </View> 
            <Text style={ProfileHobbyStyles.textTitle}>{ProfileData[0]}</Text>
            <Text style={ProfileHobbyStyles.textSubTitle}>{ProfileData[1]}</Text>
            <View style={ProfileHobbyStyles.containerHobby}>
                {hobbyRows.map((row, rowIndex) => (
                    <View key={rowIndex} style={ProfileHobbyStyles.rowHobby}>
                        {row.map((type, typeIndex) => (
                            <FilterCategory
                                key={typeIndex}
                                text={type} 
                                mbtiCnt={hobbyCnt}
                                setMbtiCnt={setHobbyCnt}
                                onPress={() => handleSelectHobby(type)}
                            />
                        ))}
                    </View>
                ))}
            </View>
            <View style={ProfileHobbyStyles.buttonCheck}>
                <ApplyButton text="다음" onPress={handleDataSave} disabled={hobbyCnt===0}/>
            </View>
        </SafeAreaView>
    )
}

export default ProfileHobbyPage;