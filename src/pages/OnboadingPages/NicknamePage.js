import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import NicknameStyles from '@pages/OnboadingPages/NicknameStyles';
import { CustomTheme } from '@styles/CustomTheme.js';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import Progress1 from '@components/OnboadingCompo/Progress1';
import LoginBackground from '@components/LoginCompo/LoginBackground';
import IconDelete from '@components/OnboadingCompo/IconDelete';
import ApplyButton from '@components/CommonCompo/ApplyButton';

const NicknamePage = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const loginData = ['환영합니다:)', '디프에서 사용할 닉네임을 입력해주세요!'];
    const [nickname, setNickname] = useState('');
    const [nicknameValid, setNicknameValid] = useState(null);

    const handleNicknameChange = (text) => {
        setNickname(text);
      };

    const handleKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleClearText = () => {
        setNickname('');
    };

    const { onboardingData, updateOnboardingData } = useOnboarding();

    const handleNickname = () => {
        axios.head(`http://192.168.45.64:8080/api/members/${onboardingData.id}?username=${nickname}`, {
            headers: {
                'Authorization': `Bearer ${onboardingData.token}`,
            }
        })
        .then(() => {
            console.log('닉네임 사용 가능');
            setNicknameValid(true);
            updateOnboardingData({ username: nickname });
            navigation.navigate('Profile');
        })
        .catch(error => {
            console.error('닉네임 사용 불가:', error.response ? error.response.data : error.message);
            setNicknameValid(false);
        });
    };
    
    return (
        <TouchableWithoutFeedback onPress={handleKeyboard}>
            <SafeAreaView style={[NicknameStyles.container]}>
                <TouchableOpacity onPress={handleGoBack}>
                    <ArrowRight32 style={NicknameStyles.iconArrow} color={CustomTheme.textPrimary} />
                </TouchableOpacity>
                <View style={[NicknameStyles.iconProgress]}>
                    <Progress1 />
                </View>
                <LoginBackground style={NicknameStyles.backgroundLogin}/>
                <Text style={NicknameStyles.textTitle}>{loginData[0]}</Text>
                <Text style={NicknameStyles.textSubTitle}>{loginData[1]}</Text>
                <View style={NicknameStyles.containerInput}>
                    <TextInput  style={NicknameStyles.textInputNickname}
                        placeholder="최대 12자"
                        onChangeText={handleNicknameChange}
                        value={nickname}
                        maxLength={12}
                    />
                    {nickname.length > 0 && (
                        <TouchableOpacity style={NicknameStyles.iconDelete} onPress={handleClearText}>
                            <IconDelete />
                        </TouchableOpacity>
                        )}
                </View>
                {nicknameValid !== null && nickname.length > 0 && (nicknameValid ? (
                    <Text style={NicknameStyles.textAvailableNickname}>사용 가능한 닉네임이에요.</Text>
                    ) : (
                    <Text style={NicknameStyles.textUnavailableNickname}>이미 사용 중인 닉네임이에요.</Text>
                ))}
                <View style={NicknameStyles.buttonCheck}>
                    <ApplyButton text="확인" onPress={handleNickname} disabled={nickname.length === 0}/>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default NicknamePage;