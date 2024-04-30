import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import NicknameStyles from '@pages/OnboadingPages/NicknameStyles';
import { CustomTheme } from '@styles/CustomTheme.js';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import Progress1 from '@components/OnboadingCompo/progress1';
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
    const [nicknameValid, setNicknameValid] = useState(false);

    const handleNicknameChange = (text) => {
        setNickname(text);
      };

    const handleKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleClearText = () => {
        setNickname('');
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
                {nicknameValid ? (
                    <Text style={NicknameStyles.textAvailableNickname}>사용 가능한 닉네임이에요.</Text>
                    ) : (
                    <Text style={NicknameStyles.textUnavailableNickname}>이미 사용 중인 닉네임이에요.</Text>
                )}
                <View style={NicknameStyles.buttonCheck}>
                    <ApplyButton text="확인" disabled=''/>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default NicknamePage;