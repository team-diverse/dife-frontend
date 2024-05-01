import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProfileLanguageStyles from '@pages/OnboadingPages/ProfileLanguageStyles';
import { CustomTheme } from '@styles/CustomTheme.js';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import Progress5 from '@components/OnboadingCompo/Progress5';
import Checkbox from '@components/CommonCompo/Checkbox';
import ApplyButton from '@components/CommonCompo/ApplyButton';

const ProfileLanguagePage = () => {
    const navigation = useNavigation();
    
    const handleGoBack = () => {
        navigation.goBack();
    };

    const ProfileData = ['프로필 생성하기', '님의 사용언어를 알려주세요!'];

    const [isCheckedList, setIsCheckedList] = useState([
        false,
        false,
        false,
        false,
        false, 
    ]);

    const handlePress = (index) => {
        setIsCheckedList(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <SafeAreaView style={[ProfileLanguageStyles.container]}>
            <TouchableOpacity onPress={handleGoBack}>
                <ArrowRight32 style={ProfileLanguageStyles.iconArrow} color={CustomTheme.textPrimary} />
            </TouchableOpacity>
            <View style={[ProfileLanguageStyles.iconProgress]}>
                <Progress5 />
            </View>
            <Text style={ProfileLanguageStyles.textTitle}>{ProfileData[0]}</Text>
            <Text style={ProfileLanguageStyles.textSubTitle}>{ProfileData[1]}</Text>
            <View style={ProfileLanguageStyles.containerCheckbox}>
                <Checkbox checked={isCheckedList[0]} onPress={() => handlePress(0)} text='English / English' />
                <Checkbox checked={isCheckedList[1]} onPress={() => handlePress(1)} text='中文 / Chinese' />
                <Checkbox checked={isCheckedList[2]} onPress={() => handlePress(2)} text='日本語 / Japanese' />
                <Checkbox checked={isCheckedList[3]} onPress={() => handlePress(3)} text='Español / Spanish' />
                <Checkbox checked={isCheckedList[4]} onPress={() => handlePress(4)} text='한국어 / Korean' />
            </View>
            <View style={ProfileLanguageStyles.buttonCheck}>
                <ApplyButton text="다음" onPress={() => navigation.navigate('Certification')} disabled=''/>
            </View>
        </SafeAreaView>
    )
}

export default ProfileLanguagePage;