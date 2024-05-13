import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import FindPasswordStyles from '@pages/LoginPages/FindPasswordStyles';
import { CustomTheme } from '@styles/CustomTheme.js';

import InfoCircle from '@components/CommonCompo/InfoCircle';
import ArrowRight32 from '@components/Icon32/ArrowRight32';
import ApplyButton from '@components/CommonCompo/ApplyButton';

const FindPasswordPage = () => {
    const [valueID, onChangeID] = useState('');
    const [idValid, setIdValid] = useState(null);

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleFindPassword = () => {
        const formData = new FormData();
        formData.append('email', valueID);
    
        axios.put('http://10.223.120.226:8080/api/members/change-password', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            console.log('비밀번호 재발급 성공:', response.data);
            setIdValid(true);
            navigation.navigate('FindPasswordVerifying');
        })
        .catch(error => {
            console.error('비밀번호 재발급 실패:', error.response ? error.response.data : error.message);
            setIdValid(false);
        });
    };

    return (
        <TouchableWithoutFeedback onPress={handleKeyboard}>
            <SafeAreaView style={[FindPasswordStyles.container]}>
                <TouchableOpacity onPress={handleGoBack}>
                    <ArrowRight32 style={FindPasswordStyles.iconArrow} color={CustomTheme.textPrimary} />
                </TouchableOpacity>
                <Text style={FindPasswordStyles.textTitle}>비밀번호 재발급</Text>
                <Text style={FindPasswordStyles.textSubTitle}>회원가입 시 사용한 이메일을 입력해주세요</Text>
                <Text style={FindPasswordStyles.textId}>ID (Email Address)</Text>
                <TextInput style={FindPasswordStyles.textInputId}
                    placeholder="이메일을 입력해주세요"
                    onChangeText={text => onChangeID(text)}
                    value={valueID}
                />
                {idValid == false && (
                    <View style={FindPasswordStyles.containerNotMember}>
                        <InfoCircle color='#FF3E3E'/>
                        <Text style={FindPasswordStyles.textNotMember}>등록된 회원정보가 없습니다</Text>
                    </View>
                )}
                <View style={FindPasswordStyles.buttonPasswordReissue}>
                    <ApplyButton text="비밀번호 재발급받기" onPress={handleFindPassword}/>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default FindPasswordPage;