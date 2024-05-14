import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LoginStyles from '@pages/LoginPages/LoginStyles';
import Checkbox from '@components/CommonCompo/Checkbox';
import BottomTwoButtons from '@components/CommonCompo/BottomTwoButtons';
import IconNotSeePw from '@components/LoginCompo/IconNotSeePw';
import IconSeePw from '@components/LoginCompo/IconSeePw';
import LoginBackground from 'src/components/LoginCompo/LoginBackground';

const LoginPage = () => {
    const navigation = useNavigation();

    const loginData = ['Dife와 함께하는\n캠퍼스 라이프!', '지금 바로 시작하기'];
    const [valueID, onChangeID] = useState('');
    const [valuePW, onChangePW] = useState('');
    const [showPW, setShowPW] = useState(false);

    const handleShowPW = () => {
        setShowPW(!showPW);
    };

    const handleKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handleKeyboard}>
        <SafeAreaView style={[LoginStyles.container]}>
            <LoginBackground style={LoginStyles.backgroundLogin}/>
            <Text style={LoginStyles.TextTitle}>{loginData[0]}</Text>
            <Text style={LoginStyles.TextSubTitle}>{loginData[1]}</Text>
            <Text style={LoginStyles.TextId}>ID (Email Address)</Text>
            <TextInput style={LoginStyles.TextInputId}
                placeholder="이메일을 입력해주세요"
                onChangeText={text => onChangeID(text)}
                value={valueID}
            />
            <Text style={LoginStyles.TextPw}>Password</Text>
            <View style={LoginStyles.TextInputPwContainer}>
                <TextInput style={LoginStyles.TextInputPw}
                    placeholder="비밀번호를 입력해주세요"
                    onChangeText={text => onChangePW(text)}
                    value={valuePW}
                    secureTextEntry={!showPW}
                />
                <TouchableOpacity style={LoginStyles.iconSee} onPress={handleShowPW}>
                    { valuePW == '' ? null : (showPW ? <IconSeePw /> : <IconNotSeePw />)}
                </TouchableOpacity>
            </View>
            <Checkbox style={LoginStyles.checkboxRememberMe}
                checked='false'
                text='자동 로그인'
                login='true' />
            <View style={LoginStyles.ButtonSignupPwContainer}>
                <BottomTwoButtons button1='회원가입' button2='로그인' />
                <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
                    <Text style={LoginStyles.TextReport}>비밀번호를 까먹었어요</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default LoginPage;