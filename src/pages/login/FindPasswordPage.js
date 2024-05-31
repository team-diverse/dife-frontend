import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import FindPasswordStyles from '@pages/login/FindPasswordStyles';
import { CustomTheme } from '@styles/CustomTheme.js';

import InfoCircle from '@components/common/InfoCircle';
import ArrowRight32 from '@components/Icon32/ArrowRight32';
import ApplyButton from '@components/common/ApplyButton';
import ConnectRequest from '@components/ConnectRequest';

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
        setModalConnectVisible(true);

        const formData = new FormData();
        formData.append('email', valueID);
    
        axios.put('http://192.168.45.89:8080/api/members/change-password', formData, {
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
        }).finally(() => {
            setModalConnectVisible(false);
        });
    };

    const [ modalConnectVisible, setModalConnectVisible ] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={handleKeyboard}>
            <SafeAreaView style={[FindPasswordStyles.container]}>
                <TouchableOpacity onPress={handleGoBack}>
                    <ArrowRight32 style={FindPasswordStyles.iconArrow} color={CustomTheme.textPrimary} />
                </TouchableOpacity>
                <Text style={FindPasswordStyles.textTitle}>비밀번호 재발급</Text>
                <Text style={FindPasswordStyles.textSubTitle}>회원가입 시 사용한 이메일을 입력해주세요</Text>
                <Text style={FindPasswordStyles.textId}>ID (Email Address)</Text>
                <View style={FindPasswordStyles.textInputId}>
                    <TextInput
                        placeholder="이메일을 입력해주세요"
                        onChangeText={text => onChangeID(text)}
                        value={valueID}
                    />
                </View>
                {idValid == false && (
                    <View style={FindPasswordStyles.containerNotMember}>
                        <InfoCircle color={CustomTheme.warningRed}/>
                        <Text style={FindPasswordStyles.textNotMember}>등록된 회원정보가 없습니다</Text>
                    </View>
                )}
                <ApplyButton text="비밀번호 재발급받기" disabled={valueID === ''} onPress={handleFindPassword}/>
                <ConnectRequest
                    modalVisible={modalConnectVisible}
                    setModalVisible={setModalConnectVisible}
                    textLoading='이메일 전송중'
                    textComplete='이메일 전송 완료!' />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default FindPasswordPage;